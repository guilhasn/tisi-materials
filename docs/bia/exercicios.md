# Exercicios - Business Impact Analysis

## Como usar este ficheiro

- Os exercicios estao organizados por nivel de dificuldade.
- Tenta resolver cada exercicio **antes** de consultar a solucao.
- As solucoes estao no final de cada exercicio, dentro de blocos colapsaveis.

---

## Nivel 1 - Compreensao das metricas

### Exercicio 1.1 - Identificar a metrica

Para cada descricao, identifica a metrica BIA correspondente (RPO, RTO, WRT, MTD, MOR, MTBF, MTTR):

| # | Descricao | Metrica? |
|---|-----------|----------|
| a) | "O servidor web falha em media uma vez a cada 60 dias" | |
| b) | "Depois de restaurar o sistema, precisamos de 3 horas para verificar todos os dados" | |
| c) | "Nao podemos ficar sem o sistema de faturacao por mais de 6 horas" | |
| d) | "Aceitamos perder no maximo 30 minutos de transacoes" | |
| e) | "Quando falha, a equipa de TI demora em media 45 minutos a resolver" | |
| f) | "No minimo, precisamos de acesso ao email e ao ERP" | |
| g) | "Temos de ter o sistema a funcionar novamente em 2 horas" | |

??? success "Solucao 1.1"

    | # | Descricao | Metrica |
    |---|-----------|---------|
    | a) | Servidor falha a cada 60 dias | **MTBF** (Mean Time Between Failures) |
    | b) | 3 horas para verificar dados apos restauro | **WRT** (Work Recovery Time) |
    | c) | Nao pode ficar sem sistema mais de 6 horas | **MTD** (Maximum Tolerable Downtime) |
    | d) | Aceita perder 30 minutos de transacoes | **RPO** (Recovery Point Objective) |
    | e) | Equipa demora 45 minutos a resolver | **MTTR** (Mean Time To Repair) |
    | f) | Precisa no minimo de email e ERP | **MOR** (Minimum Operating Requirements) |
    | g) | Sistema a funcionar em 2 horas | **RTO** (Recovery Time Objective) |

---

### Exercicio 1.2 - Verdadeiro ou Falso

Indica se cada afirmacao e verdadeira (V) ou falsa (F) e justifica as falsas:

1. O RPO mede o tempo que demoras a recuperar o sistema.
2. O RTO deve ser sempre inferior ao MTD.
3. Quando o sistema volta a funcionar, o trabalho esta automaticamente recuperado.
4. O MOR define o nivel normal de operacao durante um incidente.
5. MTBF alto significa que o sistema e mais fiavel.
6. RTO + WRT deve ser menor ou igual ao MTD.
7. Um RPO de zero significa que nao sao necessarios backups.

??? success "Solucao 1.2"

    1. **FALSO** - O RPO mede a quantidade maxima de dados que se aceita perder, nao o tempo de recuperacao. Isso e o RTO.
    2. **VERDADEIRO** - O RTO e o objetivo de recuperacao e deve estar contido dentro do MTD (limite maximo).
    3. **FALSO** - O sistema pode estar operacional, mas os dados podem precisar de verificacao e sincronizacao. Para isso existe o WRT.
    4. **FALSO** - O MOR define o **minimo aceitavel**, nao o nivel normal. E o "modo de sobrevivencia".
    5. **VERDADEIRO** - MTBF alto indica mais tempo entre falhas, logo maior fiabilidade.
    6. **VERDADEIRO** - Esta e a regra fundamental: RTO + WRT <= MTD.
    7. **FALSO** - RPO de zero significa que **nenhum dado pode ser perdido**, o que exige replicacao em tempo real (sincrona), nao a ausencia de backups. Backups continuam a ser necessarios para outros cenarios (corrupcao de dados, por exemplo).

---

## Nivel 2 - Aplicacao pratica

### Exercicio 2.1 - Validar o plano

Uma empresa de contabilidade definiu as seguintes metricas para o seu sistema de faturacao:

- RPO: 2 horas
- RTO: 5 horas
- WRT: 4 horas
- MTD: 8 horas

**Pergunta:** Ha algum problema com estas metricas? Se sim, qual e como o resolverias?

??? success "Solucao 2.1"

    **Sim, ha um problema.**

    `RTO (5h) + WRT (4h) = 9h > MTD (8h)`

    A soma do RTO e WRT excede o MTD, o que significa que o plano nao e viavel. A empresa nao consegue cumprir o limite maximo de paragem.

    **Possiveis solucoes:**

    1. Reduzir o RTO (ex.: investir em infraestrutura para recuperacao mais rapida)
    2. Reduzir o WRT (ex.: automatizar verificacoes pos-restauro)
    3. Aumentar o MTD (ex.: reavaliar se a tolerancia real e maior)
    4. Combinacao das tres opcoes

    A solucao correta depende de uma **analise custo-beneficio**: quanto custa reduzir o RTO vs. o custo do impacto no negocio.

---

### Exercicio 2.2 - Definir metricas para um cenario

**Cenario:** Es o responsavel de TI de uma clinica veterinaria com 3 medicos e 2 assistentes. A clinica usa um sistema informatico para:

- Registos clinicos dos animais
- Agendamento de consultas
- Faturacao e recibos
- Stock de medicamentos

O sistema corre num servidor local. Os backups sao feitos todas as noites as 23h00.

**Tarefas:**

1. Define valores razoaveis para RPO, RTO, WRT e MTD.
2. Define o MOR da clinica.
3. O backup atual (diario as 23h) e adequado ao teu RPO? Justifica.
4. Calcula: se o servidor falha em media 3 vezes por ano e cada reparacao demora em media 2 horas, quais sao o MTBF e o MTTR?

??? success "Solucao 2.2"

    **1. Metricas (valores razoaveis - podem variar):**

    | Metrica | Valor | Justificacao |
    |---------|-------|-------------|
    | RPO | 4 horas | Registos clinicos podem ser reconstruidos a partir de notas manuais |
    | RTO | 3 horas | A clinica pode operar em papel durante esse periodo |
    | WRT | 2 horas | Reintroduzir consultas do dia, verificar faturacao |
    | MTD | 8 horas | Alem de um dia de trabalho, o impacto e significativo |

    **Validacao:** `RTO (3h) + WRT (2h) = 5h <= MTD (8h)` ✓

    **2. MOR:**

    - Acesso manual as fichas dos pacientes (ficheiro em papel ou PDF local)
    - Agenda impressa do dia
    - Faturacao manual (recibos em papel)
    - Telefone funcional para contacto com clientes
    - Pelo menos 1 medico e 1 assistente

    **3. Adequacao do backup:**

    O backup diario as 23h significa que, na pior das hipoteses (falha as 22h59), podes perder quase 24 horas de dados. Com um RPO de 4 horas, o backup atual **nao e adequado**.

    **Solucao:** Implementar backups a cada 4 horas (ou mais frequentes), ou usar replicacao incremental ao longo do dia.

    **4. MTBF e MTTR:**

    - Supondo funcionamento 10h/dia, 250 dias/ano = 2500 horas/ano
    - `MTBF = 2500 / 3 = 833 horas (~35 dias)`
    - `MTTR = (2 + 2 + 2) / 3 = 2 horas`
    - `Disponibilidade = 833 / (833 + 2) = 99.76%`

---

### Exercicio 2.3 - Comparar criticidades

Ordena os seguintes servicos do mais critico (menor MTD) ao menos critico (maior MTD) e justifica:

1. Sistema de email de uma consultora
2. Sistema de monitorizacao de pacientes em cuidados intensivos
3. Website institucional de uma autarquia
4. Plataforma de trading de um banco de investimento
5. Sistema de reservas de um restaurante

??? success "Solucao 2.3"

    **Do mais critico ao menos critico:**

    1. **Sistema de monitorizacao de pacientes em cuidados intensivos** (MTD: ~15 min) - Vidas humanas em risco direto. Qualquer paragem pode ser fatal.
    2. **Plataforma de trading de um banco de investimento** (MTD: ~30 min) - Perdas financeiras massivas por segundo de indisponibilidade. Regulacao exige alta disponibilidade.
    3. **Sistema de email de uma consultora** (MTD: ~4-8h) - Comunicacao com clientes e critica, mas existem alternativas (telefone, WhatsApp).
    4. **Sistema de reservas de um restaurante** (MTD: ~12-24h) - Reservas podem ser feitas por telefone. Impacto limitado num dia.
    5. **Website institucional de uma autarquia** (MTD: ~48-72h) - Carater informativo, nao transacional. Os servicos criticos sao prestados presencialmente.

    **Nota:** Esta classificacao pode variar conforme o contexto. Por exemplo, durante uma pandemia, o website da autarquia poderia ser muito mais critico.

---

## Nivel 3 - Analise avancada

### Exercicio 3.1 - Cenario com MTBF e MTTR

Uma empresa de hosting tem os seguintes dados dos ultimos 12 meses para o seu cluster de servidores:

| Falha | Data | Duracao da reparacao |
|-------|------|---------------------|
| 1 | 15 Jan | 1h 30min |
| 2 | 03 Mar | 45min |
| 3 | 28 Mai | 3h 15min |
| 4 | 12 Jul | 2h |
| 5 | 05 Set | 1h |
| 6 | 22 Nov | 4h 30min |

**Tarefas:**

1. Calcula o MTBF (considera que o cluster opera 24/7 durante 365 dias).
2. Calcula o MTTR.
3. Calcula a disponibilidade do sistema.
4. Os clientes da empresa de hosting tem um SLA de 99.95%. O sistema cumpre o SLA? Justifica.
5. Se a empresa quer cumprir o SLA, que MTTR maximo pode aceitar (mantendo o MTBF atual)?

??? success "Solucao 3.1"

    **1. MTBF:**

    - Horas totais de operacao: 365 x 24 = 8760 horas
    - Tempo total em reparacao: 1.5 + 0.75 + 3.25 + 2 + 1 + 4.5 = 13 horas
    - Tempo efetivo de operacao: 8760 - 13 = 8747 horas
    - `MTBF = 8747 / 6 = 1457.8 horas (~60.7 dias)`

    **2. MTTR:**

    - `MTTR = 13 / 6 = 2.17 horas (~2h 10min)`

    **3. Disponibilidade:**

    - `Disponibilidade = 8747 / 8760 = 99.85%`
    - Ou: `Disponibilidade = MTBF / (MTBF + MTTR) = 1457.8 / (1457.8 + 2.17) = 99.85%`

    **4. Cumprimento do SLA:**

    - SLA exigido: 99.95%
    - Disponibilidade real: 99.85%
    - **NAO cumpre o SLA.**
    - Downtime permitido pelo SLA: 8760 x 0.0005 = 4.38 horas/ano
    - Downtime real: 13 horas/ano
    - Excedeu em 8.62 horas.

    **5. MTTR maximo para cumprir o SLA:**

    - Precisamos: `MTBF / (MTBF + MTTR) >= 0.9995`
    - `1457.8 / (1457.8 + MTTR) >= 0.9995`
    - `1457.8 >= 0.9995 x (1457.8 + MTTR)`
    - `1457.8 >= 1457.07 + 0.9995 x MTTR`
    - `0.73 >= 0.9995 x MTTR`
    - `MTTR <= 0.73 horas = 43.8 minutos`

    Para cumprir o SLA com 6 falhas/ano, cada reparacao teria de demorar no maximo ~44 minutos em media.

---

### Exercicio 3.2 - Analise de custo-beneficio

Uma empresa de e-commerce fatura em media 50.000 EUR por hora. Atualmente tem:

- RTO: 4 horas
- WRT: 2 horas
- MTD: 8 horas
- Ocorrem em media 3 incidentes por ano

Uma proposta de investimento permite reduzir o RTO para 1 hora, com um custo de 120.000 EUR por ano (infraestrutura redundante + equipa).

**Tarefas:**

1. Calcula a perda anual estimada com as metricas atuais.
2. Calcula a perda anual estimada com as novas metricas.
3. O investimento justifica-se? Mostra os calculos.
4. A partir de que faturacao horaria e que o investimento se justifica?

??? success "Solucao 3.2"

    **1. Perda anual atual:**

    - Downtime por incidente: RTO + WRT = 4 + 2 = 6 horas
    - Perda por incidente: 6 x 50.000 = 300.000 EUR
    - Nota: Nem todo o WRT e perda total, mas por simplificacao assumimos perda parcial. Assumindo 50% de produtividade durante WRT: perda = (4 x 50.000) + (2 x 25.000) = 250.000 EUR
    - Perda anual (simplificado): 3 x 300.000 = **900.000 EUR**
    - Perda anual (realista): 3 x 250.000 = **750.000 EUR**

    **2. Perda anual com investimento:**

    - Novo downtime por incidente: RTO + WRT = 1 + 2 = 3 horas
    - Perda por incidente (simplificado): 3 x 50.000 = 150.000 EUR
    - Perda por incidente (realista): (1 x 50.000) + (2 x 25.000) = 100.000 EUR
    - Perda anual (simplificado): 3 x 150.000 = **450.000 EUR**
    - Perda anual (realista): 3 x 100.000 = **300.000 EUR**

    **3. Justificacao do investimento:**

    - Poupanca anual (simplificado): 900.000 - 450.000 = 450.000 EUR
    - Poupanca anual (realista): 750.000 - 300.000 = 450.000 EUR
    - Custo do investimento: 120.000 EUR/ano
    - **ROI: 450.000 - 120.000 = 330.000 EUR de beneficio liquido por ano**
    - **Sim, o investimento justifica-se claramente.**

    **4. Faturacao minima para justificar:**

    - Precisa-se que a poupanca >= custo do investimento
    - Poupanca por incidente = 3h x faturacao_hora (diferenca no RTO)
    - Poupanca anual = 3 incidentes x 3h x faturacao_hora = 9 x faturacao_hora
    - 9 x faturacao_hora >= 120.000
    - **faturacao_hora >= 13.333 EUR/hora**
    - A partir de ~13.333 EUR/hora de faturacao, o investimento compensa.

---

### Exercicio 3.3 - Definir BIA completa

**Cenario:** Es contratado como consultor de ciberseguranca por uma PME portuguesa de comercio alimentar que tem:

- 5 lojas fisicas
- 1 armazem central
- 1 loja online (10% da faturacao)
- 50 colaboradores
- Sistema ERP centralizado (gestao de stock, faturacao, RH)
- POS (Point of Sale) em cada loja

A empresa fatura 2 milhoes EUR por ano.

**Tarefas:**

1. Identifica os 4 processos/sistemas mais criticos e justifica.
2. Para cada processo/sistema, define RPO, RTO, WRT, MTD e MOR.
3. Prioriza os sistemas por ordem de criticidade.
4. Identifica dependencias entre sistemas (ex.: se o ERP falha, o que mais e afetado?).
5. Define a frequencia de backups adequada para cada sistema.

??? tip "Orientacoes para solucao 3.3"

    **Nota:** Este exercicio nao tem uma unica solucao correta. O objetivo e que os alunos justifiquem as suas escolhas. Abaixo estao orientacoes.

    **1. Sistemas criticos (sugestao):**

    - **Sistema POS** - sem POS nao ha vendas nas lojas (90% da faturacao)
    - **ERP (modulo de stock)** - sem stock atualizado, ha ruturas e encomendas erradas
    - **Loja online** - 10% da faturacao, mas visivel 24/7
    - **ERP (modulo de faturacao)** - obrigacao fiscal de emitir faturas

    **2. Exemplo de metricas:**

    | Sistema | RPO | RTO | WRT | MTD |
    |---------|-----|-----|-----|-----|
    | POS | 15 min | 30 min | 1h | 2h |
    | ERP (stock) | 1h | 2h | 2h | 6h |
    | Loja online | 1h | 2h | 3h | 8h |
    | ERP (faturacao) | 30 min | 1h | 2h | 4h |

    **3. Prioridade:** POS > ERP faturacao > ERP stock > Loja online

    **4. Dependencias:**

    - POS depende do ERP para stock e precos
    - Loja online depende do ERP para stock disponivel
    - Faturacao depende do POS para dados de venda
    - Stock depende dos registos de ambos os canais

    **5. Frequencia de backups:**

    - POS: a cada 15 minutos (replicacao)
    - ERP faturacao: a cada 30 minutos
    - ERP stock: horario
    - Loja online: horario

---

## Nivel 4 - Desafio

### Exercicio 4.1 - O caso do RPO impossivel

Uma startup quer RPO de zero para todos os seus sistemas, mas tem um orcamento de TI de 500 EUR/mes.

**Tarefas:**

1. Explica porque e que este objetivo e irrealista.
2. Que infraestrutura seria necessaria para RPO de zero?
3. Propoe metricas realistas para uma startup com este orcamento.
4. Como comunicarias esta limitacao ao CEO da startup?

??? tip "Orientacoes para solucao 4.1"

    **1. Porque e irrealista:**

    - RPO zero requer replicacao sincrona em tempo real
    - Isto exige: servidores redundantes, storage replicado, rede dedicada, possivelmente infraestrutura geo-distribuida
    - Custo minimo: milhares de euros/mes, nao centenas

    **2. Infraestrutura necessaria:**

    - Base de dados com replicacao sincrona (ex.: PostgreSQL com streaming replication)
    - Servidores em cluster ativo-ativo ou ativo-passivo
    - Storage redundante (RAID + replicacao remota)
    - Rede redundante
    - Datacenter secundario ou cloud com replicacao
    - Custo estimado: 2.000-10.000 EUR/mes (ou mais)

    **3. Metricas realistas para 500 EUR/mes:**

    - RPO: 1-4 horas (backups frequentes para cloud)
    - RTO: 4-8 horas (restauro a partir de backup)
    - Servicos cloud como AWS/Azure/GCP oferecem opcoes neste range de preco

    **4. Comunicacao ao CEO:**

    - "RPO zero e o nosso objetivo ideal, mas tem um custo. Com o orcamento atual, podemos garantir perda maxima de X horas de dados. Para reduzir para zero, o investimento mensal seria de aproximadamente Y euros. Recomendo comecarmos com Z e ir melhorando progressivamente conforme a empresa cresce."
    - Usar a analise custo-beneficio: quanto custa a perda de dados vs. quanto custa a prevencao.

---

### Exercicio 4.2 - BIA com dependencias em cascata

**Cenario:** Uma empresa de seguros tem a seguinte cadeia de dependencias:

```
Portal Web do Cliente
        |
        ▼
API de Cotacoes ──────► Base de Dados de Apolices
        |                        |
        ▼                        ▼
Motor de Calculo ◄────── Servico de Dados Atuariais
        |
        ▼
Sistema de Pagamentos ──► Gateway Bancario (externo)
```

O gateway bancario (externo) tem um SLA de 99.9% (disponibilidade).

**Tarefas:**

1. Se a Base de Dados de Apolices falhar, que sistemas sao afetados?
2. Se o Motor de Calculo falhar, os clientes podem ver as suas apolices existentes? Porquem?
3. Define metricas BIA para cada componente interno (6 componentes).
4. O MTD de cada componente deve considerar as dependencias? Como?
5. Qual e o componente mais critico? Porquem?

??? tip "Orientacoes para solucao 4.2"

    **1. Impacto da falha da BD de Apolices:**

    - API de Cotacoes: afetada (nao consegue consultar dados de clientes)
    - Portal Web: afetado (nao mostra apolices nem cotacoes)
    - Motor de Calculo: possivelmente afetado (pode precisar de dados das apolices)
    - Sistema de Pagamentos: parcialmente afetado (nao valida apolices para pagamento)
    - Servico de Dados Atuariais: pode funcionar independentemente

    **2. Falha do Motor de Calculo:**

    - Sim, os clientes podem ver apolices existentes se a BD de Apolices estiver funcional.
    - O Portal Web pode aceder a BD para mostrar dados ja calculados.
    - Nao podem pedir novas cotacoes (depende do Motor).

    **3 e 4. Metricas - regra de ouro:**

    - O MTD de um componente que depende de outro nao pode ser menor que o MTD desse outro.
    - Componentes "folha" (sem dependencias a jusante) podem ter MTD mais longo.
    - A BD de Apolices e o Motor de Calculo sao centrais, logo devem ter MTD mais curto.

    **5. Componente mais critico:**

    - Base de Dados de Apolices - e o componente do qual mais sistemas dependem.
    - A sua falha tem o maior impacto em cascata.

---

## Nota final

Estes exercicios cobrem desde a compreensao basica ate a analise avancada da BIA. A chave e sempre:

1. **Entender o negocio** antes de definir metricas
2. **Validar** que RTO + WRT <= MTD
3. **Considerar dependencias** entre sistemas
4. **Justificar** cada metrica com base no impacto real
5. **Testar** os planos regularmente

---

*Material de apoio: [Metricas BIA](metricas.md) | [Casos praticos](casos-praticos.md) | [Calculadora interativa](calculadora.md)*
