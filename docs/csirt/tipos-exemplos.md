# Capítulo 2 — Tipos de CSIRT e Exemplos Reais

## 2.1 Tipos de CSIRT por Constituinte

Os CSIRTs diferenciam-se pela *constituency* que servem:

| Tipo | Constituency | O que faz |
|------|-------------|-----------|
| **Enterprise CSIRT** | Organização-mãe (banco, universidade, fabricante, agência pública) | Serve internamente uma organização |
| **National CSIRT** | Todo um país | Mandato legal nacional (em PT: **CNCS**) |
| **Coordination Center** | Múltiplos CSIRTs | Facilita cooperação; não responde diretamente (CERT/CC, CISA, CERT-EU) |
| **Analysis Center** | Setor ou comunidade | Sintetiza dados, emite *early warnings* (H-ISAC, FS-ISAC) |
| **Vendor Team (PSIRT)** | Utilizadores dos produtos do *vendor* | Trata vulnerabilidades do produto (MSRC, Cisco PSIRT) |
| **Incident Response Provider** | Clientes pagos | Modelo MSSP/DFIR (Mandiant, CrowdStrike Services) |

### Exemplos por setor

| Setor | Exemplo típico |
|-------|----------------|
| Governo | **CNCS** (Portugal), CISA (EUA), NCSC (UK) |
| Militar | DoD-CERT, NATO-CCIR |
| Polícia / Judicial | **PJ — UNC3T** (Unidade Nacional de Combate ao Cibercrime e Criminalidade Tecnológica) |
| Financeiro | FS-ISAC, SIBS CERT |
| Saúde | **SPMS-CSIRT**, H-ISAC |
| Académico | **FCCN-CERT** (rede universitária PT), REN-ISAC (EUA) |
| Telecom / ISP | CERTs dos operadores |
| Indústria | CSIRTs setoriais (energia, automóvel) |

!!! info "Em Portugal"
    A **Rede Nacional de CSIRTs** coordenada pelo CNCS reúne CSIRTs setoriais, académicos e empresariais. Ver [redecsirt.pt](https://www.redecsirt.pt/).

---

## 2.2 Exemplos Reais pelo Mundo

Os CSIRTs nacionais de referência que qualquer aluno de cibersegurança deve conhecer:

| 🌐 CSIRT | País / Região | Papel | Website |
|---------|---------------|-------|---------|
| **CERT/CC** | EUA (Carnegie Mellon) | O **primeiro** CSIRT — fundado 17 nov 1988 | [sei.cmu.edu/about/divisions/cert](https://www.sei.cmu.edu/about/divisions/cert/) |
| **CISA / US-CERT** | EUA (governo federal) | Proteção nacional de infraestrutura crítica | [cisa.gov](https://www.cisa.gov) |
| **NCSC UK** | Reino Unido | National Cyber Security Centre | [ncsc.gov.uk](https://www.ncsc.gov.uk) |
| **CERT-EU** | União Europeia | Instituições europeias | [cert.europa.eu](https://www.cert.europa.eu) |
| **SingCERT** | Singapura | Modelo de CSIRT nacional de referência | [csa.gov.sg/singcert](https://www.csa.gov.sg/singcert) |
| **CNCS / CERT.PT** | Portugal | Centro Nacional de Cibersegurança | [cncs.gov.pt](https://www.cncs.gov.pt) |

### Caso de estudo: SingCERT

**Missão:** *"One Point of Trusted Contact — Facilitate Security Threats Resolution — Increase National Competency in IT Security."*

Três frases, três compromissos claros. É citado em manuais por ser um dos *mission statements* mais curtos e concretos alguma vez redigidos para um CSIRT nacional.

### Caso de estudo: CNCS — Portugal

Centro Nacional de Cibersegurança, tutelado pelo Ministro da Presidência. Coordena a resposta a incidentes em todo o país, opera o **CERT.PT** como ponto operacional, e lidera a **Rede Nacional de CSIRTs**. Recebe notificações NIS2 (DL 125/2025 art. 42.º) e colabora com autoridades judiciais e CSIRTs internacionais.

---

## 2.3 Vantagens de Ter um CSIRT

Ter um CSIRT formal traz três benefícios estruturais à organização:

| Benefício | Valor concreto |
|-----------|----------------|
| **1. Gestão centralizada da informação de incidentes** | Informação e decisões coerentes; histórico completo; partilha eficiente entre equipas; decisão mais rápida |
| **2. Ponto central de contacto (PoC)** | *Trusted broker* interno e externo; comunicação direta de incidentes; informação consolidada do exterior; PoC 24/7 |
| **3. Relação de confiança pré-estabelecida** | Mais informação disponível para resposta; pronto para qualquer situação; troca de *threat intel* com outros CSIRTs |

!!! danger "Sem confiança, não há relatórios de incidentes"
    A vantagem de ter um CSIRT **depende da dimensão e tipo de negócio** da organização. Mas em qualquer caso, **sem confiança construída** com a constituinte e com pares externos, o CSIRT não recebe reportes nem consegue partilhar IOCs. A confiança demora anos a construir e destrói-se em dias.

### Fluxo do Incident Handling pelo CSIRT

Ao receber um reporte, o CSIRT executa um fluxo bem definido:

```
  ┌──────────────────────────────────────────────────────────────┐
  │   FLUXO DO INCIDENT HANDLING PELO CSIRT                      │
  │                                                              │
  │   ┌──────────┐   ┌────────┐   ┌───────────┐                  │
  │   │  Point   │──►│ Triage │──►│Priorização│                  │
  │   │ of       │   │        │   │           │                  │
  │   │ Contact  │   │        │   │           │                  │
  │   └──────────┘   └────────┘   └─────┬─────┘                  │
  │                                     │                        │
  │                                     ▼                        │
  │                         ┌───────────────────┐                │
  │                         │  Assistência       │                │
  │                         │  Técnica           │                │
  │                         └─────────┬─────────┘                │
  │                                   │                          │
  │                                   ▼                          │
  │                         ┌───────────────────┐                │
  │                         │  Resolução,        │                │
  │                         │  Supressão de dano,│                │
  │                         │  Assistência à     │                │
  │                         │  recuperação       │                │
  │                         └───────────────────┘                │
  └──────────────────────────────────────────────────────────────┘
```

---

**Próximos passos:** [Como Criar um CSIRT](como-criar.md)
