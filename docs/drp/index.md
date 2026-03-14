# Disaster Recovery Plan (DRP) - Fundamentos

## Índice

1. [Visão geral](#1-visao-geral)
2. [Incidente vs desastre](#2-incidente-vs-desastre)
3. [Etapas do DRP](#3-etapas-do-drp)
4. [Estrutura do DRP](#4-estrutura-do-drp)
5. [Ligação com a BIA e o IRP](#5-ligacao-com-a-bia-e-o-irp)
6. [Exemplos práticos](#6-exemplos-praticos)
7. [Exercícios](#7-exercicios)
8. [Armadilhas e confusões a evitar](#8-armadilhas-e-confusoes-a-evitar)
9. [Resumo rápido](#9-resumo-rapido)

---

## 1. Visão geral

O **Disaster Recovery Plan (DRP)** e o plano que prepara a organização para **recuperar de um desastre** — ou seja, de uma situação tao grave que a resposta normal a incidentes já não é suficiente.

> Se o IRP responde a pergunta "o que fazemos quando algo corre mal?", o DRP responde a pergunta "o que fazemos quando **tudo** corre mal?"

O DRP foca-se em três pilares:

```
  ╔══════════════════════════════════════════════════════════╗
  ║              DISASTER RECOVERY PLAN (DRP)                ║
  ╠══════════════════════════════════════════════════════════╣
  ║                                                          ║
  ║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ║
  ║   │  PREPARACAO  │  │   RESPOSTA   │  │ RECUPERACAO  │  ║
  ║   │              │  │              │  │              │  ║
  ║   │  Antes do    │  │  Durante o   │  │  Após o      │  ║
  ║   │  desastre    │  │  desastre    │  │  desastre    │  ║
  ║   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  ║
  ║          │                 │                 │           ║
  ║          ▼                 ▼                 ▼           ║
  ║   Planos, testes,   Ações imediatas,  Restauro de      ║
  ║   recursos,         gestão de crise,  sistemas, dados   ║
  ║   prioridades       comunicação       e operações       ║
  ╚══════════════════════════════════════════════════════════╝
```

O objetivo final do DRP e **restabelecer as operações no site primário** da organização. Enquanto o BCP (Business Continuity Plan) garante que a organização contínua a funcionar num local alternativo, o DRP concentra-se em recuperar a infraestrutura e os sistemas originais.

| Aspeto | DRP | BCP |
|--------|-----|-----|
| **Foco** | Recuperação técnica e operacional | Continuidade das funções críticas |
| **Horizonte** | Curto prazo (dias a semanas) | Medio/longo prazo (semanas a meses) |
| **Responsável típico** | Diretor de TI / CISO | CEO / Direção geral |
| **Objetivo** | Restaurar infraestrutura no site primário | Manter operações num site alternativo |
| **Natureza** | Técnica | Estratégica e organizacional |

---

## 2. Incidente vs desastre

Uma das decisões mais críticas no planeamento de contingência e **distinguir entre incidente e desastre**. Esta classificação determina qual plano e ativado e que recursos são mobilizados.

> Nem toda a crise e um desastre. Mas todo o desastre começa como um evento que alguém tem de classificar corretamente.

### Criterios de distinção

| Critério | Incidente | Desastre |
|----------|-----------|----------|
| **Impacto** | Limitado a um sistema ou serviço | Afeta múltiplos sistemas ou toda a organização |
| **Duração** | Horas | Dias ou mais |
| **Resposta** | IRP — equipa de resposta a incidentes | DRP — equipa de recuperação de desastres |
| **Instalacoes** | Site primário operacional | Site primário pode estar inutilizavel |
| **Recursos** | Equipa normal de IT/segurança | Mobilizacao alargada, possivelmente externa |
| **Disrupcao** | Parcial e controlavel | Total ou quase total |

### Categorias de disrupcao

A classificação não é apenas "incidente ou desastre". Existem **quatro níveis de disrupcao** que a organização deve estar preparada para enfrentar:

```
  ┌─────────────────────────────────────────────────────────────┐
  │              NIVEIS DE DISRUPCAO                             │
  │                                                              │
  │  ┌──────────────┐                                            │
  │  │ Não-desastre │  Avaria de um dispositivo ou serviço       │
  │  │              │  Solução: reparação/substituição            │
  │  └──────┬───────┘                                            │
  │         ▼                                                    │
  │  ┌──────────────┐                                            │
  │  │  Emergência  │  Evento com potencial de perda de          │
  │  │              │  vidas ou bens. Precede o desastre.         │
  │  └──────┬───────┘                                            │
  │         ▼                                                    │
  │  ┌──────────────┐                                            │
  │  │   Desastre   │  Instalacao inutilizavel por 1+ dias.      │
  │  │              │  Requer site alternativo.                   │
  │  └──────┬───────┘                                            │
  │         ▼                                                    │
  │  ┌──────────────┐                                            │
  │  │  Catastrofe  │  Destruicao total ou quase total.           │
  │  │              │  Requer reconstrução completa.              │
  │  └──────────────┘                                            │
  └─────────────────────────────────────────────────────────────┘
```

| Categoria | Descrição | Exemplo | Resposta típica |
|-----------|-----------|---------|-----------------|
| **Não-desastre** | Perturbacao limitada por avaria ou falha de dispositivo | Falha de um disco num servidor com RAID | Substituicao de hardware, restauro de ficheiros |
| **Emergência** | Evento com potencial de perda de vidas ou bens | Incêndio num piso do edifício, fuga de gas | Evacuação, acionamento de bombeiros, avaliação de danos |
| **Desastre** | Instalacao inutilizavel durante 1 ou mais dias | Inundacao no datacenter, ataque ransomware generalizado | Ativação do DRP, migração para site alternativo |
| **Catastrofe** | Destruicao total das instalacoes | Terramoto que destrói o edifício-sede | Reconstrução, solução off-site de longo prazo |

**Para refletir:**

- Um ataque de ransomware que cifra 80% dos servidores e um incidente ou um desastre? Que critérios usaria para decidir?
- Se um datacenter sofre uma inundacao parcial (1 de 3 salas), como classificaria a situação?
- A classificação pode mudar ao longo do tempo? Um incidente pode escalar para desastre?

---

## 3. Etapas do DRP

Quando um desastre e declarado, a organização precisa de uma resposta estruturada. As etapas do DRP definem **o que fazer, por que ordem e quem faz**.

> "Num desastre, a primeira necessidade não é fazer tudo; e saber o que fazer primeiro, quem o faz e como coordenar."

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║                    ETAPAS DO DRP                              ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐  ║
  ║  │  1. Definir   │───►│  2. Delegar   │───►│ 3. Ativar     │  ║
  ║  │  prioridades  │    │  papeis e     │    │ lista de      │  ║
  ║  │               │    │  responsab.   │    │ alerta        │  ║
  ║  └───────────────┘    └───────────────┘    └───────┬───────┘  ║
  ║                                                     │         ║
  ║  ┌───────────────┐    ┌───────────────┐             │         ║
  ║  │ 5. Mitigar    │◄───│ 4. Documentar │◄────────────┘         ║
  ║  │ impacto       │    │ o desastre    │                       ║
  ║  │ (se possível) │    │               │                       ║
  ║  └───────────────┘    └───────────────┘                       ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Etapa 1 — Definir prioridades

A primeira ação e identificar **o que proteger e recuperar primeiro**. Nem todos os sistemas e processos tem a mesma criticidade. As prioridades devem estar predefinidas no plano, com base na BIA.

| Prioridade | Tipo de sistema | Exemplo | Justificação |
|------------|-----------------|---------|--------------|
| **Crítica** | Sistemas vitais para a operação | ERP, email corporativo, sistema de pagamentos | Sem estes, a organização para |
| **Alta** | Sistemas de suporte essencial | VPN, Active Directory, backups | Necessarios para a recuperação |
| **Media** | Sistemas de apoio | Intranet, sistemas de RH, ferramentas colaborativas | Importantes mas toleraveis temporariamente |
| **Baixa** | Sistemas não essenciais | Site institucional, arquivo histórico | Podem esperar pela recuperação completa |

**Ligação com a BIA:** Os valores de **MTD** (Maximum Tolerable Downtime) e **RTO** (Recovery Time Objective) definidos na BIA determinam diretamente estas prioridades. Um sistema com MTD de 4 horas será sempre prioritário face a um com MTD de 72 horas.

---

### Etapa 2 — Delegar papeis e responsabilidades

Cada pessoa envolvida na recuperação precisa de saber **exatamente qual e o seu papel**. A ambiguidade durante um desastre e o maior inimigo da eficácia.

| Papel | Responsabilidade | Quem tipicamente ocupa |
|-------|-----------------|----------------------|
| **Coordenador DRP** | Lidera toda a operação de recuperação; toma decisões estratégicas | CISO ou Diretor de TI |
| **Lider de equipa técnica** | Coordena a recuperação de sistemas e infraestrutura | Responsável de infraestrutura |
| **Responsável de comunicação** | Gere a comunicação interna e externa | Responsável de comunicação ou RH |
| **Responsável de documentação** | Regista todas as ações, decisões e cronologia | Membro designado da equipa |
| **Ligação com fornecedores** | Contacta fornecedores críticos (cloud, hardware, telecomunicacoes) | Gestor de contratos ou compras |
| **Responsável de segurança física** | Controla acesso as instalacoes e garante segurança das pessoas | Segurança ou facilities |

---

### Etapa 3 — Ativar a lista de alerta

A **lista de alerta** (alert roster) e a lista sequencial de pessoas e entidades a contactar quando um desastre e declarado. Deve estar **atualizada, acessível e testada**.

```
  ┌─────────────────────────────────────────────┐
  │            LISTA DE ALERTA (EXEMPLO)         │
  │                                              │
  │  Nível 1 — Imediato (primeiros 15 min)       │
  │  ● Coordenador DRP                           │
  │  ● CISO                                      │
  │  ● Diretor de TI                             │
  │                                              │
  │  Nível 2 — Urgente (primeiros 30 min)         │
  │  ● Equipa técnica de recuperação              │
  │  ● Responsável de comunicação                 │
  │  ● Fornecedores críticos (datacenter, cloud)  │
  │                                              │
  │  Nível 3 — Importante (primeiros 60 min)      │
  │  ● Direção geral / CEO                       │
  │  ● Departamento jurídico                     │
  │  ● Autoridades reguladoras (se aplicavel)     │
  │                                              │
  │  Nível 4 — Informativo (primeiras 4 horas)    │
  │  ● Colaboradores afetados                     │
  │  ● Clientes e parceiros principais            │
  │  ● Media (se necessário)                      │
  └─────────────────────────────────────────────┘
```

---

### Etapa 4 — Documentar o desastre

Desde o primeiro momento, alguém deve ser **exclusivamente responsável por documentar** tudo o que acontece. Esta documentação e essencial para:

- **Recuperação:** saber o que já foi feito e o que falta fazer
- **Análise pós-incidente:** aprender com o que aconteceu
- **Questoes legais:** provar que a organização agiu de forma diligente
- **Seguros:** fundamentar pedidos de indemnizacao
- **Conformidade:** demonstrar cumprimento de obrigações regulatorias (RGPD, NIS2)

| O que documentar | Exemplo |
|-----------------|---------|
| Cronologia de eventos | "14:32 — Detetada falha no servidor principal de base de dados" |
| Decisoes tomadas | "14:45 — Decidido ativar site alternativo (warmsite)" |
| Ações executadas | "15:00 — Iniciada transferência de dados do último backup" |
| Recursos utilizados | "Equipa de 5 técnicos + fornecedor de cloud contactado" |
| Comunicacoes efetuadas | "16:00 — Email a todos os colaboradores sobre indisponibilidade" |
| Problemas encontrados | "17:30 — Backup de quarta-feira corrompido; utilizado backup de terça" |

---

### Etapa 5 — Mitigar o impacto

Se e apenas se for possível, a equipa deve tentar **mitigar o impacto** do desastre nas operações. Isto significa tomar ações para **limitar a extensao dos danos** enquanto a recuperação está em curso.

| Ação de mitigação | Quando aplicar | Risco de não fazer |
|-------------------|----------------|-------------------|
| Desligar sistemas não afetados para protege-los | Quando há risco de propagação (ex: ransomware) | Propagação do dano a sistemas que ainda estavam funcionais |
| Ativar redundancias existentes | Quando há sistemas redundantes disponíveis | Tempo de inatividade prolongado desnecessariamente |
| Redirecionar tráfego para infraestrutura de contingência | Quando o site primário está indisponível | Perda total de serviço para clientes |
| Comunicar proativamente com stakeholders | Sempre | Perda de confiança, desinformação, pânico |

> A mitigação não é opcional — e tudo o que pode ser feito para reduzir o impacto enquanto a recuperação ainda não está completa. Mesmo que seja "apenas" comunicar.

---

## 4. Estrutura do DRP

O DRP como documento deve seguir uma estrutura organizada. Tal como o IRP, o DRP e **organizado por tipo de desastre** e define procedimentos específicos para cada cenário.

### Organização por desastre

| Tipo de desastre | Procedimentos específicos | Exemplo |
|------------------|--------------------------|---------|
| **Desastre natural** | Evacuação, proteção de hardware, ativação de site alternativo | Inundacao, terramoto, incêndio |
| **Falha de infraestrutura** | Ativação de redundancias, migração de serviços | Falha elétrica prolongada, falha de AVAC no datacenter |
| **Ciberataque grave** | Isolamento de rede, restauro de backups, análise forense | Ransomware generalizado, comprometimento de Active Directory |
| **Falha de fornecedor crítico** | Ativação de fornecedores alternativos, continuidade degradada | Falha do fornecedor de cloud, falha de telecomunicacoes |
| **Pandemia/crise sanitaria** | Trabalho remoto, redistribuicao de funções, reducao de operações | COVID-19, surto grave |

### Componentes essenciais do documento DRP

```
  ╔═══════════════════════════════════════════════════════════╗
  ║              ESTRUTURA DO DOCUMENTO DRP                   ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║  1. Âmbito e objetivos                                    ║
  ║     └─ Que sistemas e processos estão cobertos            ║
  ║                                                           ║
  ║  2. Criterios de ativação                                 ║
  ║     └─ Quando e como se declara desastre                  ║
  ║                                                           ║
  ║  3. Papeis e responsabilidades                            ║
  ║     └─ Quem faz o que durante a recuperação               ║
  ║                                                           ║
  ║  4. Lista de alerta e contactos                           ║
  ║     └─ Quem avisar, por que ordem                         ║
  ║                                                           ║
  ║  5. Procedimentos por tipo de desastre                    ║
  ║     └─ Ações específicas para cada cenário                ║
  ║                                                           ║
  ║  6. Inventario de recursos                                ║
  ║     └─ Hardware, software, licencas, contratos            ║
  ║                                                           ║
  ║  7. Estratégia de recuperação                             ║
  ║     └─ Sites alternativos, backups, replicação            ║
  ║                                                           ║
  ║  8. Plano de comunicação                                  ║
  ║     └─ Mensagens pré-definidas para cada audiencia        ║
  ║                                                           ║
  ║  9. Plano de testes                                       ║
  ║     └─ Como e quando testar o DRP                         ║
  ║                                                           ║
  ║  10. Histórico de revisoes                                ║
  ║      └─ Quando foi atualizado e por quem                  ║
  ╚═══════════════════════════════════════════════════════════╝
```

### Armazenamento e distribuição

O DRP deve estar disponível **mesmo quando os sistemas normais estão em baixo**. De nada serve ter o plano num servidor que foi destruído pelo desastre.

| Regra | Justificação |
|-------|-------------|
| Copias em múltiplos locais | Se um local e destruído, o plano sobrevive noutro |
| Copias eletronicas **e** em papel | Sistemas eletronicos podem estar indisponíveis |
| Acesso restrito mas garantido | Quem precisa do plano deve conseguir acedi-lo, mesmo em emergência |
| Versão atualizada e controlada | Uma versão desatualizada pode causar mais danos do que ajudar |
| Distribuicao need-to-know | A maioria dos colaboradores só precisa de ver a parte relevante para o seu papel |

---

## 5. Ligação com a BIA e o IRP

O DRP não vive isolado. Faz parte de um **ciclo integrado de planeamento de contingência** que começa na BIA e termina no BCP.

```
  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
  │   BIA   │────►│   IRP   │────►│   DRP   │────►│   BCP   │
  │         │     │         │     │         │     │         │
  │ Analisa │     │ Responde│     │ Recupera│     │ Garante │
  │ impacto │     │ a       │     │ de      │     │ contin. │
  │         │     │ inciden.│     │ desastre│     │         │
  └─────────┘     └─────────┘     └─────────┘     └─────────┘
                                                        │
  ◄────────────────── FEEDBACK ──────────────────────────┘
```

### O que a BIA fornece ao DRP

A BIA e a **base de decisão** do DRP. Sem a BIA, o DRP não saberia o que proteger primeiro.

| Output da BIA | Como o DRP utiliza |
|---------------|-------------------|
| **MTD** (Maximum Tolerable Downtime) | Define o tempo máximo para recuperar cada sistema |
| **RTO** (Recovery Time Objective) | Estabelece o tempo-alvo de recuperação |
| **RPO** (Recovery Point Objective) | Determina a política de backups (frequência, tipo) |
| **Criticidade dos processos** | Prioriza a ordem de recuperação |
| **Dependencias entre sistemas** | Identifica a sequência correta de restauro |
| **Impacto financeiro** | Justifica o investimento em estratégias de recuperação |

### O que o IRP transfere para o DRP

| Situação no IRP | Transicao para DRP |
|-----------------|-------------------|
| Incidente não controlado que escala | Ativação do DRP |
| Múltiplos incidentes simultâneos | Declaracao de desastre |
| Danos que excedem capacidade do IRP | Mobilizacao da equipa DRP |
| Instalacoes comprometidas | Ativação de site alternativo |

> O IRP responde ao incidente. O DRP recupera os sistemas. O BCP garante que a organização contínua a operar.

---

## 6. Exemplos práticos

### Exemplo 1 — Datacenter de empresa de e-commerce inundado

**Cenário:** Uma empresa de e-commerce com faturação anual de 50 milhoes de euros sofre uma inundacao no seu datacenter principal após chuvas torrenciais. O datacenter fica completamente inoperacional. Estamos em novembro, a duas semanas da Black Friday.

| Fase DRP | Ação | Detalhe |
|----------|------|---------|
| **Classificação** | Desastre | Datacenter primário totalmente inutilizavel |
| **Prioridades** | Loja online > gateway de pagamentos > ERP > email | Baseado na BIA: loja online tem MTD de 4 horas |
| **Papeis** | Coordenador DRP ativa equipa de 12 pessoas | CTO lidera; equipas de infra, dev e operações |
| **Alerta** | CEO, fornecedor cloud, transportadora, gateway pagamentos | Contactados nos primeiros 30 minutos |
| **Documentação** | Timeline desde a deteção da inundacao | Responsável designado desde o primeiro momento |
| **Mitigação** | Ativação do hotsite na cloud | Loja online restaurada em 3 horas a partir do hotsite |

**Como interpretar:** *Este cenário ilustra a importância de ter um hotsite configurado e testado. A proximidade da Black Friday torna o tempo de recuperação ainda mais crítico. Sem o hotsite, a empresa perderia potencialmente milhoes em vendas.*

**Para refletir:**

- Se a empresa não tivesse hotsite, que alternativas teria?
- Como e que a BIA influenciou a ordem de recuperação?
- O seguro cobre a perda de vendas durante o downtime?

---

### Exemplo 2 — Hospital atingido por ransomware generalizado

**Cenário:** Um hospital regional com 600 camas descobre num domingo as 03h00 que 90% dos seus servidores foram cifrados por ransomware. Apenas os sistemas de imagiologia e o email (alojado em cloud) escaparam. Ha 200 pacientes internados e 15 em cuidados intensivos.

| Fase DRP | Ação | Detalhe |
|----------|------|---------|
| **Classificação** | Desastre (catastrofe operacional) | 90% dos sistemas indisponíveis; risco para pacientes |
| **Prioridades** | Sistemas clínicos > farmácia > urgencias > administração | Vidas humanas são a prioridade absoluta |
| **Papeis** | Equipa de crise multidisciplinar | Direção clínica + TI + administração + comunicação |
| **Alerta** | Autoridade de saúde, CNPD, polícia judiciária, fornecedores | Notificação as autoridades em menos de 1 hora |
| **Documentação** | Registo forense + registo clínico manual | Duas streams: IT e clínica |
| **Mitigação** | Reverter para processos manuais (papel) | Prescricoes em papel, registos manuais de enfermagem |

**Como interpretar:** *Num hospital, o DRP não é apenas uma questão de TI — e uma questão de vidas. A transição para processos manuais (papel) e uma medida de mitigação crítica que deve ser prevista e treinada no plano. A recuperação técnica só pode avancar em paralelo com a garantia de segurança clínica.*

**Para refletir:**

- Pagar o resgate e uma opcao? Que implicações legais e eticas existem?
- Como funcionam as prescricoes medicas sem sistema informático?
- Que obrigações legais de notificação existem neste caso?

---

### Exemplo 3 — Fábrica com sistema SCADA comprometido

**Cenário:** Uma fábrica de componentes automóveis deteta que o seu sistema SCADA (controlo industrial) está a enviar comandos anómalos as máquinas de produção. Dois robôs industriais executam movimentos fora dos parâmetros normais. A produção e parada de emergência.

| Fase DRP | Ação | Detalhe |
|----------|------|---------|
| **Classificação** | Desastre (risco físico) | Risco de dano a equipamento e segurança de pessoas |
| **Prioridades** | Segurança física > isolamento SCADA > restauro de controlo > produção | Primeiro: garantir que ninguém se magoa |
| **Papeis** | Engenharia industrial + IT + segurança física | Coordenação entre mundos OT e IT |
| **Alerta** | Diretor fábrica, fornecedor SCADA, seguradora, autoridades | Contactos industriais e de segurança |
| **Documentação** | Logs SCADA, video de vigilância, registos de alarmes | Evidência para investigação e seguro |
| **Mitigação** | Paragem total da produção; isolamento da rede OT | Desconectar completamente rede OT da rede IT |

**Como interpretar:** *Em ambientes industriais, o DRP cruza-se com a segurança física. Um comprometimento do SCADA pode causar danos materiais ou até humanos. A separação entre rede IT e rede OT (Operational Technology) e uma medida fundamental que o DRP deve prever.*

---

## 7. Exercícios

### Nível 1 — Compreensão

**Exercício 1.1 — Verdadeiro ou Falso**

Classifique cada afirmação como **Verdadeira (V)** ou **Falsa (F):**

1. O DRP e ativado sempre que ocorre um incidente de segurança.
2. A equipa de planeamento de contingência deve definir os critérios que distinguem um incidente de um desastre.
3. O objetivo do DRP e restabelecer operações num site alternativo.
4. A lista de alerta deve ser testada periodicamente.
5. A documentação do desastre só começa após a recuperação estar concluída.
6. O DRP pode ser ativado simultaneamente com o BCP.
7. As prioridades de recuperação devem ser definidas durante o desastre, não antes.
8. A mitigação de impacto e uma etapa obrigatória que deve ser sempre executada.

??? success "Solução 1.1"

    1. **Falso.** O DRP só e ativado quando a situação e classificada como desastre, não para incidentes normais (esses são tratados pelo IRP).
    2. **Verdadeiro.** A equipa de contingência deve definir claramente os critérios de classificação entre incidente e desastre.
    3. **Falso.** O objetivo do DRP e restabelecer operações no **site primário**. E o BCP que gere as operações num site alternativo.
    4. **Verdadeiro.** Uma lista de alerta desatualizada ou não testada pode falhar no momento crítico.
    5. **Falso.** A documentação deve começar **desde o primeiro momento** do desastre.
    6. **Verdadeiro.** Em situações graves, o BCP e o DRP podem funcionar em paralelo — o BCP mantendo operações e o DRP recuperando infraestrutura.
    7. **Falso.** As prioridades devem ser **predefinidas** com base na BIA, não improvisadas durante a crise.
    8. **Falso.** A mitigação deve ser tentada **se e apenas se for possível**. Ha situações em que não há margem para mitigar.

---

**Exercício 1.2 — Associar conceitos**

Associe cada elemento da coluna A com a descrição correta da coluna B:

| Coluna A | Coluna B |
|----------|----------|
| 1. Alert roster | a) Documento que regista todas as ações durante o desastre |
| 2. Hotsite | b) Lista sequencial de contactos a acionar em caso de desastre |
| 3. MTD | c) Tempo máximo que a organização tolera sem um sistema |
| 4. Documentação | d) Instalacao totalmente operacional pronta para ser ativada |
| 5. Coordenador DRP | e) Pessoa que lidera toda a operação de recuperação |

??? success "Solução 1.2"

    1-b, 2-d, 3-c, 4-a, 5-e

---

### Nível 2 — Aplicação prática

**Exercício 2.1 — Classificar a situação**

Para cada cenário, indique se se trata de um **não-desastre**, **emergência**, **desastre** ou **catastrofe**:

1. O servidor de email fica indisponível durante 2 horas por falha de hardware.
2. Um incêndio destrói completamente o datacenter principal e os escritorios adjacentes.
3. Uma falha elétrica afeta o datacenter durante 30 minutos (o UPS aguentou, o gerador não arrancou).
4. Um ataque de ransomware cifra 95% dos servidores e os backups locais.
5. Um colaborador derruba cafe no switch principal do piso 3.

??? success "Solução 2.1"

    1. **Não-desastre** — Perturbacao limitada, resolução rápida por substituição de hardware.
    2. **Catastrofe** — Destruicao total das instalacoes, requer reconstrução completa.
    3. **Emergência** — Potencial de se tornar desastre (se o gerador não arrancasse e o UPS terminasse), mas ficou controlada.
    4. **Desastre** — Sistemas inutilizaveis por período prolongado, sem backups locais para restauro rápido.
    5. **Não-desastre** — Falha isolada de um equipamento, substituição rápida (mesmo que cause incomodo temporário).

---

**Exercício 2.2 — Definir a ordem de recuperação**

Uma PME de serviços financeiros tem os seguintes sistemas. Com base nos valores MTD indicados, defina a **ordem de recuperação** e justifique:

| Sistema | MTD |
|---------|-----|
| Email corporativo | 24 horas |
| Sistema de trading | 1 hora |
| Website institucional | 72 horas |
| Active Directory | 2 horas |
| Sistema de compliance | 8 horas |
| Sistema de backups | 4 horas |

??? success "Solução 2.2"

    **Ordem de recuperação (por MTD crescente):**

    1. **Sistema de trading** (MTD: 1h) — sem este sistema, a empresa não consegue operar. E o core business.
    2. **Active Directory** (MTD: 2h) — sem AD, ninguém consegue autenticar-se para usar os outros sistemas. E um pré-requisito técnico.
    3. **Sistema de backups** (MTD: 4h) — necessário para restaurar os outros sistemas. Sem backups, não há recuperação possível.
    4. **Sistema de compliance** (MTD: 8h) — obrigação regulatória; atrasos podem resultar em multas.
    5. **Email corporativo** (MTD: 24h) — importante para comunicação mas existem alternativas temporarias (telefone, messaging).
    6. **Website institucional** (MTD: 72h) — o menos crítico; impacto reputacional mas não operacional.

    **Nota importante:** A ordem de recuperação não depende apenas do MTD. O Active Directory, por exemplo, pode ter de ser recuperado **antes** do sistema de trading, porque o trading depende do AD para autenticação — mesmo que o MTD do trading seja menor.

---

### Nível 3 — Análise avancada

**Exercício 3.1 — Cenário completo**

Uma universidade sofre um terramoto de magnitude 5.2 que danifica estruturalmente o edifício do datacenter. Os servidores sobreviveram mas o edifício foi declarado inseguro pelas autoridades — ninguém pode entrar. O semestre está a meio e 8.000 alunos dependem da plataforma de e-learning para entregas de trabalhos (prazo: próxima semana). A universidade tem um contrato warmsite com um fornecedor a 50 km de distância.

**Tarefas:**

a) Classifique a situação (nível de disrupcao).
b) Defina as primeiras 5 ações da equipa DRP nas primeiras 2 horas.
c) Identifique pelo menos 3 desafios específicos na ativação do warmsite.
d) Proponha um plano de comunicação para os 3 publicos principais.

??? success "Solução 3.1"

    **a) Classificação:** **Desastre** — As instalacoes estão inutilizaveis (impossível aceder ao datacenter) mas não foram destruidas. Os servidores estão intactos mas inacessiveis. Se o edifício fosse destruído, seria catastrofe.

    **b) Primeiras 5 ações (2 horas):**

    1. Verificar segurança de todas as pessoas (prioridade absoluta)
    2. Ativar lista de alerta: contactar coordenador DRP, equipa técnica, reitoria
    3. Contactar fornecedor do warmsite para iniciar ativação
    4. Avaliar se e possível aceder remotamente aos servidores (se a rede ainda funcionar e o edifício tiver energia)
    5. Preparar comunicação para alunos e docentes sobre a situação

    **c) Desafios na ativação do warmsite:**

    - O warmsite não tem os dados mais recentes — será necessário restaurar a partir de backups offsite (qual o RPO?)
    - Configuração e instalação de software leva tempo (warmsite não está totalmente pronto como um hotsite)
    - Distância de 50 km pode complicar logística da equipa técnica
    - Licencas de software podem não estar previstas para o site alternativo
    - Largura de banda no warmsite pode ser inferior a do datacenter principal

    **d) Plano de comunicação:**

    | Público | Mensagem-chave | Canal | Quando |
    |---------|---------------|-------|--------|
    | **Alunos** | "Serviços temporariamente indisponíveis. Prazos de entrega adiados. Atualizacoes via email pessoal e redes sociais." | Email pessoal, redes sociais, site institucional (se acessível) | Primeiras 4 horas |
    | **Docentes** | "Situação sob controlo. Plataformas em recuperação. Instrucoes para prazos e avaliações alternativas seguem em 24h." | Email pessoal, telefone para diretores de curso | Primeiras 2 horas |
    | **Media/público** | "A universidade ativou o seu plano de recuperação de desastres. Não há feridos. Serviços em restauro." | Comunicado de imprensa, site institucional | Primeiras 6 horas |

---

## 8. Armadilhas e confusões a evitar

### 1. "DRP e IRP são a mesma coisa"

**Errado.** O IRP responde a incidentes — situações graves mas controladas. O DRP lida com desastres — situações que excedem a capacidade do IRP. São complementares, não substituiveis.

| | IRP | DRP |
|-|-----|-----|
| Ativa quando... | Ocorre um incidente de segurança | O incidente escala para desastre ou ocorre desastre físico |
| Foco | Conter e resolver o incidente | Recuperar sistemas e operações |
| Equipa | Equipa de resposta a incidentes | Equipa de recuperação de desastres |
| Duração típica | Horas a poucos dias | Dias a semanas |

---

### 2. "O DRP e só um problema de TI"

**Errado.** O DRP envolve toda a organização. A gestão de crise inclui comunicação, recursos humanos, questões legais, relacoes com fornecedores e apoio aos colaboradores e suas familias. A componente técnica e importante, mas não é a única.

---

### 3. "Temos backups, logo temos DRP"

**Errado.** Backups são **uma parte** da estratégia de recuperação, não o plano completo. Um DRP precisa de:

- Prioridades definidas
- Papeis atribuidos
- Procedimentos documentados
- Lista de alerta atualizada
- Estratégia de comunicação
- Testes regulares
- E sim, backups funcionais e testados

---

### 4. "O DRP só precisa de ser criado, não testado"

**Errado.** Um DRP não testado e apenas um documento. Só os testes revelam falhas no plano — contactos desatualizados, backups corrompidos, tempos de recuperação irrealistas, dependências não previstas.

---

### 5. "O DRP e o BCP são a mesma coisa"

**Errado.** O DRP foca-se na **recuperação técnica** para restabelecer operações no site primário. O BCP foca-se na **continuidade do negócio** — manter funções críticas ativas, possivelmente num site alternativo, enquanto o DRP trabalha na recuperação.

| | DRP | BCP |
|-|-----|-----|
| Objetivo | Recuperar infraestrutura original | Manter operações em funcionamento |
| Foco temporal | Curto prazo | Medio e longo prazo |
| Lideranca | TI / CISO | CEO / Direção |
| Ativação | Imediata após desastre | Quando o desastre afeta funções críticas |

---

### 6. "Podemos definir prioridades durante o desastre"

**Errado.** Sob pressão, as decisões tendem a ser subotimas. As prioridades devem ser definidas **antes** do desastre, com base em dados objetivos da BIA (MTD, RTO, criticidade). Durante o desastre, a equipa executa — não planeia.

---

## 9. Resumo rápido

### Tabela de sintese

| Conceito | Descrição |
|----------|-----------|
| **DRP** | Plano para preparação, resposta e recuperação de desastres |
| **Desastre vs incidente** | Desastre = impacto prolongado, requer DRP. Incidente = tratado pelo IRP |
| **5 etapas** | Prioridades, papeis, alerta, documentação, mitigação |
| **Categorias de disrupcao** | Não-desastre, emergência, desastre, catastrofe |
| **Alert roster** | Lista sequencial de contactos a acionar |
| **Ligação BIA→DRP** | MTD e RTO definem prioridades e tempos de recuperação |
| **Ligação IRP→DRP** | Incidente que escala ativa o DRP |
| **Ligação DRP→BCP** | DRP recupera infraestrutura; BCP garante continuidade |

### Frases-chave para recordar

- *"O DRP não é para quando algo corre mal. E para quando tudo corre mal."*
- *"Num desastre, a primeira necessidade não é fazer tudo; e saber o que fazer primeiro."*
- *"O IRP responde ao incidente. O DRP recupera os sistemas. O BCP garante a continuidade."*
- *"Backups sem DRP são como um extintor sem saber onde está a saida de emergência."*
- *"Um DRP não testado e apenas papel com boas intencoes."*

### Próximo passo

Agora que compreende os fundamentos do DRP, avance para:

- [Estratégias de recuperação](estrategias.md) — hot/warm/cold sites, recuperação de hardware, software, pessoal e dados
- [Gestão de crise](gestao-crise.md) — comunicação, stakeholders e lideranca durante o desastre
- [Testes e manutenção](testes.md) — como testar e manter o DRP atualizado
- [Casos práticos](casos-praticos.md) — cenários completos de DRP em diferentes setores
