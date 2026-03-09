# Reação a Incidentes

## Índice

1. [Ações imediatas](#acoes-imediatas)
2. [Notificação de pessoal-chave](#notificacao-de-pessoal-chave)
3. [Documentação do incidente](#documentacao-do-incidente)
4. [Estratégias de contenção](#estrategias-de-contencao)
5. [Exemplos práticos](#exemplos-praticos)
6. [Exercícios](#exercicios)
7. [Armadilhas e confusões a evitar](#armadilhas-e-confusoes-a-evitar)
8. [Resumo rápido](#resumo-rapido)

---

## Ações imediatas

Quando um incidente é confirmado, a organização entra numa fase crítica: a **reação**. Reagir bem não é apenas "fazer alguma coisa rapidamente". E executar ações coordenadas, com propósito claro, que protejam a organização é criem condicoes para a recuperação posterior.

### Os três objetivos da reação

A reação a um incidente confirmado tem três objetivos fundamentais:

| Objetivo | Descricao | Porque e importante |
|----------|-----------|---------------------|
| **Parar e conter** | Travar a progressao do incidente, impedir que se alastre | Sem contenção, o impacto cresce a cada minuto que passa |
| **Mitigar o impacto** | Reduzir os danos já causados ou em curso | Proteger o que ainda pode ser protegido |
| **Preparar a recuperação** | Recolher informação é criar condicoes para restaurar sistemas | Sem está base, a recuperação será cega e arriscada |

O terceiro objetivo é frequentemente esquecido: **reagir mal, sem recolher informação, deixa a organização sem base para perceber o âmbito do incidente**, o que foi afetado e o que precisa de ser restaurado. Uma reação que resolve o sintoma mas destrói evidências pode criar problemas maiores na fase de recuperação.

> A reação não é só "apagar o fogo". E também perceber o que ardeu, o que ainda pode arder e o que será preciso reconstruir.

---

### Os três reflexos obrigatórios

Quando o incidente é confirmado, três coisas devem acontecer rapidamente e em paralelo:

1. **Notificação de pessoal-chave** - alertar as pessoas certas, pelos canais certos, com a informação certa
2. **Atribuicao de tarefas** - cada pessoa sabe o que fazer e quem coordena
3. **Documentação do incidente** - registar tudo desde o primeiro momento

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

Estes cinco passos não são estritamente sequenciais na prática - vários decorrem em paralelo. Mas a lógica e clara: **primeiro saber quem atua, depois atuar, e durante todo o processo, documentar**.

---

### Velocidade com método

> Reagir rapidamente não significa reagir caoticamente. "Rápido" significa agil, coordenado e baseado em procedimentos - não improvisado, desordenado ou em pânico.

A urgência de um incidente pode criar pressão para "fazer qualquer coisa já". Mas ações descoordenadas podem agravar o problema:

| Reação rápida e coordenada | Reação rápida e caotica |
|---------------------------|------------------------|
| A equipa segue o playbook | Cada pessoa faz o que acha melhor |
| Ha um coordenador que decide | Várias pessoas tomam decisões contraditorias |
| As ações são registadas | Ninguem documenta nada |
| A contenção é proporcional | Desligam-se sistemas sem avaliar impacto |
| As evidências são preservadas | Evidências são destruidas por ações precipitadas |
| A recuperação é possível | A recuperação é comprometida |

**A velocidade vem da preparação, não da precipitacao.** Uma equipa que treinou, que tem playbooks escritos e que sabe quem faz o que, consegue agir em minutos sem cair no caos.

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

## Notificação de pessoal-chave

### A lista de alerta (alert roster)

A **lista de alerta** (alert roster) e uma lista pré-definida que responde a cinco perguntas essenciais:

- **Quem** deve ser notificado?
- **Como** (por que canal)?
- **Por quem** (quem inicia a notificação)?
- **Com que mensagem** inicial?
- **Em que ordem**?

Esta lista deve existir **antes** do incidente. Não se procura números de telefone nem se decide quem avisar durante uma crise.

| Campo | Descricao | Exemplo |
|-------|-----------|---------|
| **Nome** | Identificação da pessoa | Ana Silva |
| **Função/Papel** | Papel no IRP (não apenas o cargo) | Coordenadora de incidente |
| **Contacto primário** | Canal preferencial de contacto | +351 912 345 678 (telemóvel) |
| **Contacto secundário** | Canal alternativo | ana.silva@org.pt (email) |
| **Substituto** | Quem assume se a pessoa não estiver disponível | Pedro Costa |
| **Ordem de escalonamento** | Posicao na cadeia de notificação | 1.o nível |
| **Turno/Disponibilidade** | Quando está disponível | Dias uteis 08h-18h |
| **Notas** | Informação relevante (ferias, licenca, restricoes) | Ausente 15-30 Ago |

A lista de alerta **deve ser mantida atualizada**. Numeros mudam, pessoas mudam de função, substitutos desaparecem. Uma lista desatualizada pode ser pior do que não ter lista nenhuma - cria uma falsa sensacao de segurança.

---

### Modelo sequencial vs hierárquico

Existem dois modelos principais para ativar a cadeia de notificação:

#### Modelo sequencial (sequential roster)

Uma única pessoa contacta todos os elementos da lista, um a um, por ordem.

#### Modelo hierárquico (calling tree)

Uma pessoa contacta um grupo restrito, e cada elemento desse grupo contacta outros, formando uma árvore de chamadas.

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

| Critério | Modelo sequencial | Modelo hierárquico |
|----------|-------------------|---------------------|
| **Controlo** | Alto - uma pessoa gere toda a comunicação | Medio - a mensagem pode sofrer alterações em cada nível |
| **Velocidade** | Mais lento - uma pessoa de cada vez | Mais rápido - notificações em paralelo |
| **Risco de falha** | Baixo - se um contacto falha, o notificador passa ao seguinte | Maior - se um no intermediario falha, todo o ramo fica sem notificação |
| **Consistencia da mensagem** | Alta - todos recebem a mesma mensagem | Variavel - a mensagem pode ser reinterpretada |
| **Quando usar** | Equipas pequenas, incidentes de gravidade média | Equipas grandes, incidentes críticos que exigem mobilizacao rápida |
| **Complexidade** | Simples de implementar e testar | Requer planeamento e treino dos nos intermediarios |

**Na prática**, muitas organizações usam um modelo **hibrido**: o coordenador notifica os lideres de equipa (hierárquico), e cada lider notifica a sua equipa (sequencial dentro do grupo).

---

### A mensagem de alerta

A mensagem de alerta não precisa de ser longa. Precisa de ser **curta, clara e útil**. O objetivo é que cada pessoa que a recebe saiba imediatamente:

- Que **há um incidente** em curso
- Qual a **gravidade inicial** estimada
- O que é **esperado dela** (ativar-se, deslocar-se, ficar de prevenao)
- Que **plano ou papel** deve ativar

> A mensagem de alerta não é um relatório. E um gatilho para ação.

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

- Não deve ser difundida para toda a organização (notificar pessoal-**chave**, não fazer broadcast)
- Não deve conter detalhes técnicos excessivos que possam confundir ou alarmar
- Não deve usar linguagem ambigua ("parece que pode haver algo")
- Não deve omitir o que se espera do destinatario

---

### Canais modernos de notificação

A notificação já não se limita a telefonemas e emails. Existem múltiplos canais com diferentes vantagens e limitações:

| Canal | Tipo | Vantagem | Limitacao |
|-------|------|----------|-----------|
| **Plataforma de gestão de incidentes** (ex: PagerDuty, Opsgenie) | Automatizado | Escalonamento automático, rastreabilidade, integração com SIEM | Custo, dependência de infraestrutura |
| **Sistemas de paging** | Automatizado | Fiavel, funciona sem internet | Limitado em conteúdo da mensagem |
| **Teams / Slack** | Colaborativo | Canal dedicado, histórico, partilha de ficheiros | Pode ser ignorado fora de horario |
| **SMS** | Direto | Alcance universal, funciona sem internet | Sem confirmacao de leitura, limite de caracteres |
| **Chamada telefonica** | Direto | Confirmacao imediata, permite dialogo | Demorado para múltiplas pessoas, sem registo escrito |
| **Aplicacoes de on-call** (ex: VictorOps) | Automatizado | Rotacao de turnos, escalonamento, métricas | Custo, dependência de app |
| **SIEM/SOAR** | Automatizado | Alerta automático baseado em regras, integração com resposta | Requer configuração e manutenção |
| **Email** | Assincrono | Registo formal, detalhado | Lento, pode ir para spam, sem garantia de leitura rápida |

A escolha do canal depende da urgência, do horario e do tipo de incidente. A maioria das organizações usa **uma combinacao de canais**: alerta automático via plataforma de incidentes + canal colaborativo para coordenação + chamada telefonica para escalonamento crítico.

---

## Documentação do incidente

### Porque documentar

A documentação durante um incidente serve **três propositos distintos**, todos igualmente importantes:

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

**Proposito 1 - Registo oficial:** A documentação deve permitir **reconstituir** o incidente: o que aconteceu, como aconteceu, que ações foram tomadas, quem fez o que, quando, onde, porque e como foi tratado.

**Proposito 2 - Demonstracao de diligencia:** A documentação **prova** que a organização agiu de forma responsável. Isto e crítico para auditoria, governanca corporativa, prestacao de contas (accountability), responsabilidade legal e comunicação com entidades externas (ex: CNPD, reguladores).

**Proposito 3 - Reutilizacao para formação:** Incidentes bem documentados tornam-se os **casos de treino de amanha**. Alimentam lições aprendidas, revisao de playbooks e exercícios de simulação.

---

### O que registar

A documentação de um incidente não é apenas técnica. Deve cobrir **decisões, comunicações, escalonamentos, impacto é ações de mitigação**.

| Campo | Descricao | Exemplo |
|-------|-----------|---------|
| **Data e hora** | Quando ocorreu cada evento ou ação (com fuso horario) | 2026-03-09 09:15 UTC |
| **Fonte de deteção** | Como foi detetado o incidente | Alerta SIEM, relato de utilizador, helpdesk |
| **Descricao do evento** | O que foi observado, de forma factual | "Detetadas 500 tentativas de login falhadas na VPN em 10 minutos" |
| **Classificação** | Tipo é gravidade do incidente | Comprometimento de credenciais, gravidade Alta |
| **Ativos afetados** | Que sistemas, dados ou processos foram impactados | Servidor de ficheiros FS01, contas do domínio AD |
| **Ações tomadas** | Que ações de contenção/mitigação foram executadas | Conta bloqueada, segmento de rede isolado |
| **Decisoes** | Que decisões foram tomadas e por quem | "Decisão de isolar o segmento tomada pelo coordenador as 09:30" |
| **Comunicacoes** | Que comunicações internas e externas foram feitas | Direcao informada as 09:45, CNPD notificada as 11:00 |
| **Escalonamento** | Se o incidente foi escalado, para quem e quando | Escalado para CISO as 09:35 devido a gravidade |
| **Impacto** | Impacto real observado (operacional, financeiro, reputacional) | 200 utilizadores sem acesso ao email durante 3 horas |
| **Estado** | Estado atual do incidente | Em contenção / Contido / Em recuperação / Encerrado |
| **Responsável** | Quem e o responsável pela ação ou decisão | Ana Silva (coordenadora de incidente) |

---

### Quando documentar

> A documentação deve ser feita **durante** o incidente, não apenas depois.

Este principio e absolutamente crítico e frequentemente violado. As razões são claras:

| Se documentar durante | Se documentar só depois |
|----------------------|------------------------|
| Tempos exatos e registados | Tempos são aproximados ou esquecidos |
| Decisoes são registadas com contexto | Decisoes perdem o contexto original |
| Sequencia de eventos e precisa | Sequencia e reconstruida de memoria (com erros) |
| Detalhes técnicos são capturados | Detalhes técnicos são esquecidos ou simplificados |
| Comunicacoes são rastreadas | Comunicacoes são omitidas ou distorcidas |

**Na prática**, isto significa que deve existir alguem (ou um processo) dedicado a registar eventos em tempo real. Em equipas maiores, pode haver um **escriba** (scribe) dedicado. Em equipas menores, cada pessoa regista as suas ações num canal ou documento partilhado.

Ferramentas uteis para documentação em tempo real:

- Canal dedicado no Teams/Slack (com timestamps automáticos)
- Documento partilhado (Google Docs, Confluence, Wiki)
- Plataforma de gestão de incidentes com timeline integrada
- Folha de registo estruturada (mesmo em papel, se necessário)

---

### Documentação não é burocracia

> Documentar um incidente não é burocracia. E a diferença entre uma organização que aprende e melhora, e uma que repete os mesmos erros.

A documentação deve ser:

- **Objetiva** - factos, não opinioes ("o servidor foi isolado as 09:30", não "achamos que seria melhor isolar")
- **Cronologica** - ordenada no tempo, com timestamps
- **Clara** - linguagem direta, sem ambiguidades
- **Factual** - o que realmente aconteceu, não o que deveria ter acontecido

A documentação **não é uma narrativa** literaria. E um registo factual que permite a qualquer pessoa reconstituir o que aconteceu, mesmo meses depois.

---

## Estratégias de contenção

### Primeiro: perceber o âmbito

Antes de conter, e essencial **perceber o que está em jogo**. Conter sem perceber o âmbito e como tentar apagar um incêndio sem saber onde está o fogo.

As perguntas críticas antes de conter:

- **Que ativos foram comprometidos?** (servidores, estacoes de trabalho, aplicações, dados)
- **Que contas estão envolvidas?** (utilizadores, contas de serviço, contas privilegiadas)
- **Com que sistemas comunicou o foco inicial?** (movimentacao lateral, exfiltração)
- **Qual e o âmbito?** Uma estacao? Um servidor? Uma aplicação? Um segmento de rede? Toda a rede?

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

O âmbito determina o **nível de contenção** adequado. Conter demasiado causa paragem desnecessaria. Conter de menos permite que o incidente se propague.

---

### Níveis de contenção

O objetivo da contenção é **parar o incidente é recuperar o controlo**. Não é "voltar ao normal" - isso é recuperação. A contenção tem níveis crescentes de agressividade:

| Nível | Ações tipicas | Quando usar | Risco |
|-------|--------------|-------------|-------|
| **Cirurgico** | Desativar contas comprometidas, reconfigurar regras de firewall, bloquear tráfego específico, revogar tokens de acesso | Âmbito restrito e bem identificado, incidente contido a poucos ativos | Baixo - intervencao precisa com impacto mínimo na operação |
| **Amplo** | Isolar segmentos de rede inteiros, restringir comunicações entre VLANs, bloquear acesso remoto (VPN), desativar serviços partilhados | Âmbito médio ou incerto, suspeita de movimentacao lateral, vários sistemas potencialmente afetados | Medio - afeta a operação de equipas e serviços no segmento isolado |
| **Extremo** | Parar todos os computadores e dispositivos de rede, desligar a ligação a internet, shutdown total da infraestrutura | Ameaça crítica e generalizada, risco iminente de dano catastrofico (ex: ransomware em propagação rápida por toda a rede) | Muito alto - paragem total da organização, decisão de último recurso |

---

### Contenção proporcional

> A contenção deve ser proporcional a ameaça. Conter com proporcionalidade significa proteger a organização sem causar danos desnecessarios.

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

O **shutdown total** e uma decisão rara e extremamente seria. Implica paragem completa da organização é só se justifica quando o risco de não o fazer e superior ao dano causado pela paragem. Na maioria dos incidentes, a contenção cirurgica ou ampla e suficiente.

**Principio fundamental:** Antes de agir, perguntar:

- Esta ação é **proporcional** a ameaça identificada?
- O **dano da contenção** e inferior ao **dano do incidente** se não contido?
- Ha uma **alternativa menos disruptiva** que alcance o mesmo objetivo?

---

### Conter não é erradicar não é recuperar

E fundamental distinguir três fases que são frequentemente confundidas:

| Fase | Objetivo | O que se faz | Analogia |
|------|----------|-------------|----------|
| **Contenção** | Parar e limitar | Isolar, bloquear, restringir - impedir que o incidente se alastre ou agrave | Fechar as portas para o fogo não passar para outras divisoes |
| **Erradicação** | Remover a causa | Eliminar malware, corrigir vulnerabilidades, fechar vetores de ataque | Extinguir o fogo completamente |
| **Recuperação** | Restaurar operações | Restaurar backups, validar integridade, repor serviços, monitorizar | Reconstruir o que o fogo danificou |

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

**Erro comum:** Saltar diretamente da contenção para a recuperação, sem erradicar. Restaurar um sistema sem remover a causa raiz significa que o incidente pode reocorrer imediatamente.

---

## Exemplos práticos

### Exemplo 1 - Universidade (Phishing com comprometimento de conta)

**Cenário:** Uma universidade deteta que um funcionario administrativo clicou num link de phishing e introduziu as suas credenciais numa página falsa. O atacante acedeu a conta de email e a plataforma de gestão académica.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Notificação** | Alerta ao coordenador de incidente | O helpdesk reporta o caso ao responsável de segurança; ativa-se a lista de alerta |
| **Atribuicao** | Definicao de papeis | Coordenador: resp. segurança; Analista: admin. sistemas; Comunicação: gabinete de comunicação |
| **Contenção** | Bloqueio imediato da conta | Reset de password, invalidacao de sessões, bloqueio de acesso a plataforma académica |
| **Documentação** | Registo cronológico | Hora de deteção, hora de bloqueio, sistemas acedidos, ações tomadas |
| **Preparacao da recuperação** | Recolha de informação | Análise dos logs de acesso: que dados foram consultados? Houve exfiltração? Que alunos afetados? |

**Como interpretar:**

*Este caso mostra a importância de reagir de forma coordenada a um incidente aparentemente simples. O phishing pode parecer banal, mas o comprometimento de uma conta com acesso a dados académicos de alunos levanta questões serias de confidencialidade e de RGPD. A contenção é cirurgica (bloquear uma conta), mas a documentação é a recolha de informação são críticas para avaliar o verdadeiro impacto.*

**Para refletir:**

- Porque e que é importante documentar que dados foram acedidos, mesmo que a conta já tenha sido bloqueada?
- Que comunicação seria necessária se se confirmasse que dados pessoais de alunos foram acedidos pelo atacante?
- Como poderia a universidade prevenir este tipo de incidente no futuro?

---

### Exemplo 2 - Hospital (Malware num servidor clínico)

**Cenário:** Um hospital deteta atividade suspeita num servidor que aloja registos clínicos de pacientes. O EDR assinala processos anómalos e comunicações com um endereco IP externo desconhecido.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Notificação** | Alerta hierárquico crítico | CISO notificado imediatamente; direcao clínica avisada; equipa de IR mobilizada; DPO contactado (dados de saúde) |
| **Atribuicao** | Coordenação multidisciplinar | Coordenador: CISO; Técnico: admin. sistemas + segurança; Clínico: direcao médica; Legal: DPO |
| **Contenção** | Isolamento proporcional | Servidor isolado da rede (contenção cirurgica); serviços clínicos críticos redirecionados para sistemas alternativos; acesso ao servidor bloqueado |
| **Documentação** | Registo detalhado | Timeline completa, comunicações com direcao clínica, decisão de isolamento com justificação, impacto nos serviços clínicos |
| **Preparacao da recuperação** | Análise de âmbito | Que registos clínicos estão no servidor? O malware propagou-se? Que dados podem ter sido exfiltrados? Backups intactos? |

**Como interpretar:**

*Este cenário ilustra a complexidade da coordenação quando o incidente envolve dados críticos (saúde). A contenção deve ser rápida mas proporcional: isolar o servidor é essencial, mas garantir que os serviços clínicos continuam a funcionar e igualmente prioritário. A notificação envolve não só a equipa técnica mas também a direcao clínica (porque os serviços médicos são afetados) e o DPO (porque dados de saúde estão em causa). A documentação é especialmente crítica neste contexto por exigencias regulatorias (RGPD, legislacao de saúde).*

**Para refletir:**

- Porque e que a direcao clínica deve ser envolvida na decisão de contenção, e não apenas a equipa técnica?
- Que consequências legais pode ter o hospital se não documentar adequadamente este incidente?
- Se o malware se tivesse propagado para sistemas de suporte a vida, que nível de contenção seria adequado?

---

### Exemplo 3 - E-commerce (Checkout indisponível)

**Cenário:** Uma plataforma de e-commerce deteta que o sistema de checkout está em baixo durante a Black Friday. Os logs mostram indicios de um ataque combinado: DDoS no frontend e tentativa de SQL injection no backend de pagamentos.

| Fase | Ação | Detalhe |
|------|------|---------|
| **Notificação** | Alerta multi-equipa | Equipa de operações (infraestrutura), equipa de negocio (impacto comercial), equipa de comunicação (clientes e imprensa) |
| **Atribuicao** | Resposta paralela | Ops: mitigação DDoS + investigação SQL injection; Negocio: avaliação de perda de receita; Comunicação: mensagem para clientes no site e redes sociais |
| **Contenção** | Mitigação em dois níveis | DDoS: ativacao de proteção anti-DDoS do CDN; SQL injection: bloqueio de pedidos maliciosos no WAF, revisao de parâmetros de entrada |
| **Documentação** | Timeline de impacto | Hora de início da indisponibilidade, número de transações perdidas, ações de mitigação com tempos, comunicações enviadas |
| **Preparacao da recuperação** | Avaliação de danos | Quantas transações falharam? Houve comprometimento de dados de pagamento? Os backups estão intactos? |

**Como interpretar:**

*Este exemplo mostra que a reação a um incidente não é apenas técnica. A notificação de pessoal-chave inclui a equipa de negocio (para avaliar o impacto financeiro em tempo real) e a equipa de comunicação (para gerir a percecao dos clientes). Na Black Friday, cada minuto de indisponibilidade representa receita perdida, o que aumenta a pressão para uma contenção rápida. A documentação da timeline e essencial para calcular o impacto financeiro real e para futuras decisões de investimento em segurança.*

**Para refletir:**

- Porque e que a equipa de comunicação é pessoal-chave neste incidente?
- Como justificaria o investimento em proteção anti-DDoS usando a documentação deste incidente?
- Se o ataque SQL injection tivesse comprometido dados de cartoes de crédito, que comunicações adicionais seriam obrigatórias?

---

### Exemplo 4 - Industria (Sistema de produção comprometido)

**Cenário:** Uma fabrica deteta que um sistema SCADA ligado a linha de produção foi comprometido. O sistema mostra comportamento anómalo: comandos não solicitados estão a ser enviados para controladores de equipamento (PLCs).

| Fase | Ação | Detalhe |
|------|------|---------|
| **Notificação** | Alerta de emergência | Direcao de produção, engenharia industrial, segurança informatica, segurança física (risco para pessoas) |
| **Atribuicao** | Coordenação TI + OT | Coordenador: CISO + Dir. Produção (decisão conjunta); Técnico: equipa de segurança + engenheiros de automacao; Segurança física: avaliação de risco para operadores |
| **Contenção** | Dilema crítico | **Isolar o sistema SCADA?** Se sim: a produção para, mas o risco é eliminado. Se não: a produção contínua, mas comandos maliciosos podem danificar equipamento ou por pessoas em risco |
| **Documentação** | Decisão crítica registada | Justificação da decisão de conter (ou não), assinada pelo coordenador é pela direcao de produção |
| **Preparacao da recuperação** | Avaliação de integridade | Os PLCs receberam comandos que danificaram equipamento? O firmware está intacto? E seguro reiniciar a produção? |

**Como interpretar:**

*Este e o cenário mais complexo: a contenção envolve um dilema real entre segurança informatica e continuidade operacional. Isolar o sistema SCADA protege contra o ataque mas para a produção; não isolar permite que o ataque continue com risco potencial para equipamento e pessoas. Esta decisão não pode ser tomada apenas pela equipa de TI - requer envolvimento da direcao de produção e, possivelmente, da segurança física. E um exemplo perfeito de contenção proporcional: a decisão depende do nível de risco real. Se há risco para pessoas, o isolamento e obrigatório independentemente do custo operacional.*

**Para refletir:**

- Em que circunstâncias justificaria manter o sistema SCADA em funcionamento apesar do comprometimento?
- Porque e que a decisão de contenção neste cenário deve ser documentada com especial cuidado?
- Que diferença faz ter (ou não ter) um playbook específico para incidentes em ambientes OT (Operational Technology)?

---

## Exercícios

### Nível 1 - Compreensao

#### Exercício 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | A reação a um incidente tem apenas dois objetivos: parar o incidente é recuperar os sistemas. |
| b) | A lista de alerta (alert roster) deve ser criada durante o incidente, com base na gravidade detetada. |
| c) | No modelo hierárquico de notificação, cada nível notifica o seguinte, o que permite maior velocidade. |
| d) | A documentação do incidente só precisa de cobrir aspetos técnicos (logs, sistemas, vulnerabilidades). |
| e) | A contenção extrema (shutdown total) e a abordagem recomendada para garantir segurança máxima. |
| f) | Documentar durante o incidente é mais fiável do que documentar apenas depois. |
| g) | A mensagem de alerta deve conter todos os detalhes técnicos do incidente para que os destinatarios possam agir. |
| h) | Conter um incidente é o mesmo que erradica-lo. |

??? success "Solução 1.1"

    | # | Resposta | Justificação |
    |---|:--------:|-------------|
    | a) | **F** | A reação tem **três** objetivos: parar/conter, mitigar o impacto é preparar a recuperação. O terceiro e essencial para que a recuperação tenha base de informação. |
    | b) | **F** | A lista de alerta deve ser criada e mantida **antes** do incidente. Durante uma crise não há tempo para procurar contactos ou decidir quem avisar. |
    | c) | **V** | No modelo hierárquico (calling tree), as notificações são feitas em paralelo por diferentes nos, o que aumenta a velocidade. O risco é que se um no falha, o ramo inteiro fica sem notificação. |
    | d) | **F** | A documentação deve cobrir também **decisões, comunicações, escalonamentos, impacto é ações de mitigação**. Não é apenas técnica. |
    | e) | **F** | O shutdown total e uma medida de **último recurso**, extremamente disruptiva. A contenção deve ser **proporcional** a ameaça. |
    | f) | **V** | Documentar em tempo real garante tempos exatos, sequencia precisa e contexto das decisões. Documentar depois introduz erros de memoria e omissoes. |
    | g) | **F** | A mensagem de alerta deve ser **curta e útil**: gravidade, ação esperada, canal de coordenação. Detalhes técnicos excessivos podem confundir ou alarmar. |
    | h) | **F** | Conter significa **parar e limitar** o incidente. Erradicar significa **remover a causa raiz**. São fases distintas. |

---

#### Exercício 1.2 - Associar ações a fases da reação

Associa cada ação a fase correta da reação a um incidente.

**Fases:** Notificação | Atribuicao de tarefas | Contenção | Documentação | Preparacao da recuperação

| # | Ação |
|---|------|
| a) | O coordenador de incidente envia uma mensagem de alerta ao CISO via Teams |
| b) | O analista técnico regista a hora exata em que o servidor foi isolado |
| c) | A equipa define que o admin de sistemas será responsável pelo isolamento de rede |
| d) | O firewall e reconfigurado para bloquear tráfego de um IP malicioso |
| e) | O analista verifica que backups do sistema afetado estão intactos |
| f) | E fotografado o ecrã com a mensagem de erro para registo |
| g) | O helpdesk contacta os lideres de equipa conforme a lista de alerta |
| h) | A equipa identifica que 3 servidores adicionais comunicaram com o foco do incidente |

??? success "Solução 1.2"

    | # | Ação | Fase |
    |---|------|------|
    | a) | Mensagem de alerta ao CISO | **Notificação** - alertar pessoal-chave pelo canal definido |
    | b) | Registo da hora de isolamento | **Documentação** - registar ações com timestamps |
    | c) | Definir responsável pelo isolamento | **Atribuicao de tarefas** - cada pessoa sabe o seu papel |
    | d) | Bloquear tráfego malicioso no firewall | **Contenção** - limitar a progressao do incidente |
    | e) | Verificar integridade dos backups | **Preparacao da recuperação** - criar condicoes para restaurar |
    | f) | Fotografar ecrã com erro | **Documentação** - registar evidências visuais |
    | g) | Contactar lideres de equipa | **Notificação** - ativar a cadeia de notificação |
    | h) | Identificar servidores adicionais afetados | **Preparacao da recuperação** (e também Contenção) - perceber o âmbito para conter e depois recuperar |

---

### Nível 2 - Aplicação prática

#### Exercício 2.1 - Desenhar uma lista de alerta

**Cenário:** Uma empresa de contabilidade com 40 colaboradores sofre frequentemente tentativas de phishing. A empresa tem:

- Um responsável de TI (que é também o responsável de segurança)
- Um diretor-geral
- Uma responsável de comunicação
- Um jurídico externo (em outsourcing)
- Três lideres de departamento (Contabilidade, Fiscal, Auditoria)

Desenha uma lista de alerta para está organização, incluindo: nome/função, contacto primário, contacto secundário, substituto, ordem de escalonamento e modelo de notificação (sequencial ou hierárquico).

??? success "Solução 2.1"

    **Modelo recomendado: Hibrido** (hierárquico nos primeiros níveis, sequencial dentro de cada equipa)

    | Ordem | Função/Papel IRP | Contacto primário | Contacto sec. | Substituto | Notificado por |
    |:-----:|-----------------|-------------------|---------------|------------|----------------|
    | 1 | Responsável TI/Segurança (Coordenador) | Telemovel | Teams | Lider Contabilidade | Quem deteta o incidente |
    | 2 | Diretor-geral | Telemovel | Email | Responsável TI | Coordenador |
    | 3 | Responsável Comunicação | Teams | Telemovel | Diretor-geral | Coordenador |
    | 4 | Jurídico externo | Telemovel | Email | (segundo contacto no escritório) | Coordenador |
    | 5 | Lider Contabilidade | Teams | Telemovel | Lider Fiscal | Coordenador |
    | 6 | Lider Fiscal | Teams | Telemovel | Lider Auditoria | Coordenador |
    | 7 | Lider Auditoria | Teams | Telemovel | Lider Contabilidade | Coordenador |

    **Justificação do modelo hibrido:**

    *Com 40 colaboradores e um único responsável de TI/segurança, o modelo sequencial puro seria adequado (a equipa de topo e pequena). No entanto, o coordenador notifica os lideres de departamento, e cada lider e responsável por comunicar com a sua equipa (componente hierárquica). Isto poupa tempo ao coordenador é permite-lhe focar-se na gestão do incidente.*

    *O jurídico externo deve estar na lista porque, em caso de comprometimento de dados de clientes (informação fiscal/contabilistica), há obrigações legais de notificação (RGPD). Ter o contacto pré-definido evita atrasos críticos.*

---

#### Exercício 2.2 - O que documentar e quando

**Cenário:** As 14h00, o SIEM de uma empresa de logística deteta tráfego anómalo a sair de um servidor de gestão de armazem. As 14h15, o analista confirma que o servidor está a comunicar com um endereco IP conhecido como C2 (command and control) de uma botnet. As 14h30, o servidor é isolado da rede. As 14h45, descobre-se que os dados de inventário dos últimos 7 dias podem ter sido exfiltrados.

Para cada momento, indica: o que documentar, quem deve documentar e porque e importante documentar naquele momento (e não depois).

??? success "Solução 2.2"

    | Hora | O que documentar | Quem documenta | Porque agora |
    |------|-----------------|----------------|--------------|
    | **14:00** | Alerta do SIEM: tipo, gravidade, sistema afetado, IP de destino, regra que disparou | Analista de segurança | Os detalhes do alerta original são a base de tudo. Se não forem registados agora, perdem-se detalhes específicos. |
    | **14:15** | Confirmacao: IP C2 identificado (qual?), evidência da comunicação, classificação como incidente confirmado, notificações feitas | Analista + Coordenador | A classificação como incidente confirmado e um ponto de viragem. Documentar a evidência que levou a está classificação é crítico para auditoria. |
    | **14:30** | Isolamento: hora exata, método usado (desconexao física? VLAN? firewall?), quem autorizou, impacto no serviço de armazem | Operador de sistemas + Coordenador | A decisão de isolar tem impacto operacional. Registar quem decidiu e porque e essencial para prestacao de contas e para a equipa de recuperação saber o estado do sistema. |
    | **14:45** | Descoberta de possível exfiltração: que dados (inventário 7 dias), volume estimado, método de exfiltração suspeitado, impacto no negocio | Analista + Coordenador | Esta informação determina se há obrigações legais de notificação e alimenta diretamente a fase de recuperação. Se documentada só depois, o volume e a natureza dos dados podem ser subestimados. |

---

#### Exercício 2.3 - Escolher o nível de contenção

Para cada cenário, indica o nível de contenção adequado (cirurgico, amplo ou extremo) e justifica a escolha.

| # | Cenário |
|---|---------|
| a) | Uma única conta de utilizador foi comprometida por phishing. O utilizador não tem acessos privilegiados. |
| b) | Ransomware está a propagar-se ativamente entre estacoes de trabalho num segmento de rede do departamento financeiro. |
| c) | Um worm está a explorar uma vulnerabilidade zero-day e já comprometeu servidores em 3 segmentos de rede diferentes. |
| d) | Um servidor web público está a ser usado para ataques de phishing contra terceiros (o servidor foi comprometido e está a alojar páginas falsas). |
| e) | Detetada exfiltração de dados de um servidor de base de dados, mas limitada a um único ponto de saida na rede. |

??? success "Solução 2.3"

    | # | Nível | Justificação |
    |---|-------|-------------|
    | a) | **Cirurgico** | Âmbito restrito e bem identificado (uma conta, sem privilegios). Basta desativar a conta, fazer reset da password e invalidar sessões. Não é necessário isolar segmentos. |
    | b) | **Amplo** | O ransomware está em propagação ativa num segmento. Isolar o segmento de rede inteiro e necessário para impedir que chegue a outros departamentos. Contenção cirurgica (bloquear uma maquina) seria insuficiente porque o ransomware pode já ter atingido outras estacoes. |
    | c) | **Extremo** | Worm com zero-day em 3 segmentos indica comprometimento generalizado. A propagação e rápida e o patch pode não estar disponível. Pode justificar-se o isolamento total da rede ou mesmo shutdown para conter a propagação. E uma decisão de último recurso, mas o risco de inacao e superior ao dano da paragem. |
    | d) | **Cirurgico a amplo** | O servidor web deve ser isolado imediatamente (cirurgico). Se há suspeita de que o atacante acedeu a outros sistemas a partir dele, pode ser necessário isolar o segmento DMZ (amplo). A urgência e também legal/reputacional (a organização está a ser usada como plataforma de ataque). |
    | e) | **Cirurgico a amplo** | Bloquear o ponto de saida (regra de firewall, bloqueio de IP) e contenção cirurgica. Se o servidor de base de dados pode ter sido comprometido de forma mais profunda, isolar o segmento onde ele reside e uma medida ampla prudente. A decisão depende da certeza sobre o âmbito. |

---

### Nível 3 - Análise

#### Exercício 3.1 - Cenário completo: da deteção a contenção

**Cenário:** Es o coordenador de segurança de uma empresa de desenvolvimento de software com 150 colaboradores. A empresa tem escritorios em Lisboa e no Porto, ligados por VPN site-to-site. O repositório de código-fonte está num servidor GitLab on-premises em Lisboa.

**Sequencia de eventos:**

- **09:00** - O SIEM deteta tentativas de autenticação falhadas massivas contra o GitLab a partir de um IP na Russia
- **09:15** - Um developer do Porto reporta que não consegue fazer push para o repositório (erro de autenticação)
- **09:25** - O admin de sistemas verifica os logs do GitLab e descobre que 5 contas de developer tiveram login bem-sucedido a partir do IP russo durante a madrugada
- **09:35** - Os logs mostram que foram feitos git clone de 3 repositórios que contem propriedade intelectual crítica
- **09:45** - O admin descobre que uma das contas comprometidas tem acesso de administrador ao GitLab

Para cada momento, define:

1. Que ações tomarias (notificação, contenção, documentação)
2. Quem notificarias e por que canal
3. Que nível de contenção aplicarias e porque
4. O que documentarias

??? success "Solução 3.1"

    **09:00 - Tentativas de autenticação falhadas**

    - **Ações:** Analisar o alerta - frequência, IPs, contas-alvo. Neste ponto é um evento suspeito, ainda não confirmado como incidente.
    - **Notificação:** Nenhuma formal ainda. O analista investiga e prepara-se para escalar.
    - **Contenção:** Nenhuma ainda. Monitorizar e correlacionar.
    - **Documentação:** Registar o alerta, hora, IPs, contas-alvo, regra SIEM que disparou.

    **09:15 - Developer não consegue fazer push**

    - **Ações:** Correlacionar com o alerta anterior. Verificar se a conta do developer está bloqueada ou se o servidor está sob pressão. A coincidencia temporal e suspeita.
    - **Notificação:** Alertar o admin de sistemas para investigação prioritaria.
    - **Contenção:** Ainda não. Preciso de mais informação.
    - **Documentação:** Registar o relato do developer, hora, tipo de erro.

    **09:25 - 5 contas com login bem-sucedido do IP russo**

    - **Ações:** **Incidente confirmado.** Ativar o IRP. As 5 contas tiveram login de um IP externo não autorizado - comprometimento de credenciais confirmado.
    - **Notificação:** Ativar lista de alerta: CEO/CTO (propriedade intelectual em risco), equipa de IR, DPO (possível fuga de dados). Canal: chamada telefonica para CTO (urgência), Teams para equipa de IR.
    - **Contenção cirurgica:** Desativar imediatamente as 5 contas comprometidas. Bloquear o IP russo no firewall. Invalidar todas as sessões ativas do GitLab para essas contas.
    - **Documentação:** Registar hora de confirmacao, contas comprometidas, IP, hora dos logins, decisão de classificar como incidente, notificações feitas.

    **09:35 - Git clone de 3 repositórios críticos**

    - **Ações:** O incidente é mais grave do que inicialmente avaliado. Houve exfiltração de propriedade intelectual. Escalar gravidade para **crítica**.
    - **Notificação:** Escalar para CEO. Contactar jurídico (implicações de propriedade intelectual, possível espionagem industrial). Informar CTO sobre os repositórios afetados.
    - **Contenção ampla:** Além das contas já bloqueadas, considerar restringir o acesso externo ao GitLab (desativar acesso VPN externo temporariamente, limitar acesso apenas a rede interna). Rever tokens de API e deploy keys.
    - **Documentação:** Registar repositórios clonados, volumes de dados, hora dos clones, decisão de escalar gravidade, comunicações feitas.

    **09:45 - Conta com acesso de administrador comprometida**

    - **Ações:** **Alerta máximo.** Uma conta de admin comprometida significa que o atacante pode ter modificado configurações, criado backdoors, acedido a todos os repositórios, ou modificado permissoes.
    - **Notificação:** Re-escalar: toda a equipa de IR em modo de emergência. Considerar contactar entidade externa de resposta a incidentes (CSIRT nacional ou empresa especializada) se a equipa interna não tiver capacidade.
    - **Contenção ampla a extrema:** Desativar TODOS os acessos externos ao GitLab imediatamente. Auditar todas as alterações feitas pela conta de admin. Verificar se há backdoors, utilizadores novos criados, chaves SSH adicionadas. Considerar colocar o servidor GitLab offline até completar a auditoria.
    - **Documentação:** Registar a descoberta, as ações tomadas, a decisão de contenção (com justificação), e o plano de próximos passos. Cada decisão deve ter timestamp e responsável.

    **Conclusão:**

    *Este cenário demonstra como um incidente pode escalar rapidamente em gravidade é âmbito. O que começou como tentativas de login falhadas (evento suspeito) transformou-se em exfiltração de propriedade intelectual com comprometimento de conta de administrador (incidente crítico). Cada nova informação exigiu reavaliacao da contenção: de nenhuma, para cirurgica, para ampla, potencialmente para extrema. A documentação em cada momento é essencial não só para a recuperação mas também para possível ação legal.*

---

## Armadilhas e confusões a evitar

### Armadilha 1: Reagir sem documentar

> Reagir ao incidente sem documentar em tempo real significa perder informação crítica. "Depois escrevemos tudo" raramente resulta em documentação completa e precisa.

Detalhes esquecidos, tempos imprecisos e decisões sem contexto são consequências diretas de adiar a documentação. A documentação não atrasa a resposta - garante que a resposta é útil a longo prazo.

### Armadilha 2: Confundir contenção com erradicação

> Conter e **parar e limitar**. Erradicar e **remover a causa**. São fases diferentes com objetivos diferentes.

Isolar um servidor da rede é contenção. Remover o malware do servidor é erradicação. Restaurar os dados a partir de backup é recuperação. Saltar passos cria o risco de o incidente reocorrer.

### Armadilha 3: Notificar toda a gente em vez de pessoal-chave

> A notificação deve ser **direcionada** ao pessoal-chave, não difundida para toda a organização.

Broadcast geral causa pânico, desinformacao, perda de controlo sobre a narrativa e potencial fuga de informação para o exterior. Notificar as pessoas certas, com a mensagem certa, pelo canal certo.

### Armadilha 4: Usar contenção extrema por precaucao

> O shutdown total e uma decisão de **último recurso**. Usa-lo "por precaucao" causa paragem desnecessaria e pode ser mais prejudicial do que o próprio incidente.

A contenção deve ser proporcional. Desligar toda a rede porque uma conta foi comprometida e desproporcional. Avaliar o âmbito antes de decidir o nível de contenção.

### Armadilha 5: Lista de alerta desatualizada

> Uma lista de alerta com contactos antigos, pessoas que mudaram de função ou substitutos que já não existem pode ser pior do que não ter lista - cria uma falsa sensacao de segurança.

A lista de alerta deve ser revista e testada regularmente (pelo menos trimestralmente). Uma lista que ninguem atualiza não funciona quando e precisa.

### Armadilha 6: Documentação narrativa em vez de factual

> A documentação deve ser **objetiva, cronológica e factual**. Não é um relatório narrativo nem uma historia com interpretacoes subjetivas.

"Achamos que o atacante provavelmente estava a tentar roubar dados" não é documentação factual. "As 09:35, os logs do GitLab mostram operações git clone de 3 repositórios a partir do IP 203.x.x.x" e documentação factual.

### Armadilha 7: Reagir destrói evidências

> Ações precipitadas de contenção podem destruir evidências essenciais para a investigação e para a recuperação.

Formatar um disco, reinstalar um sistema operativo ou desligar uma maquina pode destruir informação volatil (processos em execução, ligações de rede, conteúdo da memoria RAM) que seria crítica para perceber o que aconteceu e o que foi afetado.

### Armadilha 8: A velocidade como desculpa para a desorganizacao

> A urgência de um incidente não justifica a falta de coordenação. A velocidade vem da preparação (playbooks, treino, equipas definidas), não da improvisacao.

Quando alguem diz "não houve tempo para documentar" ou "não deu para seguir o procedimento", o problema normalmente não é a falta de tempo - e a falta de preparação.

### Armadilha 9: Conter sem perceber o âmbito

> Decidir a contenção sem primeiro perceber o que está em jogo pode levar a ações insuficientes (conter muito pouco) ou excessivas (conter demais).

Antes de conter, investir alguns minutos em perceber o âmbito: que ativos, que contas, que comunicações, que segmentos. Essa informação determina se a contenção deve ser cirurgica, ampla ou extrema.

### Armadilha 10: Mensagem de alerta com demasiada ou pouca informação

> A mensagem de alerta deve ser **equilibrada**: suficiente para que o destinatario saiba o que se passa e o que fazer, mas sem detalhes excessivos que confundam ou atrasem.

Uma mensagem de alerta que diz apenas "há um incidente, vem já" não da contexto. Uma mensagem com 3 paragrafos de detalhes técnicos não será lida em situação de urgência.

---

## Resumo rápido

### Tabela de conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| **Três objetivos da reação** | Parar/conter, mitigar impacto, preparar recuperação |
| **Três reflexos obrigatórios** | Notificar pessoal-chave, atribuir tarefas, documentar |
| **Lista de alerta (alert roster)** | Lista pré-definida de quem notificar, como, por quem e com que mensagem |
| **Modelo sequencial** | Uma pessoa notifica todos, um a um - mais controlado, mais lento |
| **Modelo hierárquico** | Notificação em árvore, cada nível notifica o seguinte - mais rápido, mais risco |
| **Documentação do incidente** | Registo oficial, demonstracao de diligencia, base para formação futura |
| **Documentação em tempo real** | Documentar durante o incidente, não apenas depois |
| **Contenção cirurgica** | Intervencao precisa e localizada (conta, IP, regra) |
| **Contenção ampla** | Isolamento de segmentos de rede, restricao de comunicações |
| **Contenção extrema** | Shutdown total - último recurso, decisão muito seria |
| **Proporcionalidade** | A contenção deve ser proporcional a ameaça, sem danos desnecessarios |
| **Conter vs erradicar vs recuperar** | Três fases distintas: parar, remover causa, restaurar |

### Frases-chave para recordar

- *"A reação não é só apagar o fogo. E também perceber o que ardeu, o que ainda pode arder e o que será preciso reconstruir."*
- *"Reagir rapidamente não significa reagir caoticamente. Rápido significa agil, coordenado e baseado em procedimentos."*
- *"A velocidade vem da preparação, não da precipitacao."*
- *"A mensagem de alerta não é um relatório. E um gatilho para ação."*
- *"Documentar um incidente não é burocracia. E a diferença entre uma organização que aprende e uma que repete os mesmos erros."*
- *"A documentação deve ser feita durante o incidente, não apenas depois."*
- *"A contenção deve ser proporcional a ameaça. Conter com proporcionalidade significa proteger sem causar danos desnecessarios."*
- *"Conter não é erradicar. Erradicar não é recuperar. São três fases distintas."*
- *"Uma lista de alerta desatualizada pode ser pior do que não ter lista - cria uma falsa sensacao de segurança."*

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

*Próximo capitulo: [Recuperação de incidentes](recuperacao.md)*
