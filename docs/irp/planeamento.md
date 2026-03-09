# Planeamento do IRP

## Indice

1. [As tres funcoes da equipa de IR](#1-as-tres-funcoes-da-equipa-de-ir)
2. [Formato e conteudo do plano](#2-formato-e-conteudo-do-plano)
3. [Armazenamento do plano](#3-armazenamento-do-plano)
4. [Testar o plano](#4-testar-o-plano)
5. [Exemplos praticos](#5-exemplos-praticos)
6. [Exercicios](#6-exercicios)
7. [Armadilhas e confusoes a evitar](#7-armadilhas-e-confusoes-a-evitar)
8. [Resumo rapido](#8-resumo-rapido)

---

## 1. As tres funcoes da equipa de IR

Quando um alerta dispara ou um utilizador reporta algo estranho, a equipa de resposta a incidentes nao se limita a "resolver o problema". O trabalho da equipa organiza-se em **tres funcoes fundamentais**: verificar, decidir e coordenar.

> A equipa de IR nao e um grupo que faz tudo sozinho. E um grupo que valida o que esta a acontecer, decide o que fazer e coordena quem faz o que.

```
  ┌───────────────────────────────────────────────────────────────┐
  │                   EQUIPA DE RESPOSTA (IR)                     │
  │                                                               │
  │   ┌─────────────┐   ┌──────────────────┐   ┌──────────────┐  │
  │   │  VERIFICAR  │──►│     DECIDIR      │──►│  COORDENAR   │  │
  │   │  a ameaca   │   │  a resposta      │   │  as acoes    │  │
  │   └─────────────┘   └──────────────────┘   └──────────────┘  │
  │         │                    │                     │          │
  │         ▼                    ▼                     ▼          │
  │   E real ou falso     Isolar? Observar?     Quem faz o que?  │
  │   positivo?           Escalar? Comunicar?   Quando? A quem?  │
  └───────────────────────────────────────────────────────────────┘
```

Este modelo e por vezes chamado de **"processo militar"** - nao porque envolva forcas armadas, mas porque segue uma logica de resposta estruturada: **papeis definidos, cadeia de decisao clara, comunicacao disciplinada**. Tal como numa operacao militar, ninguem improvisa a hierarquia quando ja esta sob pressao.

---

### Verificar a ameaca

A primeira funcao e confirmar se o alerta ou relato corresponde a uma **ameaca real**. Nem tudo o que parece um incidente e de facto um incidente.

| Situacao | Resultado possivel |
|----------|--------------------|
| Alerta SIEM de login anomalo | Pode ser um colaborador em viagem (falso positivo) |
| Utilizador reporta email suspeito | Pode ser phishing real ou apenas spam comercial |
| Degradacao subita de performance | Pode ser ataque DDoS ou problema de infraestrutura |
| EDR deteta processo desconhecido | Pode ser malware ou atualizacao legitima de software |

**Para refletir:**

- Se a equipa tratar tudo como incidente critico, o que acontece aos recursos e a motivacao?
- Se a equipa ignorar alertas por serem "provavelmente falsos positivos", que risco corre?
- Qual e o equilibrio entre reagir rapido e confirmar antes de agir?

---

### Determinar a resposta adequada

Apos verificar que a ameaca e real, a equipa deve decidir **como responder**. Esta decisao depende do tipo de incidente, da sua gravidade e do contexto.

| Decisao | Quando aplicar | Exemplo |
|---------|----------------|---------|
| **Isolar** | Quando ha risco de propagacao | Isolar servidor com malware da rede |
| **Observar** | Quando isolar pode alertar o atacante | Monitorizar atividade de conta suspeita para perceber o alcance |
| **Alterar credenciais** | Quando ha comprometimento de contas | Forcar reset de passwords apos phishing confirmado |
| **Escalar** | Quando a gravidade excede a autoridade da equipa | Envolver gestao de topo, juridico ou autoridades |
| **Comunicar** | Quando ha impacto em utilizadores ou obrigacao legal | Notificar CNPD em caso de violacao de dados pessoais |

> Decidir nao e apenas escolher a acao tecnica. E tambem decidir o **nivel de urgencia**, a **amplitude da resposta** e **quem precisa de ser envolvido**.

---

### Coordenar acoes

A resposta a um incidente raramente envolve apenas a equipa de seguranca. E preciso coordenar com multiplas areas:

```
                        ┌──────────────────┐
                        │   Coordenador    │
                        │   de Incidente   │
                        └────────┬─────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │              │              │               │
          ▼              ▼              ▼               ▼
  ┌──────────────┐ ┌──────────┐ ┌────────────┐ ┌────────────┐
  │  Seguranca   │ │ Sistemas │ │   Redes    │ │  Helpdesk  │
  │  (analise,   │ │ (isolar, │ │ (bloquear, │ │ (comunicar │
  │  forense)    │ │ restauro)│ │  filtrar)  │ │  a users)  │
  └──────────────┘ └──────────┘ └────────────┘ └────────────┘
          │              │              │               │
          └──────────────┼──────────────┘               │
                         ▼                              │
                 ┌──────────────┐               ┌──────────────┐
                 │   Gestao /   │               │   Juridico   │
                 │   Direcao    │               │   (RGPD,     │
                 │              │               │   regulador) │
                 └──────────────┘               └──────────────┘
```

Sem coordenacao, cada equipa pode tomar decisoes contraditorias. Por exemplo: a equipa de redes bloqueia um IP enquanto a equipa de seguranca ainda esta a monitorizar o atacante por esse mesmo canal.

---

### Documentacao orientadora

Para que a equipa possa verificar, decidir e coordenar eficazmente, precisa de **documentacao preparada antes do incidente**. Um plano que ninguem consegue encontrar durante uma crise e tao util como nao ter plano nenhum.

| Instrumento | Descricao | Funcao principal |
|-------------|-----------|------------------|
| **Playbook** | Procedimento detalhado para um tipo especifico de incidente (ex: ransomware, phishing) | Guiar a resposta passo a passo |
| **Runbook** | Procedimento tecnico especifico para uma acao concreta (ex: como isolar um servidor) | Executar acoes tecnicas sem ambiguidade |
| **Checklist** | Lista de verificacao rapida de acoes a tomar ou pontos a confirmar | Garantir que nada e esquecido sob pressao |
| **Matriz de escalonamento** | Tabela de contactos, niveis de gravidade e canais de comunicacao | Saber quem contactar, quando e como |
| **Lista de contactos** | Contactos de emergencia internos e externos (fornecedores, reguladores, autoridades) | Acesso rapido a pessoas-chave |
| **Template de comunicacao** | Modelos pre-escritos para comunicacao interna, externa, a reguladores | Comunicar sem improvisar sob pressao |
| **Criterios de decisao** | Regras pre-definidas para decidir escalonamento, isolamento, comunicacao | Evitar hesitacao e subjetividade |
| **Fluxo de escalonamento** | Diagrama que mostra quando e como escalar, ate que nivel | Garantir que a cadeia de decisao e clara |

> Documentacao orientadora nao e burocracia. E o equivalente a um mapa durante uma emergencia: quem tem mapa chega mais rapido e com menos erros.

---

## 2. Formato e conteudo do plano

Ter um plano bem escrito nao e suficiente se o formato nao permitir **consulta rapida em contexto de crise**. O formato e tao importante quanto o conteudo.

> Em crise, ninguem quer "estudar" o plano. O plano tem de ser consultavel, nao lido como um livro.

---

### Acesso rapido em contexto de crise

O plano deve ser desenhado para uso sob pressao. Isso implica:

| Caracteristica | Porque e necessaria |
|----------------|---------------------|
| **Indice claro** | Encontrar rapidamente a seccao relevante |
| **Seccoes por tipo de incidente** | Ir direto ao playbook do incidente em causa |
| **Papeis definidos** | Cada pessoa sabe onde encontrar as suas responsabilidades |
| **Passos claros e numerados** | Seguir uma sequencia sem ter de interpretar texto corrido |
| **Contactos visiveis** | Nao perder tempo a procurar numeros de telefone |
| **Criterios de escalonamento destacados** | Saber quando e obrigatorio escalar |
| **Acoes iniciais em destaque** | Os primeiros 15 minutos sao os mais criticos |

O conceito de **"binder"** (dossier organizado) aplica-se aqui: o plano deve existir num formato consultavel - seja em papel, wiki interna, SharePoint, ou playbooks impressos e distribuidos. O importante e que esteja **organizado, acessivel e atualizado**.

---

### Organizar por tipo de incidente

Uma abordagem eficaz e criar um **diretorio de incidentes**, onde cada tipo tem o seu proprio playbook ou seccao dedicada.

| Tipo de incidente | Conteudo do playbook | Acoes iniciais criticas |
|-------------------|---------------------|------------------------|
| **Phishing** | Identificar alcance, bloquear remetente, reset de credenciais, comunicacao a utilizadores | Verificar quantos clicaram; forcar reset de passwords |
| **Malware / Ransomware** | Isolar sistemas, preservar evidencias, avaliar propagacao, contactar autoridades se necessario | Isolar da rede imediatamente; nao desligar equipamento |
| **Indisponibilidade de servico** | Diagnosticar causa (ataque vs falha), ativar redundancia, comunicar a utilizadores | Ativar servicos alternativos; comunicar estimativa de recuperacao |
| **Violacao de dados (data breach)** | Identificar dados expostos, avaliar obrigacao legal, notificar regulador, comunicar a afetados | Conter a exposicao; iniciar avaliacao de impacto RGPD |
| **Abuso interno (insider)** | Preservar evidencias, limitar acessos, envolver juridico e RH | Revogar acessos sem alertar o suspeito; preservar logs |

---

### Cada papel deve ver o que lhe compete

O plano nao e um documento unico para todos lerem da mesma forma. Cada papel deve conseguir encontrar rapidamente **o que lhe compete fazer**.

| Papel | O que fazer | Quando | Comunicar a quem | Quando escalar | O que NAO fazer |
|-------|-------------|--------|-------------------|----------------|-----------------|
| **Coordenador** | Liderar a resposta, tomar decisoes, manter visao global | Desde o primeiro alerta | Gestao, juridico, equipas tecnicas | Quando ha impacto em dados pessoais ou reputacao | Nao executar acoes tecnicas diretamente |
| **Analista de seguranca** | Investigar, recolher evidencias, analisar logs | Apos verificacao inicial | Coordenador | Quando descobre propagacao ou dados comprometidos | Nao isolar sistemas sem coordenar com operacoes |
| **Administrador de sistemas** | Isolar, conter, restaurar sistemas | Quando recebe instrucao do coordenador | Coordenador, analista | Quando a contencao afeta servicos criticos | Nao reinstalar sem preservar evidencias |
| **Helpdesk** | Comunicar com utilizadores, recolher relatos, encaminhar alertas | Desde o primeiro relato | Coordenador, utilizadores | Quando recebe multiplos relatos do mesmo problema | Nao dar informacao tecnica detalhada a utilizadores |
| **Gestao** | Aprovar decisoes criticas, alocar recursos, comunicacao externa | Quando escalonado pelo coordenador | Juridico, comunicacao, reguladores | Quando ha implicacoes legais ou financeiras significativas | Nao interferir em decisoes tecnicas sem contexto |
| **Juridico** | Avaliar obrigacoes legais, notificacoes obrigatorias | Quando ha comprometimento de dados pessoais | Coordenador, gestao, reguladores | Quando ha obrigacao de notificacao (ex: RGPD 72h) | Nao atrasar a contencao tecnica por analise juridica |

---

### Exemplo de estrutura de um playbook

Um playbook bem estruturado segue uma logica de consulta rapida. Abaixo esta uma estrutura tipo para um **playbook de ransomware**:

```
  ┌═══════════════════════════════════════════════════════════════┐
  │              PLAYBOOK: RANSOMWARE                             │
  ├───────────────────────────────────────────────────────────────┤
  │                                                               │
  │  ACOES IMEDIATAS (primeiros 15 minutos)                       │
  │  ─────────────────────────────────────                        │
  │  1. Isolar o(s) sistema(s) afetado(s) da rede                 │
  │  2. NAO desligar o equipamento                                │
  │  3. Alertar o coordenador de incidente                        │
  │  4. Registar hora de detecao e sintomas observados            │
  │                                                               │
  │  VERIFICACAO (15-60 minutos)                                  │
  │  ───────────────────────────                                  │
  │  5. Confirmar que e ransomware (nota de resgate? extensoes?)  │
  │  6. Identificar variante se possivel                          │
  │  7. Verificar alcance: que sistemas estao afetados?           │
  │  8. Verificar se backups estao intactos                       │
  │                                                               │
  │  CONTENCAO (1-4 horas)                                        │
  │  ──────────────────────                                       │
  │  9. Bloquear vectores de propagacao (portas, partilhas)       │
  │  10. Desativar contas comprometidas                           │
  │  11. Preservar evidencias (logs, imagens de disco)            │
  │  12. Avaliar necessidade de comunicacao externa               │
  │                                                               │
  │  ESCALONAMENTO                                                │
  │  ─────────────                                                │
  │  ● Dados pessoais afetados? ──► Juridico + CNPD (72h)        │
  │  ● Servico critico parado?  ──► Gestao de topo               │
  │  ● Propagacao nao contida?  ──► Fornecedor externo / CERT    │
  │                                                               │
  │  CONTACTOS                                                    │
  │  ─────────                                                    │
  │  Coordenador IR:  [nome] - [telefone] - [email]               │
  │  Seguranca:       [nome] - [telefone] - [email]               │
  │  Gestao:          [nome] - [telefone] - [email]               │
  │  CERT nacional:   [telefone] - [email]                        │
  │  CNPD:            [telefone] - [formulario online]            │
  │                                                               │
  └═══════════════════════════════════════════════════════════════┘
```

**Como interpretar:**

*O playbook nao e um documento para ler de capa a capa. E um guia de consulta rapida: abrir na seccao relevante, seguir os passos, verificar os contactos, aplicar os criterios de escalonamento. A estrutura visual com seccoes separadas, numeracao e destaques e intencional - numa crise, o olho precisa de encontrar a informacao em segundos, nao em minutos.*

---

## 3. Armazenamento do plano

O plano de resposta a incidentes contem informacao **sensivel**: contactos pessoais, sistemas criticos, caminhos de escalonamento, vulnerabilidades conhecidas. Esta informacao deve ser **protegida** - mas tem de ser **acessivel quando e necessaria**.

> A tensao central do armazenamento e: proteger sem tornar inacessivel. Um plano escondido num cofre durante uma crise e tao inutil como nao ter plano.

---

### Proteger sem tornar inacessivel

| Extremo | Problema |
|---------|----------|
| **Demasiado protegido** | Plano numa pasta encriptada que so o CISO conhece; ninguem o encontra durante o incidente |
| **Sem protecao** | Plano acessivel a todos, incluindo atacantes que podem usa-lo para entender as defesas |
| **Dependente de um sistema** | Plano armazenado apenas no servidor que tambem pode ser afetado pelo incidente |
| **Dependente de uma pessoa** | So uma pessoa sabe onde esta ou como aceder |

O equilibrio correto envolve:

| Pratica | Descricao |
|---------|-----------|
| **Acesso controlado** | Acessivel a equipa de IR e gestao, com controlo de acessos adequado |
| **Multiplos formatos** | Versao digital (wiki, SharePoint) e versao impressa como backup |
| **Armazenamento independente** | Nao depender exclusivamente de sistemas que possam estar comprometidos |
| **Atualizacao regular** | Contactos, sistemas e procedimentos mudam - o plano deve acompanhar |
| **Localizacao conhecida** | Todos os membros da equipa de IR sabem onde encontrar o plano |

---

### Redundancia de acesso

O plano deve estar disponivel **mesmo quando os sistemas principais falham**. Isto requer pensar em redundancia:

```
  ┌───────────────────────────────────────────────────────┐
  │              REDUNDANCIA DE ACESSO AO PLANO           │
  │                                                       │
  │   Localizacao primaria                                │
  │   ├── Wiki interna / SharePoint (rede corporativa)    │
  │   │                                                   │
  │   Localizacao secundaria                              │
  │   ├── Pasta partilhada em cloud (acesso externo)      │
  │   │                                                   │
  │   Localizacao terciaria                               │
  │   ├── Versao impressa no escritorio de seguranca      │
  │   │                                                   │
  │   Localizacao de emergencia                           │
  │   └── Copia em pen USB segura (guardada em cofre)     │
  └───────────────────────────────────────────────────────┘
```

**Para refletir:**

- Se a rede corporativa estiver comprometida, como acede a equipa ao plano?
- Se o unico responsavel que sabe a password do SharePoint estiver de ferias, o que acontece?
- Qual e o risco de ter uma versao impressa desatualizada?

---

## 4. Testar o plano

Um plano que nunca foi testado e apenas uma teoria. Testar o plano e a unica forma de saber se **funciona na pratica**, se as **pessoas sabem os seus papeis**, e se os **contactos e procedimentos estao atuais**.

> Um plano testado uma vez nao fica valido para sempre. Pessoas mudam, sistemas mudam, contactos mudam, ameacas evoluem.

---

### Niveis de teste

Existem cinco niveis progressivos de teste, cada um com complexidade e realismo crescentes:

| Nivel | Designacao | Descricao | O que testa | Exemplo |
|:-----:|------------|-----------|-------------|---------|
| 1 | **Checklist** | Verificacao documental: o plano existe, esta completo, atualizado e acessivel | Existencia e completude do plano | Verificar que todos os contactos estao atuais, que os playbooks cobrem os cenarios relevantes |
| 2 | **Structured walk-through** | Reuniao onde os participantes percorrem o plano passo a passo, discutindo cada fase | Compreensao dos papeis e procedimentos | A equipa reune-se e simula: "se recebermos um alerta de ransomware, quem faz o que?" |
| 3 | **Simulacao** | Cenario ficticio e apresentado e as equipas reagem como se fosse real (sem impacto em producao) | Capacidade de decisao e coordenacao | Exercicio tabletop: "as 10h recebemos alerta de phishing massivo - como respondem?" |
| 4 | **Teste paralelo** | Teste tecnico em ambiente paralelo, sem interromper operacoes reais | Procedimentos tecnicos e tempos de resposta | Restauro de backups num servidor de teste, verificando se o RTO e cumprido |
| 5 | **Full-interruption** | Teste completo com interrupcao real ou quase-real dos sistemas | Resposta completa em condicoes reais | Desligar efetivamente um servico e testar a resposta de ponta a ponta |

**Como interpretar:**

*Nao e necessario (nem pratico) comecar pelo nivel mais alto. A progressao natural e comecar por verificar que o plano existe e esta completo (checklist), depois garantir que as pessoas o compreendem (walk-through), depois simular cenarios (simulacao), e so entao testar tecnicamente (paralelo e full-interruption). Cada nivel acrescenta realismo e revela problemas que o nivel anterior nao consegue detetar.*

---

### Progressao de maturidade

A maturidade de testes de um plano IRP pode ser representada como uma progressao:

```
  Nivel de realismo e complexidade
  ▲
  │
  │  5. Full-interruption ──────────────────────── ●
  │     (teste real, com interrupcao)              │
  │                                                │
  │  4. Paralelo ─────────────────────── ●         │
  │     (teste tecnico, sem parar)       │         │
  │                                      │         │
  │  3. Simulacao ──────────── ●         │         │
  │     (cenario ficticio)     │         │         │
  │                            │         │         │
  │  2. Walk-through ── ●      │         │         │
  │     (percorrer)     │      │         │         │
  │                     │      │         │         │
  │  1. Checklist ●     │      │         │         │
  │     (verificar)│    │      │         │         │
  │                │    │      │         │         │
  └────────────────┼────┼──────┼─────────┼─────────┼──────────►
                   │    │      │         │         │     Maturidade
              Inicio  Basico  Intermedio Avancado  Excelencia
```

**Para refletir:**

- Uma organizacao que so faz checklists pode estar confiante num plano que nunca foi realmente testado. Que riscos corre?
- Qual e o custo de um teste full-interruption? Quando se justifica esse investimento?
- Com que frequencia devem ser repetidos os testes?

---

## 5. Exemplos praticos

### Exemplo 1 - Banco: acesso a contas privilegiadas

**Cenario:** O SOC de um banco deteta que uma conta de administrador de base de dados foi usada fora do horario normal para executar queries invulgares na base de dados de clientes.

| Funcao IR | Acao | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar se o acesso e legitimo | Contactar o titular da conta; verificar se havia manutencao agendada; analisar o tipo de queries executadas |
| **Decidir** | Definir resposta com base na verificacao | Se nao e legitimo: suspender conta, preservar logs, avaliar dados acedidos. Se e legitimo: documentar e rever politicas de acesso fora de horas |
| **Coordenar** | Envolver multiplas equipas | Seguranca (analise forense), DBA (verificar integridade), juridico (avaliar impacto regulatorio), gestao (decisao sobre comunicacao ao regulador bancario) |

**Como interpretar:**

*Num banco, o acesso a dados de clientes e altamente regulado. A verificacao tem de ser rapida mas cuidadosa: suspender uma conta de administrador pode parar operacoes criticas, mas nao suspender pode permitir exfiltracao de dados. A decisao equilibra risco operacional e risco de seguranca. A coordenacao e critica porque envolve equipas tecnicas, juridicas e de gestao em simultaneo.*

**Para refletir:**

- Se a conta pertencer a um administrador senior, a verificacao muda? Porquee?
- Que informacao dos logs e mais util para distinguir atividade legitima de maliciosa?
- Se os dados de clientes tiverem sido efetivamente acedidos, que obrigacoes legais existem?

---

### Exemplo 2 - Hospital: malware no servidor de exames

**Cenario:** O sistema de armazenamento de exames medicos (PACS) de um hospital comeca a mostrar sinais de infecao por malware: processos anomalos, lentidao extrema e ficheiros com extensoes desconhecidas.

| Funcao IR | Acao | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar infecao e identificar tipo | Analise de processos, verificacao de extensoes de ficheiros, consulta de IoCs (Indicators of Compromise) |
| **Decidir** | Resposta equilibrada com o contexto clinico | Isolar o servidor da rede MAS garantir acesso alternativo a exames criticos; nao desligar para preservar evidencias; avaliar se ha propagacao |
| **Coordenar** | Multiplas equipas com urgencia diferente | Seguranca (analise e contencao), sistemas (isolamento e alternativas), direcao clinica (impacto no atendimento), juridico (dados de saude afetados), comunicacao (informar profissionais de saude) |

**Como interpretar:**

*A coordenacao num hospital e particularmente critica porque a resposta tecnica pode entrar em conflito com a necessidade clinica. Isolar um servidor de exames pode significar que medicos nao conseguem consultar resultados criticos. A equipa de IR tem de coordenar com a direcao clinica para garantir que existe uma alternativa (mesmo que manual ou degradada) antes de isolar.*

**Para refletir:**

- Se o malware estiver a propagar-se ativamente, justifica-se isolar mesmo sem alternativa clinica pronta?
- Que tipo de dados de saude estao em risco e que regulamentacao se aplica?
- Como garantir que os profissionais de saude sao informados sem criar panico?

---

### Exemplo 3 - Universidade: campanha de phishing

**Cenario:** O helpdesk de uma universidade recebe 30 chamadas em 2 horas de docentes e funcionarios que reportam o mesmo email suspeito, alegadamente do servico de informatica, pedindo atualizacao de password.

| Funcao IR | Acao | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar que e phishing e avaliar alcance | Analisar o email (headers, link destino); verificar quantos destinatarios receberam; verificar quantos clicaram no link; verificar se ha credenciais comprometidas |
| **Decidir** | Resposta proporcional ao alcance | Se poucos clicaram: reset de passwords individual e comunicacao direta. Se muitos clicaram: reset forcado em massa, bloqueio de sessoes, comunicacao institucional |
| **Coordenar** | Helpdesk, seguranca, comunicacao, utilizadores | Helpdesk (triagem de chamadas, resposta padrao), seguranca (analise tecnica, bloqueio de URL), comunicacao (aviso institucional), sistemas (reset de credenciais, monitorizacao de acessos) |

**Como interpretar:**

*Numa universidade, a comunidade de utilizadores e grande e diversa (docentes, funcionarios, alunos), o que torna a comunicacao particularmente desafiante. O helpdesk e a primeira linha: se nao tiver instrucoes claras, vai dar informacoes contraditorias. A coordenacao entre helpdesk, seguranca e comunicacao institucional e essencial para responder de forma coerente.*

**Para refletir:**

- Se o helpdesk nao tiver um template de comunicacao preparado, que tipo de respostas inconsistentes pode dar?
- Como distinguir rapidamente quem clicou no link de quem apenas recebeu o email?
- Que impacto tem um reset forcado de passwords em massa numa universidade com milhares de utilizadores?

---

### Exemplo 4 - E-commerce: degradacao do site

**Cenario:** O site de uma plataforma de e-commerce comeca a apresentar tempos de resposta anormalmente altos durante uma campanha promocional. Os clientes reportam erros ao concluir compras.

| Funcao IR | Acao | Detalhe |
|-----------|------|---------|
| **Verificar** | Distinguir ataque de problema de capacidade | Analisar padroes de trafego (e trafego real ou ataque DDoS?); verificar metricas de infraestrutura (CPU, memoria, rede); consultar fornecedor cloud |
| **Decidir** | Resposta adaptada a causa | Se e DDoS: ativar mitigacao, escalar para fornecedor cloud. Se e sobrecarga legitima: escalar infraestrutura (auto-scaling), priorizar funcionalidades criticas (checkout vs navegacao) |
| **Coordenar** | Operacoes, cloud, negocio, comunicacao | Operacoes (monitorizacao e acao tecnica), fornecedor cloud (suporte e escalonamento), negocio (impacto financeiro, decisao sobre campanha), comunicacao (informar clientes nas redes sociais) |

**Como interpretar:**

*Este cenario mostra que a verificacao inicial e critica para determinar a resposta correta. Responder a uma sobrecarga legitima como se fosse um ataque (ou vice-versa) desperdicaria recursos e tempo. A coordenacao com o negocio e importante porque a decisao de suspender uma campanha promocional tem impacto financeiro direto e nao e puramente tecnica.*

**Para refletir:**

- Se a equipa de IR concluir que e um ataque DDoS, mas a equipa de negocio nao quiser suspender a campanha, como se resolve o conflito?
- Que metricas distinguem trafego de ataque de trafego legitimo elevado?
- Qual e o custo de cada minuto de indisponibilidade durante uma campanha promocional?

---

## 6. Exercicios

### Nivel 1 - Compreensao

#### Exercicio 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | O plano de resposta a incidentes deve ser guardado apenas em formato digital na rede corporativa. |
| b) | Um playbook e um procedimento detalhado para responder a um tipo especifico de incidente. |
| c) | A equipa de IR tem tres funcoes principais: verificar, decidir e coordenar. |
| d) | Um teste full-interruption e o nivel de teste mais simples e deve ser o primeiro a ser realizado. |
| e) | O formato do plano e irrelevante desde que o conteudo esteja correto. |
| f) | O plano de resposta a incidentes contem informacao sensivel que deve ser protegida. |
| g) | Um plano testado uma vez permanece valido indefinidamente. |
| h) | O "processo militar" significa que a resposta a incidentes deve ser feita por militares. |

??? success "Solucao 1.1"

    | # | Resposta | Justificacao |
    |---|:--------:|-------------|
    | a) | **F** | O plano deve existir em **multiplos formatos e localizacoes** (digital, impresso, cloud, pen USB) para garantir acesso mesmo quando os sistemas principais falham. |
    | b) | **V** | O playbook e um procedimento passo-a-passo para cenarios especificos como phishing, ransomware ou data breach. |
    | c) | **V** | As tres funcoes fundamentais sao: **verificar** a ameaca (real ou falso positivo?), **decidir** a resposta adequada (isolar? escalar?) e **coordenar** acoes entre equipas. |
    | d) | **F** | O full-interruption e o nivel **mais complexo** e realista. A progressao comeca pelo checklist (nivel 1) e sobe gradualmente. |
    | e) | **F** | O formato e tao importante quanto o conteudo. Em crise, um plano mal organizado nao e consultavel e perde eficacia. |
    | f) | **V** | O plano contem contactos pessoais, sistemas criticos, vulnerabilidades e caminhos de escalonamento - informacao que deve ser protegida. |
    | g) | **F** | Pessoas mudam, sistemas mudam, contactos mudam, ameacas evoluem. O plano deve ser **reavaliado e testado regularmente**. |
    | h) | **F** | O conceito de "processo militar" refere-se a uma **resposta estruturada** com papeis definidos e cadeia de decisao clara, nao a envolvimento militar literal. |

---

#### Exercicio 1.2 - Associar instrumentos a definicoes

Associa cada instrumento a sua definicao correta.

**Instrumentos:** Playbook | Runbook | Checklist | Matriz de escalonamento | Template de comunicacao | Criterios de decisao

| # | Definicao |
|---|-----------|
| a) | Modelos pre-escritos para comunicar interna e externamente durante um incidente |
| b) | Lista de verificacao rapida para garantir que nada e esquecido sob pressao |
| c) | Procedimento detalhado para responder a um tipo especifico de incidente |
| d) | Tabela de contactos com niveis de gravidade e canais de comunicacao |
| e) | Regras pre-definidas para decidir quando isolar, escalar ou comunicar |
| f) | Procedimento tecnico especifico para executar uma acao concreta |

??? success "Solucao 1.2"

    | # | Definicao | Instrumento |
    |---|-----------|-------------|
    | a) | Modelos pre-escritos para comunicacao | **Template de comunicacao** |
    | b) | Lista de verificacao rapida | **Checklist** |
    | c) | Procedimento detalhado por tipo de incidente | **Playbook** |
    | d) | Tabela de contactos e niveis | **Matriz de escalonamento** |
    | e) | Regras pre-definidas para decisoes | **Criterios de decisao** |
    | f) | Procedimento tecnico especifico | **Runbook** |

---

### Nivel 2 - Aplicacao pratica

#### Exercicio 2.1 - Quem verifica, quem decide, quem coordena

Para o seguinte cenario, indica quem deve **verificar**, quem deve **decidir** e quem deve **coordenar**, e que acoes concretas cada um deve tomar.

**Cenario:** Uma empresa de consultoria descobre que um ex-colaborador, cujo contrato terminou ha duas semanas, continua a aceder ao sistema de gestao de projetos e a descarregar documentos de clientes.

??? success "Solucao 2.1"

    | Funcao | Quem | Acoes concretas |
    |--------|------|-----------------|
    | **Verificar** | Analista de seguranca + Administrador de sistemas | Confirmar que os acessos sao reais (verificar logs de autenticacao); confirmar que o contrato efetivamente terminou (consultar RH); verificar que documentos foram acedidos/descarregados; confirmar que a conta devia ter sido desativada |
    | **Decidir** | Coordenador de incidente + Gestao | Suspender imediatamente a conta; avaliar se os dados descarregados sao confidenciais; decidir se ha necessidade de acao legal; decidir comunicacao ao cliente cujos dados foram acedidos |
    | **Coordenar** | Coordenador de incidente | Articular com: RH (confirmar fim de contrato, processo disciplinar/legal), sistemas (desativar conta, revogar todos os acessos), seguranca (preservar evidencias, analise forense), juridico (avaliar implicacoes legais e contratuais), gestao (comunicacao ao cliente) |

    **Conclusao:**

    *Este cenario revela uma falha no processo de offboarding: a conta devia ter sido desativada quando o contrato terminou. A resposta ao incidente inclui nao so a contencao imediata (desativar conta) mas tambem a identificacao da causa raiz (falha no processo de saida) e a melhoria do processo para evitar recorrencia.*

---

#### Exercicio 2.2 - Identificar problemas num plano mal estruturado

Analisa a seguinte descricao de um plano de resposta a incidentes e identifica **pelo menos 5 problemas**.

**Descricao do plano:**

*"O nosso plano de resposta a incidentes esta guardado num ficheiro Word na pasta pessoal do responsavel de seguranca. O documento tem 80 paginas e cobre todos os cenarios possiveis num texto corrido, sem indice. Os contactos de emergencia referem-se a colaboradores que sairam da empresa ha 6 meses. Nunca testamos o plano porque temos confianca na equipa. O plano esta protegido por uma password que so o responsavel de seguranca conhece."*

??? success "Solucao 2.2"

    | # | Problema | Porque e um problema |
    |---|---------|----------------------|
    | 1 | **Armazenamento numa pasta pessoal** | Se o responsavel estiver indisponivel, ninguem acede ao plano. Dependencia de uma unica pessoa. |
    | 2 | **Formato de texto corrido sem indice** | Em crise, ninguem vai ler 80 paginas. O plano deve ser consultavel rapidamente, com seccoes, indice e playbooks separados. |
    | 3 | **Contactos desatualizados (6 meses)** | Contactar pessoas que ja nao trabalham na empresa durante um incidente gera perda de tempo critica. |
    | 4 | **Nunca testado** | Um plano que nunca foi testado e apenas uma teoria. Pode conter erros, omissoes ou procedimentos impraticaveis que so se descobrem durante um incidente real. |
    | 5 | **Password conhecida por uma unica pessoa** | Se essa pessoa estiver de ferias, doente ou indisponivel, o plano fica inacessivel quando e mais necessario. |
    | 6 | **Sem redundancia de armazenamento** | Ficheiro unico, num unico local. Se o sistema falhar ou for comprometido, o plano perde-se. |
    | 7 | **80 paginas sem separacao por tipo de incidente** | Nao segue a logica de playbooks por cenario. Obriga a procurar informacao relevante num documento monolitico. |

---

#### Exercicio 2.3 - Escolher o nivel de teste adequado

Para cada organizacao, indica qual o **nivel de teste mais adequado** como proximo passo, considerando a sua maturidade atual.

| # | Organizacao | Situacao atual |
|---|-------------|---------------|
| a) | Startup de 15 pessoas | Escreveu o primeiro IRP ha 2 semanas, nunca o discutiu em equipa |
| b) | Hospital publico | Tem IRP ha 3 anos, faz walk-throughs anuais, nunca testou tecnicamente |
| c) | Banco | Tem IRP maduro, faz simulacoes trimestrais, tem SOC 24/7 |
| d) | Camara municipal | Tem IRP no SharePoint, nunca verificou se esta completo e atualizado |
| e) | Empresa industrial | Fez um teste paralelo recentemente com sucesso |

??? success "Solucao 2.3"

    | # | Organizacao | Nivel recomendado | Justificacao |
    |---|-------------|-------------------|-------------|
    | a) | Startup | **Nivel 2 - Walk-through** | Ja tem o plano escrito (nivel 1 implicito). O proximo passo e reunir a equipa e percorre-lo para garantir que todos compreendem os papeis e procedimentos. |
    | b) | Hospital | **Nivel 3 - Simulacao ou Nivel 4 - Paralelo** | Ja faz walk-throughs. O proximo passo logico e testar com um cenario realista (simulacao) ou testar tecnicamente sem impacto (paralelo), dado o contexto critico de saude. |
    | c) | Banco | **Nivel 5 - Full-interruption** | Com maturidade elevada, SOC 24/7 e simulacoes regulares, o banco esta pronto para o teste mais exigente que valida a resposta em condicoes reais. |
    | d) | Camara municipal | **Nivel 1 - Checklist** | Antes de qualquer outro teste, e necessario verificar se o plano esta completo, atualizado e acessivel. Nao faz sentido testar algo que pode estar desatualizado. |
    | e) | Empresa industrial | **Nivel 5 - Full-interruption** | Apos sucesso no teste paralelo, o proximo passo na progressao e o teste com interrupcao real, que valida a resposta completa incluindo impacto em producao. |

---

### Nivel 3 - Analise

#### Exercicio 3.1 - Desenhar cadeia de notificacao

Desenha (em texto ou diagrama) a **cadeia de notificacao** para o seguinte cenario num hospital:

**Cenario:** O sistema de registo clinico eletronico (RCE) fica indisponivel as 7h da manha, afetando o turno da manha de todo o hospital.

Identifica: quem notifica quem, em que ordem, por que canal, e que decisao cada nivel pode tomar.

??? success "Solucao 3.1"

    ```
    DETECAO (7h00)
    │
    │  Enfermeiro/medico deteta indisponibilidade
    │  ──► Liga para Helpdesk (telefone)
    │
    ▼
    HELPDESK (7h05)
    │  Confirma que e generalizado (outros relatos)
    │  ──► Alerta Administrador de Sistemas (telefone + mensagem)
    │  ──► Regista ticket
    │  Decisao: ativar procedimentos manuais temporarios
    │
    ▼
    ADMINISTRADOR DE SISTEMAS (7h10)
    │  Diagnostica causa (falha de servidor? ataque?)
    │  ──► Alerta Coordenador de IR (telefone)
    │  ──► Inicia contencao/recuperacao tecnica
    │  Decisao: restauro vs investigacao forense
    │
    ▼
    COORDENADOR DE IR (7h15)
    │  Avalia gravidade e impacto clinico
    │  ──► Notifica Direcao Clinica (telefone)
    │  ──► Se suspeita de ataque: alerta Analista de Seguranca
    │  ──► Se dados comprometidos: alerta Juridico
    │  Decisao: nivel de escalonamento, comunicacao institucional
    │
    ▼
    DIRECAO CLINICA (7h20)
    │  Avalia impacto no atendimento de pacientes
    │  ──► Comunica a chefes de servico (mensagem interna)
    │  ──► Se necessario: ativa plano de contingencia clinico
    │  Decisao: manter consultas? desviar urgencias?
    │
    ▼
    GESTAO DE TOPO (7h30 - se escalonado)
    │  Avalia impacto institucional
    │  ──► Comunicacao publica se necessario
    │  ──► Contacto com regulador se dados de saude afetados
    │  Decisao: comunicacao externa, recursos adicionais
    ```

    **Conclusao:**

    *A cadeia de notificacao num hospital e particularmente exigente porque envolve dois eixos em paralelo: o eixo tecnico (helpdesk, sistemas, seguranca) e o eixo clinico (direcao clinica, chefes de servico). Ambos devem ser notificados quase em simultaneo porque o impacto clinico nao pode esperar pela resolucao tecnica - sao necessarios procedimentos manuais temporarios enquanto o sistema e restaurado.*

---

#### Exercicio 3.2 - Comparar resposta estruturada vs nao estruturada

Duas empresas de e-commerce sofrem o mesmo incidente: o site fica lento e instavel durante a Black Friday, com indicios de ataque DDoS misturado com trafego legitimo elevado.

- **Empresa A** tem IRP com playbook de DDoS, papeis definidos, criterios de escalonamento e contacto direto com fornecedor cloud.
- **Empresa B** nao tem IRP formal. A equipa de TI resolve tudo e o CEO toma todas as decisoes.

Compara a resposta das duas empresas:

??? success "Solucao 3.2"

    | Aspeto | Empresa A (com IRP) | Empresa B (sem IRP) |
    |--------|---------------------|---------------------|
    | **Verificacao** | Analista de seguranca verifica metricas e distingue trafego DDoS de trafego legitimo em minutos, usando criterios pre-definidos. | A equipa de TI discute se e ataque ou sobrecarga. Ninguem tem criterios claros. Perde-se 30+ minutos em debate. |
    | **Decisao** | Coordenador aplica o playbook: ativa mitigacao DDoS do fornecedor cloud, prioriza checkout sobre navegacao, comunica estimativa ao negocio. | O CEO e chamado e pergunta "o que fazemos?". A equipa de TI sugere desligar funcionalidades, o CEO recusa por medo de perder vendas. Impasse. |
    | **Coordenacao** | Operacoes executa as acoes tecnicas, fornecedor cloud ativa protecao, comunicacao publica mensagem nas redes sociais, negocio avalia impacto financeiro. Tudo em paralelo. | Todos fazem tudo e ninguem faz nada completamente. O fornecedor cloud e contactado tarde. Os clientes reclamam nas redes sem resposta. |
    | **Tempo de resposta** | Contencao em 15-30 minutos. Servico degradado mas funcional. | Contencao em 2-4 horas. Servico completamente indisponivel por periodos. |
    | **Impacto financeiro** | Perda limitada a periodo de degradacao. Reputacao preservada pela comunicacao proativa. | Perda significativa de vendas. Danos reputacionais pelas queixas sem resposta. |

    **Conclusao:**

    *A diferenca fundamental nao e apenas tecnica - e organizacional. A Empresa A sabe quem faz o que, tem criterios para decidir, e nao depende de uma unica pessoa (CEO) para todas as decisoes. A Empresa B sofre de centralizacao excessiva, ausencia de criterios e falta de coordenacao, o que transforma um incidente gerivel numa crise.*

---

## 7. Armadilhas e confusoes a evitar

### Confusao 1: O plano nao e para "estudar" durante a crise

> O plano de resposta a incidentes deve ser **consultavel**, nao lido como um manual academico. Se durante uma crise alguem precisa de ler 50 paginas para saber o que fazer, o plano falhou no formato.

Playbooks curtos, seccoes claras, contactos visiveis e acoes numeradas sao essenciais.

### Confusao 2: Ter documentacao nao significa estar preparado

> Um plano guardado num servidor que ninguem consulta ha meses e um **falso conforto**. Preparacao real implica plano + treino + testes + atualizacao regular.

### Confusao 3: "Processo militar" nao e rigidez absoluta

> O conceito de "processo militar" refere-se a **estrutura e disciplina**, nao a obediencia cega. Significa papeis claros, cadeia de decisao definida e comunicacao disciplinada, mas **com margem para adaptacao ao contexto**.

### Confusao 4: Proteger o plano nao significa esconde-lo

> Proteger a informacao sensivel do plano e necessario, mas o plano deve ser **acessivel quando e necessario**. Um plano em cofre que ninguem abre durante o incidente e tao inutil como nao ter plano.

### Confusao 5: Um teste de checklist nao valida a capacidade de resposta

> Verificar que o plano existe e esta completo (checklist) e importante, mas nao comprova que as **pessoas sabem o que fazer**, que os **procedimentos funcionam**, ou que os **tempos de resposta sao adequados**. Para isso sao necessarios testes de nivel superior.

### Confusao 6: O plano nao e responsabilidade exclusiva da equipa de seguranca

> O IRP envolve seguranca, sistemas, redes, helpdesk, juridico, gestao e comunicacao. Se so a equipa de seguranca conhece o plano, a coordenacao vai falhar durante o incidente.

### Confusao 7: Testar uma vez nao significa estar preparado para sempre

> Pessoas mudam de funcao, contactos ficam desatualizados, sistemas sao substituidos, novas ameacas surgem. Um plano testado ha 18 meses pode ter **contactos errados**, **procedimentos obsoletos** e **cenarios que ja nao se aplicam**.

### Confusao 8: Coordenar nao e o mesmo que fazer

> O coordenador de incidente **nao executa** acoes tecnicas. Coordena quem as executa, mantem a visao global, toma decisoes de escalonamento e comunica com a gestao. Quando o coordenador comeca a fazer tarefas tecnicas, perde a visao de conjunto.

---

## 8. Resumo rapido

### Tabela de conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| **Verificar** | Confirmar se a ameaca e real ou falso positivo antes de agir |
| **Decidir** | Determinar a resposta adequada: isolar, observar, escalar, comunicar |
| **Coordenar** | Articular acoes entre multiplas equipas (seguranca, sistemas, gestao, juridico) |
| **Playbook** | Procedimento detalhado para responder a um tipo especifico de incidente |
| **Runbook** | Procedimento tecnico para executar uma acao concreta |
| **Checklist** | Lista de verificacao rapida para garantir que nada e esquecido |
| **Matriz de escalonamento** | Tabela de contactos, niveis de gravidade e canais |
| **Formato consultavel** | Plano organizado para consulta rapida, nao para leitura sequencial |
| **Redundancia de acesso** | Plano disponivel em multiplos formatos e localizacoes |
| **Niveis de teste** | Progressao de checklist a full-interruption, com realismo crescente |
| **Processo militar** | Resposta estruturada com papeis, cadeia de decisao e disciplina de comunicacao |

### Frases-chave para recordar

- *"A equipa de IR nao faz tudo sozinha: verifica, decide e coordena."*
- *"Em crise, ninguem quer estudar o plano. O plano tem de ser consultavel em segundos."*
- *"Um plano escondido durante uma crise e tao util como nao ter plano."*
- *"Processo militar nao e rigidez: e estrutura, papeis claros e cadeia de decisao definida."*
- *"Organizar por tipo de incidente permite ir direto ao playbook relevante em vez de procurar num documento generico."*
- *"Proteger o plano sem o tornar inacessivel e o equilibrio mais dificil do armazenamento."*
- *"Um plano testado uma vez nao fica valido para sempre: pessoas mudam, sistemas mudam, ameacas evoluem."*
- *"O coordenador coordena, nao executa. Quando comeca a fazer tarefas tecnicas, perde a visao de conjunto."*
- *"A progressao de testes vai de verificar que o plano existe ate testar com interrupcao real."*

### Diagrama de sintese

```
  PLANEAMENTO DO IRP
  ══════════════════

  ┌─────────────────────────────────────────────────────────────┐
  │  EQUIPA DE IR                                               │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
  │  │ Verificar│─►│ Decidir  │─►│Coordenar │                  │
  │  └──────────┘  └──────────┘  └──────────┘                  │
  └─────────────────────────────────────────────────────────────┘
          │                │                │
          ▼                ▼                ▼
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ DOCUMENTACAO │ │   FORMATO    │ │   TESTES     │
  │              │ │              │ │              │
  │ ● Playbooks  │ │ ● Indice     │ │ 1. Checklist │
  │ ● Runbooks   │ │ ● Seccoes    │ │ 2. Walk-thru │
  │ ● Checklists │ │ ● Contactos  │ │ 3. Simulacao │
  │ ● Matrizes   │ │ ● Por tipo   │ │ 4. Paralelo  │
  │ ● Templates  │ │ ● Por papel  │ │ 5. Full-int  │
  └──────────────┘ └──────────────┘ └──────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                 ┌──────────────────┐
                 │  ARMAZENAMENTO   │
                 │                  │
                 │  ● Protegido     │
                 │  ● Acessivel     │
                 │  ● Redundante    │
                 │  ● Atualizado    │
                 └──────────────────┘
```

---

*Proximo capitulo: [Detecao de incidentes](detecao.md)*
