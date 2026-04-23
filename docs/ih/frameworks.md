# Frameworks de Incident Response

## Índice

1. [Visão geral](#1-visao-geral)
2. [ISO/IEC 27035 — Gestão de incidentes de segurança da informação](#2-isoiec-27035-gestao-de-incidentes-de-seguranca-da-informacao)
3. [NIST SP 800-61 — Computer Security Incident Handling Guide](#3-nist-sp-800-61-computer-security-incident-handling-guide)
4. [SANS — Incident Handler's Handbook](#4-sans-incident-handlers-handbook)
5. [ENISA — Good Practice Guide for Incident Management](#5-enisa-good-practice-guide-for-incident-management)
6. [ISACA — Incident Management and Response](#6-isaca-incident-management-and-response)
7. [Comparação entre frameworks](#7-comparacao-entre-frameworks)
8. [NIST 4 passos vs SANS 6 passos vs Modelo de 7 passos](#8-nist-4-passos-vs-sans-6-passos-vs-modelo-de-7-passos)
9. [Aspetos legais e contratuais](#9-aspetos-legais-e-contratuais)
10. [Exemplos práticos](#10-exemplos-praticos)
11. [Exercícios](#11-exercicios)
12. [Armadilhas e confusões a evitar](#12-armadilhas-e-confusoes-a-evitar)
13. [Resumo rápido](#13-resumo-rapido)

---

## 1. Visão geral

Existem vários frameworks reconhecidos internacionalmente que orientam a criação e operação de programas de Incident Response. Nenhum é "o melhor" em absoluto — cada um tem vantagens e foco diferentes.

> A escolha de um framework não é uma decisão técnica isolada. Depende do setor, da dimensão da organização, dos requisitos regulatórios e da maturidade da equipa.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         FRAMEWORKS DE INCIDENT RESPONSE                        ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      ║
  ║   │  ISO/IEC     │  │  NIST        │  │  SANS        │      ║
  ║   │  27035       │  │  SP 800-61   │  │  Incident    │      ║
  ║   │              │  │              │  │  Handler's   │      ║
  ║   │  4 partes    │  │  4 fases     │  │  6 passos    │      ║
  ║   │  Normativo   │  │  Guia prático│  │  Operacional │      ║
  ║   └──────────────┘  └──────────────┘  └──────────────┘      ║
  ║                                                               ║
  ║   ┌──────────────┐  ┌──────────────┐                         ║
  ║   │  ENISA       │  │  ISACA       │                         ║
  ║   │  Good        │  │  Incident    │                         ║
  ║   │  Practice    │  │  Mgmt &      │                         ║
  ║   │  Guide       │  │  Response    │                         ║
  ║   │  CSIRT-foco  │  │  Governança  │                         ║
  ║   └──────────────┘  └──────────────┘                         ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Porquê usar um framework?

| Razão | Descrição |
|-------|-----------|
| **Estrutura** | Fornece um modelo testado em vez de "inventar a roda" |
| **Conformidade** | Facilita o cumprimento de requisitos regulatórios (RGPD, NIS2, DORA) |
| **Linguagem comum** | Equipa, gestão e parceiros falam a mesma linguagem |
| **Benchmarking** | Permite comparar a maturidade com outras organizações |
| **Melhoria contínua** | Inclui mecanismos de revisão e evolução |

---

## 2. ISO/IEC 27035 — Gestão de incidentes de segurança da informação

A **ISO/IEC 27035** é uma norma internacional publicada pela ISO/IEC, dividida em **4 partes**, que fornece orientações para o planeamento e gestão de incidentes de segurança da informação.

### Estrutura em 4 partes

```
  ┌─────────────────────────────────────────────────────────────────┐
  │              ISO/IEC 27035 — 4 PARTES                           │
  │                                                                  │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  Parte 1: Principles and Process                       │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Conceitos básicos de gestão de incidentes,            │    │
  │   │  processo em 5 fases, definição de papéis              │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  Parte 2: Guidelines to Plan and Prepare               │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Como planear o programa de gestão de incidentes:      │    │
  │   │  políticas, procedimentos, equipa, ferramentas         │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  Parte 3: Guidelines for ICT Incident Response         │    │
  │   │           Operations                                    │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Aspetos operacionais: deteção, análise,               │    │
  │   │  resposta e reporte de incidentes ICT                   │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  Parte 4: Coordination                                  │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Coordenação entre entidades: CSIRTs, CERTs,           │    │
  │   │  autoridades, partilha de informação                    │    │
  │   └────────────────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────────────────┘
```

### Processo em 5 fases (Parte 1)

A ISO 27035 define um processo de **5 fases** para a gestão de incidentes:

```
  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Plan and │───►│Detection │───►│Assessment│───►│ Response │───►│ Lessons  │
  │ Prepare  │    │& Report  │    │& Decision│    │          │    │ Learnt   │
  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
       1               2               3               4               5
```

| Fase | Descrição | Atividades-chave |
|------|-----------|-----------------|
| **1. Plan and Prepare** | Preparar o programa de gestão de incidentes | Políticas, procedimentos, equipa CSIRT, ferramentas, treino |
| **2. Detection and Reporting** | Detetar e reportar eventos/incidentes | Monitorização, triagem, comunicação inicial |
| **3. Assessment and Decision** | Avaliar a severidade e decidir ações | Classificar, priorizar, decidir resposta |
| **4. Response** | Responder ao incidente | Contenção, erradicação, recuperação, forense |
| **5. Lessons Learnt** | Aprender e melhorar | Análise pós-incidente, atualizar processos |

### Relação com a ISO 27001

A ISO 27035 é um **complemento** da ISO/IEC 27001 (sistema de gestão de segurança da informação). Enquanto a 27001 define que a organização deve ter um processo de gestão de incidentes, a 27035 explica **como** implementá-lo.

!!! info "ISO 27035 no contexto"
    A ISO 27035 é o framework mais **normativo** — ideal para organizações que já seguem a família ISO 27000 e procuram certificação. É menos prescritivo nas operações do dia a dia, mas forte na governança e estrutura.

---

## 3. NIST SP 800-61 — Computer Security Incident Handling Guide

O **NIST SP 800-61** (atualmente na revisão 2) é uma publicação do National Institute of Standards and Technology (EUA) que fornece orientações práticas para o tratamento de incidentes de segurança informática.

### Modelo em 4 fases

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         NIST SP 800-61 — 4 FASES                              ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────────────┐                                    ║
  ║   │   1. PREPARATION     │ ◄── Contínua                      ║
  ║   └──────────┬───────────┘                                    ║
  ║              │                                                 ║
  ║              ▼                                                 ║
  ║   ┌──────────────────────┐                                    ║
  ║   │ 2. DETECTION &       │ ◄── Ciclo                         ║
  ║   │    ANALYSIS          │     iterativo                      ║
  ║   └──────────┬───────────┘     entre                          ║
  ║              │                  fases                          ║
  ║              ▼                  2, 3 e 4                       ║
  ║   ┌──────────────────────┐                                    ║
  ║   │ 3. CONTAINMENT,      │                                    ║
  ║   │    ERADICATION &     │ ◄── Resposta ativa                 ║
  ║   │    RECOVERY          │                                    ║
  ║   └──────────┬───────────┘                                    ║
  ║              │                                                 ║
  ║              ▼                                                 ║
  ║   ┌──────────────────────┐                                    ║
  ║   │ 4. POST-INCIDENT     │ ◄── Melhoria                      ║
  ║   │    ACTIVITY          │                                    ║
  ║   └──────────────────────┘                                    ║
  ╚═══════════════════════════════════════════════════════════════╝
```

| Fase | Descrição | Detalhe |
|------|-----------|---------|
| **1. Preparation** | Preparar a organização | Políticas, comunicação, ferramentas, equipa, treino |
| **2. Detection & Analysis** | Detetar e analisar incidentes | Indicadores de comprometimento, triagem, priorização |
| **3. Containment, Eradication & Recovery** | Conter, erradicar e recuperar | Estratégias de contenção, remoção de artefactos, restauração de serviços |
| **4. Post-Incident Activity** | Análise pós-incidente | Lições aprendidas, métricas, retenção de evidências |

### Características distintivas do NIST

- **Ciclo iterativo:** As fases 2, 3 e 4 não são lineares — pode ser necessário voltar à análise durante a contenção
- **Guia prático:** Inclui checklists, templates e cenários reais
- **Gratuito e público:** Disponível sem custo no site do NIST
- **Referência mundial:** Mesmo fora dos EUA, é um dos guias mais usados

!!! tip "Quando usar o NIST SP 800-61"
    O NIST é a escolha mais comum para organizações que procuram um guia **prático e detalhado**. Excelente para equipas que estão a montar o seu primeiro programa de IR. Complementa-se com o NIST Cybersecurity Framework (CSF).

---

## 4. SANS — Incident Handler's Handbook

O **SANS Institute** é uma organização líder em formação e certificação de segurança. O seu modelo de Incident Handling define **6 passos**, e é a base da certificação **GIAC Certified Incident Handler (GCIH)**.

### Modelo em 6 passos

```
  ┌─────────────────────────────────────────────────────────────────┐
  │           SANS — INCIDENT HANDLER'S HANDBOOK                     │
  │                                                                  │
  │   ┌────────────────┐                                             │
  │   │ 1. PREPARATION │ ◄── Ferramentas, equipa, procedimentos     │
  │   └───────┬────────┘                                             │
  │           │                                                       │
  │           ▼                                                       │
  │   ┌────────────────┐                                             │
  │   │2. IDENTIFICATION│ ◄── Detetar, classificar, priorizar       │
  │   └───────┬────────┘                                             │
  │           │                                                       │
  │           ▼                                                       │
  │   ┌────────────────┐                                             │
  │   │3. CONTAINMENT  │ ◄── Limitar o dano (curto e longo prazo)   │
  │   └───────┬────────┘                                             │
  │           │                                                       │
  │           ▼                                                       │
  │   ┌────────────────┐                                             │
  │   │4. ERADICATION  │ ◄── Remover causa raiz                     │
  │   └───────┬────────┘                                             │
  │           │                                                       │
  │           ▼                                                       │
  │   ┌────────────────┐                                             │
  │   │ 5. RECOVERY    │ ◄── Restaurar e monitorizar                │
  │   └───────┬────────┘                                             │
  │           │                                                       │
  │           ▼                                                       │
  │   ┌────────────────┐                                             │
  │   │6. LESSONS      │ ◄── Documentar e melhorar                  │
  │   │   LEARNED      │                                             │
  │   └────────────────┘                                             │
  └─────────────────────────────────────────────────────────────────┘
```

| Passo | Descrição | Questão-chave |
|-------|-----------|--------------|
| **1. Preparation** | Preparar equipa, ferramentas e procedimentos | "Estamos prontos para responder?" |
| **2. Identification** | Detetar e confirmar o incidente | "O que está a acontecer? É um incidente real?" |
| **3. Containment** | Limitar a propagação e o dano | "Como evitar que piore?" |
| **4. Eradication** | Remover a causa raiz do incidente | "Eliminámos completamente a ameaça?" |
| **5. Recovery** | Restaurar sistemas e monitorizar | "Os sistemas estão limpos e operacionais?" |
| **6. Lessons Learned** | Documentar e aplicar melhorias | "O que aprendemos? O que mudamos?" |

### Contenção em duas fases (SANS)

O SANS distingue **dois tipos de contenção**:

| Tipo | Objetivo | Exemplo |
|------|----------|---------|
| **Short-term containment** | Ação imediata para parar a propagação | Desligar da rede, bloquear IP no firewall |
| **Long-term containment** | Medida temporária enquanto se prepara a erradicação | Mover para VLAN isolada, aplicar regras restritivas |

!!! info "SANS: foco operacional"
    O modelo SANS é o mais **operacional** — orientado para o incident handler que está no terreno. Menos foco em governança, mais foco em ações concretas. Ideal para equipas SOC/CSIRT.

---

## 5. ENISA — Good Practice Guide for Incident Management

A **ENISA** (European Union Agency for Cybersecurity) pública orientações específicas para a gestão de incidentes na Europa, com foco particular na operação de **CSIRTs** (Computer Security Incident Response Teams).

### Foco da ENISA

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║            ENISA — FOCO E CARACTERÍSTICAS                      ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ● Operação de CSIRTs (criação, gestão, maturidade)         ║
  ║                                                               ║
  ║   ● Partilha de informação entre entidades                   ║
  ║     (CSIRTs nacionais, setoriais, privados)                  ║
  ║                                                               ║
  ║   ● Exercícios pan-europeus (Cyber Europe)                   ║
  ║                                                               ║
  ║   ● Taxonomia comum de incidentes                            ║
  ║                                                               ║
  ║   ● Alinhamento com Diretiva NIS/NIS2                        ║
  ║                                                               ║
  ║   ● Contexto regulatório europeu (RGPD, eIDAS, DORA)        ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Contribuições-chave da ENISA

| Área | Contribuição |
|------|-------------|
| **Taxonomia** | Classificação padronizada de incidentes para toda a UE |
| **CSIRT maturity** | Modelo de maturidade para equipas de resposta (SIM3) |
| **Cooperação** | Processos de partilha de informação entre CSIRTs |
| **Exercícios** | Cyber Europe — exercícios pan-europeus de resposta a incidentes |
| **Guias práticos** | How to set up a CSIRT, Incident handling workflow |
| **Diretiva NIS2** | Orientações para cumprir requisitos de notificação de incidentes |

### O contexto português

Em Portugal, a ENISA é particularmente relevante porque:

- O **CNCS** (Centro Nacional de Cibersegurança) segue as orientações ENISA
- O **CERT.PT** opera segundo os padrões ENISA para CSIRTs nacionais
- A transposição da **Diretiva NIS2** para legislação nacional segue as orientações ENISA
- As **notificações de incidentes** devem usar a taxonomia definida pela ENISA

!!! tip "Quando usar a ENISA"
    A ENISA é essencial para organizações europeias, especialmente as abrangidas pela NIS2. Não substitui um framework técnico (como NIST ou SANS), mas complementa-o com o **contexto regulatório europeu**.

---

## 6. ISACA — Incident Management and Response

A **ISACA** (Information Systems Audit and Control Association) aborda o Incident Response da perspetiva da **governança, auditoria e conformidade**. É a base da certificação **CISM** (Certified Information Security Manager).

### Perspetiva ISACA

```
  ┌─────────────────────────────────────────────────────────────────┐
  │           ISACA — PERSPETIVA DE GOVERNANÇA                       │
  │                                                                  │
  │   ┌─────────────────────────────────────────────────────────┐   │
  │   │                    GOVERNANÇA                            │   │
  │   │   ┌─────────────────────────────────────────────────┐   │   │
  │   │   │              GESTÃO DE RISCO                     │   │   │
  │   │   │   ┌─────────────────────────────────────────┐   │   │   │
  │   │   │   │        INCIDENT MANAGEMENT              │   │   │   │
  │   │   │   │                                         │   │   │   │
  │   │   │   │   Policies → Plans → Procedures →       │   │   │   │
  │   │   │   │   Response → Recovery → Review          │   │   │   │
  │   │   │   │                                         │   │   │   │
  │   │   │   └─────────────────────────────────────────┘   │   │   │
  │   │   └─────────────────────────────────────────────────┘   │   │
  │   └─────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────┘
```

### Elementos-chave do modelo ISACA

| Elemento | Descrição |
|----------|-----------|
| **Políticas** | Definidas ao nível da gestão de topo, alinhadas com a estratégia |
| **Planos** | IR plan, comunicação, escalação, continuidade |
| **Procedimentos** | Passo a passo operacional para cada tipo de incidente |
| **Métricas** | KPIs para medir eficácia (MTTD, MTTR, custo por incidente) |
| **Auditoria** | Verificação independente da conformidade e eficácia |
| **Melhoria** | Ciclo PDCA aplicado ao programa de IR |

### ISACA e a visão executiva

A ISACA destaca que o Incident Response não é apenas um assunto técnico:

- **Responsabilidade do board:** A gestão de topo deve aprovar e supervisionar o programa
- **Alinhamento estratégico:** O IR deve alinhar-se com os objetivos de negócio
- **Gestão de risco:** O IR é uma componente da gestão de risco global
- **Valor para o negócio:** O investimento em IR deve ser justificado em termos de redução de risco

!!! info "Quando usar o ISACA"
    O modelo ISACA é ideal para **CISOs, gestores de risco e auditores**. Menos foco no "como fazer tecnicamente" e mais no "como governar, medir e melhorar". Complementa-se com NIST ou SANS para a parte operacional.

---

## 7. Comparação entre frameworks

### Tabela comparativa

| Critério | ISO 27035 | NIST 800-61 | SANS | ENISA | ISACA |
|----------|-----------|-------------|------|-------|-------|
| **Tipo** | Norma internacional | Guia técnico | Modelo operacional | Boas práticas UE | Governança/Auditoria |
| **Fases** | 5 | 4 | 6 | Variável | Integrado na gestão de risco |
| **Foco principal** | Estrutura normativa | Implementação prática | Operações SOC/CSIRT | CSIRTs europeus | Governança e conformidade |
| **Custo** | Pago (ISO) | Gratuito | Pago (formação GIAC) | Gratuito | Pago (certificação CISM) |
| **Certificação** | ISO 27001 (indireta) | Não | GCIH, GCIA | Não | CISM, CRISC |
| **Melhor para** | Organizações ISO 27001 | Primeira implementação | Equipas técnicas | Entidades UE/NIS2 | Gestão e auditoria |
| **Detalhe operacional** | Médio | Alto | Muito alto | Médio | Baixo |
| **Contexto regulatório** | Global | EUA (usado globalmente) | Global | Europeu | Global |

### Como escolher?

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         COMO ESCOLHER UM FRAMEWORK?                            ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   Já segue ISO 27001?                                        ║
  ║   └──► SIM → ISO 27035                                       ║
  ║                                                               ║
  ║   Precisa de um guia prático para começar?                   ║
  ║   └──► SIM → NIST SP 800-61                                  ║
  ║                                                               ║
  ║   Equipa SOC/CSIRT a precisar de procedimentos?              ║
  ║   └──► SIM → SANS                                            ║
  ║                                                               ║
  ║   Abrangido pela NIS2 / contexto europeu?                    ║
  ║   └──► SIM → ENISA (+ NIST ou SANS para operações)          ║
  ║                                                               ║
  ║   CISO / gestão de risco / auditoria?                        ║
  ║   └──► SIM → ISACA (+ NIST ou SANS para operações)          ║
  ║                                                               ║
  ║   Na prática, muitas organizações combinam:                  ║
  ║   ● NIST ou SANS para operações                              ║
  ║   ● ISO 27035 para estrutura                                 ║
  ║   ● ENISA para contexto regulatório europeu                  ║
  ║   ● ISACA para governança                                    ║
  ╚═══════════════════════════════════════════════════════════════╝
```

---

## 8. NIST 4 passos vs SANS 6 passos vs Modelo de 7 passos

Uma das confusões mais comuns é a diferença entre os modelos. Na realidade, descrevem **as mesmas atividades** organizadas de forma diferente:

### Mapeamento entre modelos

```
  ┌─────────────────┬──────────────────┬──────────────────────────┐
  │  NIST (4 fases) │  SANS (6 passos) │  Modelo 7 passos         │
  ├─────────────────┼──────────────────┼──────────────────────────┤
  │                 │                  │                          │
  │  1. Preparation │  1. Preparation  │  1. Preparação           │
  │                 │                  │                          │
  │  2. Detection & │  2. Identification│  2. Deteção e           │
  │     Analysis    │                  │     Identificação        │
  │                 │                  │                          │
  │  3. Containment,│  3. Containment  │  3. Contenção            │
  │     Eradication │                  │                          │
  │     & Recovery  │  4. Eradication  │  4. Investigação ◄──┐   │
  │                 │                  │                     │   │
  │                 │  5. Recovery     │  5. Erradicação      │   │
  │                 │                  │                     │   │
  │                 │                  │  6. Recuperação      │   │
  │                 │                  │       Separação      │   │
  │  4. Post-       │  6. Lessons      │       forense ──────┘   │
  │     Incident    │     Learned      │                          │
  │     Activity    │                  │  7. Follow-up            │
  │                 │                  │                          │
  └─────────────────┴──────────────────┴──────────────────────────┘
```

### Diferenças-chave

| Aspeto | NIST | SANS | Modelo 7 passos |
|--------|------|------|----------------|
| **Contenção + Erradicação + Recuperação** | Agrupadas numa única fase | Separadas em 3 passos | Separadas + Investigação adicionada |
| **Investigação/Forense** | Incluída implicitamente na fase 3 | Incluída no Containment/Eradication | **Passo explícito** (passo 4) — ponto de separação forense |
| **Iteratividade** | Explicitamente iterativo (ciclo entre fases 2-4) | Mais linear | Mais linear com ponto de bifurcação |
| **Nível de detalhe** | Alto (guia completo) | Alto (orientado para praticantes) | Muito alto (desagregação máxima) |

### O ponto de separação forense

O modelo de 7 passos explicita algo que os outros modelos tratam implicitamente: o **ponto de separação forense** (forensic break-off point):

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         PONTO DE SEPARAÇÃO FORENSE                             ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║              ┌──────────────┐                                 ║
  ║              │  CONTENÇÃO   │                                 ║
  ║              └──────┬───────┘                                 ║
  ║                     │                                         ║
  ║           ┌─────────┴─────────┐                               ║
  ║           │  DECISÃO CRÍTICA  │                               ║
  ║           └────┬─────────┬────┘                               ║
  ║                │         │                                    ║
  ║           ┌────▼───┐ ┌───▼────────┐                          ║
  ║           │ Caminho│ │ Caminho    │                          ║
  ║           │   A    │ │    B       │                          ║
  ║           │        │ │            │                          ║
  ║           │Investi-│ │ Erradicar  │                          ║
  ║           │gação   │ │ e recuperar│                          ║
  ║           │forense │ │ rápido     │                          ║
  ║           │completa│ │            │                          ║
  ║           └────────┘ └────────────┘                          ║
  ║                                                               ║
  ║   Caminho A: Preservar evidências, investigação formal,      ║
  ║              possível ação judicial. Mais lento.              ║
  ║                                                               ║
  ║   Caminho B: Priorizar restauração de serviços.              ║
  ║              Mais rápido, mas pode perder evidências.         ║
  ║                                                               ║
  ║   Na prática: Imagem forense ANTES de qualquer ação,         ║
  ║   depois decidir o caminho com base no impacto e contexto.   ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! warning "Decisão crítica"
    A decisão entre investigação aprofundada e recuperação rápida depende de: (1) gravidade do incidente, (2) requisitos legais (RGPD obriga a investigar data breaches), (3) possibilidade de ação judicial, (4) impacto no negócio do tempo de inatividade. Na prática, faz-se **sempre** uma imagem forense antes de erradicar, mesmo que a investigação completa fique para depois.

---

## 9. Aspetos legais e contratuais

O Incident Handling tem implicações legais significativas que nenhum framework ignora:

### Requisitos legais

| Requisito | Descrição | Prazo |
|-----------|-----------|-------|
| **RGPD (Art. 33)** | Notificação de violação de dados pessoais à autoridade supervisora | **72 horas** após deteção |
| **RGPD (Art. 34)** | Notificação aos titulares dos dados se risco elevado | Sem atraso injustificado |
| **NIS2** | Notificação de incidentes significativos ao CSIRT nacional | **24 horas** (alerta inicial), **72 horas** (relatório) |
| **DORA** | Notificação de incidentes ICT graves à autoridade financeira | Conforme regulamento setorial |
| **Lei do Cibercrime (PT)** | Preservação de evidências para investigação criminal | Imediato, se aplicável |

### Aspetos contratuais

Para além dos requisitos legais, existem obrigações contratuais:

| Obrigação | Exemplo |
|-----------|---------|
| **SLAs com clientes** | Notificação de incidentes que afetem o serviço contratado |
| **Contratos com fornecedores** | Cláusulas de resposta a incidentes em contratos cloud |
| **Ciber-seguros** | Requisitos de notificação à seguradora |
| **Contratos com parceiros** | Partilha de informação sobre ameaças comuns |
| **NDA (Non-Disclosure)** | Obrigação de confidencialidade sobre detalhes do incidente |

!!! danger "Não ignorar os aspetos legais"
    Muitos programas de IR focam-se apenas na parte técnica e ignoram os aspetos legais. Isto pode resultar em: multas por não notificação (RGPD: até 4% do volume de negócios), destruição de evidências necessárias para processos criminais, violação de obrigações contratuais e perda de cobertura do ciber-seguro.

---

## 10. Exemplos práticos

### Exemplo 1 — Escolha de framework para um hospital

**Contexto:** Um hospital público português com 2.000 colaboradores e um departamento de TI de 15 pessoas precisa de implementar um programa formal de Incident Response. O hospital já tem certificação ISO 27001.

| Decisão | Framework escolhido | Justificação |
|---------|-------------------|-------------|
| **Estrutura e governança** | ISO 27035 | Já segue ISO 27001 — alinhamento natural |
| **Operações diárias** | NIST SP 800-61 | Guia prático e gratuito para a equipa de TI |
| **Contexto regulatório** | ENISA | Hospital é entidade essencial na NIS2 |
| **Formação da equipa** | SANS (GCIH) | Certificação reconhecida para a equipa técnica |

**Como interpretar:** *O hospital não escolheu um único framework — combinou vários, cada um para o seu propósito. A ISO 27035 para a estrutura (porque já é ISO 27001), o NIST para o dia a dia (porque é prático e gratuito), a ENISA para conformidade europeia (porque é entidade NIS2), e SANS para formação (porque a equipa precisa de competências técnicas).*

**Para refletir:**

- Porque é que o hospital não pode usar apenas a ISO 27035?
- Que desafios específicos tem um hospital na resposta a incidentes (dados de saúde, sistemas críticos)?
- Como é que o RGPD afeta especificamente a resposta a incidentes num hospital?

### Exemplo 2 — Startup tecnológica vs banco

**Contexto:** Comparação entre duas organizações a implementar IR de raiz.

| Aspeto | Startup (50 pessoas, SaaS) | Banco (5.000 pessoas, setor financeiro) |
|--------|---------------------------|----------------------------------------|
| **Framework principal** | NIST SP 800-61 | ISACA + ISO 27035 |
| **Razão** | Prático, gratuito, rápido de implementar | Governança forte exigida pelo regulador |
| **Operações** | SANS (equipa pequena, precisa de eficiência) | NIST + SANS (equipa dedicada SOC) |
| **Regulatório** | RGPD + ENISA (se europeia) | RGPD + NIS2 + DORA + BdP |
| **Equipa IR** | 2 pessoas (+ outsourcing forense) | SOC de 12 pessoas + CSIRT de 6 |
| **Tempo para implementar** | 2-3 meses | 12-18 meses |
| **Orçamento IR** | €30-50K/ano | €500K-1M/ano |

**Como interpretar:** *A startup precisa de velocidade e pragmatismo — o NIST é a escolha natural. O banco precisa de governança robusta e conformidade com múltiplos reguladores — combina ISACA para governança com ISO 27035 para estrutura. Ambos usam SANS para operações, mas em escala diferente.*

---

## 11. Exercícios

### Exercício 1 — Associar frameworks a características (Nível básico)

Associe cada framework à sua característica principal:

| Framework | Característica |
|-----------|---------------|
| a) ISO 27035 | 1. Certificação GCIH |
| b) NIST SP 800-61 | 2. Governança e auditoria |
| c) SANS | 3. CSIRTs e contexto europeu |
| d) ENISA | 4. Norma internacional em 4 partes |
| e) ISACA | 5. Guia prático gratuito em 4 fases |

??? success "Solução 1"
    | Framework | Característica | Justificação |
    |-----------|---------------|-------------|
    | a) ISO 27035 | **4. Norma internacional em 4 partes** | A ISO 27035 é publicada em 4 partes pela ISO/IEC |
    | b) NIST SP 800-61 | **5. Guia prático gratuito em 4 fases** | Publicação gratuita do NIST com modelo em 4 fases |
    | c) SANS | **1. Certificação GCIH** | O modelo SANS é a base da certificação GIAC Certified Incident Handler |
    | d) ENISA | **3. CSIRTs e contexto europeu** | A ENISA é a agência europeia de cibersegurança, foco em CSIRTs |
    | e) ISACA | **2. Governança e auditoria** | A ISACA aborda IR da perspetiva de governança (CISM, CRISC) |

### Exercício 2 — Mapear atividades entre modelos (Nível intermédio)

Para cada atividade, identifique em que **fase do NIST** e em que **passo do SANS** se enquadra:

| Atividade | Fase NIST? | Passo SANS? |
|-----------|-----------|-------------|
| a) Criar imagem forense do servidor | ? | ? |
| b) Instalar SIEM e configurar alertas | ? | ? |
| c) Bloquear IP do atacante no firewall | ? | ? |
| d) Restaurar serviço a partir de backup | ? | ? |
| e) Reunir equipa para análise pós-incidente | ? | ? |
| f) Confirmar que o alerta não é falso positivo | ? | ? |
| g) Aplicar patch na vulnerabilidade explorada | ? | ? |
| h) Treinar equipa em procedimentos de IR | ? | ? |

??? success "Solução 2"
    | Atividade | Fase NIST | Passo SANS | Justificação |
    |-----------|----------|-----------|-------------|
    | a) Criar imagem forense | **3. Containment, Eradication & Recovery** | **3. Containment** (ou 4. Eradication) | Preservação de evidências ocorre na contenção/início da erradicação |
    | b) Instalar SIEM | **1. Preparation** | **1. Preparation** | Configuração de ferramentas é preparação |
    | c) Bloquear IP no firewall | **3. Containment, Eradication & Recovery** | **3. Containment** | Ação de contenção para limitar o ataque |
    | d) Restaurar de backup | **3. Containment, Eradication & Recovery** | **5. Recovery** | Restauração de serviço é recuperação |
    | e) Análise pós-incidente | **4. Post-Incident Activity** | **6. Lessons Learned** | Revisão após o incidente |
    | f) Confirmar alerta real | **2. Detection & Analysis** | **2. Identification** | Triagem e confirmação do incidente |
    | g) Aplicar patch | **3. Containment, Eradication & Recovery** | **4. Eradication** | Remover a vulnerabilidade é erradicação |
    | h) Treinar equipa IR | **1. Preparation** | **1. Preparation** | Formação é preparação |

    **Nota:** Repare como o NIST agrupa contenção, erradicação e recuperação numa única fase (fase 3), enquanto o SANS as separa em 3 passos distintos (3, 4 e 5). As atividades são as mesmas — a organização é que difere.

### Exercício 3 — Recomendar framework (Nível avançado)

Para cada cenário, recomende a **combinação de frameworks** mais adequada e justifique:

**Cenário A:** Empresa de energia (1.500 colaboradores, infraestrutura crítica, abrangida pela NIS2)

**Cenário B:** Escritório de advogados (30 colaboradores, dados altamente confidenciais, sem equipa de TI interna)

**Cenário C:** Universidade (10.000 utilizadores, CSIRT académico, múltiplos reguladores)

??? success "Solução 3"
    **Cenário A — Empresa de energia:**

    | Componente | Framework | Justificação |
    |------------|-----------|-------------|
    | Governança | ISACA + ISO 27035 | Infraestrutura crítica exige governança forte e alinhamento ISO |
    | Operações | NIST SP 800-61 | Guia prático para a equipa de segurança |
    | Regulatório | ENISA | Obrigatório sob NIS2 (entidade essencial do setor energético) |
    | Formação | SANS (GCIH + GRID) | Equipa precisa de competências ICS/SCADA |

    *A empresa de energia é uma entidade essencial sob a NIS2, o que obriga a requisitos rigorosos de notificação (24h) e capacidade de resposta. A combinação ISACA+ISO para governança garante alinhamento com o regulador setorial. NIST para operações diárias. ENISA para conformidade europeia. SANS para formação especializada em ICS/SCADA (sistemas de controlo industrial).*

    **Cenário B — Escritório de advogados:**

    | Componente | Framework | Justificação |
    |------------|-----------|-------------|
    | Principal | NIST SP 800-61 (simplificado) | Prático, gratuito, adaptável a organizações pequenas |
    | Complemento | ENISA | Contexto RGPD (dados pessoais sensíveis dos clientes) |
    | Operações | Outsourcing (MSSP/MDR) | Sem equipa interna — externalizar deteção e resposta |

    *Um escritório de 30 pessoas não precisa da complexidade da ISO 27035 ou ISACA. O NIST simplificado cobre o essencial. A ENISA orienta a conformidade RGPD (o escritório trata dados sensíveis). A resposta operacional deve ser externalizada para um MSSP (Managed Security Service Provider), porque não há equipa interna.*

    **Cenário C — Universidade:**

    | Componente | Framework | Justificação |
    |------------|-----------|-------------|
    | Estrutura | ISO 27035 | Universidades frequentemente seguem ISO para certificação |
    | Operações | NIST + SANS | CSIRT académico precisa de guia prático e formação |
    | Regulatório | ENISA | Possível abrangência NIS2 + colaboração com RCTS/CERT.PT |
    | Cooperação | ENISA (CSIRT maturity) | CSIRT académico integra rede de CSIRTs nacionais |

    *A universidade tem desafios únicos: 10.000 utilizadores diversificados (alunos, docentes, investigadores), BYOD massivo, múltiplas redes e sistemas. O CSIRT académico deve alinhar-se com a RCTS (Rede Ciência, Tecnologia e Sociedade) e o CERT.PT, que seguem padrões ENISA.*

---

## 12. Armadilhas e confusões a evitar

!!! danger "Confusão 1: Existe um framework 'melhor' que os outros"
    **Errado.** Cada framework tem o seu foco. O NIST é prático, a ISO 27035 é normativa, o SANS é operacional, a ENISA é europeia, o ISACA é governança. A maioria das organizações **combina vários** — não há one-size-fits-all.

!!! danger "Confusão 2: O NIST tem 4 fases, por isso é mais simples que o SANS com 6 passos"
    **Errado.** O NIST agrupa contenção, erradicação e recuperação numa única fase. O SANS separa-as. As atividades são as mesmas — a granularidade é que difere. Menos fases não significa menos trabalho.

!!! danger "Confusão 3: Basta seguir um framework para estar protegido"
    **Errado.** Um framework é uma **estrutura**, não uma solução. Ter o NIST implementado "no papel" mas sem equipa treinada, ferramentas configuradas e exercícios regulares é inútil. O framework guia — a organização executa.

!!! danger "Confusão 4: Os aspetos legais são da responsabilidade do jurídico, não do IR"
    **Errado.** A equipa de IR precisa de conhecer os prazos legais (72h RGPD, 24h NIS2), preservar evidências para possível ação judicial, e coordenar com o jurídico **antes** do incidente — não depois. Incluir o jurídico no plano é uma obrigação, não uma opção.

!!! danger "Confusão 5: A investigação forense é opcional"
    **Errado.** Mesmo que não se pretenda processar criminalmente o atacante, a investigação é essencial para: (1) entender a causa raiz, (2) garantir a erradicação completa, (3) cumprir obrigações legais de investigação (RGPD em data breaches), (4) melhorar defesas futuras. Sem investigação, não se sabe o que aconteceu — logo, não se pode garantir que não volta a acontecer.

!!! danger "Confusão 6: A ENISA é um framework como o NIST ou a ISO"
    **Errado.** A ENISA não é um framework de IR no sentido técnico. É uma agência que pública **orientações, taxonomias e boas práticas** para o contexto europeu. Complementa frameworks técnicos (NIST, SANS, ISO) mas não os substitui.

---

## 13. Resumo rápido

| Framework | Foco | Fases/Passos | Melhor para |
|-----------|------|-------------|-------------|
| **ISO 27035** | Normativo | 5 fases | Organizações ISO 27001 |
| **NIST SP 800-61** | Prático | 4 fases | Primeira implementação / guia geral |
| **SANS** | Operacional | 6 passos | Equipas SOC/CSIRT |
| **ENISA** | Regulatório UE | Variável | Entidades NIS2 / CSIRTs europeus |
| **ISACA** | Governança | Integrado | CISOs / auditores / gestão |

### Frases-chave para recordar

- "Não existe o framework perfeito — existe a **combinação certa** para a organização"
- "O NIST agrupa, o SANS separa, a ISO estrutura — as **atividades são as mesmas**"
- "O framework é o mapa. A equipa treinada é quem faz a viagem"
- "Os aspetos legais não são opcionais — são **parte integrante** do Incident Response"
- "A ENISA não substitui o NIST — complementa-o com o **contexto europeu**"

---

## 📎 Documentos operacionais relacionados

A concretização destes frameworks em [Nome da organização] materializa-se em documentos específicos. Catálogo completo em [Preparação — Documentos operacionais](preparacao.md#documentos-e-templates-operacionais).

- [📄 Política de Gestão de Incidentes](../gestao_incidentes/politica-gestao-incidentes.docx) — alinhada com ISO 27035, NIST SP 800-61r2 e DL 125/2025 (NIS2 PT).
- [📄 Plano de Resposta a Incidentes (NIS2)](../gestao_incidentes/plano-resposta-incidentes-nis2.docx) — implementação concreta do ciclo NIST/SANS adaptada ao contexto legal português.
- [📄 Procedimento de Escalonamento e Matriz RACI](../gestao_incidentes/procedimento-escalonamento-raci.docx) — concretiza a governação descrita no ISACA.

---

**Próximos passos:** Explore a [Preparação](preparacao.md) para perceber como montar uma equipa CSIRT, definir políticas e equipar a organização antes do primeiro incidente.
