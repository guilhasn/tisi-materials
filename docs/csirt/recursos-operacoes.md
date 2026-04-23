# Capítulo 4 — Recursos, Processos e Operações

## 4.1 Estrutura da Equipa e Papéis

### 4.1.1 Níveis L1 a L4

Modelo tipico de SOC/CSIRT moderno, com responsabilidades crescentes:

```
  ┌────────────────────────────────────────────────────────────────┐
  │   NÍVEIS DE UMA EQUIPA CSIRT                                   │
  │                                                                │
  │   L1 — Security Analyst                                        │
  │        Primeira resposta, triagem inicial, identificar         │
  │        ameaças, responder rapidamente, medidas de              │
  │        contenção. Linha da frente. Frequentemente 24/7.        │
  │            │                                                   │
  │            ▼                                                   │
  │   L2 — Senior Security Analyst                                 │
  │        Ameaças graves, investigação aprofundada, análise       │
  │        de sistemas afetados, planos de reparação,              │
  │        erradicação de ameaças.                                 │
  │            │                                                   │
  │            ▼                                                   │
  │   L3 — Security Manager / Threat Hunter                        │
  │        Vulnerabilidades proativas, ferramentas avançadas,      │
  │        forense digital, compliance, auditoria, melhoria        │
  │        contínua.                                               │
  │            │                                                   │
  │            ▼                                                   │
  │   L4 — CISO (Chief Information Security Officer)               │
  │        Estratégia e políticas, comunicação com administração,  │
  │        gestão de risco, orçamento, relações externas.          │
  └────────────────────────────────────────────────────────────────┘
```

| Nível | Papel | Responsabilidades principais |
|-------|-------|-------------------------------|
| **L1** | **Security Analyst** — linha da frente | Triagem inicial, aplicação de *runbooks*, escalonamento. 24/7. |
| **L2** | **Senior Security Analyst** | Investigação técnica aprofundada, aplicação de *playbooks*, decisão sobre contenção e erradicação. |
| **L3** | **Security Manager / Threat Hunter** | *Threat hunting*, ferramentas avançadas, desenho de detecções, forense digital, auditoria. |
| **L4** | **CISO** | Define política, supervisiona todas as operações, reporta à administração, gere *compliance*. |

### 4.1.2 Outros papéis essenciais

Em CSIRTs médios/grandes, para além da hierarquia L1-L4, existem papéis especializados:

| Papéis operacionais | Papéis de suporte |
|---------------------|-------------------|
| Hotline / Helpdesk | Legal / Paralegal Liaison |
| Incident Handlers | Law Enforcement Liaison |
| Vulnerability Handlers | Media Relations |
| Artefact Analysis (malware) | Technical Writers |
| Platform Specialists (Win/Linux/Cloud) | Network / System Administrators |
| Trainers | Auditors / Quality Assurance |
| Technology Watchers | Marketing / Awareness |
| CyberIntel Specialists | |
| SIEM / EDR Engineers | |
| Forensics Experts | |

### 4.1.3 Competências requeridas

**Técnicas essenciais:** familiaridade com OS, redes, cloud, endpoints; conhecimento de TTPs (ver [mapa ATT&CK](../comum/attack-mapping.md)); base forense.

**Não-técnicas (frequentemente subestimadas):**

- **Comunicação oral e escrita** — para reportes, briefings, notificações regulatórias;
- **Confiabilidade** (*trustworthiness*) — o CSIRT acede a dados sensíveis; *background check* é normal;
- Calma sob pressão; pensamento estruturado; trabalho em equipa.

### 4.1.4 Formação e certificações

Se a organização não consegue contratar *skills* prontas, tem de formar. Recursos comuns:

- **SEI CERT Division** — cursos oficiais em Incident Response;
- **SANS** — certificações **GIAC** (GCIH, GCFA, GNFA) amplamente reconhecidas;
- **ENISA** — training material público para CSIRTs europeus (grátis);
- **FIRST** — eventos anuais, *hands-on training*.

---

## 4.2 Processos e Procedimentos

### 4.2.1 SOPs (Standard Operating Procedures) essenciais

Toda a operação do CSIRT deve ser regida por SOPs formais. Principais:

- ✔ Aceitar e acompanhar relatórios de incidentes
- ✔ Responder à *hotline* / linha direta
- ✔ *Handling* de incidentes e vulnerabilidades
- ✔ Recolha, fixação e preservação de provas (cadeia de custódia, RFC 3227)
- ✔ Configuração de redes e sistemas CSIRT
- ✔ Monitorização e deteção de intrusões
- ✔ Backup e armazenamento de dados de incidente
- ✔ Processos de notificação (NIS2 24h/72h/30d; RGPD 72h)
- ✔ Formação e *mentoring*

### 4.2.2 Procedimentos por tipo de incidente

Para cada tipologia, o CSIRT deve ter um **playbook específico**. Mínimos típicos:

| Tipo de Incidente | Ações principais |
|-------------------|-------------------|
| **Malware** | Análise estática e dinâmica, contenção (isolamento), remoção, validação |
| **DDoS** | Mitigação (scrubbing, rate limiting), filtragem na borda, escalonamento para ISP/CDN |
| **Web Defacement** | Restauração do site, investigação do vetor (CMS, credenciais, vulnerabilidade), hardening |
| **Fraud** | Preservação de evidência, notificação legal (MP/PJ), coordenação com banco |
| **Data Breach** | Avaliação de risco (WP250), notificação CNPD 72h (RGPD art. 33.º), comunicação aos titulares (art. 34.º), forense |
| **Privacy** | Avaliação de impacto, remediação, coordenação com DPO |

Ver os [playbooks detalhados](../gestao_incidentes/playbook-ransomware.docx) em formato editável.

### 4.2.3 Ordem lógica de serviços

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │    PREVENÇÃO   ───►   DETEÇÃO   ───►   TRATAMENTO               │
  │                                                                 │
  │    Awareness         IDS/IPS          Coordenação               │
  │    Audits            Firewall         Triagem                   │
  │    Vuln Scans        SIEM             Contenção                 │
  │    Advisories        Sensores         Erradicação               │
  │    Formação          Helpdesk         Recuperação               │
  │                      Abuse box        Follow-up                 │
  └─────────────────────────────────────────────────────────────────┘
```

!!! tip "Handbook canónico"
    *Handbook for Computer Security Incident Response Teams (CSIRTs)* (SEI, Killcrece et al., 2003) é a referência mais completa para desenho de políticas e procedimentos. Descarregável gratuitamente em [resources.sei.cmu.edu](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305).

---

## 4.3 Ferramentas Tecnológicas

As ferramentas dividem-se em **dois grupos principais**.

### 4.3.1 Gestão de incidentes (ticketing, case management)

| Ferramenta | Categoria | Notas |
|-----------|-----------|-------|
| **RTIR** (Request Tracker for IR) | *Ticketing* clássico | Baseado em Perl, usado por muitos CSIRTs nacionais |
| **OTRS** | *Ticketing* | Módulos de IR |
| **GLPI** | *Service desk* | Uso comum em organizações públicas PT |
| **JIRA Service Management** | *Issue tracking* comercial | Boa integração com *devops* |
| **ServiceNow SecOps** | ITSM *enterprise* | Integração com CMDB |
| **TheHive** + **Cortex** | *Case management open source* | **Referência** em CSIRTs europeus |
| **DFIR-IRIS** | *Case management open source* | Alternativa focada em DFIR |

### 4.3.2 Análise e investigação (DFIR)

Por **área de análise**:

| Área de análise | Ferramentas típicas |
|-----------------|----------------------|
| **Host Analysis** | **Volatility** (memória), **Velociraptor** (endpoint), KAPE, Autopsy |
| **Log Analysis** | **Splunk**, **ELK Stack** (Elasticsearch + Logstash + Kibana), Graylog |
| **Traffic Analysis** | **Wireshark**, **Zeek** (ex-Bro), tshark, NetworkMiner |
| **Network Monitoring** | **Nagios**, **Zabbix**, PRTG |
| **Malware Analysis** | **Cuckoo Sandbox**, **REMnux**, CAPEv2, Any.run, YARA |

Stack forense detalhada em [Deteção, Contenção e Investigação](../ih/detecao-contencao.md#stack-forense-de-referencia).

### 4.3.3 Partilha de Threat Intelligence

| Ferramenta / Padrão | Propósito |
|---------------------|-----------|
| **MISP** | Plataforma aberta de partilha de IOCs e TTPs |
| **OpenCTI** | Plataforma CTI com integração ATT&CK nativa |
| **STIX 2.1** | *Structured Threat Information Expression* — formato de dados |
| **TAXII** | *Trusted Automated Exchange of Intelligence Information* — protocolo de transporte |

### 4.3.4 Exemplo prático: integração GLPI + TheHive + Cortex + MISP

```
  ┌──────────────────────────────────────────────────────────────┐
  │   STACK DE CASE MANAGEMENT + ENRIQUECIMENTO + CTI            │
  │                                                              │
  │   ┌────────────┐         ┌────────────┐                      │
  │   │   GLPI     │────────►│  TheHive   │                      │
  │   │            │ Ticket /│            │                      │
  │   │ Service    │ Asset    │ Case       │                      │
  │   │ Desk       │ sync    │ Management │                      │
  │   └────────────┘         └─────┬──────┘                      │
  │                                 │                            │
  │                                 │ Observables                │
  │                                 ▼                            │
  │                          ┌────────────┐                      │
  │                          │   Cortex   │                      │
  │                          │            │                      │
  │                          │  Analysis  │                      │
  │                          │  Engines   │                      │
  │                          └─────┬──────┘                      │
  │                                 │                            │
  │                                 │ IOCs / TTPs                │
  │                                 ▼                            │
  │                          ┌────────────┐                      │
  │                          │    MISP    │                      │
  │                          │            │                      │
  │                          │  Threat    │                      │
  │                          │  Sharing   │◄─── pares setoriais  │
  │                          └────────────┘                      │
  └──────────────────────────────────────────────────────────────┘
```

**Fluxo:** ticket em GLPI → enriquece caso em TheHive → Cortex corre *analyzers* (VirusTotal, MISP lookup, etc.) → IOCs confirmados são publicados no MISP → partilhados com pares setoriais (ISACs, CNCS, FIRST).

---

## 4.4 Fluxo de Resposta a Incidentes

### 4.4.1 Fluxo operacional (SOC moderno)

```
  ┌────────────────────────────────────────────────────────────────┐
  │   FLUXO OPERACIONAL                                            │
  │                                                                │
  │   ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌───────────┐  │
  │   │  Alertas │─►│  Triagem │─►│ Classificação│─►│Priorização│  │
  │   └──────────┘  └──────────┘  └──────────────┘  └─────┬─────┘  │
  │                                                       │        │
  │                                                       ▼        │
  │                                                ┌────────────┐  │
  │                                                │Escalonamen-│  │
  │                                                │    to      │  │
  │                                                └─────┬──────┘  │
  │                                                      │         │
  │                                                      ▼         │
  │                                              ┌───────────────┐ │
  │                                              │   Análise     │ │
  │                                              │ (L2/L3 DFIR)  │ │
  │                                              └───────┬───────┘ │
  │                                                      │         │
  │                                                      ▼         │
  │                                              ┌───────────────┐ │
  │                                              │  Resolução    │ │
  │                                              │  + Lessons    │ │
  │                                              └───────────────┘ │
  └────────────────────────────────────────────────────────────────┘
```

### 4.4.2 Fases do Incident Handling (NIST SP 800-61)

O NIST define **6 fases** que todo o CSIRT maduro executa ciclicamente:

| Fase | O que se faz | Resultado |
|------|--------------|-----------|
| **1. Preparação** | Playbooks, casos de uso, treino, ferramentas instaladas | Pronto para responder |
| **2. Deteção e Análise** | Identificar e confirmar; rejeitar falsos positivos | Incidente confirmado e classificado |
| **3. Contenção** | Limitar o impacto do incidente | Propagação interrompida |
| **4. Erradicação** | Remover a causa raiz | Ameaça eliminada |
| **5. Recuperação** | Restaurar sistemas afetados | Operação normal retomada |
| **6. Lições Aprendidas** | Reunião pós-incidente, PIR, melhoria | Playbooks e controlos actualizados |

> Complementar com o modelo SANS (6 passos: PICERL — Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned). Ver [Frameworks de IR](../ih/frameworks.md) para comparação.

### 4.4.3 Playbooks e casos de uso

Para cada tipo de incidente, o CSIRT deve ter:

- 📄 **Playbook documentado** com passos sequenciais;
- 🎯 **Casos de uso** para SIEM/SOAR (regras de detecção);
- 🛠️ **Runbooks operacionais** (comandos, scripts, queries);
- 📈 **Escalonamento** definido (quando e para quem);
- ⏱️ **SLAs de resposta** por severidade;
- 📧 **Notificação a stakeholders** definida.

### 4.4.4 Melhoria contínua

Cada incidente é **oportunidade de aprendizagem**. Práticas maduras:

- Reuniões pós-incidente em ≤ 2 semanas;
- Relatório pós-incidente (PIR) formal em ≤ 30 dias;
- Atualização de *playbooks* com base nas lições;
- Ajuste de casos de uso do SIEM/SOAR;
- Revisão de SLAs conforme histórico.

---

## 4.5 Disponibilidade 24/7 e Integração

### 4.5.1 Alcance 24/7 — o CSIRT tem de estar contactável

Os incidentes não ocorrem em horário laboral. Mecanismos mínimos:

| Canal | Uso |
|-------|-----|
| **Email dedicado** | `csirt@organização` — *mailing list* que chega a vários destinatários |
| **Telefone 24/7** | Número único com *on-call* rotativo |
| **SMS / mensageria** | Para casos urgentes fora de horário |
| **Registo WHOIS** (RT-Object) | IP-range da constituinte aponta para contactos CSIRT |
| **Website institucional** | Contactos e *responsible disclosure policy* |
| **Abuse mailbox** | `abuse@organização` conforme [RIPE](https://www.ripe.net/support/abuse), ARIN, etc. |

### 4.5.2 Estrutura de equipa por níveis

```
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   ┌────────────────────┐                                     │
  │   │   1.ª LINHA        │   Helpdesk, triagem, classificação  │
  │   │   (L1)             │   inicial                           │
  │   └──────────┬─────────┘                                     │
  │              │                                               │
  │              ▼                                               │
  │   ┌────────────────────┐                                     │
  │   │   2.ª LINHA        │   Especialistas: Network Forensics, │
  │   │   (L2/L3)          │   Malware Analysis, Threat Hunting  │
  │   └──────────┬─────────┘                                     │
  │              │                                               │
  │              ▼                                               │
  │   ┌────────────────────┐                                     │
  │   │   COORDENAÇÃO      │   Gestão, decisão estratégica,      │
  │   │   (L4 — CISO)      │   relações externas                 │
  │   └────────────────────┘                                     │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

### 4.5.3 Relações externas essenciais

Um CSIRT maduro mantém contactos **pré-estabelecidos e ativos** com:

- **ISPs** — para mitigação de DDoS, bloqueios de rotas, etc.;
- ***Vendors*** — suporte em incidentes com os seus produtos;
- **Law Enforcement** — PJ (UNC3T), Ministério Público, Europol;
- **Abuse Contacts** — RIPE, ARIN, APNIC (registros regionais);
- **CSIRTs Nacionais** — CNCS em Portugal, outros via Rede Nacional;
- **FIRST** (Forum of Incident Response and Security Teams) — comunidade global;
- **CERT-EU** — instituições europeias e partilha intra-UE.

!!! tip "Manter as relações ativas"
    Publicar contactos não basta. É preciso **interagir regularmente** com pares — conferências FIRST, exercícios conjuntos, reuniões periódicas da Rede Nacional de CSIRTs. Durante uma crise, a confiança construída ao longo de anos é o que permite cooperação imediata.

---

**Próximos passos:** [Casos Práticos, Exercícios e Resumo](casos-praticos.md)
