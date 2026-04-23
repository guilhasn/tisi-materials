# Métricas da Business Impact Analysis (BIA)

## Índice

1. [Visão geral](#visao-geral)
2. [Definição das métricas](#definicao-das-metricas)
3. [Relação entre métricas](#relacao-entre-metricas)
4. [Exemplos práticos](#exemplos-praticos)
5. [Armadilhas e confusões a evitar](#armadilhas-e-confusoes-a-evitar)
6. [Resumo rápido](#resumo-rapido)

---

## Visão geral

A **Business Impact Analysis (BIA)** e o processo que identifica e avalia os potenciais efeitos de uma interrupção nas operações críticas de uma organização. As métricas da BIA permitem quantificar:

- **Quanto dado podemos perder?**
- **Em quanto tempo temos de recuperar?**
- **Qual e o mínimo para continuar a operar?**
- **Qual e a fiabilidade dos nossos sistemas?**

---

## Definição das métricas

### RPO - Recovery Point Objective

> **Quanto dado posso perder?**

O RPO define a **quantidade máxima de dados que a organização aceita perder** em caso de incidente, medida em tempo.

- Um RPO de 1 hora significa que a organização aceita perder, no máximo, 1 hora de dados.
- Determina a **frequência dos backups**: se o RPO e de 15 minutos, os backups devem ocorrer pelo menos a cada 15 minutos.
- RPO de zero implica replicação em tempo real (sincrona).

**Pergunta-chave:** *Se o sistema falhar agora, qual e o ponto mais antigo no tempo a partir do qual aceito perder dados?*

```
Último backup         Falha
     |<--- RPO --->|
     ▼              ▼
─────●──────────────●────────── tempo
     dados salvos   dados perdidos
```

---

### RTO - Recovery Time Objective

> **Em quanto tempo quero recuperar o sistema?**

O RTO define o **tempo-alvo para restaurar o sistema** após uma falha. Não inclui a verificação e normalização do trabalho.

- E um objetivo, não uma garantia.
- Deve ser inferior ao MTD.
- Inclui: detetar a falha, mobilizar equipa, restaurar sistema.

**Pergunta-chave:** *Quanto tempo temos para por o sistema a funcionar novamente?*

---

### WRT - Work Recovery Time

> **Quanto tempo preciso para normalizar o trabalho após o sistema voltar?**

O WRT cobre o tempo necessário para **verificar dados, testar integridade e retomar operações normais** depois de o sistema ser restaurado.

- Inclui: verificação de dados, testes de integridade, reintrodução de dados perdidos, sincronizações.
- O sistema já está "up", mas o trabalho ainda não está normalizado.

**Regra fundamental:**

```
RTO + WRT <= MTD
```

---

### MTD - Maximum Tolerable Downtime

> **Qual e o máximo total de paragem tolerável?**

O MTD e a **linha vermelha**: o tempo máximo que a organização pode tolerar sem operações normais antes de sofrer danos inaceitáveis (financeiros, reputacionais, legais, operacionais).

- Se o MTD for ultrapassado, as consequências tornam-se críticas ou irreversíveis.
- E o limite superior: RTO + WRT devem caber dentro do MTD.

```
        Falha    Sistema volta    Trabalho normalizado
          |          |                    |
          ▼          ▼                    ▼
──────────●──────────●────────────────────●──────────── tempo
          |<- RTO -->|<----- WRT ------->|
          |<------------ MTD (máximo) ------------>|
```

---

### MOR - Minimum Operating Requirements

> **Qual e o mínimo para continuar a operar?**

O MOR define os **recursos, processos e capacidades mínimas** necessárias para manter as operações críticas durante um incidente, mesmo que de forma degradada.

Inclui tipicamente:
- **Sistemas/aplicações** mínimas necessárias
- **Pessoal** essencial (quem e quantos)
- **Infraestrutura** mínima (rede, energia, espaço)
- **Comunicacoes** essenciais
- **Processos manuais** alternativos

**Importante:** MOR **não** significa operar normalmente. Significa operar no **mínimo aceitável**.

---

### MTBF - Mean Time Between Failures

> **De quanto em quanto tempo o sistema falha?**

O MTBF mede a **fiabilidade** de um sistema - o tempo médio entre falhas consecutivas.

```
MTBF = Tempo total de operação / Número de falhas
```

**Exemplo:** Se um servidor operou 8760 horas (1 ano) e teve 4 falhas:
```
MTBF = 8760 / 4 = 2190 horas (~91 dias)
```

- MTBF alto = sistema mais fiável.
- Útil para planeamento de capacidade e substituição de equipamento.
- Aplica-se sobretudo a componentes **reparáveis**.

---

### MTTR - Mean Time To Repair

> **Quanto tempo demoro, em média, a reparar o sistema?**

O MTTR mede o **tempo médio de reparação** desde que a falha ocorre até que o sistema volta a funcionar.

```
MTTR = Tempo total de reparação / Número de reparações
```

**Exemplo:** Se nas 4 falhas do ano, a reparação demorou 2h, 1h, 3h e 2h:
```
MTTR = (2 + 1 + 3 + 2) / 4 = 2 horas
```

- MTTR baixo = equipa de resposta eficiente.
- Deve ser sempre inferior ao RTO.

**Relação com disponibilidade:**

```
Disponibilidade = MTBF / (MTBF + MTTR)
```

No exemplo acima:
```
Disponibilidade = 2190 / (2190 + 2) = 99.91%
```

---

## Relação entre métricas

### Diagrama temporal

```
                    Falha                Sistema volta       Trabalho normalizado
                      |                       |                        |
                      ▼                       ▼                        ▼
  ════════════════════●═══════════════════════●════════════════════════●════════
                      |<────── RTO ──────────>|<──────── WRT ────────>|
                      |<──────────────── MTD (máximo) ──────────────────────>|
  ◄─── RPO ──────────>|
  (dados que posso     |
   perder)             |
                       |
              MOR: opera no mínimo aceitável durante este período
```

### Regras fundamentais

| Regra | Descrição |
|-------|-----------|
| `RTO + WRT <= MTD` | A soma da recuperação e normalização não pode exceder o máximo tolerável |
| `RPO` determina backups | Quanto menor o RPO, mais frequentes devem ser os backups |
| `MTTR < RTO` | O tempo médio de reparação deve ser inferior ao objetivo de recuperação |
| `MOR` aplica-se durante todo o período de incidente | Desde a falha até a normalização completa |

### Escala de criticidade típica

| Criticidade | MTD típico | Exemplo |
|-------------|-----------|---------|
| Crítica | < 1 hora | Sistemas de urgência hospitalar |
| Alta | 1-8 horas | E-commerce, serviços financeiros |
| Media | 8-24 horas | Email corporativo, sistemas internos |
| Baixa | 24-72 horas | Sistemas de arquivo, relatórios |
| Mínima | > 72 horas | Documentação interna não crítica |

---

## Exemplos práticos

### Exemplo 1 - Loja online (E-commerce)

**Cenário:** O sistema de encomendas de uma plataforma de e-commerce falha as 14h00.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 15 minutos | A empresa aceita perder no máximo 15 minutos de transações |
| **RTO** | 1 hora | O sistema tem de voltar em até 1 hora |
| **WRT** | 2 horas | Após restauro, são precisas 2 horas para verificar encomendas, pagamentos e sincronizações |
| **MTD** | 4 horas | Acima de 4 horas, o impacto comercial e reputacional torna-se inaceitável |

**MOR - Operação mínima:**
- Checkout básico funcional
- Acesso a encomendas pendentes
- Comunicacoes com clientes
- Equipa mínima de suporte

**Validação:** `RTO (1h) + WRT (2h) = 3h <= MTD (4h)` ✓

**Como interpretar:**

*A loja pode aceitar perder 15 minutos de dados, mas não pode ficar parada mais de 4 horas no total. O sistema deve voltar em 1 hora, e depois ainda há 2 horas de normalização. Como 1 + 2 = 3, ainda estamos dentro do MTD de 4 horas.*

---

### Exemplo 2 - Hospital (Serviço de urgência)

**Cenário:** O sistema de apoio a urgência hospitalar sofre uma falha crítica.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | Quase zero | Perda de dados clínicos e inaceitável - vidas estão em jogo |
| **RTO** | 15 minutos | O sistema tem de voltar em minutos |
| **WRT** | 30 minutos | Verificação de integridade dos registos clínicos |
| **MTD** | 1 hora | Além de 1 hora, há risco direto para a segurança dos pacientes |

**MOR - Operação mínima:**
- Acesso mínimo a dados críticos dos pacientes
- Registo manual temporário (papel)
- Equipa clínica essencial presente
- Comunicacoes internas de emergência

**Validação:** `RTO (15min) + WRT (30min) = 45min <= MTD (1h)` ✓

**Conclusão:** Ha serviços em que:
- A perda de dados e **quase inaceitável**
- O tempo de recuperação tem de ser **muito curto**
- O **modo degradado** (MOR) tem de estar preparado a partida
- Os custos de infraestrutura redundante justificam-se plenamente

---

### Exemplo 3 - Universidade (Plataforma de matrículas)

**Cenário:** A plataforma de matrículas de uma universidade falha durante o período crítico de inscrições.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 1 hora | Perder 1 hora de inscrições e tolerável, pois podem ser reintroduzidas |
| **RTO** | 2 horas | Tempo aceitável para restaurar o sistema |
| **WRT** | 4 horas | Verificação das matrículas, sincronização com sistemas académicos |
| **MTD** | 8 horas | Além de 8 horas, compromete o calendário académico |

**MOR - Operação mínima:**
- Registo temporário de pedidos (manual ou formulário alternativo)
- Acesso mínimo a base de dados de alunos
- Apoio de frontoffice presencial
- Comunicação por email/SMS aos alunos afetados

**Validação:** `RTO (2h) + WRT (4h) = 6h <= MTD (8h)` ✓

**Comparação:** A criticidade existe mas não é tao agressiva como num hospital. Ha margem para processos manuais temporários.

---

## Armadilhas e confusões a evitar

### Confusão 1: RPO não é tempo de recuperação

> RPO fala de **perda de dados**, não de quanto tempo demoras a voltar.
> O RPO olha para **tras** (dados já criados). O RTO olha para a **frente** (quando voltas a operar).

### Confusão 2: RTO não é o mesmo que MTD

> RTO e o **alvo de recuperação** (quando o sistema volta).
> MTD e o **limite máximo tolerável** (linha vermelha que não pode ser ultrapassada).
> O RTO deve ser sempre **inferior** ao MTD.

### Confusão 3: Sistema a funcionar não significa trabalho recuperado

> Quando o sistema volta, o trabalho **nem sempre está recuperado**.
> E para isso que serve o **WRT**: verificar dados, testar integridade, sincronizar.
> Só depois do WRT e que a operação está verdadeiramente normalizada.

### Confusão 4: MOR não é operação normal

> MOR significa operar no **mínimo aceitável**, não no modo habitual.
> E o "modo de sobrevivência" da organização.
> Pode incluir processos manuais, equipa reduzida e funcionalidades limitadas.

### Confusão 5: MTBF e MTTR não são o coração da BIA

> MTBF e MTTR são **métricas de fiabilidade** úteis, mas o coração da BIA está em:
> **RPO, RTO, WRT, MTD e criticidade**.
> MTBF e MTTR ajudam a planear, mas não definem diretamente o impacto no negócio.

---

## Resumo rápido

| Métrica | Pergunta-chave | Direção temporal |
|---------|---------------|-----------------|
| **RPO** | Quanto dado posso perder? | Olha para tras |
| **RTO** | Em quanto tempo quero recuperar? | Olha para a frente |
| **WRT** | Quanto tempo preciso para normalizar? | Após o RTO |
| **MTD** | Máximo total de paragem tolerável? | Limite superior |
| **MOR** | Mínimo para continuar a operar? | Durante o incidente |
| **MTBF** | De quanto em quanto tempo falha? | Histórico |
| **MTTR** | Quanto tempo demora a reparar? | Histórico |

### Frases-chave para recordar

- *"RPO mede perda aceitável de dados; RTO mede tempo-alvo de recuperação."*
- *"O sistema voltar não significa que o trabalho esteja recuperado; por isso existe o WRT."*
- *"O MTD e a linha vermelha: se a ultrapassarmos, o impacto torna-se inaceitável."*
- *"O MOR define o mínimo com que ainda conseguimos funcionar."*
- *"RTO + WRT tem de caber dentro do MTD, senao o plano tem um problema."*

### Diagrama de sintese

```
Falha ──► RTO ──► sistema restaurado ──► WRT ──► operação normal

          |<─────────────── MTD ────────────────>|
                          (limite máximo)

◄── RPO ──► (quanto dado posso perder, olhando para tras)
```

---

:material-file-download: **Modelos BIA:** [Templates e exemplos para download](https://github.com/guilhasn/tisi-materials/tree/main/BIA/Modelos){:target="_blank"}

*Próximo capítulo: [Casos práticos adicionais](casos-praticos.md)*

---

## 📋 Templates

Consulte os templates disponíveis para apoio à elaboração do BIA:

[:material-file-document-outline: Aceder aos Templates](https://github.com/guilhasn/tisi-materials/tree/main/TEMPLATES){ .md-button .md-button--primary target="_blank" }
