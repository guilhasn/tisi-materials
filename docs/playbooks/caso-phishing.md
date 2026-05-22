# Capítulo 4 — Caso Prático: Phishing

> *Walkthrough completo das **6 fases NIST SP 800-61** aplicado a uma campanha de phishing real-like. Cada fase mostra **o que perguntar** (hipóteses), **o que recolher** (evidência) e **o que fazer** (acção).*

## Visão geral do ciclo

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
  │   │ Fase 1   │─►│ Fase 2   │─►│ Fase 3   │                     │
  │   │ Identif. │  │ Triagem  │  │ Investig.│                     │
  │   └──────────┘  └──────────┘  └────┬─────┘                     │
  │                                    │                           │
  │                                    ▼                           │
  │   ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
  │   │ Fase 6   │◄─│ Fase 5   │◄─│ Fase 4   │                     │
  │   │ Pós-Inc. │  │ Remed.   │  │ Análise  │                     │
  │   └──────────┘  └──────────┘  └──────────┘                     │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

!!! info "Template prático associado"
    Este capítulo é a **base teórica** do template editável [📄 Playbook — Phishing](../gestao_incidentes/playbook-phishing.docx), disponível no hub [📋 Templates](../modelos/index.md). O capítulo explica **porquê** cada passo está no playbook; o template é **como** o aplicar.

---

## 4.1 Fases 1 e 2 — Identificação e Triagem

### Fase 1 — Identificação do incidente

**Trigger:** o alerta entra no SOC por uma de três vias:

| Origem | Mecanismo | Latência típica |
|--------|-----------|:---------------:|
| **SIEM** | Correlação de eventos (cliques em domínio suspeito, headers anómalos) | Segundos a minutos |
| **Email gateway** | Detecção automática (anti-spam, sandbox, anti-malware) | Segundos |
| **Report de utilizador** | Botão *"Report Phishing"* no cliente de email ou via helpdesk | Minutos a horas |

**Informação a recolher (preservar o original):**

- [ ] **Remetente** (display name + endereço completo);
- [ ] **Assunto** do email;
- [ ] **Data/hora** de receção (timestamp do servidor de email);
- [ ] **Anexos:** hash SHA-256, análise em *sandbox* (Cuckoo, ANY.RUN, Joe Sandbox);
- [ ] **Links:** URL completa, reputação do domínio (VirusTotal, urlscan.io), geolocalização do IP de destino;
- [ ] **Cabeçalhos** completos (Received, X-Originating-IP, SPF/DKIM/DMARC results);
- [ ] **Lista de destinatários** internos (quantos? que departamentos?).

!!! warning "Preservar o email original"
    O email é **evidência forense**. Não reencaminhar, não responder. Exportar como `.eml` ou `.msg`, calcular hash, e arquivar com cadeia de custódia. Reencaminhar destrói cabeçalhos.

### Fase 2 — Triagem e priorização

A triagem responde a três perguntas:

1. **Quantos utilizadores estão afetados?**
2. **Que tipo de dano potencial?** (sem cliques < cliques sem credenciais < credenciais introduzidas < malware executado)
3. **Que tipo de dados pode estar exposto?** (genérico vs dados pessoais sensíveis vs credenciais privilegiadas)

#### Matriz de prioridade

| Prioridade | Nº utilizadores | Impacto | Acção imediata |
|:----------:|:---------------:|---------|-----------------|
| **Baixa** | 1-2 | Sem cliques confirmados | Bloquear remetente no gateway |
| **Média** | 3-10 | Cliques sem introdução de credenciais | Isolar endpoints que clicaram |
| **Alta** | >10 | Credenciais introduzidas + malware | Escalar IR + reset de passwords |
| **Crítica** | Massivo | Conta administrativa comprometida | Incidente formal P1 + forense + comunicação |

#### Exemplo real

> **Cenário:** email *"Atualização de password expirada — clicar para renovar"* com link para `https://outlook-renew[.]xyz`. 50 utilizadores clicaram, 12 introduziram credenciais. → **Prioridade ALTA**.

### Ferramentas usadas nas fases 1 e 2

| Ferramenta | Propósito |
|-----------|-----------|
| **Sandbox** (Cuckoo, ANY.RUN, Joe Sandbox) | Detonar anexos suspeitos em ambiente isolado |
| **VirusTotal** | Reputação de hashes, URLs e domínios |
| **urlscan.io** | Screenshot + comportamento de URLs |
| **SIEM** (Splunk, Sentinel, Wazuh) | Correlacionar cliques de utilizadores ao link |
| **EDR** (CrowdStrike, Defender) | Confirmar execução de payload em endpoints |

!!! abstract "Regra"
    **Velocidade na identificação e triagem é crítica** — cada minuto de atraso aumenta o raio de propagação e o número de credenciais comprometidas.

---

## 4.2 Fases 3 e 4 — Investigação e Análise

### Fase 3 — Investigação técnica

**Hipóteses a testar** (abordagem *hypothesis-driven* — ver [Cap 2.2](use-cases.md#22-como-investigar-accoes-scriptadas-vs-investigacao-por-hipoteses)):

#### Sobre o email

- O remetente passa nas verificações de autenticação **SPF / DKIM / DMARC**?
- O *return-path* corresponde ao endereço *From*?
- O **X-Originating-IP** e geolocalização batem certo com a entidade alegada?

#### Sobre o conteúdo

- Há **urgência artificial** (*"acção em 24h ou conta suspensa"*)?
- Há **erros linguísticos** ou domínios *typosquat* (`outlook-renew.xyz` vs `outlook.com`)?
- O link aponta para domínio registado há **menos de 30 dias**? (típico de campanhas)

#### Sobre o impacto

- **Quantos** colaboradores receberam o email?
- **Quantos** clicaram (confirmar pelos logs de proxy / DNS)?
- **Quantos** introduziram credenciais (validar contra sessões pós-clique)?
- Que **estações de trabalho** acederam ao link?
- Houve **infraestrutura de rede** afetada (servidores acedidos pós-comprometimento)?

### Fase 4 — Análise aprofundada

**Perguntas-chave:**

| Hipótese | Como responder | Ferramenta típica |
|----------|----------------|--------------------|
| **As credenciais foram usadas pós-comprometimento?** | Verificar logs de autenticação (AD, IdP) por **logins anómalos** dos utilizadores afetados | AD, Azure AD / Entra ID, Okta |
| **Foi configurado *forwarding* malicioso ou regra de inbox?** | Inspecionar regras de email da conta comprometida (`Get-InboxRule` no Exchange Online) | Exchange / O365 |
| **Que serviços TI foram impactados?** | Mapear sistemas contactados pela conta após o comprometimento | SIEM, IdP, proxy |
| **Há código malicioso nos endpoints?** | EDR scan completo + análise de processos suspeitos | EDR + Volatility (memória) |
| **Como se propagou?** | Procurar movimento lateral (RDP, SMB, PSExec, WMI) — ATT&CK Lateral Movement | EDR + logs Windows 4624/4625/4688 |
| **Qual a atribuição / TTPs?** | Cruzar IOCs com threat intel (MISP, VirusTotal, AlienVault OTX); mapear a grupos APT/criminais | MISP, OpenCTI |

```
  ┌────────────────────────────────────────────────────────────────┐
  │   FLUXO DE INVESTIGAÇÃO                                        │
  │                                                                │
  │   Cabeçalho ────► Impacto ────► Compromisso ───► Atribuição    │
  │   SPF/DKIM/DMARC  Vítimas e    Credenciais e    IOCs, TTPs     │
  │                   sistemas     malware          ATT&CK         │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

### Caso prático

> **Cenário ampliado:** o cabeçalho revela que o remetente *"banco@seguro.pt"* falhou SPF e DKIM (spoofing confirmado). Investigação identifica **12 cliques**. Análise confirma **3 credenciais comprometidas** + **1 estação infectada com trojan**. Com isto, a remediação tem alvo concreto.

### Spear-phishing — variante crítica

!!! danger "Spear-phishing direcionado"
    O *spear-phishing* é phishing **direcionado a uma pessoa ou função específica** (CFO, CEO, administradores de IT). Por ser **personalizado**, frequentemente passa filtros automáticos e é credível.

    **Caso real (anonimizado):** um *spear-phishing* dirigido ao CFO comprometeu a sua conta. O atacante usou-a para enviar **emails fraudulentos ao departamento financeiro** (BEC — *Business Email Compromise*). A investigação descobriu **movimento lateral** para 3 servidores e **exfiltração de 2GB** de dados.

    **Lição:** prioridade é sempre **CRÍTICA** quando a conta comprometida é privilegiada ou tem autoridade financeira.

---

## 4.3 Fases 5 e 6 — Remediação e Pós-Incidente

### Fase 5 — Remediação

**Acções imediatas:**

| # | Acção | Responsável (RACI) |
|---|-------|---------------------|
| 1 | Informar todos os envolvidos (utilizadores afetados, IT, gestão) | SOC L2 (R), CISO (A), Comunicação (I) |
| 2 | **Remover malware** dos endpoints afetados (EDR remediation ou reimagem) | IT Infra (R), SOC L2 (C) |
| 3 | **Alterar imediatamente credenciais** das contas comprometidas | IAM team (R), SOC L2 (C) |
| 4 | **Revogar sessões e tokens** ativos (logout forçado em todos os dispositivos) | IdP team (R) |
| 5 | **Ativar MFA** nas contas afetadas (se ainda não ativo) | IAM team (R) |
| 6 | **Remover regras de inbox** maliciosas e *forwarding* externos | IT (R) |
| 7 | **Monitorizar** comportamento das contas/sistemas afetados por ≥ 30 dias | SOC L1 (R) |

**Controlos falhados — identificar e corrigir:**

- O filtro de email não bloqueou o domínio *typosquat*? → atualizar reputação no gateway;
- O SIEM não correlacionou os cliques em massa? → criar regra de detecção;
- Conta privilegiada sem MFA? → política IAM exige MFA forte para todos os tier 0/1.

### Fase 6 — Pós-Incidente

**Formação e awareness:**

- Programa **trimestral** de formação obrigatória em phishing (com tracking de conclusão);
- **Simulações de phishing** (com consentimento prévio, conforme RGPD/laboral) para testar resiliência da equipa;
- **Comunicação focal** aos utilizadores que clicaram — não punitiva, educativa.

!!! warning "Simulações de phishing e legalidade em Portugal"
    Em Portugal, simulações que **medem taxa de cliques individuais** podem entrar em conflito com **Lei do Trabalho** (LTFP) e **RGPD**. Antes de implementar, validar com:

    - **Encarregado de Proteção de Dados (DPO)** — necessidade e proporcionalidade;
    - **Comissão de Trabalhadores** ou equivalente — informação prévia;
    - **Direção** — aprovação formal do programa.

    **Boa prática:** dados agregados (taxa global), não individuais; sem consequências disciplinares.

**Atualização de controlos:**

- Manter equipa de IT atualizada sobre **novas técnicas** (NCSC UK, CNCS, FIRST);
- Instalar controlos anti-phishing em todos os endpoints (filtros, *browser isolation* opcional);
- Rever políticas de email e **filtros de DMARC** (passar de `none` → `quarantine` → `reject`).

**Lições aprendidas:**

- [ ] Documentar **o que funcionou** e **o que não funcionou**;
- [ ] Atualizar o playbook com **novos IOCs e TTPs** observados;
- [ ] Atualizar o [PIR — Relatório Pós-Incidente](../gestao_incidentes/relatorio-pos-incidente-pir.docx) com cronologia, root cause, ATT&CK mapping;
- [ ] Partilhar IOCs com pares (RNCSIRT, MISP) se TLP permitir;
- [ ] Calendarizar **walkthrough** do playbook revisto com a equipa SOC.

### Reforço visual — ciclo completo

```
  ╔════════════════════════════════════════════════════════════════╗
  ║   CICLO DE RESPOSTA A PHISHING — 6 FASES                       ║
  ║                                                                ║
  ║   ┌────────────┐                                               ║
  ║   │ 1. Identif.│  Alerta SIEM / gateway / utilizador           ║
  ║   └─────┬──────┘                                               ║
  ║         ▼                                                      ║
  ║   ┌────────────┐                                               ║
  ║   │ 2. Triagem │  Baixa / Média / Alta / Crítica               ║
  ║   └─────┬──────┘                                               ║
  ║         ▼                                                      ║
  ║   ┌────────────┐                                               ║
  ║   │ 3. Investig│  SPF/DKIM/DMARC; impacto; vítimas             ║
  ║   └─────┬──────┘                                               ║
  ║         ▼                                                      ║
  ║   ┌────────────┐                                               ║
  ║   │ 4. Análise │  Credenciais? Malware? Lateral movement?      ║
  ║   └─────┬──────┘                                               ║
  ║         ▼                                                      ║
  ║   ┌────────────┐                                               ║
  ║   │ 5. Remed.  │  Reset + revogação + remoção + MFA            ║
  ║   └─────┬──────┘                                               ║
  ║         ▼                                                      ║
  ║   ┌────────────┐                                               ║
  ║   │ 6. Pós-Inc.│  Lições, formação, controlos, PIR             ║
  ║   └────────────┘                                               ║
  ╚════════════════════════════════════════════════════════════════╝
```

!!! tip "Analogia útil"
    **Não basta apagar o fogo** — é necessário instalar sistemas de **detecção e extinção automática** (Fase 5, controlos), **treinar as equipas de resposta** (Fase 6, formação) e **rever o plano de evacuação** (Fase 6, atualização do playbook).

---

## 📎 Templates relacionados

A teoria deste capítulo materializa-se em templates `.docx` editáveis no hub [📋 Templates](../modelos/index.md):

- [📄 Playbook — Phishing / Comprometimento de Credenciais](../gestao_incidentes/playbook-phishing.docx) — implementação editável das 6 fases.
- [📄 Playbook — Violação de Dados Pessoais (RGPD)](../gestao_incidentes/playbook-violacao-dados-pessoais.docx) — accionar em paralelo se houver dados pessoais expostos.
- [📄 Plano de Comunicação de Crise](../gestao_incidentes/plano-comunicacao-crise.docx) — para campanhas com cobertura mediática.
- [📄 Relatório Pós-Incidente (PIR)](../gestao_incidentes/relatorio-pos-incidente-pir.docx) — Fase 6, documentação formal.

---

**Próximos passos:** [Capítulo 5 — Framework MaGMa](magma.md)
