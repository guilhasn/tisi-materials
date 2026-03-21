# Normas e Frameworks

## Índice

1. [Visão geral](#1-visao-geral)
2. [ISO 22301 — Gestão de Continuidade de Negócio](#2-iso-22301-gestao-de-continuidade-de-negocio)
3. [ISO 27031:2025 — Prontidão de TIC](#3-iso-270312025-prontidao-de-tic)
4. [NIST SP 800-34 — Contingency Planning Guide](#4-nist-sp-800-34-contingency-planning-guide)
5. [DRII — Disaster Recovery Institute International](#5-drii-disaster-recovery-institute-international)
6. [BCI GPG — Good Practice Guidelines](#6-bci-gpg-good-practice-guidelines)
7. [Comparação entre frameworks](#7-comparacao-entre-frameworks)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)

---

## 1. Visão geral

O planeamento de continuidade de negócio não é feito no vazio — existe um conjunto de **normas e frameworks internacionais** que orientam as organizações na criação, implementação e manutenção dos seus planos.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         NORMAS E FRAMEWORKS DE BCP/DRP                         ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────────────┐   ┌──────────────────────┐        ║
  ║   │     ISO 22301        │   │   ISO 27031:2025     │        ║
  ║   │                      │   │                      │        ║
  ║   │  Gestão de           │   │  Prontidão de TIC    │        ║
  ║   │  Continuidade        │   │  para Continuidade   │        ║
  ║   │  de Negócio          │   │  de Negócio (IRBC)   │        ║
  ║   │  (certificável)      │   │                      │        ║
  ║   └──────────────────────┘   └──────────────────────┘        ║
  ║                                                               ║
  ║   ┌──────────────────────┐   ┌──────────────────────┐        ║
  ║   │    NIST 800-34       │   │      DRII            │        ║
  ║   │                      │   │                      │        ║
  ║   │  Guia de Planea-     │   │  Práticas            │        ║
  ║   │  mento de            │   │  Profissionais       │        ║
  ║   │  Contingência        │   │  (certificação       │        ║
  ║   │  (gov. EUA)          │   │   profissional)      │        ║
  ║   └──────────────────────┘   └──────────────────────┘        ║
  ║                                                               ║
  ║   ┌──────────────────────┐                                   ║
  ║   │     BCI GPG          │                                   ║
  ║   │                      │                                   ║
  ║   │  Good Practice       │                                   ║
  ║   │  Guidelines          │                                   ║
  ║   │  (referência global) │                                   ║
  ║   └──────────────────────┘                                   ║
  ╚═══════════════════════════════════════════════════════════════╝
```

> Antes destas normas, não existia consistência na terminologia, definições e documentação de BCP entre diferentes organizações e setores. Estas normas resolveram esse problema.

---

## 2. ISO 22301 — Gestão de Continuidade de Negócio

A **ISO 22301** é a norma internacional de referência para **Sistemas de Gestão de Continuidade de Negócio (BCMS)**. Foi aprovada em 2011 e atualizada em 2019.

### Características principais

| Aspeto | Descrição |
|--------|-----------|
| **Nome completo** | ISO 22301:2019 — Security and resilience — Business continuity management systems — Requirements |
| **Tipo** | Norma certificável (uma organização pode ser certificada) |
| **Abordagem** | Sistema de gestão baseado no ciclo PDCA |
| **Âmbito** | Toda a organização — não apenas TI |
| **Aplicabilidade** | Qualquer tipo e tamanho de organização |

### Estrutura baseada em PDCA

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║           ISO 22301 — CICLO PDCA                               ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║              ┌──────────────────┐                             ║
  ║              │     PLAN         │                             ║
  ║              │                  │                             ║
  ║              │  Contexto, BIA,  │                             ║
  ║              │  estratégias,    │                             ║
  ║              │  políticas       │                             ║
  ║              └────────┬─────────┘                             ║
  ║                       │                                       ║
  ║   ┌──────────────┐    │    ┌──────────────┐                   ║
  ║   │    ACT       │◄───┼───►│     DO       │                   ║
  ║   │              │    │    │              │                   ║
  ║   │  Melhoria    │    │    │  Implementar │                   ║
  ║   │  contínua,   │    │    │  planos,     │                   ║
  ║   │  ações       │    │    │  treinar,    │                   ║
  ║   │  corretivas  │    │    │  comunicar   │                   ║
  ║   └──────────────┘    │    └──────────────┘                   ║
  ║                       │                                       ║
  ║              ┌────────┴─────────┐                             ║
  ║              │     CHECK        │                             ║
  ║              │                  │                             ║
  ║              │  Testes, audito- │                             ║
  ║              │  rias, revisão   │                             ║
  ║              │  pela gestão     │                             ║
  ║              └──────────────────┘                             ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Cláusulas principais

| Cláusula | Conteúdo |
|----------|----------|
| **4. Contexto** | Compreender a organização, partes interessadas, âmbito do BCMS |
| **5. Liderança** | Compromisso da gestão de topo, política de BC, papéis e responsabilidades |
| **6. Planeamento** | Riscos e oportunidades, objetivos de BC, planeamento de mudanças |
| **7. Suporte** | Recursos, competências, consciencialização, comunicação, documentação |
| **8. Operação** | BIA, avaliação de riscos, estratégias de BC, planos e procedimentos |
| **9. Avaliação** | Monitorização, análise, avaliação, auditorias internas, revisão pela gestão |
| **10. Melhoria** | Não-conformidades, ações corretivas, melhoria contínua |

### Benefícios da certificação ISO 22301

- Demonstração de conformidade a clientes, reguladores e seguradoras
- Vantagem competitiva em concursos públicos e privados
- Redução de prémios de seguro
- Melhoria efetiva da resiliência organizacional
- Framework estruturado para melhoria contínua

---

## 3. ISO 27031:2025 — Prontidão de TIC

A **ISO 27031** foca-se especificamente na **prontidão das Tecnologias de Informação e Comunicação (TIC)** para suportar a continuidade de negócio.

### Conceito IRBC

O conceito central é o **ICT Readiness for Business Continuity (IRBC)** — garantir que as TIC suportam as operações críticas:

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              ISO 27031:2025 — IRBC                             ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌─────────────────────────────────────────────┐             ║
  ║   │  IRBC = ICT Readiness for Business          │             ║
  ║   │         Continuity                           │             ║
  ║   │                                              │             ║
  ║   │  Sistema para garantir que as TIC suportam   │             ║
  ║   │  as operações críticas da organização        │             ║
  ║   └─────────────────────────────────────────────┘             ║
  ║                                                               ║
  ║   Pilares:                                                    ║
  ║                                                               ║
  ║   ● Prontidão de TIC — TIC prontas para responder            ║
  ║   ● Foco na recuperação — métodos para melhorar               ║
  ║     capacidade e rapidez de recuperação                       ║
  ║   ● Integração — funciona com ISO 22301 e ISO 27001          ║
  ║                                                               ║
  ║   Novidades da versão 2025:                                   ║
  ║                                                               ║
  ║   ● Riscos de cloud computing                                 ║
  ║   ● Serviços de terceiros e outsourcing                       ║
  ║   ● Estrutura reorganizada para maior clareza                 ║
  ║   ● Aplicável a qualquer organização                          ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Relação com outras normas ISO

```
  ┌──────────────────────────────────────────────────────────────┐
  │            FAMÍLIA ISO — INTERRELAÇÕES                        │
  │                                                              │
  │   ┌──────────────┐                                           │
  │   │  ISO 22301   │  Gestão de continuidade de negócio        │
  │   │  (BCMS)      │  → Foco: NEGÓCIO                         │
  │   └──────┬───────┘                                           │
  │          │ integra-se com                                     │
  │          ▼                                                    │
  │   ┌──────────────┐                                           │
  │   │  ISO 27031   │  Prontidão de TIC para BC                 │
  │   │  (IRBC)      │  → Foco: TECNOLOGIA para o negócio       │
  │   └──────┬───────┘                                           │
  │          │ integra-se com                                     │
  │          ▼                                                    │
  │   ┌──────────────┐                                           │
  │   │  ISO 27001   │  Gestão de segurança da informação        │
  │   │  (ISMS)      │  → Foco: SEGURANÇA da informação         │
  │   └──────────────┘                                           │
  └──────────────────────────────────────────────────────────────┘
```

---

## 4. NIST SP 800-34 — Contingency Planning Guide

O **NIST Special Publication 800-34** é o guia de planeamento de contingência do governo dos Estados Unidos.

### Características

| Aspeto | Descrição |
|--------|-----------|
| **Autor** | National Institute of Standards and Technology (EUA) |
| **Versão atual** | Rev. 1 (2010) |
| **Público-alvo** | Agências federais dos EUA (mas amplamente adotado internacionalmente) |
| **Abordagem** | Prática e detalhada, com templates e exemplos |
| **Custo** | Gratuito (publicação governamental) |

### Processo de planeamento de contingência NIST

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║      NIST 800-34 — 7 ETAPAS DO PLANEAMENTO                    ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   1. Desenvolver política de planeamento de contingência      ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   2. Conduzir Business Impact Analysis (BIA)                  ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   3. Identificar controlos preventivos                        ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   4. Criar estratégias de contingência                        ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   5. Desenvolver plano de contingência                        ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   6. Testar, treinar e exercitar o plano                      ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   7. Manter o plano                                           ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Diferenciação NIST dos tipos de plano

O NIST distingue claramente os diferentes planos, o que é particularmente útil para resolver confusões:

| Plano | Foco | Ativador |
|-------|------|----------|
| **BCP** | Operações de negócio da organização | Disrupção de longo prazo |
| **COOP** (Continuity of Operations Plan) | Funções essenciais do governo | Ameaça a instalações governamentais |
| **DRP** | Sistemas de TI | Falha/desastre de TI |
| **IRP** | Incidentes de segurança | Incidente de cibersegurança |
| **CMP** (Crisis Management Plan) | Comunicação e decisão | Crise de qualquer natureza |
| **OEP** (Occupant Emergency Plan) | Segurança de pessoas | Ameaça a edifício |

---

## 5. DRII — Disaster Recovery Institute International

O **DRII** é a organização profissional de referência para profissionais de continuidade de negócio e recuperação de desastres.

### Contribuições principais

| Área | Contribuição |
|------|-------------|
| **Certificações profissionais** | ABCP, CBCP, MBCP, CBCLA — diferentes níveis de certificação |
| **Práticas profissionais** | 10 áreas de conhecimento que definem a profissão |
| **Formação** | Cursos e programas de formação especializados |
| **Comunidade** | Rede global de profissionais de BC/DR |

### 10 Áreas de conhecimento do DRII

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         DRII — 10 PRÁTICAS PROFISSIONAIS                       ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║    1. Início e gestão do programa                             ║
  ║    2. Avaliação de riscos                                     ║
  ║    3. Business Impact Analysis (BIA)                          ║
  ║    4. Estratégias de continuidade de negócio                  ║
  ║    5. Resposta a incidentes                                   ║
  ║    6. Desenvolvimento e implementação do plano                ║
  ║    7. Programas de consciencialização e treino                ║
  ║    8. Exercício, auditoria e manutenção do plano              ║
  ║    9. Comunicação de crise                                    ║
  ║   10. Coordenação com entidades externas                      ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Certificações DRII

| Certificação | Nível | Requisitos |
|-------------|-------|-----------|
| **ABCP** (Associate) | Entrada | Exame + formação |
| **CBCP** (Certified) | Profissional | Exame + 2 anos experiência |
| **MBCP** (Master) | Sénior | Exame + 5 anos experiência |
| **CBCLA** (Auditor/Lead Auditor) | Especialista | CBCP + experiência de auditoria |

---

## 6. BCI GPG — Good Practice Guidelines

O **Business Continuity Institute (BCI)** pública as **Good Practice Guidelines (GPG)**, uma referência global para boas práticas de continuidade de negócio.

### Características

| Aspeto | Descrição |
|--------|-----------|
| **Autor** | Business Continuity Institute (UK) |
| **Natureza** | Guia de boas práticas (não é norma certificável) |
| **Abordagem** | Prática e orientada para profissionais |
| **Atualização** | Revista periodicamente |
| **Complemento** | Alinhada com ISO 22301 mas com mais detalhe prático |

### Ciclo de vida da gestão de BC segundo o BCI

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         BCI GPG — CICLO DE VIDA DA GESTÃO DE BC                ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   Gestão do programa ──────────────────────────────────►      ║
  ║   (transversal a todas as fases)                              ║
  ║                                                               ║
  ║   1. Política e gestão do programa                            ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   2. Integração com a gestão de riscos                        ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   3. Análise (BIA + avaliação de riscos)                      ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   4. Desenho (estratégias e soluções)                         ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   5. Implementação (planos e procedimentos)                   ║
  ║      │                                                        ║
  ║      ▼                                                        ║
  ║   6. Validação (testes, exercícios, auditorias)               ║
  ║                                                               ║
  ║   ◄───────────── Melhoria contínua ──────────────────         ║
  ╚═══════════════════════════════════════════════════════════════╝
```

---

## 7. Comparação entre frameworks

### Tabela comparativa

| Critério | ISO 22301 | ISO 27031 | NIST 800-34 | DRII | BCI GPG |
|----------|-----------|-----------|-------------|------|---------|
| **Tipo** | Norma certificável | Norma orientadora | Publicação governamental | Práticas profissionais | Guia de boas práticas |
| **Foco** | BCMS completo | TIC para BC | Contingência de TI | Profissão de BC/DR | Gestão de BC |
| **Certificação** | Organizacional | Não | Não | Profissional | Profissional (via BCI) |
| **Custo** | Pago | Pago | Gratuito | Pago (certificação) | Pago |
| **Origem** | Internacional (ISO) | Internacional (ISO) | EUA (governo) | Internacional (indústria) | UK (indústria) |
| **Aplicabilidade** | Universal | TI/TIC | Governo EUA (adotável) | Universal | Universal |
| **Detalhe prático** | Médio (requisitos) | Médio-alto | Alto (com templates) | Alto | Muito alto |

### Qual usar?

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              GUIA DE SELEÇÃO DE FRAMEWORK                      ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   "Quero certificar a minha organização"                      ║
  ║   ───────────────────────────────► ISO 22301                  ║
  ║                                                               ║
  ║   "Quero garantir que as TIC suportam o negócio"              ║
  ║   ───────────────────────────────► ISO 27031                  ║
  ║                                                               ║
  ║   "Preciso de um guia prático com templates"                  ║
  ║   ───────────────────────────────► NIST 800-34                ║
  ║                                                               ║
  ║   "Quero certificar profissionais de BC/DR"                   ║
  ║   ───────────────────────────────► DRII                       ║
  ║                                                               ║
  ║   "Quero boas práticas detalhadas e práticas"                 ║
  ║   ───────────────────────────────► BCI GPG                    ║
  ║                                                               ║
  ║   "Quero o melhor de todos"                                   ║
  ║   ───────────────────────────────► ISO 22301 + BCI GPG        ║
  ║                                   (norma + boas práticas)     ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! info "Na prática"
    A maioria das organizações maduras utiliza uma **combinação** de frameworks. Por exemplo: certificação ISO 22301 + orientações práticas do BCI GPG + templates do NIST 800-34 + certificação profissional DRII para a equipa.

---

## 8. Exemplos práticos

### Exemplo 1 — Escolher o framework adequado

**Contexto:** Três organizações diferentes precisam de implementar um programa de continuidade de negócio:

| Organização | Setor | Dimensão | Necessidade |
|-------------|-------|----------|-------------|
| Banco | Financeiro (regulado) | 2.000 colaboradores | Conformidade regulatória |
| Startup tecnológica | TI | 50 colaboradores | Resiliência básica |
| Câmara Municipal | Administração pública | 500 colaboradores | Proteção de serviços ao cidadão |

**Recomendação:**

| Organização | Framework primário | Complementos | Justificação |
|-------------|-------------------|--------------|-------------|
| **Banco** | ISO 22301 (certificação) | ISO 27031 + DRII (certificação de equipa) | Setor regulado exige certificação; reguladores esperam norma ISO |
| **Startup** | NIST 800-34 | BCI GPG (orientação prática) | Gratuito, prático, com templates; startup não precisa de certificação inicial |
| **Câmara Municipal** | BCI GPG | NIST 800-34 (templates) | Orientação prática sem custos de certificação; foco na implementação efetiva |

### Exemplo 2 — ISO 22301 como diferencial competitivo

**Contexto:** Uma empresa de outsourcing de TI concorre a um contrato de €5M com um grande banco europeu. O caderno de encargos exige "comprovação de capacidade de continuidade de negócio".

**Sem ISO 22301:** A empresa apresenta o seu BCP interno. O banco pede evidências de testes, resultados de auditorias e conformidade com normas reconhecidas. A empresa não tem nada formalizado.

**Com ISO 22301:** A empresa apresenta o certificado ISO 22301, relatórios de auditoria e resultados de testes anuais. O banco aceita como evidência suficiente.

**Resultado:** A certificação ISO 22301 custou €30.000 (implementação + certificação). O contrato vale €5M. O retorno do investimento é evidente.

---

## 9. Exercícios

### Exercício 1 — Associar conceitos (Nível básico)

Associe cada afirmação ao framework correto:

| Afirmação | Framework |
|-----------|-----------|
| a) "É a única norma certificável de BC" | ? |
| b) "Foca-se especificamente na prontidão das TIC" | ? |
| c) "É gratuita e inclui templates detalhados" | ? |
| d) "Oferece certificações profissionais por níveis (ABCP, CBCP, MBCP)" | ? |
| e) "Aborda riscos de cloud computing na versão mais recente" | ? |
| f) "Define 10 áreas de conhecimento para a profissão" | ? |

??? success "Solução 1"
    | Afirmação | Framework | Justificação |
    |-----------|-----------|-------------|
    | a) Única norma certificável de BC | **ISO 22301** | É a norma internacional certificável para BCMS |
    | b) Prontidão das TIC | **ISO 27031** | IRBC — ICT Readiness for Business Continuity |
    | c) Gratuita com templates | **NIST 800-34** | Publicação governamental dos EUA, gratuita |
    | d) Certificações ABCP, CBCP, MBCP | **DRII** | Certificações profissionais do Disaster Recovery Institute International |
    | e) Riscos de cloud computing | **ISO 27031:2025** | Versão 2025 inclui riscos de cloud e serviços de terceiros |
    | f) 10 áreas de conhecimento | **DRII** | As 10 Professional Practices do DRII |

### Exercício 2 — Recomendar framework (Nível intermédio)

Para cada cenário, recomende o(s) framework(s) mais adequado(s) e justifique:

**Cenário A:** Uma empresa farmacêutica multinacional com operações em 20 países precisa de demonstrar resiliência aos reguladores europeus e norte-americanos.

**Cenário B:** Uma PME de desenvolvimento web com 15 colaboradores quer criar o seu primeiro plano de continuidade com orçamento limitado.

**Cenário C:** O departamento de TI de uma universidade quer garantir que os seus sistemas suportam a continuidade das atividades académicas.

??? success "Solução 2"
    **Cenário A — Farmacêutica multinacional:**

    - **Primário:** ISO 22301 (certificação) — reguladores europeus e FDA esperam conformidade com normas reconhecidas
    - **Complemento:** DRII (certificações para equipa de BC) — equipas em 20 países precisam de certificação profissional padronizada
    - **Complemento:** ISO 27031 — componente TIC é crítica na indústria farmacêutica (dados de investigação, produção, supply chain)
    - **Justificação:** Organização multinacional regulada necessita da credibilidade de certificação internacional. O custo é justificado pela dimensão e requisitos regulatórios.

    **Cenário B — PME de desenvolvimento web:**

    - **Primário:** NIST 800-34 — gratuito, prático, com templates prontos a usar
    - **Complemento:** BCI GPG — orientações práticas adicionais para implementação
    - **Justificação:** Orçamento limitado elimina certificação ISO. NIST oferece um guia completo e gratuito. Quando a empresa crescer, pode considerar ISO 22301.

    **Cenário C — Departamento TI de universidade:**

    - **Primário:** ISO 27031:2025 — foco específico na prontidão das TIC
    - **Complemento:** NIST 800-34 — templates para planeamento de contingência de sistemas
    - **Justificação:** O departamento de TI não gere o BCP da universidade inteira (isso seria ISO 22301 para a Reitoria). O seu foco é garantir que as TIC suportam as funções críticas — exatamente o âmbito da ISO 27031.

### Exercício 3 — Mapear requisitos ISO 22301 (Nível avançado)

Uma empresa está a implementar a ISO 22301 e precisa de mapear as suas atividades existentes às cláusulas da norma. Classifique cada atividade na cláusula ISO 22301 correspondente (4 a 10):

| Atividade | Cláusula ISO 22301 |
|-----------|-------------------|
| a) O CEO assinou a política de BC e nomeou o coordenador BCP | ? |
| b) A equipa conduziu uma BIA e identificou funções críticas | ? |
| c) Foi contratado um hot site e configuradas as comunicações | ? |
| d) A organização identificou os requisitos dos clientes e reguladores | ? |
| e) Foi realizado um walk-through com relatório de resultados | ? |
| f) As não-conformidades do último teste foram corrigidas | ? |
| g) Os colaboradores receberam formação sobre os seus papéis no BCP | ? |

??? success "Solução 3"
    | Atividade | Cláusula | Nome da cláusula | Justificação |
    |-----------|----------|------------------|-------------|
    | a) CEO assinou política e nomeou coordenador | **5. Liderança** | Compromisso da gestão de topo, papéis e responsabilidades |
    | b) BIA e funções críticas | **8. Operação** | BIA e avaliação de riscos fazem parte da operação do BCMS |
    | c) Hot site e comunicações | **8. Operação** | Implementação de estratégias e soluções de BC |
    | d) Requisitos de clientes e reguladores | **4. Contexto** | Compreender a organização e as necessidades das partes interessadas |
    | e) Walk-through com relatório | **9. Avaliação** | Testes e auditorias para avaliar o desempenho do BCMS |
    | f) Correção de não-conformidades | **10. Melhoria** | Ações corretivas e melhoria contínua |
    | g) Formação dos colaboradores | **7. Suporte** | Competências, consciencialização e comunicação |

---

## 10. Armadilhas e confusões a evitar

!!! danger "Confusão 1: A ISO 22301 é só para grandes empresas"
    **Errado.** A norma é aplicável a **qualquer tipo e tamanho de organização**. Uma PME pode implementar um BCMS proporcionado à sua dimensão e complexidade. O que varia é a escala da implementação, não a aplicabilidade.

!!! danger "Confusão 2: Ter certificação ISO 22301 significa que a organização está segura"
    **Errado.** A certificação significa que a organização tem um **sistema de gestão** de continuidade de negócio conforme a norma. Não garante que o plano funcione perfeitamente num desastre real — garante que existe um processo para melhorar continuamente.

!!! danger "Confusão 3: A ISO 27031 substitui a ISO 22301"
    **Errado.** São normas complementares. A ISO 22301 cobre a continuidade de negócio na globalidade; a ISO 27031 foca-se especificamente na componente TIC. Uma organização que queira cobrir ambos os aspetos deve implementar ambas.

!!! danger "Confusão 4: O NIST 800-34 só se aplica ao governo dos EUA"
    **Errado.** Embora criado para agências federais norte-americanas, o NIST 800-34 é amplamente adotado internacionalmente por organizações privadas e públicas. É particularmente útil pelos seus templates e abordagem prática.

!!! danger "Confusão 5: Certificação DRII e certificação ISO 22301 são a mesma coisa"
    **Errado.** A certificação DRII (ABCP, CBCP, MBCP) é uma **certificação profissional** — certifica a pessoa. A ISO 22301 é uma **certificação organizacional** — certifica a organização. São complementares: uma organização certificada ISO 22301 beneficia de ter profissionais certificados DRII na equipa.

---

## 11. Resumo rápido

| Framework | Tipo | Foco | Melhor para |
|-----------|------|------|-------------|
| **ISO 22301** | Norma certificável | BCMS completo | Certificação organizacional |
| **ISO 27031:2025** | Norma orientadora | TIC para BC | Prontidão tecnológica |
| **NIST 800-34** | Guia governamental | Contingência de TI | Templates práticos (gratuito) |
| **DRII** | Práticas profissionais | Profissão BC/DR | Certificação profissional |
| **BCI GPG** | Boas práticas | Gestão de BC | Orientação prática detalhada |

---

**Próximos passos:** Explore os [Casos Práticos](casos-praticos.md) para ver o BCP em ação em diferentes setores e cenários.
