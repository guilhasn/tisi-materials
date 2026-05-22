# Use Cases e Playbooks de Resposta a Incidentes

> **Capítulo 04 da UC TISI.** Este módulo cobre o desenho, construção e operacionalização de **playbooks de resposta a incidentes** e **use cases de segurança**. Alinhado com **NIST SP 800-61r2**, **FIRST CSIRT Services Framework v2.1**, **MITRE ATT&CK** e **MaGMa Use Case Framework** (ABN AMRO).

## 3 ideias-chave deste módulo

!!! abstract "1️⃣ Um playbook transforma conhecimento tácito em conhecimento explícito"
    Sem playbook, a resposta depende da **memória individual** do analista sénior que estiver de serviço. Com playbook, **um analista júnior em Lisboa responde da mesma forma que um sénior no Porto** — qualidade deixa de depender da pessoa, passa a depender do processo.

!!! abstract "2️⃣ Playbooks são compostos por *Use Cases*"
    Os Use Cases são as **peças de Lego** dos playbooks: cada *play* corresponde a um Use Case com trigger, hipóteses a testar, dados a recolher e ações a executar. O playbook orquestra os Use Cases numa sequência operacional.

!!! abstract "3️⃣ Investigação por hipóteses > acções *scriptadas*"
    Playbooks maduros capturam **o que perguntar** (hipóteses), não **como fazer** (acções amarradas a produto). *"O endpoint tem evidência de ligações suspeitas?"* é portável; *"executar `wireshark -i eth0 -f 'host x.x.x.x'`"* não é. Os comandos vão para o *runbook*, as perguntas ficam no *playbook*.

## Objetivo do módulo

Capacitar o aluno a **desenhar, construir, testar e manter** playbooks operacionais de resposta a incidentes em contexto SOC/CSIRT. No fim do módulo, o aluno deve ser capaz de:

- Distinguir *Security Playbook* de *Incident Response Playbook* e saber quando aplicar cada um;
- Identificar e enumerar Use Cases de segurança ligados a *drivers* de negócio;
- Construir um playbook usando os 4 componentes essenciais (Fluxograma + Checklist + RACI + Influências Ambientais);
- Aplicar a **investigação por hipóteses** em vez de acções *scriptadas*;
- Posicionar Use Cases no **framework MaGMa** (Business / Threat / Implementation);
- Gerir o **ciclo de vida** dos Use Cases (onboarding → operacional → manutenção → offloading).

## Estrutura do módulo

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Cap 1 — Fundamentos dos Playbooks                             │
  │           Definição, taxonomia, porquê SOC precisa              │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 2 — Use Cases de Segurança                                │
  │           Estratégico → Tático → Operacional;                   │
  │           hipóteses vs acções                                   │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 3 — Componentes e Construção                              │
  │           Fluxogramas, checklists, RACI, ambiente,              │
  │           10 passos de construção                               │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 4 — Caso Prático: Phishing                                │
  │           6 fases: Ident → Triagem → Investig →                 │
  │           Análise → Remediação → Pós-Incidente                  │
  │                        │                                        │
  │                        ▼                                        │
  │   Cap 5 — Framework MaGMa                                       │
  │           3 camadas, L1/L2/L3, ciclo de vida                    │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

## Conteúdos deste módulo

| Página | Descrição |
|--------|-----------|
| [**Cap 1 — Fundamentos dos Playbooks**](fundamentos.md) | O que é; Security vs IR Playbook; porquê SOC precisa (MTTR, conformidade) |
| [**Cap 2 — Use Cases de Segurança**](use-cases.md) | Estratégico/Tático/Operacional; ligação a drivers de negócio; investigação por hipóteses vs *scripted* |
| [**Cap 3 — Componentes e Construção**](componentes.md) | Fluxogramas + Checklists + RACI + Ambiente; processo de 10 passos; testes e validação |
| [**Cap 4 — Caso Prático: Phishing**](caso-phishing.md) | Walkthrough completo das 6 fases NIST aplicado a campanha de phishing |
| [**Cap 5 — Framework MaGMa**](magma.md) | Modelo de 3 camadas (Business / Threat / Implementation); agrupamentos L1/L2/L3; ciclo de vida |

## Pré-requisitos recomendados

- Módulo [Incident Handling](../ih/index.md) — fundamentos NIST SP 800-61r2 (Preparação → Deteção → Contenção → Erradicação → Recuperação → Lições Aprendidas);
- Módulo [Setting Up CSIRT](../csirt/index.md) — papéis L1/L2/L3, autoridade, [FIRST Services Framework v2.1](https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1);
- [Mapa MITRE ATT&CK](../comum/attack-mapping.md) — vocabulário para TTPs.

## Relação com outros módulos da UC

- **Alimenta:** os módulos [IRP](../irp/index.md), [DRP](../drp/index.md) e [Incident Handling](../ih/index.md) — playbooks são a concretização operacional desses planos.
- **Usa conceitos de:** [CSIRT](../csirt/index.md) (matriz RACI, papéis L1-L4, autoridade) e [ATT&CK](../comum/attack-mapping.md) (TTPs nos Use Cases).
- **Materializa em:** [Templates operacionais](../modelos/index.md) — playbooks Ransomware, Phishing, Violação RGPD prontos a adaptar.

---

**Começar pelo início:** [Capítulo 1 — Fundamentos dos Playbooks](fundamentos.md)
