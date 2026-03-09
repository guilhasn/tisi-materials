# Incident Response Plan (IRP) - Fundamentos

## Índice

1. [Visão geral](#visao-geral)
2. [Conceitos fundamentais](#conceitos-fundamentais)
3. [Pre-requisitos para o IRP funcionar](#pre-requisitos-para-o-irp-funcionar)
4. [Processo de resposta a incidentes](#processo-de-resposta-a-incidentes)
5. [Exemplos práticos](#exemplos-praticos)
6. [Exercícios](#exercicios)
7. [Armadilhas e confusões a evitar](#armadilhas-e-confusoes-a-evitar)
8. [Ligacao com a BIA](#ligacao-com-a-bia)
9. [Resumo rápido](#resumo-rapido)

---

## Visão geral

O **Incident Response Plan (IRP)** e o planeamento da forma como a organização **identifica, classifica e responde** a incidentes de segurança da informação.

Enquanto a BIA se foca em perceber **o que é crítico** e **qual o impacto** de uma interrupção, o IRP foca-se em:

- **Detetar** que há um incidente
- **Perceber** se e realmente um incidente relevante
- **Agir** para o conter e responder

> A BIA ajuda a saber o que doi mais. O IRP ajuda a agir quando começa a doer.

---

## Conceitos fundamentais

### O IRP cobre identificação, classificação é resposta

O planeamento de resposta a incidentes define como a organização:

- **Deteta** um incidente (através de alertas, logs, relatos de utilizadores)
- **Classifica** o incidente (qual a gravidade, que ativos são afetados)
- **Reage** ao incidente (contenção, erradicação, comunicação)

O IRP **não começa na contenção**. Começa antes, com a capacidade de perceber que algo está a acontecer.

```
  Detecao ──► Classificacao ──► Contencao ──► Resposta
     |              |                |             |
     ▼              ▼                ▼             ▼
  Perceber       Avaliar          Limitar        Agir e
  que algo     a gravidade       o impacto     comunicar
  aconteceu
```

---

### Nem todo o ataque é automaticamente um incidente relevante

Um ataque é classificado como **incidente** quando:

- E **dirigido contra ativos de informação** da organização
- Tem uma **hipótese realista de sucesso**
- **Ameaça a confidencialidade, integridade ou disponibilidade**

Isto e importante porque evita banalizar tudo. Existe uma ideia de **triagem e qualificacao**.

| Situação | E incidente? | Porque |
|----------|:------------:|--------|
| Milhares de scans aleatórios na internet | Não | Ruido normal, sem alvo específico |
| Scan direcionado a portas críticas do servidor | Possivelmente | Pode indicar reconhecimento ativo |
| Email de phishing recebido por 50 colaboradores | Sim | Ameaça direta a confidencialidade das credenciais |
| Falso positivo de antivirus num ficheiro legítimo | Não | Evento benigno, sem impacto real |
| Acesso não autorizado a base de dados de clientes | Sim | Comprometimento direto da confidencialidade |

---

### O foco do IRP e a triade CIA

O incidente é relevante porque ameaça uma ou mais dimensoes da segurança da informação:

```
                    ┌─────────────────────┐
                    │   Confidencialidade  │
                    │  (Confidentiality)   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
     Acesso nao         Fuga de          Exposicao de
     autorizado         dados            informacao
                                         sensivel
              │                │                │
              └────────┬───────┘────────┬───────┘
                       │                │
    ┌──────────────────┤                ├──────────────────┐
    │                  │                │                  │
    ▼                  ▼                ▼                  ▼
┌────────┐      ┌────────────┐   ┌──────────────┐  ┌──────────┐
│Integri-│      │Disponibili-│   │  O incidente │  │ O IRP    │
│ dade   │      │   dade     │   │  importa se  │  │ responde │
│(Integri│      │(Availabili-│   │  ameaca CIA   │  │ a estas  │
│  ty)   │      │    ty)     │   │              │  │ ameacas  │
└────────┘      └────────────┘   └──────────────┘  └──────────┘
```

| Dimensão | O que protege | Exemplo de incidente |
|----------|--------------|---------------------|
| **Confidencialidade** | Informação só acessível a quem tem autorização | Fuga de dados de clientes, phishing com roubo de credenciais |
| **Integridade** | Informação não é alterada de forma não autorizada | Ransomware que cifra ficheiros, alteração de registos clínicos |
| **Disponibilidade** | Sistemas e dados acessiveis quando necessário | Ataque DDoS que derruba o site, falha de servidor |

---

### A resposta a incidentes e mais reativa do que proativa

O IRP atua sobretudo **quando o incidente já está em curso ou foi detetado**. E, por natureza, mais **reativo**.

Isto não significa que não há preparação. Antes do incidente é necessário ter:

- **Equipas** definidas e treinadas
- **Playbooks** (procedimentos escritos para cenários conhecidos)
- **Contactos** de escalonamento
- **Ferramentas** de deteção é análise
- **Treino** e simulações regulares

Mas a essencia do IR e: **quando acontece, como respondemos?**

```
  ═══════════════════════╦══════════════════════════════
       ANTES             ║         DEPOIS
   (Preparacao)          ║     (Resposta - reativa)
  ═══════════════════════╬══════════════════════════════
                         ║
  • Equipas definidas    ║  • Detetar o incidente
  • Playbooks escritos   ║  • Classificar a gravidade
  • Ferramentas prontas  ║  • Conter o impacto
  • Treino realizado     ║  • Erradicar a causa
  • Contactos atuais     ║  • Recuperar servicos
                         ║  • Documentar e aprender
  ═══════════════════════╩══════════════════════════════
        Proativo                    Reativo
```

---

## Pre-requisitos para o IRP funcionar

A resposta a incidentes **não pode ser inventada no momento**. Tem de haver respostas pré-definidas, capacidade de deteção é uma equipa preparada. Improvisar durante uma crise custa caro: gera confusão, atrasos, decisões contraditorias e perda de tempo.

> Respostas pré-definidas não eliminam a necessidade de pensar; eliminam a necessidade de começar do zero.

### 1. Respostas pré-definidas

A organização deve pensar **antes** do incidente em questões como:

- **Quem e chamado?** (contactos e cadeia de escalonamento)
- **Quem decide?** (autoridade para isolar sistemas, comunicar, escalar)
- **Que primeiros passos dar?** (ações imediatas documentadas)
- **Que sistemas podem ser isolados?** (e com que impacto)
- **Que comunicações devem ser feitas?** (internas e externas)
- **Como escalar o incidente?** (critérios de gravidade)

Na prática, isto traduz-se em:

| Instrumento | O que é | Para que serve |
|-------------|---------|---------------|
| **Playbook** | Procedimento detalhado para um tipo de incidente | Guiar a resposta passo a passo (ex: playbook de ransomware, playbook de phishing) |
| **Runbook** | Procedimento técnico específico | Executar ações técnicas concretas (ex: como isolar um servidor, como revogar acessos) |
| **Matriz de escalonamento** | Tabela de contactos e níveis | Saber quem contactar, quando e por que canal |
| **Plano de comunicação** | Regras de comunicação interna e externa | Evitar fugas de informação é garantir coordenação |

#### Com vs sem respostas pré-definidas

```
  ╔═══════════════════════════════╦═══════════════════════════════════╗
  ║   SEM respostas pre-definidas ║   COM respostas pre-definidas     ║
  ╠═══════════════════════════════╬═══════════════════════════════════╣
  ║ Ninguem sabe quem avisa       ║ O alerta e escalado              ║
  ║ A equipa tecnica hesita       ║ A equipa de IR entra em acao     ║
  ║ Perde-se tempo                ║ Ha contencao rapida              ║
  ║ O impacto aumenta             ║ Decide-se comunicacao e mitigacao║
  ║ Decisoes contraditorias       ║ Coordenacao clara                ║
  ╚═══════════════════════════════╩═══════════════════════════════════╝
```

---

### 2. Equipa de resposta a incidentes

A organização precisa de ter **pessoas identificadas** para assumir papeis na resposta. Isto não significa obrigatoriamente um SOC (Security Operations Center) enorme ou uma equipa exclusiva de 20 pessoas.

Em organizações pequenas ou médias, pode ser uma **equipa funcional**, composta por pessoas de várias áreas que assumem papeis durante um incidente:

| Papel | Responsabilidade | Quem tipicamente |
|-------|-----------------|-----------------|
| **Coordenador de incidente** | Lidera a resposta, toma decisões, comunica com a gestão | Responsável de segurança ou TI |
| **Analista técnico** | Investiga o incidente, recolhe evidências, analisa logs | Técnico de segurança ou administrador de sistemas |
| **Operacoes** | Executa ações de contenção é recuperação nos sistemas | Administrador de sistemas, redes |
| **Apoio jurídico** | Avalia implicações legais (RGPD, notificações obrigatórias) | Jurista interno ou externo |
| **Comunicação** | Gere a comunicação interna e externa | Responsável de comunicação |
| **Gestão** | Aprova decisões críticas, aloca recursos | Direcao |

---

### 3. Capacidade de deteção

> Uma organização sem capacidade de deteção reage **sempre** tarde.

Sem deteção, não há resposta - ou há resposta tarde demais. O plano pode existir no papel, mas **falha na prática** se a organização não consegue perceber que um incidente está a acontecer.

A deteção **não é só tecnologia**. Pode vir de múltiplas fontes:

| Fonte de deteção | Tipo | Exemplo |
|-------------------|------|---------|
| **SIEM** | Tecnológica | Correlação de logs que deteta padrões anómalos |
| **EDR** | Tecnológica | Alerta de comportamento suspeito num endpoint |
| **Utilizadores** | Humana | Colaborador reporta email suspeito ou comportamento estranho |
| **Helpdesk** | Humana | Chamadas frequentes sobre o mesmo problema |
| **Logs de acesso** | Tecnológica | Acessos fora de horario ou de localizacoes anómalas |
| **Fornecedores** | Externa | ISP ou parceiro alerta para tráfego anómalo |
| **Auditoria** | Humana/Técnica | Auditoria identifica acessos indevidos |

A capacidade de deteção é, portanto, **técnica é humana**.

---

### A equipa atua durante o incidente

Um ponto essencial: a equipa de resposta a incidentes atua **enquanto o incidente está a decorrer**, não apenas depois. O IR não é análise historica nem auditoria a posteriori. E **intervencao em tempo real**:

- Conter o impacto
- Limitar a propagação
- Apoiar decisões
- Proteger ativos
- Ganhar tempo

```
  Preparacao                 Incidente                    Pos-incidente
  (antes)                   (durante)                    (depois)
  ══════════════════════╦════════════════════════╦════════════════════
  Equipas definidas     ║ Equipa atua em         ║ Documentacao
  Playbooks escritos    ║ tempo real:            ║ Licoes aprendidas
  Ferramentas prontas   ║ • conter              ║ Melhoria de
  Treino realizado      ║ • limitar             ║ processos
  Contactos atuais      ║ • decidir             ║
                        ║ • comunicar           ║
  ══════════════════════╩════════════════════════╩════════════════════
```

---

## Processo de resposta a incidentes

O processo tipico de resposta a incidentes segue um fluxo estruturado:

```
  ┌────────────┐    ┌────────────────┐    ┌────────────┐    ┌────────────┐
  │  Detecao   │───►│ Classificacao  │───►│ Contencao  │───►│ Erradicacao│
  │  e Alerta  │    │  e Triagem     │    │            │    │            │
  └────────────┘    └────────────────┘    └────────────┘    └─────┬──────┘
                                                                  │
                    ┌────────────────┐    ┌────────────┐          │
                    │    Licoes      │◄───│ Recuperacao│◄─────────┘
                    │  Aprendidas    │    │            │
                    └────────────────┘    └────────────┘
```

| Fase | Objetivo | Ações tipicas |
|------|----------|--------------|
| **Deteção é Alerta** | Perceber que algo está a acontecer | Monitorizar logs, analisar alertas SIEM, receber relatos de utilizadores |
| **Classificação é Triagem** | Avaliar se e um incidente é qual a gravidade | Verificar se e falso positivo, classificar severidade, identificar ativos afetados |
| **Contenção** | Limitar o impacto é evitar propagação | Isolar sistemas, bloquear acessos, preservar evidências |
| **Erradicação** | Remover a causa raiz | Eliminar malware, corrigir vulnerabilidades, fechar acessos comprometidos |
| **Recuperação** | Restaurar operações normais | Restaurar backups, validar integridade, monitorizar de perto |
| **Lições Aprendidas** | Melhorar para o futuro | Documentar o incidente, identificar falhas no processo, atualizar playbooks |

---

## Exemplos práticos

### Exemplo 1 - Universidade (Phishing com roubo de credenciais)

**Cenário:** Um utilizador de uma universidade recebe um email de phishing e introduz as suas credenciais numa página falsa.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Identificação** | Alerta ou relato do utilizador | O utilizador percebe que algo está errado, ou o sistema de email deteta o phishing |
| **Classificação** | Incidente de comprometimento de credenciais | Ameaça direta a **confidencialidade** - credenciais foram expostas |
| **Contenção** | Bloqueio imediato | Reset da password, invalidacao de sessões ativas |
| **Resposta** | Análise é comunicação | Análise de acessos realizados com as credenciais comprometidas, comunicação ao utilizador |

**Como interpretar:**

*Este e um caso classico de phishing. A deteção pode vir do próprio utilizador (que percebe que foi enganado) ou de sistemas automáticos. A resposta imediata e bloquear o acesso comprometido e verificar se o atacante já usou as credenciais para aceder a outros sistemas.*

**Para refletir:**

- Que medidas preventivas poderiam ter reduzido o risco deste incidente?
- Se o utilizador não tivesse reportado, como seria possível detetar o comprometimento?
- Que impacto adicional haveria se as mesmas credenciais dessem acesso a outros sistemas?

---

### Exemplo 2 - Hospital (Acessos anómalos fora de horario)

**Cenário:** Num hospital, são detetados acessos anómalos a um sistema clínico fora do horario normal de trabalho.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Identificação** | Logs e alertas automáticos | O SIEM deteta acessos ao sistema clínico as 3h da manha |
| **Classificação** | Potencial acesso não autorizado | Ameaça a **confidencialidade** de dados clínicos sensiveis |
| **Contenção** | Isolamento de conta | Suspender a conta utilizada, manter logs para análise |
| **Resposta** | Validação e comunicação | Verificar se o acesso era legítimo (médico de urgência?) ou malicioso; comunicação interna |

**Como interpretar:**

*Em ambientes de saúde, os dados clínicos são altamente sensiveis. Um acesso anómalo pode ser um profissional a trabalhar fora de horas ou pode ser um acesso não autorizado. A classificação correta e crítica: reagir em excesso pode prejudicar o atendimento; reagir pouco pode expor dados de pacientes.*

**Para refletir:**

- Como distinguir um acesso legítimo fora de horas de um acesso malicioso?
- Que informação dos logs e mais relevante para está classificação?
- Que regulamentação (ex: RGPD) se aplica a exposicao de dados clínicos?

---

### Exemplo 3 - E-commerce (Ataque DDoS)

**Cenário:** O site de uma plataforma de e-commerce começa a falhar e há indicios de tráfego malicioso intenso.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Identificação** | Monitorização e degradação do serviço | Alertas de latencia elevada, timeouts, relatos de clientes |
| **Classificação** | Possível DDoS / incidente de disponibilidade | Ameaça direta a **disponibilidade** - o serviço está comprometido |
| **Contenção** | Mitigação de tráfego | Ativacao de proteção anti-DDoS, filtragem de tráfego malicioso |
| **Resposta** | Escalonamento e proteção | Escalonamento para equipa técnica, proteção da infraestrutura, comunicação a clientes |

**Como interpretar:**

*Um ataque DDoS afeta diretamente a disponibilidade. A identificação costuma ser rápida (o serviço degrada visivelmente), mas a contenção pode ser complexa e exigir coordenação com fornecedores de infraestrutura. O impacto financeiro pode ser significativo enquanto o site estiver em baixo.*

**Para refletir:**

- Que diferença faz ter um plano de mitigação DDoS preparado antecipadamente?
- Como e que a BIA ajuda a priorizar a resposta a este incidente?
- Que comunicação deve ser feita aos clientes durante o incidente?

---

### Exemplo 4 - Empresa industrial (Malware num posto de engenharia)

**Cenário:** Numa empresa industrial, um posto de engenharia começa a executar processos estranhos e a abrir ligações de rede suspeitas.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Identificação** | EDR ou alerta do utilizador | O sistema de deteção (EDR) assinala comportamento anómalo, ou o engenheiro nota algo estranho |
| **Classificação** | Potencial malware | Ameaça a **integridade** e potencialmente a **confidencialidade** - malware pode roubar ou alterar dados |
| **Contenção** | Isolamento do posto | Desligar o posto da rede, manter o equipamento ligado para preservar evidências |
| **Resposta** | Análise forense e recuperação | Recolher informação sobre o malware, validar se se propagou, limpar e restaurar o sistema |

**Como interpretar:**

*Em ambientes industriais, o malware pode ter consequências graves: desde roubo de propriedade intelectual até perturbacao de processos de produção. A contenção rápida (isolar da rede) e crítica para evitar propagação. Nota importante: não se deve desligar o computador imediatamente, pois pode destruir evidências na memoria.*

**Para refletir:**

- Porque e que isolar o posto da rede é prioritário em relação a desliga-lo?
- Que tipo de informação forense se pode perder se o equipamento for desligado?
- Se o malware se propagasse para sistemas SCADA, que impacto adicional haveria?

---

## Exercícios

### Nível 1 - Compreensao dos conceitos

#### Exercício 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | O IRP serve para evitar que incidentes acontecam. |
| b) | A classificação de um incidente deve considerar se há ameaça a confidencialidade, integridade ou disponibilidade. |
| c) | Todo o alerta de segurança é automaticamente um incidente relevante. |
| d) | O IRP e, por natureza, mais reativo do que proativo. |
| e) | O IRP começa na fase de contenção. |
| f) | A preparação (equipas, playbooks, treino) faz parte do planeamento de resposta a incidentes. |

??? success "Solução 1.1"

    | # | Resposta | Justificação |
    |---|:--------:|-------------|
    | a) | **F** | O IRP não serve para evitar incidentes (isso é prevenção). O IRP serve para **responder** quando eles ocorrem. |
    | b) | **V** | A triade CIA (Confidencialidade, Integridade, Disponibilidade) e o critério central para classificar a relevância de um incidente. |
    | c) | **F** | Nem todo o alerta é um incidente relevante. Pode ser ruido, falso positivo ou evento sem impacto. E por isso que existe a fase de **triagem e classificação**. |
    | d) | **V** | O IR atua sobretudo quando o incidente já está em curso ou foi detetado. A preparação e proativa, mas a essencia da resposta é reativa. |
    | e) | **F** | O IRP começa **antes** da contenção, com a capacidade de **detetar** e **classificar** o incidente. |
    | f) | **V** | A preparação previa (equipas, playbooks, ferramentas, treino) e essencial para que a resposta seja rápida e coordenada quando o incidente ocorre. |

---

#### Exercício 1.2 - Associar fases a ações

Associa cada ação a fase correta do processo de resposta a incidentes.

**Fases:** Deteção | Classificação | Contenção | Erradicação | Recuperação | Lições Aprendidas

| # | Ação |
|---|------|
| a) | Isolar um servidor comprometido da rede |
| b) | Analisar um alerta do SIEM |
| c) | Restaurar um sistema a partir de backup |
| d) | Determinar que o incidente afeta a confidencialidade de dados de clientes |
| e) | Remover o malware do sistema infetado |
| f) | Documentar o que correu bem e mal na resposta |
| g) | Bloquear o endereco IP do atacante na firewall |
| h) | Atualizar o playbook de resposta a phishing |

??? success "Solução 1.2"

    | # | Ação | Fase |
    |---|------|------|
    | a) | Isolar um servidor comprometido da rede | **Contenção** - limitar o impacto é evitar propagação |
    | b) | Analisar um alerta do SIEM | **Deteção** - perceber que algo está a acontecer |
    | c) | Restaurar um sistema a partir de backup | **Recuperação** - restaurar operações normais |
    | d) | Determinar que o incidente afeta a confidencialidade | **Classificação** - avaliar a gravidade é dimensão afetada |
    | e) | Remover o malware do sistema infetado | **Erradicação** - eliminar a causa raiz |
    | f) | Documentar o que correu bem e mal | **Lições Aprendidas** - melhorar para o futuro |
    | g) | Bloquear o IP do atacante na firewall | **Contenção** - limitar o impacto (pode também ser erradicação, dependendo do contexto) |
    | h) | Atualizar o playbook de resposta a phishing | **Lições Aprendidas** - incorporar melhorias no processo |

---

#### Exercício 1.3 - Preparacao e pré-requisitos

Indica, para cada elemento, se se trata de um **instrumento de preparação** (playbook, runbook, matriz, plano) ou de uma **fonte de deteção** (tecnológica, humana, externa).

| # | Elemento |
|---|---------|
| a) | Procedimento escrito sobre como responder a ransomware |
| b) | SIEM que correlaciona logs de vários sistemas |
| c) | Tabela com contactos de escalonamento por nível de gravidade |
| d) | Colaborador que reporta um email suspeito |
| e) | Documento que define quem comunica com a imprensa durante um incidente |
| f) | EDR que deteta comportamento anómalo num endpoint |
| g) | ISP que alerta para tráfego anómalo na rede da organização |
| h) | Procedimento técnico para isolar um servidor da rede |

??? success "Solução 1.3"

    | # | Elemento | Classificação |
    |---|---------|--------------|
    | a) | Procedimento de resposta a ransomware | **Instrumento de preparação** - Playbook |
    | b) | SIEM | **Fonte de deteção** - Tecnológica |
    | c) | Tabela de contactos de escalonamento | **Instrumento de preparação** - Matriz de escalonamento |
    | d) | Colaborador reporta email suspeito | **Fonte de deteção** - Humana |
    | e) | Documento de comunicação com imprensa | **Instrumento de preparação** - Plano de comunicação |
    | f) | EDR com alerta de comportamento anómalo | **Fonte de deteção** - Tecnológica |
    | g) | ISP alerta para tráfego anómalo | **Fonte de deteção** - Externa |
    | h) | Procedimento para isolar servidor | **Instrumento de preparação** - Runbook |

---

### Nível 2 - Aplicação prática

#### Exercício 2.1 - Incidente ou não?

Para cada cenário, indica se se trata de um **incidente relevante** ou não, e justifica com base nos critérios de classificação (ameaça dirigida, hipótese de sucesso, impacto em CIA).

| # | Cenário |
|---|---------|
| a) | Um colaborador recebe um email de spam comercial na caixa de correio corporativa. |
| b) | O firewall regista 2000 tentativas de ligação a porta 22 (SSH) vindas de IPs desconhecidos durante a noite. |
| c) | Um administrador de sistemas descobre que a base de dados de RH foi acedida por uma conta que não devia ter permissoes. |
| d) | O antivirus deteta e bloqueia automaticamente um ficheiro malicioso num anexo de email. |
| e) | Um colaborador reporta que o seu portatil foi roubado; o portatil tem acesso VPN e documentos confidenciais. |

??? success "Solução 2.1"

    | # | Incidente? | Justificação |
    |---|:----------:|-------------|
    | a) | **Não** | Spam comercial e ruido normal. Não é dirigido contra ativos de informação é não ameaça diretamente CIA. |
    | b) | **Possivelmente** | Tentativas massivas de força bruta contra SSH podem indicar um ataque dirigido. Depende de se os acessos foram bem-sucedidos. Deve ser investigado (triagem). |
    | c) | **Sim** | Acesso não autorizado a dados de RH e um incidente de **confidencialidade**. E dirigido contra ativos de informação é teve sucesso. |
    | d) | **Não (mas registar)** | O antivirus conteve a ameaça automaticamente. Não houve impacto real. Deve ser registado para análise de tendencias, mas não requer resposta a incidente completa. |
    | e) | **Sim** | Roubo de portatil com acesso VPN e documentos confidenciais e um incidente de **confidencialidade** e potencialmente de **integridade**. Tem impacto real e requer resposta imediata (revogar VPN, localizar dispositivo, avaliar dados expostos). |

---

#### Exercício 2.2 - Definir a resposta

Para o seguinte cenário, descreve o que farias em cada fase da resposta a incidentes.

**Cenário:** Uma empresa de contabilidade descobre que vários ficheiros de clientes foram cifrados por ransomware. O ataque parece ter entrado através de um anexo de email aberto por um colaborador.

Preenche a tabela:

| Fase | O que farias? |
|------|--------------|
| Deteção | ? |
| Classificação | ? |
| Contenção | ? |
| Erradicação | ? |
| Recuperação | ? |
| Lições Aprendidas | ? |

??? success "Solução 2.2"

    | Fase | Resposta |
    |------|---------|
    | **Deteção** | O incidente foi detetado quando os colaboradores tentaram aceder aos ficheiros e encontraram a nota de resgate, ou quando o antivirus/EDR gerou alertas de comportamento anómalo (cifragem massiva de ficheiros). |
    | **Classificação** | Incidente de **integridade** e **disponibilidade** - os dados foram cifrados (alterados) e estão indisponiveis. Gravidade **alta** pela natureza sensivel dos dados de clientes. |
    | **Contenção** | Isolar imediatamente o(s) computador(es) afetado(s) da rede para evitar propagação. Desativar acessos a pastas partilhadas. Preservar evidências (não formatar). Verificar se outros sistemas foram afetados. |
    | **Erradicação** | Identificar a variante de ransomware. Remover o malware dos sistemas afetados. Fechar o vetor de entrada (bloquear o tipo de anexo, atualizar filtros de email). Verificar se o atacante deixou backdoors. |
    | **Recuperação** | Restaurar os ficheiros a partir de backups (se existirem e não estiverem comprometidos). Validar a integridade dos dados restaurados. Monitorizar de perto os sistemas nas horas seguintes. |
    | **Lições Aprendidas** | Rever a política de anexos de email. Reforcar a formação dos colaboradores sobre phishing. Verificar se os backups estavam adequados (RPO). Atualizar o playbook de ransomware. Considerar segmentação de rede. |

---

#### Exercício 2.3 - Com e sem planeamento

Para o seguinte cenário, descreve como seria a resposta **com** e **sem** planeamento previo.

**Cenário:** Numa empresa industrial, um posto de engenharia ligado a rede de produção começa a mostrar sinais de malware (processos estranhos, ligações de rede suspeitas).

Preenche a tabela comparativa:

| Aspeto | Sem planeamento | Com planeamento |
|--------|----------------|----------------|
| Quem e alertado primeiro? | ? | ? |
| Quem decide isolar o posto? | ? | ? |
| O que acontece a produção? | ? | ? |
| Como se preservam evidências? | ? | ? |
| Quanto tempo até a contenção? | ? | ? |

??? success "Solução 2.3"

    | Aspeto | Sem planeamento | Com planeamento |
    |--------|----------------|----------------|
    | **Quem e alertado primeiro?** | O engenheiro avisa quem está mais perto; a informação pode não chegar a pessoa certa. | O EDR gera alerta automático para a equipa de IR; o engenheiro sabe a quem ligar (matriz de escalonamento). |
    | **Quem decide isolar o posto?** | Ninguem quer tomar a decisão por receio de parar a produção. Discussao entre TI e produção. | O playbook define: se há malware confirmado em rede de produção, isola-se imediatamente. O coordenador de incidente tem autoridade para decidir. |
    | **O que acontece a produção?** | Pode haver receio de desligar sistemas; o malware propaga-se; a produção acaba por parar de qualquer forma, mas sem controlo. | A produção e informada; o posto e isolado da rede mas a produção contínua com plano de contingencia definido. |
    | **Como se preservam evidências?** | Alguem pode desligar o computador ou reinstalar o sistema, destruindo evidências. | O runbook indica: isolar da rede mas manter ligado; não reinstalar; aguardar análise forense. |
    | **Quanto tempo até a contenção?** | Horas - entre discussoes, hesitacoes e decisões ad hoc. | Minutos a dezenas de minutos - procedimentos claros, decisão rápida, ações coordenadas. |

    **Conclusão:**

    *A diferença fundamental e que, sem planeamento, a organização fica paralisada pela indecisao. Com planeamento, há uma base comum para agir rápido, mesmo que o cenário exato não esteja previsto. Respostas pré-definidas não significam rigidez cega; significam que ninguem precisa de começar do zero.*

---

### Nível 3 - Análise avancada

#### Exercício 3.1 - Cenário multi-fase com decisões

**Cenário:** Es o responsável de segurança de um municipio. As 8h30 de segunda-feira recebes os seguintes alertas em sequencia:

1. **8h30** - O SIEM regista tentativas de login falhadas massivas na VPN da Camara Municipal
2. **8h45** - Um funcionario reporta que recebeu um email suspeito pedindo para "atualizar a password da VPN" com um link
3. **9h00** - Descobres que 3 contas de funcionarios acederam a VPN com sucesso durante o fim de semana
4. **9h15** - O sistema de ficheiros partilhado mostra alterações em documentos sensiveis durante a madrugada

Para cada momento, indica:

- Que fase do IRP se aplica
- Que ação tomarias
- Como evolui a classificação do incidente

??? success "Solução 3.1"

    **8h30 - Tentativas de login falhadas massivas**

    - **Fase:** Deteção
    - **Ação:** Analisar os logs do SIEM. Verificar os IPs de origem, a frequência e os padrões das tentativas. Neste momento, pode ser um ataque de força bruta generico ou algo dirigido.
    - **Classificação inicial:** Evento suspeito, ainda não confirmado como incidente. Requer investigação.

    **8h45 - Email de phishing reportado**

    - **Fase:** Deteção + Classificação (a situação evolui)
    - **Ação:** Analisar o email de phishing. Verificar quantos funcionarios o receberam. Verificar se alguem clicou no link. Correlacionar com as tentativas de login da VPN.
    - **Classificação atualizada:** Incidente **provável** - há uma campanha de phishing direcionada ao municipio, possivelmente coordenada com o ataque a VPN. Ameaça a **confidencialidade**.

    **9h00 - 3 contas acederam a VPN no fim de semana**

    - **Fase:** Classificação + Contenção (a gravidade aumenta)
    - **Ação:** Identificar as 3 contas. Verificar se os acessos são legitimos (contactar os funcionarios). Se não forem, suspender imediatamente as contas. Verificar que recursos foram acedidos via VPN. Iniciar contenção.
    - **Classificação atualizada:** Incidente **confirmado e grave** - credenciais comprometidas com acesso efetivo a rede interna. Ameaça a **confidencialidade** e potencialmente a **integridade**.

    **9h15 - Alteracoes em documentos sensiveis**

    - **Fase:** Contenção urgente + início de Erradicação
    - **Ação:** Bloquear imediatamente o acesso remoto (VPN) para todas as contas suspeitas. Isolar o servidor de ficheiros se necessário. Preservar logs e evidências. Avaliar o alcance total dos dados comprometidos. Comunicar a direcao e, se aplicavel, a CNPD (dados pessoais).
    - **Classificação final:** Incidente **crítico** - comprometimento confirmado de dados sensiveis do municipio. Todas as três dimensoes de CIA podem estar afetadas. Requer resposta completa com todas as fases do IRP.

    **Conclusão:**

    *Este exercício mostra como um incidente pode escalar rapidamente. O que começou como tentativas de login falhadas (evento suspeito) transformou-se num comprometimento confirmado com exfiltração/alteração de dados em menos de uma hora. A capacidade de correlacionar eventos e escalar a resposta em tempo real e essencial.*

---

#### Exercício 3.2 - Comparar respostas

Dois hospitais sofrem o mesmo tipo de incidente: ransomware que cifra parte dos registos clínicos.

- **Hospital A** tem IRP documentado, equipa CSIRT treinada, backups testados e playbook de ransomware.
- **Hospital B** não tem IRP formal, a equipa de TI faz tudo, os backups não são testados há 6 meses.

Compara a resposta provável dos dois hospitais preenchendo a tabela:

| Fase | Hospital A | Hospital B |
|------|-----------|-----------|
| Deteção | ? | ? |
| Classificação | ? | ? |
| Contenção | ? | ? |
| Recuperação | ? | ? |
| Tempo total estimado | ? | ? |

??? success "Solução 3.2"

    | Fase | Hospital A (com IRP) | Hospital B (sem IRP) |
    |------|---------------------|---------------------|
    | **Deteção** | Rapida: EDR e SIEM detetam cifragem anómala em minutos. Equipa CSIRT e alertada automaticamente. | Lenta: só e detetado quando os médicos tentam aceder aos registos e falham. Pode demorar horas. |
    | **Classificação** | Imediata: o playbook de ransomware define os critérios. Classificado como incidente crítico em minutos. | Confusa: a equipa de TI não sabe se e ransomware ou falha de sistema. Perde-se tempo a diagnosticar. |
    | **Contenção** | Coordenada: isolamento de rede por segmentos, preservação de evidências, comunicação a direcao clínica seguindo procedimentos. | Desordenada: desligam servidores "por precaucao", possivelmente destruindo evidências. Sem plano claro. |
    | **Recuperação** | Controlada: restauro a partir de backups testados, validação de integridade, retoma progressiva com monitorização. | Arriscada: backups não testados há 6 meses podem estar incompletos ou corrompidos. Recuperação incerta e demorada. |
    | **Tempo total** | **2-6 horas** (dentro do MTD hospitalar tipico) | **24-72 horas** (provavelmente excede o MTD, com risco para pacientes) |

    **Conclusão:**

    *A diferença entre ter e não ter um IRP pode ser a diferença entre uma interrupção controlada de horas e um caos de dias. Em ambientes críticos como hospitais, essa diferença pode ter consequências diretas na segurança dos pacientes.*

---

## Armadilhas e confusões a evitar

### Confusão 1: IRP não é o mesmo que prevenção

> O IRP **não serve para evitar** que incidentes acontecam. Serve para **responder bem** quando eles ocorrem.

A prevenção e importante (firewalls, antivirus, formação), mas e uma função diferente. O IRP assume que, apesar da prevenção, incidentes vão acontecer - e prepara a organização para lidar com eles.

### Confusão 2: IRP não é o mesmo que DRP

> O IRP foca-se em **detetar, classificar, conter e responder**. O DRP foca-se em **restaurar e recuperar** serviços.

| Aspeto | IRP | DRP |
|--------|-----|-----|
| Foco | Detetar e responder ao incidente | Restaurar serviços após o incidente |
| Quando | Durante o incidente | Após a contenção |
| Objetivo | Conter o impacto é eliminar a causa | Repor a operação normal |
| Exemplo | Isolar um servidor comprometido | Restaurar o servidor a partir de backup |

### Confusão 3: Nem todo o evento e um incidente

> Um alerta pode ser **ruido**, **falso positivo**, **evento benigno** ou **tentativa sem impacto**. E por isso que a **classificação é triagem** são essenciais.

Tratar tudo como incidente crítico esgota recursos e cria fadiga de alertas. Não investigar alertas pode deixar passar incidentes reais.

### Confusão 4: O IRP não vive sozinho

> O IRP articula-se com outros planos e processos da organização.

```
  ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐
  │ BIA  │────►│ IRP  │────►│ DRP  │────►│ BCP  │
  └──────┘     └──────┘     └──────┘     └──────┘
  O que e       Como         Como         Como manter
  critico?     responder?   recuperar?   o negocio?
```

O IRP depende da BIA para saber **o que é prioritário** e alimenta o DRP e o BCP com informação sobre **o que aconteceu** e **o que precisa de ser recuperado**.

### Confusão 5: "Equipa de IR" não é necessariamente uma equipa formal exclusiva

> Em organizações pequenas ou médias, a equipa de IR pode ser uma **equipa funcional**, composta por pessoas de várias áreas que assumem papeis durante um incidente.

Não é preciso ter um SOC com 20 pessoas. E preciso ter **pessoas identificadas** que saibam o que fazer quando um incidente ocorre.

### Confusão 6: Deteção não é só tecnologia

> A capacidade de deteção é **técnica é humana**. Não depende apenas de SIEM e EDR.

Deteção pode vir de utilizadores, helpdesk, logs, monitorização, fornecedores, parceiros ou auditoria. Uma organização que depende exclusivamente de ferramentas automáticas pode perder incidentes que só uma pessoa consegue identificar.

### Confusão 7: Respostas pré-definidas não significam rigidez cega

> Ter procedimentos não significa seguir automaticamente sem pensar. Significa ter uma **base comum** para agir rápido, com **margem para adaptacao**.

O playbook diz: "se há ransomware, isolar da rede". Mas a decisão de **quando** e **como** isolar pode variar consoante o contexto.

### Confusão 8: O plano não substitui a competencia

> Ter um IRP documentado **não chega**. Se a equipa não treinar, o plano pode falhar.

Um plano que existe no papel mas nunca foi testado e quase tao inutil como não ter plano. Simulacoes, exercícios de mesa (tabletop exercises) e treino regular são essenciais.

---

## Ligacao com a BIA

A transicao da BIA para o IRP e conceptualmente clara:

| BIA | IRP |
|-----|-----|
| Identifica o que é **crítico** | Define como **responder** quando o crítico e ameacado |
| Quantifica o **impacto** de uma interrupção | Define **como agir** durante a interrupção |
| Define **tempos** (RPO, RTO, MTD) | Usa esses tempos para **priorizar** a resposta |
| Foca-se no **negocio** | Foca-se na **ação técnica é operacional** |

```
  BIA                              IRP
  ═══                              ═══
  "O servidor de email             "Se o servidor de email for
   tem MTD de 4 horas"      ──►    comprometido, a equipa deve
                                    responder em X minutos seguindo
                                    o playbook Y"
```

---

## Resumo rápido

| Conceito | Descricao |
|----------|-----------|
| **IRP** | Plano que define como identificar, classificar e responder a incidentes |
| **Incidente** | Evento que ameaça a confidencialidade, integridade ou disponibilidade |
| **Triagem** | Processo de avaliar se um alerta é realmente um incidente relevante |
| **CIA** | Confidencialidade, Integridade, Disponibilidade - critérios de classificação |
| **Natureza reativa** | O IRP atua quando o incidente ocorre, mas exige preparação previa |
| **Fases** | Deteção, Classificação, Contenção, Erradicação, Recuperação, Lições Aprendidas |
| **Playbook** | Procedimento detalhado para responder a um tipo específico de incidente |
| **Runbook** | Procedimento técnico para executar ações concretas |
| **Matriz de escalonamento** | Tabela de contactos, níveis e canais para escalar o incidente |
| **Deteção** | Capacidade (técnica é humana) de perceber que um incidente está a ocorrer |
| **Equipa de IR** | Pessoas identificadas com papeis definidos para responder a incidentes |

### Frases-chave para recordar

- *"O IRP não existe para impedir que algo aconteca; existe para garantir que, quando acontece, a organização responde com rapidez e método."*
- *"Nem todo o ataque é automaticamente um incidente com impacto relevante; e preciso qualificar."*
- *"O IRP vive da deteção, da classificação é da resposta."*
- *"Responder a incidentes e mais reativo do que proativo, mas exige preparação previa muito seria."*
- *"A BIA diz-nos o que doi mais; o IRP diz-nos como agir quando começa a doer."*
- *"Em incident response, improvisar custa caro."*
- *"Não basta ter um plano; e preciso saber quem atua e como o incidente é detetado."*
- *"Uma organização sem capacidade de deteção reage sempre tarde."*
- *"Respostas pré-definidas não eliminam a necessidade de pensar; eliminam a necessidade de começar do zero."*

### Diagrama de sintese

```
  Evento ──► Triagem ──► Incidente? ──► Classificacao ──► Resposta
                              │
                          Nao │ Sim
                              │
                         Registar    ┌──────────────────────────────┐
                         e fechar    │ Detecao ► Classificacao      │
                                     │ ► Contencao ► Erradicacao    │
                                     │ ► Recuperacao ► Licoes       │
                                     └──────────────────────────────┘

  O IRP articula-se com:  BIA (o que e critico)
                          DRP (como recuperar)
                          BCP (como manter o negocio)
```

---

*Próximo capitulo: [Planeamento do IRP](planeamento.md)*
