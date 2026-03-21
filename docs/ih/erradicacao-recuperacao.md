# Erradicação, Recuperação e Follow-up

## Índice

1. [Visão geral](#1-visao-geral)
2. [Erradicação](#2-erradicacao)
3. [Ações de erradicação por tipo de incidente](#3-acoes-de-erradicacao-por-tipo-de-incidente)
4. [Recuperação](#4-recuperacao)
5. [Validação e certificação](#5-validacao-e-certificacao)
6. [Follow-up e análise pós-incidente](#6-follow-up-e-analise-pos-incidente)
7. [O ciclo contínuo de melhoria](#7-o-ciclo-continuo-de-melhoria)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)

---

## 1. Visão geral

Após a contenção de um incidente, restam três fases críticas que fecham o ciclo de resposta: **Erradicação**, **Recuperação** e **Follow-up**. Estas fases garantem que a ameaça é completamente eliminada, que os serviços voltam ao normal de forma segura e que a organização aprende com o que aconteceu.

> Conter um incidente não é resolvê-lo. Sem erradicação completa, sem recuperação validada e sem análise pós-incidente, o mesmo problema pode repetir-se — muitas vezes de forma mais grave.

```
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║           FASES FINAIS DO CICLO DE RESPOSTA A INCIDENTES            ║
  ╠═══════════════════════════════════════════════════════════════════════╣
  ║                                                                     ║
  ║   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         ║
  ║   │              │    │              │    │              │         ║
  ║   │ ERRADICAÇÃO  │───►│ RECUPERAÇÃO  │───►│  FOLLOW-UP   │         ║
  ║   │              │    │              │    │              │         ║
  ║   │ Eliminar a   │    │ Restaurar    │    │ Analisar e   │         ║
  ║   │ causa raiz   │    │ serviços     │    │ melhorar     │         ║
  ║   └──────────────┘    └──────────────┘    └──────┬───────┘         ║
  ║                                                   │                 ║
  ║                                                   ▼                 ║
  ║                                           ┌──────────────┐         ║
  ║                                           │  PREPARAÇÃO  │         ║
  ║                                           │  (volta ao   │         ║
  ║                                           │   início)    │         ║
  ║                                           └──────────────┘         ║
  ╚═══════════════════════════════════════════════════════════════════════╝
```

| Fase | Objetivo principal | Pergunta-chave |
|------|-------------------|----------------|
| **Erradicação** | Remover completamente a ameaça | *A causa raiz foi eliminada?* |
| **Recuperação** | Restaurar operações normais | *Os sistemas estão seguros e funcionais?* |
| **Follow-up** | Aprender e melhorar | *O que correu bem e o que deve mudar?* |

---

## 2. Erradicação

A **erradicação** consiste na remoção completa da ameaça do ambiente afetado. As ações dependem diretamente do tipo e natureza do incidente, mas seguem um padrão geral de limpeza, correção e validação.

### 2.1 Limpeza (Cleanup)

A limpeza envolve todas as ações necessárias para eliminar vestígios do atacante ou da ameaça:

| Ação | Descrição | Prioridade |
|------|-----------|------------|
| **Terminar processos maliciosos** | Parar/matar todos os processos ativos do atacante | Imediata |
| **Eliminar ficheiros falsos** | Apagar ficheiros criados pelo atacante (arquivar primeiro para investigação) | Alta |
| **Remover backdoors** | Eliminar todas as backdoors e programas maliciosos instalados | Crítica |
| **Aplicar patches** | Corrigir vulnerabilidades em todos os SO, servidores e dispositivos de rede | Alta |
| **Corrigir configurações** | Retificar definições incorretas (ex.: misconfigurações em firewalls e routers) | Alta |
| **Atualizar credenciais** | Alterar passwords de todas as contas que possam ter sido comprometidas | Crítica |

!!! danger "Quando a limpeza não é suficiente"
    Em alguns casos, a limpeza pontual **não garante** que a ameaça foi eliminada. Quando a extensão dos danos é incerta, pode ser necessário:

    - **Reconstruir o sistema operativo** a partir do zero
    - **Substituir o disco rígido** (em casos de rootkits persistentes)
    - **Reformatar todos os suportes infetados** e reinstalar a partir de backups limpos

### 2.2 Notificação durante a erradicação

A notificação é uma atividade transversal a toda a erradicação. Deve incluir:

- Pessoal relevante **acima** do gestor do SIRT (gestão de topo, direção)
- Pessoal relevante **abaixo** do gestor do SIRT (operadores, administradores de sistemas)
- Terceiros conforme o procedimento de escalação

```
  ┌─────────────────────────────────────────────────────┐
  │            FLUXO DE NOTIFICAÇÃO                     │
  │                                                     │
  │         ┌──────────────────┐                        │
  │         │  Gestão de topo  │  ◄── Resumo executivo  │
  │         └────────┬─────────┘                        │
  │                  │                                  │
  │                  ▼                                  │
  │         ┌──────────────────┐                        │
  │         │  Gestor SIRT     │  ◄── Coordena tudo     │
  │         └────────┬─────────┘                        │
  │                  │                                  │
  │         ┌────────┴─────────┐                        │
  │         ▼                  ▼                        │
  │  ┌─────────────┐  ┌──────────────┐                 │
  │  │ Operadores  │  │ Terceiros /  │                 │
  │  │ e admins    │  │ Escalação    │                 │
  │  └─────────────┘  └──────────────┘                 │
  └─────────────────────────────────────────────────────┘
```

### 2.3 Infeção por vírus

Em cenários de infeção viral, a erradicação requer ações específicas:

1. **Inocular** todos os sistemas e suportes infetados, seguindo os avisos do fabricante de antivírus
2. **Verificar que os backups estão limpos** — sem está verificação, a restauração pode reintroduzir a infeção
3. **Utilizar ferramentas de scanning de segurança** para detetar intrusões; aplicar as soluções recomendadas
4. **Manter as ferramentas atualizadas** — ferramentas desatualizadas podem não detetar variantes recentes

!!! warning "Backups contaminados"
    Um dos erros mais graves na erradicação é assumir que os backups estão limpos sem os verificar. Um backup contaminado pode reintroduzir a ameaça imediatamente após a restauração, anulando todo o trabalho de erradicação.

### 2.4 Patches e correções

Antes de restaurar sistemas:

- **Testar exaustivamente** os patches antes de os aplicar em produção
- Corrigir vulnerabilidades em **todos** os dispositivos — SO, servidores, equipamentos de rede
- Validar que as correções não introduzem novos problemas

!!! tip "Regra de ouro"
    Nunca restaurar um sistema sem antes corrigir a vulnerabilidade que permitiu o incidente. Caso contrário, a janela de reincidência permanece aberta.

---

## 3. Ações de erradicação por tipo de incidente

As ações de erradicação variam significativamente conforme o tipo de incidente. A tabela seguinte apresenta as ações-chave para os cenários mais comuns:

| Tipo de incidente | Ações de erradicação principais | Considerações especiais |
|-------------------|--------------------------------|------------------------|
| **Ransomware** | Isolar sistemas afetados; remover executáveis maliciosos; verificar persistência no registo e tarefas agendadas; aplicar patches | Verificar se existem dados exfiltrados (double extortion); reformatar se necessário |
| **Data breach** | Identificar e fechar o vetor de acesso; revogar tokens e credenciais comprometidas; corrigir a vulnerabilidade explorada | Avaliar obrigação de notificação ao abrigo do RGPD (72h); preservar evidências |
| **Malware genérico** | Executar ferramentas AV/EDR atualizadas; remover ficheiros maliciosos; limpar chaves de registo modificadas | Verificar propagação lateral; confirmar que backups estão limpos |
| **Acesso não autorizado** | Desativar contas comprometidas; alterar todas as passwords; rever permissões e ACLs; fechar portas de acesso indevido | Auditar logs para determinar o alcance do acesso; verificar criação de contas falsas |

```
  ┌───────────────────────────────────────────────────────────────┐
  │          DECISÃO: LIMPEZA vs. RECONSTRUÇÃO                   │
  │                                                               │
  │   O alcance dos danos é                                       │
  │   totalmente conhecido?                                       │
  │          │                                                    │
  │     ┌────┴────┐                                               │
  │     │         │                                               │
  │    SIM       NÃO                                              │
  │     │         │                                               │
  │     ▼         ▼                                               │
  │  ┌────────┐ ┌──────────────────────────┐                     │
  │  │Limpeza │ │ Reformatar e reinstalar  │                     │
  │  │pontual │ │ a partir de backup limpo │                     │
  │  └────────┘ └──────────────────────────┘                     │
  └───────────────────────────────────────────────────────────────┘
```

**Para refletir:**

- *Se um atacante instalou uma backdoor num servidor, basta remover a backdoor ou é necessário reconstruir o sistema?*
- *Como garantir que um backup utilizado na reinstalação não contém a mesma ameaça?*
- *Qual é o custo de erradicar de forma incompleta versus o custo de reconstruir o sistema?*

---

## 4. Recuperação

A **recuperação** é o processo de restauração dos serviços e operações normais, baseado nos **planos de contingência** da organização. Não se trata de "ligar tudo outra vez" — é um processo metódico e controlado.

### 4.1 Avaliação de danos

Antes de qualquer restauração, é necessário realizar uma **avaliação de danos** (damage assessment):

- Que sistemas foram afetados?
- Que dados foram perdidos, corrompidos ou comprometidos?
- Que serviços estão indisponíveis?
- Qual é o impacto operacional e financeiro?

### 4.2 Restauração de serviços

A restauração segue um processo por fases, de forma controlada:

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║          PROCESSO DE RESTAURAÇÃO POR FASES                   ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Fase 1: Reinstalar ficheiros/sistemas a partir de           ║
  ║          fonte fidedigna (trusted source)                    ║
  ║                         │                                     ║
  ║                         ▼                                     ║
  ║  Fase 2: Restaurar funções e serviços por ordem de           ║
  ║          prioridade (mais essenciais primeiro)               ║
  ║                         │                                     ║
  ║                         ▼                                     ║
  ║  Fase 3: Desativar serviços desnecessários                   ║
  ║          (reduzir superfície de ataque)                      ║
  ║                         │                                     ║
  ║                         ▼                                     ║
  ║  Fase 4: Validar e testar cada fase antes de avançar         ║
  ║                         │                                     ║
  ║                         ▼                                     ║
  ║  Fase 5: Registar todas as ações realizadas                  ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! info "Ordem de prioridade"
    A restauração segue a ordem de **procura/necessidade** (demand) — os serviços mais essenciais para a organização são restaurados primeiro. Exemplos típicos de prioridade:

    1. Serviços de autenticação e diretório (AD, LDAP)
    2. DNS e infraestrutura de rede core
    3. Email e comunicações internas
    4. Sistemas de negócio críticos
    5. Aplicações secundárias e serviços de suporte

### 4.3 Princípios da recuperação

| Princípio | Descrição |
|-----------|-----------|
| **Fonte fidedigna** | Reinstalar apenas a partir de fontes verificadas e limpas |
| **Abordagem faseada** | Restaurar por etapas, nunca tudo de uma vez |
| **Serviços mínimos** | Desativar tudo o que não é estritamente necessário |
| **Registo completo** | Documentar cada ação — quem fez o quê, quando e porquê |
| **Validação contínua** | Testar após cada fase antes de avançar para a seguinte |

---

## 5. Validação e certificação

Após a restauração, é fundamental **validar e certificar** que os sistemas estão operacionais e seguros. Esta fase é frequentemente subestimada, mas é o que separa uma recuperação bem-sucedida de uma falsa sensação de normalidade.

### 5.1 O que validar

| Aspeto | Verificação |
|--------|-------------|
| **Funcionalidade** | Os sistemas executam todas as funções esperadas? |
| **Segurança** | As vulnerabilidades foram corrigidas? Os patches estão aplicados? |
| **Integridade** | Os dados restaurados estão íntegros e consistentes? |
| **Performance** | Os sistemas operam dentro dos parâmetros normais? |
| **Conectividade** | As comunicações entre sistemas funcionam corretamente? |

### 5.2 Notificação de retoma

Após a validação, deve ser feita a **notificação a todas as partes relacionadas** sobre a retoma das operações:

- **Operadores e administradores** de sistemas
- **Gestão de topo** (senior management)
- **Todas as partes envolvidas** no procedimento de escalação
- **Utilizadores finais** afetados pelo incidente

!!! tip "Comunicação clara"
    A notificação de retoma deve incluir: o que aconteceu (resumo), o que foi feito, o estado atual dos sistemas e quaisquer limitações temporárias que possam existir.

---

## 6. Follow-up e análise pós-incidente

O **follow-up** deve começar o mais rapidamente possível após a resolução do incidente. É uma das fases mais importantes — e uma das mais frequentemente ignoradas.

### 6.1 Quem deve participar

A análise pós-incidente deve envolver:

- **Gestão** (decisões estratégicas e alocação de recursos)
- **Utilizadores** (perspetiva operacional e impacto real)
- **Equipa de resposta a incidentes on-site** (detalhes técnicos)

### 6.2 Análise pós-mortem

A análise pós-mortem (post-mortem analysis) visa identificar áreas de melhoria. As questões fundamentais são:

> As configurações e procedimentos atuais são suficientes? A deteção ocorreu de forma atempada? As comunicações foram adequadas?

| Questão | Objetivo |
|---------|----------|
| As configurações e procedimentos atuais são suficientes? | Avaliar a eficácia das defesas existentes |
| A deteção ocorreu de forma atempada? | Medir a rapidez de identificação |
| As comunicações foram adequadas? | Verificar se a informação fluiu corretamente |
| É necessária uma auditoria de segurança externa? | Determinar necessidade de avaliação independente |
| Qual foi o custo financeiro ou informacional? | Quantificar o impacto real do incidente |
| A formação/educação dos utilizadores é adequada? | Identificar lacunas de awareness |
| O incidente requer alguma ação legal? | Avaliar implicações jurídicas |

### 6.3 Processo de follow-up

```
  ┌───────────────────────────────────────────────────────────────┐
  │             PROCESSO DE FOLLOW-UP                             │
  │                                                               │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 1. Elaborar rascunho da análise pós-mortem  │             │
  │  └────────────────────┬────────────────────────┘             │
  │                       ▼                                       │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 2. Envolver todas as partes para comentar   │             │
  │  │    o rascunho                                │             │
  │  └────────────────────┬────────────────────────┘             │
  │                       ▼                                       │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 3. Determinar a fraqueza ou vulnerabilidade │             │
  │  │    subjacente                                │             │
  │  └────────────────────┬────────────────────────┘             │
  │                       ▼                                       │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 4. Enviar resumo executivo com              │             │
  │  │    recomendações à gestão                    │             │
  │  └────────────────────┬────────────────────────┘             │
  │                       ▼                                       │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 5. Gestão avalia e seleciona recomendações  │             │
  │  │    para implementação                        │             │
  │  └────────────────────┬────────────────────────┘             │
  │                       ▼                                       │
  │  ┌─────────────────────────────────────────────┐             │
  │  │ 6. Reconhecer/recompensar quem reportou o   │             │
  │  │    incidente e quem contribuiu para a        │             │
  │  │    resposta bem-sucedida                     │             │
  │  └─────────────────────────────────────────────┘             │
  └───────────────────────────────────────────────────────────────┘
```

!!! danger "Vulnerabilidade subjacente"
    Se a **fraqueza ou vulnerabilidade subjacente** não for determinada, o incidente pode repetir-se. Este é o passo mais crítico de todo o follow-up — sem ele, todo o processo de melhoria fica comprometido.

### 6.4 Reconhecimento e recompensa

Um aspeto frequentemente esquecido: é importante **reconhecer e recompensar** quem:

- **Reportou o incidente** — incentiva a cultura de reporte
- **Contribuiu para a resposta** — motiva a participação futura

**Como interpretar:** *Sem reconhecimento, os colaboradores podem hesitar em reportar incidentes futuros por receio de consequências negativas ou por sentirem que o seu esforço não é valorizado.*

---

## 7. O ciclo contínuo de melhoria

O follow-up não termina com o relatório. O passo seguinte é **voltar à fase de Preparação** para implementar as recomendações aprovadas pela gestão. Isto cria um **ciclo contínuo de melhoria**.

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              CICLO CONTÍNUO DE MELHORIA                      ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║              ┌──────────────┐                                 ║
  ║         ┌───►│  PREPARAÇÃO  │◄────────────────┐              ║
  ║         │    └──────┬───────┘                  │              ║
  ║         │           ▼                          │              ║
  ║         │    ┌──────────────┐                  │              ║
  ║         │    │  DETEÇÃO &   │                  │              ║
  ║         │    │  ANÁLISE     │                  │              ║
  ║         │    └──────┬───────┘                  │              ║
  ║         │           ▼                          │              ║
  ║         │    ┌──────────────┐                  │              ║
  ║         │    │  CONTENÇÃO   │           ┌──────┴───────┐     ║
  ║         │    └──────┬───────┘           │  FOLLOW-UP   │     ║
  ║         │           ▼                   │  (Lições     │     ║
  ║         │    ┌──────────────┐           │  aprendidas) │     ║
  ║         │    │ ERRADICAÇÃO  │           └──────┬───────┘     ║
  ║         │    └──────┬───────┘                  │              ║
  ║         │           ▼                          │              ║
  ║         │    ┌──────────────┐                  │              ║
  ║         │    │ RECUPERAÇÃO  │──────────────────┘              ║
  ║         │    └──────────────┘                                 ║
  ║         │                                                     ║
  ║         └── Implementar recomendações ──────────              ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
```

| Entrada do follow-up | Saída para a preparação |
|----------------------|------------------------|
| Vulnerabilidade identificada | Aplicação de patches e hardening |
| Falha na deteção | Melhoria de ferramentas de monitorização |
| Comunicação deficiente | Revisão dos procedimentos de escalação |
| Formação insuficiente | Programas de awareness e treino |
| Ausência de plano | Criação/atualização de planos de resposta |

**Para refletir:**

- *Se a gestão não implementar as recomendações do follow-up, qual é o valor real de toda a análise pós-incidente?*
- *Como medir se o ciclo de melhoria está realmente a funcionar?*

---

## 8. Exemplos práticos

### Exemplo 1: Ransomware num hospital

**Cenário:** Um hospital sofre um ataque de ransomware que encripta os sistemas de registos clínicos. A contenção isolou os segmentos de rede afetados.

**Erradicação:**

- Identificação e remoção dos executáveis do ransomware em 47 workstations
- Verificação de mecanismos de persistência (tarefas agendadas, chaves de registo)
- Aplicação de patch para a vulnerabilidade explorada (SMB não atualizado)
- Reset de todas as passwords de contas de domínio
- Verificação dos backups — os backups dos últimos 3 dias estavam contaminados; utilizado backup de 5 dias antes

**Recuperação:**

- Fase 1: Restauração do Active Directory e DNS (4 horas)
- Fase 2: Restauração do sistema de registos clínicos (8 horas)
- Fase 3: Restauração do email e comunicações (2 horas)
- Fase 4: Restauração de aplicações administrativas (6 horas)
- Validação de integridade dos dados clínicos com a equipa médica

**Follow-up:**

- Análise pós-mortem revelou que o vetor de entrada foi um email de phishing
- Recomendações: implementar MFA, formação de awareness para todos os funcionários, segmentação de rede reforçada, política de backups offline

---

### Exemplo 2: Data breach numa empresa de e-commerce

**Cenário:** Uma empresa de e-commerce deteta exfiltração de dados de clientes através de uma vulnerabilidade SQL injection no portal web. A contenção bloqueou o acesso do atacante.

**Erradicação:**

- Correção da vulnerabilidade SQL injection no código da aplicação
- Auditoria completa do código para identificar vulnerabilidades semelhantes
- Revogação de todos os tokens de API e sessões ativas
- Implementação de WAF (Web Application Firewall) com regras específicas

**Recuperação:**

- Restauração do portal web com o código corrigido
- Reativação progressiva de funcionalidades (consulta → carrinho → pagamento)
- Desativação de funcionalidades antigas não essenciais
- Monitorização intensiva durante as primeiras 72 horas

**Follow-up:**

- Notificação à CNPD ao abrigo do RGPD (dentro das 72 horas)
- Notificação aos clientes afetados
- Análise pós-mortem identificou ausência de revisão de código e testes de segurança
- Recomendações: pipeline de CI/CD com SAST/DAST, programa de bug bounty, formação em desenvolvimento seguro

---

## 9. Exercícios

### Exercício 1 — Plano de erradicação

Uma universidade descobre que um servidor web foi comprometido. O atacante instalou uma web shell, criou uma conta de administrador falsa e modificou ficheiros do website. A contenção isolou o servidor da rede.

> Elabore um plano de erradicação ordenado por prioridade, justificando a ordem escolhida.

??? success "Solução 1"
    **Plano de erradicação por prioridade:**

    1. **Terminar processos maliciosos** (Imediata) — A web shell pode ainda estar ativa em memória, mesmo com o servidor isolado.
    2. **Remover a conta de administrador falsa** (Imediata) — Elimina o acesso privilegiado do atacante.
    3. **Arquivar e depois eliminar ficheiros maliciosos** (Alta) — A web shell e ficheiros modificados devem ser preservados para investigação forense e depois removidos.
    4. **Alterar todas as passwords** (Alta) — Todas as contas que existiam no servidor devem ter as credenciais alteradas, incluindo contas de serviço.
    5. **Aplicar patches à vulnerabilidade explorada** (Alta) — Corrigir o vetor de entrada (ex.: vulnerabilidade no CMS, componente desatualizado).
    6. **Verificar se há backdoors adicionais** (Alta) — Utilizar ferramentas de scanning para procurar outros artefactos maliciosos.
    7. **Validar integridade dos backups** (Média) — Garantir que os backups disponíveis estão limpos antes de qualquer restauração.
    8. **Decidir: limpeza ou reconstrução** (Média) — Se existir dúvida sobre a extensão do comprometimento, reformatar e reinstalar a partir de backup limpo.

    *A ordem prioriza a eliminação de acessos ativos do atacante, depois a remoção de artefactos, e finalmente a correção da causa raiz.*

---

### Exercício 2 — Ordem de recuperação

Uma organização com os seguintes serviços precisa de os restaurar após um incidente:

- Portal de clientes (e-commerce)
- Sistema de email
- Active Directory
- Base de dados de inventário
- Website institucional
- VPN para trabalho remoto

> Defina a ordem de restauração e justifique cada posição.

??? success "Solução 2"
    **Ordem de restauração:**

    | Ordem | Serviço | Justificação |
    |-------|---------|--------------|
    | 1.º | **Active Directory** | Todos os outros serviços dependem da autenticação centralizada. Sem AD, nada funciona. |
    | 2.º | **VPN** | Permite que a equipa técnica remota participe na recuperação dos restantes serviços. |
    | 3.º | **Sistema de email** | Comunicação interna é essencial para coordenar a recuperação e informar stakeholders. |
    | 4.º | **Base de dados de inventário** | Suporte às operações internas e ao portal de clientes. |
    | 5.º | **Portal de clientes** | Depende da base de dados; restaurar após a infraestrutura de suporte estar operacional. |
    | 6.º | **Website institucional** | Menor impacto operacional; pode ser substituído temporariamente por uma página estática. |

    *A ordem segue o princípio de dependências (serviços base primeiro) e prioridade operacional (mais essenciais primeiro).*

---

### Exercício 3 — Análise pós-mortem

Leia o cenário seguinte e responda às perguntas de follow-up:

Um colaborador recebeu um email de phishing, clicou no link e introduziu as suas credenciais num site falso. O atacante usou essas credenciais para aceder à VPN da empresa, moveu-se lateralmente pela rede durante 3 dias antes de ser detetado, e exfiltrou 2 GB de dados financeiros.

> Responda às 7 questões da análise pós-mortem para este cenário.

??? success "Solução 3"
    | Questão | Resposta para este cenário |
    |---------|---------------------------|
    | **Configurações e procedimentos suficientes?** | Não. A ausência de MFA na VPN permitiu o acesso com credenciais roubadas. As regras de deteção de movimento lateral eram insuficientes. |
    | **Deteção atempada?** | Não. O atacante esteve na rede durante 3 dias sem ser detetado, o que indica falhas na monitorização e nos alertas. |
    | **Comunicações adequadas?** | A avaliar — depende de como a equipa foi informada após a deteção. Se houve atrasos na escalação, as comunicações foram inadequadas. |
    | **Auditoria externa necessária?** | Sim. Dado o volume de dados exfiltrados (2 GB financeiros), uma auditoria independente é recomendável para avaliar o alcance total. |
    | **Custo financeiro/informacional?** | Exfiltração de 2 GB de dados financeiros — potencial impacto regulatório (RGPD), perda de confiança de clientes, custos de notificação e remediação. |
    | **Formação adequada?** | Não. O colaborador caiu num ataque de phishing, o que indica necessidade de formação em awareness de segurança e exercícios de phishing simulado. |
    | **Ação legal necessária?** | Provável. A exfiltração de dados financeiros pode constituir violação do RGPD, exigindo notificação à CNPD e possíveis processos contra o atacante. |

---

## 10. Armadilhas e confusões a evitar

!!! danger "1. Confundir contenção com erradicação"
    A contenção **limita o dano** — a erradicação **remove a causa**. Isolar um servidor da rede é contenção. Remover o malware e corrigir a vulnerabilidade é erradicação. Parar na contenção deixa a ameaça intacta.

!!! danger "2. Restaurar sem erradicar"
    Restaurar serviços antes de completar a erradicação pode reativar a ameaça. Se a backdoor ainda existir quando o sistema voltar à rede, o atacante recupera o acesso imediatamente.

!!! danger "3. Assumir que os backups estão limpos"
    Backups podem conter a mesma ameaça que se está a tentar eliminar. **Todos os backups devem ser verificados** antes de serem usados na restauração. Se necessário, recuar vários dias ou semanas até encontrar um backup limpo.

!!! warning "4. Ignorar o follow-up"
    Muitas organizações consideram o incidente "resolvido" após a recuperação e nunca realizam a análise pós-mortem. Sem follow-up, as mesmas vulnerabilidades persistem e os incidentes repetem-se.

!!! warning "5. Follow-up sem implementação"
    Realizar a análise pós-mortem e produzir recomendações sem as implementar é tão ineficaz como não fazer follow-up. As recomendações devem ser **aprovadas e executadas** pela gestão.

!!! warning "6. Restaurar tudo ao mesmo tempo"
    Tentar restaurar todos os serviços simultaneamente aumenta o risco de falhas em cascata e dificulta a identificação de problemas. A restauração deve ser **faseada e validada** a cada etapa.

---

## 11. Resumo rápido

| Fase | Ações-chave | Resultado esperado |
|------|------------|-------------------|
| **Erradicação** | Terminar processos maliciosos; remover backdoors e ficheiros; aplicar patches; alterar credenciais; reformatar se necessário | Ameaça completamente eliminada |
| **Recuperação** | Avaliar danos; restaurar por fases a partir de fonte fidedigna; desativar serviços desnecessários; registar tudo | Serviços operacionais e seguros |
| **Validação** | Testar funcionalidade, segurança, integridade e performance; notificar retoma | Certificação de que tudo está normal |
| **Follow-up** | Análise pós-mortem; identificar causa raiz; recomendações à gestão; reconhecer contribuições | Lições aprendidas documentadas |
| **Ciclo de melhoria** | Implementar recomendações na fase de Preparação | Organização mais resiliente |

!!! info "O essencial"
    A erradicação elimina a ameaça. A recuperação restaura a normalidade. O follow-up garante que a organização evolui. Juntas, estas três fases fecham o ciclo — e a implementação das recomendações abre o próximo, criando um processo de **melhoria contínua**.

---

Próximos passos: Explore os [Casos Práticos](casos-praticos.md) para aplicar estas fases em cenários completos de resposta a incidentes.
