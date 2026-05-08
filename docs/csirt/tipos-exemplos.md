# Capítulo 2 — Tipos de CSIRT e Exemplos Reais

## 2.1 Tipos de CSIRT por Constituinte

Os CSIRTs diferenciam-se pela *constituency* que servem:

| Tipo | Constituency | O que faz |
|------|-------------|-----------|
| **Enterprise CSIRT** | Organização-mãe (banco, universidade, fabricante, agência pública) | Serve internamente uma organização |
| **National CSIRT** | Todo um país | Mandato legal nacional (em PT: **CNCS**) |
| **Coordination Center** | Múltiplos CSIRTs | Facilita cooperação; não responde diretamente (CERT/CC, CISA, CERT-EU) |
| **Analysis Center** | Setor ou comunidade | Sintetiza dados, emite *early warnings* (H-ISAC, FS-ISAC) |
| **Vendor Team (PSIRT)** | Utilizadores dos produtos do *vendor* | Trata vulnerabilidades do produto (MSRC, Cisco PSIRT) |
| **Incident Response Provider** | Clientes pagos | Modelo MSSP/DFIR (Mandiant, CrowdStrike Services) |

### Exemplos por setor

| Setor | Exemplo típico |
|-------|----------------|
| Governo | **CNCS** (Portugal), CISA (EUA), NCSC (UK) |
| Militar | DoD-CERT, NATO-CCIR |
| Polícia / Judicial | **PJ — UNC3T** (Unidade Nacional de Combate ao Cibercrime e Criminalidade Tecnológica) |
| Financeiro | FS-ISAC, SIBS CERT |
| Saúde | **SPMS-CSIRT**, H-ISAC |
| Académico | **FCCN-CERT** (rede universitária PT), REN-ISAC (EUA) |
| Telecom / ISP | CERTs dos operadores |
| Indústria | CSIRTs setoriais (energia, automóvel) |

!!! info "Em Portugal"
    A **Rede Nacional de CSIRTs** coordenada pelo CNCS reúne CSIRTs setoriais, académicos e empresariais. Ver [redecsirt.pt](https://www.redecsirt.pt/).

### Constituency tem 4 dimensões

Definir corretamente a *constituency* significa cobrir **quatro dimensões** explícitas. **Definir as 4 evita conflitos com o departamento de IT no dia 1.**

| Dimensão | Pergunta a responder | Exemplo (universidade) |
|----------|---------------------|-------------------------|
| **Geográfica** | Que localizações cobrimos? | Todo o campus, ou só edifício central? |
| **Organizacional** | Que unidades / pessoas? | Alunos sim; professores sim; visitantes não? |
| **Tecnológica** | Que sistemas? | Computadores Windows sim; sistemas industriais (rega, climatização) não |
| **Funcional** | Que tipos de incidente? | Segurança da informação sim; falhas de hardware não |

> Imaginem um hospital que diz *"atendemos toda a gente"*. Soa generoso, é operacionalmente impossível: acaba por atender ninguém porque não consegue dimensionar recursos. **O CSIRT funciona da mesma forma — sem constituency definida nas 4 dimensões, não há prioridades.**

---

## 2.2 Exemplos Reais pelo Mundo

Os CSIRTs nacionais de referência que qualquer aluno de cibersegurança deve conhecer:

| 🌐 CSIRT | País / Região | Papel | Website |
|---------|---------------|-------|---------|
| **CERT/CC** | EUA (Carnegie Mellon) | O **primeiro** CSIRT — fundado 17 nov 1988 | [sei.cmu.edu/about/divisions/cert](https://www.sei.cmu.edu/about/divisions/cert/) |
| **CISA / US-CERT** | EUA (governo federal) | Proteção nacional de infraestrutura crítica | [cisa.gov](https://www.cisa.gov) |
| **NCSC UK** | Reino Unido | National Cyber Security Centre | [ncsc.gov.uk](https://www.ncsc.gov.uk) |
| **CERT-EU** | União Europeia | Instituições europeias | [cert.europa.eu](https://www.cert.europa.eu) |
| **SingCERT** | Singapura | Modelo de CSIRT nacional de referência | [csa.gov.sg/singcert](https://www.csa.gov.sg/singcert) |
| **CNCS / CERT.PT** | Portugal | Centro Nacional de Cibersegurança | [cncs.gov.pt](https://www.cncs.gov.pt) |

### Caso de estudo: SingCERT

**Missão:** *"One Point of Trusted Contact — Facilitate Security Threats Resolution — Increase National Competency in IT Security."*

Três frases, três compromissos claros. É citado em manuais por ser um dos *mission statements* mais curtos e concretos alguma vez redigidos para um CSIRT nacional.

### Caso de estudo: CNCS — Portugal

Centro Nacional de Cibersegurança, tutelado pelo Ministro da Presidência. Coordena a resposta a incidentes em todo o país, opera o **CERT.PT** como ponto operacional, e lidera a **Rede Nacional de CSIRTs**. Recebe notificações NIS2 (DL 125/2025 art. 42.º) e colabora com autoridades judiciais e CSIRTs internacionais.

!!! tip "Curiosidade — o CERT.pt nasceu da comunidade académica"
    O CERT.pt **não nasceu** do governo — nasceu da **FCCN** (Fundação para a Computação Científica Nacional, depois integrada na FCT-rede académica). A comunidade académica criou o CSIRT nacional **antes** do Estado. Em 2014, com a criação do CNCS, o CERT.pt migrou para o CNCS. Os CSIRTs nascem da comunidade, depois institucionalizam-se. **Não o contrário.**

### Exemplos portugueses por tipo

Para os 6 tipos de CSIRT acima, exemplos no panorama nacional:

| Tipo | Exemplos em Portugal |
|------|----------------------|
| **Enterprise** | CSIRT-Caixa (CGD), CSIRT-EDP, CSIRT-IPLeiria (Politécnico de Leiria), bancos privados, grandes empresas |
| **Nacional** | **CERT.pt** (parte do CNCS) |
| **Coordination Center** | O CERT/CC (CMU) continua o de referência mundial; em PT, o CERT.pt acumula esta função |
| **Vendor (PSIRT)** | **Outsystems PSIRT** (a referência portuguesa em PSIRT enterprise) |
| **Provider (MSSP/DFIR)** | **Devoteam, S21sec, Multicert, NTT DATA Portugal** |
| **Setorial / Academia** | **FCCN-CERT** (rede académica), **SPMS-CSIRT** (saúde) |

---

## 2.3 Panorama Português 2026

### Estrutura institucional nacional

```
  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │   Governo (PCM)                                                │
  │       │                                                        │
  │       ▼                                                        │
  │   Conselho Superior de Segurança do Ciberespaço (CSSC)         │
  │   (orientação política)                                        │
  │       │                                                        │
  │       ▼                                                        │
  │   CNCS — Centro Nacional de Cibersegurança                     │
  │   (autoridade nacional)                                        │
  │       │                                                        │
  │       ▼                                                        │
  │   CERT.pt — equipa operacional dentro do CNCS                  │
  │       │                                                        │
  │       ▼                                                        │
  │   Coordena: RNCSIRT — Rede Nacional de CSIRTs                  │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘
```

### RNCSIRT — Rede Nacional de CSIRTs

A **Rede Nacional de CSIRTs** é uma comunidade voluntária coordenada pelo CERT.pt. Reúne os CSIRTs setoriais e *enterprise* nacionais. Membros notáveis (não exaustivo): **CSIRT-Caixa, CSIRT-EDP, CSIRT-Bial, CSIRT-FCT (RCTS), CSIRT-Multicert, CSIRT-Outsystems**, vários CSIRTs setoriais.

Era voluntária até 2025; com o **DL 125/2025** muitos setores passam a ser **obrigados** a ter CSIRT formalizado.

### Decreto-Lei n.º 125/2025 — o novo regime jurídico

Publicado em **04-12-2025**, em vigor desde **03-04-2026**. Transpõe a **Diretiva NIS2** (Diretiva (UE) 2022/2555) para Portugal, substituindo a antiga Lei 46/2018.

**Pontos-chave:**

| Área | O que muda |
|------|------------|
| **Escopo** | A Lei 46/2018 cobria ~150 entidades; o DL 125/2025 cobre **~3 000+ entidades** (estimativa). Inclui Administração Pública, operadores essenciais (energia, transporte, saúde, água, finanças, infraestrutura digital, AP) e operadores importantes (fabricação, alimentos, etc.) |
| **Notificação** | **24h** para aviso prévio ao CNCS após detecção de incidente significativo · **72h** para notificação completa · **1 mês** para relatório final. Compara com RGPD: 72h apenas. **NIS2 é mais agressiva.** |
| **Coimas** | Até **10M€ ou 2% do volume de negócios global** (operadores essenciais). **Diretores podem ser pessoalmente responsabilizados.** |
| **CNCS** | Reforçado como autoridade. Pode emitir ordens vinculativas, fazer auditorias, aplicar coimas. Antes era apenas órgão consultivo + CERT operacional; agora tem **poder regulamentar**. |

### Estatísticas — Relatório de Cibersegurança em Portugal 2025 (CNCS)

A 6.ª edição do **Relatório de Cibersegurança — Riscos & Conflitos** foi publicada pelo CNCS em **setembro de 2025**:

- **3 864 incidentes** registados pelo CERT.pt em 2025 — **+40% face a 2024**.
- **90% das entidades inquiridas** percecionam risco acrescido.
- **Tendências emergentes:** ataques a infraestrutura cloud, **infostealers**, comércio de credenciais em fóruns *dark web*, **IA generativa ofensiva**.
- **Setores mais afetados:** Administração Pública, saúde, energia.

!!! info "Implicação para a profissão"
    Em Portugal, **~3 000+ entidades** vão precisar de capacidade de IR formalizada nos próximos 12 meses por força do DL 125/2025. A maioria não sabe ainda como começar. Os princípios deste módulo — missão, *constituency*, posição, relações; *reactive*/*proactive*/*SQM*; pessoas/processos/ferramentas — são literalmente as **primeiras decisões** que estas organizações têm de tomar. **A vossa profissão acaba de ganhar um motor regulatório que vai impulsionar a procura por 5-10 anos.**

---

## 2.4 Vantagens de Ter um CSIRT

Ter um CSIRT formal traz três benefícios estruturais à organização:

| Benefício | Valor concreto |
|-----------|----------------|
| **1. Gestão centralizada da informação de incidentes** | Informação e decisões coerentes; histórico completo; partilha eficiente entre equipas; decisão mais rápida |
| **2. Ponto central de contacto (PoC)** | *Trusted broker* interno e externo; comunicação direta de incidentes; informação consolidada do exterior; PoC 24/7 |
| **3. Relação de confiança pré-estabelecida** | Mais informação disponível para resposta; pronto para qualquer situação; troca de *threat intel* com outros CSIRTs |

!!! danger "Sem confiança, não há relatórios de incidentes"
    A vantagem de ter um CSIRT **depende da dimensão e tipo de negócio** da organização. Mas em qualquer caso, **sem confiança construída** com a constituinte e com pares externos, o CSIRT não recebe reportes nem consegue partilhar IOCs. A confiança demora anos a construir e destrói-se em dias.

### Fluxo do Incident Handling pelo CSIRT

Ao receber um reporte, o CSIRT executa um fluxo bem definido:

```
  ┌──────────────────────────────────────────────────────────────┐
  │   FLUXO DO INCIDENT HANDLING PELO CSIRT                      │
  │                                                              │
  │   ┌──────────┐   ┌────────┐   ┌───────────┐                  │
  │   │  Point   │──►│ Triage │──►│Priorização│                  │
  │   │ of       │   │        │   │           │                  │
  │   │ Contact  │   │        │   │           │                  │
  │   └──────────┘   └────────┘   └─────┬─────┘                  │
  │                                     │                        │
  │                                     ▼                        │
  │                         ┌───────────────────┐                │
  │                         │  Assistência       │                │
  │                         │  Técnica           │                │
  │                         └─────────┬─────────┘                │
  │                                   │                          │
  │                                   ▼                          │
  │                         ┌───────────────────┐                │
  │                         │  Resolução,        │                │
  │                         │  Supressão de dano,│                │
  │                         │  Assistência à     │                │
  │                         │  recuperação       │                │
  │                         └───────────────────┘                │
  └──────────────────────────────────────────────────────────────┘
```

---

**Próximos passos:** [Como Criar um CSIRT](como-criar.md)
