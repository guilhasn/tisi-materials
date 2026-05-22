# Capítulo 3 — Componentes e Construção

## 3.1 Componentes essenciais de um Playbook

Um playbook maduro tem **quatro componentes** que se complementam. Nenhum substitui os outros.

```
  ╔═══════════════════════════════════════════════════════════════════╗
  ║   ANATOMIA DE UM PLAYBOOK COMPLETO                                ║
  ║                                                                   ║
  ║   ┌────────────────┐    ┌────────────────┐                        ║
  ║   │ 1. FLUXOGRAMA  │    │ 2. CHECKLIST   │                        ║
  ║   │                │    │                │                        ║
  ║   │ Decisões com   │    │ Lista          │                        ║
  ║   │ múltiplos      │    │ sequencial     │                        ║
  ║   │ caminhos       │    │ de passos      │                        ║
  ║   │                │    │                │                        ║
  ║   │ "O quê?"       │    │ "Como?"        │                        ║
  ║   └────────┬───────┘    └────────┬───────┘                        ║
  ║            │                     │                                ║
  ║            └──────────┬──────────┘                                ║
  ║                       │                                           ║
  ║                       ▼                                           ║
  ║   ┌────────────────┐    ┌────────────────┐                        ║
  ║   │ 3. RACI        │    │ 4. AMBIENTE    │                        ║
  ║   │                │    │                │                        ║
  ║   │ Quem decide,   │    │ Ferramentas,   │                        ║
  ║   │ quem executa,  │    │ contactos,     │                        ║
  ║   │ quem é         │    │ topologia      │                        ║
  ║   │ informado      │    │ específicos    │                        ║
  ║   │                │    │                │                        ║
  ║   │ "Quem?"        │    │ "Onde?"        │                        ║
  ║   └────────────────┘    └────────────────┘                        ║
  ╚═══════════════════════════════════════════════════════════════════╝
```

### 1. Fluxogramas (*Flowcharts*)

Ideais para **decisões que levam a múltiplos caminhos**.

**Exemplo:** *"O ficheiro é malicioso?"*

- **Sim** → isolar endpoint, recolher evidência, escalar P2.
- **Não** → monitorizar 24h, fechar ticket.

O fluxograma **governa o quadro geral da resposta**. Funciona melhor que prosa quando há **bifurcações de decisão**.

### 2. Checklists

Ideais para **listas monolíticas de passos sequenciais**, onde **não há decisão**, só execução.

**Exemplo (passo "Isolar endpoint"):**

- [ ] Localizar o endpoint na consola EDR pelo hostname/IP;
- [ ] Aplicar *Network Containment*;
- [ ] Verificar que o endpoint perdeu conectividade externa;
- [ ] Documentar timestamp de isolamento no ticket;
- [ ] Notificar process owner do sistema afetado.

### A combinação — a melhor abordagem

**Fluxograma para decisões + Checklist para execução.** Cada bloco do fluxograma tem uma **checklist associada** que detalha como executar esse passo.

### 3. Matriz RACI

Define **quem é responsável, quem decide, quem é consultado e quem é informado** em cada passo. **Saber antecipadamente quem faz o quê elimina ambiguidade em momentos de crise.**

| Letra | Significado | O que faz |
|:-----:|-------------|-----------|
| **R** | **R**esponsible — Responsável | Executa a tarefa |
| **A** | **A**ccountable — *Accountable* | Aprova e responde pelo resultado (1 pessoa apenas) |
| **C** | **C**onsulted — Consultado | Fornece *input* antes da decisão |
| **I** | **I**nformed — Informado | É notificado do resultado |

!!! warning "Apenas UMA pessoa pode ser A"
    Cada actividade tem **um único Accountable**. Se há "duas pessoas accountable", na prática **ninguém é accountable** — porque ambas podem culpar a outra. Múltiplos R, C, I são saudáveis; múltiplos A são quebrados.

### 4. Influências Ambientais (*Environmental Influences*)

Os passos devem ser **específicos do ambiente da organização** — não genéricos. Um novo analista deve conseguir seguir o playbook e **adquirir competência operacional**.

| Genérico (mau) | Específico (bom) |
|----------------|------------------|
| *"Verificar logs do SIEM"* | *"Abrir o Splunk em [URL interno]; correr a query `index=auth source=ad sourcetype=windows`"* |
| *"Isolar o endpoint"* | *"Na consola CrowdStrike Falcon, aceder a Hosts > Host Setup and Management > Network Contain; localizar pelo hostname [pattern]"* |
| *"Contactar a equipa de IT"* | *"Telefonar para o turno IT 24/7: +351 xxx xxx xxx; canal Teams: #soc-ir"* |

O playbook deve ser **atualizado continuamente** para acompanhar mudanças na infraestrutura.

!!! abstract "Regra de ouro"
    **Fluxograma para decisões** + **Checklist para execução** + **RACI para responsabilidades** + **Ambiente para concretizar** = **Playbook completo**.

---

## 3.2 Matriz RACI e Ambiente Operacional — em detalhe

### Exemplo de matriz RACI para um playbook de Phishing

| Actividade | SOC L1 | SOC L2 | SOC Manager | IT Infra | DPO | Comunicação |
|------------|:------:|:------:|:-----------:|:--------:|:---:|:-----------:|
| Triagem inicial do alerta | **R** | C | A | — | — | — |
| Verificar headers (SPF/DKIM/DMARC) | R | **R** | A | — | — | — |
| Bloquear remetente no gateway | C | **R** | A | I | — | — |
| Reset credenciais comprometidas | — | C | A | **R** | I | — |
| Avaliar impacto RGPD (dados pessoais expostos) | — | C | I | — | **R/A** | — |
| Comunicação interna aos afetados | — | — | C | — | C | **R/A** |
| Notificação à CNPD (se aplicável, 72h) | — | I | C | — | **R/A** | I |
| Atualização do playbook (lições aprendidas) | C | **R** | A | C | C | I |

### Lista de informação ambiental obrigatória

Cada playbook deve incluir, **directamente no documento**:

- ✅ **Ferramentas reais** da organização (SIEM, EDR, firewall, IAM) com URLs / consolas;
- ✅ **Contactos directos** dos papéis RACI (nome, telefone, email, canal de mensagens);
- ✅ **Topologia de rede específica** (zonas, segmentos críticos, choke points);
- ✅ **Sistemas tier 0** identificados (AD, PKI, backups, cofres de segredos);
- ✅ **Janelas de mudança** (quando o playbook pode/não pode interferir com produção);
- ✅ **Atualização contínua** com mudanças na infraestrutura.

### Caso prático

> *Um novo analista, no primeiro dia, consegue isolar um endpoint comprometido seguindo o playbook — porque o RACI indica quem contactar para autorização e o ambiente descreve exactamente que ferramenta usar.*

Se o novo analista **não consegue** isolar o endpoint seguindo só o playbook, então:

- ou o playbook está mal escrito (vago, genérico);
- ou faltam informações ambientais (URLs, contactos);
- ou o RACI não está claro sobre quem pode autorizar.

**Estes três pontos são auditáveis** — `tabletop` exercise revela todos.

### Do genérico ao activo

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   Playbook                                                      │
  │   genérico            Adaptação local         Validação         │
  │   (teórico,    ───►   (RACI + ferramentas    ───►   (testes e    │
  │    abstracto)         da organização)               revisão)    │
  │                                                                 │
  │                                                  │              │
  │                                                  ▼              │
  │                                            Playbook ATIVO       │
  │                                            (operacional 24/7)   │
  └─────────────────────────────────────────────────────────────────┘
```

---

## 3.3 Processo de Construção — 10 passos

Construir um playbook do zero segue um processo bem definido. **Saltar passos produz playbooks que falham no primeiro incidente real.**

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   1. Identificar triggers e estado final                        │
  │            │                                                    │
  │            ▼                                                    │
  │   2. Listar todas as acções possíveis                           │
  │            │                                                    │
  │            ▼                                                    │
  │   3. Categorizar acções (obrigatórias vs opcionais)             │
  │            │                                                    │
  │            ▼                                                    │
  │   4. Agrupar por fase IR (NIST 6 fases)                         │
  │            │                                                    │
  │            ▼                                                    │
  │   5. Identificar prerequisitos de cada acção                    │
  │            │                                                    │
  │            ▼                                                    │
  │   6. Construir playbook só com acções obrigatórias              │
  │            │                                                    │
  │            ▼                                                    │
  │   7. Adicionar acções opcionais onde apropriado                 │
  │            │                                                    │
  │            ▼                                                    │
  │   8. Inserir notas de conformidade e contactos                  │
  │            │                                                    │
  │            ▼                                                    │
  │   9. Validar com testes (tabletop, purple team)                 │
  │            │                                                    │
  │            ▼                                                    │
  │  10. Publicar + treinar equipa + revisão periódica              │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

### Detalhe dos 10 passos

| # | Passo | O que produzir concretamente |
|:-:|-------|------------------------------|
| **1** | **Identificar trigger e estado final** | Que alerta/evento dispara este playbook (SIEM, report, EDR)? Que estado final indica *"incidente resolvido"* (sistema limpo, dados restaurados, comunicação fechada)? |
| **2** | **Enquadrar MaGMa** (Business / Threat / Implementation) | **Business:** que processo/ativo protege? **Threat:** que TTPs MITRE? Que atores? **Implementation:** que logs, regras, ferramentas suportam? |
| **3** | **Listar TODAS as acções possíveis** | *Brainstorm* sem filtro — incluir acções de detecção, contenção, erradicação, recuperação, comunicação |
| **4** | **Categorizar obrigatórias vs opcionais** | **Obrigatórias** = têm de acontecer SEMPRE para este tipo de incidente · **Opcionais** = dependem de cenário, severidade, contexto |
| **5** | **Agrupar por fase NIST** | 1. Preparação · 2. Identificação · 3. Contenção · 4. Erradicação · 5. Recuperação · 6. Lições aprendidas. **Cada acção encaixa em UMA fase.** Se não encaixa, provavelmente não pertence a este playbook |
| **6** | **Identificar prerequisitos** | Que acessos/ferramentas/autorizações cada acção precisa? Se uma acção requer aprovação, indicar **quem** aprova |
| **7** | **Atribuir RACI** | Para cada acção: R (executa), A (aprova), C (consultado), I (informado). **Regra absoluta: 1 acção = exactamente 1 A.** R pode ser igual a A. Múltiplos R/C/I é OK |
| **8** | **Construir fluxograma + checklist** | Fluxograma = decisões e bifurcações · Checklist = execução sequencial. Cada decisão do fluxograma tem **critério explícito** (não *"se necessário"* — sim *"se N > 10"*) |
| **9** | **Adicionar runbook** (comandos reais) | Queries SIEM, comandos EDR, acções em ferramentas reais. **Sem isto, é só decoração** — analista sénior tem de poder copiar-colar |
| **10** | **Testar e versionar** | Tabletop trimestral · Actualizar após cada incidente real · Owner formal · **Critério de fecho** claramente definido (senão fica aberto indefinidamente) |

---

## 3.3.1 Os 5 erros que matam um playbook em produção

> **Causa nº 1 de playbooks que não funcionam em produção:** acumulação destes 5 erros. Cada um, isolado, parece menor — combinados, tornam o playbook **decorativo**.

!!! danger "5 erros a evitar — checklist mental antes de publicar qualquer playbook"

    | # | Erro | Sintoma | Correcção |
    |:-:|------|---------|-----------|
    | 1 | **Vago** | *"Isolar sistemas se necessário"* → analista **não sabe quando** agir | Substituir por **critério mensurável**: *"se N > 10 utilizadores afetados"* ou *"se EDR confirma execução de payload"* |
    | 2 | **RACI ambíguo** | Várias pessoas com **A** na mesma acção → ninguém decide, toda a gente acha que é outra pessoa | **Regra absoluta:** 1 acção = 1 A. Sem exceção. |
    | 3 | **Sem runbook** | Documento bonito sem comandos concretos → analista júnior **bloqueia em produção** | Incluir queries SIEM, comandos EDR, screenshots de ferramentas. Sem runbook, **é decoração** |
    | 4 | **Sem critério de fecho** | *"Resolver incidente."* → fica **aberto eternamente** | Definir condições explícitas: *"X sem reincidência por Y dias"*, *"aprovação formal de fecho pelo IR Manager"* |
    | 5 | **Não testado** | Playbook só existe em PDF → primeira execução é **no incidente real** | **Tabletop trimestral mínimo**. Actualizar após cada incidente. **Playbook não testado = teoria.** |

!!! tip "Onde aplicar esta checklist"
    Use estes 5 erros como **checklist de auto-revisão** sempre que terminar um playbook. Se algum se aplica, **o playbook não está pronto para produção** — independentemente da quantidade de páginas que tenha.

---

## 3.4 Testes e validação

> **Um playbook não testado é apenas teoria.** A primeira vez que se executa não pode ser num incidente real.

### Tipos de teste

| Teste | Esforço | Frequência | Output |
|-------|---------|------------|--------|
| **Walkthrough / Talk-through** | Baixo (1-2h) | Mensal | Equipa lê e discute cada passo |
| **Tabletop exercise** | Médio (4h) | Trimestral | Cenário fictício; equipa age conforme playbook |
| **Functional drill** | Alto (dia) | Semestral | Exercício parcial em ambiente *staging* |
| ***Purple team*** | Muito alto (semana) | Anual | Red team executa ataque real; blue team responde via playbook |

### O que validar em cada teste

- [ ] Os **triggers** activam o playbook correctamente?
- [ ] Os **contactos RACI** estão actualizados e respondem em tempo útil?
- [ ] As **ferramentas** referidas no playbook ainda existem e funcionam?
- [ ] O playbook produz o **estado final** definido?
- [ ] O tempo total de execução está dentro do **SLA** previsto?
- [ ] Há **falsos positivos** ou **ramos esquecidos** descobertos durante o teste?

### Documentar descobertas

Cada teste **deve produzir uma acta** com:

- Cenário usado;
- Participantes (RACI confirmado ou em falha);
- Pontos onde o playbook falhou ou foi ambíguo;
- Acções correctivas + prazos;
- Versão do playbook actualizada (com *changelog*).

!!! tip "Cadência mínima recomendada para SOC maduro"
    - **Walkthrough** mensal para playbooks críticos (P1/P2);
    - **Tabletop** trimestral cobrindo os 5 cenários mais prováveis (phishing, ransomware, conta comprometida, DDoS, fuga de dados);
    - ***Purple team*** anual com cenário desafiador.

---

**Próximos passos:** [Capítulo 4 — Caso Prático: Phishing](caso-phishing.md)
