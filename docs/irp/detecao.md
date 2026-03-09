# Detecao de Incidentes

## Indice

1. [Fontes de detecao](#1-fontes-de-detecao)
2. [Indicadores de incidente](#2-indicadores-de-incidente)
3. [Fronteira entre incidente e desastre](#3-fronteira-entre-incidente-e-desastre)
4. [Exemplos praticos](#4-exemplos-praticos)
5. [Exercicios](#5-exercicios)
6. [Armadilhas e confusoes a evitar](#6-armadilhas-e-confusoes-a-evitar)
7. [Resumo rapido](#7-resumo-rapido)

---

## 1. Fontes de detecao

A detecao de incidentes e o primeiro passo de toda a cadeia de resposta. Sem detecao, nao ha classificacao, nao ha contencao, nao ha resposta. A organizacao fica cega.

> A detecao nao depende apenas de tecnologia. Depende de pessoas, de processos e de cultura organizacional.

Numa organizacao madura, **qualquer pessoa pode ser o primeiro ponto de detecao**, mas nem toda a gente sabe interpretar o que ve. E por isso que a detecao exige dois pilares em simultaneo: **tecnologia** e **pessoas preparadas**.

---

### Detecao tecnologica vs humana

A detecao pode vir de fontes **tecnologicas** (sistemas automaticos que monitorizam e alertam) ou de fontes **humanas** (pessoas que observam, reportam e interpretam).

| Fonte | Tipo | Exemplo | Vantagem |
|-------|------|---------|----------|
| **SIEM** | Tecnologica | Correlacao de logs de multiplos sistemas deteta padrao anomalo | Visao agregada e correlacao automatica |
| **EDR** | Tecnologica | Detecao de comportamento suspeito num endpoint (execucao de processo anomalo) | Monitorizacao continua ao nivel do dispositivo |
| **IDS/IPS** | Tecnologica | Detecao de trafego de rede malicioso ou assinaturas de ataque conhecidas | Analise em tempo real do trafego de rede |
| **Antivirus** | Tecnologica | Identificacao de ficheiros maliciosos por assinatura ou heuristica | Protecao automatica no endpoint |
| **Logs de sistema** | Tecnologica | Registos de acessos, erros, alteracoes de configuracao | Historico detalhado para analise |
| **Monitorizacao de rede** | Tecnologica | Alertas de trafego anomalo, picos de utilizacao, ligacoes suspeitas | Detecao de anomalias ao nivel da infraestrutura |
| **Utilizadores finais** | Humana | "Recebi um email estranho", "O sistema esta a comportar-se de forma diferente" | Sensibilidade ao contexto que nenhuma ferramenta tem |
| **Helpdesk** | Humana | Multiplas chamadas sobre o mesmo problema num curto espaco de tempo | Padrao de queixas pode revelar incidente em curso |
| **Administradores de sistemas** | Humana | "Noto processos que nao deviam estar a correr", "O consumo de recursos esta anomalo" | Conhecimento profundo dos sistemas |
| **Gestores/responsaveis** | Humana | "Ha transacoes que nao reconheco", "Os relatorios mostram dados inconsistentes" | Visao de negocio que complementa a visao tecnica |
| **Parceiros e fornecedores** | Externa | ISP alerta para trafego anomalo, parceiro notifica comprometimento | Perspetiva externa que a organizacao nao consegue ter sozinha |

**Como interpretar:**

*A tecnologia e excelente para detetar padroes conhecidos e anomalias quantificaveis. As pessoas sao essenciais para detetar o que "nao parece normal" dentro de um contexto que so elas conhecem. Um utilizador que diz "isto nao me parece normal" pode ser o primeiro sinal de algo que nenhum sistema automatico consegue identificar.*

---

### Canais de reporte

A detecao so e util se existirem **canais claros para reportar e analisar** o que foi observado. Uma organizacao pode ter as melhores ferramentas de monitorizacao, mas se nao houver forma de um utilizador reportar um email suspeito, ou se o helpdesk nao souber a quem escalar, a detecao perde-se.

A organizacao precisa de garantir:

- **Canal de reporte acessivel** - os utilizadores sabem a quem reportar e como (email dedicado, formulario, telefone)
- **Ponto de recepcao claro** - alguem recebe, regista e triagem o que e reportado
- **Escalonamento definido** - quem analisa, quem decide, quem atua
- **Feedback ao reportante** - quem reporta deve saber que a sua informacao foi recebida e analisada

```
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │   Utilizador     │     │    Helpdesk /     │     │   Equipa de IR   │
  │   deteta algo    │────►│   Ponto de       │────►│   analisa e      │
  │   anomalo        │     │   recepcao       │     │   decide         │
  └──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                             │
                                                             ▼
                                                    ┌──────────────────┐
                                                    │  Classificacao   │
                                                    │  e resposta      │
                                                    └──────────────────┘
```

> A detecao e multicanal. A organizacao precisa de canais de reporte e de canais de analise. Sem ambos, o sinal perde-se.

---

### O papel do treino na detecao

O treino e o que transforma uma organizacao de "cega" para "alerta". Sem treino:

- Os utilizadores **ignoram sinais** ("deve ser normal")
- O helpdesk **nao percebe a gravidade** ("e so mais um problema tecnico")
- Os alertas automaticos sao **mal interpretados** ou ignorados por fadiga
- Os administradores **nao correlacionam eventos** aparentemente isolados

Com treino adequado, a mesma organizacao reage de forma radicalmente diferente ao mesmo incidente.

```
  ══════════════════════════════════════════════════════════════════════
           ORGANIZACAO SEM TREINO - Linha temporal de detecao
  ══════════════════════════════════════════════════════════════════════

  T0              T+2h              T+6h              T+12h         T+24h
  │                │                 │                  │              │
  ▼                ▼                 ▼                  ▼              ▼
  ●────────────────●─────────────────●──────────────────●──────────────●
  Incidente     Utilizador        Helpdesk           Admin nota     Incidente
  comeca        nota algo         recebe varias      correlacao     finalmente
                estranho mas      queixas mas        entre queixas  classificado
                ignora            nao escala         e logs

  Tempo ate detecao efetiva: ~24 horas
  Impacto: elevado (propagacao livre durante horas)

  ══════════════════════════════════════════════════════════════════════
           ORGANIZACAO COM TREINO - Linha temporal de detecao
  ══════════════════════════════════════════════════════════════════════

  T0              T+15min           T+30min           T+45min
  │                │                 │                  │
  ▼                ▼                 ▼                  ▼
  ●────────────────●─────────────────●──────────────────●
  Incidente     Utilizador        Helpdesk           Equipa de IR
  comeca        reporta           escala para        classifica e
                imediatamente     equipa de IR       inicia contencao
                ("isto nao e
                 normal")

  Tempo ate detecao efetiva: ~45 minutos
  Impacto: reduzido (contencao rapida)

  ══════════════════════════════════════════════════════════════════════
```

O treino deve cobrir:

| Publico | O que treinar | Resultado esperado |
|---------|--------------|-------------------|
| **Utilizadores finais** | Reconhecer phishing, reportar anomalias, nao ignorar sinais | Reportam rapidamente em vez de ignorar |
| **Helpdesk** | Criterios de escalonamento, padroes de incidente, urgencia vs rotina | Escalam quando necessario em vez de tratar como problema tecnico normal |
| **Administradores** | Correlacao de eventos, leitura de logs, indicadores de comprometimento | Identificam incidentes em curso atraves de sinais tecnicos |
| **Gestao** | Impacto de decisoes tardias, papel do gestor na cadeia de detecao | Apoiam a cultura de reporte e nao penalizam quem reporta |

> Numa organizacao madura, qualquer pessoa pode ser o primeiro ponto de detecao - mas so se souber o que procurar e a quem reportar.

---

## 2. Indicadores de incidente

Nem todos os sinais de incidente tem a mesma forca. Existe uma **escala de evidencia** que vai do sinal mais fraco (algo parece estranho) ate a confirmacao definitiva (sabemos que estamos perante um incidente). Esta escala ajuda a equipa de resposta a decidir **quando e como agir**.

> A classificacao de indicadores nao serve para atrasar a resposta. Serve para calibrar a resposta ao nivel de certeza.

---

### Indicadores possiveis (sinais fracos)

Os indicadores possiveis sao sinais que **podem indicar um incidente, mas tambem podem ter explicacao benigna**. Sao o primeiro nivel da escala de evidencia. Exigem atencao e investigacao, mas nao justificam uma resposta completa por si so.

| Indicador | Pode ser incidente | Pode ser erro tecnico |
|-----------|:-----------------:|:--------------------:|
| Ficheiros desconhecidos no sistema | Malware ou ferramenta de atacante | Atualizacao automatica ou software instalado por outro admin |
| Programas ou processos estranhos em execucao | Backdoor ou trojan | Processo legitimo com nome pouco familiar |
| Consumo anomalo de recursos (CPU, memoria, rede) | Mineracao de criptomoedas, exfiltracao de dados | Pico de utilizacao legitimo, backup em execucao |
| Crashes ou erros inesperados e repetidos | Exploits a serem executados | Bug de software, incompatibilidade de drivers |
| Lentidao inexplicavel | Ataque em curso (DDoS, ransomware a cifrar) | Hardware degradado, disco cheio |

**Como interpretar:**

*Um indicador possivel e como um sintoma medico generico: uma dor de cabeca pode ser stress ou pode ser algo mais grave. Nao se ignora, mas tambem nao se parte logo para a cirurgia. Investiga-se.*

**Para refletir:**

- Quantos indicadores possiveis teriam de ocorrer em simultaneo para passarem a provaveis?
- Qual e o risco de ignorar indicadores possiveis por serem "provavelmente nada"?
- Como e que a experiencia do administrador influencia a interpretacao destes sinais?

---

### Indicadores provaveis (forte suspeita)

Os indicadores provaveis sao sinais que geram **forte suspeita** de que um incidente esta em curso. Ainda necessitam de validacao, mas ja justificam uma investigacao prioritaria e possivelmente acoes preventivas de contencao.

| Indicador | Porque e provavel | O que fazer |
|-----------|------------------|-------------|
| Atividades em horarios inesperados (logins as 3h, transferencias de noite) | Utilizadores normais nao trabalham a essas horas | Verificar se o utilizador confirma a atividade; se nao, tratar como comprometimento |
| Contas novas que ninguem criou | Atacantes criam contas para manter acesso | Investigar imediatamente quem criou, quando e porquem |
| Relatos de ataques por utilizadores ou entidades externas | Alguem ja foi afetado e esta a reportar | Correlacionar com atividade interna; verificar se ha comprometimento |
| Alertas de IDS/IPS com assinaturas conhecidas | O sistema reconheceu um padrao de ataque especifico | Validar se o alerta e verdadeiro positivo e que sistemas foram atingidos |
| Trafego de rede para destinos suspeitos (C2 conhecidos) | Comunicacao com servidores de comando e controlo | Investigar imediatamente; possivel comprometimento ativo |
| Aumento subito de tentativas de autenticacao falhadas | Ataque de forca bruta em curso | Verificar se alguma conta foi comprometida; considerar bloqueio preventivo |

**Como interpretar:**

*Um indicador provavel e como ter febre alta: nao e diagnostico definitivo, mas ja indica que algo significativo esta a acontecer. Justifica investigacao urgente e medidas preventivas enquanto se confirma.*

---

### Indicadores definitivos (quase confirmacao)

Os indicadores definitivos sao sinais com **muito alta probabilidade** de corresponderem a um incidente real. Na maioria dos casos, a organizacao deve tratar estes indicadores como incidente confirmado e iniciar a resposta completa.

| Indicador | Porque e definitivo | Gravidade |
|-----------|--------------------|-----------|
| Utilizacao de contas dormentes (inativas ha meses/anos) | Atacante esta a usar credenciais comprometidas de contas esquecidas | Alta - acesso nao autorizado confirmado |
| Alteracao ou eliminacao de logs | Tentativa de encobrir atividade - comportamento tipico de atacante | Critica - destruicao de evidencias |
| Presenca de ferramentas de ataque no sistema (mimikatz, cobalt strike, netcat) | Ferramentas sem uso legitimo na organizacao | Critica - comprometimento ativo |
| Notificacao por parceiro ou entidade externa de comprometimento | Fonte credivel confirma que a organizacao foi atingida | Alta - confirmacao externa |
| Contacto ou extorsao pelo atacante (pedido de resgate, ameaca de divulgacao) | O proprio atacante confirma o comprometimento | Critica - incidente confirmado pelo atacante |
| Dados da organizacao encontrados em fora ou dark web | Fuga de dados confirmada por evidencia externa | Critica - dados ja foram exfiltrados |

**Como interpretar:**

*Um indicador definitivo e como encontrar o intruso dentro de casa. Ja nao ha duvida de que algo aconteceu. A questao agora e: qual o alcance, qual o impacto e como conter.*

**Para refletir:**

- Porque e que a alteracao de logs e um dos indicadores mais graves?
- Se um parceiro notifica a organizacao de comprometimento, o que diz isso sobre a capacidade de detecao interna?
- Porque e que o contacto pelo atacante pode ser simultaneamente confirmacao e ferramenta de pressao?

---

### Situacoes de incidente automatico

Alem da escala de indicadores, existem situacoes que a organizacao **pre-define como incidente automatico**: nao precisam de investigacao para serem classificadas. A propria natureza da situacao ja a coloca na categoria de incidente.

| Situacao | Porque e automatico | Exemplo |
|----------|--------------------|---------|
| **Perda de confidencialidade** | Dados confidenciais foram expostos a quem nao devia ter acesso | Base de dados de clientes exposta publicamente |
| **Perda de integridade** | Dados foram alterados de forma nao autorizada | Registos financeiros modificados por acesso nao autorizado |
| **Perda de disponibilidade** | Servicos criticos ficaram indisponiveis | Sistema de urgencia hospitalar em baixo |
| **Violacao de politica de seguranca** | Regras internas foram quebradas com potencial impacto | Funcionario partilha credenciais com terceiros |
| **Violacao de lei ou regulamento** | Ha incumprimento legal com obrigacao de reporte | Fuga de dados pessoais (RGPD) sem notificacao a CNPD |

**Como interpretar:**

*Estas situacoes nao percorrem a escala de indicadores. Sao tratadas como incidente desde o momento em que sao identificadas, porque o impacto e inerente a propria situacao. A organizacao decide antecipadamente que estas situacoes sao sempre incidentes, independentemente de outros fatores.*

---

### Escala de evidencia

A progressao dos indicadores segue uma logica de acumulacao de certeza:

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    ESCALA DE EVIDENCIA                                  │
  │                                                                         │
  │  Sinal fraco          Suspeita           Forte indicio         Incidente│
  │  (possivel)           (provavel)         (definitivo)       (confirmado)│
  │                                                                         │
  │    ●─────────────────────●─────────────────────●──────────────────●     │
  │    │                     │                     │                  │     │
  │    ▼                     ▼                     ▼                  ▼     │
  │  Ficheiros            Logins em            Ferramentas        Perda de │
  │  estranhos,           horarios             de ataque          CIA,      │
  │  consumo              anomalos,            encontradas,       violacao  │
  │  anomalo,             contas novas,        logs alterados,    de lei,   │
  │  crashes              alertas IDS          contacto do        politica  │
  │  repetidos                                 atacante           violada   │
  │                                                                         │
  │  ─────────────────────────────────────────────────────────────►        │
  │            Nivel de certeza crescente                                   │
  │                                                                         │
  │  Acao:      Acao:           Acao:              Acao:                    │
  │  Monitorizar Investigar     Resposta            Resposta                │
  │  e registar  com            completa            completa                │
  │              prioridade     imediata            imediata                │
  └─────────────────────────────────────────────────────────────────────────┘
```

Alem da escala gradual, existem situacoes que entram diretamente como **incidente automatico**:

```
                                               ┌───────────────────────┐
                                               │  INCIDENTE AUTOMATICO │
  Perda de CIA ─────────────────────────────────►                       │
  Violacao de politica ─────────────────────────►  Nao percorre a      │
  Violacao de lei ──────────────────────────────►  escala. E incidente │
                                               │  desde o momento 0.  │
                                               └───────────────────────┘
```

---

## 3. Fronteira entre incidente e desastre

Nem todo o incidente e um desastre, mas todo o desastre comeca (ou pode comecar) como um incidente. A questao critica e: **quando e que se cruza a fronteira?**

> Um incidente torna-se desastre quando a resposta normal deixa de ser suficiente.

---

### Quando o incidente se torna desastre

Existem dois criterios fundamentais para definir a passagem de incidente a desastre:

**Criterio 1: A organizacao nao consegue mitigar durante o incidente**

O incidente esta em curso, a equipa de IR esta a atuar, mas as acoes de contencao e mitigacao **nao estao a ser suficientes**. O impacto continua a crescer, os sistemas continuam a ser afetados, e a resposta normal nao consegue travar a situacao.

*Exemplo:* Um ataque de ransomware que comeca num posto de trabalho e, apesar do isolamento de rede, continua a propagar-se para outros segmentos. A equipa de IR nao consegue conter a propagacao com as ferramentas e procedimentos disponiveis.

**Criterio 2: O dano e tao severo que a recuperacao rapida e impossivel**

Mesmo que o incidente tenha sido contido, os danos ja provocados sao de tal magnitude que a organizacao nao consegue regressar a operacao normal num prazo aceitavel. O impacto ja ultrapassou o que o IRP pode resolver.

*Exemplo:* Um incendio no datacenter principal destruiu todos os servidores e o sistema de backups local. Mesmo que o fogo tenha sido extinto, a organizacao nao tem infraestrutura para operar e a recuperacao vai demorar semanas.

```
  ═══════════════════════════════════════════════════════════════════
                    INCIDENTE vs DESASTRE
  ═══════════════════════════════════════════════════════════════════

  Incidente                          │  Desastre
                                     │
  ● Equipa de IR consegue conter     │  ● Contencao falha ou e
  ● Impacto e limitado e controlavel │    insuficiente
  ● Recuperacao e possivel com       │  ● Impacto cresce sem controlo
    recursos normais                 │  ● Recuperacao requer recursos
  ● Resposta segue o IRP             │    extraordinarios
                                     │  ● IRP ja nao e suficiente
                                     │  ● Ativa-se o DRP
  ═══════════════════════════════════════════════════════════════════
```

---

### Quem define os criterios

Nao existe um limiar universal que separe incidente de desastre. **Cada organizacao define os seus proprios criterios**, com base em:

- **Setor de atividade** - um hospital e uma loja de roupa tem tolerancias muito diferentes
- **Criticidade dos sistemas** - a falha de um sistema de email nao tem o mesmo impacto que a falha de um sistema de urgencia
- **Tolerancia ao risco** - quanto tempo, quanto dinheiro, quanta reputacao a organizacao aceita perder
- **Capacidade de resiliencia** - uma organizacao com datacenter redundante tolera mais do que uma com servidor unico
- **Obrigacoes legais e regulatorias** - algumas situacoes sao automaticamente desastres por imposicao legal

> O mesmo tipo de incidente pode ser contido e limitado numa organizacao e ser um desastre noutra. A fronteira nao e tecnica - e organizacional.

*Exemplo:* Uma falha de 4 horas no sistema de email pode ser um incidente menor para uma universidade (que tem outras formas de comunicacao), mas pode ser um desastre para uma empresa de trading que depende de comunicacoes instantaneas para operar.

---

### Tabela comparativa: incidente vs desastre

| Dimensao | Incidente | Desastre |
|----------|-----------|----------|
| **Contencao** | Equipa de IR consegue conter | Contencao falha ou e insuficiente |
| **Alcance do impacto** | Limitado a sistemas ou processos especificos | Afeta a organizacao de forma transversal |
| **Recuperacao** | Possivel com recursos e procedimentos normais | Requer recursos extraordinarios (financeiros, humanos, tecnologicos) |
| **Tempo de recuperacao** | Dentro do MTD definido | Excede o MTD - possivel perda irreversivel |
| **Plano ativado** | IRP | DRP (e possivelmente BCP) |
| **Decisao** | Equipa de IR e gestao de TI | Direcao da organizacao |
| **Comunicacao** | Interna, possivelmente parceiros | Interna, externa, possivelmente publica e reguladores |
| **Exemplos** | Phishing contido, malware isolado, DDoS mitigado | Ransomware generalizado, datacenter destruido, fuga massiva de dados |

---

### A ponte para o DRP e o BCP

A transicao entre IRP, DRP e BCP e uma **progressao natural** baseada na capacidade da organizacao de lidar com a situacao:

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │   IRP                    DRP                    BCP                 │
  │   ═══                    ═══                    ═══                 │
  │                                                                     │
  │   A organizacao          A organizacao          Funcoes criticas    │
  │   consegue:              nao consegue:          devem continuar,    │
  │   ● Identificar          ● Conter o incidente   mesmo que de       │
  │   ● Conter               ● Recuperar com        forma degradada    │
  │   ● Mitigar                recursos normais                        │
  │   ● Recuperar com                               O negocio nao      │
  │     recursos normais     Precisa de:            pode parar.        │
  │                          ● Recuperacao de                           │
  │   O incidente esta         infraestrutura       Precisa de:        │
  │   sob controlo.          ● Recursos              ● Processos       │
  │                            extraordinarios        alternativos     │
  │                          ● Plano de              ● Locais           │
  │                            recuperacao             alternativos    │
  │                            especifico            ● Operacao         │
  │                                                    minima (MOR)    │
  │                                                                     │
  │   ────────────────►  ────────────────►  ────────────────►          │
  │     Escala quando       Escala quando       Continuidade           │
  │     contencao falha     recuperacao nao      do negocio            │
  │     ou impacto cresce   e suficiente                               │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘
```

| Pergunta | Resposta | Plano |
|----------|---------|-------|
| A organizacao consegue identificar, conter e mitigar? | Sim | **IRP** |
| A contencao falhou ou o impacto excede a capacidade normal? | Sim | **DRP** |
| Funcoes criticas precisam de continuar, mesmo degradadas? | Sim | **BCP** |

**Para refletir:**

- A transicao entre IRP e DRP e sempre clara no momento, ou pode ser ambigua?
- Quem toma a decisao de escalar de IRP para DRP?
- Pode uma organizacao ativar o BCP sem ter passado pelo DRP?

---

## 4. Exemplos praticos

### Exemplo 1 - Universidade: phishing detetado por utilizador

**Cenario:** Uma universidade recebe uma campanha de phishing direcionada aos funcionarios administrativos. Uma funcionaria da secretaria nota que o email "nao parece normal" e reporta ao helpdesk.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Detecao** | Humana (utilizador) | A funcionaria nota linguagem estranha e um link suspeito. Reporta ao helpdesk. |
| **Indicador inicial** | Possivel | Email suspeito - pode ser phishing ou spam inofensivo |
| **Investigacao** | Helpdesk escala para equipa de TI | TI analisa o email: link aponta para pagina falsa de login da universidade |
| **Indicador atualizado** | Provavel | Phishing confirmado - pagina falsa replica o portal da universidade |
| **Analise adicional** | Equipa de TI verifica logs | 12 funcionarios clicaram no link; 4 introduziram credenciais |
| **Indicador final** | Definitivo | Credenciais comprometidas com acessos subsequentes anomalos |
| **Resposta** | IRP ativado | Reset de passwords, invalidacao de sessoes, comunicacao interna |

**Como interpretar:**

*Este caso mostra a progressao classica da escala de indicadores: comecou como possivel (email estranho), evoluiu para provavel (phishing confirmado) e tornou-se definitivo quando se comprovou que credenciais foram comprometidas. A detecao humana foi o ponto de partida - sem a funcionaria ter reportado, o incidente podia ter passado despercebido durante dias.*

**Para refletir:**

- Se a funcionaria nao tivesse reportado, como teria sido detetado o incishing?
- Que papel teve o treino na capacidade da funcionaria de reconhecer o email como suspeito?
- Quantos funcionarios provavelmente ignoraram o mesmo email?

---

### Exemplo 2 - Hospital: administrador nota atividade anomala

**Cenario:** Um administrador de sistemas de um hospital nota, durante a monitorizacao de rotina, que uma conta de servico inativa ha 8 meses esta a realizar consultas na base de dados de registos clinicos.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Detecao** | Humana (administrador) + Tecnologica (logs) | Administrador nota nos logs atividade de conta dormente |
| **Indicador** | Definitivo (desde o inicio) | Conta dormente em utilizacao e indicador definitivo |
| **Analise** | Equipa de IR verifica alcance | A conta acedeu a 3.400 registos clinicos nas ultimas 48 horas |
| **Classificacao** | Incidente critico | Perda de confidencialidade de dados de saude (dados especiais RGPD) |
| **Resposta** | IRP completo ativado | Bloqueio da conta, preservacao de logs, notificacao a CNPD, comunicacao a direcao clinica |

**Como interpretar:**

*A utilizacao de contas dormentes e um dos indicadores definitivos mais claros. Neste caso, a detecao combinou capacidade humana (experiencia do administrador) com tecnologica (logs que registaram a atividade). O administrador sabia que aquela conta nao devia estar ativa - esse conhecimento contextual e algo que nenhuma ferramenta automatica teria sem configuracao especifica.*

**Para refletir:**

- Porque e que a utilizacao de uma conta dormente e automaticamente um indicador definitivo?
- Que regulamentacao obriga a notificacao neste caso?
- Se o hospital nao tivesse um administrador atento, quanto tempo poderia a exfiltracao ter continuado?

---

### Exemplo 3 - E-commerce: lentidao detetada por multiplos canais

**Cenario:** Uma plataforma de e-commerce comeca a apresentar lentidao no checkout. A detecao chega por multiplos canais simultaneamente.

| Canal de detecao | Quem deteta | O que reporta |
|-------------------|------------|---------------|
| **Monitorizacao automatica** | Sistema de APM (Application Performance Monitoring) | Tempo de resposta do checkout aumentou de 200ms para 15 segundos |
| **Utilizadores** | Clientes | Queixas no chat de suporte: "nao consigo finalizar a compra" |
| **Helpdesk** | Equipa de suporte | Pico de chamadas sobre o mesmo problema |
| **Redes sociais** | Gestao de comunicacao | Clientes a queixar-se publicamente no Twitter |
| **Parceiro de pagamentos** | Fornecedor externo | Alerta de timeout nas transacoes |

| Evolucao | Indicador | Acao |
|----------|-----------|------|
| T+0 min | Possivel (lentidao pode ser pico de trafego legitimo) | Monitorizar |
| T+15 min | Provavel (multiplos canais reportam, trafego anomalo detetado) | Investigar com prioridade |
| T+30 min | Definitivo (trafego confirmado como DDoS) | Ativar mitigacao anti-DDoS |
| T+2 horas | Possivel desastre? | Se a mitigacao nao funcionar e as vendas pararem por mais de 4 horas (MTD definido), escala para DRP |

**Como interpretar:**

*Este exemplo ilustra a detecao multicanal: o mesmo incidente foi detetado por tecnologia, utilizadores, helpdesk, redes sociais e parceiros. A convergencia de sinais de multiplas fontes acelera a classificacao. Tambem mostra a fronteira incidente-desastre: se o DDoS nao for mitigado dentro do MTD da plataforma, o incidente transforma-se em desastre.*

**Para refletir:**

- Que vantagem tem a detecao multicanal em relacao a depender de uma unica fonte?
- A que ponto a lentidao deixa de ser "problema tecnico" e passa a ser "incidente de seguranca"?
- Que criterio usarias para decidir escalar de IRP para DRP neste cenario?

---

### Exemplo 4 - Industria: operador como primeiro sensor

**Cenario:** Numa fabrica, um operador de maquinas nota que o sistema de controlo (HMI) esta a mostrar valores que "nao fazem sentido" - a temperatura de um forno aparece como 0 graus quando devia estar a 850 graus.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Detecao** | Humana (operador) | O operador conhece o processo e sabe que o valor e impossivel |
| **Indicador** | Possivel (pode ser sensor avariado) | Mas o operador nota que outros valores tambem estao estranhos |
| **Escalonamento** | Operador reporta ao supervisor e a TI | O supervisor confirma que os valores nao correspondem a realidade fisica |
| **Investigacao** | TI analisa o sistema de controlo | Descobrem ligacoes de rede suspeitas do HMI para um IP externo |
| **Indicador atualizado** | Definitivo | Comprometimento do sistema de controlo industrial |
| **Resposta** | IRP ativado com urgencia maxima | Isolamento do sistema de controlo, passagem a modo manual, comunicacao a direcao industrial |

**Como interpretar:**

*O operador foi o primeiro sensor porque conhece o processo. Nenhum sistema automatico de TI teria detetado que "0 graus num forno a 850" e anomalo - para o SIEM, e apenas um valor numerico. O conhecimento do contexto operacional e insubstituivel. Este exemplo mostra porque e que a detecao humana e essencial em ambientes industriais.*

**Para refletir:**

- Porque e que um IDS de rede nao teria detetado este incidente de forma imediata?
- Que riscos de seguranca fisica existem quando um sistema de controlo industrial e comprometido?
- Que treino especifico deveria ter o operador para acelerar ainda mais a detecao?

---

### Exemplo 5 - Banco: manipulacao de logs detetada

**Cenario:** A equipa de auditoria interna de um banco deteta, durante uma revisao trimestral, que os logs de acesso ao sistema de transferencias internacionais foram modificados. Faltam registos de 3 dias especificos.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Detecao** | Humana (auditoria) + Tecnologica (integridade de logs) | Auditores notam lacunas nos logs e verificam que a hash de integridade nao corresponde |
| **Indicador** | Definitivo (desde o inicio) | Alteracao de logs e um dos indicadores mais graves - alguem tentou encobrir atividade |
| **Analise** | Equipa de IR forense | Reconstrucao parcial dos logs a partir de backups e sistemas secundarios |
| **Descoberta** | Transferencias nao autorizadas | Nos 3 dias sem logs, foram executadas transferencias para contas no estrangeiro |
| **Classificacao** | Incidente critico - possivel desastre | Perda financeira direta, comprometimento de integridade, obrigacoes regulatorias |
| **Avaliacao de desastre** | Criterios de desastre avaliados | Montante das transferencias excede o limiar de perda toleravel definido pelo banco |

**Como interpretar:**

*A alteracao de logs e simultaneamente um indicador definitivo e um agravante: nao so confirma o comprometimento como revela intencao de encobrir. Neste caso, o incidente tem potencial para ser classificado como desastre se o montante financeiro exceder os limiares definidos pelo banco. A ponte IRP para DRP ativa-se quando a recuperacao financeira e regulatoria excede a capacidade de resposta normal.*

**Para refletir:**

- Porque e que a integridade dos logs e tao critica para a detecao de incidentes?
- Que mecanismos podem proteger os logs contra alteracao (ex: write-once storage, log forwarding)?
- A partir de que montante financeiro este banco deveria considerar o incidente como desastre?

---

## 5. Exercicios

### Nivel 1 - Compreensao

#### Exercicio 1.1 - Classificar indicadores

Classifica cada indicador como **possivel**, **provavel** ou **definitivo**:

| # | Indicador | Classificacao? |
|---|-----------|---------------|
| a) | O servidor de ficheiros esta mais lento que o habitual | |
| b) | O IDS gerou um alerta para uma assinatura de exploit conhecida | |
| c) | Foram encontradas ferramentas de hacking (mimikatz) num servidor de producao | |
| d) | Um utilizador reportou ter recebido um email de phishing | |
| e) | Uma conta de administrador inativa ha 6 meses fez login as 4h da manha | |
| f) | O consumo de CPU de um servidor esta a 100% ha 3 horas | |
| g) | Um parceiro externo notificou que dados da organizacao estao a venda na dark web | |
| h) | O sistema de email rejeitou 200 mensagens com anexos suspeitos | |

??? success "Solucao 1.1"

    | # | Indicador | Classificacao | Justificacao |
    |---|-----------|:------------:|-------------|
    | a) | Servidor de ficheiros lento | **Possivel** | Pode ser incidente (ransomware a cifrar, exfiltracao) ou problema tecnico (disco cheio, pico de utilizacao). |
    | b) | Alerta de IDS com assinatura conhecida | **Provavel** | O IDS reconheceu um padrao de ataque especifico. Necessita validacao (pode ser falso positivo), mas a suspeita e forte. |
    | c) | Ferramentas de hacking em servidor de producao | **Definitivo** | Ferramentas como mimikatz nao tem uso legitimo num servidor de producao. Indica comprometimento ativo. |
    | d) | Email de phishing reportado | **Possivel a provavel** | O email em si e possivel (pode ser spam inofensivo). Se for phishing direcionado com link para pagina falsa da organizacao, e provavel. |
    | e) | Conta inativa fez login as 4h | **Definitivo** | Conta dormente com login fora de horas combina dois indicadores fortes: conta dormente + horario anomalo. |
    | f) | CPU a 100% ha 3 horas | **Possivel** | Pode ser mineracao de criptomoedas (incidente) ou processo legitimo mal configurado. Requer investigacao. |
    | g) | Dados a venda na dark web | **Definitivo** | Confirmacao externa de que dados foram exfiltrados. Indicador definitivo por natureza. |
    | h) | 200 emails com anexos suspeitos rejeitados | **Provavel** | Volume elevado de emails maliciosos sugere campanha direcionada. O filtro bloqueou, mas pode haver emails que passaram. |

---

#### Exercicio 1.2 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | A detecao de incidentes depende exclusivamente de ferramentas tecnologicas como SIEM e EDR. |
| b) | Um indicador possivel deve ser sempre ignorado porque provavelmente nao e nada de grave. |
| c) | A perda de confidencialidade e uma situacao de incidente automatico. |
| d) | Todo o incidente se torna automaticamente um desastre se nao for contido em 1 hora. |
| e) | O treino dos utilizadores e essencial para a detecao de incidentes. |
| f) | A fronteira entre incidente e desastre e universal e igual para todas as organizacoes. |
| g) | Uma conta dormente que se torna ativa e um indicador definitivo de incidente. |
| h) | O DRP e ativado quando o IRP ja nao e suficiente para lidar com a situacao. |

??? success "Solucao 1.2"

    | # | Resposta | Justificacao |
    |---|:--------:|-------------|
    | a) | **F** | A detecao depende de tecnologia **e** de pessoas. Utilizadores, helpdesk, administradores e parceiros sao fontes humanas essenciais. |
    | b) | **F** | Indicadores possiveis devem ser registados e investigados, nunca ignorados. Podem ser o primeiro sinal de algo mais grave. |
    | c) | **V** | A perda de qualquer dimensao da triade CIA (confidencialidade, integridade, disponibilidade) e tipicamente definida como incidente automatico. |
    | d) | **F** | Nao existe um limiar temporal universal. Cada organizacao define os seus proprios criterios para a fronteira incidente-desastre, com base no MTD e noutros fatores. |
    | e) | **V** | Sem treino, os utilizadores ignoram sinais, o helpdesk nao escala corretamente e a detecao e muito mais lenta. |
    | f) | **F** | A fronteira depende do setor, criticidade, tolerancia ao risco e capacidade de resiliencia de cada organizacao. |
    | g) | **V** | A utilizacao de contas dormentes e um dos indicadores definitivos mais claros de comprometimento. |
    | h) | **V** | O DRP entra em acao quando a resposta a incidentes (IRP) nao consegue conter ou mitigar a situacao de forma adequada. |

---

### Nivel 2 - Aplicacao pratica

#### Exercicio 2.1 - Sequencia de alertas e escalonamento

Recebes os seguintes alertas em sequencia na tua organizacao (empresa de software com 80 funcionarios):

| Hora | Alerta |
|------|--------|
| 09:00 | O antivirus de 3 postos de trabalho detetou e bloqueou o mesmo ficheiro malicioso |
| 09:15 | Um utilizador reporta que recebeu um email com um link para "atualizar o software da empresa" |
| 09:30 | O SIEM regista 5 tentativas de login falhadas na conta de um administrador de sistemas |
| 09:45 | O EDR deteta execucao de PowerShell codificado num servidor de desenvolvimento |
| 10:00 | O servidor de ficheiros mostra atividade de cifragem em massa |

Para cada momento, classifica o indicador (possivel/provavel/definitivo) e decide a acao.

??? success "Solucao 2.1"

    | Hora | Indicador | Classificacao | Acao |
    |------|-----------|:------------:|------|
    | 09:00 | Antivirus bloqueou ficheiro malicioso | **Possivel** | Registar. Verificar se os 3 postos receberam o ficheiro pela mesma via. Pode ser campanha generica. |
    | 09:15 | Email de phishing reportado | **Provavel** | Correlacionar com o alerta anterior. Se o email contem o mesmo ficheiro ou link similar, trata-se de campanha direcionada. Escalar para equipa de IR. |
    | 09:30 | Tentativas de login falhadas em conta admin | **Provavel** | Correlacionar: a campanha de phishing pode ter como objetivo obter credenciais de administrador. Contactar o administrador para confirmar se foi ele. Reforcar monitorizacao. |
    | 09:45 | PowerShell codificado em servidor | **Definitivo** | Execucao de codigo suspeito num servidor e indicador definitivo de comprometimento. Iniciar contencao imediata: isolar o servidor. |
    | 10:00 | Cifragem em massa | **Definitivo + potencial desastre** | Ransomware em execucao. Contencao urgente de todos os sistemas. Se a cifragem atingir sistemas criticos e nao for contida, avaliar escalonamento para DRP. |

    **Conclusao:**

    *A sequencia mostra uma escalada classica: campanha de phishing (possivel) que leva a comprometimento de credenciais (provavel) que resulta em execucao de malware (definitivo) e ransomware (desastre potencial). A capacidade de correlacionar os alertas em tempo real e critica para antecipar a evolucao.*

---

#### Exercicio 2.2 - Incidente ou desastre?

Para cada cenario, determina se se trata de **incidente contido pelo IRP** ou **desastre que requer DRP**. Justifica.

| # | Cenario |
|---|---------|
| a) | Uma clinica dentaria sofre um ataque de ransomware que cifra o servidor de agendamento. Os backups de ontem estao intactos. A clinica pode operar com agenda em papel durante 4 horas. |
| b) | Uma empresa de logistica sofre um ataque que compromete o sistema GPS de toda a frota (200 veiculos). Nao existe sistema alternativo e as entregas param completamente. |
| c) | Um banco deteta que um funcionario descarregou a base de dados completa de clientes para um disco externo pessoal. O funcionario ja saiu do edificio. |
| d) | Uma universidade sofre um DDoS que torna o portal de e-learning inacessivel durante 2 horas, no periodo de exames. Os exames sao presenciais e nao dependem da plataforma. |
| e) | Uma fabrica sofre um ataque que compromete os sistemas SCADA de controlo de producao. A producao para completamente e nao ha modo manual disponivel. |

??? success "Solucao 2.2"

    | # | Classificacao | Justificacao |
    |---|:------------:|-------------|
    | a) | **Incidente (IRP)** | A clinica tem backups e alternativa manual. A contencao e recuperacao estao dentro da capacidade normal. O ransomware afetou um sistema, nao a totalidade da operacao. |
    | b) | **Desastre (DRP)** | 200 veiculos parados sem alternativa significa que a operacao principal da empresa esta completamente interrompida. A recuperacao normal nao e suficiente - precisa de solucao extraordinaria. |
    | c) | **Incidente critico, potencial desastre** | A fuga de dados e um incidente definitivo. Se o volume de dados e tal que implica obrigacoes legais massivas e perda de confianca dos clientes, pode escalar para desastre. Depende do alcance e das consequencias regulatorias. |
    | d) | **Incidente (IRP)** | 2 horas de indisponibilidade do portal, sem impacto nos exames (que sao presenciais). O impacto e limitado e a contencao e possivel. |
    | e) | **Desastre (DRP)** | Producao totalmente parada sem modo manual e um cenario em que o IRP nao pode resolver sozinho. Requer recuperacao de infraestrutura industrial, possivelmente com fornecedores especializados. |

---

#### Exercicio 2.3 - Desenhar fontes de detecao

Uma PME portuguesa de contabilidade (15 funcionarios, 1 escritorio, servidor local, cloud para email) pede-te para desenhares as fontes de detecao da organizacao.

Preenche a tabela com pelo menos 6 fontes de detecao adequadas a esta organizacao:

| Fonte | Tipo (Tecnologica/Humana/Externa) | O que deteta | Prioridade |
|-------|:---------------------------------:|-------------|:----------:|
| ? | ? | ? | ? |

??? success "Solucao 2.3"

    | Fonte | Tipo | O que deteta | Prioridade |
    |-------|:----:|-------------|:----------:|
    | **Antivirus/EDR nos postos** | Tecnologica | Malware, ransomware, comportamento suspeito | Alta |
    | **Logs do servidor local** | Tecnologica | Acessos anomalos, erros, alteracoes de configuracao | Alta |
    | **Alertas do provider de email (Microsoft 365/Google)** | Tecnologica | Phishing, spam, tentativas de login suspeitas | Alta |
    | **Funcionarios (contabilistas)** | Humana | Emails estranhos, pedidos de transferencia incomuns, dados inconsistentes | Media-Alta |
    | **Tecnico de TI / suporte externo** | Humana | Anomalias na rede, atualizacoes falhadas, acessos fora de padrao | Alta |
    | **Clientes** | Externa | "Recebi um email da vossa empresa que parece falso" | Media |
    | **Firewall / router** | Tecnologica | Trafego de rede anomalo, ligacoes suspeitas | Media |
    | **Autoridade tributaria ou parceiros** | Externa | Alertas de fraude fiscal ou uso indevido de credenciais | Baixa (rara, mas critica) |

    **Nota:** Numa PME desta dimensao, nao e realista ter um SIEM dedicado. As fontes de detecao devem ser proporcionais a dimensao e orcamento da organizacao. O treino dos funcionarios e especialmente importante porque sao poucos e cada um tem grande responsabilidade.

---

### Nivel 3 - Analise

#### Exercicio 3.1 - Linha temporal completa

**Cenario:** Es o responsavel de seguranca de uma empresa de comercio eletronico. Ao longo de uma semana, ocorrem os seguintes eventos:

| Dia | Hora | Evento |
|-----|------|--------|
| Segunda | 08:00 | Sistema de monitorizacao regista pico de trafego no website (3x o normal) |
| Segunda | 10:00 | Helpdesk recebe 5 chamadas de clientes que nao conseguem fazer login |
| Terca | 14:00 | Administrador nota 2 contas de teste (criadas para desenvolvimento) com logins recentes |
| Quarta | 09:00 | EDR deteta PowerShell a descarregar ficheiros de um servidor externo num servidor web |
| Quarta | 11:00 | Logs do servidor web mostram 400 GB de dados transferidos para IP desconhecido nas ultimas 48h |
| Quinta | 06:00 | Email anonimo recebido: "Temos os dados dos vossos clientes. Paguem 50 BTC ou publicamos tudo." |
| Quinta | 08:00 | Varios logs de acesso dos ultimos 5 dias foram eliminados do servidor de logs |

**Tarefas:**

1. Para cada evento, classifica o indicador (possivel/provavel/definitivo/incidente automatico)
2. Identifica o momento em que o incidente deveria ter sido confirmado
3. Identifica o momento em que se cruza a fronteira para potencial desastre
4. Que oportunidades de detecao mais precoce foram perdidas?

??? success "Solucao 3.1"

    **1. Classificacao dos indicadores:**

    | Dia | Evento | Indicador |
    |-----|--------|:---------:|
    | Seg 08:00 | Pico de trafego 3x | **Possivel** - pode ser campanha de marketing, bot, ou reconhecimento |
    | Seg 10:00 | Clientes sem login | **Possivel** - pode ser problema tecnico ou consequencia de ataque |
    | Ter 14:00 | Contas de teste com logins | **Provavel** - contas de teste nao devem ter utilizacao em producao |
    | Qua 09:00 | PowerShell a descarregar ficheiros | **Definitivo** - comportamento tipico de comprometimento ativo |
    | Qua 11:00 | 400 GB transferidos para IP desconhecido | **Definitivo + incidente automatico** - exfiltracao de dados confirmada (perda de confidencialidade) |
    | Qui 06:00 | Extorsao pelo atacante | **Definitivo** - o proprio atacante confirma |
    | Qui 08:00 | Logs eliminados | **Definitivo** - destruicao de evidencias |

    **2. Momento de confirmacao:**

    O incidente deveria ter sido confirmado **na quarta-feira as 09:00**, quando o EDR detetou atividade de comprometimento ativo. Idealmente, a correlacao entre o pico de trafego (segunda), os problemas de login (segunda) e as contas de teste (terca) deveria ter gerado uma investigacao mais precoce.

    **3. Fronteira para desastre:**

    A fronteira cruza-se **na quarta-feira as 11:00** quando se confirma a exfiltracao de 400 GB de dados. A partir deste momento:

    - Ha perda massiva de confidencialidade (incidente automatico)
    - O volume de dados sugere que a base de dados de clientes foi comprometida
    - Ha obrigacoes legais imediatas (RGPD - notificacao a CNPD em 72 horas)
    - O impacto reputacional e potencialmente irreversivel

    A extorsao de quinta-feira apenas confirma o que ja era evidente.

    **4. Oportunidades perdidas:**

    - **Segunda 08:00**: O pico de trafego deveria ter sido investigado em correlacao com os problemas de login das 10:00
    - **Terca 14:00**: As contas de teste com logins recentes deveriam ter acionado uma investigacao imediata e correlacao com os eventos de segunda
    - Se a correlacao tivesse sido feita na terca, a exfiltracao de 400 GB poderia ter sido detetada e contida antes de se completar

    **Conclusao:**

    *Cada evento isolado podia parecer menor. A chave estava na correlacao. Uma organizacao com boa capacidade de detecao teria ligado os pontos entre segunda e terca, e contido o incidente antes da exfiltracao massiva de quarta.*

---

#### Exercicio 3.2 - Mesmo incidente, organizacoes diferentes

Duas organizacoes sofrem o mesmo tipo de incidente: ransomware que cifra 60% dos servidores internos.

- **Organizacao A**: Hospital central com 500 camas, sistemas clinicos criticos, datacenter redundante, backups testados, equipa de IR treinada
- **Organizacao B**: Escritorio de advogados com 20 funcionarios, servidor unico local, backups em disco externo (ultimo backup ha 2 semanas), sem equipa de IR

Para cada organizacao, responde:

1. O incidente e contido pelo IRP ou escala para desastre? Justifica.
2. Que fontes de detecao provavelmente detetaram o ransomware?
3. Qual seria o primeiro indicador e de que tipo (possivel/provavel/definitivo)?
4. Quanto tempo estimado ate a detecao?

??? success "Solucao 3.2"

    **Organizacao A - Hospital:**

    | Aspeto | Resposta |
    |--------|---------|
    | **IRP ou desastre?** | **IRP** (provavelmente). O datacenter redundante e os backups testados permitem contencao e recuperacao. No entanto, se sistemas clinicos criticos forem afetados e a recuperacao exceder o MTD (tipicamente muito curto em hospitais), pode escalar para desastre. |
    | **Fontes de detecao** | EDR nos servidores, SIEM com correlacao, possivelmente helpdesk (clinicos reportam que nao acedem a registos) |
    | **Primeiro indicador** | Definitivo (EDR deteta cifragem em massa) ou Possivel (clinico reporta que sistema esta lento) |
    | **Tempo ate detecao** | Minutos (EDR) a 1-2 horas (detetor humano) |

    **Organizacao B - Escritorio de advogados:**

    | Aspeto | Resposta |
    |--------|---------|
    | **IRP ou desastre?** | **Desastre**. 60% dos servidores cifrados com backup de ha 2 semanas significa perda massiva de dados. Sem equipa de IR, a resposta sera desorganizada. Sem datacenter redundante, a recuperacao sera extremamente lenta. |
    | **Fontes de detecao** | Provavelmente humana: advogados nao conseguem aceder a ficheiros. Possivelmente antivirus, se existir e estiver atualizado. |
    | **Primeiro indicador** | Possivel (advogado nota que ficheiros nao abrem) que rapidamente se torna definitivo (nota de resgate aparece) |
    | **Tempo ate detecao** | Horas (quando alguem tenta aceder aos ficheiros cifrados) |

    **Conclusao:**

    *O mesmo incidente (ransomware em 60% dos servidores) e um incidente gerivel para o hospital e um desastre para o escritorio de advogados. A diferenca esta na preparacao: detecao rapida, backups testados, equipa treinada e infraestrutura redundante transformam um potencial desastre num incidente contido.*

---

## 6. Armadilhas e confusoes a evitar

### Confusao 1: Detecao nao e so tecnologia

> Depender exclusivamente de ferramentas automaticas e perigoso. As pessoas sao sensores insubstituiveis que detetam o que "nao parece normal" num contexto que so elas conhecem.

Um operador de fabrica que nota valores impossiveis no sistema de controlo, uma contabilista que reconhece uma fatura fraudulenta, um utilizador que desconfia de um email - nenhum SIEM deteta estas situacoes sem configuracao especifica.

### Confusao 2: Indicador possivel nao e o mesmo que "nada de grave"

> Indicadores possiveis devem ser registados e investigados, nunca descartados. Muitos incidentes graves comecaram com sinais fracos que foram ignorados.

O consumo anomalo de CPU que ninguem investigou pode ser mineracao de criptomoedas por um atacante que ja tem acesso ao sistema ha semanas.

### Confusao 3: Um unico indicador definitivo basta para agir

> Nao e preciso esperar por multiplos indicadores definitivos para iniciar a resposta. Um unico indicador definitivo (como ferramentas de hacking encontradas num servidor) justifica resposta completa imediata.

Esperar por "mais provas" quando ja ha evidencia clara e perder tempo critico.

### Confusao 4: Nem todo o incidente se torna desastre

> A maioria dos incidentes e contida pelo IRP sem escalar para desastre. O desastre e a excecao, nao a regra - mas a organizacao deve estar preparada para ambos.

Tratar todo o incidente como desastre gera panico desnecessario e esgota recursos. Mas ignorar a possibilidade de escalar e igualmente perigoso.

### Confusao 5: A fronteira incidente-desastre nao e universal

> Nao existe um numero magico de horas, servidores afetados ou euros perdidos que separe incidente de desastre para todas as organizacoes. Cada organizacao define os seus proprios criterios.

Uma falha de 2 horas pode ser rotina para uma empresa de consultoria e um desastre para uma plataforma de trading.

### Confusao 6: A detecao multicanal nao significa redundancia desnecessaria

> Ter multiplos canais de detecao nao e desperdicio. E resiliencia. Se um canal falha (o SIEM tem um falso negativo), outro canal pode detetar o incidente (o utilizador reporta algo estranho).

A convergencia de sinais de multiplas fontes tambem acelera a classificacao e da maior confianca a decisao.

### Confusao 7: O treino nao e um custo - e um investimento na detecao

> Uma organizacao que nao treina os seus utilizadores esta a descartar uma das suas fontes de detecao mais valiosas. O treino transforma utilizadores passivos em sensores ativos.

O custo de treinar 100 utilizadores e uma fracao do custo de um incidente que passou despercebido durante dias porque ninguem sabia a quem reportar.

### Confusao 8: Escalar de IRP para DRP nao e sinal de fracasso

> Ativar o DRP quando o IRP nao e suficiente e a decisao correta, nao um fracasso da equipa de IR. A escalada e um mecanismo de protecao, nao uma admissao de derrota.

Insistir no IRP quando ja se esta claramente em territorio de desastre agrava o impacto.

---

## 7. Resumo rapido

### Tabela de conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| **Detecao tecnologica** | Alertas automaticos de SIEM, EDR, IDS/IPS, antivirus, logs |
| **Detecao humana** | Observacoes de utilizadores, helpdesk, administradores, gestores |
| **Detecao multicanal** | O mesmo incidente detetado por multiplas fontes em simultaneo |
| **Indicador possivel** | Sinal fraco que pode ser incidente ou problema tecnico |
| **Indicador provavel** | Forte suspeita de incidente, requer investigacao prioritaria |
| **Indicador definitivo** | Quase confirmacao de incidente, justifica resposta completa |
| **Incidente automatico** | Situacao pre-definida como incidente (perda de CIA, violacao de lei/politica) |
| **Escala de evidencia** | Progressao de certeza: possivel, provavel, definitivo, confirmado |
| **Fronteira incidente-desastre** | Ponto em que o IRP deixa de ser suficiente |
| **Criterio de desastre 1** | Organizacao nao consegue mitigar durante o incidente |
| **Criterio de desastre 2** | Dano tao severo que recuperacao rapida e impossivel |
| **Ponte IRP-DRP-BCP** | Escalada natural quando a capacidade de resposta e excedida |

### Frases-chave para recordar

- *"A detecao nao e so tecnologia. Um utilizador que diz 'isto nao me parece normal' pode ser o primeiro sinal de um incidente."*
- *"Indicadores possiveis nao se ignoram - investigam-se. Muitos desastres comecaram como sinais fracos descartados."*
- *"A alteracao de logs e um dos indicadores mais graves: nao so confirma comprometimento como revela intencao de encobrir."*
- *"O mesmo incidente pode ser contido numa organizacao e ser um desastre noutra. A fronteira nao e tecnica - e organizacional."*
- *"Numa organizacao madura, qualquer pessoa pode ser o primeiro ponto de detecao - mas so se souber o que procurar e a quem reportar."*
- *"A detecao multicanal nao e redundancia. E resiliencia."*
- *"Quando o IRP deixa de ser suficiente, ativa-se o DRP. Quando funcoes criticas devem continuar degradadas, ativa-se o BCP."*
- *"Treinar utilizadores nao e um custo. E um investimento que transforma sensores passivos em sensores ativos."*
- *"Nao e preciso esperar por multiplos indicadores definitivos para agir. Um unico indicador definitivo basta."*

### Diagrama de sintese

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                    DETECAO DE INCIDENTES                            │
  │                                                                     │
  │  FONTES                 INDICADORES               FRONTEIRA        │
  │  ══════                 ═══════════               ══════════        │
  │                                                                     │
  │  ┌───────────┐         Possivel                                     │
  │  │Tecnologica│         (sinal fraco)              Incidente         │
  │  │SIEM, EDR, │              │                     ═════════         │
  │  │IDS, AV,   │              ▼                     Equipa de IR     │
  │  │Logs       │         Provavel                   consegue conter  │
  │  └───────────┘         (forte suspeita)                │           │
  │       +                     │                          │           │
  │  ┌───────────┐              ▼                    Contencao falha?  │
  │  │  Humana   │         Definitivo                 Impacto cresce?  │
  │  │Utilizador,│         (quase confirmacao)              │           │
  │  │Helpdesk,  │              │                          ▼           │
  │  │Admin,     │              ▼                     Desastre         │
  │  │Gestor     │       ┌──────────────┐             ═════════        │
  │  └───────────┘       │  Incidente   │             IRP ► DRP ► BCP  │
  │       +              │  confirmado  │                               │
  │  ┌───────────┐       │  ou          │                               │
  │  │  Externa  │       │  automatico  │                               │
  │  │Parceiros, │       └──────────────┘                               │
  │  │Fornecedo- │                                                      │
  │  │res        │       Incidente automatico:                          │
  │  └───────────┘       Perda CIA, violacao                            │
  │                      lei/politica                                   │
  │                                                                     │
  │  TREINO = transforma detecao lenta em detecao rapida               │
  └─────────────────────────────────────────────────────────────────────┘
```

---

*Proximo capitulo: [Reacao a incidentes](reacao.md)*
