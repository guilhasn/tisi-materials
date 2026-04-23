# Setting Up CSIRT — Como criar uma equipa de resposta a incidentes

## Índice

1. [Visão geral e breve história](#1-visao-geral-e-breve-historia)
2. [Terminologia: CERT, CSIRT, CIRT, PSIRT](#2-terminologia)
3. [O que um CSIRT faz — atividades e serviços](#3-o-que-um-csirt-faz)
4. [Tipos de CSIRT](#4-tipos-de-csirt)
5. [Modelos organizacionais](#5-modelos-organizacionais)
6. [Os 4 pilares da criação de um CSIRT](#6-os-4-pilares-da-criacao-de-um-csirt)
7. [Recursos: pessoas, processos, tecnologia](#7-recursos-pessoas-processos-tecnologia)
8. [Operação 24/7 e workflow de referência](#8-operacao-247-e-workflow-de-referencia)
9. [Exemplos práticos](#9-exemplos-praticos)
10. [Exercícios](#10-exercicios)
11. [Armadilhas e confusões a evitar](#11-armadilhas-e-confusoes-a-evitar)
12. [Resumo rápido](#12-resumo-rapido)

---

## 1. Visão geral e breve história

Um **CSIRT (Computer Security Incident Response Team)** é uma equipa organizada com mandato formal para **prevenir, detetar, responder e aprender** com incidentes de cibersegurança que afetam uma *constituency* bem definida (a organização-mãe, um setor, um país).

### Origem: o worm de Morris (1988)

```
  ┌───────────────────────────────────────────────────────────────┐
  │                                                               │
  │   02 Nov 1988  —  Robert Tappan Morris (estudante Cornell)    │
  │                   lança do MIT um worm auto-replicante.        │
  │                                                               │
  │                   Infeta ~6 000 máquinas — ~10% da Internet    │
  │                   da época. 3 anos de liberdade condicional,   │
  │                   400h trabalho comunitário, multa USD 10.050. │
  │                                                               │
  │   07 Nov 1988  —  Resolução do incidente por colaboração       │
  │                   internacional ad-hoc. Muito desperdício de  │
  │                   esforço, duplicação de trabalho.             │
  │                                                               │
  │   17 Nov 1988  —  Criado o primeiro CERT (CERT/CC) na          │
  │                   Carnegie Mellon University, financiado       │
  │                   pela DARPA. Nasce o conceito de CSIRT.       │
  └───────────────────────────────────────────────────────────────┘
```

> O Morris Worm não foi apenas um incidente técnico — foi o **momento fundador** da disciplina de Incident Response moderna. A resposta caótica mostrou que a Internet precisava de **pontos de contacto formais** e coordenados.

### Porque existe um CSIRT

Ter um CSIRT dá à organização três benefícios estruturais:

| Benefício | Valor concreto |
|-----------|----------------|
| **Gestão centralizada da informação de incidentes** | Decisões coerentes; sem informação dispersa por silos |
| **Ponto único de contacto (PoC)** | Interno (para utilizadores reportarem) e externo (para autoridades, parceiros, outros CSIRTs) |
| **Relações de confiança pré-estabelecidas** | Pronto a responder sem improvisar; maior conteúdo informativo durante a crise |

!!! info "Sem confiança, não há CSIRT funcional"
    O eixo central da operação de CSIRTs — mesmo entre equipas diferentes — é a **confiança**. Sem ela, não há partilha de IOCs, não há cooperação transfronteiriça, não há relatórios de incidentes internos. Construir essa confiança demora anos, destrói-se em dias.

---

## 2. Terminologia

Várias siglas evoluíram ao longo dos anos para descrever essencialmente a mesma função. Os alunos devem reconhecê-las em literatura e relatórios.

| Sigla | Significado | Nota |
|-------|-------------|------|
| **CERT** | Computer Emergency Response Team | **Marca registada** da Carnegie Mellon (SEI/CERT-CC) desde 1988. Uso requer autorização formal. |
| **CSIRT** | Computer Security Incident Response Team | Termo **genérico, livre de marca**, padrão desde 1998. O mais usado hoje. |
| **CIRT / IRT** | (Computer) Incident Response Team | Variantes mais curtas; equivalente funcional. |
| **CSIRC / CIRC** | Computer (Security) Incident Response Capability / Center | Realça a *capacidade* mais do que a equipa. |
| **IHT** | Incident Handling Team | Ênfase em *handling*. |
| **PSIRT** | **Product** Security Incident Response Team | Trata vulnerabilidades **em produtos da própria empresa** (ex.: Cisco PSIRT, Microsoft MSRC). |
| **SOC** | Security Operations Center | Estrutura **operacional 24/7**; pode ser distinta ou sobrepor-se ao CSIRT. |

!!! warning "CERT ≠ CSIRT na formalidade"
    Para evitar problemas legais, se a equipa **não está autorizada** pela SEI a usar a marca CERT, deve chamar-se **CSIRT** (ou outra variante). O termo CERT é marca registada desde 1997 — autorização em [sei.cmu.edu/legal/permission](https://sei.cmu.edu/legal/permission/index.cfm).

---

## 3. O que um CSIRT faz

As atividades de um CSIRT moderno organizam-se em **três grupos de serviços**, formalizados no **FIRST CSIRT Services Framework** (v2.1).

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
  │   │  • Alertas       │  │                  │  │  longo prazo │  │
  │   │  • Handling      │  │  • Announcements │  │              │  │
  │   │  • Artefactos    │  │  • Technology    │  │  • Audits    │  │
  │   │  • Vulnerab.     │  │    watch         │  │  • Risk      │  │
  │   │                  │  │  • IDS & Monitor │  │    analysis  │  │
  │   │                  │  │  • Config de     │  │  • BCP       │  │
  │   │                  │  │    ferramentas   │  │  • Consulting│  │
  │   │                  │  │                  │  │  • Education │  │
  │   └──────────────────┘  └──────────────────┘  └──────────────┘  │
  └─────────────────────────────────────────────────────────────────┘
```

### 3.1 Serviços reativos (os "clássicos")

| Serviço | Descrição |
|---------|-----------|
| **Alerts & Warnings** | Emissão de alertas a constituentes sobre ameaças ativas ou vulnerabilidades. |
| **Incident Handling** | Triagem, análise, contenção, erradicação, recuperação — o core do CSIRT. |
| **Vulnerability Handling** | Receção, análise e coordenação da divulgação de vulnerabilidades. |
| **Artifact Handling** | Análise forense de malware, artefactos de disco e memória. |

### 3.2 Serviços proativos

| Serviço | Descrição |
|---------|-----------|
| **Announcements** | Boletins periódicos, boas práticas, *best of breed* de controlos. |
| **Technology Watch** | Monitorização de *threat landscape*, CVEs críticos, novas ferramentas de atacantes. |
| **Intrusion Detection** | Operação de sensores IDS/IPS; *threat hunting* proativo. |
| **Security Tool Development** | Construção de ferramentas internas de deteção e resposta. |
| **Information Dissemination** | Portal interno, *newsletters*, partilha setorial (MISP). |

### 3.3 Gestão da qualidade de segurança

| Serviço | Descrição |
|---------|-----------|
| **Risk Analysis** | Suporte ao programa de gestão de risco organizacional. |
| **Business Continuity** | Alimenta o BCP/DRP com cenários de ciberataque. |
| **Security Consulting** | Assessoria interna em arquitetura e projetos. |
| **Education / Training** | Sensibilização de utilizadores, formação técnica do pessoal de IT. |
| **Product Evaluation** | Avaliação de soluções de segurança antes de aquisição. |

!!! tip "Referência canónica"
    O [FIRST CSIRT Services Framework v2.1](https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1) define 44 serviços organizados em 5 áreas. É a referência profissional para desenhar a carteira de serviços de um CSIRT.

---

## 4. Tipos de CSIRT

Os CSIRTs diferenciam-se pela *constituency* que servem:

| Tipo | Constituency | Exemplo |
|------|-------------|---------|
| **Enterprise CSIRT** | A organização-mãe (banco, universidade, fabricante, agência pública) | CSIRT do IPLeiria; CSIRT da Galp |
| **National CSIRT** | Todo um país, normalmente com mandato legal | **CNCS/CERT.PT** (Portugal); BSI-CERT (Alemanha); ANSSI (França) |
| **Coordination Center** | Facilita cooperação entre múltiplos CSIRTs | **CERT/CC** (SEI/CMU); **US-CERT/CISA**; ENISA (UE) |
| **Analysis Center** | Sintetiza dados para detetar tendências e emitir *early warnings* | Analysis centers do FBI; H-ISAC (saúde) |
| **Vendor Team (PSIRT)** | Utilizadores dos produtos do *vendor* | Cisco PSIRT, Microsoft MSRC, Red Hat Product Security |
| **Incident Response Provider** | Clientes pagos (modelo MSSP/DFIR) | Mandiant, CrowdStrike Services, S21sec |

### Exemplos por setor

| Setor | Exemplo típico |
|-------|----------------|
| Governo | CNCS (Portugal), US-CERT, JP-CERT |
| Militar | DoD-CERT, NATO-CCIR |
| Polícia / judicial | Polícia Judiciária — UNC3T (Unidade Nacional de Combate ao Cibercrime e à Criminalidade Tecnológica) |
| Financeiro | FS-ISAC, SIBS CERT |
| Saúde | H-ISAC, SPMS-CSIRT |
| Académico | FCCN-CERT (rede universitária portuguesa), REN-ISAC (EUA) |
| ISP / Telecomunicações | CERT dos operadores |
| Indústria | CSIRTs setoriais (energia, automóvel) |

!!! info "Em Portugal"
    A **Rede Nacional de CSIRTs** coordenada pelo CNCS reúne CSIRTs setoriais, académicos e empresariais. Ver [redecsirt.pt](https://www.redecsirt.pt/).

---

## 5. Modelos organizacionais

A forma como a equipa está **estruturada internamente** determina o nível de maturidade e a eficácia da resposta.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │   5 MODELOS ORGANIZACIONAIS — DA IMATURIDADE À COORDENAÇÃO      │
  │                                                                 │
  │   1. Security Team    (sem CSIRT formal; ad-hoc)                │
  │            │                                                    │
  │            ▼                                                    │
  │   2. Distributed      (equipa espalhada, coordenador)           │
  │            │                                                    │
  │            ▼                                                    │
  │   3. Centralized      (equipa dedicada a tempo inteiro)         │
  │            │                                                    │
  │            ▼                                                    │
  │   4. Combined         (núcleo central + braços distribuídos)    │
  │            │                                                    │
  │            ▼                                                    │
  │   5. Coordinating     (não responde — coordena outros CSIRTs)   │
  └─────────────────────────────────────────────────────────────────┘
```

### 5.1 Security Team

- **CSIRT ainda não foi formalmente criado.**
- Nenhum grupo tem **responsabilidade formal** pelo IR.
- Administradores de rede/sistemas lidam com incidentes **ad-hoc**, sem procedimentos, sem coordenação entre si.
- Falha típica: cada incidente é tratado de raiz; não há aprendizagem acumulada.

### 5.2 CSIRT Interno Distribuído

- Estrutura **por localização geográfica ou responsabilidade funcional**.
- Membros são colaboradores existentes com **atribuição parcial** ao CSIRT.
- Existe um **gestor coordenador** com autoridade formal.
- Vantagem: conhecimento local profundo. Desvantagem: conflitos de prioridades diárias.

### 5.3 CSIRT Interno Centralizado

- Equipa **localizada centralmente**, dedicada a tempo inteiro.
- Gestor reporta à **gestão de topo** (frequentemente ao CISO ou diretamente ao CEO).
- Funciona como **ponto único de contacto** para incidentes.
- Modelo de referência para organizações de dimensão média/grande.

### 5.4 CSIRT Combinado Distribuído + Centralizado

- **Núcleo central** (triagem, coordenação, especialistas forense/malware).
- **Braços distribuídos** em unidades de negócio ou localizações remotas.
- Aproveita conhecimento local **e** centraliza a inteligência.
- Adotado pela maioria dos CSIRTs empresariais multinacionais.

### 5.5 CSIRT Coordenador

- **Não responde diretamente** a incidentes.
- Facilita cooperação entre outros CSIRTs, normalmente a nível nacional, setorial ou internacional.
- Exemplos: CERT/CC, FIRST, CNCS (parcialmente).

---

## 6. Os 4 pilares da criação de um CSIRT

Criar um CSIRT formal exige definir quatro fundações. Saltar qualquer uma produz uma equipa com mandato ambíguo e baixa eficácia.

```
  ╔═══════════════════════════════════════════════════════════════════╗
  ║   OS 4 PILARES DE UM CSIRT                                       ║
  ║                                                                 ║
  ║   ┌─────────────┐   ┌─────────────┐                             ║
  ║   │  1. MISSÃO  │   │ 2. CONSTI-  │                             ║
  ║   │             │   │    TUENCY   │                             ║
  ║   │  Porque     │   │             │                             ║
  ║   │  existimos? │   │  Quem       │                             ║
  ║   │             │   │  servimos?  │                             ║
  ║   └──────┬──────┘   └──────┬──────┘                             ║
  ║          │                 │                                    ║
  ║          ▼                 ▼                                    ║
  ║   ┌─────────────┐   ┌─────────────┐                             ║
  ║   │ 3. PAPEL E  │   │ 4. RELAÇÃO  │                             ║
  ║   │  AUTORIDADE │   │  COM OUTROS │                             ║
  ║   │             │   │   CSIRTs    │                             ║
  ║   │  Que posição│   │             │                             ║
  ║   │  na org?    │   │  Com quem   │                             ║
  ║   │             │   │  cooperamos?│                             ║
  ║   └─────────────┘   └─────────────┘                             ║
  ╚═══════════════════════════════════════════════════════════════════╝
```

### 6.1 Pilar 1 — Mission Statement

Declaração de 3-4 frases que responde à pergunta **"Porque é que existimos?"**. Deve ser:

- **Não ambígua** — sem linguagem vazia tipo "excelência em segurança".
- **Imperativa** — obriga a equipa a estabelecer serviços, políticas e padrões de qualidade.
- **Alinhada** com a missão da organização-mãe.
- **Comunicada amplamente** à constituency e a outros CSIRTs.

!!! example "Exemplos de mission statements reais"

    **SingCERT (CSIRT Nacional de Singapura):**

    > *One Point of Trusted Contact — Facilitate Security Threats Resolution — Increase National Competency in IT Security.*

    **CERT fictício em empresa:**

    > *O CERT fornece informação e assistência ao pessoal da empresa para reduzir o risco de incidentes de cibersegurança e responder a tais incidentes quando ocorrem.*

**Como definir:**

1. Clarificar o papel esperado pela organização.
2. Redigir texto que **reforce** os objetivos da organização-mãe.
3. **Obter compromisso formal** da administração/gestão de topo (sem este passo, o CSIRT não tem autoridade).
4. Anunciar à constituency e a outros CSIRTs.

### 6.2 Pilar 2 — Constituency

A **constituency** é o conjunto bem definido de **entidades servidas** pelo CSIRT. Sem constituency clara, o CSIRT não sabe a quem responde nem de quem aceita reportes.

| Tipo de constituency | Exemplos |
|---------------------|----------|
| **Empresa / organização única** | CSIRT de um banco, de uma universidade, de um município |
| **Setor** | FS-ISAC (financeiro), H-ISAC (saúde) |
| **Infraestrutura crítica** | Operadores de serviços essenciais (NIS2) |
| **Produto** | PSIRT: utilizadores do software/hardware do *vendor* |
| **Nacional / país** | CNCS/CERT.PT |
| **Clientes** | MSSPs / fornecedores de IR como serviço |

**O que a constituency ajuda a definir:**

- Qual é o propósito e natureza do CSIRT?
- Quem é servido?
- Que tipos de incidentes são tratados?
- Que relações com outros CSIRTs são necessárias?

!!! warning "Sobreposição de constituencies"
    Constituencies podem **sobrepor-se** (ex.: um banco está coberto pelo seu CSIRT interno, pelo FS-ISAC setorial, pelo CSIRT nacional, pelo Banco de Portugal). A **coordenação é chave** — quem comunica primeiro, com quem se partilha informação, quem decide estratégias comuns. O conceito de *"CSIRT of Last Resort"* (normalmente o nacional) ajuda a resolver ambiguidade.

### 6.3 Pilar 3 — Papel e autoridade na organização

Para além de **onde** está posicionado (reporta ao CISO? à Direção?), é crítico clarificar **quanta autoridade** tem para agir.

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
  │   │ rede em      │    │ e aguarda    │    │ medidas a    │      │
  │   │ P1 sem call  │    │ Direção      │    │ process owner│      │
  │   └──────────────┘    └──────────────┘    └──────────────┘      │
  │                                                                 │
  │   MATURIDADE ALTA    MATURIDADE MÉDIA    MATURIDADE BAIXA       │
  └─────────────────────────────────────────────────────────────────┘
```

| Nível | Caraterística | Quando usar |
|-------|---------------|-------------|
| **Full** | Decide e atua sem aprovação em tempo real | P1 crítico onde atraso = dano; CSIRTs maduros |
| **Shared** | Recomenda e a decisão é do process owner ou Direção | Maioria das decisões não-críticas |
| **No authority** | Apenas aconselha; mesmo em crise, não pode atuar | CSIRTs iniciais; tenderá a falhar em P1 |

!!! danger "O problema do CSIRT sem autoridade"
    Um CSIRT com *No authority* é frequentemente **apenas cosmético** — serve auditorias mas falha em crises. Durante um P1, não há tempo para convocar comités. A autoridade tem de ser **pré-aprovada por escrito** pela Direção, não negociada durante a crise.

### 6.4 Pilar 4 — Relação com outros teams

Nenhum CSIRT atua isolado. A colaboração com outros CSIRTs é **coração** do modelo.

**Modelos de cooperação:**

| Modelo | Descrição | Exemplo |
|--------|-----------|---------|
| **Bilateral team-team** | Acordo direto entre duas equipas, baseado em confiança construída ao longo de anos | CSIRT bancário A ↔ CSIRT bancário B |
| **Associação (multilateral)** | Grupo, fórum, *task force*, aliança com interesses comuns | [FIRST](https://www.first.org), [TF-CSIRT](https://tf-csirt.org), Rede Nacional de CSIRTs |
| **Cooperação entre associações** | Duas ou mais associações trocam experiência e alinham políticas | FIRST ↔ TF-CSIRT |

**Base legal para cooperação:**

| Instrumento | Natureza |
|-------------|----------|
| **NDA** (Non-Disclosure Agreement) | Contrato legal para proteger informação confidencial partilhada |
| **MOU** (Memorandum of Understanding) | Acordo bilateral formal, menos vinculativo que contrato — declaração de intenção |
| **Contract** | Acordo legal completo, com obrigações mutuamente vinculativas |
| **Terms of Reference** | Documento que define **propósito, visão, objetivos, stakeholders, papéis, plano** — crítico para associações |

!!! info "Rede Nacional de CSIRTs (Portugal)"
    O CNCS coordena a Rede Nacional de CSIRTs — uma associação que cobre CSIRTs setoriais, académicos e empresariais. A adesão envolve requisitos mínimos de maturidade e compromissos de partilha de informação. Ver [redecsirt.pt](https://www.redecsirt.pt/).

---

## 7. Recursos: pessoas, processos, tecnologia

Um CSIRT só é eficaz se tiver os três recursos equilibrados.

### 7.1 Pessoas — *skills* e papéis

**Competências técnicas essenciais:**

- Familiaridade com sistemas operativos, redes, cloud, *endpoints*;
- Conhecimento de tipos de incidente e TTPs (ver [mapa ATT&CK](../comum/attack-mapping.md));
- Base forense (análise de disco, memória, rede, malware).

**Competências não-técnicas (muitas vezes subestimadas):**

- **Comunicação oral e escrita** — para reportes, briefings a Direção, notificações regulatórias;
- **Confiabilidade** (*trustworthiness*) — o CSIRT acede a dados sensíveis; um *background check* é normal;
- Calma sob pressão; pensamento estruturado; trabalho em equipa.

### 7.2 Estrutura de níveis (L1 a L4)

Modelo tipico de SOC/CSIRT moderno:

| Nível | Papel | Responsabilidades principais |
|-------|-------|-------------------------------|
| **L1** | **Security Analyst** — linha da frente | Triagem inicial, aplicação de *runbooks*, escalonamento. Frequentemente 24/7. |
| **L2** | **Senior Security Analyst** | Investigação técnica aprofundada, aplicação de *playbooks*, decisão sobre contenção e erradicação. |
| **L3** | **Security Manager / Threat Hunter** | *Threat hunting* proativo, ferramentas avançadas, desenho de detecções, forense digital, auditoria. |
| **L4** | **CISO (Chief Information Security Officer)** | Define política, supervisiona todas as operações, reporta à administração, gere *compliance*. |

**Papéis adicionais que podem existir (grandes CSIRTs):**

- *Team leader* / *Manager*
- *Hotline/helpdesk* (ponto de entrada)
- *Incident handler*
- *Vulnerability handler*
- *Artifact/malware analyst*
- *Platform specialist* (Windows, Linux, cloud)
- *Technology watcher*
- *Trainer*
- *SIEM/EDR engineer*
- *CyberIntel specialist*
- *Technical writer*
- *Media relations officer*
- *Legal counsel / paralegal*
- *Law-enforcement liaison*

### 7.3 Formação recomendada

Se a organização não consegue contratar *skills* prontas, tem de formar. Recursos comuns:

- **SEI CERT Division** — cursos oficiais em Incident Response.
- **SANS** — certificações GIAC (GCIH, GCFA, GNFA) amplamente reconhecidas.
- **ENISA** — training material público para CSIRTs europeus (grátis).
- **FIRST** — eventos anuais, *hands-on training*.

### 7.4 Processos — políticas e procedimentos

Toda a operação do CSIRT deve ser regida por documentação formal. Principais artefactos:

| Artefacto | Propósito | Referência |
|-----------|-----------|------------|
| **Política de Gestão de Incidentes** | Mandato, âmbito, princípios, responsabilidades | [Template](../modelos/index.md) |
| **Procedimento de Classificação** | Matriz P1-P5, categorias | [Template](../modelos/index.md) |
| **Matriz RACI e Escalonamento** | Quem decide o quê, contactos internos e externos | [Template](../modelos/index.md) |
| **Playbooks por tipo de incidente** | Ransomware, phishing, violação de dados, DDoS, insider, etc. | [Templates](../modelos/index.md) |
| **SOPs (Standard Operating Procedures)** | Aceitar e seguir reportes; atender hotline; preservar evidência; monitorizar sistemas; backup de dados de incidente; notificações | — |
| **Plano de Comunicação de Crise** | Audiências, canais, porta-vozes | [Template](../modelos/index.md) |
| **Acceptable Use Policy** da equipa | Uso das ferramentas e redes do CSIRT | — |
| **Information Disclosure Policy** | O que pode ser partilhado, com quem, em que condições | — |

!!! tip "Handbook canónico"
    *Handbook for Computer Security Incident Response Teams (CSIRTs)* do SEI (Killcrece et al., 2003) continua a ser a referência mais completa para desenho de políticas e procedimentos. Descarregável gratuitamente em [resources.sei.cmu.edu](https://resources.sei.cmu.edu/asset_files/Handbook/2003_002_001_14102.pdf).

### 7.5 Tecnologia — ferramentas essenciais

Tecnologia divide-se em duas categorias principais:

**Gestão de incidentes (*case management* + tickets + comunicação segura):**

| Ferramenta | Notas |
|-----------|-------|
| **TheHive + Cortex** | Open source, *case management* + *analyzers* automatizados. Referência em CSIRTs europeus. |
| **DFIR-IRIS** | Alternativa *open source* focada em DFIR. |
| **RTIR (Request Tracker for Incident Response)** | Clássico, baseado em Perl, usado por muitos CSIRTs nacionais. |
| **OTRS** | Ticketing com módulos de IR. |
| **JIRA Service Management** | Comercial, boa integração com *devops*. |
| **GLPI** | *Service desk* genérico com uso em algumas organizações públicas PT. |
| **ServiceNow SecOps** | Comercial *enterprise*, integração com CMDB. |

**Análise e investigação (DFIR):**

Ver [Stack forense de referência](detecao-contencao.md#stack-forense-de-referencia) no capítulo de Deteção e Contenção para o catálogo completo — Volatility3, KAPE, Velociraptor, Autopsy, Plaso, Wireshark/Zeek, YARA, CAPEv2.

**Partilha de inteligência:**

| Ferramenta | Propósito |
|-----------|-----------|
| **MISP** | Plataforma aberta de partilha de IOCs e TTPs |
| **OpenCTI** | Plataforma CTI com integração ATT&CK nativa |
| **Standards STIX 2.1 / TAXII** | Formatos abertos para troca de *threat intelligence* |

---

## 8. Operação 24/7 e workflow de referência

### 8.1 Alcance 24/7 — o CSIRT tem de estar contactável

Os incidentes não ocorrem em horário laboral. Mecanismos mínimos de contacto:

| Canal | Uso |
|-------|-----|
| **Email dedicado** | `csirt@organização` — *mailing list* que chega a vários destinatários |
| **Telefone com rotatividade** | Número único 24/7 com *on-call* rotativo |
| **SMS / mensageria** | Para casos urgentes fora de horário |
| **Registo WHOIS** (RT-Object) | IP-range da constituency aponta para contactos CSIRT |
| **Página web institucional** | Contactos, responsible disclosure policy |
| **Abuse mailbox** | `abuse@organização` conforme [RIPE](https://www.ripe.net/support/abuse) |

!!! tip "Manter as relações ativas"
    Além de publicar contactos, o CSIRT maduro mantém **relações ativas** com CSIRTs nacionais (CNCS), ISPs, *vendors*, autoridades policiais. Contactos só com papel timbrado não funcionam numa crise — pré-estabelecer *human trust* é essencial.

### 8.2 Ordem lógica de serviços

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

### 8.3 Workflow de referência (SOC moderno)

```
  ┌─────────────────────────────────────────────────────────────────┐
  │   SISTEMAS GERADORES DE ALERTAS                                 │
  │   (SIEM, EDR, IDS/IPS, NDR, DLP, Cloud, Email Security)         │
  │              │                                                  │
  │              ▼                                                  │
  │   ┌───────────────────────────┐                                 │
  │   │   L1 — Triagem            │                                 │
  │   │   • Abertura de ticket    │                                 │
  │   │   • Classificação         │                                 │
  │   │   • Priorização           │                                 │
  │   │   • Análise falso positivo│                                 │
  │   │   • Resolução simples     │                                 │
  │   └────────────┬──────────────┘                                 │
  │                │ escalonamento                                  │
  │                ▼                                                │
  │   ┌───────────────────────────┐                                 │
  │   │   L2 — Resposta            │                                 │
  │   │   • Aplicação de playbooks │                                 │
  │   │   • Investigação técnica   │                                 │
  │   │   • Gestão do SLA          │                                 │
  │   │   • Ativação de equipas    │                                 │
  │   │   • Ciclo de vida do case  │                                 │
  │   └────────────┬──────────────┘                                 │
  │                │                                                │
  │                ▼                                                │
  │   ┌───────────────────────────┐                                 │
  │   │   L3 / Forense / CTI       │                                 │
  │   │   • Análise profunda       │                                 │
  │   │   • Caça a ameaças         │                                 │
  │   │   • Threat intel           │                                 │
  │   └────────────┬──────────────┘                                 │
  │                │                                                │
  │                ▼                                                │
  │   ┌───────────────────────────┐                                 │
  │   │   MELHORIA CONTÍNUA        │                                 │
  │   │   • Reuniões periódicas    │                                 │
  │   │   • Criação/ajuste de      │                                 │
  │   │     playbooks e use cases  │                                 │
  │   │   • Atualização de RACI    │                                 │
  │   └───────────────────────────┘                                 │
  └─────────────────────────────────────────────────────────────────┘
```

### 8.4 Integração típica de plataformas

Uma stack representativa em organização média:

```
  SIEM (Splunk/Sentinel/Wazuh)
      │ alertas
      ▼
  Case management (TheHive)
      │ enriquecimento via Cortex analyzers
      ▼
  Ticketing / ITSM (GLPI / ServiceNow)
      │ integração com outras equipas de IT
      ▼
  CTI Platform (MISP / OpenCTI)
      │ feedback de IOCs
      ▼
  Monitorização (dashboards de SLA, MTTD, MTTR)
```

---

## 9. Exemplos práticos

### Exemplo 1 — Município de Vila Feliz decide criar CSIRT

**Contexto:** Câmara Municipal de Vila Feliz (120 colaboradores, 30 mil munícipes), sofreu dois incidentes em 12 meses: phishing que comprometeu contas de tesouraria, e ransomware num servidor de processos administrativos. Decide formalizar um CSIRT.

| Pilar | Decisão |
|-------|---------|
| **Missão** | *"O CSIRT de Vila Feliz protege a informação do município e dos seus munícipes, prevenindo e respondendo a incidentes de cibersegurança, cooperando com o CNCS e a rede de CSIRTs municipais."* |
| **Constituency** | Todos os serviços da CM; indiretamente, cidadãos que usam serviços digitais |
| **Papel** | Reporta ao responsável pela DIMSI (Divisão de Informática); **Shared authority** — pode conter mas não declarar desastre |
| **Relações** | Rede Nacional de CSIRTs (CNCS); Polícia Judiciária; CCDR; CNPD |
| **Modelo** | *Internal Distributed* — equipa de 3 pessoas a tempo parcial (incluindo responsável DIMSI + 2 técnicos SI) |
| **Ferramentas** | GLPI (já usado internamente) + TheHive open source; SIEM da CNCS/SOC nacional |

**Primeiro marco:** publicar Política de Gestão de Incidentes, Matriz RACI e procedimento de classificação. Fazer tabletop em 90 dias.

### Exemplo 2 — Banco escolhe modelo organizacional

**Contexto:** Banco regional com 40 agências e 900 colaboradores. Já tem departamento de segurança (6 pessoas) mas resposta a incidentes é ad-hoc. O CISO propõe formalizar o modelo.

| Opção | Análise |
|-------|---------|
| **Security Team (status quo)** | ❌ Falha em auditorias de conformidade (supervisão Banco de Portugal); não cumpre DORA |
| **Distributed** | ⚠️ Adequado para multinacionais; demasiado para dimensão regional |
| **Centralized** | ✅ **Recomendado** — 4 pessoas dedicadas 24/7 (com rotatividade), reportando ao CISO |
| **Combined** | ⚠️ Sobredimensionado para esta escala |
| **Coordinating** | ❌ Não aplicável (não coordena outros CSIRTs) |

**Decisão:** Centralized, integrando 3 novos perfis (L1 + L2 + L3/forense); CISO continua como L4. Contratar MSSP externo para cobertura noturna e fins de semana. Orçamento aprovado: €350K/ano.

### Exemplo 3 — CSIRT nacional e constituency sobreposta

**Contexto:** Durante um incidente de ransomware num hospital público, três CSIRTs têm constituency sobreposta:

- **CSIRT interno** do hospital;
- **SPMS-CSIRT** (setor saúde nacional);
- **CNCS/CERT.PT** (nacional, por ser incidente NIS2 em operador de serviço essencial).

| Quem faz o quê | Como se coordena |
|----------------|------------------|
| **CSIRT hospital** | Contenção imediata, preservação de evidência, aplicação de playbook |
| **SPMS-CSIRT** | Apoio técnico, coordenação setorial (outros hospitais alertados) |
| **CNCS** | Notificação NIS2 (24h/72h/30d), coordenação com autoridades europeias |

**Critério:** *"CSIRT de último recurso"* = CNCS. Mas a primeira linha de resposta operacional continua no hospital. A comunicação a Direção, CNPD (dados de saúde), PJ e Bombeiros (se paragem de equipamento afetar serviço clínico) é coordenada via CSIRT hospital + equipa jurídica.

---

## 10. Exercícios

### Exercício 1 — Identificar o modelo organizacional (nível básico)

Para cada descrição, identifique qual dos 5 modelos organizacionais se aplica:

| Descrição | Modelo? |
|-----------|---------|
| a) Universidade sem equipa formal; cada faculdade trata os seus próprios incidentes quando acontecem | ? |
| b) Empresa multinacional com equipa de 15 pessoas em Lisboa que coordena sub-equipas em 8 países | ? |
| c) CNCS que coordena incidentes entre CSIRTs nacionais e setoriais, mas não responde diretamente a incidentes no *endpoint* de nenhum operador | ? |
| d) Banco com 5 analistas dedicados 24/7 no seu SOC central; CISO reporta ao CEO | ? |
| e) PME com 40 pessoas onde o responsável de IT mantém a resposta a incidentes como 20% do seu tempo | ? |

??? success "Solução 1"
    | Descrição | Modelo | Justificação |
    |-----------|--------|--------------|
    | a) | **Security Team** | Sem CSIRT formal, ad-hoc |
    | b) | **Combined Distributed + Centralized** | Núcleo central + braços distribuídos |
    | c) | **Coordinating CSIRT** | Coordena outros CSIRTs sem responder |
    | d) | **Internal Centralized** | Equipa dedicada, centralizada, 24/7 |
    | e) | **Internal Distributed** (embrionário) ou **Security Team** | Depende da formalização. Se o CSIRT tem mandato escrito → Distributed; se apenas funcional → Security Team |

### Exercício 2 — Redigir mission statement (nível intermédio)

Uma empresa de e-commerce portuguesa (100 colaboradores, 2 armazéns, site com 200 mil clientes) está a criar o seu CSIRT. Redija um *mission statement* de 3-4 frases que:

1. Exprima o propósito de existir;
2. Seja não-ambíguo;
3. Esteja alinhado com um negócio de e-commerce (confidencialidade de dados pessoais, disponibilidade do site);
4. Reforce objetivos da organização.

??? success "Solução 2 (exemplo)"
    *"O CSIRT de [Nome da organização] protege a confidencialidade dos dados pessoais dos clientes e a disponibilidade dos serviços de e-commerce, através da prevenção, deteção e resposta a incidentes de cibersegurança. Atua como ponto único de contacto para reporte de incidentes, coordenando com autoridades (CNCS, CNPD) e parceiros externos. Contribui para o cumprimento das obrigações de conformidade (RGPD, DL 125/2025) e para a confiança contínua dos clientes na marca."*

    **Por que funciona:**
    - Explicita propósito (proteger confidencialidade + disponibilidade);
    - Identifica constituency (dados dos clientes, serviços);
    - Nomeia autoridades relevantes;
    - Liga-se a obrigações legais específicas do negócio (RGPD + NIS2);
    - Termina com valor de negócio (confiança dos clientes).

### Exercício 3 — Desenhar níveis de autoridade (nível avançado)

O CISO de uma empresa industrial quer clarificar os níveis de autoridade do CSIRT recém-criado. Para cada ação abaixo, justifique qual deveria ser o nível de autoridade (**Full / Shared / No**) e porquê:

1. Isolar da rede um *endpoint* onde o EDR detetou *beaconing* para C2 conhecido.
2. Desligar integralmente o servidor ERP durante horário laboral porque há suspeita de comprometimento.
3. Notificar CNCS (NIS2) em 24h.
4. Pagar resgate de ransomware.
5. Reset forçado de todas as passwords de domínio.
6. Comunicar à imprensa.
7. Bloquear temporariamente domínio `.exemplo.com` no proxy corporativo por se tratar de C2 ativo.
8. Acionar fornecedor externo de DFIR (contrato *retainer*).

??? success "Solução 3"
    | # | Ação | Autoridade | Justificação |
    |---|------|------------|--------------|
    | 1 | Isolar endpoint com beacon C2 | **Full** | Decisão técnica urgente, dano proporcional, reversível |
    | 2 | Desligar ERP | **Shared** | Impacto operacional massivo; process owner do ERP deve participar |
    | 3 | Notificar CNCS em 24h | **Full** (DPO/CISO ou delegado) | Obrigação legal objetiva; atraso = infração |
    | 4 | Pagar resgate | **No** (apenas aconselha) | Decisão estratégica, jurídica, financeira — Direção decide |
    | 5 | Reset forçado de todas as passwords | **Shared** | Impacto em operações; coordenar com IT Ops e Direção |
    | 6 | Comunicar à imprensa | **No** (apenas input técnico) | Gestão de comunicação e Direção |
    | 7 | Bloquear domínio no proxy | **Full** | Reversível, dano proporcional, ação defensiva standard |
    | 8 | Acionar DFIR externo | **Full** (se dentro do budget pré-aprovado) ou **Shared** | Depende da alçada financeira do CISO |

---

## 11. Armadilhas e confusões a evitar

!!! danger "Confusão 1: CSIRT = SOC"
    **Errado.** Podem sobrepor-se mas não são idênticos. **SOC** é o *centro operacional* (monitorização 24/7, deteção, triagem). **CSIRT** é a *equipa de resposta* (investigação, erradicação, recuperação, follow-up). Em organizações pequenas a mesma equipa faz ambos; em grandes, são funções distintas com integração formal.

!!! danger "Confusão 2: Começar pela tecnologia"
    **Errado.** Comprar SIEM/EDR sem definir missão, constituency, papéis e processos produz **uma fábrica de alertas ignorados**. Primeiro os 4 pilares e os processos; só depois a tecnologia. Caso contrário, compra-se Ferrari sem saber conduzir.

!!! danger "Confusão 3: Um CSIRT sem autoridade é cosmético"
    **Errado.** Um CSIRT *No authority* serve para auditoria mas **falha em P1**. A autoridade tem de estar **pré-aprovada por escrito** pela Direção, com níveis claros (Full/Shared/No) para cada tipo de ação. Durante a crise não há tempo para convocar comités.

!!! danger "Confusão 4: Constituency vaga = conflitos"
    **Errado.** "Servimos a empresa" não é constituency — é aspiração. Uma constituency bem definida inclui *perímetro* (IPs, domínios, utilizadores, serviços), *natureza* (interna, externa, ambas) e *exclusões explícitas* (o que **não** é âmbito, para evitar descoberta no meio de uma crise).

!!! danger "Confusão 5: CERT é sinónimo livre de CSIRT"
    **Errado.** CERT é **marca registada** da SEI/Carnegie Mellon desde 1997. Usar CERT sem autorização é incorreto (e potencialmente litigável). Na prática, os novos CSIRTs em 2026 usam **CSIRT** ou variante como termo genérico.

!!! danger "Confusão 6: Relações com outros CSIRTs vêm naturalmente"
    **Errado.** A confiança que permite partilha de IOCs só se constrói através de **interação consistente** ao longo de anos — conferências (FIRST), exercícios conjuntos, reuniões periódicas da Rede Nacional de CSIRTs. Um CSIRT que descobre que precisa de contactos externos durante uma crise já perdeu.

!!! danger "Confusão 7: Formação técnica é suficiente"
    **Errado.** *Skills* não-técnicas (comunicação, escrita, calma sob pressão) são **iguais ou mais importantes** do que profundidade técnica, especialmente em L3 e L4. Um CISO tem de comunicar questões técnicas complexas à Direção e a stakeholders não-técnicos.

---

## 12. Resumo rápido

| Conceito | O essencial |
|----------|-------------|
| **Origem histórica** | Morris Worm (1988) → primeiro CERT em 17 Nov 1988 na Carnegie Mellon |
| **CSIRT** | Equipa formal com mandato para prevenir, detetar, responder e aprender com incidentes, para uma constituency definida |
| **Serviços** | 3 grupos: Reativos, Proativos, Qualidade de Segurança (ref: FIRST v2.1) |
| **Tipos** | Enterprise, National, Coordination, Analysis, Vendor (PSIRT), Provider |
| **Modelos organizacionais** | Security Team → Distributed → Centralized → Combined → Coordinating (maturidade crescente) |
| **4 pilares de criação** | Missão · Constituency · Papel e Autoridade · Relação com outros teams |
| **Níveis de autoridade** | Full (decide + atua) · Shared (participa, não decide) · No (só aconselha) |
| **Cooperação** | Bilateral · Associação · Entre associações. Base legal: NDA, MOU, Contract, Terms of Reference |
| **Pessoas L1-L4** | Analyst → Senior Analyst → Manager/Hunter → CISO |
| **Tecnologia** | Case management (TheHive, RTIR, GLPI) + SIEM + DFIR + CTI (MISP) |
| **24/7** | Email, telefone, SMS, WHOIS, abuse box, relações ativas com CSIRTs pares |

### Frases-chave para recordar

- "Sem confiança, **não há partilha**; sem partilha, não há defesa coletiva."
- "A autoridade do CSIRT é **pré-aprovada**, não negociada durante a crise."
- "A missão responde a **porquê existimos**; a constituency a **quem servimos**."
- "Tecnologia sem processos é uma **fábrica de alertas ignorados**."
- "*Skills* não-técnicas são iguais — ou mais — importantes que as técnicas."
- "CERT é marca registada; **CSIRT é genérico** e pode ser usado livremente."

---

## 📎 Documentos operacionais relacionados

A criação e operação de um CSIRT materializa-se nos seguintes templates. Catálogo completo em [📋 Templates](../modelos/index.md).

- [📄 Política de Gestão de Incidentes](../gestao_incidentes/politica-gestao-incidentes.docx) — estabelece o mandato e papéis do CSIRT.
- [📄 Procedimento de Escalonamento e Matriz RACI](../gestao_incidentes/procedimento-escalonamento-raci.docx) — cadeia de comando e contactos.
- [📄 Procedimento de Classificação e Severidade](../gestao_incidentes/procedimento-classificacao-severidade.docx) — matriz P1-P5 usada pela L1.
- [📄 Plano de Resposta a Incidentes (NIS2)](../gestao_incidentes/plano-resposta-incidentes-nis2.docx) — plano base para CSIRTs em entidades NIS2.
- [📄 Plano de Comunicação de Crise](../gestao_incidentes/plano-comunicacao-crise.docx) — essencial para a operação externa do CSIRT.

---

## Referências

- FIRST (2019). **CSIRT Services Framework v2.1**. <https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1>
- Killcrece, G. et al. (2003). **Handbook for Computer Security Incident Response Teams (CSIRTs)**, 2nd ed. SEI/CERT Division. <https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305>
- ENISA. **Good Practice Guide for Incident Management**. <https://www.enisa.europa.eu/publications/good-practice-guide-for-incident-management>
- RFC 2350 — *Expectations for Computer Security Incident Response*. <https://www.rfc-editor.org/rfc/rfc2350>
- Centro Nacional de Cibersegurança — **Rede Nacional de CSIRTs**. <https://www.redecsirt.pt/>
- SEI CERT Division. <https://www.sei.cmu.edu/about/divisions/cert/>

---

**Próximos passos:** Com o CSIRT estruturado, explore a [Preparação](preparacao.md) para perceber as atividades contínuas que a equipa deve manter entre incidentes (políticas, ferramentas, treino, canais de reporte).
