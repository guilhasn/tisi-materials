# Incident Response Plan (IRP) - Fundamentos

## Indice

1. [Visao geral](#visao-geral)
2. [Conceitos fundamentais](#conceitos-fundamentais)
3. [Pre-requisitos para o IRP funcionar](#pre-requisitos-para-o-irp-funcionar)
4. [Processo de resposta a incidentes](#processo-de-resposta-a-incidentes)
5. [Exemplos praticos](#exemplos-praticos)
6. [Exercicios](#exercicios)
7. [Armadilhas e confusoes a evitar](#armadilhas-e-confusoes-a-evitar)
8. [Ligacao com a BIA](#ligacao-com-a-bia)
9. [Resumo rapido](#resumo-rapido)

---

## Visao geral

O **Incident Response Plan (IRP)** e o planeamento da forma como a organizacao **identifica, classifica e responde** a incidentes de seguranca da informacao.

Enquanto a BIA se foca em perceber **o que e critico** e **qual o impacto** de uma interrupcao, o IRP foca-se em:

- **Detetar** que ha um incidente
- **Perceber** se e realmente um incidente relevante
- **Agir** para o conter e responder

> A BIA ajuda a saber o que doi mais. O IRP ajuda a agir quando comeca a doer.

---

## Conceitos fundamentais

### O IRP cobre identificacao, classificacao e resposta

O planeamento de resposta a incidentes define como a organizacao:

- **Deteta** um incidente (atraves de alertas, logs, relatos de utilizadores)
- **Classifica** o incidente (qual a gravidade, que ativos sao afetados)
- **Reage** ao incidente (contencao, erradicacao, comunicacao)

O IRP **nao comeca na contencao**. Comeca antes, com a capacidade de perceber que algo esta a acontecer.

```
  Detecao ──► Classificacao ──► Contencao ──► Resposta
     |              |                |             |
     ▼              ▼                ▼             ▼
  Perceber       Avaliar          Limitar        Agir e
  que algo     a gravidade       o impacto     comunicar
  aconteceu
```

---

### Nem todo o ataque e automaticamente um incidente relevante

Um ataque e classificado como **incidente** quando:

- E **dirigido contra ativos de informacao** da organizacao
- Tem uma **hipotese realista de sucesso**
- **Ameaca a confidencialidade, integridade ou disponibilidade**

Isto e importante porque evita banalizar tudo. Existe uma ideia de **triagem e qualificacao**.

| Situacao | E incidente? | Porquê |
|----------|:------------:|--------|
| Milhares de scans aleatorios na internet | Nao | Ruido normal, sem alvo especifico |
| Scan direcionado a portas criticas do servidor | Possivelmente | Pode indicar reconhecimento ativo |
| Email de phishing recebido por 50 colaboradores | Sim | Ameaca direta a confidencialidade das credenciais |
| Falso positivo de antivirus num ficheiro legítimo | Nao | Evento benigno, sem impacto real |
| Acesso nao autorizado a base de dados de clientes | Sim | Comprometimento direto da confidencialidade |

---

### O foco do IRP e a triade CIA

O incidente e relevante porque ameaca uma ou mais dimensoes da seguranca da informacao:

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

| Dimensao | O que protege | Exemplo de incidente |
|----------|--------------|---------------------|
| **Confidencialidade** | Informacao so acessivel a quem tem autorizacao | Fuga de dados de clientes, phishing com roubo de credenciais |
| **Integridade** | Informacao nao e alterada de forma nao autorizada | Ransomware que cifra ficheiros, alteracao de registos clinicos |
| **Disponibilidade** | Sistemas e dados acessiveis quando necessario | Ataque DDoS que derruba o site, falha de servidor |

---

### A resposta a incidentes e mais reativa do que proativa

O IRP atua sobretudo **quando o incidente ja esta em curso ou foi detetado**. E, por natureza, mais **reativo**.

Isto nao significa que nao ha preparacao. Antes do incidente e necessario ter:

- **Equipas** definidas e treinadas
- **Playbooks** (procedimentos escritos para cenarios conhecidos)
- **Contactos** de escalonamento
- **Ferramentas** de detecao e analise
- **Treino** e simulacoes regulares

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

A resposta a incidentes **nao pode ser inventada no momento**. Tem de haver respostas pre-definidas, capacidade de detecao e uma equipa preparada. Improvisar durante uma crise custa caro: gera confusao, atrasos, decisoes contraditorias e perda de tempo.

> Respostas pre-definidas nao eliminam a necessidade de pensar; eliminam a necessidade de comecar do zero.

### 1. Respostas pre-definidas

A organizacao deve pensar **antes** do incidente em questoes como:

- **Quem e chamado?** (contactos e cadeia de escalonamento)
- **Quem decide?** (autoridade para isolar sistemas, comunicar, escalar)
- **Que primeiros passos dar?** (acoes imediatas documentadas)
- **Que sistemas podem ser isolados?** (e com que impacto)
- **Que comunicacoes devem ser feitas?** (internas e externas)
- **Como escalar o incidente?** (criterios de gravidade)

Na pratica, isto traduz-se em:

| Instrumento | O que e | Para que serve |
|-------------|---------|---------------|
| **Playbook** | Procedimento detalhado para um tipo de incidente | Guiar a resposta passo a passo (ex: playbook de ransomware, playbook de phishing) |
| **Runbook** | Procedimento tecnico especifico | Executar acoes tecnicas concretas (ex: como isolar um servidor, como revogar acessos) |
| **Matriz de escalonamento** | Tabela de contactos e niveis | Saber quem contactar, quando e por que canal |
| **Plano de comunicacao** | Regras de comunicacao interna e externa | Evitar fugas de informacao e garantir coordenacao |

#### Com vs sem respostas pre-definidas

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

A organizacao precisa de ter **pessoas identificadas** para assumir papeis na resposta. Isto nao significa obrigatoriamente um SOC (Security Operations Center) enorme ou uma equipa exclusiva de 20 pessoas.

Em organizacoes pequenas ou medias, pode ser uma **equipa funcional**, composta por pessoas de varias areas que assumem papeis durante um incidente:

| Papel | Responsabilidade | Quem tipicamente |
|-------|-----------------|-----------------|
| **Coordenador de incidente** | Lidera a resposta, toma decisoes, comunica com a gestao | Responsavel de seguranca ou TI |
| **Analista tecnico** | Investiga o incidente, recolhe evidencias, analisa logs | Tecnico de seguranca ou administrador de sistemas |
| **Operacoes** | Executa acoes de contencao e recuperacao nos sistemas | Administrador de sistemas, redes |
| **Apoio juridico** | Avalia implicacoes legais (RGPD, notificacoes obrigatorias) | Jurista interno ou externo |
| **Comunicacao** | Gere a comunicacao interna e externa | Responsavel de comunicacao |
| **Gestao** | Aprova decisoes criticas, aloca recursos | Direcao |

---

### 3. Capacidade de detecao

> Uma organizacao sem capacidade de detecao reage **sempre** tarde.

Sem detecao, nao ha resposta - ou ha resposta tarde demais. O plano pode existir no papel, mas **falha na pratica** se a organizacao nao consegue perceber que um incidente esta a acontecer.

A detecao **nao e so tecnologia**. Pode vir de multiplas fontes:

| Fonte de detecao | Tipo | Exemplo |
|-------------------|------|---------|
| **SIEM** | Tecnologica | Correlacao de logs que deteta padroes anomalos |
| **EDR** | Tecnologica | Alerta de comportamento suspeito num endpoint |
| **Utilizadores** | Humana | Colaborador reporta email suspeito ou comportamento estranho |
| **Helpdesk** | Humana | Chamadas frequentes sobre o mesmo problema |
| **Logs de acesso** | Tecnologica | Acessos fora de horario ou de localizacoes anomalas |
| **Fornecedores** | Externa | ISP ou parceiro alerta para trafego anomalo |
| **Auditoria** | Humana/Tecnica | Auditoria identifica acessos indevidos |

A capacidade de detecao e, portanto, **tecnica e humana**.

---

### A equipa atua durante o incidente

Um ponto essencial: a equipa de resposta a incidentes atua **enquanto o incidente esta a decorrer**, nao apenas depois. O IR nao e analise historica nem auditoria a posteriori. E **intervencao em tempo real**:

- Conter o impacto
- Limitar a propagacao
- Apoiar decisoes
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

| Fase | Objetivo | Acoes tipicas |
|------|----------|--------------|
| **Detecao e Alerta** | Perceber que algo esta a acontecer | Monitorizar logs, analisar alertas SIEM, receber relatos de utilizadores |
| **Classificacao e Triagem** | Avaliar se e um incidente e qual a gravidade | Verificar se e falso positivo, classificar severidade, identificar ativos afetados |
| **Contencao** | Limitar o impacto e evitar propagacao | Isolar sistemas, bloquear acessos, preservar evidencias |
| **Erradicacao** | Remover a causa raiz | Eliminar malware, corrigir vulnerabilidades, fechar acessos comprometidos |
| **Recuperacao** | Restaurar operacoes normais | Restaurar backups, validar integridade, monitorizar de perto |
| **Licoes Aprendidas** | Melhorar para o futuro | Documentar o incidente, identificar falhas no processo, atualizar playbooks |

---

## Exemplos praticos

### Exemplo 1 - Universidade (Phishing com roubo de credenciais)

**Cenario:** Um utilizador de uma universidade recebe um email de phishing e introduz as suas credenciais numa pagina falsa.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Identificacao** | Alerta ou relato do utilizador | O utilizador percebe que algo esta errado, ou o sistema de email deteta o phishing |
| **Classificacao** | Incidente de comprometimento de credenciais | Ameaca direta a **confidencialidade** - credenciais foram expostas |
| **Contencao** | Bloqueio imediato | Reset da password, invalidacao de sessoes ativas |
| **Resposta** | Analise e comunicacao | Analise de acessos realizados com as credenciais comprometidas, comunicacao ao utilizador |

**Como interpretar:**

*Este e um caso classico de phishing. A detecao pode vir do proprio utilizador (que percebe que foi enganado) ou de sistemas automaticos. A resposta imediata e bloquear o acesso comprometido e verificar se o atacante ja usou as credenciais para aceder a outros sistemas.*

**Para refletir:**

- Que medidas preventivas poderiam ter reduzido o risco deste incidente?
- Se o utilizador nao tivesse reportado, como seria possivel detetar o comprometimento?
- Que impacto adicional haveria se as mesmas credenciais dessem acesso a outros sistemas?

---

### Exemplo 2 - Hospital (Acessos anomalos fora de horario)

**Cenario:** Num hospital, sao detetados acessos anomalos a um sistema clinico fora do horario normal de trabalho.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Identificacao** | Logs e alertas automaticos | O SIEM deteta acessos ao sistema clinico as 3h da manha |
| **Classificacao** | Potencial acesso nao autorizado | Ameaca a **confidencialidade** de dados clinicos sensiveis |
| **Contencao** | Isolamento de conta | Suspender a conta utilizada, manter logs para analise |
| **Resposta** | Validacao e comunicacao | Verificar se o acesso era legitimo (medico de urgencia?) ou malicioso; comunicacao interna |

**Como interpretar:**

*Em ambientes de saude, os dados clinicos sao altamente sensiveis. Um acesso anomalo pode ser um profissional a trabalhar fora de horas ou pode ser um acesso nao autorizado. A classificacao correta e critica: reagir em excesso pode prejudicar o atendimento; reagir pouco pode expor dados de pacientes.*

**Para refletir:**

- Como distinguir um acesso legitimo fora de horas de um acesso malicioso?
- Que informacao dos logs e mais relevante para esta classificacao?
- Que regulamentacao (ex: RGPD) se aplica a exposicao de dados clinicos?

---

### Exemplo 3 - E-commerce (Ataque DDoS)

**Cenario:** O site de uma plataforma de e-commerce comeca a falhar e ha indicios de trafego malicioso intenso.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Identificacao** | Monitorizacao e degradacao do servico | Alertas de latencia elevada, timeouts, relatos de clientes |
| **Classificacao** | Possivel DDoS / incidente de disponibilidade | Ameaca direta a **disponibilidade** - o servico esta comprometido |
| **Contencao** | Mitigacao de trafego | Ativacao de protecao anti-DDoS, filtragem de trafego malicioso |
| **Resposta** | Escalonamento e protecao | Escalonamento para equipa tecnica, protecao da infraestrutura, comunicacao a clientes |

**Como interpretar:**

*Um ataque DDoS afeta diretamente a disponibilidade. A identificacao costuma ser rapida (o servico degrada visivelmente), mas a contencao pode ser complexa e exigir coordenacao com fornecedores de infraestrutura. O impacto financeiro pode ser significativo enquanto o site estiver em baixo.*

**Para refletir:**

- Que diferenca faz ter um plano de mitigacao DDoS preparado antecipadamente?
- Como e que a BIA ajuda a priorizar a resposta a este incidente?
- Que comunicacao deve ser feita aos clientes durante o incidente?

---

### Exemplo 4 - Empresa industrial (Malware num posto de engenharia)

**Cenario:** Numa empresa industrial, um posto de engenharia comeca a executar processos estranhos e a abrir ligacoes de rede suspeitas.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Identificacao** | EDR ou alerta do utilizador | O sistema de detecao (EDR) assinala comportamento anomalo, ou o engenheiro nota algo estranho |
| **Classificacao** | Potencial malware | Ameaca a **integridade** e potencialmente a **confidencialidade** - malware pode roubar ou alterar dados |
| **Contencao** | Isolamento do posto | Desligar o posto da rede, manter o equipamento ligado para preservar evidencias |
| **Resposta** | Analise forense e recuperacao | Recolher informacao sobre o malware, validar se se propagou, limpar e restaurar o sistema |

**Como interpretar:**

*Em ambientes industriais, o malware pode ter consequencias graves: desde roubo de propriedade intelectual ate perturbacao de processos de producao. A contencao rapida (isolar da rede) e critica para evitar propagacao. Nota importante: nao se deve desligar o computador imediatamente, pois pode destruir evidencias na memoria.*

**Para refletir:**

- Porque e que isolar o posto da rede e prioritario em relacao a desliga-lo?
- Que tipo de informacao forense se pode perder se o equipamento for desligado?
- Se o malware se propagasse para sistemas SCADA, que impacto adicional haveria?

---

## Exercicios

### Nivel 1 - Compreensao dos conceitos

#### Exercicio 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | O IRP serve para evitar que incidentes acontecam. |
| b) | A classificacao de um incidente deve considerar se ha ameaca a confidencialidade, integridade ou disponibilidade. |
| c) | Todo o alerta de seguranca e automaticamente um incidente relevante. |
| d) | O IRP e, por natureza, mais reativo do que proativo. |
| e) | O IRP comeca na fase de contencao. |
| f) | A preparacao (equipas, playbooks, treino) faz parte do planeamento de resposta a incidentes. |

??? success "Solucao 1.1"

    | # | Resposta | Justificacao |
    |---|:--------:|-------------|
    | a) | **F** | O IRP nao serve para evitar incidentes (isso e prevencao). O IRP serve para **responder** quando eles ocorrem. |
    | b) | **V** | A triade CIA (Confidencialidade, Integridade, Disponibilidade) e o criterio central para classificar a relevancia de um incidente. |
    | c) | **F** | Nem todo o alerta e um incidente relevante. Pode ser ruido, falso positivo ou evento sem impacto. E por isso que existe a fase de **triagem e classificacao**. |
    | d) | **V** | O IR atua sobretudo quando o incidente ja esta em curso ou foi detetado. A preparacao e proativa, mas a essencia da resposta e reativa. |
    | e) | **F** | O IRP comeca **antes** da contencao, com a capacidade de **detetar** e **classificar** o incidente. |
    | f) | **V** | A preparacao previa (equipas, playbooks, ferramentas, treino) e essencial para que a resposta seja rapida e coordenada quando o incidente ocorre. |

---

#### Exercicio 1.2 - Associar fases a acoes

Associa cada acao a fase correta do processo de resposta a incidentes.

**Fases:** Detecao | Classificacao | Contencao | Erradicacao | Recuperacao | Licoes Aprendidas

| # | Acao |
|---|------|
| a) | Isolar um servidor comprometido da rede |
| b) | Analisar um alerta do SIEM |
| c) | Restaurar um sistema a partir de backup |
| d) | Determinar que o incidente afeta a confidencialidade de dados de clientes |
| e) | Remover o malware do sistema infetado |
| f) | Documentar o que correu bem e mal na resposta |
| g) | Bloquear o endereco IP do atacante na firewall |
| h) | Atualizar o playbook de resposta a phishing |

??? success "Solucao 1.2"

    | # | Acao | Fase |
    |---|------|------|
    | a) | Isolar um servidor comprometido da rede | **Contencao** - limitar o impacto e evitar propagacao |
    | b) | Analisar um alerta do SIEM | **Detecao** - perceber que algo esta a acontecer |
    | c) | Restaurar um sistema a partir de backup | **Recuperacao** - restaurar operacoes normais |
    | d) | Determinar que o incidente afeta a confidencialidade | **Classificacao** - avaliar a gravidade e dimensao afetada |
    | e) | Remover o malware do sistema infetado | **Erradicacao** - eliminar a causa raiz |
    | f) | Documentar o que correu bem e mal | **Licoes Aprendidas** - melhorar para o futuro |
    | g) | Bloquear o IP do atacante na firewall | **Contencao** - limitar o impacto (pode tambem ser erradicacao, dependendo do contexto) |
    | h) | Atualizar o playbook de resposta a phishing | **Licoes Aprendidas** - incorporar melhorias no processo |

---

#### Exercicio 1.3 - Preparacao e pre-requisitos

Indica, para cada elemento, se se trata de um **instrumento de preparacao** (playbook, runbook, matriz, plano) ou de uma **fonte de detecao** (tecnologica, humana, externa).

| # | Elemento |
|---|---------|
| a) | Procedimento escrito sobre como responder a ransomware |
| b) | SIEM que correlaciona logs de varios sistemas |
| c) | Tabela com contactos de escalonamento por nivel de gravidade |
| d) | Colaborador que reporta um email suspeito |
| e) | Documento que define quem comunica com a imprensa durante um incidente |
| f) | EDR que deteta comportamento anomalo num endpoint |
| g) | ISP que alerta para trafego anomalo na rede da organizacao |
| h) | Procedimento tecnico para isolar um servidor da rede |

??? success "Solucao 1.3"

    | # | Elemento | Classificacao |
    |---|---------|--------------|
    | a) | Procedimento de resposta a ransomware | **Instrumento de preparacao** - Playbook |
    | b) | SIEM | **Fonte de detecao** - Tecnologica |
    | c) | Tabela de contactos de escalonamento | **Instrumento de preparacao** - Matriz de escalonamento |
    | d) | Colaborador reporta email suspeito | **Fonte de detecao** - Humana |
    | e) | Documento de comunicacao com imprensa | **Instrumento de preparacao** - Plano de comunicacao |
    | f) | EDR com alerta de comportamento anomalo | **Fonte de detecao** - Tecnologica |
    | g) | ISP alerta para trafego anomalo | **Fonte de detecao** - Externa |
    | h) | Procedimento para isolar servidor | **Instrumento de preparacao** - Runbook |

---

### Nivel 2 - Aplicacao pratica

#### Exercicio 2.1 - Incidente ou nao?

Para cada cenario, indica se se trata de um **incidente relevante** ou nao, e justifica com base nos criterios de classificacao (ameaca dirigida, hipotese de sucesso, impacto em CIA).

| # | Cenario |
|---|---------|
| a) | Um colaborador recebe um email de spam comercial na caixa de correio corporativa. |
| b) | O firewall regista 2000 tentativas de ligacao a porta 22 (SSH) vindas de IPs desconhecidos durante a noite. |
| c) | Um administrador de sistemas descobre que a base de dados de RH foi acedida por uma conta que nao devia ter permissoes. |
| d) | O antivirus deteta e bloqueia automaticamente um ficheiro malicioso num anexo de email. |
| e) | Um colaborador reporta que o seu portatil foi roubado; o portatil tem acesso VPN e documentos confidenciais. |

??? success "Solucao 2.1"

    | # | Incidente? | Justificacao |
    |---|:----------:|-------------|
    | a) | **Nao** | Spam comercial e ruido normal. Nao e dirigido contra ativos de informacao e nao ameaca diretamente CIA. |
    | b) | **Possivelmente** | Tentativas massivas de forca bruta contra SSH podem indicar um ataque dirigido. Depende de se os acessos foram bem-sucedidos. Deve ser investigado (triagem). |
    | c) | **Sim** | Acesso nao autorizado a dados de RH e um incidente de **confidencialidade**. E dirigido contra ativos de informacao e teve sucesso. |
    | d) | **Nao (mas registar)** | O antivirus conteve a ameaca automaticamente. Nao houve impacto real. Deve ser registado para analise de tendencias, mas nao requer resposta a incidente completa. |
    | e) | **Sim** | Roubo de portatil com acesso VPN e documentos confidenciais e um incidente de **confidencialidade** e potencialmente de **integridade**. Tem impacto real e requer resposta imediata (revogar VPN, localizar dispositivo, avaliar dados expostos). |

---

#### Exercicio 2.2 - Definir a resposta

Para o seguinte cenario, descreve o que farias em cada fase da resposta a incidentes.

**Cenario:** Uma empresa de contabilidade descobre que varios ficheiros de clientes foram cifrados por ransomware. O ataque parece ter entrado atraves de um anexo de email aberto por um colaborador.

Preenche a tabela:

| Fase | O que farias? |
|------|--------------|
| Detecao | ? |
| Classificacao | ? |
| Contencao | ? |
| Erradicacao | ? |
| Recuperacao | ? |
| Licoes Aprendidas | ? |

??? success "Solucao 2.2"

    | Fase | Resposta |
    |------|---------|
    | **Detecao** | O incidente foi detetado quando os colaboradores tentaram aceder aos ficheiros e encontraram a nota de resgate, ou quando o antivirus/EDR gerou alertas de comportamento anomalo (cifragem massiva de ficheiros). |
    | **Classificacao** | Incidente de **integridade** e **disponibilidade** - os dados foram cifrados (alterados) e estao indisponiveis. Gravidade **alta** pela natureza sensivel dos dados de clientes. |
    | **Contencao** | Isolar imediatamente o(s) computador(es) afetado(s) da rede para evitar propagacao. Desativar acessos a pastas partilhadas. Preservar evidencias (nao formatar). Verificar se outros sistemas foram afetados. |
    | **Erradicacao** | Identificar a variante de ransomware. Remover o malware dos sistemas afetados. Fechar o vetor de entrada (bloquear o tipo de anexo, atualizar filtros de email). Verificar se o atacante deixou backdoors. |
    | **Recuperacao** | Restaurar os ficheiros a partir de backups (se existirem e nao estiverem comprometidos). Validar a integridade dos dados restaurados. Monitorizar de perto os sistemas nas horas seguintes. |
    | **Licoes Aprendidas** | Rever a politica de anexos de email. Reforcar a formacao dos colaboradores sobre phishing. Verificar se os backups estavam adequados (RPO). Atualizar o playbook de ransomware. Considerar segmentacao de rede. |

---

#### Exercicio 2.3 - Com e sem planeamento

Para o seguinte cenario, descreve como seria a resposta **com** e **sem** planeamento previo.

**Cenario:** Numa empresa industrial, um posto de engenharia ligado a rede de producao comeca a mostrar sinais de malware (processos estranhos, ligacoes de rede suspeitas).

Preenche a tabela comparativa:

| Aspeto | Sem planeamento | Com planeamento |
|--------|----------------|----------------|
| Quem e alertado primeiro? | ? | ? |
| Quem decide isolar o posto? | ? | ? |
| O que acontece a producao? | ? | ? |
| Como se preservam evidencias? | ? | ? |
| Quanto tempo ate a contencao? | ? | ? |

??? success "Solucao 2.3"

    | Aspeto | Sem planeamento | Com planeamento |
    |--------|----------------|----------------|
    | **Quem e alertado primeiro?** | O engenheiro avisa quem esta mais perto; a informacao pode nao chegar a pessoa certa. | O EDR gera alerta automatico para a equipa de IR; o engenheiro sabe a quem ligar (matriz de escalonamento). |
    | **Quem decide isolar o posto?** | Ninguem quer tomar a decisao por receio de parar a producao. Discussao entre TI e producao. | O playbook define: se ha malware confirmado em rede de producao, isola-se imediatamente. O coordenador de incidente tem autoridade para decidir. |
    | **O que acontece a producao?** | Pode haver receio de desligar sistemas; o malware propaga-se; a producao acaba por parar de qualquer forma, mas sem controlo. | A producao e informada; o posto e isolado da rede mas a producao continua com plano de contingencia definido. |
    | **Como se preservam evidencias?** | Alguem pode desligar o computador ou reinstalar o sistema, destruindo evidencias. | O runbook indica: isolar da rede mas manter ligado; nao reinstalar; aguardar analise forense. |
    | **Quanto tempo ate a contencao?** | Horas - entre discussoes, hesitacoes e decisoes ad hoc. | Minutos a dezenas de minutos - procedimentos claros, decisao rapida, acoes coordenadas. |

    **Conclusao:**

    *A diferenca fundamental e que, sem planeamento, a organizacao fica paralisada pela indecisao. Com planeamento, ha uma base comum para agir rapido, mesmo que o cenario exato nao esteja previsto. Respostas pre-definidas nao significam rigidez cega; significam que ninguem precisa de comecar do zero.*

---

### Nivel 3 - Analise avancada

#### Exercicio 3.1 - Cenario multi-fase com decisoes

**Cenario:** Es o responsavel de seguranca de um municipio. As 8h30 de segunda-feira recebes os seguintes alertas em sequencia:

1. **8h30** - O SIEM regista tentativas de login falhadas massivas na VPN da Camara Municipal
2. **8h45** - Um funcionario reporta que recebeu um email suspeito pedindo para "atualizar a password da VPN" com um link
3. **9h00** - Descobres que 3 contas de funcionarios acederam a VPN com sucesso durante o fim de semana
4. **9h15** - O sistema de ficheiros partilhado mostra alteracoes em documentos sensiveis durante a madrugada

Para cada momento, indica:

- Que fase do IRP se aplica
- Que acao tomarias
- Como evolui a classificacao do incidente

??? success "Solucao 3.1"

    **8h30 - Tentativas de login falhadas massivas**

    - **Fase:** Detecao
    - **Acao:** Analisar os logs do SIEM. Verificar os IPs de origem, a frequencia e os padroes das tentativas. Neste momento, pode ser um ataque de forca bruta generico ou algo dirigido.
    - **Classificacao inicial:** Evento suspeito, ainda nao confirmado como incidente. Requer investigacao.

    **8h45 - Email de phishing reportado**

    - **Fase:** Detecao + Classificacao (a situacao evolui)
    - **Acao:** Analisar o email de phishing. Verificar quantos funcionarios o receberam. Verificar se alguem clicou no link. Correlacionar com as tentativas de login da VPN.
    - **Classificacao atualizada:** Incidente **provavel** - ha uma campanha de phishing direcionada ao municipio, possivelmente coordenada com o ataque a VPN. Ameaca a **confidencialidade**.

    **9h00 - 3 contas acederam a VPN no fim de semana**

    - **Fase:** Classificacao + Contencao (a gravidade aumenta)
    - **Acao:** Identificar as 3 contas. Verificar se os acessos sao legitimos (contactar os funcionarios). Se nao forem, suspender imediatamente as contas. Verificar que recursos foram acedidos via VPN. Iniciar contencao.
    - **Classificacao atualizada:** Incidente **confirmado e grave** - credenciais comprometidas com acesso efetivo a rede interna. Ameaca a **confidencialidade** e potencialmente a **integridade**.

    **9h15 - Alteracoes em documentos sensiveis**

    - **Fase:** Contencao urgente + inicio de Erradicacao
    - **Acao:** Bloquear imediatamente o acesso remoto (VPN) para todas as contas suspeitas. Isolar o servidor de ficheiros se necessario. Preservar logs e evidencias. Avaliar o alcance total dos dados comprometidos. Comunicar a direcao e, se aplicavel, a CNPD (dados pessoais).
    - **Classificacao final:** Incidente **critico** - comprometimento confirmado de dados sensiveis do municipio. Todas as tres dimensoes de CIA podem estar afetadas. Requer resposta completa com todas as fases do IRP.

    **Conclusao:**

    *Este exercicio mostra como um incidente pode escalar rapidamente. O que comecou como tentativas de login falhadas (evento suspeito) transformou-se num comprometimento confirmado com exfiltracao/alteracao de dados em menos de uma hora. A capacidade de correlacionar eventos e escalar a resposta em tempo real e essencial.*

---

#### Exercicio 3.2 - Comparar respostas

Dois hospitais sofrem o mesmo tipo de incidente: ransomware que cifra parte dos registos clinicos.

- **Hospital A** tem IRP documentado, equipa CSIRT treinada, backups testados e playbook de ransomware.
- **Hospital B** nao tem IRP formal, a equipa de TI faz tudo, os backups nao sao testados ha 6 meses.

Compara a resposta provavel dos dois hospitais preenchendo a tabela:

| Fase | Hospital A | Hospital B |
|------|-----------|-----------|
| Detecao | ? | ? |
| Classificacao | ? | ? |
| Contencao | ? | ? |
| Recuperacao | ? | ? |
| Tempo total estimado | ? | ? |

??? success "Solucao 3.2"

    | Fase | Hospital A (com IRP) | Hospital B (sem IRP) |
    |------|---------------------|---------------------|
    | **Detecao** | Rapida: EDR e SIEM detetam cifragem anomala em minutos. Equipa CSIRT e alertada automaticamente. | Lenta: so e detetado quando os medicos tentam aceder aos registos e falham. Pode demorar horas. |
    | **Classificacao** | Imediata: o playbook de ransomware define os criterios. Classificado como incidente critico em minutos. | Confusa: a equipa de TI nao sabe se e ransomware ou falha de sistema. Perde-se tempo a diagnosticar. |
    | **Contencao** | Coordenada: isolamento de rede por segmentos, preservacao de evidencias, comunicacao a direcao clinica seguindo procedimentos. | Desordenada: desligam servidores "por precaucao", possivelmente destruindo evidencias. Sem plano claro. |
    | **Recuperacao** | Controlada: restauro a partir de backups testados, validacao de integridade, retoma progressiva com monitorizacao. | Arriscada: backups nao testados ha 6 meses podem estar incompletos ou corrompidos. Recuperacao incerta e demorada. |
    | **Tempo total** | **2-6 horas** (dentro do MTD hospitalar tipico) | **24-72 horas** (provavelmente excede o MTD, com risco para pacientes) |

    **Conclusao:**

    *A diferenca entre ter e nao ter um IRP pode ser a diferenca entre uma interrupcao controlada de horas e um caos de dias. Em ambientes criticos como hospitais, essa diferenca pode ter consequencias diretas na seguranca dos pacientes.*

---

## Armadilhas e confusoes a evitar

### Confusao 1: IRP nao e o mesmo que prevencao

> O IRP **nao serve para evitar** que incidentes acontecam. Serve para **responder bem** quando eles ocorrem.

A prevencao e importante (firewalls, antivirus, formacao), mas e uma funcao diferente. O IRP assume que, apesar da prevencao, incidentes vao acontecer - e prepara a organizacao para lidar com eles.

### Confusao 2: IRP nao e o mesmo que DRP

> O IRP foca-se em **detetar, classificar, conter e responder**. O DRP foca-se em **restaurar e recuperar** servicos.

| Aspeto | IRP | DRP |
|--------|-----|-----|
| Foco | Detetar e responder ao incidente | Restaurar servicos apos o incidente |
| Quando | Durante o incidente | Apos a contencao |
| Objetivo | Conter o impacto e eliminar a causa | Repor a operacao normal |
| Exemplo | Isolar um servidor comprometido | Restaurar o servidor a partir de backup |

### Confusao 3: Nem todo o evento e um incidente

> Um alerta pode ser **ruido**, **falso positivo**, **evento benigno** ou **tentativa sem impacto**. E por isso que a **classificacao e triagem** sao essenciais.

Tratar tudo como incidente critico esgota recursos e cria fadiga de alertas. Nao investigar alertas pode deixar passar incidentes reais.

### Confusao 4: O IRP nao vive sozinho

> O IRP articula-se com outros planos e processos da organizacao.

```
  ┌──────┐     ┌──────┐     ┌──────┐     ┌──────┐
  │ BIA  │────►│ IRP  │────►│ DRP  │────►│ BCP  │
  └──────┘     └──────┘     └──────┘     └──────┘
  O que e       Como         Como         Como manter
  critico?     responder?   recuperar?   o negocio?
```

O IRP depende da BIA para saber **o que e prioritario** e alimenta o DRP e o BCP com informacao sobre **o que aconteceu** e **o que precisa de ser recuperado**.

### Confusao 5: "Equipa de IR" nao e necessariamente uma equipa formal exclusiva

> Em organizacoes pequenas ou medias, a equipa de IR pode ser uma **equipa funcional**, composta por pessoas de varias areas que assumem papeis durante um incidente.

Nao e preciso ter um SOC com 20 pessoas. E preciso ter **pessoas identificadas** que saibam o que fazer quando um incidente ocorre.

### Confusao 6: Detecao nao e so tecnologia

> A capacidade de detecao e **tecnica e humana**. Nao depende apenas de SIEM e EDR.

Detecao pode vir de utilizadores, helpdesk, logs, monitorizacao, fornecedores, parceiros ou auditoria. Uma organizacao que depende exclusivamente de ferramentas automaticas pode perder incidentes que so uma pessoa consegue identificar.

### Confusao 7: Respostas pre-definidas nao significam rigidez cega

> Ter procedimentos nao significa seguir automaticamente sem pensar. Significa ter uma **base comum** para agir rapido, com **margem para adaptacao**.

O playbook diz: "se ha ransomware, isolar da rede". Mas a decisao de **quando** e **como** isolar pode variar consoante o contexto.

### Confusao 8: O plano nao substitui a competencia

> Ter um IRP documentado **nao chega**. Se a equipa nao treinar, o plano pode falhar.

Um plano que existe no papel mas nunca foi testado e quase tao inutil como nao ter plano. Simulacoes, exercicios de mesa (tabletop exercises) e treino regular sao essenciais.

---

## Ligacao com a BIA

A transicao da BIA para o IRP e conceptualmente clara:

| BIA | IRP |
|-----|-----|
| Identifica o que e **critico** | Define como **responder** quando o critico e ameacado |
| Quantifica o **impacto** de uma interrupcao | Define **como agir** durante a interrupcao |
| Define **tempos** (RPO, RTO, MTD) | Usa esses tempos para **priorizar** a resposta |
| Foca-se no **negocio** | Foca-se na **acao tecnica e operacional** |

```
  BIA                              IRP
  ═══                              ═══
  "O servidor de email             "Se o servidor de email for
   tem MTD de 4 horas"      ──►    comprometido, a equipa deve
                                    responder em X minutos seguindo
                                    o playbook Y"
```

---

## Resumo rapido

| Conceito | Descricao |
|----------|-----------|
| **IRP** | Plano que define como identificar, classificar e responder a incidentes |
| **Incidente** | Evento que ameaca a confidencialidade, integridade ou disponibilidade |
| **Triagem** | Processo de avaliar se um alerta e realmente um incidente relevante |
| **CIA** | Confidencialidade, Integridade, Disponibilidade - criterios de classificacao |
| **Natureza reativa** | O IRP atua quando o incidente ocorre, mas exige preparacao previa |
| **Fases** | Detecao, Classificacao, Contencao, Erradicacao, Recuperacao, Licoes Aprendidas |
| **Playbook** | Procedimento detalhado para responder a um tipo especifico de incidente |
| **Runbook** | Procedimento tecnico para executar acoes concretas |
| **Matriz de escalonamento** | Tabela de contactos, niveis e canais para escalar o incidente |
| **Detecao** | Capacidade (tecnica e humana) de perceber que um incidente esta a ocorrer |
| **Equipa de IR** | Pessoas identificadas com papeis definidos para responder a incidentes |

### Frases-chave para recordar

- *"O IRP nao existe para impedir que algo aconteca; existe para garantir que, quando acontece, a organizacao responde com rapidez e metodo."*
- *"Nem todo o ataque e automaticamente um incidente com impacto relevante; e preciso qualificar."*
- *"O IRP vive da detecao, da classificacao e da resposta."*
- *"Responder a incidentes e mais reativo do que proativo, mas exige preparacao previa muito seria."*
- *"A BIA diz-nos o que doi mais; o IRP diz-nos como agir quando comeca a doer."*
- *"Em incident response, improvisar custa caro."*
- *"Nao basta ter um plano; e preciso saber quem atua e como o incidente e detetado."*
- *"Uma organizacao sem capacidade de detecao reage sempre tarde."*
- *"Respostas pre-definidas nao eliminam a necessidade de pensar; eliminam a necessidade de comecar do zero."*

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

*Proximo capitulo: [Planeamento do IRP](planeamento.md)*
