# Testes e Manutenção do DRP

## Índice

1. [Porque testar o DRP](#1-porque-testar-o-drp)
2. [Tipos de testes](#2-tipos-de-testes)
3. [Frequência e planeamento](#3-frequencia-e-planeamento)
4. [Manutenção e atualização](#4-manutencao-e-atualizacao)
5. [Auditoria do DRP](#5-auditoria-do-drp)
6. [Exemplos práticos](#6-exemplos-praticos)
7. [Exercícios](#7-exercicios)
8. [Armadilhas e confusões a evitar](#8-armadilhas-e-confusoes-a-evitar)
9. [Resumo rápido](#9-resumo-rapido)

---

## 1. Porque testar o DRP

Um DRP que nunca foi testado e apenas um documento com boas intencoes. Os testes são essenciais porque revelam problemas que ninguém antecipou durante o planeamento.

> "O objetivo dos testes e melhorar a resposta — nunca encontrar culpados."

```
  ╔═══════════════════════════════════════════════════════════╗
  ║           PORQUE TESTAR O DRP?                            ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║  ● Contactos desatualizados na lista de alerta            ║
  ║  ● Backups corrompidos ou incompletos                     ║
  ║  ● Tempos de recuperação irrealistas                      ║
  ║  ● Dependencias entre sistemas não previstas              ║
  ║  ● Procedimentos ambiguos ou incompletos                  ║
  ║  ● Pessoal que não conhece o seu papel                    ║
  ║  ● Hardware incompativel no site alternativo              ║
  ║  ● Licencas de software invalidas no site de recuperação  ║
  ║  ● Falhas de comunicação entre equipas                    ║
  ║  ● Documentação desatualizada ou inacessível              ║
  ╚═══════════════════════════════════════════════════════════╝
```

O teste transforma o DRP de um documento teórico numa ferramenta prática validada. Sem teste, não há confiança de que o plano funciona.

---

## 2. Tipos de testes

Existem cinco tipos principais de testes para o DRP, organizados por **complexidade crescente, custo crescente e realismo crescente**:

```
  ┌─────────────────────────────────────────────────────────────┐
  │           TIPOS DE TESTES (COMPLEXIDADE CRESCENTE)           │
  │                                                              │
  │  ┌──────────────────┐                                       │
  │  │ 1. Checklist      │  Simples, baixo custo                │
  │  └──────┬───────────┘                                       │
  │         ▼                                                    │
  │  ┌──────────────────┐                                       │
  │  │ 2. Structured     │  Discussão em sala                   │
  │  │    Walk-Through   │  (tabletop)                          │
  │  └──────┬───────────┘                                       │
  │         ▼                                                    │
  │  ┌──────────────────┐                                       │
  │  │ 3. Simulação      │  Cenário simulado sem                │
  │  │                   │  impacto real                        │
  │  └──────┬───────────┘                                       │
  │         ▼                                                    │
  │  ┌──────────────────┐                                       │
  │  │ 4. Teste paralelo │  Sistemas de recuperação             │
  │  │                   │  ativados em paralelo                │
  │  └──────┬───────────┘                                       │
  │         ▼                                                    │
  │  ┌──────────────────┐                                       │
  │  │ 5. Interrupcao    │  Produção transferida                │
  │  │    total          │  para site alternativo               │
  │  └──────────────────┘  Máximo realismo e risco              │
  └─────────────────────────────────────────────────────────────┘
```

### 1. Teste de checklist

O teste mais simples. Copias do DRP são distribuidas aos gestores de cada área, que **revisam o plano** e verificam se a informação está correta e completa.

| Aspeto | Detalhe |
|--------|---------|
| **O que se faz** | Cada gestor le o plano e verifica contactos, procedimentos, inventarios |
| **Custo** | Muito baixo |
| **Disrupcao** | Nenhuma |
| **O que revela** | Informação desatualizada, lacunas óbvias, contactos errados |
| **Limitação** | Não testa se o plano funciona na prática |

---

### 2. Structured walk-through (tabletop)

A equipa reune-se numa sala e **percorre o plano passo a passo**, discutindo cada fase e cada decisão. Um cenário hipotetico e apresentado e a equipa discute como responderia.

| Aspeto | Detalhe |
|--------|---------|
| **O que se faz** | Reuniao de 2-4 horas com cenário simulado; equipa discute cada passo |
| **Custo** | Baixo (tempo dos participantes) |
| **Disrupcao** | Nenhuma (apenas discussão) |
| **O que revela** | Ambiguidades nos procedimentos, conflitos de papeis, lacunas logicas |
| **Limitação** | Não testa a execução real; não revela problemas técnicos |

**Exemplo de cenário tabletop:**

> *"São 15h30 de sexta-feira. O SIEM deteta encriptacao em massa em 40 servidores simultaneamente. O analista confirma ransomware. O Active Directory parece comprometido. O que faz cada um de voces?"*

A equipa discute:

- Quem declara desastre?
- Quem contacta quem?
- Que sistemas se isolam primeiro?
- Como se comunica com os 500 colaboradores (se o email está em baixo)?
- Quando se contacta a polícia judiciária?

---

### 3. Simulação

Um cenário de desastre e **simulado** com ações reais mas sem afetar os sistemas de produção. Pode envolver deslocacao ao site alternativo, teste de comunicações e ativação parcial de procedimentos.

| Aspeto | Detalhe |
|--------|---------|
| **O que se faz** | Simular o desastre com ações reais (deslocar equipa, testar comunicações, verificar backups) |
| **Custo** | Medio (tempo, deslocacao, recursos) |
| **Disrupcao** | Minima (produção não é afetada) |
| **O que revela** | Problemas logisticos, falhas de comunicação, tempos reais de resposta |
| **Limitação** | Não testa a transferência real de produção |

---

### 4. Teste paralelo

Os sistemas de recuperação são **ativados em paralelo** com os sistemas de produção. A produção contínua no site primário enquanto o site alternativo e testado com dados reais.

| Aspeto | Detalhe |
|--------|---------|
| **O que se faz** | Ativar site alternativo, restaurar dados, verificar que tudo funciona — sem desligar a produção |
| **Custo** | Alto (ativação real de infraestrutura alternativa) |
| **Disrupcao** | Baixa (produção contínua normal) |
| **O que revela** | Se o site alternativo realmente funciona; tempos reais de recuperação; problemas de compatibilidade |
| **Limitação** | Não testa a transferência real de utilizadores e carga |

---

### 5. Teste de interrupção total (full interruption)

O teste mais realista e mais arriscado. A produção e **efetivamente transferida** do site primário para o site alternativo. O site primário e desligado durante o teste.

| Aspeto | Detalhe |
|--------|---------|
| **O que se faz** | Desligar produção no site primário; operar exclusivamente no site alternativo |
| **Custo** | Muito alto (risco real, recursos significativos) |
| **Disrupcao** | Alta (produção pode ser afetada se o teste falhar) |
| **O que revela** | Se o plano funciona na realidade, sob condições reais |
| **Limitação** | Risco de falha real; só recomendado para organizações maduras |

### Comparação de tipos de teste

| Tipo | Custo | Disrupcao | Realismo | Recomendado para |
|------|-------|-----------|----------|------------------|
| Checklist | Muito baixo | Nenhuma | Baixo | Primeira validação; revisoes periódicas |
| Walk-through | Baixo | Nenhuma | Medio-baixo | Validação de lógica e papeis |
| Simulação | Medio | Minima | Medio | Organizacoes em maturacao |
| Paralelo | Alto | Baixa | Alto | Organizacoes com site alternativo |
| Interrupcao total | Muito alto | Alta | Máximo | Organizacoes maduras; infraestruturas críticas |

---

## 3. Frequência e planeamento

### Quando testar

| Evento | Ação |
|--------|------|
| **Anualmente** | Teste completo (mínimo walk-through; idealmente simulação ou paralelo) |
| **Após mudanca significativa** | Novo sistema crítico, mudanca de datacenter, nova equipa, fusao/aquisicao |
| **Após incidente real** | Validar que as lições aprendidas foram incorporadas no plano |
| **Após revisão do plano** | Confirmar que as alterações funcionam na prática |
| **Trimestralmente** | Revisão de checklist (contactos, inventarios) |

> Os testes devem acontecer **pelo menos uma vez por ano**, ou sempre que ocorra uma **mudanca significativa** na organização ou nos sistemas.

### Progresso gradual

Uma organização que nunca testou o DRP deve começar pelos testes mais simples e progredir:

```
  ╔══════════════════════════════════════════════════════════╗
  ║           PROGRESSAO DE TESTES                           ║
  ╠══════════════════════════════════════════════════════════╣
  ║                                                          ║
  ║  Ano 1:  Checklist + Walk-through                        ║
  ║          └─ Validar informação e lógica do plano          ║
  ║                                                          ║
  ║  Ano 2:  Walk-through + Simulação                        ║
  ║          └─ Testar resposta da equipa e comunicação       ║
  ║                                                          ║
  ║  Ano 3:  Simulação + Teste paralelo                      ║
  ║          └─ Validar infraestrutura alternativa            ║
  ║                                                          ║
  ║  Ano 4+: Teste paralelo (anual)                          ║
  ║          + Interrupcao total (quando maduro)              ║
  ╚══════════════════════════════════════════════════════════╝
```

---

## 4. Manutenção e atualização

O DRP e um **documento vivo** que precisa de ser atualizado regularmente. Um plano desatualizado pode ser pior do que não ter plano, porque gera uma **falsa sensação de segurança**.

### O que desatualiza o DRP

| Tipo de mudanca | Impacto no DRP | Exemplo |
|----------------|---------------|---------|
| **Mudanca de pessoal** | Contactos errados; papeis por atribuir | Coordenador DRP saiu da empresa |
| **Mudanca de infraestrutura** | Procedimentos de recuperação invalidos | Migração para cloud; novo datacenter |
| **Novo sistema crítico** | Sistema não coberto pelo DRP | Implementação de novo ERP |
| **Mudanca de fornecedor** | SLAs e contactos desatualizados | Mudanca de fornecedor de cloud |
| **Mudanca regulatória** | Requisitos legais não cumpridos | Nova diretiva NIS2; alterações ao RGPD |
| **Mudanca organizacional** | Estrutura de decisão invalida | Fusao, aquisicao, reestruturacao |

### Processo de manutenção

```
  ┌───────────────────────────────────────────────────────┐
  │           CICLO DE MANUTENCAO DO DRP                   │
  │                                                        │
  │  ┌──────────────┐    ┌──────────────┐                 │
  │  │  Revisão     │───►│ Identificar  │                 │
  │  │  periodica   │    │ alterações   │                 │
  │  │  (trimestral)│    │ necessárias  │                 │
  │  └──────────────┘    └──────┬───────┘                 │
  │                              │                         │
  │  ┌──────────────┐    ┌──────────────┐                 │
  │  │  Registar    │◄───│  Atualizar   │                 │
  │  │  no histórico│    │  o plano     │                 │
  │  │  de revisoes │    │              │                 │
  │  └──────┬───────┘    └──────────────┘                 │
  │         │                                              │
  │         ▼                                              │
  │  ┌──────────────┐    ┌──────────────┐                 │
  │  │  Distribuir  │───►│  Testar      │                 │
  │  │  versão      │    │  alterações  │                 │
  │  │  atualizada  │    │              │                 │
  │  └──────────────┘    └──────────────┘                 │
  └───────────────────────────────────────────────────────┘
```

### Histórico de revisoes

O DRP deve manter um **registo de todas as alterações**:

| Data | Versão | Alteração | Responsável | Motivo |
|------|--------|-----------|-------------|--------|
| 2025-01-15 | 3.0 | Revisão completa após migração para cloud | J. Silva | Mudanca de infraestrutura |
| 2025-04-01 | 3.1 | Atualização de contactos e lista de alerta | M. Santos | Saida do coordenador DRP |
| 2025-07-15 | 3.2 | Inclusao de novo ERP nos procedimentos | A. Costa | Novo sistema crítico |
| 2025-10-01 | 3.3 | Atualização pós-teste simulação | P. Ferreira | Lições do teste anual |

---

## 5. Auditoria do DRP

A **auditoria** do DRP e realizada por um **observador externo** (terceiro independente) que verifica se os componentes do plano estão a ser executados e se são eficazes.

### Diferença entre teste, exercício e auditoria

| Atividade | Quem faz | Objetivo | Foco |
|-----------|----------|----------|------|
| **Teste** | Equipa interna | Validar que o plano funciona | Eficacia técnica |
| **Exercício/drill** | Colaboradores | Treinar as pessoas a executar o plano | Preparação humana |
| **Auditoria** | Terceiro independente | Verificar conformidade e eficácia | Conformidade e melhoria |

### O que a auditoria verifica

| Área | Questoes típicas |
|------|-----------------|
| **Documentação** | O plano está completo, atualizado e acessível? |
| **Testes** | Os testes são realizados com a frequência adequada? Os resultados são documentados? |
| **Papeis** | Os papeis estão atribuidos? As pessoas conhecem as suas responsabilidades? |
| **Backups** | Os backups são testados? Cumprem o RPO definido na BIA? |
| **Site alternativo** | O site alternativo está operacional? Foi testado recentemente? |
| **Comunicação** | Os canais de comunicação alternativos existem e foram testados? |
| **Conformidade** | O plano cumpre os requisitos regulatorios (NIS2, RGPD, ISO 22301)? |
| **Melhoria contínua** | As lições aprendidas de testes e incidentes são incorporadas? |

---

## 6. Exemplos práticos

### Exemplo 1 — Walk-through que revelou falhas críticas

**Cenário:** Uma empresa de logística com 300 colaboradores realiza o seu primeiro exercício tabletop. O cenário apresentado e: "As 07h00 de segunda-feira, o datacenter fica sem eletricidade. O UPS aguenta 30 minutos. O gerador não arranca."

**Falhas descobertas durante o walk-through:**

| Falha | Impacto potencial | Ação corretiva |
|-------|-------------------|----------------|
| Número do coordenador DRP no plano era o antigo (mudou há 6 meses) | Ninguem conseguiria contactar o coordenador | Atualizar contactos; implementar revisão trimestral |
| Ninguem na sala sabia onde estavam as chaves do gerador | Impossibilidade de verificar ou reparar o gerador | Documentar localização de chaves e procedimento de acesso |
| O plano dizia "restaurar do backup mais recente" sem dizer onde está o backup | Equipa não saberia onde ir buscar os dados | Documentar localização, credenciais e procedimento de acesso aos backups |
| Dois gestores achavam que "o outro" era responsável por contactar o fornecedor de cloud | Ninguem contactaria o fornecedor | Clarificar papeis e eliminar ambiguidade |
| O plano não mencionava o sistema de GPS dos veiculos (crítico para a operação) | Sistema crítico não seria recuperado | Incluir todos os sistemas críticos no DRP |

**Como interpretar:** *Um exercício tabletop de 3 horas revelou 5 falhas críticas que teriam sido catastroficas num desastre real. O custo do exercício foi mínimo (tempo das pessoas); o custo de não o ter feito poderia ser enorme.*

---

### Exemplo 2 — Teste paralelo com surpresa

**Cenário:** Um banco regional realiza um teste paralelo anual do seu DRP. O hotsite e ativado com sucesso e os sistemas de core banking são restaurados em 4 horas (dentro do RTO de 6 horas). No entanto, ao testar o acesso dos utilizadores, a equipa descobre que o sistema de autenticação multifator (MFA) não funciona no hotsite porque depende de um servidor RADIUS que não estava replicado.

```
  ┌─────────────────────────────────────────────────────────┐
  │              RESULTADO DO TESTE PARALELO                  │
  │                                                           │
  │  ✓ Core banking restaurado em 4h (RTO: 6h)               │
  │  ✓ Base de dados restaurada do backup (RPO: 1h)           │
  │  ✓ Comunicacoes de rede operacionais                      │
  │  ✗ MFA não funciona (servidor RADIUS não replicado)       │
  │  ✗ Utilizadores não conseguem autenticar-se               │
  │  ✗ Sem MFA, regulador não permite operação bancária       │
  │                                                           │
  │  Conclusão: Sistemas restaurados mas INUTILIZAVEIS        │
  │  sem autenticação. Dependencia crítica não identificada.   │
  └─────────────────────────────────────────────────────────┘
```

**Como interpretar:** *Este teste revelou uma dependência crítica que não estava documentada. Se fosse um desastre real, o banco teria os sistemas operacionais mas ninguém conseguiria usa-los. O teste paralelo — mais realista que o tabletop — foi o único tipo de teste que teria revelado este problema.*

**Para refletir:**

- Quantas dependências "escondidas" existem nos sistemas da sua organização?
- O servidor RADIUS deveria ter sido identificado na BIA. Porque não foi?
- Este teste justifica o custo de um teste paralelo vs apenas um tabletop?

---

## 7. Exercícios

### Nível 1 — Compreensão

**Exercício 1.1 — Ordenar os tipos de teste**

Ordene os seguintes tipos de teste por **complexidade crescente**:

a) Teste paralelo
b) Checklist
c) Simulação
d) Interrupcao total
e) Structured walk-through

??? success "Solução 1.1"

    Ordem por complexidade crescente:

    1. **b) Checklist** — Revisão documental, sem interação
    2. **e) Structured walk-through** — Discussão em sala sobre cenário hipotetico
    3. **c) Simulação** — Ações simuladas sem afetar produção
    4. **a) Teste paralelo** — Ativação real do site alternativo em paralelo com produção
    5. **d) Interrupcao total** — Transferencia real da produção para o site alternativo

---

**Exercício 1.2 — Verdadeiro ou Falso**

1. O objetivo dos testes e encontrar culpados quando algo falha.
2. Um teste de checklist valida que o DRP funciona na prática.
3. O teste de interrupção total e o mais realista mas também o mais arriscado.
4. Os testes devem ser realizados pelo menos uma vez por ano.
5. Após uma mudanca significativa na organização, o DRP deve ser revisto e testado.
6. A auditoria do DRP e feita pela própria equipa que escreveu o plano.

??? success "Solução 1.2"

    1. **Falso.** O objetivo e **melhorar a resposta**, nunca encontrar culpados.
    2. **Falso.** O teste de checklist apenas valida que a informação está correta e completa. Não testa a execução prática.
    3. **Verdadeiro.** A produção e realmente transferida, o que da o máximo realismo mas também o máximo risco.
    4. **Verdadeiro.** A frequência mínima recomendada e anual.
    5. **Verdadeiro.** Mudancas significativas (novos sistemas, novo pessoal, mudanca de infraestrutura) podem invalidar partes do plano.
    6. **Falso.** A auditoria deve ser feita por um **terceiro independente** para garantir objetividade.

---

### Nível 2 — Aplicação prática

**Exercício 2.1 — Escolher o tipo de teste**

Para cada situação, recomende o tipo de teste mais adequado e justifique:

1. A empresa acabou de criar o seu primeiro DRP e nunca o testou.
2. Uma infraestrutura crítica nacional (rede elétrica) precisa de validar o DRP após uma grande atualização.
3. Uma PME quer validar que os contactos da lista de alerta estão atualizados.
4. Um hospital quer treinar a nova equipa de gestão de crise.

??? success "Solução 2.1"

    1. **Checklist + Walk-through** — Comecar pelo mais simples. O checklist valida a informação e o walk-through testa a lógica. Não faz sentido fazer um teste paralelo se nunca se validou o básico.
    2. **Teste paralelo ou interrupção total** — Infraestruturas críticas precisam do máximo realismo. Após uma grande atualização, só um teste que ative realmente os sistemas pode confirmar que tudo funciona.
    3. **Checklist** — Se o objetivo e apenas validar contactos, o checklist e suficiente e eficiente.
    4. **Walk-through (tabletop)** — Ideal para treinar novas equipas. Permite discutir papeis, procedimentos e decisões sem risco operacional.

---

**Exercício 2.2 — Planear o programa de testes**

Uma empresa de média dimensão (200 colaboradores, 1 datacenter, 1 warmsite) nunca testou o DRP. O orcamento para testes e limitado. Proponha um programa de testes para os próximos 3 anos.

??? success "Solução 2.2"

    | Ano | Tipo de teste | Objetivo | Custo estimado |
    |-----|--------------|----------|---------------|
    | **Ano 1 — Q1** | Checklist | Validar informação do plano (contactos, inventarios, procedimentos) | Baixo (2-3 dias de trabalho) |
    | **Ano 1 — Q3** | Walk-through | Treinar equipa de crise; testar lógica dos procedimentos | Baixo (1 dia de reunião) |
    | **Ano 2 — Q1** | Checklist | Revalidar após correções do ano anterior | Baixo |
    | **Ano 2 — Q2** | Simulação | Testar comunicações, deslocacao ao warmsite, restauro de backups | Medio (2-3 dias, custos de deslocacao) |
    | **Ano 2 — Q4** | Walk-through | Cenário diferente; foco em gestão de crise e comunicação | Baixo |
    | **Ano 3 — Q1** | Checklist | Revisão periodica | Baixo |
    | **Ano 3 — Q2** | Teste paralelo | Ativar warmsite, restaurar sistemas, validar tempos de recuperação | Alto (ativação real de infraestrutura) |
    | **Ano 3 — Q4** | Walk-through | Revisão pós-teste; cenário complexo | Baixo |

    **Justificação:** Progressão gradual de complexidade. Os checklists trimestrais mantem a informação atualizada. Os walk-throughs anuais treinam a equipa. A simulação (ano 2) e o teste paralelo (ano 3) aumentam progressivamente o realismo.

---

## 8. Armadilhas e confusões a evitar

### 1. "Fizemos o teste uma vez, estamos cobertos"

**Errado.** Os testes devem ser **regulares e progressivos**. Um teste feito há 3 anos com uma equipa que já não existe não prova nada. O DRP muda, as pessoas mudam, os sistemas mudam — os testes devem acompanhar.

---

### 2. "O teste foi um sucesso, não precisamos de mudar nada"

**Suspeito.** Se um teste não revelou nenhum problema, pode significar que o teste não foi suficientemente rigoroso. Mesmo testes bem-sucedidos devem gerar **recomendações de melhoria**.

---

### 3. "Teste = exercício = auditoria"

**Errado.** São atividades diferentes:

- **Teste:** Verifica se o plano funciona (foco técnico)
- **Exercício/drill:** Treina as pessoas a executar o plano (foco humano)
- **Auditoria:** Observador externo verifica conformidade (foco de governance)

---

### 4. "Não temos orcamento para testes"

**Parcialmente válido, mas não é desculpa.** Um teste de checklist custa zero (além do tempo). Um walk-through custa uma reunião. Mesmo com orcamento limitado, há sempre um nível de teste possível.

---

### 5. "O teste falhou, o plano e mau"

**Errado.** O teste revelou problemas — e e exatamente para isso que serve. Um teste que "falha" e um teste que **cumpriu o seu objetivo**. O problema seria não ter testado e descobrir os problemas durante um desastre real.

---

### 6. "Basta testar os sistemas técnicos"

**Incompleto.** Os testes devem cobrir também a **comunicação**, os **papeis e responsabilidades**, a **logística** e o **apoio ao pessoal**. Sistemas técnicos funcionais são inuteis se ninguém sabe o que fazer com eles.

---

## 9. Resumo rápido

### Tabela de sintese

| Conceito | Descrição |
|----------|-----------|
| **5 tipos de teste** | Checklist, walk-through, simulação, paralelo, interrupção total |
| **Frequência mínima** | Anual, ou após mudanca significativa |
| **Objetivo** | Melhorar a resposta, nunca encontrar culpados |
| **Progressão** | Comecar simples, aumentar complexidade com maturidade |
| **Manutenção** | Revisão trimestral de contactos; atualização após mudancas |
| **Auditoria** | Terceiro independente verifica conformidade e eficácia |
| **Histórico** | Registar todas as revisoes, testes e alterações |

### Frases-chave para recordar

- *"Um DRP não testado e apenas papel com boas intencoes."*
- *"O objetivo dos testes e melhorar a resposta — nunca encontrar culpados."*
- *"Se o teste não revelou problemas, o teste não foi rigoroso o suficiente."*
- *"Testar o DRP e barato. Não testar e que sai caro."*
- *"Comecar com um checklist e melhor do que esperar pelo teste perfeito."*
