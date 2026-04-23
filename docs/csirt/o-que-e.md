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
    Para evitar problemas legais, se a equipa **não está autorizada** pela SEI a usar a marca CERT, deve chamar-se **CSIRT** (ou variante genérica). O termo CERT é marca registada desde 1997.

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

---

**Próximos passos:** [Tipos de CSIRT e Exemplos Reais](tipos-exemplos.md)
