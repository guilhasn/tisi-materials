# MITRE ATT&CK — Mapa de referência para TISI

> Referência transversal usada pelos módulos **IRP** e **IH** para classificar técnicas observadas em incidentes reais. O MITRE ATT&CK é o vocabulário *de facto* da indústria para descrever **comportamento adversário** (TTPs — Tactics, Techniques and Procedures) a partir de observação empírica, não a partir de frameworks teóricos.

## Índice

1. [O que é e porque importa](#1-o-que-e-e-porque-importa)
2. [Matriz Enterprise — as 14 tácticas](#2-matriz-enterprise-as-14-tacticas)
3. [Técnicas relevantes por tipo de incidente](#3-tecnicas-relevantes-por-tipo-de-incidente)
4. [Ferramentas de navegação e operacionalização](#4-ferramentas-de-navegacao-e-operacionalizacao)
5. [Relação com outros modelos (Kill Chain, Diamond, Pyramid of Pain)](#5-relacao-com-outros-modelos)
6. [Como usar no ciclo de IR](#6-como-usar-no-ciclo-de-ir)

---

## 1. O que é e porque importa

**MITRE ATT&CK** (Adversarial Tactics, Techniques, and Common Knowledge) é uma base de conhecimento pública, mantida pela MITRE Corporation desde 2013, que cataloga **comportamento real de adversários** observado em incidentes.

- **Tácticas** (14 na matriz Enterprise) — **o porquê** de uma acção (o objectivo intermédio do atacante, ex.: ganhar persistência).
- **Técnicas** (mais de 200) — **o como** geral (ex.: T1547 — Boot or Logon Autostart Execution).
- **Sub-técnicas** — o **como específico** (ex.: T1547.001 — Registry Run Keys / Startup Folder).
- **Procedimentos** — implementação concreta observada em grupos/malware (ex.: Sandworm a usar `psexec` + `wmic`).

**Porque é central no IR moderno:**

- Fornece **vocabulário comum** entre blue team, red team, threat intel e decisão.
- Permite **mapear detecções → comportamentos adversários**, não apenas IOCs estáticos (a parte mais baixa da *Pyramid of Pain*).
- Alimenta **priorização de controlos** (ATT&CK Navigator, controlos CIS mapeados a ATT&CK).
- É **requerido** por diversos frameworks regulatórios modernos (ex.: DORA TLPT — Threat-Led Penetration Testing; cenários do TIBER-EU).

## 2. Matriz Enterprise — as 14 tácticas

| # | Táctica (TA) | Objectivo do atacante |
|:-:|--------------|-----------------------|
| 1 | **TA0043** — Reconnaissance | Recolher informação pré-ataque |
| 2 | **TA0042** — Resource Development | Preparar infraestrutura (domínios, contas, malware) |
| 3 | **TA0001** — Initial Access | Ganhar primeiro *foothold* no ambiente |
| 4 | **TA0002** — Execution | Executar código malicioso |
| 5 | **TA0003** — Persistence | Manter acesso através de reboots/credenciais alteradas |
| 6 | **TA0004** — Privilege Escalation | Obter permissões superiores |
| 7 | **TA0005** — Defense Evasion | Evitar detecção (ofuscação, clear logs) |
| 8 | **TA0006** — Credential Access | Roubar credenciais (passwords, tokens, keys) |
| 9 | **TA0007** — Discovery | Enumerar o ambiente (hosts, utilizadores, rede) |
| 10 | **TA0008** — Lateral Movement | Mover-se entre sistemas |
| 11 | **TA0009** — Collection | Agregar dados alvo |
| 12 | **TA0011** — Command and Control | Comunicar com infraestrutura C2 |
| 13 | **TA0010** — Exfiltration | Extrair dados para fora |
| 14 | **TA0040** — Impact | Degradar, destruir, manipular (cifrar, apagar, fraude) |

!!! note "Matrizes adicionais"
    Além da **Enterprise**, o MITRE mantém matrizes para **Mobile**, **ICS** (relevante para OT/SCADA — Colonial Pipeline, Industroyer), **Cloud** e **Containers**. Para incidentes em OT, usar ATT&CK for ICS (tácticas e técnicas diferentes).

## 3. Técnicas relevantes por tipo de incidente

Tabela de referência rápida — as técnicas mais observadas por vector, para mapear incidentes ao ATT&CK durante a investigação.

### 3.1 Phishing / comprometimento de credenciais

| Fase | Técnica (ID) | Detalhe |
|------|--------------|---------|
| Initial Access | **T1566.001** — Spearphishing Attachment | Anexo malicioso (macro, ISO, LNK) |
| Initial Access | **T1566.002** — Spearphishing Link | Link para credencial harvester ou download |
| Initial Access | **T1566.003** — Spearphishing via Service | LinkedIn, Teams, SMS (smishing), voz (vishing) |
| Credential Access | **T1056.003** — Web Portal Capture | Página falsa de login institucional |
| Credential Access | **T1078** — Valid Accounts | Uso de credencial roubada para acesso legítimo |
| Defense Evasion | **T1036** — Masquerading | Domínio *typosquat* (ex.: `univ-l3iria.pt`) |

### 3.2 Ransomware / wiper

| Fase | Técnica (ID) | Detalhe |
|------|--------------|---------|
| Initial Access | **T1133** — External Remote Services | RDP/VPN exposto ou comprometido |
| Initial Access | **T1190** — Exploit Public-Facing Application | CVE em Fortinet, Citrix, Exchange, MOVEit |
| Initial Access | **T1195.002** — Compromise Software Supply Chain | M.E.Doc (NotPetya), SolarWinds Orion, 3CX |
| Credential Access | **T1003.001** — LSASS Memory | Mimikatz, ProcDump, comsvcs.dll |
| Lateral Movement | **T1021.001** — Remote Desktop Protocol | RDP com credenciais dumpadas |
| Lateral Movement | **T1021.002** — SMB/Admin Shares | PsExec, wmic, SMB/C$ |
| Lateral Movement | **T1210** — Exploitation of Remote Services | EternalBlue (CVE-2017-0144), Zerologon (CVE-2020-1472) |
| Impact | **T1486** — Data Encrypted for Impact | Cifra de ficheiros com chave assimétrica |
| Impact | **T1490** — Inhibit System Recovery | `vssadmin delete shadows`, `bcdedit`, wipe de backups |
| Impact | **T1561.002** — Disk Structure Wipe | MBR wipe (NotPetya falso-ransomware) |

### 3.3 Data exfiltration / double extortion

| Fase | Técnica (ID) | Detalhe |
|------|--------------|---------|
| Discovery | **T1083** — File and Directory Discovery | `dir /s`, PowerShell `Get-ChildItem` |
| Collection | **T1560** — Archive Collected Data | 7zip, WinRAR com password |
| Exfiltration | **T1048.003** — Exfiltration over Unencrypted Non-C2 Protocol | FTP, HTTP para servidor atacante |
| Exfiltration | **T1567.002** — Exfiltration to Cloud Storage | Mega.nz, Dropbox, S3 buckets atacante |
| Command and Control | **T1071.001** — Web Protocols | HTTPS beaconing (Cobalt Strike, Brute Ratel) |
| Command and Control | **T1572** — Protocol Tunneling | DNS tunneling, ICMP tunneling |

### 3.4 Insider threat

| Fase | Técnica (ID) | Detalhe |
|------|--------------|---------|
| Initial Access | **T1078.002** — Domain Accounts | Acesso legítimo mau-uso |
| Collection | **T1005** — Data from Local System | Cópia para USB ou cloud pessoal |
| Exfiltration | **T1052.001** — Exfiltration over USB | Pen drive, disco externo |
| Exfiltration | **T1567** — Exfiltration Over Web Service | Gmail pessoal, WeTransfer |

### 3.5 Supply chain compromise

| Fase | Técnica (ID) | Detalhe |
|------|--------------|---------|
| Initial Access | **T1195.001** — Compromise Software Dependencies and Development Tools | Bibliotecas npm/PyPI trojanizadas |
| Initial Access | **T1195.002** — Compromise Software Supply Chain | NotPetya/M.E.Doc, SolarWinds Orion, 3CX DesktopApp |
| Initial Access | **T1195.003** — Compromise Hardware Supply Chain | Pouco documentado publicamente |
| Persistence | **T1554** — Compromise Client Software Binary | Binário legítimo assinado com backdoor |

## 4. Ferramentas de navegação e operacionalização

| Ferramenta | Propósito | Link |
|------------|-----------|------|
| **ATT&CK Navigator** | Matriz interactiva, *layering* de detecções vs cobertura | `mitre-attack.github.io/attack-navigator` |
| **ATT&CK Workbench** | Gestão de dados ATT&CK locais, customização | `github.com/center-for-threat-informed-defense/attack-workbench-frontend` |
| **CALDERA** | Emulação adversária automatizada baseada em ATT&CK | `github.com/mitre/caldera` |
| **Atomic Red Team** | Testes atómicos, um por técnica | `github.com/redcanaryco/atomic-red-team` |
| **Sigma rules** | Regras de detecção agnósticas mapeadas a ATT&CK | `github.com/SigmaHQ/sigma` |
| **DeTT&CT** | Avaliar cobertura de data sources vs ATT&CK | `github.com/rabobank-cdc/DeTTECT` |

## 5. Relação com outros modelos

| Modelo | Foco | Complementaridade com ATT&CK |
|--------|------|-------------------------------|
| **Cyber Kill Chain** (Lockheed Martin) | 7 fases lineares, centrado em APT clássico | ATT&CK é mais granular e não-linear; Kill Chain é mais didáctico para introduzir o fluxo de ataque |
| **Diamond Model** | Adversário × Infraestrutura × Capacidade × Vítima | ATT&CK detalha a **Capacidade**; Diamond enriquece com atribuição e vitimologia |
| **Pyramid of Pain** (David Bianco) | Hierarquia de IOCs por "dor" para o adversário | ATT&CK opera no topo da pirâmide (TTPs = máxima dor); Pyramid justifica porquê investir em detecções comportamentais vs hashes |
| **Unified Kill Chain** (Paul Pols) | 18 fases fundindo Kill Chain + ATT&CK | Síntese dos dois anteriores, útil para narrativa pedagógica |

## 6. Como usar no ciclo de IR

### 6.1 Durante a **deteção**

- Mapear cada alerta a uma técnica ATT&CK → agregar alertas semanticamente relacionados.
- Exemplo: alerta de `LSASS Access` + alerta de `PsExec` + alerta de `SMB Connection to Admin Share` → **padrão de Credential Dumping + Lateral Movement**, não três eventos isolados.

### 6.2 Durante a **investigação**

- Construir *narrativa de ataque* (kill chain específica do incidente) usando ATT&CK como vocabulário.
- Usar **ATT&CK Navigator** para marcar técnicas observadas e prever próximas (se viste TA0006/Credential Access, procura TA0008/Lateral Movement).

### 6.3 Durante o **follow-up / lessons learned**

- Registar no post-mortem: "Técnicas ATT&CK observadas: T1566.002, T1003.001, T1021.002, T1486."
- Comparar com coverage do SIEM/EDR: que técnicas **não** teriam sido detectadas? Adicionar regras.
- Atualizar detection engineering baseado em Sigma rules mapeadas.

### 6.4 Durante **purple teaming**

- Escolher 3-5 técnicas do perfil de ameaça relevante (ex.: LockBit → T1486, T1490, T1003, T1021, T1078).
- Emular com Atomic Red Team / CALDERA.
- Medir taxa de detecção e tempo de detecção (MTTD) por técnica.

---

## Referências

- [MITRE ATT&CK — Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/)
- [MITRE ATT&CK — ICS Matrix](https://attack.mitre.org/matrices/ics/)
- [ATT&CK Navigator](https://mitre-attack.github.io/attack-navigator/)
- Strom, B. et al. (2018). **MITRE ATT&CK: Design and Philosophy** — MITRE Technical Paper.
- Pols, P. (2017). **The Unified Kill Chain**.
- Bianco, D. (2013). **The Pyramid of Pain** — [enterprise.detect blog](https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html).
- Caltagirone, S.; Pendergast, A.; Betz, C. (2013). **The Diamond Model of Intrusion Analysis**.
