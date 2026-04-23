# 📋 Templates e Modelos Operacionais

Esta página reúne **todos os templates operacionais** disponibilizados na UC TISI, organizados por domínio e fase do ciclo de gestão de incidentes e continuidade. Cada entrada indica **quando usar**, **o que personalizar**, **quem aprova** e **cadência de revisão**.

---

## Como usar estes templates

### Duas famílias distintas

O material contém duas famílias de templates, com lógicas de uso diferentes:

| Família | Contexto | Placeholder | Uso recomendado |
|---------|----------|-------------|-----------------|
| **Vila Feliz** | Município fictício, contexto de caso de estudo completo | Nomes já preenchidos (Município de Vila Feliz) | Referência pedagógica para a UC; análise crítica em aula |
| **Genéricos (Gestão de Incidentes)** | Modelos agnósticos de organização | `[Nome da organização]` | Adaptação directa pelos alunos nas suas organizações |

### Fluxo de adaptação (genéricos)

1. **Descarregar** o ficheiro `.docx` ou `.xlsx`.
2. **Substituir** todos os placeholders: `[Nome da organização]`, `[Autor]`, `[email]`, `[telemóvel]`, `[Cargo]`, etc. (use Procurar e Substituir no Word).
3. **Adaptar** ao contexto específico:
    - Setor (público vs privado, saúde, financeiro, indústria, educação);
    - Dimensão (micro/PME/grande empresa);
    - Jurisdição (se não-Portugal, rever referências legais — DL 125/2025, RGPD, CNPD, CNCS);
    - Perfil de risco (tipologia e volume de dados pessoais, criticidade dos serviços, cadeia de fornecimento).
4. **Submeter a aprovação formal** antes de publicar (Direção + DPO + Jurídico, conforme o caso).
5. **Rever** anualmente ou após incidente significativo; versionar com o *Controlo de versões* interno.

!!! warning "Aviso pedagógico"
    Estes templates são **pontos de partida para aprendizagem**, não substitutos de análise jurídica qualificada. Antes de usar num contexto real com valor vinculativo, validar com DPO e Jurídico; para setores regulados (financeiro, telecomunicações, saúde) consultar também o regulador setorial aplicável.

---

## 🏛️ Família Vila Feliz — Planos de continuidade completos

O **Município de Vila Feliz** é uma organização pública fictícia usada como fio condutor nos módulos BIA, IRP, DRP e BCP. Os templates abaixo implementam os planos de um município-tipo, com processos típicos da administração local portuguesa (atendimento ao cidadão, licenciamento, gestão de infraestruturas, emergência civil).

**Quando usar como aluno:**

- Como referência de estrutura e profundidade esperadas numa entrega de planeamento;
- Para análise crítica em aula: identificar o que está bem e o que está incompleto;
- Como base para adaptar ao contexto da tua organização (substituindo "Vila Feliz" pelo nome dela).

**Quando NÃO usar:**

- Como plano funcional direto para uma organização real — o contexto Vila Feliz é simplificado para fins pedagógicos.

### Os 4 planos Vila Feliz

| Plano | Âmbito | Quando é invocado | Download |
|-------|--------|-------------------|----------|
| **BIA — Business Impact Analysis** | Identifica funções críticas do município e quantifica impactos de interrupção (RTO, RPO, MTD, MOR). | Antes de construir qualquer outro plano (é a base quantitativa do IRP, DRP e BCP). | [📄 BIA Vila Feliz](BIA_Municipio_Vila_Feliz_TISI.docx) |
| **IRP — Incident Response Plan** | Procedimentos de resposta a incidentes de cibersegurança e operacionais ao nível do município. | Quando se deteta incidente com impacto nos serviços ao cidadão ou nos sistemas de informação. | [📄 IRP Vila Feliz](IRP_Vila_Feliz.docx) |
| **DRP — Disaster Recovery Plan** | Recuperação técnica da infraestrutura após desastre (data center, sistemas críticos). | Quando o incidente escala para desastre e a recuperação técnica exige estratégia pré-definida. | [📄 DRP Vila Feliz](DRP_Municipio_VilaFeliz_TISI.docx) |
| **BCP — Business Continuity Plan** | Continuidade dos serviços essenciais do município durante a crise. | Quando a operação normal não é possível e são necessárias estratégias alternativas (atendimento remoto, procedimentos manuais). | [📄 BCP Vila Feliz](BCP_Municipio_Vila_Feliz_TISI.docx) |

!!! tip "Sequência de leitura sugerida"
    **BIA → BCP → DRP → IRP**. A BIA alimenta os restantes com métricas; o BCP define estratégias de continuidade; o DRP operacionaliza a recuperação técnica; o IRP coordena a resposta a incidentes que activam os anteriores.

### Cadência de revisão dos planos Vila Feliz

| Tipo de revisão | Periodicidade | Responsável |
|-----------------|---------------|-------------|
| Revisão técnica menor | 6 em 6 meses | Coordenador BCP/DRP |
| Revisão completa | Anual | Direção + CISO + DPO |
| Revisão extraordinária | Após incidente grave, mudança organizacional ou alteração regulatória | Direção |
| Teste do plano | Anual (tabletop) + 24 em 24 meses (full-scale) | Coordenador BCP |

---

## 🔥 Família Gestão de Incidentes — Templates genéricos

Templates **agnósticos de organização**, com placeholder `[Nome da organização]` para adaptação direta. Alinhados com **ISO/IEC 27035, NIST SP 800-61r2, DL 125/2025 (NIS2 PT), RGPD, MITRE ATT&CK e CISA StopRansomware**.

Todos estes templates estão em `docs/gestao_incidentes/` e são também ligados contextualmente nos capítulos do módulo [Incident Handling](../ih/index.md).

### Grupo A — Políticas e procedimentos (governação)

Estabelecem a base organizacional, responsabilidades e critérios de decisão.

#### A.1 Política de Gestão de Incidentes

**O que é:** Documento de alto nível que declara o compromisso da organização, define âmbito, princípios e atribui papéis (Direção, CISO, CSIRT, DPO, utilizadores).

**Quando usar:**
- Como documento-mãe do programa de IR;
- Em auditorias ISO 27001 (A.5.24 a A.5.28);
- Em processos de conformidade NIS2 (DL 125/2025 art. 27.º).

**O que personalizar:**
- Nome da organização, sector, âmbito específico;
- Lista de documentos operacionais associados;
- Aprovador e data de entrada em vigor.

**Quem aprova:** Direção / Conselho de Administração.
**Revisão:** Anual ou após mudança regulatória.

[📄 politica-gestao-incidentes.docx](../gestao_incidentes/politica-gestao-incidentes.docx){ .md-button }

#### A.2 Classificação e Severidade (P1-P5)

**O que é:** Matriz de severidade em 5 níveis com critérios de impacto, abrangência e urgência. Define SLAs, escalonamento e categorias de incidente.

**Quando usar:**
- Na triagem inicial de cada incidente (primeiros 15 minutos);
- Sempre que seja necessário justificar a prioridade atribuída;
- Na formação do SOC/helpdesk de primeira linha.

**O que personalizar:**
- Tabela de SLAs por severidade (ajustar aos recursos disponíveis);
- Lista de sistemas tier 0 (AD, PKI, backups — específicos da organização);
- Categorias adicionais se existirem riscos setoriais específicos.

**Quem aprova:** CISO.
**Revisão:** Semestral + após incidente cuja classificação inicial esteve errada.

[📄 procedimento-classificacao-severidade.docx](../gestao_incidentes/procedimento-classificacao-severidade.docx){ .md-button }

#### A.3 Escalonamento e Matriz RACI

**O que é:** Define níveis de suporte (L1/L2/L3), critérios automáticos de escalonamento e responsabilidades por atividade (matriz RACI com 14+ atividades × 7+ papéis). Inclui cadeia de contactos interna e externa.

**Quando usar:**
- Sempre que haja dúvida sobre "quem decide o quê";
- Na activação de incidentes P1/P2;
- Para formação cruzada entre equipas.

**O que personalizar:**
- Contactos internos (colunas Nome, Email, Telemóvel 24/7);
- Contactos externos (seguradora cyber, fornecedor DFIR, consultor jurídico externo);
- Ajustar a matriz RACI aos papéis reais da organização (algumas não têm DPO separado do Jurídico, por exemplo).

**Quem aprova:** CISO + Direção.
**Revisão:** Trimestral (contactos) + Anual (matriz).

[📄 procedimento-escalonamento-raci.docx](../gestao_incidentes/procedimento-escalonamento-raci.docx){ .md-button }

#### A.4 Plano de Resposta a Incidentes — NIS2

**O que é:** Plano completo de resposta a incidentes alinhado com o Decreto-Lei n.º 125/2025 (transposição da NIS2 para o ordenamento jurídico português). Estrutura a resposta por fases e cumpre obrigações de reporte ao CNCS.

**Quando usar:**
- Como plano base para organizações abrangidas pela NIS2;
- Como referência para organizações fora do âmbito NIS2 que queiram elevar o nível de maturidade;
- Nas relações com entidades reguladoras e auditores.

**O que personalizar:**
- Secções dedicadas à identificação da entidade NIS2 (essencial ou importante);
- Lista de serviços cobertos pela NIS2;
- Procedimentos específicos de reporte ao CNCS.

**Quem aprova:** Direção + CISO + Jurídico.
**Revisão:** Anual + após alteração regulatória.

[📄 plano-resposta-incidentes-nis2.docx](../gestao_incidentes/plano-resposta-incidentes-nis2.docx){ .md-button }

---

### Grupo B — Playbooks (resposta táctica por tipo de incidente)

Procedimentos detalhados passo-a-passo para os três vectores de incidente mais frequentes.

#### B.1 Playbook — Ransomware

**O que é:** Procedimento operacional para resposta a ransomware, incluindo contenção imediata, preservação forense, identificação do *strain*, árvore de decisão de pagamento (com verificação OFAC), erradicação, recuperação faseada e checklist final.

**Quando usar:**
- Quando se detectam indicadores de ransomware (ficheiros cifrados, nota de resgate, processos anómalos);
- Como referência de exercícios tabletop;
- Na formação do CSIRT.

**O que personalizar:**
- Lista de sistemas tier 0 específicos da organização;
- Contactos da seguradora cyber e do fornecedor DFIR;
- Lista de backups imutáveis e procedimento de validação de restauro;
- Critérios de decisão de pagamento validados com Direção e Jurídico.

**Quem aprova:** CISO + Jurídico + DPO.
**Revisão:** Semestral + após cada exercício ou incidente real.

[📄 playbook-ransomware.docx](../gestao_incidentes/playbook-ransomware.docx){ .md-button }

#### B.2 Playbook — Phishing / Comprometimento de Credenciais

**O que é:** Procedimento para resposta a campanhas de phishing e incidentes de comprometimento de credenciais (individual ou em massa). Cobre contenção (reset de password, revogação de sessões e tokens), investigação de impacto e erradicação.

**Quando usar:**
- Em qualquer suspeita de phishing com credenciais introduzidas;
- Quando credenciais corporativas aparecem em dumps públicos (HaveIBeenPwned, DLP externa);
- Em alertas de login anómalo em SaaS.

**O que personalizar:**
- Procedimentos específicos por IdP (Azure AD/Entra, Google Workspace, Okta);
- Política de Conditional Access da organização;
- Plataformas de SaaS em uso e respectivos mecanismos de revoke.

**Quem aprova:** CISO.
**Revisão:** Anual + após mudança de IdP ou plataforma principal.

[📄 playbook-phishing.docx](../gestao_incidentes/playbook-phishing.docx){ .md-button }

#### B.3 Playbook — Violação de Dados Pessoais (RGPD)

**O que é:** Procedimento para resposta a violações de dados pessoais ao abrigo dos artigos 33.º e 34.º do RGPD. Cobre qualificação (é ou não é violação?), avaliação do risco (EDPB WP250), decisão de notificação à CNPD, comunicação aos titulares e registo interno obrigatório.

**Quando usar:**
- **Sempre** em paralelo com qualquer outro playbook quando houver dados pessoais afectados;
- O DPO é responsável primário por este playbook.

**O que personalizar:**
- Mapa dos tratamentos de dados pessoais e respectivas categorias (dados comuns vs sensíveis);
- Modelo de comunicação aos titulares (linguagem clara, sem jargão técnico);
- Canal de contacto preferido com a CNPD.

**Quem aprova:** DPO + Jurídico.
**Revisão:** Anual + após orientação nova da CNPD ou EDPB.

[📄 playbook-violacao-dados-pessoais.docx](../gestao_incidentes/playbook-violacao-dados-pessoais.docx){ .md-button }

---

### Grupo C — Comunicação e documentação pós-incidente

Cobrem o "depois" — como comunicar durante a crise e como documentar após o seu encerramento.

#### C.1 Plano de Comunicação de Crise

**O que é:** Matriz audiências × canais × porta-vozes, mensagens-tipo por fase (holding statement, comunicação a clientes, comunicado à imprensa, notificação regulatória), regras para redes sociais e organização logística do war room.

**Quando usar:**
- Na activação de incidentes P1;
- Em qualquer incidente com potencial exposição mediática;
- Antes de publicar qualquer comunicação externa durante incidente.

**O que personalizar:**
- Porta-vozes (primário, técnico, regulatório);
- Mensagens-tipo adaptadas ao tom institucional;
- Canais de comunicação preferidos por audiência.

**Quem aprova:** Direção + Líder de Comunicação.
**Revisão:** Anual + após cada exercício.

[📄 plano-comunicacao-crise.docx](../gestao_incidentes/plano-comunicacao-crise.docx){ .md-button }

#### C.2 Relatório Pós-Incidente (PIR)

**O que é:** Template estruturado para documentar o incidente após encerramento técnico. Inclui identificação, resumo executivo, cronologia, factos técnicos (ATT&CK, IOCs), impacto, root cause analysis (5 porquês), análise da resposta (o que funcionou / falhou), ações correctivas e lições aprendidas.

**Quando usar:**
- Para **todos** os incidentes P1 e P2, obrigatoriamente;
- Para P3 quando houver elemento de aprendizagem relevante;
- Como entrada do processo de melhoria contínua.

**O que personalizar:**
- Formato específico exigido por eventuais auditorias (ISO 27001, ISAE 3402, SOC2);
- Listas de distribuição do relatório (resumo executivo público vs documento técnico completo).

**Quem aprova:** Líder do incidente → CISO → Direção.
**Prazo de conclusão:** 30 dias após encerramento técnico (alinhado com NIS2 relatório final).

[📄 relatorio-pos-incidente-pir.docx](../gestao_incidentes/relatorio-pos-incidente-pir.docx){ .md-button }

---

### Grupo D — Notificações regulatórias NIS2 (DL 125/2025)

Templates formais para cumprir as obrigações de reporte ao **CNCS** previstas no Decreto-Lei n.º 125/2025, que transpõe a NIS2 para o ordenamento jurídico português.

| Documento | Quando usar | Prazo | Base legal | Download |
|-----------|-------------|-------|------------|----------|
| **Notificação inicial CNCS (24h)** | Logo que se identifique um incidente significativo. | **24h** após conhecimento | Art. 42.º DL 125/2025 | [📄 24h](../gestao_incidentes/notificacao-24h-nis2.docx){ .md-button } |
| **Notificação intermédia (72h)** | Actualização com avaliação preliminar. | **72h** após conhecimento | Art. 42.º n.º 3 | [📄 72h](../gestao_incidentes/notificacao-72h-nis2.docx){ .md-button } |
| **Relatório final (30 dias úteis)** | Relatório consolidado após encerramento. | **30 dias úteis** após fim de impacto | Art. 44.º | [📄 30d](../gestao_incidentes/notificacao-30d-nis2.docx){ .md-button } |
| **Notificação a destinatários** | Quando o incidente afecta os utilizadores dos serviços. | Sem demora | Art. 48.º | [📄 destinatários](../gestao_incidentes/notificacao-incidente-destinatarios-nis2.docx){ .md-button } |
| **Registo interno de incidentes** | Registo contínuo para auditoria. | Contínuo | Art. 33.º n.º 5 RGPD + NIS2 | [📊 registo](../gestao_incidentes/registo-incidentes-nis2.xlsx){ .md-button } |

!!! info "Obrigação RGPD vs NIS2"
    Um mesmo incidente pode originar **duas notificações paralelas** com prazos diferentes:
    **CNPD em 72h** (art. 33.º RGPD) + **CNCS em 24h** (art. 42.º DL 125/2025). Os conteúdos são semelhantes mas não idênticos — os canais, conteúdos específicos e critérios de notificação diferem. Quando aplicável, as duas notificações são tramitadas pelo DPO e CISO em coordenação.

---

### Grupo E — Estabelecimento de CSIRT

Templates que materializam os **4 fundamentos** do módulo [CSIRT](../csirt/index.md): missão, constituinte, autoridade, relações. Aplicáveis tanto à criação formal de um novo CSIRT como à consolidação documental de um existente.

#### E.1 CSIRT Charter / Plano de Estabelecimento

**O que é:** Documento **interno** de alto nível que formaliza a existência do CSIRT. Estrutura-se segundo os 4 fundamentos do capítulo (Missão, Constituinte, Posição+Autoridade, Relações), acrescentando modelo organizacional, carteira de serviços, recursos (pessoas, tecnologia, orçamento) e governação (KPIs, revisões, auditoria).

**Quando usar:**
- Como deliverable final do processo de criação de um CSIRT;
- Em auditorias de conformidade (ISO 27001 A.5.24, NIS2 art. 27.º);
- Quando a organização quer explicitar mandato e autoridade do CSIRT.

**O que personalizar:**
- Missão (3-4 frases), perímetro da constituinte, matriz de autoridade por tipo de ação;
- Modelo organizacional (Security Team / Distributed / Centralized / Combined / Coordinating);
- Orçamento e equipa previstos;
- KPIs ajustados à maturidade da organização.

**Quem aprova:** CEO / Administração + CISO + DPO + Jurídico + Coordenador CSIRT.
**Revisão:** Anual + após mudança organizacional significativa.

[📄 csirt-charter.docx](../gestao_incidentes/csirt-charter.docx){ .md-button }

#### E.2 RFC 2350 — Service Description

**O que é:** Documento **público** no formato padronizado IETF RFC 2350, que descreve o CSIRT a terceiros (constituentes, outros CSIRTs, potenciais parceiros). **Requerido para admissão na FIRST e na TF-CSIRT**.

**Estrutura (fixa pelo standard):** Document Information · Contact Information · Charter · Policies · Services · Incident Reporting Forms · Disclaimers.

**Quando usar:**
- Ao candidatar-se a FIRST membership ou TF-CSIRT Trusted Introducer;
- Para publicar a identidade pública do CSIRT no site institucional;
- Como face externa que complementa o Charter interno.

**O que personalizar:**
- Contactos completos (email, PGP key, telefone 24/7);
- Constituinte em detalhe (gamas IP, domínios, ASN);
- Politicas de cooperação e TLP;
- Serviços oferecidos ao constituente.

**Quem aprova:** CISO + Coordenador CSIRT.
**Revisão:** Sempre que alteração material (contactos, chaves PGP, constituinte, serviços).

[📄 csirt-rfc2350.docx](../gestao_incidentes/csirt-rfc2350.docx){ .md-button }

#### E.3 Terms of Reference (ToR) — Associação CSIRT

**O que é:** Instrumento constitutivo de uma **associação multi-team** de CSIRTs (fórum, task force, coligação setorial ou regional). Para cooperação bilateral usar NDA/MOU em vez deste documento.

**Quando usar:**
- Constituir uma associação setorial (ex.: CSIRTs municipais, CSIRTs de saúde);
- Formalizar uma task force temporária com objetivos específicos;
- Consolidar cooperação multi-team pré-existente.

**O que personalizar:**
- Contexto, visão e missão da associação;
- Critérios de admissão de membros;
- Estrutura (Steering Committee, Working Groups, Secretariado);
- Plano de atividades anual;
- Regras de partilha de informação (TLP).

**Quem aprova:** Steering Committee + membros fundadores.
**Revisão:** Anual + após alteração regulatória material.

[📄 csirt-terms-of-reference.docx](../gestao_incidentes/csirt-terms-of-reference.docx){ .md-button }

#### E.4 CSIRT Service Catalog — FIRST v2.1

**O que é:** Catálogo detalhado da carteira de serviços, alinhado com o [FIRST CSIRT Services Framework v2.1](https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1). Cobre as **5 áreas** (Event Management, Incident Management, Vulnerability Management, Situational Awareness, Knowledge Transfer) e **44 serviços**.

**Quando usar:**
- Complemento ao Charter para detalhe granular da carteira;
- Autoavaliação de maturidade (Basic / Intermediate / Advanced) por serviço;
- Roadmap de evolução plurianual do CSIRT.

**O que personalizar:**
- Para cada serviço no scope: maturidade, responsável, outputs, SLA;
- Serviços fora do scope ficam "N/A";
- Ações prioritárias de evolução no próximo ciclo.

**Quem aprova:** CISO + Coordenador CSIRT + Direção.
**Revisão:** Anual para reavaliar maturidade e definir roadmap.

[📄 csirt-service-catalog-first.docx](../gestao_incidentes/csirt-service-catalog-first.docx){ .md-button }

!!! tip "Relação entre os 4 templates"
    **Charter (E.1)** é o documento-mãe interno. **RFC 2350 (E.2)** é a sua face pública. **ToR (E.3)** aplica-se apenas se houver associação multi-team. **Service Catalog (E.4)** aprofunda a secção de serviços do Charter. Recomenda-se preencher pela ordem E.1 → E.4 → E.2 → E.3.

---

## 📦 Recursos adicionais

### ITIL — Modelos complementares

Conjunto de templates adicionais baseados em processos ITIL (Gestão de Problemas, Gestão de Mudança, Gestão de Configuração, Gestão de Capacidade, Catálogo de Serviços). Úteis para articulação entre a função de IR e o modelo de gestão de serviços de IT.

[:material-zip-box: TemplatesITIL.zip](TemplatesITIL.zip){ .md-button }

---

## Mapa de dependências entre templates

Como os templates se relacionam entre si — a ordem de leitura e aplicação não é arbitrária.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                 DEPENDÊNCIAS DOS TEMPLATES                      │
  │                                                                 │
  │   ┌────────────────────────┐                                    │
  │   │ Política de Gestão     │  ◄── base governativa              │
  │   │ de Incidentes          │                                    │
  │   └───────────┬────────────┘                                    │
  │               │                                                 │
  │               ▼                                                 │
  │   ┌────────────────────────┐     ┌────────────────────────┐    │
  │   │ Plano IR (NIS2)        │────►│ Classificação e        │    │
  │   │                        │     │ Severidade (P1-P5)     │    │
  │   └───────────┬────────────┘     └────────────────────────┘    │
  │               │                                                 │
  │               ▼                                                 │
  │   ┌────────────────────────┐                                    │
  │   │ Escalonamento + RACI   │                                    │
  │   └───────────┬────────────┘                                    │
  │               │                                                 │
  │     ┌─────────┼─────────┐                                       │
  │     ▼         ▼         ▼                                       │
  │  ┌─────┐  ┌─────┐  ┌─────┐                                      │
  │  │ PB  │  │ PB  │  │ PB  │  ◄── playbooks por tipo              │
  │  │Rans │  │Phish│  │RGPD │                                      │
  │  └──┬──┘  └──┬──┘  └──┬──┘                                      │
  │     └────────┼────────┘                                         │
  │              ▼                                                  │
  │  ┌────────────────────────┐                                     │
  │  │ Plano de Comunicação   │  ◄── durante o incidente            │
  │  │ de Crise               │                                     │
  │  └───────────┬────────────┘                                     │
  │              ▼                                                  │
  │  ┌────────────────────────┐                                     │
  │  │ Notificações NIS2      │  ◄── 24h → 72h → 30d                │
  │  │ (24h / 72h / 30d)      │                                     │
  │  └───────────┬────────────┘                                     │
  │              ▼                                                  │
  │  ┌────────────────────────┐                                     │
  │  │ Relatório Pós-Incidente│  ◄── encerramento                   │
  │  │ (PIR)                  │                                     │
  │  └────────────────────────┘                                     │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Checklist — está a tua organização equipada?

Use como autoavaliação rápida. Quantos destes documentos estão aprovados, testados e atualizados na tua organização?

- [ ] Política de Gestão de Incidentes aprovada pela Direção
- [ ] Matriz de Classificação P1-P5 formalizada
- [ ] Matriz RACI do CSIRT com contactos actualizados (último trimestre)
- [ ] Playbook de Ransomware testado em tabletop nos últimos 12 meses
- [ ] Playbook de Phishing alinhado com IdP atual
- [ ] Playbook RGPD com DPO designado
- [ ] Plano de Comunicação de Crise com porta-vozes designados e briefados
- [ ] Template PIR com pelo menos 1 incidente passado documentado
- [ ] Contactos CNCS e CNPD pré-registados no sistema
- [ ] Registo de incidentes activo (últimos 12 meses preenchidos)

!!! success "Resultado"
    **10/10** — organização madura em IR. **7-9** — bom nível com lacunas pontuais. **4-6** — programa em desenvolvimento, focar nos playbooks e matriz RACI. **0-3** — começar pela Política e Classificação.

---

*Dúvidas sobre qualquer template específico? Consulta o capítulo correspondente do módulo [Incident Handling](../ih/index.md) ou contacta o docente.*
