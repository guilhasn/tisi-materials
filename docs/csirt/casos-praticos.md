# Casos Práticos, Exercícios e Resumo

> Página final do módulo CSIRT. Agrega aplicação (3 casos práticos), avaliação (3 exercícios com soluções), armadilhas comuns e síntese final.

---

## 1. Exemplos práticos

## Exemplo 1 — Município de Vila Feliz decide criar CSIRT

**Contexto:** Câmara Municipal de Vila Feliz (120 colaboradores, 30 mil munícipes), sofreu dois incidentes em 12 meses: phishing que comprometeu contas de tesouraria, e ransomware num servidor de processos administrativos. Decide formalizar um CSIRT.

| Pilar | Decisão |
|-------|---------|
| **Missão** | *"O CSIRT de Vila Feliz protege a informação do município e dos seus munícipes, prevenindo e respondendo a incidentes de cibersegurança, cooperando com o CNCS e a Rede Nacional de CSIRTs."* |
| **Constituinte** | Todos os serviços da CM; indiretamente, cidadãos que usam serviços digitais |
| **Papel** | Reporta ao responsável pela DIMSI; **Shared authority** — pode conter mas não declarar desastre |
| **Relações** | Rede Nacional de CSIRTs (CNCS); PJ-UNC3T; CCDR; CNPD |
| **Modelo** | *Internal Distributed* — equipa de 3 pessoas a tempo parcial (responsável DIMSI + 2 técnicos SI) |
| **Ferramentas** | GLPI (já usado internamente) + TheHive open source; SIEM da CNCS/SOC nacional |

**Primeiro marco:** publicar Política de Gestão de Incidentes, Matriz RACI e procedimento de classificação. Fazer *tabletop* em 90 dias.

## Exemplo 2 — Banco escolhe modelo organizacional

**Contexto:** Banco regional com 40 agências e 900 colaboradores. Já tem departamento de segurança (6 pessoas) mas resposta a incidentes é ad-hoc. O CISO propõe formalizar o modelo.

| Opção | Análise |
|-------|---------|
| **Security Team (status quo)** | ❌ Falha em auditorias de conformidade (supervisão Banco de Portugal); não cumpre DORA |
| **Distributed** | ⚠️ Adequado para multinacionais; demasiado para dimensão regional |
| **Centralized** | ✅ **Recomendado** — 4 pessoas dedicadas 24/7, reportando ao CISO |
| **Combined** | ⚠️ Sobredimensionado para esta escala |
| **Coordinating** | ❌ Não aplicável |

**Decisão:** Centralized, integrando 3 novos perfis (L1 + L2 + L3/forense); CISO continua como L4. Contratar MSSP externo para cobertura noturna e fins de semana. Orçamento aprovado: €350K/ano.

## Exemplo 3 — CSIRT nacional e constituinte sobreposta

**Contexto:** Durante um incidente de ransomware num hospital público, três CSIRTs têm constituinte sobreposta:

- **CSIRT interno** do hospital;
- **SPMS-CSIRT** (setor saúde nacional);
- **CNCS/CERT.PT** (nacional, por ser incidente NIS2 em operador de serviço essencial).

| Quem faz o quê | Como se coordena |
|----------------|------------------|
| **CSIRT hospital** | Contenção imediata, preservação de evidência, aplicação de *playbook* |
| **SPMS-CSIRT** | Apoio técnico, coordenação setorial (outros hospitais alertados) |
| **CNCS** | Notificação NIS2 (24h/72h/30d), coordenação com autoridades europeias |

**Critério:** *"CSIRT de último recurso"* = CNCS. Mas a primeira linha de resposta operacional continua no hospital. A comunicação a Direção, CNPD (dados de saúde), PJ e Bombeiros (se paragem de equipamento afetar serviço clínico) é coordenada via CSIRT hospital + equipa jurídica.

---

## 2. Exercícios

## Exercício 1 — Identificar o modelo organizacional (nível básico)

Para cada descrição, identifique qual dos 5 modelos organizacionais se aplica:

| Descrição | Modelo? |
|-----------|---------|
| a) Universidade sem equipa formal; cada faculdade trata os seus próprios incidentes quando acontecem | ? |
| b) Empresa multinacional com equipa de 15 pessoas em Lisboa que coordena sub-equipas em 8 países | ? |
| c) CNCS que coordena incidentes entre CSIRTs nacionais e setoriais, mas não responde diretamente a incidentes de nenhum operador | ? |
| d) Banco com 5 analistas dedicados 24/7 no SOC central; CISO reporta ao CEO | ? |
| e) PME com 40 pessoas onde o responsável de IT mantém a resposta a incidentes como 20% do seu tempo | ? |

??? success "Solução 1"
    | Descrição | Modelo | Justificação |
    |-----------|--------|--------------|
    | a) | **Security Team** | Sem CSIRT formal, ad-hoc |
    | b) | **Combined Distributed + Centralized** | Núcleo central + braços distribuídos |
    | c) | **Coordinating CSIRT** | Coordena outros CSIRTs sem responder |
    | d) | **Internal Centralized** | Equipa dedicada, centralizada, 24/7 |
    | e) | **Internal Distributed** (embrionário) ou **Security Team** | Depende da formalização |

## Exercício 2 — Redigir mission statement (nível intermédio)

Uma empresa de e-commerce portuguesa (100 colaboradores, 2 armazéns, site com 200 mil clientes) está a criar o seu CSIRT. Redija um *mission statement* de 3-4 frases que:

1. Exprima o propósito de existir;
2. Seja não-ambíguo;
3. Esteja alinhado com um negócio de e-commerce (confidencialidade de dados pessoais, disponibilidade do site);
4. Reforce objetivos da organização.

??? success "Solução 2 (exemplo)"
    *"O CSIRT de [Nome da organização] protege a confidencialidade dos dados pessoais dos clientes e a disponibilidade dos serviços de e-commerce, através da prevenção, deteção e resposta a incidentes de cibersegurança. Atua como ponto único de contacto para reporte de incidentes, coordenando com autoridades (CNCS, CNPD) e parceiros externos. Contribui para o cumprimento das obrigações de conformidade (RGPD, DL 125/2025) e para a confiança contínua dos clientes na marca."*

    **Porque funciona:**
    - Explicita propósito (proteger confidencialidade + disponibilidade);
    - Identifica constituinte (dados dos clientes, serviços);
    - Nomeia autoridades relevantes;
    - Liga-se a obrigações legais específicas do negócio (RGPD + NIS2);
    - Termina com valor de negócio (confiança dos clientes).

## Exercício 3 — Desenhar níveis de autoridade (nível avançado)

O CISO de uma empresa industrial quer clarificar os níveis de autoridade do CSIRT recém-criado. Para cada ação, justifique qual deveria ser o nível de autoridade (**Full / Shared / No**):

1. Isolar da rede um *endpoint* onde o EDR detetou *beaconing* para C2 conhecido;
2. Desligar integralmente o servidor ERP durante horário laboral por suspeita de comprometimento;
3. Notificar CNCS (NIS2) em 24h;
4. Pagar resgate de ransomware;
5. Reset forçado de todas as passwords de domínio;
6. Comunicar à imprensa;
7. Bloquear temporariamente domínio `.exemplo.com` no proxy;
8. Acionar fornecedor externo de DFIR (contrato *retainer*).

??? success "Solução 3"
    | # | Ação | Autoridade | Justificação |
    |---|------|------------|--------------|
    | 1 | Isolar endpoint com beacon C2 | **Full** | Urgente, proporcional, reversível |
    | 2 | Desligar ERP | **Shared** | Impacto operacional massivo; process owner deve participar |
    | 3 | Notificar CNCS em 24h | **Full** (DPO/CISO) | Obrigação legal objetiva; atraso = infração |
    | 4 | Pagar resgate | **No** (apenas aconselha) | Decisão estratégica — Direção decide |
    | 5 | Reset de todas as passwords | **Shared** | Impacto em operações |
    | 6 | Comunicar à imprensa | **No** | Gestão de comunicação e Direção |
    | 7 | Bloquear domínio no proxy | **Full** | Reversível, defensivo standard |
    | 8 | Acionar DFIR externo | **Full** (dentro do budget) / **Shared** | Depende da alçada financeira |

---

## 3. Armadilhas e confusões a evitar

!!! danger "Confusão 1: CSIRT = SOC"
    **Errado.** Podem sobrepor-se mas não são idênticos. **SOC** é o *centro operacional* (monitorização 24/7, deteção, triagem). **CSIRT** é a *equipa de resposta* (investigação, erradicação, recuperação, *follow-up*). Em organizações pequenas a mesma equipa faz ambos; em grandes, são funções distintas com integração formal.

!!! danger "Confusão 2: Começar pela tecnologia"
    **Errado.** Comprar SIEM/EDR sem definir missão, constituinte, papéis e processos produz **uma fábrica de alertas ignorados**. Primeiro os 4 fundamentos e os processos; só depois a tecnologia.

!!! danger "Confusão 3: Um CSIRT sem autoridade é cosmético"
    **Errado.** Um CSIRT *No authority* serve para auditoria mas **falha em P1**. A autoridade tem de estar **pré-aprovada por escrito** pela Direção, com níveis claros para cada tipo de ação. Durante a crise não há tempo para convocar comités.

!!! danger "Confusão 4: Constituinte vaga = conflitos"
    **Errado.** "Servimos a empresa" não é constituinte — é aspiração. Uma constituinte bem definida inclui *perímetro* (IPs, domínios, utilizadores, serviços), *natureza* (interna, externa, ambas) e *exclusões explícitas*.

!!! danger "Confusão 5: CERT é sinónimo livre de CSIRT"
    **Errado.** CERT é **marca registada** da SEI/Carnegie Mellon desde 1997. Usar CERT sem autorização é incorreto. Na prática, os novos CSIRTs usam **CSIRT** como termo genérico.

!!! danger "Confusão 6: Relações com outros CSIRTs vêm naturalmente"
    **Errado.** A confiança que permite partilha de IOCs só se constrói através de **interação consistente** — conferências (FIRST), exercícios conjuntos, reuniões da Rede Nacional. Um CSIRT que descobre que precisa de contactos externos durante uma crise já perdeu.

!!! danger "Confusão 7: Formação técnica é suficiente"
    **Errado.** *Skills* não-técnicas (comunicação, escrita, calma sob pressão) são **iguais ou mais importantes**, especialmente em L3 e L4. Um CISO tem de comunicar questões técnicas complexas à Direção e a *stakeholders* não-técnicos.

---

## 4. Resumo rápido

## Síntese por capítulo

| Capítulo | O essencial |
|----------|-------------|
| **Cap 1 — O que é um CSIRT?** | Equipa formal com mandato para prevenir, detetar, responder e aprender com incidentes, para uma constituinte definida. Nasceu em 17 Nov 1988 (pós-Morris Worm). 3 grupos de serviços: Reativos, Proativos, Qualidade (ref: FIRST v2.1). |
| **Cap 2 — Tipos e Exemplos** | 6 tipos: Enterprise, National (CNCS), Coordination (CERT/CC, CISA, CERT-EU), Analysis (H-ISAC), Vendor/PSIRT, Provider (MSSP). 3 vantagens: gestão centralizada, PoC, confiança. |
| **Cap 3 — Como Criar** | **4 fundamentos**: Missão, Constituinte, Posição+Autoridade (Full/Shared/No), Relações externas. **5 modelos**: Security Team → Distributed → Centralized → Combined → Coordinating. **4 bases legais**: NDA, MOU, Contract, Terms of Reference. |
| **Cap 4 — Recursos e Ops** | **Pessoas:** L1 Analyst → L4 CISO + papéis de apoio. **Processos:** SOPs + playbooks por tipo (Malware, DDoS, Defacement, Fraud, Data Breach, Privacy) + NIST 6-phase. **Tecnologia:** GLPI/TheHive/Cortex/MISP + ferramentas por área (Volatility, Splunk, Wireshark, Zabbix, Cuckoo). **24/7:** email, tel, SMS, WHOIS, abuse, relações ativas. |

## Frases-chave para recordar

- *"Sem confiança, **não há partilha**; sem partilha, não há defesa coletiva."*
- *"A autoridade do CSIRT é **pré-aprovada**, não negociada durante a crise."*
- *"A missão responde a **porquê existimos**; a constituinte a **quem servimos**."*
- *"Tecnologia sem processos é uma **fábrica de alertas ignorados**."*
- *"*Skills* não-técnicas são iguais — ou mais — importantes que as técnicas."*
- *"CERT é marca registada; **CSIRT é genérico** e pode ser usado livremente."*

---

## 📎 Documentos operacionais relacionados

A criação e operação de um CSIRT materializa-se nos seguintes templates. Catálogo completo em [📋 Templates](../modelos/index.md).

- [📄 Política de Gestão de Incidentes](../gestao_incidentes/politica-gestao-incidentes.docx) — mandato e papéis do CSIRT.
- [📄 Procedimento de Escalonamento e Matriz RACI](../gestao_incidentes/procedimento-escalonamento-raci.docx) — cadeia de comando e contactos.
- [📄 Procedimento de Classificação e Severidade](../gestao_incidentes/procedimento-classificacao-severidade.docx) — matriz P1-P5 usada pela L1.
- [📄 Plano de Resposta a Incidentes (NIS2)](../gestao_incidentes/plano-resposta-incidentes-nis2.docx) — plano base para CSIRTs em entidades NIS2.
- [📄 Plano de Comunicação de Crise](../gestao_incidentes/plano-comunicacao-crise.docx) — operação externa do CSIRT.

---

## Referências

- FIRST (2019). **CSIRT Services Framework v2.1**. <https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1>
- Killcrece, G. et al. (2003). **Handbook for Computer Security Incident Response Teams (CSIRTs)**, 2nd ed. SEI/CERT Division. <https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=6305>
- NIST (2012). **SP 800-61 Revision 2 — Computer Security Incident Handling Guide**. <https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final>
- ENISA. **Good Practice Guide for Incident Management**. <https://www.enisa.europa.eu/publications/good-practice-guide-for-incident-management>
- RFC 2350 — *Expectations for Computer Security Incident Response*. <https://www.rfc-editor.org/rfc/rfc2350>
- Centro Nacional de Cibersegurança — **Rede Nacional de CSIRTs**. <https://www.redecsirt.pt/>
- SEI CERT Division. <https://www.sei.cmu.edu/about/divisions/cert/>

---

**Próximos passos:** Com o CSIRT estruturado, explore a [Preparação](../ih/preparacao.md) do módulo Incident Handling para perceber as atividades contínuas que a equipa deve manter entre incidentes (políticas, ferramentas, treino, canais de reporte).