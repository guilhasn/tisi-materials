# Prática Laboratorial — Construção de Playbooks

> **Aula prática ·** Última aula prática da UC antes do trabalho de projeto. O objetivo **não é teoria adicional** — é levar cada equipa a **construir um playbook completo** com qualidade suficiente para entrar como anexo do **relatório final do PRI** (entrega 23 de junho de 2026).

## Princípio orientador

> *"Imperfeito mas completo > Perfeito a meio."* O que distingue um trabalho bom de um excelente **não é a quantidade de playbooks** — é o **nível de detalhe operacional**: comandos reais, critérios mensuráveis, RACI completo, cenários de exceção.

---

## Estrutura da aula prática

| Bloco | Min | Conteúdo | Output |
|-------|-----|----------|--------|
| **Bloco 1 — Teoria performada** | 60 | Apresentação interpelativa dos 5 capítulos + demo do método | Compreensão dos conceitos-chave |
| **Bloco 2A — Ficha de Tipologia** | 15 | Cada equipa identifica tipos de incidente e escolhe 3 prioritários | [Ficha 1](#bloco-2a-ficha-de-tipologia-15-min) preenchida |
| **Bloco 2B — Build do Playbook** | 75 | Cada equipa constrói 1 playbook completo (Ransomware, Phishing ou Acesso Não Autorizado) | [Template](#bloco-2b-build-do-playbook-75-min) preenchido |
| **Bloco 2C — Curveballs** | 15 | Inputs inesperados que forçam a adaptar o playbook em tempo real | Secção de exceções no playbook |
| **Bloco 3 — Pitch & Crítica** | 15 | Cada equipa apresenta (3 min) + pergunta dura de outra equipa + pergunta do docente | Lições aprendidas observadas |

### Output esperado por equipa no fim da aula

- ✅ **Tabela de tipologia** preenchida e justificada (Ficha 1) — entra **directamente** no relatório do projeto, sub-ponto (i);
- ✅ **1 playbook completo** no template Word (resolve **directamente** 1 dos 3 obrigatórios do enunciado);
- ✅ **3 lições aprendidas** observadas nas críticas das outras equipas;
- ✅ **Cheat-sheet do método** para replicar em casa os outros 2 playbooks.

---

## Bloco 2A — Ficha de Tipologia (15 min)

### Princípio

Os playbooks devem cobrir tipos de incidente que cumprem **simultaneamente** três critérios:

| # | Critério | Pergunta |
|:-:|----------|----------|
| 1 | **Repetitividade** | Este tipo de incidente acontece (ou pode acontecer) com frequência suficiente para justificar padronização? *(regra empírica: ≥1 ocorrência por trimestre OU probabilidade > 30% no próximo ano)* |
| 2 | **Impacto** | O impacto potencial é relevante (operacional, financeiro, regulatório, reputacional)? |
| 3 | **Padronizável** | Pelo menos **80-90% das ocorrências** podem seguir os mesmos passos? |

!!! warning "Quando NÃO faz sentido fazer playbook"
    - Incidente **raríssimo e de baixo impacto** (não vale o esforço de manter);
    - Incidente **único e altamente complexo** (cada caso é diferente — fica em modo ad-hoc com o IR Manager);
    - Incidentes já cobertos por **outro playbook mais geral**.

### Catálogo de referência — 8 categorias de incidente

Ponto de partida (não exaustivo). Adicionem, removam ou fundam conforme a vossa organização.

| Categoria | Exemplos típicos |
|-----------|------------------|
| **A. Acesso e identidade** | Acesso não autorizado · Comprometimento de credenciais · Abuso de privilégios (insider threat) · MFA bypass / session hijacking |
| **B. Código malicioso** | Ransomware · Malware genérico (trojan, worm, keylogger) · Cryptominer não autorizado · Rootkit / persistência avançada |
| **C. Engenharia social** | Phishing massivo · Spear-phishing / whaling · Business Email Compromise (BEC) · Smishing / vishing |
| **D. Disponibilidade** | DDoS / DoS · Falha de serviço crítico · Cifragem acidental ou maliciosa de dados |
| **E. Dados** | Exfiltração / fuga de dados · Violação de dados pessoais (notificável RGPD) · Perda física de equipamento · Modificação ou destruição não autorizada |
| **F. Web e perímetro** | Defacement institucional · Exploração de vulnerabilidade web (SQLi, XSS) · Comprometimento de servidor exposto |
| **G. Cadeia de fornecimento** | Comprometimento de fornecedor com acesso à rede · Dependência maliciosa em código · Falha de fornecedor crítico (cloud, telecom, ERP) |
| **H. Operacional / configuração** | Erro humano com impacto em segurança · Configuração indevida exposta (S3 público, BD sem password) · Shadow IT detectado |

### 3 playbooks mínimos obrigatórios no projecto

Independentemente do setor, o enunciado do projeto exige **pelo menos**:

1. **Phishing / engenharia social**
2. **Ransomware** (ou malware com impacto)
3. **Acesso não autorizado / credenciais comprometidas**

A equipa pode acrescentar **1 ou 2 playbooks adicionais com justificação**. **Mais que isso, dilui qualidade.**

### 📥 Download da Ficha 1

[:material-file-word: Ficha 1 — Tipologia de Incidentes](../gestao_incidentes/playbook-pl-ficha1-tipologia.docx){ .md-button .md-button--primary }

Documento `.docx` editável com tabela de 12 linhas para preencher (`tipo de incidente · frequência A/M/B · impacto A/M/B · playbook? Sim/Não/Englobado · justificação`) + caracterização da organização + 3 prioritários com critério de priorização.

---

## Bloco 2B — Build do Playbook (75 min)

### Método de construção em 10 passos

Cada playbook segue o mesmo método. Está consolidado num documento de bolso para cada aluno.

| # | Passo | O que produzir |
|:-:|-------|----------------|
| 1 | **Identificar trigger e estado final** | Que alerta dispara? Que estado final indica "incidente resolvido"? |
| 2 | **Enquadrar MaGMa** | *Business* (ativo protegido) · *Threat* (TTPs, atores) · *Implementation* (logs, regras, ferramentas) |
| 3 | **Listar TODAS as acções possíveis** | *Brainstorm* sem filtro: detecção, contenção, erradicação, recuperação, comunicação |
| 4 | **Categorizar obrigatórias vs opcionais** | Obrigatórias = sempre · Opcionais = dependem de cenário, severidade, contexto |
| 5 | **Agrupar por fase NIST** | Preparação · Identificação · Contenção · Erradicação · Recuperação · Lições aprendidas |
| 6 | **Identificar prerequisitos** | Que acessos / ferramentas / autorizações cada acção precisa? |
| 7 | **Atribuir RACI** | 1 acção = 1 A. R pode ser igual a A. Múltiplos R/C/I é OK |
| 8 | **Construir fluxograma + checklist** | Fluxograma = decisões · Checklist = execução · Cada decisão tem critério mensurável |
| 9 | **Adicionar runbook** | Queries SIEM, comandos EDR reais. **Sem isto, é decoração.** |
| 10 | **Testar e versionar** | Tabletop trimestral · Owner formal · Critério de fecho explícito |

### 5 erros a evitar — causa nº1 de playbooks que falham em produção

!!! danger "Os 5 erros que matam um playbook em produção"

    | # | Erro | Sintoma | Correcção |
    |:-:|------|---------|-----------|
    | 1 | **Vago** | *"Isolar sistemas se necessário"* → analista não sabe quando agir | Substituir por **critério mensurável**: *"se N > 10 utilizadores afetados"* |
    | 2 | **RACI ambíguo** | Várias pessoas com "A" na mesma acção → ninguém decide | Regra: **1 acção = 1 A** |
    | 3 | **Sem runbook** | Documento bonito sem comandos concretos → júnior bloqueia | Sem runbook, é decoração — incluir queries SIEM, comandos EDR |
    | 4 | **Sem critério de fecho** | *"Resolver incidente."* → fica aberto eternamente | Definir condições explícitas: *"X sem reincidência por Y dias"* |
    | 5 | **Não testado** | Playbook só existe em PDF, nunca foi corrido | **Tabletop trimestral mínimo** + actualizar após cada incidente real |

### Mapeamentos MITRE ATT&CK para os 3 playbooks obrigatórios

Cada playbook deve incluir mapeamento MITRE — esta tabela é o ponto de partida.

| Playbook | Initial Access | Execution / Persistence | Impact |
|----------|----------------|--------------------------|--------|
| **Phishing** | **T1566** Phishing<br>T1566.001 Attachment<br>T1566.002 Link | **T1204** User Execution<br>T1059 Command and Scripting<br>T1547 Boot or Logon Autostart | **T1078** Valid Accounts (post-credentials)<br>T1114 Email Collection |
| **Ransomware** | **T1566** Phishing<br>T1190 Exploit Public-Facing App<br>T1133 External Remote Services | T1486 Data Encrypted for Impact (preparação)<br>T1490 Inhibit System Recovery<br>T1562 Impair Defenses | **T1486** Data Encrypted for Impact<br>T1657 Financial Theft<br>T1567 Exfiltration Web Service |
| **Acesso Não Autorizado** | **T1078** Valid Accounts<br>T1110 Brute Force<br>T1133 External Remote Services | T1078.004 Cloud Accounts<br>T1098 Account Manipulation<br>T1556 Modify Authentication | T1530 Data from Cloud Storage<br>T1213 Data from Information Repositories |

Ver [mapa MITRE ATT&CK completo](../comum/attack-mapping.md) para detalhe.

### 📥 Downloads para o Bloco 2B

[:material-file-word: Template Playbook TISI](../gestao_incidentes/playbook-template-tisi.docx){ .md-button .md-button--primary }
[:material-file-word: Cheat-sheet do Método](../gestao_incidentes/playbook-cheatsheet-metodo.docx){ .md-button }

**Template Playbook** — Documento `.docx` com **11 secções estruturadas**, alinhado com os 5 pontos obrigatórios do enunciado do projeto + boas práticas (MaGMa, MITRE ATT&CK, runbook, BCP/DRP triggers, critério de fecho, lições aprendidas).

**Cheat-sheet** — Documento de bolso (impressão recomendada) com o método de 10 passos + 5 erros a evitar + mapeamentos MITRE ATT&CK para os 3 obrigatórios.

### Atribuição sugerida de playbooks (4 equipas)

| Equipa | Playbook | Porquê |
|--------|----------|--------|
| **E1** | Ransomware | Maior impacto e maior diversidade de TTPs — desafiante |
| **E2** | Phishing | Mais material exemplificativo no [Cap 4](caso-phishing.md) — base para inspiração |
| **E3** | Acesso Não Autorizado | Menos coberto na teoria — força mais autonomia técnica |
| **E4** | À escolha da equipa | Premia iniciativa: DDoS, BEC, exfiltração — desde que justifiquem |

---

## Bloco 2C — Curveballs (15 min)

*Curveballs* são **inputs inesperados** lançados em tempo real durante o exercício. Forçam as equipas a confrontar o seu playbook com situações que não previram. É a parte **mais próxima de uma tabletop real**.

Cada equipa tem **4 minutos** para actualizar o playbook em resposta a cada curveball, e adicionar uma secção **"Exceções e situações limite"**.

### Curveball 1 — Indisponibilidade humana

> *São 02h17 de domingo. O alerta dispara. A pessoa marcada como **Accountable** na vossa matriz RACI está em viagem fora do país, sem ligação. O backup também não atende. O playbook **não pode ficar bloqueado**. Como é que o vosso playbook resolve esta situação?*

**O que se aprende:** o RACI tem de prever **escalonamento por indisponibilidade**. Não basta *"X é Accountable"* — tem de haver **cadeia de delegação** pré-aprovada.

### Curveball 2 — Conflito com regulador

> *Já foram **68 horas** desde a deteção. Faltam **4 horas** para o prazo do **Art. 33.º do RGPD** (notificação à CNPD em 72h). A vossa Jurídica está em férias, o backup está em formação fora. A Direção não decide sem aconselhamento jurídico. O que faz o vosso playbook nesta situação? **Quem decide notificar — e em nome de quem?***

**O que se aprende:** para certas decisões **irreversíveis** há **prazos legais**. O playbook tem de ter **cadeia de delegação pré-aprovada** para evitar paralisia.

### Curveball 3 — Conflito de prioridades operacionais

> *O **CSIRT nacional / fornecedor de threat intel** contacta a vossa organização. Estão a fazer **caça ativa** a este ator e **pedem que NÃO bloqueiem ainda** os IoCs nem isolem os endpoints — para manterem visibilidade. Mas o vosso playbook obriga a isolar imediatamente. **O que faz o playbook? Quem decide? Que evidências documentar para auditoria a posteriori?***

**O que se aprende:** o playbook **não pode ser cego ao contexto**. Tem de haver **mecanismo de exceção formal** — quem aprova, como se documenta, qual o critério de retomar a execução standard.

### Output do Bloco 2C

Cada equipa adiciona ao seu playbook uma secção:

```markdown
## Exceções e situações limite

### Indisponibilidade do Accountable
- Cadeia de delegação pré-aprovada: A → A' → A''
- Critério de activação automática: tentativa de contacto sem resposta em N minutos

### Prazos legais com indisponibilidade jurídica
- Delegação pré-aprovada para [Papel] notificar em nome da organização
- Conteúdo mínimo de notificação preliminar disponível em template

### Conflito com operação externa coordenada (CSIRT nacional)
- Mecanismo de excepção formal: [Papel] aprova excepção por escrito
- Evidências obrigatórias: contacto registado, justificação, decisão da Direção
- Critério de retoma: [condições para voltar à execução standard]
```

---

## Bloco 3 — Pitch & Crítica (15 min)

| Min | Atividade |
|-----|-----------|
| 0-3 | **Equipa 1** apresenta playbook (1 min) + responde a 1 pergunta de outra equipa + 1 pergunta do docente |
| 3-6 | **Equipa 2** |
| 6-9 | **Equipa 3** |
| 9-12 | **Equipa 4** |
| 12-15 | **Fecho do docente** — as 5 falhas mais comuns observadas + próximos passos |

### Perguntas duras que se podem esperar

- *"Quem aprova a contenção? **Não me digam o papel — digam o nome.**"*
- *"Se este alerta dispara às 02h00 de domingo, **quem executa**? Tem acesso? Sabe o que fazer?"*
- *"Esta query do SIEM **funciona na vossa organização**? Têm essa fonte de log onboarded?"*
- *"Esta acção *Notificar Jurídico* — **em quanto tempo**? Por que canal? E se está de férias?"*
- *"Qual é a vossa **definição de incidente fechado**? Quantos dias sem reincidência?"*
- *"Se eu passar este playbook a um analista júnior, **consegue executar sozinho**? Onde encrava?"*

---

## Como esta prática entra no relatório do projeto

A prática integra-se directamente em pontos específicos do enunciado:

| Output da aula prática | Sub-ponto do enunciado | Onde aparece no relatório |
|------------------------|-------------------------|----------------------------|
| Caracterização da organização (Ficha 1, passo 1) | Caracterização inicial | Secção 1 do PRI |
| Tabela de tipologia (Ficha 1, passo 2) | (i) Identificar tipos de incidentes | Anexo "Tipologia de Incidentes" |
| 3 playbooks prioritários (Ficha 1, passo 3) | (i) Determinar playbooks | Secção "Estratégia de Playbooks" |
| 1 playbook completo (Template) | (ii) Desenhar conjunto de Playbooks (mínimo: Ransomware, Phishing, Acesso Não Autorizado) | Anexo "Playbook X" |
| Secção "Exceções e situações limite" (Curveballs) | Plano de testes | Diferenciador positivo na avaliação |

!!! tip "Onde investir o tempo extra em casa"
    Para os outros **2 playbooks** a fazer em casa (de modo a cumprir o mínimo de 3 obrigatórios), a sequência mais eficiente é:

    1. Replicar o **mesmo template** preenchido em aula;
    2. Reutilizar a **estrutura RACI** já desenhada (adaptar só o que muda);
    3. Trocar o **runbook técnico** (queries, comandos) para o tipo de incidente específico;
    4. Aplicar os **mesmos curveballs** mentalmente — adicionar a secção de exceções coerente.

---

## Bibliografia citável (para o relatório)

- **NIST SP 800-61 Revision 2.** *Computer Security Incident Handling Guide.* <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- **MITRE ATT&CK** Enterprise Matrix. <https://attack.mitre.org/matrices/enterprise/>
- **MaGMa Use Case Framework** (ABN AMRO Bank / FI-ISAC NL). <https://www.betaalvereniging.nl/en/safety/magma/>
- **ENISA Taxonomy** for Incident Classification. <https://www.enisa.europa.eu/>
- **CISA StopRansomware** Guide. <https://www.cisa.gov/stopransomware>
- **Decreto-Lei n.º 125/2025** (transposição NIS2 PT).
- **CNCS — Relatório Riscos & Conflitos 2025**. <https://www.cncs.gov.pt/>

---

## 📎 Materiais e templates relacionados

Ver catálogo completo em [📋 Templates — Grupo F (Playbooks)](../modelos/index.md#grupo-f-playbooks-construcao-e-operacao):

- [📄 Cheat-sheet do Método](../gestao_incidentes/playbook-cheatsheet-metodo.docx) — 10 passos + 5 erros + ATT&CK
- [📄 Ficha 1 — Tipologia de Incidentes](../gestao_incidentes/playbook-pl-ficha1-tipologia.docx) — Bloco 2A
- [📄 Template Playbook TISI](../gestao_incidentes/playbook-template-tisi.docx) — 11 secções para Bloco 2B
- [📄 Playbook Phishing (pronto)](../gestao_incidentes/playbook-phishing.docx) — modelo concretizado
- [📄 Playbook Ransomware (pronto)](../gestao_incidentes/playbook-ransomware.docx) — modelo concretizado
- [📄 Playbook Violação Dados Pessoais (pronto)](../gestao_incidentes/playbook-violacao-dados-pessoais.docx) — RGPD

---

**Próximos passos:** Esta prática encerra o módulo Playbooks. Para integração com o PRI final, revisitar [Setting Up CSIRT — Prática Laboratorial](../csirt/pratica-laboratorial.md) (que produz o capítulo "Definição da Equipa CSIRT" do PRI).
