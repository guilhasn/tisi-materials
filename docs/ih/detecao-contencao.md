# Deteção, Contenção e Investigação

## Índice

1. [Visão geral](#1-visao-geral)
2. [Deteção e Identificação](#2-detecao-e-identificacao)
3. [Indicadores de comprometimento (IoCs)](#3-indicadores-de-comprometimento-iocs)
4. [Preservação de evidências](#4-preservacao-de-evidencias)
5. [Contenção](#5-contencao)
6. [Decisão crítica: continuar ou suspender operações](#6-decisao-critica-continuar-ou-suspender-operacoes)
7. [Investigação e o ponto de separação forense](#7-investigacao-e-o-ponto-de-separacao-forense)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)

---

## 1. Visão geral

As fases de **Deteção**, **Contenção** e **Investigação** constituem o núcleo operacional do processo de Incident Handling. Enquanto a preparação ocorre antes do incidente e a erradicação/recuperação ocorre depois, estas três fases acontecem **durante o incidente** — quando a pressão é máxima e as decisões têm consequências imediatas.

> Detetar rapidamente, conter sem destruir evidências e investigar com método são as três competências que separam uma resposta eficaz de uma resposta caótica.

```
  ╔════════════════════════════════════════════════════════════════════╗
  ║           FASES CENTRAIS DO INCIDENT HANDLING                     ║
  ╠════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║   ┌────────────┐    ┌────────────┐    ┌────────────────┐          ║
  ║   │  DETEÇÃO   │───►│ CONTENÇÃO  │───►│ INVESTIGAÇÃO   │          ║
  ║   │            │    │            │    │                │          ║
  ║   │ Monitorizar│    │ Limitar    │    │ Determinar     │          ║
  ║   │ Identificar│    │ danos      │    │ magnitude      │          ║
  ║   │ Confirmar  │    │ Preservar  │    │ e âmbito       │          ║
  ║   │ Notificar  │    │ evidências │    │                │          ║
  ║   └────────────┘    └────────────┘    └────────────────┘          ║
  ║         │                 │                   │                    ║
  ║         ▼                 ▼                   ▼                    ║
  ║   "É real?"         "Até onde?"         "O quê, quem,             ║
  ║                                          quando, como?"           ║
  ╚════════════════════════════════════════════════════════════════════╝
```

Estas fases não são estritamente sequenciais. Na prática, sobrepõem-se: pode ser necessário voltar à deteção enquanto se contém, ou iniciar contenção antes de concluir a identificação completa.

| Fase | Pergunta central | Resultado esperado |
|------|------------------|--------------------|
| **Deteção** | Está a acontecer algo anómalo? É um incidente real? | Confirmação e classificação inicial |
| **Contenção** | Como limitar o impacto sem destruir provas? | Sistema isolado e evidências preservadas |
| **Investigação** | Qual a extensão, origem e método do ataque? | Relatório de âmbito e dados para decisão |

---

## 2. Deteção e Identificação

A deteção é o momento em que se percebe que **algo não está normal**. Pode vir de fontes automáticas (alertas de IDS, SIEM) ou manuais (utilizador reporta comportamento estranho, administrador nota anomalia nos logs).

### Monitorização de eventos atípicos

A primeira linha de deteção passa por monitorizar continuamente o ambiente e reconhecer **padrões anómalos**:

```
  ┌─────────────────────────────────────────────────────────────┐
  │              FONTES DE DETEÇÃO                               │
  │                                                              │
  │   ┌──────────────────┐    ┌──────────────────┐              │
  │   │  AUTOMÁTICAS     │    │  MANUAIS         │              │
  │   │                  │    │                  │              │
  │   │  • IDS/IPS       │    │  • Utilizador    │              │
  │   │  • SIEM          │    │    reporta erro  │              │
  │   │  • Antivírus     │    │  • Admin nota    │              │
  │   │  • Firewall logs │    │    anomalia      │              │
  │   │  • NetFlow        │    │  • Notificação  │              │
  │   │  • EDR           │    │    externa       │              │
  │   └────────┬─────────┘    └────────┬─────────┘              │
  │            │                       │                         │
  │            └───────────┬───────────┘                         │
  │                        ▼                                     │
  │              ┌──────────────────┐                            │
  │              │  TRIAGEM INICIAL │                            │
  │              │  Falso positivo? │                            │
  │              │  Incidente real? │                            │
  │              └──────────────────┘                            │
  └─────────────────────────────────────────────────────────────┘
```

### Sinais a monitorizar

| Categoria | Exemplos concretos |
|-----------|-------------------|
| **Mensagens de erro** | Erros repetidos em serviços críticos, falhas de autenticação em massa |
| **Desempenho** | Degradação inexplicável, lentidão em serviços que funcionavam normalmente |
| **Recursos** | Utilização anómala de CPU, memória ou armazenamento sem causa conhecida |
| **Logs de sistema** | Entradas suspeitas em logs de sistema e rede, registos de contabilização |
| **Autenticação** | Tentativas falhadas excessivas (>3), contas novas não autorizadas |
| **Ficheiros** | Nomes de ficheiros desconhecidos, alterações em datas/nomes de executáveis do sistema |
| **Rede** | Alertas de IDS, tráfego para destinos incomuns, flood de e-mail |
| **Externas** | Notificações de CERTs, parceiros, fornecedores ou clientes |

!!! warning "Cuidado com os falsos positivos"
    Nem todo o alerta é um incidente real. A triagem inicial é fundamental para evitar desperdício de recursos. No entanto, é preferível investigar um falso positivo do que ignorar um incidente verdadeiro.

### Confirmação e ações imediatas

Quando se confirma que estamos perante um **incidente real**, há um conjunto de ações obrigatórias:

1. **Registar** — Iniciar o preenchimento do formulário de registo padrão (data/hora, localização, máquina/sistema/rede, atividade observada)
2. **Capturar** — Recolher logs de rede, firewall e aplicações antes que sejam sobrescritos
3. **Classificar** — Determinar o tipo de problema e estimar a sua magnitude
4. **Notificar** — Informar a gestão e as pessoas certas usando a lista e a árvore de contactos
5. **Proteger comunicações** — Aplicar a política de **"Need to Know"** e usar comunicação segura fora-de-banda

!!! danger "Comunicação fora-de-banda"
    Se o atacante comprometeu a rede interna, as comunicações por e-mail ou chat corporativo podem estar a ser monitorizadas. Usar canais **fora-de-banda** (telefone pessoal, reunião presencial) é essencial para não alertar o adversário.

---

## 3. Indicadores de comprometimento (IoCs)

Os **Indicadores de Comprometimento** (IoCs) são artefactos observáveis que sugerem que um sistema foi comprometido. Reconhecê-los rapidamente é a chave para reduzir o tempo de deteção.

### Lista de IoCs comuns

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║            INDICADORES DE COMPROMETIMENTO (IoCs)              ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  REDE                        │  HOST                          ║
  ║  ─────                       │  ────                          ║
  ║  • Tráfego para IPs/domínios │  • Processos desconhecidos     ║
  ║    maliciosos conhecidos     │  • Ficheiros novos em dirs     ║
  ║  • Picos de tráfego DNS      │    de sistema                  ║
  ║  • Conexões a portas         │  • Alterações em executáveis   ║
  ║    incomuns                  │    do sistema (datas/nomes)    ║
  ║  • Transferências de dados   │  • Contas de utilizador        ║
  ║    volumosas e inesperadas   │    criadas sem autorização     ║
  ║  • E-mail flood              │  • Serviços novos ou           ║
  ║                              │    modificados                 ║
  ║  ─────────────────────────────────────────────────────────── ║
  ║  AUTENTICAÇÃO                │  COMPORTAMENTO                 ║
  ║  ─────────────               │  ──────────────                ║
  ║  • Login falhado > 3 vezes   │  • Atividade fora do horário   ║
  ║  • Login de geolocalização   │    normal                      ║
  ║    impossível                │  • Acesso a dados fora do      ║
  ║  • Escalação de privilégios  │    perfil habitual             ║
  ║    não autorizada            │  • Desativação de antivírus    ║
  ║                              │    ou logging                  ║
  ╚═══════════════════════════════════════════════════════════════╝
```

**Para refletir:**

- Se um utilizador legítimo faz login às 3h da manhã, isso é automaticamente um IoC? Que contexto adicional seria necessário?
- Qual é a diferença entre um IoC isolado e um conjunto de IoCs correlacionados?
- Porque é que um único IoC raramente justifica uma resposta completa a incidente?

**Como interpretar:**

*Um IoC isolado é um sinal — vários IoCs correlacionados são um cenário. A correlação de indicadores através de ferramentas como SIEM é o que transforma alertas individuais em deteções acionáveis.*

---

## 4. Preservação de evidências

A preservação de evidências é uma das ações mais críticas e frequentemente mal executada. Sem evidências íntegras, não é possível investigar corretamente nem apresentar provas em tribunal.

### Cópia bit-stream e cadeia de custódia

!!! danger "Requisito primário"
    Todas as atividades de investigação devem ser realizadas **APÓS** a criação de uma cópia bit-stream completa do sistema comprometido. Nunca investigar diretamente no sistema original.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │           PROCESSO DE PRESERVAÇÃO DE EVIDÊNCIAS                  │
  │                                                                  │
  │   ┌───────────────────┐                                         │
  │   │ Sistema            │                                         │
  │   │ comprometido       │                                         │
  │   └─────────┬─────────┘                                         │
  │             │                                                    │
  │             ▼                                                    │
  │   ┌───────────────────┐    ┌───────────────────┐                │
  │   │ Backup completo    │───►│ Cópia bit-stream  │                │
  │   │ assim que          │    │ (imagem forense)  │                │
  │   │ confirmado         │    │                   │                │
  │   └───────────────────┘    └─────────┬─────────┘                │
  │                                      │                           │
  │                            ┌─────────┴─────────┐                │
  │                            ▼                   ▼                 │
  │                   ┌──────────────┐    ┌──────────────┐          │
  │                   │ Cópia de     │    │ Original     │          │
  │                   │ trabalho     │    │ selado e     │          │
  │                   │ (investigar  │    │ guardado     │          │
  │                   │  aqui)       │    │ (evidência)  │          │
  │                   └──────────────┘    └──────────────┘          │
  └─────────────────────────────────────────────────────────────────┘
```

### Elementos a preservar

| Tipo de evidência | Descrição | Volatilidade |
|-------------------|-----------|-------------|
| **Memória RAM** | Processos ativos, chaves de cifra, conexões de rede | Muito alta |
| **Cópia bit-stream** | Imagem forense completa do disco | Baixa |
| **Armazenamento externo** | USB, discos externos, média amovível | Baixa |
| **Logs de rede** | Registos de firewall, proxy, DNS, NetFlow | Média |
| **Logs de sistema** | Event logs, syslog, logs de aplicações | Média |
| **Logs de aplicação** | Registos de bases de dados, servidores web, e-mail | Média |

!!! info "Ordem de volatilidade — RFC 3227"
    A recolha deve seguir a ordem formalizada pela **RFC 3227 — *Guidelines for Evidence Collection and Archiving***: (1) registos e conteúdo da cache, (2) tabela de rotas, cache ARP, tabela de processos, kernel statistics, memória RAM, (3) sistemas de ficheiros temporários, (4) disco, (5) logs remotos, (6) configuração física e topologia de rede, (7) meios de arquivo. Dados voláteis perdem-se quando o sistema é desligado.

### Stack forense de referência — ferramentas

Catálogo de ferramentas que uma equipa de IR moderna deve conhecer e ter disponível. Todas são *open source* ou têm versão *community*. Referência durante o exercício 3.4 desta UC.

#### Aquisição (memória e disco)

| Fase | Ferramenta | Propósito |
|------|------------|-----------|
| Memória — live | **WinPMEM** / **LiME** (Linux) | Dump RAM em formato raw ou AFF4 |
| Memória — live | **DumpIt** (Comae) | Dump simples RAM Windows |
| Disco — dead-box | **FTK Imager** (AccessData) | Imagem forense E01/RAW, com write-blocker lógico |
| Disco — dead-box | **dcfldd** / **dc3dd** | Sucessor do `dd`, com hashing integrado |
| Disco — live triage | **KAPE** (Kroll Artifact Parser and Extractor) | Colecta rápida de artefactos chave sem imagem completa |
| Disco — live triage | **Velociraptor** | Colecta remota em escala, hunting + DFIR |
| Cloud | **AWS Incident Manager**, **Azure Disk Copy**, **GCP Cloud Forensics** | Snapshots forenses em IaaS |

!!! warning "Write-blockers físicos"
    Para meios removíveis e discos retirados de máquinas comprometidas, usar **write-blockers físicos** (Tableau, CRU Forensic UltraDock, WiebeTech USB WriteBlocker). O write-blocker lógico do FTK Imager é complemento, não substituto.

#### Análise forense

| Domínio | Ferramenta | Propósito |
|---------|------------|-----------|
| Memória | **Volatility 3** | Plugins canónicos: `pslist`, `psscan`, `netscan`, `malfind`, `cmdline`, `dumpfiles`, `handles`, `svcscan` |
| Memória | **Rekall** (legado, mantido parcialmente) | Alternativa histórica ao Volatility |
| Timeline forense | **Plaso / log2timeline** | Timeline consolidada de artefactos (MFT, USN, Prefetch, EVT, SRUM) |
| Timeline forense | **Timesketch** | Interface web para análise de timelines geradas pelo Plaso |
| Disco e artefactos Windows | **Autopsy** (GUI) / **The Sleuth Kit (TSK)** (CLI) | Análise de file systems, carving, artefactos Windows |
| Disco e artefactos Windows | **Magnet AXIOM** (comercial), **X-Ways Forensics** (comercial) | Referência comercial; forte em *carving* e artefactos mobile |
| Artefactos Windows — triage | **RegRipper**, **MFTECmd**, **PECmd**, **AmcacheParser**, **EvtxECmd** (suite Eric Zimmerman) | Parsers individuais para registry, MFT, prefetch, amcache, EVTX |
| Network forensics | **Wireshark**, **tshark**, **Zeek** (ex-Bro) | Análise de PCAPs, metadados de rede, detecção por protocolo |
| Network forensics | **NetworkMiner** | Extracção de ficheiros e credenciais de PCAPs |
| Malware triage | **PE-sieve**, **PEStudio** | Análise de binários Windows suspeitos |
| Malware sandbox | **CAPEv2** (self-hosted), **Any.run**, **Joe Sandbox**, **VirusTotal Intelligence** | Detonação em ambiente isolado; análise dinâmica |
| YARA rules | **YARA**, **Loki**, **THOR Lite** | Detecção baseada em padrões em ficheiros/memória |

#### Plataformas de gestão de incidentes

| Ferramenta | Propósito |
|------------|-----------|
| **TheHive** + **Cortex** | Case management + automation de analyzers |
| **MISP** | Threat intelligence sharing (STIX/TAXII compatível) |
| **IRIS** (DFIR-IRIS) | Case management alternativo, open source |
| **OpenCTI** | Plataforma CTI com relacionamentos ATT&CK nativos |

#### Orientação legal — Portugal

- **Lei do Cibercrime (Lei 109/2009)**, art. 15.º e seguintes — pesquisa de dados informáticos, apreensão.
- **CNCS/CERT.PT** — ponto de contacto nacional para cooperação.
- **Perito judicial** inscrito em lista de peritos do tribunal se o caso vier a seguir via judicial.

### Formulário de registo padrão

Toda a recolha de evidências deve ser acompanhada de registo rigoroso:

| Campo | Exemplo |
|-------|---------|
| **Data/Hora** | 2025-03-15 14:32 UTC |
| **Localização** | Sala de servidores B, rack 3 |
| **Máquina/Sistema** | srv-web-03 (192.168.1.53) |
| **Rede** | VLAN 10 — DMZ |
| **Atividade observada** | Tráfego HTTP para IP externo suspeito, processo desconhecido em execução |
| **Responsável pela recolha** | Ana Silva, analista SOC |
| **Hash da evidência** | SHA-256: a3f2... (imagem forense) |

---

## 5. Contenção

A **contenção** visa **limitar o impacto** do incidente, impedindo que se propague a outros sistemas ou que cause mais danos. É uma corrida contra o tempo, mas que deve ser executada com método.

### Contenção de curto prazo vs longo prazo

O modelo SANS distingue dois tipos de contenção:

```
  ╔═══════════════════════════════════════════════════════════════════╗
  ║              CONTENÇÃO: CURTO PRAZO vs LONGO PRAZO                ║
  ╠═══════════════════════════════════════════════════════════════════╣
  ║                                                                   ║
  ║  CURTO PRAZO (imediata)          │  LONGO PRAZO (sustentada)      ║
  ║  ───────────────────────         │  ────────────────────────      ║
  ║                                  │                                ║
  ║  Objetivo: parar a hemorragia    │  Objetivo: estabilizar para    ║
  ║                                  │  permitir operações            ║
  ║  • Isolar segmento de rede       │                                ║
  ║  • Bloquear IP no firewall       │  • Reconstruir sistema com     ║
  ║  • Desativar conta comprometida  │    patches aplicados           ║
  ║  • Redirecionar tráfego DNS      │  • Reforçar regras de firewall ║
  ║                                  │  • Alterar credenciais         ║
  ║  Duração: minutos a horas        │  • Rever permissões            ║
  ║                                  │                                ║
  ║                                  │  Duração: horas a dias         ║
  ╚═══════════════════════════════════════════════════════════════════╝
```

### Ações de contenção

| Ação | Descrição | Risco associado |
|------|-----------|-----------------|
| **Desligar o sistema** | Pára o incidente imediatamente | Perda de dados voláteis (memória RAM) |
| **Isolar da rede** | Impede propagação lateral | Interrupção de serviço |
| **Desativar funções** | Suspende serviços ou funcionalidades específicas | Impacto parcial no negócio |
| **Remover acesso** | Bloqueia contas de utilizador ou login | Pode alertar o atacante |
| **Continuar a monitorizar** | Permite recolher mais evidências | Risco de danos adicionais |

### Verificação de sistemas associados

!!! warning "Movimento lateral"
    Após conter o sistema comprometido, é essencial verificar **sistemas associados** — aqueles que partilham serviços de rede, relações de confiança (trusts), credenciais partilhadas ou segmentos de rede com o sistema afetado.

**Passos de verificação:**

1. Identificar todos os sistemas com relações de confiança com o sistema comprometido
2. Verificar logs desses sistemas no período do incidente
3. Procurar IoCs semelhantes nos sistemas associados
4. Monitorizar tráfego entre o sistema comprometido e os sistemas associados

### Proteção de evidências físicas

Para além das evidências digitais, é necessário **proteger o ambiente físico**:

- Afastar pessoas não autorizadas do computador, switches e equipamento de armazenamento
- Proteger linhas telefónicas usadas pelo sistema comprometido
- Documentar fotograficamente o estado físico do equipamento
- Registar quem teve acesso e quando

---

## 6. Decisão crítica: continuar ou suspender operações

Uma das decisões mais difíceis durante um incidente é: **manter o sistema comprometido em operação ou desligá-lo?** Esta é fundamentalmente uma **decisão de gestão**, não apenas técnica.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │            ÁRVORE DE DECISÃO: CONTINUAR vs SUSPENDER             │
  │                                                                  │
  │                    ┌──────────────────┐                          │
  │                    │ Sistema          │                          │
  │                    │ comprometido     │                          │
  │                    └────────┬─────────┘                          │
  │                             │                                    │
  │                             ▼                                    │
  │               ┌──────────────────────────┐                      │
  │               │ Avaliar impacto nos      │                      │
  │               │ dados e informação       │                      │
  │               └────────────┬─────────────┘                      │
  │                            │                                     │
  │              ┌─────────────┴─────────────┐                      │
  │              ▼                           ▼                       │
  │   ┌──────────────────┐       ┌──────────────────┐              │
  │   │ CONTINUAR        │       │ SUSPENDER         │              │
  │   │                  │       │                  │              │
  │   │ • Recolher mais  │       │ • Impacto grave  │              │
  │   │   evidências     │       │ • Dados críticos │              │
  │   │ • Serviço é      │       │   em risco       │              │
  │   │   essencial      │       │ • Risco de       │              │
  │   │ • Impacto menor  │       │   propagação     │              │
  │   │ • Risco aceite   │       │ • Requisito      │              │
  │   │   pela gestão    │       │   legal          │              │
  │   └──────────────────┘       └──────────────────┘              │
  └─────────────────────────────────────────────────────────────────┘
```

### Fatores de decisão

| Fator | Favorece continuar | Favorece suspender |
|-------|--------------------|--------------------|
| **Tipo/severidade** | Incidente de baixo impacto | Incidente crítico com exfiltração ativa |
| **Requisito do sistema** | Sistema não crítico, redundante | Sistema essencial sem alternativa |
| **Imagem pública** | Pouca visibilidade externa | Alto risco reputacional |
| **Objetivos predefinidos** | Prioridade na recolha de evidências | Prioridade na proteção de dados |
| **Risco de downtime** | Alternativas disponíveis | Custo de inatividade elevado |

!!! tip "Decisão da gestão"
    Esta decisão deve envolver a **gestão de topo**. A equipa técnica fornece informação sobre riscos e opções; a gestão decide com base no contexto de negócio. Se aplicável, pode ser ativado o **site de disaster recovery**.

**Para refletir:**

- Num hospital, desligar um sistema comprometido pode afetar tratamentos em curso. Como equilibrar segurança e continuidade do serviço?
- Se o atacante perceber que foi detetado, pode destruir evidências. Em que cenários é melhor monitorizar silenciosamente?

---

## 7. Investigação e o ponto de separação forense

A **investigação** visa determinar a **magnitude e o âmbito** do incidente. É um processo sistemático de revisão de evidências que começa com questões simples e vai aprofundando.

### Questões fundamentais da investigação

```
  ╔══════════════════════════════════════════════════════════════════╗
  ║             QUESTÕES DA INVESTIGAÇÃO                             ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║   O QUÊ?  ► Que dados foram acedidos ou comprometidos?          ║
  ║   ONDE?   ► A atividade foi na rede, no host, ou em ambos?      ║
  ║   QUANDO? ► Em que período ocorreu? Que registos de log?        ║
  ║   COMO?   ► Qual o vetor de ataque? Que vulnerabilidade?        ║
  ║   QUEM?   ► Ameaça interna ou ataque externo?                   ║
  ║   QUANTO? ► Qual a extensão da infeção ou penetração?           ║
  ║                                                                  ║
  ╚══════════════════════════════════════════════════════════════════╝
```

### Fontes de evidência para investigação

A revisão sistemática de evidências deve incluir:

| Fonte | O que procurar |
|-------|---------------|
| **Cópia bit-stream** | Ficheiros alterados, malware, artefactos de ataque |
| **Armazenamento externo** | Dados exfiltrados, ferramentas do atacante |
| **Memória RAM** | Processos maliciosos, chaves, conexões ativas |
| **Logs de rede** | Padrões de tráfego, conexões a C2, exfiltração |
| **Logs de sistema** | Eventos de autenticação, alterações de configuração |
| **Logs de aplicação** | Acessos a dados, queries suspeitas, erros forçados |

### O ponto de separação (Break-Off Point)

Um conceito fundamental na investigação é o **Break-Off Point** — o momento em que os caminhos de resposta ao incidente se bifurcam:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │               BREAK-OFF POINT (Ponto de Separação)               │
  │                                                                  │
  │                   ┌────────────────────┐                         │
  │                   │ Investigação       │                         │
  │                   │ inicial concluída  │                         │
  │                   └─────────┬──────────┘                         │
  │                             │                                    │
  │              ┌──────────────┴──────────────┐                    │
  │              ▼                             ▼                     │
  │   ┌────────────────────┐       ┌────────────────────┐          │
  │   │ CAMINHO DE NEGÓCIO │       │ CAMINHO FORENSE    │          │
  │   │                    │       │                    │          │
  │   │ Retorno às         │       │ Investigação       │          │
  │   │ operações normais  │       │ forense detalhada  │          │
  │   │                    │       │                    │          │
  │   │ • Erradicar        │       │ • Preservar todas  │          │
  │   │ • Recuperar        │       │   as evidências    │          │
  │   │ • Restaurar        │       │ • Potencial        │          │
  │   │   serviços         │       │   envolvimento     │          │
  │   │                    │       │   de autoridades   │          │
  │   │ Prioridade:        │       │ • Preparação para  │          │
  │   │ continuidade       │       │   processo legal   │          │
  │   │                    │       │                    │          │
  │   │                    │       │ Prioridade:        │          │
  │   │                    │       │ evidências legais  │          │
  │   └────────────────────┘       └────────────────────┘          │
  └─────────────────────────────────────────────────────────────────┘
```

!!! info "Dois caminhos, duas prioridades"
    O **caminho de negócio** prioriza a recuperação rápida das operações. O **caminho forense** prioriza a preservação de evidências para eventual ação legal. A organização pode seguir ambos em paralelo, desde que a equipa de recuperação trabalhe sobre cópias e nunca sobre as evidências originais.

**Para refletir:**

- Se um ataque envolver dados pessoais de clientes, o RGPD pode obrigar à notificação da CNPD em 72 horas. Como é que isso influência a decisão no ponto de separação?
- Num cenário em que o atacante é um colaborador interno, que implicações legais adicionais existem para a investigação?

---

## 8. Exemplos práticos

### Exemplo 1: Deteção e contenção de ransomware

**Cenário:** Uma empresa de logística com 200 colaboradores deteta que vários ficheiros partilhados estão a ser cifrados sem autorização. O SIEM gera alertas sobre tráfego invulgar para um IP externo desconhecido.

**Cronologia da resposta:**

| Hora | Fase | Ação |
|------|------|------|
| 09:15 | **Deteção** | SIEM alerta para tráfego anómalo; utilizadores reportam ficheiros inacessíveis |
| 09:20 | **Identificação** | Analista SOC confirma: extensões .encrypted em ficheiros partilhados, processo desconhecido `svc_update.exe` em 3 máquinas |
| 09:25 | **Registo** | Preenchimento do formulário de incidente; recolha imediata de logs do SIEM, firewall e file server |
| 09:30 | **Notificação** | Ativação da árvore de contactos (fora-de-banda via telefone); informação ao CISO e ao CIO |
| 09:35 | **Contenção curto prazo** | Isolamento das 3 máquinas da rede; bloqueio do IP externo no firewall; desativação da conta utilizada pelo processo |
| 09:45 | **Preservação** | Captura de memória RAM das máquinas afetadas; início de cópia bit-stream |
| 10:00 | **Contenção longo prazo** | Verificação de todos os sistemas na mesma VLAN; alteração de passwords de contas de serviço; scan completo com IoCs conhecidos |
| 10:30 | **Investigação** | Análise do processo `svc_update.exe`; identificação do vetor de entrada (e-mail de phishing às 08:47); determinação de 12 máquinas afetadas no total |
| 11:00 | **Break-Off Point** | Decisão: seguir ambos os caminhos — recuperação a partir de backups e preservação de evidências para queixa às autoridades |

**Como interpretar:**

*Neste caso, a deteção automática (SIEM) foi complementada por deteção manual (utilizadores). A contenção de curto prazo foi executada em menos de 20 minutos após a confirmação, limitando a propagação. A decisão de seguir ambos os caminhos no Break-Off Point permitiu recuperar serviços enquanto se preservaram evidências para ação legal.*

---

### Exemplo 2: Acesso não autorizado com ameaça interna

**Cenário:** O departamento de auditoria de um banco deteta que um administrador de sistemas acedeu a registos de contas de clientes VIP fora do seu perfil de responsabilidades. Os acessos ocorreram durante 3 semanas, sempre entre as 22h e as 2h.

**Resposta:**

| Fase | Ação e decisão |
|------|----------------|
| **Deteção** | Sistema de DLP (Data Loss Prevention) alerta para acessos anómalos a dados de clientes VIP. Padrão: sempre fora do horário, sempre a mesma conta de admin |
| **Identificação** | Verificação confirma: acessos reais (não falso positivo), conta legítima mas comportamento fora do perfil; 47 registos de clientes acedidos |
| **Notificação** | CISO notificado diretamente (presencialmente); jurídico envolvido de imediato; comunicação estritamente em "Need to Know" |
| **Contenção** | Decisão de **não suspender** a conta imediatamente para recolher mais evidências; monitorização reforçada em modo silencioso; dados mais sensíveis movidos para storage isolado |
| **Investigação** | Análise de logs revela: dados copiados para USB externo; correlação com pesquisas no browser corporativo sobre empresas concorrentes |
| **Break-Off Point** | Caminho forense ativado: evidências preservadas para processo disciplinar e potencial ação criminal; autoridades informadas |

**Como interpretar:**

*Numa ameaça interna, a contenção é mais delicada — suspender a conta prematuramente alertaria o colaborador, que poderia destruir evidências. A decisão de monitorizar silenciosamente foi uma escolha estratégica que permitiu documentar toda a extensão do comprometimento antes de agir.*

---

## 9. Exercícios

### Exercício 1 — Triagem de alertas

Uma equipa SOC recebe os seguintes alertas nas últimas 2 horas:

| # | Alerta | Fonte |
|---|--------|-------|
| A | 15 tentativas de login falhadas na conta `admin` em 3 minutos | Servidor AD |
| B | Utilização de CPU a 95% no servidor web durante 10 minutos | Monitorização |
| C | Novo ficheiro `nc.exe` detetado em `C:\Windows\Temp\` do servidor de ficheiros | EDR |
| D | E-mail bounce-back em massa (500 mensagens) do servidor de e-mail | Servidor SMTP |
| E | Atualização automática do antivírus gerou falha temporária | Consola AV |

> Para cada alerta: classifique-o como provável falso positivo, evento a investigar, ou provável incidente. Justifique.

??? success "Solução 1"
    | Alerta | Classificação | Justificação |
    |--------|---------------|--------------|
    | **A** | **Provável incidente** | 15 tentativas em 3 minutos na conta `admin` é um padrão claro de brute-force. Requer investigação imediata e possível contenção (bloquear a conta, verificar origem dos pedidos) |
    | **B** | **Evento a investigar** | CPU a 95% pode ter causa legítima (pico de tráfego, processo de backup) ou maliciosa (cryptominer, ataque DDoS). Necessita correlação com outros indicadores |
    | **C** | **Provável incidente** | O `nc.exe` (netcat) é uma ferramenta de rede frequentemente usada por atacantes. A sua presença em `C:\Windows\Temp\` num servidor de ficheiros é altamente suspeita. Requer investigação urgente |
    | **D** | **Evento a investigar** | Bounce-back em massa pode indicar que o servidor foi usado para spam (comprometimento) ou simplesmente um problema de configuração/blacklist. Investigar a origem e o conteúdo dos e-mails |
    | **E** | **Falso positivo** | Falha temporária durante atualização automática é comportamento normal e esperado. Monitorizar apenas para confirmar que a atualização concluiu com sucesso |

---

### Exercício 2 — Decisão de contenção

Uma universidade deteta que o seu servidor de e-mail foi comprometido e está a ser usado para enviar phishing a outras instituições. O servidor também aloja as contas de e-mail de 5000 estudantes e 800 docentes que estão em período de avaliações.

> Que estratégia de contenção recomendaria? Considere: contenção de curto prazo, de longo prazo, e o impacto no serviço.

??? success "Solução 2"
    **Contenção de curto prazo (imediata):**

    - Bloquear o tráfego SMTP de saída no firewall (impede o envio de phishing) mantendo o tráfego de entrada (os utilizadores continuam a receber e-mail)
    - Identificar e desativar a conta ou processo usado para o envio de phishing
    - Comunicar às instituições afetadas que os e-mails de phishing não são legítimos

    **Contenção de longo prazo:**

    - Preservar evidências: captura de memória e cópia bit-stream do servidor
    - Reconstruir o serviço de e-mail num servidor limpo com patches atualizados
    - Migrar as contas de utilizador para o servidor limpo
    - Implementar regras de rate-limiting para envio de e-mail
    - Forçar a alteração de passwords de todas as contas

    **Justificação da abordagem:**

    - Não se desliga completamente o servidor porque 5800 utilizadores em período de avaliações dependem do serviço
    - A contenção de curto prazo (bloquear SMTP de saída) resolve o problema imediato (phishing) sem eliminar o serviço por completo
    - A contenção de longo prazo garante que o ambiente é reconstruído de forma segura sem pressão excessiva de tempo

---

### Exercício 3 — Ponto de separação forense

Uma empresa de comércio online descobre que um atacante acedeu à base de dados de clientes durante 2 semanas. Foram potencialmente comprometidos dados de 50 000 clientes, incluindo nomes, moradas e os últimos 4 dígitos dos cartões de crédito. A empresa opera em Portugal e processa pagamentos com cartão.

> Análise o cenário e determine: (a) que caminho(s) seguir no Break-Off Point; (b) que obrigações legais existem; (c) que ações específicas de investigação são necessárias.

??? success "Solução 3"
    **(a) Caminhos no Break-Off Point:**

    Devem ser seguidos **ambos os caminhos em paralelo**:

    - **Caminho de negócio:** restaurar a base de dados a partir de backup limpo, corrigir a vulnerabilidade explorada, restabelecer o serviço de comércio online
    - **Caminho forense:** preservar todas as evidências (cópia bit-stream, logs de rede e aplicação, dumps de memória) para investigação detalhada e potencial processo criminal

    **(b) Obrigações legais:**

    - **RGPD (Art. 33):** notificação à CNPD em até **72 horas** após tomar conhecimento da violação de dados pessoais
    - **RGPD (Art. 34):** comunicação aos titulares dos dados (50 000 clientes) se existir risco elevado para os seus direitos e liberdades
    - **PCI-DSS:** notificação ao adquirente de pagamentos e potencialmente às bandeiras de cartão (Visa, Mastercard), mesmo sendo apenas os últimos 4 dígitos
    - **Lei do Cibercrime (Lei 109/2009):** apresentação de queixa se houver intenção de prosseguir criminalmente

    **(c) Ações de investigação:**

    - Determinar o vetor de entrada (SQL injection? credenciais comprometidas? vulnerabilidade na aplicação web?)
    - Identificar exatamente que dados foram acedidos e se foram exfiltrados
    - Verificar se o atacante manteve alguma forma de persistência (backdoor, conta criada)
    - Analisar logs de rede para identificar destino da exfiltração
    - Correlacionar com threat intelligence para atribuição do ataque
    - Rever logs de acesso à BD para delimitar o período exato de comprometimento

---

## 10. Armadilhas e confusões a evitar

!!! danger "1. Investigar no sistema original"
    **Erro:** Analisar o sistema comprometido diretamente sem criar primeiro uma cópia bit-stream.
    **Consequência:** Alteração de timestamps, perda de dados voláteis e destruição de provas que seriam admissíveis em tribunal.
    **Correto:** Criar sempre a imagem forense primeiro. Toda a análise é feita sobre a cópia.

!!! danger "2. Comunicar pelo canal comprometido"
    **Erro:** Discutir o incidente por e-mail corporativo ou chat interno quando a rede pode estar comprometida.
    **Consequência:** O atacante toma conhecimento de que foi detetado e pode destruir evidências, instalar backdoors adicionais ou acelerar a exfiltração.
    **Correto:** Usar comunicação fora-de-banda (telefone pessoal, reunião presencial).

!!! warning "3. Conter antes de preservar"
    **Erro:** Desligar ou isolar o sistema antes de capturar evidências voláteis (memória RAM, conexões de rede ativas).
    **Consequência:** Perda irreversível de dados cruciais para a investigação.
    **Correto:** Capturar memória RAM e estado do sistema antes de proceder à contenção destrutiva.

!!! warning "4. Ignorar sistemas associados"
    **Erro:** Focar-se apenas no sistema diretamente comprometido e não verificar sistemas que partilham relações de confiança ou credenciais.
    **Consequência:** O atacante pode já ter feito movimento lateral e a contenção torna-se ineficaz.
    **Correto:** Verificar todos os sistemas com relações de confiança, serviços partilhados ou credenciais comuns.

!!! warning "5. Confundir contenção com erradicação"
    **Erro:** Pensar que isolar o sistema é o mesmo que resolver o problema. Remover o malware durante a contenção sem compreender o vetor de ataque.
    **Consequência:** A causa raiz não é tratada e o incidente repete-se. Evidências podem ser destruídas durante a remoção precipitada.
    **Correto:** A contenção limita o dano; a erradicação (fase seguinte) remove a causa. São passos distintos com objetivos diferentes.

!!! info "6. Não envolver a gestão na decisão de continuar/suspender"
    **Erro:** A equipa técnica decide sozinha desligar um sistema crítico sem consultar a gestão.
    **Consequência:** Impacto no negócio não antecipado, potenciais consequências contratuais ou regulatórias, falta de alinhamento organizacional.
    **Correto:** A equipa técnica avalia e recomenda; a gestão decide com base no contexto completo (técnico, negócio, legal, reputacional).

---

## 11. Resumo rápido

```
  ╔═══════════════════════════════════════════════════════════════════╗
  ║              RESUMO: DETEÇÃO, CONTENÇÃO E INVESTIGAÇÃO            ║
  ╠═══════════════════════════════════════════════════════════════════╣
  ║                                                                   ║
  ║  DETEÇÃO                                                          ║
  ║  ───────                                                          ║
  ║  • Monitorizar eventos atípicos (erros, desempenho, logs)        ║
  ║  • Avaliar IoCs: logins falhados, contas novas, ficheiros        ║
  ║    estranhos, alertas IDS, notificações externas                 ║
  ║  • Confirmar se é incidente real (triagem)                       ║
  ║  • Registar, capturar logs, classificar, notificar               ║
  ║  • Comunicar em "Need to Know" por canal fora-de-banda           ║
  ║                                                                   ║
  ║  CONTENÇÃO                                                        ║
  ║  ──────────                                                       ║
  ║  • Curto prazo: ações imediatas para parar a propagação          ║
  ║  • Longo prazo: estabilizar para permitir operações              ║
  ║  • Decisão crítica: continuar vs suspender (gestão decide)       ║
  ║  • Preservar evidências ANTES de conter destrutivamente          ║
  ║  • Verificar sistemas associados (movimento lateral)             ║
  ║  • Manter o proprietário do sistema informado                    ║
  ║                                                                   ║
  ║  INVESTIGAÇÃO                                                     ║
  ║  ─────────────                                                    ║
  ║  • Determinar magnitude e âmbito (O quê? Onde? Quando? Como?)    ║
  ║  • Revisão sistemática: bit-stream, RAM, logs, storage           ║
  ║  • Break-Off Point: negócio vs forense (podem ser paralelos)     ║
  ║  • Ameaça interna vs externa — abordagens diferentes             ║
  ║                                                                   ║
  ║  PRINCÍPIOS TRANSVERSAIS                                          ║
  ║  ────────────────────────                                         ║
  ║  • Nunca investigar no original — sempre na cópia                ║
  ║  • Registar todas as ações (formulário padrão)                   ║
  ║  • Ordem de volatilidade na recolha de evidências                ║
  ║  • Cadeia de custódia rigorosa                                   ║
  ║  • Envolver gestão nas decisões de impacto organizacional        ║
  ║                                                                   ║
  ╚═══════════════════════════════════════════════════════════════════╝
```

---

## 📎 Documentos operacionais relacionados

Esta fase opera sobre playbooks específicos ativados pela triagem. Catálogo completo em [Preparação — Documentos operacionais](preparacao.md#documentos-e-templates-operacionais).

- [📄 Procedimento de Classificação e Severidade](../gestao_incidentes/procedimento-classificacao-severidade.docx) — matriz P1-P5 e critérios de triagem invocados na secção 2 deste capítulo.
- [📄 Playbook — Ransomware](../gestao_incidentes/playbook-ransomware.docx) — contenção, preservação, decisão de pagamento.
- [📄 Playbook — Phishing / Comprometimento de Credenciais](../gestao_incidentes/playbook-phishing.docx) — reset, revoke, investigação de impacto.
- [📄 Playbook — Violação de Dados Pessoais](../gestao_incidentes/playbook-violacao-dados-pessoais.docx) — qualificação, avaliação de risco, notificação CNPD (72h).
- [📄 Notificação NIS2 — 24 horas](../gestao_incidentes/notificacao-24h-nis2.docx) — a acionar logo na fase de classificação se P1/P2.

---

Próximos passos: Explore [Erradicação, Recuperação e Follow-up](erradicacao-recuperacao.md) para compreender como eliminar a causa raiz, restaurar as operações normais e implementar lições aprendidas.
