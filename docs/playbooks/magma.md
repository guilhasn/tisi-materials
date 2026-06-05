# Capítulo 5 — Framework MaGMa

> *Para **organizar Use Cases**, uma organização precisa de uma framework. As frameworks permitem **controlo** sobre os Use Cases e dão **visibilidade** sobre quão bem a organização se defende contra ameaças cibernéticas.*

## 5.1 Modelo de Use Cases MaGMa — 3 camadas

### Origem e propósito

O **MaGMa** (***Ma**nagement **G**ameplan for use cases by **M**aturity **a**ssessment*) foi desenvolvido pelo **ABN AMRO Bank** (Países Baixos) como framework interna de gestão de Use Cases de segurança. Foi publicado abertamente e adoptado por muitos SOCs europeus por **alinhar negócio, ameaças e tecnologia** numa única estrutura.

!!! info "Para que serve uma framework de Use Cases?"
    Sem framework, os Use Cases acumulam-se de forma ad-hoc. Ninguém sabe ao certo:

    - Quantos Use Cases tem o SOC? (200? 500? não sabemos)
    - Cobrem as ameaças relevantes? (e quais são as relevantes?)
    - Estão **operacionais** ou só **documentados**?
    - Cada um justifica-se pelo negócio?

    Uma framework como o MaGMa **responde a estas quatro perguntas** com método.

### As 3 camadas

O modelo MaGMa estrutura **cada Use Case** em três camadas, do estratégico ao operacional:

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   ┌──────────────────────┐                                     │
  │   │  1. BUSINESS LAYER   │   "Para que serve?"                 │
  │   │                      │                                     │
  │   │  Liga ao negócio,    │   Driver, valor, criticidade        │
  │   │  drivers, requisitos │   regulatória                       │
  │   └──────────┬───────────┘                                     │
  │              │                                                 │
  │              ▼                                                 │
  │   ┌──────────────────────┐                                     │
  │   │  2. THREAT LAYER     │   "Que perigos enfrenta?"           │
  │   │                      │                                     │
  │   │  Descreve a ameaça,  │   TTPs, atores, vetores,            │
  │   │  TTPs, atores        │   IOCs típicos                      │
  │   └──────────┬───────────┘                                     │
  │              │                                                 │
  │              ▼                                                 │
  │   ┌──────────────────────┐                                     │
  │   │  3. IMPLEMENTATION   │   "Como está construído?"           │
  │   │     LAYER            │                                     │
  │   │                      │   Regras SIEM, fontes de logs,      │
  │   │  Implementação real  │   ferramentas EDR/NIDS, playbook    │
  │   │                      │   de resposta                       │
  │   └──────────────────────┘                                     │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

#### Camada 1 — Business (Negócio)

> *Descreve **como o Use Case está ligado às necessidades do negócio**.*

**Exemplo:** *"Proteger dados de clientes bancários (driver de negócio + obrigação RGPD)"* → justifica o Use Case *"Detetar acesso não autorizado à base de dados de clientes"*.

**Sem camada de negócio:** o Use Case é um exercício técnico que ninguém vai patrocinar. **Com camada de negócio:** o Use Case tem mandato e prioridade.

#### Camada 2 — Threat (Ameaça)

> *Descreve **a ameaça a que o Use Case se destina**: TTPs, atores, vetores de ataque e IOCs.*

**Exemplo:** *"APT29 usa **spear-phishing com anexo PDF malicioso** para acesso inicial; depois faz **persistência via scheduled tasks** e **lateral movement com Cobalt Strike**."*

**Sem camada de ameaça:** detectamos "logins anómalos" mas não sabemos quem faz isso nem porquê. **Com camada de ameaça:** mapeamos para [ATT&CK](../comum/attack-mapping.md) e priorizamos.

#### Camada 3 — Implementation (Implementação)

> *Descreve a **implementação operacional** do Use Case na arquitetura de monitorização.*

**Exemplo:** *"Regra Splunk `index=auth EventCode=4624 src_ip!=10.0.0.0/8 | stats count by user, src_ip | where count > 5`. Fonte: logs do AD. Ferramenta: Splunk Enterprise Security. Playbook de resposta: PB-AUTH-001."*

Sem camada de implementação, o Use Case é teoria pura. **A implementação é a ponte entre teoria e operação.**

### Exemplo integrado: Lateral Movement

Para o mesmo Use Case, **as 3 camadas alinhadas**:

| Camada | Conteúdo |
|--------|----------|
| **Business** | Proteger dados internos críticos; **DORA** exige detecção de movimento lateral em sistemas de TI relevantes |
| **Threat** | ATT&CK **TA0008 — Lateral Movement** (T1021 SMB/Windows Admin Shares, T1021.001 RDP, T1075 Pass-the-Hash); usado por APT29, FIN7, Conti |
| **Implementation** | Detecção SIEM de conexões SMB internas anómalas (volume + horário fora do habitual); query `index=network sourcetype=zeek_smb` ; playbook PB-NET-005 |

### Analogia útil

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   Como uma casa…                                               │
  │                                                                │
  │   Business         = "Para que serve?"  → Habitação            │
  │   Threat           = "Que perigos?"     → Incêndio, roubo      │
  │   Implementation   = "Como construída?" → Alarmes, fechaduras  │
  │                                                                │
  │   Faz sentido investir num alarme contra incêndio (Impl.)      │
  │   se a casa enfrenta esse perigo (Threat),                     │
  │   e se proteger a casa importa (Business).                     │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

!!! abstract "Vantagem do modelo"
    O MaGMa **alinha negócio, ameaças e tecnologia**. Cada Use Case é avaliado simultaneamente por **valor de negócio**, **relevância das ameaças** e **viabilidade técnica**. Decisões de investimento (criar/manter/desativar) ficam fundamentadas.

---

## 5.2 Agrupamentos e Ferramenta MaGMa

Além das 3 camadas, o MaGMa propõe **3 níveis de agrupamento** (L1/L2/L3) para organizar o catálogo de Use Cases por **grau de abstracção**.

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   L1 — Estratégicos                                            │
  │        (Cyber Kill Chain, ameaças gerais)                      │
  │             │                                                  │
  │             ▼ refinados em                                     │
  │   L2 — Tácticos                                                │
  │        (Actores de ameaça específicos + TTPs)                  │
  │             │                                                  │
  │             ▼ implementados em                                 │
  │   L3 — Operacionais                                            │
  │        (Regras SIEM, queries, alertas concretos)               │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

### L1 — Use Cases Estratégicos

**Baseados na *Cyber Kill Chain*** (Lockheed Martin) e em ameaças gerais. Foco nas **fases do ataque**:

| Fase Kill Chain | Use Case L1 típico |
|------------------|---------------------|
| **Reconnaissance** | Detectar reconhecimento externo (port scanning, OSINT enumeration) |
| **Weaponization** | (Fora do alcance do defensor — acontece no atacante) |
| **Delivery** | Detectar entrega de payload via email, web, USB |
| **Exploitation** | Detectar exploração de vulnerabilidade conhecida |
| **Installation** | Detectar instalação/persistência de malware |
| **C2 (Command and Control)** | Detectar comunicação C2 (beaconing, DNS tunneling) |
| **Actions on Objectives** | Detectar exfiltração, destruição, fraude |

**Exemplo L1:** *"Detectar reconhecimento externo"* — coverage geral, sem especificar quem faz nem como.

### L2 — Use Cases Tácticos

Incluem **actores de ameaça específicos** e **TTPs conhecidos** (mapeados ao [ATT&CK](../comum/attack-mapping.md)). Foco em **grupos APT** e **famílias de malware**.

**Exemplo L2:** *"Detectar técnicas do APT29 (Cozy Bear)"*
— *spear-phishing* com anexos PDF maliciosos (T1566.001), uso de Cobalt Strike (S0154), exfiltração via DNS (T1048.003)

!!! info "APT29 — exemplo de actor para L2"
    APT29 (*Cozy Bear*) é um grupo de ameaça avançada persistente atribuído ao serviço de inteligência externo russo (SVR). Especializado em operações sofisticadas de ciberespionagem com foco em: organismos governamentais, instituições de investigação e grandes organizações. Caso famoso: **SolarWinds (2020)**.

### L3 — Use Cases Operacionais

**Implementação concreta** em tecnologia: regras SIEM, queries, alertas.

**Exemplo L3:** *"Detecção de DNS tunneling"*

```splunk
index=dns sourcetype=zeek_dns
| eval qlen=len(query)
| where qlen > 60
| stats count, dc(query) AS unique_queries by src_ip
| where count > 100 AND unique_queries > 50
```

Identifica queries DNS com payload anómalo (> 60 caracteres) e alta frequência — padrão típico de exfiltração via DNS.

### Exemplo integrado: dos 3 níveis

| Nível | Conteúdo |
|-------|----------|
| **L1** | *"Detectar exfiltração de dados"* — Kill Chain: *Actions on Objectives* |
| **L2** | *"Detectar exfiltração via DNS tunneling usada pelo APT29"* — ATT&CK T1048.003 |
| **L3** | *Splunk query* concreta acima, com thresholds calibrados ao ambiente |

### Ferramenta MaGMa

A **ferramenta MaGMa** (Excel + macros, gratuita, publicada pelo ABN AMRO) é um **catálogo** com:

- Use Cases pré-construídos para muitas ameaças comuns;
- Templates das 3 camadas (Business / Threat / Implementation);
- Tracking de maturidade por Use Case (não implementado / em piloto / operacional / optimizado);
- Mapping para ATT&CK e Cyber Kill Chain.

**Workflow típico:**

1. Escolher um Use Case do catálogo (ou criar novo);
2. Adaptar as camadas Business / Threat / Implementation ao contexto;
3. Implementar no SIEM/EDR;
4. Acompanhar maturidade ao longo do tempo.

!!! tip "Disponibilidade"
    A ferramenta MaGMa está publicada gratuitamente em [Open MaGMa (FI-ISAC NL)](https://www.betaalvereniging.nl/en/safety/magma/). Continua a ser **a referência open source** para gestão de Use Cases em SOCs europeus.

!!! abstract "👉 Hands-on com a MaGMa UCF Tool"
    Esta secção apresenta **o conceito** da ferramenta. Para o **uso prático em aula** — passo a passo do Excel, explicação dos 9 separadores, das 4 métricas, dos erros comuns a evitar, e **3 casos práticos com exemplo resolvido** — ver a página dedicada:

    [📊 Hands-on com a MaGMa UCF Tool](magma-tool.md){ .md-button .md-button--primary }

---

## 5.3 Gestão do Ciclo de Vida dos Use Cases

Um Use Case **não é estático**. Tem ciclo de vida — nasce, opera, evolui e morre. **SOCs maduros gerem este ciclo activamente.**

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌──────│
  │   │ ONBOARDING │───►│ OPERACIONAL│───►│ MANUTENÇÃO │───►│OFFLO-│
  │   │            │    │            │    │            │    │ADING │
  │   │ Planear e  │    │ Executar e │    │ Alterar e  │    │ Desa-│
  │   │ construir  │    │ monitorizar│    │ melhorar   │    │ ctivar
  │   └────────────┘    └────────────┘    └────────────┘    └──────│
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

### Fase 1 — Onboarding

**Objectivo:** criar e validar um novo Use Case antes de ir para produção.

**Actividades:**

- [ ] **Identificar necessidade do negócio** (driver, *stakeholder*, valor);
- [ ] **Definir ameaça e TTPs alvo** (ATT&CK mapping, IOCs);
- [ ] **Construir regras de detecção** no SIEM / EDR;
- [ ] **Testar em ambiente *staging*** para validar funcionamento;
- [ ] **Validar falsos positivos** com dados reais (mínimo 2 semanas);
- [ ] **Documentar nas 3 camadas MaGMa**;
- [ ] **Associar a um playbook de resposta**.

**Critério de saída:** falsos positivos < 5% do volume de alertas + playbook validado.

### Fase 2 — Operacional

**Objectivo:** monitorizar alertas no dia-a-dia e ajustar o Use Case.

**Actividades:**

- [ ] Monitorizar alertas diariamente (SOC L1);
- [ ] Ajustar *thresholds* conforme volume e ruído;
- [ ] Recolher métricas: nº de alertas, *true positives*, MTTR;
- [ ] Reportar mensalmente ao SOC Manager.

**Métricas-chave:**

| Métrica | Meta típica |
|---------|-------------|
| **Volume de alertas** | Estável; pico em campanhas activas |
| **Taxa de falsos positivos** | < 10% |
| **MTTR por alerta** | Dentro do SLA do tipo de incidente |
| **% de alertas escalados** | 5-20% (depende do Use Case) |

### Fase 3 — Manutenção

**Objectivo:** evoluir o Use Case face a mudanças no ambiente e nas ameaças.

**Actividades:**

- [ ] **Rever com base em incidentes reais** (cada Use Case que falhou em detectar algo real precisa de revisão);
- [ ] **Atualizar IOCs e TTPs** novos (threat intel feeds, MISP, FIRST);
- [ ] **Adaptar a mudanças de infraestrutura** (novos sistemas, migrações cloud, novas aplicações);
- [ ] **Calibrar *thresholds*** conforme volume real;
- [ ] **Revisão semestral mínima** documentada.

### Fase 4 — Offloading (desactivação)

**Objectivo:** desactivar Use Cases que **deixaram de fazer sentido**.

**Quando desactivar:**

- A ameaça já não é relevante (ex.: malware específico extinto);
- A detecção foi substituída por outra mais eficiente;
- A tecnologia subjacente foi descontinuada (logs já não existem);
- O custo de manutenção excede o benefício.

**Boa prática:**

- [ ] **Documentar a razão** da desactivação;
- [ ] **Manter o Use Case arquivado** (caso a ameaça reapareça);
- [ ] **Comunicar aos consumidores** do alerta (analistas, gestores) a desactivação;
- [ ] Atualizar o catálogo MaGMa.

!!! danger "Não acumular Use Cases obsoletos"
    SOCs imaturos **nunca desactivam Use Cases**. Resultado: catálogo cresce até atingir 1000+ Use Cases dos quais 30% são obsoletos. O ruído torna-se insuportável e os analistas começam a **ignorar alertas legítimos**. Gerir o ciclo de vida activamente é tão importante quanto criar Use Cases novos.

---

## Considerações finais

### Playbooks e Use Cases — ferramentas do dia-a-dia

A resposta a incidentes em sistemas complexos é difícil. **Playbooks e Use Cases são as ferramentas que se devem usar** para lidar com incidentes do dia-a-dia de forma estruturada, rápida e fundamentada.

### Automação não é a resposta perfeita para todos

**SOAR** (*Security Orchestration, Automation and Response*) é poderoso, mas requer **playbooks maduros primeiro**. Automatizar um processo mal definido apenas **acelera o erro**.

**Sequência recomendada:**

1. **Visibilidade básica** (logs completos, SIEM funcional);
2. **Playbooks maduros** (testados, com RACI claro);
3. **Confiança da equipa** nos processos;
4. **Só então** introduzir SOAR para automatizar partes repetitivas.

### Concentrar no básico — Visibilidade e Confiança

- **Visibilidade:** *"se não vemos, não podemos responder"*. **Logs completos** e correctamente encaminhados são o alicerce.
- **Confiança:** a equipa deve confiar nos playbooks **e** no seu pensamento crítico. Playbooks são **guias**, não restrições rígidas. Bons analistas usam playbooks como **mapa**, não como **trilho de comboio**.

### Testar e validar continuamente

Playbooks e Use Cases devem ser testados regularmente com exercícios (***tabletop***, ***purple team***). **Um playbook não testado é apenas teoria.** Documentar descobertas e ajustar após cada teste.

!!! abstract "Ideia final do módulo"
    **Um playbook é um documento vivo.** Nasce, é testado, evolui com cada incidente real, e é desactivado quando deixa de fazer sentido. O valor de um SOC não está no número de playbooks em PDF — está na **maturidade do processo** de construção, manutenção e teste.

---

## Resumo do módulo

| Capítulo | O essencial |
|----------|-------------|
| **Cap 1 — Fundamentos** | Playbook = guia estruturado; Security Playbook (acção curta) ⊂ Incident Response Playbook (processo completo); SOC precisa de playbooks para **padronização + MTTR + conformidade** |
| **Cap 2 — Use Cases** | Estrutura **estratégico → táctico → operacional**; ligar a *drivers* de negócio; **hipóteses > acções *scriptadas*** |
| **Cap 3 — Componentes e Construção** | 4 componentes: **Fluxograma + Checklist + RACI + Ambiente**; processo de **10 passos**; testes (walkthrough → tabletop → drill → purple team) |
| **Cap 4 — Caso Phishing** | **6 fases NIST** aplicadas: Identificação → Triagem → Investigação → Análise → Remediação → Pós-Incidente; *spear-phishing* é variante crítica |
| **Cap 5 — MaGMa** | **3 camadas** (Business / Threat / Implementation); **3 níveis** L1/L2/L3; **4 fases** de ciclo de vida (Onboarding → Operacional → Manutenção → Offloading) |

### Frases-chave para recordar

- *"Playbook **transforma conhecimento tácito em explícito**."*
- *"Captura **o que perguntar** (hipóteses), não **como fazer** (acções amarradas a produto)."*
- *"**Fluxograma + Checklist + RACI + Ambiente** = playbook completo."*
- *"**Um playbook não testado é apenas teoria.**"*
- *"**Automatizar um processo mal definido apenas acelera o erro.**"*

---

## 📎 Documentos operacionais relacionados

A criação e operação de playbooks materializa-se nos seguintes templates. Catálogo completo em [📋 Templates](../modelos/index.md).

**Playbooks por tipo de incidente:**

- [📄 Playbook — Ransomware](../gestao_incidentes/playbook-ransomware.docx);
- [📄 Playbook — Phishing](../gestao_incidentes/playbook-phishing.docx) — implementação das 6 fases do Cap 4;
- [📄 Playbook — Violação de Dados Pessoais (RGPD)](../gestao_incidentes/playbook-violacao-dados-pessoais.docx).

**Suporte operacional:**

- [📄 Procedimento de Classificação e Severidade](../gestao_incidentes/procedimento-classificacao-severidade.docx) — triagem (Cap 4 Fase 2);
- [📄 Matriz RACI do CSIRT](../gestao_incidentes/procedimento-escalonamento-raci.docx) — implementação do Cap 3.1 componente RACI;
- [📄 Relatório Pós-Incidente (PIR)](../gestao_incidentes/relatorio-pos-incidente-pir.docx) — Cap 4 Fase 6.

---

## Referências

- **FIRST** (2019). *CSIRT Services Framework v2.1.* <https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1>
- **NIST SP 800-61 Revision 2** (2012). *Computer Security Incident Handling Guide.* <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- **MITRE ATT&CK** Enterprise Matrix. <https://attack.mitre.org/matrices/enterprise/>
- **Lockheed Martin Cyber Kill Chain.** <https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html>
- **MaGMa Use Case Framework** (ABN AMRO Bank / FI-ISAC NL). <https://www.betaalvereniging.nl/en/safety/magma/>
- **CISA StopRansomware** Guide. <https://www.cisa.gov/stopransomware>
- **CNCS — Relatório Riscos & Conflitos 2025**. <https://www.cncs.gov.pt/>
- **ENISA** *Good Practice Guide for Incident Management.* <https://www.enisa.europa.eu/publications/good-practice-guide-for-incident-management>

---

**Próximos passos:** Casos práticos e exercícios serão adicionados aqui assim que o material for definido pelo docente. Por agora, explore os [📋 Templates de Playbooks](../modelos/index.md#grupo-b-playbooks-resposta-tactica-por-tipo-de-incidente) prontos a usar.
