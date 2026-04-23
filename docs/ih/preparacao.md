# Preparação para Incidentes

## Índice

1. [Visão geral](#1-visao-geral)
2. [Políticas de segurança](#2-politicas-de-seguranca)
3. [Construir uma equipa CSIRT](#3-construir-uma-equipa-csirt)
4. [Procedimentos e processos](#4-procedimentos-e-processos)
5. [Ferramentas e infraestrutura](#5-ferramentas-e-infraestrutura)
6. [Treino e sensibilização](#6-treino-e-sensibilizacao)
7. [Template de reporte para utilizadores](#7-template-de-reporte-para-utilizadores)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)

---

## 1. Visão geral

A **Preparação** é a fase mais importante de todo o ciclo de Incident Handling. Sem preparação adequada, qualquer incidente transforma-se em caos — decisões tomadas sob pressão, sem procedimentos, sem ferramentas, sem saber quem faz o quê.

> A preparação não evita incidentes. Garante que, quando acontecem, a organização responde de forma estruturada em vez de reagir em pânico.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              FASE DE PREPARAÇÃO — VISÃO GERAL                ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    ║
  ║   │  POLÍTICAS   │──►│ PROCEDIMENTOS│──►│  FERRAMENTAS │    ║
  ║   │  O que fazer  │   │ Como fazer   │   │ Com que meios│    ║
  ║   └──────────────┘   └──────────────┘   └──────────────┘    ║
  ║          │                   │                   │            ║
  ║          ▼                   ▼                   ▼            ║
  ║   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐    ║
  ║   │   EQUIPA     │──►│   TREINO     │──►│  REPORTING   │    ║
  ║   │  Quem faz    │   │ Preparar as  │   │ Como reportar│    ║
  ║   │              │   │ pessoas      │   │              │    ║
  ║   └──────────────┘   └──────────────┘   └──────────────┘    ║
  ║                                                               ║
  ║   Todos os componentes devem estar prontos ANTES do           ║
  ║   primeiro incidente. Preparar durante o incidente é          ║
  ║   demasiado tarde.                                            ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Porquê investir na preparação?

| Razão | Descrição |
|-------|-----------|
| **Reduzir tempo de resposta** | Procedimentos definidos eliminam hesitação e improviso |
| **Limitar o impacto** | Deteção precoce e contenção rápida minimizam danos |
| **Cumprir obrigações legais** | RGPD (72h), NIS2 (24h) exigem capacidade de resposta documentada |
| **Proteger evidências** | Sem preparação, evidências são destruídas inadvertidamente |
| **Manter a confiança** | Clientes e parceiros confiam em organizações que respondem com profissionalismo |

!!! tip "A regra de ouro"
    Por cada hora investida em preparação, poupam-se dezenas de horas durante um incidente real. As organizações mais maduras dedicam **mais tempo à preparação** do que a qualquer outra fase do ciclo.

---

## 2. Políticas de segurança

As **políticas** são o fundamento da preparação. Sem políticas aprovadas pela gestão de topo, a equipa de resposta não tem autoridade, mandato nem legitimidade para atuar.

### O que as políticas devem definir

```
  ┌─────────────────────────────────────────────────────────────────┐
  │              POLÍTICAS DE INCIDENT RESPONSE                      │
  │                                                                  │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  1. ESTRATÉGIA DE IR                                    │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Consistente com a política de segurança corporativa.   │    │
  │   │  Aprovada pela gestão de topo (board/administração).    │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  2. PAPÉIS E RESPONSABILIDADES                          │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  IRT: quem faz parte, quem lidera, quem decide.        │    │
  │   │  Restante pessoal: que papel têm durante um incidente.  │    │
  │   │  Gestão funcional: informada e alinhada.                │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  3. AUTORIDADE DA EQUIPA                                │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  A equipa DEVE ter autoridade suficiente para agir:     │    │
  │   │  Ex.: desligar serviços web em momentos críticos,       │    │
  │   │  isolar segmentos de rede, bloquear contas.             │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  4. ATIVOS E TOLERÂNCIAS                                │    │
  │   │  ─────────────────────────────────────────────────────  │    │
  │   │  Lista priorizada de ativos de informação e serviços.   │    │
  │   │  Tempo de inatividade aceitável para cada ativo.        │    │
  │   └────────────────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────────────────┘
```

### Elementos essenciais da política

| Elemento | Descrição | Exemplo |
|----------|-----------|---------|
| **Âmbito** | Que sistemas, pessoas e processos estão cobertos | "Todos os sistemas de informação da organização" |
| **Definição de incidente** | O que constitui um incidente de segurança | "Qualquer evento que comprometa a CIA da informação" |
| **Autoridade da IRT** | Que ações a equipa pode tomar autonomamente | "Desligar serviços, isolar redes, bloquear contas" |
| **Escalação** | Quando e como escalar para a gestão | "Incidentes de severidade alta: notificação ao CISO em 30 min" |
| **Comunicação** | Canais e regras de comunicação interna/externa | "Toda a comunicação externa passa pelo porta-voz designado" |
| **Ativos priorizados** | Lista de ativos críticos e downtime aceitável | "ERP: máximo 4h; Email: máximo 8h; Website: máximo 24h" |

!!! warning "Autoridade insuficiente"
    Um dos erros mais comuns é criar uma equipa de resposta que **não tem autoridade** para agir. Se a equipa precisa de aprovação da direção para desligar um serviço comprometido durante um ataque ativo, o atacante tem vantagem. A política deve conferir autoridade clara para ações críticas em momentos críticos.

---

## 3. Construir uma equipa CSIRT

O **CSIRT** (Computer Security Incident Response Team) é o núcleo operacional da resposta a incidentes. A sua composição, papéis e autoridade determinam a eficácia de toda a resposta.

!!! tip "Capítulo dedicado"
    Esta secção apresenta apenas os fundamentos da composição do CSIRT no contexto da Preparação. Para o **processo completo de criação** (missão, constituency, autoridade, modelos organizacionais, cooperação externa, base legal), ver o capítulo dedicado [Setting Up CSIRT](../csirt/index.md).

### Composição típica de um CSIRT

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║                  ESTRUTURA DO CSIRT                            ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║                 ┌──────────────────┐                          ║
  ║                 │  CSIRT Manager   │                          ║
  ║                 │  (Coordenação)   │                          ║
  ║                 └────────┬─────────┘                          ║
  ║                          │                                    ║
  ║          ┌───────────────┼───────────────┐                    ║
  ║          │               │               │                    ║
  ║   ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐            ║
  ║   │  Analistas  │ │ Analistas  │ │ Especialista│            ║
  ║   │  de Triagem │ │ Forenses   │ │ Comunicação │            ║
  ║   │  (Tier 1)   │ │ (Tier 2/3) │ │             │            ║
  ║   └─────────────┘ └────────────┘ └─────────────┘            ║
  ║                                                               ║
  ║   ┌─────────────────────────────────────────────────────┐    ║
  ║   │  MEMBROS DE APOIO (ativados conforme necessidade)   │    ║
  ║   │                                                      │    ║
  ║   │  ● Administradores de sistemas/rede                  │    ║
  ║   │  ● Representante jurídico                            │    ║
  ║   │  ● Representante de RH                               │    ║
  ║   │  ● Representante de comunicação/RP                   │    ║
  ║   │  ● Gestão de topo (para decisões de alto impacto)    │    ║
  ║   └─────────────────────────────────────────────────────┘    ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Papéis e responsabilidades

| Papel | Responsabilidades | Perfil necessário |
|-------|-------------------|-------------------|
| **CSIRT Manager** | Coordenação geral, decisões de escalação, interface com a gestão | Experiência em gestão e segurança, capacidade de decisão sob pressão |
| **Analista Tier 1** | Triagem de alertas, classificação inicial, recolha de dados | Conhecimento de redes, sistemas operativos, ferramentas SIEM |
| **Analista Tier 2/3** | Investigação aprofundada, análise forense, contenção avançada | Experiência em forense digital, malware analysis, threat hunting |
| **Comunicação** | Notificações internas/externas, relações com média, relatórios | Competências de comunicação em crise |
| **Jurídico** | Aspetos legais, preservação de evidências, notificações regulatórias | Conhecimento de RGPD, NIS2, lei do cibercrime |

### Ferramentas e recursos do CSIRT

A equipa precisa de ter à disposição, **antes** de qualquer incidente:

| Categoria | Ferramentas/Recursos |
|-----------|---------------------|
| **Comunicação** | Canal seguro (fora da rede corporativa), lista de contactos atualizada, war room |
| **Análise** | Estações forenses, ferramentas de análise de malware, acesso a logs centralizados |
| **Contenção** | Acesso administrativo a firewalls, switches, AD; capacidade de isolamento de rede |
| **Documentação** | Sistema de ticketing, templates de relatório, repositório de evidências |
| **Externo** | Contactos de CERTs nacionais, fornecedores, forças policiais, seguradoras |

!!! info "Dimensão da equipa"
    Não existe uma dimensão "certa" para um CSIRT. Uma PME pode ter 2-3 pessoas com funções acumuladas e apoio externo (MSSP). Uma grande empresa pode ter um SOC de 20+ pessoas com turnos 24/7. O essencial é que os **papéis estejam definidos** e as **competências cobertas**, mesmo que por recurso a outsourcing.

---

## 4. Procedimentos e processos

As políticas definem **o quê**; os procedimentos definem **como**. Procedimentos claros e comunicados a toda a organização são a diferença entre uma resposta coordenada e o caos.

### Tipos de procedimentos essenciais

```
  ┌─────────────────────────────────────────────────────────────────┐
  │             PROCEDIMENTOS ESSENCIAIS                             │
  │                                                                  │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  1. PROCEDIMENTO DE REPORTE                             │    │
  │   │     Como reportar um incidente suspeito                 │    │
  │   │     Quem contactar, que informação incluir              │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  2. PROCEDIMENTO DE ESCALAÇÃO                           │    │
  │   │     Critérios de severidade e respetivos escalamentos   │    │
  │   │     Tempos máximos para cada nível de escalação         │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  3. PROCEDIMENTO DE RESPOSTA                            │    │
  │   │     Passos concretos para cada tipo de incidente        │    │
  │   │     Checklists de contenção, erradicação, recuperação   │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  4. ESTRATÉGIA DE BACKUP                                │    │
  │   │     Frequência, retenção, testes de restauração         │    │
  │   │     Backups offline/imutáveis para proteção ransomware  │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  5. CALL LIST (LISTA DE CONTACTOS)                      │    │
  │   │     Contactos internos e externos atualizados           │    │
  │   │     Disponibilidade 24/7 para membros críticos          │    │
  │   └────────────────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────────────────┘
```

### Matriz de escalação

Uma matriz de escalação define **quem é notificado** com base na **severidade** do incidente:

| Severidade | Descrição | Notificar | Tempo máximo |
|------------|-----------|-----------|--------------|
| **Crítica** | Ameaça existencial ao negócio (ransomware em sistemas core, data breach massivo) | CISO + CEO + Jurídico + CSIRT completo | **15 minutos** |
| **Alta** | Comprometimento significativo (servidor crítico, exfiltração de dados) | CISO + CSIRT Manager + Analistas Tier 2/3 | **30 minutos** |
| **Média** | Incidente contido mas relevante (malware num posto de trabalho, phishing com credenciais) | CSIRT Manager + Analista Tier 1 | **2 horas** |
| **Baixa** | Evento de segurança menor (tentativa falhada, alerta isolado) | Analista Tier 1 (registo no sistema) | **24 horas** |

### Call List — conteúdo mínimo

| Campo | Descrição |
|-------|-----------|
| **Nome e papel** | Identificação e função na resposta |
| **Contacto principal** | Telefone móvel (não depender do email corporativo) |
| **Contacto alternativo** | Segundo contacto se o principal falhar |
| **Disponibilidade** | Horário de trabalho ou 24/7 |
| **Substituto** | Quem assume se a pessoa não estiver disponível |

!!! warning "Comunicar os procedimentos"
    De nada serve ter procedimentos excelentes se ninguém os conhece. Os procedimentos devem ser **comunicados a todos os colaboradores**, incluindo a gestão. Um colaborador que deteta algo suspeito mas não sabe a quem ligar é uma oportunidade de deteção desperdiçada.

---

## 5. Ferramentas e infraestrutura

A preparação técnica envolve instalar, configurar e testar os **ativos de deteção** antes de qualquer incidente. Estes são os "olhos e ouvidos" da organização.

### Ativos de deteção pré-instalados

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║           INFRAESTRUTURA DE DETEÇÃO E MONITORIZAÇÃO           ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌───────────────────────────────────────────────────────┐  ║
  ║   │  CAMADA 1: SENSORES E SONDAS                          │  ║
  ║   │  ● Monitorização de sistemas críticos                  │  ║
  ║   │    (CPU, disco, memória, processos, serviços)          │  ║
  ║   │  ● Sondas de rede em pontos estratégicos               │  ║
  ║   │  ● Agentes nos endpoints (EDR)                         │  ║
  ║   └───────────────────────────────────────────────────────┘  ║
  ║                          │                                    ║
  ║                          ▼                                    ║
  ║   ┌───────────────────────────────────────────────────────┐  ║
  ║   │  CAMADA 2: LOGS E AUDITORIA                            │  ║
  ║   │  ● Audit logs ativos em TODOS os servidores e          │  ║
  ║   │    componentes de rede                                  │  ║
  ║   │  ● Definir: onde são retidos, com que frequência        │  ║
  ║   │    atualizados, quem os controla                        │  ║
  ║   │  ● Sincronização de tempo (NTP) em todos os sistemas   │  ║
  ║   └───────────────────────────────────────────────────────┘  ║
  ║                          │                                    ║
  ║                          ▼                                    ║
  ║   ┌───────────────────────────────────────────────────────┐  ║
  ║   │  CAMADA 3: ANÁLISE E CORRELAÇÃO                        │  ║
  ║   │  ● SIEM (Security Information and Event Management)    │  ║
  ║   │  ● IDS/IPS (Intrusion Detection/Prevention)            │  ║
  ║   │  ● Antivírus/Anti-malware centralizado                 │  ║
  ║   │  ● Content filtering (web e email)                     │  ║
  ║   └───────────────────────────────────────────────────────┘  ║
  ║                          │                                    ║
  ║                          ▼                                    ║
  ║   ┌───────────────────────────────────────────────────────┐  ║
  ║   │  CAMADA 4: BASELINES E SCANNING                        │  ║
  ║   │  ● Tracking databases dos sistemas core (snapshots     │  ║
  ║   │    do estado normal dos sistemas)                       │  ║
  ║   │  ● Security scanning periódico de vulnerabilidades     │  ║
  ║   │  ● Baselines de segurança mínima                       │  ║
  ║   └───────────────────────────────────────────────────────┘  ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Tabela de ferramentas e sua função

| Ferramenta | Função na preparação | Exemplo |
|------------|---------------------|---------|
| **SIEM** | Centralizar e correlacionar logs de múltiplas fontes | Splunk, Microsoft Sentinel, Elastic SIEM |
| **IDS/IPS** | Detetar padrões de ataque conhecidos no tráfego de rede | Suricata, Snort, Palo Alto |
| **EDR** | Monitorizar endpoints e detetar comportamento anómalo | CrowdStrike Falcon, Microsoft Defender for Endpoint |
| **Antivírus** | Detetar malware conhecido nos endpoints e servidores | Variados, com gestão centralizada |
| **Vulnerability scanner** | Identificar vulnerabilidades antes que sejam exploradas | Nessus, Qualys, OpenVAS |
| **NTP** | Sincronizar relógios para correlação temporal de logs | Servidores NTP internos sincronizados |
| **Baseline tools** | Manter snapshots do estado "normal" dos sistemas | AIDE, Tripwire, OSSEC |

### Sincronização de tempo — um detalhe crítico

!!! danger "Relógios dessincronizados"
    Se os relógios dos sistemas não estiverem sincronizados, a correlação de eventos entre diferentes fontes de logs torna-se impossível. Imagine tentar reconstruir a cronologia de um ataque quando o firewall marca 14:03, o servidor 14:07 e o IDS 13:58 para o mesmo evento. A sincronização NTP é **obrigatória** em todos os componentes.

### Tracking databases e baselines

As **tracking databases** são snapshots do estado normal dos sistemas críticos durante operações normais. Incluem:

- Processos em execução e respetivas hashes
- Portas abertas e serviços ativos
- Configurações de sistema e rede
- Permissões de ficheiros críticos
- Versões de software instalado

Estes snapshots servem de **referência** para comparar com o estado de um sistema suspeito durante um incidente. Se a baseline mostra 47 processos normais e o sistema tem 49, os 2 adicionais merecem investigação imediata.

---

## 6. Treino e sensibilização

Ter políticas, procedimentos e ferramentas é necessário mas insuficiente. Sem **treino**, as pessoas não sabem usar o que está disponível. A preparação humana é tão importante como a preparação técnica.

### Três públicos, três tipos de treino

| Público | Tipo de treino | Objetivo |
|---------|---------------|----------|
| **Equipa CSIRT** | Treino técnico aprofundado | Garantir conhecimentos e competências para detetar, analisar, conter e erradicar ameaças |
| **Pessoal técnico (TI, dev)** | Treino orientado à função | Saber como colaborar com o CSIRT, preservar evidências, não destruir logs |
| **Todos os colaboradores** | Sensibilização e procedimentos de emergência | Saber reconhecer situações suspeitas, quem contactar, o que fazer e não fazer |

### Treino da equipa CSIRT

```
  ┌─────────────────────────────────────────────────────────────────┐
  │           PROGRAMA DE TREINO CSIRT                               │
  │                                                                  │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  COMPETÊNCIAS TÉCNICAS                                  │    │
  │   │  ● Análise forense digital                              │    │
  │   │  ● Análise de malware (estática e dinâmica)             │    │
  │   │  ● Análise de logs e correlação de eventos              │    │
  │   │  ● Threat intelligence e IOCs                           │    │
  │   │  ● Ferramentas SIEM, EDR, IDS                          │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  COMPETÊNCIAS PROCESSUAIS                               │    │
  │   │  ● Procedimentos de escalação e comunicação             │    │
  │   │  ● Cadeia de custódia de evidências                     │    │
  │   │  ● Documentação e reporte de incidentes                 │    │
  │   │  ● Coordenação com entidades externas (CERT, polícia)   │    │
  │   └────────────────────────────────────────────────────────┘    │
  │                          │                                       │
  │                          ▼                                       │
  │   ┌────────────────────────────────────────────────────────┐    │
  │   │  EXERCÍCIOS PRÁTICOS                                    │    │
  │   │  ● Tabletop exercises (simulação em sala)               │    │
  │   │  ● Red team/blue team (simulação técnica)               │    │
  │   │  ● CTF (Capture the Flag) internos                      │    │
  │   │  ● Simulação de incidentes com cenários reais           │    │
  │   └────────────────────────────────────────────────────────┘    │
  └─────────────────────────────────────────────────────────────────┘
```

### Sensibilização dos utilizadores

Para os utilizadores comuns, o treino deve ser **simples e prático**:

- **O que é um incidente:** exemplos concretos (email suspeito, comportamento estranho do PC, acesso não autorizado)
- **O que fazer:** contactar imediatamente o ponto de contacto designado
- **O que NÃO fazer:** não desligar o computador (preservar evidências), não tentar "resolver" sozinho, não partilhar informação sobre o incidente nas redes sociais
- **Procedimentos de emergência:** números/emails de contacto, quando e como reportar

### Atualização contínua

!!! tip "Manter tudo atualizado"
    A preparação não é um evento único. É um processo contínuo. As guidelines, checklists e ferramentas do CSIRT devem ser **atualizadas regularmente** com base em: lições aprendidas de incidentes anteriores, novas ameaças e vulnerabilidades, mudanças na infraestrutura, alterações regulatórias e exercícios de simulação.

---

## 7. Template de reporte para utilizadores

Os utilizadores são frequentemente os primeiros a detetar sinais de um incidente. Um **template de reporte** simples e claro ajuda-os a fornecer informação útil sem criar confusão.

### As 5 perguntas do utilizador

> Quando um utilizador deteta algo suspeito, deve saber responder a cinco perguntas: o quê, quem, quando, como e porquê.

| Pergunta | O que o utilizador deve saber | Exemplo de resposta |
|----------|------------------------------|---------------------|
| **O que fazer (e não fazer)?** | Ações imediatas ao identificar o incidente | "Não desligar o PC. Desligar o cabo de rede. Anotar o que viu no ecrã." |
| **A quem ligar?** | Ponto de contacto designado para incidentes | "Helpdesk: ext. 5555 ou segurança@empresa.pt" |
| **Quando ligar?** | Imediatamente ou dentro de que prazo | "Imediatamente. Não esperar. Não tentar resolver sozinho." |
| **Que informação fornecer?** | Dados úteis para a triagem | "Nome, localização, hora, o que observou, que ações tomou" |
| **Quem notificar ou não?** | Quem mais deve saber e quem não deve | "Notificar o superior direto. Não partilhar nas redes sociais." |

### Modelo de ficha de reporte

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║             FICHA DE REPORTE DE INCIDENTE                     ║
  ║             (Para preenchimento pelo utilizador)               ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   Data/Hora: ___/___/_____ ___:___                            ║
  ║   Nome: ________________________________                      ║
  ║   Departamento: ________________________                      ║
  ║   Contacto telefónico: ________________                       ║
  ║                                                               ║
  ║   O que observou?                                             ║
  ║   ________________________________________________            ║
  ║   ________________________________________________            ║
  ║                                                               ║
  ║   Que sistemas/aplicações estão afetados?                     ║
  ║   ________________________________________________            ║
  ║                                                               ║
  ║   Que ações tomou após detetar?                               ║
  ║   ________________________________________________            ║
  ║                                                               ║
  ║   Outras pessoas afetadas?                                    ║
  ║   ________________________________________________            ║
  ║                                                               ║
  ║   Reportado a: _____________ Hora: ___:___                    ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! info "Simplicidade acima de tudo"
    O template deve ser **o mais simples possível**. Um utilizador em pânico não vai preencher um formulário de 3 páginas. As informações mais críticas são: quem reporta, quando, e o que observou. Tudo o resto pode ser recolhido pela equipa CSIRT posteriormente.

---

## 8. Exemplos práticos

### Exemplo 1 — Preparação de uma empresa de e-commerce

**Contexto:** Uma empresa de e-commerce com 200 colaboradores e 50.000 clientes está a montar o seu programa de preparação para incidentes. Trata dados de pagamento (PCI DSS) e dados pessoais (RGPD).

| Componente | Implementação | Justificação |
|------------|--------------|-------------|
| **Política IR** | Aprovada pelo CEO, define autoridade do CSIRT para desligar sistemas de pagamento | Dados de cartão exigem resposta imediata; sem autoridade, a equipa fica bloqueada |
| **CSIRT** | 3 pessoas (manager + 2 analistas) + contrato MSSP para forense | PME não justifica equipa forense permanente; outsourcing cobre essa lacuna |
| **SIEM** | Microsoft Sentinel com regras focadas em: acessos ao BD de clientes, tentativas de SQL injection, logins anómalos | Monitorização direcionada aos ativos mais críticos (dados de pagamento e clientes) |
| **Backups** | Diários (incrementais), semanais (completos), cópia offline imutável | Proteção contra ransomware: mesmo que a rede seja comprometida, os backups offline estão protegidos |
| **Call list** | Inclui: CSIRT, CEO, jurídico, fornecedor de hosting, CNCS, seguradora ciber | Contactos completos para todos os cenários: técnico, legal, regulatório |
| **Treino** | CSIRT: exercício trimestral; colaboradores: sensibilização anual + phishing simulado | Manter competências atualizadas; testar se os utilizadores reconhecem ameaças |

**Como interpretar:** *A empresa priorizou a proteção dos dados de pagamento e dados pessoais, que são os ativos mais sensíveis. A equipa CSIRT é pequena mas complementada por outsourcing. A monitorização foca-se no que realmente importa em vez de tentar monitorizar tudo. Os backups imutáveis protegem contra o cenário mais destrutivo (ransomware).*

**Para refletir:**

- Porque é que a empresa escolheu backups offline imutáveis além dos backups regulares?
- Que consequências teria a falta de autoridade do CSIRT para desligar os sistemas de pagamento?
- Como é que o contrato com o MSSP deve definir os tempos de resposta?

### Exemplo 2 — Falhas de preparação numa autarquia

**Contexto:** Uma câmara municipal sofreu um ataque de ransomware. A análise pós-incidente revelou falhas graves na preparação.

| Falha identificada | Consequência | O que deveria existir |
|-------------------|-------------|----------------------|
| Sem política de IR aprovada | Ninguém sabia quem podia decidir desligar sistemas | Política com autoridade clara atribuída ao responsável TI |
| Sem CSIRT definido | O técnico de TI tentou resolver sozinho durante 6 horas | Equipa definida com papéis claros e contactos de apoio externo |
| Logs desativados nos servidores | Impossível determinar como o atacante entrou | Audit logs ativos em todos os servidores, retidos por mínimo 90 dias |
| Backups apenas na rede interna | Ransomware cifrou também os backups | Backups offline ou imutáveis, separados da rede corporativa |
| Relógios dessincronizados | Impossível correlacionar eventos entre sistemas | Sincronização NTP obrigatória em todos os componentes |
| Sem treino dos utilizadores | O email de phishing inicial não foi reportado | Sensibilização regular com simulações de phishing |

**Como interpretar:** *Cada falha de preparação teve uma consequência direta e grave durante o incidente. A falta de política impediu decisões rápidas. A falta de equipa levou a uma resposta solitária e inadequada. A ausência de logs impediu a investigação. Os backups na rede foram destruídos pelo ransomware. Todas estas falhas eram evitáveis com preparação adequada.*

**Para refletir:**

- Qual destas falhas teve o maior impacto? Porquê?
- Se tivesse de corrigir apenas uma falha com orçamento limitado, qual escolheria?
- Como é que a sincronização de tempo afetou a investigação forense?

---

## 9. Exercícios

### Exercício 1 — Identificar componentes de preparação (Nível básico)

Classifique cada item como pertencente a Políticas (P), Procedimentos (PR), Ferramentas (F) ou Treino (T):

| Item | Categoria? |
|------|-----------|
| a) Lista de contactos de emergência atualizada | ? |
| b) Aprovação da gestão para desligar serviços em caso de ataque | ? |
| c) Exercício tabletop trimestral com cenários de ransomware | ? |
| d) Instalação de IDS nas interfaces de rede críticas | ? |
| e) Definição de tempo máximo de inatividade por sistema | ? |
| f) Simulação de phishing enviada a todos os colaboradores | ? |
| g) Regras de correlação de eventos no SIEM | ? |
| h) Matriz de escalação com tempos máximos por severidade | ? |

??? success "Solução 1"
    | Item | Categoria | Justificação |
    |------|-----------|-------------|
    | a) Lista de contactos de emergência | **PR (Procedimento)** | A call list é um elemento operacional dos procedimentos de resposta |
    | b) Aprovação para desligar serviços | **P (Política)** | A autoridade da equipa é definida na política, aprovada pela gestão de topo |
    | c) Exercício tabletop trimestral | **T (Treino)** | Tabletop exercises são exercícios de treino para a equipa |
    | d) IDS nas interfaces de rede | **F (Ferramenta)** | IDS é um ativo de deteção pré-instalado |
    | e) Tempo máximo de inatividade | **P (Política)** | Definido na política como parte da priorização de ativos |
    | f) Simulação de phishing | **T (Treino)** | Sensibilização e teste dos utilizadores |
    | g) Regras de correlação no SIEM | **F (Ferramenta)** | Configuração de ferramenta de monitorização |
    | h) Matriz de escalação | **PR (Procedimento)** | Define o processo de escalação operacional |

    **Nota:** Alguns itens podem ter argumentos para mais do que uma categoria. Por exemplo, a matriz de escalação (h) está definida nos procedimentos mas tem origem na política. O importante é compreender a relação entre componentes.

### Exercício 2 — Desenhar uma Call List (Nível intermédio)

**Cenário:** Uma clínica médica com 80 colaboradores, um departamento de TI com 3 pessoas, e dados de saúde de 15.000 pacientes. Desenhe uma call list para resposta a incidentes.

A sua call list deve incluir:

1. Pelo menos 6 contactos internos com papel, responsabilidade e ordem de contacto
2. Pelo menos 3 contactos externos relevantes
3. Justificação para a inclusão de cada contacto

??? success "Solução 2"
    **Call List — Clínica Médica**

    **Contactos internos (por ordem de contacto):**

    | Ordem | Papel | Responsabilidade | Justificação |
    |-------|-------|-----------------|-------------|
    | 1 | Responsável TI (CSIRT Manager) | Coordenar a resposta, avaliar severidade | Primeiro ponto de contacto — decide ações técnicas imediatas |
    | 2 | Técnico TI (Analista) | Executar ações de contenção e recolha de evidências | Suporte técnico direto ao responsável TI |
    | 3 | Administrador da clínica | Decisões de negócio, autorizar ações de alto impacto | Desligar sistemas clínicos requer aprovação da administração |
    | 4 | Encarregado de Proteção de Dados (DPO) | Avaliar obrigações RGPD, preparar notificações | Dados de saúde são dados sensíveis — notificação CNPD pode ser obrigatória |
    | 5 | Diretor clínico | Avaliar impacto nos cuidados de saúde, ativar procedimentos manuais | Se os sistemas clínicos forem afetados, é preciso garantir continuidade dos cuidados |
    | 6 | Responsável de comunicação/RH | Comunicação interna, gestão de colaboradores afetados | Garantir que a comunicação é controlada e coerente |

    **Contactos externos:**

    | Contacto | Responsabilidade | Justificação |
    |----------|-----------------|-------------|
    | CNCS / CERT.PT | Reportar incidente ao CSIRT nacional | Obrigatório para entidades de saúde (NIS2); apoio técnico gratuito |
    | Fornecedor MSSP | Apoio forense e técnico especializado | Equipa interna de 3 pessoas é insuficiente para incidentes graves |
    | Seguradora ciber | Notificação e ativação da apólice | Cobrir custos de resposta, forense e eventuais indemnizações |

    *Uma clínica com dados de saúde tem obrigações especiais: os dados de saúde são "categorias especiais" no RGPD, o que agrava as consequências de uma violação. O DPO é essencial para avaliar obrigações de notificação à CNPD (72h) e aos pacientes afetados.*

### Exercício 3 — Plano de preparação completo (Nível avançado)

**Cenário:** Foi contratado como consultor de cibersegurança para uma empresa industrial (400 colaboradores, sistemas SCADA na produção, ligação à Internet limitada) que nunca teve qualquer programa de Incident Response. O orçamento anual disponível é de €80.000.

Elabore um plano de preparação que cubra:

1. Política de IR (elementos essenciais)
2. Composição do CSIRT (com justificação)
3. Procedimentos prioritários (top 3)
4. Ferramentas a implementar (com orçamento estimado)
5. Plano de treino para o primeiro ano

??? success "Solução 3"
    **Plano de Preparação — Empresa Industrial**

    **1. Política de IR (elementos essenciais):**

    - Âmbito: todos os sistemas IT e OT (SCADA), aprovação pelo conselho de administração
    - Autoridade do CSIRT: autoridade para isolar segmentos de rede IT; ações em rede OT requerem aprovação do diretor de produção (segurança de pessoas)
    - Ativos priorizados: (1) Sistemas SCADA/produção — downtime máximo 2h, (2) ERP — downtime máximo 8h, (3) Email/ficheiros — downtime máximo 24h
    - Comunicação: toda a comunicação externa (incluindo clientes e fornecedores) passa pelo administrador

    *Nota: em ambientes industriais, a autoridade sobre sistemas OT deve ser partilhada com a produção — desligar um SCADA pode ter implicações de segurança física.*

    **2. Composição do CSIRT:**

    | Membro | Dedicação | Justificação |
    |--------|-----------|-------------|
    | Responsável TI (Manager) | Parcial (acumula funções) | Coordenação e decisão — já conhece a infraestrutura |
    | Técnico IT/OT | Parcial (acumula funções) | Pessoa com conhecimento de ambos os mundos (IT e SCADA) |
    | Contrato MSSP | Sob chamada | Cobertura 24/7, forense, competências especializadas |

    Custo estimado CSIRT: €25.000/ano (contrato MSSP)

    **3. Procedimentos prioritários (top 3):**

    | Prioridade | Procedimento | Justificação |
    |------------|-------------|-------------|
    | 1 | Reporte e escalação | Sem isto, ninguém sabe a quem ligar |
    | 2 | Contenção de ransomware | Ameaça mais provável e mais destrutiva para a indústria |
    | 3 | Isolamento IT/OT | Impedir que um comprometimento na rede IT alcance os sistemas SCADA |

    **4. Ferramentas (orçamento €80.000):**

    | Ferramenta | Custo estimado | Justificação |
    |------------|---------------|-------------|
    | SIEM open-source (Wazuh/Elastic) | €5.000 (implementação) | Centralizar logs sem custo de licença |
    | EDR nos endpoints críticos | €15.000/ano | Deteção em endpoints (servidores, workstations administração) |
    | Firewall IT/OT (segmentação) | €10.000 | Separar fisicamente as redes IT e OT |
    | Backup offline (NAS isolado + tapes) | €8.000 | Proteção contra ransomware |
    | Contrato MSSP | €25.000/ano | Suporte especializado sob chamada |
    | Treino e sensibilização | €12.000/ano | Formação CSIRT + sensibilização geral |
    | Reserva/imprevistos | €5.000 | Margem para ajustes |
    | **Total** | **€80.000** | |

    **5. Plano de treino — primeiro ano:**

    | Trimestre | Atividade | Público |
    |-----------|-----------|---------|
    | T1 | Formação inicial CSIRT (procedimentos, ferramentas) + workshop SANS | Equipa CSIRT (2 pessoas) |
    | T2 | Sessão de sensibilização para todos os colaboradores + distribuição de ficha de reporte | Todos os 400 colaboradores |
    | T3 | Tabletop exercise: cenário de ransomware | CSIRT + direção + produção |
    | T4 | Simulação de phishing + revisão de procedimentos com base em lições aprendidas | Todos os colaboradores + CSIRT |

    *A prioridade no primeiro ano é estabelecer o mínimo viável: as pessoas sabem a quem ligar, a equipa sabe o que fazer, e existem ferramentas básicas de deteção. Nos anos seguintes, o programa amadurece com mais exercícios, ferramentas e integração OT.*

---

## 10. Armadilhas e confusões a evitar

!!! danger "Confusão 1: A preparação é uma tarefa que se faz uma vez"
    **Errado.** A preparação é um processo **contínuo**. Ameaças evoluem, infraestruturas mudam, pessoas entram e saem. Uma política de IR escrita há 3 anos e nunca revista é quase tão inútil como não ter política nenhuma. Revisão mínima: anual ou após cada incidente significativo.

!!! danger "Confusão 2: Basta ter ferramentas (SIEM, IDS, EDR) para estar preparado"
    **Errado.** Ferramentas sem pessoas treinadas e procedimentos definidos geram **milhares de alertas ignorados**. Um SIEM mal configurado ou sem analistas para interpretar os alertas cria uma falsa sensação de segurança. As ferramentas são um dos seis componentes — não o único.

!!! danger "Confusão 3: A equipa CSIRT só precisa de competências técnicas"
    **Errado.** A equipa também precisa de competências de **comunicação, gestão de crise e conhecimentos legais**. Um analista brilhante que não sabe documentar evidências para o jurídico ou comunicar com a administração é um analista incompleto.

!!! danger "Confusão 4: Os utilizadores comuns não têm papel na resposta a incidentes"
    **Errado.** Os utilizadores são frequentemente os **primeiros a detetar** sinais de incidente (email suspeito, comportamento estranho, acesso não autorizado). Sem sensibilização e sem saber a quem reportar, essas deteções são perdidas. A preparação inclui obrigatoriamente a formação dos utilizadores.

!!! danger "Confusão 5: A autoridade da equipa pode ser resolvida 'durante' o incidente"
    **Errado.** Num incidente ativo, cada minuto conta. Se a equipa precisar de pedir autorização para isolar um servidor comprometido enquanto o atacante se move lateralmente na rede, o dano aumenta exponencialmente. A autoridade deve estar **pré-aprovada** pela gestão na política de IR.

!!! danger "Confusão 6: Backups na rede interna são suficientes"
    **Errado.** Ransomware moderno procura e cifra sistematicamente os backups acessíveis na rede. Uma organização com backups apenas na rede interna pode perder **tudo** — dados e backups — num único ataque. São obrigatórios backups offline, imutáveis ou em localização separada (air-gapped).

---

## 11. Resumo rápido

| Componente | O que inclui | Questão-chave |
|------------|-------------|---------------|
| **Políticas** | Estratégia IR, papéis, autoridade, ativos priorizados | "A equipa tem mandato e autoridade para agir?" |
| **CSIRT** | Composição, papéis, ferramentas, canais de comunicação | "Quem faz o quê quando o incidente acontece?" |
| **Procedimentos** | Reporte, escalação, resposta, backups, call list | "Todos sabem como reportar e a quem escalar?" |
| **Ferramentas** | SIEM, IDS, EDR, logs, NTP, baselines, scanning | "Conseguimos detetar e investigar um incidente?" |
| **Treino** | CSIRT, pessoal técnico, utilizadores | "As pessoas sabem usar os procedimentos e ferramentas?" |
| **Reporte** | Template de reporte, 5 perguntas do utilizador | "Os utilizadores sabem o que fazer e a quem ligar?" |

### Frases-chave para recordar

- "Preparar durante o incidente é **demasiado tarde** — a preparação acontece antes"
- "Ferramentas sem pessoas treinadas geram **alertas ignorados**, não segurança"
- "A autoridade da equipa CSIRT deve ser **pré-aprovada** — não negociada durante a crise"
- "Os utilizadores são os **primeiros sensores** — precisam de saber reportar"
- "Backups na rede interna são **zero proteção** contra ransomware"
- "Um relógio dessincronizado destrói a **correlação de eventos** entre sistemas"

---

## 📎 Documentos e templates operacionais

Toda esta fase de **Preparação** só produz valor se resultar em artefactos concretos que possam ser usados durante o incidente. Os templates que se seguem foram preparados em formato `.docx` editável, com placeholder `[Nome da organização]` — os alunos devem substituir pelo nome da sua organização para os adaptar e usar internamente.

### Políticas e procedimentos

| Documento | Propósito | Ficheiro |
|-----------|-----------|----------|
| **Política de Gestão de Incidentes** | Estabelece mandato, âmbito, princípios e responsabilidades. Base para auditoria ISO 27001 A.5.24-A.5.28 e NIS2. | [📄 politica-gestao-incidentes.docx](../gestao_incidentes/politica-gestao-incidentes.docx) |
| **Classificação e Severidade de Incidentes** | Matriz P1-P5, categorias, critérios de triagem, SLAs por severidade. | [📄 procedimento-classificacao-severidade.docx](../gestao_incidentes/procedimento-classificacao-severidade.docx) |
| **Escalonamento e Matriz RACI do CSIRT** | Cadeia de comando, matriz RACI, contactos internos e externos (CNCS, CNPD, PJ). | [📄 procedimento-escalonamento-raci.docx](../gestao_incidentes/procedimento-escalonamento-raci.docx) |
| **Plano de Resposta a Incidentes (NIS2)** | Plano base alinhado com DL 125/2025 (NIS2 PT). | [📄 plano-resposta-incidentes-nis2.docx](../gestao_incidentes/plano-resposta-incidentes-nis2.docx) |

### Playbooks por tipo de incidente

| Playbook | Cobertura | Ficheiro |
|----------|-----------|----------|
| **Ransomware** | Contenção, preservação, decisão de pagamento, recuperação, notificações. Alinhado com CISA StopRansomware e MITRE ATT&CK. | [📄 playbook-ransomware.docx](../gestao_incidentes/playbook-ransomware.docx) |
| **Phishing / Comprometimento de Credenciais** | Contenção (reset, revoke sessions/tokens), investigação, erradicação, prevenção. | [📄 playbook-phishing.docx](../gestao_incidentes/playbook-phishing.docx) |
| **Violação de Dados Pessoais** | Qualificação, avaliação de risco (EDPB WP250), notificação CNPD (art. 33.º), comunicação aos titulares (art. 34.º). | [📄 playbook-violacao-dados-pessoais.docx](../gestao_incidentes/playbook-violacao-dados-pessoais.docx) |

### Comunicação e documentação

| Documento | Propósito | Ficheiro |
|-----------|-----------|----------|
| **Plano de Comunicação de Crise** | Matriz audiências × canais × porta-vozes; mensagens-tipo; war room. | [📄 plano-comunicacao-crise.docx](../gestao_incidentes/plano-comunicacao-crise.docx) |
| **Relatório Pós-Incidente (PIR)** | Template estruturado: cronologia, ATT&CK, root cause, lições aprendidas, ações corretivas. | [📄 relatorio-pos-incidente-pir.docx](../gestao_incidentes/relatorio-pos-incidente-pir.docx) |

### Notificações regulatórias NIS2

| Documento | Prazo | Ficheiro |
|-----------|-------|----------|
| **Notificação inicial CNCS (24h)** | 24h após conhecimento — DL 125/2025 art. 42.º | [📄 notificacao-24h-nis2.docx](../gestao_incidentes/notificacao-24h-nis2.docx) |
| **Notificação intermédia CNCS (72h)** | 72h após conhecimento — art. 42.º n.º 3 | [📄 notificacao-72h-nis2.docx](../gestao_incidentes/notificacao-72h-nis2.docx) |
| **Relatório final CNCS (30 dias)** | 30 dias úteis após fim de impacto — art. 44.º | [📄 notificacao-30d-nis2.docx](../gestao_incidentes/notificacao-30d-nis2.docx) |
| **Notificação a destinatários/utilizadores** | Conforme art. 48.º | [📄 notificacao-incidente-destinatarios-nis2.docx](../gestao_incidentes/notificacao-incidente-destinatarios-nis2.docx) |
| **Registo de incidentes** | Registo interno obrigatório (art. 33.º n.º 5 RGPD + NIS2) | [📊 registo-incidentes-nis2.xlsx](../gestao_incidentes/registo-incidentes-nis2.xlsx) |

!!! tip "Como usar estes templates"
    1. Descarregar o ficheiro `.docx` ou `.xlsx` relevante.
    2. Substituir todos os placeholders `[Nome da organização]`, `[Autor]`, `[email]`, etc. pelos valores reais.
    3. Adaptar conteúdo específico ao contexto (setor, dimensão, jurisdição).
    4. Submeter a aprovação formal (Direção) antes da publicação interna.
    5. Rever anualmente ou após incidente significativo.

!!! warning "Aviso"
    Estes templates são **pontos de partida pedagógicos**, não substitutos de análise jurídica qualificada. Para implementação em organização real, validar com DPO, Jurídico e, quando aplicável, consultor regulatório setorial.

---

**Próximos passos:** Explore [Deteção, Contenção e Investigação](detecao-contencao.md) para perceber como identificar incidentes reais, conter a ameaça e investigar a causa raiz.
