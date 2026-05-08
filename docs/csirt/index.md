# Setting Up CSIRT — Como criar e operacionalizar um CSIRT

> **Capítulo 03 da UC TISI.** Este módulo cobre a criação e operacionalização de uma equipa CSIRT (Computer Security Incident Response Team), alinhado com **FIRST CSIRT Services Framework v2.1**, **SEI CSIRT Handbook**, **NIST SP 800-61r2** e **ENISA Good Practice Guide for Incident Management**.

## 3 ideias-chave deste módulo

Independentemente do que cobrirmos, três ideias têm de ficar consolidadas no fim do módulo:

!!! abstract "1️⃣ CSIRT ≠ SOC, mas trabalham em par"
    O **SOC** monitoriza, deteta e tria; o **CSIRT** coordena a resposta a incidentes confirmados. São **complementares**, não alternativos. Onde existe maturidade, há ambos.

!!! abstract "2️⃣ Um CSIRT define-se pela comunidade que serve (constituency), não pelas ferramentas"
    Sem comunidade definida, **não há CSIRT** — há equipa de IT a apagar fogos. As ferramentas (SIEM, EDR, TheHive, MISP) são instrumentais; a constituency é constitutiva.

!!! abstract "3️⃣ A confiança é o ativo mais valioso de um CSIRT"
    Sem confiança não há partilha; sem partilha, cada CSIRT trabalha sozinho contra atacantes que partilham. Por isso existem [TF-CSIRT](https://tf-csirt.org), [FIRST](https://www.first.org) e a [Rede Nacional de CSIRTs](https://www.redecsirt.pt). Construir confiança demora **anos**; destrói-se em **dias**.

Tudo o resto (modelos, autoridade, ferramentas, frameworks) suporta ou decorre destas três ideias.

## Objetivo do módulo

Compreender o que é um CSIRT, que tipos existem, **como se cria** (os 4 fundamentos), e **como se operacionaliza** (pessoas, processos, tecnologia, disponibilidade 24/7). O módulo fecha com exemplos práticos, exercícios e uma prática laboratorial estruturada (Vila Feliz) para aplicar o conhecimento a contextos concretos.

## Estrutura do módulo

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Cap 1 — O que é um CSIRT?                                     │
  │           História, terminologia, serviços                      │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 2 — Tipos de CSIRT e Exemplos Reais                       │
  │           Constituintes, CSIRTs mundiais, vantagens             │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 3 — Como Criar um CSIRT                                   │
  │           4 fundamentos, modelos, autoridade, cooperação        │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 4 — Recursos, Processos e Operações                       │
  │           Equipa, playbooks, ferramentas, 24/7                  │
  │                        │                                        │
  │                        ▼                                        │
  │   Casos Práticos, Exercícios, Armadilhas e Resumo               │
  │           Aplicação ao município Vila Feliz, banco regional     │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

## Conteúdos deste módulo

| Página | Descrição |
|--------|-----------|
| [**Cap 1 — O que é um CSIRT?**](o-que-e.md) | Morris Worm (1988), fundação do primeiro CERT; definição, siglas (CERT vs CSIRT, PSIRT, SOC); 3 grupos de serviços. |
| [**Cap 2 — Tipos e Exemplos Reais**](tipos-exemplos.md) | 6 tipos por constituinte; CSIRTs nacionais de referência (CERT/CC, CISA, NCSC UK, SingCERT, CNCS, CERT-EU); 3 vantagens estruturais. |
| [**Cap 3 — Como Criar um CSIRT**](como-criar.md) | **4 fundamentos essenciais**: Missão, Constituinte, Posição+Autoridade, Relações externas; 5 modelos organizacionais; 3 níveis de autoridade; base legal NDA/MOU/Contract/ToR. |
| [**Cap 4 — Recursos e Operações**](recursos-operacoes.md) | L1-L4, SOPs, playbooks por tipo de incidente (6 tipos), ferramentas (TheHive, GLPI, Volatility, Splunk, ...), fluxo de resposta NIST, 24/7. |
| [**Casos Práticos, Exercícios e Resumo**](casos-praticos.md) | 3 casos ancorados (Vila Feliz, banco regional, CSIRT nacional); 3 exercícios com soluções; 7 armadilhas; síntese final. |

## Pré-requisitos recomendados

- Módulo [Incident Handling](../ih/index.md) — fundamentos de IR que este capítulo assume conhecidos.
- Noções básicas de gestão de risco e conformidade (NIS2, RGPD).

## Relação com outros módulos da UC

- **Alimenta:** [Preparação](../ih/preparacao.md), [Deteção, Contenção e Investigação](../ih/detecao-contencao.md), [Erradicação, Recuperação e Follow-up](../ih/erradicacao-recuperacao.md).
- **Usa conceitos de:** [Frameworks de IR](../ih/frameworks.md), [Mapa MITRE ATT&CK](../comum/attack-mapping.md).
- **Materializa em:** [Templates operacionais](../modelos/index.md) — política, RACI, playbooks.

---

**Começar pelo início:** [Capítulo 1 — O que é um CSIRT?](o-que-e.md)
