# Casos Práticos de BCP

## Índice

1. [Caso 1 — Seguradora: pandemia obriga a operação remota total](#caso-1-seguradora-pandemia-obriga-a-operacao-remota-total)
2. [Caso 2 — Hospital: sismo danifica infraestrutura crítica](#caso-2-hospital-sismo-danifica-infraestrutura-critica)
3. [Caso 3 — Banco: falha do fornecedor cloud](#caso-3-banco-falha-do-fornecedor-cloud)
4. [Caso 4 — Município: inundação destrói edifício de serviços](#caso-4-municipio-inundacao-destroi-edificio-de-servicos)
5. [Caso 5 — Indústria alimentar: ataque à cadeia de fornecimento](#caso-5-industria-alimentar-ataque-a-cadeia-de-fornecimento)

---

Cada caso segue a mesma estrutura: **Contexto → Classificação → Ativação do BCP → Operação alternativa → Recuperação → Lições aprendidas**.

---

## Caso 1 — Seguradora: pandemia obriga a operação remota total

### Contexto

Uma seguradora com 1.200 colaboradores, sede em Lisboa e 15 agências pelo país. Opera com um datacenter próprio e um warm site contratado a 50 km.

O BCP previa cenários de incêndio, inundação e ciberataque. Não previa um cenário de **pandemia** que impedisse o acesso físico a todos os edifícios simultaneamente.

### Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de disrupção** | Pandemia — confinamento obrigatório |
| **Categoria** | Desastre (disrupção total do modelo operacional presencial) |
| **Impacto** | Todos os edifícios inacessíveis; pessoal em casa; clientes sem atendimento |
| **MTD das funções críticas** | Processamento de sinistros: 24h; Apoio ao cliente: 4h |

### Ativação do BCP

```
  ┌─────────────────────────────────────────────────────────────┐
  │     CRONOLOGIA DA ATIVAÇÃO                                    │
  │                                                              │
  │  Dia 1:  Governo declara estado de emergência.               │
  │          CEO convoca reunião de crise (videoconferência).     │
  │          Coordenador BCP ativa plano — mas cenário não        │
  │          estava previsto no documento.                        │
  │                                                              │
  │  Dia 2:  Equipa TI distribui 400 portáteis reserva.          │
  │          VPN corporativa escalada de 200 para 1.200 acessos. │
  │          Problemas: largura de banda insuficiente.            │
  │                                                              │
  │  Dia 3:  Call center redirecionado para softphone em casa.   │
  │          Processamento de sinistros retomado (modo reduzido). │
  │                                                              │
  │  Dia 7:  80% dos colaboradores operacionais remotamente.     │
  │          20% sem condições técnicas em casa (sem PC/internet).│
  │                                                              │
  │  Dia 14: Operação estabilizada a 70% da capacidade.          │
  │          Soluções provisórias para os 20% restantes.          │
  │                                                              │
  │  Mês 3:  Operação remota normalizada a 95%.                  │
  └─────────────────────────────────────────────────────────────┘
```

### Operação alternativa

| Função | Solução adotada | Tempo de ativação | Eficácia |
|--------|-----------------|-------------------|----------|
| Processamento de sinistros | VPN + acesso remoto ao sistema central | 3 dias | 85% |
| Apoio ao cliente (telefone) | Softphone + headset em casa | 3 dias | 70% (qualidade áudio variável) |
| Atendimento presencial (agências) | Encerrado → migrado para online/telefone | 1 semana | 60% |
| Subscrição de apólices | Assinatura digital implementada de urgência | 2 semanas | 90% |
| Gestão financeira | Acesso remoto aos sistemas SAP | 2 dias | 95% |

### Recuperação

O regresso à operação presencial foi faseado ao longo de 3 meses, com modelo híbrido permanente adotado como nova norma.

### Lições aprendidas

| Lição | Ação no BCP revisto |
|-------|-------------------|
| Cenário de pandemia não estava previsto | Incluir cenário de "impossibilidade de acesso generalizada" no BCP |
| VPN não escalava para toda a organização | Investir em infraestrutura VPN escalável ou migrar para soluções cloud |
| 20% dos colaboradores sem condições em casa | Programa de equipamento para trabalho remoto (portátil + internet móvel) |
| Assinatura digital não existia | Implementar assinatura digital como processo padrão (não apenas emergência) |
| Warm site físico era irrelevante neste cenário | Diversificar estratégias — nem todos os desastres se resolvem com site alternativo |

---

## Caso 2 — Hospital: sismo danifica infraestrutura crítica

### Contexto

Hospital regional com 350 camas, 1.500 colaboradores e um datacenter on-premises. O BCP estava implementado com certificação ISO 22301. Hot site contratado a 80 km. Acordo com hospital universitário a 120 km para transferência de pacientes.

### Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de disrupção** | Sismo de magnitude 5.8 |
| **Categoria** | Desastre (danos estruturais, sistemas parcialmente inoperacionais) |
| **Impacto** | Ala B encerrada (danos estruturais); datacenter com danos parciais; gerador operacional |
| **Prioridade absoluta** | Segurança dos pacientes |

### Ativação do BCP

```
  ┌─────────────────────────────────────────────────────────────┐
  │     CRONOLOGIA DA RESPOSTA                                    │
  │                                                              │
  │  T+0 min:  Sismo. Alarme de emergência automático.           │
  │            Evacuação parcial (Ala B).                         │
  │                                                              │
  │  T+10 min: Diretor clínico ativa plano de emergência         │
  │            hospitalar. Triagem de pacientes.                  │
  │                                                              │
  │  T+30 min: Avaliação estrutural preliminar. Ala B            │
  │            declarada insegura. Alas A e C operacionais.       │
  │                                                              │
  │  T+45 min: Coordenador BCP (Administrador hospitalar)        │
  │            DECLARA DESASTRE. Ativa BCP + DRP.                │
  │                                                              │
  │  T+1h:     Início de transferência dos 85 pacientes          │
  │            da Ala B para Alas A/C e hospital parceiro.        │
  │                                                              │
  │  T+2h:     50 pacientes redistribuídos internamente.         │
  │            35 pacientes em transferência para hospital        │
  │            parceiro (ambulâncias + helicóptero).              │
  │                                                              │
  │  T+4h:     Sistema clínico eletrónico migrado para hot       │
  │            site (dados de pacientes acessíveis).              │
  │                                                              │
  │  T+6h:     Comunicação formal a ARS, famílias, média.        │
  │                                                              │
  │  T+12h:    Hospital a operar a 60% de capacidade             │
  │            (Alas A + C + hospital parceiro).                  │
  └─────────────────────────────────────────────────────────────┘
```

### Operação alternativa

| Função | Solução | Observações |
|--------|---------|-------------|
| **Cuidados intensivos** | Mantidos na Ala A (intacta) | Sem interrupção |
| **Internamento (Ala B)** | Redistribuído para Ala C + hospital parceiro | 35 transferências |
| **Urgência** | Operacional na Ala A com capacidade reduzida | Desvio de casos não urgentes para outros hospitais |
| **Bloco operatório** | 1 de 3 salas operacional | Apenas cirurgias urgentes/emergentes |
| **Sistemas TI** | Hot site ativado para sistema clínico principal | RPO < 15 min |
| **Farmácia** | Operacional com stock de emergência | Reabastecimento em 24h |

### Recuperação

- **Semana 1-2:** Operação estabilizada a 60% de capacidade
- **Mês 1-3:** Reparação estrutural da Ala B (engenheiros civis)
- **Mês 4:** Ala B reaberta após certificação estrutural
- **Mês 5:** Regresso dos pacientes do hospital parceiro
- **Mês 6:** Operação normal restaurada; revisão pós-incidente

### Lições aprendidas

| Lição | Ação |
|-------|------|
| BCP hospitalar funcionou porque era testado anualmente (ISO 22301) | Manter programa de testes; a certificação fez diferença |
| Acordo com hospital parceiro foi essencial | Renovar e expandir acordos de cooperação com outros hospitais |
| Comunicação a famílias demorou 6h (deveria ser < 2h) | Implementar sistema de notificação automática por SMS |
| Gerador aguentou mas sem contrato de combustível de emergência | Assinar contrato com fornecedor de combustível para emergências |
| Apenas 1 sala de bloco operatório resistiu | Reforço sísmico das restantes salas no plano de investimento |

---

## Caso 3 — Banco: falha do fornecedor cloud

### Contexto

Banco digital (fintech) com 200 colaboradores, sem agências físicas. Toda a infraestrutura em AWS (região eu-west-1, Irlanda). O BCP previa cenários de ciberataque e falha de datacenter, mas o cenário de **falha regional do fornecedor cloud** era considerado "altamente improvável".

### Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de disrupção** | Falha regional AWS (eu-west-1) durante 14 horas |
| **Categoria** | Desastre (100% dos serviços offline) |
| **Impacto** | App bancária offline; transações impossíveis; clientes sem acesso a contas |
| **Regulador** | Banco de Portugal notificado em 1 hora (obrigação legal) |

### Ativação do BCP

| Tempo | Ação | Resultado |
|-------|------|----------|
| T+0 | Falha detetada por monitorização automática | Alertas disparados |
| T+5 min | Equipa de operações confirma: falha é na AWS, não interna | Sem ação possível na fonte |
| T+15 min | CTO contacta AWS — "falha regional, sem ETA para resolução" | Sem controlo sobre a recuperação |
| T+30 min | CEO (coordenador BCP) convoca equipa de crise | Decisão: ativar BCP |
| T+1h | Tentativa de failover para eu-central-1 (Frankfurt) | **FALHA** — multi-region não estava configurado corretamente |
| T+2h | Banco de Portugal notificado | Conformidade regulatória |
| T+3h | Comunicação a clientes via SMS e redes sociais | "Serviços temporariamente indisponíveis" |
| T+6h | Equipa TI configura infraestrutura de emergência em Frankfurt | Esforço manual |
| T+10h | App bancária online em modo read-only (consulta de saldos) | Parcialmente operacional |
| T+14h | AWS restaura eu-west-1 | Serviço normal retomado |
| T+16h | Todas as transações pendentes processadas | Operação normalizada |

### O que correu mal

```
  ┌─────────────────────────────────────────────────────────────┐
  │     ANÁLISE DE FALHAS                                        │
  │                                                              │
  │  1. MULTI-REGION NÃO FUNCIONAL                              │
  │     O BCP dizia "failover automático para eu-central-1"     │
  │     mas nunca tinha sido testado. A configuração estava       │
  │     incompleta (DNS, base de dados, certificados SSL).       │
  │                                                              │
  │  2. DEPENDÊNCIA TOTAL DE UM FORNECEDOR                      │
  │     100% da infraestrutura num único fornecedor cloud.       │
  │     Sem plano B para falha do fornecedor principal.          │
  │                                                              │
  │  3. CENÁRIO "IMPROVÁVEL" = NÃO TESTADO                      │
  │     A equipa classificou falha regional AWS como             │
  │     "altamente improvável" e não investiu em testes.         │
  │                                                              │
  │  4. COMUNICAÇÃO ATRASADA                                     │
  │     Clientes souberam da falha pelas redes sociais           │
  │     antes da comunicação oficial do banco (3h).              │
  └─────────────────────────────────────────────────────────────┘
```

### Lições aprendidas

| Lição | Ação no BCP revisto |
|-------|-------------------|
| Failover multi-region nunca testado | Teste trimestral de failover entre regiões AWS |
| Dependência total de AWS | Implementar componentes críticas num segundo fornecedor cloud (Azure ou GCP) |
| "Improvável" ≠ "impossível" | Eliminar classificação "improvável" — se é possível, deve ter plano |
| Comunicação a clientes demorou 3h | Template de comunicação pré-aprovado + sistema de envio automático em < 30 min |
| Regulador notificado em 1h (dentro do prazo) | Manter e automatizar processo de notificação regulatória |

---

## Caso 4 — Município: inundação destrói edifício de serviços

### Contexto

Município de média dimensão com 600 funcionários e 40.000 habitantes. O edifício principal alberga serviços administrativos, atendimento ao público, e o datacenter municipal. Não existia BCP formalizado — apenas um "plano de contingência informático" básico no departamento de TI.

### Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de disrupção** | Inundação por cheia de rio (dezembro, chuvas extremas) |
| **Categoria** | Catástrofe (edifício completamente inundado; arquivo destruído) |
| **Impacto** | Serviços municipais 100% parados; documentos em papel destruídos |
| **Agravante** | Sem BCP formal; backups no mesmo edifício (também destruídos) |

### O que aconteceu (sem BCP)

```
  ┌─────────────────────────────────────────────────────────────┐
  │     CRONOLOGIA — SEM BCP FORMALIZADO                         │
  │                                                              │
  │  Dia 1:   Inundação. Edifício evacuado. Presidente da       │
  │           Câmara gere a emergência municipal (cidadãos).     │
  │           Serviços administrativos completamente parados.    │
  │                                                              │
  │  Dia 2-3: Caos. Ninguém sabe o que fazer com os serviços    │
  │           internos. Datacenter submerso. Backups perdidos.   │
  │           Funcionários sem local de trabalho.                │
  │                                                              │
  │  Dia 4-7: Instalação provisória num pavilhão desportivo.    │
  │           Sem computadores, sem dados, sem processos.        │
  │           Atendimento ao público: papel e caneta.            │
  │                                                              │
  │  Semana 2: Compra de emergência de 20 PCs. Internet         │
  │            provisória. Sem dados — recomeçar do zero.        │
  │                                                              │
  │  Semana 3-4: Descoberta de que o software de gestão          │
  │              documental tinha backups na cloud (contrato     │
  │              de manutenção incluía isso). Recuperação        │
  │              parcial de 60% dos dados digitais.              │
  │                                                              │
  │  Mês 2-3: Serviços parcialmente restaurados (50%).          │
  │           Arquivo em papel irrecuperável.                    │
  │                                                              │
  │  Mês 6:   Operação normalizada a 80%. Dados do arquivo     │
  │           em papel perdidos permanentemente.                 │
  └─────────────────────────────────────────────────────────────┘
```

### O que deveria ter acontecido (com BCP)

| Aspeto | Sem BCP (real) | Com BCP (ideal) |
|--------|---------------|-----------------|
| **Backups** | No mesmo edifício (destruídos) | Off-site + cloud (RPO < 24h) |
| **Site alternativo** | Pavilhão improvisado (semana 1) | Warm site pré-contratado (dia 1) |
| **Equipamento** | Compra de emergência (semana 2) | SLA com fornecedor (24-48h) |
| **Dados** | 40% perdidos permanentemente | Recuperação de dados em < 24h |
| **Atendimento** | Papel e caneta (semana 1-4) | Online + telefone (dia 2-3) |
| **Comunicação** | Ad hoc, inconsistente | Templates pré-aprovados (dia 1) |
| **Arquivo** | Perdido permanentemente | Digitalização prévia + backup |
| **Custo total** | €2.8M (estimado) | €400K (com BCP implementado) |

### Lições aprendidas

| Lição | Recomendação |
|-------|-------------|
| Backups no mesmo edifício = sem backups | Regra 3-2-1 obrigatória; pelo menos 1 cópia off-site |
| Sem BCP = caos completo | Implementar BCP formal com aprovação do executivo municipal |
| Arquivo em papel sem digitalização = perda irreversível | Programa de digitalização progressiva de arquivo |
| Software na cloud salvou 60% dos dados | Migrar mais sistemas para cloud ou modelo híbrido |
| Custo da ausência de BCP (€2.8M) >> custo de implementar BCP (€50-80K) | Investimento em BC é uma fração do custo de um desastre |

---

## Caso 5 — Indústria alimentar: ataque à cadeia de fornecimento

### Contexto

Empresa de distribuição alimentar com 800 colaboradores, 3 armazéns refrigerados e frota de 120 camiões. Fornece 2.000 pontos de venda (supermercados, restaurantes, hospitais). O BCP estava implementado mas focado em cenários internos (incêndio, ciberataque ao ERP).

### Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de disrupção** | Ataque ransomware ao fornecedor principal de software de gestão de frota |
| **Categoria** | Desastre (operação logística paralisada) |
| **Impacto** | Sistema de rotas, GPS e gestão de entregas completamente offline |
| **Agravante** | O ataque não foi à empresa mas sim a um fornecedor externo crítico |
| **Produtos perecíveis** | Tempo máximo sem entregas antes de perda de produto: 48h |

### Ativação do BCP

| Tempo | Ação |
|-------|------|
| T+0 | Motoristas reportam que o sistema de rotas não funciona |
| T+1h | Equipa TI confirma: fornecedor do software de frota está sob ataque ransomware |
| T+2h | Diretor de operações (coordenador BCP) convoca equipa de crise |
| T+3h | Declaração de desastre — BCP ativado com foco na cadeia logística |
| T+4h | Decisão: operar com **procedimentos manuais de emergência** |

### Operação alternativa

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║      OPERAÇÃO MANUAL DE EMERGÊNCIA — LOGÍSTICA                ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   Dia 1-2: Rotas manuais                                     ║
  ║   ├── Supervisores atribuem rotas com base em experiência     ║
  ║   ├── Mapas em papel + GPS dos telemóveis pessoais            ║
  ║   ├── Comunicação por WhatsApp (grupos por armazém)           ║
  ║   └── Capacidade operacional: 40% (apenas clientes Tier 1)   ║
  ║                                                               ║
  ║   Dia 3-5: Otimização manual                                 ║
  ║   ├── Folhas de cálculo para planeamento de rotas             ║
  ║   ├── Priorização: hospitais > supermercados > restaurantes   ║
  ║   ├── Contratação de 3 empresas de transporte temporárias     ║
  ║   └── Capacidade operacional: 65%                            ║
  ║                                                               ║
  ║   Dia 6-10: Software alternativo                              ║
  ║   ├── Instalação de software de rotas alternativo (SaaS)      ║
  ║   ├── Importação de dados de clientes (backup existia)        ║
  ║   ├── Treino rápido de supervisores                           ║
  ║   └── Capacidade operacional: 85%                            ║
  ║                                                               ║
  ║   Dia 14: Fornecedor original recupera serviço               ║
  ║   └── Decisão: manter software alternativo como backup        ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Impacto nos clientes

| Tipo de cliente | Impacto | Comunicação |
|----------------|---------|-------------|
| **Hospitais** (Tier 1) | Entregas mantidas (prioridade absoluta) | Contacto direto, dia 1 |
| **Grandes superfícies** (Tier 1) | Atraso de 24h; sem rutura de stock | Contacto direto, dia 1 |
| **Supermercados médios** (Tier 2) | Atrasos de 48-72h; alguns produtos perecíveis perdidos | Email + telefone, dia 2 |
| **Restaurantes** (Tier 3) | Entregas suspensas 5 dias; recomendados fornecedores alternativos | Email, dia 3 |

### Lições aprendidas

| Lição | Ação no BCP revisto |
|-------|-------------------|
| Dependência de fornecedor externo não estava no BCP | Mapear todas as dependências de fornecedores críticos; incluir no BIA |
| Sem plano B para software de frota | Contrato com fornecedor alternativo (SaaS) pré-configurado e testado |
| Procedimentos manuais funcionaram mas de forma lenta | Documentar procedimentos manuais de emergência para todas as funções críticas |
| Produtos perecíveis = urgência extrema | Incluir gestão de cadeia de frio como função Tier 1 no BCP |
| Comunicação a clientes foi eficaz (por tiers) | Manter modelo de comunicação por tiers; automatizar |
| Fornecedor original recuperou em 14 dias | Negociar SLAs de recuperação com fornecedores críticos |

---

## Reflexão final

Os cinco casos práticos ilustram aspetos fundamentais do BCP:

| Caso | Lição principal |
|------|----------------|
| **Seguradora (pandemia)** | O BCP deve cobrir cenários onde o **modelo operacional inteiro muda**, não apenas cenários de destruição física |
| **Hospital (sismo)** | Um BCP **testado e certificado** (ISO 22301) faz a diferença — a resposta foi rápida e coordenada |
| **Banco (cloud)** | **Testar é obrigatório** — failover não testado = failover que não funciona. "Improvável" não é "impossível" |
| **Município (inundação)** | O custo de **não ter BCP** (€2.8M) é incomparavelmente superior ao custo de implementar um (€50-80K) |
| **Indústria alimentar (fornecedor)** | O BCP deve cobrir **dependências externas** (fornecedores, cloud, supply chain), não apenas infraestrutura interna |

> **Princípio comum:** Nenhuma organização é uma ilha. O BCP deve considerar o ecossistema completo — fornecedores, clientes, reguladores, comunidade — e não apenas os ativos internos.

---

## Caso real — Colonial Pipeline (maio 2021)

!!! abstract "Por que estudar um caso real"
    Os casos anteriores são fictícios. Este é o **caso canónico de acoplamento IT/OT** — ransomware apenas em IT provoca paragem de OT por decisão de negócio, com impacto em 45% do consumo de combustível da costa leste dos EUA. Testa a matriz de decisão de declaração de desastre e a segmentação arquitectural.

### Contexto e cronologia

| Data | Evento |
|------|--------|
| ~29 abril 2021 | **Primeira autenticação** na VPN comprometida (credencial reutilizada) |
| 7 maio, ~05h00 ET | **Deteção**: operador encontra nota de resgate; equipa de IT alerta o CEO |
| 7 maio, manhã | Colonial **desliga proactivamente o pipeline OT** (decisão de negócio, não de contenção técnica) |
| 7-12 maio | **Interrupção** de 5.500 milhas de pipeline; 45% do combustível da costa leste afectado |
| 8 maio | Pagamento de **~75 BTC (~USD 4.4M)** a 8 maio |
| 9 maio | **Declaração de Emergência Regional** (DOT/FMCSA) relaxando horas de condução |
| 12 maio | Reinício progressivo de operações |
| 7 junho | **FBI recupera 63.7 BTC** (~63 maio) por acesso à chave privada |

**Actor:** **DarkSide**, grupo **RaaS** com afiliação russa presumida (exclui alvos na CEI — indicador típico). O grupo dissolveu a infraestrutura pública dias após o incidente (pressão reputacional).

### O ponto pedagógico central — a decisão crítica de BCP

**Os sistemas OT (SCADA/DCS do pipeline) NÃO foram cifrados.** A cifra atingiu apenas sistemas IT — billing, ERP, facturação. A decisão de parar o OT foi **organizacional, não técnica**:

```
  ┌──────────────────────────────────────────────────────────────┐
  │     IT (cifrado)              OT (NÃO cifrado)               │
  │        │                           │                         │
  │        ▼                           ▼                         │
  │   Billing parado          Pipeline operacional               │
  │   ERP parado              SCADA a funcionar                  │
  │        │                           │                         │
  │        └───────────────────┬───────┘                         │
  │                            ▼                                 │
  │            Pergunta: continuamos a bombear sem facturar?     │
  │                            ▼                                 │
  │            Decisão: NÃO. Pára-se o pipeline.                 │
  │                                                              │
  │   Motivação: sem billing, sem modelo contratual.             │
  │   Sem contrato, responsabilidade legal e financeira          │
  │   indeterminada. "Vamos bombear gás de graça?"               │
  └──────────────────────────────────────────────────────────────┘
```

**Esta é a lição central do caso.** O BCP falhou no desenho porque existia **acoplamento crítico entre IT e OT**: o billing em IT era condição contratual para a operação em OT. Num plano maduro, esta dependência teria sido identificada na BIA e mitigada por procedimentos manuais de facturação (ex.: metering com reconciliação posterior).

### TTPs observadas

Detalhes granulares não publicados em texto integral (Mandiant conduziu IR mas não publicou relatório técnico completo). Confirmados:

| Táctica | Técnica | Detalhe |
|---------|---------|---------|
| Initial Access | **T1078** — Valid Accounts | Credencial VPN legacy reutilizada, sem MFA |
| Initial Access | **T1133** — External Remote Services | VPN Citrix exposta à internet |
| Impact | **T1486** — Data Encrypted for Impact | Ransomware DarkSide sobre sistemas IT |
| (Exfiltration) | **T1567.002** (presumida) | Double extortion pattern típica DarkSide |

Ver o [mapa de referência ATT&CK](../comum/attack-mapping.md) para contexto mais amplo.

### Impacto cascata

- **Pânico de combustível** em AL, GA, NC, SC, VA, TN — consumidores armazenam em contentores inadequados (bidões plástico, sacos); registadas explosões.
- Preço médio nacional da gasolina sobe ~6 cêntimos/galão, ultrapassa **USD 3.00/gal** pela primeira vez desde 2014.
- **Airlines** ajustam rotas para evitar stopovers na costa leste com necessidade de reabastecimento.
- Pressão política bipartidária; audiências no Congresso (Joseph Blount testifica a 8 jun).

### Resposta regulatória

A Colonial acelerou a resposta regulatória dos EUA a infraestruturas críticas:

| Directiva | Data | Conteúdo |
|-----------|------|----------|
| **TSA Pipeline-2021-01** | 28 mai 2021 | Reporte obrigatório à CISA em 12h para incidentes significativos |
| **TSA Pipeline-2021-02** | Jul 2021 | Requisitos prescritivos: segmentação, MFA, patching, IR plan |
| Revisões 2022, 2023 | | Reforço de requisitos, incluindo *penetration testing* |

Precedeu a **National Cybersecurity Strategy** (Mar 2023) da administração Biden.

### Lições para BCP — as não-óbvias

1. **Segmentação IT/OT não é só técnica** — é organizacional. A BIA deve identificar **acoplamentos funcionais** (billing IT → OT). Se OT só funciona se IT funcionar, não há segmentação.
2. **Higiene de IAM básica** — conta VPN legacy, sem MFA, com credencial exposta. Em 2021, isto é falha de processo, não de tecnologia.
3. **Backups testados a escala real** — Blount admitiu no Congresso que o pagamento foi parcialmente justificado por incerteza sobre tempo de restauro.
4. **Declaração de desastre tardia** — linha cinzenta entre "incidente grave" e "crise corporativa". Matriz de decisão tem de ser pré-estabelecida.
5. **Coordenação com autoridades** — contactos pré-estabelecidos com CISA, FBI, DOE, DOT, TSA. Não se começa a ler contactos durante a crise.
6. **Comunicação política e mediática** — Blount testemunhou sob juramento. A comunicação não é só técnica; é regulatória e reputacional.

### Dimensões éticas em debate

- **Pagar USD 4.4M** — prós: restauro rápido, seguro cobria parte. Contras: financia operações criminosas; incentivo para futuros ataques.
- **Recuperação dos 63.7 BTC** — o FBI demonstrou capacidade de *seguir o dinheiro* em cripto. Muda o cálculo custo-benefício futuro?
- **Comunicação pública** — Blount demorou a comunicar publicamente. Comparar com a abordagem Klaba (OVH): transparência imediata vs. controlo de narrativa.

### Questões para discussão (mestrado)

1. Foi tecnicamente justificável parar a rede OT sem evidência de comprometimento OT, ou reflecte falha de desenho do BCP (acoplamento billing-operação)?
2. Qual o papel dos **seguros cyber** na decisão de pagar USD 4.4M — incentivo perverso ou racionalidade económica defensável?
3. Como desenharia uma **matriz de decisão de declaração de desastre** para evitar o atraso observado, distinguindo "incidente grave IT" de "crise corporativa"?
4. A recuperação de 63.7 BTC pelo FBI cria precedente. Mudaria a sua política de "no ransom payment" conhecendo este *outcome*?
5. Avalie se as TSA Security Directives (2021-2023) seguem modelo **prescritivo** adequado, ou se modelo **baseado em risco** (à la NIS2) seria mais eficaz para pipelines.

### Referências verificáveis

- Testemunho de **Joseph Blount** perante o Senate Homeland Security Committee (8 jun 2021). <https://www.hsgac.senate.gov/hearings/threats-to-critical-infrastructure-examining-the-colonial-pipeline-cyber-attack/>
- **CISA/FBI Joint Advisory AA21-131A** — DarkSide Ransomware. <https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a>
- **DOJ** — recuperação de 63.7 BTC (7 jun 2021). <https://www.justice.gov/opa/pr/department-justice-seizes-23-million-cryptocurrency-paid-ransomware-extortionists-darkside>
- **GAO-22-105468** — Pipeline Cybersecurity. <https://www.gao.gov/products/gao-22-105468>
- **TSA Security Directives Pipeline**. <https://www.tsa.gov/news/press/releases/2021/07/20/dhs-announces-new-cybersecurity-requirements-critical-pipeline-owners>

---

## 📋 Templates

Consulte o [menu Templates](../modelos/index.md) para todos os modelos operacionais, com contexto de uso, personalização e cadência de revisão. Relevante para BCP:

[:material-file-document-outline: BCP Vila Feliz](../modelos/BCP_Municipio_Vila_Feliz_TISI.docx){ .md-button .md-button--primary }
[:material-view-list: Hub de Templates](../modelos/index.md){ .md-button }
