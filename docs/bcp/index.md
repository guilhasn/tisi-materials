# Business Continuity Plan (BCP) - Fundamentos

## Índice

1. [Visão geral](#1-visao-geral)
2. [BCP vs DRP — qual é a diferença?](#2-bcp-vs-drp-qual-e-a-diferenca)
3. [O papel do CEO no BCP](#3-o-papel-do-ceo-no-bcp)
4. [Funções críticas de negócio](#4-funcoes-criticas-de-negocio)
5. [Estrutura do BCP](#5-estrutura-do-bcp)
6. [Relação com os outros planos](#6-relacao-com-os-outros-planos)
7. [Exemplos práticos](#7-exemplos-praticos)
8. [Exercícios](#8-exercicios)
9. [Armadilhas e confusões a evitar](#9-armadilhas-e-confusoes-a-evitar)
10. [Resumo rápido](#10-resumo-rapido)

---

## 1. Visão geral

O **Business Continuity Plan (BCP)** é o plano que garante que a organização consegue **manter as suas funções críticas de negócio em funcionamento** durante e após um desastre de grande escala.

> Se o DRP responde à pergunta "como recuperamos a infraestrutura técnica?", o BCP responde à pergunta "como mantemos o **negócio** a funcionar enquanto isso acontece?"

O BCP é o plano de nível mais alto no planeamento de contingência. É ativado **em simultâneo com o DRP** quando o desastre é grave ou prolongado e requer uma resposta organizacional completa.

```
  ╔══════════════════════════════════════════════════════════════╗
  ║            BUSINESS CONTINUITY PLAN (BCP)                    ║
  ╠══════════════════════════════════════════════════════════════╣
  ║                                                              ║
  ║   ┌──────────────────┐  ┌──────────────────┐                 ║
  ║   │   CONTINUIDADE   │  │   RECUPERAÇÃO    │                 ║
  ║   │   DO NEGÓCIO     │  │   DO NEGÓCIO     │                 ║
  ║   │                  │  │                  │                 ║
  ║   │  Manter funções  │  │  Restaurar       │                 ║
  ║   │  críticas num    │  │  operações       │                 ║
  ║   │  site alternativo│  │  normais         │                 ║
  ║   └────────┬─────────┘  └────────┬─────────┘                 ║
  ║            │                     │                            ║
  ║            ▼                     ▼                            ║
  ║     Processos mínimos      Regresso ao site                  ║
  ║     para sobrevivência     primário ou novo                  ║
  ║     do negócio             site permanente                   ║
  ╚══════════════════════════════════════════════════════════════╝
```

### O que o BCP cobre

O BCP abrange **toda a organização**, não apenas a componente tecnológica:

| Dimensão | Exemplos |
|----------|----------|
| **Pessoas** | Pessoal essencial, famílias, folha de salários, deslocação |
| **Processos** | Funções críticas de negócio, procedimentos alternativos |
| **Tecnologia** | Sistemas de informação, comunicações, dados |
| **Instalações** | Site alternativo, logística, segurança física |
| **Stakeholders** | Clientes, fornecedores, reguladores, média |
| **Financeiro** | Fluxo de caixa, seguros, custos de recuperação |

---

## 2. BCP vs DRP — qual é a diferença?

Esta é uma das confusões mais frequentes. Embora BCP e DRP se complementem e sejam ativados em paralelo, têm **focos distintos**:

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║          BCP vs DRP — FOCO E RESPONSABILIDADE                 ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌─────────────────────┐    ┌─────────────────────┐          ║
  ║   │        BCP          │    │        DRP          │          ║
  ║   │                     │    │                     │          ║
  ║   │  ● Negócio          │    │  ● Tecnologia       │          ║
  ║   │  ● CEO/Direção      │    │  ● CIO/CISO         │          ║
  ║   │  ● Site alternativo │    │  ● Site primário     │          ║
  ║   │  ● Longo prazo      │    │  ● Curto prazo       │          ║
  ║   │  ● Estratégico      │    │  ● Operacional       │          ║
  ║   └──────────┬──────────┘    └──────────┬──────────┘          ║
  ║              │                          │                      ║
  ║              └──────────┬───────────────┘                      ║
  ║                         │                                      ║
  ║                         ▼                                      ║
  ║              Ativados em PARALELO                              ║
  ║              durante desastre grave                            ║
  ╚═══════════════════════════════════════════════════════════════╝
```

| Aspeto | BCP | DRP |
|--------|-----|-----|
| **Foco principal** | Continuidade das funções de negócio | Recuperação da infraestrutura técnica |
| **Responsável** | CEO / Direção geral | Diretor de TI / CISO |
| **Objetivo** | Manter operações num site alternativo | Restaurar sistemas no site primário |
| **Horizonte temporal** | Médio/longo prazo (semanas a meses) | Curto prazo (horas a semanas) |
| **Natureza** | Estratégica e organizacional | Técnica e operacional |
| **Pergunta-chave** | "Como sobrevive o negócio?" | "Como recuperamos os sistemas?" |

### Quando é ativado cada plano?

```
  Evento
    │
    ▼
  ┌──────────────┐     ┌──────────┐
  │  Incidente   │────►│   IRP    │  Equipa de resposta a incidentes
  │  (limitado)  │     └──────────┘
  └──────────────┘
         │
         │ Escala?
         ▼
  ┌──────────────┐     ┌──────────┐     ┌──────────┐
  │  Desastre    │────►│   DRP    │────►│   BCP    │
  │  (grave)     │     │          │     │          │
  └──────────────┘     │ Recuperar│     │ Manter o │
                       │ sistemas │     │ negócio  │
                       └──────────┘     └──────────┘
                             │                │
                             └───── Em paralelo ────┘
```

> **Ponto crítico:** O BCP é ativado **concorrentemente** com o DRP quando o desastre é grave ou de longa duração. Enquanto o DRP se concentra em recuperar a infraestrutura técnica no site primário, o BCP garante que as funções críticas do negócio continuam num local alternativo.

---

## 3. O papel do CEO no BCP

Ao contrário do IRP (gerido pela equipa de segurança) e do DRP (gerido pela equipa de TI), o BCP é **propriedade da Direção da organização**.

### Porquê o CEO?

O BCP envolve decisões que vão muito além da tecnologia:

- **Investimentos significativos** — contratar sites alternativos, seguros, redundância
- **Impacto em toda a organização** — não apenas TI, mas RH, finanças, jurídico, operações
- **Relações com stakeholders** — clientes, reguladores, média, acionistas
- **Decisões estratégicas** — priorizar funções de negócio, aceitar riscos residuais
- **Autoridade** — apenas a Direção pode decidir que funções sacrificar temporariamente

### Estrutura de governação do BCP

```
  ┌─────────────────────────────────────┐
  │            CEO / Direção            │
  │      (Proprietário do BCP)          │
  │                                     │
  │   ● Aprova o plano                  │
  │   ● Aloca orçamento                 │
  │   ● Define prioridades de negócio   │
  └──────────────┬──────────────────────┘
                 │
                 ▼
  ┌─────────────────────────────────────┐
  │     Coordenador BCP                 │
  │                                     │
  │   ● Gere o programa de BC           │
  │   ● Coordena equipas                │
  │   ● Mantém o plano atualizado       │
  │   ● Pode declarar desastre          │
  └──────────────┬──────────────────────┘
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
  ┌────────┐ ┌────────┐ ┌────────┐
  │Equipa  │ │Equipa  │ │Equipa  │
  │TI/DRP  │ │Operac. │ │Comunic.│
  │        │ │        │ │        │
  │Recup.  │ │Funções │ │Media,  │
  │técnica │ │negócio │ │stakeh. │
  └────────┘ └────────┘ └────────┘
```

!!! warning "Declaração de desastre"
    **Qualquer pessoa pode declarar uma emergência** (puxar o alarme de incêndio, evacuar). Mas **apenas o coordenador do BCP** (ou alguém designado no plano) pode **declarar um desastre**, o que ativa o failover para instalações alternativas e mobiliza toda a estrutura de continuidade.

---

## 4. Funções críticas de negócio

A base do BCP é a **identificação das funções críticas de negócio** — aquelas sem as quais a organização não sobrevive.

### Como identificar funções críticas

Esta identificação é feita durante a **BIA (Business Impact Analysis)** e alimenta diretamente o BCP:

```
  ╔═══════════════════════════════════════════════════════════╗
  ║         DA BIA AO BCP — FLUXO DE DECISÃO                  ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                            ║
  ║   BIA identifica          BCP garante                      ║
  ║   ┌────────────┐          ┌────────────────────┐           ║
  ║   │ Função X   │          │ Função X contínua   │           ║
  ║   │ MTD = 4h   │ ───────► │ no site alternativo │           ║
  ║   │ RTO = 2h   │          │ em < 2h             │           ║
  ║   │ RPO = 1h   │          │ com dados de < 1h   │           ║
  ║   └────────────┘          └────────────────────┘           ║
  ║                                                            ║
  ║   BIA prioriza            BCP implementa                   ║
  ║   ┌────────────┐          ┌────────────────────┐           ║
  ║   │ Tier 1:    │          │ Hot site +          │           ║
  ║   │ Críticas   │ ───────► │ replicação          │           ║
  ║   │            │          │ em tempo real       │           ║
  ║   ├────────────┤          ├────────────────────┤           ║
  ║   │ Tier 2:    │          │ Warm site +         │           ║
  ║   │ Important. │ ───────► │ backups diários     │           ║
  ║   │            │          │                     │           ║
  ║   ├────────────┤          ├────────────────────┤           ║
  ║   │ Tier 3:    │          │ Cold site +         │           ║
  ║   │ Normais    │ ───────► │ backups semanais    │           ║
  ║   └────────────┘          └────────────────────┘           ║
  ╚═══════════════════════════════════════════════════════════╝
```

### Categorização de funções

| Categoria | Descrição | MTD típico | Estratégia BCP |
|-----------|-----------|------------|----------------|
| **Tier 1 — Missão crítica** | Sem estas a organização não sobrevive | < 4 horas | Hot/mirrored site, replicação real-time |
| **Tier 2 — Vitais** | Impacto financeiro/legal grave se paradas | 4-24 horas | Warm site, backups frequentes |
| **Tier 3 — Importantes** | Afetam eficiência, mas não sobrevivência | 1-7 dias | Cold site, backups regulares |
| **Tier 4 — Operacionais** | Podem ser adiadas temporariamente | > 7 dias | Procedimentos manuais temporários |

### Recursos necessários por função

Para cada função crítica, o BCP deve identificar:

- **Pessoal** — Quem é necessário? Existem substitutos?
- **Tecnologia** — Que sistemas e aplicações são indispensáveis?
- **Dados** — Que informação é necessária e qual o RPO aceitável?
- **Instalações** — Que espaço físico é necessário?
- **Equipamento** — Que hardware ou material específico é preciso?
- **Fornecedores** — Que dependências externas existem?

---

## 5. Estrutura do BCP

O BCP é um documento abrangente que cobre toda a organização. A sua estrutura típica inclui:

### Componentes principais

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              ESTRUTURA TÍPICA DO BCP                          ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   1. Política e âmbito                                        ║
  ║      ● Objetivos, âmbito, pressupostos                        ║
  ║      ● Aprovação da Direção                                   ║
  ║                                                               ║
  ║   2. Análise de impacto (referência à BIA)                    ║
  ║      ● Funções críticas e métricas                            ║
  ║      ● Dependências e prioridades                             ║
  ║                                                               ║
  ║   3. Estratégias de continuidade                              ║
  ║      ● Instalações alternativas                               ║
  ║      ● Recuperação de hardware, software, dados               ║
  ║      ● Pessoal e comunicações                                 ║
  ║                                                               ║
  ║   4. Procedimentos operacionais                               ║
  ║      ● Ativação do plano                                      ║
  ║      ● Operação no site alternativo                           ║
  ║      ● Regresso ao site primário                              ║
  ║                                                               ║
  ║   5. Plano de comunicação                                     ║
  ║      ● Stakeholders e canais                                  ║
  ║      ● Templates de comunicação                               ║
  ║                                                               ║
  ║   6. Testes e manutenção                                      ║
  ║      ● Calendário de testes                                   ║
  ║      ● Processo de atualização                                ║
  ║                                                               ║
  ║   7. Anexos                                                   ║
  ║      ● Listas de contacto, contratos, inventários             ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Distribuição e segurança do plano

| Aspeto | Requisito |
|--------|-----------|
| **Cópias** | Múltiplas localizações (eletrónicas e em papel) |
| **Acesso** | Need-to-know — maioria dos colaboradores vê apenas a sua parte |
| **Atualização** | Versões anteriores devem ser recolhidas e destruídas |
| **Armazenamento** | Pelo menos uma cópia fora do site primário |
| **Formato** | Digital (acessível remotamente) + papel (independente de TI) |

!!! info "Princípio need-to-know"
    O BCP é frequentemente criado como um plano empresarial com **secções departamentais**. Cada gestor funcional é responsável pelo plano específico do seu departamento. A maioria dos colaboradores só terá acesso a uma pequena parte do plano — a que diz respeito à sua função.

---

## 6. Relação com os outros planos

O BCP não existe isoladamente. Faz parte de uma **cadeia de planeamento de contingência** onde cada plano alimenta o seguinte:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │            CADEIA DE PLANEAMENTO DE CONTINGÊNCIA                 │
  │                                                                  │
  │   ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐          │
  │   │  BIA   │───►│  IRP   │───►│  DRP   │───►│  BCP   │          │
  │   │        │    │        │    │        │    │        │          │
  │   │Análise │    │Resposta│    │Recupe- │    │Conti-  │          │
  │   │de      │    │a inci- │    │ração de│    │nuidade │          │
  │   │impacto │    │dentes  │    │desastre│    │de      │          │
  │   │        │    │        │    │        │    │negócio │          │
  │   └────────┘    └────────┘    └────────┘    └────────┘          │
  │       │              │              │              │             │
  │       ▼              ▼              ▼              ▼             │
  │   Identifica    Responde a     Recupera a     Mantém o          │
  │   o que é       eventos de     infra. após    negócio           │
  │   crítico       segurança      desastre       a funcionar       │
  │                                                                  │
  │   ────────────────────────────────────────────────────►          │
  │        Âmbito e complexidade crescentes                          │
  └─────────────────────────────────────────────────────────────────┘
```

### O que cada plano fornece ao BCP

| Plano | Contribuição para o BCP |
|-------|------------------------|
| **BIA** | Funções críticas, métricas (MTD, RTO, RPO), prioridades de recuperação |
| **IRP** | Procedimentos de escalação, critérios para declarar desastre |
| **DRP** | Estratégias técnicas de recuperação, coordenação da componente TI |

### Ciclo de vida integrado

```
  ┌─────────┐
  │  BIA    │◄──────────────────────────────────┐
  │ (anual) │                                    │
  └────┬────┘                                    │
       │ Alimenta                                │
       ▼                                         │
  ┌─────────┐    ┌─────────┐    ┌─────────┐     │
  │  IRP    │───►│  DRP    │───►│  BCP    │     │
  └─────────┘    └─────────┘    └────┬────┘     │
                                     │           │
                                     ▼           │
                              ┌──────────────┐   │
                              │ Testes e     │   │
                              │ exercícios   │───┘
                              │ (anuais)     │
                              └──────────────┘
                                     │
                                     ▼
                              Lições aprendidas
                              alimentam nova BIA
```

---

## 7. Exemplos práticos

### Exemplo 1 — Empresa de comércio eletrónico

**Contexto:** Uma empresa de e-commerce com 500 colaboradores sofre uma inundação que destrói o escritório central e o datacenter principal.

**Sem BCP:**

- Website fica offline — clientes não conseguem comprar
- Equipa de apoio ao cliente sem acesso a sistemas
- Processamento de encomendas parado
- Fornecedores não são informados
- Após 3 dias, começam a perder clientes para concorrentes
- Recuperação total demora 6 semanas

**Com BCP:**

- Website migra para cloud em 2 horas (hot site pré-configurado)
- Equipa de apoio ao cliente opera remotamente em 4 horas
- Processamento de encomendas retomado em 6 horas (modo reduzido)
- Comunicação a clientes e fornecedores em 1 hora
- Operações normais restauradas em 5 dias

### Exemplo 2 — Hospital regional

**Contexto:** Um hospital com 200 camas é atingido por um sismo de magnitude 6.2. A estrutura principal mantém-se, mas sistemas críticos ficam danificados.

**Ativação do BCP:**

| Tempo | Ação | Responsável |
|-------|------|-------------|
| T+0 min | Evacuação e triagem de pacientes | Diretor clínico |
| T+15 min | Avaliação estrutural do edifício | Equipa de segurança |
| T+30 min | Ativação do plano de emergência clínica | CEO |
| T+1 hora | Transferência de pacientes críticos | Coordenador BCP |
| T+2 horas | Ativação do hospital de campanha (pré-contratado) | Equipa logística |
| T+4 horas | Sistemas clínicos essenciais operacionais (warm site) | Equipa TI/DRP |
| T+8 horas | Comunicação a famílias, ARS, tutela | Equipa comunicação |
| T+24 horas | Operação estabilizada no site alternativo | Todas as equipas |

### Exemplo 3 — Câmara Municipal

**Contexto:** Uma câmara municipal sofre um incêndio que destrói o edifício dos serviços administrativos. O arquivo documental fica severamente danificado.

**Funções críticas identificadas na BIA:**

1. **Tier 1:** Atendimento ao cidadão (certidões, registos) — MTD 24h
2. **Tier 1:** Processamento de salários (800 funcionários) — MTD 48h
3. **Tier 2:** Licenciamento urbanístico — MTD 5 dias
4. **Tier 2:** Contratação pública — MTD 5 dias
5. **Tier 3:** Gestão de espaços verdes — MTD 15 dias

**Resposta BCP:** Instalação temporária numa escola secundária encerrada para obras, com postos de atendimento ao público operacionais em 48 horas. Sistemas de informação recuperados a partir de backups na cloud (RPO de 4 horas).

---

## 8. Exercícios

### Exercício 1 — Distinção BCP/DRP (Nível básico)

Uma empresa de logística sofre um incêndio no armazém central. Classifique cada ação como pertencente ao **BCP** ou ao **DRP**:

| Ação | BCP ou DRP? |
|------|-------------|
| a) Restaurar servidores a partir de backups | ? |
| b) Transferir operações para armazém secundário | ? |
| c) Redirecionar encomendas para parceiro logístico | ? |
| d) Recuperar a rede de comunicações | ? |
| e) Informar clientes sobre atrasos nas entregas | ? |
| f) Reparar o sistema ERP | ? |
| g) Negociar espaço temporário para escritórios | ? |
| h) Garantir continuidade do processamento de salários | ? |

??? success "Solução 1"
    | Ação | Classificação | Justificação |
    |------|--------------|--------------|
    | a) Restaurar servidores | **DRP** | Recuperação de infraestrutura técnica |
    | b) Transferir para armazém secundário | **BCP** | Continuidade de operações num site alternativo |
    | c) Redirecionar encomendas | **BCP** | Manter função crítica de negócio (entregas) |
    | d) Recuperar rede | **DRP** | Restauro de componente técnica |
    | e) Informar clientes | **BCP** | Gestão de stakeholders e comunicação |
    | f) Reparar ERP | **DRP** | Recuperação de sistema de informação |
    | g) Negociar espaço temporário | **BCP** | Estratégia de instalações alternativas |
    | h) Processamento de salários | **BCP** | Continuidade de função crítica de negócio |

### Exercício 2 — Priorização de funções (Nível intermédio)

Uma universidade com 15.000 alunos está a desenvolver o seu BCP. Classifique as seguintes funções nos Tiers adequados (1 a 4) e justifique:

1. Plataforma de e-learning (Moodle)
2. Sistema de matrículas
3. Biblioteca digital
4. Investigação laboratorial em curso
5. Serviço de cantina
6. Processamento de bolsas de estudo
7. Email institucional
8. Website institucional

??? success "Solução 2"
    | Função | Tier | Justificação |
    |--------|------|-------------|
    | Plataforma de e-learning | **Tier 1** | Essencial para continuidade pedagógica de 15.000 alunos; impacto imediato se parada |
    | Sistema de matrículas | **Tier 2** | Crítico em períodos específicos (início de semestre); fora desses períodos pode esperar dias |
    | Biblioteca digital | **Tier 3** | Importante para ensino e investigação, mas existem alternativas temporárias |
    | Investigação laboratorial | **Tier 2** | Pode envolver experiências irreversíveis ou dados únicos; depende do tipo de investigação |
    | Serviço de cantina | **Tier 3** | Existem alternativas (restaurantes próximos); importante mas não crítico |
    | Processamento de bolsas | **Tier 2** | Impacto financeiro direto nos alunos; atrasos podem ser tolerados alguns dias |
    | Email institucional | **Tier 1** | Canal de comunicação principal; essencial para coordenação durante crise |
    | Website institucional | **Tier 2** | Canal de comunicação externa; importante para informar comunidade |

    **Nota:** A classificação pode variar conforme o contexto e a época do ano. Durante o período de matrículas, o sistema de matrículas passaria a Tier 1.

### Exercício 3 — Desenhar a estrutura de governação (Nível avançado)

Uma empresa industrial com 3 fábricas, 2.000 colaboradores e operações em 3 países precisa de definir a estrutura de governação do BCP. A empresa tem:

- CEO e Conselho de Administração
- Diretor de Operações (COO)
- Diretor Financeiro (CFO)
- Diretor de TI (CIO)
- 3 Diretores de fábrica
- Departamento jurídico
- Departamento de RH
- Departamento de comunicação

**Tarefa:** Desenhe a estrutura de governação do BCP, identificando:

a) Quem é o proprietário do plano?
b) Quem deve ser o coordenador do BCP?
c) Que equipas devem existir e quem as lidera?
d) Quem pode declarar desastre?
e) Como se articula com os planos locais de cada fábrica?

??? success "Solução 3"
    **a) Proprietário:** O **CEO** com aprovação do Conselho de Administração. É uma decisão estratégica que afeta toda a organização multinacional.

    **b) Coordenador BCP:** O **COO** é o candidato ideal — tem visão transversal das operações, autoridade sobre as 3 fábricas e experiência operacional. Alternativamente, pode ser nomeado um coordenador dedicado que reporte ao COO.

    **c) Equipas:**

    | Equipa | Líder | Responsabilidade |
    |--------|-------|-----------------|
    | Equipa de crise executiva | CEO | Decisões estratégicas, declaração de desastre |
    | Equipa de continuidade operacional | COO | Coordenação entre fábricas, processos alternativos |
    | Equipa de recuperação TI (DRP) | CIO | Sistemas, dados, comunicações |
    | Equipa financeira e seguros | CFO | Fluxo de caixa, seguros, custos de recuperação |
    | Equipa de comunicação | Dir. Comunicação | Media, stakeholders, comunicação interna |
    | Equipa de pessoal | Dir. RH | Pessoal, famílias, deslocação, folha de salários |
    | Equipa jurídica | Dir. Jurídico | Contratos, compliance, responsabilidade legal |
    | Equipas locais (×3) | Dir. Fábrica | Execução local do BCP em cada instalação |

    **d) Declaração de desastre:** O **COO** (coordenador BCP) pode declarar desastre, com notificação imediata ao CEO. Em caso de indisponibilidade do COO, a cadeia de substituição é: CIO → CFO → Diretor de fábrica mais sénior.

    **e) Articulação com planos locais:** Cada fábrica tem um **plano local de continuidade** (sub-plano do BCP corporativo) que cobre cenários específicos da instalação. Os planos locais são coordenados pelo BCP corporativo para garantir consistência. Cenários que afetem mais do que uma fábrica ativam o BCP corporativo.

---

## 9. Armadilhas e confusões a evitar

!!! danger "Confusão 1: O BCP é apenas um plano de TI"
    **Errado.** O BCP é um plano de **negócio**, não de tecnologia. Abrange pessoas, processos, instalações, comunicação e finanças. O plano de TI é o DRP, que é uma componente do BCP.

!!! danger "Confusão 2: O DRP substitui o BCP"
    **Errado.** São planos complementares com focos diferentes. O DRP recupera a infraestrutura técnica; o BCP mantém o negócio em funcionamento. Uma organização precisa de ambos.

!!! danger "Confusão 3: O BCP só se ativa quando o DRP falha"
    **Errado.** O BCP é ativado **em paralelo** com o DRP quando o desastre é grave. Não é uma escalação — é uma ativação **simultânea** com foco diferente.

!!! danger "Confusão 4: Qualquer pessoa pode declarar um desastre"
    **Errado.** Qualquer pessoa pode declarar uma **emergência** (puxar o alarme). Mas apenas o **coordenador do BCP** ou pessoa designada no plano pode declarar um **desastre**, ativando o failover para instalações alternativas.

!!! danger "Confusão 5: O BCP é escrito uma vez e guardado na prateleira"
    **Errado.** O BCP é um **documento vivo** que deve ser testado, atualizado e revisto regularmente. Um plano desatualizado é quase tão perigoso como não ter plano nenhum.

!!! danger "Confusão 6: Todos os colaboradores precisam de conhecer o BCP inteiro"
    **Errado.** O BCP segue o princípio de **need-to-know**. A maioria dos colaboradores só precisa de conhecer a parte que diz respeito à sua função. Distribuir o plano completo pode até ser um risco de segurança.

---

## 10. Resumo rápido

| Conceito | Descrição |
|----------|-----------|
| **O que é** | Plano para manter funções críticas de negócio durante/após desastre |
| **Quem gere** | CEO / Direção geral |
| **Quando ativa** | Em paralelo com o DRP, em desastres graves ou prolongados |
| **Foco** | Continuidade do negócio (não recuperação técnica) |
| **Base** | Funções críticas identificadas na BIA |
| **Estrutura** | Documento empresarial com secções departamentais |
| **Declaração de desastre** | Apenas o coordenador BCP pode declarar |
| **Distribuição** | Need-to-know, cópias em múltiplas localizações |
| **Manutenção** | Atualização contínua, testes anuais |

---

**Próximos passos:** Explore as [Estratégias de Continuidade](estrategias.md) para aprofundar as opções de recuperação de instalações, hardware, software, pessoal e dados.
