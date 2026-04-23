# Planeamento do IRP

## Índice

1. [As três funções da equipa de IR](#1-as-tres-funcoes-da-equipa-de-ir)
2. [Formato e conteúdo do plano](#2-formato-e-conteudo-do-plano)
3. [Armazenamento do plano](#3-armazenamento-do-plano)
4. [Testar o plano](#4-testar-o-plano)
5. [Exemplos práticos](#5-exemplos-praticos)
6. [Exercícios](#6-exercicios)
7. [Armadilhas e confusões a evitar](#7-armadilhas-e-confusoes-a-evitar)
8. [Resumo rápido](#8-resumo-rapido)

---

## 1. As três funções da equipa de IR

Quando um alerta dispara ou um utilizador reporta algo estranho, a equipa de resposta a incidentes não se limita a "resolver o problema". O trabalho da equipa organiza-se em **três funções fundamentais**: verificar, decidir e coordenar.

> A equipa de IR não é um grupo que faz tudo sozinho. E um grupo que valida o que está a acontecer, decide o que fazer e coordena quem faz o que.

```
  ┌───────────────────────────────────────────────────────────────┐
  │                   EQUIPA DE RESPOSTA (IR)                     │
  │                                                               │
  │   ┌─────────────┐   ┌──────────────────┐   ┌──────────────┐  │
  │   │  VERIFICAR  │──►│     DECIDIR      │──►│  COORDENAR   │  │
  │   │  a ameaça   │   │  a resposta      │   │  as ações    │  │
  │   └─────────────┘   └──────────────────┘   └──────────────┘  │
  │         │                    │                     │          │
  │         ▼                    ▼                     ▼          │
  │   E real ou falso     Isolar? Observar?     Quem faz o que?  │
  │   positivo?           Escalar? Comunicar?   Quando? A quem?  │
  └───────────────────────────────────────────────────────────────┘
```

Este modelo e por vezes chamado de **"processo militar"** - não porque envolva forcas armadas, mas porque segue uma lógica de resposta estruturada: **papeis definidos, cadeia de decisão clara, comunicação disciplinada**. Tal como numa operação militar, ninguém improvisa a hierarquia quando já está sob pressão.

---

### Verificar a ameaça

A primeira função e confirmar se o alerta ou relato corresponde a uma **ameaça real**. Nem tudo o que parece um incidente e de facto um incidente.

| Situação | Resultado possível |
|----------|--------------------|
| Alerta SIEM de login anómalo | Pode ser um colaborador em viagem (falso positivo) |
| Utilizador reporta email suspeito | Pode ser phishing real ou apenas spam comercial |
| Degradação subita de performance | Pode ser ataque DDoS ou problema de infraestrutura |
| EDR deteta processo desconhecido | Pode ser malware ou atualização legítima de software |

**Para refletir:**

- Se a equipa tratar tudo como incidente crítico, o que acontece aos recursos e a motivação?
- Se a equipa ignorar alertas por serem "provavelmente falsos positivos", que risco corre?
- Qual e o equilíbrio entre reagir rápido e confirmar antes de agir?

---

### Determinar a resposta adequada

Após verificar que a ameaça e real, a equipa deve decidir **como responder**. Esta decisão depende do tipo de incidente, da sua gravidade e do contexto.

| Decisão | Quando aplicar | Exemplo |
|---------|----------------|---------|
| **Isolar** | Quando há risco de propagação | Isolar servidor com malware da rede |
| **Observar** | Quando isolar pode alertar o atacante | Monitorizar atividade de conta suspeita para perceber o alcance |
| **Alterar credenciais** | Quando há comprometimento de contas | Forcar reset de passwords após phishing confirmado |
| **Escalar** | Quando a gravidade excede a autoridade da equipa | Envolver gestão de topo, jurídico ou autoridades |
| **Comunicar** | Quando há impacto em utilizadores ou obrigação legal | Notificar CNPD em caso de violação de dados pessoais |

> Decidir não é apenas escolher a ação técnica. E também decidir o **nível de urgência**, a **amplitude da resposta** e **quem precisa de ser envolvido**.

---

### Coordenar ações

A resposta a um incidente raramente envolve apenas a equipa de segurança. E preciso coordenar com múltiplas áreas:

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
  │  Segurança   │ │ Sistemas │ │   Redes    │ │  Helpdesk  │
  │  (análise,   │ │ (isolar, │ │ (bloquear, │ │ (comunicar │
  │  forense)    │ │ restauro)│ │  filtrar)  │ │  a users)  │
  └──────────────┘ └──────────┘ └────────────┘ └────────────┘
          │              │              │               │
          └──────────────┼──────────────┘               │
                         ▼                              │
                 ┌──────────────┐               ┌──────────────┐
                 │   Gestão /   │               │   Jurídico   │
                 │   Direção    │               │   (RGPD,     │
                 │              │               │   regulador) │
                 └──────────────┘               └──────────────┘
```

Sem coordenação, cada equipa pode tomar decisões contraditórias. Por exemplo: a equipa de redes bloqueia um IP enquanto a equipa de segurança ainda está a monitorizar o atacante por esse mesmo canal.

---

### Documentação orientadora

Para que a equipa possa verificar, decidir e coordenar eficazmente, precisa de **documentação preparada antes do incidente**. Um plano que ninguém consegue encontrar durante uma crise e tao útil como não ter plano nenhum.

| Instrumento | Descrição | Função principal |
|-------------|-----------|------------------|
| **Playbook** | Procedimento detalhado para um tipo específico de incidente (ex: ransomware, phishing) | Guiar a resposta passo a passo |
| **Runbook** | Procedimento técnico específico para uma ação concreta (ex: como isolar um servidor) | Executar ações técnicas sem ambiguidade |
| **Checklist** | Lista de verificação rápida de ações a tomar ou pontos a confirmar | Garantir que nada é esquecido sob pressão |
| **Matriz de escalonamento** | Tabela de contactos, níveis de gravidade e canais de comunicação | Saber quem contactar, quando e como |
| **Lista de contactos** | Contactos de emergência internos e externos (fornecedores, reguladores, autoridades) | Acesso rápido a pessoas-chave |
| **Template de comunicação** | Modelos pré-escritos para comunicação interna, externa, a reguladores | Comunicar sem improvisar sob pressão |
| **Critérios de decisão** | Regras pré-definidas para decidir escalonamento, isolamento, comunicação | Evitar hesitação e subjetividade |
| **Fluxo de escalonamento** | Diagrama que mostra quando e como escalar, até que nível | Garantir que a cadeia de decisão e clara |

> Documentação orientadora não é burocracia. E o equivalente a um mapa durante uma emergência: quem tem mapa chega mais rápido e com menos erros.

---

## 2. Formato e conteúdo do plano

Ter um plano bem escrito não é suficiente se o formato não permitir **consulta rápida em contexto de crise**. O formato e tao importante quanto o conteúdo.

> Em crise, ninguém quer "estudar" o plano. O plano tem de ser consultável, não lido como um livro.

---

### Acesso rápido em contexto de crise

O plano deve ser desenhado para uso sob pressão. Isso implica:

| Caracteristica | Porque e necessária |
|----------------|---------------------|
| **Índice claro** | Encontrar rapidamente a secção relevante |
| **Seccoes por tipo de incidente** | Ir direto ao playbook do incidente em causa |
| **Papeis definidos** | Cada pessoa sabe onde encontrar as suas responsabilidades |
| **Passos claros e numerados** | Seguir uma sequência sem ter de interpretar texto corrido |
| **Contactos visíveis** | Não perder tempo a procurar números de telefone |
| **Critérios de escalonamento destacados** | Saber quando e obrigatório escalar |
| **Ações iniciais em destaque** | Os primeiros 15 minutos são os mais críticos |

O conceito de **"binder"** (dossier organizado) aplica-se aqui: o plano deve existir num formato consultável - seja em papel, wiki interna, SharePoint, ou playbooks impressos e distribuidos. O importante e que esteja **organizado, acessível e atualizado**.

---

### Organizar por tipo de incidente

Uma abordagem eficaz e criar um **diretorio de incidentes**, onde cada tipo tem o seu próprio playbook ou secção dedicada.

| Tipo de incidente | Conteúdo do playbook | Ações iniciais críticas |
|-------------------|---------------------|------------------------|
| **Phishing** | Identificar alcance, bloquear remetente, reset de credenciais, comunicação a utilizadores | Verificar quantos clicaram; forcar reset de passwords |
| **Malware / Ransomware** | Isolar sistemas, preservar evidências, avaliar propagação, contactar autoridades se necessário | Isolar da rede imediatamente; não desligar equipamento |
| **Indisponibilidade de serviço** | Diagnosticar causa (ataque vs falha), ativar redundância, comunicar a utilizadores | Ativar serviços alternativos; comunicar estimativa de recuperação |
| **Violação de dados (data breach)** | Identificar dados expostos, avaliar obrigação legal, notificar regulador, comunicar a afetados | Conter a exposição; iniciar avaliação de impacto RGPD |
| **Abuso interno (insider)** | Preservar evidências, limitar acessos, envolver jurídico e RH | Revogar acessos sem alertar o suspeito; preservar logs |

---

### Cada papel deve ver o que lhe compete

O plano não é um documento único para todos lerem da mesma forma. Cada papel deve conseguir encontrar rapidamente **o que lhe compete fazer**.

| Papel | O que fazer | Quando | Comunicar a quem | Quando escalar | O que NAO fazer |
|-------|-------------|--------|-------------------|----------------|-----------------|
| **Coordenador** | Liderar a resposta, tomar decisões, manter visão global | Desde o primeiro alerta | Gestão, jurídico, equipas técnicas | Quando há impacto em dados pessoais ou reputação | Não executar ações técnicas diretamente |
| **Analista de segurança** | Investigar, recolher evidências, analisar logs | Após verificação inicial | Coordenador | Quando descobre propagação ou dados comprometidos | Não isolar sistemas sem coordenar com operações |
| **Administrador de sistemas** | Isolar, conter, restaurar sistemas | Quando recebe instrução do coordenador | Coordenador, analista | Quando a contenção afeta serviços críticos | Não reinstalar sem preservar evidências |
| **Helpdesk** | Comunicar com utilizadores, recolher relatos, encaminhar alertas | Desde o primeiro relato | Coordenador, utilizadores | Quando recebe múltiplos relatos do mesmo problema | Não dar informação técnica detalhada a utilizadores |
| **Gestão** | Aprovar decisões críticas, alocar recursos, comunicação externa | Quando escalonado pelo coordenador | Jurídico, comunicação, reguladores | Quando há implicações legais ou financeiras significativas | Não interferir em decisões técnicas sem contexto |
| **Jurídico** | Avaliar obrigações legais, notificações obrigatórias | Quando há comprometimento de dados pessoais | Coordenador, gestão, reguladores | Quando há obrigação de notificação (ex: RGPD 72h) | Não atrasar a contenção técnica por análise jurídica |

---

### Exemplo de estrutura de um playbook

Um playbook bem estruturado segue uma lógica de consulta rápida. Abaixo está uma estrutura tipo para um **playbook de ransomware**:

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
  │  4. Registar hora de deteção e sintomas observados            │
  │                                                               │
  │  VERIFICACAO (15-60 minutos)                                  │
  │  ───────────────────────────                                  │
  │  5. Confirmar que e ransomware (nota de resgate? extensões?)  │
  │  6. Identificar variante se possível                          │
  │  7. Verificar alcance: que sistemas estão afetados?           │
  │  8. Verificar se backups estão intactos                       │
  │                                                               │
  │  CONTENCAO (1-4 horas)                                        │
  │  ──────────────────────                                       │
  │  9. Bloquear vectores de propagação (portas, partilhas)       │
  │  10. Desativar contas comprometidas                           │
  │  11. Preservar evidências (logs, imagens de disco)            │
  │  12. Avaliar necessidade de comunicação externa               │
  │                                                               │
  │  ESCALONAMENTO                                                │
  │  ─────────────                                                │
  │  ● Dados pessoais afetados? ──► Jurídico + CNPD (72h)        │
  │  ● Serviço crítico parado?  ──► Gestão de topo               │
  │  ● Propagação não contida?  ──► Fornecedor externo / CERT    │
  │                                                               │
  │  CONTACTOS                                                    │
  │  ─────────                                                    │
  │  Coordenador IR:  [nome] - [telefone] - [email]               │
  │  Segurança:       [nome] - [telefone] - [email]               │
  │  Gestão:          [nome] - [telefone] - [email]               │
  │  CERT nacional:   [telefone] - [email]                        │
  │  CNPD:            [telefone] - [formulário online]            │
  │                                                               │
  └═══════════════════════════════════════════════════════════════┘
```

**Como interpretar:**

*O playbook não é um documento para ler de capa a capa. E um guia de consulta rápida: abrir na secção relevante, seguir os passos, verificar os contactos, aplicar os critérios de escalonamento. A estrutura visual com secções separadas, numeração e destaques e intencional - numa crise, o olho precisa de encontrar a informação em segundos, não em minutos.*

---

## 3. Armazenamento do plano

O plano de resposta a incidentes contem informação **sensível**: contactos pessoais, sistemas críticos, caminhos de escalonamento, vulnerabilidades conhecidas. Esta informação deve ser **protegida** - mas tem de ser **acessível quando e necessária**.

> A tensão central do armazenamento e: proteger sem tornar inacessível. Um plano escondido num cofre durante uma crise e tao inutil como não ter plano.

---

### Proteger sem tornar inacessível

| Extremo | Problema |
|---------|----------|
| **Demasiado protegido** | Plano numa pasta encriptada que só o CISO conhece; ninguém o encontra durante o incidente |
| **Sem proteção** | Plano acessível a todos, incluindo atacantes que podem usa-lo para entender as defesas |
| **Dependente de um sistema** | Plano armazenado apenas no servidor que também pode ser afetado pelo incidente |
| **Dependente de uma pessoa** | Só uma pessoa sabe onde está ou como aceder |

O equilíbrio correto envolve:

| Prática | Descrição |
|---------|-----------|
| **Acesso controlado** | Acessivel a equipa de IR e gestão, com controlo de acessos adequado |
| **Múltiplos formatos** | Versão digital (wiki, SharePoint) e versão impressa como backup |
| **Armazenamento independente** | Não depender exclusivamente de sistemas que possam estar comprometidos |
| **Atualização regular** | Contactos, sistemas e procedimentos mudam - o plano deve acompanhar |
| **Localização conhecida** | Todos os membros da equipa de IR sabem onde encontrar o plano |

---

### Redundância de acesso

O plano deve estar disponível **mesmo quando os sistemas principais falham**. Isto requer pensar em redundância:

```
  ┌───────────────────────────────────────────────────────┐
  │              REDUNDANCIA DE ACESSO AO PLANO           │
  │                                                       │
  │   Localização primária                                │
  │   ├── Wiki interna / SharePoint (rede corporativa)    │
  │   │                                                   │
  │   Localização secundária                              │
  │   ├── Pasta partilhada em cloud (acesso externo)      │
  │   │                                                   │
  │   Localização terciaria                               │
  │   ├── Versão impressa no escritório de segurança      │
  │   │                                                   │
  │   Localização de emergência                           │
  │   └── Copia em pen USB segura (guardada em cofre)     │
  └───────────────────────────────────────────────────────┘
```

**Para refletir:**

- Se a rede corporativa estiver comprometida, como acede a equipa ao plano?
- Se o único responsável que sabe a password do SharePoint estiver de ferias, o que acontece?
- Qual e o risco de ter uma versão impressa desatualizada?

---

## 4. Testar o plano

Um plano que nunca foi testado e apenas uma teoria. Testar o plano e a única forma de saber se **funciona na prática**, se as **pessoas sabem os seus papeis**, e se os **contactos e procedimentos estão atuais**.

> Um plano testado uma vez não fica válido para sempre. Pessoas mudam, sistemas mudam, contactos mudam, ameaças evoluem.

---

### Níveis de teste

Existem cinco níveis progressivos de teste, cada um com complexidade e realismo crescentes:

| Nível | Designação | Descrição | O que testa | Exemplo |
|:-----:|------------|-----------|-------------|---------|
| 1 | **Checklist** | Verificação documental: o plano existe, está completo, atualizado e acessível | Existencia e completude do plano | Verificar que todos os contactos estão atuais, que os playbooks cobrem os cenários relevantes |
| 2 | **Structured walk-through** | Reuniao onde os participantes percorrem o plano passo a passo, discutindo cada fase | Compreensão dos papeis e procedimentos | A equipa reune-se e simula: "se recebermos um alerta de ransomware, quem faz o que?" |
| 3 | **Simulação** | Cenário fictício e apresentado e as equipas reagem como se fosse real (sem impacto em produção) | Capacidade de decisão e coordenação | Exercício tabletop: "as 10h recebemos alerta de phishing massivo - como respondem?" |
| 4 | **Teste paralelo** | Teste técnico em ambiente paralelo, sem interromper operações reais | Procedimentos técnicos e tempos de resposta | Restauro de backups num servidor de teste, verificando se o RTO e cumprido |
| 5 | **Full-interruption** | Teste completo com interrupção real ou quase-real dos sistemas | Resposta completa em condições reais | Desligar efetivamente um serviço e testar a resposta de ponta a ponta |

**Como interpretar:**

*Não é necessário (nem prático) começar pelo nível mais alto. A progressão natural e começar por verificar que o plano existe e está completo (checklist), depois garantir que as pessoas o compreendem (walk-through), depois simular cenários (simulação), e só entao testar tecnicamente (paralelo e full-interruption). Cada nível acrescenta realismo e revela problemas que o nível anterior não consegue detetar.*

---

### Progressão de maturidade

A maturidade de testes de um plano IRP pode ser representada como uma progressão:

```
  Nível de realismo e complexidade
  ▲
  │
  │  5. Full-interruption ──────────────────────── ●
  │     (teste real, com interrupção)              │
  │                                                │
  │  4. Paralelo ─────────────────────── ●         │
  │     (teste técnico, sem parar)       │         │
  │                                      │         │
  │  3. Simulação ──────────── ●         │         │
  │     (cenário fictício)     │         │         │
  │                            │         │         │
  │  2. Walk-through ── ●      │         │         │
  │     (percorrer)     │      │         │         │
  │                     │      │         │         │
  │  1. Checklist ●     │      │         │         │
  │     (verificar)│    │      │         │         │
  │                │    │      │         │         │
  └────────────────┼────┼──────┼─────────┼─────────┼──────────►
                   │    │      │         │         │     Maturidade
              Início  Basico  Intermedio Avancado  Excelencia
```

**Para refletir:**

- Uma organização que só faz checklists pode estar confiante num plano que nunca foi realmente testado. Que riscos corre?
- Qual e o custo de um teste full-interruption? Quando se justifica esse investimento?
- Com que frequência devem ser repetidos os testes?

---

## 5. Exemplos práticos

### Exemplo 1 - Banco: acesso a contas privilegiadas

**Cenário:** O SOC de um banco deteta que uma conta de administrador de base de dados foi usada fora do horário normal para executar queries invulgares na base de dados de clientes.

| Função IR | Ação | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar se o acesso e legítimo | Contactar o titular da conta; verificar se havia manutenção agendada; analisar o tipo de queries executadas |
| **Decidir** | Definir resposta com base na verificação | Se não é legítimo: suspender conta, preservar logs, avaliar dados acedidos. Se e legítimo: documentar e rever políticas de acesso fora de horas |
| **Coordenar** | Envolver múltiplas equipas | Segurança (análise forense), DBA (verificar integridade), jurídico (avaliar impacto regulatório), gestão (decisão sobre comunicação ao regulador bancário) |

**Como interpretar:**

*Num banco, o acesso a dados de clientes e altamente regulado. A verificação tem de ser rápida mas cuidadosa: suspender uma conta de administrador pode parar operações críticas, mas não suspender pode permitir exfiltração de dados. A decisão equilibra risco operacional e risco de segurança. A coordenação e crítica porque envolve equipas técnicas, juridicas e de gestão em simultâneo.*

**Para refletir:**

- Se a conta pertencer a um administrador senior, a verificação muda? Porquee?
- Que informação dos logs e mais útil para distinguir atividade legítima de maliciosa?
- Se os dados de clientes tiverem sido efetivamente acedidos, que obrigações legais existem?

---

### Exemplo 2 - Hospital: malware no servidor de exames

**Cenário:** O sistema de armazenamento de exames médicos (PACS) de um hospital começa a mostrar sinais de infeção por malware: processos anómalos, lentidao extrema e ficheiros com extensões desconhecidas.

| Função IR | Ação | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar infeção e identificar tipo | Análise de processos, verificação de extensões de ficheiros, consulta de IoCs (Indicators of Compromise) |
| **Decidir** | Resposta equilibrada com o contexto clínico | Isolar o servidor da rede MAS garantir acesso alternativo a exames críticos; não desligar para preservar evidências; avaliar se há propagação |
| **Coordenar** | Multiplas equipas com urgência diferente | Segurança (análise e contenção), sistemas (isolamento e alternativas), direção clínica (impacto no atendimento), jurídico (dados de saúde afetados), comunicação (informar profissionais de saúde) |

**Como interpretar:**

*A coordenação num hospital e particularmente crítica porque a resposta técnica pode entrar em conflito com a necessidade clínica. Isolar um servidor de exames pode significar que médicos não conseguem consultar resultados críticos. A equipa de IR tem de coordenar com a direção clínica para garantir que existe uma alternativa (mesmo que manual ou degradada) antes de isolar.*

**Para refletir:**

- Se o malware estiver a propagar-se ativamente, justifica-se isolar mesmo sem alternativa clínica pronta?
- Que tipo de dados de saúde estão em risco e que regulamentação se aplica?
- Como garantir que os profissionais de saúde são informados sem criar pânico?

---

### Exemplo 3 - Universidade: campanha de phishing

**Cenário:** O helpdesk de uma universidade recebe 30 chamadas em 2 horas de docentes e funcionários que reportam o mesmo email suspeito, alegadamente do serviço de informática, pedindo atualização de password.

| Função IR | Ação | Detalhe |
|-----------|------|---------|
| **Verificar** | Confirmar que é phishing e avaliar alcance | Analisar o email (headers, link destino); verificar quantos destinatários receberam; verificar quantos clicaram no link; verificar se há credenciais comprometidas |
| **Decidir** | Resposta proporcional ao alcance | Se poucos clicaram: reset de passwords individual e comunicação direta. Se muitos clicaram: reset forcado em massa, bloqueio de sessões, comunicação institucional |
| **Coordenar** | Helpdesk, segurança, comunicação, utilizadores | Helpdesk (triagem de chamadas, resposta padrão), segurança (análise técnica, bloqueio de URL), comunicação (aviso institucional), sistemas (reset de credenciais, monitorização de acessos) |

**Como interpretar:**

*Numa universidade, a comunidade de utilizadores e grande e diversa (docentes, funcionários, alunos), o que torna a comunicação particularmente desafiante. O helpdesk e a primeira linha: se não tiver instruções claras, vai dar informações contraditórias. A coordenação entre helpdesk, segurança e comunicação institucional e essencial para responder de forma coerente.*

**Para refletir:**

- Se o helpdesk não tiver um template de comunicação preparado, que tipo de respostas inconsistentes pode dar?
- Como distinguir rapidamente quem clicou no link de quem apenas recebeu o email?
- Que impacto tem um reset forcado de passwords em massa numa universidade com milhares de utilizadores?

---

### Exemplo 4 - E-commerce: degradação do site

**Cenário:** O site de uma plataforma de e-commerce começa a apresentar tempos de resposta anormalmente altos durante uma campanha promocional. Os clientes reportam erros ao concluir compras.

| Função IR | Ação | Detalhe |
|-----------|------|---------|
| **Verificar** | Distinguir ataque de problema de capacidade | Analisar padrões de tráfego (e tráfego real ou ataque DDoS?); verificar métricas de infraestrutura (CPU, memória, rede); consultar fornecedor cloud |
| **Decidir** | Resposta adaptada a causa | Se e DDoS: ativar mitigação, escalar para fornecedor cloud. Se e sobrecarga legítima: escalar infraestrutura (auto-scaling), priorizar funcionalidades críticas (checkout vs navegação) |
| **Coordenar** | Operações, cloud, negócio, comunicação | Operações (monitorização e ação técnica), fornecedor cloud (suporte e escalonamento), negócio (impacto financeiro, decisão sobre campanha), comunicação (informar clientes nas redes sociais) |

**Como interpretar:**

*Este cenário mostra que a verificação inicial e crítica para determinar a resposta correta. Responder a uma sobrecarga legítima como se fosse um ataque (ou vice-versa) desperdicaria recursos e tempo. A coordenação com o negócio e importante porque a decisão de suspender uma campanha promocional tem impacto financeiro direto e não é puramente técnica.*

**Para refletir:**

- Se a equipa de IR concluir que é um ataque DDoS, mas a equipa de negócio não quiser suspender a campanha, como se resolve o conflito?
- Que métricas distinguem tráfego de ataque de tráfego legítimo elevado?
- Qual e o custo de cada minuto de indisponibilidade durante uma campanha promocional?

---

## 6. Exercícios

### Nível 1 - Compreensão

#### Exercício 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmações como Verdadeiras (V) ou Falsas (F):

| # | Afirmação |
|---|-----------|
| a) | O plano de resposta a incidentes deve ser guardado apenas em formato digital na rede corporativa. |
| b) | Um playbook e um procedimento detalhado para responder a um tipo específico de incidente. |
| c) | A equipa de IR tem três funções principais: verificar, decidir e coordenar. |
| d) | Um teste full-interruption e o nível de teste mais simples e deve ser o primeiro a ser realizado. |
| e) | O formato do plano e irrelevante desde que o conteúdo esteja correto. |
| f) | O plano de resposta a incidentes contem informação sensível que deve ser protegida. |
| g) | Um plano testado uma vez permanece válido indefinidamente. |
| h) | O "processo militar" significa que a resposta a incidentes deve ser feita por militares. |

??? success "Solução 1.1"

    | # | Resposta | Justificação |
    |---|:--------:|-------------|
    | a) | **F** | O plano deve existir em **múltiplos formatos e localizações** (digital, impresso, cloud, pen USB) para garantir acesso mesmo quando os sistemas principais falham. |
    | b) | **V** | O playbook e um procedimento passo-a-passo para cenários específicos como phishing, ransomware ou data breach. |
    | c) | **V** | As três funções fundamentais são: **verificar** a ameaça (real ou falso positivo?), **decidir** a resposta adequada (isolar? escalar?) e **coordenar** ações entre equipas. |
    | d) | **F** | O full-interruption e o nível **mais complexo** e realista. A progressão começa pelo checklist (nível 1) e sobe gradualmente. |
    | e) | **F** | O formato e tao importante quanto o conteúdo. Em crise, um plano mal organizado não é consultável e perde eficácia. |
    | f) | **V** | O plano contem contactos pessoais, sistemas críticos, vulnerabilidades e caminhos de escalonamento - informação que deve ser protegida. |
    | g) | **F** | Pessoas mudam, sistemas mudam, contactos mudam, ameaças evoluem. O plano deve ser **reavaliado e testado regularmente**. |
    | h) | **F** | O conceito de "processo militar" refere-se a uma **resposta estruturada** com papeis definidos e cadeia de decisão clara, não a envolvimento militar literal. |

---

#### Exercício 1.2 - Associar instrumentos a definições

Associa cada instrumento a sua definição correta.

**Instrumentos:** Playbook | Runbook | Checklist | Matriz de escalonamento | Template de comunicação | Critérios de decisão

| # | Definição |
|---|-----------|
| a) | Modelos pré-escritos para comunicar interna e externamente durante um incidente |
| b) | Lista de verificação rápida para garantir que nada é esquecido sob pressão |
| c) | Procedimento detalhado para responder a um tipo específico de incidente |
| d) | Tabela de contactos com níveis de gravidade e canais de comunicação |
| e) | Regras pré-definidas para decidir quando isolar, escalar ou comunicar |
| f) | Procedimento técnico específico para executar uma ação concreta |

??? success "Solução 1.2"

    | # | Definição | Instrumento |
    |---|-----------|-------------|
    | a) | Modelos pré-escritos para comunicação | **Template de comunicação** |
    | b) | Lista de verificação rápida | **Checklist** |
    | c) | Procedimento detalhado por tipo de incidente | **Playbook** |
    | d) | Tabela de contactos e níveis | **Matriz de escalonamento** |
    | e) | Regras pré-definidas para decisões | **Critérios de decisão** |
    | f) | Procedimento técnico específico | **Runbook** |

---

### Nível 2 - Aplicação prática

#### Exercício 2.1 - Quem verifica, quem decide, quem coordena

Para o seguinte cenário, indica quem deve **verificar**, quem deve **decidir** e quem deve **coordenar**, e que ações concretas cada um deve tomar.

**Cenário:** Uma empresa de consultoria descobre que um ex-colaborador, cujo contrato terminou há duas semanas, contínua a aceder ao sistema de gestão de projetos e a descarregar documentos de clientes.

??? success "Solução 2.1"

    | Função | Quem | Ações concretas |
    |--------|------|-----------------|
    | **Verificar** | Analista de segurança + Administrador de sistemas | Confirmar que os acessos são reais (verificar logs de autenticação); confirmar que o contrato efetivamente terminou (consultar RH); verificar que documentos foram acedidos/descarregados; confirmar que a conta devia ter sido desativada |
    | **Decidir** | Coordenador de incidente + Gestão | Suspender imediatamente a conta; avaliar se os dados descarregados são confidenciais; decidir se há necessidade de ação legal; decidir comunicação ao cliente cujos dados foram acedidos |
    | **Coordenar** | Coordenador de incidente | Articular com: RH (confirmar fim de contrato, processo disciplinar/legal), sistemas (desativar conta, revogar todos os acessos), segurança (preservar evidências, análise forense), jurídico (avaliar implicações legais e contratuais), gestão (comunicação ao cliente) |

    **Conclusão:**

    *Este cenário revela uma falha no processo de offboarding: a conta devia ter sido desativada quando o contrato terminou. A resposta ao incidente inclui não só a contenção imediata (desativar conta) mas também a identificação da causa raiz (falha no processo de saida) e a melhoria do processo para evitar recorrência.*

---

#### Exercício 2.2 - Identificar problemas num plano mal estruturado

Analisa a seguinte descrição de um plano de resposta a incidentes e identifica **pelo menos 5 problemas**.

**Descrição do plano:**

*"O nosso plano de resposta a incidentes está guardado num ficheiro Word na pasta pessoal do responsável de segurança. O documento tem 80 páginas e cobre todos os cenários possíveis num texto corrido, sem índice. Os contactos de emergência referem-se a colaboradores que sairam da empresa há 6 meses. Nunca testamos o plano porque temos confiança na equipa. O plano está protegido por uma password que só o responsável de segurança conhece."*

??? success "Solução 2.2"

    | # | Problema | Porque e um problema |
    |---|---------|----------------------|
    | 1 | **Armazenamento numa pasta pessoal** | Se o responsável estiver indisponível, ninguém acede ao plano. Dependência de uma única pessoa. |
    | 2 | **Formato de texto corrido sem índice** | Em crise, ninguém vai ler 80 páginas. O plano deve ser consultável rapidamente, com secções, índice e playbooks separados. |
    | 3 | **Contactos desatualizados (6 meses)** | Contactar pessoas que já não trabalham na empresa durante um incidente gera perda de tempo crítica. |
    | 4 | **Nunca testado** | Um plano que nunca foi testado e apenas uma teoria. Pode conter erros, omissões ou procedimentos impraticáveis que só se descobrem durante um incidente real. |
    | 5 | **Password conhecida por uma única pessoa** | Se essa pessoa estiver de ferias, doente ou indisponível, o plano fica inacessível quando e mais necessário. |
    | 6 | **Sem redundância de armazenamento** | Ficheiro único, num único local. Se o sistema falhar ou for comprometido, o plano perde-se. |
    | 7 | **80 páginas sem separação por tipo de incidente** | Não segue a lógica de playbooks por cenário. Obriga a procurar informação relevante num documento monolítico. |

---

#### Exercício 2.3 - Escolher o nível de teste adequado

Para cada organização, indica qual o **nível de teste mais adequado** como próximo passo, considerando a sua maturidade atual.

| # | Organização | Situação atual |
|---|-------------|---------------|
| a) | Startup de 15 pessoas | Escreveu o primeiro IRP há 2 semanas, nunca o discutiu em equipa |
| b) | Hospital público | Tem IRP há 3 anos, faz walk-throughs anuais, nunca testou tecnicamente |
| c) | Banco | Tem IRP maduro, faz simulações trimestrais, tem SOC 24/7 |
| d) | Camara municipal | Tem IRP no SharePoint, nunca verificou se está completo e atualizado |
| e) | Empresa industrial | Fez um teste paralelo recentemente com sucesso |

??? success "Solução 2.3"

    | # | Organização | Nível recomendado | Justificação |
    |---|-------------|-------------------|-------------|
    | a) | Startup | **Nível 2 - Walk-through** | Já tem o plano escrito (nível 1 implicito). O próximo passo e reunir a equipa e percorre-lo para garantir que todos compreendem os papeis e procedimentos. |
    | b) | Hospital | **Nível 3 - Simulação ou Nível 4 - Paralelo** | Já faz walk-throughs. O próximo passo lógico e testar com um cenário realista (simulação) ou testar tecnicamente sem impacto (paralelo), dado o contexto crítico de saúde. |
    | c) | Banco | **Nível 5 - Full-interruption** | Com maturidade elevada, SOC 24/7 e simulações regulares, o banco está pronto para o teste mais exigente que valida a resposta em condições reais. |
    | d) | Camara municipal | **Nível 1 - Checklist** | Antes de qualquer outro teste, e necessário verificar se o plano está completo, atualizado e acessível. Não faz sentido testar algo que pode estar desatualizado. |
    | e) | Empresa industrial | **Nível 5 - Full-interruption** | Após sucesso no teste paralelo, o próximo passo na progressão e o teste com interrupção real, que valida a resposta completa incluindo impacto em produção. |

---

### Nível 3 - Análise

#### Exercício 3.1 - Desenhar cadeia de notificação

Desenha (em texto ou diagrama) a **cadeia de notificação** para o seguinte cenário num hospital:

**Cenário:** O sistema de registo clínico eletrónico (RCE) fica indisponível as 7h da manhã, afetando o turno da manhã de todo o hospital.

Identifica: quem notifica quem, em que ordem, por que canal, e que decisão cada nível pode tomar.

??? success "Solução 3.1"

    ```
    DETECAO (7h00)
    │
    │  Enfermeiro/médico deteta indisponibilidade
    │  ──► Liga para Helpdesk (telefone)
    │
    ▼
    HELPDESK (7h05)
    │  Confirma que e generalizado (outros relatos)
    │  ──► Alerta Administrador de Sistemas (telefone + mensagem)
    │  ──► Regista ticket
    │  Decisão: ativar procedimentos manuais temporários
    │
    ▼
    ADMINISTRADOR DE SISTEMAS (7h10)
    │  Diagnóstica causa (falha de servidor? ataque?)
    │  ──► Alerta Coordenador de IR (telefone)
    │  ──► Inicia contenção/recuperação técnica
    │  Decisão: restauro vs investigação forense
    │
    ▼
    COORDENADOR DE IR (7h15)
    │  Avalia gravidade e impacto clínico
    │  ──► Notifica Direção Clinica (telefone)
    │  ──► Se suspeita de ataque: alerta Analista de Segurança
    │  ──► Se dados comprometidos: alerta Jurídico
    │  Decisão: nível de escalonamento, comunicação institucional
    │
    ▼
    DIRECAO CLINICA (7h20)
    │  Avalia impacto no atendimento de pacientes
    │  ──► Comunica a chefes de serviço (mensagem interna)
    │  ──► Se necessário: ativa plano de contingência clínico
    │  Decisão: manter consultas? desviar urgências?
    │
    ▼
    GESTAO DE TOPO (7h30 - se escalonado)
    │  Avalia impacto institucional
    │  ──► Comunicação pública se necessário
    │  ──► Contacto com regulador se dados de saúde afetados
    │  Decisão: comunicação externa, recursos adicionais
    ```

    **Conclusão:**

    *A cadeia de notificação num hospital e particularmente exigente porque envolve dois eixos em paralelo: o eixo técnico (helpdesk, sistemas, segurança) e o eixo clínico (direção clínica, chefes de serviço). Ambos devem ser notificados quase em simultâneo porque o impacto clínico não pode esperar pela resolução técnica - são necessários procedimentos manuais temporários enquanto o sistema e restaurado.*

---

#### Exercício 3.2 - Comparar resposta estruturada vs não estruturada

Duas empresas de e-commerce sofrem o mesmo incidente: o site fica lento e instavel durante a Black Friday, com indicios de ataque DDoS misturado com tráfego legítimo elevado.

- **Empresa A** tem IRP com playbook de DDoS, papeis definidos, critérios de escalonamento e contacto direto com fornecedor cloud.
- **Empresa B** não tem IRP formal. A equipa de TI resolve tudo é o CEO toma todas as decisões.

Compara a resposta das duas empresas:

??? success "Solução 3.2"

    | Aspeto | Empresa A (com IRP) | Empresa B (sem IRP) |
    |--------|---------------------|---------------------|
    | **Verificação** | Analista de segurança verifica métricas e distingue tráfego DDoS de tráfego legítimo em minutos, usando critérios pré-definidos. | A equipa de TI discute se e ataque ou sobrecarga. Ninguem tem critérios claros. Perde-se 30+ minutos em debate. |
    | **Decisão** | Coordenador aplica o playbook: ativa mitigação DDoS do fornecedor cloud, prioriza checkout sobre navegação, comunica estimativa ao negócio. | O CEO e chamado e pergunta "o que fazemos?". A equipa de TI sugere desligar funcionalidades, o CEO recusa por medo de perder vendas. Impasse. |
    | **Coordenação** | Operações executa as ações técnicas, fornecedor cloud ativa proteção, comunicação pública mensagem nas redes sociais, negócio avalia impacto financeiro. Tudo em paralelo. | Todos fazem tudo é ninguém faz nada completamente. O fornecedor cloud e contactado tarde. Os clientes reclamam nas redes sem resposta. |
    | **Tempo de resposta** | Contenção em 15-30 minutos. Serviço degradado mas funcional. | Contenção em 2-4 horas. Serviço completamente indisponível por períodos. |
    | **Impacto financeiro** | Perda limitada a período de degradação. Reputação preservada pela comunicação proativa. | Perda significativa de vendas. Danos reputacionais pelas queixas sem resposta. |

    **Conclusão:**

    *A diferença fundamental não é apenas técnica - e organizacional. A Empresa A sabe quem faz o que, tem critérios para decidir, e não depende de uma única pessoa (CEO) para todas as decisões. A Empresa B sofre de centralização excessiva, ausência de critérios e falta de coordenação, o que transforma um incidente gerivel numa crise.*

---

## 7. Armadilhas e confusões a evitar

### Confusão 1: O plano não é para "estudar" durante a crise

> O plano de resposta a incidentes deve ser **consultável**, não lido como um manual académico. Se durante uma crise alguém precisa de ler 50 páginas para saber o que fazer, o plano falhou no formato.

Playbooks curtos, secções claras, contactos visíveis e ações numeradas são essenciais.

### Confusão 2: Ter documentação não significa estar preparado

> Um plano guardado num servidor que ninguém consulta há meses e um **falso conforto**. Preparação real implica plano + treino + testes + atualização regular.

### Confusão 3: "Processo militar" não é rigidez absoluta

> O conceito de "processo militar" refere-se a **estrutura e disciplina**, não a obediência cega. Significa papeis claros, cadeia de decisão definida e comunicação disciplinada, mas **com margem para adaptação ao contexto**.

### Confusão 4: Proteger o plano não significa esconde-lo

> Proteger a informação sensível do plano e necessário, mas o plano deve ser **acessível quando e necessário**. Um plano em cofre que ninguém abre durante o incidente e tao inutil como não ter plano.

### Confusão 5: Um teste de checklist não valida a capacidade de resposta

> Verificar que o plano existe e está completo (checklist) e importante, mas não comprova que as **pessoas sabem o que fazer**, que os **procedimentos funcionam**, ou que os **tempos de resposta são adequados**. Para isso são necessários testes de nível superior.

### Confusão 6: O plano não é responsabilidade exclusiva da equipa de segurança

> O IRP envolve segurança, sistemas, redes, helpdesk, jurídico, gestão e comunicação. Se só a equipa de segurança conhece o plano, a coordenação vai falhar durante o incidente.

### Confusão 7: Testar uma vez não significa estar preparado para sempre

> Pessoas mudam de função, contactos ficam desatualizados, sistemas são substituidos, novas ameaças surgem. Um plano testado há 18 meses pode ter **contactos errados**, **procedimentos obsoletos** e **cenários que já não se aplicam**.

### Confusão 8: Coordenar não é o mesmo que fazer

> O coordenador de incidente **não executa** ações técnicas. Coordena quem as executa, mantem a visão global, toma decisões de escalonamento e comunica com a gestão. Quando o coordenador começa a fazer tarefas técnicas, perde a visão de conjunto.

---

## 8. Resumo rápido

### Tabela de conceitos-chave

| Conceito | Descrição |
|----------|-----------|
| **Verificar** | Confirmar se a ameaça e real ou falso positivo antes de agir |
| **Decidir** | Determinar a resposta adequada: isolar, observar, escalar, comunicar |
| **Coordenar** | Articular ações entre múltiplas equipas (segurança, sistemas, gestão, jurídico) |
| **Playbook** | Procedimento detalhado para responder a um tipo específico de incidente |
| **Runbook** | Procedimento técnico para executar uma ação concreta |
| **Checklist** | Lista de verificação rápida para garantir que nada é esquecido |
| **Matriz de escalonamento** | Tabela de contactos, níveis de gravidade e canais |
| **Formato consultável** | Plano organizado para consulta rápida, não para leitura sequencial |
| **Redundância de acesso** | Plano disponível em múltiplos formatos e localizações |
| **Níveis de teste** | Progressão de checklist a full-interruption, com realismo crescente |
| **Processo militar** | Resposta estruturada com papeis, cadeia de decisão e disciplina de comunicação |

### Frases-chave para recordar

- *"A equipa de IR não faz tudo sozinha: verifica, decide e coordena."*
- *"Em crise, ninguém quer estudar o plano. O plano tem de ser consultável em segundos."*
- *"Um plano escondido durante uma crise e tao útil como não ter plano."*
- *"Processo militar não é rigidez: e estrutura, papeis claros e cadeia de decisão definida."*
- *"Organizar por tipo de incidente permite ir direto ao playbook relevante em vez de procurar num documento genérico."*
- *"Proteger o plano sem o tornar inacessível e o equilíbrio mais difícil do armazenamento."*
- *"Um plano testado uma vez não fica válido para sempre: pessoas mudam, sistemas mudam, ameaças evoluem."*
- *"O coordenador coordena, não executa. Quando começa a fazer tarefas técnicas, perde a visão de conjunto."*
- *"A progressão de testes vai de verificar que o plano existe até testar com interrupção real."*

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
  │ ● Playbooks  │ │ ● Índice     │ │ 1. Checklist │
  │ ● Runbooks   │ │ ● Seccoes    │ │ 2. Walk-thru │
  │ ● Checklists │ │ ● Contactos  │ │ 3. Simulação │
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

*Próximo capítulo: [Deteção de incidentes](detecao.md)*

---

## 📋 Templates

Consulte os templates disponíveis para apoio ao planeamento de resposta a incidentes:

[:material-file-document-outline: Aceder aos Templates](https://github.com/guilhasn/tisi-materials/tree/main/TEMPLATES){ .md-button .md-button--primary target="_blank" }
