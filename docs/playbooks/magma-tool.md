# Hands-on com a MaGMa UCF Tool

> *"Se não sabes que logs precisas, ainda não tens um use case operacional. Tens apenas uma intenção."*

A [MaGMa Framework](magma.md) explica **a teoria** (3 camadas Business/Threat/Implementation, agrupamentos L1/L2/L3, ciclo de vida). Esta página mostra **como usar a ferramenta** prática que a operacionaliza — o **MaGMa UCF Tool** (Excel publicado pelo FI-ISAC NL).

---

## 1. Para que serve (e para que NÃO serve) a MaGMa UCF Tool

### Ideia central

> *A MaGMa UCF Tool serve para **organizar use cases de deteção em 3 níveis** (L1/L2/L3) e **medir quão bem a organização os consegue detectar**. Responde a: «**que ameaças queremos detectar, que detecções temos, quão bem estão implementadas e onde estão os gaps?**».*

### O que a ferramenta NÃO é

!!! danger "Erros frequentes sobre o que a ferramenta faz"
    - ❌ **Não** é uma ferramenta para **escrever playbooks** completos.
    - ❌ **Não** é uma ferramenta para **criar regras SIEM** finais.
    - ❌ **Não** é uma ferramenta para **fazer investigação forense**.
    - ❌ **Não** se "preenche tudo" — começa-se pelo **L3** (que é o nível accionável).

### Cadeia operacional para orientar o trabalho

```
Ameaça → Use Case → Regra → Alerta → Triagem → Playbook → Métricas → Melhoria
```

A MaGMa Tool foca-se na zona **Use Case + Regra + Métricas**. Não substitui as outras fases.

---

## 2. A árvore L1 → L2 → L3

```
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   L1 — Categoria estratégica da ameaça                       │
  │   (Cyber Kill Chain: Reconnaissance, Delivery, ...)          │
  │            │                                                 │
  │            ▼                                                 │
  │   L2 — Cenário táctico de ameaça                             │
  │   (Account breached, Brute force, Port scanning, ...)        │
  │            │                                                 │
  │            ▼                                                 │
  │   L3 — Detecção técnica concreta                             │
  │   (Detect Unauthorized Usage of Valid Accounts, ...)         │
  │                                                              │
  │   ⭐ É AQUI que se mede a capacidade real de detecção        │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

### Exemplo concreto

| Nível | Identificador | Conteúdo |
|-------|----------------|----------|
| **L1** | `AO` | Actions on Objectives *(categoria estratégica)* |
| **L2** | `AO-ACC` | Account breached *(cenário táctico)* |
| **L3** | `AO-ACC-01` | Detect Unauthorized Usage of Valid Accounts *(detecção técnica)* |

A parte verdadeiramente prática está no **L3**. Os L1 e L2 servem para enquadrar e agrupar; **o L3 é onde se preenchem as métricas que medem a capacidade real**.

---

## 3. Os 9 separadores do Excel — o que cada um faz

| Separador | Função | O que fazer |
|-----------|--------|-------------|
| **Introduction** | Metadados da ferramenta | Não interessa para a aula |
| **Model** | Descreve o modelo conceptual | Leitura informativa |
| **Usage** | Instruções (em inglês) | Consultar em caso de dúvida |
| **Results** | Painel de resultados agregados | **Não preencher** — é calculado |
| **L1 UC** | Categorias estratégicas | Normalmente **escolher** uma existente; evitar criar L1 novos |
| **L2 UC** | Cenários tácticos | **Escolher** o cenário que melhor representa o caso |
| **L3 UC** ⭐ | Detecções técnicas concretas | **Onde se faz o trabalho real** — preencher métricas |
| **Drivers** | Lista de business e compliance drivers | Consultar para escolher valores consistentes |
| **References** | Threat actors, log sources, tecnologias, scope | Lista de apoio para preenchimento |

---

## 4. As 4 métricas-chave (separador L3 UC)

Estas colunas são o **coração analítico** da ferramenta:

```
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   Effectiveness %    A regra é tecnicamente boa?             │
  │         ×                                                    │
  │   Implementation %   Está realmente implementada/afinada?    │
  │         ×                                                    │
  │   Coverage %         Cobre todo o âmbito relevante?          │
  │         =                                                    │
  │   Weight             Capacidade REAL combinada               │
  │                      (calculado automaticamente)             │
  │                                                              │
  │   Potential = Effectiveness − Weight                         │
  │              (margem de melhoria — também calculado)         │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

### Como interpretar cada métrica

| Métrica | Pergunta a responder | Como interpretar valores |
|---------|---------------------|---------------------------|
| **Effectiveness %** | *Mesmo que a regra esteja activa, ela é boa a detectar esta ameaça?* | 90% deteção muito boa · 60% razoável · 20% fraca · 0% não detecta |
| **Implementation %** | *Está realmente implementado, testado e afinado?* | 100% regra activa, testada, documentada · 50% existe mas pouco afinada · 0% não está implementado |
| **Coverage %** | *A detecção cobre todo o âmbito relevante?* | 100% todos sistemas cobertos · 50% só parte envia logs · 0% sem cobertura |
| **Weight** | *Qual é a capacidade real combinada?* | Calculado: `Eff × Impl × Cov`. **Se uma dimensão é baixa, o resultado baixa muito.** |
| **Potential** | *Qual é a margem de melhoria?* | Calculado: `Eff − Weight`. Se alta eff. mas baixo weight → boa ideia, má execução |

### Exemplo numérico — o efeito multiplicador é brutal

| Cenário | Eff | Impl | Cov | **Weight** | Leitura |
|---------|:---:|:----:|:---:|:----------:|---------|
| "Ideia boa, bem implementada" | 90% | 90% | 90% | **72.9%** | Capacidade real elevada |
| "Implementação a meio" | 90% | 60% | 80% | **43.2%** | Decente mas com margem |
| "Boa em teoria, fraca na prática" | 90% | 30% | 40% | **10.8%** | A ideia é boa, mas a capacidade operacional real é fraca |
| "Tudo médio" | 60% | 60% | 60% | **21.6%** | Médio em tudo → fraco no real |

!!! danger "Atenção crítica nos campos de percentagem"
    No Excel, escrever `70%` (com símbolo `%`) — **não `70` como número seco**. Caso contrário a fórmula `Effectiveness × Implementation × Coverage` produz valores absurdos.

    ❌ `70 × 60 × 80 = 336 000` *(absurdo)*
    ✅ `70% × 60% × 80% = 33.6%` *(correcto)*

---

## 5. Fluxo de trabalho em 9 passos

Ordem **obrigatória** para usar a ferramenta com método. **Nunca começar pelo Excel.**

| # | Acção | Onde acontece | Output |
|:-:|-------|---------------|--------|
| 1 | **Ler o cenário** (a ameaça em texto) | Fora do Excel | Compreensão do contexto |
| 2 | **Definir o risco de negócio** | Fora do Excel | Business Layer preenchida |
| 3 | **Identificar a ameaça + técnica MITRE ATT&CK** | Fora do Excel | Threat Layer preenchida |
| 4 | **Escolher L1 e L2** na MaGMa Tool | Separadores L1 UC e L2 UC | Cenário mapeado |
| 5 | **Escolher (ou propor) L3 técnico** | Separador L3 UC | Detecção concreta definida |
| 6 | **Definir logs, tecnologia, scope, comentários** | L3 UC, colunas N-Q | Implementation Layer operacional |
| 7 | **Atribuir Eff% + Impl% + Cov%** | L3 UC, colunas I-K | Capacidade avaliada |
| 8 | **Analisar Results** | Separador Results | Detection gap e growth potential |
| 9 | **Propor melhorias** | Fora do Excel | Plano de evolução do use case |

---

## 6. O que preencher (e o que NÃO preencher)

### No separador L2 UC — só se for caso novo

| Coluna | Preencher? | Notas |
|--------|------------|-------|
| C — L2 Use Case Identifier | ✅ Se for novo | Formato `L1-XXX`, ex. `AO-ACC` |
| D — Use Case Name | ✅ | Nome do cenário |
| E — Use Case Description | ✅ | Descrição clara |
| F — Actors | ✅ | Atacante provável |
| M — Business Drivers | ✅ | Motivo de negócio |
| N/P — Compliance | ⚠️ Se aplicável | RGPD, NIS2, DORA, ... |
| **A, B, G, H, I, J, K, L** | ❌ **NÃO mexer** | **Fórmulas e agregações** |

### No separador L3 UC — onde se faz o trabalho real

| Coluna | Preencher? | Notas |
|--------|------------|-------|
| F — Rule Identifier | ✅ | Formato `L2ID-NN`, ex. `AO-ACC-04` |
| G — Technical Use Case Name | ✅ | Nome da detecção |
| H — Use Case Description | ✅ | Técnica MITRE ATT&CK ou descrição |
| **I — Effectiveness %** | ✅ ⭐ | **Com `%`** — não número seco |
| **J — Implementation %** | ✅ ⭐ | **Com `%`** — não número seco |
| **K — Coverage %** | ✅ ⭐ | **Com `%`** — não número seco |
| N — Log source type | ✅ | Fonte de logs (Application log, OS logging, ...) |
| O — Detection Technology | ✅ | SIEM, EDR, NDR, UEBA, ... |
| P — Scope | ✅ | All users, Administrators, VIPs, ... |
| Q — Comments | ✅ | Notas críticas |
| **A, B, C, D, E, L, M** | ❌ **NÃO mexer** | **Calculadas ou dependem do identificador** |

---

## 7. Casos práticos

Cada grupo escolhe (ou recebe) um dos seguintes casos. **Não há respostas únicas — há respostas bem ou mal justificadas.**

### Caso 1 — Conta institucional Microsoft 365 comprometida

**Contexto:** Uma instituição de ensino superior usa Microsoft 365 para email, Teams, OneDrive e SharePoint. Um utilizador dos serviços académicos introduziu credenciais numa página de phishing. Pouco depois, surgiram tentativas de autenticação a partir de um país invulgar e foi registado um login bem-sucedido.

| Elemento | Informação fornecida |
|----------|----------------------|
| **Sinais observados** | 12 tentativas falhadas de login em 8 minutos; 1 login bem-sucedido de localização invulgar; tentativa de criar regra de encaminhamento no email |
| **Ativos afetados** | Conta de utilizador dos serviços académicos com acesso a email, OneDrive e dados de estudantes |
| **Logs disponíveis** | Microsoft Entra ID sign-in logs; audit logs do Microsoft 365; logs de email; alertas básicos do Defender |
| **Lacunas conhecidas** | Nem todos os eventos de MFA estão integrados no SIEM; não existe UEBA; playbook de conta comprometida existe mas está pouco testado |
| **Pistas MaGMa** | **L2 provável:** `AO-ACC` Account breached. **L3 provável:** `AO-ACC-01` Detect Unauthorized Usage of Valid Accounts |
| **Decisão crítica** | O grupo deve decidir se este evento é apenas **alerta**, **incidente confirmado** ou **incidente de severidade elevada** |

### Caso 2 — Ransomware em servidor de ficheiros

**Contexto:** Uma organização pública tem um servidor de ficheiros partilhado por várias unidades orgânicas. Às 09h15, vários utilizadores reportam ficheiros inacessíveis e extensões alteradas. Um endpoint de um utilizador apresenta execução suspeita de PowerShell e tentativas de eliminação de *shadow copies*.

| Elemento | Informação fornecida |
|----------|----------------------|
| **Sinais observados** | Alteração massiva de ficheiros; criação de ficheiros com extensão anómala; execução de PowerShell; comando suspeito associado à eliminação de *shadow copies*; aumento abrupto de I/O no servidor |
| **Ativos afetados** | Servidor de ficheiros partilhado; endpoint de utilizador; potencial impacto em backups locais |
| **Logs disponíveis** | EDR em endpoints; Windows Event Logs; logs do servidor de ficheiros; logs de backup; firewall interna |
| **Lacunas conhecidas** | Nem todos os servidores têm EDR; logs de *file integrity* não estão totalmente activados; não existe regra consolidada no SIEM para cifragem massiva |
| **Pistas MaGMa** | **L2 provável:** `AO-FIL` File corruption, encryption and unauthorized access. **L3 possível:** detecção de PowerShell suspeito, ransomware/file encryption ou inibição de recuperação |
| **Decisão crítica** | O grupo deve justificar se ativa o PRI, se isola o endpoint, se desliga o servidor ou se preserva evidência antes de qualquer acção disruptiva |

### Caso 3 — Possível exfiltração de dados por insider

**Contexto:** Um trabalhador com acesso a informação sensível submeteu recentemente pedido de saída da organização. Nos últimos dias foram registados downloads fora do padrão, compressão de ficheiros e tráfego para serviços cloud pessoais. **Não há malware confirmado.**

| Elemento | Informação fornecida |
|----------|----------------------|
| **Sinais observados** | Download de grande volume de documentos; criação de ficheiro ZIP; ligação a serviço cloud pessoal; acessos fora do horário normal; pesquisa de pastas fora da área habitual |
| **Ativos afetados** | Repositório documental interno; dados pessoais; documentos contratuais; informação sensível |
| **Logs disponíveis** | Proxy / web gateway; logs de DLP parcial; logs do repositório documental; logs de autenticação; registos de endpoint limitados |
| **Lacunas conhecidas** | DLP apenas cobre email e alguns uploads web; não existe classificação completa da informação; não há *baseline* formal de comportamento por utilizador |
| **Pistas MaGMa** | **L2 provável:** `AO-EXF` Data exfiltration **ou** Policy violations (depende da interpretação). **L3 possível:** Detect Exfiltration Over Web Service / Alternative Protocol, ou detecção de data staging / compression |
| **Decisão crítica** | O grupo deve distinguir **comportamento suspeito**, **violação de política** e **incidente de segurança**. Considerar privacidade, proporcionalidade e necessidade de envolver **RH/Jurídico** |

### Caso 4 — CEO Fraud / Business Email Compromise

**Contexto:** A funcionária de tesouraria do **Município de Vila Feliz** recebe um email aparentemente do **Presidente da Câmara** a solicitar uma transferência urgente de **€27 500** para um "fornecedor estratégico de cibersegurança". O email vem de um domínio que parece o real (`cmvilafeliz-pt.com`) mas é um *typosquat* — o domínio oficial é `cm-vilafeliz.pt`. Cria urgência (*"até ao fim do dia"*), apela a confidencialidade (*"não envolver mais ninguém até concluído"*) e à autoridade do cargo. **A funcionária estranha o pedido e reporta ao IT antes de transferir.**

| Elemento | Informação fornecida |
|----------|----------------------|
| **Sinais observados** | Display name = "Presidente CMVilaFeliz" mas address externo; SPF=fail, DKIM=fail, DMARC=fail; domínio `cmvilafeliz-pt.com` registado há **4 dias**; IP de origem fora de PT; linguagem com urgência atípica; primeira comunicação directa entre Presidente e esta funcionária por email para pagamentos; **anexo PDF** com instruções IBAN |
| **Ativos afetados** | Caixa de correio da funcionária da tesouraria; processo financeiro do município; potencialmente conta bancária institucional (se transferência efectuada) |
| **Logs disponíveis** | Microsoft Defender for Office 365; cabeçalhos completos do email; M365 audit logs; sistema ERP municipal (registo de pedidos de pagamento); registo de comunicações entre executivo e tesouraria |
| **Lacunas conhecidas** | Sem regra específica de detecção BEC no SIEM; análise de *lookalike domains* é manual; sem integração entre alertas de email e ERP; sem formação anti-BEC dedicada à tesouraria/financeiro; política DMARC do município ainda em `p=none` (apenas monitorização) |
| **Pistas MaGMa** | **L2 não existe limpamente** no catálogo standard. Opção pragmática: enquadrar em `AO-ACC` *Account breached* (apesar de não haver conta interna comprometida). Opção rigorosa: **propor novo L2** `AO-IMP` *Impersonation / Business Email Compromise*. **L3 a propor:** Detect Executive Impersonation Patterns (display name spoofing + external domain + typosquat + financial request) |
| **Decisão crítica** | O grupo deve decidir: (1) é alerta isolado ou **abre incidente formal**? (2) **adopta L2 existente** ou **propõe novo L2/L3** (e justifica)? (3) que **workflow obrigatório** instituir para validar pedidos de transferência iniciados por email — *"out-of-band confirmation"* via telefone? (4) este episódio justifica revisão da política DMARC do município? |

---

## 8. Exemplos resolvidos

Para servir de guia ao trabalho dos restantes casos, seguem-se **duas resoluções demonstrativas** — Caso 1 (conta M365 comprometida) e Caso 2 (ransomware em servidor de ficheiros).

### Caso 1 — Conta institucional Microsoft 365 comprometida

#### Passo 1 — Ler o cenário (fora do Excel)

**Ameaça:** conta institucional comprometida via phishing → login não autorizado → tentativa de configurar persistência (regra de forwarding).

#### Passo 2 — Definir o risco de negócio (Business Layer)

> *Proteger a confidencialidade dos dados académicos e a continuidade do serviço de email/colaboração. Cumprir o RGPD relativamente a dados de estudantes.*

#### Passo 3 — Identificar ameaça + MITRE ATT&CK (Threat Layer)

| Aspecto | Valor |
|---------|-------|
| Tipo de ameaça | Compromisso de credenciais via phishing → uso fraudulento |
| Actor provável | *Professional Criminals* (lucro via venda de acesso) ou *Multiple Actors* (variado) |
| MITRE ATT&CK | **T1078** Valid Accounts · **T1566.002** Phishing Link · **T1098.002** Account Manipulation (forwarding rule) |

#### Passo 4 — Escolher L1 e L2 no Excel

| Separador | Valor escolhido |
|-----------|-----------------|
| **L1 UC** | `AO` Actions on Objectives |
| **L2 UC** | `AO-ACC` Account breached |

#### Passo 5 — Escolher L3 técnico

| Separador | Valor |
|-----------|-------|
| **L3 UC** | `AO-ACC-01` Detect Unauthorized Usage of Valid Accounts |

#### Passo 6 — Implementation Layer (colunas N-Q do L3)

| Coluna | Valor |
|--------|-------|
| N — Log source type | *Application log* (Entra ID sign-in logs, MFA logs, audit logs M365) |
| O — Detection Technology | *SIEM* (idealmente SIEM + UEBA) |
| P — Scope | *All users* (com peso adicional a Administrators e VIPs) |
| Q — Comments | *Detectar login fora do padrão (geo, ASN, device), falhas sucessivas, alteração MFA, criação de regras de forwarding suspeitas. Correlacionar com risk score do Entra ID Identity Protection.* |

#### Passo 7 — Métricas (colunas I-K do L3)

> Cenário: temos logs do Entra ID e alertas básicos do Defender, mas falta integrar MFA no SIEM, não há UEBA e cobertura ainda não é total.

| Métrica | Valor | Justificação |
|---------|:-----:|--------------|
| **Effectiveness** | **70%** | A lógica (login anómalo + falhas + MFA + forwarding) é razoável. Sem UEBA perde-se contexto comportamental. |
| **Implementation** | **60%** | Regras existem no Defender mas pouco afinadas; eventos de MFA não totalmente correlacionados no SIEM. |
| **Coverage** | **80%** | Quase todos os utilizadores cobertos; alguns serviços legados/identidades partilhadas fora do âmbito. |

#### Passo 8 — Interpretar Results

| Métrica | Fórmula | Resultado |
|---------|---------|:---------:|
| **Weight** | `70% × 60% × 80%` | **33.6%** |
| **Potential** | `70% − 33.6%` | **36.4%** |

**Leitura:** a detecção é **razoável em teoria** (Eff 70%) mas a **capacidade real é fraca** (Weight 33.6%) porque a **implementação está incompleta** e a **cobertura não é total**. **O potencial de melhoria é elevado** — investir em afinação (implementação) traz o maior retorno.

#### Passo 9 — Plano de melhorias

| Prioridade | Acção | Impacto esperado em |
|:----------:|-------|----------------------|
| 1 | Integrar **eventos de MFA** no SIEM e correlacionar com sign-in logs | Implementation |
| 2 | Activar **risk score do Entra ID Identity Protection** como input adicional | Effectiveness |
| 3 | Reforçar peso de regras para **contas privilegiadas** (administradores, IT, financeira) | Effectiveness + Scope efectivo |
| 4 | Criar **detecção específica para forwarding rules** suspeitas | Effectiveness |
| 5 | Validar **cobertura total de logs** (identidades partilhadas, serviços legados) | Coverage |
| 6 | Testar e operacionalizar o **playbook de conta comprometida** | Out-of-tool, mas crítico |

!!! tip "Mensagem pedagógica deste exemplo"
    Com `Eff 70% / Impl 60% / Cov 80%`, o **Weight é 33.6%** — menos de metade da Effectiveness. Esta é a **mensagem central da MaGMa Tool**: uma detecção **boa em teoria mas mal operacionalizada vale pouco em produção**. **Investir em Implementation costuma ter o maior ROI**.

---

### Caso 2 — Ransomware em servidor de ficheiros

#### Passo 1 — Ler o cenário (fora do Excel)

**Ameaça:** ransomware num endpoint propaga-se ao servidor de ficheiros partilhado. Sinais característicos: alteração massiva de ficheiros + extensões anómalas + PowerShell suspeito no endpoint + **tentativa de eliminação de *shadow copies*** (inibição de recuperação) + aumento abrupto de I/O no servidor.

> **Conceito-chave:** a ameaça tem **dois vectores observáveis simultaneamente** — a **execução maliciosa no endpoint** (PowerShell, ferramentas de eliminação) e o **impacto no servidor** (cifragem massiva). Cobertura ideal exige **detecção em ambos**.

#### Passo 2 — Definir o risco de negócio (Business Layer)

> *Garantir a continuidade dos serviços públicos da organização (acesso a documentos partilhados entre várias unidades). Proteger a integridade e disponibilidade da informação documental. Cumprir o **DL 125/2025 (NIS2)** caso a organização seja entidade essencial/importante. Evitar paragem operacional e perda de dados não recuperáveis.*

#### Passo 3 — Identificar ameaça + MITRE ATT&CK (Threat Layer)

| Aspecto | Valor |
|---------|-------|
| Tipo de ameaça | Ransomware (cifragem massiva + inibição de recuperação) |
| Actor provável | *Professional Criminals* / grupo de ransomware com objectivo financeiro (RaaS típico) |
| MITRE ATT&CK | **T1486** Data Encrypted for Impact · **T1490** Inhibit System Recovery (shadow copy deletion) · **T1059.001** Command and Scripting Interpreter: PowerShell · **T1562.001** Impair Defenses |

#### Passo 4 — Escolher L1 e L2 no Excel

| Separador | Valor escolhido |
|-----------|-----------------|
| **L1 UC** | `AO` Actions on Objectives |
| **L2 UC** | `AO-FIL` File corruption, encryption and unauthorized access |

#### Passo 5 — Escolher L3 técnico

A ameaça tem dois vectores. **Recomenda-se preencher um L3 primário e um L3 complementar**:

| Tipo | Separador | Valor |
|------|-----------|-------|
| **L3 primário** | L3 UC | `AO-FIL-01` Detect mass file encryption / anomalous file modifications |
| **L3 complementar** (sugerido) | L3 UC | `AO-FIL-02` Detect Inhibit System Recovery (`vssadmin delete shadows`, `wmic shadowcopy delete`, `bcdedit`) |

> **Nota:** se um L3 específico para *shadow copy deletion* não existir, **propor um novo L3** seguindo o padrão `L2ID-NN` (ex.: `AO-FIL-08`). Documentar nos comentários a relação com T1490 / T1059.001.

#### Passo 6 — Implementation Layer (colunas N-Q do L3 primário)

| Coluna | Valor |
|--------|-------|
| N — Log source type | *OS logging* (Windows Event Logs 4663 file access, 4688 process creation) + *Application log* (logs do servidor de ficheiros, EDR alerts) |
| O — Detection Technology | *EDR* (CrowdStrike, Defender, SentinelOne) + *SIEM* (correlação massiva I/O) + *Backup integrity monitoring* |
| P — Scope | *Servers* (com peso máximo em servidores de ficheiros partilhados) + *All workstations* (origem habitual do compromisso) |
| Q — Comments | *Detectar (a) alteração de extensão em massa por processo único; (b) volume de escritas a `*.locked`/`*.encrypted`/extensões aleatórias; (c) execução de `vssadmin`, `wmic shadowcopy`, `bcdedit /set bootstatuspolicy`; (d) processos pai-filho anómalos `winword.exe → powershell.exe → cmd.exe`; (e) tráfego a domínios .onion ou pools de criptomoeda. Correlacionar EDR + logs de servidor de ficheiros + integridade de backups.* |

#### Passo 7 — Métricas (colunas I-K do L3)

> Cenário: o EDR existe em endpoints e detecta PowerShell suspeito + `vssadmin delete`. **Mas:** nem todos os servidores têm EDR; *file integrity monitoring* não está totalmente activado; não existe regra SIEM consolidada para cifragem massiva.

| Métrica | Valor | Justificação |
|---------|:-----:|--------------|
| **Effectiveness** | **75%** | EDR detecta bem o lado do endpoint (PowerShell, shadow copy deletion). Cifragem massiva no servidor é detectável pelo I/O anómalo, mas sem regra SIEM dedicada o sinal pode chegar tarde. |
| **Implementation** | **45%** | Regras existem no EDR, mas *file integrity monitoring* no servidor de ficheiros está parcial; não há regra SIEM consolidada que correlacione EDR endpoint + I/O massivo no servidor; alertas de backup não estão integrados. |
| **Coverage** | **60%** | Nem todos os servidores têm EDR instalado; backups locais nem sempre são monitorizados; servidores de ficheiros legados podem ficar fora do scope. |

#### Passo 8 — Interpretar Results

| Métrica | Fórmula | Resultado |
|---------|---------|:---------:|
| **Weight** | `75% × 45% × 60%` | **20.25%** |
| **Potential** | `75% − 20.25%` | **54.75%** |

**Leitura:** apesar de a **detecção ser tecnicamente boa** (Eff 75%, EDR e ATT&CK bem mapeados), a **capacidade real é muito fraca** (Weight ~20%) — porque metade dos servidores não tem EDR (Coverage 60%) e não existe regra SIEM consolidada (Implementation 45%). **O Potential (~55%) é o mais alto dos exemplos** — significa que há margem enorme de melhoria se a organização agir nos gaps de Implementation e Coverage.

#### Passo 9 — Plano de melhorias

| Prioridade | Acção | Impacto esperado em |
|:----------:|-------|----------------------|
| 1 | **Implementar EDR em 100% dos servidores** (especialmente file servers, backup servers) | **Coverage** (de 60% para >90%) |
| 2 | Activar **file integrity monitoring** completo no servidor de ficheiros + alertas em alteração massiva | Implementation |
| 3 | Criar **regra SIEM** que correlacione EDR endpoint + I/O anómalo + alteração de extensões | Implementation + Effectiveness |
| 4 | Detecção específica para `vssadmin delete shadows`, `wmic shadowcopy delete`, `bcdedit /set bootstatuspolicy ignoreallfailures` | Effectiveness |
| 5 | **Integridade de backups** — alertas a qualquer tentativa de eliminação/cifragem de repositório de backup | Effectiveness (anti-T1490) |
| 6 | Operacionalizar o **[Playbook de Ransomware](../gestao_incidentes/playbook-ransomware.docx)** com tabletop trimestral | Out-of-tool, mas crítico para resposta |
| 7 | Pre-decidir **decisão crítica do PRI**: isolar endpoint imediatamente (preservar shadow copies + logs voláteis em RAM antes) | Out-of-tool — playbook |

!!! danger "Decisão crítica explicitada no cenário"
    O Caso 2 obriga a decidir entre **isolar imediatamente** (rápido, mas pode destruir evidência) ou **preservar evidência antes** (dump de memória, snapshots) — esta decisão **não pertence à MaGMa Tool**, pertence ao **playbook de Ransomware** activado *após* o use case detectar o incidente. **A MaGMa Tool detecta; o playbook responde.**

!!! tip "Mensagem pedagógica deste exemplo"
    O Caso 2 ilustra a **diferença entre Effectiveness e Weight** de forma ainda mais dramática que o Caso 1: **Eff 75% → Weight 20.25%**. A regra é boa, mas **um terço dos servidores não tem EDR**. Esta é a lição operacional fundamental: **regras brilhantes em sistemas mal cobertos valem muito pouco**. **Em ransomware, a Coverage é frequentemente o gap principal — e o mais caro de fechar (licenças EDR por servidor)**.

---

### Caso 4 — CEO Fraud / Business Email Compromise

#### Passo 1 — Ler o cenário (fora do Excel)

**Ameaça:** *Business Email Compromise (BEC)* na variante **CEO Fraud** — atacante usa **domínio externo *typosquat*** (`cmvilafeliz-pt.com`) com **display name spoofado** (*"Presidente CMVilaFeliz"*) para enviar pedido fraudulento de transferência a funcionária da tesouraria. Vector dominante: **engenharia social + abuso de autoridade aparente**, não compromisso técnico de conta interna.

> **Particularidade crítica:** ao contrário do Caso 1 (conta comprometida) ou Caso 2 (malware), no CEO Fraud **não há intrusão técnica nos sistemas internos**. O ataque acontece **inteiramente no humano e no email externo**. Isto desafia a taxonomia MaGMa standard — que está pensada para detecções de intrusão técnica.

#### Passo 2 — Definir o risco de negócio (Business Layer)

> *Proteger o **património financeiro municipal** e a **confiança pública** no Município de Vila Feliz. Cumprir o **Código dos Contratos Públicos** (validação de fornecedores). Reduzir exposição a fraude financeira em contexto de **transformação digital da administração local**. Eventual obrigação NIS2 (DL 125/2025) se a CMVF for entidade essencial/importante.*

#### Passo 3 — Identificar ameaça + MITRE ATT&CK (Threat Layer)

| Aspecto | Valor |
|---------|-------|
| Tipo de ameaça | *Business Email Compromise* (BEC) — variante CEO Fraud (impersonação externa de executivo) |
| Actor provável | *Professional Criminals* (grupos organizados de fraude financeira; ROI alto, sem necessidade de skills técnicos avançados) |
| MITRE ATT&CK | **T1566.002** Phishing: Spearphishing Link · **T1656** Impersonation · **T1583.001** Acquire Infrastructure: Domains (typosquat) · **T1534** Internal Spearphishing (se evoluir para compromisso de conta) |
| Vector financeiro (FBI IC3) | Wire transfer fraud — em 2023, BEC reportou **USD 2.9 mil milhões** de perdas globais segundo IC3 |

#### Passo 4 — Escolher L1 e L2 no Excel

**A taxonomia standard MaGMa não tem L2 dedicado a BEC.** O grupo enfrenta uma **decisão estruturante**:

| Opção | L1 | L2 | Vantagem | Desvantagem |
|-------|----|----|----------|-------------|
| **A — Pragmática** | `AO` Actions on Objectives | `AO-ACC` Account breached *(adaptado)* | Usa categoria existente; rápido | Não é compromisso de conta; força encaixe |
| **B — Rigorosa** | `AO` Actions on Objectives | **`AO-IMP`** *Impersonation / Business Email Compromise* *(propor novo)* | Reflete a ameaça real; reutilizável | Requer documentar e justificar; modifica taxonomia |
| **C — Híbrida** | `DEL` Delivery | `DEL-MAL` Email-based malware delivery *(adaptado para social engineering)* | Foca no vector de entrega | Mistura malware com social engineering puro |

**Recomendação para esta resolução:** Opção **B** — propor `AO-IMP`. Pedagogicamente é a mais rica: ensina o aluno a **estender o framework com rigor** em vez de forçar encaixes inadequados. Documentar a justificação no campo *Comments*.

| Separador | Valor escolhido |
|-----------|-----------------|
| **L1 UC** | `AO` Actions on Objectives |
| **L2 UC** | **`AO-IMP`** *Impersonation / Business Email Compromise* (proposto) |

#### Passo 5 — Escolher L3 técnico

**Não existe L3 standard para esta detecção.** O grupo deve **propor um novo L3** seguindo o padrão `L2ID-NN`:

| Separador | Valor |
|-----------|-------|
| **L3 UC (proposto)** | **`AO-IMP-01`** *Detect Executive Impersonation Patterns* (display name spoofing + external sender + domain age < 30 days + financial keywords) |
| **L3 complementar (proposto)** | `AO-IMP-02` *Detect Lookalike Domain Communication* (typosquat detection contra domínios institucionais) |

#### Passo 6 — Implementation Layer (colunas N-Q do L3 primário)

| Coluna | Valor |
|--------|-------|
| N — Log source type | *Application log* (Defender for Office 365, M365 audit logs, email gateway com cabeçalhos completos) + *Threat Intel feed* (registos WHOIS / domain age / *lookalike domains*) |
| O — Detection Technology | *Email Security Gateway* (Defender for O365 / Proofpoint / Mimecast) + *SIEM* (correlação display name vs sender domain) + *Threat Intel platform* (MISP / OpenCTI para *lookalike feeds*) |
| P — Scope | *All users* — com **prioridade máxima a funções financeiras** (tesouraria, contabilidade, compras) e a **destinatários de comunicações executivas** (assistentes de direcção, secretariado) |
| Q — Comments | *Detectar combinação de: (a) display name correspondente a executivo interno mas sender com domínio externo; (b) domínio do remetente com idade < 30 dias OU score de similaridade > 0.8 com domínio institucional; (c) presença de keywords financeiras (transfer, wire, urgent, IBAN, payment); (d) primeira comunicação directa entre executivo e destinatário; (e) headers SPF/DKIM/DMARC fail. **Não basta um indicador isolado — exigir ≥ 3 para alerta de alta confiança.** Cruzar com sistema ERP para ver se há pedido de pagamento legítimo em curso.* |

#### Passo 7 — Métricas (colunas I-K do L3)

> Cenário: o Defender for O365 sinaliza alguns destes emails como *suspicious* mas não bloqueia; não há regra SIEM específica para BEC; o município não tem feed de *lookalike domain monitoring*; tesouraria não passou ainda por formação dedicada anti-BEC.

| Métrica | Valor | Justificação |
|---------|:-----:|--------------|
| **Effectiveness** | **60%** | Os indicadores **existem e são detectáveis** (header analysis, domain age, display name vs sender) mas BEC é fortemente **dependente de contexto comportamental** (relação histórica entre remetente e destinatário) que é difícil de capturar com regras tradicionais. Sem UEBA / NLP, parte das variantes sofisticadas passa. |
| **Implementation** | **40%** | Defender for O365 detecta alguns padrões em modo *aviso*; **não existe regra SIEM dedicada**; **DMARC em `p=none`** (monitorização apenas, sem rejeição); sem integração com ERP/threat intel para *lookalike domains*. |
| **Coverage** | **70%** | Quase todos os emails passam pelo gateway (cobertura técnica boa), mas funções críticas (tesouraria, compras) **não estão marcadas com prioridade** nas regras; não há detecção dedicada a comunicação com fornecedores (BEC vendor variant). |

#### Passo 8 — Interpretar Results

| Métrica | Fórmula | Resultado |
|---------|---------|:---------:|
| **Weight** | `60% × 40% × 70%` | **16.8%** |
| **Potential** | `60% − 16.8%` | **43.2%** |

**Leitura:** o Weight de **16.8% é o mais baixo dos 3 exemplos resolvidos** — não por a detecção ser tecnicamente inferior, mas porque a **Implementation está dramaticamente subdesenvolvida** (40%) e a **Coverage não prioriza** as funções financeiras críticas. Esta é a **realidade da maioria das organizações** face ao BEC: as ferramentas existem, mas raramente são configuradas com seriedade.

> 💡 **Reflexão crítica:** segundo o FBI IC3, **BEC é o tipo de fraude que mais dinheiro custa às empresas em valor absoluto** — mais que ransomware. Apesar disso, é tipicamente o use case **menos implementado** nos SOCs. A MaGMa Tool revela este *gap* sem ambiguidade.

#### Passo 9 — Plano de melhorias

| Prioridade | Acção | Impacto esperado em |
|:----------:|-------|----------------------|
| 1 | **Migrar DMARC para `p=quarantine` → `p=reject`** com monitorização ([dmarc.org](https://dmarc.org)) | Implementation + Effectiveness (reduz spoofing directo do domínio próprio) |
| 2 | Implementar **lookalike domain monitoring** (typosquat detection) via threat intel feed | Effectiveness |
| 3 | Criar **regra SIEM dedicada**: emails externos com display name = nome de executivo interno + keywords financeiras → alerta P2 imediato | Implementation + Effectiveness |
| 4 | **Integração SIEM ↔ ERP municipal**: alertas para pedidos de pagamento iniciados via email não correspondidos a workflow normal | Implementation + Effectiveness |
| 5 | **Workflow obrigatório de validação out-of-band** para transferências > €X — confirmação por telefone para um número conhecido (nunca o que está no email) | Out-of-tool — controlo organizacional crítico |
| 6 | **Formação direccionada anti-BEC** para tesouraria/financeiro com simulações realistas (validar com DPO conforme LTFP) | Coverage humana |
| 7 | Operacionalizar o **playbook BEC** (adaptar do [Playbook Phishing](../gestao_incidentes/playbook-phishing.docx)) com cenários *vendor email compromise* | Out-of-tool — playbook |
| 8 | Marcar **funções críticas** (tesouraria, compras, RH, secretariado executivo) com **prioridade elevada** nas regras de detecção | Coverage efectiva |

!!! danger "Decisão estruturante deste caso"
    O Caso 4 obriga a uma decisão que **não aparece nos Casos 1 e 2**: **o framework MaGMa standard não cobre BEC limpamente**. O grupo tem de escolher entre **forçar encaixe** (rápido, impreciso) ou **estender o framework** (rigoroso, mais lento). **A decisão certa é a segunda**, mas exige documentar a proposta no Excel e justificar nos *Comments*. **Este é exactamente o tipo de decisão que diferencia um SOC maduro de um SOC operacional cego.**

!!! tip "Mensagem pedagógica deste exemplo"
    Três lições do Caso 4:

    1. **A taxonomia não é dogma.** Quando o framework não cobre, **estende-o com rigor** — não force encaixes. **`AO-IMP` é uma proposta legítima**, justificada e reutilizável.
    2. **BEC é o gap mais caro em valor absoluto** (FBI IC3) **e o menos implementado**. Eff 60% × Impl 40% × Cov 70% = 16.8% — esta proporção é típica e revela onde está o investimento prioritário.
    3. **Detecção técnica não chega.** O Plano de Melhorias do Caso 4 inclui **controlos organizacionais** (workflow out-of-band, formação) — porque BEC explora processo, não tecnologia. A MaGMa Tool revela o gap; **o playbook + a política operacional fecham-no**.

---

## 9. Erros comuns a evitar

!!! danger "Os 10 mandamentos do «não fazer» com a MaGMa Tool"

    | # | Erro | Porquê |
    |:-:|------|--------|
    | 1 | **Preencher tudo à toa** | A ferramenta tem 500+ L3 — escolher só os que se aplicam |
    | 2 | **Inventar percentagens sem justificação** | Cada % deve ter base concreta (regra existe? logs onboarded? % de cobertura real?) |
    | 3 | **Escrever `80` em vez de `80%`** | Fórmula fica errada — `%` é obrigatório |
    | 4 | **Apagar fórmulas** | Quebra as colunas calculadas (Weight, Potential, agregados) |
    | 5 | **Mexer nos separadores de resultados** | *Results* é só de leitura |
    | 6 | **Começar pelo L1** | Demasiado abstracto. Começar pela **ameaça** (fora do Excel), depois L2 → L3 |
    | 7 | **Criar use cases sem fontes de logs** | *"Se não sabes que logs precisas, ainda não tens um use case."* |
    | 8 | **Chamar "use case" a uma regra isolada** | Use case é capacidade ponta-a-ponta (deteção + triagem + resposta + métricas) |
    | 9 | **Usar MITRE ATT&CK como decoração** | Mapear T# só para parecer profissional, sem alinhar com a lógica de detecção |
    | 10 | **Ignorar falsos positivos** | Sem estimativa de falsos positivos, não há gestão de ruído do SOC |

---

## Questões críticas para discussão final

Use estas perguntas para fechar a aula com debate:

- O use case proposto **detecta mesmo** uma ameaça ou apenas **gera ruído**?
- As **fontes de logs** existem e estão disponíveis com qualidade suficiente?
- A **lógica de detecção** é testável ou está vaga?
- Que **falsos positivos** podem ocorrer e como serão reduzidos?
- Quando é que o **alerta passa a incidente**?
- Quem deve ser **notificado** e em que momento?
- Que **playbook** deve ser activado?
- A **severidade** atribuída é defensável?
- Que **métrica** prova que o use case tem valor?
- Qual é a **melhoria prioritária**: mais logs, melhor regra, maior cobertura ou melhor resposta?

---

## 📥 Materiais para download

[:material-microsoft-excel: MaGMa UCF Tool (Excel)](../gestao_incidentes/magma-ucf-tool.xlsx){ .md-button .md-button--primary }
[:material-file-word: Ficha 2 — Security Use Cases e MaGMa UCF Tool](../gestao_incidentes/playbook-pl-ficha2-magma-use-cases.docx){ .md-button }
[:material-file-word: Cheat-sheet do Método](../gestao_incidentes/playbook-cheatsheet-metodo.docx){ .md-button }

- **MaGMa UCF Tool** — ferramenta Excel original (FI-ISAC NL, v1.0). 9 separadores, 500+ L3 use cases mapeados.
- **Cheat-sheet do Método** — referência rápida de bolso com o método de 10 passos + 5 erros a evitar + mapeamentos MITRE ATT&CK.

---

## Referências

- **MaGMa UCF Tool** (FI-ISAC NL / ABN AMRO). <https://www.betaalvereniging.nl/en/safety/magma/>
- **MITRE ATT&CK** Enterprise Matrix. <https://attack.mitre.org/matrices/enterprise/>
- **NIST SP 800-61 Revision 2.** *Computer Security Incident Handling Guide.* <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- **SigmaHQ — Sigma Rules.** <https://github.com/SigmaHQ/sigma>
- Bollinger, J., Enright, B. & Valites, M. *Crafting the InfoSec Playbook.* O'Reilly Media.
- Roberts, S. J. & Brown, R. *Intelligence-Driven Incident Response.* O'Reilly Media.

---

**Próximos passos:** Para construir os **playbooks** que correspondem aos use cases identificados aqui, ver a [Prática Laboratorial — Construção de Playbooks](pratica-laboratorial.md) (Bloco 2B).
