# Metricas da Business Impact Analysis (BIA)

## Indice

1. [Visao geral](#visao-geral)
2. [Definicao das metricas](#definicao-das-metricas)
3. [Relacao entre metricas](#relacao-entre-metricas)
4. [Exemplos praticos](#exemplos-praticos)
5. [Armadilhas e confusoes a evitar](#armadilhas-e-confusoes-a-evitar)
6. [Resumo rapido](#resumo-rapido)

---

## Visao geral

A **Business Impact Analysis (BIA)** e o processo que identifica e avalia os potenciais efeitos de uma interrupcao nas operacoes criticas de uma organizacao. As metricas da BIA permitem quantificar:

- **Quanto dado podemos perder?**
- **Em quanto tempo temos de recuperar?**
- **Qual e o minimo para continuar a operar?**
- **Qual e a fiabilidade dos nossos sistemas?**

---

## Definicao das metricas

### RPO - Recovery Point Objective

> **Quanto dado posso perder?**

O RPO define a **quantidade maxima de dados que a organizacao aceita perder** em caso de incidente, medida em tempo.

- Um RPO de 1 hora significa que a organizacao aceita perder, no maximo, 1 hora de dados.
- Determina a **frequencia dos backups**: se o RPO e de 15 minutos, os backups devem ocorrer pelo menos a cada 15 minutos.
- RPO de zero implica replicacao em tempo real (sincrona).

**Pergunta-chave:** *Se o sistema falhar agora, qual e o ponto mais antigo no tempo a partir do qual aceito perder dados?*

```
Ultimo backup         Falha
     |<--- RPO --->|
     ▼              ▼
─────●──────────────●────────── tempo
     dados salvos   dados perdidos
```

---

### RTO - Recovery Time Objective

> **Em quanto tempo quero recuperar o sistema?**

O RTO define o **tempo-alvo para restaurar o sistema** apos uma falha. Nao inclui a verificacao e normalizacao do trabalho.

- E um objetivo, nao uma garantia.
- Deve ser inferior ao MTD.
- Inclui: detetar a falha, mobilizar equipa, restaurar sistema.

**Pergunta-chave:** *Quanto tempo temos para por o sistema a funcionar novamente?*

---

### WRT - Work Recovery Time

> **Quanto tempo preciso para normalizar o trabalho apos o sistema voltar?**

O WRT cobre o tempo necessario para **verificar dados, testar integridade e retomar operacoes normais** depois de o sistema ser restaurado.

- Inclui: verificacao de dados, testes de integridade, reintroducao de dados perdidos, sincronizacoes.
- O sistema ja esta "up", mas o trabalho ainda nao esta normalizado.

**Regra fundamental:**

```
RTO + WRT <= MTD
```

---

### MTD - Maximum Tolerable Downtime

> **Qual e o maximo total de paragem toleravel?**

O MTD e a **linha vermelha**: o tempo maximo que a organizacao pode tolerar sem operacoes normais antes de sofrer danos inaceitaveis (financeiros, reputacionais, legais, operacionais).

- Se o MTD for ultrapassado, as consequencias tornam-se criticas ou irreversiveis.
- E o limite superior: RTO + WRT devem caber dentro do MTD.

```
        Falha    Sistema volta    Trabalho normalizado
          |          |                    |
          ▼          ▼                    ▼
──────────●──────────●────────────────────●──────────── tempo
          |<- RTO -->|<----- WRT ------->|
          |<------------ MTD (maximo) ------------>|
```

---

### MOR - Minimum Operating Requirements

> **Qual e o minimo para continuar a operar?**

O MOR define os **recursos, processos e capacidades minimas** necessarias para manter as operacoes criticas durante um incidente, mesmo que de forma degradada.

Inclui tipicamente:
- **Sistemas/aplicacoes** minimas necessarias
- **Pessoal** essencial (quem e quantos)
- **Infraestrutura** minima (rede, energia, espaco)
- **Comunicacoes** essenciais
- **Processos manuais** alternativos

**Importante:** MOR **nao** significa operar normalmente. Significa operar no **minimo aceitavel**.

---

### MTBF - Mean Time Between Failures

> **De quanto em quanto tempo o sistema falha?**

O MTBF mede a **fiabilidade** de um sistema - o tempo medio entre falhas consecutivas.

```
MTBF = Tempo total de operacao / Numero de falhas
```

**Exemplo:** Se um servidor operou 8760 horas (1 ano) e teve 4 falhas:
```
MTBF = 8760 / 4 = 2190 horas (~91 dias)
```

- MTBF alto = sistema mais fiavel.
- Util para planeamento de capacidade e substituicao de equipamento.
- Aplica-se sobretudo a componentes **reparaveis**.

---

### MTTR - Mean Time To Repair

> **Quanto tempo demoro, em media, a reparar o sistema?**

O MTTR mede o **tempo medio de reparacao** desde que a falha ocorre ate que o sistema volta a funcionar.

```
MTTR = Tempo total de reparacao / Numero de reparacoes
```

**Exemplo:** Se nas 4 falhas do ano, a reparacao demorou 2h, 1h, 3h e 2h:
```
MTTR = (2 + 1 + 3 + 2) / 4 = 2 horas
```

- MTTR baixo = equipa de resposta eficiente.
- Deve ser sempre inferior ao RTO.

**Relacao com disponibilidade:**

```
Disponibilidade = MTBF / (MTBF + MTTR)
```

No exemplo acima:
```
Disponibilidade = 2190 / (2190 + 2) = 99.91%
```

---

## Relacao entre metricas

### Diagrama temporal

```
                    Falha                Sistema volta       Trabalho normalizado
                      |                       |                        |
                      ▼                       ▼                        ▼
  ════════════════════●═══════════════════════●════════════════════════●════════
                      |<────── RTO ──────────>|<──────── WRT ────────>|
                      |<──────────────── MTD (maximo) ──────────────────────>|
  ◄─── RPO ──────────>|
  (dados que posso     |
   perder)             |
                       |
              MOR: opera no minimo aceitavel durante este periodo
```

### Regras fundamentais

| Regra | Descricao |
|-------|-----------|
| `RTO + WRT <= MTD` | A soma da recuperacao e normalizacao nao pode exceder o maximo toleravel |
| `RPO` determina backups | Quanto menor o RPO, mais frequentes devem ser os backups |
| `MTTR < RTO` | O tempo medio de reparacao deve ser inferior ao objetivo de recuperacao |
| `MOR` aplica-se durante todo o periodo de incidente | Desde a falha ate a normalizacao completa |

### Escala de criticidade tipica

| Criticidade | MTD tipico | Exemplo |
|-------------|-----------|---------|
| Critica | < 1 hora | Sistemas de urgencia hospitalar |
| Alta | 1-8 horas | E-commerce, servicos financeiros |
| Media | 8-24 horas | Email corporativo, sistemas internos |
| Baixa | 24-72 horas | Sistemas de arquivo, relatorios |
| Minima | > 72 horas | Documentacao interna nao critica |

---

## Exemplos praticos

### Exemplo 1 - Loja online (E-commerce)

**Cenario:** O sistema de encomendas de uma plataforma de e-commerce falha as 14h00.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 15 minutos | A empresa aceita perder no maximo 15 minutos de transacoes |
| **RTO** | 1 hora | O sistema tem de voltar em ate 1 hora |
| **WRT** | 2 horas | Apos restauro, sao precisas 2 horas para verificar encomendas, pagamentos e sincronizacoes |
| **MTD** | 4 horas | Acima de 4 horas, o impacto comercial e reputacional torna-se inaceitavel |

**MOR - Operacao minima:**
- Checkout basico funcional
- Acesso a encomendas pendentes
- Comunicacoes com clientes
- Equipa minima de suporte

**Validacao:** `RTO (1h) + WRT (2h) = 3h <= MTD (4h)` ✓

**Explicacao para aula:**

*"A loja pode aceitar perder 15 minutos de dados, mas nao pode ficar parada mais de 4 horas no total. O sistema deve voltar em 1 hora, e depois ainda ha 2 horas de normalizacao. Como 1 + 2 = 3, ainda estamos dentro do MTD de 4 horas."*

---

### Exemplo 2 - Hospital (Servico de urgencia)

**Cenario:** O sistema de apoio a urgencia hospitalar sofre uma falha critica.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | Quase zero | Perda de dados clinicos e inaceitavel - vidas estao em jogo |
| **RTO** | 15 minutos | O sistema tem de voltar em minutos |
| **WRT** | 30 minutos | Verificacao de integridade dos registos clinicos |
| **MTD** | 1 hora | Alem de 1 hora, ha risco direto para a seguranca dos pacientes |

**MOR - Operacao minima:**
- Acesso minimo a dados criticos dos pacientes
- Registo manual temporario (papel)
- Equipa clinica essencial presente
- Comunicacoes internas de emergencia

**Validacao:** `RTO (15min) + WRT (30min) = 45min <= MTD (1h)` ✓

**O que este exemplo mostra:**

Ha servicos em que:
- A perda de dados e **quase inaceitavel**
- O tempo de recuperacao tem de ser **muito curto**
- O **modo degradado** (MOR) tem de estar preparado a partida
- Os custos de infraestrutura redundante justificam-se plenamente

---

### Exemplo 3 - Universidade (Plataforma de matriculas)

**Cenario:** A plataforma de matriculas de uma universidade falha durante o periodo critico de inscricoes.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 1 hora | Perder 1 hora de inscricoes e toleravel, pois podem ser reintroduzidas |
| **RTO** | 2 horas | Tempo aceitavel para restaurar o sistema |
| **WRT** | 4 horas | Verificacao das matriculas, sincronizacao com sistemas academicos |
| **MTD** | 8 horas | Alem de 8 horas, compromete o calendario academico |

**MOR - Operacao minima:**
- Registo temporario de pedidos (manual ou formulario alternativo)
- Acesso minimo a base de dados de alunos
- Apoio de frontoffice presencial
- Comunicacao por email/SMS aos alunos afetados

**Validacao:** `RTO (2h) + WRT (4h) = 6h <= MTD (8h)` ✓

**Comparacao:** A criticidade existe mas nao e tao agressiva como num hospital. Ha margem para processos manuais temporarios.

---

## Armadilhas e confusoes a evitar

### Confusao 1: RPO nao e tempo de recuperacao

> RPO fala de **perda de dados**, nao de quanto tempo demoras a voltar.
> O RPO olha para **tras** (dados ja criados). O RTO olha para a **frente** (quando voltas a operar).

### Confusao 2: RTO nao e o mesmo que MTD

> RTO e o **alvo de recuperacao** (quando o sistema volta).
> MTD e o **limite maximo toleravel** (linha vermelha que nao pode ser ultrapassada).
> O RTO deve ser sempre **inferior** ao MTD.

### Confusao 3: Sistema a funcionar nao significa trabalho recuperado

> Quando o sistema volta, o trabalho **nem sempre esta recuperado**.
> E para isso que serve o **WRT**: verificar dados, testar integridade, sincronizar.
> So depois do WRT e que a operacao esta verdadeiramente normalizada.

### Confusao 4: MOR nao e operacao normal

> MOR significa operar no **minimo aceitavel**, nao no modo habitual.
> E o "modo de sobrevivencia" da organizacao.
> Pode incluir processos manuais, equipa reduzida e funcionalidades limitadas.

### Confusao 5: MTBF e MTTR nao sao o coracao da BIA

> MTBF e MTTR sao **metricas de fiabilidade** uteis, mas o coracao da BIA esta em:
> **RPO, RTO, WRT, MTD e criticidade**.
> MTBF e MTTR ajudam a planear, mas nao definem diretamente o impacto no negocio.

---

## Resumo rapido

| Metrica | Pergunta-chave | Direcao temporal |
|---------|---------------|-----------------|
| **RPO** | Quanto dado posso perder? | Olha para tras |
| **RTO** | Em quanto tempo quero recuperar? | Olha para a frente |
| **WRT** | Quanto tempo preciso para normalizar? | Apos o RTO |
| **MTD** | Maximo total de paragem toleravel? | Limite superior |
| **MOR** | Minimo para continuar a operar? | Durante o incidente |
| **MTBF** | De quanto em quanto tempo falha? | Historico |
| **MTTR** | Quanto tempo demora a reparar? | Historico |

### Frases para usar em aula

- *"RPO mede perda aceitavel de dados; RTO mede tempo-alvo de recuperacao."*
- *"O sistema voltar nao significa que o trabalho esteja recuperado; por isso existe o WRT."*
- *"O MTD e a linha vermelha: se a ultrapassarmos, o impacto torna-se inaceitavel."*
- *"O MOR define o minimo com que ainda conseguimos funcionar."*
- *"RTO + WRT tem de caber dentro do MTD, senao o plano tem um problema."*

### Esquema para o quadro

```
Falha ──► RTO ──► sistema restaurado ──► WRT ──► operacao normal

          |<─────────────── MTD ────────────────>|
                          (limite maximo)

◄── RPO ──► (quanto dado posso perder, olhando para tras)
```

---

*Proximo capitulo: [02-Casos praticos adicionais](02-casos-praticos.md)*
