# TISI - Tratamento de Incidentes de Segurança Informática

Materiais práticos de apoio a Unidade Curricular de **Tratamento de Incidentes de Segurança Informática** (TISI) do Mestrado em Cibersegurança e Informática Forense (MCIF) - IPLeiria.

---

## Módulos disponíveis

### :material-chart-bar: [Business Impact Analysis (BIA)](bia/metricas.md)

Casos práticos e exercícios sobre métricas de impacto:

| Métrica | Descrição |
|---------|-----------|
| **RPO** | Recovery Point Objective - Quanto dado posso perder? |
| **RTO** | Recovery Time Objective - Em quanto tempo recupero? |
| **WRT** | Work Recovery Time - Quanto tempo para normalizar? |
| **MTD** | Maximum Tolerable Downtime - Máximo de paragem tolerável? |
| **MOR** | Minimum Operating Requirements - Mínimo para operar? |
| **MTBF** | Mean Time Between Failures - Fiabilidade do sistema |
| **MTTR** | Mean Time To Repair - Tempo médio de reparação |

**Conteúdos:**

- [Métricas BIA](bia/metricas.md) - Definições, diagramas e 3 exemplos práticos
- [Casos Práticos](bia/casos-praticos.md) - 10 cenários de diferentes setores
- [Exercícios](bia/exercicios.md) - 4 níveis de dificuldade com soluções
- [Calculadora Interativa](bia/calculadora.md) - Ferramentas de cálculo no browser
- :material-file-download: [Modelos BIA](https://github.com/guilhasn/tisi-materials/tree/main/BIA/Modelos){:target="_blank"} - Templates e exemplos para download

---

### :material-alert-circle: [Incident Response Plan (IRP)](irp/index.md)

Como identificar, classificar e responder a incidentes de segurança da informação:

| Conceito | Descrição |
|----------|-----------|
| **Identificação** | Detetar que um incidente está a ocorrer |
| **Classificação** | Avaliar a gravidade e o impacto (CIA) |
| **Contenção** | Limitar o impacto e evitar propagação |
| **Erradicação** | Remover a causa raiz do incidente |
| **Recuperação** | Restaurar operações normais |
| **Lições Aprendidas** | Melhorar processos para o futuro |

**Conteúdos:**

- [Fundamentos do IRP](irp/index.md) - Conceitos, CIA, exemplos práticos e exercícios
- [Planeamento](irp/planeamento.md) - Validar, decidir, coordenar, formato e testes do plano
- [Deteção](irp/detecao.md) - Fontes de deteção, indicadores e fronteira incidente/desastre
- [Reação](irp/reacao.md) - Notificação, documentação e estratégias de contenção
- [Recuperação](irp/recuperacao.md) - Avaliação de danos, perícia forense e recuperação madura
- [Casos Práticos](irp/casos-praticos.md) - 5 cenários completos ponta-a-ponta

### :material-backup-restore: [Disaster Recovery Plan (DRP)](drp/index.md)

Como preparar, responder e recuperar de desastres que excedem a capacidade de resposta a incidentes:

| Conceito | Descrição |
|----------|-----------|
| **Incidente vs Desastre** | Classificar a situação e ativar o plano adequado |
| **Etapas do DRP** | Prioridades, papéis, alerta, documentação, mitigação |
| **Estratégias de recuperação** | Hot/warm/cold sites, backups, replicação |
| **Gestão de crise** | Comunicação, stakeholders, apoio ao pessoal |
| **Testes** | Checklist, walk-through, simulação, paralelo, interrupção total |

**Conteúdos:**

- [Fundamentos do DRP](drp/index.md) - Conceitos, etapas, categorias de disrupção e exercícios
- [Estratégias de Recuperação](drp/estrategias.md) - Sites alternativos, hardware, software, pessoal e dados
- [Gestão de Crise](drp/gestao-crise.md) - Comunicação, stakeholders e liderança durante o desastre
- [Testes e Manutenção](drp/testes.md) - Como testar e manter o DRP atualizado
- [Casos Práticos](drp/casos-praticos.md) - 5 cenários completos de diferentes setores

### :material-shield-check: [Business Continuity Plan (BCP)](bcp/index.md)

Como manter as funções críticas de negócio em funcionamento durante e após um desastre:

| Conceito | Descrição |
|----------|-----------|
| **BCP vs DRP** | Continuidade do negócio vs recuperação técnica |
| **Governação** | CEO como proprietário, coordenador BCP, equipas |
| **Estratégias** | Sites alternativos, hardware, software, pessoal, dados |
| **Implementação** | Declaração de desastre, operação alternativa, regresso |
| **Testes** | Checklist, walk-through, simulação, paralelo, full-interruption |
| **Normas** | ISO 22301, ISO 27031, NIST 800-34, DRII, BCI GPG |

**Conteúdos:**

- [Fundamentos do BCP](bcp/index.md) - Conceitos, BCP vs DRP, governação e exercícios
- [Estratégias de Continuidade](bcp/estrategias.md) - Sites alternativos, recuperação de dados e pessoal
- [Implementação e Operações](bcp/implementacao.md) - Ativação, operação alternativa e regresso
- [Testes e Manutenção](bcp/testes.md) - Tipos de teste, frequência e manutenção do plano
- [Normas e Frameworks](bcp/normas.md) - ISO 22301, NIST 800-34, DRII, BCI GPG
- [Casos Práticos](bcp/casos-praticos.md) - 5 cenários completos de diferentes setores

---

## Como usar

1. Consulta os materiais em cada módulo para estudo teórico-prático
2. Segue a ordem recomendada: **BIA → IRP → DRP → BCP**
3. Em cada módulo, le a teoria e depois resolve os exercícios antes de consultar as soluções
4. Usa os [casos práticos do BIA](bia/casos-praticos.md), os [casos práticos do IRP](irp/casos-praticos.md), os [casos práticos do DRP](drp/casos-praticos.md) e os [casos práticos do BCP](bcp/casos-praticos.md) para consolidar conhecimentos
5. Experimenta a [calculadora interativa](bia/calculadora.md) para simular diferentes cenários

---

*Material académico para uso no âmbito da UC TISI - MCIF - IPLeiria*
