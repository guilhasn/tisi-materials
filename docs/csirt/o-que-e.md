# Capítulo 1 — O que é um CSIRT?

## 1.1 O Incidente que Mudou a Internet

Um **CSIRT (Computer Security Incident Response Team)** é uma equipa organizada com mandato formal para **prevenir, detetar, responder e aprender** com incidentes de cibersegurança que afetam uma *constituency* bem definida. A sua razão histórica de existir nasce num evento concreto.

### O Worm Morris — novembro de 1988

```
  ┌───────────────────────────────────────────────────────────────┐
  │                                                               │
  │   02 Nov 1988  —  Robert Tappan Morris (estudante Cornell)    │
  │                   lança do MIT o primeiro worm auto-replicante │
  │                   da Internet.                                 │
  │                                                               │
  │                   Infecta ~6 000 máquinas — ~10% da Internet   │
  │                   da época.                                    │
  │                   Sentença: 3 anos liberdade condicional,      │
  │                   400h trabalho comunitário, multa USD 10.050. │
  │                                                               │
  │   07 Nov 1988  —  Resolução por colaboração internacional      │
  │                   ad-hoc. Muito desperdício de esforço,        │
  │                   duplicação de trabalho entre universidades.  │
  │                                                               │
  │   17 Nov 1988  —  Criado o primeiro CERT (CERT/CC) na          │
  │                   Carnegie Mellon, financiado pela DARPA.      │
  │                   Nasce o conceito de CSIRT.                   │
  └───────────────────────────────────────────────────────────────┘
```

> O Morris Worm não foi apenas um incidente técnico — foi o **momento fundador** da disciplina de Incident Response moderna. A resposta caótica mostrou que a Internet precisava de **pontos de contacto formais** e coordenados.

### Detalhes que enriquecem a narrativa

- **Robert Tappan Morris** era estudante de doutoramento em Cornell, **filho do chefe de cientistas da NSA**. Não pretendia destruir — queria *contar* quantas máquinas estavam ligadas à Internet. O bug fatal: o worm tinha probabilidade de **1/7 de re-infetar** uma máquina já infetada → multiplicação descontrolada de processos → DoS efetivo.
- Os **3 dias caóticos** mostraram a falha sistémica: administradores de Berkeley, MIT e Purdue trabalharam em paralelo a fazer engenharia reversa, **comunicando por telefone** porque o e-mail estava... no worm. Esta é a "lição aprendida" que justifica a existência de um CERT: precisamos de um ponto de contacto central, não de 50 administradores a duplicar trabalho.
- Morris foi a **primeira pessoa condenada** ao abrigo do **Computer Fraud and Abuse Act (CFAA, 1986)** — lei aprovada **2 anos antes** do worm. Hoje é professor titular no MIT (CSAIL).
- Os primeiros a investigar o código publicaram o paper canónico **"With Microscope and Tweezers"** (Eichin & Rochlis, 1989) — pioneiros do que hoje chamamos *malware analysis*. **A engenharia reversa de malware nasceu do mesmo incidente que originou o CERT/CC** — duas disciplinas gémeas.

### Porque é que 1988 foi o ponto de viragem

A Internet em 1988 tinha **~60 000 sistemas, todos cooperativos** — universidades, laboratórios, agências federais. **Não havia firewall** de mercado. **Não havia conceito de "ataque externo"** porque toda a gente confiava em toda a gente. O worm partiu essa ilusão.

> *"A confiança original era a regra. Hoje, a desconfiança é a regra. O CSIRT existe para gerir essa desconfiança de forma estruturada."*

---

## 1.2 Definição, Siglas e Terminologia

### Definição canónica

> *Um CSIRT é uma equipa que fornece, a uma constituinte bem definida, serviços e suporte para prevenir e responder a incidentes de segurança informática.*

### Siglas que se encontram em literatura

| Sigla | Significado | Nota |
|-------|-------------|------|
| **CERT** | Computer Emergency Response Team | **Marca registada** pela Carnegie Mellon desde 1988 |
| **CSIRT** | Computer Security Incident Response Team | Termo **genérico, livre** desde 1998 — mais usado hoje |
| **SIRT** | Security Incident Response Team | Variante mais curta |
| **CIRT / IRT** | (Computer) Incident Response Team | Equivalentes funcionais |
| **CSIRC / CIRC** | Computer (Security) Incident Response Capability / Center | Ênfase na *capacidade* |
| **IHT** | Incident Handling Team | Ênfase em *handling* |
| **PSIRT** | **Product** Security Incident Response Team | Trata vulnerabilidades **nos produtos da própria empresa** (Cisco PSIRT, Microsoft MSRC) |
| **SOC** | Security Operations Center | Estrutura **operacional 24/7**; pode sobrepor-se ao CSIRT |

### CERT (1988) vs CSIRT (1998) — comparação lado-a-lado

| Dimensão | **CERT** (1988) | **CSIRT** (1998) |
|----------|-----------------|-------------------|
| Estatuto | **Marca registada** | Termo **genérico** |
| Uso | **Restrito** — autorização necessária | **Livre** — qualquer organização pode adotar |
| Origem | CERT/CC na Carnegie Mellon | Definido no [CSIRT Handbook](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305) (SEI, 2003) |
| Autorização | [sei.cmu.edu/legal/permission](https://sei.cmu.edu/legal/permission/index.cfm) | — (não aplicável) |
| Abrangência | CSIRTs específicos autorizados | Abrange **todos os tipos** de equipas |

!!! warning "CERT ≠ CSIRT na formalidade"
    Para evitar problemas legais, se a equipa **não está autorizada** pela SEI a usar a marca CERT, deve chamar-se **CSIRT** (ou variante genérica). O termo CERT é marca registada desde 1997. **Na prática europeia**: usa-se CSIRT por defeito (RFC 2350, TF-CSIRT, FIRST). Se vires uma equipa europeia que usa "CERT" no nome, é altamente provável que tenha autorização formal (ex.: **CERT.pt** tem licença do SEI) ou que o nome predate as restrições.

#### PSIRT vs CSIRT — a distinção crítica

Um **PSIRT** (Product Security Incident Response Team) **não responde a incidentes da empresa-mãe** — responde a **vulnerabilidades nos produtos da empresa que afetam clientes externos**. É o canal pelo qual investigadores reportam *bugs* ao fabricante e pelo qual o fabricante publica *advisories* (CVEs).

| Empresa | PSIRT (foco em produtos) | CSIRT enterprise (foco interno) |
|---------|--------------------------|----------------------------------|
| **Microsoft** | Microsoft Security Response Center (MSRC) | Equipa interna separada |
| **Cisco** | Cisco PSIRT | Equipa interna separada |
| **Apple** | Apple Product Security | Equipa interna separada |
| **Outsystems** (PT) | Outsystems PSIRT | Equipa interna separada |

> Quando ouvires "CERT-XPTO" e estiveres a investigar uma empresa, pergunta sempre *(a) é um CSIRT enterprise interno? (b) é um vendor PSIRT? (c) é um CSIRT nacional/setorial?*. A resposta muda a expectativa de serviço.

---

## 1.3 Atividades e Serviços de um CSIRT

As atividades organizam-se em **três grupos de serviços**, formalizados no [FIRST CSIRT Services Framework v2.1](https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1).

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                  SERVIÇOS DE UM CSIRT                           │
  │                                                                 │
  │   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
  │   │    REATIVOS      │  │    PROATIVOS     │  │  QUALIDADE   │  │
  │   │                  │  │                  │  │  DE SEGURANÇA│  │
  │   │  Responder após  │  │  Reduzir         │  │              │  │
  │   │  incidente       │  │  probabilidade   │  │  Melhorar    │  │
  │   │                  │  │  e impacto       │  │  postura a   │  │
  │   │  • Incident      │  │                  │  │  longo prazo │  │
  │   │    Handling      │  │  • Technology    │  │              │  │
  │   │  • Alerts &      │  │    Watch         │  │  • Risk      │  │
  │   │    Warnings      │  │  • Announcements │  │    Analysis  │  │
  │   │  • Vulnerability │  │  • Intrusion     │  │  • BCP       │  │
  │   │    Handling      │  │    Detection     │  │  • Security  │  │
  │   │  • Artefact      │  │  • Audits &      │  │    Consult.  │  │
  │   │    Handling      │  │    Assessments   │  │  • Education │  │
  │   │                  │  │  • Tool Dev.     │  │    / Training│  │
  │   │                  │  │                  │  │  • Product   │  │
  │   │                  │  │                  │  │    Evaluation│  │
  │   └──────────────────┘  └──────────────────┘  └──────────────┘  │
  └─────────────────────────────────────────────────────────────────┘
```

### Lista de atividades típicas (RFC 2350 + práticas modernas)

| Reativos | Proativos | Qualidade de Segurança |
|----------|-----------|-------------------------|
| Incident Handling | Technology Watch | Risk Analysis |
| Alerts & Warnings | Announcements | Business Continuity Planning |
| Vulnerability Handling | Intrusion Detection | Security Consulting |
| Artefact Handling | Security Tool Development | Education / Awareness |
| | Information Dissemination | Product Evaluation |
| | Audits & Assessments | Configuração e manutenção de infraestrutura |

!!! tip "Referência canónica"
    O [FIRST CSIRT Services Framework v2.1](https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1) define 44 serviços em 5 áreas. É a referência profissional para desenhar a carteira de serviços de um CSIRT. Complementar com a [RFC 2350](https://www.rfc-editor.org/rfc/rfc2350), que formaliza o que os constituintes devem esperar de um CSIRT.

!!! warning "Duas taxonomias coexistem — saber qual estás a usar"
    A divisão em **3 áreas (Reativos / Proativos / Qualidade de Segurança)** apresentada acima é a taxonomia **clássica da Carnegie Mellon SEI** (1998-2003) — didaticamente útil. Mas o **standard mais recente — FIRST v2.1 (2019)** — reorganizou em **5 áreas**:

    1. **Information Security Event Management** (gestão de eventos — corresponde sobretudo ao SOC)
    2. **Information Security Incident Management** (gestão de incidentes — CSIRT propriamente dito)
    3. **Vulnerability Management** (gestão de vulnerabilidades)
    4. **Situational Awareness** (consciência situacional)
    5. **Knowledge Transfer** (transferência de conhecimento)

    A separação **Event vs Incident** reflete precisamente a distinção SOC vs CSIRT. Quando construíres um CSIRT real, **usa o FIRST v2.1**; quando explicares conceptualmente, a taxonomia clássica continua útil.

---

**Próximos passos:** [Tipos de CSIRT e Exemplos Reais](tipos-exemplos.md)
