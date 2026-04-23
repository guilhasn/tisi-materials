#!/usr/bin/env node
/*
 * Generate 4 CSIRT establishment templates (.docx).
 * Aligned with visual style of generate-ih-templates.js.
 * Placeholder: [Nome da organização].
 *
 * 1. CSIRT Charter / Plano de Estabelecimento
 * 2. RFC 2350 — Service Description
 * 3. Terms of Reference (multi-team association)
 * 4. Service Catalog FIRST v2.1
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, TabStopType,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
} = require("docx");

// ────────── shared style (copy of generate-ih-templates.js helpers) ──────────
const BRAND = "2E75B6";
const LIGHT = "D5E8F0";
const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const BORDERS = { top: border, bottom: border, left: border, right: border };
const CELL_MARGINS = { top: 80, bottom: 80, left: 120, right: 120 };

const PAGE = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
};
const CONTENT_WIDTH = 9026;

const DEFAULT_STYLES = {
  default: { document: { run: { font: "Arial", size: 22 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 32, bold: true, font: "Arial", color: BRAND },
      paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 26, bold: true, font: "Arial", color: BRAND },
      paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: "Arial" },
      paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
  ],
};
const NUMBERING = {
  config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ],
};

const p = (text, opts = {}) => new Paragraph({
  children: Array.isArray(text) ? text : [new TextRun(text)],
  spacing: { after: 120 },
  ...opts,
});
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const bul = (t) => new Paragraph({ numbering: { reference: "bul", level: 0 }, children: [new TextRun(t)] });
const num = (t) => new Paragraph({ numbering: { reference: "num", level: 0 }, children: [new TextRun(t)] });
const spacer = (after = 200) => new Paragraph({ spacing: { after }, children: [new TextRun("")] });
const bold = (t) => new TextRun({ text: t, bold: true });
const ital = (t) => new TextRun({ text: t, italics: true, color: "666666" });

// Italic instruction paragraph (grey text) — to guide filling in
const instr = (t) => new Paragraph({
  spacing: { after: 160 },
  children: [new TextRun({ text: t, italics: true, color: "666666", size: 20 })],
});

const cell = (content, opts = {}) => {
  const children = Array.isArray(content) ? content : [new Paragraph({ children: [new TextRun(String(content))] })];
  return new TableCell({
    borders: BORDERS, margins: CELL_MARGINS,
    width: { size: opts.w, type: WidthType.DXA },
    shading: opts.header ? { fill: BRAND, type: ShadingType.CLEAR, color: "auto" }
           : (opts.alt ? { fill: LIGHT, type: ShadingType.CLEAR, color: "auto" } : undefined),
    children: children.map(c => c instanceof Paragraph ? c : new Paragraph({ children: [typeof c === "string" ? new TextRun(opts.header ? { text: c, bold: true, color: "FFFFFF" } : c) : c] })),
    verticalAlign: "center",
  });
};

function tableFromRows(headers, rows, widths) {
  const total = widths.reduce((a, b) => a + b, 0);
  const head = new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, { w: widths[i], header: true })) });
  const dataRows = rows.map((r, ri) => new TableRow({ children: r.map((v, i) => cell(v, { w: widths[i], alt: ri % 2 === 1 })) }));
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: widths, rows: [head, ...dataRows] });
}

function coverBlock({ title, subtitle, version = "1.0", date = "abril de 2026", classification = "Confidencial" }) {
  return [
    new Paragraph({ spacing: { after: 1200 }, children: [new TextRun("")] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "[Nome da organização]", italics: true, size: 28, color: "666666" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: title, bold: true, size: 44, color: BRAND })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 800 }, children: [new TextRun({ text: subtitle, italics: true, size: 24, color: "333333" })] }),
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
  return new Header({ children: [new Paragraph({
    alignment: AlignmentType.RIGHT,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND, space: 1 } },
    children: [new TextRun({ text: `[Nome da organização] — ${title}`, size: 18, color: "666666" })],
  })] });
}

function docFooter() {
  return new Footer({ children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
    children: [
      new TextRun({ text: "Classificação: Confidencial", size: 18, color: "666666" }),
      new TextRun({ text: "\tPágina ", size: 18, color: "666666" }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "666666" }),
      new TextRun({ text: " de ", size: 18, color: "666666" }),
      new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "666666" }),
    ],
  })] });
}

function buildDoc({ title, filename, children, classification = "Confidencial" }) {
  const doc = new Document({
    styles: DEFAULT_STYLES, numbering: NUMBERING,
    sections: [{ properties: { page: PAGE }, headers: { default: docHeader(title) }, footers: { default: docFooter() }, children }],
  });
  return Packer.toBuffer(doc).then((buf) => {
    const out = path.join(__dirname, "..", "docs", "gestao_incidentes", filename);
    fs.writeFileSync(out, buf);
    console.log(`[OK] ${filename} (${(buf.length / 1024).toFixed(1)} KB)`);
  });
}

// ═══════════════════════ DOC 1 — CSIRT Charter ═══════════════════════
function charter() {
  return buildDoc({
    title: "CSIRT Charter / Plano de Estabelecimento",
    filename: "csirt-charter.docx",
    children: [
      ...coverBlock({
        title: "CSIRT Charter / Plano de Estabelecimento",
        subtitle: "Documento formal de estabelecimento do Computer Security Incident Response Team — alinhado com SEI CSIRT Handbook, FIRST v2.1 e DL 125/2025 (NIS2 PT)",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      h1("1. Sumário executivo"),
      instr("Resumo de 1 parágrafo destinado a gestão de topo: porque é que o CSIRT é criado, a quem serve e que valor traz. Máx. 150 palavras."),
      p("[Escrever o sumário executivo aqui.]"),

      h1("2. Missão"),
      h2("2.1 Declaração de missão (Mission Statement)"),
      instr("Texto de 3-4 frases que responde a «Porquê existimos?». Deve ser não-ambíguo, imperativo e alinhado com a missão da organização-mãe."),
      p("[Declaração de missão — 3 a 4 frases.]"),
      h2("2.2 Alinhamento estratégico"),
      instr("Como esta missão reforça os objetivos estratégicos de [Nome da organização]? Referenciar plano estratégico, política de segurança, obrigações regulatórias."),
      p("[Descrever alinhamento aqui.]"),

      h1("3. Constituinte"),
      h2("3.1 Definição de perímetro"),
      tableFromRows(
        ["Dimensão", "Descrição"],
        [
          ["Sistemas e redes", "[ex.: todos os sistemas de informação de [Nome da organização]]"],
          ["Serviços", "[ex.: portal do cidadão, ERP, serviços SaaS contratados]"],
          ["Utilizadores", "[ex.: colaboradores internos, prestadores, stakeholders externos]"],
          ["Geografia", "[ex.: sede + unidades remotas em [locais]]"],
          ["Exclusões explícitas", "[ex.: sistemas de uma filial com CSIRT próprio]"],
        ],
        [2400, 6626]
      ),
      h2("3.2 Natureza da constituinte"),
      instr("Marcar a opção aplicável. Interna, externa ou ambas."),
      bul("☐ Interna — apenas à organização-mãe"),
      bul("☐ Externa — organizações contratantes"),
      bul("☐ Ambas"),
      h2("3.3 Tipo"),
      instr("Seleccionar o tipo predominante conforme o capítulo CSIRT."),
      bul("☐ Enterprise   ☐ Setor   ☐ Infraestrutura crítica   ☐ Produto (PSIRT)   ☐ Nacional   ☐ Cliente"),

      h1("4. Posição organizacional e autoridade"),
      h2("4.1 Localização no organograma"),
      instr("Descrever onde o CSIRT está posicionado. A quem reporta hierarquicamente."),
      p("[Localização e reporting line — por exemplo: reporta ao CISO; CISO reporta à Comissão Executiva.]"),
      h2("4.2 Níveis de autoridade por tipo de ação"),
      instr("Para cada tipo de ação, indicar o nível de autoridade: (F) Full — decide e atua; (S) Shared — participa na decisão; (N) None — apenas aconselha."),
      tableFromRows(
        ["Ação", "Nível (F/S/N)", "Decisor final"],
        [
          ["Isolar endpoint com comportamento C2", "", ""],
          ["Bloquear domínio/IP no proxy ou firewall", "", ""],
          ["Desligar serviço produtivo por suspeita de comprometimento", "", ""],
          ["Reset de credenciais privilegiadas", "", ""],
          ["Notificação ao CNCS (NIS2)", "", ""],
          ["Notificação à CNPD (RGPD)", "", ""],
          ["Notificação aos titulares de dados", "", ""],
          ["Ativação do BCP/DRP", "", ""],
          ["Decisão sobre pagamento de resgate", "", ""],
          ["Comunicação externa a média", "", ""],
          ["Acionamento de fornecedor DFIR externo", "", ""],
          ["Contacto com autoridades (PJ, MP)", "", ""],
        ],
        [4500, 1500, 3026]
      ),
      h2("4.3 Mandato formal"),
      instr("Citar a deliberação ou ordem de serviço que formaliza este mandato."),
      p("[Referência à deliberação de Direção / ordem de serviço que cria formalmente o CSIRT.]"),

      h1("5. Modelo organizacional"),
      h2("5.1 Modelo seleccionado"),
      instr("Seleccionar um dos 5 modelos. Consultar o capítulo CSIRT para detalhe."),
      bul("☐ Security Team (ad-hoc)"),
      bul("☐ Internal Distributed"),
      bul("☐ Internal Centralized"),
      bul("☐ Combined Distributed & Centralized"),
      bul("☐ Coordinating"),
      h2("5.2 Justificação"),
      instr("Explicar porque este modelo é o mais adequado à dimensão, distribuição geográfica, maturidade e orçamento de [Nome da organização]."),
      p("[Justificação da escolha — 150-250 palavras.]"),

      h1("6. Carteira de serviços"),
      p("Os serviços oferecidos pelo CSIRT de [Nome da organização] agrupam-se segundo o FIRST CSIRT Services Framework v2.1."),
      h2("6.1 Serviços reativos"),
      bul("☐ Incident Handling"),
      bul("☐ Alerts & Warnings"),
      bul("☐ Vulnerability Handling"),
      bul("☐ Artefact Handling"),
      h2("6.2 Serviços proativos"),
      bul("☐ Technology Watch"),
      bul("☐ Announcements"),
      bul("☐ Intrusion Detection"),
      bul("☐ Security Tool Development"),
      bul("☐ Information Dissemination"),
      bul("☐ Audits & Assessments"),
      h2("6.3 Gestão da qualidade de segurança"),
      bul("☐ Risk Analysis"),
      bul("☐ Business Continuity Planning"),
      bul("☐ Security Consulting"),
      bul("☐ Education / Awareness"),
      bul("☐ Product Evaluation"),
      instr("Para catálogo detalhado por serviço, usar o template «CSIRT Service Catalog FIRST v2.1»."),

      h1("7. Relações externas"),
      h2("7.1 CSIRTs pares"),
      tableFromRows(
        ["Equipa", "Tipo de relação", "Base legal", "Contacto"],
        [["[Ex.: CNCS]", "[Bilateral / Associação]", "[NDA / MOU / nenhuma]", "[email / telefone]"]],
        [2400, 2400, 2200, 2026]
      ),
      h2("7.2 Membership em associações"),
      bul("☐ FIRST (Forum of Incident Response and Security Teams)"),
      bul("☐ TF-CSIRT (Task Force CSIRT Coordination)"),
      bul("☐ Rede Nacional de CSIRTs (CNCS)"),
      bul("☐ ISAC setorial: [especificar]"),
      bul("☐ Outros: [especificar]"),
      h2("7.3 Autoridades"),
      bul("Centro Nacional de Cibersegurança (CNCS) — cert.pt@cncs.gov.pt"),
      bul("Comissão Nacional de Proteção de Dados (CNPD) — [canal de notificação]"),
      bul("Polícia Judiciária — UNC3T"),
      bul("[Regulador setorial aplicável, se houver]"),

      h1("8. Recursos"),
      h2("8.1 Equipa"),
      tableFromRows(
        ["Nível", "Papel", "FTE previsto", "Modelo"],
        [
          ["L1", "Security Analyst", "[n]", "[Interno / MSSP / híbrido]"],
          ["L2", "Senior Security Analyst", "[n]", "[Interno / MSSP / híbrido]"],
          ["L3", "Security Manager / Threat Hunter", "[n]", "[Interno / MSSP / híbrido]"],
          ["L4", "CISO", "1", "Interno"],
        ],
        [1200, 4000, 1400, 2426]
      ),
      h2("8.2 Tecnologia (investimento previsto)"),
      tableFromRows(
        ["Categoria", "Ferramenta", "Custo anual (€)"],
        [
          ["SIEM", "[ex.: Wazuh / Splunk / Sentinel]", ""],
          ["EDR", "[ex.: CrowdStrike / Defender]", ""],
          ["Case management", "[ex.: TheHive / RTIR]", ""],
          ["Threat intel", "[ex.: MISP + feeds]", ""],
          ["Forense digital", "[ex.: licenças KAPE / Velociraptor]", ""],
          ["Outros", "", ""],
        ],
        [2500, 4000, 2526]
      ),
      h2("8.3 Orçamento total anual"),
      instr("Soma dos custos com pessoas + tecnologia + formação + retainers externos."),
      p("[Total estimado: € XX XXX / ano]"),

      h1("9. Governação e métricas"),
      h2("9.1 Indicadores-chave (KPIs)"),
      tableFromRows(
        ["KPI", "Meta", "Periodicidade"],
        [
          ["MTTD — Mean Time to Detect", "[< X horas]", "Mensal"],
          ["MTTR — Mean Time to Respond", "[< X horas]", "Mensal"],
          ["% de incidentes dentro do SLA", "[> X%]", "Mensal"],
          ["Número de exercícios realizados/ano", "[≥ X]", "Anual"],
          ["Coverage ATT&CK (% de técnicas detectáveis)", "[> X%]", "Trimestral"],
          ["Nº de relatórios pós-incidente (PIR) entregues", "[100% dos P1/P2]", "Mensal"],
        ],
        [4500, 2500, 2026]
      ),
      h2("9.2 Revisões"),
      bul("Revisão técnica menor — semestral — Responsável: Coordenador CSIRT"),
      bul("Revisão completa — anual — Responsáveis: CISO + Direção"),
      bul("Revisão extraordinária — após incidente grave, mudança organizacional ou alteração regulatória"),
      h2("9.3 Auditoria"),
      instr("Periodicidade e responsáveis da auditoria externa / interna (ISO 27001, SOC2, DORA, NIS2)."),
      p("[Descrever regime de auditoria aplicável.]"),

      h1("10. Aprovação"),
      p("Este documento entra em vigor na data de aprovação."),
      spacer(400),
      tableFromRows(
        ["Papel", "Nome", "Assinatura", "Data"],
        [
          ["CEO / Administração", "", "", ""],
          ["CISO", "", "", ""],
          ["DPO", "", "", ""],
          ["Jurídico", "", "", ""],
          ["Coordenador CSIRT", "", "", ""],
        ],
        [2400, 2500, 2200, 1926]
      ),
    ],
  });
}

// ═══════════════════════ DOC 2 — RFC 2350 ═══════════════════════
function rfc2350() {
  return buildDoc({
    title: "RFC 2350 — Service Description",
    filename: "csirt-rfc2350.docx",
    classification: "Público",
    children: [
      ...coverBlock({
        title: "RFC 2350 — Service Description",
        subtitle: "Descrição pública do CSIRT conforme o padrão IETF RFC 2350 — Expectations for Computer Security Incident Response",
        classification: "Público",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      p([bold("Documento público. "), new TextRun("Destinado a ser publicado no site institucional de [Nome da organização] e partilhado com outros CSIRTs, constituintes e potenciais parceiros. Requerido para admissão na FIRST e na TF-CSIRT.")]),

      h1("1. Document Information"),
      h2("1.1 Date of Last Update"),
      p("[AAAA-MM-DD]"),
      h2("1.2 Distribution List for Notifications"),
      instr("Listar listas de mailing internas e externas que são notificadas quando o documento é actualizado."),
      bul("Lista interna: [mail-list]"),
      bul("Distribuição a CSIRTs pares via FIRST / TF-CSIRT (quando aplicável)"),
      h2("1.3 Locations where this Document May Be Found"),
      p("URL oficial: https://[Nome da organização]/csirt/rfc2350"),
      p("Versão PDF assinada: https://[Nome da organização]/csirt/rfc2350.pdf"),
      h2("1.4 Authenticating this Document"),
      instr("Hash e/ou assinatura PGP do documento. Chave pública do CSIRT em keyserver."),
      p("SHA-256: [hash do ficheiro PDF oficial]"),
      p("Assinado com PGP pela chave do CSIRT (ID: [0xXXXXXXXX])."),

      h1("2. Contact Information"),
      h2("2.1 Name of the Team"),
      p("Nome completo: [Nome Completo do CSIRT, ex.: CSIRT de Vila Feliz]"),
      p("Sigla: [SIGLA, ex.: VF-CSIRT]"),
      h2("2.2 Address"),
      p("[Nome da organização]"),
      p("[Morada]"),
      p("[Código-postal] [Localidade], Portugal"),
      h2("2.3 Time Zone"),
      p("WET / WEST (Europe/Lisbon — UTC+0/+1)"),
      h2("2.4 Telephone Number"),
      p("+351 [número] (horário laboral, GMT 09h00-18h00)"),
      p("+351 [número 24/7] (fora do horário, apenas emergências)"),
      h2("2.5 Facsimile Number"),
      p("N/A"),
      h2("2.6 Other Telecommunication"),
      p("[Signal / Element / etc., se aplicável]"),
      h2("2.7 Electronic Mail Address"),
      p("Reporte de incidentes: csirt@[organização]"),
      p("Questões administrativas: csirt-admin@[organização]"),
      p("Abuse (conforme RIPE): abuse@[organização]"),
      h2("2.8 Public Keys and Encryption Information"),
      p("Key ID: [0xXXXXXXXX]"),
      p("Fingerprint: [XXXX XXXX XXXX XXXX XXXX  XXXX XXXX XXXX XXXX XXXX]"),
      p("Disponível em: https://keys.openpgp.org/ e no site do CSIRT."),
      h2("2.9 Team Members"),
      instr("Listar ou indicar onde está a lista (por exemplo, link para página web com equipa)."),
      p("Responsável: [Nome, Título]"),
      p("Equipa completa: ver https://[Nome da organização]/csirt/equipa"),
      h2("2.10 Other Information"),
      p("Site oficial: https://[Nome da organização]/csirt"),
      p("Publicações e avisos: https://[Nome da organização]/csirt/avisos"),
      h2("2.11 Points of Customer Contact"),
      p("O canal preferido é email cifrado com PGP para csirt@[organização]. Para emergências em horário não-laboral, usar o número +351 [24/7]."),

      h1("3. Charter"),
      h2("3.1 Mission Statement"),
      instr("Copiar aqui o Mission Statement do CSIRT Charter — 3 a 4 frases."),
      p("[Declaração de missão.]"),
      h2("3.2 Constituency"),
      instr("Descrever de forma precisa a constituinte — gamas de IPs, domínios, ASNs, colaboradores. Esta informação é pública."),
      p("A constituinte do [Nome do CSIRT] é composta por:"),
      bul("Todos os utilizadores internos e sistemas da [Nome da organização];"),
      bul("Domínio(s): [organização.pt, organização.com, ...];"),
      bul("ASN: [ASxxxxx] (se aplicável);"),
      bul("Gamas de IP: [IPv4 ranges] e [IPv6 ranges];"),
      bul("Exclusões explícitas: [ex.: subsidiária X que tem CSIRT próprio]."),
      h2("3.3 Sponsorship and/or Affiliation"),
      p("[Nome do CSIRT] é patrocinado e alojado por [Nome da organização]. Afiliações ativas:"),
      bul("FIRST: [ativo / pendente / não aplicável]"),
      bul("TF-CSIRT Trusted Introducer: [listed / accredited / certified / não aplicável]"),
      bul("Rede Nacional de CSIRTs (CNCS): [ativo / não aplicável]"),
      h2("3.4 Authority"),
      instr("Descrever a autoridade real do CSIRT perante a constituinte. Evitar ambiguidade."),
      p("[Nome do CSIRT] opera sob mandato da Direção de [Nome da organização], com autoridade para coordenar a resposta a incidentes de cibersegurança. Decisões que afetem diretamente sistemas produtivos requerem articulação com os respectivos process owners. Ver matriz de autoridade no CSIRT Charter (documento interno)."),

      h1("4. Policies"),
      h2("4.1 Types of Incidents and Level of Support"),
      p("O CSIRT trata os seguintes tipos de incidentes afetando a sua constituinte, por ordem de prioridade:"),
      tableFromRows(
        ["Prioridade", "Tipo de incidente", "Nível de suporte"],
        [
          ["P1", "Ransomware; comprometimento de contas privilegiadas; violação massiva de dados", "Resposta 24/7; equipa completa mobilizada"],
          ["P2", "Phishing com comprometimento confirmado; malware em múltiplos endpoints; DDoS sustentado", "Resposta em ≤ 1h; CISO notificado"],
          ["P3", "Phishing limitado; malware contido; vulnerabilidade crítica exposta", "Resposta em ≤ 4h em horário laboral"],
          ["P4-P5", "Incidentes de baixo impacto; falsos positivos; reportes voluntários", "Resposta em ≤ 1 dia útil"],
        ],
        [1000, 4000, 4026]
      ),
      h2("4.2 Co-operation, Interaction and Disclosure of Information"),
      p("O [Nome do CSIRT] reconhece a importância da cooperação operacional e da partilha de informação. A cooperação rege-se pelos seguintes princípios:"),
      bul("Partilha de informação segundo o Traffic Light Protocol (TLP) v2.0;"),
      bul("Confidencialidade: informação do constituinte não é divulgada sem autorização formal;"),
      bul("Cooperação pro-activa com CNCS e outros CSIRTs nacionais e internacionais;"),
      bul("Respeito pela legislação aplicável (RGPD, DL 125/2025, Lei do Cibercrime)."),
      h2("4.3 Communication and Authentication"),
      p("Para comunicação sensível é obrigatório o uso de PGP/GPG com a chave pública publicada (secção 2.8). Para comunicação menos sensível, email ou telefone são aceitáveis. Em caso de dúvida sobre autenticidade de uma mensagem, o constituinte deve confirmar por telefone."),

      h1("5. Services"),
      h2("5.1 Incident Response"),
      h3("5.1.1 Incident Triage"),
      bul("Investigação de existência do incidente;"),
      bul("Determinação da extensão;"),
      bul("Prioridade inicial."),
      h3("5.1.2 Incident Coordination"),
      bul("Coordenação com constituintes internos;"),
      bul("Coordenação com CSIRTs externos;"),
      bul("Comunicação com autoridades (CNCS, CNPD, PJ)."),
      h3("5.1.3 Incident Resolution"),
      bul("Apoio técnico a constituinte na contenção, erradicação e recuperação;"),
      bul("Análise forense (em casos P1/P2);"),
      bul("Relatório pós-incidente (PIR)."),
      h2("5.2 Proactive Activities"),
      bul("Alerts & Warnings (publicação regular de avisos de segurança);"),
      bul("Technology Watch (monitorização do threat landscape);"),
      bul("Vulnerability handling;"),
      bul("Awareness e formação aos constituintes;"),
      bul("Participação em exercícios nacionais e setoriais."),

      h1("6. Incident Reporting Forms"),
      p("Não são usados formulários específicos. Reportes de incidentes devem incluir, sempre que possível:"),
      num("Informação de contacto e método preferido para resposta;"),
      num("Sistemas afectados (IPs, hostnames, aplicações);"),
      num("Data/hora do incidente e detecção;"),
      num("Descrição do incidente;"),
      num("Ações já tomadas;"),
      num("Ficheiros ou logs relevantes (anexados cifrados com PGP se sensíveis)."),
      spacer(200),
      p("Reportes podem ser enviados para csirt@[organização], preferencialmente cifrados com PGP."),

      h1("7. Disclaimers"),
      p("Embora sejam tomadas todas as precauções na preparação da informação, notificações e alertas do [Nome do CSIRT], o CSIRT não assume responsabilidade por erros ou omissões, nem por danos resultantes do uso da informação aqui contida. A informação é fornecida «tal como está», sem garantias."),
    ],
  });
}

// ═══════════════════════ DOC 3 — Terms of Reference ═══════════════════════
function termsOfReference() {
  return buildDoc({
    title: "Terms of Reference — Associação CSIRT",
    filename: "csirt-terms-of-reference.docx",
    children: [
      ...coverBlock({
        title: "Terms of Reference",
        subtitle: "Instrumento constitutivo de uma associação de CSIRTs (fórum, task force, coligação) — base legal para cooperação multi-team",
      }),
      new Paragraph({ children: [new PageBreak()] }),
      ...versionTable(),

      p([bold("Quando usar este template: "), new TextRun("para formalizar uma associação multi-team de CSIRTs (fórum setorial, task force regional, coligação temática). Para acordos bilaterais team-to-team, usar NDA ou MOU em lugar deste documento.")]),

      h1("1. Contexto e enquadramento"),
      instr("Breve contexto que justifica a criação da associação. O que motiva? Que lacuna preenche?"),
      p("[Descrição do contexto — ex.: «Entre 2024 e 2026, incidentes em municípios portugueses cresceram 300%. Os CSIRTs municipais existentes operam isolados, sem partilha sistemática de IOCs. Esta associação visa fechar essa lacuna.»]"),

      h1("2. Visão"),
      instr("Estado futuro desejado, em 1 frase aspiracional."),
      p("[Ex.: «Uma rede de CSIRTs municipais que partilham inteligência em tempo real, respondem coordenadamente a campanhas de ameaça, e elevam conjuntamente a maturidade de cibersegurança da administração local portuguesa.»]"),

      h1("3. Missão e objetivos"),
      h2("3.1 Missão"),
      p("[Ex.: «Coordenar a resposta a incidentes, partilhar inteligência e desenvolver capacidade coletiva entre os CSIRTs municipais portugueses.»]"),
      h2("3.2 Objetivos específicos"),
      num("[Ex.: Estabelecer canais seguros de partilha de IOCs em < 1h entre membros;]"),
      num("[Ex.: Realizar ≥ 2 exercícios tabletop conjuntos por ano;]"),
      num("[Ex.: Publicar relatório anual de ameaças relevantes ao setor municipal;]"),
      num("[Ex.: Facilitar adesão dos membros à FIRST e à TF-CSIRT;]"),
      num("[Ex.: Desenvolver playbooks comuns para incidentes típicos do setor.]"),

      h1("4. Âmbito e abrangência"),
      h2("4.1 Âmbito"),
      bul("Cooperação operacional em incidentes;"),
      bul("Partilha de threat intelligence;"),
      bul("Desenvolvimento de capacidades (formação, exercícios);"),
      bul("Representação coletiva perante autoridades (CNCS, reguladores)."),
      h2("4.2 Fora do âmbito"),
      bul("[Ex.: Negociação de contratos comerciais em nome dos membros;]"),
      bul("[Ex.: Ação de marketing conjunta.]"),

      h1("5. Stakeholders e constituinte"),
      h2("5.1 Constituinte primária"),
      p("[Descrever que tipo de CSIRT pode ser membro. Ex.: CSIRTs de municípios portugueses, independentemente da dimensão.]"),
      h2("5.2 Stakeholders externos"),
      bul("Centro Nacional de Cibersegurança (CNCS) — coordenação nacional;"),
      bul("Associação Nacional de Municípios Portugueses (ANMP);"),
      bul("Direção-Geral das Autarquias Locais (DGAL);"),
      bul("Reguladores setoriais, quando aplicável;"),
      bul("FIRST e TF-CSIRT — referências internacionais."),

      h1("6. Estrutura organizacional"),
      h2("6.1 Steering Committee"),
      instr("Órgão máximo de decisão estratégica. Composição típica: representantes dos membros fundadores, mandato de 2 anos renovável."),
      bul("Composição: [ex.: 5 membros eleitos entre os CSIRTs fundadores]"),
      bul("Mandato: [ex.: 2 anos, renovável uma vez]"),
      bul("Competência: estratégia, orçamento, aprovação de planos anuais, admissão/saída de membros"),
      h2("6.2 Working Groups"),
      tableFromRows(
        ["Working Group", "Missão", "Coordenador"],
        [
          ["WG Threat Intel", "Partilha de IOCs, alertas, análise conjunta", "[Nome]"],
          ["WG Exercises", "Planeamento e execução de exercícios", "[Nome]"],
          ["WG Playbooks", "Desenvolvimento de playbooks comuns", "[Nome]"],
          ["WG Capacitação", "Formação, mentoria de CSIRTs menos maduros", "[Nome]"],
        ],
        [3000, 4500, 1526]
      ),
      h2("6.3 Secretariado"),
      p("Função de apoio operacional à associação — comunicações, logística de reuniões, gestão documental. Pode ser rotativo entre membros ou delegado a uma entidade externa."),

      h1("7. Papéis e responsabilidades"),
      tableFromRows(
        ["Papel", "Responsabilidade principal"],
        [
          ["Presidente do Steering Committee", "Representação externa; liderança das reuniões"],
          ["Vice-presidente", "Substitui o presidente"],
          ["Tesoureiro / Responsável financeiro", "Gestão orçamental (se houver)"],
          ["Coordenador de WG", "Liderança operacional do grupo de trabalho"],
          ["Membros", "Participação ativa; cumprimento das obrigações de partilha"],
          ["Secretariado", "Apoio administrativo"],
        ],
        [3000, 6026]
      ),

      h1("8. Processo de decisão"),
      bul("Decisões estratégicas: maioria qualificada (2/3 dos membros do Steering Committee);"),
      bul("Decisões operacionais: consenso nos WGs, por decisão do coordenador em caso de impasse;"),
      bul("Admissão de novos membros: aprovação unânime do Steering Committee;"),
      bul("Exclusão de membro: maioria qualificada com direito a audição."),

      h1("9. Membership"),
      h2("9.1 Critérios de admissão"),
      num("Existência formal do CSIRT (Charter aprovado);"),
      num("RFC 2350 publicado;"),
      num("Compromisso com partilha de informação sob TLP;"),
      num("Aceitação dos presentes Terms of Reference."),
      h2("9.2 Tipos de membro"),
      bul([bold("Full Member: "), new TextRun("participa em todas as atividades, voz e voto no Steering Committee.")]),
      bul([bold("Observer: "), new TextRun("acesso limitado a informação TLP:AMBER+, sem voto.")]),
      bul([bold("Associated Partner: "), new TextRun("entidades externas (CNCS, ANMP) com participação pontual.")]),
      h2("9.3 Obrigações dos membros"),
      bul("Partilha reciproca de IOCs relevantes;"),
      bul("Participação em pelo menos 50% das reuniões anuais;"),
      bul("Contribuição para pelo menos 1 WG;"),
      bul("Respeito pelo código de conduta e pelo TLP."),

      h1("10. Partilha de informação — Traffic Light Protocol"),
      tableFromRows(
        ["TLP", "Tratamento"],
        [
          ["TLP:RED", "Não partilhável. Divulgação apenas aos destinatários específicos."],
          ["TLP:AMBER+STRICT", "Partilhável dentro da organização dos destinatários e parceiros que necessitam de saber, sob NDA."],
          ["TLP:AMBER", "Partilhável dentro da organização dos destinatários e parceiros que necessitam de saber."],
          ["TLP:GREEN", "Partilhável com a comunidade de cibersegurança, mas não publicamente."],
          ["TLP:CLEAR", "Partilha pública sem restrições."],
        ],
        [2000, 7026]
      ),
      p("Referência: FIRST TLP 2.0 — https://www.first.org/tlp/"),

      h1("11. Recursos e financiamento"),
      instr("Descrever como a associação se sustenta — quotas, contribuições in-kind, financiamento público."),
      bul("Quotas anuais: [valor / isento]"),
      bul("Contribuições in-kind dos membros (tempo, infraestrutura);"),
      bul("Financiamento público ou setorial (se aplicável);"),
      bul("Ferramentas partilhadas: [ex.: instância MISP, servidor de mailing list]."),

      h1("12. Plano de atividades anual"),
      tableFromRows(
        ["Atividade", "Frequência", "Responsável"],
        [
          ["Reunião Steering Committee", "Trimestral", "Presidente"],
          ["Reunião geral de membros", "Semestral", "Presidente"],
          ["Exercício tabletop conjunto", "Anual", "WG Exercises"],
          ["Exercício técnico (red/purple team)", "Bianual", "WG Exercises"],
          ["Relatório anual de ameaças", "Anual", "WG Threat Intel"],
          ["Sessão de formação para membros", "Semestral", "WG Capacitação"],
        ],
        [3500, 2500, 3026]
      ),

      h1("13. Revisão dos Terms of Reference"),
      p("Estes Terms of Reference são revistos anualmente pelo Steering Committee, e sempre que se verifique:"),
      bul("Alteração regulatória relevante (NIS2, DORA, etc.);"),
      bul("Mudança significativa na composição da associação;"),
      bul("Desvio prolongado dos objetivos aprovados."),
      p("Alterações materiais requerem aprovação por maioria qualificada (2/3 dos membros)."),

      h1("14. Disposições finais"),
      bul("Os presentes Terms of Reference entram em vigor na data de aprovação pelos membros fundadores;"),
      bul("Em caso de dissolução, os recursos partilhados são distribuídos conforme deliberação do Steering Committee;"),
      bul("Litígios são resolvidos por mediação entre membros, recorrendo a foro judicial apenas em última instância."),

      h1("15. Assinaturas — membros fundadores"),
      spacer(300),
      tableFromRows(
        ["Organização", "Representante", "Cargo", "Data", "Assinatura"],
        [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ],
        [2000, 2000, 2000, 1500, 1526]
      ),
    ],
  });
}

// ═══════════════════════ DOC 4 — Service Catalog FIRST v2.1 ═══════════════════════
function serviceCatalog() {
  // 5 areas × services map from FIRST v2.1
  const AREAS = [
    {
      area: "1. Information Security Event Management",
      services: [
        "Monitoring and detection",
        "Event analysis",
      ],
    },
    {
      area: "2. Information Security Incident Management",
      services: [
        "Information security incident report acceptance",
        "Information security incident analysis",
        "Artifact and forensic evidence analysis",
        "Mitigation and recovery",
        "Information security incident coordination",
        "Crisis management support",
      ],
    },
    {
      area: "3. Vulnerability Management",
      services: [
        "Vulnerability discovery / research",
        "Vulnerability report intake",
        "Vulnerability analysis",
        "Vulnerability coordination",
        "Vulnerability disclosure",
        "Vulnerability response",
      ],
    },
    {
      area: "4. Situational Awareness",
      services: [
        "Data acquisition",
        "Analysis and synthesis",
        "Communication",
      ],
    },
    {
      area: "5. Knowledge Transfer",
      services: [
        "Awareness building",
        "Training and education",
        "Exercises",
        "Technical and policy advisory",
      ],
    },
  ];

  const children = [
    ...coverBlock({
      title: "CSIRT Service Catalog",
      subtitle: "Catálogo de serviços detalhado, alinhado com o FIRST CSIRT Services Framework v2.1 — 5 áreas, 44 serviços",
    }),
    new Paragraph({ children: [new PageBreak()] }),
    ...versionTable(),

    p([bold("Como usar: "), new TextRun("para cada serviço que [Nome da organização] oferece, preencher o nível de maturidade (Basic / Intermediate / Advanced), o responsável, os outputs (deliverables) e o SLA. Deixar por preencher os serviços fora do scope do CSIRT.")]),
    p([bold("Referência: "), new TextRun("FIRST CSIRT Services Framework v2.1 — https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1")]),

    h1("Legenda"),
    bul([bold("Basic (B): "), new TextRun("serviço existe mas é reactivo e não formalizado; processos ad-hoc.")]),
    bul([bold("Intermediate (I): "), new TextRun("processos documentados, SLAs definidos, ferramentas operacionais.")]),
    bul([bold("Advanced (A): "), new TextRun("métricas, melhoria contínua, integração com threat intel externa, automação.")]),
    bul([bold("N/A: "), new TextRun("serviço fora do scope do CSIRT de [Nome da organização].")]),
  ];

  AREAS.forEach((a) => {
    children.push(h1(a.area));
    children.push(tableFromRows(
      ["Serviço", "Maturidade", "Responsável", "Outputs / Deliverables", "SLA"],
      a.services.map((s) => [s, "", "", "", ""]),
      [3000, 1200, 1500, 2500, 826]
    ));
    children.push(spacer(300));
  });

  children.push(h1("Síntese de maturidade"));
  children.push(p("Após preenchimento do catálogo, completar a tabela seguinte para visualização executiva:"));
  children.push(tableFromRows(
    ["Área", "Serviços no scope", "Maturidade média"],
    AREAS.map((a) => [a.area, `[ X / ${a.services.length} ]`, "[ B / I / A ]"]),
    [5000, 2200, 1826]
  ));
  children.push(spacer(300));

  children.push(h1("Roadmap de evolução"));
  children.push(instr("Listar 3-5 ações prioritárias para elevar a maturidade no próximo ciclo (12 meses)."));
  children.push(num("[Ex.: Passar o serviço «Artifact and forensic evidence analysis» de Basic para Intermediate, contratando 1 FTE especializado e adquirindo licenças Volatility Pro.]"));
  children.push(num("[Próxima ação prioritária]"));
  children.push(num("[Próxima ação prioritária]"));

  children.push(h1("Aprovação"));
  children.push(spacer(300));
  children.push(tableFromRows(
    ["Papel", "Nome", "Assinatura", "Data"],
    [
      ["CISO", "", "", ""],
      ["Coordenador CSIRT", "", "", ""],
      ["Direção", "", "", ""],
    ],
    [2400, 2500, 2200, 1926]
  ));

  return buildDoc({
    title: "CSIRT Service Catalog — FIRST v2.1",
    filename: "csirt-service-catalog-first.docx",
    children,
  });
}

// ═══════════════════════ main ═══════════════════════
async function main() {
  await charter();
  await rfc2350();
  await termsOfReference();
  await serviceCatalog();
  console.log("[DONE] 4 CSIRT establishment templates generated.");
}

main().catch((e) => { console.error(e); process.exit(1); });
