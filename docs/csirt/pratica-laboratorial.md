# Prática Laboratorial — Criação do CSIRT

> **Aula prática (90 min) ·** Aplica directamente o que foi visto nos capítulos 1 a 4 deste módulo. Em grupo, percorrem **12 decisões fundamentadas** que, no fim, constituem a base do **Plano de Resposta a Incidentes (PRI)** a entregar até **23 de junho de 2026** (alimenta directamente os pontos 4.b, 4.c, 4.e e 4.h do enunciado do projeto da UC).

## Princípio orientador

> **Cada pergunta exige uma decisão + uma fundamentação.** Não há respostas certas — há respostas defensáveis. O critério de avaliação é: a decisão tem **coerência interna** com tudo o resto que decidiram?

---

## Como funciona

### Estrutura da aula (90 min)

| Bloco | Min | Conteúdo |
|-------|-----|----------|
| **Bloco I — Identidade** | 20 | Organização-âncora · Missão · Constituency |
| **Bloco II — Estrutura** | 25 | Modelo organizacional · Posição/Autoridade · Cooperação |
| **Bloco III — Recursos** | 25 | Equipa · Categorias de ferramentas · Formação |
| **Bloco IV — Serviços e Stakeholders** | 15 | Serviços (FIRST v2.1) · Partes interessadas |
| **Bloco V — Validação** | 5 | Coerência interna entre todas as decisões |

### Regra do uso do tempo

- Se um bloco vos parecer **fácil** (consenso rápido), avancem.
- Se trancarem **5 min num ponto**, registem a tensão entre alternativas e avancem — voltam depois com cabeça fresca.
- Após a aula, este documento refinado integra-se como **secção do PRI** (capítulo *"Definição da Equipa CSIRT"* no relatório final).

---

## Os 12 pontos de decisão

```
  ┌─────────────────────────────────────────────────────────────────┐
  │  BLOCO I — IDENTIDADE (20 min)                                  │
  │   1. Organização-âncora (3 min)                                 │
  │   2. Missão (7 min)                                             │
  │   3. Constituency / comunidade servida (10 min)                 │
  │                                                                 │
  │  BLOCO II — ESTRUTURA (25 min)                                  │
  │   4. Modelo organizacional (10 min)                             │
  │   5. Posição na hierarquia + nível de autoridade (8 min)        │
  │   6. Cooperação externa (7 min)                                 │
  │                                                                 │
  │  BLOCO III — RECURSOS (25 min)                                  │
  │   7. Equipa — perfis e dimensionamento (13 min)                 │
  │   8. Categorias de ferramentas (7 min)                          │
  │   9. Formação e desenvolvimento (5 min)                         │
  │                                                                 │
  │  BLOCO IV — SERVIÇOS E STAKEHOLDERS (15 min)                    │
  │  10. Catálogo de serviços (8 min)                               │
  │  11. Partes interessadas / stakeholders (7 min)                 │
  │                                                                 │
  │  BLOCO V — VALIDAÇÃO (5 min)                                    │
  │  12. Coerência interna                                          │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Bloco I — Identidade do CSIRT

A identidade de um CSIRT define-se em 3 camadas: **para que existe** (missão), **quem serve** (constituency) e **de que organização nasce** (pré-requisito). Sem identidade clara, todas as decisões posteriores ficam ad-hoc.

**Referências de apoio:** [RFC 2350](https://www.rfc-editor.org/rfc/rfc2350) · [SEI CSIRT Handbook](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305) · capítulos 1.3 e 3.1-3.2 deste módulo.

| # | Ponto de decisão | Output esperado |
|---|------------------|-----------------|
| 1 | **Organização-âncora** — sector, dimensão, maturidade, abrangência NIS2 | 4 dados-âncora preenchidos |
| 2 | **Missão** — declaração de 2-3 linhas | Texto + tabela de validação dos 4 critérios (não-ambígua, framework de serviço, complementa org-mãe, compromisso de gestão) |
| 3 | **Constituency** — 4 dimensões (geográfica, organizacional, tecnológica, funcional) + sobreposições com outros CSIRTs | Tabela cobre/não-cobre + critério de liderança em incidente sobreposto |

!!! tip "Pontos de tensão típicos"
    - A missão **inclui ou exclui** "investigação de crime informático"? Se incluir, articular com PJ-UNC3T; se excluir, definir o ponto de escalonamento.
    - Constituency cobre sistemas geridos por **terceiros** (ex.: serviços partilhados sob outra jurisdição)? Ex.: Agrupamentos Escolares na Administração Pública Local.

---

## Bloco II — Estrutura organizacional

| # | Ponto de decisão | Output esperado |
|---|------------------|-----------------|
| 4 | **Modelo organizacional** — entre os 5 (Security Team / Distributed / Centralized / Combined / Coordinating) | Modelo escolhido + justificação + modelo rejeitado com mais hesitação |
| 5 | **Posição hierárquica + nível de autoridade** | A quem reporta + matriz Full/Shared/No por tipo de ação (≥ 8 acções) |
| 6 | **Cooperação externa** — CSIRTs pares, autoridades, base legal | Tabela de relações + base legal aplicável (NDA / MOU / membership) |

!!! warning "DL 125/2025 (NIS2 PT) condiciona Bloco II"
    Se a organização é abrangida pelo DL 125/2025 (em vigor desde abril/2026), a notificação ao CNCS em 24h é **obrigatória** — isto força um modelo formal (não Security Team informal) e exige ponto de contacto único pré-designado.

---

## Bloco III — Recursos

| # | Ponto de decisão | Output esperado |
|---|------------------|-----------------|
| 7 | **Equipa** — perfis L1 a L4, dimensionamento (FTE), modelo (interno/MSSP/híbrido), cobertura 24×7 | Tabela com papéis + nº de FTE + cobertura |
| 8 | **Categorias de ferramentas** (não produtos) — SIEM, EDR, case management, threat intel, forense | 5 categorias mínimas com candidatos típicos |
| 9 | **Formação e desenvolvimento** — programa de qualificação | Plano de formação inicial + manutenção |

!!! info "Categorias, não produtos"
    Nesta prática trabalha-se ao nível das **categorias** (ex.: "case management open source"), não da escolha de produto específico (ex.: "TheHive vs DFIR-IRIS"). A escolha do produto é trabalho posterior, no relatório final do PRI.

---

## Bloco IV — Serviços e Stakeholders

| # | Ponto de decisão | Output esperado |
|---|------------------|-----------------|
| 10 | **Catálogo de serviços** — selecção das 5 áreas FIRST v2.1 (MVP / Esticar / Não-cobrir) | Tabela com as 5 áreas + serviços oferecidos + outsourced |
| 11 | **Partes interessadas / stakeholders** — internas e externas, expectativas, frequência de comunicação | Mapa RACI simplificado |

---

## Bloco V — Validação de coerência interna

> **5 minutos finais.** Ler tudo de novo e responder a 4 perguntas-armadilha:

1. O **modelo organizacional** (decisão 4) suporta o **dimensionamento da equipa** (decisão 7)?
2. A **autoridade** (decisão 5) é consistente com a **constituency** (decisão 3)?
3. Os **serviços oferecidos** (decisão 10) são suportados pela **equipa e ferramentas** (decisões 7-8)?
4. A **cooperação externa** (decisão 6) cobre os **stakeholders** identificados (decisão 11)?

Se alguma resposta for "não" — **registar a inconsistência** e devolver ao bloco respectivo.

---

## 📥 Materiais de download

### Guia editável (para preencher em aula)

[:material-file-word: Guia de Trabalho — Criação do CSIRT](../gestao_incidentes/csirt-pl-guia-criacao.docx){ .md-button .md-button--primary }

Documento `.docx` com **espaços em branco** para os grupos preencherem durante a aula. ~12 páginas. Inclui as 12 decisões, tabelas de fundamentação e *pontos de tensão* sugeridos para discussão.

### Solução-modelo — Câmara Municipal de Vila Feliz

[:material-file-word: Solução-modelo — Vila Feliz](../gestao_incidentes/csirt-pl-solucao-vila-feliz.docx){ .md-button }

**Caso fictício** construído exclusivamente para fins pedagógicos: município de ~32.500 habitantes, ~580 colaboradores, 14 localizações, abrangido pelo DL 125/2025 como operador essencial. Mostra **uma resposta defendida** (não a única), com fundamentação em cada decisão e **pontos de tensão registados** em 3 secções (constituency das escolas, autoridade durante crise, cobertura 24×7).

!!! tip "Quando consultar a solução-modelo"
    Recomenda-se que cada grupo preencha **primeiro** o seu próprio guia — só depois consulta a solução-modelo, para identificar diferenças e perceber se a sua decisão é tão defensável quanto a alternativa apresentada. **Não é gabarito.**

---

!!! warning "Anti-padrão a evitar"
    Missão genérica do tipo *"garantir a segurança da informação da organização"*. Não diz nada — qualquer equipa de IT diria isto. **Ser específico é mais defensável que ser elegante.**

---

## Bibliografia citável (para o relatório)

- IETF (1998). **RFC 2350 — Expectations for Computer Security Incident Response**. <https://www.rfc-editor.org/rfc/rfc2350>
- Killcrece, G. et al. (2003). **Handbook for Computer Security Incident Response Teams (CSIRTs)**, 2nd ed. SEI/CERT Division. <https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305>
- FIRST (2019). **CSIRT Services Framework v2.1**. <https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1>
- ENISA. **Good Practice Guide for Incident Management**. <https://www.enisa.europa.eu/publications/good-practice-guide-for-incident-management>
- NIST SP 800-61 Revision 2. **Computer Security Incident Handling Guide**. <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- **Decreto-Lei n.º 125/2025** (transposição da Diretiva NIS2 para o ordenamento jurídico português).
- Centro Nacional de Cibersegurança — **Rede Nacional de CSIRTs**. <https://www.redecsirt.pt/>

---

## 📎 Templates relacionados

A prática laboratorial pode ser cruzada com os templates do **Grupo E** do hub de Templates:

- [📄 CSIRT Charter](../gestao_incidentes/csirt-charter.docx) — para formalizar a saída desta prática num documento publicável.
- [📄 RFC 2350 Service Description](../gestao_incidentes/csirt-rfc2350.docx) — face pública do CSIRT.
- [📄 Service Catalog FIRST v2.1](../gestao_incidentes/csirt-service-catalog-first.docx) — aprofundamento da decisão 10.

Catálogo completo em [📋 Templates — Grupo E](../modelos/index.md#grupo-e-estabelecimento-de-csirt).

---

**Próximos passos:** Esta prática fecha o módulo CSIRT. Para continuar, explore a [Preparação](../ih/preparacao.md) do módulo Incident Handling, que cobre as atividades contínuas que a equipa criada aqui deve manter entre incidentes.
