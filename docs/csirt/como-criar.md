# Capítulo 3 — Como Criar um CSIRT

## 3.1 Os 4 Fundamentos Essenciais

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

### Resumo dos 4 fundamentos

| # | Fundamento | Questão-chave | Saídas documentais |
|---|-----------|---------------|---------------------|
| **1** | **Missão (Mission Statement)** | Porquê existimos? | Declaração de missão (3-4 frases) |
| **2** | **Constituinte** | Quem servimos? Que incidentes tratamos? | Definição de perímetro, SLAs de serviço |
| **3** | **Posição e Autoridade** | Que papel na gestão de risco? Que poder? | Organograma, matriz RACI, níveis de autoridade pré-aprovados |
| **4** | **Relação com outras equipas** | Com quem cooperamos? Sob que base legal? | NDA, MOU, Terms of Reference |

---

## 3.2 Missão e Constituinte

### 3.2.1 Como definir a missão

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

### 3.2.2 Como definir a constituinte

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

## 3.3 Modelos Organizacionais

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

### 1. Security Team (Ad-hoc)

- CSIRT ainda **não foi formalmente criado**;
- Administradores locais lidam com incidentes de forma **ad-hoc**;
- Sem coordenação ou padronização;
- Falha típica: cada incidente é tratado de raiz; não há aprendizagem acumulada.

### 2. Internal Distributed CSIRT

- Estrutura por **localização geográfica** ou **função**;
- Membros são colaboradores existentes com atribuição parcial ao CSIRT;
- Existe um **gestor coordenador** com autoridade formal;
- ✅ Vantagem: conhecimento local profundo.
- ⚠️ Desvantagem: conflitos de prioridades diárias.

### 3. Internal Centralized CSIRT

- Equipa **localizada centralmente**, dedicada **a tempo inteiro**;
- Gestor reporta à **gestão de topo** (CISO ou CEO);
- Funciona como **ponto único de contacto**;
- Modelo de referência para organizações de dimensão média/grande.

### 4. Combined Distributed & Centralized

- **Núcleo central** (triagem, coordenação, especialistas forense/malware);
- **Braços distribuídos** em unidades de negócio ou localizações remotas;
- Aproveita conhecimento local **e** centraliza inteligência;
- Adotado por CSIRTs empresariais multinacionais.

### 5. Coordinating CSIRT

- **Não responde diretamente** a incidentes;
- Facilita cooperação entre outros CSIRTs (nacional, setorial, internacional);
- Exemplos: CERT/CC, FIRST, CNCS (parcialmente).

---

## 3.4 Autoridade e Cooperação

### 3.4.1 Três níveis de autoridade

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

### 3.4.2 Modelos de cooperação entre CSIRTs

Nenhum CSIRT opera isolado. A cooperação com outros CSIRTs é **coração** do modelo.

| Modelo | Descrição | Exemplo |
|--------|-----------|---------|
| **Bilateral team-team** | Acordo direto entre duas equipas, baseado em confiança construída ao longo de anos | CSIRT bancário A ↔ CSIRT bancário B |
| **Associação (multilateral)** | Grupo, fórum, *task force*, aliança com interesses comuns | [FIRST](https://www.first.org), [TF-CSIRT](https://tf-csirt.org), Rede Nacional de CSIRTs |
| **Cooperação entre associações** | Duas ou mais associações trocam experiência e alinham políticas | FIRST ↔ TF-CSIRT |

### 3.4.3 Base legal para cooperação

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

**Próximos passos:** [Recursos, Processos e Operações](recursos-operacoes.md)
