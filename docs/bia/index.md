# Business Impact Analysis (BIA)

A **Business Impact Analysis (BIA)** é o processo fundamental que identifica e avalia os potenciais efeitos de uma interrupção nas operações críticas de uma organização. É o **primeiro passo** de qualquer estratégia de continuidade de negócio e recuperação de desastres.

---

## O que é a BIA?

A BIA responde a quatro questões essenciais:

| Questão | Métrica |
|---------|---------|
| Quanto dado posso perder? | **RPO** — Recovery Point Objective |
| Em quanto tempo tenho de recuperar? | **RTO** — Recovery Time Objective |
| Qual é o mínimo para continuar a operar? | **MBO** — Minimum Business Objective |
| Qual é o tempo máximo de interrupção tolerável? | **MTD** — Maximum Tolerable Downtime |

---

## Porquê fazer uma BIA?

- **Priorizar recursos** — saber quais processos são críticos e quais podem esperar
- **Justificar investimentos** — dados concretos para decisores sobre custos de inatividade
- **Alimentar o IRP, DRP e BCP** — sem BIA, os planos de resposta não têm base quantitativa
- **Cumprir requisitos normativos** — ISO 22301, NIST SP 800-34 e outras normas exigem BIA formal

---

## Relação com os outros módulos

```
┌─────────────────────────────────────────────────┐
│                     BIA                         │
│         (identifica e quantifica impactos)      │
├────────────┬────────────┬───────────────────────┤
│            │            │                       │
│     ▼      │     ▼      │          ▼            │
│   IRP      │   DRP      │        BCP            │
│ (resposta  │ (recuperar │ (manter operações     │
│  imediata) │  sistemas) │  durante a crise)     │
└────────────┴────────────┴───────────────────────┘
```

> A BIA fornece os **dados** — os planos IRP, DRP e BCP definem as **ações**.

---

## Conteúdos deste módulo

| Página | Descrição |
|--------|-----------|
| [Métricas BIA](metricas.md) | RPO, RTO, WRT, MTD, MBO — definições, fórmulas e exemplos |
| [Casos Práticos](casos-praticos.md) | Cenários reais com análise passo a passo |
| [Exercícios](exercicios.md) | Problemas para praticar com soluções detalhadas |
| [Calculadora Interativa](calculadora.md) | Ferramenta para calcular e visualizar métricas |

---

*Comece pelas [Métricas BIA](metricas.md) para dominar os conceitos fundamentais.*

---

## 📋 Templates

Consulte os templates disponíveis para apoio à elaboração do BIA:

[:material-file-document-outline: Aceder aos Templates](https://github.com/guilhasn/tisi-materials/tree/main/TEMPLATES){ .md-button .md-button--primary target="_blank" }
