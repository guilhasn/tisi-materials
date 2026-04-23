# Setting Up CSIRT — Como criar e operacionalizar um CSIRT

> **Objetivo do capítulo:** compreender o que é um CSIRT, que tipos existem, como se cria um (os 4 fundamentos), e como se operacionaliza (pessoas, processos, tecnologia, 24/7).

## Índice

### Capítulo 1 — O que é um CSIRT?
1.1 [O Incidente que Mudou a Internet](#11-o-incidente-que-mudou-a-internet)
1.2 [Definição, Siglas e Terminologia](#12-definicao-siglas-e-terminologia)
1.3 [Atividades e Serviços de um CSIRT](#13-atividades-e-servicos-de-um-csirt)

### Capítulo 2 — Tipos de CSIRT e Exemplos Reais
2.1 [Tipos de CSIRT por Constituinte](#21-tipos-de-csirt-por-constituinte)
2.2 [Exemplos Reais pelo Mundo](#22-exemplos-reais-pelo-mundo)
2.3 [Vantagens de Ter um CSIRT](#23-vantagens-de-ter-um-csirt)

### Capítulo 3 — Como Criar um CSIRT
3.1 [Os 4 Fundamentos Essenciais](#31-os-4-fundamentos-essenciais)
3.2 [Missão e Constituinte](#32-missao-e-constituinte)
3.3 [Modelos Organizacionais](#33-modelos-organizacionais)
3.4 [Autoridade e Cooperação](#34-autoridade-e-cooperacao)

### Capítulo 4 — Recursos, Processos e Operações
4.1 [Estrutura da Equipa e Papéis](#41-estrutura-da-equipa-e-papeis)
4.2 [Processos e Procedimentos](#42-processos-e-procedimentos)
4.3 [Ferramentas Tecnológicas](#43-ferramentas-tecnologicas)
4.4 [Fluxo de Resposta a Incidentes](#44-fluxo-de-resposta-a-incidentes)
4.5 [Disponibilidade 24/7 e Integração](#45-disponibilidade-247-e-integracao)

### Aplicação e avaliação
5. [Exemplos práticos](#5-exemplos-praticos)
6. [Exercícios](#6-exercicios)
7. [Armadilhas e confusões a evitar](#7-armadilhas-e-confusoes-a-evitar)
8. [Resumo rápido](#8-resumo-rapido)

---

## Capítulo 1 — O que é um CSIRT?

### 1.1 O Incidente que Mudou a Internet

Um **CSIRT (Computer Security Incident Response Team)** é uma equipa organizada com mandato formal para **prevenir, detetar, responder e aprender** com incidentes de cibersegurança que afetam uma *constituency* bem definida. A sua razão histórica de existir nasce num evento concreto.

#### O Worm Morris — novembro de 1988

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

### 1.2 Definição, Siglas e Terminologia

#### Definição canónica

> *Um CSIRT é uma equipa que fornece, a uma constituinte bem definida, serviços e suporte para prevenir e responder a incidentes de segurança informática.*

#### Siglas que se encontram em literatura

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

#### CERT (1988) vs CSIRT (1998) — comparação lado-a-lado

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

### 1.3 Atividades e Serviços de um CSIRT

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

#### Lista de atividades típicas (RFC 2350 + práticas modernas)

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

## Capítulo 2 — Tipos de CSIRT e Exemplos Reais

### 2.1 Tipos de CSIRT por Constituinte

Os CSIRTs diferenciam-se pela *constituency* que servem:

| Tipo | Constituency | O que faz |
|------|-------------|-----------|
| **Enterprise CSIRT** | Organização-mãe (banco, universidade, fabricante, agência pública) | Serve internamente uma organização |
| **National CSIRT** | Todo um país | Mandato legal nacional (em PT: **CNCS**) |
| **Coordination Center** | Múltiplos CSIRTs | Facilita cooperação; não responde diretamente (CERT/CC, CISA, CERT-EU) |
| **Analysis Center** | Setor ou comunidade | Sintetiza dados, emite *early warnings* (H-ISAC, FS-ISAC) |
| **Vendor Team (PSIRT)** | Utilizadores dos produtos do *vendor* | Trata vulnerabilidades do produto (MSRC, Cisco PSIRT) |
| **Incident Response Provider** | Clientes pagos | Modelo MSSP/DFIR (Mandiant, CrowdStrike Services) |

#### Exemplos por setor

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

### 2.2 Exemplos Reais pelo Mundo

Os CSIRTs nacionais de referência que qualquer aluno de cibersegurança deve conhecer:

| 🌐 CSIRT | País / Região | Papel | Website |
|---------|---------------|-------|---------|
| **CERT/CC** | EUA (Carnegie Mellon) | O **primeiro** CSIRT — fundado 17 nov 1988 | [sei.cmu.edu/about/divisions/cert](https://www.sei.cmu.edu/about/divisions/cert/) |
| **CISA / US-CERT** | EUA (governo federal) | Proteção nacional de infraestrutura crítica | [cisa.gov](https://www.cisa.gov) |
| **NCSC UK** | Reino Unido | National Cyber Security Centre | [ncsc.gov.uk](https://www.ncsc.gov.uk) |
| **CERT-EU** | União Europeia | Instituições europeias | [cert.europa.eu](https://www.cert.europa.eu) |
| **SingCERT** | Singapura | Modelo de CSIRT nacional de referência | [csa.gov.sg/singcert](https://www.csa.gov.sg/singcert) |
| **CNCS / CERT.PT** | Portugal | Centro Nacional de Cibersegurança | [cncs.gov.pt](https://www.cncs.gov.pt) |

#### Caso de estudo: SingCERT

**Missão:** *"One Point of Trusted Contact — Facilitate Security Threats Resolution — Increase National Competency in IT Security."*

Três frases, três compromissos claros. É citado em manuais por ser um dos *mission statements* mais curtos e concretos alguma vez redigidos para um CSIRT nacional.

#### Caso de estudo: CNCS — Portugal

Centro Nacional de Cibersegurança, tutelado pelo Ministro da Presidência. Coordena a resposta a incidentes em todo o país, opera o **CERT.PT** como ponto operacional, e lidera a **Rede Nacional de CSIRTs**. Recebe notificações NIS2 (DL 125/2025 art. 42.º) e colabora com autoridades judiciais e CSIRTs internacionais.

---

### 2.3 Vantagens de Ter um CSIRT

Ter um CSIRT formal traz três benefícios estruturais à organização:

| Benefício | Valor concreto |
|-----------|----------------|
| **1. Gestão centralizada da informação de incidentes** | Informação e decisões coerentes; histórico completo; partilha eficiente entre equipas; decisão mais rápida |
| **2. Ponto central de contacto (PoC)** | *Trusted broker* interno e externo; comunicação direta de incidentes; informação consolidada do exterior; PoC 24/7 |
| **3. Relação de confiança pré-estabelecida** | Mais informação disponível para resposta; pronto para qualquer situação; troca de *threat intel* com outros CSIRTs |

!!! danger "Sem confiança, não há relatórios de incidentes"
    A vantagem de ter um CSIRT **depende da dimensão e tipo de negócio** da organização. Mas em qualquer caso, **sem confiança construída** com a constituinte e com pares externos, o CSIRT não recebe reportes nem consegue partilhar IOCs. A confiança demora anos a construir e destrói-se em dias.

#### Fluxo do Incident Handling pelo CSIRT

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

## Capítulo 3 — Como Criar um CSIRT

### 3.1 Os 4 Fundamentos Essenciais

Criar um CSIRT formal exige definir quatro fundações. **Saltar qualquer uma** produz uma equipa com mandato ambíguo e baixa eficácia.

```
  ╔═══════════════════════════════════════════════════════════════════╗
  ║   OS 4 FUNDAMENTOS DE UM CSIRT                                   ║
  ║                                                                  ║
  ║   ┌─────────────┐   ┌─────────────┐                              ║
  ║   │  1. MISSÃO  │   │ 2. CONSTI-  │                              ║
  ║   │             │   │    TUINTE   │                              ║
  ║   │  Porque     │   │             │                              ║
  ║   │  existimos? │   │  Quem       │                              ║
  ║   │             │   │  servimos?  │                              ║
  ║   └──────┬──────┘   └──────┬──────┘                              ║
  ║          │                 │                                     ║
  ║          ▼                 ▼                                     ║
  ║   ┌─────────────┐   ┌─────────────┐                              ║
  ║   │ 3. POSIÇÃO  │   │ 4. RELAÇÃO  │                              ║
  ║   │    NA ORG + │   │  COM OUTRAS │                              ║
  ║   │  AUTORIDADE │   │   EQUIPAS   │                              ║
  ║   │             │   │             │                              ║
  ║   │  Que papel  │   │  Com quem   │                              ║
  ║   │  e poder?   │   │  cooperamos?│                              ║
  ║   └─────────────┘   └─────────────┘                              ║
  ╚═══════════════════════════════════════════════════════════════════╝
```

#### Resumo dos 4 fundamentos

| # | Fundamento | Questão-chave | Saídas documentais |
|---|-----------|---------------|---------------------|
| **1** | **Missão (Mission Statement)** | Porquê existimos? | Declaração de missão (3-4 frases) |
| **2** | **Constituinte** | Quem servimos? Que incidentes tratamos? | Definição de perímetro, SLAs de serviço |
| **3** | **Posição e Autoridade** | Que papel na gestão de risco? Que poder? | Organograma, matriz RACI, níveis de autoridade pré-aprovados |
| **4** | **Relação com outras equipas** | Com quem cooperamos? Sob que base legal? | NDA, MOU, Terms of Reference |

---

### 3.2 Missão e Constituinte

#### 3.2.1 Como definir a missão

Uma *mission statement* é uma declaração de 3-4 frases que responde a **"Porquê existimos?"**. Deve ser:

- **Não ambígua** — sem linguagem vazia tipo "excelência em segurança";
- **Imperativa** — obriga a equipa a estabelecer serviços, políticas e padrões de qualidade;
- **Alinhada** com a missão da organização-mãe;
- **Comunicada** amplamente à constituinte e a outros CSIRTs.

**Passos de definição:**

1. Clarificar o papel esperado pela organização;
2. Redigir texto que **reforce** os objetivos da organização-mãe;
3. **Obter compromisso formal** da Direção (sem isto, o CSIRT não tem autoridade);
4. Anunciar à constituinte e a outros CSIRTs.

!!! example "Exemplos reais de mission statements"

    **SingCERT (Singapura):**

    > *One Point of Trusted Contact — Facilitate Security Threats Resolution — Increase National Competency in IT Security.*

    **Exemplo fictício de CERT empresarial:**

    > *O CERT fornece informação e assistência ao pessoal da empresa para reduzir o risco de incidentes de cibersegurança e responder a tais incidentes quando ocorrem.*

#### 3.2.2 Como definir a constituinte

A **constituinte** é o conjunto bem definido de **entidades servidas** pelo CSIRT. Sem constituinte clara, o CSIRT não sabe a quem responde nem de quem aceita reportes.

**A constituinte ajuda a definir:**

- Qual é o propósito e natureza do CSIRT?
- Quem é servido?
- Que tipos de incidentes são tratados?
- Que relações com outros CSIRTs são necessárias?
- **Qual é a autoridade** do CSIRT sobre essa constituinte.

**Tipos de constituintes:**

| Tipo | Exemplos | Incidentes |
|------|----------|------------|
| **Enterprise** | Bank CSIRT, University CSIRT | Internos |
| **Setor** | FS-ISAC (financeiro), H-ISAC (saúde) | Setoriais |
| **Infraestrutura crítica** | Operadores de serviços essenciais (NIS2) | NIS2-relevantes |
| **Produto** | Cisco PSIRT, Microsoft MSRC | Vulnerabilidades do produto |
| **Nacional** | CNCS (PT), SingCERT | Nacionais |
| **Cliente** | MSSPs | Contratuais |

!!! warning "Sobreposição de constituintes"
    Constituintes podem **sobrepor-se** (ex.: um hospital público está coberto pelo seu CSIRT interno, pelo SPMS-CSIRT setorial, pelo CNCS nacional). A **coordenação é chave** — e existe o conceito de *"CSIRT de último recurso"* (normalmente o nacional) para resolver ambiguidade.

---

### 3.3 Modelos Organizacionais

A forma como a equipa está **estruturada internamente** determina o nível de maturidade e a eficácia da resposta. Existem **5 modelos** em ordem crescente de maturidade.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │   5 MODELOS ORGANIZACIONAIS — DA IMATURIDADE À COORDENAÇÃO      │
  │                                                                 │
  │   1. Security Team      (sem CSIRT formal; ad-hoc)              │
  │            │                                                    │
  │            ▼                                                    │
  │   2. Distributed        (equipa espalhada, coordenador)         │
  │            │                                                    │
  │            ▼                                                    │
  │   3. Centralized        (equipa dedicada a tempo inteiro)       │
  │            │                                                    │
  │            ▼                                                    │
  │   4. Combined           (núcleo central + braços distribuídos)  │
  │            │                                                    │
  │            ▼                                                    │
  │   5. Coordinating       (não responde — coordena outros CSIRTs) │
  └─────────────────────────────────────────────────────────────────┘
```

#### 1. Security Team (Ad-hoc)

- CSIRT ainda **não foi formalmente criado**;
- Administradores locais lidam com incidentes de forma **ad-hoc**;
- Sem coordenação ou padronização;
- Falha típica: cada incidente é tratado de raiz; não há aprendizagem acumulada.

#### 2. Internal Distributed CSIRT

- Estrutura por **localização geográfica** ou **função**;
- Membros são colaboradores existentes com atribuição parcial ao CSIRT;
- Existe um **gestor coordenador** com autoridade formal;
- ✅ Vantagem: conhecimento local profundo.
- ⚠️ Desvantagem: conflitos de prioridades diárias.

#### 3. Internal Centralized CSIRT

- Equipa **localizada centralmente**, dedicada **a tempo inteiro**;
- Gestor reporta à **gestão de topo** (CISO ou CEO);
- Funciona como **ponto único de contacto**;
- Modelo de referência para organizações de dimensão média/grande.

#### 4. Combined Distributed & Centralized

- **Núcleo central** (triagem, coordenação, especialistas forense/malware);
- **Braços distribuídos** em unidades de negócio ou localizações remotas;
- Aproveita conhecimento local **e** centraliza inteligência;
- Adotado por CSIRTs empresariais multinacionais.

#### 5. Coordinating CSIRT

- **Não responde diretamente** a incidentes;
- Facilita cooperação entre outros CSIRTs (nacional, setorial, internacional);
- Exemplos: CERT/CC, FIRST, CNCS (parcialmente).

---

### 3.4 Autoridade e Cooperação

#### 3.4.1 Três níveis de autoridade

Para além de **onde** está posicionado, é crítico clarificar **quanta autoridade** tem para agir.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │   NÍVEIS DE AUTORIDADE DE UM CSIRT                              │
  │                                                                 │
  │   FULL AUTHORITY      SHARED AUTHORITY       NO AUTHORITY       │
  │                                                                 │
  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
  │   │ Decide sem   │    │ Participa na │    │ Só aconselha │      │
  │   │ aprovação    │    │ decisão mas  │    │ — não decide │      │
  │   │ e executa    │    │ não decide   │    │ nem executa  │      │
  │   │              │    │ sozinho      │    │              │      │
  │   │ Ex.: isolar  │    │ Ex.: propõe  │    │ Ex.: sugere  │      │
  │   │ rede em P1   │    │ e aguarda    │    │ medidas a    │      │
  │   │ sem call     │    │ Direção      │    │ process owner│      │
  │   └──────────────┘    └──────────────┘    └──────────────┘      │
  │                                                                 │
  │   MATURIDADE ALTA    MATURIDADE MÉDIA    MATURIDADE BAIXA       │
  └─────────────────────────────────────────────────────────────────┘
```

| Nível | Caraterística | Quando usar |
|-------|---------------|-------------|
| **Full** | Decide e atua sem aprovação em tempo real | P1 crítico onde atraso = dano; CSIRTs maduros |
| **Shared** | Recomenda e a decisão é do process owner ou Direção | Maioria das decisões não-críticas |
| **No authority** | Apenas aconselha; mesmo em crise, não pode atuar | CSIRTs iniciais; tende a falhar em P1 |

!!! danger "O problema do CSIRT sem autoridade"
    Um CSIRT *No authority* é frequentemente **apenas cosmético** — serve auditorias mas falha em P1. A autoridade tem de ser **pré-aprovada por escrito** pela Direção, não negociada durante a crise.

#### 3.4.2 Modelos de cooperação entre CSIRTs

Nenhum CSIRT opera isolado. A cooperação com outros CSIRTs é **coração** do modelo.

| Modelo | Descrição | Exemplo |
|--------|-----------|---------|
| **Bilateral team-team** | Acordo direto entre duas equipas, baseado em confiança construída ao longo de anos | CSIRT bancário A ↔ CSIRT bancário B |
| **Associação (multilateral)** | Grupo, fórum, *task force*, aliança com interesses comuns | [FIRST](https://www.first.org), [TF-CSIRT](https://tf-csirt.org), Rede Nacional de CSIRTs |
| **Cooperação entre associações** | Duas ou mais associações trocam experiência e alinham políticas | FIRST ↔ TF-CSIRT |

#### 3.4.3 Base legal para cooperação

Quatro instrumentos jurídicos suportam a cooperação, por ordem crescente de formalidade:

| Instrumento | Natureza |
|-------------|----------|
| **NDA** (Non-Disclosure Agreement) | Contrato legal para proteger informação confidencial partilhada |
| **MOU** (Memorandum of Understanding) | Acordo bilateral formal, menos vinculativo que contrato — declaração de intenção com linha de ação comum |
| **Contract** | Acordo legal completo, com obrigações mutuamente vinculativas e remédios legais em caso de quebra |
| **Terms of Reference** | Define **visão, objetivos, *scope*, *stakeholders*, papéis, plano de recursos** — crítico para associações |

> *"O domínio dos CERTs é a Internet — e, portanto, o mundo. A cooperação está no coração do framework CERT."*

!!! info "Rede Nacional de CSIRTs (Portugal)"
    O CNCS coordena a Rede Nacional de CSIRTs — uma associação que cobre CSIRTs setoriais, académicos e empresariais. A adesão envolve requisitos mínimos de maturidade e compromissos de partilha de informação. Ver [redecsirt.pt](https://www.redecsirt.pt/).

---

## Capítulo 4 — Recursos, Processos e Operações

### 4.1 Estrutura da Equipa e Papéis

#### 4.1.1 Níveis L1 a L4

Modelo tipico de SOC/CSIRT moderno, com responsabilidades crescentes:

```
  ┌────────────────────────────────────────────────────────────────┐
  │   NÍVEIS DE UMA EQUIPA CSIRT                                   │
  │                                                                │
  │   L1 — Security Analyst                                        │
  │        Primeira resposta, triagem inicial, identificar         │
  │        ameaças, responder rapidamente, medidas de              │
  │        contenção. Linha da frente. Frequentemente 24/7.        │
  │            │                                                   │
  │            ▼                                                   │
  │   L2 — Senior Security Analyst                                 │
  │        Ameaças graves, investigação aprofundada, análise       │
  │        de sistemas afetados, planos de reparação,              │
  │        erradicação de ameaças.                                 │
  │            │                                                   │
  │            ▼                                                   │
  │   L3 — Security Manager / Threat Hunter                        │
  │        Vulnerabilidades proativas, ferramentas avançadas,      │
  │        forense digital, compliance, auditoria, melhoria        │
  │        contínua.                                               │
  │            │                                                   │
  │            ▼                                                   │
  │   L4 — CISO (Chief Information Security Officer)               │
  │        Estratégia e políticas, comunicação com administração,  │
  │        gestão de risco, orçamento, relações externas.          │
  └────────────────────────────────────────────────────────────────┘
```

| Nível | Papel | Responsabilidades principais |
|-------|-------|-------------------------------|
| **L1** | **Security Analyst** — linha da frente | Triagem inicial, aplicação de *runbooks*, escalonamento. 24/7. |
| **L2** | **Senior Security Analyst** | Investigação técnica aprofundada, aplicação de *playbooks*, decisão sobre contenção e erradicação. |
| **L3** | **Security Manager / Threat Hunter** | *Threat hunting*, ferramentas avançadas, desenho de detecções, forense digital, auditoria. |
| **L4** | **CISO** | Define política, supervisiona todas as operações, reporta à administração, gere *compliance*. |

#### 4.1.2 Outros papéis essenciais

Em CSIRTs médios/grandes, para além da hierarquia L1-L4, existem papéis especializados:

| Papéis operacionais | Papéis de suporte |
|---------------------|-------------------|
| Hotline / Helpdesk | Legal / Paralegal Liaison |
| Incident Handlers | Law Enforcement Liaison |
| Vulnerability Handlers | Media Relations |
| Artefact Analysis (malware) | Technical Writers |
| Platform Specialists (Win/Linux/Cloud) | Network / System Administrators |
| Trainers | Auditors / Quality Assurance |
| Technology Watchers | Marketing / Awareness |
| CyberIntel Specialists | |
| SIEM / EDR Engineers | |
| Forensics Experts | |

#### 4.1.3 Competências requeridas

**Técnicas essenciais:** familiaridade com OS, redes, cloud, endpoints; conhecimento de TTPs (ver [mapa ATT&CK](../comum/attack-mapping.md)); base forense.

**Não-técnicas (frequentemente subestimadas):**

- **Comunicação oral e escrita** — para reportes, briefings, notificações regulatórias;
- **Confiabilidade** (*trustworthiness*) — o CSIRT acede a dados sensíveis; *background check* é normal;
- Calma sob pressão; pensamento estruturado; trabalho em equipa.

#### 4.1.4 Formação e certificações

Se a organização não consegue contratar *skills* prontas, tem de formar. Recursos comuns:

- **SEI CERT Division** — cursos oficiais em Incident Response;
- **SANS** — certificações **GIAC** (GCIH, GCFA, GNFA) amplamente reconhecidas;
- **ENISA** — training material público para CSIRTs europeus (grátis);
- **FIRST** — eventos anuais, *hands-on training*.

---

### 4.2 Processos e Procedimentos

#### 4.2.1 SOPs (Standard Operating Procedures) essenciais

Toda a operação do CSIRT deve ser regida por SOPs formais. Principais:

- ✔ Aceitar e acompanhar relatórios de incidentes
- ✔ Responder à *hotline* / linha direta
- ✔ *Handling* de incidentes e vulnerabilidades
- ✔ Recolha, fixação e preservação de provas (cadeia de custódia, RFC 3227)
- ✔ Configuração de redes e sistemas CSIRT
- ✔ Monitorização e deteção de intrusões
- ✔ Backup e armazenamento de dados de incidente
- ✔ Processos de notificação (NIS2 24h/72h/30d; RGPD 72h)
- ✔ Formação e *mentoring*

#### 4.2.2 Procedimentos por tipo de incidente

Para cada tipologia, o CSIRT deve ter um **playbook específico**. Mínimos típicos:

| Tipo de Incidente | Ações principais |
|-------------------|-------------------|
| **Malware** | Análise estática e dinâmica, contenção (isolamento), remoção, validação |
| **DDoS** | Mitigação (scrubbing, rate limiting), filtragem na borda, escalonamento para ISP/CDN |
| **Web Defacement** | Restauração do site, investigação do vetor (CMS, credenciais, vulnerabilidade), hardening |
| **Fraud** | Preservação de evidência, notificação legal (MP/PJ), coordenação com banco |
| **Data Breach** | Avaliação de risco (WP250), notificação CNPD 72h (RGPD art. 33.º), comunicação aos titulares (art. 34.º), forense |
| **Privacy** | Avaliação de impacto, remediação, coordenação com DPO |

Ver os [playbooks detalhados](../gestao_incidentes/playbook-ransomware.docx) em formato editável.

#### 4.2.3 Ordem lógica de serviços

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │    PREVENÇÃO   ───►   DETEÇÃO   ───►   TRATAMENTO               │
  │                                                                 │
  │    Awareness         IDS/IPS          Coordenação               │
  │    Audits            Firewall         Triagem                   │
  │    Vuln Scans        SIEM             Contenção                 │
  │    Advisories        Sensores         Erradicação               │
  │    Formação          Helpdesk         Recuperação               │
  │                      Abuse box        Follow-up                 │
  └─────────────────────────────────────────────────────────────────┘
```

!!! tip "Handbook canónico"
    *Handbook for Computer Security Incident Response Teams (CSIRTs)* (SEI, Killcrece et al., 2003) é a referência mais completa para desenho de políticas e procedimentos. Descarregável gratuitamente em [resources.sei.cmu.edu](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305).

---

### 4.3 Ferramentas Tecnológicas

As ferramentas dividem-se em **dois grupos principais**.

#### 4.3.1 Gestão de incidentes (ticketing, case management)

| Ferramenta | Categoria | Notas |
|-----------|-----------|-------|
| **RTIR** (Request Tracker for IR) | *Ticketing* clássico | Baseado em Perl, usado por muitos CSIRTs nacionais |
| **OTRS** | *Ticketing* | Módulos de IR |
| **GLPI** | *Service desk* | Uso comum em organizações públicas PT |
| **JIRA Service Management** | *Issue tracking* comercial | Boa integração com *devops* |
| **ServiceNow SecOps** | ITSM *enterprise* | Integração com CMDB |
| **TheHive** + **Cortex** | *Case management open source* | **Referência** em CSIRTs europeus |
| **DFIR-IRIS** | *Case management open source* | Alternativa focada em DFIR |

#### 4.3.2 Análise e investigação (DFIR)

Por **área de análise**:

| Área de análise | Ferramentas típicas |
|-----------------|----------------------|
| **Host Analysis** | **Volatility** (memória), **Velociraptor** (endpoint), KAPE, Autopsy |
| **Log Analysis** | **Splunk**, **ELK Stack** (Elasticsearch + Logstash + Kibana), Graylog |
| **Traffic Analysis** | **Wireshark**, **Zeek** (ex-Bro), tshark, NetworkMiner |
| **Network Monitoring** | **Nagios**, **Zabbix**, PRTG |
| **Malware Analysis** | **Cuckoo Sandbox**, **REMnux**, CAPEv2, Any.run, YARA |

Stack forense detalhada em [Deteção, Contenção e Investigação](../ih/detecao-contencao.md#stack-forense-de-referencia).

#### 4.3.3 Partilha de Threat Intelligence

| Ferramenta / Padrão | Propósito |
|---------------------|-----------|
| **MISP** | Plataforma aberta de partilha de IOCs e TTPs |
| **OpenCTI** | Plataforma CTI com integração ATT&CK nativa |
| **STIX 2.1** | *Structured Threat Information Expression* — formato de dados |
| **TAXII** | *Trusted Automated Exchange of Intelligence Information* — protocolo de transporte |

#### 4.3.4 Exemplo prático: integração GLPI + TheHive + Cortex + MISP

```
  ┌──────────────────────────────────────────────────────────────┐
  │   STACK DE CASE MANAGEMENT + ENRIQUECIMENTO + CTI            │
  │                                                              │
  │   ┌────────────┐         ┌────────────┐                      │
  │   │   GLPI     │────────►│  TheHive   │                      │
  │   │            │ Ticket /│            │                      │
  │   │ Service    │ Asset    │ Case       │                      │
  │   │ Desk       │ sync    │ Management │                      │
  │   └────────────┘         └─────┬──────┘                      │
  │                                 │                            │
  │                                 │ Observables                │
  │                                 ▼                            │
  │                          ┌────────────┐                      │
  │                          │   Cortex   │                      │
  │                          │            │                      │
  │                          │  Analysis  │                      │
  │                          │  Engines   │                      │
  │                          └─────┬──────┘                      │
  │                                 │                            │
  │                                 │ IOCs / TTPs                │
  │                                 ▼                            │
  │                          ┌────────────┐                      │
  │                          │    MISP    │                      │
  │                          │            │                      │
  │                          │  Threat    │                      │
  │                          │  Sharing   │◄─── pares setoriais  │
  │                          └────────────┘                      │
  └──────────────────────────────────────────────────────────────┘
```

**Fluxo:** ticket em GLPI → enriquece caso em TheHive → Cortex corre *analyzers* (VirusTotal, MISP lookup, etc.) → IOCs confirmados são publicados no MISP → partilhados com pares setoriais (ISACs, CNCS, FIRST).

---

### 4.4 Fluxo de Resposta a Incidentes

#### 4.4.1 Fluxo operacional (SOC moderno)

```
  ┌────────────────────────────────────────────────────────────────┐
  │   FLUXO OPERACIONAL                                            │
  │                                                                │
  │   ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌───────────┐  │
  │   │  Alertas │─►│  Triagem │─►│ Classificação│─►│Priorização│  │
  │   └──────────┘  └──────────┘  └──────────────┘  └─────┬─────┘  │
  │                                                       │        │
  │                                                       ▼        │
  │                                                ┌────────────┐  │
  │                                                │Escalonamen-│  │
  │                                                │    to      │  │
  │                                                └─────┬──────┘  │
  │                                                      │         │
  │                                                      ▼         │
  │                                              ┌───────────────┐ │
  │                                              │   Análise     │ │
  │                                              │ (L2/L3 DFIR)  │ │
  │                                              └───────┬───────┘ │
  │                                                      │         │
  │                                                      ▼         │
  │                                              ┌───────────────┐ │
  │                                              │  Resolução    │ │
  │                                              │  + Lessons    │ │
  │                                              └───────────────┘ │
  └────────────────────────────────────────────────────────────────┘
```

#### 4.4.2 Fases do Incident Handling (NIST SP 800-61)

O NIST define **6 fases** que todo o CSIRT maduro executa ciclicamente:

| Fase | O que se faz | Resultado |
|------|--------------|-----------|
| **1. Preparação** | Playbooks, casos de uso, treino, ferramentas instaladas | Pronto para responder |
| **2. Deteção e Análise** | Identificar e confirmar; rejeitar falsos positivos | Incidente confirmado e classificado |
| **3. Contenção** | Limitar o impacto do incidente | Propagação interrompida |
| **4. Erradicação** | Remover a causa raiz | Ameaça eliminada |
| **5. Recuperação** | Restaurar sistemas afetados | Operação normal retomada |
| **6. Lições Aprendidas** | Reunião pós-incidente, PIR, melhoria | Playbooks e controlos actualizados |

> Complementar com o modelo SANS (6 passos: PICERL — Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned). Ver [Frameworks de IR](../ih/frameworks.md) para comparação.

#### 4.4.3 Playbooks e casos de uso

Para cada tipo de incidente, o CSIRT deve ter:

- 📄 **Playbook documentado** com passos sequenciais;
- 🎯 **Casos de uso** para SIEM/SOAR (regras de detecção);
- 🛠️ **Runbooks operacionais** (comandos, scripts, queries);
- 📈 **Escalonamento** definido (quando e para quem);
- ⏱️ **SLAs de resposta** por severidade;
- 📧 **Notificação a stakeholders** definida.

#### 4.4.4 Melhoria contínua

Cada incidente é **oportunidade de aprendizagem**. Práticas maduras:

- Reuniões pós-incidente em ≤ 2 semanas;
- Relatório pós-incidente (PIR) formal em ≤ 30 dias;
- Atualização de *playbooks* com base nas lições;
- Ajuste de casos de uso do SIEM/SOAR;
- Revisão de SLAs conforme histórico.

---

### 4.5 Disponibilidade 24/7 e Integração

#### 4.5.1 Alcance 24/7 — o CSIRT tem de estar contactável

Os incidentes não ocorrem em horário laboral. Mecanismos mínimos:

| Canal | Uso |
|-------|-----|
| **Email dedicado** | `csirt@organização` — *mailing list* que chega a vários destinatários |
| **Telefone 24/7** | Número único com *on-call* rotativo |
| **SMS / mensageria** | Para casos urgentes fora de horário |
| **Registo WHOIS** (RT-Object) | IP-range da constituinte aponta para contactos CSIRT |
| **Website institucional** | Contactos e *responsible disclosure policy* |
| **Abuse mailbox** | `abuse@organização` conforme [RIPE](https://www.ripe.net/support/abuse), ARIN, etc. |

#### 4.5.2 Estrutura de equipa por níveis

```
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   ┌────────────────────┐                                     │
  │   │   1.ª LINHA        │   Helpdesk, triagem, classificação  │
  │   │   (L1)             │   inicial                           │
  │   └──────────┬─────────┘                                     │
  │              │                                               │
  │              ▼                                               │
  │   ┌────────────────────┐                                     │
  │   │   2.ª LINHA        │   Especialistas: Network Forensics, │
  │   │   (L2/L3)          │   Malware Analysis, Threat Hunting  │
  │   └──────────┬─────────┘                                     │
  │              │                                               │
  │              ▼                                               │
  │   ┌────────────────────┐                                     │
  │   │   COORDENAÇÃO      │   Gestão, decisão estratégica,      │
  │   │   (L4 — CISO)      │   relações externas                 │
  │   └────────────────────┘                                     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

#### 4.5.3 Relações externas essenciais

Um CSIRT maduro mantém contactos **pré-estabelecidos e ativos** com:

- **ISPs** — para mitigação de DDoS, bloqueios de rotas, etc.;
- ***Vendors*** — suporte em incidentes com os seus produtos;
- **Law Enforcement** — PJ (UNC3T), Ministério Público, Europol;
- **Abuse Contacts** — RIPE, ARIN, APNIC (registros regionais);
- **CSIRTs Nacionais** — CNCS em Portugal, outros via Rede Nacional;
- **FIRST** (Forum of Incident Response and Security Teams) — comunidade global;
- **CERT-EU** — instituições europeias e partilha intra-UE.

!!! tip "Manter as relações ativas"
    Publicar contactos não basta. É preciso **interagir regularmente** com pares — conferências FIRST, exercícios conjuntos, reuniões periódicas da Rede Nacional de CSIRTs. Durante uma crise, a confiança construída ao longo de anos é o que permite cooperação imediata.

---

## 5. Exemplos práticos

### Exemplo 1 — Município de Vila Feliz decide criar CSIRT

**Contexto:** Câmara Municipal de Vila Feliz (120 colaboradores, 30 mil munícipes), sofreu dois incidentes em 12 meses: phishing que comprometeu contas de tesouraria, e ransomware num servidor de processos administrativos. Decide formalizar um CSIRT.

| Pilar | Decisão |
|-------|---------|
| **Missão** | *"O CSIRT de Vila Feliz protege a informação do município e dos seus munícipes, prevenindo e respondendo a incidentes de cibersegurança, cooperando com o CNCS e a Rede Nacional de CSIRTs."* |
| **Constituinte** | Todos os serviços da CM; indiretamente, cidadãos que usam serviços digitais |
| **Papel** | Reporta ao responsável pela DIMSI; **Shared authority** — pode conter mas não declarar desastre |
| **Relações** | Rede Nacional de CSIRTs (CNCS); PJ-UNC3T; CCDR; CNPD |
| **Modelo** | *Internal Distributed* — equipa de 3 pessoas a tempo parcial (responsável DIMSI + 2 técnicos SI) |
| **Ferramentas** | GLPI (já usado internamente) + TheHive open source; SIEM da CNCS/SOC nacional |

**Primeiro marco:** publicar Política de Gestão de Incidentes, Matriz RACI e procedimento de classificação. Fazer *tabletop* em 90 dias.

### Exemplo 2 — Banco escolhe modelo organizacional

**Contexto:** Banco regional com 40 agências e 900 colaboradores. Já tem departamento de segurança (6 pessoas) mas resposta a incidentes é ad-hoc. O CISO propõe formalizar o modelo.

| Opção | Análise |
|-------|---------|
| **Security Team (status quo)** | ❌ Falha em auditorias de conformidade (supervisão Banco de Portugal); não cumpre DORA |
| **Distributed** | ⚠️ Adequado para multinacionais; demasiado para dimensão regional |
| **Centralized** | ✅ **Recomendado** — 4 pessoas dedicadas 24/7, reportando ao CISO |
| **Combined** | ⚠️ Sobredimensionado para esta escala |
| **Coordinating** | ❌ Não aplicável |

**Decisão:** Centralized, integrando 3 novos perfis (L1 + L2 + L3/forense); CISO continua como L4. Contratar MSSP externo para cobertura noturna e fins de semana. Orçamento aprovado: €350K/ano.

### Exemplo 3 — CSIRT nacional e constituinte sobreposta

**Contexto:** Durante um incidente de ransomware num hospital público, três CSIRTs têm constituinte sobreposta:

- **CSIRT interno** do hospital;
- **SPMS-CSIRT** (setor saúde nacional);
- **CNCS/CERT.PT** (nacional, por ser incidente NIS2 em operador de serviço essencial).

| Quem faz o quê | Como se coordena |
|----------------|------------------|
| **CSIRT hospital** | Contenção imediata, preservação de evidência, aplicação de *playbook* |
| **SPMS-CSIRT** | Apoio técnico, coordenação setorial (outros hospitais alertados) |
| **CNCS** | Notificação NIS2 (24h/72h/30d), coordenação com autoridades europeias |

**Critério:** *"CSIRT de último recurso"* = CNCS. Mas a primeira linha de resposta operacional continua no hospital. A comunicação a Direção, CNPD (dados de saúde), PJ e Bombeiros (se paragem de equipamento afetar serviço clínico) é coordenada via CSIRT hospital + equipa jurídica.

---

## 6. Exercícios

### Exercício 1 — Identificar o modelo organizacional (nível básico)

Para cada descrição, identifique qual dos 5 modelos organizacionais se aplica:

| Descrição | Modelo? |
|-----------|---------|
| a) Universidade sem equipa formal; cada faculdade trata os seus próprios incidentes quando acontecem | ? |
| b) Empresa multinacional com equipa de 15 pessoas em Lisboa que coordena sub-equipas em 8 países | ? |
| c) CNCS que coordena incidentes entre CSIRTs nacionais e setoriais, mas não responde diretamente a incidentes de nenhum operador | ? |
| d) Banco com 5 analistas dedicados 24/7 no SOC central; CISO reporta ao CEO | ? |
| e) PME com 40 pessoas onde o responsável de IT mantém a resposta a incidentes como 20% do seu tempo | ? |

??? success "Solução 1"
    | Descrição | Modelo | Justificação |
    |-----------|--------|--------------|
    | a) | **Security Team** | Sem CSIRT formal, ad-hoc |
    | b) | **Combined Distributed + Centralized** | Núcleo central + braços distribuídos |
    | c) | **Coordinating CSIRT** | Coordena outros CSIRTs sem responder |
    | d) | **Internal Centralized** | Equipa dedicada, centralizada, 24/7 |
    | e) | **Internal Distributed** (embrionário) ou **Security Team** | Depende da formalização |

### Exercício 2 — Redigir mission statement (nível intermédio)

Uma empresa de e-commerce portuguesa (100 colaboradores, 2 armazéns, site com 200 mil clientes) está a criar o seu CSIRT. Redija um *mission statement* de 3-4 frases que:

1. Exprima o propósito de existir;
2. Seja não-ambíguo;
3. Esteja alinhado com um negócio de e-commerce (confidencialidade de dados pessoais, disponibilidade do site);
4. Reforce objetivos da organização.

??? success "Solução 2 (exemplo)"
    *"O CSIRT de [Nome da organização] protege a confidencialidade dos dados pessoais dos clientes e a disponibilidade dos serviços de e-commerce, através da prevenção, deteção e resposta a incidentes de cibersegurança. Atua como ponto único de contacto para reporte de incidentes, coordenando com autoridades (CNCS, CNPD) e parceiros externos. Contribui para o cumprimento das obrigações de conformidade (RGPD, DL 125/2025) e para a confiança contínua dos clientes na marca."*

    **Porque funciona:**
    - Explicita propósito (proteger confidencialidade + disponibilidade);
    - Identifica constituinte (dados dos clientes, serviços);
    - Nomeia autoridades relevantes;
    - Liga-se a obrigações legais específicas do negócio (RGPD + NIS2);
    - Termina com valor de negócio (confiança dos clientes).

### Exercício 3 — Desenhar níveis de autoridade (nível avançado)

O CISO de uma empresa industrial quer clarificar os níveis de autoridade do CSIRT recém-criado. Para cada ação, justifique qual deveria ser o nível de autoridade (**Full / Shared / No**):

1. Isolar da rede um *endpoint* onde o EDR detetou *beaconing* para C2 conhecido;
2. Desligar integralmente o servidor ERP durante horário laboral por suspeita de comprometimento;
3. Notificar CNCS (NIS2) em 24h;
4. Pagar resgate de ransomware;
5. Reset forçado de todas as passwords de domínio;
6. Comunicar à imprensa;
7. Bloquear temporariamente domínio `.exemplo.com` no proxy;
8. Acionar fornecedor externo de DFIR (contrato *retainer*).

??? success "Solução 3"
    | # | Ação | Autoridade | Justificação |
    |---|------|------------|--------------|
    | 1 | Isolar endpoint com beacon C2 | **Full** | Urgente, proporcional, reversível |
    | 2 | Desligar ERP | **Shared** | Impacto operacional massivo; process owner deve participar |
    | 3 | Notificar CNCS em 24h | **Full** (DPO/CISO) | Obrigação legal objetiva; atraso = infração |
    | 4 | Pagar resgate | **No** (apenas aconselha) | Decisão estratégica — Direção decide |
    | 5 | Reset de todas as passwords | **Shared** | Impacto em operações |
    | 6 | Comunicar à imprensa | **No** | Gestão de comunicação e Direção |
    | 7 | Bloquear domínio no proxy | **Full** | Reversível, defensivo standard |
    | 8 | Acionar DFIR externo | **Full** (dentro do budget) / **Shared** | Depende da alçada financeira |

---

## 7. Armadilhas e confusões a evitar

!!! danger "Confusão 1: CSIRT = SOC"
    **Errado.** Podem sobrepor-se mas não são idênticos. **SOC** é o *centro operacional* (monitorização 24/7, deteção, triagem). **CSIRT** é a *equipa de resposta* (investigação, erradicação, recuperação, *follow-up*). Em organizações pequenas a mesma equipa faz ambos; em grandes, são funções distintas com integração formal.

!!! danger "Confusão 2: Começar pela tecnologia"
    **Errado.** Comprar SIEM/EDR sem definir missão, constituinte, papéis e processos produz **uma fábrica de alertas ignorados**. Primeiro os 4 fundamentos e os processos; só depois a tecnologia.

!!! danger "Confusão 3: Um CSIRT sem autoridade é cosmético"
    **Errado.** Um CSIRT *No authority* serve para auditoria mas **falha em P1**. A autoridade tem de estar **pré-aprovada por escrito** pela Direção, com níveis claros para cada tipo de ação. Durante a crise não há tempo para convocar comités.

!!! danger "Confusão 4: Constituinte vaga = conflitos"
    **Errado.** "Servimos a empresa" não é constituinte — é aspiração. Uma constituinte bem definida inclui *perímetro* (IPs, domínios, utilizadores, serviços), *natureza* (interna, externa, ambas) e *exclusões explícitas*.

!!! danger "Confusão 5: CERT é sinónimo livre de CSIRT"
    **Errado.** CERT é **marca registada** da SEI/Carnegie Mellon desde 1997. Usar CERT sem autorização é incorreto. Na prática, os novos CSIRTs usam **CSIRT** como termo genérico.

!!! danger "Confusão 6: Relações com outros CSIRTs vêm naturalmente"
    **Errado.** A confiança que permite partilha de IOCs só se constrói através de **interação consistente** — conferências (FIRST), exercícios conjuntos, reuniões da Rede Nacional. Um CSIRT que descobre que precisa de contactos externos durante uma crise já perdeu.

!!! danger "Confusão 7: Formação técnica é suficiente"
    **Errado.** *Skills* não-técnicas (comunicação, escrita, calma sob pressão) são **iguais ou mais importantes**, especialmente em L3 e L4. Um CISO tem de comunicar questões técnicas complexas à Direção e a *stakeholders* não-técnicos.

---

## 8. Resumo rápido

### Síntese por capítulo

| Capítulo | O essencial |
|----------|-------------|
| **Cap 1 — O que é um CSIRT?** | Equipa formal com mandato para prevenir, detetar, responder e aprender com incidentes, para uma constituinte definida. Nasceu em 17 Nov 1988 (pós-Morris Worm). 3 grupos de serviços: Reativos, Proativos, Qualidade (ref: FIRST v2.1). |
| **Cap 2 — Tipos e Exemplos** | 6 tipos: Enterprise, National (CNCS), Coordination (CERT/CC, CISA, CERT-EU), Analysis (H-ISAC), Vendor/PSIRT, Provider (MSSP). 3 vantagens: gestão centralizada, PoC, confiança. |
| **Cap 3 — Como Criar** | **4 fundamentos**: Missão, Constituinte, Posição+Autoridade (Full/Shared/No), Relações externas. **5 modelos**: Security Team → Distributed → Centralized → Combined → Coordinating. **4 bases legais**: NDA, MOU, Contract, Terms of Reference. |
| **Cap 4 — Recursos e Ops** | **Pessoas:** L1 Analyst → L4 CISO + papéis de apoio. **Processos:** SOPs + playbooks por tipo (Malware, DDoS, Defacement, Fraud, Data Breach, Privacy) + NIST 6-phase. **Tecnologia:** GLPI/TheHive/Cortex/MISP + ferramentas por área (Volatility, Splunk, Wireshark, Zabbix, Cuckoo). **24/7:** email, tel, SMS, WHOIS, abuse, relações ativas. |

### Frases-chave para recordar

- *"Sem confiança, **não há partilha**; sem partilha, não há defesa coletiva."*
- *"A autoridade do CSIRT é **pré-aprovada**, não negociada durante a crise."*
- *"A missão responde a **porquê existimos**; a constituinte a **quem servimos**."*
- *"Tecnologia sem processos é uma **fábrica de alertas ignorados**."*
- *"*Skills* não-técnicas são iguais — ou mais — importantes que as técnicas."*
- *"CERT é marca registada; **CSIRT é genérico** e pode ser usado livremente."*

---

## 📎 Documentos operacionais relacionados

A criação e operação de um CSIRT materializa-se nos seguintes templates. Catálogo completo em [📋 Templates](../modelos/index.md).

- [📄 Política de Gestão de Incidentes](../gestao_incidentes/politica-gestao-incidentes.docx) — mandato e papéis do CSIRT.
- [📄 Procedimento de Escalonamento e Matriz RACI](../gestao_incidentes/procedimento-escalonamento-raci.docx) — cadeia de comando e contactos.
- [📄 Procedimento de Classificação e Severidade](../gestao_incidentes/procedimento-classificacao-severidade.docx) — matriz P1-P5 usada pela L1.
- [📄 Plano de Resposta a Incidentes (NIS2)](../gestao_incidentes/plano-resposta-incidentes-nis2.docx) — plano base para CSIRTs em entidades NIS2.
- [📄 Plano de Comunicação de Crise](../gestao_incidentes/plano-comunicacao-crise.docx) — operação externa do CSIRT.

---

## Referências

- FIRST (2019). **CSIRT Services Framework v2.1**. <https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1>
- Killcrece, G. et al. (2003). **Handbook for Computer Security Incident Response Teams (CSIRTs)**, 2nd ed. SEI/CERT Division. <https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305>
- NIST (2012). **SP 800-61 Revision 2 — Computer Security Incident Handling Guide**. <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- ENISA. **Good Practice Guide for Incident Management**. <https://www.enisa.europa.eu/publications/good-practice-guide-for-incident-management>
- RFC 2350 — *Expectations for Computer Security Incident Response*. <https://www.rfc-editor.org/rfc/rfc2350>
- Centro Nacional de Cibersegurança — **Rede Nacional de CSIRTs**. <https://www.redecsirt.pt/>
- SEI CERT Division. <https://www.sei.cmu.edu/about/divisions/cert/>

---

**Próximos passos:** Com o CSIRT estruturado, explore a [Preparação](../ih/preparacao.md) do módulo Incident Handling para perceber as atividades contínuas que a equipa deve manter entre incidentes (políticas, ferramentas, treino, canais de reporte).
