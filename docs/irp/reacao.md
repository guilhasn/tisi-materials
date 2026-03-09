# Reacao a Incidentes

## Indice

1. [Acoes imediatas](#acoes-imediatas)
2. [Notificacao de pessoal-chave](#notificacao-de-pessoal-chave)
3. [Documentacao do incidente](#documentacao-do-incidente)
4. [Estrategias de contencao](#estrategias-de-contencao)
5. [Exemplos praticos](#exemplos-praticos)
6. [Exercicios](#exercicios)
7. [Armadilhas e confusoes a evitar](#armadilhas-e-confusoes-a-evitar)
8. [Resumo rapido](#resumo-rapido)

---

## Acoes imediatas

Quando um incidente e confirmado, a organizacao entra numa fase critica: a **reacao**. Reagir bem nao e apenas "fazer alguma coisa rapidamente". E executar acoes coordenadas, com proposito claro, que protejam a organizacao e criem condicoes para a recuperacao posterior.

### Os tres objetivos da reacao

A reacao a um incidente confirmado tem tres objetivos fundamentais:

| Objetivo | Descricao | Porque e importante |
|----------|-----------|---------------------|
| **Parar e conter** | Travar a progressao do incidente, impedir que se alastre | Sem contencao, o impacto cresce a cada minuto que passa |
| **Mitigar o impacto** | Reduzir os danos ja causados ou em curso | Proteger o que ainda pode ser protegido |
| **Preparar a recuperacao** | Recolher informacao e criar condicoes para restaurar sistemas | Sem esta base, a recuperacao sera cega e arriscada |

O terceiro objetivo e frequentemente esquecido: **reagir mal, sem recolher informacao, deixa a organizacao sem base para perceber o ambito do incidente**, o que foi afetado e o que precisa de ser restaurado. Uma reacao que resolve o sintoma mas destroi evidencias pode criar problemas maiores na fase de recuperacao.

> A reacao nao e so "apagar o fogo". E tambem perceber o que ardeu, o que ainda pode arder e o que sera preciso reconstruir.

---

### Os tres reflexos obrigatorios

Quando o incidente e confirmado, tres coisas devem acontecer rapidamente e em paralelo:

1. **Notificacao de pessoal-chave** - alertar as pessoas certas, pelos canais certos, com a informacao certa
2. **Atribuicao de tarefas** - cada pessoa sabe o que fazer e quem coordena
3. **Documentacao do incidente** - registar tudo desde o primeiro momento

```
  ┌─────────────────────┐
  │ INCIDENTE CONFIRMADO│
  └──────────┬──────────┘
             │
             ▼
  ┌──────────────────────┐
  │ 1. NOTIFICAR         │──► Alertar pessoal-chave
  │    pessoal-chave     │    (lista de alerta, canais definidos)
  └──────────┬───────────┘
             │
             ▼
  ┌──────────────────────┐
  │ 2. ATRIBUIR          │──► Cada pessoa sabe o seu papel
  │    tarefas           │    (coordenador, analista, operacoes)
  └──────────┬───────────┘
             │
             ▼
  ┌──────────────────────┐
  │ 3. CONTER e          │──► Travar a progressao
  │    MITIGAR           │    (isolar, bloquear, limitar)
  └──────────┬───────────┘
             │
             ▼
  ┌──────────────────────┐
  │ 4. DOCUMENTAR        │──► Registar tudo: acoes, decisoes,
  │    em tempo real     │    tempos, comunicacoes, impacto
  └──────────┬───────────┘
             │
             ▼
  ┌──────────────────────┐
  │ 5. PREPARAR          │──► Recolher informacao para a
  │    RECUPERACAO        │    fase seguinte (scope, dados, estado)
  └──────────────────────┘
```

Estes cinco passos nao sao estritamente sequenciais na pratica - varios decorrem em paralelo. Mas a logica e clara: **primeiro saber quem atua, depois atuar, e durante todo o processo, documentar**.

---

### Velocidade com metodo

> Reagir rapidamente nao significa reagir caoticamente. "Rapido" significa agil, coordenado e baseado em procedimentos - nao improvisado, desordenado ou em panico.

A urgencia de um incidente pode criar pressao para "fazer qualquer coisa ja". Mas acoes descoordenadas podem agravar o problema:

| Reacao rapida e coordenada | Reacao rapida e caotica |
|---------------------------|------------------------|
| A equipa segue o playbook | Cada pessoa faz o que acha melhor |
| Ha um coordenador que decide | Varias pessoas tomam decisoes contraditorias |
| As acoes sao registadas | Ninguem documenta nada |
| A contencao e proporcional | Desligam-se sistemas sem avaliar impacto |
| As evidencias sao preservadas | Evidencias sao destruidas por acoes precipitadas |
| A recuperacao e possivel | A recuperacao e comprometida |

**A velocidade vem da preparacao, nao da precipitacao.** Uma equipa que treinou, que tem playbooks escritos e que sabe quem faz o que, consegue agir em minutos sem cair no caos.

```
  ╔══════════════════════════════════════════════════════════╗
  ║           VELOCIDADE COM METODO                          ║
  ╠══════════════════════════════════════════════════════════╣
  ║                                                          ║
  ║   Preparacao ──► Procedimentos ──► Treino ──► Confianca  ║
  ║                                                          ║
  ║   Quando o incidente chega:                              ║
  ║   • Nao se inventa ──► segue-se o plano                 ║
  ║   • Nao se hesita  ──► sabe-se quem decide              ║
  ║   • Nao se esquece ──► documenta-se em tempo real        ║
  ║                                                          ║
  ╚══════════════════════════════════════════════════════════╝
```

---

## Notificacao de pessoal-chave

### A lista de alerta (alert roster)

A **lista de alerta** (alert roster) e uma lista pre-definida que responde a cinco perguntas essenciais:

- **Quem** deve ser notificado?
- **Como** (por que canal)?
- **Por quem** (quem inicia a notificacao)?
- **Com que mensagem** inicial?
- **Em que ordem**?

Esta lista deve existir **antes** do incidente. Nao se procura numeros de telefone nem se decide quem avisar durante uma crise.

| Campo | Descricao | Exemplo |
|-------|-----------|---------|
| **Nome** | Identificacao da pessoa | Ana Silva |
| **Funcao/Papel** | Papel no IRP (nao apenas o cargo) | Coordenadora de incidente |
| **Contacto primario** | Canal preferencial de contacto | +351 912 345 678 (telemovel) |
| **Contacto secundario** | Canal alternativo | ana.silva@org.pt (email) |
| **Substituto** | Quem assume se a pessoa nao estiver disponivel | Pedro Costa |
| **Ordem de escalonamento** | Posicao na cadeia de notificacao | 1.o nivel |
| **Turno/Disponibilidade** | Quando esta disponivel | Dias uteis 08h-18h |
| **Notas** | Informacao relevante (ferias, licenca, restricoes) | Ausente 15-30 Ago |

A lista de alerta **deve ser mantida atualizada**. Numeros mudam, pessoas mudam de funcao, substitutos desaparecem. Uma lista desatualizada pode ser pior do que nao ter lista nenhuma - cria uma falsa sensacao de seguranca.

---

### Modelo sequencial vs hierarquico

Existem dois modelos principais para ativar a cadeia de notificacao:

#### Modelo sequencial (sequential roster)

Uma unica pessoa contacta todos os elementos da lista, um a um, por ordem.

#### Modelo hierarquico (calling tree)

Uma pessoa contacta um grupo restrito, e cada elemento desse grupo contacta outros, formando uma arvore de chamadas.

```
  MODELO SEQUENCIAL                    MODELO HIERARQUICO
  ══════════════════                   ═══════════════════

  Coordenador                          Coordenador
       │                                    │
       ├──► Pessoa A                   ┌────┼────┐
       │                               │    │    │
       ├──► Pessoa B                   ▼    ▼    ▼
       │                              Lider Lider Lider
       ├──► Pessoa C                  Tec.  Ops.  Com.
       │                               │    │    │
       ├──► Pessoa D                  ┌┴┐  ┌┴┐  ┌┴┐
       │                              ▼ ▼  ▼ ▼  ▼ ▼
       ├──► Pessoa E                  T1 T2 O1 O2 C1 C2
       │
       └──► Pessoa F

  Uma pessoa faz tudo              Cada nivel notifica o seguinte
  (mais lento, mais controlado)    (mais rapido, mais risco de falha)
```

| Criterio | Modelo sequencial | Modelo hierarquico |
|----------|-------------------|---------------------|
| **Controlo** | Alto - uma pessoa gere toda a comunicacao | Medio - a mensagem pode sofrer alteracoes em cada nivel |
| **Velocidade** | Mais lento - uma pessoa de cada vez | Mais rapido - notificacoes em paralelo |
| **Risco de falha** | Baixo - se um contacto falha, o notificador passa ao seguinte | Maior - se um no intermediario falha, todo o ramo fica sem notificacao |
| **Consistencia da mensagem** | Alta - todos recebem a mesma mensagem | Variavel - a mensagem pode ser reinterpretada |
| **Quando usar** | Equipas pequenas, incidentes de gravidade media | Equipas grandes, incidentes criticos que exigem mobilizacao rapida |
| **Complexidade** | Simples de implementar e testar | Requer planeamento e treino dos nos intermediarios |

**Na pratica**, muitas organizacoes usam um modelo **hibrido**: o coordenador notifica os lideres de equipa (hierarquico), e cada lider notifica a sua equipa (sequencial dentro do grupo).

---

### A mensagem de alerta

A mensagem de alerta nao precisa de ser longa. Precisa de ser **curta, clara e util**. O objetivo e que cada pessoa que a recebe saiba imediatamente:

- Que **ha um incidente** em curso
- Qual a **gravidade inicial** estimada
- O que e **esperado dela** (ativar-se, deslocar-se, ficar de prevenao)
- Que **plano ou papel** deve ativar

> A mensagem de alerta nao e um relatorio. E um gatilho para acao.

**Exemplo de mensagem de alerta eficaz:**

```
  ┌────────────────────────────────────────────────────────────┐
  │  ALERTA DE INCIDENTE - [SEVERIDADE: ALTA]                  │
  │                                                            │
  │  Incidente: Comprometimento de conta com acesso a rede     │
  │  Hora de detecao: 09:15                                    │
  │  Gravidade estimada: Alta                                  │
  │  Acao esperada: Ativar papel de [Analista Tecnico]         │
  │  Canal de coordenacao: #incidente-2026-03 (Teams)          │
  │  Coordenador: Ana Silva (+351 912 345 678)                 │
  │                                                            │
  │  Proxima comunicacao: em 30 minutos ou antes se necessario │
  └────────────────────────────────────────────────────────────┘
```

**O que a mensagem de alerta NaO deve fazer:**

- Nao deve ser difundida para toda a organizacao (notificar pessoal-**chave**, nao fazer broadcast)
- Nao deve conter detalhes tecnicos excessivos que possam confundir ou alarmar
- Nao deve usar linguagem ambigua ("parece que pode haver algo")
- Nao deve omitir o que se espera do destinatario

---

### Canais modernos de notificacao

A notificacao ja nao se limita a telefonemas e emails. Existem multiplos canais com diferentes vantagens e limitacoes:

| Canal | Tipo | Vantagem | Limitacao |
|-------|------|----------|-----------|
| **Plataforma de gestao de incidentes** (ex: PagerDuty, Opsgenie) | Automatizado | Escalonamento automatico, rastreabilidade, integracao com SIEM | Custo, dependencia de infraestrutura |
| **Sistemas de paging** | Automatizado | Fiavel, funciona sem internet | Limitado em conteudo da mensagem |
| **Teams / Slack** | Colaborativo | Canal dedicado, historico, partilha de ficheiros | Pode ser ignorado fora de horario |
| **SMS** | Direto | Alcance universal, funciona sem internet | Sem confirmacao de leitura, limite de caracteres |
| **Chamada telefonica** | Direto | Confirmacao imediata, permite dialogo | Demorado para multiplas pessoas, sem registo escrito |
| **Aplicacoes de on-call** (ex: VictorOps) | Automatizado | Rotacao de turnos, escalonamento, metricas | Custo, dependencia de app |
| **SIEM/SOAR** | Automatizado | Alerta automatico baseado em regras, integracao com resposta | Requer configuracao e manutencao |
| **Email** | Assincrono | Registo formal, detalhado | Lento, pode ir para spam, sem garantia de leitura rapida |

A escolha do canal depende da urgencia, do horario e do tipo de incidente. A maioria das organizacoes usa **uma combinacao de canais**: alerta automatico via plataforma de incidentes + canal colaborativo para coordenacao + chamada telefonica para escalonamento critico.

---

## Documentacao do incidente

### Porque documentar

A documentacao durante um incidente serve **tres propositos distintos**, todos igualmente importantes:

```
  ╔════════════════════════════════════════════════════════╗
  ║         TRES PROPOSITOS DA DOCUMENTACAO                ║
  ╠════════════════════════════════════════════════════════╣
  ║                                                        ║
  ║  1. REGISTO OFICIAL                                    ║
  ║     ● O que aconteceu, como, quando, quem fez o que   ║
  ║     ● Reconstituicao factual do incidente              ║
  ║                                                        ║
  ║  2. DEMONSTRACAO DE DILIGENCIA                         ║
  ║     ● Prova que a organizacao agiu de forma adequada   ║
  ║     ● Essencial para auditoria, governanca, RGPD       ║
  ║     ● Protecao legal e responsabilizacao               ║
  ║                                                        ║
  ║  3. REUTILIZACAO PARA FORMACAO                         ║
  ║     ● Incidentes bem documentados tornam-se            ║
  ║       casos de estudo para treino futuro               ║
  ║     ● Licoes aprendidas, revisao de playbooks          ║
  ║     ● Exercicios de mesa (tabletop exercises)          ║
  ║                                                        ║
  ╚════════════════════════════════════════════════════════╝
```

**Proposito 1 - Registo oficial:** A documentacao deve permitir **reconstituir** o incidente: o que aconteceu, como aconteceu, que acoes foram tomadas, quem fez o que, quando, onde, porque e como foi tratado.

**Proposito 2 - Demonstracao de diligencia:** A documentacao **prova** que a organizacao agiu de forma responsavel. Isto e critico para auditoria, governanca corporativa, prestacao de contas (accountability), responsabilidade legal e comunicacao com entidades externas (ex: CNPD, reguladores).

**Proposito 3 - Reutilizacao para formacao:** Incidentes bem documentados tornam-se os **casos de treino de amanha**. Alimentam licoes aprendidas, revisao de playbooks e exercicios de simulacao.

---

### O que registar

A documentacao de um incidente nao e apenas tecnica. Deve cobrir **decisoes, comunicacoes, escalonamentos, impacto e acoes de mitigacao**.

| Campo | Descricao | Exemplo |
|-------|-----------|---------|
| **Data e hora** | Quando ocorreu cada evento ou acao (com fuso horario) | 2026-03-09 09:15 UTC |
| **Fonte de detecao** | Como foi detetado o incidente | Alerta SIEM, relato de utilizador, helpdesk |
| **Descricao do evento** | O que foi observado, de forma factual | "Detetadas 500 tentativas de login falhadas na VPN em 10 minutos" |
| **Classificacao** | Tipo e gravidade do incidente | Comprometimento de credenciais, gravidade Alta |
| **Ativos afetados** | Que sistemas, dados ou processos foram impactados | Servidor de ficheiros FS01, contas do dominio AD |
| **Acoes tomadas** | Que acoes de contencao/mitigacao foram executadas | Conta bloqueada, segmento de rede isolado |
| **Decisoes** | Que decisoes foram tomadas e por quem | "Decisao de isolar o segmento tomada pelo coordenador as 09:30" |
| **Comunicacoes** | Que comunicacoes internas e externas foram feitas | Direcao informada as 09:45, CNPD notificada as 11:00 |
| **Escalonamento** | Se o incidente foi escalado, para quem e quando | Escalado para CISO as 09:35 devido a gravidade |
| **Impacto** | Impacto real observado (operacional, financeiro, reputacional) | 200 utilizadores sem acesso ao email durante 3 horas |
| **Estado** | Estado atual do incidente | Em contencao / Contido / Em recuperacao / Encerrado |
| **Responsavel** | Quem e o responsavel pela acao ou decisao | Ana Silva (coordenadora de incidente) |

---

### Quando documentar

> A documentacao deve ser feita **durante** o incidente, nao apenas depois.

Este principio e absolutamente critico e frequentemente violado. As razoes sao claras:

| Se documentar durante | Se documentar so depois |
|----------------------|------------------------|
| Tempos exatos e registados | Tempos sao aproximados ou esquecidos |
| Decisoes sao registadas com contexto | Decisoes perdem o contexto original |
| Sequencia de eventos e precisa | Sequencia e reconstruida de memoria (com erros) |
| Detalhes tecnicos sao capturados | Detalhes tecnicos sao esquecidos ou simplificados |
| Comunicacoes sao rastreadas | Comunicacoes sao omitidas ou distorcidas |

**Na pratica**, isto significa que deve existir alguem (ou um processo) dedicado a registar eventos em tempo real. Em equipas maiores, pode haver um **escriba** (scribe) dedicado. Em equipas menores, cada pessoa regista as suas acoes num canal ou documento partilhado.

Ferramentas uteis para documentacao em tempo real:

- Canal dedicado no Teams/Slack (com timestamps automaticos)
- Documento partilhado (Google Docs, Confluence, Wiki)
- Plataforma de gestao de incidentes com timeline integrada
- Folha de registo estruturada (mesmo em papel, se necessario)

---

### Documentacao nao e burocracia

> Documentar um incidente nao e burocracia. E a diferenca entre uma organizacao que aprende e melhora, e uma que repete os mesmos erros.

A documentacao deve ser:

- **Objetiva** - factos, nao opinioes ("o servidor foi isolado as 09:30", nao "achamos que seria melhor isolar")
- **Cronologica** - ordenada no tempo, com timestamps
- **Clara** - linguagem direta, sem ambiguidades
- **Factual** - o que realmente aconteceu, nao o que deveria ter acontecido

A documentacao **nao e uma narrativa** literaria. E um registo factual que permite a qualquer pessoa reconstituir o que aconteceu, mesmo meses depois.

---

## Estrategias de contencao

### Primeiro: perceber o ambito

Antes de conter, e essencial **perceber o que esta em jogo**. Conter sem perceber o ambito e como tentar apagar um incendio sem saber onde esta o fogo.

As perguntas criticas antes de conter:

- **Que ativos foram comprometidos?** (servidores, estacoes de trabalho, aplicacoes, dados)
- **Que contas estao envolvidas?** (utilizadores, contas de servico, contas privilegiadas)
- **Com que sistemas comunicou o foco inicial?** (movimentacao lateral, exfiltracao)
- **Qual e o ambito?** Uma estacao? Um servidor? Uma aplicacao? Um segmento de rede? Toda a rede?

```
  ┌──────────────────────────────────────────────────────────┐
  │                    DETERMINAR O AMBITO                    │
  ├──────────────────────────────────────────────────────────┤
  │                                                          │
  │  Ambito restrito          Ambito medio          Ambito   │
  │  ──────────────          ────────────          total     │
  │                                                          │
  │  ● 1 estacao             ● Segmento de        ● Toda a  │
  │  ● 1 conta                 rede                 rede     │
  │  ● 1 aplicacao           ● Varios servidores   ● Dominio │
  │                          ● Grupo de contas       AD      │
  │                                                ● Infra   │
  │                                                  critica │
  │                                                          │
  │  Contencao cirurgica     Contencao ampla       Contencao │
  │  e suficiente            necessaria            extrema   │
  │                                                possivel  │
  └──────────────────────────────────────────────────────────┘
```

O ambito determina o **nivel de contencao** adequado. Conter demasiado causa paragem desnecessaria. Conter de menos permite que o incidente se propague.

---

### Niveis de contencao

O objetivo da contencao e **parar o incidente e recuperar o controlo**. Nao e "voltar ao normal" - isso e recuperacao. A contencao tem niveis crescentes de agressividade:

| Nivel | Acoes tipicas | Quando usar | Risco |
|-------|--------------|-------------|-------|
| **Cirurgico** | Desativar contas comprometidas, reconfigurar regras de firewall, bloquear trafego especifico, revogar tokens de acesso | Ambito restrito e bem identificado, incidente contido a poucos ativos | Baixo - intervencao precisa com impacto minimo na operacao |
| **Amplo** | Isolar segmentos de rede inteiros, restringir comunicacoes entre VLANs, bloquear acesso remoto (VPN), desativar servicos partilhados | Ambito medio ou incerto, suspeita de movimentacao lateral, varios sistemas potencialmente afetados | Medio - afeta a operacao de equipas e servicos no segmento isolado |
| **Extremo** | Parar todos os computadores e dispositivos de rede, desligar a ligacao a internet, shutdown total da infraestrutura | Ameaca critica e generalizada, risco iminente de dano catastrofico (ex: ransomware em propagacao rapida por toda a rede) | Muito alto - paragem total da organizacao, decisao de ultimo recurso |

---

### Contencao proporcional

> A contencao deve ser proporcional a ameaca. Conter com proporcionalidade significa proteger a organizacao sem causar danos desnecessarios.

```
  NIVEL DE CONTENCAO
  ═══════════════════

  CIRURGICO ─────────────────────────────────────────── EXTREMO
       │                    │                               │
       ▼                    ▼                               ▼
  ┌──────────┐      ┌──────────────┐              ┌──────────────┐
  │ Desativar│      │ Isolar       │              │ Parar tudo   │
  │ 1 conta  │      │ segmento     │              │ Desligar     │
  │ Bloquear │      │ de rede      │              │ a rede       │
  │ 1 IP     │      │ Restringir   │              │ Shutdown     │
  │ 1 regra  │      │ VLANs        │              │ total        │
  │ firewall │      │ Bloquear VPN │              │              │
  └──────────┘      └──────────────┘              └──────────────┘
                                                         │
  Impacto: Minimo    Impacto: Moderado            Impacto: Total
  Uso: Frequente     Uso: Ocasional               Uso: Raro

  ◄──────────── Proporcionalidade ────────────────────────►
  Menor agressividade                    Maior agressividade
```

O **shutdown total** e uma decisao rara e extremamente seria. Implica paragem completa da organizacao e so se justifica quando o risco de nao o fazer e superior ao dano causado pela paragem. Na maioria dos incidentes, a contencao cirurgica ou ampla e suficiente.

**Principio fundamental:** Antes de agir, perguntar:

- Esta acao e **proporcional** a ameaca identificada?
- O **dano da contencao** e inferior ao **dano do incidente** se nao contido?
- Ha uma **alternativa menos disruptiva** que alcance o mesmo objetivo?

---

### Conter nao e erradicar nao e recuperar

E fundamental distinguir tres fases que sao frequentemente confundidas:

| Fase | Objetivo | O que se faz | Analogia |
|------|----------|-------------|----------|
| **Contencao** | Parar e limitar | Isolar, bloquear, restringir - impedir que o incidente se alastre ou agrave | Fechar as portas para o fogo nao passar para outras divisoes |
| **Erradicacao** | Remover a causa | Eliminar malware, corrigir vulnerabilidades, fechar vetores de ataque | Extinguir o fogo completamente |
| **Recuperacao** | Restaurar operacoes | Restaurar backups, validar integridade, repor servicos, monitorizar | Reconstruir o que o fogo danificou |

```
  Incidente       Contido         Erradicado      Recuperado
  detetado                                        (operacao normal)
     │               │                │                │
     ▼               ▼                ▼                ▼
  ───●───────────────●────────────────●────────────────●────────
     │               │                │                │
     │<─ Contencao ─>│<─ Erradicacao─>│<─ Recuperacao─>│
     │               │                │                │
     │ Parar/limitar │ Remover causa  │ Restaurar      │
     │ o incidente   │ raiz           │ servicos       │
```

**Erro comum:** Saltar diretamente da contencao para a recuperacao, sem erradicar. Restaurar um sistema sem remover a causa raiz significa que o incidente pode reocorrer imediatamente.

---

## Exemplos praticos

### Exemplo 1 - Universidade (Phishing com comprometimento de conta)

**Cenario:** Uma universidade deteta que um funcionario administrativo clicou num link de phishing e introduziu as suas credenciais numa pagina falsa. O atacante acedeu a conta de email e a plataforma de gestao academica.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Notificacao** | Alerta ao coordenador de incidente | O helpdesk reporta o caso ao responsavel de seguranca; ativa-se a lista de alerta |
| **Atribuicao** | Definicao de papeis | Coordenador: resp. seguranca; Analista: admin. sistemas; Comunicacao: gabinete de comunicacao |
| **Contencao** | Bloqueio imediato da conta | Reset de password, invalidacao de sessoes, bloqueio de acesso a plataforma academica |
| **Documentacao** | Registo cronologico | Hora de detecao, hora de bloqueio, sistemas acedidos, acoes tomadas |
| **Preparacao da recuperacao** | Recolha de informacao | Analise dos logs de acesso: que dados foram consultados? Houve exfiltracao? Que alunos afetados? |

**Como interpretar:**

*Este caso mostra a importancia de reagir de forma coordenada a um incidente aparentemente simples. O phishing pode parecer banal, mas o comprometimento de uma conta com acesso a dados academicos de alunos levanta questoes serias de confidencialidade e de RGPD. A contencao e cirurgica (bloquear uma conta), mas a documentacao e a recolha de informacao sao criticas para avaliar o verdadeiro impacto.*

**Para refletir:**

- Porque e que e importante documentar que dados foram acedidos, mesmo que a conta ja tenha sido bloqueada?
- Que comunicacao seria necessaria se se confirmasse que dados pessoais de alunos foram acedidos pelo atacante?
- Como poderia a universidade prevenir este tipo de incidente no futuro?

---

### Exemplo 2 - Hospital (Malware num servidor clinico)

**Cenario:** Um hospital deteta atividade suspeita num servidor que aloja registos clinicos de pacientes. O EDR assinala processos anomalos e comunicacoes com um endereco IP externo desconhecido.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Notificacao** | Alerta hierarquico critico | CISO notificado imediatamente; direcao clinica avisada; equipa de IR mobilizada; DPO contactado (dados de saude) |
| **Atribuicao** | Coordenacao multidisciplinar | Coordenador: CISO; Tecnico: admin. sistemas + seguranca; Clinico: direcao medica; Legal: DPO |
| **Contencao** | Isolamento proporcional | Servidor isolado da rede (contencao cirurgica); servicos clinicos criticos redirecionados para sistemas alternativos; acesso ao servidor bloqueado |
| **Documentacao** | Registo detalhado | Timeline completa, comunicacoes com direcao clinica, decisao de isolamento com justificacao, impacto nos servicos clinicos |
| **Preparacao da recuperacao** | Analise de ambito | Que registos clinicos estao no servidor? O malware propagou-se? Que dados podem ter sido exfiltrados? Backups intactos? |

**Como interpretar:**

*Este cenario ilustra a complexidade da coordenacao quando o incidente envolve dados criticos (saude). A contencao deve ser rapida mas proporcional: isolar o servidor e essencial, mas garantir que os servicos clinicos continuam a funcionar e igualmente prioritario. A notificacao envolve nao so a equipa tecnica mas tambem a direcao clinica (porque os servicos medicos sao afetados) e o DPO (porque dados de saude estao em causa). A documentacao e especialmente critica neste contexto por exigencias regulatorias (RGPD, legislacao de saude).*

**Para refletir:**

- Porque e que a direcao clinica deve ser envolvida na decisao de contencao, e nao apenas a equipa tecnica?
- Que consequencias legais pode ter o hospital se nao documentar adequadamente este incidente?
- Se o malware se tivesse propagado para sistemas de suporte a vida, que nivel de contencao seria adequado?

---

### Exemplo 3 - E-commerce (Checkout indisponivel)

**Cenario:** Uma plataforma de e-commerce deteta que o sistema de checkout esta em baixo durante a Black Friday. Os logs mostram indicios de um ataque combinado: DDoS no frontend e tentativa de SQL injection no backend de pagamentos.

| Fase | Acao | Detalhe |
|------|------|---------|
| **Notificacao** | Alerta multi-equipa | Equipa de operacoes (infraestrutura), equipa de negocio (impacto comercial), equipa de comunicacao (clientes e imprensa) |
| **Atribuicao** | Resposta paralela | Ops: mitigacao DDoS + investigacao SQL injection; Negocio: avaliacao de perda de receita; Comunicacao: mensagem para clientes no site e redes sociais |
| **Contencao** | Mitigacao em dois niveis | DDoS: ativacao de protecao anti-DDoS do CDN; SQL injection: bloqueio de pedidos maliciosos no WAF, revisao de parametros de entrada |
| **Documentacao** | Timeline de impacto | Hora de inicio da indisponibilidade, numero de transacoes perdidas, acoes de mitigacao com tempos, comunicacoes enviadas |
| **Preparacao da recuperacao** | Avaliacao de danos | Quantas transacoes falharam? Houve comprometimento de dados de pagamento? Os backups estao intactos? |

**Como interpretar:**

*Este exemplo mostra que a reacao a um incidente nao e apenas tecnica. A notificacao de pessoal-chave inclui a equipa de negocio (para avaliar o impacto financeiro em tempo real) e a equipa de comunicacao (para gerir a percecao dos clientes). Na Black Friday, cada minuto de indisponibilidade representa receita perdida, o que aumenta a pressao para uma contencao rapida. A documentacao da timeline e essencial para calcular o impacto financeiro real e para futuras decisoes de investimento em seguranca.*

**Para refletir:**

- Porque e que a equipa de comunicacao e pessoal-chave neste incidente?
- Como justificaria o investimento em protecao anti-DDoS usando a documentacao deste incidente?
- Se o ataque SQL injection tivesse comprometido dados de cartoes de credito, que comunicacoes adicionais seriam obrigatorias?

---

### Exemplo 4 - Industria (Sistema de producao comprometido)

**Cenario:** Uma fabrica deteta que um sistema SCADA ligado a linha de producao foi comprometido. O sistema mostra comportamento anomalo: comandos nao solicitados estao a ser enviados para controladores de equipamento (PLCs).

| Fase | Acao | Detalhe |
|------|------|---------|
| **Notificacao** | Alerta de emergencia | Direcao de producao, engenharia industrial, seguranca informatica, seguranca fisica (risco para pessoas) |
| **Atribuicao** | Coordenacao TI + OT | Coordenador: CISO + Dir. Producao (decisao conjunta); Tecnico: equipa de seguranca + engenheiros de automacao; Seguranca fisica: avaliacao de risco para operadores |
| **Contencao** | Dilema critico | **Isolar o sistema SCADA?** Se sim: a producao para, mas o risco e eliminado. Se nao: a producao continua, mas comandos maliciosos podem danificar equipamento ou por pessoas em risco |
| **Documentacao** | Decisao critica registada | Justificacao da decisao de conter (ou nao), assinada pelo coordenador e pela direcao de producao |
| **Preparacao da recuperacao** | Avaliacao de integridade | Os PLCs receberam comandos que danificaram equipamento? O firmware esta intacto? E seguro reiniciar a producao? |

**Como interpretar:**

*Este e o cenario mais complexo: a contencao envolve um dilema real entre seguranca informatica e continuidade operacional. Isolar o sistema SCADA protege contra o ataque mas para a producao; nao isolar permite que o ataque continue com risco potencial para equipamento e pessoas. Esta decisao nao pode ser tomada apenas pela equipa de TI - requer envolvimento da direcao de producao e, possivelmente, da seguranca fisica. E um exemplo perfeito de contencao proporcional: a decisao depende do nivel de risco real. Se ha risco para pessoas, o isolamento e obrigatorio independentemente do custo operacional.*

**Para refletir:**

- Em que circunstancias justificaria manter o sistema SCADA em funcionamento apesar do comprometimento?
- Porque e que a decisao de contencao neste cenario deve ser documentada com especial cuidado?
- Que diferenca faz ter (ou nao ter) um playbook especifico para incidentes em ambientes OT (Operational Technology)?

---

## Exercicios

### Nivel 1 - Compreensao

#### Exercicio 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | A reacao a um incidente tem apenas dois objetivos: parar o incidente e recuperar os sistemas. |
| b) | A lista de alerta (alert roster) deve ser criada durante o incidente, com base na gravidade detetada. |
| c) | No modelo hierarquico de notificacao, cada nivel notifica o seguinte, o que permite maior velocidade. |
| d) | A documentacao do incidente so precisa de cobrir aspetos tecnicos (logs, sistemas, vulnerabilidades). |
| e) | A contencao extrema (shutdown total) e a abordagem recomendada para garantir seguranca maxima. |
| f) | Documentar durante o incidente e mais fiavel do que documentar apenas depois. |
| g) | A mensagem de alerta deve conter todos os detalhes tecnicos do incidente para que os destinatarios possam agir. |
| h) | Conter um incidente e o mesmo que erradica-lo. |

??? success "Solucao 1.1"

    | # | Resposta | Justificacao |
    |---|:--------:|-------------|
    | a) | **F** | A reacao tem **tres** objetivos: parar/conter, mitigar o impacto e preparar a recuperacao. O terceiro e essencial para que a recuperacao tenha base de informacao. |
    | b) | **F** | A lista de alerta deve ser criada e mantida **antes** do incidente. Durante uma crise nao ha tempo para procurar contactos ou decidir quem avisar. |
    | c) | **V** | No modelo hierarquico (calling tree), as notificacoes sao feitas em paralelo por diferentes nos, o que aumenta a velocidade. O risco e que se um no falha, o ramo inteiro fica sem notificacao. |
    | d) | **F** | A documentacao deve cobrir tambem **decisoes, comunicacoes, escalonamentos, impacto e acoes de mitigacao**. Nao e apenas tecnica. |
    | e) | **F** | O shutdown total e uma medida de **ultimo recurso**, extremamente disruptiva. A contencao deve ser **proporcional** a ameaca. |
    | f) | **V** | Documentar em tempo real garante tempos exatos, sequencia precisa e contexto das decisoes. Documentar depois introduz erros de memoria e omissoes. |
    | g) | **F** | A mensagem de alerta deve ser **curta e util**: gravidade, acao esperada, canal de coordenacao. Detalhes tecnicos excessivos podem confundir ou alarmar. |
    | h) | **F** | Conter significa **parar e limitar** o incidente. Erradicar significa **remover a causa raiz**. Sao fases distintas. |

---

#### Exercicio 1.2 - Associar acoes a fases da reacao

Associa cada acao a fase correta da reacao a um incidente.

**Fases:** Notificacao | Atribuicao de tarefas | Contencao | Documentacao | Preparacao da recuperacao

| # | Acao |
|---|------|
| a) | O coordenador de incidente envia uma mensagem de alerta ao CISO via Teams |
| b) | O analista tecnico regista a hora exata em que o servidor foi isolado |
| c) | A equipa define que o admin de sistemas sera responsavel pelo isolamento de rede |
| d) | O firewall e reconfigurado para bloquear trafego de um IP malicioso |
| e) | O analista verifica que backups do sistema afetado estao intactos |
| f) | E fotografado o ecra com a mensagem de erro para registo |
| g) | O helpdesk contacta os lideres de equipa conforme a lista de alerta |
| h) | A equipa identifica que 3 servidores adicionais comunicaram com o foco do incidente |

??? success "Solucao 1.2"

    | # | Acao | Fase |
    |---|------|------|
    | a) | Mensagem de alerta ao CISO | **Notificacao** - alertar pessoal-chave pelo canal definido |
    | b) | Registo da hora de isolamento | **Documentacao** - registar acoes com timestamps |
    | c) | Definir responsavel pelo isolamento | **Atribuicao de tarefas** - cada pessoa sabe o seu papel |
    | d) | Bloquear trafego malicioso no firewall | **Contencao** - limitar a progressao do incidente |
    | e) | Verificar integridade dos backups | **Preparacao da recuperacao** - criar condicoes para restaurar |
    | f) | Fotografar ecra com erro | **Documentacao** - registar evidencias visuais |
    | g) | Contactar lideres de equipa | **Notificacao** - ativar a cadeia de notificacao |
    | h) | Identificar servidores adicionais afetados | **Preparacao da recuperacao** (e tambem Contencao) - perceber o ambito para conter e depois recuperar |

---

### Nivel 2 - Aplicacao pratica

#### Exercicio 2.1 - Desenhar uma lista de alerta

**Cenario:** Uma empresa de contabilidade com 40 colaboradores sofre frequentemente tentativas de phishing. A empresa tem:

- Um responsavel de TI (que e tambem o responsavel de seguranca)
- Um diretor-geral
- Uma responsavel de comunicacao
- Um juridico externo (em outsourcing)
- Tres lideres de departamento (Contabilidade, Fiscal, Auditoria)

Desenha uma lista de alerta para esta organizacao, incluindo: nome/funcao, contacto primario, contacto secundario, substituto, ordem de escalonamento e modelo de notificacao (sequencial ou hierarquico).

??? success "Solucao 2.1"

    **Modelo recomendado: Hibrido** (hierarquico nos primeiros niveis, sequencial dentro de cada equipa)

    | Ordem | Funcao/Papel IRP | Contacto primario | Contacto sec. | Substituto | Notificado por |
    |:-----:|-----------------|-------------------|---------------|------------|----------------|
    | 1 | Responsavel TI/Seguranca (Coordenador) | Telemovel | Teams | Lider Contabilidade | Quem deteta o incidente |
    | 2 | Diretor-geral | Telemovel | Email | Responsavel TI | Coordenador |
    | 3 | Responsavel Comunicacao | Teams | Telemovel | Diretor-geral | Coordenador |
    | 4 | Juridico externo | Telemovel | Email | (segundo contacto no escritorio) | Coordenador |
    | 5 | Lider Contabilidade | Teams | Telemovel | Lider Fiscal | Coordenador |
    | 6 | Lider Fiscal | Teams | Telemovel | Lider Auditoria | Coordenador |
    | 7 | Lider Auditoria | Teams | Telemovel | Lider Contabilidade | Coordenador |

    **Justificacao do modelo hibrido:**

    *Com 40 colaboradores e um unico responsavel de TI/seguranca, o modelo sequencial puro seria adequado (a equipa de topo e pequena). No entanto, o coordenador notifica os lideres de departamento, e cada lider e responsavel por comunicar com a sua equipa (componente hierarquica). Isto poupa tempo ao coordenador e permite-lhe focar-se na gestao do incidente.*

    *O juridico externo deve estar na lista porque, em caso de comprometimento de dados de clientes (informacao fiscal/contabilistica), ha obrigacoes legais de notificacao (RGPD). Ter o contacto pre-definido evita atrasos criticos.*

---

#### Exercicio 2.2 - O que documentar e quando

**Cenario:** As 14h00, o SIEM de uma empresa de logistica deteta trafego anomalo a sair de um servidor de gestao de armazem. As 14h15, o analista confirma que o servidor esta a comunicar com um endereco IP conhecido como C2 (command and control) de uma botnet. As 14h30, o servidor e isolado da rede. As 14h45, descobre-se que os dados de inventario dos ultimos 7 dias podem ter sido exfiltrados.

Para cada momento, indica: o que documentar, quem deve documentar e porque e importante documentar naquele momento (e nao depois).

??? success "Solucao 2.2"

    | Hora | O que documentar | Quem documenta | Porque agora |
    |------|-----------------|----------------|--------------|
    | **14:00** | Alerta do SIEM: tipo, gravidade, sistema afetado, IP de destino, regra que disparou | Analista de seguranca | Os detalhes do alerta original sao a base de tudo. Se nao forem registados agora, perdem-se detalhes especificos. |
    | **14:15** | Confirmacao: IP C2 identificado (qual?), evidencia da comunicacao, classificacao como incidente confirmado, notificacoes feitas | Analista + Coordenador | A classificacao como incidente confirmado e um ponto de viragem. Documentar a evidencia que levou a esta classificacao e critico para auditoria. |
    | **14:30** | Isolamento: hora exata, metodo usado (desconexao fisica? VLAN? firewall?), quem autorizou, impacto no servico de armazem | Operador de sistemas + Coordenador | A decisao de isolar tem impacto operacional. Registar quem decidiu e porque e essencial para prestacao de contas e para a equipa de recuperacao saber o estado do sistema. |
    | **14:45** | Descoberta de possivel exfiltracao: que dados (inventario 7 dias), volume estimado, metodo de exfiltracao suspeitado, impacto no negocio | Analista + Coordenador | Esta informacao determina se ha obrigacoes legais de notificacao e alimenta diretamente a fase de recuperacao. Se documentada so depois, o volume e a natureza dos dados podem ser subestimados. |

---

#### Exercicio 2.3 - Escolher o nivel de contencao

Para cada cenario, indica o nivel de contencao adequado (cirurgico, amplo ou extremo) e justifica a escolha.

| # | Cenario |
|---|---------|
| a) | Uma unica conta de utilizador foi comprometida por phishing. O utilizador nao tem acessos privilegiados. |
| b) | Ransomware esta a propagar-se ativamente entre estacoes de trabalho num segmento de rede do departamento financeiro. |
| c) | Um worm esta a explorar uma vulnerabilidade zero-day e ja comprometeu servidores em 3 segmentos de rede diferentes. |
| d) | Um servidor web publico esta a ser usado para ataques de phishing contra terceiros (o servidor foi comprometido e esta a alojar paginas falsas). |
| e) | Detetada exfiltracao de dados de um servidor de base de dados, mas limitada a um unico ponto de saida na rede. |

??? success "Solucao 2.3"

    | # | Nivel | Justificacao |
    |---|-------|-------------|
    | a) | **Cirurgico** | Ambito restrito e bem identificado (uma conta, sem privilegios). Basta desativar a conta, fazer reset da password e invalidar sessoes. Nao e necessario isolar segmentos. |
    | b) | **Amplo** | O ransomware esta em propagacao ativa num segmento. Isolar o segmento de rede inteiro e necessario para impedir que chegue a outros departamentos. Contencao cirurgica (bloquear uma maquina) seria insuficiente porque o ransomware pode ja ter atingido outras estacoes. |
    | c) | **Extremo** | Worm com zero-day em 3 segmentos indica comprometimento generalizado. A propagacao e rapida e o patch pode nao estar disponivel. Pode justificar-se o isolamento total da rede ou mesmo shutdown para conter a propagacao. E uma decisao de ultimo recurso, mas o risco de inacao e superior ao dano da paragem. |
    | d) | **Cirurgico a amplo** | O servidor web deve ser isolado imediatamente (cirurgico). Se ha suspeita de que o atacante acedeu a outros sistemas a partir dele, pode ser necessario isolar o segmento DMZ (amplo). A urgencia e tambem legal/reputacional (a organizacao esta a ser usada como plataforma de ataque). |
    | e) | **Cirurgico a amplo** | Bloquear o ponto de saida (regra de firewall, bloqueio de IP) e contencao cirurgica. Se o servidor de base de dados pode ter sido comprometido de forma mais profunda, isolar o segmento onde ele reside e uma medida ampla prudente. A decisao depende da certeza sobre o ambito. |

---

### Nivel 3 - Analise

#### Exercicio 3.1 - Cenario completo: da detecao a contencao

**Cenario:** Es o coordenador de seguranca de uma empresa de desenvolvimento de software com 150 colaboradores. A empresa tem escritorios em Lisboa e no Porto, ligados por VPN site-to-site. O repositorio de codigo-fonte esta num servidor GitLab on-premises em Lisboa.

**Sequencia de eventos:**

- **09:00** - O SIEM deteta tentativas de autenticacao falhadas massivas contra o GitLab a partir de um IP na Russia
- **09:15** - Um developer do Porto reporta que nao consegue fazer push para o repositorio (erro de autenticacao)
- **09:25** - O admin de sistemas verifica os logs do GitLab e descobre que 5 contas de developer tiveram login bem-sucedido a partir do IP russo durante a madrugada
- **09:35** - Os logs mostram que foram feitos git clone de 3 repositorios que contem propriedade intelectual critica
- **09:45** - O admin descobre que uma das contas comprometidas tem acesso de administrador ao GitLab

Para cada momento, define:

1. Que acoes tomarias (notificacao, contencao, documentacao)
2. Quem notificarias e por que canal
3. Que nivel de contencao aplicarias e porque
4. O que documentarias

??? success "Solucao 3.1"

    **09:00 - Tentativas de autenticacao falhadas**

    - **Acoes:** Analisar o alerta - frequencia, IPs, contas-alvo. Neste ponto e um evento suspeito, ainda nao confirmado como incidente.
    - **Notificacao:** Nenhuma formal ainda. O analista investiga e prepara-se para escalar.
    - **Contencao:** Nenhuma ainda. Monitorizar e correlacionar.
    - **Documentacao:** Registar o alerta, hora, IPs, contas-alvo, regra SIEM que disparou.

    **09:15 - Developer nao consegue fazer push**

    - **Acoes:** Correlacionar com o alerta anterior. Verificar se a conta do developer esta bloqueada ou se o servidor esta sob pressao. A coincidencia temporal e suspeita.
    - **Notificacao:** Alertar o admin de sistemas para investigacao prioritaria.
    - **Contencao:** Ainda nao. Preciso de mais informacao.
    - **Documentacao:** Registar o relato do developer, hora, tipo de erro.

    **09:25 - 5 contas com login bem-sucedido do IP russo**

    - **Acoes:** **Incidente confirmado.** Ativar o IRP. As 5 contas tiveram login de um IP externo nao autorizado - comprometimento de credenciais confirmado.
    - **Notificacao:** Ativar lista de alerta: CEO/CTO (propriedade intelectual em risco), equipa de IR, DPO (possivel fuga de dados). Canal: chamada telefonica para CTO (urgencia), Teams para equipa de IR.
    - **Contencao cirurgica:** Desativar imediatamente as 5 contas comprometidas. Bloquear o IP russo no firewall. Invalidar todas as sessoes ativas do GitLab para essas contas.
    - **Documentacao:** Registar hora de confirmacao, contas comprometidas, IP, hora dos logins, decisao de classificar como incidente, notificacoes feitas.

    **09:35 - Git clone de 3 repositorios criticos**

    - **Acoes:** O incidente e mais grave do que inicialmente avaliado. Houve exfiltracao de propriedade intelectual. Escalar gravidade para **critica**.
    - **Notificacao:** Escalar para CEO. Contactar juridico (implicacoes de propriedade intelectual, possivel espionagem industrial). Informar CTO sobre os repositorios afetados.
    - **Contencao ampla:** Alem das contas ja bloqueadas, considerar restringir o acesso externo ao GitLab (desativar acesso VPN externo temporariamente, limitar acesso apenas a rede interna). Rever tokens de API e deploy keys.
    - **Documentacao:** Registar repositorios clonados, volumes de dados, hora dos clones, decisao de escalar gravidade, comunicacoes feitas.

    **09:45 - Conta com acesso de administrador comprometida**

    - **Acoes:** **Alerta maximo.** Uma conta de admin comprometida significa que o atacante pode ter modificado configuracoes, criado backdoors, acedido a todos os repositorios, ou modificado permissoes.
    - **Notificacao:** Re-escalar: toda a equipa de IR em modo de emergencia. Considerar contactar entidade externa de resposta a incidentes (CSIRT nacional ou empresa especializada) se a equipa interna nao tiver capacidade.
    - **Contencao ampla a extrema:** Desativar TODOS os acessos externos ao GitLab imediatamente. Auditar todas as alteracoes feitas pela conta de admin. Verificar se ha backdoors, utilizadores novos criados, chaves SSH adicionadas. Considerar colocar o servidor GitLab offline ate completar a auditoria.
    - **Documentacao:** Registar a descoberta, as acoes tomadas, a decisao de contencao (com justificacao), e o plano de proximos passos. Cada decisao deve ter timestamp e responsavel.

    **Conclusao:**

    *Este cenario demonstra como um incidente pode escalar rapidamente em gravidade e ambito. O que comecou como tentativas de login falhadas (evento suspeito) transformou-se em exfiltracao de propriedade intelectual com comprometimento de conta de administrador (incidente critico). Cada nova informacao exigiu reavaliacao da contencao: de nenhuma, para cirurgica, para ampla, potencialmente para extrema. A documentacao em cada momento e essencial nao so para a recuperacao mas tambem para possivel acao legal.*

---

## Armadilhas e confusoes a evitar

### Armadilha 1: Reagir sem documentar

> Reagir ao incidente sem documentar em tempo real significa perder informacao critica. "Depois escrevemos tudo" raramente resulta em documentacao completa e precisa.

Detalhes esquecidos, tempos imprecisos e decisoes sem contexto sao consequencias diretas de adiar a documentacao. A documentacao nao atrasa a resposta - garante que a resposta e util a longo prazo.

### Armadilha 2: Confundir contencao com erradicacao

> Conter e **parar e limitar**. Erradicar e **remover a causa**. Sao fases diferentes com objetivos diferentes.

Isolar um servidor da rede e contencao. Remover o malware do servidor e erradicacao. Restaurar os dados a partir de backup e recuperacao. Saltar passos cria o risco de o incidente reocorrer.

### Armadilha 3: Notificar toda a gente em vez de pessoal-chave

> A notificacao deve ser **direcionada** ao pessoal-chave, nao difundida para toda a organizacao.

Broadcast geral causa panico, desinformacao, perda de controlo sobre a narrativa e potencial fuga de informacao para o exterior. Notificar as pessoas certas, com a mensagem certa, pelo canal certo.

### Armadilha 4: Usar contencao extrema por precaucao

> O shutdown total e uma decisao de **ultimo recurso**. Usa-lo "por precaucao" causa paragem desnecessaria e pode ser mais prejudicial do que o proprio incidente.

A contencao deve ser proporcional. Desligar toda a rede porque uma conta foi comprometida e desproporcional. Avaliar o ambito antes de decidir o nivel de contencao.

### Armadilha 5: Lista de alerta desatualizada

> Uma lista de alerta com contactos antigos, pessoas que mudaram de funcao ou substitutos que ja nao existem pode ser pior do que nao ter lista - cria uma falsa sensacao de seguranca.

A lista de alerta deve ser revista e testada regularmente (pelo menos trimestralmente). Uma lista que ninguem atualiza nao funciona quando e precisa.

### Armadilha 6: Documentacao narrativa em vez de factual

> A documentacao deve ser **objetiva, cronologica e factual**. Nao e um relatorio narrativo nem uma historia com interpretacoes subjetivas.

"Achamos que o atacante provavelmente estava a tentar roubar dados" nao e documentacao factual. "As 09:35, os logs do GitLab mostram operacoes git clone de 3 repositorios a partir do IP 203.x.x.x" e documentacao factual.

### Armadilha 7: Reagir destroi evidencias

> Acoes precipitadas de contencao podem destruir evidencias essenciais para a investigacao e para a recuperacao.

Formatar um disco, reinstalar um sistema operativo ou desligar uma maquina pode destruir informacao volatil (processos em execucao, ligacoes de rede, conteudo da memoria RAM) que seria critica para perceber o que aconteceu e o que foi afetado.

### Armadilha 8: A velocidade como desculpa para a desorganizacao

> A urgencia de um incidente nao justifica a falta de coordenacao. A velocidade vem da preparacao (playbooks, treino, equipas definidas), nao da improvisacao.

Quando alguem diz "nao houve tempo para documentar" ou "nao deu para seguir o procedimento", o problema normalmente nao e a falta de tempo - e a falta de preparacao.

### Armadilha 9: Conter sem perceber o ambito

> Decidir a contencao sem primeiro perceber o que esta em jogo pode levar a acoes insuficientes (conter muito pouco) ou excessivas (conter demais).

Antes de conter, investir alguns minutos em perceber o ambito: que ativos, que contas, que comunicacoes, que segmentos. Essa informacao determina se a contencao deve ser cirurgica, ampla ou extrema.

### Armadilha 10: Mensagem de alerta com demasiada ou pouca informacao

> A mensagem de alerta deve ser **equilibrada**: suficiente para que o destinatario saiba o que se passa e o que fazer, mas sem detalhes excessivos que confundam ou atrasem.

Uma mensagem de alerta que diz apenas "ha um incidente, vem ja" nao da contexto. Uma mensagem com 3 paragrafos de detalhes tecnicos nao sera lida em situacao de urgencia.

---

## Resumo rapido

### Tabela de conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| **Tres objetivos da reacao** | Parar/conter, mitigar impacto, preparar recuperacao |
| **Tres reflexos obrigatorios** | Notificar pessoal-chave, atribuir tarefas, documentar |
| **Lista de alerta (alert roster)** | Lista pre-definida de quem notificar, como, por quem e com que mensagem |
| **Modelo sequencial** | Uma pessoa notifica todos, um a um - mais controlado, mais lento |
| **Modelo hierarquico** | Notificacao em arvore, cada nivel notifica o seguinte - mais rapido, mais risco |
| **Documentacao do incidente** | Registo oficial, demonstracao de diligencia, base para formacao futura |
| **Documentacao em tempo real** | Documentar durante o incidente, nao apenas depois |
| **Contencao cirurgica** | Intervencao precisa e localizada (conta, IP, regra) |
| **Contencao ampla** | Isolamento de segmentos de rede, restricao de comunicacoes |
| **Contencao extrema** | Shutdown total - ultimo recurso, decisao muito seria |
| **Proporcionalidade** | A contencao deve ser proporcional a ameaca, sem danos desnecessarios |
| **Conter vs erradicar vs recuperar** | Tres fases distintas: parar, remover causa, restaurar |

### Frases-chave para recordar

- *"A reacao nao e so apagar o fogo. E tambem perceber o que ardeu, o que ainda pode arder e o que sera preciso reconstruir."*
- *"Reagir rapidamente nao significa reagir caoticamente. Rapido significa agil, coordenado e baseado em procedimentos."*
- *"A velocidade vem da preparacao, nao da precipitacao."*
- *"A mensagem de alerta nao e um relatorio. E um gatilho para acao."*
- *"Documentar um incidente nao e burocracia. E a diferenca entre uma organizacao que aprende e uma que repete os mesmos erros."*
- *"A documentacao deve ser feita durante o incidente, nao apenas depois."*
- *"A contencao deve ser proporcional a ameaca. Conter com proporcionalidade significa proteger sem causar danos desnecessarios."*
- *"Conter nao e erradicar. Erradicar nao e recuperar. Sao tres fases distintas."*
- *"Uma lista de alerta desatualizada pode ser pior do que nao ter lista - cria uma falsa sensacao de seguranca."*

### Diagrama de sintese

```
  REACAO A INCIDENTES - VISAO GLOBAL
  ════════════════════════════════════

  INCIDENTE CONFIRMADO
         │
         ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                     ACOES IMEDIATAS                              │
  │                                                                  │
  │  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
  │  │ NOTIFICAR  │  │ ATRIBUIR   │  │ DOCUMENTAR │                │
  │  │ pessoal-   │  │ tarefas    │  │ em tempo   │                │
  │  │ chave      │  │            │  │ real       │                │
  │  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘                │
  │        │               │               │                        │
  │        ▼               ▼               ▼                        │
  │  Lista de alerta  Coordenador     Registo oficial               │
  │  (sequencial ou   + papeis        Diligencia                    │
  │   hierarquico)    definidos       Formacao futura               │
  └──────────────────────────┬───────────────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                     CONTENCAO                                    │
  │                                                                  │
  │  1. Perceber o ambito (ativos, contas, sistemas, rede)          │
  │  2. Escolher nivel proporcional:                                 │
  │                                                                  │
  │     Cirurgico ──────── Amplo ──────── Extremo                   │
  │     (conta/IP/regra)  (segmento/VLAN) (shutdown total)          │
  │     Uso frequente      Uso ocasional   Ultimo recurso            │
  │                                                                  │
  │  3. Conter ≠ Erradicar ≠ Recuperar                              │
  └──────────────────────────┬───────────────────────────────────────┘
                             │
                             ▼
  ┌──────────────────────────────────────────────────────────────────┐
  │                PREPARAR RECUPERACAO                               │
  │                                                                  │
  │  Recolher informacao: ambito, dados afetados, estado dos         │
  │  sistemas, backups, evidencias ──► alimentar a fase seguinte     │
  └──────────────────────────────────────────────────────────────────┘
```

---

*Proximo capitulo: [Recuperacao de incidentes](recuperacao.md)*
