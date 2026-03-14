# Estratégias de Recuperação

## Índice

1. [Visão geral das estratégias](#1-visao-geral-das-estrategias)
2. [Recuperação de instalacoes](#2-recuperacao-de-instalacoes)
3. [Recuperação de hardware](#3-recuperacao-de-hardware)
4. [Recuperação de software](#4-recuperacao-de-software)
5. [Recuperação de pessoal](#5-recuperacao-de-pessoal)
6. [Recuperação de dados](#6-recuperacao-de-dados)
7. [Exemplos práticos](#7-exemplos-praticos)
8. [Exercícios](#8-exercicios)
9. [Armadilhas e confusões a evitar](#9-armadilhas-e-confusoes-a-evitar)
10. [Resumo rápido](#10-resumo-rapido)

---

## 1. Visão geral das estratégias

Quando os controlos preventivos falham e o desastre acontece, a organização precisa de **estratégias de recuperação** previamente definidas. Estas estratégias cobrem cinco dimensoes fundamentais:

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║           ESTRATEGIAS DE RECUPERACAO DO DRP                   ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       ║
  ║   │ INSTALACOES  │  │   HARDWARE   │  │   SOFTWARE   │       ║
  ║   │              │  │              │  │              │       ║
  ║   │ Onde operar? │  │ Com que      │  │ Que sistemas │       ║
  ║   │              │  │ equipamento? │  │ restaurar?   │       ║
  ║   └──────────────┘  └──────────────┘  └──────────────┘       ║
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐                         ║
  ║   │   PESSOAL    │  │    DADOS     │                         ║
  ║   │              │  │              │                         ║
  ║   │ Quem opera?  │  │ Que dados    │                         ║
  ║   │              │  │ recuperar?   │                         ║
  ║   └──────────────┘  └──────────────┘                         ║
  ║                                                               ║
  ║   Fator decisivo na selecao: ─────────────────► CUSTO        ║
  ╚═══════════════════════════════════════════════════════════════╝
```

> O fator decisivo na selecao entre estratégias de recuperação e quase sempre o **custo**. A organização deve equilibrar o investimento em preparação com o risco e o impacto potencial de um desastre.

---

## 2. Recuperação de instalacoes

Quando o site primário fica inutilizavel, a organização precisa de um **local alternativo** para continuar operações. Existem várias opções, cada uma com diferentes níveis de prontidao, custo e tempo de ativação.

### Tipos de sites alternativos

```
  ┌─────────────────────────────────────────────────────────────┐
  │           ESPETRO DE SITES ALTERNATIVOS                      │
  │                                                              │
  │  Custo alto ◄──────────────────────────────► Custo baixo    │
  │  Ativação rápida ◄─────────────────────────► Ativação lenta │
  │                                                              │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
  │  │ Mirrored │  │ Hot Site │  │ Warm     │  │ Cold     │    │
  │  │ Site     │  │          │  │ Site     │  │ Site     │    │
  │  │          │  │          │  │          │  │          │    │
  │  │ Replicas │  │ Pronto,  │  │ Parcial- │  │ Apenas   │    │
  │  │ em tempo │  │ só falta │  │ mente    │  │ espaço e │    │
  │  │ real     │  │ dados    │  │ equipado │  │ energia  │    │
  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
  │                                                              │
  │  ◄── 24 horas ──►◄── 24 horas ──►◄── 1 semana ─►◄─ 30 dias │
  └─────────────────────────────────────────────────────────────┘
```

### Comparação detalhada

| Alternativa | Tempo de ativação | Prontidao | Custo |
|-------------|-------------------|-----------|-------|
| **Mirrored Site** | Menos de 24 horas | Totalmente redundante em todos os aspetos; replicação em tempo real | Muito alto |
| **Hot Site** | Menos de 24 horas | Equipamento e comunicações totalmente configurados; só precisa dos dados mais recentes | Alto |
| **Rolling Hot Site** | Geralmente 24 horas | Semelhante ao hot site mas foca-se apenas em operações de datacenter | Alto |
| **Warm Site** | Dentro de 1 semana | Entre hot e cold site: parcialmente configurado, sem dados ativos; requer alguma atividade de ativação | Medio |
| **Cold Site** | Até 30 dias | Contem apenas infraestrutura básica (eletricidade, climatizacao) sem equipamento ou comunicações ativas | Baixo |

### Descrição de cada tipo

#### Mirrored Site

O **mirrored site** e a opcao mais completa e mais cara. Funciona como uma copia exata do datacenter primário, com **replicação de dados em tempo real**. Se o site primário falhar, o mirrored site pode assumir quase instantaneamente.

| Vantagem | Desvantagem |
|----------|-------------|
| Recuperação quase instantânea | Custo muito elevado (duplicar toda a infraestrutura) |
| Sem perda de dados (RPO próximo de zero) | Manutenção de dois ambientes identicos |
| Transparente para os utilizadores | Complexidade de sincronização |

**Quando usar:** Organizacoes onde qualquer downtime e inaceitavel (bolsas de valores, bancos centrais, infraestruturas críticas nacionais).

---

#### Hot Site

O **hot site** e uma instalação totalmente equipada com hardware, software e comunicações prontos. A única coisa que falta e carregar os **dados mais recentes** a partir de backups.

| Vantagem | Desvantagem |
|----------|-------------|
| Ativação rápida (horas) | Custo elevado de manutenção |
| Hardware já instalado e configurado | Requer atualização regular do equipamento |
| Minimiza o tempo de inatividade | Pode haver alguma perda de dados (depende da frequência de backup) |

**Quando usar:** Organizacoes com requisitos de disponibilidade rigorosos mas que toleram algumas horas de downtime (bancos comerciais, hospitais de referência, grandes plataformas digitais).

---

#### Warm Site

O **warm site** e um compromisso entre custo e prontidao. O espaço está disponível e alguns preparativos já foram feitos, mas o site **não está pronto para operação imediata**.

| Vantagem | Desvantagem |
|----------|-------------|
| Custo moderado | Tempo de ativação de dias (não horas) |
| Alguma infraestrutura já pronta | Requer instalação e configuração adicional |
| Boa relação custo/benefício para PME | Possível perda de dados significativa |

**Quando usar:** PMEs e organizações com tolerância moderada a downtime (universidades, empresas de serviços, administração pública).

---

#### Cold Site

O **cold site** e a opcao mais económica. Contem apenas infraestrutura básica — eletricidade, climatizacao e espaço — mas **nenhum equipamento tecnológico**.

| Vantagem | Desvantagem |
|----------|-------------|
| Custo mais baixo | Tempo de ativação muito longo (semanas) |
| Manutenção mínima | Tudo precisa de ser instalado de raiz |
| Disponível como espaço | Grande perda de dados potencial |

**Quando usar:** Organizacoes com alta tolerância a downtime e orcamento limitado, ou como complemento de outro tipo de site.

---

### Outras opções

| Opcao | Descrição | Adequada para |
|-------|-----------|---------------|
| **Acordos reciprocos** | Duas organizações concordam em partilhar instalacoes em caso de desastre | PMEs do mesmo setor com infraestrutura semelhante |
| **Outsourcing** | Contratacao de serviços de recuperação a um fornecedor especializado | Organizacoes sem capacidade própria |
| **Rolling hot site** | Datacenter movel (contentores equipados) | Situacoes de emergência temporária ou organizações distribuidas |
| **Edificio pré-fabricado** | Estrutura temporária rapidamente montavel | Desastres naturais que destroem instalacoes |
| **Cloud (IaaS/DRaaS)** | Infraestrutura de recuperação em cloud pública ou privada | Qualquer organização; crescente popularidade |

### Regras de distância

As instalacoes alternativas devem respeitar distancias minimas para evitar que o mesmo desastre afete ambos os sites:

| Criticidade | Distância mínima recomendada |
|-------------|------------------------------|
| Ambientes de baixa/média criticidade | Pelo menos **15-25 km** |
| Operacoes críticas | **50-200 km** |

> Se o hotsite estiver no mesmo parque empresarial que o datacenter principal, uma inundacao regional pode afetar ambos. A distância não é um luxo — e uma medida de segurança.

---

## 3. Recuperação de hardware

A recuperação de hardware depende de **documentação atualizada de gestão de configuração**. Sem saber exatamente que equipamento existe, e impossível substitui-lo ou replica-lo eficazmente.

### O que documentar

| Elemento | Detalhe necessário | Porque |
|----------|-------------------|--------|
| **Servidores** | Modelo, configuração, localização, função | Para encomendar ou ativar substituicoes |
| **Equipamento de rede** | Switches, routers, firewalls, configurações | Para recriar a topologia de rede |
| **Armazenamento** | Tipo, capacidade, configuração RAID, replicação | Para restaurar dados corretamente |
| **Estacoes de trabalho** | Número, localização, configuração | Para retomar trabalho dos utilizadores |
| **Equipamento de comunicação** | PBX, telefones VoIP, videoconferência | Para manter comunicações |
| **Perifericos** | Impressoras, scanners, equipamento especializado | Para funções específicas |

### Papel dos SLAs

Os **Service Level Agreements (SLAs)** com fornecedores desempenham um papel essencial na recuperação de hardware:

- **Tempo de resposta garantido** para substituição de equipamento
- **Stock de peças** mantido pelo fornecedor
- **Prioridade** em caso de desastre (SLA com clausula de disaster recovery)
- **Equipamento de emprestimo** enquanto a substituição definitiva chega

```
  ┌───────────────────────────────────────────────────────┐
  │           CICLO DE RECUPERACAO DE HARDWARE              │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌──────────────┐  │
  │  │ Inventar │───►│ Encomendar / │───►│ Configurar e │  │
  │  │ danos    │    │ Acionar SLA  │    │ instalar     │  │
  │  └──────────┘    └──────────────┘    └──────┬───────┘  │
  │                                              │         │
  │  ┌──────────┐    ┌──────────────┐            │         │
  │  │ Validar  │◄───│ Restaurar    │◄───────────┘         │
  │  │ operação │    │ software e   │                      │
  │  │          │    │ dados        │                      │
  │  └──────────┘    └──────────────┘                      │
  └───────────────────────────────────────────────────────┘
```

### Métricas relevantes

Dois indicadores são particularmente uteis para planear a recuperação de hardware:

| Métrica | Significado | Utilidade no DRP |
|---------|-------------|-----------------|
| **MTBF** (Mean Time Between Failures) | Tempo médio entre avarias | Prever quando um dispositivo pode falhar; planear substituicoes preventivas |
| **MTTR** (Mean Time To Repair) | Tempo médio de reparação | Estimar quanto tempo a recuperação de hardware vai demorar |

---

## 4. Recuperação de software

A recuperação de software envolve garantir que **todos os sistemas operativos e aplicações críticas** podem ser reinstalados e reconfigurados rapidamente.

### Elementos críticos

| Elemento | O que documentar | Risco se não documentar |
|----------|-----------------|------------------------|
| **Sistemas operativos** | Versoes, patches aplicados, configurações específicas | Incompatibilidades; vulnerabilidades não corrigidas |
| **Informação de licenciamento** | Chaves de licença, contratos, contactos de fornecedores | Impossibilidade de reinstalar software licenciado |
| **Configuracoes** | Ficheiros de configuração, parâmetros de sistema, políticas | Sistemas instalados mas mal configurados |
| **Aplicacoes** | Versoes, dependências, procedimentos de instalação | Aplicacoes críticas não recuperadas ou incompativeis |
| **Software descontinuado** | Alternativas identificadas, planos de migração | Software crítico indisponível para reinstalacao |

### Plano para software descontinuado

Um dos riscos mais subestimados e a dependência de software que **já não está disponível para compra ou suporte**:

```
  ┌───────────────────────────────────────────────────────────┐
  │        RISCO: SOFTWARE DESCONTINUADO                       │
  │                                                            │
  │  Cenário: A aplicação de gestão de inventário (crítica)    │
  │  usa uma versão de software descontinuada em 2022.         │
  │                                                            │
  │  Se precisar de reinstalar:                                │
  │  ● A licença ainda e valida?                               │
  │  ● Os média de instalação existem?                         │
  │  ● O sistema operativo necessário ainda está disponível?   │
  │  ● Existe alternativa funcional?                           │
  │  ● Quanto tempo demora a migração?                         │
  │                                                            │
  │  Medidas preventivas:                                      │
  │  ► Manter copias de todos os média de instalação           │
  │  ► Documentar procedimentos completos de instalação        │
  │  ► Identificar alternativas antes de precisar delas        │
  │  ► Incluir migração de software no planeamento do DRP      │
  └───────────────────────────────────────────────────────────┘
```

---

## 5. Recuperação de pessoal

A recuperação não depende apenas de tecnologia. As **pessoas** são o recurso mais crítico e mais frequentemente esquecido no planeamento de recuperação.

### Principios fundamentais

| Principio | Descrição | Exemplo |
|-----------|-----------|---------|
| **Identificar pessoal essencial** | Nem todos os colaboradores são necessários na fase de recuperação | Equipa de IT e operações tem prioridade sobre equipa de marketing |
| **Eliminar pontos unicos de falha** | Nenhuma função crítica deve depender de uma única pessoa | Se o DBA principal está de ferias, alguém deve saber restaurar a base de dados |
| **Treinar substitutos** | Os backups humanos devem estar **formados e preparados** | Simulacoes regulares com equipas alternativas |
| **Planear a logística** | Se o site alternativo fica longe, como chegam la as pessoas? | Transporte, alojamento, alimentacao |
| **Não esquecer a folha de pagamento** | Mesmo durante um desastre, as pessoas precisam de ser pagas | Sistema de payroll deve ter continuidade garantida |

### Desafios de pessoal em situação de desastre

```
  ╔═══════════════════════════════════════════════════════════╗
  ║           DESAFIOS DE PESSOAL NO DRP                      ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║  ● Colaboradores podem ser pessoalmente afetados          ║
  ║    pelo desastre (casa, familia)                          ║
  ║                                                           ║
  ║  ● Stress e fadiga afetam a capacidade de decisão         ║
  ║                                                           ║
  ║  ● Deslocacao para site alternativo pode ser inviavel     ║
  ║    (distância, transporte, situação familiar)              ║
  ║                                                           ║
  ║  ● Pessoal-chave pode estar indisponível                  ║
  ║    (ferias, doenca, demissao recente)                      ║
  ║                                                           ║
  ║  ● Necessidade de trabalho por turnos prolongados          ║
  ║    (recuperação pode durar dias ou semanas)                 ║
  ║                                                           ║
  ║  ● Questoes legais de trabalho                             ║
  ║    (horas extraordinarias, segurança, seguros)              ║
  ╚═══════════════════════════════════════════════════════════╝
```

**Para refletir:**

- Se o único administrador de base de dados da empresa está de ferias no estrangeiro quando ocorre o desastre, o que acontece?
- Como se garante que as pessoas não se esgotam durante uma recuperação que dura duas semanas?
- O plano de pessoal deve incluir apoio psicologico? Em que situações?

---

## 6. Recuperação de dados

Para que os sites alternativos funcionem rapidamente, a organização precisa de **transferir dados para os novos sistemas**. As opções de recuperação de dados são determinadas pelas métricas da BIA (MTD, RTO, RPO).

### Metodos de recuperação de dados

| Método | Descrição | RPO típico | Custo |
|--------|-----------|-----------|-------|
| **Electronic vaulting** | Transferencia periodica e em lote de dados para instalação remota | Horas a 1 dia | Medio |
| **Remote journaling** | Transferencia em tempo real de transações para instalação remota; apenas transações, não dados arquivados | Minutos | Alto |
| **Database shadowing** | Processamento duplicado de dados em tempo real com replicação de bases de dados para múltiplos servidores remotos | Segundos | Muito alto |

```
  ┌─────────────────────────────────────────────────────────────┐
  │        METODOS DE RECUPERACAO DE DADOS                       │
  │                                                              │
  │  Electronic Vaulting                                         │
  │  ┌──────────┐     ┌──── Batch ────┐     ┌──────────┐       │
  │  │ Dados    │────►│ periódico     │────►│ Cofre    │       │
  │  │ primário │     │ (ex: diário)  │     │ remoto   │       │
  │  └──────────┘     └───────────────┘     └──────────┘       │
  │  RPO: horas a 1 dia                                         │
  │                                                              │
  │  Remote Journaling                                           │
  │  ┌──────────┐     ┌── Tempo real ─┐     ┌──────────┐       │
  │  │ Transac. │────►│ (apenas       │────►│ Journal  │       │
  │  │ ativas   │     │  transações)  │     │ remoto   │       │
  │  └──────────┘     └───────────────┘     └──────────┘       │
  │  RPO: minutos                                                │
  │                                                              │
  │  Database Shadowing                                          │
  │  ┌──────────┐     ┌── Tempo real ─┐     ┌──────────┐       │
  │  │ Base de  │────►│ (dados +      │────►│ Copias   │       │
  │  │ dados    │     │  estrutura)   │     │ múltiplas│       │
  │  └──────────┘     └───────────────┘     └──────────┘       │
  │  RPO: segundos                                               │
  └─────────────────────────────────────────────────────────────┘
```

### Política de backups no contexto DRP

Além dos métodos avancados de replicação, a **política de backups** tradicional contínua a ser fundamental:

| Tipo de backup | Descrição | Frequência típica | Uso no DRP |
|----------------|-----------|-------------------|-----------|
| **Completo (full)** | Copia todos os dados | Semanal | Base para restauro total |
| **Incremental** | Copia apenas dados alterados desde o último backup (qualquer tipo) | Diario | Restauro mais rápido, menor uso de espaço |
| **Diferencial** | Copia dados alterados desde o último backup completo | Diario | Compromisso entre velocidade e simplicidade |

### Regra 3-2-1

A regra de ouro para backups no contexto de DRP:

```
  ╔═══════════════════════════════════════════════╗
  ║           REGRA 3-2-1 DE BACKUPS              ║
  ╠═══════════════════════════════════════════════╣
  ║                                               ║
  ║  3  copias dos dados                          ║
  ║     (original + 2 backups)                    ║
  ║                                               ║
  ║  2  tipos de média diferentes                 ║
  ║     (disco + tape, ou disco + cloud)          ║
  ║                                               ║
  ║  1  copia off-site                            ║
  ║     (num local fisicamente separado)          ║
  ╚═══════════════════════════════════════════════╝
```

> Se os backups estão no mesmo datacenter que os dados primarios, uma inundacao destrói ambos. A copia off-site e o que distingue uma organização que recupera de uma que não recupera.

---

## 7. Exemplos práticos

### Exemplo 1 — Escolha de site alternativo para PME

**Cenário:** Uma PME de consultoria com 50 colaboradores e faturação de 2 milhoes/ano precisa de escolher uma estratégia de site alternativo. O datacenter está no escritório principal. A BIA indica MTD de 48 horas para o sistema de gestão de projetos e 72 horas para o email.

| Opcao | Custo anual | Tempo de ativação | Adequação |
|-------|-------------|-------------------|-----------|
| Mirrored site | 200.000 EUR | Minutos | Excessivo para o orcamento e necessidades |
| Hot site | 80.000 EUR | Horas | Acima do necessário (MTD e 48h) |
| Warm site | 25.000 EUR | 2-3 dias | Adequado ao MTD e ao orcamento |
| Cold site | 8.000 EUR | 2-4 semanas | Demasiado lento para o MTD |
| Cloud (DRaaS) | 15.000 EUR | Horas a 1 dia | Excelente relação custo/tempo |

**Como interpretar:** *Para está PME, as opções mais adequadas são o warm site ou o DRaaS (Disaster Recovery as a Service). O hotsite seria um luxo desnecessário e o cold site não cumpre o MTD. A cloud oferece uma alternativa moderna que combina custo moderado com tempo de ativação rápido.*

---

### Exemplo 2 — Backup corrompido durante restauro

**Cenário:** Uma empresa de logística ativa o DRP após um incêndio no datacenter. A equipa técnica inicia o restauro a partir dos backups offsite. Ao restaurar o sistema ERP, descobre que o último backup completo (domingo) está corrompido. O backup incremental de segunda e terça dependem do backup completo.

```
  ┌─────────────────────────────────────────────────────────┐
  │              CRONOLOGIA DE BACKUPS                       │
  │                                                          │
  │  Domingo    Segunda    Terca     Quarta     INCENDIO    │
  │  (full)     (incr.)    (incr.)   (incr.)    (quinta)    │
  │    ✗           ✗          ✗         ✓                   │
  │  corrupto   depende    depende   último                 │
  │             do full    do full   incremental             │
  │                                 independente?            │
  │                                                          │
  │  Opcao: usar backup completo de domingo ANTERIOR         │
  │  (há 2 semanas) + incrementais disponíveis               │
  │  RPO real: ~2 semanas (vs RPO planeado: 24h)             │
  └─────────────────────────────────────────────────────────┘
```

**Como interpretar:** *Este cenário demonstra porque e crítico **testar regularmente os backups**. Um backup nunca testado e um backup que pode não funcionar. O RPO real (2 semanas de perda de dados) e muito pior do que o RPO planeado (24 horas). A diferença pode significar perda de encomendas, faturação e dados de clientes.*

**Para refletir:**

- Com que frequência devem os backups ser testados?
- O backup incremental de quarta pode ser utilizado sem o full de domingo?
- Que dados foram perdidos nestes 10 dias? Qual o impacto no negócio?

---

## 8. Exercícios

### Nível 1 — Compreensão

**Exercício 1.1 — Associar sites ao cenário**

Para cada organização, indique o tipo de site alternativo mais adequado e justifique:

1. Banco central nacional (operações de mercado financeiro)
2. Escritório de advocacia com 10 advogados
3. Fábrica de mobiliario com 200 operarios
4. Hospital de referência regional

??? success "Solução 1.1"

    1. **Banco central** → **Mirrored site** — Nenhum downtime e aceitável. As operações de mercado financeiro não podem parar. RPO próximo de zero.
    2. **Escritório de advocacia** → **Cloud (DRaaS)** ou **Cold site** — MTD elevado (dias). Documentos podem estar em cloud. Custo e o fator determinante para uma empresa pequena.
    3. **Fábrica de mobiliario** → **Warm site** ou acordo reciproco — A produção física não é facilmente replicavel. O foco seria nos sistemas administrativos e de gestão.
    4. **Hospital de referência** → **Hot site** — Sistemas clínicos não podem ficar indisponíveis por mais de horas. Vidas dependem do sistema.

---

**Exercício 1.2 — Completar a tabela**

Complete a tabela com as informações em falta:

| Método de recuperação de dados | Tipo de transferência | RPO típico | Custo relativo |
|-------------------------------|----------------------|-----------|----------------|
| Electronic vaulting | ? | ? | Medio |
| ? | Tempo real (transações) | Minutos | ? |
| Database shadowing | ? | ? | Muito alto |

??? success "Solução 1.2"

    | Método de recuperação de dados | Tipo de transferência | RPO típico | Custo relativo |
    |-------------------------------|----------------------|-----------|----------------|
    | Electronic vaulting | **Batch periódico** | **Horas a 1 dia** | Medio |
    | **Remote journaling** | Tempo real (transações) | Minutos | **Alto** |
    | Database shadowing | **Tempo real (dados + estrutura)** | **Segundos** | Muito alto |

---

### Nível 2 — Aplicação prática

**Exercício 2.1 — Calcular o investimento adequado**

Uma empresa de e-commerce tem os seguintes dados da BIA:

- Faturação diaria média: 150.000 EUR
- MTD do sistema de vendas: 4 horas
- RPO: 1 hora
- Custo estimado por hora de downtime: 25.000 EUR

Considere as seguintes opções:

| Opcao | Custo anual | Tempo de ativação | RPO garantido |
|-------|-------------|-------------------|---------------|
| Hot site próprio | 120.000 EUR | 2 horas | 1 hora |
| DRaaS (cloud) | 48.000 EUR | 1 hora | 15 minutos |
| Warm site | 30.000 EUR | 3 dias | 24 horas |

Qual opcao recomendaria? Justifique com base nos dados.

??? success "Solução 2.1"

    **Recomendacao: DRaaS (cloud)**

    Análise:

    - O **warm site** está excluído a partida: tempo de ativação de 3 dias excede largamente o MTD de 4 horas, e o RPO de 24h excede o requisito de 1h.
    - O **hot site próprio** cumpre os requisitos (2h < 4h MTD; 1h = RPO exigido) mas custa 120.000 EUR/ano.
    - O **DRaaS** cumpre os requisitos com margem (1h < 4h MTD; 15min < 1h RPO) e custa 48.000 EUR/ano.

    **Análise custo-benefício:**
    - Custo de 1 dia de downtime: ~150.000 EUR
    - Custo anual do DRaaS: 48.000 EUR
    - Se o DRaaS evitar sequer **1 desastre a cada 3 anos**, o investimento já está justificado
    - Poupança vs hot site: 72.000 EUR/ano com melhor RPO

---

## 9. Armadilhas e confusões a evitar

### 1. "O mais caro e sempre o melhor"

**Errado.** Um mirrored site para uma PME de consultoria e um desperdicio de recursos. A estratégia deve ser proporcional ao risco e ao impacto. O MTD e o RPO determinados pela BIA são os guias, não o medo.

---

### 2. "Os backups estão a ser feitos, logo estamos protegidos"

**Errado.** Backups que nunca foram testados podem estar corrompidos, incompletos ou incompativeis com o hardware de recuperação. A única forma de saber se um backup funciona e **testa-lo regularmente**.

---

### 3. "A cloud resolve tudo"

**Parcialmente errado.** A cloud e uma excelente opcao para muitas organizações, mas não é uma solução magica. E preciso considerar:

- Conectividade de rede durante o desastre
- Custos de transferência de dados
- Dependencia do fornecedor de cloud
- Conformidade regulatória (onde estão os dados?)
- Tempo real de restauro (não apenas tempo teórico)

---

### 4. "O site alternativo está a 5 km, e suficiente"

**Arriscado.** Se o desastre e regional (inundacao, terramoto, tempestade), ambos os sites podem ser afetados. A distância mínima recomendada e 15-25 km para situações de baixa criticidade e 50-200 km para operações críticas.

---

### 5. "Só precisamos de recuperar a tecnologia"

**Errado.** A recuperação envolve cinco dimensoes: instalacoes, hardware, software, **pessoal** e dados. Negligenciar qualquer uma delas compromete toda a recuperação.

---

## 10. Resumo rápido

### Tabela de sintese

| Estratégia | Descrição-chave |
|------------|----------------|
| **Mirrored site** | Replica exata em tempo real; custo máximo; RPO~0 |
| **Hot site** | Pronto, só falta dados recentes; ativação em horas |
| **Warm site** | Parcialmente equipado; ativação em dias; custo moderado |
| **Cold site** | Só espaço e energia; ativação em semanas; custo mínimo |
| **Electronic vaulting** | Backup batch para local remoto; RPO horas/dia |
| **Remote journaling** | Transacoes em tempo real; RPO minutos |
| **Database shadowing** | Replicacao total em tempo real; RPO segundos |
| **Regra 3-2-1** | 3 copias, 2 médias diferentes, 1 offsite |

### Frases-chave para recordar

- *"O fator decisivo e quase sempre o custo — mas o custo do downtime também conta."*
- *"Um backup nunca testado e um backup que pode não funcionar."*
- *"A distância entre sites não é um luxo — e uma medida de segurança."*
- *"Recuperar dados sem pessoas treinadas e como ter peças sem mecânico."*
- *"A regra 3-2-1 não é uma sugestao — e o mínimo aceitável."*
