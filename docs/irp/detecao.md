# Deteção de Incidentes

## Índice

1. [Fontes de deteção](#1-fontes-de-detecao)
2. [Indicadores de incidente](#2-indicadores-de-incidente)
3. [Fronteira entre incidente e desastre](#3-fronteira-entre-incidente-e-desastre)
4. [Exemplos práticos](#4-exemplos-praticos)
5. [Exercícios](#5-exercicios)
6. [Armadilhas e confusões a evitar](#6-armadilhas-e-confusoes-a-evitar)
7. [Resumo rápido](#7-resumo-rapido)

---

## 1. Fontes de deteção

A deteção de incidentes e o primeiro passo de toda a cadeia de resposta. Sem deteção, não há classificação, não há contenção, não há resposta. A organização fica cega.

> A deteção não depende apenas de tecnologia. Depende de pessoas, de processos e de cultura organizacional.

Numa organização madura, **qualquer pessoa pode ser o primeiro ponto de deteção**, mas nem toda a gente sabe interpretar o que ve. E por isso que a deteção exige dois pilares em simultâneo: **tecnologia** e **pessoas preparadas**.

---

### Deteção tecnológica vs humana

A deteção pode vir de fontes **tecnológicas** (sistemas automáticos que monitorizam e alertam) ou de fontes **humanas** (pessoas que observam, reportam e interpretam).

| Fonte | Tipo | Exemplo | Vantagem |
|-------|------|---------|----------|
| **SIEM** | Tecnológica | Correlação de logs de múltiplos sistemas deteta padrão anómalo | Visão agregada e correlação automática |
| **EDR** | Tecnológica | Deteção de comportamento suspeito num endpoint (execução de processo anómalo) | Monitorização contínua ao nível do dispositivo |
| **IDS/IPS** | Tecnológica | Deteção de tráfego de rede malicioso ou assinaturas de ataque conhecidas | Análise em tempo real do tráfego de rede |
| **Antivirus** | Tecnológica | Identificação de ficheiros maliciosos por assinatura ou heurística | Proteção automática no endpoint |
| **Logs de sistema** | Tecnológica | Registos de acessos, erros, alterações de configuração | Histórico detalhado para análise |
| **Monitorização de rede** | Tecnológica | Alertas de tráfego anómalo, picos de utilização, ligações suspeitas | Deteção de anomalias ao nível da infraestrutura |
| **Utilizadores finais** | Humana | "Recebi um email estranho", "O sistema está a comportar-se de forma diferente" | Sensibilidade ao contexto que nenhuma ferramenta tem |
| **Helpdesk** | Humana | Multiplas chamadas sobre o mesmo problema num curto espaço de tempo | Padrão de queixas pode revelar incidente em curso |
| **Administradores de sistemas** | Humana | "Noto processos que não deviam estar a correr", "O consumo de recursos está anómalo" | Conhecimento profundo dos sistemas |
| **Gestores/responsáveis** | Humana | "Ha transações que não reconheco", "Os relatórios mostram dados inconsistentes" | Visão de negócio que complementa a visão técnica |
| **Parceiros e fornecedores** | Externa | ISP alerta para tráfego anómalo, parceiro notifica comprometimento | Perspetiva externa que a organização não consegue ter sozinha |

**Como interpretar:**

*A tecnologia e excelente para detetar padrões conhecidos e anomalias quantificaveis. As pessoas são essenciais para detetar o que "não parece normal" dentro de um contexto que só elas conhecem. Um utilizador que diz "isto não me parece normal" pode ser o primeiro sinal de algo que nenhum sistema automático consegue identificar.*

---

### Canais de reporte

A deteção só e útil se existirem **canais claros para reportar e analisar** o que foi observado. Uma organização pode ter as melhores ferramentas de monitorização, mas se não houver forma de um utilizador reportar um email suspeito, ou se o helpdesk não souber a quem escalar, a deteção perde-se.

A organização precisa de garantir:

- **Canal de reporte acessível** - os utilizadores sabem a quem reportar e como (email dedicado, formulário, telefone)
- **Ponto de receção claro** - alguém recebe, regista e triagem o que é reportado
- **Escalonamento definido** - quem analisa, quem decide, quem atua
- **Feedback ao reportante** - quem reporta deve saber que a sua informação foi recebida e analisada

```
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │   Utilizador     │     │    Helpdesk /     │     │   Equipa de IR   │
  │   deteta algo    │────►│   Ponto de       │────►│   analisa e      │
  │   anómalo        │     │   receção       │     │   decide         │
  └──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                             │
                                                             ▼
                                                    ┌──────────────────┐
                                                    │  Classificação   │
                                                    │  e resposta      │
                                                    └──────────────────┘
```

> A deteção e multicanal. A organização precisa de canais de reporte e de canais de análise. Sem ambos, o sinal perde-se.

---

### O papel do treino na deteção

O treino e o que transforma uma organização de "cega" para "alerta". Sem treino:

- Os utilizadores **ignoram sinais** ("deve ser normal")
- O helpdesk **não percebe a gravidade** ("e só mais um problema técnico")
- Os alertas automáticos são **mal interpretados** ou ignorados por fadiga
- Os administradores **não correlacionam eventos** aparentemente isolados

Com treino adequado, a mesma organização reage de forma radicalmente diferente ao mesmo incidente.

```
  ══════════════════════════════════════════════════════════════════════
           ORGANIZACAO SEM TREINO - Linha temporal de deteção
  ══════════════════════════════════════════════════════════════════════

  T0              T+2h              T+6h              T+12h         T+24h
  │                │                 │                  │              │
  ▼                ▼                 ▼                  ▼              ▼
  ●────────────────●─────────────────●──────────────────●──────────────●
  Incidente     Utilizador        Helpdesk           Admin nota     Incidente
  começa        nota algo         recebe várias      correlação     finalmente
                estranho mas      queixas mas        entre queixas  classificado
                ignora            não escala         e logs

  Tempo até deteção efetiva: ~24 horas
  Impacto: elevado (propagação livre durante horas)

  ══════════════════════════════════════════════════════════════════════
           ORGANIZACAO COM TREINO - Linha temporal de deteção
  ══════════════════════════════════════════════════════════════════════

  T0              T+15min           T+30min           T+45min
  │                │                 │                  │
  ▼                ▼                 ▼                  ▼
  ●────────────────●─────────────────●──────────────────●
  Incidente     Utilizador        Helpdesk           Equipa de IR
  começa        reporta           escala para        classifica e
                imediatamente     equipa de IR       inicia contenção
                ("isto não e
                 normal")

  Tempo até deteção efetiva: ~45 minutos
  Impacto: reduzido (contenção rápida)

  ══════════════════════════════════════════════════════════════════════
```

O treino deve cobrir:

| Público | O que treinar | Resultado esperado |
|---------|--------------|-------------------|
| **Utilizadores finais** | Reconhecer phishing, reportar anomalias, não ignorar sinais | Reportam rapidamente em vez de ignorar |
| **Helpdesk** | Criterios de escalonamento, padrões de incidente, urgência vs rotina | Escalam quando necessário em vez de tratar como problema técnico normal |
| **Administradores** | Correlação de eventos, leitura de logs, indicadores de comprometimento | Identificam incidentes em curso através de sinais técnicos |
| **Gestão** | Impacto de decisões tardias, papel do gestor na cadeia de deteção | Apoiam a cultura de reporte e não penalizam quem reporta |

> Numa organização madura, qualquer pessoa pode ser o primeiro ponto de deteção - mas só se souber o que procurar e a quem reportar.

---

## 2. Indicadores de incidente

Nem todos os sinais de incidente tem a mesma força. Existe uma **escala de evidência** que vai do sinal mais fraco (algo parece estranho) até a confirmação definitiva (sabemos que estamos perante um incidente). Esta escala ajuda a equipa de resposta a decidir **quando e como agir**.

> A classificação de indicadores não serve para atrasar a resposta. Serve para calibrar a resposta ao nível de certeza.

---

### Indicadores possíveis (sinais fracos)

Os indicadores possíveis são sinais que **podem indicar um incidente, mas também podem ter explicação benigna**. São o primeiro nível da escala de evidência. Exigem atenção e investigação, mas não justificam uma resposta completa por si só.

| Indicador | Pode ser incidente | Pode ser erro técnico |
|-----------|:-----------------:|:--------------------:|
| Ficheiros desconhecidos no sistema | Malware ou ferramenta de atacante | Atualização automática ou software instalado por outro admin |
| Programas ou processos estranhos em execução | Backdoor ou trojan | Processo legítimo com nome pouco familiar |
| Consumo anómalo de recursos (CPU, memória, rede) | Mineração de criptomoedas, exfiltração de dados | Pico de utilização legítimo, backup em execução |
| Crashes ou erros inesperados e repetidos | Exploits a serem executados | Bug de software, incompatibilidade de drivers |
| Lentidao inexplicavel | Ataque em curso (DDoS, ransomware a cifrar) | Hardware degradado, disco cheio |

**Como interpretar:**

*Um indicador possível e como um sintoma médico generico: uma dor de cabeça pode ser stress ou pode ser algo mais grave. Não se ignora, mas também não se parte logo para a cirurgia. Investiga-se.*

**Para refletir:**

- Quantos indicadores possíveis teriam de ocorrer em simultâneo para passarem a prováveis?
- Qual e o risco de ignorar indicadores possíveis por serem "provavelmente nada"?
- Como e que a experiência do administrador influência a interpretação destes sinais?

---

### Indicadores prováveis (forte suspeita)

Os indicadores prováveis são sinais que geram **forte suspeita** de que um incidente está em curso. Ainda necessitam de validação, mas já justificam uma investigação prioritaria e possivelmente ações preventivas de contenção.

| Indicador | Porque e provável | O que fazer |
|-----------|------------------|-------------|
| Atividades em horários inesperados (logins as 3h, transferências de noite) | Utilizadores normais não trabalham a essas horas | Verificar se o utilizador confirma a atividade; se não, tratar como comprometimento |
| Contas novas que ninguém criou | Atacantes criam contas para manter acesso | Investigar imediatamente quem criou, quando e porquem |
| Relatos de ataques por utilizadores ou entidades externas | Alguem já foi afetado e está a reportar | Correlacionar com atividade interna; verificar se há comprometimento |
| Alertas de IDS/IPS com assinaturas conhecidas | O sistema reconheceu um padrão de ataque específico | Validar se o alerta e verdadeiro positivo e que sistemas foram atingidos |
| Tráfego de rede para destinos suspeitos (C2 conhecidos) | Comunicação com servidores de comando e controlo | Investigar imediatamente; possível comprometimento ativo |
| Aumento subito de tentativas de autenticação falhadas | Ataque de força bruta em curso | Verificar se alguma conta foi comprometida; considerar bloqueio preventivo |

**Como interpretar:**

*Um indicador provável e como ter febre alta: não é diagnóstico definitivo, mas já indica que algo significativo está a acontecer. Justifica investigação urgente e medidas preventivas enquanto se confirma.*

---

### Indicadores definitivos (quase confirmação)

Os indicadores definitivos são sinais com **muito alta probabilidade** de corresponderem a um incidente real. Na maioria dos casos, a organização deve tratar estes indicadores como incidente confirmado e iniciar a resposta completa.

| Indicador | Porque e definitivo | Gravidade |
|-----------|--------------------|-----------|
| Utilização de contas dormentes (inativas há meses/anos) | Atacante está a usar credenciais comprometidas de contas esquecidas | Alta - acesso não autorizado confirmado |
| Alteração ou eliminação de logs | Tentativa de encobrir atividade - comportamento típico de atacante | Crítica - destruição de evidências |
| Presenca de ferramentas de ataque no sistema (mimikatz, cobalt strike, netcat) | Ferramentas sem uso legítimo na organização | Crítica - comprometimento ativo |
| Notificação por parceiro ou entidade externa de comprometimento | Fonte credivel confirma que a organização foi atingida | Alta - confirmação externa |
| Contacto ou extorsão pelo atacante (pedido de resgate, ameaça de divulgação) | O próprio atacante confirma o comprometimento | Crítica - incidente confirmado pelo atacante |
| Dados da organização encontrados em fora ou dark web | Fuga de dados confirmada por evidência externa | Crítica - dados já foram exfiltrados |

**Como interpretar:**

*Um indicador definitivo e como encontrar o intruso dentro de casa. Já não há duvida de que algo aconteceu. A questão agora e: qual o alcance, qual o impacto e como conter.*

**Para refletir:**

- Porque e que a alteração de logs e um dos indicadores mais graves?
- Se um parceiro notifica a organização de comprometimento, o que diz isso sobre a capacidade de deteção interna?
- Porque e que o contacto pelo atacante pode ser simultaneamente confirmação e ferramenta de pressão?

---

### Situacoes de incidente automático

Além da escala de indicadores, existem situações que a organização **pré-define como incidente automático**: não precisam de investigação para serem classificadas. A própria natureza da situação já a coloca na categoria de incidente.

| Situação | Porque e automático | Exemplo |
|----------|--------------------|---------|
| **Perda de confidencialidade** | Dados confidenciais foram expostos a quem não devia ter acesso | Base de dados de clientes exposta publicamente |
| **Perda de integridade** | Dados foram alterados de forma não autorizada | Registos financeiros modificados por acesso não autorizado |
| **Perda de disponibilidade** | Serviços críticos ficaram indisponíveis | Sistema de urgência hospitalar em baixo |
| **Violação de política de segurança** | Regras internas foram quebradas com potencial impacto | Funcionário partilha credenciais com terceiros |
| **Violação de lei ou regulamento** | Ha incumprimento legal com obrigação de reporte | Fuga de dados pessoais (RGPD) sem notificação a CNPD |

**Como interpretar:**

*Estas situações não percorrem a escala de indicadores. São tratadas como incidente desde o momento em que são identificadas, porque o impacto e inerente a própria situação. A organização decide antecipadamente que estas situações são sempre incidentes, independentemente de outros fatores.*

---

### Escala de evidência

A progressão dos indicadores segue uma lógica de acumulação de certeza:

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    ESCALA DE EVIDENCIA                                  │
  │                                                                         │
  │  Sinal fraco          Suspeita           Forte indicio         Incidente│
  │  (possível)           (provável)         (definitivo)       (confirmado)│
  │                                                                         │
  │    ●─────────────────────●─────────────────────●──────────────────●     │
  │    │                     │                     │                  │     │
  │    ▼                     ▼                     ▼                  ▼     │
  │  Ficheiros            Logins em            Ferramentas        Perda de │
  │  estranhos,           horários             de ataque          CIA,      │
  │  consumo              anómalos,            encontradas,       violação  │
  │  anómalo,             contas novas,        logs alterados,    de lei,   │
  │  crashes              alertas IDS          contacto do        política  │
  │  repetidos                                 atacante           violada   │
  │                                                                         │
  │  ─────────────────────────────────────────────────────────────►        │
  │            Nível de certeza crescente                                   │
  │                                                                         │
  │  Ação:      Ação:           Ação:              Ação:                    │
  │  Monitorizar Investigar     Resposta            Resposta                │
  │  e registar  com            completa            completa                │
  │              prioridade     imediata            imediata                │
  └─────────────────────────────────────────────────────────────────────────┘
```

Além da escala gradual, existem situações que entram diretamente como **incidente automático**:

```
                                               ┌───────────────────────┐
                                               │  INCIDENTE AUTOMATICO │
  Perda de CIA ─────────────────────────────────►                       │
  Violação de política ─────────────────────────►  Não percorre a      │
  Violação de lei ──────────────────────────────►  escala. E incidente │
                                               │  desde o momento 0.  │
                                               └───────────────────────┘
```

---

## 3. Fronteira entre incidente e desastre

Nem todo o incidente e um desastre, mas todo o desastre começa (ou pode começar) como um incidente. A questão crítica e: **quando e que se cruza a fronteira?**

> Um incidente torna-se desastre quando a resposta normal deixa de ser suficiente.

---

### Quando o incidente se torna desastre

Existem dois critérios fundamentais para definir a passagem de incidente a desastre:

**Critério 1: A organização não consegue mitigar durante o incidente**

O incidente está em curso, a equipa de IR está a atuar, mas as ações de contenção e mitigação **não estão a ser suficientes**. O impacto contínua a crescer, os sistemas continuam a ser afetados, e a resposta normal não consegue travar a situação.

*Exemplo:* Um ataque de ransomware que começa num posto de trabalho e, apesar do isolamento de rede, contínua a propagar-se para outros segmentos. A equipa de IR não consegue conter a propagação com as ferramentas e procedimentos disponíveis.

**Critério 2: O dano e tao severo que a recuperação rápida e impossível**

Mesmo que o incidente tenha sido contido, os danos já provocados são de tal magnitude que a organização não consegue regressar a operação normal num prazo aceitável. O impacto já ultrapassou o que o IRP pode resolver.

*Exemplo:* Um incêndio no datacenter principal destruiu todos os servidores e o sistema de backups local. Mesmo que o fogo tenha sido extinto, a organização não tem infraestrutura para operar e a recuperação vai demorar semanas.

```
  ═══════════════════════════════════════════════════════════════════
                    INCIDENTE vs DESASTRE
  ═══════════════════════════════════════════════════════════════════

  Incidente                          │  Desastre
                                     │
  ● Equipa de IR consegue conter     │  ● Contenção falha ou e
  ● Impacto e limitado e controlavel │    insuficiente
  ● Recuperação e possível com       │  ● Impacto cresce sem controlo
    recursos normais                 │  ● Recuperação requer recursos
  ● Resposta segue o IRP             │    extraordinarios
                                     │  ● IRP já não e suficiente
                                     │  ● Ativa-se o DRP
  ═══════════════════════════════════════════════════════════════════
```

---

### Quem define os critérios

Não existe um limiar universal que separe incidente de desastre. **Cada organização define os seus próprios critérios**, com base em:

- **Setor de atividade** - um hospital e uma loja de roupa tem tolerâncias muito diferentes
- **Criticidade dos sistemas** - a falha de um sistema de email não tem o mesmo impacto que a falha de um sistema de urgência
- **Tolerância ao risco** - quanto tempo, quanto dinheiro, quanta reputação a organização aceita perder
- **Capacidade de resiliência** - uma organização com datacenter redundante tolera mais do que uma com servidor único
- **Obrigacoes legais e regulatorias** - algumas situações são automaticamente desastres por imposição legal

> O mesmo tipo de incidente pode ser contido e limitado numa organização e ser um desastre noutra. A fronteira não é técnica - e organizacional.

*Exemplo:* Uma falha de 4 horas no sistema de email pode ser um incidente menor para uma universidade (que tem outras formas de comunicação), mas pode ser um desastre para uma empresa de trading que depende de comunicações instantaneas para operar.

---

### Tabela comparativa: incidente vs desastre

| Dimensão | Incidente | Desastre |
|----------|-----------|----------|
| **Contenção** | Equipa de IR consegue conter | Contenção falha ou e insuficiente |
| **Alcance do impacto** | Limitado a sistemas ou processos específicos | Afeta a organização de forma transversal |
| **Recuperação** | Possível com recursos e procedimentos normais | Requer recursos extraordinarios (financeiros, humanos, tecnológicos) |
| **Tempo de recuperação** | Dentro do MTD definido | Excede o MTD - possível perda irreversível |
| **Plano ativado** | IRP | DRP (e possivelmente BCP) |
| **Decisão** | Equipa de IR e gestão de TI | Direção da organização |
| **Comunicação** | Interna, possivelmente parceiros | Interna, externa, possivelmente pública e reguladores |
| **Exemplos** | Phishing contido, malware isolado, DDoS mitigado | Ransomware generalizado, datacenter destruído, fuga massiva de dados |

---

### A ponte para o DRP e o BCP

A transição entre IRP, DRP e BCP e uma **progressão natural** baseada na capacidade da organização de lidar com a situação:

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                                                                     │
  │   IRP                    DRP                    BCP                 │
  │   ═══                    ═══                    ═══                 │
  │                                                                     │
  │   A organização          A organização          Funcoes críticas    │
  │   consegue:              não consegue:          devem continuar,    │
  │   ● Identificar          ● Conter o incidente   mesmo que de       │
  │   ● Conter               ● Recuperar com        forma degradada    │
  │   ● Mitigar                recursos normais                        │
  │   ● Recuperar com                               O negócio não      │
  │     recursos normais     Precisa de:            pode parar.        │
  │                          ● Recuperação de                           │
  │   O incidente está         infraestrutura       Precisa de:        │
  │   sob controlo.          ● Recursos              ● Processos       │
  │                            extraordinarios        alternativos     │
  │                          ● Plano de              ● Locais           │
  │                            recuperação             alternativos    │
  │                            específico            ● Operação         │
  │                                                    mínima (MOR)    │
  │                                                                     │
  │   ────────────────►  ────────────────►  ────────────────►          │
  │     Escala quando       Escala quando       Continuidade           │
  │     contenção falha     recuperação não      do negócio            │
  │     ou impacto cresce   e suficiente                               │
  │                                                                     │
  └─────────────────────────────────────────────────────────────────────┘
```

| Pergunta | Resposta | Plano |
|----------|---------|-------|
| A organização consegue identificar, conter e mitigar? | Sim | **IRP** |
| A contenção falhou ou o impacto excede a capacidade normal? | Sim | **DRP** |
| Funcoes críticas precisam de continuar, mesmo degradadas? | Sim | **BCP** |

**Para refletir:**

- A transição entre IRP e DRP e sempre clara no momento, ou pode ser ambígua?
- Quem toma a decisão de escalar de IRP para DRP?
- Pode uma organização ativar o BCP sem ter passado pelo DRP?

---

## 4. Exemplos práticos

### Exemplo 1 - Universidade: phishing detetado por utilizador

**Cenário:** Uma universidade recebe uma campanha de phishing direcionada aos funcionários administrativos. Uma funcionaria da secretaria nota que o email "não parece normal" e reporta ao helpdesk.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Deteção** | Humana (utilizador) | A funcionaria nota linguagem estranha e um link suspeito. Reporta ao helpdesk. |
| **Indicador inicial** | Possível | Email suspeito - pode ser phishing ou spam inofensivo |
| **Investigação** | Helpdesk escala para equipa de TI | TI analisa o email: link aponta para página falsa de login da universidade |
| **Indicador atualizado** | Provável | Phishing confirmado - página falsa replica o portal da universidade |
| **Análise adicional** | Equipa de TI verifica logs | 12 funcionários clicaram no link; 4 introduziram credenciais |
| **Indicador final** | Definitivo | Credenciais comprometidas com acessos subsequentes anómalos |
| **Resposta** | IRP ativado | Reset de passwords, invalidação de sessões, comunicação interna |

**Como interpretar:**

*Este caso mostra a progressão classica da escala de indicadores: começou como possível (email estranho), evoluiu para provável (phishing confirmado) e tornou-se definitivo quando se comprovou que credenciais foram comprometidas. A deteção humana foi o ponto de partida - sem a funcionaria ter reportado, o incidente podia ter passado despercebido durante dias.*

**Para refletir:**

- Se a funcionaria não tivesse reportado, como teria sido detetado o incishing?
- Que papel teve o treino na capacidade da funcionaria de reconhecer o email como suspeito?
- Quantos funcionários provavelmente ignoraram o mesmo email?

---

### Exemplo 2 - Hospital: administrador nota atividade anómala

**Cenário:** Um administrador de sistemas de um hospital nota, durante a monitorização de rotina, que uma conta de serviço inativa há 8 meses está a realizar consultas na base de dados de registos clínicos.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Deteção** | Humana (administrador) + Tecnológica (logs) | Administrador nota nos logs atividade de conta dormente |
| **Indicador** | Definitivo (desde o início) | Conta dormente em utilização e indicador definitivo |
| **Análise** | Equipa de IR verifica alcance | A conta acedeu a 3.400 registos clínicos nas últimas 48 horas |
| **Classificação** | Incidente crítico | Perda de confidencialidade de dados de saúde (dados especiais RGPD) |
| **Resposta** | IRP completo ativado | Bloqueio da conta, preservação de logs, notificação a CNPD, comunicação a direção clínica |

**Como interpretar:**

*A utilização de contas dormentes e um dos indicadores definitivos mais claros. Neste caso, a deteção combinou capacidade humana (experiência do administrador) com tecnológica (logs que registaram a atividade). O administrador sabia que aquela conta não devia estar ativa - esse conhecimento contextual e algo que nenhuma ferramenta automática teria sem configuração específica.*

**Para refletir:**

- Porque e que a utilização de uma conta dormente e automaticamente um indicador definitivo?
- Que regulamentação obriga a notificação neste caso?
- Se o hospital não tivesse um administrador atento, quanto tempo poderia a exfiltração ter continuado?

---

### Exemplo 3 - E-commerce: lentidao detetada por múltiplos canais

**Cenário:** Uma plataforma de e-commerce começa a apresentar lentidao no checkout. A deteção chega por múltiplos canais simultaneamente.

| Canal de deteção | Quem deteta | O que reporta |
|-------------------|------------|---------------|
| **Monitorização automática** | Sistema de APM (Application Performance Monitoring) | Tempo de resposta do checkout aumentou de 200ms para 15 segundos |
| **Utilizadores** | Clientes | Queixas no chat de suporte: "não consigo finalizar a compra" |
| **Helpdesk** | Equipa de suporte | Pico de chamadas sobre o mesmo problema |
| **Redes sociais** | Gestão de comunicação | Clientes a queixar-se publicamente no Twitter |
| **Parceiro de pagamentos** | Fornecedor externo | Alerta de timeout nas transações |

| Evolução | Indicador | Ação |
|----------|-----------|------|
| T+0 min | Possível (lentidao pode ser pico de tráfego legítimo) | Monitorizar |
| T+15 min | Provável (múltiplos canais reportam, tráfego anómalo detetado) | Investigar com prioridade |
| T+30 min | Definitivo (tráfego confirmado como DDoS) | Ativar mitigação anti-DDoS |
| T+2 horas | Possível desastre? | Se a mitigação não funcionar e as vendas pararem por mais de 4 horas (MTD definido), escala para DRP |

**Como interpretar:**

*Este exemplo ilustra a deteção multicanal: o mesmo incidente foi detetado por tecnologia, utilizadores, helpdesk, redes sociais e parceiros. A convergência de sinais de múltiplas fontes acelera a classificação. Também mostra a fronteira incidente-desastre: se o DDoS não for mitigado dentro do MTD da plataforma, o incidente transforma-se em desastre.*

**Para refletir:**

- Que vantagem tem a deteção multicanal em relação a depender de uma única fonte?
- A que ponto a lentidao deixa de ser "problema técnico" e passa a ser "incidente de segurança"?
- Que critério usarias para decidir escalar de IRP para DRP neste cenário?

---

### Exemplo 4 - Indústria: operador como primeiro sensor

**Cenário:** Numa fábrica, um operador de máquinas nota que o sistema de controlo (HMI) está a mostrar valores que "não fazem sentido" - a temperatura de um forno aparece como 0 graus quando devia estar a 850 graus.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Deteção** | Humana (operador) | O operador conhece o processo e sabe que o valor e impossível |
| **Indicador** | Possível (pode ser sensor avariado) | Mas o operador nota que outros valores também estão estranhos |
| **Escalonamento** | Operador reporta ao supervisor e a TI | O supervisor confirma que os valores não correspondem a realidade física |
| **Investigação** | TI analisa o sistema de controlo | Descobrem ligações de rede suspeitas do HMI para um IP externo |
| **Indicador atualizado** | Definitivo | Comprometimento do sistema de controlo industrial |
| **Resposta** | IRP ativado com urgência máxima | Isolamento do sistema de controlo, passagem a modo manual, comunicação a direção industrial |

**Como interpretar:**

*O operador foi o primeiro sensor porque conhece o processo. Nenhum sistema automático de TI teria detetado que "0 graus num forno a 850" e anómalo - para o SIEM, e apenas um valor numerico. O conhecimento do contexto operacional e insubstituivel. Este exemplo mostra porque e que a deteção humana e essencial em ambientes industriais.*

**Para refletir:**

- Porque e que um IDS de rede não teria detetado este incidente de forma imediata?
- Que riscos de segurança física existem quando um sistema de controlo industrial e comprometido?
- Que treino específico deveria ter o operador para acelerar ainda mais a deteção?

---

### Exemplo 5 - Banco: manipulação de logs detetada

**Cenário:** A equipa de auditoria interna de um banco deteta, durante uma revisão trimestral, que os logs de acesso ao sistema de transferências internacionais foram modificados. Faltam registos de 3 dias específicos.

| Fase | O que acontece | Detalhe |
|------|---------------|---------|
| **Deteção** | Humana (auditoria) + Tecnológica (integridade de logs) | Auditores notam lacunas nos logs e verificam que a hash de integridade não corresponde |
| **Indicador** | Definitivo (desde o início) | Alteração de logs e um dos indicadores mais graves - alguém tentou encobrir atividade |
| **Análise** | Equipa de IR forense | Reconstrução parcial dos logs a partir de backups e sistemas secundarios |
| **Descoberta** | Transferencias não autorizadas | Nos 3 dias sem logs, foram executadas transferências para contas no estrangeiro |
| **Classificação** | Incidente crítico - possível desastre | Perda financeira direta, comprometimento de integridade, obrigações regulatorias |
| **Avaliação de desastre** | Criterios de desastre avaliados | Montante das transferências excede o limiar de perda tolerável definido pelo banco |

**Como interpretar:**

*A alteração de logs e simultaneamente um indicador definitivo e um agravante: não só confirma o comprometimento como revela intenção de encobrir. Neste caso, o incidente tem potencial para ser classificado como desastre se o montante financeiro exceder os limiares definidos pelo banco. A ponte IRP para DRP ativa-se quando a recuperação financeira e regulatória excede a capacidade de resposta normal.*

**Para refletir:**

- Porque e que a integridade dos logs e tao crítica para a deteção de incidentes?
- Que mecanismos podem proteger os logs contra alteração (ex: write-once storage, log forwarding)?
- A partir de que montante financeiro este banco deveria considerar o incidente como desastre?

---

## 5. Exercícios

### Nível 1 - Compreensão

#### Exercício 1.1 - Classificar indicadores

Classifica cada indicador como **possível**, **provável** ou **definitivo**:

| # | Indicador | Classificação? |
|---|-----------|---------------|
| a) | O servidor de ficheiros está mais lento que o habitual | |
| b) | O IDS gerou um alerta para uma assinatura de exploit conhecida | |
| c) | Foram encontradas ferramentas de hacking (mimikatz) num servidor de produção | |
| d) | Um utilizador reportou ter recebido um email de phishing | |
| e) | Uma conta de administrador inativa há 6 meses fez login as 4h da manhã | |
| f) | O consumo de CPU de um servidor está a 100% há 3 horas | |
| g) | Um parceiro externo notificou que dados da organização estão a venda na dark web | |
| h) | O sistema de email rejeitou 200 mensagens com anexos suspeitos | |

??? success "Solução 1.1"

    | # | Indicador | Classificação | Justificação |
    |---|-----------|:------------:|-------------|
    | a) | Servidor de ficheiros lento | **Possível** | Pode ser incidente (ransomware a cifrar, exfiltração) ou problema técnico (disco cheio, pico de utilização). |
    | b) | Alerta de IDS com assinatura conhecida | **Provável** | O IDS reconheceu um padrão de ataque específico. Necessita validação (pode ser falso positivo), mas a suspeita e forte. |
    | c) | Ferramentas de hacking em servidor de produção | **Definitivo** | Ferramentas como mimikatz não tem uso legítimo num servidor de produção. Indica comprometimento ativo. |
    | d) | Email de phishing reportado | **Possível a provável** | O email em si e possível (pode ser spam inofensivo). Se for phishing direcionado com link para página falsa da organização, e provável. |
    | e) | Conta inativa fez login as 4h | **Definitivo** | Conta dormente com login fora de horas combina dois indicadores fortes: conta dormente + horário anómalo. |
    | f) | CPU a 100% há 3 horas | **Possível** | Pode ser mineração de criptomoedas (incidente) ou processo legítimo mal configurado. Requer investigação. |
    | g) | Dados a venda na dark web | **Definitivo** | Confirmação externa de que dados foram exfiltrados. Indicador definitivo por natureza. |
    | h) | 200 emails com anexos suspeitos rejeitados | **Provável** | Volume elevado de emails maliciosos sugere campanha direcionada. O filtro bloqueou, mas pode haver emails que passaram. |

---

#### Exercício 1.2 - Verdadeiro ou Falso

Classifica as seguintes afirmações como Verdadeiras (V) ou Falsas (F):

| # | Afirmação |
|---|-----------|
| a) | A deteção de incidentes depende exclusivamente de ferramentas tecnológicas como SIEM e EDR. |
| b) | Um indicador possível deve ser sempre ignorado porque provavelmente não é nada de grave. |
| c) | A perda de confidencialidade e uma situação de incidente automático. |
| d) | Todo o incidente se torna automaticamente um desastre se não for contido em 1 hora. |
| e) | O treino dos utilizadores e essencial para a deteção de incidentes. |
| f) | A fronteira entre incidente e desastre e universal e igual para todas as organizações. |
| g) | Uma conta dormente que se torna ativa e um indicador definitivo de incidente. |
| h) | O DRP e ativado quando o IRP já não é suficiente para lidar com a situação. |

??? success "Solução 1.2"

    | # | Resposta | Justificação |
    |---|:--------:|-------------|
    | a) | **F** | A deteção depende de tecnologia **e** de pessoas. Utilizadores, helpdesk, administradores e parceiros são fontes humanas essenciais. |
    | b) | **F** | Indicadores possíveis devem ser registados e investigados, nunca ignorados. Podem ser o primeiro sinal de algo mais grave. |
    | c) | **V** | A perda de qualquer dimensão da triade CIA (confidencialidade, integridade, disponibilidade) e tipicamente definida como incidente automático. |
    | d) | **F** | Não existe um limiar temporal universal. Cada organização define os seus próprios critérios para a fronteira incidente-desastre, com base no MTD e noutros fatores. |
    | e) | **V** | Sem treino, os utilizadores ignoram sinais, o helpdesk não escala corretamente e a deteção e muito mais lenta. |
    | f) | **F** | A fronteira depende do setor, criticidade, tolerância ao risco e capacidade de resiliência de cada organização. |
    | g) | **V** | A utilização de contas dormentes e um dos indicadores definitivos mais claros de comprometimento. |
    | h) | **V** | O DRP entra em ação quando a resposta a incidentes (IRP) não consegue conter ou mitigar a situação de forma adequada. |

---

### Nível 2 - Aplicação prática

#### Exercício 2.1 - Sequencia de alertas e escalonamento

Recebes os seguintes alertas em sequência na tua organização (empresa de software com 80 funcionários):

| Hora | Alerta |
|------|--------|
| 09:00 | O antivirus de 3 postos de trabalho detetou e bloqueou o mesmo ficheiro malicioso |
| 09:15 | Um utilizador reporta que recebeu um email com um link para "atualizar o software da empresa" |
| 09:30 | O SIEM regista 5 tentativas de login falhadas na conta de um administrador de sistemas |
| 09:45 | O EDR deteta execução de PowerShell codificado num servidor de desenvolvimento |
| 10:00 | O servidor de ficheiros mostra atividade de cifragem em massa |

Para cada momento, classifica o indicador (possível/provável/definitivo) e decide a ação.

??? success "Solução 2.1"

    | Hora | Indicador | Classificação | Ação |
    |------|-----------|:------------:|------|
    | 09:00 | Antivirus bloqueou ficheiro malicioso | **Possível** | Registar. Verificar se os 3 postos receberam o ficheiro pela mesma via. Pode ser campanha generica. |
    | 09:15 | Email de phishing reportado | **Provável** | Correlacionar com o alerta anterior. Se o email contem o mesmo ficheiro ou link similar, trata-se de campanha direcionada. Escalar para equipa de IR. |
    | 09:30 | Tentativas de login falhadas em conta admin | **Provável** | Correlacionar: a campanha de phishing pode ter como objetivo obter credenciais de administrador. Contactar o administrador para confirmar se foi ele. Reforcar monitorização. |
    | 09:45 | PowerShell codificado em servidor | **Definitivo** | Execução de código suspeito num servidor e indicador definitivo de comprometimento. Iniciar contenção imediata: isolar o servidor. |
    | 10:00 | Cifragem em massa | **Definitivo + potencial desastre** | Ransomware em execução. Contenção urgente de todos os sistemas. Se a cifragem atingir sistemas críticos e não for contida, avaliar escalonamento para DRP. |

    **Conclusão:**

    *A sequência mostra uma escalada classica: campanha de phishing (possível) que leva a comprometimento de credenciais (provável) que resulta em execução de malware (definitivo) e ransomware (desastre potencial). A capacidade de correlacionar os alertas em tempo real e crítica para antecipar a evolução.*

---

#### Exercício 2.2 - Incidente ou desastre?

Para cada cenário, determina se se trata de **incidente contido pelo IRP** ou **desastre que requer DRP**. Justifica.

| # | Cenário |
|---|---------|
| a) | Uma clínica dentaria sofre um ataque de ransomware que cifra o servidor de agendamento. Os backups de ontem estão intactos. A clínica pode operar com agenda em papel durante 4 horas. |
| b) | Uma empresa de logística sofre um ataque que compromete o sistema GPS de toda a frota (200 veiculos). Não existe sistema alternativo e as entregas param completamente. |
| c) | Um banco deteta que um funcionário descarregou a base de dados completa de clientes para um disco externo pessoal. O funcionário já saiu do edifício. |
| d) | Uma universidade sofre um DDoS que torna o portal de e-learning inacessível durante 2 horas, no período de exames. Os exames são presenciais e não dependem da plataforma. |
| e) | Uma fábrica sofre um ataque que compromete os sistemas SCADA de controlo de produção. A produção para completamente e não há modo manual disponível. |

??? success "Solução 2.2"

    | # | Classificação | Justificação |
    |---|:------------:|-------------|
    | a) | **Incidente (IRP)** | A clínica tem backups e alternativa manual. A contenção e recuperação estão dentro da capacidade normal. O ransomware afetou um sistema, não a totalidade da operação. |
    | b) | **Desastre (DRP)** | 200 veiculos parados sem alternativa significa que a operação principal da empresa está completamente interrompida. A recuperação normal não é suficiente - precisa de solução extraordinaria. |
    | c) | **Incidente crítico, potencial desastre** | A fuga de dados e um incidente definitivo. Se o volume de dados e tal que implica obrigações legais massivas e perda de confiança dos clientes, pode escalar para desastre. Depende do alcance e das consequências regulatorias. |
    | d) | **Incidente (IRP)** | 2 horas de indisponibilidade do portal, sem impacto nos exames (que são presenciais). O impacto e limitado e a contenção e possível. |
    | e) | **Desastre (DRP)** | Produção totalmente parada sem modo manual e um cenário em que o IRP não pode resolver sozinho. Requer recuperação de infraestrutura industrial, possivelmente com fornecedores especializados. |

---

#### Exercício 2.3 - Desenhar fontes de deteção

Uma PME portuguesa de contabilidade (15 funcionários, 1 escritório, servidor local, cloud para email) pede-te para desenhares as fontes de deteção da organização.

Preenche a tabela com pelo menos 6 fontes de deteção adequadas a está organização:

| Fonte | Tipo (Tecnológica/Humana/Externa) | O que deteta | Prioridade |
|-------|:---------------------------------:|-------------|:----------:|
| ? | ? | ? | ? |

??? success "Solução 2.3"

    | Fonte | Tipo | O que deteta | Prioridade |
    |-------|:----:|-------------|:----------:|
    | **Antivirus/EDR nos postos** | Tecnológica | Malware, ransomware, comportamento suspeito | Alta |
    | **Logs do servidor local** | Tecnológica | Acessos anómalos, erros, alterações de configuração | Alta |
    | **Alertas do provider de email (Microsoft 365/Google)** | Tecnológica | Phishing, spam, tentativas de login suspeitas | Alta |
    | **Funcionários (contabilistas)** | Humana | Emails estranhos, pedidos de transferência incomuns, dados inconsistentes | Media-Alta |
    | **Técnico de TI / suporte externo** | Humana | Anomalias na rede, atualizações falhadas, acessos fora de padrão | Alta |
    | **Clientes** | Externa | "Recebi um email da vossa empresa que parece falso" | Media |
    | **Firewall / router** | Tecnológica | Tráfego de rede anómalo, ligações suspeitas | Media |
    | **Autoridade tributaria ou parceiros** | Externa | Alertas de fraude fiscal ou uso indevido de credenciais | Baixa (rara, mas crítica) |

    **Nota:** Numa PME desta dimensão, não é realista ter um SIEM dedicado. As fontes de deteção devem ser proporcionais a dimensão e orcamento da organização. O treino dos funcionários e especialmente importante porque são poucos e cada um tem grande responsabilidade.

---

### Nível 3 - Análise

#### Exercício 3.1 - Linha temporal completa

**Cenário:** Es o responsável de segurança de uma empresa de comércio eletrónico. Ao longo de uma semana, ocorrem os seguintes eventos:

| Dia | Hora | Evento |
|-----|------|--------|
| Segunda | 08:00 | Sistema de monitorização regista pico de tráfego no website (3x o normal) |
| Segunda | 10:00 | Helpdesk recebe 5 chamadas de clientes que não conseguem fazer login |
| Terca | 14:00 | Administrador nota 2 contas de teste (criadas para desenvolvimento) com logins recentes |
| Quarta | 09:00 | EDR deteta PowerShell a descarregar ficheiros de um servidor externo num servidor web |
| Quarta | 11:00 | Logs do servidor web mostram 400 GB de dados transferidos para IP desconhecido nas últimas 48h |
| Quinta | 06:00 | Email anónimo recebido: "Temos os dados dos vossos clientes. Paguem 50 BTC ou publicamos tudo." |
| Quinta | 08:00 | Vários logs de acesso dos últimos 5 dias foram eliminados do servidor de logs |

**Tarefas:**

1. Para cada evento, classifica o indicador (possível/provável/definitivo/incidente automático)
2. Identifica o momento em que o incidente deveria ter sido confirmado
3. Identifica o momento em que se cruza a fronteira para potencial desastre
4. Que oportunidades de deteção mais precoce foram perdidas?

??? success "Solução 3.1"

    **1. Classificação dos indicadores:**

    | Dia | Evento | Indicador |
    |-----|--------|:---------:|
    | Seg 08:00 | Pico de tráfego 3x | **Possível** - pode ser campanha de marketing, bot, ou reconhecimento |
    | Seg 10:00 | Clientes sem login | **Possível** - pode ser problema técnico ou consequência de ataque |
    | Ter 14:00 | Contas de teste com logins | **Provável** - contas de teste não devem ter utilização em produção |
    | Qua 09:00 | PowerShell a descarregar ficheiros | **Definitivo** - comportamento típico de comprometimento ativo |
    | Qua 11:00 | 400 GB transferidos para IP desconhecido | **Definitivo + incidente automático** - exfiltração de dados confirmada (perda de confidencialidade) |
    | Qui 06:00 | Extorsão pelo atacante | **Definitivo** - o próprio atacante confirma |
    | Qui 08:00 | Logs eliminados | **Definitivo** - destruição de evidências |

    **2. Momento de confirmação:**

    O incidente deveria ter sido confirmado **na quarta-feira as 09:00**, quando o EDR detetou atividade de comprometimento ativo. Idealmente, a correlação entre o pico de tráfego (segunda), os problemas de login (segunda) e as contas de teste (terça) deveria ter gerado uma investigação mais precoce.

    **3. Fronteira para desastre:**

    A fronteira cruza-se **na quarta-feira as 11:00** quando se confirma a exfiltração de 400 GB de dados. A partir deste momento:

    - Ha perda massiva de confidencialidade (incidente automático)
    - O volume de dados sugere que a base de dados de clientes foi comprometida
    - Ha obrigações legais imediatas (RGPD - notificação a CNPD em 72 horas)
    - O impacto reputacional e potencialmente irreversível

    A extorsão de quinta-feira apenas confirma o que já era evidente.

    **4. Oportunidades perdidas:**

    - **Segunda 08:00**: O pico de tráfego deveria ter sido investigado em correlação com os problemas de login das 10:00
    - **Terca 14:00**: As contas de teste com logins recentes deveriam ter acionado uma investigação imediata e correlação com os eventos de segunda
    - Se a correlação tivesse sido feita na terça, a exfiltração de 400 GB poderia ter sido detetada e contida antes de se completar

    **Conclusão:**

    *Cada evento isolado podia parecer menor. A chave estava na correlação. Uma organização com boa capacidade de deteção teria ligado os pontos entre segunda e terça, e contido o incidente antes da exfiltração massiva de quarta.*

---

#### Exercício 3.2 - Mesmo incidente, organizações diferentes

Duas organizações sofrem o mesmo tipo de incidente: ransomware que cifra 60% dos servidores internos.

- **Organização A**: Hospital central com 500 camas, sistemas clínicos críticos, datacenter redundante, backups testados, equipa de IR treinada
- **Organização B**: Escritório de advogados com 20 funcionários, servidor único local, backups em disco externo (último backup há 2 semanas), sem equipa de IR

Para cada organização, responde:

1. O incidente e contido pelo IRP ou escala para desastre? Justifica.
2. Que fontes de deteção provavelmente detetaram o ransomware?
3. Qual seria o primeiro indicador e de que tipo (possível/provável/definitivo)?
4. Quanto tempo estimado até a deteção?

??? success "Solução 3.2"

    **Organização A - Hospital:**

    | Aspeto | Resposta |
    |--------|---------|
    | **IRP ou desastre?** | **IRP** (provavelmente). O datacenter redundante e os backups testados permitem contenção e recuperação. No entanto, se sistemas clínicos críticos forem afetados e a recuperação exceder o MTD (tipicamente muito curto em hospitais), pode escalar para desastre. |
    | **Fontes de deteção** | EDR nos servidores, SIEM com correlação, possivelmente helpdesk (clínicos reportam que não acedem a registos) |
    | **Primeiro indicador** | Definitivo (EDR deteta cifragem em massa) ou Possível (clínico reporta que sistema está lento) |
    | **Tempo até deteção** | Minutos (EDR) a 1-2 horas (detetor humano) |

    **Organização B - Escritório de advogados:**

    | Aspeto | Resposta |
    |--------|---------|
    | **IRP ou desastre?** | **Desastre**. 60% dos servidores cifrados com backup de há 2 semanas significa perda massiva de dados. Sem equipa de IR, a resposta será desorganizada. Sem datacenter redundante, a recuperação será extremamente lenta. |
    | **Fontes de deteção** | Provavelmente humana: advogados não conseguem aceder a ficheiros. Possivelmente antivirus, se existir e estiver atualizado. |
    | **Primeiro indicador** | Possível (advogado nota que ficheiros não abrem) que rapidamente se torna definitivo (nota de resgate aparece) |
    | **Tempo até deteção** | Horas (quando alguém tenta aceder aos ficheiros cifrados) |

    **Conclusão:**

    *O mesmo incidente (ransomware em 60% dos servidores) e um incidente gerivel para o hospital e um desastre para o escritório de advogados. A diferença está na preparação: deteção rápida, backups testados, equipa treinada e infraestrutura redundante transformam um potencial desastre num incidente contido.*

---

## 6. Armadilhas e confusões a evitar

### Confusão 1: Deteção não é só tecnologia

> Depender exclusivamente de ferramentas automáticas e perigoso. As pessoas são sensores insubstituíveis que detetam o que "não parece normal" num contexto que só elas conhecem.

Um operador de fábrica que nota valores impossíveis no sistema de controlo, uma contabilista que reconhece uma fatura fraudulenta, um utilizador que desconfia de um email - nenhum SIEM deteta estas situações sem configuração específica.

### Confusão 2: Indicador possível não é o mesmo que "nada de grave"

> Indicadores possíveis devem ser registados e investigados, nunca descartados. Muitos incidentes graves comecaram com sinais fracos que foram ignorados.

O consumo anómalo de CPU que ninguém investigou pode ser mineração de criptomoedas por um atacante que já tem acesso ao sistema há semanas.

### Confusão 3: Um único indicador definitivo basta para agir

> Não é preciso esperar por múltiplos indicadores definitivos para iniciar a resposta. Um único indicador definitivo (como ferramentas de hacking encontradas num servidor) justifica resposta completa imediata.

Esperar por "mais provas" quando já há evidência clara e perder tempo crítico.

### Confusão 4: Nem todo o incidente se torna desastre

> A maioria dos incidentes e contida pelo IRP sem escalar para desastre. O desastre e a exceção, não a regra - mas a organização deve estar preparada para ambos.

Tratar todo o incidente como desastre gera pânico desnecessário e esgota recursos. Mas ignorar a possibilidade de escalar e igualmente perigoso.

### Confusão 5: A fronteira incidente-desastre não é universal

> Não existe um número magico de horas, servidores afetados ou euros perdidos que separe incidente de desastre para todas as organizações. Cada organização define os seus próprios critérios.

Uma falha de 2 horas pode ser rotina para uma empresa de consultoria e um desastre para uma plataforma de trading.

### Confusão 6: A deteção multicanal não significa redundância desnecessaria

> Ter múltiplos canais de deteção não é desperdicio. E resiliência. Se um canal falha (o SIEM tem um falso negativo), outro canal pode detetar o incidente (o utilizador reporta algo estranho).

A convergência de sinais de múltiplas fontes também acelera a classificação e da maior confiança a decisão.

### Confusão 7: O treino não é um custo - e um investimento na deteção

> Uma organização que não treina os seus utilizadores está a descartar uma das suas fontes de deteção mais valiosas. O treino transforma utilizadores passivos em sensores ativos.

O custo de treinar 100 utilizadores e uma fração do custo de um incidente que passou despercebido durante dias porque ninguém sabia a quem reportar.

### Confusão 8: Escalar de IRP para DRP não é sinal de fracasso

> Ativar o DRP quando o IRP não é suficiente e a decisão correta, não um fracasso da equipa de IR. A escalada e um mecanismo de proteção, não uma admissão de derrota.

Insistir no IRP quando já se está claramente em território de desastre agrava o impacto.

---

## 7. Resumo rápido

### Tabela de conceitos-chave

| Conceito | Descrição |
|----------|-----------|
| **Deteção tecnológica** | Alertas automáticos de SIEM, EDR, IDS/IPS, antivirus, logs |
| **Deteção humana** | Observacoes de utilizadores, helpdesk, administradores, gestores |
| **Deteção multicanal** | O mesmo incidente detetado por múltiplas fontes em simultâneo |
| **Indicador possível** | Sinal fraco que pode ser incidente ou problema técnico |
| **Indicador provável** | Forte suspeita de incidente, requer investigação prioritaria |
| **Indicador definitivo** | Quase confirmação de incidente, justifica resposta completa |
| **Incidente automático** | Situação pré-definida como incidente (perda de CIA, violação de lei/política) |
| **Escala de evidência** | Progressão de certeza: possível, provável, definitivo, confirmado |
| **Fronteira incidente-desastre** | Ponto em que o IRP deixa de ser suficiente |
| **Critério de desastre 1** | Organização não consegue mitigar durante o incidente |
| **Critério de desastre 2** | Dano tao severo que recuperação rápida e impossível |
| **Ponte IRP-DRP-BCP** | Escalada natural quando a capacidade de resposta e excedida |

### Frases-chave para recordar

- *"A deteção não é só tecnologia. Um utilizador que diz 'isto não me parece normal' pode ser o primeiro sinal de um incidente."*
- *"Indicadores possíveis não se ignoram - investigam-se. Muitos desastres comecaram como sinais fracos descartados."*
- *"A alteração de logs e um dos indicadores mais graves: não só confirma comprometimento como revela intenção de encobrir."*
- *"O mesmo incidente pode ser contido numa organização e ser um desastre noutra. A fronteira não é técnica - e organizacional."*
- *"Numa organização madura, qualquer pessoa pode ser o primeiro ponto de deteção - mas só se souber o que procurar e a quem reportar."*
- *"A deteção multicanal não é redundância. E resiliência."*
- *"Quando o IRP deixa de ser suficiente, ativa-se o DRP. Quando funções críticas devem continuar degradadas, ativa-se o BCP."*
- *"Treinar utilizadores não é um custo. E um investimento que transforma sensores passivos em sensores ativos."*
- *"Não é preciso esperar por múltiplos indicadores definitivos para agir. Um único indicador definitivo basta."*

### Diagrama de sintese

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                    DETECAO DE INCIDENTES                            │
  │                                                                     │
  │  FONTES                 INDICADORES               FRONTEIRA        │
  │  ══════                 ═══════════               ══════════        │
  │                                                                     │
  │  ┌───────────┐         Possível                                     │
  │  │Tecnológica│         (sinal fraco)              Incidente         │
  │  │SIEM, EDR, │              │                     ═════════         │
  │  │IDS, AV,   │              ▼                     Equipa de IR     │
  │  │Logs       │         Provável                   consegue conter  │
  │  └───────────┘         (forte suspeita)                │           │
  │       +                     │                          │           │
  │  ┌───────────┐              ▼                    Contenção falha?  │
  │  │  Humana   │         Definitivo                 Impacto cresce?  │
  │  │Utilizador,│         (quase confirmação)              │           │
  │  │Helpdesk,  │              │                          ▼           │
  │  │Admin,     │              ▼                     Desastre         │
  │  │Gestor     │       ┌──────────────┐             ═════════        │
  │  └───────────┘       │  Incidente   │             IRP ► DRP ► BCP  │
  │       +              │  confirmado  │                               │
  │  ┌───────────┐       │  ou          │                               │
  │  │  Externa  │       │  automático  │                               │
  │  │Parceiros, │       └──────────────┘                               │
  │  │Fornecedo- │                                                      │
  │  │res        │       Incidente automático:                          │
  │  └───────────┘       Perda CIA, violação                            │
  │                      lei/política                                   │
  │                                                                     │
  │  TREINO = transforma deteção lenta em deteção rápida               │
  └─────────────────────────────────────────────────────────────────────┘
```

---

*Próximo capítulo: [Reação a incidentes](reacao.md)*
