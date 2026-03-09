# Exercícios - Business Impact Analysis

## Como usar este ficheiro

- Os exercícios estão organizados por nível de dificuldade.
- Tenta resolver cada exercício **antes** de consultar a solução.
- As soluções estão no final de cada exercício, dentro de blocos colapsaveis.

---

## Nível 1 - Compreensao das métricas

### Exercício 1.1 - Identificar a métrica

Para cada descricao, identifica a métrica BIA correspondente (RPO, RTO, WRT, MTD, MOR, MTBF, MTTR):

| # | Descricao | Métrica? |
|---|-----------|----------|
| a) | "O servidor web falha em média uma vez a cada 60 dias" | |
| b) | "Depois de restaurar o sistema, precisamos de 3 horas para verificar todos os dados" | |
| c) | "Não podemos ficar sem o sistema de faturação por mais de 6 horas" | |
| d) | "Aceitamos perder no máximo 30 minutos de transações" | |
| e) | "Quando falha, a equipa de TI demora em média 45 minutos a resolver" | |
| f) | "No mínimo, precisamos de acesso ao email e ao ERP" | |
| g) | "Temos de ter o sistema a funcionar novamente em 2 horas" | |

??? success "Solução 1.1"

    | # | Descricao | Métrica |
    |---|-----------|---------|
    | a) | Servidor falha a cada 60 dias | **MTBF** (Mean Time Between Failures) |
    | b) | 3 horas para verificar dados após restauro | **WRT** (Work Recovery Time) |
    | c) | Não pode ficar sem sistema mais de 6 horas | **MTD** (Maximum Tolerable Downtime) |
    | d) | Aceita perder 30 minutos de transações | **RPO** (Recovery Point Objective) |
    | e) | Equipa demora 45 minutos a resolver | **MTTR** (Mean Time To Repair) |
    | f) | Precisa no mínimo de email e ERP | **MOR** (Minimum Operating Requirements) |
    | g) | Sistema a funcionar em 2 horas | **RTO** (Recovery Time Objective) |

---

### Exercício 1.2 - Verdadeiro ou Falso

Indica se cada afirmacao e verdadeira (V) ou falsa (F) e justifica as falsas:

1. O RPO mede o tempo que demoras a recuperar o sistema.
2. O RTO deve ser sempre inferior ao MTD.
3. Quando o sistema volta a funcionar, o trabalho está automaticamente recuperado.
4. O MOR define o nível normal de operação durante um incidente.
5. MTBF alto significa que o sistema é mais fiável.
6. RTO + WRT deve ser menor ou igual ao MTD.
7. Um RPO de zero significa que não são necessários backups.

??? success "Solução 1.2"

    1. **FALSO** - O RPO mede a quantidade máxima de dados que se aceita perder, não o tempo de recuperação. Isso e o RTO.
    2. **VERDADEIRO** - O RTO e o objetivo de recuperação é deve estar contido dentro do MTD (limite máximo).
    3. **FALSO** - O sistema pode estar operacional, mas os dados podem precisar de verificação é sincronizacao. Para isso existe o WRT.
    4. **FALSO** - O MOR define o **mínimo aceitável**, não o nível normal. E o "modo de sobrevivencia".
    5. **VERDADEIRO** - MTBF alto indica mais tempo entre falhas, logo maior fiabilidade.
    6. **VERDADEIRO** - Esta e a regra fundamental: RTO + WRT <= MTD.
    7. **FALSO** - RPO de zero significa que **nenhum dado pode ser perdido**, o que exige replicação em tempo real (sincrona), não a ausência de backups. Backups continuam a ser necessários para outros cenários (corrupção de dados, por exemplo).

---

## Nível 2 - Aplicação prática

### Exercício 2.1 - Validar o plano

Uma empresa de contabilidade definiu as seguintes métricas para o seu sistema de faturação:

- RPO: 2 horas
- RTO: 5 horas
- WRT: 4 horas
- MTD: 8 horas

**Pergunta:** Ha algum problema com estas métricas? Se sim, qual e como o resolverias?

??? success "Solução 2.1"

    **Sim, há um problema.**

    `RTO (5h) + WRT (4h) = 9h > MTD (8h)`

    A soma do RTO e WRT excede o MTD, o que significa que o plano não é viavel. A empresa não consegue cumprir o limite máximo de paragem.

    **Possiveis soluções:**

    1. Reduzir o RTO (ex.: investir em infraestrutura para recuperação mais rápida)
    2. Reduzir o WRT (ex.: automatizar verificacoes pós-restauro)
    3. Aumentar o MTD (ex.: reavaliar se a tolerância real e maior)
    4. Combinacao das três opcoes

    A solução correta depende de uma **análise custo-benefício**: quanto custa reduzir o RTO vs. o custo do impacto no negocio.

---

### Exercício 2.2 - Definir métricas para um cenário

**Cenário:** Es o responsável de TI de uma clínica veterinaria com 3 médicos e 2 assistentes. A clínica usa um sistema informatico para:

- Registos clínicos dos animais
- Agendamento de consultas
- Faturacao e recibos
- Stock de medicamentos

O sistema corre num servidor local. Os backups são feitos todas as noites as 23h00.

**Tarefas:**

1. Define valores razoaveis para RPO, RTO, WRT e MTD.
2. Define o MOR da clínica.
3. O backup atual (diario as 23h) e adequado ao teu RPO? Justifica.
4. Calcula: se o servidor falha em média 3 vezes por ano e cada reparação demora em média 2 horas, quais são o MTBF e o MTTR?

??? success "Solução 2.2"

    **1. Métricas (valores razoaveis - podem variar):**

    | Métrica | Valor | Justificação |
    |---------|-------|-------------|
    | RPO | 4 horas | Registos clínicos podem ser reconstruidos a partir de notas manuais |
    | RTO | 3 horas | A clínica pode operar em papel durante esse período |
    | WRT | 2 horas | Reintroduzir consultas do dia, verificar faturação |
    | MTD | 8 horas | Além de um dia de trabalho, o impacto é significativo |

    **Validação:** `RTO (3h) + WRT (2h) = 5h <= MTD (8h)` ✓

    **2. MOR:**

    - Acesso manual as fichas dos pacientes (ficheiro em papel ou PDF local)
    - Agenda impressa do dia
    - Faturacao manual (recibos em papel)
    - Telefone funcional para contacto com clientes
    - Pelo menos 1 médico e 1 assistente

    **3. Adequacao do backup:**

    O backup diario as 23h significa que, na pior das hipóteses (falha as 22h59), podes perder quase 24 horas de dados. Com um RPO de 4 horas, o backup atual **não é adequado**.

    **Solução:** Implementar backups a cada 4 horas (ou mais frequentes), ou usar replicação incremental ao longo do dia.

    **4. MTBF e MTTR:**

    - Supondo funcionamento 10h/dia, 250 dias/ano = 2500 horas/ano
    - `MTBF = 2500 / 3 = 833 horas (~35 dias)`
    - `MTTR = (2 + 2 + 2) / 3 = 2 horas`
    - `Disponibilidade = 833 / (833 + 2) = 99.76%`

---

### Exercício 2.3 - Comparar criticidades

Ordena os seguintes serviços do mais crítico (menor MTD) ao menos crítico (maior MTD) e justifica:

1. Sistema de email de uma consultora
2. Sistema de monitorização de pacientes em cuidados intensivos
3. Website institucional de uma autarquia
4. Plataforma de trading de um banco de investimento
5. Sistema de reservas de um restaurante

??? success "Solução 2.3"

    **Do mais crítico ao menos crítico:**

    1. **Sistema de monitorização de pacientes em cuidados intensivos** (MTD: ~15 min) - Vidas humanas em risco direto. Qualquer paragem pode ser fatal.
    2. **Plataforma de trading de um banco de investimento** (MTD: ~30 min) - Perdas financeiras massivas por segundo de indisponibilidade. Regulacao exige alta disponibilidade.
    3. **Sistema de email de uma consultora** (MTD: ~4-8h) - Comunicação com clientes e crítica, mas existem alternativas (telefone, WhatsApp).
    4. **Sistema de reservas de um restaurante** (MTD: ~12-24h) - Reservas podem ser feitas por telefone. Impacto limitado num dia.
    5. **Website institucional de uma autarquia** (MTD: ~48-72h) - Carater informativo, não transacional. Os serviços críticos são prestados presencialmente.

    **Nota:** Esta classificação pode variar conforme o contexto. Por exemplo, durante uma pandemia, o website da autarquia poderia ser muito mais crítico.

---

## Nível 3 - Análise avancada

### Exercício 3.1 - Cenário com MTBF e MTTR

Uma empresa de hosting tem os seguintes dados dos últimos 12 meses para o seu cluster de servidores:

| Falha | Data | Duracao da reparação |
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
5. Se a empresa quer cumprir o SLA, que MTTR máximo pode aceitar (mantendo o MTBF atual)?

??? success "Solução 3.1"

    **1. MTBF:**

    - Horas totais de operação: 365 x 24 = 8760 horas
    - Tempo total em reparação: 1.5 + 0.75 + 3.25 + 2 + 1 + 4.5 = 13 horas
    - Tempo efetivo de operação: 8760 - 13 = 8747 horas
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

    **5. MTTR máximo para cumprir o SLA:**

    - Precisamos: `MTBF / (MTBF + MTTR) >= 0.9995`
    - `1457.8 / (1457.8 + MTTR) >= 0.9995`
    - `1457.8 >= 0.9995 x (1457.8 + MTTR)`
    - `1457.8 >= 1457.07 + 0.9995 x MTTR`
    - `0.73 >= 0.9995 x MTTR`
    - `MTTR <= 0.73 horas = 43.8 minutos`

    Para cumprir o SLA com 6 falhas/ano, cada reparação teria de demorar no máximo ~44 minutos em média.

---

### Exercício 3.2 - Análise de custo-benefício

Uma empresa de e-commerce fatura em média 50.000 EUR por hora. Atualmente tem:

- RTO: 4 horas
- WRT: 2 horas
- MTD: 8 horas
- Ocorrem em média 3 incidentes por ano

Uma proposta de investimento permite reduzir o RTO para 1 hora, com um custo de 120.000 EUR por ano (infraestrutura redundante + equipa).

**Tarefas:**

1. Calcula a perda anual estimada com as métricas atuais.
2. Calcula a perda anual estimada com as novas métricas.
3. O investimento justifica-se? Mostra os cálculos.
4. A partir de que faturação horaria e que o investimento se justifica?

??? success "Solução 3.2"

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

    **3. Justificação do investimento:**

    - Poupanca anual (simplificado): 900.000 - 450.000 = 450.000 EUR
    - Poupanca anual (realista): 750.000 - 300.000 = 450.000 EUR
    - Custo do investimento: 120.000 EUR/ano
    - **ROI: 450.000 - 120.000 = 330.000 EUR de benefício liquido por ano**
    - **Sim, o investimento justifica-se claramente.**

    **4. Faturacao mínima para justificar:**

    - Precisa-se que a poupanca >= custo do investimento
    - Poupanca por incidente = 3h x faturacao_hora (diferença no RTO)
    - Poupanca anual = 3 incidentes x 3h x faturacao_hora = 9 x faturacao_hora
    - 9 x faturacao_hora >= 120.000
    - **faturacao_hora >= 13.333 EUR/hora**
    - A partir de ~13.333 EUR/hora de faturação, o investimento compensa.

---

### Exercício 3.3 - Definir BIA completa

**Cenário:** Es contratado como consultor de ciberseguranca por uma PME portuguesa de comércio alimentar que tem:

- 5 lojas físicas
- 1 armazem central
- 1 loja online (10% da faturação)
- 50 colaboradores
- Sistema ERP centralizado (gestão de stock, faturação, RH)
- POS (Point of Sale) em cada loja

A empresa fatura 2 milhoes EUR por ano.

**Tarefas:**

1. Identifica os 4 processos/sistemas mais críticos e justifica.
2. Para cada processo/sistema, define RPO, RTO, WRT, MTD e MOR.
3. Prioriza os sistemas por ordem de criticidade.
4. Identifica dependências entre sistemas (ex.: se o ERP falha, o que mais e afetado?).
5. Define a frequência de backups adequada para cada sistema.

??? tip "Orientações para solução 3.3"

    **Nota:** Este exercício não tem uma única solução correta. O objetivo é que os alunos justifiquem as suas escolhas. Abaixo estão orientações.

    **1. Sistemas críticos (sugestao):**

    - **Sistema POS** - sem POS não há vendas nas lojas (90% da faturação)
    - **ERP (módulo de stock)** - sem stock atualizado, há ruturas e encomendas erradas
    - **Loja online** - 10% da faturação, mas visível 24/7
    - **ERP (módulo de faturação)** - obrigação fiscal de emitir faturas

    **2. Exemplo de métricas:**

    | Sistema | RPO | RTO | WRT | MTD |
    |---------|-----|-----|-----|-----|
    | POS | 15 min | 30 min | 1h | 2h |
    | ERP (stock) | 1h | 2h | 2h | 6h |
    | Loja online | 1h | 2h | 3h | 8h |
    | ERP (faturação) | 30 min | 1h | 2h | 4h |

    **3. Prioridade:** POS > ERP faturação > ERP stock > Loja online

    **4. Dependencias:**

    - POS depende do ERP para stock e preços
    - Loja online depende do ERP para stock disponível
    - Faturacao depende do POS para dados de venda
    - Stock depende dos registos de ambos os canais

    **5. Frequência de backups:**

    - POS: a cada 15 minutos (replicação)
    - ERP faturação: a cada 30 minutos
    - ERP stock: horario
    - Loja online: horario

---

## Nível 4 - Desafio

### Exercício 4.1 - O caso do RPO impossível

Uma startup quer RPO de zero para todos os seus sistemas, mas tem um orcamento de TI de 500 EUR/mês.

**Tarefas:**

1. Explica porque e que este objetivo é irrealista.
2. Que infraestrutura seria necessária para RPO de zero?
3. Propoe métricas realistas para uma startup com este orcamento.
4. Como comunicarias está limitação ao CEO da startup?

??? tip "Orientações para solução 4.1"

    **1. Porque e irrealista:**

    - RPO zero requer replicação sincrona em tempo real
    - Isto exige: servidores redundantes, storage replicado, rede dedicada, possivelmente infraestrutura geo-distribuida
    - Custo mínimo: milhares de euros/mês, não centenas

    **2. Infraestrutura necessária:**

    - Base de dados com replicação sincrona (ex.: PostgreSQL com streaming replication)
    - Servidores em cluster ativo-ativo ou ativo-passivo
    - Storage redundante (RAID + replicação remota)
    - Rede redundante
    - Datacenter secundário ou cloud com replicação
    - Custo estimado: 2.000-10.000 EUR/mês (ou mais)

    **3. Métricas realistas para 500 EUR/mês:**

    - RPO: 1-4 horas (backups frequentes para cloud)
    - RTO: 4-8 horas (restauro a partir de backup)
    - Serviços cloud como AWS/Azure/GCP oferecem opcoes neste range de preço

    **4. Comunicação ao CEO:**

    - "RPO zero e o nosso objetivo ideal, mas tem um custo. Com o orcamento atual, podemos garantir perda máxima de X horas de dados. Para reduzir para zero, o investimento mensal seria de aproximadamente Y euros. Recomendo comecarmos com Z e ir melhorando progressivamente conforme a empresa cresce."
    - Usar a análise custo-benefício: quanto custa a perda de dados vs. quanto custa a prevenção.

---

### Exercício 4.2 - BIA com dependências em cascata

**Cenário:** Uma empresa de seguros tem a seguinte cadeia de dependências:

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

1. Se a Base de Dados de Apolices falhar, que sistemas são afetados?
2. Se o Motor de Cálculo falhar, os clientes podem ver as suas apólices existentes? Porque?
3. Define métricas BIA para cada componente interno (6 componentes).
4. O MTD de cada componente deve considerar as dependências? Como?
5. Qual e o componente mais crítico? Porque?

??? tip "Orientações para solução 4.2"

    **1. Impacto da falha da BD de Apolices:**

    - API de Cotacoes: afetada (não consegue consultar dados de clientes)
    - Portal Web: afetado (não mostra apólices nem cotacoes)
    - Motor de Cálculo: possivelmente afetado (pode precisar de dados das apólices)
    - Sistema de Pagamentos: parcialmente afetado (não valida apólices para pagamento)
    - Serviço de Dados Atuariais: pode funcionar independentemente

    **2. Falha do Motor de Cálculo:**

    - Sim, os clientes podem ver apólices existentes se a BD de Apolices estiver funcional.
    - O Portal Web pode aceder a BD para mostrar dados já calculados.
    - Não podem pedir novas cotacoes (depende do Motor).

    **3 e 4. Métricas - regra de ouro:**

    - O MTD de um componente que depende de outro não pode ser menor que o MTD desse outro.
    - Componentes "folha" (sem dependências a jusante) podem ter MTD mais longo.
    - A BD de Apolices e o Motor de Cálculo são centrais, logo devem ter MTD mais curto.

    **5. Componente mais crítico:**

    - Base de Dados de Apolices - e o componente do qual mais sistemas dependem.
    - A sua falha tem o maior impacto em cascata.

---

## Nota final

Estes exercícios cobrem desde a compreensao básica até a análise avancada da BIA. A chave e sempre:

1. **Entender o negocio** antes de definir métricas
2. **Validar** que RTO + WRT <= MTD
3. **Considerar dependências** entre sistemas
4. **Justificar** cada métrica com base no impacto real
5. **Testar** os planos regularmente

---

*Material de apoio: [Métricas BIA](metricas.md) | [Casos práticos](casos-praticos.md) | [Calculadora interativa](calculadora.md)*

*Próximo capitulo: [Calculadora Interativa](calculadora.md)*
