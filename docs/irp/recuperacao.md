# Recuperacao de Incidentes

## Indice

1. [Avaliacao de danos](#1-avaliacao-de-danos)
2. [Pericia informatica](#2-pericia-informatica)
3. [Recuperacao madura](#3-recuperacao-madura)
4. [Resposta automatizada](#4-resposta-automatizada)
5. [Exemplos praticos](#5-exemplos-praticos)
6. [Exercicios](#6-exercicios)
7. [Armadilhas e confusoes a evitar](#7-armadilhas-e-confusoes-a-evitar)
8. [Resumo rapido](#8-resumo-rapido)

---

## 1. Avaliacao de danos

Apos a contencao de um incidente, a organizacao precisa de perceber **o que realmente aconteceu**. A avaliacao de danos e o processo de determinar o alcance, a profundidade e as consequencias do incidente antes de avancar para a recuperacao.

> Recuperar sem avaliar e como reconstruir uma casa sem saber quais as paredes que ficaram danificadas.

A expressao "determinacao imediata" nao significa certeza instantanea. Significa **comecar a delimitar o ambito do incidente o mais cedo possivel**, com a melhor informacao disponivel naquele momento. A avaliacao inicial guia as primeiras decisoes de recuperacao; avaliacoes posteriores refinam essa compreensao a medida que surgem novos dados.

```
  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
  │   Contencao   │────►│   Avaliacao    │────►│  Recuperacao   │
  │   concluida   │     │   de danos     │     │   informada    │
  └───────────────┘     └───────┬───────┘     └───────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
              Que sistemas  Que dados   Qual o
              foram        foram       alcance
              afetados?    expostos?   real?
```

A avaliacao deve responder a perguntas essenciais:

- Que **sistemas** foram afetados?
- Que **dados** foram alterados, perdidos ou expostos?
- Que **ativos** ficaram comprometidos?
- Ate onde chegou o incidente (qual o **perimetro** real)?
- O impacto foi **apenas tecnico** ou tambem **operacional** (processos de negocio, servicos a clientes, obrigacoes legais)?

---

### O que procurar (a lente CIA)

O dano causado por um incidente nao se resume a "sistema em baixo". Deve ser analisado atraves das tres dimensoes da seguranca da informacao:

| Dimensao | Perguntas-chave | Exemplos de dano |
|----------|----------------|------------------|
| **Confidencialidade** | Houve acesso nao autorizado? Dados foram expostos ou exfiltrados? Credenciais foram comprometidas? | Fuga de dados de clientes, exposicao de credenciais, leitura de documentos confidenciais por terceiros |
| **Integridade** | Dados foram alterados sem autorizacao? Ha corrupcao de ficheiros ou registos? Configuracoes foram adulteradas? | Registos clinicos alterados, configuracoes de firewall modificadas pelo atacante, logs apagados para encobrir rastos |
| **Disponibilidade** | Servicos ficaram indisponiveis? Durante quanto tempo? Que impacto operacional teve? | Site de e-commerce em baixo durante 6 horas, sistema de faturacao inacessivel, email corporativo bloqueado |

O dano pode manifestar-se de muitas formas que nao sao imediatamente obvias:

- **Dados expostos** a terceiros nao autorizados
- **Dados alterados** de forma silenciosa (sem alerta)
- **Contas comprometidas** que podem ser usadas futuramente
- **Configuracoes adulteradas** que enfraquecem a seguranca
- **Logs apagados** que dificultam a investigacao
- **Servicos degradados** (nao totalmente em baixo, mas lentos ou instáveis)
- **Impacto em terceiros** (parceiros, clientes, fornecedores)
- **Perda de confianca** de stakeholders

---

### Fontes de evidencia

A avaliacao de danos nao se baseia numa unica fonte. Requer cruzar informacao de multiplas origens:

| Fonte | O que revela | Limitacao |
|-------|-------------|-----------|
| **Logs de sistema** | Que eventos ocorreram, quando, por quem | Podem ter sido apagados ou manipulados pelo atacante |
| **Logs de detecao de intrusao (IDS/IPS)** | Que trafego anomalo foi detetado, que regras foram acionadas | Nao capturam tudo; dependem das regras configuradas |
| **Documentacao de configuracao** | Qual era o estado esperado dos sistemas (para comparar com o estado atual) | Pode estar desatualizada se nao houver gestao de configuracao rigorosa |
| **Documentacao do incidente** | Cronologia, decisoes tomadas, acoes executadas durante a resposta | Depende da qualidade do registo feito em tempo real |
| **Analise detalhada de sistemas e dados** | Estado real dos ficheiros, processos, contas, servicos | Consome tempo; pode nao ser viavel para todos os sistemas |
| **Logs de EDR/XDR** | Atividade nos endpoints, processos executados, ligacoes de rede | Cobertura limitada ao que estava instalado e configurado |
| **Entrevistas com utilizadores** | Contexto humano, observacoes nao registadas em logs | Subjetivas, dependem da memoria e da disponibilidade |

---

### Avaliacao inicial vs refinamento posterior

A avaliacao de danos nao e um evento unico. Funciona em ciclos:

```
  ╔══════════════════════════════════════════════════════════════════╗
  ║                  CICLO DE AVALIACAO DE DANOS                    ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                 ║
  ║  Avaliacao inicial          Refinamento 1         Refinamento 2 ║
  ║  (primeiras horas)          (dias seguintes)      (semanas)     ║
  ║                                                                 ║
  ║  • Que sistemas afetados?   • Analise detalhada   • Impacto     ║
  ║  • Alcance preliminar?        de logs               total       ║
  ║  • Prioridades imediatas?   • Verificacao de      • Custos      ║
  ║  • O que restaurar           dados expostos       • Obrigacoes  ║
  ║    primeiro?                • Perimetro real         legais     ║
  ║                               confirmado          • Relatorio   ║
  ║                                                     final       ║
  ╚══════════════════════════════════════════════════════════════════╝
```

> Nao esperes ter toda a informacao para comecar a agir. Mas nao ignores que a avaliacao precisa de ser refinada a medida que a informacao evolui.

A avaliacao inicial guia a recuperacao; as avaliacoes subsequentes refinam a compreensao e alimentam o relatorio pos-incidente, a comunicacao com stakeholders e as decisoes sobre obrigacoes legais (como a notificacao a CNPD em caso de violacao de dados pessoais).

---

## 2. Pericia informatica

### O que e a pericia informatica

A **pericia informatica** (computer forensics) e o processo de **recolher, analisar e preservar provas digitais** de forma cuidadosa, para que possam ser utilizadas de forma fiavel e, quando necessario, formal (por exemplo, em processos disciplinares, judiciais ou regulatorios).

Nao se trata apenas de "ver os logs". Envolve:

- **Recolha correta** das provas (sem alterar os dados originais)
- **Preservacao da integridade** (garantir que a prova nao foi modificada apos recolha)
- **Documentacao da origem e manuseamento** (quem recolheu, quando, como, onde esta guardada)

```
  ┌───────────────────────────────────────────────────────┐
  │              PERICIA INFORMATICA                       │
  │                                                        │
  │   Recolha  ──►  Preservacao  ──►  Analise  ──►  Uso   │
  │   correta       da integridade    tecnica      formal  │
  │                                                        │
  │   Copias        Hashes (SHA-256)  Correlacao   Relatorio│
  │   forenses      Cadeia de         Cronologia   Prova    │
  │   Imagens       custodia          Atribuicao   legal    │
  │   de disco                                              │
  └───────────────────────────────────────────────────────┘
```

As provas digitais podem demonstrar:

- **Acao**: que ferramentas foram usadas, que comandos foram executados
- **Intencao**: tentativas de apagar logs, exfiltrar dados deliberadamente, criar persistencia
- **Cronologia**: quando cada acao ocorreu, em que sequencia
- **Alcance**: que sistemas e dados foram efetivamente acedidos ou comprometidos

---

### Quando e necessaria

A pericia informatica **nao e obrigatoria em todos os incidentes**. Ganha importancia em situacoes especificas:

| Situacao | Necessidade forense | Justificacao |
|----------|:-------------------:|-------------|
| Phishing generico com reset rapido de password | Baixa | Incidente contido rapidamente, sem indicios de acesso efetivo a dados sensiveis |
| Suspeita de crime informatico | **Alta** | Pode ser necessario reportar as autoridades e apresentar provas |
| Obrigacao regulatoria (RGPD, NIS2) | **Alta** | O regulador pode exigir evidencia de como o incidente ocorreu e que dados foram afetados |
| Possibilidade de litigio | **Alta** | A organizacao pode precisar de provas para se defender ou para acionar terceiros |
| Impacto disciplinar interno | **Media-Alta** | E necessario demonstrar que um colaborador teve determinado comportamento |
| Necessidade de prova formal | **Alta** | Qualquer situacao onde "o que aconteceu" precisa de ser demonstrado de forma fiavel |
| Falha de sistema sem indicios de ataque | Baixa | Se nao ha suspeita de acao maliciosa, a investigacao tecnica normal e suficiente |

Uma prova digital que foi **alterada, mal documentada, contaminada ou armazenada sem controlo** perde o seu valor tecnico, organizacional e legal. Nao basta recolher - e preciso recolher **bem**.

---

### Cadeia de custodia

A **cadeia de custodia** e o registo documentado de quem recolheu a prova, quando, como, e por onde passou desde a recolha ate a sua utilizacao.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    CADEIA DE CUSTODIA                         ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Recolha            Transporte          Armazenamento         ║
  ║  ────────           ──────────          ──────────────        ║
  ║  Quem recolheu?     Como foi            Onde esta             ║
  ║  Quando?            transportada?       guardada?             ║
  ║  De onde?           Quem a teve?        Quem tem acesso?      ║
  ║  Com que metodo?    Em que condicoes?   Ha registo de         ║
  ║  Hash de            A integridade       cada acesso?          ║
  ║  integridade?       foi mantida?                              ║
  ║                                                               ║
  ║  ──────────────────────────────────────────────────────────   ║
  ║  Cada elo da cadeia deve ser documentado. Se um elo falha,    ║
  ║  toda a cadeia perde credibilidade.                           ║
  ╚═══════════════════════════════════════════════════════════════╝
```

Nem todas as equipas estao preparadas para conduzir pericia informatica. Uma resposta apressada ou mal conduzida pode **destruir artefactos** que seriam essenciais para a investigacao.

---

### A tensao entre recuperacao rapida e preservacao de prova

Existe uma tensao real entre duas necessidades legitimas: a **urgencia operacional** de restaurar servicos e a **necessidade de preservar provas** antes de alterar os sistemas.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   URGENCIA OPERACIONAL          PRESERVACAO DE PROVA            │
  │                                                                 │
  │   "Precisamos de restaurar      "Se restaurarmos agora,         │
  │    os servicos o mais           perdemos as provas do           │
  │    rapido possivel!"            que aconteceu."                 │
  │                                                                 │
  │          ◄──────── TENSAO ────────►                             │
  │                                                                 │
  │   ┌─────────────────────────────────────────────────────┐       │
  │   │            EQUILIBRIO NECESSARIO                    │       │
  │   │                                                     │       │
  │   │  1. Avaliar: ha necessidade forense neste caso?     │       │
  │   │  2. Se sim: preservar provas ANTES de restaurar     │       │
  │   │  3. Se nao: documentar e avancar com recuperacao    │       │
  │   │  4. Sempre: nao destruir provas por descuido        │       │
  │   └─────────────────────────────────────────────────────┘       │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

E importante distinguir claramente:

| Aspeto | Avaliacao de danos | Pericia informatica |
|--------|-------------------|---------------------|
| **Pergunta central** | O que foi afetado? Qual o impacto? O que restaurar? | Que provas existem? Como preserva-las? O que pode ser demonstrado? |
| **Objetivo** | Guiar a recuperacao | Garantir que as provas sao fiaveis e utilizaveis |
| **Urgencia** | Alta - necessaria para avancar | Variavel - depende do tipo de incidente |
| **Quem faz** | Equipa de resposta a incidentes | Especialistas em forense digital (internos ou externos) |
| **Risco de nao fazer** | Recuperacao cega, sem saber o alcance | Perda de provas, incapacidade de demonstrar o que aconteceu |

> Recuperar depressa demais pode destruir provas. Preservar provas em excesso pode atrasar a recuperacao. O equilibrio depende do contexto de cada incidente.

---

## 3. Recuperacao madura

A recuperacao nao e simplesmente "ligar tudo outra vez". Uma recuperacao madura tem **multiplas camadas**, cada uma com objetivos distintos.

### As 7 camadas da recuperacao

| Camada | Objetivo | Acoes tipicas | Exemplo |
|--------|----------|--------------|---------|
| **1. Corrigir vulnerabilidades** | Eliminar a causa raiz que permitiu o incidente e a sua propagacao | Aplicar patches, corrigir configuracoes, fechar portas, eliminar contas obsoletas | A vulnerabilidade no servidor web que permitiu a intrusao e corrigida antes de o repor online |
| **2. Corrigir salvaguardas** | Reforcar os controlos que falharam ou estavam ausentes | Implementar MFA, instalar EDR, configurar backups, segmentar a rede, melhorar a recolha de logs, configurar alertas | Apos um comprometimento via password unica, e implementado MFA em todos os acessos remotos |
| **3. Melhorar a monitorizacao** | Avaliar se a detecao foi eficaz e melhorar a visibilidade | Rever regras do SIEM, adicionar fontes de logs, melhorar alertas, ajustar limiares, rever metodos de reporte | A organizacao percebe que nao tinha alertas para acessos fora de horario e configura-os |
| **4. Restaurar dados** | Repor dados a partir de fontes fiaveis, sem reintroduzir corrupcao | Restaurar backups validados, verificar integridade, confirmar que a fonte de restauro nao esta comprometida | Os dados sao restaurados do backup de quinta-feira (verificado como limpo), nao do de sexta (ja comprometido) |
| **5. Restaurar servicos e processos** | Repor nao so a tecnologia mas tambem os processos operacionais | Reativar servicos, processar filas pendentes, reconciliar dados, reativar contas de utilizadores, retomar processos manuais interrompidos | Alem de restaurar o sistema de faturacao, e necessario processar as 200 faturas que ficaram em fila durante a indisponibilidade |
| **6. Monitorizacao pos-restauro** | Vigiar os sistemas restaurados para detetar persistencia, recorrencia ou instabilidade | Monitorizacao intensiva nas primeiras horas/dias, vigilancia de indicadores de compromisso (IoC), verificacao de que as correcoes sao eficazes | Durante 72 horas apos o restauro, a equipa monitoriza ativamente os logs do servidor para sinais de reinfecao |
| **7. Restaurar confianca e rever** | Reconstruir a confianca dos stakeholders e aprender com o incidente | Comunicacao transparente, revisao pos-acao (after-action review), atualizacao de planos e procedimentos | A organizacao comunica aos clientes o que aconteceu, que medidas foram tomadas, e o que mudou para evitar recorrencia |

```
  ╔═════════════════════════════════════════════════════════════╗
  ║            AS 7 CAMADAS DA RECUPERACAO MADURA               ║
  ╠═════════════════════════════════════════════════════════════╣
  ║                                                             ║
  ║  7. Restaurar confianca + revisao pos-acao         ▲        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  6. Monitorizacao pos-restauro                     │        ║
  ║  ──────────────────────────────────────────      Maturidade  ║
  ║  5. Restaurar servicos E processos                 │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  4. Restaurar dados (com criterio)                 │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  3. Melhorar monitorizacao                         │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  2. Corrigir salvaguardas ausentes/falhadas        │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  1. Corrigir vulnerabilidades (causa raiz)         │        ║
  ║                                                             ║
  ╚═════════════════════════════════════════════════════════════╝
```

---

### Corrigir causas, nao restaurar fraquezas

> Voltar ao estado anterior sem melhorias e uma recuperacao fraca. E como reparar a porta sem mudar a fechadura que o ladrao abriu.

Uma recuperacao madura nao se limita a repor o estado anterior. Se o incidente explorou uma vulnerabilidade, e essa vulnerabilidade nao for corrigida, a organizacao esta a preparar-se para o proximo incidente.

```
  ╔════════════════════════╦════════════════════════════════╗
  ║  RECUPERACAO FRACA     ║  RECUPERACAO MADURA            ║
  ╠════════════════════════╬════════════════════════════════╣
  ║ Restaurar o backup     ║ Restaurar o backup             ║
  ║ e ligar o sistema      ║ + corrigir a vulnerabilidade   ║
  ║                        ║ + implementar MFA              ║
  ║ Resultado:             ║ + melhorar a monitorizacao     ║
  ║ Mesma fraqueza,        ║ + documentar e rever           ║
  ║ proximo incidente      ║                                ║
  ║ a caminho              ║ Resultado:                     ║
  ║                        ║ Organizacao mais resistente    ║
  ╚════════════════════════╩════════════════════════════════╝
```

---

### Monitorizacao pos-restauro

Apos restaurar os sistemas, a vigilancia nao termina. Pelo contrario, as primeiras horas e dias apos o restauro sao criticos:

- O atacante pode ter deixado **mecanismos de persistencia** (backdoors, contas ocultas, tarefas agendadas)
- O incidente pode **recorrer** se a causa raiz nao foi totalmente eliminada
- E necessario **confirmar estabilidade** dos sistemas restaurados
- As **medidas corretivas** implementadas precisam de ser verificadas na pratica

A monitorizacao pos-restauro deve ser **mais intensiva** do que a monitorizacao habitual, pelo menos durante um periodo definido (tipicamente 48 a 72 horas, podendo ser mais em incidentes graves).

---

### Revisao pos-acao (after-action review)

A revisao pos-acao e o momento formal em que a organizacao olha para o incidente de forma critica e construtiva:

| Pergunta | Objetivo |
|----------|----------|
| O que **correu bem** na resposta? | Identificar praticas a manter e reforcar |
| O que **correu mal** ou foi dificil? | Identificar falhas, bloqueios e ineficiencias |
| O que **faltou** (ferramentas, informacao, competencias, procedimentos)? | Identificar lacunas a preencher |
| O que **mudar** no plano, nas equipas, nos controlos, na comunicacao? | Definir acoes concretas de melhoria |
| O que **aprendemos** sobre a ameaca, os atacantes, os nossos sistemas? | Incorporar conhecimento na postura de seguranca |

A revisao pos-acao nao e para atribuir culpas. E para **aprender e melhorar**. Uma organizacao que nao faz revisao pos-acao esta condenada a repetir os mesmos erros.

---

## 4. Resposta automatizada

### Automacao moderna na resposta

A automacao na resposta a incidentes permite executar **acoes predefinidas de forma rapida e consistente** quando determinadas condicoes sao detetadas. Nao e magia; e a execucao sistematica de regras definidas antecipadamente.

| Mecanismo | O que faz | Exemplo | Limitacao |
|-----------|----------|---------|-----------|
| **EDR/XDR** | Isola endpoints comprometidos automaticamente | EDR deteta ransomware e isola o posto da rede em segundos | Pode isolar postos legitimos por falsos positivos; nao resolve a causa raiz |
| **Firewall automatica** | Cria regras de bloqueio baseadas em indicadores de compromisso | IP malicioso detetado pelo SIEM e bloqueado automaticamente na firewall | Atacantes mudam de IP; regras excessivas podem bloquear trafego legitimo |
| **SIEM/SOAR** | Executa playbooks automaticos em resposta a alertas | Alerta de forca bruta aciona playbook que bloqueia a conta e notifica a equipa | Depende da qualidade das regras e dos playbooks; pode gerar fadiga de alertas |
| **Bloqueio automatico de contas/sessoes** | Suspende contas ou sessoes apos detetar comportamento anomalo | Conta bloqueada apos 5 tentativas falhadas em 2 minutos | Pode bloquear utilizadores legitimos; atacantes podem explorar isto para denial of service |
| **Quarentena de email** | Isola emails suspeitos antes de chegarem ao destinatario | Email com anexo malicioso e movido para quarentena automaticamente | Pode reter emails legitimos; exige revisao humana dos falsos positivos |

---

### Honeypots e honeynets

**Honeypots** sao sistemas-engodo, propositadamente colocados na rede para atrair atividade maliciosa. Nao servem utilizadores reais - qualquer interacao com eles e, por definicao, suspeita.

**Honeynets** sao redes de honeypots interligados, simulando um ambiente mais realista.

```
  ┌───────────────────────────────────────────────────────────┐
  │                  REDE DA ORGANIZACAO                       │
  │                                                            │
  │   ┌──────────┐  ┌──────────┐  ┌──────────┐               │
  │   │ Servidor │  │ Servidor │  │ Servidor │  Sistemas      │
  │   │ Web      │  │ Email    │  │ BD       │  reais         │
  │   └──────────┘  └──────────┘  └──────────┘               │
  │                                                            │
  │   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
  │                                                            │
  │   ┌──────────┐  ┌──────────┐                              │
  │   │ Honeypot │  │ Honeypot │  Sistemas-engodo             │
  │   │ "BD RH"  │  │ "Admin"  │  (parecem reais,             │
  │   └──────────┘  └──────────┘   nao servem ninguem)        │
  │                                                            │
  │   Qualquer acesso a estes sistemas = ALERTA               │
  │                                                            │
  └───────────────────────────────────────────────────────────┘
```

Os honeypots servem para:

- **Detetar** atividade maliciosa (qualquer interacao e suspeita)
- **Observar** o comportamento do atacante (que tecnicas usa, o que procura)
- **Gerar alertas** precoces de intrusao
- **Recolher inteligencia** sobre ameacas
- **Desviar** o atacante dos sistemas reais (em alguns cenarios)

Um honeypot precisa de **design cuidadoso, isolamento adequado, monitorizacao constante e objetivos claros**. Um honeypot mal configurado pode tornar-se numa porta de entrada para a rede real.

**Enticement vs entrapment (conceito simplificado):** Ha uma distincao entre criar um alvo-engodo que atrai quem ja tem intencao maliciosa (**enticement** - atrair/seduzir) e induzir alguem a cometer um crime que nao cometeria de outra forma (**entrapment** - armadilha). O enquadramento legal varia de pais para pais, mas o principio geral e que o honeypot deve ser um alvo passivo, nao uma provocacao ativa.

---

### Automacao nao substitui o IRP

A automacao e uma ferramenta poderosa, mas tem limites claros:

```
  ╔════════════════════════════════════════════════════════════════╗
  ║                 O QUE A AUTOMACAO FAZ BEM                     ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  • Acelerar acoes repetitivas e predefinidas                  ║
  ║  • Escalar alertas rapidamente para a equipa certa            ║
  ║  • Reduzir o tempo de resposta inicial                        ║
  ║  • Padronizar acoes para cenarios conhecidos                  ║
  ║  • Executar 24/7 sem fadiga                                   ║
  ╠════════════════════════════════════════════════════════════════╣
  ║                 O QUE A AUTOMACAO NAO SUBSTITUI               ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  • Decisao contextual (cada incidente tem particularidades)   ║
  ║  • Coordenacao entre equipas e stakeholders                   ║
  ║  • Gestao do impacto operacional e de negocio                 ║
  ║  • Comunicacao com clientes, reguladores, imprensa            ║
  ║  • Recuperacao complexa (restaurar processos, nao so sistemas)║
  ║  • Julgamento etico e legal                                   ║
  ║  • Revisao pos-acao e melhoria continua                       ║
  ╚════════════════════════════════════════════════════════════════╝
```

> A automacao e o copiloto, nao o piloto. Ajuda a reagir mais rapido, mas nao substitui quem decide, coordena e aprende.

---

## 5. Exemplos praticos

### Exemplo 1 - Universidade (Recuperacao pos-phishing)

**Cenario:** Uma universidade sofreu um ataque de phishing que comprometeu credenciais de 15 docentes. O atacante usou essas credenciais para aceder a plataforma de gestao academica durante 3 dias antes de ser detetado. A contencao ja foi feita (passwords resetadas, sessoes invalidadas).

| Fase da recuperacao | Acao concreta |
|--------------------|--------------|
| **Avaliacao de danos** | Analisar logs de acesso a plataforma: que dados foram consultados? Houve alteracao de notas? Foram exportados dados pessoais de alunos? |
| **Decisao forense** | Baixa necessidade forense: nao ha indicios de crime sofisticado, mas e necessario documentar para eventual notificacao a CNPD |
| **Corrigir vulnerabilidades** | Implementar MFA obrigatorio para todos os acessos a plataforma academica |
| **Corrigir salvaguardas** | Rever as regras de filtragem de email, implementar formacao anti-phishing obrigatoria |
| **Melhorar monitorizacao** | Configurar alertas para acessos anomalos (fora de horario, volume invulgar de consultas) |
| **Restaurar confianca** | Comunicar aos docentes afetados o que aconteceu e que medidas foram tomadas |
| **Revisao pos-acao** | Rever: porque e que 15 docentes cairam no phishing? A formacao e suficiente? O email devia ter sido detetado? |

**Como interpretar:**

*Este caso mostra que a recuperacao pos-phishing vai muito alem de resetar passwords. E necessario avaliar se houve acesso a dados sensiveis, corrigir a causa raiz (ausencia de MFA, formacao insuficiente), e comunicar de forma transparente. A avaliacao de danos e crucial para saber se ha obrigacao de notificacao ao regulador.*

**Para refletir:**

- Se o atacante tivesse alterado notas de alunos, como mudaria a avaliacao de danos?
- Que dados pessoais de alunos podem estar acessiveis atraves da plataforma academica?
- Como decidir se ha obrigacao de notificar a CNPD neste caso?

---

### Exemplo 2 - Hospital (Recuperacao pos-malware)

**Cenario:** Um hospital detetou malware num servidor de gestao de exames clinicos. O malware esteve ativo durante 5 dias antes da detecao. O servidor armazena resultados de exames de milhares de pacientes. A contencao isolou o servidor.

| Fase da recuperacao | Acao concreta |
|--------------------|--------------|
| **Avaliacao de danos** | Que exames foram acedidos? Houve alteracao de resultados (integridade)? Houve exfiltracao de dados (confidencialidade)? Que pacientes sao afetados? |
| **Decisao forense** | Alta necessidade forense: dados de saude sao regulados, pode haver obrigacao legal de demonstrar o que aconteceu; regulador pode exigir relatorio detalhado |
| **Preservar provas** | Antes de restaurar, criar imagem forense do servidor, preservar logs, documentar o estado do sistema |
| **Restaurar dados** | Restaurar a partir do backup de antes da infecao, validar integridade dos resultados de exames restaurados |
| **Restaurar servicos e processos** | Reativar o servidor, processar exames pendentes (5 dias de acumulacao), notificar medicos de que resultados anteriores devem ser revalidados |
| **Monitorizacao pos-restauro** | Monitorizacao intensiva durante 7 dias, com particular atencao a indicadores de compromisso conhecidos do malware identificado |
| **Revisao pos-acao** | Como entrou o malware? O antivirus/EDR detetou? Porque demorou 5 dias a ser identificado? Que visibilidade faltava? |

**Como interpretar:**

*Num hospital, a integridade dos dados clinicos e critica: um resultado de exame alterado pode levar a decisoes clinicas erradas. A recuperacao exige nao so restaurar o sistema, mas validar que os dados restaurados sao fiaveis. A necessidade forense e alta pela regulamentacao aplicavel a dados de saude.*

**Para refletir:**

- Se um resultado de exame tivesse sido alterado silenciosamente, como seria possivel detetar isso?
- Porque e que a necessidade forense e particularmente alta em contextos de saude?
- Que impacto tem nos pacientes a indisponibilidade de 5 dias do sistema de exames?

---

### Exemplo 3 - E-commerce (Recuperacao pos-ataque)

**Cenario:** Uma plataforma de e-commerce sofreu um ataque que explorou uma vulnerabilidade no sistema de checkout. O atacante pode ter acedido a dados de clientes (nomes, moradas, emails). O site esteve em baixo durante 8 horas.

| Fase da recuperacao | Acao concreta |
|--------------------|--------------|
| **Avaliacao de danos** | Que dados de clientes foram expostos? Dados de pagamento foram afetados? Quantas encomendas foram perdidas durante as 8 horas? Que impacto financeiro? |
| **Decisao forense** | Media-alta: necessario para determinar exatamente que dados foram acedidos e para cumprir obrigacoes de notificacao |
| **Corrigir vulnerabilidades** | Corrigir a vulnerabilidade no sistema de checkout, rever o codigo para vulnerabilidades similares |
| **Restaurar servicos** | Restaurar o site com a vulnerabilidade corrigida, processar encomendas pendentes, reativar meios de pagamento |
| **Melhorar detecao** | Implementar WAF (Web Application Firewall), melhorar monitorizacao de acessos a base de dados de clientes |
| **Restaurar confianca** | Notificar clientes afetados, comunicar medidas tomadas, oferecer monitorizacao de credenciais se aplicavel |
| **Revisao pos-acao** | A vulnerabilidade devia ter sido identificada em testes? O WAF teria prevenido? A detecao foi rapida o suficiente? Como melhorar o processo de desenvolvimento seguro? |

**Como interpretar:**

*Neste caso, a avaliacao de danos tem uma componente financeira direta (8 horas de vendas perdidas) e uma componente reputacional (confianca dos clientes). A recuperacao nao se limita a repor o site online - e necessario processar o backlog de encomendas, comunicar com clientes e implementar melhorias para que nao volte a acontecer.*

**Para refletir:**

- Se dados de pagamento tivessem sido expostos, como mudaria a gravidade e as obrigacoes da organizacao?
- Qual o custo total do incidente (perdas diretas + custo de resposta + impacto reputacional)?
- Que testes de seguranca poderiam ter identificado a vulnerabilidade antes do ataque?

---

### Exemplo 4 - Industria (Recuperacao pos-comprometimento)

**Cenario:** Uma fabrica detetou que um atacante comprometeu a rede corporativa e pode ter acedido a rede de producao (OT). Ha suspeita de sabotagem intencional, pois foram encontradas alteracoes em parametros de configuracao de equipamentos industriais.

| Fase da recuperacao | Acao concreta |
|--------------------|--------------|
| **Avaliacao de danos** | Que equipamentos industriais foram afetados? Que parametros foram alterados? A producao esteve comprometida? Ha risco de seguranca fisica (maquinas com parametros alterados)? |
| **Decisao forense** | Alta: suspeita de sabotagem implica necessidade de provas para eventual acao legal; regulador industrial pode exigir relatorio |
| **Preservar provas** | Imagens forenses dos sistemas comprometidos, preservacao de logs de rede e de sistemas SCADA, documentacao detalhada das alteracoes encontradas |
| **Corrigir vulnerabilidades** | Implementar segmentacao rigorosa entre rede corporativa e rede OT, corrigir acessos entre redes |
| **Restaurar com segmentacao** | Restaurar configuracoes industriais a partir de golden images verificadas, validar todos os parametros antes de retomar producao |
| **Monitorizacao continua** | Implementar monitorizacao dedicada na rede OT, instalar sensores de detecao de anomalias no trafego industrial |
| **Revisao pos-acao** | Como foi possivel saltar da rede corporativa para a OT? A segmentacao existente era suficiente? Que visibilidade temos sobre a rede de producao? |

**Como interpretar:**

*Em ambientes industriais, um comprometimento pode ter consequencias de seguranca fisica. Parametros alterados em equipamentos industriais podem causar danos materiais ou colocar pessoas em risco. A recuperacao exige validacao rigorosa de todas as configuracoes antes de retomar a producao, e a pericia informatica e essencial quando ha suspeita de sabotagem.*

**Para refletir:**

- Que consequencias fisicas pode ter a alteracao de parametros de equipamentos industriais?
- Porque e que a segmentacao entre rede corporativa e rede OT e tao critica?
- Como validar que os parametros industriais restaurados estao corretos e seguros?
- Se se confirmar a sabotagem, que passos legais devem ser tomados?

---

## 6. Exercicios

### Nivel 1 - Compreensao

#### Exercicio 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmacoes como Verdadeiras (V) ou Falsas (F):

| # | Afirmacao |
|---|-----------|
| a) | A avaliacao de danos so deve comecar quando se tem toda a informacao disponivel. |
| b) | A pericia informatica e obrigatoria em todos os incidentes de seguranca. |
| c) | A cadeia de custodia documenta quem recolheu a prova, quando e como. |
| d) | Recuperar um sistema a partir de backup e suficiente para uma recuperacao madura. |
| e) | A monitorizacao pos-restauro serve para detetar persistencia e recorrencia do incidente. |
| f) | Os honeypots sao sistemas reais que servem utilizadores normais. |
| g) | A automacao na resposta a incidentes substitui a necessidade de um IRP. |
| h) | Restaurar o estado anterior sem corrigir a vulnerabilidade explorada e uma recuperacao fraca. |
| i) | A avaliacao de danos e identica a pericia informatica. |
| j) | A revisao pos-acao serve para atribuir culpas pela falha de seguranca. |

??? success "Solucao 1.1"

    | # | Resposta | Justificacao |
    |---|:--------:|-------------|
    | a) | **F** | A avaliacao deve comecar o mais cedo possivel com a melhor informacao disponivel. Esperar por informacao completa atrasa a recuperacao. |
    | b) | **F** | A pericia informatica nao e necessaria em todos os incidentes. Ganha importancia quando ha suspeita de crime, obrigacoes regulatorias, litigio ou necessidade de prova formal. |
    | c) | **V** | A cadeia de custodia e o registo documentado de quem recolheu a prova, quando, como e por onde passou. |
    | d) | **F** | Uma recuperacao madura tem 7 camadas, incluindo corrigir vulnerabilidades, melhorar salvaguardas, monitorizacao pos-restauro e revisao pos-acao. Restaurar o backup e apenas uma das camadas. |
    | e) | **V** | A monitorizacao pos-restauro visa detetar mecanismos de persistencia deixados pelo atacante, recorrencia do incidente, e confirmar a estabilidade dos sistemas. |
    | f) | **F** | Os honeypots sao sistemas-engodo que nao servem utilizadores reais. Qualquer interacao com eles e, por definicao, suspeita. |
    | g) | **F** | A automacao ajuda a acelerar, escalar e padronizar acoes, mas nao substitui decisao contextual, coordenacao, gestao de impacto, comunicacao e recuperacao complexa. |
    | h) | **V** | Voltar ao estado anterior sem corrigir a causa raiz e preparar o proximo incidente. A recuperacao madura exige correcao das vulnerabilidades exploradas. |
    | i) | **F** | A avaliacao de danos pergunta "o que foi afetado e qual o impacto"; a pericia pergunta "que provas existem e como preserva-las". Sao processos distintos, embora complementares. |
    | j) | **F** | A revisao pos-acao nao e para atribuir culpas. E para aprender e melhorar: o que correu bem, o que correu mal, o que faltou, o que mudar. |

---

#### Exercicio 1.2 - Associar camadas de recuperacao

Associa cada acao a camada de recuperacao correspondente.

**Camadas:** 1-Corrigir vulnerabilidades | 2-Corrigir salvaguardas | 3-Melhorar monitorizacao | 4-Restaurar dados | 5-Restaurar servicos e processos | 6-Monitorizacao pos-restauro | 7-Restaurar confianca e rever

| # | Acao |
|---|------|
| a) | Processar as 150 encomendas que ficaram pendentes durante a indisponibilidade |
| b) | Aplicar o patch de seguranca que corrige a vulnerabilidade explorada |
| c) | Comunicar aos clientes o que aconteceu e que medidas foram tomadas |
| d) | Verificar durante 72 horas se ha sinais de reinfecao |
| e) | Restaurar a base de dados a partir do backup de quarta-feira |
| f) | Implementar MFA em todos os acessos remotos |
| g) | Adicionar alertas no SIEM para acessos fora de horario |
| h) | Realizar sessao de licoes aprendidas com toda a equipa de resposta |

??? success "Solucao 1.2"

    | # | Acao | Camada |
    |---|------|--------|
    | a) | Processar encomendas pendentes | **5 - Restaurar servicos e processos** - nao basta repor a tecnologia, e preciso tratar o backlog operacional |
    | b) | Aplicar o patch de seguranca | **1 - Corrigir vulnerabilidades** - eliminar a causa raiz que permitiu o incidente |
    | c) | Comunicar aos clientes | **7 - Restaurar confianca e rever** - transparencia com stakeholders |
    | d) | Verificar sinais de reinfecao durante 72h | **6 - Monitorizacao pos-restauro** - vigiar persistencia e recorrencia |
    | e) | Restaurar a base de dados do backup | **4 - Restaurar dados** - repor dados de fonte fiavel |
    | f) | Implementar MFA | **2 - Corrigir salvaguardas** - reforcar controlos que falharam ou estavam ausentes |
    | g) | Adicionar alertas para acessos fora de horario | **3 - Melhorar monitorizacao** - aumentar a visibilidade |
    | h) | Sessao de licoes aprendidas | **7 - Restaurar confianca e rever** - aprender com o incidente |

---

### Nivel 2 - Aplicacao pratica

#### Exercicio 2.1 - Avaliacao de danos pos-incidente

**Cenario:** Uma empresa de consultoria detetou que um atacante acedeu ao servidor de ficheiros durante 48 horas atraves de uma conta de administrador comprometida. A conta tinha acesso a pastas com contratos de clientes, propostas comerciais e dados financeiros internos.

Realiza a avaliacao de danos respondendo:

1. Que dimensoes da CIA foram potencialmente afetadas? Justifica.
2. Que fontes de evidencia usarias para delimitar o alcance?
3. Que perguntas adicionais farias para refinar a avaliacao?

??? success "Solucao 2.1"

    **1. Dimensoes da CIA afetadas:**

    | Dimensao | Afetada? | Justificacao |
    |----------|:--------:|-------------|
    | **Confidencialidade** | **Sim** | O atacante pode ter lido/copiado contratos, propostas e dados financeiros. Acesso de 48 horas e tempo suficiente para exfiltrar grandes volumes de dados. |
    | **Integridade** | **Possivelmente** | O atacante pode ter alterado ficheiros (ex: inserir backdoors em documentos, modificar dados financeiros). E necessario verificar. |
    | **Disponibilidade** | **Potencialmente** | Embora os servicos nao tenham ficado em baixo, o atacante pode ter eliminado ou cifrado ficheiros. E necessario verificar. |

    **2. Fontes de evidencia:**

    - **Logs de acesso ao servidor de ficheiros**: que pastas e ficheiros foram acedidos, quando, e com que operacoes (leitura, escrita, eliminacao)
    - **Logs de autenticacao**: quando e de onde a conta comprometida fez login
    - **Logs de rede**: volume de trafego de saida (possivel exfiltracao), destinos das ligacoes
    - **Logs do EDR/antivirus**: se houve execucao de ferramentas suspeitas
    - **Documentacao de configuracao**: que permissoes tinha a conta comprometida
    - **Entrevista com o titular da conta**: como foi comprometida, que atividade recente teve

    **3. Perguntas adicionais:**

    - Que ficheiros especificos foram acedidos (nao apenas as pastas)?
    - Houve copia massiva de ficheiros (indicador de exfiltracao)?
    - Existem clientes com clausulas de notificacao obrigatoria em caso de exposicao de dados?
    - A conta comprometida tinha acesso a outros sistemas alem do servidor de ficheiros?
    - Ha evidencia de movimento lateral (o atacante tentou aceder a outros sistemas)?

---

#### Exercicio 2.2 - Quando e necessaria pericia informatica?

Para cada cenario, decide se a pericia informatica e necessaria e justifica a tua decisao.

| # | Cenario |
|---|---------|
| a) | Um colaborador clicou num link de phishing, mas a equipa de TI resetou a password em 10 minutos e nao ha indicios de acesso a sistemas. |
| b) | A organizacao suspeita que um ex-colaborador copiou uma base de dados de clientes antes de sair. |
| c) | Um servidor web foi comprometido e o atacante pode ter acedido a dados pessoais de 50.000 utilizadores. |
| d) | Uma falha de energia causou a corrupcao de uma base de dados, sem indicios de acao maliciosa. |
| e) | Um ataque de ransomware cifrou 40% dos ficheiros da organizacao e o atacante exige pagamento. |

??? success "Solucao 2.2"

    | # | Forense? | Justificacao |
    |---|:--------:|-------------|
    | a) | **Nao** (mas documentar) | Incidente contido rapidamente, sem indicios de acesso efetivo. Documentar o ocorrido e suficiente. Se surgirem indicios posteriores de acesso, reavaliar. |
    | b) | **Sim** | Suspeita de crime (roubo de dados), possivel litigio, necessidade de prova formal de que a copia foi feita e do que foi copiado. |
    | c) | **Sim** | Obrigacao regulatoria (RGPD exige saber que dados foram afetados), possivel notificacao a CNPD, necessidade de demonstrar o alcance real do comprometimento. |
    | d) | **Nao** | Sem indicios de acao maliciosa. Investigacao tecnica normal para perceber a causa da corrupcao e restaurar dados e suficiente. |
    | e) | **Sim** | Possivel crime informatico (extorsao), necessidade de preservar provas para as autoridades, possivel obrigacao regulatoria, necessidade de perceber o vetor de entrada para corrigir. |

---

#### Exercicio 2.3 - Desenhar plano de recuperacao

**Cenario:** Uma clinica dentaria sofreu um ataque de ransomware que cifrou o servidor de agendamentos e o servidor de registos clinicos. Os backups existem mas nao eram testados ha 4 meses. A equipa de TI (2 pessoas) conseguiu conter o ataque isolando os servidores.

Desenha um plano de recuperacao que cubra as 7 camadas. Para cada camada, indica pelo menos uma acao concreta.

??? success "Solucao 2.3"

    | Camada | Acao concreta |
    |--------|--------------|
    | **1. Corrigir vulnerabilidades** | Identificar como o ransomware entrou (vetor: email? RDP exposto? vulnerabilidade?). Corrigir: fechar RDP exposto, aplicar patches, corrigir configuracao que permitiu a entrada. |
    | **2. Corrigir salvaguardas** | Implementar EDR nos servidores, configurar backups automaticos com verificacao diaria, implementar segmentacao entre rede administrativa e rede clinica, ativar MFA no acesso remoto. |
    | **3. Melhorar monitorizacao** | Configurar alertas para cifragem massiva de ficheiros (indicador de ransomware), acessos fora de horario, tentativas de desativacao do antivirus. |
    | **4. Restaurar dados** | Testar os backups (ha 4 meses que nao eram testados - podem estar incompletos). Restaurar com validacao: verificar integridade dos registos clinicos, confirmar que as agendas estao corretas. Se os backups falharem, avaliar alternativas (reconstrucao manual, contacto com pacientes). |
    | **5. Restaurar servicos e processos** | Reativar o sistema de agendamento, remarcar consultas perdidas durante a indisponibilidade, notificar pacientes afetados, processar registos clinicos que ficaram pendentes. |
    | **6. Monitorizacao pos-restauro** | Monitorizacao intensiva durante pelo menos 1 semana. Verificar se o ransomware deixou mecanismos de persistencia. Vigiar tentativas de re-execucao. |
    | **7. Restaurar confianca e rever** | Comunicar aos pacientes se os seus dados foram comprometidos. Rever internamente: porque nao se testavam os backups? Que formacao falta a equipa? Atualizar procedimentos. |

    **Nota critica:** Os backups nao testados sao um risco real. Pode dar-se o caso de que, ao tentar restaurar, se descubra que os backups estao incompletos ou corrompidos. O plano deve prever esta possibilidade.

---

### Nivel 3 - Analise

#### Exercicio 3.1 - Cenario completo pos-incidente

**Cenario:** Es o responsavel de seguranca de uma empresa de logistica com 500 colaboradores. Na quarta-feira, as 14h, o SIEM detetou trafego anomalo de saida num servidor de base de dados que contem informacao de rotas, clientes e contratos. A investigacao revelou:

- Um atacante explorou uma vulnerabilidade conhecida (com patch disponivel ha 2 meses) no servidor web
- A partir do servidor web, moveu-se lateralmente para o servidor de base de dados
- Esteve ativo na rede durante aproximadamente 10 dias antes da detecao
- Ha indicios de exfiltracao de dados (grande volume de trafego de saida para IPs desconhecidos)
- Os logs do servidor web dos primeiros 5 dias foram apagados pelo atacante

Desenvolve um plano completo que inclua:

1. Avaliacao de danos detalhada
2. Decisao fundamentada sobre pericia informatica
3. Plano de recuperacao com as 7 camadas
4. Estrutura para a revisao pos-acao

??? success "Solucao 3.1"

    **1. Avaliacao de danos:**

    | Dimensao | Avaliacao | Detalhes |
    |----------|----------|---------|
    | **Confidencialidade** | **Comprometida** | Indicios de exfiltracao de dados de clientes, rotas e contratos. 10 dias de acesso nao detetado sao suficientes para copiar toda a base de dados. |
    | **Integridade** | **Potencialmente comprometida** | O atacante pode ter alterado dados na base de dados. Logs apagados indicam intencao de esconder atividade. E necessario verificar integridade dos dados. |
    | **Disponibilidade** | **Parcialmente afetada** | Embora os servicos nao tenham ficado em baixo, a necessidade de isolar servidores para investigacao afeta a disponibilidade. |

    **Fontes a usar:** Logs do SIEM, logs de rede (trafego de saida), logs da base de dados (que queries foram executadas), logs do EDR (se existir), logs de firewall, entrevistas com a equipa de TI.

    **Nota critica:** Os logs do servidor web dos primeiros 5 dias foram apagados. Isto limita a capacidade de avaliar o que aconteceu inicialmente e reorca a necessidade de pericia informatica.

    **2. Decisao forense:**

    **Sim, e necessaria pericia informatica.** Justificacao:
    - Ha indicios de exfiltracao de dados de clientes (possivel crime informatico)
    - Obrigacao regulatoria: dados pessoais de clientes podem implicar notificacao a CNPD
    - Possivel litigio com clientes cujos dados foram expostos
    - Os logs apagados indicam sofisticacao e intencao de esconder rastos - e necessario recuperar o que for possivel
    - Contratos expostos podem ter implicacoes comerciais e legais

    **Acoes forenses prioritarias:**
    - Criar imagens forenses dos servidores web e de base de dados antes de qualquer restauro
    - Preservar todos os logs de rede, SIEM, firewall, EDR
    - Documentar cadeia de custodia
    - Considerar apoio de especialistas forenses externos

    **3. Plano de recuperacao (7 camadas):**

    | Camada | Acoes |
    |--------|-------|
    | **1. Corrigir vulnerabilidades** | Aplicar o patch que estava disponivel ha 2 meses no servidor web. Fazer scan de vulnerabilidades a todos os servidores expostos. Corrigir todas as vulnerabilidades criticas encontradas. |
    | **2. Corrigir salvaguardas** | Implementar politica de patch management com SLA (patches criticos em 48h). Segmentar a rede (servidor web nao deve ter acesso direto a base de dados). Implementar EDR em todos os servidores. Rever politica de retencao de logs (proteger contra apagamento). |
    | **3. Melhorar monitorizacao** | Rever porque o SIEM so detetou apos 10 dias. Adicionar regras para detetar movimento lateral. Configurar alertas para grandes volumes de trafego de saida. Implementar monitorizacao de integridade de logs. |
    | **4. Restaurar dados** | Identificar backup anterior ao comprometimento (pelo menos 10 dias antes). Validar integridade do backup. Restaurar com verificacao de que nao contem artefactos do atacante. |
    | **5. Restaurar servicos e processos** | Reativar servicos com vulnerabilidade corrigida. Reconciliar dados (10 dias de operacao podem ter gerado dados legitimos que nao estao no backup antigo). Revalidar contratos e dados de clientes. |
    | **6. Monitorizacao pos-restauro** | Monitorizacao intensiva durante pelo menos 2 semanas (dada a sofisticacao do ataque). Vigiar IoCs conhecidos. Verificar se o atacante criou contas ou mecanismos de persistencia. |
    | **7. Restaurar confianca e rever** | Notificar clientes afetados. Notificar CNPD se dados pessoais foram expostos. Comunicar internamente. Revisao pos-acao completa. |

    **4. Estrutura para revisao pos-acao:**

    | Pergunta | Foco |
    |----------|------|
    | Porque e que o patch nao foi aplicado durante 2 meses? | Processo de gestao de patches |
    | Porque e que o movimento lateral nao foi detetado? | Segmentacao de rede e monitorizacao |
    | Porque e que o SIEM so detetou apos 10 dias? | Regras de detecao e visibilidade |
    | Os logs podiam ter sido protegidos contra apagamento? | Protecao e retencao de logs |
    | A equipa tinha competencias e ferramentas para esta resposta? | Capacidade da equipa |
    | O plano de resposta a incidentes foi seguido? Foi util? | Qualidade do IRP |
    | Que informacao faltou durante a resposta? | Lacunas de visibilidade |
    | Que comunicacao foi feita e foi adequada? | Processo de comunicacao |

---

#### Exercicio 3.2 - Automacao vs decisao humana

Para cada situacao, indica se a resposta deve ser **automatizada**, **humana**, ou **hibrida** (automacao inicial + decisao humana). Justifica.

| # | Situacao |
|---|---------|
| a) | Endpoint deteta processo a cifrar ficheiros em massa |
| b) | Cliente reporta que os seus dados pessoais apareceram num forum online |
| c) | SIEM deteta 50 tentativas falhadas de login numa conta de servico |
| d) | Descoberta de que um fornecedor critico foi comprometido e pode afetar a organizacao |
| e) | Email com anexo malicioso detetado a caminho de 200 colaboradores |
| f) | Decisao sobre se deve notificar a CNPD apos uma violacao de dados |

??? success "Solucao 3.2"

    | # | Tipo | Justificacao |
    |---|------|-------------|
    | a) | **Automatizada** | Cifragem em massa e indicador forte de ransomware. O EDR deve isolar o endpoint imediatamente - cada segundo conta. A decisao humana vem depois (investigar, avaliar alcance). |
    | b) | **Humana** | Requer investigacao (confirmar se e verdade, avaliar que dados, determinar origem), avaliacao de impacto, decisao sobre comunicacao e obrigacoes legais. Nao e automatizavel. |
    | c) | **Hibrida** | A automacao deve bloquear a conta apos X tentativas (prevenir comprometimento). A equipa humana deve investigar: e ataque externo? Problema de configuracao? A conta esta comprometida? |
    | d) | **Humana** | Requer avaliacao contextual: que servicos dependemos desse fornecedor? Que dados partilhamos? Qual o risco real? Que acoes tomar? E uma decisao estrategica e de coordenacao. |
    | e) | **Automatizada** | A quarentena do email deve ser automatica para os 200 destinatarios. A analise humana vem depois (confirmar que e malicioso, verificar se alguem abriu antes da quarentena). |
    | f) | **Humana** | E uma decisao legal que requer avaliacao do impacto, dos dados afetados, das obrigacoes aplicaveis e das consequencias. Nao pode ser automatizada. |

---

## 7. Armadilhas e confusoes a evitar

### Confusao 1: Avaliacao de danos nao e o mesmo que pericia informatica

> A avaliacao de danos pergunta: "o que foi afetado e o que restaurar?" A pericia pergunta: "que provas existem e como preserva-las para uso formal?"

Sao processos distintos. A avaliacao de danos guia a recuperacao; a pericia garante que as provas sao fiaveis. Podem ocorrer em paralelo, mas tem objetivos diferentes.

### Confusao 2: Recuperar nao e apenas restaurar o backup

> Restaurar o backup e uma das camadas da recuperacao, nao a recuperacao completa.

Uma recuperacao madura inclui corrigir vulnerabilidades, reforcar salvaguardas, melhorar a monitorizacao, restaurar processos (nao so tecnologia), monitorizar pos-restauro e rever o que aconteceu.

### Confusao 3: "Determinacao imediata" nao significa certeza instantanea

> Comecar a avaliar cedo nao e o mesmo que ter todas as respostas imediatamente.

A avaliacao inicial baseia-se na melhor informacao disponivel. Sera refinada a medida que surgem novos dados. Esperar por certeza completa antes de agir atrasa a recuperacao.

### Confusao 4: A pericia informatica nao e necessaria em todos os incidentes

> Nao e preciso chamar a equipa forense para um reset de password pos-phishing sem indicios de acesso a dados.

A necessidade de pericia depende do tipo de incidente, das obrigacoes legais, da possibilidade de litigio e da necessidade de prova formal.

### Confusao 5: Restaurar rapidamente pode destruir provas

> A urgencia de "ligar tudo outra vez" pode apagar artefactos forenses essenciais.

Antes de restaurar, avaliar se ha necessidade de preservar provas. Uma imagem forense demora minutos a criar e pode ser critica meses mais tarde.

### Confusao 6: Automacao nao e magia

> A automacao executa acoes predefinidas em condicoes previstas. Nao pensa, nao avalia contexto, nao coordena.

A automacao e excelente para acoes rapidas e repetitivas (isolar um endpoint, bloquear um IP). Nao substitui decisao humana para situacoes complexas, ambiguas ou com impacto estrategico.

### Confusao 7: Honeypots nao sao "armadilhas legais"

> Um honeypot atrai quem ja tem intencao maliciosa. Nao deve induzir alguem a cometer um ato que nao cometeria de outra forma.

A distincao entre enticement (criar um alvo passivo) e entrapment (provocar ativamente) e importante. O enquadramento legal varia, mas o principio e claro: o honeypot deve ser passivo.

### Confusao 8: A revisao pos-acao nao e para culpar pessoas

> A revisao pos-acao existe para aprender e melhorar, nao para encontrar culpados.

Se a revisao se transformar num exercicio de atribuicao de culpa, as pessoas deixam de ser transparentes sobre o que correu mal. Isso impede a organizacao de aprender e melhorar verdadeiramente.

### Confusao 9: Voltar ao estado anterior nao e uma boa recuperacao

> Se o incidente explorou uma fraqueza, voltar ao mesmo estado e preparar o proximo incidente.

A recuperacao madura corrige as causas, reforeca as salvaguardas e melhora a postura de seguranca. Voltar ao estado anterior e o minimo, nao o objetivo.

### Confusao 10: Monitorizacao pos-restauro nao e opcional

> Os primeiros dias apos o restauro sao criticos. Nao vigiar e assumir que o problema esta resolvido sem confirmacao.

O atacante pode ter deixado mecanismos de persistencia. A causa raiz pode nao ter sido totalmente eliminada. As correcoes implementadas podem nao funcionar como esperado. Vigiar e essencial.

---

## 8. Resumo rapido

### Tabela de conceitos-chave

| Conceito | Descricao |
|----------|-----------|
| **Avaliacao de danos** | Processo de determinar o alcance, profundidade e consequencias de um incidente, atraves da lente CIA |
| **Determinacao imediata** | Comecar a delimitar o ambito do incidente com a melhor informacao disponivel, nao esperar por certeza completa |
| **Pericia informatica** | Recolha, analise e preservacao de provas digitais de forma cuidadosa e documentada |
| **Cadeia de custodia** | Registo de quem recolheu a prova, quando, como e por onde passou |
| **Recuperacao madura** | Recuperacao em 7 camadas: vulnerabilidades, salvaguardas, monitorizacao, dados, servicos, monitorizacao pos-restauro, revisao |
| **Revisao pos-acao** | Analise critica e construtiva do incidente para identificar melhorias |
| **Automacao (SOAR)** | Execucao automatica de acoes predefinidas em resposta a alertas |
| **Honeypot** | Sistema-engodo para atrair atividade maliciosa, detetar intrusoes e recolher inteligencia |
| **Honeynet** | Rede de honeypots interligados simulando um ambiente mais realista |
| **Enticement** | Atrair quem ja tem intencao maliciosa com um alvo passivo (geralmente legal) |
| **Entrapment** | Induzir alguem a cometer um crime que nao cometeria de outra forma (geralmente ilegal) |
| **Monitorizacao pos-restauro** | Vigilancia intensiva apos o restauro para detetar persistencia, recorrencia e validar correcoes |

### Frases-chave para recordar

- *"Recuperar sem avaliar e como reconstruir sem saber o que esta danificado."*
- *"A pericia informatica nao e obrigatoria em todos os incidentes, mas quando e necessaria, e insubstituivel."*
- *"Uma prova mal recolhida e uma prova perdida."*
- *"Restaurar o backup e uma camada da recuperacao, nao a recuperacao completa."*
- *"Voltar ao estado anterior sem corrigir a fraqueza e preparar o proximo incidente."*
- *"A automacao e o copiloto, nao o piloto."*
- *"A revisao pos-acao existe para aprender, nao para culpar."*
- *"Os primeiros dias apos o restauro sao os mais criticos para detetar persistencia."*
- *"Recuperar depressa demais pode destruir provas. Preservar provas em excesso pode atrasar a recuperacao. O equilibrio depende do contexto."*

### Diagrama de sintese

```
  ╔══════════════════════════════════════════════════════════════════════╗
  ║           CICLO COMPLETO: DA DETECAO AS LICOES APRENDIDAS          ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                     ║
  ║  ┌──────────┐   ┌──────────────┐   ┌───────────┐   ┌───────────┐  ║
  ║  │ Detecao  │──►│Classificacao │──►│ Contencao │──►│Erradicacao│  ║
  ║  └──────────┘   └──────────────┘   └───────────┘   └─────┬─────┘  ║
  ║       ▲                                                    │       ║
  ║       │                                                    ▼       ║
  ║       │         ┌──────────────────────────────────────────────┐   ║
  ║       │         │         RECUPERACAO DE INCIDENTES            │   ║
  ║       │         │                                              │   ║
  ║       │         │  ┌────────────────────────────────────────┐  │   ║
  ║       │         │  │ 1. Avaliacao de danos (lente CIA)      │  │   ║
  ║       │         │  │ 2. Pericia informatica (se necessaria) │  │   ║
  ║       │         │  │ 3. Corrigir vulnerabilidades           │  │   ║
  ║       │         │  │ 4. Corrigir salvaguardas               │  │   ║
  ║       │         │  │ 5. Melhorar monitorizacao              │  │   ║
  ║       │         │  │ 6. Restaurar dados                     │  │   ║
  ║       │         │  │ 7. Restaurar servicos e processos      │  │   ║
  ║       │         │  │ 8. Monitorizacao pos-restauro          │  │   ║
  ║       │         │  └────────────────────────────────────────┘  │   ║
  ║       │         └──────────────────────────────┬───────────────┘   ║
  ║       │                                        │                   ║
  ║       │                                        ▼                   ║
  ║       │         ┌──────────────────────────────────────────────┐   ║
  ║       │         │         LICOES APRENDIDAS                    │   ║
  ║       │         │                                              │   ║
  ║       │         │  • O que correu bem?                         │   ║
  ║       │         │  • O que correu mal?                         │   ║
  ║       │         │  • O que faltou?                             │   ║
  ║       │         │  • O que mudar?                              │   ║
  ║       │         └──────────────────────────────┬───────────────┘   ║
  ║       │                                        │                   ║
  ║       └────────────────────────────────────────┘                   ║
  ║                    Melhoria continua                                ║
  ║                                                                     ║
  ║  ┌──────────────────────────────────────────────────────────────┐   ║
  ║  │ AUTOMACAO (EDR, SOAR, Honeypots) apoia todas as fases,      │   ║
  ║  │ mas nao substitui decisao humana, coordenacao e revisao.    │   ║
  ║  └──────────────────────────────────────────────────────────────┘   ║
  ║                                                                     ║
  ╚══════════════════════════════════════════════════════════════════════╝
```

---

*Proximo capitulo: [Disaster Recovery Plan (DRP)](../drp/index.md)*
