# Capítulo 2 — Use Cases de Segurança

## 2.1 O que são Use Cases de Segurança?

### Definição: do estratégico ao operacional

Um **Use Case de segurança** descreve uma ameaça em **múltiplos níveis** — desde o ***modus operandi*** do atacante (estratégico) até **eventos concretos** na infraestrutura (operacional).

```
  ┌────────────────────────────────────────────────────────────────┐
  │   ANATOMIA DE UM USE CASE — 3 NÍVEIS                           │
  │                                                                │
  │   ┌──────────────────┐                                         │
  │   │  ESTRATÉGICO     │   O quê?                                │
  │   │  (porquê / quem) │   Ator de ameaça, objectivo,            │
  │   │                  │   modus operandi geral                  │
  │   └─────────┬────────┘                                         │
  │             │ traduz-se em                                     │
  │             ▼                                                  │
  │   ┌──────────────────┐                                         │
  │   │  TÁCTICO         │   Como?                                 │
  │   │  (técnicas)      │   TTPs MITRE ATT&CK, ferramentas        │
  │   │                  │   usadas, tipos de payload              │
  │   └─────────┬────────┘                                         │
  │             │ manifesta-se em                                  │
  │             ▼                                                  │
  │   ┌──────────────────┐                                         │
  │   │  OPERACIONAL     │   O que vemos?                          │
  │   │  (eventos)       │   Eventos SIEM, logs, IOCs concretos    │
  │   │                  │   (IPs, hashes, padrões, queries)       │
  │   └──────────────────┘                                         │
  └────────────────────────────────────────────────────────────────┘
```

### Ligação aos *drivers* de negócio

Cada Use Case está ligado a um ***driver* de negócio**. **Sem ligação ao negócio, o Use Case é um exercício técnico** que ninguém vai patrocinar.

| Driver de negócio (porquê) | Use Case (como) |
|----------------------------|------------------|
| Proteger dados de clientes (RGPD + reputação) | Detetar exfiltração de dados PII |
| Garantir disponibilidade do *portal do cidadão* | Detetar DDoS aplicacional |
| Cumprir DORA (sector financeiro) | Detetar acesso anómalo a sistemas críticos |
| Proteger propriedade intelectual | Detetar transferências volumosas para destinos externos |

!!! info "PII e exfiltração — definições"
    - **PII (Personally Identifiable Information):** informação que permite identificar uma pessoa, directa ou indirectamente. Exemplos: nome, NIF, contacto telefónico, morada, email, dados de saúde, credenciais.
    - **Exfiltração de dados:** processo de retirar dados de um sistema sem autorização, normalmente de forma intencional (ataque) ou acidental (erro humano).

### Exemplo concreto: *Brute Force Attack*

| Nível | Conteúdo |
|-------|----------|
| **Estratégico** | Ator tenta adivinhar credenciais para obter acesso inicial a uma conta legítima |
| **Táctico** | Uso de ferramentas como **Hydra**, **Burp Intruder**, **Hashcat**. Técnica MITRE ATT&CK: **T1110 — Brute Force** |
| **Operacional** | Evento SIEM: *"5+ logins falhados em 60 segundos, vindos do mesmo IP"* |
| **Resposta** | Bloquear conta + bloquear IP de origem + alertar administrador |

### Playbooks são constituídos por Use Cases

Cada **play** dentro de um *playbook* corresponde a um **Use Case**. Um playbook de phishing contém *plays* para:

| Fase | Use Case correspondente |
|------|--------------------------|
| **Identificação** | "Detectar email suspeito reportado por utilizador ou gateway" |
| **Triagem** | "Classificar campanha por nº de afetados e severidade" |
| **Investigação** | "Verificar autenticação do remetente (SPF/DKIM/DMARC)" |
| **Análise** | "Verificar se houve compromisso de credenciais" |
| **Remediação** | "Reset de credenciais + bloqueio do remetente + remoção de email" |
| **Pós-incidente** | "Atualizar regras de filtro + formação direcionada" |

> Os Use Cases são as **peças de Lego** dos playbooks.

!!! abstract "Ideia-chave"
    Use Cases **traduzem ameaças abstractas** (*"phishing"*, *"ransomware"*) em **eventos detectáveis e acções concretas de resposta**.

---

## 2.2 Como investigar? Acções *scriptadas* vs Investigação por Hipóteses

Existem duas filosofias de construção de playbooks. **A indústria está a evoluir da primeira para a segunda.**

### Abordagem tradicional: *"Scripted"* (acções pré-definidas)

**Foco:** lista de acções pré-definidas, sequenciais.

**Exemplo (playbook de malware):**

1. Rever logs HTTP antes da infeção;
2. Rever logs do antivírus;
3. Rever logs DNS;
4. Recolher evidências do sistema;
5. Enviar amostra ao fornecedor AV.

**Problema:** foca-se no **como** (acções), sem questionar **o quê** (hipóteses). É **produto-dependente** — se substituíres o antivírus, o passo 2 fica obsoleto. **Pouco portátil** entre organizações.

### Abordagem moderna: *Hypothesis-Driven* (perguntas declarativas)

**Foco:** perguntas e hipóteses a testar.

**Exemplo (mesmo caso de malware):**

1. **O endpoint** tem evidência de **ligações de saída suspeitas**?
2. **Liga-se a IPs ou domínios** com má reputação?
3. **Contém evidência de persistência** de malware?

**Vantagem:** as perguntas são **independentes de produto/empresa**. Conduzem a acções, **mas não as ditam**. Um analista usa qualquer ferramenta disponível para responder à mesma pergunta.

### Comparação lado-a-lado

| Dimensão | *Scripted* | *Hypothesis-Driven* |
|----------|------------|---------------------|
| **Foco** | "Como executar" | "Que perguntas fazer" |
| **Acoplamento a produto** | Alto | Baixo |
| **Portabilidade entre orgs** | Baixa | Alta |
| **Manutenção** | Cada mudança de ferramenta exige actualização | Estável; só muda se a ameaça mudar |
| **Adaptação a contexto** | Rígido | Flexível |
| **Captação de conhecimento** | Procedural | Investigativo (mais valioso) |
| **Quem pode aplicar** | Apenas quem usa as ferramentas listadas | Qualquer analista com ferramentas equivalentes |

### Analogia médica

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   Acções scriptadas:                                           │
  │     Médico que receita antibiótico sem diagnosticar.           │
  │     Pode até acertar, mas não sabe porquê.                     │
  │                                                                │
  │   Hipóteses:                                                   │
  │     Médico que faz perguntas primeiro:                         │
  │     «Há febre? Há dor? Onde dói? Há quanto tempo?»             │
  │     Constrói diagnóstico antes de receitar.                    │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

### Caso prático: investigação de malware

**Hipótese inicial:** *"Não há ameaça confirmada."*

O playbook guia o analista a **testar esta hipótese** com perguntas específicas:

| Pergunta-hipótese | Como responder (varia por organização) |
|--------------------|------------------------------------------|
| O processo é assinado digitalmente por entidade confiável? | EDR (CrowdStrike, Defender, SentinelOne) ou `sigcheck.exe` |
| Há comunicação a domínios com má reputação? | Logs DNS / proxy + threat intel (VirusTotal, MISP, AbuseIPDB) |
| Há indícios de persistência (run keys, scheduled tasks, services)? | EDR ou Sysinternals Autoruns |
| O hash do binário aparece em campanhas conhecidas? | VirusTotal, AlienVault OTX, MISP |

Se **uma pergunta é respondida positivamente** (ex.: *"sim, há ligações a domínios maliciosos"*), a **hipótese inicial é rejeitada** e o incidente é escalado.

!!! tip "Onde fica o «como»?"
    O *playbook* captura **o que perguntar**. O ***runbook*** (documento associado, separado) regista **como responder** com as ferramentas concretas da organização. Esta separação é o que torna o playbook **portátil e duradouro**.

!!! abstract "Regra de ouro"
    Construir playbooks **hypothesis-driven** desde o início. Migrar playbooks *scripted* legados é trabalhoso — começar bem é mais barato que refactorizar.

---

**Próximos passos:** [Capítulo 3 — Componentes e Construção](componentes.md)
