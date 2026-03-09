# Recuperação de Incidentes

## Índice

1. [Avaliação de danos](#1-avaliacao-de-danos)
2. [Perícia informática](#2-pericia-informatica)
3. [Recuperação madura](#3-recuperacao-madura)
4. [Resposta automatizada](#4-resposta-automatizada)
5. [Exemplos práticos](#5-exemplos-praticos)
6. [Exercícios](#6-exercicios)
7. [Armadilhas e confusões a evitar](#7-armadilhas-e-confusoes-a-evitar)
8. [Resumo rápido](#8-resumo-rapido)

---

## 1. Avaliação de danos

Após a contenção de um incidente, a organização precisa de perceber **o que realmente aconteceu**. A avaliação de danos e o processo de determinar o alcance, a profundidade e as consequências do incidente antes de avancar para a recuperação.

> Recuperar sem avaliar e como reconstruir uma casa sem saber quais as paredes que ficaram danificadas.

A expressão "determinação imediata" não significa certeza instantânea. Significa **começar a delimitar o âmbito do incidente o mais cedo possível**, com a melhor informação disponível naquele momento. A avaliação inicial guia as primeiras decisões de recuperação; avaliações posteriores refinam essa compreensão a medida que surgem novos dados.

```
  ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
  │   Contenção   │────►│   Avaliação    │────►│  Recuperação   │
  │   concluída   │     │   de danos     │     │   informada    │
  └───────────────┘     └───────┬───────┘     └───────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
              Que sistemas  Que dados   Qual o
              foram        foram       alcance
              afetados?    expostos?   real?
```

A avaliação deve responder a perguntas essenciais:

- Que **sistemas** foram afetados?
- Que **dados** foram alterados, perdidos ou expostos?
- Que **ativos** ficaram comprometidos?
- Até onde chegou o incidente (qual o **perímetro** real)?
- O impacto foi **apenas técnico** ou também **operacional** (processos de negócio, serviços a clientes, obrigações legais)?

---

### O que procurar (a lente CIA)

O dano causado por um incidente não se resume a "sistema em baixo". Deve ser analisado através das três dimensoes da segurança da informação:

| Dimensão | Perguntas-chave | Exemplos de dano |
|----------|----------------|------------------|
| **Confidencialidade** | Houve acesso não autorizado? Dados foram expostos ou exfiltrados? Credenciais foram comprometidas? | Fuga de dados de clientes, exposição de credenciais, leitura de documentos confidenciais por terceiros |
| **Integridade** | Dados foram alterados sem autorização? Ha corrupção de ficheiros ou registos? Configuracoes foram adulteradas? | Registos clínicos alterados, configurações de firewall modificadas pelo atacante, logs apagados para encobrir rastos |
| **Disponibilidade** | Serviços ficaram indisponíveis? Durante quanto tempo? Que impacto operacional teve? | Site de e-commerce em baixo durante 6 horas, sistema de faturação inacessível, email corporativo bloqueado |

O dano pode manifestar-se de muitas formas que não são imediatamente óbvias:

- **Dados expostos** a terceiros não autorizados
- **Dados alterados** de forma silenciosa (sem alerta)
- **Contas comprometidas** que podem ser usadas futuramente
- **Configuracoes adulteradas** que enfraquecem a segurança
- **Logs apagados** que dificultam a investigação
- **Serviços degradados** (não totalmente em baixo, mas lentos ou instáveis)
- **Impacto em terceiros** (parceiros, clientes, fornecedores)
- **Perda de confiança** de stakeholders

---

### Fontes de evidência

A avaliação de danos não se baseia numa única fonte. Requer cruzar informação de múltiplas origens:

| Fonte | O que revela | Limitação |
|-------|-------------|-----------|
| **Logs de sistema** | Que eventos ocorreram, quando, por quem | Podem ter sido apagados ou manipulados pelo atacante |
| **Logs de deteção de intrusão (IDS/IPS)** | Que tráfego anómalo foi detetado, que regras foram acionadas | Não capturam tudo; dependem das regras configuradas |
| **Documentação de configuração** | Qual era o estado esperado dos sistemas (para comparar com o estado atual) | Pode estar desatualizada se não houver gestão de configuração rigorosa |
| **Documentação do incidente** | Cronologia, decisões tomadas, ações executadas durante a resposta | Depende da qualidade do registo feito em tempo real |
| **Análise detalhada de sistemas e dados** | Estado real dos ficheiros, processos, contas, serviços | Consome tempo; pode não ser viavel para todos os sistemas |
| **Logs de EDR/XDR** | Atividade nos endpoints, processos executados, ligações de rede | Cobertura limitada ao que estava instalado e configurado |
| **Entrevistas com utilizadores** | Contexto humano, observações não registadas em logs | Subjetivas, dependem da memória e da disponibilidade |

---

### Avaliação inicial vs refinamento posterior

A avaliação de danos não é um evento único. Funciona em ciclos:

```
  ╔══════════════════════════════════════════════════════════════════╗
  ║                  CICLO DE AVALIACAO DE DANOS                    ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                 ║
  ║  Avaliação inicial          Refinamento 1         Refinamento 2 ║
  ║  (primeiras horas)          (dias seguintes)      (semanas)     ║
  ║                                                                 ║
  ║  • Que sistemas afetados?   • Análise detalhada   • Impacto     ║
  ║  • Alcance preliminar?        de logs               total       ║
  ║  • Prioridades imediatas?   • Verificação de      • Custos      ║
  ║  • O que restaurar           dados expostos       • Obrigacoes  ║
  ║    primeiro?                • Perímetro real         legais     ║
  ║                               confirmado          • Relatório   ║
  ║                                                     final       ║
  ╚══════════════════════════════════════════════════════════════════╝
```

> Não esperes ter toda a informação para começar a agir. Mas não ignores que a avaliação precisa de ser refinada a medida que a informação evolui.

A avaliação inicial guia a recuperação; as avaliações subsequentes refinam a compreensão e alimentam o relatório pós-incidente, a comunicação com stakeholders e as decisões sobre obrigações legais (como a notificação a CNPD em caso de violação de dados pessoais).

---

## 2. Perícia informática

### O que é a perícia informática

A **perícia informática** (computer forensics) e o processo de **recolher, analisar e preservar provas digitais** de forma cuidadosa, para que possam ser utilizadas de forma fiável e, quando necessário, formal (por exemplo, em processos disciplinares, judiciais ou regulatorios).

Não se trata apenas de "ver os logs". Envolve:

- **Recolha correta** das provas (sem alterar os dados originais)
- **Preservação da integridade** (garantir que a prova não foi modificada após recolha)
- **Documentação da origem e manuseamento** (quem recolheu, quando, como, onde está guardada)

```
  ┌───────────────────────────────────────────────────────┐
  │              PERICIA INFORMATICA                       │
  │                                                        │
  │   Recolha  ──►  Preservação  ──►  Análise  ──►  Uso   │
  │   correta       da integridade    técnica      formal  │
  │                                                        │
  │   Copias        Hashes (SHA-256)  Correlação   Relatório│
  │   forenses      Cadeia de         Cronologia   Prova    │
  │   Imagens       custodia          Atribuição   legal    │
  │   de disco                                              │
  └───────────────────────────────────────────────────────┘
```

As provas digitais podem demonstrar:

- **Ação**: que ferramentas foram usadas, que comandos foram executados
- **Intenção**: tentativas de apagar logs, exfiltrar dados deliberadamente, criar persistência
- **Cronologia**: quando cada ação ocorreu, em que sequência
- **Alcance**: que sistemas e dados foram efetivamente acedidos ou comprometidos

---

### Quando e necessária

A perícia informática **não é obrigatória em todos os incidentes**. Ganha importância em situações específicas:

| Situação | Necessidade forense | Justificação |
|----------|:-------------------:|-------------|
| Phishing generico com reset rápido de password | Baixa | Incidente contido rapidamente, sem indicios de acesso efetivo a dados sensíveis |
| Suspeita de crime informático | **Alta** | Pode ser necessário reportar as autoridades e apresentar provas |
| Obrigação regulatória (RGPD, NIS2) | **Alta** | O regulador pode exigir evidência de como o incidente ocorreu e que dados foram afetados |
| Possibilidade de litígio | **Alta** | A organização pode precisar de provas para se defender ou para acionar terceiros |
| Impacto disciplinar interno | **Media-Alta** | E necessário demonstrar que um colaborador teve determinado comportamento |
| Necessidade de prova formal | **Alta** | Qualquer situação onde "o que aconteceu" precisa de ser demonstrado de forma fiável |
| Falha de sistema sem indicios de ataque | Baixa | Se não há suspeita de ação maliciosa, a investigação técnica normal e suficiente |

Uma prova digital que foi **alterada, mal documentada, contaminada ou armazenada sem controlo** perde o seu valor técnico, organizacional e legal. Não basta recolher - e preciso recolher **bem**.

---

### Cadeia de custodia

A **cadeia de custodia** e o registo documentado de quem recolheu a prova, quando, como, e por onde passou desde a recolha até a sua utilização.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    CADEIA DE CUSTODIA                         ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Recolha            Transporte          Armazenamento         ║
  ║  ────────           ──────────          ──────────────        ║
  ║  Quem recolheu?     Como foi            Onde está             ║
  ║  Quando?            transportada?       guardada?             ║
  ║  De onde?           Quem a teve?        Quem tem acesso?      ║
  ║  Com que método?    Em que condições?   Ha registo de         ║
  ║  Hash de            A integridade       cada acesso?          ║
  ║  integridade?       foi mantida?                              ║
  ║                                                               ║
  ║  ──────────────────────────────────────────────────────────   ║
  ║  Cada elo da cadeia deve ser documentado. Se um elo falha,    ║
  ║  toda a cadeia perde credibilidade.                           ║
  ╚═══════════════════════════════════════════════════════════════╝
```

Nem todas as equipas estão preparadas para conduzir perícia informática. Uma resposta apressada ou mal conduzida pode **destruir artefactos** que seriam essenciais para a investigação.

---

### A tensão entre recuperação rápida e preservação de prova

Existe uma tensão real entre duas necessidades legitimas: a **urgência operacional** de restaurar serviços e a **necessidade de preservar provas** antes de alterar os sistemas.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │   URGENCIA OPERACIONAL          PRESERVACAO DE PROVA            │
  │                                                                 │
  │   "Precisamos de restaurar      "Se restaurarmos agora,         │
  │    os serviços o mais           perdemos as provas do           │
  │    rápido possível!"            que aconteceu."                 │
  │                                                                 │
  │          ◄──────── TENSAO ────────►                             │
  │                                                                 │
  │   ┌─────────────────────────────────────────────────────┐       │
  │   │            EQUILIBRIO NECESSARIO                    │       │
  │   │                                                     │       │
  │   │  1. Avaliar: há necessidade forense neste caso?     │       │
  │   │  2. Se sim: preservar provas ANTES de restaurar     │       │
  │   │  3. Se não: documentar e avancar com recuperação    │       │
  │   │  4. Sempre: não destruir provas por descuido        │       │
  │   └─────────────────────────────────────────────────────┘       │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

E importante distinguir claramente:

| Aspeto | Avaliação de danos | Perícia informática |
|--------|-------------------|---------------------|
| **Pergunta central** | O que foi afetado? Qual o impacto? O que restaurar? | Que provas existem? Como preserva-las? O que pode ser demonstrado? |
| **Objetivo** | Guiar a recuperação | Garantir que as provas são fiáveis e utilizáveis |
| **Urgência** | Alta - necessária para avancar | Variavel - depende do tipo de incidente |
| **Quem faz** | Equipa de resposta a incidentes | Especialistas em forense digital (internos ou externos) |
| **Risco de não fazer** | Recuperação cega, sem saber o alcance | Perda de provas, incapacidade de demonstrar o que aconteceu |

> Recuperar depressa demais pode destruir provas. Preservar provas em excesso pode atrasar a recuperação. O equilíbrio depende do contexto de cada incidente.

---

## 3. Recuperação madura

A recuperação não é simplesmente "ligar tudo outra vez". Uma recuperação madura tem **múltiplas camadas**, cada uma com objetivos distintos.

### As 7 camadas da recuperação

| Camada | Objetivo | Ações típicas | Exemplo |
|--------|----------|--------------|---------|
| **1. Corrigir vulnerabilidades** | Eliminar a causa raiz que permitiu o incidente e a sua propagação | Aplicar patches, corrigir configurações, fechar portas, eliminar contas obsoletas | A vulnerabilidade no servidor web que permitiu a intrusão e corrigida antes de o repor online |
| **2. Corrigir salvaguardas** | Reforcar os controlos que falharam ou estavam ausentes | Implementar MFA, instalar EDR, configurar backups, segmentar a rede, melhorar a recolha de logs, configurar alertas | Após um comprometimento via password única, e implementado MFA em todos os acessos remotos |
| **3. Melhorar a monitorização** | Avaliar se a deteção foi eficaz e melhorar a visibilidade | Rever regras do SIEM, adicionar fontes de logs, melhorar alertas, ajustar limiares, rever métodos de reporte | A organização percebe que não tinha alertas para acessos fora de horário e configura-os |
| **4. Restaurar dados** | Repor dados a partir de fontes fiáveis, sem reintroduzir corrupção | Restaurar backups validados, verificar integridade, confirmar que a fonte de restauro não está comprometida | Os dados são restaurados do backup de quinta-feira (verificado como limpo), não do de sexta (já comprometido) |
| **5. Restaurar serviços e processos** | Repor não só a tecnologia mas também os processos operacionais | Reativar serviços, processar filas pendentes, reconciliar dados, reativar contas de utilizadores, retomar processos manuais interrompidos | Além de restaurar o sistema de faturação, e necessário processar as 200 faturas que ficaram em fila durante a indisponibilidade |
| **6. Monitorização pós-restauro** | Vigiar os sistemas restaurados para detetar persistência, recorrência ou instabilidade | Monitorização intensiva nas primeiras horas/dias, vigilância de indicadores de compromisso (IoC), verificação de que as correções são eficazes | Durante 72 horas após o restauro, a equipa monitoriza ativamente os logs do servidor para sinais de reinfeção |
| **7. Restaurar confiança e rever** | Reconstruir a confiança dos stakeholders e aprender com o incidente | Comunicação transparente, revisão pós-ação (after-action review), atualização de planos e procedimentos | A organização comunica aos clientes o que aconteceu, que medidas foram tomadas, e o que mudou para evitar recorrência |

```
  ╔═════════════════════════════════════════════════════════════╗
  ║            AS 7 CAMADAS DA RECUPERACAO MADURA               ║
  ╠═════════════════════════════════════════════════════════════╣
  ║                                                             ║
  ║  7. Restaurar confiança + revisão pós-ação         ▲        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  6. Monitorização pós-restauro                     │        ║
  ║  ──────────────────────────────────────────      Maturidade  ║
  ║  5. Restaurar serviços E processos                 │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  4. Restaurar dados (com critério)                 │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  3. Melhorar monitorização                         │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  2. Corrigir salvaguardas ausentes/falhadas        │        ║
  ║  ──────────────────────────────────────────         │        ║
  ║  1. Corrigir vulnerabilidades (causa raiz)         │        ║
  ║                                                             ║
  ╚═════════════════════════════════════════════════════════════╝
```

---

### Corrigir causas, não restaurar fraquezas

> Voltar ao estado anterior sem melhorias e uma recuperação fraca. E como reparar a porta sem mudar a fechadura que o ladrao abriu.

Uma recuperação madura não se limita a repor o estado anterior. Se o incidente explorou uma vulnerabilidade, e essa vulnerabilidade não for corrigida, a organização está a preparar-se para o próximo incidente.

```
  ╔════════════════════════╦════════════════════════════════╗
  ║  RECUPERACAO FRACA     ║  RECUPERACAO MADURA            ║
  ╠════════════════════════╬════════════════════════════════╣
  ║ Restaurar o backup     ║ Restaurar o backup             ║
  ║ e ligar o sistema      ║ + corrigir a vulnerabilidade   ║
  ║                        ║ + implementar MFA              ║
  ║ Resultado:             ║ + melhorar a monitorização     ║
  ║ Mesma fraqueza,        ║ + documentar e rever           ║
  ║ próximo incidente      ║                                ║
  ║ a caminho              ║ Resultado:                     ║
  ║                        ║ Organização mais resistente    ║
  ╚════════════════════════╩════════════════════════════════╝
```

---

### Monitorização pós-restauro

Após restaurar os sistemas, a vigilância não termina. Pelo contrário, as primeiras horas e dias após o restauro são críticos:

- O atacante pode ter deixado **mecanismos de persistência** (backdoors, contas ocultas, tarefas agendadas)
- O incidente pode **recorrer** se a causa raiz não foi totalmente eliminada
- E necessário **confirmar estabilidade** dos sistemas restaurados
- As **medidas corretivas** implementadas precisam de ser verificadas na prática

A monitorização pós-restauro deve ser **mais intensiva** do que a monitorização habitual, pelo menos durante um período definido (tipicamente 48 a 72 horas, podendo ser mais em incidentes graves).

---

### Revisão pós-ação (after-action review)

A revisão pós-ação e o momento formal em que a organização olha para o incidente de forma crítica e construtiva:

| Pergunta | Objetivo |
|----------|----------|
| O que **correu bem** na resposta? | Identificar práticas a manter e reforcar |
| O que **correu mal** ou foi difícil? | Identificar falhas, bloqueios e ineficiencias |
| O que **faltou** (ferramentas, informação, competencias, procedimentos)? | Identificar lacunas a preencher |
| O que **mudar** no plano, nas equipas, nos controlos, na comunicação? | Definir ações concretas de melhoria |
| O que **aprendemos** sobre a ameaça, os atacantes, os nossos sistemas? | Incorporar conhecimento na postura de segurança |

A revisão pós-ação não é para atribuir culpas. E para **aprender e melhorar**. Uma organização que não faz revisão pós-ação está condenada a repetir os mesmos erros.

---

## 4. Resposta automatizada

### Automação moderna na resposta

A automação na resposta a incidentes permite executar **ações predefinidas de forma rápida e consistente** quando determinadas condições são detetadas. Não é magia; e a execução sistemática de regras definidas antecipadamente.

| Mecanismo | O que faz | Exemplo | Limitação |
|-----------|----------|---------|-----------|
| **EDR/XDR** | Isola endpoints comprometidos automaticamente | EDR deteta ransomware e isola o posto da rede em segundos | Pode isolar postos legitimos por falsos positivos; não resolve a causa raiz |
| **Firewall automática** | Cria regras de bloqueio baseadas em indicadores de compromisso | IP malicioso detetado pelo SIEM e bloqueado automaticamente na firewall | Atacantes mudam de IP; regras excessivas podem bloquear tráfego legítimo |
| **SIEM/SOAR** | Executa playbooks automáticos em resposta a alertas | Alerta de força bruta aciona playbook que bloqueia a conta e notifica a equipa | Depende da qualidade das regras e dos playbooks; pode gerar fadiga de alertas |
| **Bloqueio automático de contas/sessões** | Suspende contas ou sessões após detetar comportamento anómalo | Conta bloqueada após 5 tentativas falhadas em 2 minutos | Pode bloquear utilizadores legitimos; atacantes podem explorar isto para denial of service |
| **Quarentena de email** | Isola emails suspeitos antes de chegarem ao destinatário | Email com anexo malicioso e movido para quarentena automaticamente | Pode reter emails legitimos; exige revisão humana dos falsos positivos |

---

### Honeypots e honeynets

**Honeypots** são sistemas-engodo, propositadamente colocados na rede para atrair atividade maliciosa. Não servem utilizadores reais - qualquer interação com eles e, por definição, suspeita.

**Honeynets** são redes de honeypots interligados, simulando um ambiente mais realista.

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
  │   └──────────┘  └──────────┘   não servem ninguém)        │
  │                                                            │
  │   Qualquer acesso a estes sistemas = ALERTA               │
  │                                                            │
  └───────────────────────────────────────────────────────────┘
```

Os honeypots servem para:

- **Detetar** atividade maliciosa (qualquer interação e suspeita)
- **Observar** o comportamento do atacante (que técnicas usa, o que procura)
- **Gerar alertas** precoces de intrusão
- **Recolher inteligência** sobre ameaças
- **Desviar** o atacante dos sistemas reais (em alguns cenários)

Um honeypot precisa de **design cuidadoso, isolamento adequado, monitorização constante e objetivos claros**. Um honeypot mal configurado pode tornar-se numa porta de entrada para a rede real.

**Enticement vs entrapment (conceito simplificado):** Ha uma distinção entre criar um alvo-engodo que atrai quem já tem intenção maliciosa (**enticement** - atrair/seduzir) e induzir alguém a cometer um crime que não cometeria de outra forma (**entrapment** - armadilha). O enquadramento legal varia de país para país, mas o principio geral e que o honeypot deve ser um alvo passivo, não uma provocação ativa.

---

### Automação não substitui o IRP

A automação e uma ferramenta poderosa, mas tem limites claros:

```
  ╔════════════════════════════════════════════════════════════════╗
  ║                 O QUE A AUTOMACAO FAZ BEM                     ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  • Acelerar ações repetitivas e predefinidas                  ║
  ║  • Escalar alertas rapidamente para a equipa certa            ║
  ║  • Reduzir o tempo de resposta inicial                        ║
  ║  • Padronizar ações para cenários conhecidos                  ║
  ║  • Executar 24/7 sem fadiga                                   ║
  ╠════════════════════════════════════════════════════════════════╣
  ║                 O QUE A AUTOMACAO NAO SUBSTITUI               ║
  ╠════════════════════════════════════════════════════════════════╣
  ║  • Decisão contextual (cada incidente tem particularidades)   ║
  ║  • Coordenação entre equipas e stakeholders                   ║
  ║  • Gestão do impacto operacional e de negócio                 ║
  ║  • Comunicação com clientes, reguladores, imprensa            ║
  ║  • Recuperação complexa (restaurar processos, não só sistemas)║
  ║  • Julgamento ético e legal                                   ║
  ║  • Revisão pós-ação e melhoria contínua                       ║
  ╚════════════════════════════════════════════════════════════════╝
```

> A automação e o copiloto, não o piloto. Ajuda a reagir mais rápido, mas não substitui quem decide, coordena e aprende.

---

## 5. Exemplos práticos

### Exemplo 1 - Universidade (Recuperação pós-phishing)

**Cenário:** Uma universidade sofreu um ataque de phishing que comprometeu credenciais de 15 docentes. O atacante usou essas credenciais para aceder a plataforma de gestão académica durante 3 dias antes de ser detetado. A contenção já foi feita (passwords resetadas, sessões invalidadas).

| Fase da recuperação | Ação concreta |
|--------------------|--------------|
| **Avaliação de danos** | Analisar logs de acesso a plataforma: que dados foram consultados? Houve alteração de notas? Foram exportados dados pessoais de alunos? |
| **Decisão forense** | Baixa necessidade forense: não há indicios de crime sofisticado, mas e necessário documentar para eventual notificação a CNPD |
| **Corrigir vulnerabilidades** | Implementar MFA obrigatório para todos os acessos a plataforma académica |
| **Corrigir salvaguardas** | Rever as regras de filtragem de email, implementar formação anti-phishing obrigatória |
| **Melhorar monitorização** | Configurar alertas para acessos anómalos (fora de horário, volume invulgar de consultas) |
| **Restaurar confiança** | Comunicar aos docentes afetados o que aconteceu e que medidas foram tomadas |
| **Revisão pós-ação** | Rever: porque e que 15 docentes cairam no phishing? A formação e suficiente? O email devia ter sido detetado? |

**Como interpretar:**

*Este caso mostra que a recuperação pós-phishing vai muito além de resetar passwords. E necessário avaliar se houve acesso a dados sensíveis, corrigir a causa raiz (ausência de MFA, formação insuficiente), e comunicar de forma transparente. A avaliação de danos e crucial para saber se há obrigação de notificação ao regulador.*

**Para refletir:**

- Se o atacante tivesse alterado notas de alunos, como mudaria a avaliação de danos?
- Que dados pessoais de alunos podem estar acessíveis através da plataforma académica?
- Como decidir se há obrigação de notificar a CNPD neste caso?

---

### Exemplo 2 - Hospital (Recuperação pós-malware)

**Cenário:** Um hospital detetou malware num servidor de gestão de exames clínicos. O malware esteve ativo durante 5 dias antes da deteção. O servidor armazena resultados de exames de milhares de pacientes. A contenção isolou o servidor.

| Fase da recuperação | Ação concreta |
|--------------------|--------------|
| **Avaliação de danos** | Que exames foram acedidos? Houve alteração de resultados (integridade)? Houve exfiltração de dados (confidencialidade)? Que pacientes são afetados? |
| **Decisão forense** | Alta necessidade forense: dados de saúde são regulados, pode haver obrigação legal de demonstrar o que aconteceu; regulador pode exigir relatório detalhado |
| **Preservar provas** | Antes de restaurar, criar imagem forense do servidor, preservar logs, documentar o estado do sistema |
| **Restaurar dados** | Restaurar a partir do backup de antes da infeção, validar integridade dos resultados de exames restaurados |
| **Restaurar serviços e processos** | Reativar o servidor, processar exames pendentes (5 dias de acumulação), notificar médicos de que resultados anteriores devem ser revalidados |
| **Monitorização pós-restauro** | Monitorização intensiva durante 7 dias, com particular atenção a indicadores de compromisso conhecidos do malware identificado |
| **Revisão pós-ação** | Como entrou o malware? O antivirus/EDR detetou? Porque demorou 5 dias a ser identificado? Que visibilidade faltava? |

**Como interpretar:**

*Num hospital, a integridade dos dados clínicos e crítica: um resultado de exame alterado pode levar a decisões clínicas erradas. A recuperação exige não só restaurar o sistema, mas validar que os dados restaurados são fiáveis. A necessidade forense e alta pela regulamentação aplicavel a dados de saúde.*

**Para refletir:**

- Se um resultado de exame tivesse sido alterado silenciosamente, como seria possível detetar isso?
- Porque e que a necessidade forense e particularmente alta em contextos de saúde?
- Que impacto tem nos pacientes a indisponibilidade de 5 dias do sistema de exames?

---

### Exemplo 3 - E-commerce (Recuperação pós-ataque)

**Cenário:** Uma plataforma de e-commerce sofreu um ataque que explorou uma vulnerabilidade no sistema de checkout. O atacante pode ter acedido a dados de clientes (nomes, moradas, emails). O site esteve em baixo durante 8 horas.

| Fase da recuperação | Ação concreta |
|--------------------|--------------|
| **Avaliação de danos** | Que dados de clientes foram expostos? Dados de pagamento foram afetados? Quantas encomendas foram perdidas durante as 8 horas? Que impacto financeiro? |
| **Decisão forense** | Media-alta: necessário para determinar exatamente que dados foram acedidos e para cumprir obrigações de notificação |
| **Corrigir vulnerabilidades** | Corrigir a vulnerabilidade no sistema de checkout, rever o código para vulnerabilidades similares |
| **Restaurar serviços** | Restaurar o site com a vulnerabilidade corrigida, processar encomendas pendentes, reativar meios de pagamento |
| **Melhorar deteção** | Implementar WAF (Web Application Firewall), melhorar monitorização de acessos a base de dados de clientes |
| **Restaurar confiança** | Notificar clientes afetados, comunicar medidas tomadas, oferecer monitorização de credenciais se aplicavel |
| **Revisão pós-ação** | A vulnerabilidade devia ter sido identificada em testes? O WAF teria prevenido? A deteção foi rápida o suficiente? Como melhorar o processo de desenvolvimento seguro? |

**Como interpretar:**

*Neste caso, a avaliação de danos tem uma componente financeira direta (8 horas de vendas perdidas) e uma componente reputacional (confiança dos clientes). A recuperação não se limita a repor o site online - e necessário processar o backlog de encomendas, comunicar com clientes e implementar melhorias para que não volte a acontecer.*

**Para refletir:**

- Se dados de pagamento tivessem sido expostos, como mudaria a gravidade e as obrigações da organização?
- Qual o custo total do incidente (perdas diretas + custo de resposta + impacto reputacional)?
- Que testes de segurança poderiam ter identificado a vulnerabilidade antes do ataque?

---

### Exemplo 4 - Indústria (Recuperação pós-comprometimento)

**Cenário:** Uma fábrica detetou que um atacante comprometeu a rede corporativa e pode ter acedido a rede de produção (OT). Ha suspeita de sabotagem intencional, pois foram encontradas alterações em parâmetros de configuração de equipamentos industriais.

| Fase da recuperação | Ação concreta |
|--------------------|--------------|
| **Avaliação de danos** | Que equipamentos industriais foram afetados? Que parâmetros foram alterados? A produção esteve comprometida? Ha risco de segurança física (máquinas com parâmetros alterados)? |
| **Decisão forense** | Alta: suspeita de sabotagem implica necessidade de provas para eventual ação legal; regulador industrial pode exigir relatório |
| **Preservar provas** | Imagens forenses dos sistemas comprometidos, preservação de logs de rede e de sistemas SCADA, documentação detalhada das alterações encontradas |
| **Corrigir vulnerabilidades** | Implementar segmentação rigorosa entre rede corporativa e rede OT, corrigir acessos entre redes |
| **Restaurar com segmentação** | Restaurar configurações industriais a partir de golden images verificadas, validar todos os parâmetros antes de retomar produção |
| **Monitorização contínua** | Implementar monitorização dedicada na rede OT, instalar sensores de deteção de anomalias no tráfego industrial |
| **Revisão pós-ação** | Como foi possível saltar da rede corporativa para a OT? A segmentação existente era suficiente? Que visibilidade temos sobre a rede de produção? |

**Como interpretar:**

*Em ambientes industriais, um comprometimento pode ter consequências de segurança física. Parametros alterados em equipamentos industriais podem causar danos materiais ou colocar pessoas em risco. A recuperação exige validação rigorosa de todas as configurações antes de retomar a produção, e a perícia informática e essencial quando há suspeita de sabotagem.*

**Para refletir:**

- Que consequências físicas pode ter a alteração de parâmetros de equipamentos industriais?
- Porque e que a segmentação entre rede corporativa e rede OT e tao crítica?
- Como validar que os parâmetros industriais restaurados estão corretos e seguros?
- Se se confirmar a sabotagem, que passos legais devem ser tomados?

---

## 6. Exercícios

### Nível 1 - Compreensão

#### Exercício 1.1 - Verdadeiro ou Falso

Classifica as seguintes afirmações como Verdadeiras (V) ou Falsas (F):

| # | Afirmação |
|---|-----------|
| a) | A avaliação de danos só deve começar quando se tem toda a informação disponível. |
| b) | A perícia informática e obrigatória em todos os incidentes de segurança. |
| c) | A cadeia de custodia documenta quem recolheu a prova, quando e como. |
| d) | Recuperar um sistema a partir de backup e suficiente para uma recuperação madura. |
| e) | A monitorização pós-restauro serve para detetar persistência e recorrência do incidente. |
| f) | Os honeypots são sistemas reais que servem utilizadores normais. |
| g) | A automação na resposta a incidentes substitui a necessidade de um IRP. |
| h) | Restaurar o estado anterior sem corrigir a vulnerabilidade explorada e uma recuperação fraca. |
| i) | A avaliação de danos e idêntica a perícia informática. |
| j) | A revisão pós-ação serve para atribuir culpas pela falha de segurança. |

??? success "Solução 1.1"

    | # | Resposta | Justificação |
    |---|:--------:|-------------|
    | a) | **F** | A avaliação deve começar o mais cedo possível com a melhor informação disponível. Esperar por informação completa atrasa a recuperação. |
    | b) | **F** | A perícia informática não é necessária em todos os incidentes. Ganha importância quando há suspeita de crime, obrigações regulatorias, litígio ou necessidade de prova formal. |
    | c) | **V** | A cadeia de custodia e o registo documentado de quem recolheu a prova, quando, como e por onde passou. |
    | d) | **F** | Uma recuperação madura tem 7 camadas, incluindo corrigir vulnerabilidades, melhorar salvaguardas, monitorização pós-restauro e revisão pós-ação. Restaurar o backup e apenas uma das camadas. |
    | e) | **V** | A monitorização pós-restauro visa detetar mecanismos de persistência deixados pelo atacante, recorrência do incidente, e confirmar a estabilidade dos sistemas. |
    | f) | **F** | Os honeypots são sistemas-engodo que não servem utilizadores reais. Qualquer interação com eles e, por definição, suspeita. |
    | g) | **F** | A automação ajuda a acelerar, escalar e padronizar ações, mas não substitui decisão contextual, coordenação, gestão de impacto, comunicação e recuperação complexa. |
    | h) | **V** | Voltar ao estado anterior sem corrigir a causa raiz e preparar o próximo incidente. A recuperação madura exige correção das vulnerabilidades exploradas. |
    | i) | **F** | A avaliação de danos pergunta "o que foi afetado e qual o impacto"; a perícia pergunta "que provas existem e como preserva-las". São processos distintos, embora complementares. |
    | j) | **F** | A revisão pós-ação não é para atribuir culpas. E para aprender e melhorar: o que correu bem, o que correu mal, o que faltou, o que mudar. |

---

#### Exercício 1.2 - Associar camadas de recuperação

Associa cada ação a camada de recuperação correspondente.

**Camadas:** 1-Corrigir vulnerabilidades | 2-Corrigir salvaguardas | 3-Melhorar monitorização | 4-Restaurar dados | 5-Restaurar serviços e processos | 6-Monitorização pós-restauro | 7-Restaurar confiança e rever

| # | Ação |
|---|------|
| a) | Processar as 150 encomendas que ficaram pendentes durante a indisponibilidade |
| b) | Aplicar o patch de segurança que corrige a vulnerabilidade explorada |
| c) | Comunicar aos clientes o que aconteceu e que medidas foram tomadas |
| d) | Verificar durante 72 horas se há sinais de reinfeção |
| e) | Restaurar a base de dados a partir do backup de quarta-feira |
| f) | Implementar MFA em todos os acessos remotos |
| g) | Adicionar alertas no SIEM para acessos fora de horário |
| h) | Realizar sessão de lições aprendidas com toda a equipa de resposta |

??? success "Solução 1.2"

    | # | Ação | Camada |
    |---|------|--------|
    | a) | Processar encomendas pendentes | **5 - Restaurar serviços e processos** - não basta repor a tecnologia, e preciso tratar o backlog operacional |
    | b) | Aplicar o patch de segurança | **1 - Corrigir vulnerabilidades** - eliminar a causa raiz que permitiu o incidente |
    | c) | Comunicar aos clientes | **7 - Restaurar confiança e rever** - transparência com stakeholders |
    | d) | Verificar sinais de reinfeção durante 72h | **6 - Monitorização pós-restauro** - vigiar persistência e recorrência |
    | e) | Restaurar a base de dados do backup | **4 - Restaurar dados** - repor dados de fonte fiável |
    | f) | Implementar MFA | **2 - Corrigir salvaguardas** - reforcar controlos que falharam ou estavam ausentes |
    | g) | Adicionar alertas para acessos fora de horário | **3 - Melhorar monitorização** - aumentar a visibilidade |
    | h) | Sessão de lições aprendidas | **7 - Restaurar confiança e rever** - aprender com o incidente |

---

### Nível 2 - Aplicação prática

#### Exercício 2.1 - Avaliação de danos pós-incidente

**Cenário:** Uma empresa de consultoria detetou que um atacante acedeu ao servidor de ficheiros durante 48 horas através de uma conta de administrador comprometida. A conta tinha acesso a pastas com contratos de clientes, propostas comerciais e dados financeiros internos.

Realiza a avaliação de danos respondendo:

1. Que dimensoes da CIA foram potencialmente afetadas? Justifica.
2. Que fontes de evidência usarias para delimitar o alcance?
3. Que perguntas adicionais farias para refinar a avaliação?

??? success "Solução 2.1"

    **1. Dimensoes da CIA afetadas:**

    | Dimensão | Afetada? | Justificação |
    |----------|:--------:|-------------|
    | **Confidencialidade** | **Sim** | O atacante pode ter lido/copiado contratos, propostas e dados financeiros. Acesso de 48 horas e tempo suficiente para exfiltrar grandes volumes de dados. |
    | **Integridade** | **Possivelmente** | O atacante pode ter alterado ficheiros (ex: inserir backdoors em documentos, modificar dados financeiros). E necessário verificar. |
    | **Disponibilidade** | **Potencialmente** | Embora os serviços não tenham ficado em baixo, o atacante pode ter eliminado ou cifrado ficheiros. E necessário verificar. |

    **2. Fontes de evidência:**

    - **Logs de acesso ao servidor de ficheiros**: que pastas e ficheiros foram acedidos, quando, e com que operações (leitura, escrita, eliminação)
    - **Logs de autenticação**: quando e de onde a conta comprometida fez login
    - **Logs de rede**: volume de tráfego de saida (possível exfiltração), destinos das ligações
    - **Logs do EDR/antivirus**: se houve execução de ferramentas suspeitas
    - **Documentação de configuração**: que permissões tinha a conta comprometida
    - **Entrevista com o titular da conta**: como foi comprometida, que atividade recente teve

    **3. Perguntas adicionais:**

    - Que ficheiros específicos foram acedidos (não apenas as pastas)?
    - Houve copia massiva de ficheiros (indicador de exfiltração)?
    - Existem clientes com clausulas de notificação obrigatória em caso de exposição de dados?
    - A conta comprometida tinha acesso a outros sistemas além do servidor de ficheiros?
    - Ha evidência de movimento lateral (o atacante tentou aceder a outros sistemas)?

---

#### Exercício 2.2 - Quando e necessária perícia informática?

Para cada cenário, decide se a perícia informática e necessária e justifica a tua decisão.

| # | Cenário |
|---|---------|
| a) | Um colaborador clicou num link de phishing, mas a equipa de TI resetou a password em 10 minutos e não há indicios de acesso a sistemas. |
| b) | A organização suspeita que um ex-colaborador copiou uma base de dados de clientes antes de sair. |
| c) | Um servidor web foi comprometido e o atacante pode ter acedido a dados pessoais de 50.000 utilizadores. |
| d) | Uma falha de energia causou a corrupção de uma base de dados, sem indicios de ação maliciosa. |
| e) | Um ataque de ransomware cifrou 40% dos ficheiros da organização e o atacante exige pagamento. |

??? success "Solução 2.2"

    | # | Forense? | Justificação |
    |---|:--------:|-------------|
    | a) | **Não** (mas documentar) | Incidente contido rapidamente, sem indicios de acesso efetivo. Documentar o ocorrido e suficiente. Se surgirem indicios posteriores de acesso, reavaliar. |
    | b) | **Sim** | Suspeita de crime (roubo de dados), possível litígio, necessidade de prova formal de que a copia foi feita e do que foi copiado. |
    | c) | **Sim** | Obrigação regulatória (RGPD exige saber que dados foram afetados), possível notificação a CNPD, necessidade de demonstrar o alcance real do comprometimento. |
    | d) | **Não** | Sem indicios de ação maliciosa. Investigação técnica normal para perceber a causa da corrupção e restaurar dados e suficiente. |
    | e) | **Sim** | Possível crime informático (extorsão), necessidade de preservar provas para as autoridades, possível obrigação regulatória, necessidade de perceber o vetor de entrada para corrigir. |

---

#### Exercício 2.3 - Desenhar plano de recuperação

**Cenário:** Uma clínica dentaria sofreu um ataque de ransomware que cifrou o servidor de agendamentos e o servidor de registos clínicos. Os backups existem mas não eram testados há 4 meses. A equipa de TI (2 pessoas) conseguiu conter o ataque isolando os servidores.

Desenha um plano de recuperação que cubra as 7 camadas. Para cada camada, indica pelo menos uma ação concreta.

??? success "Solução 2.3"

    | Camada | Ação concreta |
    |--------|--------------|
    | **1. Corrigir vulnerabilidades** | Identificar como o ransomware entrou (vetor: email? RDP exposto? vulnerabilidade?). Corrigir: fechar RDP exposto, aplicar patches, corrigir configuração que permitiu a entrada. |
    | **2. Corrigir salvaguardas** | Implementar EDR nos servidores, configurar backups automáticos com verificação diaria, implementar segmentação entre rede administrativa e rede clínica, ativar MFA no acesso remoto. |
    | **3. Melhorar monitorização** | Configurar alertas para cifragem massiva de ficheiros (indicador de ransomware), acessos fora de horário, tentativas de desativação do antivirus. |
    | **4. Restaurar dados** | Testar os backups (há 4 meses que não eram testados - podem estar incompletos). Restaurar com validação: verificar integridade dos registos clínicos, confirmar que as agendas estão corretas. Se os backups falharem, avaliar alternativas (reconstrução manual, contacto com pacientes). |
    | **5. Restaurar serviços e processos** | Reativar o sistema de agendamento, remarcar consultas perdidas durante a indisponibilidade, notificar pacientes afetados, processar registos clínicos que ficaram pendentes. |
    | **6. Monitorização pós-restauro** | Monitorização intensiva durante pelo menos 1 semana. Verificar se o ransomware deixou mecanismos de persistência. Vigiar tentativas de re-execução. |
    | **7. Restaurar confiança e rever** | Comunicar aos pacientes se os seus dados foram comprometidos. Rever internamente: porque não se testavam os backups? Que formação falta a equipa? Atualizar procedimentos. |

    **Nota crítica:** Os backups não testados são um risco real. Pode dar-se o caso de que, ao tentar restaurar, se descubra que os backups estão incompletos ou corrompidos. O plano deve prever está possibilidade.

---

### Nível 3 - Análise

#### Exercício 3.1 - Cenário completo pós-incidente

**Cenário:** Es o responsável de segurança de uma empresa de logística com 500 colaboradores. Na quarta-feira, as 14h, o SIEM detetou tráfego anómalo de saida num servidor de base de dados que contem informação de rotas, clientes e contratos. A investigação revelou:

- Um atacante explorou uma vulnerabilidade conhecida (com patch disponível há 2 meses) no servidor web
- A partir do servidor web, moveu-se lateralmente para o servidor de base de dados
- Esteve ativo na rede durante aproximadamente 10 dias antes da deteção
- Ha indicios de exfiltração de dados (grande volume de tráfego de saida para IPs desconhecidos)
- Os logs do servidor web dos primeiros 5 dias foram apagados pelo atacante

Desenvolve um plano completo que inclua:

1. Avaliação de danos detalhada
2. Decisão fundamentada sobre perícia informática
3. Plano de recuperação com as 7 camadas
4. Estrutura para a revisão pós-ação

??? success "Solução 3.1"

    **1. Avaliação de danos:**

    | Dimensão | Avaliação | Detalhes |
    |----------|----------|---------|
    | **Confidencialidade** | **Comprometida** | Indicios de exfiltração de dados de clientes, rotas e contratos. 10 dias de acesso não detetado são suficientes para copiar toda a base de dados. |
    | **Integridade** | **Potencialmente comprometida** | O atacante pode ter alterado dados na base de dados. Logs apagados indicam intenção de esconder atividade. E necessário verificar integridade dos dados. |
    | **Disponibilidade** | **Parcialmente afetada** | Embora os serviços não tenham ficado em baixo, a necessidade de isolar servidores para investigação afeta a disponibilidade. |

    **Fontes a usar:** Logs do SIEM, logs de rede (tráfego de saida), logs da base de dados (que queries foram executadas), logs do EDR (se existir), logs de firewall, entrevistas com a equipa de TI.

    **Nota crítica:** Os logs do servidor web dos primeiros 5 dias foram apagados. Isto limita a capacidade de avaliar o que aconteceu inicialmente e reorca a necessidade de perícia informática.

    **2. Decisão forense:**

    **Sim, e necessária perícia informática.** Justificação:
    - Ha indicios de exfiltração de dados de clientes (possível crime informático)
    - Obrigação regulatória: dados pessoais de clientes podem implicar notificação a CNPD
    - Possível litígio com clientes cujos dados foram expostos
    - Os logs apagados indicam sofisticação e intenção de esconder rastos - e necessário recuperar o que for possível
    - Contratos expostos podem ter implicações comerciais e legais

    **Ações forenses prioritarias:**
    - Criar imagens forenses dos servidores web e de base de dados antes de qualquer restauro
    - Preservar todos os logs de rede, SIEM, firewall, EDR
    - Documentar cadeia de custodia
    - Considerar apoio de especialistas forenses externos

    **3. Plano de recuperação (7 camadas):**

    | Camada | Ações |
    |--------|-------|
    | **1. Corrigir vulnerabilidades** | Aplicar o patch que estava disponível há 2 meses no servidor web. Fazer scan de vulnerabilidades a todos os servidores expostos. Corrigir todas as vulnerabilidades críticas encontradas. |
    | **2. Corrigir salvaguardas** | Implementar política de patch management com SLA (patches críticos em 48h). Segmentar a rede (servidor web não deve ter acesso direto a base de dados). Implementar EDR em todos os servidores. Rever política de retenção de logs (proteger contra apagamento). |
    | **3. Melhorar monitorização** | Rever porque o SIEM só detetou após 10 dias. Adicionar regras para detetar movimento lateral. Configurar alertas para grandes volumes de tráfego de saida. Implementar monitorização de integridade de logs. |
    | **4. Restaurar dados** | Identificar backup anterior ao comprometimento (pelo menos 10 dias antes). Validar integridade do backup. Restaurar com verificação de que não contem artefactos do atacante. |
    | **5. Restaurar serviços e processos** | Reativar serviços com vulnerabilidade corrigida. Reconciliar dados (10 dias de operação podem ter gerado dados legitimos que não estão no backup antigo). Revalidar contratos e dados de clientes. |
    | **6. Monitorização pós-restauro** | Monitorização intensiva durante pelo menos 2 semanas (dada a sofisticação do ataque). Vigiar IoCs conhecidos. Verificar se o atacante criou contas ou mecanismos de persistência. |
    | **7. Restaurar confiança e rever** | Notificar clientes afetados. Notificar CNPD se dados pessoais foram expostos. Comunicar internamente. Revisão pós-ação completa. |

    **4. Estrutura para revisão pós-ação:**

    | Pergunta | Foco |
    |----------|------|
    | Porque e que o patch não foi aplicado durante 2 meses? | Processo de gestão de patches |
    | Porque e que o movimento lateral não foi detetado? | Segmentação de rede e monitorização |
    | Porque e que o SIEM só detetou após 10 dias? | Regras de deteção e visibilidade |
    | Os logs podiam ter sido protegidos contra apagamento? | Proteção e retenção de logs |
    | A equipa tinha competencias e ferramentas para está resposta? | Capacidade da equipa |
    | O plano de resposta a incidentes foi seguido? Foi útil? | Qualidade do IRP |
    | Que informação faltou durante a resposta? | Lacunas de visibilidade |
    | Que comunicação foi feita e foi adequada? | Processo de comunicação |

---

#### Exercício 3.2 - Automação vs decisão humana

Para cada situação, indica se a resposta deve ser **automatizada**, **humana**, ou **hibrida** (automação inicial + decisão humana). Justifica.

| # | Situação |
|---|---------|
| a) | Endpoint deteta processo a cifrar ficheiros em massa |
| b) | Cliente reporta que os seus dados pessoais apareceram num forum online |
| c) | SIEM deteta 50 tentativas falhadas de login numa conta de serviço |
| d) | Descoberta de que um fornecedor crítico foi comprometido e pode afetar a organização |
| e) | Email com anexo malicioso detetado a caminho de 200 colaboradores |
| f) | Decisão sobre se deve notificar a CNPD após uma violação de dados |

??? success "Solução 3.2"

    | # | Tipo | Justificação |
    |---|------|-------------|
    | a) | **Automatizada** | Cifragem em massa e indicador forte de ransomware. O EDR deve isolar o endpoint imediatamente - cada segundo conta. A decisão humana vem depois (investigar, avaliar alcance). |
    | b) | **Humana** | Requer investigação (confirmar se e verdade, avaliar que dados, determinar origem), avaliação de impacto, decisão sobre comunicação e obrigações legais. Não é automatizavel. |
    | c) | **Hibrida** | A automação deve bloquear a conta após X tentativas (prevenir comprometimento). A equipa humana deve investigar: e ataque externo? Problema de configuração? A conta está comprometida? |
    | d) | **Humana** | Requer avaliação contextual: que serviços dependemos desse fornecedor? Que dados partilhamos? Qual o risco real? Que ações tomar? E uma decisão estratégica e de coordenação. |
    | e) | **Automatizada** | A quarentena do email deve ser automática para os 200 destinatários. A análise humana vem depois (confirmar que é malicioso, verificar se alguém abriu antes da quarentena). |
    | f) | **Humana** | E uma decisão legal que requer avaliação do impacto, dos dados afetados, das obrigações aplicaveis e das consequências. Não pode ser automatizada. |

---

## 7. Armadilhas e confusões a evitar

### Confusão 1: Avaliação de danos não é o mesmo que perícia informática

> A avaliação de danos pergunta: "o que foi afetado e o que restaurar?" A perícia pergunta: "que provas existem e como preserva-las para uso formal?"

São processos distintos. A avaliação de danos guia a recuperação; a perícia garante que as provas são fiáveis. Podem ocorrer em paralelo, mas tem objetivos diferentes.

### Confusão 2: Recuperar não é apenas restaurar o backup

> Restaurar o backup e uma das camadas da recuperação, não a recuperação completa.

Uma recuperação madura inclui corrigir vulnerabilidades, reforcar salvaguardas, melhorar a monitorização, restaurar processos (não só tecnologia), monitorizar pós-restauro e rever o que aconteceu.

### Confusão 3: "Determinação imediata" não significa certeza instantânea

> Comecar a avaliar cedo não é o mesmo que ter todas as respostas imediatamente.

A avaliação inicial baseia-se na melhor informação disponível. Sera refinada a medida que surgem novos dados. Esperar por certeza completa antes de agir atrasa a recuperação.

### Confusão 4: A perícia informática não é necessária em todos os incidentes

> Não é preciso chamar a equipa forense para um reset de password pós-phishing sem indicios de acesso a dados.

A necessidade de perícia depende do tipo de incidente, das obrigações legais, da possibilidade de litígio e da necessidade de prova formal.

### Confusão 5: Restaurar rapidamente pode destruir provas

> A urgência de "ligar tudo outra vez" pode apagar artefactos forenses essenciais.

Antes de restaurar, avaliar se há necessidade de preservar provas. Uma imagem forense demora minutos a criar e pode ser crítica meses mais tarde.

### Confusão 6: Automação não é magia

> A automação executa ações predefinidas em condições previstas. Não pensa, não avalia contexto, não coordena.

A automação e excelente para ações rapidas e repetitivas (isolar um endpoint, bloquear um IP). Não substitui decisão humana para situações complexas, ambiguas ou com impacto estratégico.

### Confusão 7: Honeypots não são "armadilhas legais"

> Um honeypot atrai quem já tem intenção maliciosa. Não deve induzir alguém a cometer um ato que não cometeria de outra forma.

A distinção entre enticement (criar um alvo passivo) e entrapment (provocar ativamente) e importante. O enquadramento legal varia, mas o principio e claro: o honeypot deve ser passivo.

### Confusão 8: A revisão pós-ação não é para culpar pessoas

> A revisão pós-ação existe para aprender e melhorar, não para encontrar culpados.

Se a revisão se transformar num exercício de atribuição de culpa, as pessoas deixam de ser transparentes sobre o que correu mal. Isso impede a organização de aprender e melhorar verdadeiramente.

### Confusão 9: Voltar ao estado anterior não é uma boa recuperação

> Se o incidente explorou uma fraqueza, voltar ao mesmo estado e preparar o próximo incidente.

A recuperação madura corrige as causas, reforeca as salvaguardas e melhora a postura de segurança. Voltar ao estado anterior e o mínimo, não o objetivo.

### Confusão 10: Monitorização pós-restauro não é opcional

> Os primeiros dias após o restauro são críticos. Não vigiar e assumir que o problema está resolvido sem confirmação.

O atacante pode ter deixado mecanismos de persistência. A causa raiz pode não ter sido totalmente eliminada. As correções implementadas podem não funcionar como esperado. Vigiar e essencial.

---

## 8. Resumo rápido

### Tabela de conceitos-chave

| Conceito | Descrição |
|----------|-----------|
| **Avaliação de danos** | Processo de determinar o alcance, profundidade e consequências de um incidente, através da lente CIA |
| **Determinação imediata** | Comecar a delimitar o âmbito do incidente com a melhor informação disponível, não esperar por certeza completa |
| **Perícia informática** | Recolha, análise e preservação de provas digitais de forma cuidadosa e documentada |
| **Cadeia de custodia** | Registo de quem recolheu a prova, quando, como e por onde passou |
| **Recuperação madura** | Recuperação em 7 camadas: vulnerabilidades, salvaguardas, monitorização, dados, serviços, monitorização pós-restauro, revisão |
| **Revisão pós-ação** | Análise crítica e construtiva do incidente para identificar melhorias |
| **Automação (SOAR)** | Execução automática de ações predefinidas em resposta a alertas |
| **Honeypot** | Sistema-engodo para atrair atividade maliciosa, detetar intrusoes e recolher inteligência |
| **Honeynet** | Rede de honeypots interligados simulando um ambiente mais realista |
| **Enticement** | Atrair quem já tem intenção maliciosa com um alvo passivo (geralmente legal) |
| **Entrapment** | Induzir alguém a cometer um crime que não cometeria de outra forma (geralmente ilegal) |
| **Monitorização pós-restauro** | Vigilancia intensiva após o restauro para detetar persistência, recorrência e validar correções |

### Frases-chave para recordar

- *"Recuperar sem avaliar e como reconstruir sem saber o que está danificado."*
- *"A perícia informática não é obrigatória em todos os incidentes, mas quando e necessária, e insubstituivel."*
- *"Uma prova mal recolhida e uma prova perdida."*
- *"Restaurar o backup e uma camada da recuperação, não a recuperação completa."*
- *"Voltar ao estado anterior sem corrigir a fraqueza e preparar o próximo incidente."*
- *"A automação e o copiloto, não o piloto."*
- *"A revisão pós-ação existe para aprender, não para culpar."*
- *"Os primeiros dias após o restauro são os mais críticos para detetar persistência."*
- *"Recuperar depressa demais pode destruir provas. Preservar provas em excesso pode atrasar a recuperação. O equilíbrio depende do contexto."*

### Diagrama de sintese

```
  ╔══════════════════════════════════════════════════════════════════════╗
  ║           CICLO COMPLETO: DA DETECAO AS LICOES APRENDIDAS          ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                     ║
  ║  ┌──────────┐   ┌──────────────┐   ┌───────────┐   ┌───────────┐  ║
  ║  │ Deteção  │──►│Classificação │──►│ Contenção │──►│Erradicação│  ║
  ║  └──────────┘   └──────────────┘   └───────────┘   └─────┬─────┘  ║
  ║       ▲                                                    │       ║
  ║       │                                                    ▼       ║
  ║       │         ┌──────────────────────────────────────────────┐   ║
  ║       │         │         RECUPERACAO DE INCIDENTES            │   ║
  ║       │         │                                              │   ║
  ║       │         │  ┌────────────────────────────────────────┐  │   ║
  ║       │         │  │ 1. Avaliação de danos (lente CIA)      │  │   ║
  ║       │         │  │ 2. Perícia informática (se necessária) │  │   ║
  ║       │         │  │ 3. Corrigir vulnerabilidades           │  │   ║
  ║       │         │  │ 4. Corrigir salvaguardas               │  │   ║
  ║       │         │  │ 5. Melhorar monitorização              │  │   ║
  ║       │         │  │ 6. Restaurar dados                     │  │   ║
  ║       │         │  │ 7. Restaurar serviços e processos      │  │   ║
  ║       │         │  │ 8. Monitorização pós-restauro          │  │   ║
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
  ║                    Melhoria contínua                                ║
  ║                                                                     ║
  ║  ┌──────────────────────────────────────────────────────────────┐   ║
  ║  │ AUTOMACAO (EDR, SOAR, Honeypots) apoia todas as fases,      │   ║
  ║  │ mas não substitui decisão humana, coordenação e revisão.    │   ║
  ║  └──────────────────────────────────────────────────────────────┘   ║
  ║                                                                     ║
  ╚══════════════════════════════════════════════════════════════════════╝
```

---

*Próximo capítulo: [Casos Práticos do IRP](casos-praticos.md)*
