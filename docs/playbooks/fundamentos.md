# Capítulo 1 — Fundamentos dos Playbooks

## 1.1 O que é um Playbook?

### Origem do termo: futebol americano

Um **playbook**, no sentido original, é a **coleção de jogadas** que uma equipa de futebol americano pode executar durante um jogo. Inclui jogadas de ataque e defesa, corridas e passes — cada uma com um **propósito específico face a uma situação concreta**. O *quarterback* não inventa a jogada no momento; chama uma jogada do playbook.

### Transposição para a cibersegurança

> *Em segurança, um playbook é um **guia estruturado que define os passos a seguir quando ocorre um incidente específico**. É como uma receita de cozinha para responder a ameaças: diz **o que fazer**, **quando fazer** e **quem faz**.*

### Exemplo simples: playbook de incêndio num hospital

| # | Acção | Quem |
|---|-------|------|
| 1 | Ativar alarme de incêndio | Quem detecta |
| 2 | Evacuar doentes não ambulatórios | Equipa de turno |
| 3 | Contactar bombeiros | Centralista |
| 4 | Reportar ao Diretor Clínico | Chefe de turno |

Em cibersegurança é idêntico:

| # | Acção | Quem |
|---|-------|------|
| 1 | Ativar alerta P2/P1 | Analista L1 |
| 2 | Isolar sistemas afetados | Analista L2 |
| 3 | Contactar equipa de IR | Coordenador CSIRT |
| 4 | Documentar acções tomadas | Analista L2 |

### Aplicação real: SOC (Security Operations Center)

Num SOC, os playbooks permitem que **analistas L1 respondam a phishing ou malware seguindo passos validados**, sem depender exclusivamente da experiência de um sénior de serviço.

Resultado: resposta mais **rápida**, **consistente** e **auditável**.

!!! abstract "Ideia-chave"
    Um playbook **transforma conhecimento tácito em conhecimento explícito**, tornando a resposta **replicável e mensurável**.

---

## 1.2 Security Playbook vs Incident Response Playbook

Estes dois conceitos são frequentemente confundidos, mas têm focos, audiências e formatos diferentes.

| Dimensão | **Security Playbook** | **Incident Response Playbook** |
|----------|------------------------|--------------------------------|
| **Foco** | Orquestração passo-a-passo | Processos formalizados de investigação |
| **Objetivo** | Responder a tipos específicos de ameaças | Garantir conformidade regulatória (NIST, RGPD, NIS2) |
| **Formato** | *Checklist* linear de acções | Fluxogramas + checklists + evidências |
| **Exemplo** | *Playbook* de deteção de *brute force* — passos 1 a 10 para isolar conta e notificar utilizador | RGPD art. 33.º — notificar violação em 72h; o playbook documenta cada passo para provar cumprimento |
| **Audiência** | Analistas SOC de primeiro nível (L1) | Equipa de resposta a incidentes + Jurídico + DPO |
| **Granularidade** | Tarefa única, tempo curto (~minutos) | Processo completo, tempo médio-longo (~horas a dias) |

### Relação entre os dois

Os **Security Playbooks** são **componentes dentro dos Incident Response Playbooks**:

```
  ┌────────────────────────────────────────────────────────────────┐
  │   INCIDENT RESPONSE PLAYBOOK (processo completo)               │
  │   Exemplo: «Resposta a Phishing»                               │
  │                                                                │
  │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
  │   │  Security    │  │  Security    │  │  Security    │         │
  │   │  Playbook    │  │  Playbook    │  │  Playbook    │  ...    │
  │   │              │  │              │  │              │         │
  │   │  «Verificar  │  │  «Bloquear   │  │  «Reset      │         │
  │   │   SPF/DKIM/  │  │   remetente  │  │   credenciais│         │
  │   │   DMARC»     │  │   no gateway»│  │   afetadas»  │         │
  │   └──────────────┘  └──────────────┘  └──────────────┘         │
  └────────────────────────────────────────────────────────────────┘
```

!!! tip "Regra prática"
    Se a acção dura **minutos** e é executada por **uma pessoa**, é *Security Playbook*. Se dura **horas a dias** e envolve **várias funções** (técnica + jurídica + comunicação), é *Incident Response Playbook*.

---

## 1.3 Porque é que um SOC precisa de Playbooks?

### O desafio: complexidade e volume

Um SOC recebe **milhares de alertas diários**. Sem padronização, **cada analista responde de forma diferente**. O resultado? **Inconsistência, retrabalho, alertas ignorados e tempo de resposta imprevisível.**

```
  ┌──────────────────────────────────────────────────────────────┐
  │   SEM PLAYBOOKS                                              │
  │                                                              │
  │   Alerta 1 → Analista A → resposta X (45 min)                │
  │   Alerta 2 → Analista B → resposta Y (90 min)                │
  │   Alerta 3 → Analista C → ignora (era falso positivo? ou…?)  │
  │                                                              │
  │   Resultado: qualidade dependente da pessoa, não auditável   │
  └──────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────┐
  │   COM PLAYBOOKS                                              │
  │                                                              │
  │   Alerta 1 → Playbook X → resposta padrão (45 min)           │
  │   Alerta 2 → Playbook X → resposta padrão (45 min)           │
  │   Alerta 3 → Playbook Y → resposta padrão (30 min)           │
  │                                                              │
  │   Resultado: qualidade dependente do processo, auditável     │
  └──────────────────────────────────────────────────────────────┘
```

### Benefício 1: Padronização e qualidade

Playbooks garantem que **todos os analistas sigam o mesmo procedimento validado**. Um analista L1 em Lisboa responde ao phishing da mesma forma que um L2 sénior no Porto. A **qualidade deixa de depender da memória individual**.

### Benefício 2: Redução do MTTR

O **MTTR (Mean Time To Respond)** é o tempo médio para responder a um incidente — uma das métricas centrais de qualquer SOC.

| Cenário | MTTR típico (Phishing) |
|---------|:----------------------:|
| Sem playbook, analista júnior | ~4 horas |
| Com playbook, analista júnior | ~45 minutos |
| Com playbook + SOAR (automação parcial) | ~10 minutos |

!!! warning "Cada minuto conta"
    Quando um **ransomware** se propaga, **cada minuto adicional de resposta = mais sistemas cifrados**. A regra empírica: encurtar o MTTR de 4h para 45min pode significar **10× menos sistemas afetados**.

### Benefício 3: Conformidade e auditoria

Regulamentos como **RGPD** (art. 33.º — notificação em 72h), **NIS2 / DL 125/2025** (notificação ao CNCS em 24h) e o **NIST SP 800-61** exigem **processos documentados**. Playbooks servem como **prova de diligência** — mostram que a organização tem procedimentos formalizados **e que os segue sistematicamente**.

| Regulamento / Norma | Exigência relacionada com playbooks |
|---------------------|---------------------------------------|
| **RGPD art. 33.º** | Notificar CNPD em 72h após violação de dados pessoais |
| **DL 125/2025 (NIS2 PT)** | Notificar CNCS em 24h (preliminar) e 72h (atualização) |
| **NIST SP 800-61r2** | "Procedures should be documented and well-tested" |
| **ISO/IEC 27035** | Incident response procedures formalizados |
| **DORA (sector financeiro)** | Plano de IR testado a cada 12 meses, com cenários documentados |

### Conclusão

!!! abstract "Playbooks = padronização + velocidade + conformidade"
    São o **alicerce de um SOC maduro**. Sem playbooks, um SOC é apenas um conjunto de analistas com ferramentas — não é uma capacidade organizacional.

---

**Próximos passos:** [Capítulo 2 — Use Cases de Segurança](use-cases.md)
