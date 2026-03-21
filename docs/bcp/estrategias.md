# Estratégias de Continuidade

## Índice

1. [Visão geral das estratégias](#1-visao-geral-das-estrategias)
2. [Recuperação de instalações](#2-recuperacao-de-instalacoes)
3. [Recuperação de hardware](#3-recuperacao-de-hardware)
4. [Recuperação de software](#4-recuperacao-de-software)
5. [Recuperação de pessoal](#5-recuperacao-de-pessoal)
6. [Recuperação de dados](#6-recuperacao-de-dados)
7. [Selecionar a estratégia adequada](#7-selecionar-a-estrategia-adequada)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)

---

## 1. Visão geral das estratégias

Quando os controlos preventivos falham e o desastre acontece, a organização precisa de **estratégias de continuidade** previamente definidas para manter as funções críticas de negócio em operação.

No contexto do BCP, estas estratégias têm um **foco de negócio** — o objetivo não é apenas recuperar servidores (isso é DRP), mas garantir que o negócio sobrevive.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         ESTRATÉGIAS DE CONTINUIDADE DO BCP                     ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       ║
  ║   │ INSTALAÇÕES  │  │   HARDWARE   │  │   SOFTWARE   │       ║
  ║   │              │  │              │  │              │       ║
  ║   │ Onde operar? │  │ Com que      │  │ Que sistemas │       ║
  ║   │              │  │ equipamento? │  │ disponíveis? │       ║
  ║   └──────────────┘  └──────────────┘  └──────────────┘       ║
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐                         ║
  ║   │   PESSOAL    │  │    DADOS     │                         ║
  ║   │              │  │              │                         ║
  ║   │ Quem opera?  │  │ Que dados    │                         ║
  ║   │ Como desloca?│  │ disponíveis? │                         ║
  ║   └──────────────┘  └──────────────┘                         ║
  ║                                                               ║
  ║   Fator decisivo: ──────────────────────────► CUSTO vs MTD   ║
  ╚═══════════════════════════════════════════════════════════════╝
```

> O fator decisivo na seleção entre estratégias é quase sempre o **equilíbrio entre custo e tolerância a paragem (MTD)**. Quanto menor o MTD, mais cara tende a ser a estratégia necessária.

---

## 2. Recuperação de instalações

Quando o site primário fica inutilizável, a organização precisa de um **local alternativo** para continuar as funções de negócio (não apenas TI).

### Tipos de sites alternativos

```
  ┌─────────────────────────────────────────────────────────────┐
  │           ESPETRO DE SITES ALTERNATIVOS                      │
  │                                                              │
  │  Custo alto ◄──────────────────────────────► Custo baixo    │
  │  Ativação rápida ◄─────────────────────────► Ativação lenta │
  │                                                              │
  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
  │  │Mirrored │ │  Hot    │ │  Warm   │ │  Cold   │           │
  │  │  Site   │ │  Site   │ │  Site   │ │  Site   │           │
  │  │         │ │         │ │         │ │         │           │
  │  │ 100%    │ │ Equip.  │ │ Equip.  │ │ Espaço  │           │
  │  │ redund. │ │ config. │ │ parcial │ │ vazio   │           │
  │  │ + dados │ │ s/ dados│ │ s/ dados│ │ s/ equip│           │
  │  │ atuais  │ │ recentes│ │         │ │         │           │
  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
  │                                                              │
  │  ◄── minutos ──►◄─ 24h ─►◄─ semana ►◄── 30 dias ──►       │
  └─────────────────────────────────────────────────────────────┘
```

### Tabela comparativa detalhada

| Alternativa | Tempo de ativação | Prontidão | Custo | Melhor para |
|-------------|-------------------|-----------|-------|-------------|
| **Mirrored site** | Minutos | Totalmente redundante, dados em tempo real | Muito alto | Tier 1 — funções de missão crítica |
| **Hot site** | < 24 horas | Equipamento configurado, só falta carregar dados recentes | Alto | Tier 1/2 — funções críticas |
| **Rolling hot site** | ~ 24 horas | Similar ao hot site, mas apenas para datacenter (móvel) | Alto | Operações de datacenter isoladas |
| **Warm site** | 1-7 dias | Equipamento parcial, sem dados; requer ativação | Médio | Tier 2 — funções vitais |
| **Cold site** | 15-30 dias | Espaço com eletricidade e AVAC, sem equipamento | Baixo | Tier 3 — funções importantes |

### Acordos recíprocos

Além dos sites de subscrição, existe a opção de **acordos recíprocos** entre organizações similares:

```
  ┌──────────────┐                    ┌──────────────┐
  │ Empresa A    │◄──── Acordo ──────►│ Empresa B    │
  │              │    recíproco       │              │
  │ "Se tu tiver │                    │ "Se eu tiver │
  │  desastre,   │                    │  desastre,   │
  │  podes usar  │                    │  posso usar  │
  │  o meu site" │                    │  o teu site" │
  └──────────────┘                    └──────────────┘
```

!!! warning "Limitações dos acordos recíprocos"
    - Difíceis de aplicar na prática (capacidade, compatibilidade)
    - Risco de ambas as organizações serem afetadas pelo mesmo desastre
    - Problemas de confidencialidade e conformidade regulatória
    - Degradação de serviço garantida para ambas as partes
    - Podem funcionar como complemento, mas não como estratégia principal

### Regras de distância

| Ambiente | Distância mínima recomendada |
|----------|------------------------------|
| Baixo a médio risco | Mínimo **15 km** do site primário |
| Operações críticas | Entre **50 e 200 km** do site primário |

> A distância deve ser suficiente para evitar que o mesmo desastre afete ambos os sites (inundação, sismo, tempestade), mas não tão grande que dificulte a deslocação de pessoal.

---

## 3. Recuperação de hardware

A recuperação de hardware depende fundamentalmente de uma **boa documentação de gestão de configuração**. Sem saber exatamente que equipamento existe, é impossível substituí-lo eficazmente.

### Componentes a considerar

```
  ╔═══════════════════════════════════════════════════════════╗
  ║            RECUPERAÇÃO DE HARDWARE                         ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                            ║
  ║   ┌──────────────────┐   ┌──────────────────┐             ║
  ║   │    Servidores     │   │   Postos de      │             ║
  ║   │    e Storage      │   │   trabalho (PCs) │             ║
  ║   └──────────────────┘   └──────────────────┘             ║
  ║                                                            ║
  ║   ┌──────────────────┐   ┌──────────────────┐             ║
  ║   │  Equipamento de  │   │   Comunicações   │             ║
  ║   │  rede (switches, │   │   voz e dados    │             ║
  ║   │  routers, FW)    │   │                  │             ║
  ║   └──────────────────┘   └──────────────────┘             ║
  ║                                                            ║
  ║   ┌──────────────────┐   ┌──────────────────┐             ║
  ║   │  Consumíveis e   │   │   Equipamento    │             ║
  ║   │  sobressalentes  │   │   especializado  │             ║
  ║   └──────────────────┘   └──────────────────┘             ║
  ╚═══════════════════════════════════════════════════════════╝
```

### O papel dos SLAs

Os **Service Level Agreements (SLAs)** com fornecedores de hardware são essenciais:

| Tipo de SLA | Descrição | Exemplo |
|-------------|-----------|---------|
| **Substituição garantida** | Fornecedor compromete-se a entregar equipamento de substituição em tempo definido | "Servidor de substituição em 4 horas" |
| **Stock de emergência** | Fornecedor mantém stock reservado para a organização | "5 switches em reserva no armazém regional" |
| **Prioridade de entrega** | Organização recebe prioridade em situação de escassez | "Primeiro lugar na fila em caso de desastre regional" |

!!! info "Documentação de configuração"
    Sem inventário atualizado de hardware — modelos, configurações, versões de firmware — é impossível encomendar substituições corretas. A documentação de gestão de configuração deve estar acessível **fora do site primário**.

---

## 4. Recuperação de software

A recuperação de software é frequentemente subestimada, mas pode ser tão crítica como a de hardware.

### Componentes a documentar

| Componente | Informação necessária |
|------------|----------------------|
| **Sistemas operativos** | Versões, patches aplicados, configurações |
| **Aplicações** | Versões, dependências, ordem de instalação |
| **Licenciamento** | Chaves de licença, contratos, número de licenças |
| **Configurações** | Parâmetros, personalizações, integrações |
| **Scripts e automação** | Procedimentos de instalação e configuração automatizados |

### Riscos específicos de software

```
  ┌─────────────────────────────────────────────────────────────┐
  │              RISCOS NA RECUPERAÇÃO DE SOFTWARE                │
  │                                                              │
  │   ┌─────────────────────────────────────┐                    │
  │   │ Descontinuação                      │                    │
  │   │ O fornecedor já não vende/suporta   │                    │
  │   │ a versão necessária                 │                    │
  │   └─────────────────────────────────────┘                    │
  │                                                              │
  │   ┌─────────────────────────────────────┐                    │
  │   │ Licenciamento                       │                    │
  │   │ Licenças vinculadas a hardware      │                    │
  │   │ destruído; renegociação necessária   │                    │
  │   └─────────────────────────────────────┘                    │
  │                                                              │
  │   ┌─────────────────────────────────────┐                    │
  │   │ Incompatibilidade                   │                    │
  │   │ Hardware de substituição diferente   │                    │
  │   │ pode não suportar software antigo    │                    │
  │   └─────────────────────────────────────┘                    │
  │                                                              │
  │   ┌─────────────────────────────────────┐                    │
  │   │ Configuração                        │                    │
  │   │ Reinstalar é fácil; reconfigurar    │                    │
  │   │ com anos de ajustes é o verdadeiro   │                    │
  │   │ desafio                              │                    │
  │   └─────────────────────────────────────┘                    │
  └─────────────────────────────────────────────────────────────┘
```

!!! tip "Plano B para descontinuação"
    O BCP deve incluir um **plano para cenários onde o software já não está disponível**. Isto pode incluir: manter cópias de instalação em cofre, negociar acordos de escrow com fornecedores, ou identificar software alternativo pré-testado.

---

## 5. Recuperação de pessoal

A recuperação de pessoal é frequentemente a componente **mais esquecida** dos planos de continuidade, mas pode ser a mais crítica.

### Desafios principais

```
  ╔═══════════════════════════════════════════════════════════╗
  ║         RECUPERAÇÃO DE PESSOAL — DESAFIOS                  ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                            ║
  ║   ┌─────────────────────────────────────────────┐          ║
  ║   │  1. PESSOAL ESSENCIAL                       │          ║
  ║   │     Nem todos os colaboradores são           │          ║
  ║   │     necessários na fase de recuperação.      │          ║
  ║   │     Identificar quem é indispensável.        │          ║
  ║   └─────────────────────────────────────────────┘          ║
  ║                                                            ║
  ║   ┌─────────────────────────────────────────────┐          ║
  ║   │  2. PONTOS ÚNICOS DE FALHA                  │          ║
  ║   │     Uma pessoa é a única que sabe fazer      │          ║
  ║   │     determinada tarefa? Garantir backups     │          ║
  ║   │     humanos e treino cruzado.                │          ║
  ║   └─────────────────────────────────────────────┘          ║
  ║                                                            ║
  ║   ┌─────────────────────────────────────────────┐          ║
  ║   │  3. DESLOCAÇÃO                              │          ║
  ║   │     Se o site alternativo é longe, como      │          ║
  ║   │     deslocar pessoal? Alojamento? Famílias?  │          ║
  ║   └─────────────────────────────────────────────┘          ║
  ║                                                            ║
  ║   ┌─────────────────────────────────────────────┐          ║
  ║   │  4. FOLHA DE SALÁRIOS                       │          ║
  ║   │     Não esquecer: as pessoas precisam de     │          ║
  ║   │     ser pagas, mesmo durante o desastre!     │          ║
  ║   └─────────────────────────────────────────────┘          ║
  ╚═══════════════════════════════════════════════════════════╝
```

### Estratégias de mitigação

| Desafio | Estratégia |
|---------|-----------|
| **Pessoal essencial** | Identificar as funções (não as pessoas) que são críticas; definir equipa mínima |
| **Pontos únicos de falha** | Cross-training obrigatório; documentação de procedimentos; pelo menos 2 pessoas por função crítica |
| **Deslocação** | Acordos com hotéis próximos do site alternativo; subsídios de deslocação; trabalho remoto quando possível |
| **Famílias** | Plano de apoio a famílias; informação clara sobre a situação; contacto com escola/saúde |
| **Folha de salários** | Processamento de salários em modo alternativo; acesso a sistemas de RH no site alternativo |
| **Moral e bem-estar** | Apoio psicológico; comunicação transparente; rotatividade para evitar burnout |

### Matriz de pessoal para BCP

| Fase | Pessoal necessário | Ações |
|------|-------------------|-------|
| **Primeiras 24h** | Equipa de crise + pessoal essencial (15-20%) | Ativar plano, garantir segurança, avaliar danos |
| **Dias 2-5** | Pessoal de operações críticas (30-40%) | Restaurar funções Tier 1 e 2 |
| **Semanas 1-4** | Pessoal alargado (60-80%) | Normalizar operações, funções Tier 3 |
| **Após 1 mês** | Todo o pessoal (100%) | Operação normal no site alternativo ou regresso |

---

## 6. Recuperação de dados

Para que os sites alternativos funcionem, a organização precisa de **acesso aos dados**. As estratégias de recuperação de dados são determinadas pelas métricas da BIA (MTD, RTO, RPO).

### Métodos de armazenamento off-site

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         MÉTODOS DE RECUPERAÇÃO DE DADOS                       ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌───────────────────────────────────────┐                   ║
  ║   │  ELECTRONIC VAULTING                  │  RPO: horas       ║
  ║   │                                       │                   ║
  ║   │  Transferência em lote (batch) de     │  ┌──┐    ┌──┐    ║
  ║   │  dados para instalação remota         │  │DB│───►│DB│    ║
  ║   │                                       │  │  │lote│  │    ║
  ║   │  ● Backups completos periódicos       │  └──┘    └──┘    ║
  ║   │  ● Custo moderado                     │  Site    Site     ║
  ║   │  ● RPO = intervalo entre backups      │  prim.   remoto   ║
  ║   └───────────────────────────────────────┘                   ║
  ║                                                               ║
  ║   ┌───────────────────────────────────────┐                   ║
  ║   │  REMOTE JOURNALING                   │  RPO: minutos     ║
  ║   │                                       │                   ║
  ║   │  Transferência de transações em       │  ┌──┐    ┌──┐    ║
  ║   │  tempo real para site remoto          │  │DB│═══►│JR│    ║
  ║   │                                       │  │  │real│  │    ║
  ║   │  ● Apenas transações (não arquivo)    │  └──┘time└──┘    ║
  ║   │  ● Custo moderado-alto               │  Site    Site     ║
  ║   │  ● RPO = quase zero para transações   │  prim.   remoto   ║
  ║   └───────────────────────────────────────┘                   ║
  ║                                                               ║
  ║   ┌───────────────────────────────────────┐                   ║
  ║   │  DATABASE SHADOWING                  │  RPO: zero        ║
  ║   │                                       │                   ║
  ║   │  Duplicação completa da base de dados │  ┌──┐    ┌──┐    ║
  ║   │  em tempo real, múltiplos servidores   │  │DB│════│DB│    ║
  ║   │                                       │  │  │sync│  │    ║
  ║   │  ● Dados + transações replicados      │  └──┘    └──┘    ║
  ║   │  ● Custo mais elevado                 │  Site    Site     ║
  ║   │  ● RPO = zero (dados sempre atuais)   │  prim.   remoto   ║
  ║   └───────────────────────────────────────┘                   ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Comparação dos métodos

| Método | RPO | Custo | O que transfere | Melhor para |
|--------|-----|-------|-----------------|-------------|
| **Electronic vaulting** | Horas | Moderado | Backups completos em lote | Dados que toleram perda de horas |
| **Remote journaling** | Minutos | Moderado-alto | Transações em tempo real | Sistemas transacionais críticos |
| **Database shadowing** | Zero | Alto | Dados + transações (replicação total) | Funções de missão crítica |

### Regra 3-2-1 de backups

```
  ┌─────────────────────────────────────────────┐
  │            REGRA 3-2-1 DE BACKUPS            │
  │                                              │
  │   3 ── Manter pelo menos 3 cópias dos dados │
  │                                              │
  │   2 ── Em pelo menos 2 tipos de média       │
  │        diferentes (disco, tape, cloud)       │
  │                                              │
  │   1 ── Pelo menos 1 cópia off-site          │
  │        (fora do site primário)               │
  └─────────────────────────────────────────────┘
```

---

## 7. Selecionar a estratégia adequada

A seleção da estratégia de continuidade deve ser guiada pela **BIA** e equilibrada com o orçamento disponível.

### Matriz de decisão

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         MATRIZ DE DECISÃO — ESTRATÉGIA vs TIER                ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   Tier 1 (Missão crítica, MTD < 4h)                          ║
  ║   ├── Instalações: Mirrored site ou Hot site                  ║
  ║   ├── Dados: Database shadowing                               ║
  ║   ├── Hardware: SLA de substituição em 4h                     ║
  ║   └── Pessoal: Equipa dedicada, cross-training completo      ║
  ║                                                               ║
  ║   Tier 2 (Vital, MTD 4-24h)                                  ║
  ║   ├── Instalações: Hot site ou Warm site                      ║
  ║   ├── Dados: Remote journaling                                ║
  ║   ├── Hardware: SLA de substituição em 24h                    ║
  ║   └── Pessoal: Backups treinados, contacto em 2h             ║
  ║                                                               ║
  ║   Tier 3 (Importante, MTD 1-7 dias)                          ║
  ║   ├── Instalações: Warm site ou Cold site                     ║
  ║   ├── Dados: Electronic vaulting (diário)                     ║
  ║   ├── Hardware: Stock mínimo + SLA 48h                       ║
  ║   └── Pessoal: Procedimentos documentados                    ║
  ║                                                               ║
  ║   Tier 4 (Operacional, MTD > 7 dias)                         ║
  ║   ├── Instalações: Cold site ou procedimentos manuais         ║
  ║   ├── Dados: Backups semanais                                 ║
  ║   ├── Hardware: Aquisição normal                              ║
  ║   └── Pessoal: Disponibilidade em 1 semana                   ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Fatores de decisão

A equipa de planeamento de contingência deve avaliar e comparar as alternativas considerando:

| Fator | Questão |
|-------|---------|
| **Custo** | Qual é o custo anual da estratégia vs impacto financeiro de uma paragem? |
| **MTD** | A estratégia permite recuperar dentro do MTD definido na BIA? |
| **Escalabilidade** | A estratégia suporta crescimento futuro? |
| **Complexidade** | A organização tem capacidade para gerir está estratégia? |
| **Risco residual** | Que riscos permanecem mesmo com está estratégia? |
| **Conformidade** | A estratégia cumpre requisitos legais e regulatórios? |

---

## 8. Exemplos práticos

### Exemplo 1 — Banco: escolha de site alternativo

**Contexto:** Um banco com 50 agências precisa de selecionar a estratégia de continuidade para o seu datacenter central.

**Dados da BIA:**

- Core banking: MTD = 2h, RTO = 1h, RPO = 0
- Home banking: MTD = 4h, RTO = 2h, RPO = 15 min
- Email corporativo: MTD = 24h, RTO = 8h, RPO = 1h

**Decisão:**

| Sistema | Estratégia instalações | Estratégia dados | Custo anual estimado |
|---------|----------------------|------------------|---------------------|
| Core banking | Mirrored site | Database shadowing | €2.4M |
| Home banking | Hot site (mesmo) | Remote journaling | Incluído no mirrored |
| Email | Warm site | Electronic vaulting (diário) | €180K |

**Justificação:** O custo de 2 horas de paragem do core banking (€5M estimado em multas regulatórias + perda de transações) justifica o investimento no mirrored site.

### Exemplo 2 — Fábrica: deslocação de pessoal

**Contexto:** Uma fábrica de componentes automóveis no norte de Portugal sofre um incêndio. O site alternativo (warm site) fica a 80 km, na região centro.

**Desafio de pessoal:**

```
  ┌─────────────────────────────────────────────────────┐
  │     PLANO DE DESLOCAÇÃO DE PESSOAL                   │
  │                                                      │
  │  Total colaboradores: 450                            │
  │  Pessoal essencial fase 1: 65 (14%)                  │
  │  Distância ao site alternativo: 80 km                │
  │                                                      │
  │  Dia 1-3:  65 pessoas — produção mínima              │
  │            Hotel reservado (acordo prévio)            │
  │            Transporte: 2 autocarros fretados          │
  │                                                      │
  │  Dia 4-7:  180 pessoas — linhas prioritárias          │
  │            Alojamentos temporários                    │
  │            Subsídio de deslocação ativado             │
  │                                                      │
  │  Semana 2: 350 pessoas — produção a 70%              │
  │            Rotação semanal para quem vive longe       │
  │            Serviço de transporte diário               │
  │                                                      │
  │  Mês 2:   Decisão: regressar ou relocar              │
  │            permanentemente                            │
  └─────────────────────────────────────────────────────┘
```

**Lições:** O plano de pessoal incluiu acordos prévios com hotéis, contratos com empresa de transporte e subsídios de deslocação pré-aprovados pelo CFO — tudo definido antes do desastre acontecer.

---

## 9. Exercícios

### Exercício 1 — Selecionar estratégias (Nível básico)

Para cada função de uma empresa de seguros, selecione a estratégia de continuidade mais adequada:

| Função | MTD | RPO | Estratégia de instalações? | Estratégia de dados? |
|--------|-----|-----|--------------------------|---------------------|
| Processamento de sinistros | 4h | 30 min | ? | ? |
| Website público | 24h | 4h | ? | ? |
| Arquivo documental | 7 dias | 24h | ? | ? |
| Central telefónica (apoio cliente) | 2h | N/A | ? | ? |

??? success "Solução 1"
    | Função | MTD | RPO | Instalações | Dados | Justificação |
    |--------|-----|-----|-------------|-------|-------------|
    | Processamento de sinistros | 4h | 30 min | **Hot site** | **Remote journaling** | MTD curto exige site pronto; RPO de 30 min exige replicação quase real-time |
    | Website público | 24h | 4h | **Hot site** (partilhado) | **Electronic vaulting** (4 em 4h) | MTD permite ativação em horas; RPO de 4h aceita backups periódicos |
    | Arquivo documental | 7 dias | 24h | **Cold site** | **Electronic vaulting** (diário) | MTD generoso permite site mais económico; backups diários suficientes |
    | Central telefónica | 2h | N/A | **Hot site** + redirecção VoIP | N/A (sem dados) | MTD muito curto; solução com redirecção automática de chamadas |

### Exercício 2 — Análise custo-benefício (Nível intermédio)

Uma empresa tem uma função crítica com MTD = 8 horas. Análise as duas opções:

- **Opção A:** Hot site — custo anual €600.000
- **Opção B:** Warm site — custo anual €200.000, mas tempo de ativação de 3-5 dias

Dados adicionais:
- Custo estimado por hora de paragem: €150.000
- Probabilidade de desastre por ano: 5%
- A empresa tem seguro que cobre 60% das perdas após as primeiras 24h

Qual opção recomendaria e porquê?

??? success "Solução 2"
    **Análise:**

    **Opção B é inviável** — o tempo de ativação (3-5 dias) excede largamente o MTD (8 horas). Independentemente do custo, está opção não cumpre o requisito de continuidade. Se a função tem MTD de 8 horas, estar parado 3-5 dias resultaria em danos potencialmente irreversíveis.

    **Opção A é a escolha correta**, mas vale a pena validar com números:

    - Custo anual da Opção A: €600.000
    - Impacto de 8h de paragem (máximo tolerável): 8 × €150.000 = €1.200.000
    - Impacto esperado anual sem proteção: 5% × €1.200.000 = €60.000

    **Nota:** O cálculo do impacto esperado parece favorecer não ter proteção (€60K < €600K). Mas o MTD de 8h não é negociável — foi definido na BIA como o máximo que a organização tolera. Ultrapassar o MTD pode significar perda de clientes, multas regulatórias ou mesmo falência.

    **Conclusão:** A Opção A é obrigatória. O MTD é um requisito, não uma recomendação. O custo-benefício deve ser avaliado contra o impacto de ultrapassar o MTD, não apenas contra o impacto esperado médio.

### Exercício 3 — Identificar pontos únicos de falha (Nível avançado)

Análise o seguinte cenário e identifique todos os pontos únicos de falha no pessoal:

Uma PME de desenvolvimento de software (40 pessoas) tem:

- 1 administrador de sistemas (único com acesso root a todos os servidores)
- 1 DBA (única pessoa que conhece o esquema da base de dados principal)
- CTO que é também o único com acesso às chaves de encriptação
- 2 developers seniores (únicos que conhecem o código legacy do produto principal)
- 1 contabilista (única pessoa com acesso ao software de contabilidade)

Identifique os pontos únicos de falha e proponha soluções.

??? success "Solução 3"
    **Pontos únicos de falha identificados:**

    | Pessoa | Risco | Criticidade | Solução |
    |--------|-------|-------------|---------|
    | **Administrador de sistemas** | Indisponibilidade bloqueia toda a infra. TI | **Crítica** | Cross-training de 2 developers; documentar todos os procedimentos; acesso root em cofre digital |
    | **DBA** | Impossível manter/recuperar a BD principal | **Crítica** | Documentar esquema; cross-training de 1 developer; contrato com DBA externo de emergência |
    | **CTO (chaves encriptação)** | Dados encriptados inacessíveis | **Crítica** | Key escrow; chaves em cofre bancário; 2ª pessoa autorizada (CEO) |
    | **Developers seniores (×2)** | Código legacy incompreensível para outros | **Alta** | Documentar código; sessões de knowledge transfer; pelo menos mais 1 developer familiarizado |
    | **Contabilista** | Folha de salários e obrigações fiscais bloqueadas | **Alta** | Documentar procedimentos; acesso de emergência ao software; contrato com contabilista externo |

    **Recomendações gerais:**

    1. **Regra dos 2:** Nunca menos de 2 pessoas com conhecimento/acesso a qualquer função crítica
    2. **Documentação:** Todos os procedimentos documentados e acessíveis fora do site primário
    3. **Cross-training trimestral:** Sessões regulares de partilha de conhecimento
    4. **Testes de ausência:** Simular a indisponibilidade de cada pessoa-chave durante 1 dia por trimestre
    5. **Contratos de emergência:** Acordos com consultores externos para funções críticas

---

## 10. Armadilhas e confusões a evitar

!!! danger "Confusão 1: Hot site = operação imediata"
    **Errado.** Um hot site tem equipamento configurado, mas **não tem os dados mais recentes**. É preciso carregar dados (do último backup ou via replicação). Apenas um **mirrored site** oferece operação verdadeiramente imediata.

!!! danger "Confusão 2: A recuperação de dados resolve tudo"
    **Errado.** Ter os dados disponíveis não serve de nada sem instalações, hardware, software **e pessoal** para os utilizar. As cinco dimensões da recuperação são interdependentes.

!!! danger "Confusão 3: Acordos recíprocos são uma boa estratégia principal"
    **Errado.** Os acordos recíprocos são difíceis de aplicar na prática: problemas de capacidade, confidencialidade, compatibilidade de sistemas e risco de ambas as organizações serem afetadas simultaneamente. Devem ser um **complemento**, não a estratégia principal.

!!! danger "Confusão 4: O custo é o único fator de decisão"
    **Errado.** O custo é importante, mas o **MTD definido na BIA é o fator determinante**. Uma estratégia barata que não cumpre o MTD é uma estratégia inútil — é como comprar um seguro de vida que não paga.

!!! danger "Confusão 5: As pessoas deslocam-se facilmente para o site alternativo"
    **Errado.** A deslocação de pessoal é um dos maiores desafios práticos. Envolve logística, alojamento, famílias, custos e questões legais. O plano deve prever tudo isto **antes** do desastre.

!!! danger "Confusão 6: Backups diários significam RPO de 24 horas"
    **Parcialmente errado.** O RPO de backups diários é no **pior caso** quase 24 horas (se o desastre ocorrer imediatamente antes do backup). Em média será cerca de 12 horas. Mas o BCP deve planear para o **pior caso**, não para a média.

---

## 11. Resumo rápido

| Estratégia | Descrição | Custo | Tempo de ativação |
|------------|-----------|-------|--------------------|
| **Mirrored site** | Totalmente redundante, dados em tempo real | Muito alto | Minutos |
| **Hot site** | Equipamento configurado, sem dados recentes | Alto | < 24 horas |
| **Warm site** | Equipamento parcial, requer ativação | Médio | 1-7 dias |
| **Cold site** | Espaço vazio com utilidades básicas | Baixo | 15-30 dias |
| **Electronic vaulting** | Backups em lote para site remoto | Moderado | RPO: horas |
| **Remote journaling** | Transações em tempo real | Moderado-alto | RPO: minutos |
| **Database shadowing** | Replicação total em tempo real | Alto | RPO: zero |

---

**Próximos passos:** Explore a [Implementação e Operações](implementacao.md) para perceber como colocar o BCP em prática.
