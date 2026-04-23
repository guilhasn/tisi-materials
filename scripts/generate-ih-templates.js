#!/usr/bin/env node
/*
 * Generate 8 Incident Handling templates (.docx) aligned with
 * docs/gestao_incidentes/plano-resposta-incidentes-nis2.docx style.
 * Placeholder: [Nome da organização].
 * Legal basis: DL 125/2025 (NIS2 PT) + RGPD.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, TabStopType, TabStopPosition,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  ExternalHyperlink,
} = require("docx");

// ───────────────────────────── shared style ─────────────────────────────
const BRAND = "2E75B6";
const LIGHT = "D5E8F0";
const GREY = "E7E7E7";
const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const BORDERS = { top: border, bottom: border, left: border, right: border };
const CELL_MARGINS = { top: 80, bottom: 80, left: 120, right: 120 };

// A4 portrait: 11906 x 16838 DXA. Margins 1 inch => content width 9026.
const PAGE = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
};
const CONTENT_WIDTH = 9026;

const DEFAULT_STYLES = {
  default: { document: { run: { font: "Arial", size: 22 } } }, // 11 pt
  paragraphStyles: [
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 32, bold: true, font: "Arial", color: BRAND },
      paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 },
    },
    {
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 26, bold: true, font: "Arial", color: BRAND },
      paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
    },
    {
      id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: "Arial" },
      paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
    },
  ],
};
const NUMBERING = {
  config: [
    {
      reference: "bul",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }, {
        level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
      }],
    },
    {
      reference: "num",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } },
      }],
    },
  ],
};

// ───────────────────────────── helpers ─────────────────────────────
const p = (text, opts = {}) => new Paragraph({
  children: Array.isArray(text) ? text : [new TextRun(text)],
  spacing: { after: 120 },
  ...opts,
});
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const bul = (t) => new Paragraph({ numbering: { reference: "bul", level: 0 }, children: [new TextRun(t)] });
const bul2 = (t) => new Paragraph({ numbering: { reference: "bul", level: 1 }, children: [new TextRun(t)] });
const num = (t) => new Paragraph({ numbering: { reference: "num", level: 0 }, children: [new TextRun(t)] });
const spacer = (after = 200) => new Paragraph({ spacing: { after }, children: [new TextRun("")] });
const bold = (t) => new TextRun({ text: t, bold: true });
const italic = (t) => new TextRun({ text: t, italics: true });

const cell = (content, opts = {}) => {
  const children = Array.isArray(content) ? content : [new Paragraph({ children: [new TextRun(String(content))] })];
  return new TableCell({
    borders: BORDERS,
    margins: CELL_MARGINS,
    width: { size: opts.w, type: WidthType.DXA },
    shading: opts.header ? { fill: BRAND, type: ShadingType.CLEAR, color: "auto" } : (opts.alt ? { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" } : undefined),
    children: children.map(c => c instanceof Paragraph ? c : new Paragraph({ children: [typeof c === "string" ? new TextRun(opts.header ? { text: c, bold: true, color: "FFFFFF" } : c) : c] })),
    verticalAlign: "center",
  });
};

function tableFromRows(headers, rows, widths) {
  // widths: array of DXA per column; sum = table width
  const total = widths.reduce((a, b) => a + b, 0);
  const head = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { w: widths[i], header: true })),
  });
  const dataRows = rows.map((r, ri) =>
    new TableRow({
      children: r.map((v, i) => cell(v, { w: widths[i], alt: ri % 2 === 1 })),
    })
  );
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [head, ...dataRows],
  });
}

function coverBlock({ title, subtitle, version = "1.0", date = "abril de 2026", classification = "Confidencial" }) {
  return [
    new Paragraph({ spacing: { after: 1200 }, children: [new TextRun("")] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "[Nome da organização]", italics: true, size: 28, color: "666666" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: title, bold: true, size: 44, color: BRAND })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
      children: [new TextRun({ text: subtitle, italics: true, size: 24, color: "333333" })],
    }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: `Versão: ${version}`, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: `Data: ${date}`, size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: `Classificação: ${classification}`, size: 22 })] }),
  ];
}

function versionTable() {
  return [
    h2("Controlo de versões"),
    tableFromRows(
      ["Versão", "Data", "Autor", "Alterações", "Aprovado por"],
      [["1.0", "abril de 2026", "[Autor]", "Versão inicial", "[Aprovador]"]],
      [1200, 1400, 2000, 3000, 1426]
    ),
    spacer(300),
  ];
}

function docHeader(title) {
  return new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND, space: 1 } },
      children: [new TextRun({ text: `[Nome da organização] — ${title}`, size: 18, color: "666666" })],
    })],
  });
}

function docFooter() {
  return new Footer({
    children: [new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
      children: [
        new TextRun({ text: "Classificação: Confidencial", size: 18, color: "666666" }),
        new TextRun({ text: "\tPágina ", size: 18, color: "666666" }),
        new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
        new TextRun({ text: " de ", size: 18, color: "666666" }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "666666" }),
      ],
    })],
  });
}

function buildDoc({ title, filename, children }) {
  const doc = new Document({
    styles: DEFAULT_STYLES,
    numbering: NUMBERING,
    sections: [{
      properties: { page: PAGE },
      headers: { default: docHeader(title) },
      footers: { default: docFooter() },
      children,
    }],
  });
  return Packer.toBuffer(doc).then((buf) => {
    const out = path.join(__dirname, "..", "docs", "gestao_incidentes", filename);
    fs.writeFileSync(out, buf);
    console.log(`[OK] ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  });
}

// ───────────────────────────── DOC 1: Política ─────────────────────────────
function politica() {
  return buildDoc({
    title: "Política de Gestão de Incidentes",
    filename: "politica-gestao-incidentes.docx",
    children: [
      ...coverBlock({
        title: "Política de Gestão de Incidentes de Cibersegurança",
        subtitle: "Alinhada com ISO/IEC 27035, NIST SP 800-61r2 e DL 125/2025 (NIS2 PT)",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Objetivo"),
      p("Esta política estabelece o compromisso de [Nome da organização] com a gestão sistemática de incidentes de cibersegurança, definindo princípios, responsabilidades e requisitos mínimos de processo. O objetivo é minimizar o impacto de incidentes nos serviços prestados, nos dados tratados e na reputação da organização, assegurando o cumprimento das obrigações legais aplicáveis."),

      h1("2. Âmbito"),
      p("A presente política aplica-se a:"),
      bul("Todos os sistemas de informação, redes, serviços e dados sob responsabilidade de [Nome da organização], incluindo ambientes on-premise, cloud e híbridos;"),
      bul("Todos os colaboradores, prestadores de serviços, estagiários e terceiros com acesso autorizado aos sistemas;"),
      bul("Incidentes que afetem a confidencialidade, integridade ou disponibilidade da informação, bem como potenciais violações de dados pessoais sob o RGPD."),

      h1("3. Enquadramento legal e normativo"),
      p("Esta política dá cumprimento e referencia, entre outros:"),
      bul("Decreto-Lei n.º 125/2025 (transposição NIS2) — artigos 27.º (medidas técnicas e organizativas), 40.º-44.º (notificação de incidentes significativos), 48.º (divulgação pública);"),
      bul("Regulamento (UE) 2016/679 (RGPD) — artigos 32.º (segurança), 33.º (notificação à autoridade de controlo), 34.º (comunicação aos titulares);"),
      bul("ISO/IEC 27035 — gestão de incidentes de segurança da informação;"),
      bul("ISO/IEC 27001 — Anexo A, controlos A.5.24 a A.5.28;"),
      bul("NIST SP 800-61 Revision 2 — Computer Security Incident Handling Guide;"),
      bul("MITRE ATT&CK — referencial técnico para classificação de comportamento adversário."),

      h1("4. Princípios"),
      p("A gestão de incidentes em [Nome da organização] rege-se pelos seguintes princípios:"),
      bul([bold("Prontidão — "), new TextRun("capacidade de resposta 24/7 proporcional ao perfil de risco;")]),
      bul([bold("Preservação de evidência — "), new TextRun("toda a resposta preserva cadeia de custódia (RFC 3227);")]),
      bul([bold("Proporcionalidade — "), new TextRun("a resposta é calibrada à severidade, evitando sobre-reação;")]),
      bul([bold("Transparência interna, prudência externa — "), new TextRun("comunicação interna factual e oportuna; comunicação externa aprovada e controlada;")]),
      bul([bold("Aprendizagem contínua — "), new TextRun("cada incidente produz lições aprendidas acionáveis;")]),
      bul([bold("Conformidade — "), new TextRun("cumprimento dos prazos regulatórios (NIS2 24h/72h/30d; RGPD 72h).")]),

      h1("5. Papéis e responsabilidades"),
      tableFromRows(
        ["Papel", "Responsabilidade principal"],
        [
          ["Conselho de administração / Direção", "Aprovar a política, alocar recursos, decidir sobre crises de alto impacto e comunicações externas."],
          ["CISO / Responsável pela Segurança da Informação", "Garantir implementação, coordenar o CSIRT, reportar ao órgão de gestão."],
          ["CSIRT / Equipa de Resposta a Incidentes", "Executar deteção, triagem, contenção, investigação, erradicação, recuperação e follow-up."],
          ["DPO / Encarregado da Proteção de Dados", "Avaliar incidentes com impacto em dados pessoais, articular com CNPD."],
          ["Responsáveis de sistema / Process owners", "Suporte operacional ao CSIRT; decisões de paragem e restauro de serviços sob sua responsabilidade."],
          ["Gestão de Comunicação", "Executar o plano de comunicação de crise aprovado."],
          ["Departamento Jurídico", "Avaliar obrigações legais, preservar evidência para eventual processo, gerir relação com autoridades."],
          ["Todos os colaboradores", "Reportar prontamente eventos suspeitos ao canal oficial; não tentar investigar ou remediar por iniciativa própria."],
        ],
        [2800, 6226]
      ),

      h1("6. Ciclo de gestão de incidentes"),
      p("O ciclo adotado segue NIST SP 800-61r2, compatível com o modelo SANS (PICERL):"),
      num("Preparação — políticas, playbooks, ferramentas, formação, exercícios."),
      num("Deteção e análise — identificação, triagem, classificação, análise inicial."),
      num("Contenção, erradicação e recuperação — limitar impacto, remover causa, restaurar operações."),
      num("Atividade pós-incidente — lições aprendidas (PIR), atualização de controlos e playbooks."),

      h1("7. Classificação e severidade"),
      p("Todos os incidentes são classificados em cinco níveis de severidade (P1 a P5) de acordo com o procedimento específico de classificação. A severidade determina prazo de resposta, equipa mobilizada e necessidade de escalonamento para a direção. Consultar o documento «Procedimento de Classificação e Severidade de Incidentes»."),

      h1("8. Notificação e comunicação"),
      p("As obrigações mínimas de notificação em [Nome da organização] são:"),
      tableFromRows(
        ["Destinatário", "Quando", "Prazo"],
        [
          ["CNCS — Centro Nacional de Cibersegurança", "Incidente significativo NIS2 (DL 125/2025 art. 40.º)", "24h para notificação inicial; 72h para atualização; 30 dias úteis para relatório final"],
          ["CNPD — Comissão Nacional de Proteção de Dados", "Violação de dados pessoais com risco para os titulares (RGPD art. 33.º)", "72 horas após conhecimento"],
          ["Titulares dos dados", "Violação com elevado risco para direitos e liberdades (RGPD art. 34.º)", "Sem demora injustificada"],
          ["Órgão de gestão", "Incidentes P1 e P2", "Imediato (P1) / 4 horas (P2)"],
          ["Polícia Judiciária / Ministério Público", "Incidentes com natureza criminal (DL 125/2025 art. 23.º)", "Conforme avaliação jurídica"],
        ],
        [2400, 3200, 3426]
      ),

      h1("9. Formação, exercícios e sensibilização"),
      bul("Todos os colaboradores recebem formação obrigatória de sensibilização em reporte de incidentes, no momento do onboarding e anualmente;"),
      bul("O CSIRT realiza pelo menos um exercício tipo tabletop por ano e um exercício técnico (red team ou purple team) de 24 em 24 meses;"),
      bul("A participação em exercícios de cibersegurança setoriais ou nacionais (CNCS) é incentivada quando aplicável."),

      h1("10. Documentos operacionais associados"),
      bul("Procedimento de Classificação e Severidade de Incidentes;"),
      bul("Procedimento de Escalonamento e Matriz RACI do CSIRT;"),
      bul("Playbook — Ransomware;"),
      bul("Playbook — Phishing / Comprometimento de Credenciais;"),
      bul("Playbook — Violação de Dados Pessoais;"),
      bul("Plano de Comunicação de Crise;"),
      bul("Relatório de Pós-Incidente (PIR) — template;"),
      bul("Plano de Resposta a Incidentes (NIS2);"),
      bul("Registo de incidentes."),

      h1("11. Revisão"),
      p("Esta política é revista no mínimo anualmente pelo CISO, ou sempre que ocorra alteração regulatória significativa, alteração do perfil de risco da organização, ou lição aprendida de incidente relevante. As alterações são aprovadas pela Direção."),

      h1("12. Aprovação"),
      p("Esta política entra em vigor na data de aprovação, sendo publicada na intranet de [Nome da organização] e distribuída a todos os colaboradores."),
      spacer(400),
      tableFromRows(
        ["Aprovado por", "Cargo", "Data", "Assinatura"],
        [["[Nome]", "[Cargo]", "abril de 2026", ""]],
        [2400, 2400, 2000, 2226]
      ),
    ],
  });
}

// ───────────────────────────── DOC 2: Classificação e severidade ─────────────────────────────
function classificacao() {
  return buildDoc({
    title: "Classificação e Severidade de Incidentes",
    filename: "procedimento-classificacao-severidade.docx",
    children: [
      ...coverBlock({
        title: "Procedimento — Classificação e Severidade de Incidentes",
        subtitle: "Matriz P1-P5, categorias e critérios de triagem",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Objetivo"),
      p("Definir critérios uniformes e reproduzíveis de classificação de incidentes de cibersegurança em [Nome da organização], de modo a garantir resposta proporcional, prazos adequados e escalonamento consistente."),

      h1("2. Matriz de severidade"),
      p("A severidade é determinada pela combinação de três dimensões: impacto potencial, abrangência e urgência. A tabela seguinte serve de referência; em caso de dúvida, deve adotar-se a severidade mais elevada."),
      tableFromRows(
        ["Nível", "Designação", "Exemplos típicos", "Resposta esperada"],
        [
          ["P1", "Crítico", "Ransomware com cifra em ambiente produtivo; paragem de serviço essencial; violação massiva de dados pessoais confirmada.", "Imediata; CSIRT 24/7 mobilizado; Direção notificada de imediato; possível declaração de desastre/BCP."],
          ["P2", "Alto", "Comprometimento confirmado de conta privilegiada; malware em múltiplos endpoints; DDoS com impacto operacional.", "≤ 1h; CSIRT mobilizado; CISO notificado."],
          ["P3", "Médio", "Phishing com credenciais comprometidas (<10 utilizadores); malware contido em 1 endpoint; vulnerabilidade crítica explorada mas ainda sem impacto.", "≤ 4h em horário laboral; analista de turno."],
          ["P4", "Baixo", "Tentativa de phishing sem vítima confirmada; alerta de antivírus resolvido automaticamente; varrimento externo sem exploração.", "≤ 1 dia útil; ticket normal."],
          ["P5", "Informativo", "Evento anómalo sem impacto; falso positivo confirmado; reporte voluntário a investigar.", "Registo para tendência; análise agregada."],
        ],
        [700, 1400, 4000, 2926]
      ),

      h1("3. Dimensões de avaliação"),
      h2("3.1 Impacto potencial"),
      tableFromRows(
        ["Dimensão", "Pergunta de triagem"],
        [
          ["Confidencialidade", "Há evidência de acesso, exfiltração ou exposição de dados sensíveis, pessoais ou classificados?"],
          ["Integridade", "Há evidência de alteração, corrupção ou manipulação de dados ou sistemas?"],
          ["Disponibilidade", "Há paragem ou degradação de serviço essencial? Qual o MTD/RTO associado?"],
          ["Compliance", "O incidente aciona obrigação legal (NIS2, RGPD, setoriais)?"],
          ["Reputacional", "Existe exposição mediática potencial ou impacto sobre stakeholders externos?"],
          ["Financeiro", "Existe perda financeira direta (fraude, extorsão, lucro cessante)?"],
        ],
        [2400, 6626]
      ),
      h2("3.2 Abrangência"),
      bul("Número de sistemas, serviços, utilizadores ou localizações afetadas;"),
      bul("Presença em sistemas críticos (tier 0 — AD, PKI, backups) vs. tier 1-3;"),
      bul("Propagação em curso (sim/não) e velocidade estimada."),
      h2("3.3 Urgência"),
      bul("Dano em curso vs. dano potencial;"),
      bul("Janela de deteção vs. janela de contenção;"),
      bul("Impacto sobre MTD (Maximum Tolerable Downtime) das funções afetadas."),

      h1("4. Categorias de incidente"),
      p("Todo o incidente é classificado em pelo menos uma categoria principal para fins de análise de tendências e seleção do playbook adequado."),
      tableFromRows(
        ["Categoria", "Playbook aplicável"],
        [
          ["Phishing / engenharia social", "Playbook — Phishing / Comprometimento de Credenciais"],
          ["Malware / ransomware / wiper", "Playbook — Ransomware (ou específico do malware)"],
          ["Negação de serviço (DoS/DDoS)", "Playbook específico DDoS"],
          ["Comprometimento de conta", "Playbook — Phishing / Comprometimento de Credenciais"],
          ["Acesso não autorizado", "Playbook — Intrusão interna"],
          ["Violação de dados pessoais", "Playbook — Violação de Dados Pessoais (RGPD)"],
          ["Insider threat (malicioso ou negligente)", "Playbook específico insider"],
          ["Cadeia de fornecimento / fornecedor", "Playbook — Incidente de supply chain"],
          ["Perda/roubo de equipamento ou média", "Playbook — Perda de ativos"],
          ["Web defacement", "Playbook — Ataque web"],
          ["Fraude digital", "Playbook — Fraude + Jurídico"],
        ],
        [3200, 5826]
      ),

      h1("5. Processo de triagem"),
      num("Receção — qualquer canal (helpdesk, SIEM, EDR, reporte de utilizador, parceiro externo, autoridade)."),
      num("Registo imediato — criar ticket/case no sistema de gestão de incidentes com identificador único."),
      num("Triagem inicial (máx. 15 minutos) — atribuir categoria provisória, severidade provisória e analista responsável."),
      num("Confirmação (máx. 1h) — analista valida categoria e severidade com evidência; aplica o playbook correspondente."),
      num("Re-classificação — severidade é revista em cada update; elevar se nova evidência justificar."),

      h1("6. Prazos e escalonamento por severidade"),
      tableFromRows(
        ["Severidade", "SLA de reconhecimento", "SLA de contenção inicial", "Escalonamento"],
        [
          ["P1", "Imediato", "1 hora", "CISO + Direção + Jurídico + DPO; potencial ativação BCP/DRP"],
          ["P2", "15 minutos", "4 horas", "CISO + process owner"],
          ["P3", "1 hora", "1 dia útil", "CSIRT"],
          ["P4", "4 horas", "5 dias úteis", "Analista de turno"],
          ["P5", "1 dia útil", "N/A", "Registo"],
        ],
        [1200, 2200, 2200, 3426]
      ),

      h1("7. Relação com obrigações regulatórias"),
      p("A classificação interna não substitui a avaliação regulatória específica, nomeadamente:"),
      bul([bold("NIS2 (DL 125/2025 art. 40.º) — "), new TextRun("«incidente significativo» é critério legal independente; P1/P2 requerem análise imediata para obrigação de notificação em 24h.")]),
      bul([bold("RGPD (art. 33.º) — "), new TextRun("qualquer incidente com dados pessoais requer avaliação do DPO para decisão de notificação à CNPD em 72h.")]),
      bul([bold("Setoriais — "), new TextRun("DORA (financeiro), regulamentos de telecomunicações (ANACOM), saúde, podem aplicar prazos próprios.")]),

      h1("8. Exemplos aplicados"),
      h3("Exemplo A — Phishing com 3 utilizadores"),
      p("Três utilizadores introduziram credenciais num formulário falso. Sem evidência de acesso pós-comprometimento. Impacto: confidencialidade (potencial); abrangência: 3 contas; urgência: alta (janela de 24h para o atacante usar). → Classificação: P3."),
      h3("Exemplo B — Ransomware em servidor de ficheiros"),
      p("Ransomware cifrou partilhas num servidor departamental. Propagação contida. Sem dados pessoais sensíveis. → P2 (impacto operacional significativo, sem risco regulatório maior). Se houver dados pessoais → reavaliar para P1."),
      h3("Exemplo C — Credencial de administrador de domínio comprometida"),
      p("Credencial de Domain Admin detetada em dump público. Sem evidência de uso. → P1 automático (risco sistémico máximo; tier 0)."),
    ],
  });
}

// ───────────────────────────── DOC 3: Escalonamento + RACI ─────────────────────────────
function escalonamento() {
  const raci = [
    ["Triagem inicial e classificação", "R", "A", "C", "I", "", "", ""],
    ["Contenção técnica", "R", "A", "", "", "C", "I", ""],
    ["Preservação de evidência forense", "R", "A", "", "", "C", "I", ""],
    ["Decisão de paragem de serviço", "C", "R", "A", "C", "I", "C", ""],
    ["Notificação ao CNCS (NIS2)", "C", "R", "A", "C", "I", "", "C"],
    ["Notificação à CNPD (RGPD)", "C", "C", "I", "R/A", "", "", "C"],
    ["Notificação aos titulares dos dados", "I", "C", "A", "R", "", "", "C"],
    ["Decisão sobre pagamento de resgate", "C", "C", "R/A", "C", "", "", "C"],
    ["Comunicação a média e público", "I", "C", "A", "C", "", "R", "C"],
    ["Coordenação com PJ / Ministério Público", "I", "C", "A", "C", "", "", "R"],
    ["Ativação do BCP/DRP", "C", "C", "R/A", "C", "", "", ""],
    ["Relatório pós-incidente (PIR)", "R", "A", "I", "C", "C", "C", "C"],
    ["Atualização de controlos e playbooks", "R", "A", "I", "C", "", "", ""],
    ["Aprovação de lições aprendidas", "C", "R", "A", "C", "", "", ""],
  ];
  return buildDoc({
    title: "Escalonamento e Matriz RACI",
    filename: "procedimento-escalonamento-raci.docx",
    children: [
      ...coverBlock({
        title: "Procedimento — Escalonamento e Matriz RACI do CSIRT",
        subtitle: "Cadeia de comando, responsabilidades e contactos",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Objetivo"),
      p("Definir a cadeia de escalonamento de incidentes de cibersegurança em [Nome da organização], bem como atribuir, por via de uma matriz RACI, as responsabilidades das partes intervenientes nas principais atividades de resposta."),

      h1("2. Estrutura de resposta"),
      h2("2.1 Níveis de suporte"),
      tableFromRows(
        ["Nível", "Papel", "Âmbito"],
        [
          ["L1 — Service Desk / SOC Tier 1", "Receção, registo, triagem inicial, aplicação de runbooks de primeira linha.", "P4-P5 e triagem inicial de P1-P3."],
          ["L2 — CSIRT Analistas", "Análise técnica, contenção, investigação, aplicação de playbooks.", "P2-P3."],
          ["L3 — CSIRT Seniores / Forense", "Investigação aprofundada, DFIR, reverse engineering, coordenação com terceiros.", "P1-P2 complexos."],
          ["Gestão de Crise", "Decisões estratégicas, comunicação externa, coordenação regulatória.", "P1 / ativação BCP."],
        ],
        [2600, 3400, 3026]
      ),

      h2("2.2 Intervenientes do CSIRT estendido"),
      p("Legenda usada na matriz RACI: (R) Responsável pela execução; (A) Accountable, decide e responde; (C) Consultado; (I) Informado."),

      h1("3. Matriz RACI"),
      tableFromRows(
        ["Atividade", "CSIRT", "CISO", "Direção", "DPO", "IT Ops", "Comunicação", "Jurídico"],
        raci,
        [2300, 900, 900, 900, 900, 900, 1100, 1126]
      ),

      h1("4. Critérios de escalonamento"),
      p("O escalonamento é automático quando se verifica qualquer um dos seguintes critérios, sem necessidade de aprovação adicional:"),
      bul("Classificação P1 ou P2;"),
      bul("Envolvimento de sistemas tier 0 (Active Directory, PKI, cofres de segredos, sistemas de backup);"),
      bul("Evidência de exfiltração ou ameaça pública de publicação de dados;"),
      bul("Potencial de impacto em segurança física ou de pessoas;"),
      bul("Cobertura mediática em curso ou iminente;"),
      bul("Incidente que cruza fronteiras jurisdicionais ou envolve autoridades externas;"),
      bul("Impasse interno sobre decisão crítica (pagar/não pagar, desligar/não desligar)."),

      h1("5. Cadeia de contactos"),
      tableFromRows(
        ["Papel", "Nome", "Contacto primário", "Contacto secundário (24/7)"],
        [
          ["CSIRT — Canal oficial", "[Caixa única]", "[csirt@organização]", "[+351 xxx xxx xxx]"],
          ["CISO", "[Nome]", "[email]", "[telemóvel]"],
          ["CIO / Direção de IT", "[Nome]", "[email]", "[telemóvel]"],
          ["DPO", "[Nome]", "[email]", "[telemóvel]"],
          ["Direção / CEO", "[Nome]", "[email]", "[via gabinete]"],
          ["Jurídico", "[Nome]", "[email]", "[telemóvel]"],
          ["Comunicação / Porta-voz", "[Nome]", "[email]", "[telemóvel]"],
          ["Fornecedor DFIR externo", "[Empresa]", "[email 24/7]", "[telefone 24/7]"],
          ["Seguradora cyber", "[Empresa]", "[email 24/7]", "[telefone 24/7]"],
        ],
        [2400, 2000, 2400, 2226]
      ),

      h1("6. Contactos externos"),
      tableFromRows(
        ["Entidade", "Competência", "Contacto"],
        [
          ["CNCS — Centro Nacional de Cibersegurança", "Notificação NIS2 (DL 125/2025)", "cert.pt@cncs.gov.pt | +351 210 497 400"],
          ["CNPD — Comissão Nacional de Proteção de Dados", "Notificação de violação de dados pessoais (RGPD art. 33.º)", "geral@cnpd.pt | Portal de notificação online"],
          ["Polícia Judiciária — UNC3T", "Crime informático", "unc3t@pj.pt | +351 211 967 000"],
          ["Ministério Público", "Denúncia de crime", "[comarca territorialmente competente]"],
          ["ANACOM", "Incidentes em comunicações eletrónicas", "info@anacom.pt"],
          ["Setoriais aplicáveis", "ASAE, ERSE, ERSAR, Banco de Portugal, etc.", "[conforme setor de atividade]"],
        ],
        [2800, 3600, 2626]
      ),

      h1("7. Prazos-chave"),
      tableFromRows(
        ["Obrigação", "Base legal", "Prazo a partir de"],
        [
          ["Notificação inicial NIS2", "DL 125/2025 art. 42.º", "24h após conhecimento"],
          ["Atualização NIS2", "DL 125/2025 art. 42.º n.º 3", "72h após conhecimento"],
          ["Notificação fim de impacto NIS2", "DL 125/2025 art. 43.º", "24h após resolução"],
          ["Relatório final NIS2", "DL 125/2025 art. 44.º", "30 dias úteis após fim de impacto"],
          ["Notificação à CNPD", "RGPD art. 33.º", "72h após conhecimento"],
          ["Comunicação aos titulares", "RGPD art. 34.º", "Sem demora injustificada"],
        ],
        [3200, 2800, 3026]
      ),

      h1("8. Revisão"),
      p("Este procedimento é revisto anualmente ou sempre que ocorra alteração organizacional relevante. Os contactos são validados trimestralmente."),
    ],
  });
}

// ───────────────────────────── DOC 4: Playbook Ransomware ─────────────────────────────
function playbookRansomware() {
  return buildDoc({
    title: "Playbook — Ransomware",
    filename: "playbook-ransomware.docx",
    children: [
      ...coverBlock({
        title: "Playbook — Resposta a Ransomware",
        subtitle: "Procedimento operacional alinhado com CISA StopRansomware e MITRE ATT&CK",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Ativação"),
      p("Este playbook é ativado sempre que se verifique qualquer um dos indicadores:"),
      bul("Ficheiros renomeados com extensão anómala (ex.: .locked, .encrypted, .<random>);"),
      bul("Nota de resgate visível no desktop, partilha de rede, ou portal de vítimas;"),
      bul("Alertas em massa de EDR sobre processos suspeitos (cifra, vssadmin, bcdedit, wbadmin delete);"),
      bul("Degradação massiva de performance em sistemas de ficheiros;"),
      bul("Reporte externo credível (fornecedor, parceiro, CNCS, grupo de ameaça)."),
      spacer(200),
      p([bold("Classificação por defeito: P1 "), new TextRun("até prova em contrário.")]),

      h1("2. Fase 1 — Contenção imediata (primeiras 2 horas)"),
      num("Isolar imediatamente hosts afetados: desligar interface de rede (preferível) ou colocar em VLAN de quarentena. NÃO desligar o host — preserva evidência volátil."),
      num("Isolar segmentos de rede onde a propagação foi observada (firewall rules, ACLs, desligar switches)."),
      num("Desabilitar contas suspeitas de estar comprometidas (admin, serviço) mantendo log das ações."),
      num("Suspender tarefas agendadas e GPOs de domínio que possam propagar malware."),
      num("Proteger backups: desligar acesso de rede aos sistemas de backup; validar integridade das cópias offline/imutáveis."),
      num("Abrir ticket P1 e iniciar war room (ver Plano de Comunicação de Crise)."),
      num("Notificar CISO, Direção, DPO e Jurídico — decisão de ativação do BCP é reavaliada hora a hora."),

      h1("3. Fase 2 — Identificação (primeiras 4 horas)"),
      h2("3.1 Preservação de evidência"),
      bul("Dump de memória RAM de 1-2 hosts representativos ANTES de qualquer ação invasiva (WinPMEM, LiME);"),
      bul("Imagem forense de pelo menos um host atingido (FTK Imager, dcfldd);"),
      bul("Colecta de logs: EDR, SIEM, firewall, DNS, proxy, AD — idealmente cobrindo 30 dias antes do incidente;"),
      bul("Cadeia de custódia formal para todas as evidências (quem, quando, onde, hash SHA-256)."),
      h2("3.2 Identificação do ransomware"),
      bul("Submeter amostra (nota de resgate + ficheiro cifrado de exemplo) a ID Ransomware (id-ransomware.malwarehunterteam.com) e a NoMoreRansom (nomoreransom.org) — verificar se existe decriptor público;"),
      bul("Cruzar com CISA StopRansomware e CNCS/CERT.PT;"),
      bul("Mapear técnicas ATT&CK observadas: Initial Access, Credential Access, Lateral Movement, Impact (T1486, T1490, T1489, T1561)."),

      h1("4. Fase 3 — Avaliação (primeiras 8 horas)"),
      tableFromRows(
        ["Pergunta crítica", "Fonte de resposta"],
        [
          ["Dados pessoais foram acedidos ou exfiltrados?", "Análise forense + logs de exfiltração + site de leaks do grupo"],
          ["Há double extortion? Grupo tem histórico de publicação?", "Threat intel sobre o grupo (ex.: LockBit, BlackCat)"],
          ["Quantos sistemas cifrados? Abrangência por criticidade?", "Inventário atualizado + relatório EDR"],
          ["Backups estão intactos e restauráveis no prazo do MTD?", "Equipa de IT Ops + teste de restauro real, não apenas verificação"],
          ["Existe decriptor público ou privado?", "NoMoreRansom + fornecedores DFIR + seguradora"],
          ["Qual o custo estimado de recuperação sem pagar vs. pagar?", "Modelação financeira conjunta com Direção"],
        ],
        [4000, 5026]
      ),

      h1("5. Fase 4 — Decisão de pagamento"),
      p("A decisão de pagar ou não pagar o resgate é tomada pela Direção, com input do CISO, Jurídico, DPO, seguradora e, quando aplicável, do CNCS. Nunca pelo CSIRT em isolamento."),
      h2("5.1 Árvore de decisão"),
      num("Backups restauráveis dentro do MTD? SE SIM → não pagar."),
      num("Grupo na lista OFAC ou UE de sanções? SE SIM → NÃO PAGAR (pagar pode ser crime). Validar com Jurídico."),
      num("Decriptor público disponível? SE SIM → usar, não pagar."),
      num("Dados pessoais exfiltrados e publicação iminente? Avaliar dano reputacional/regulatório vs. incerteza do pagamento (grupos frequentemente republicam)."),
      num("Custo de paragem prolongada superior ao resgate? Apresentar números à Direção para decisão formal."),
      num("Independente da decisão de pagamento, continuar recuperação a partir de backups em paralelo."),
      h2("5.2 Se a decisão for pagar"),
      bul("Validação com seguradora cyber antes do pagamento — algumas apólices exigem autorização prévia;"),
      bul("Registo formal da decisão em ata (Direção, Jurídico, CISO);"),
      bul("Transação operacionalizada por negociador profissional (fornecedor especializado), nunca por colaborador interno;"),
      bul("Exigir prova-de-vida antes do pagamento: decifrar um ficheiro de teste fornecido pela vítima;"),
      bul("Assumir que pagar não garante chave funcional, rapidez, nem ausência de republicação."),

      h1("6. Fase 5 — Erradicação e recuperação"),
      h2("6.1 Erradicação"),
      num("Identificar vetor inicial (phishing, RDP exposto, vulnerabilidade, supply chain) e fechar."),
      num("Rotação obrigatória de todas as credenciais em risco: contas privilegiadas, contas de serviço, KRBTGT (duas vezes, com intervalo), chaves de API."),
      num("Validar ausência de persistence (scheduled tasks, services, run keys, WMI subscriptions, GPOs alteradas)."),
      num("Patching de todas as vulnerabilidades exploradas."),
      h2("6.2 Recuperação faseada"),
      num("Reconstruir tier 0 (AD, PKI, Backup) em ambiente limpo (forest recovery se necessário)."),
      num("Restaurar serviços por ordem de criticidade definida na BIA."),
      num("Validar integridade pós-restauro (hash, testes funcionais)."),
      num("Monitorização reforçada por ≥ 30 dias (threat hunting ativo)."),
      h2("6.3 Reentrada em produção"),
      bul("Critério «clean before green»: não se restaura nada que não tenha passado por análise forense/AV/EDR atualizado;"),
      bul("Nenhum dispositivo/conta regressa a tier 0 sem reset completo;"),
      bul("Comunicação clara aos utilizadores sobre quando e como podem voltar a usar os sistemas."),

      h1("7. Notificações"),
      tableFromRows(
        ["Destinatário", "Quando", "Base legal"],
        [
          ["CNCS", "24h após conhecimento", "DL 125/2025 art. 42.º (se organização NIS2)"],
          ["CNPD", "72h, se dados pessoais potencialmente afetados", "RGPD art. 33.º"],
          ["Titulares dos dados", "Sem demora, se elevado risco", "RGPD art. 34.º"],
          ["PJ — UNC3T", "Quando se confirme natureza criminal", "DL 125/2025 art. 23.º"],
          ["Seguradora cyber", "Imediato (notificação de sinistro)", "Condições da apólice"],
          ["Clientes / parceiros B2B", "Quando serviços contratualizados sejam afetados", "SLA / contratos"],
        ],
        [2800, 3400, 2826]
      ),

      h1("8. Fase 6 — Atividade pós-incidente"),
      num("Relatório de pós-incidente (PIR) em 30 dias — usar template dedicado."),
      num("Análise de root cause (5 porquês) e documentação das técnicas ATT&CK observadas."),
      num("Atualização deste playbook com lições aprendidas."),
      num("Revisão de controlos: MFA em VPN/RDP, EDR coverage, backups imutáveis, segmentação, patching, privileged access."),
      num("Exercício de simulação com cenário derivado nos 90 dias seguintes."),

      h1("9. Checklist rápida (imprimir e afixar no war room)"),
      num("[ ] Ticket P1 aberto e war room ativo."),
      num("[ ] CISO + Direção + DPO + Jurídico notificados."),
      num("[ ] Hosts afetados isolados, SEM desligar."),
      num("[ ] Dump de memória + imagem forense preservados (cadeia de custódia)."),
      num("[ ] Backups protegidos e validados (offline/imutáveis testados)."),
      num("[ ] Amostra submetida a ID Ransomware e NoMoreRansom."),
      num("[ ] Grupo/variante identificado; técnicas ATT&CK mapeadas."),
      num("[ ] Risco regulatório avaliado (NIS2, RGPD)."),
      num("[ ] Seguradora cyber notificada."),
      num("[ ] Decisão de pagamento formalizada (qualquer que seja)."),
      num("[ ] Plano de recuperação definido por criticidade."),
      num("[ ] Comunicação interna e externa alinhada com o Plano de Comunicação de Crise."),
    ],
  });
}

// ───────────────────────────── DOC 5: Playbook Phishing ─────────────────────────────
function playbookPhishing() {
  return buildDoc({
    title: "Playbook — Phishing",
    filename: "playbook-phishing.docx",
    children: [
      ...coverBlock({
        title: "Playbook — Phishing e Comprometimento de Credenciais",
        subtitle: "Resposta a comprometimento por engenharia social",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Ativação"),
      p("Este playbook é ativado sempre que se verifique qualquer dos cenários:"),
      bul("Utilizador reporta ter clicado em link ou introduzido credenciais em formulário suspeito;"),
      bul("Filtros de email detetam campanha de phishing direcionada (mesma origem, múltiplos destinatários);"),
      bul("Credenciais corporativas encontradas em dump público (HaveIBeenPwned, DLP externa);"),
      bul("Login anómalo em serviços SaaS (geolocalização, velocidade impossível, hora anormal);"),
      bul("Alertas de EDR/IAM sobre atividade pós-login suspeita (regras de caixa de entrada, forwarding externo, OAuth grants não autorizados)."),

      h1("2. Classificação inicial"),
      bul("1-10 credenciais potencialmente comprometidas, sem uso confirmado → P3;"),
      bul("> 10 credenciais OU credencial privilegiada → P2;"),
      bul("Credencial tier 0 (Domain Admin, Enterprise Admin, administrador de tenant cloud) → P1;"),
      bul("Evidência de uso da credencial por terceiro → elevar severidade +1 nível."),

      h1("3. Contenção imediata (primeiros 30 minutos)"),
      num("Identificar todas as contas afetadas através de: reporte do utilizador, emails similares no trânsito, análise de envio pelo domínio do atacante."),
      num("Forçar reset de password em todas as contas afetadas (incluindo em Active Directory, IdP corporativo, SaaS federado)."),
      num("Revogar todas as sessões ativas (Azure AD/Entra ID: «Revoke sessions»; Google Workspace: «Sign out user»; AD: LDAP unbind)."),
      num("Revogar tokens OAuth / App passwords eventualmente concedidos a aplicações externas."),
      num("Ativar MFA nas contas afetadas, se ainda não ativo (a recuperação da credencial não mitiga se MFA estiver ausente)."),
      num("Bloquear domínio de origem nos filtros de email, proxy e DNS (incluindo variações typosquat)."),
      num("Colocar em quarentena os emails da campanha (remove from delivered items)."),

      h1("4. Investigação (primeiras 4 horas)"),
      h2("4.1 Análise de impacto"),
      tableFromRows(
        ["Pergunta", "Fonte"],
        [
          ["Quando foi o último login legítimo vs. primeiro login suspeito?", "Logs de autenticação AD / IdP"],
          ["Que aplicações foram acedidas após o comprometimento?", "Logs SaaS (O365, Google, CRM, ERP)"],
          ["Houve download ou exportação de dados?", "Audit logs, DLP, proxy"],
          ["Foram criadas regras de encaminhamento de email?", "O365: Get-InboxRule; verificar regras ocultas"],
          ["Foram concedidas permissões OAuth a aplicações terceiras?", "Azure AD Enterprise apps / Google Marketplace"],
          ["Há movimento lateral dentro da infraestrutura?", "EDR + firewall logs + AD 4624/4625"],
          ["Dados pessoais foram expostos?", "DPO + análise de conteúdo das caixas de correio"],
        ],
        [4500, 4526]
      ),
      h2("4.2 Mapeamento ATT&CK"),
      bul("T1566.001 / T1566.002 — Phishing (attachment / link);"),
      bul("T1078 — Valid Accounts;"),
      bul("T1114 — Email Collection;"),
      bul("T1098.002 — Additional Email Delegate Permissions / Forwarding Rules;"),
      bul("T1556.009 — Modify Authentication Process: Conditional Access Policies (mais avançado)."),

      h1("5. Erradicação"),
      num("Remover regras de encaminhamento e delegações não autorizadas."),
      num("Remover permissões OAuth concedidas a aplicações não confiáveis."),
      num("Se detetada persistence avançada (ex.: token theft via adversary-in-the-middle), considerar reimage do endpoint."),
      num("Verificar se o atacante criou contas secundárias ou elevou privilégios (detetar conta → reverter)."),

      h1("6. Recuperação"),
      num("Restabelecer acesso ao utilizador legítimo com password nova e MFA ativado."),
      num("Notificar o utilizador sobre o que aconteceu, o que ficou exposto e o que mudou."),
      num("Forçar reset de passwords reutilizadas noutros serviços (política de password hygiene)."),
      num("Monitorizar comportamento da conta por 30 dias com alertas reforçados."),

      h1("7. Notificação"),
      bul("Se credenciais de colaborador com acesso a dados pessoais → DPO avalia obrigação RGPD art. 33.º/34.º;"),
      bul("Se campanha externa visa a organização (spoofing do domínio) → considerar comunicação pública para alertar terceiros;"),
      bul("Se conta privilegiada confirmada comprometida com evidência de exploração → avaliar obrigação NIS2 (pode ser incidente significativo)."),

      h1("8. Lições aprendidas"),
      bul("Reforço de MFA phishing-resistant (FIDO2, WebAuthn) em contas privilegiadas;"),
      bul("Política de Conditional Access: bloquear logins de países não relevantes, exigir MFA forte;"),
      bul("Formação direcionada aos utilizadores afetados e à sua equipa;"),
      bul("Se a campanha foi sofisticada, partilha de IOCs com CNCS/CERT.PT e pares setoriais via MISP."),

      h1("9. Checklist rápida"),
      num("[ ] Contas afetadas identificadas."),
      num("[ ] Password reset + MFA forçado."),
      num("[ ] Sessões e tokens revogados."),
      num("[ ] Regras de caixa e OAuth apps auditadas."),
      num("[ ] Impacto em dados pessoais avaliado com DPO."),
      num("[ ] Domínio malicioso bloqueado."),
      num("[ ] Emails em trânsito em quarentena."),
      num("[ ] Log de autenticação 30 dias analisado."),
      num("[ ] ATT&CK mapeado e partilhado."),
      num("[ ] Lições aprendidas registadas."),
    ],
  });
}

// ───────────────────────────── DOC 6: Playbook Dados Pessoais ─────────────────────────────
function playbookDados() {
  return buildDoc({
    title: "Playbook — Violação de Dados Pessoais",
    filename: "playbook-violacao-dados-pessoais.docx",
    children: [
      ...coverBlock({
        title: "Playbook — Violação de Dados Pessoais (RGPD)",
        subtitle: "Artigos 33.º e 34.º do Regulamento (UE) 2016/679",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Ativação"),
      p("Este playbook é ativado em complemento a outros playbooks (ransomware, phishing, intrusão, insider) sempre que se verifiquem indícios de acesso, divulgação, alteração, perda ou destruição não autorizada de dados pessoais sob a responsabilidade de [Nome da organização]."),
      p([bold("Responsável primário: "), new TextRun("DPO / Encarregado da Proteção de Dados, em articulação com CISO e Jurídico.")]),

      h1("2. Fase 1 — Qualificação da violação"),
      p("Nem todo o incidente de segurança é violação de dados pessoais. Avaliar:"),
      tableFromRows(
        ["Dimensão", "Critério"],
        [
          ["Confidencialidade", "Acesso ou divulgação não autorizada a dados pessoais"],
          ["Integridade", "Alteração não autorizada"],
          ["Disponibilidade", "Perda, destruição ou inacessibilidade permanente"],
        ],
        [2000, 7026]
      ),
      p("Se nenhum destes critérios se verifica em relação a dados pessoais → não é violação de dados pessoais, apenas incidente de segurança."),

      h1("3. Fase 2 — Avaliação do risco (obrigatória)"),
      p("A obrigação de notificar depende do risco para os direitos e liberdades dos titulares, conforme a Orientação WP250 do EDPB. Fatores a considerar:"),
      bul("Tipo de violação (perda, acesso, divulgação, alteração, destruição);"),
      bul("Natureza, sensibilidade e volume dos dados (dados de saúde, financeiros, judiciais, biométricos, crianças → sensibilidade elevada);"),
      bul("Facilidade de identificação dos titulares (pseudonimização, cifra);"),
      bul("Gravidade das consequências (fraude, discriminação, dano reputacional, perda financeira, dano físico);"),
      bul("Caraterísticas especiais dos titulares (crianças, pessoas vulneráveis);"),
      bul("Caraterísticas do responsável (setor, dimensão);"),
      bul("Número de titulares afetados;"),
      bul("Duração do comprometimento (horas, dias, meses)."),

      h1("4. Fase 3 — Decisão sobre notificação"),
      h2("4.1 Notificação à CNPD (art. 33.º)"),
      tableFromRows(
        ["Cenário", "Notificar CNPD?"],
        [
          ["Sem risco para os titulares (ex.: dados cifrados sem fuga de chave; perda pontual sem sensibilidade)", "Não. Registar internamente (art. 33.º n.º 5)."],
          ["Risco para os titulares (qualquer nível superior a mínimo)", "Sim, em 72h após conhecimento."],
          ["Dúvida razoável sobre existência de risco", "Notificar preventivamente."],
        ],
        [5000, 4026]
      ),
      h2("4.2 Comunicação aos titulares (art. 34.º)"),
      tableFromRows(
        ["Cenário", "Comunicar aos titulares?"],
        [
          ["Elevado risco para direitos e liberdades (ex.: dados sensíveis expostos publicamente, fraude iminente)", "Sim, sem demora injustificada."],
          ["Risco mitigado por medidas prévias (dados cifrados com chave intacta; apagamento imediato dos canais de publicação)", "Não é exigido, mas registar justificação."],
          ["Comunicação individual exigiria esforço desproporcionado", "Pode ser substituída por comunicação pública (site, comunicado, rede social)."],
        ],
        [5000, 4026]
      ),

      h1("5. Conteúdo obrigatório da notificação à CNPD"),
      p("Conforme art. 33.º n.º 3 do RGPD, a notificação deve conter pelo menos:"),
      num("Natureza da violação, categorias e número aproximado de titulares e de registos afetados."),
      num("Nome e contactos do DPO ou ponto de contacto."),
      num("Consequências prováveis da violação."),
      num("Medidas tomadas ou propostas para corrigir e mitigar os efeitos."),
      p("Se a informação não estiver toda disponível em 72h, pode ser comunicada por fases, identificando claramente o que é estimativa preliminar."),

      h1("6. Conteúdo obrigatório da comunicação aos titulares"),
      p("Conforme art. 34.º n.º 2 do RGPD:"),
      num("Descrição em linguagem clara e simples da natureza da violação."),
      num("Contactos do DPO."),
      num("Consequências prováveis."),
      num("Medidas tomadas ou propostas para mitigar os efeitos."),
      num("Recomendações aos titulares (alterar passwords, vigiar extratos, não clicar em links suspeitos)."),

      h1("7. Registo interno"),
      p("Independentemente de existir ou não obrigação de notificação, é obrigatório manter registo interno documentando (art. 33.º n.º 5 RGPD):"),
      bul("Factos relativos à violação;"),
      bul("Efeitos;"),
      bul("Medidas corretivas adotadas;"),
      bul("Justificação de decisão de não notificar, quando aplicável."),

      h1("8. Articulação com outras obrigações"),
      bul("Se a violação decorre de incidente NIS2 → notificação paralela ao CNCS (prazos próprios);"),
      bul("Se envolve dados bancários → comunicação ao Banco de Portugal (entidades supervisionadas);"),
      bul("Se envolve saúde → articulação com ACSS/SPMS conforme aplicável;"),
      bul("Se há suspeita de crime → denúncia à Polícia Judiciária / Ministério Público."),

      h1("9. Cooperação com CNPD"),
      p("Uma vez notificada a violação, [Nome da organização] deve:"),
      bul("Responder prontamente a pedidos de esclarecimento (prazo fixado pela CNPD);"),
      bul("Fornecer relatório técnico detalhado e cronologia documentada;"),
      bul("Comunicar eventuais atualizações materiais à situação;"),
      bul("Cumprir determinações impostas pela CNPD (medidas corretivas adicionais)."),

      h1("10. Checklist rápida"),
      num("[ ] Violação qualificada (CIA + dados pessoais confirmados)."),
      num("[ ] Avaliação do risco documentada (fatores WP250)."),
      num("[ ] Decisão sobre art. 33.º tomada em ≤ 48h."),
      num("[ ] Decisão sobre art. 34.º tomada com Jurídico."),
      num("[ ] Notificação CNPD submetida em ≤ 72h (ou justificação de atraso documentada)."),
      num("[ ] Comunicação aos titulares elaborada e aprovada."),
      num("[ ] Registo interno (art. 33.º n.º 5) criado."),
      num("[ ] Articulação com CNCS/outras autoridades, se aplicável."),
      num("[ ] Follow-up documental preservado."),
    ],
  });
}

// ───────────────────────────── DOC 7: Relatório PIR ─────────────────────────────
function relatorioPIR() {
  return buildDoc({
    title: "Relatório Pós-Incidente (PIR)",
    filename: "relatorio-pos-incidente-pir.docx",
    children: [
      ...coverBlock({
        title: "Relatório Pós-Incidente (PIR)",
        subtitle: "Template para análise estruturada de incidente encerrado",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Identificação do incidente"),
      tableFromRows(
        ["Campo", "Valor"],
        [
          ["ID do incidente", "INC-[AAAA]-[####]"],
          ["Título", "[Descrição curta]"],
          ["Severidade final", "P[1-5]"],
          ["Categoria principal", "[phishing / ransomware / …]"],
          ["Deteção inicial", "[data/hora] — [fonte]"],
          ["Encerramento técnico", "[data/hora]"],
          ["Encerramento administrativo", "[data/hora]"],
          ["Líder do incidente", "[Nome]"],
          ["Autor do relatório", "[Nome]"],
          ["Revisores", "[Nomes]"],
        ],
        [3000, 6026]
      ),

      h1("2. Resumo executivo"),
      p("[Duas a três frases descrevendo o que aconteceu, o impacto agregado e o estado atual. Evitar jargão técnico nesta secção — destina-se a leitura pela Direção.]"),

      h1("3. Cronologia"),
      tableFromRows(
        ["Data/Hora (UTC)", "Evento", "Fonte / Evidência"],
        [
          ["[AAAA-MM-DD HH:MM]", "Intrusão inicial (data de compromisso estimada)", "[Log / análise]"],
          ["[…]", "Primeira deteção", "[Fonte]"],
          ["[…]", "Classificação inicial e abertura de ticket", "[Ticket ID]"],
          ["[…]", "Mobilização do CSIRT e war room", "[Ata]"],
          ["[…]", "Primeira contenção", "[Ação]"],
          ["[…]", "Notificações regulatórias (se aplicáveis)", "[CNCS / CNPD]"],
          ["[…]", "Erradicação da causa raiz", "[Evidência]"],
          ["[…]", "Recuperação de serviço", "[Confirmação]"],
          ["[…]", "Encerramento técnico", "[Validação]"],
        ],
        [2200, 4000, 2826]
      ),

      h1("4. Factos técnicos"),
      h2("4.1 Vetor inicial"),
      p("[Descrição do vetor usado para acesso inicial — phishing, exploração de vulnerabilidade, credenciais reutilizadas, supply chain, insider, etc.]"),
      h2("4.2 Técnicas ATT&CK observadas"),
      tableFromRows(
        ["Táctica (TA)", "Técnica (ID)", "Observação no incidente"],
        [
          ["Initial Access (TA0001)", "[T####.###]", "[Descrição]"],
          ["Credential Access (TA0006)", "[T####.###]", "[Descrição]"],
          ["Lateral Movement (TA0008)", "[T####.###]", "[Descrição]"],
          ["Impact (TA0040)", "[T####.###]", "[Descrição]"],
        ],
        [2800, 2000, 4226]
      ),
      h2("4.3 Indicadores de comprometimento"),
      tableFromRows(
        ["Tipo", "Valor", "Contexto"],
        [
          ["IP", "[x.x.x.x]", "[uso observado]"],
          ["Domínio", "[example.tld]", "[uso observado]"],
          ["Hash SHA-256", "[hash]", "[ficheiro associado]"],
          ["CVE", "[CVE-AAAA-####]", "[onde foi explorado]"],
        ],
        [2000, 3000, 4026]
      ),

      h1("5. Impacto"),
      tableFromRows(
        ["Dimensão", "Avaliação"],
        [
          ["Confidencialidade", "[dados expostos / não]"],
          ["Integridade", "[alterações / não]"],
          ["Disponibilidade", "[sistemas parados / duração]"],
          ["Operacional", "[processos afetados, horas-pessoa perdidas]"],
          ["Financeiro direto", "[perda estimada em EUR]"],
          ["Financeiro indireto", "[custo recuperação, consultoria, etc.]"],
          ["Regulatório", "[notificações feitas, potenciais coimas]"],
          ["Reputacional", "[cobertura mediática, reclamações de clientes]"],
        ],
        [2500, 6526]
      ),

      h1("6. Root cause analysis"),
      p("Análise de causa raiz com método «5 porquês»:"),
      num("O que aconteceu? [descrição factual]"),
      num("Porquê? [causa imediata]"),
      num("Porquê? [causa intermédia]"),
      num("Porquê? [causa estrutural]"),
      num("Porquê? [causa sistémica]"),
      p("Causa raiz identificada: [enunciado]"),

      h1("7. Resposta — o que funcionou e o que falhou"),
      tableFromRows(
        ["Aspeto", "O que funcionou", "O que falhou"],
        [
          ["Deteção", "[…]", "[…]"],
          ["Triagem e classificação", "[…]", "[…]"],
          ["Contenção", "[…]", "[…]"],
          ["Investigação", "[…]", "[…]"],
          ["Comunicação interna", "[…]", "[…]"],
          ["Comunicação externa", "[…]", "[…]"],
          ["Erradicação", "[…]", "[…]"],
          ["Recuperação", "[…]", "[…]"],
        ],
        [2200, 3400, 3426]
      ),

      h1("8. Ações corretivas"),
      tableFromRows(
        ["#", "Ação", "Responsável", "Prazo", "Estado"],
        [
          ["1", "[ação curta]", "[Nome]", "[data]", "[aberto/em curso/concluído]"],
          ["2", "[ação curta]", "[Nome]", "[data]", "[aberto/em curso/concluído]"],
          ["3", "[ação curta]", "[Nome]", "[data]", "[aberto/em curso/concluído]"],
        ],
        [600, 4000, 1800, 1400, 1226]
      ),

      h1("9. Lições aprendidas"),
      num("[lição de alto nível, com impacto em política ou arquitetura]"),
      num("[lição operacional, com impacto em playbook ou treino]"),
      num("[lição de pessoas/processo, com impacto em RACI ou comunicação]"),

      h1("10. Anexos"),
      bul("A — Logs e evidências (referência ao repositório seguro);"),
      bul("B — Atas do war room;"),
      bul("C — Notificações regulatórias submetidas;"),
      bul("D — Correspondência com fornecedores externos (DFIR, seguradora);"),
      bul("E — Mapa ATT&CK Navigator (.json)."),

      h1("11. Aprovação"),
      tableFromRows(
        ["Papel", "Nome", "Assinatura", "Data"],
        [
          ["Líder do incidente", "", "", ""],
          ["CISO", "", "", ""],
          ["Direção", "", "", ""],
        ],
        [2400, 2600, 2400, 1626]
      ),
    ],
  });
}

// ───────────────────────────── DOC 8: Comunicação de crise ─────────────────────────────
function comunicacao() {
  return buildDoc({
    title: "Plano de Comunicação de Crise",
    filename: "plano-comunicacao-crise.docx",
    children: [
      ...coverBlock({
        title: "Plano de Comunicação de Crise",
        subtitle: "Matriz de audiências, mensagens e canais durante incidentes de cibersegurança",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Objetivo"),
      p("Definir a estrutura, princípios e materiais-base de comunicação a adotar por [Nome da organização] durante um incidente de cibersegurança, interna e externamente, por forma a preservar a confiança dos stakeholders, cumprir obrigações legais e minimizar dano reputacional."),

      h1("2. Princípios"),
      bul([bold("Factos, não especulação — "), new TextRun("comunica-se o que é conhecido e validado, não o que se presume.")]),
      bul([bold("Empatia antes de tecnologia — "), new TextRun("reconhecer o impacto nas pessoas antes de discutir infraestrutura.")]),
      bul([bold("Regularidade — "), new TextRun("atualizações em intervalos acordados, mesmo que sem novidades.")]),
      bul([bold("Consistência — "), new TextRun("uma única narrativa, um único porta-voz por audiência, uma única ordem de aprovação.")]),
      bul([bold("Coerência legal — "), new TextRun("alinhamento com notificações regulatórias; evitar contradições com CNCS, CNPD ou autoridades.")]),
      bul([bold("Proteção de evidência — "), new TextRun("evitar divulgar detalhes técnicos que possam comprometer investigação em curso ou facilitar ataques subsequentes.")]),

      h1("3. Estrutura de comunicação"),
      tableFromRows(
        ["Papel", "Responsabilidade"],
        [
          ["Líder de comunicação", "Aprovar toda a comunicação externa; coordenar porta-vozes."],
          ["Porta-voz público (CEO ou designado)", "Entrevistas, comunicados, relação com média."],
          ["Porta-voz técnico (CISO)", "Briefings técnicos restritos; regulador; parceiros B2B."],
          ["Porta-voz regulatório (DPO / Jurídico)", "Notificações formais CNPD, CNCS, supervisores setoriais."],
          ["Gestor de redes sociais", "Monitorização e resposta controlada; escalada para líder."],
          ["Relação com clientes", "Comunicação a conta-chave; centro de apoio."],
        ],
        [3000, 6026]
      ),

      h1("4. Matriz audiências × canais × frequência"),
      tableFromRows(
        ["Audiência", "Canal primário", "Canal alternativo", "Frequência", "Porta-voz"],
        [
          ["Colaboradores", "Email + reunião all-hands", "Mensageria corporativa", "Imediato + diário", "CEO / CISO"],
          ["Clientes B2C", "Email + website + status page", "Redes sociais oficiais", "Imediato + a cada update material", "Líder comunicação"],
          ["Clientes B2B (contas-chave)", "Contacto dedicado + call", "Email executivo", "Imediato + diário", "Account manager + CISO"],
          ["Parceiros e fornecedores", "Email + call", "Portal de parceiros", "Diário", "Líder comunicação"],
          ["Média / imprensa", "Comunicado oficial", "Briefing dedicado", "Conforme necessidade", "Porta-voz público"],
          ["Redes sociais (público)", "Post oficial pinned", "Respostas controladas", "A cada update material", "Gestor de redes"],
          ["Reguladores — CNCS", "Canal oficial de notificação", "Contacto telefónico direto", "24h / 72h / 30 dias", "DPO / Jurídico / CISO"],
          ["Reguladores — CNPD", "Formulário online", "Email oficial", "72h (RGPD)", "DPO"],
          ["Autoridades judiciais", "Comunicação formal PJ/MP", "Via Jurídico", "Conforme instrução", "Jurídico"],
          ["Acionistas / mercado", "Comunicado CMVM (se aplicável)", "Via relações com investidores", "Quando material", "Porta-voz público"],
          ["Seguradora cyber", "Notificação de sinistro", "Call com underwriter", "Imediato", "CISO / Jurídico"],
        ],
        [2000, 1800, 1800, 1800, 1626]
      ),

      h1("5. Mensagens-tipo por fase"),

      h2("5.1 Alerta inicial (interno)"),
      p(italic("Assunto: [URGENTE] Incidente de cibersegurança em curso — instruções para colaboradores")),
      p("Prezados colaboradores,"),
      p("Foi detetado um incidente de cibersegurança que está a ser gerido pela equipa de resposta. Para proteger a [Nome da organização] e os nossos dados, pedimos que:"),
      bul("[instrução 1, ex.: não abrir novos emails com anexos até segunda ordem];"),
      bul("[instrução 2, ex.: reportar qualquer comportamento anómalo para csirt@organização];"),
      bul("[instrução 3, ex.: seguir as orientações da sua chefia direta]."),
      p("Próxima atualização: [data/hora]. Obrigado pela colaboração."),

      h2("5.2 Comunicação a clientes (genérica, fase inicial)"),
      p(italic("Assunto: Informação sobre incidente de segurança")),
      p("Estimado(a) Cliente,"),
      p("Informamos que detetámos no dia [data] um incidente de segurança que afeta [descrição neutra do serviço afetado]. A equipa de segurança de [Nome da organização] está a trabalhar na resolução, em articulação com especialistas externos e com as autoridades competentes."),
      p("Neste momento, [indicar ações que o cliente deve ou não deve tomar — ex.: não são necessárias ações adicionais; ou recomendamos alterar a password]."),
      p("Comprometemo-nos a manter-vos informados com a maior brevidade. A proteção dos vossos dados é a nossa prioridade. Para qualquer esclarecimento, contactem-nos através de [canal]."),
      p("Atentamente, [Nome da organização]"),

      h2("5.3 Comunicado à imprensa (holding statement)"),
      p(italic("Uso: primeiras horas, quando os factos ainda não estão consolidados.")),
      p("A [Nome da organização] confirma estar a gerir um incidente de cibersegurança identificado em [data]. A equipa de segurança, em articulação com peritos externos e com as autoridades competentes, está a conduzir a investigação e a implementar as medidas de contenção necessárias. A [Nome da organização] está comprometida com a proteção dos seus clientes, colaboradores e parceiros, e comunicará atualizações assim que tenha informação verificada. Para pedidos de informação, contactar [media@organização]."),

      h2("5.4 Notificação regulatória a titulares (RGPD art. 34.º)"),
      p("Formato individual ou público, em linguagem clara e simples. Conteúdo mínimo obrigatório:"),
      num("O que aconteceu (natureza da violação)."),
      num("Que dados foram afetados (sem divulgar dados pessoais de terceiros)."),
      num("Quais as consequências prováveis."),
      num("O que [Nome da organização] está a fazer para mitigar."),
      num("O que o titular deve fazer (alterar password; vigiar conta; etc.)."),
      num("Contacto do DPO para esclarecimentos adicionais."),

      h1("6. Redes sociais — regras de engagement"),
      bul([bold("Fazer: "), new TextRun("publicar uma única mensagem oficial pinned; atualizar com factos; mostrar responsabilidade.")]),
      bul([bold("Não fazer: "), new TextRun("responder a speculação; entrar em debate técnico público; prometer prazos não validados.")]),
      bul([bold("Monitorizar: "), new TextRun("menções à organização, trending de keywords, tentativas de impersonation.")]),
      bul([bold("Escalar: "), new TextRun("qualquer pedido de entrevista, qualquer jornalista, qualquer mensagem de ator de ameaça → líder de comunicação.")]),

      h1("7. War room — organização logística"),
      bul("Sala física principal + sala espelho virtual (Teams/Zoom dedicada, sem gravação automática);"),
      bul("Canal de texto dedicado (ex.: Slack/Teams #war-room) com histórico preservado;"),
      bul("Quadro visual (físico ou Miro) com cronologia viva e decisões tomadas;"),
      bul("Designar «scribe» para ata; rotativo de 4 em 4 horas;"),
      bul("Briefings sincronizados a cada 2h (P1), 4h (P2), diários (P3)."),

      h1("8. Checklist rápida do líder de comunicação"),
      num("[ ] Holding statement aprovado e pronto a publicar."),
      num("[ ] Porta-vozes designados e briefados."),
      num("[ ] FAQ interna atualizada para helpdesk."),
      num("[ ] Status page / website atualizados."),
      num("[ ] Redes sociais em modo vigilância reforçada."),
      num("[ ] Jurídico e DPO alinhados com narrativa e notificações."),
      num("[ ] Cronograma de atualizações acordado."),
      num("[ ] Log de aprovação de cada peça de comunicação."),
    ],
  });
}

// ───────────────────────────── main ─────────────────────────────
async function main() {
  await politica();
  await classificacao();
  await escalonamento();
  await playbookRansomware();
  await playbookPhishing();
  await playbookDados();
  await relatorioPIR();
  await comunicacao();
  console.log("[DONE] 8 templates generated in docs/gestao_incidentes/");
}

main().catch((e) => { console.error(e); process.exit(1); });
