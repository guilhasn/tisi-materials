# Incident Handling - Fundamentos

## Índice

1. [Visão geral](#1-visao-geral)
2. [Taxonomia: evento, evento adverso, incidente e ataque](#2-taxonomia-evento-evento-adverso-incidente-e-ataque)
3. [Exemplos de incidentes de segurança](#3-exemplos-de-incidentes-de-seguranca)
4. [Porquê gerir incidentes?](#4-porque-gerir-incidentes)
5. [Como responder a um incidente](#5-como-responder-a-um-incidente)
6. [O modelo de 7 passos](#6-o-modelo-de-7-passos)
7. [Relação com o IRP, DRP e BCP](#7-relacao-com-o-irp-drp-e-bcp)
8. [Exemplos práticos](#8-exemplos-praticos)
9. [Exercícios](#9-exercicios)
10. [Armadilhas e confusões a evitar](#10-armadilhas-e-confusoes-a-evitar)
11. [Resumo rápido](#11-resumo-rapido)
12. [📎 Templates e documentos operacionais (download)](#12-templates-e-documentos-operacionais)

---

## 1. Visão geral

O **Incident Handling** (gestão de incidentes de segurança) é o conjunto de processos contínuos que governam as atividades que ocorrem **antes, durante e após** um incidente de segurança.

> O Incident Handling não começa quando o incidente acontece. Começa muito antes — com planeamento, preparação, ferramentas e treino.

```
  ╔══════════════════════════════════════════════════════════════╗
  ║              INCIDENT HANDLING                                ║
  ╠══════════════════════════════════════════════════════════════╣
  ║                                                              ║
  ║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      ║
  ║   │    ANTES     │  │   DURANTE    │  │    APÓS      │      ║
  ║   │              │  │              │  │              │      ║
  ║   │  Planear     │  │  Detetar     │  │  Aprender    │      ║
  ║   │  Preparar    │  │  Conter      │  │  Melhorar    │      ║
  ║   │  Treinar     │  │  Investigar  │  │  Reportar    │      ║
  ║   │  Equipar     │  │  Erradicar   │  │              │      ║
  ║   │              │  │  Recuperar   │  │              │      ║
  ║   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      ║
  ║          │                 │                 │               ║
  ║          ▼                 ▼                 ▼               ║
  ║     Preparação       Resposta ativa    Follow-up             ║
  ║     contínua         ao incidente      e lições              ║
  ╚══════════════════════════════════════════════════════════════╝
```

### Incident Handling vs Incident Response

| Conceito | Descrição |
|----------|-----------|
| **Incident Handling** | Processo **completo** — inclui planeamento, preparação, resposta e follow-up |
| **Incident Response** | Componente do Incident Handling — foca-se nas ações **durante** o incidente |

> O Incident Handling é o programa. O Incident Response é a execução durante a crise.

---

## 2. Taxonomia: evento, evento adverso, incidente e ataque

Uma das bases do Incident Handling é classificar corretamente o que está a acontecer. Nem tudo é um incidente, e nem todo o incidente é um ataque.

### Hierarquia de classificação

```
  ┌─────────────────────────────────────────────────────────────┐
  │           HIERARQUIA DE CLASSIFICAÇÃO                        │
  │                                                              │
  │   ┌──────────────────────────────────────────┐               │
  │   │  EVENTO                                  │               │
  │   │  Ocorrência observável num sistema        │               │
  │   │  ou rede                                  │               │
  │   │                                           │               │
  │   │  Ex: utilizador liga-se a file share,     │               │
  │   │  servidor recebe pedido HTTP              │               │
  │   │                                           │               │
  │   │  ┌────────────────────────────────────┐   │               │
  │   │  │  EVENTO ADVERSO                    │   │               │
  │   │  │  Evento com consequência negativa  │   │               │
  │   │  │                                    │   │               │
  │   │  │  Ex: flood de pacotes, falha de    │   │               │
  │   │  │  autenticação repetida             │   │               │
  │   │  │                                    │   │               │
  │   │  │  ┌──────────────────────────────┐  │   │               │
  │   │  │  │  INCIDENTE DE SEGURANÇA      │  │   │               │
  │   │  │  │  Evento adverso que ameaça   │  │   │               │
  │   │  │  │  a CIA (Confidencialidade,   │  │   │               │
  │   │  │  │  Integridade, Disponibil.)   │  │   │               │
  │   │  │  │                              │  │   │               │
  │   │  │  │  ┌────────────────────────┐  │  │   │               │
  │   │  │  │  │  ATAQUE               │  │  │   │               │
  │   │  │  │  │  Tentativa deliberada  │  │  │   │               │
  │   │  │  │  │  de comprometer um     │  │  │   │               │
  │   │  │  │  │  ativo                 │  │  │   │               │
  │   │  │  │  └────────────────────────┘  │  │   │               │
  │   │  │  └──────────────────────────────┘  │   │               │
  │   │  └────────────────────────────────────┘   │               │
  │   └──────────────────────────────────────────┘               │
  └─────────────────────────────────────────────────────────────┘
```

### Definições formais

| Conceito | Definição | Exemplo |
|----------|-----------|---------|
| **Evento** | Ocorrência observável num sistema ou rede | Utilizador envia email; firewall bloqueia conexão |
| **Evento adverso** | Evento com consequência negativa | Flood de pacotes; acesso não autorizado a dados sensíveis |
| **Incidente de segurança** | Evento adverso que ameaça a disponibilidade, integridade ou confidencialidade | Ransomware encripta servidores; exfiltração de dados de clientes |
| **Ataque** | Tentativa deliberada de destruir, expor, alterar, desativar, roubar ou obter acesso não autorizado a um ativo | Botnet executa DDoS; atacante explora vulnerabilidade zero-day |

### Eventos adversos por tipo de plano

Nem todos os eventos adversos são tratados pelo mesmo plano:

| Tipo de evento adverso | Plano responsável |
|------------------------|------------------|
| Roubo e intrusão física | **IRP** (Incident Response Plan) |
| Flood de pacotes / DDoS | **IRP** |
| Acesso não autorizado a dados | **IRP** |
| Web defacement | **IRP** |
| Execução de malware | **IRP** |
| Penetração/intrusão em sistemas | **IRP** |
| Crash de sistemas | **DRP** (Disaster Recovery Plan) |
| Falha de linha de dados | **DRP** |
| Disrupção de energia | **DRP** |
| Desastres naturais (inundações, sismos) | **DRP** / **BCP** |

!!! info "Distinção fundamental"
    Os eventos adversos relacionados com **segurança da informação** (ataques, malware, intrusões) são tratados pelo IRP. Os eventos adversos relacionados com **manutenção de sistemas e desastres** (falhas, crashes, catástrofes naturais) são tratados pelo DRP e BCP.

---

## 3. Exemplos de incidentes de segurança

### Cenários típicos

| Cenário | Tipo | Impacto |
|---------|------|---------|
| Atacante comanda botnet para DDoS a servidor web, causando crash | Ataque à disponibilidade | Serviço indisponível |
| Utilizadores abrem "relatório trimestral" que é malware; conexões a host externo | Engenharia social + malware | Comprometimento de endpoints |
| Atacante obtém dados sensíveis e ameaça divulgar publicamente | Exfiltração + extorsão | Perda de confidencialidade |
| Utilizador usa credenciais de outro para aceder a sistema não autorizado | Acesso não autorizado | Violação de integridade e confidencialidade |
| Malware destrói dados em servidores de ficheiros | Ataque destrutivo | Perda de dados |
| Atacante faz defacement do website institucional | Web defacement | Dano reputacional |

### A realidade do dia a dia

Apesar de todos os esforços para manter os sistemas seguros, diariamente ocorrem:

- **Malware, Botnets, Phishing, Zero-days**
- **Ransomware, Ataques DDoS**
- **Web Defacement, Data Breaches e Data Disclosures**

> Os incidentes acontecem. Podem afetar indivíduos, pequenas e grandes empresas, e até nações. Podem gerar perdas elevadas, perda de reputação e até colocar em causa a existência de organizações. Podem comprometer a liberdade das pessoas e a soberania dos estados.

---

## 4. Porquê gerir incidentes?

### A questão não é "se", mas "quando"

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║       PORQUÊ INVESTIR EM INCIDENT HANDLING?                    ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ● Não é uma questão de SE a organização vai sofrer um       ║
  ║     incidente, mas QUANDO                                     ║
  ║                                                               ║
  ║   ● O Incident Response é um investimento essencial para      ║
  ║     a sobrevivência das organizações                          ║
  ║                                                               ║
  ║   ● Enorme dependência de computadores nas empresas           ║
  ║     modernas — logo, incidentes são frequentes                ║
  ║                                                               ║
  ║   ● Não é apenas uma questão técnica:                         ║
  ║     ├── Relações públicas                                     ║
  ║     ├── Recursos humanos                                      ║
  ║     ├── Operações e logística                                 ║
  ║     └── Responsabilidades legais                              ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Benefícios de ter um plano de IR

| Benefício | Descrição |
|-----------|-----------|
| **Resposta sistemática** | Tomar as medidas certas, no momento certo |
| **Recuperação mais rápida** | Procedimentos pré-definidos reduzem o tempo de resposta |
| **Minimizar perda de dados** | Contenção rápida limita a extensão do dano |
| **Aprender com cada incidente** | Lições aprendidas melhoram a postura de segurança |
| **Conformidade legal** | Tratar questões legais que possam surgir |
| **Preservar reputação** | Resposta profissional protege a imagem da organização |

### Partes externas envolvidas

O Incident Handling não é apenas interno. Frequentemente envolve **partes externas**:

```
  ┌─────────────────────────────────────────────────────────────┐
  │            PARTES EXTERNAS NO INCIDENT HANDLING               │
  │                                                              │
  │   ┌──────────────────────┐  ┌──────────────────────┐        │
  │   │  Forças policiais    │  │  CERT/CSIRT          │        │
  │   │  (PJ, GNR, PSP)     │  │  nacional            │        │
  │   └──────────────────────┘  └──────────────────────┘        │
  │                                                              │
  │   ┌──────────────────────┐  ┌──────────────────────┐        │
  │   │  Reguladores         │  │  Fornecedores de     │        │
  │   │  (CNPD, ANACOM,     │  │  serviços (ISP,      │        │
  │   │   BdP, CMVM)        │  │  cloud, hosting)     │        │
  │   └──────────────────────┘  └──────────────────────┘        │
  │                                                              │
  │   ┌──────────────────────┐  ┌──────────────────────┐        │
  │   │  Empresas forenses   │  │  Seguradoras         │        │
  │   │  (investigação       │  │  (ciber-seguros)     │        │
  │   │   especializada)     │  │                      │        │
  │   └──────────────────────┘  └──────────────────────┘        │
  │                                                              │
  │   ┌──────────────────────┐  ┌──────────────────────┐        │
  │   │  Media               │  │  Clientes e          │        │
  │   │  (comunicação        │  │  parceiros           │        │
  │   │   pública)           │  │  afetados            │        │
  │   └──────────────────────┘  └──────────────────────┘        │
  └─────────────────────────────────────────────────────────────┘
```

---

## 5. Como responder a um incidente

Quando um incidente é detetado, as primeiras ações são críticas. Seguem-se os **princípios fundamentais de resposta imediata**:

### Ações imediatas (primeiros minutos)

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║         RESPOSTA IMEDIATA — PRIMEIROS MINUTOS                  ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   1. MANTER A CALMA                                           ║
  ║      Desligar o computador da Internet e parar qualquer       ║
  ║      trabalho adicional na máquina                            ║
  ║                                                               ║
  ║   2. ISOLAR                                                   ║
  ║      Isolar temporariamente o host/sistema comprometido       ║
  ║      para prevenir danos adicionais e impedir que seja        ║
  ║      usado para atacar outros sistemas                        ║
  ║                                                               ║
  ║   3. REGISTAR                                                 ║
  ║      Tomar notas claras: data/hora, o que aconteceu,          ║
  ║      quem está envolvido, que sistemas são afetados           ║
  ║                                                               ║
  ║   4. COMUNICAR POR CANAIS ALTERNATIVOS                        ║
  ║      Usar telefone ou outros meios — não usar a Internet      ║
  ║      (pode dispersar o vírus/comprometimento)                 ║
  ║                                                               ║
  ║   5. RECOLHER EVIDÊNCIAS                                      ║
  ║      Logs de sistema, logs de rede, logs de aplicação         ║
  ║      Se possível, fazer backup completo do sistema            ║
  ║      comprometido antes de qualquer ação                      ║
  ║                                                               ║
  ║   6. AVALIAR O IMPACTO                                        ║
  ║      Determinar o que já foi danificado ou comprometido       ║
  ║                                                               ║
  ║   7. ELIMINAR A CAUSA                                         ║
  ║      Remover backdoors, aplicar patches, corrigir configs     ║
  ║                                                               ║
  ║   8. RESTAURAR E VERIFICAR                                    ║
  ║      Restaurar operações normais e verificar que a            ║
  ║      restauração foi bem-sucedida                             ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! warning "Regra de ouro: preservar evidências"
    A etapa primordial na identificação inicial do evento é o **requisito absoluto** de que todas as atividades de investigação, todas as inspeções iniciais e todas as respostas iniciais sejam realizadas **APÓS** ser criada uma cópia bit-stream completa do sistema comprometido. Sem está cópia, as evidências podem ser destruídas durante a resposta.

---

## 6. O modelo de 7 passos

O modelo generalizado de Incident Handling compreende **sete passos**:

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║        MODELO DE 7 PASSOS — INCIDENT HANDLING                  ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║   ┌──────────────┐                                            ║
  ║   │ 1. PREPARAÇÃO│ ◄── Antes do incidente                    ║
  ║   └──────┬───────┘                                            ║
  ║          │                                                     ║
  ║          ▼          ┌─────────────────────────────┐           ║
  ║   ┌──────────────┐  │                             │           ║
  ║   │ 2. DETEÇÃO E │  │  ← Ocorrência do incidente  │           ║
  ║   │ IDENTIFICAÇÃO│  │                             │           ║
  ║   └──────┬───────┘  └─────────────────────────────┘           ║
  ║          │                                                     ║
  ║          ▼                                                     ║
  ║   ┌──────────────┐                                            ║
  ║   │ 3. CONTENÇÃO │ ◄── Limitar o impacto                     ║
  ║   └──────┬───────┘                                            ║
  ║          │                                                     ║
  ║          ▼                                                     ║
  ║   ┌──────────────┐                                            ║
  ║   │4. INVESTIGAÇÃO│ ◄── Ponto de separação forense           ║
  ║   └──────┬───────┘                                            ║
  ║          │                                                     ║
  ║          ▼                                                     ║
  ║   ┌──────────────┐                                            ║
  ║   │5. ERRADICAÇÃO│ ◄── Eliminar a causa                      ║
  ║   └──────┬───────┘                                            ║
  ║          │                                                     ║
  ║          ▼                                                     ║
  ║   ┌──────────────┐                                            ║
  ║   │ 6. RECUPERAÇÃO│ ◄── Restaurar operações                  ║
  ║   └──────┬───────┘                                            ║
  ║          │                                                     ║
  ║          ▼                                                     ║
  ║   ┌──────────────┐                                            ║
  ║   │ 7. FOLLOW-UP │ ◄── Aprender e melhorar                   ║
  ║   └──────────────┘                                            ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Resumo de cada passo

| Passo | Objetivo | Quando |
|-------|----------|--------|
| **1. Preparação** | Políticas, equipa CSIRT, ferramentas, treino | Antes do incidente |
| **2. Deteção e Identificação** | Monitorizar, detetar anomalias, classificar | Quando o incidente ocorre |
| **3. Contenção** | Isolar sistemas, limitar propagação | Imediatamente após deteção |
| **4. Investigação** | Determinar causa raiz, extensão, evidências | Durante/após contenção |
| **5. Erradicação** | Remover malware, fechar vulnerabilidades | Após investigação |
| **6. Recuperação** | Restaurar serviços, verificar normalidade | Após erradicação |
| **7. Follow-up** | Análise pós-incidente, lições aprendidas | Após recuperação |

> A melhor dica para o sucesso é estar **preparado**. Planeamento adequado e antecipado garante que todos os procedimentos de resposta são conhecidos, coordenados e executados sistematicamente.

---

## 7. Relação com o IRP, DRP e BCP

O Incident Handling integra-se na cadeia completa de planeamento de contingência:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │          INCIDENT HANDLING NO CONTEXTO ORGANIZACIONAL            │
  │                                                                  │
  │                    ┌───────────────────────┐                     │
  │                    │   INCIDENT HANDLING    │                     │
  │                    │   (Programa completo)  │                     │
  │                    └───────────┬───────────┘                     │
  │                                │                                  │
  │              ┌─────────────────┼─────────────────┐               │
  │              │                 │                 │               │
  │              ▼                 ▼                 ▼               │
  │        ┌──────────┐    ┌──────────┐    ┌──────────┐            │
  │        │   IRP    │    │   DRP    │    │   BCP    │            │
  │        │          │    │          │    │          │            │
  │        │ Resposta │    │ Recupe-  │    │ Conti-   │            │
  │        │ a inci-  │    │ ração de │    │ nuidade  │            │
  │        │ dentes   │    │ desastre │    │ negócio  │            │
  │        └──────────┘    └──────────┘    └──────────┘            │
  │              │                 │                 │               │
  │              ▼                 ▼                 ▼               │
  │         Incidentes         Desastres        Continuidade         │
  │         limitados          graves           organizacional       │
  │                                                                  │
  │   Escalação: IRP ──────────► DRP ──────────► BCP                │
  │              (se escala)      (se grave)      (se prolongado)    │
  └─────────────────────────────────────────────────────────────────┘
```

| Componente | Foco | Ativado quando |
|------------|------|---------------|
| **Incident Handling** | Programa completo de gestão de incidentes | Sempre ativo (preparação contínua) |
| **IRP** | Resposta operacional a incidentes | Incidente de segurança detetado |
| **DRP** | Recuperação de infraestrutura | Incidente escala para desastre |
| **BCP** | Continuidade do negócio | Desastre grave ou prolongado |

---

## 8. Exemplos práticos

### Exemplo 1 — Classificação correta salva tempo

**Contexto:** O SOC (Security Operations Center) de uma empresa de telecomunicações recebe 3 alertas em simultâneo:

| Alerta | Descrição | Classificação correta |
|--------|-----------|----------------------|
| Alerta A | Servidor web responde lentamente; CPU a 95% | **Evento adverso** (pode ser pico de tráfego legítimo) — investigar antes de classificar como incidente |
| Alerta B | 500 tentativas de login falhadas na mesma conta em 2 minutos | **Incidente de segurança** (brute force attack) — ativar IRP |
| Alerta C | Utilizador reporta ficheiro "relatorio_Q4.exe" recebido por email | **Incidente de segurança** (possível malware via phishing) — ativar IRP |

**Sem taxonomia clara:** A equipa trata os 3 alertas com a mesma prioridade, desperdiçando recursos no Alerta A enquanto o malware do Alerta C se propaga.

**Com taxonomia clara:** A equipa classifica corretamente, prioriza B e C como incidentes de segurança, e investiga A como evento adverso em paralelo.

### Exemplo 2 — A importância da preparação

**Contexto:** Duas empresas do mesmo setor sofrem o mesmo tipo de ataque ransomware.

| Aspeto | Empresa sem preparação | Empresa com Incident Handling |
|--------|----------------------|-------------------------------|
| **Deteção** | Descoberto 3 dias depois por utilizador | Detetado em 15 minutos pelo SIEM |
| **Contenção** | Sem procedimento; desligar tudo | Isolamento seletivo em 30 minutos |
| **Investigação** | Sem evidências preservadas | Imagem forense antes de qualquer ação |
| **Erradicação** | "Formatar tudo é reinstalar" | Remoção cirúrgica + análise de causa raiz |
| **Recuperação** | 2 semanas para restaurar (backups desatualizados) | 6 horas para restaurar (backups testados) |
| **Follow-up** | "Não voltar a acontecer" (sem ações concretas) | Relatório detalhado + 12 ações de melhoria |
| **Custo total** | €850.000 | €95.000 |

---

## 9. Exercícios

### Exercício 1 — Classificar eventos (Nível básico)

Classifique cada situação como **Evento**, **Evento adverso**, **Incidente de segurança** ou **Ataque**:

| Situação | Classificação? |
|----------|---------------|
| a) Utilizador faz login no email às 09:00 | ? |
| b) Firewall bloqueia 50 conexões de IP desconhecido em 1 minuto | ? |
| c) Base de dados de clientes encontrada à venda na dark web | ? |
| d) Servidor reinicia após falha de energia | ? |
| e) Atacante explora vulnerabilidade CVE-2024-XXXX no Apache | ? |
| f) Disco do servidor de backup atinge 95% de capacidade | ? |
| g) Utilizador clica em link de phishing e instala keylogger | ? |
| h) IDS alerta para scan de portas vindo de IP externo | ? |

??? success "Solução 1"
    | Situação | Classificação | Justificação |
    |----------|--------------|--------------|
    | a) Login normal às 09:00 | **Evento** | Ocorrência normal e esperada |
    | b) Firewall bloqueia 50 conexões | **Evento adverso** | Consequência negativa (possível reconhecimento), mas firewall conteve |
    | c) BD na dark web | **Incidente de segurança** | Violação de confidencialidade confirmada |
    | d) Servidor reinicia por falha energia | **Evento adverso** | Consequência negativa mas não é segurança — tratado pelo DRP |
    | e) Exploração de CVE no Apache | **Ataque** | Tentativa deliberada de comprometer um ativo |
    | f) Disco a 95% | **Evento** | Situação operacional, não é adverso (ainda); pode tornar-se se chegar a 100% |
    | g) Phishing + keylogger | **Incidente de segurança** (com componente de **Ataque**) | Engenharia social deliberada que resultou em comprometimento |
    | h) Scan de portas | **Evento adverso** (possível fase inicial de **Ataque**) | Reconhecimento é frequentemente o primeiro passo de um ataque, mas por si só pode não causar dano |

### Exercício 2 — Sequenciar a resposta (Nível intermédio)

A equipa de segurança recebe um alerta: um servidor de ficheiros está a encriptar ficheiros autonomamente (suspeita de ransomware).

Ordene as seguintes ações na sequência correta do modelo de 7 passos:

- [ ] a) Restaurar ficheiros a partir do último backup verificado
- [ ] b) Verificar se outros servidores foram afetados
- [ ] c) Criar imagem forense do servidor comprometido
- [ ] d) Atualizar o plano de resposta com lições aprendidas
- [ ] e) Desligar o servidor da rede (mas não desligar a máquina)
- [ ] f) Remover o ransomware e fechar a vulnerabilidade explorada
- [ ] g) Identificar o vetor de entrada (como o ransomware chegou)
- [ ] h) Confirmar que o alerta é real (não é falso positivo)

??? success "Solução 2"
    | Ordem | Ação | Passo |
    |-------|------|-------|
    | 1 | **h)** Confirmar que o alerta é real | **Deteção e Identificação** |
    | 2 | **e)** Desligar da rede (não desligar máquina) | **Contenção** |
    | 3 | **b)** Verificar outros servidores | **Contenção** (avaliar extensão) |
    | 4 | **c)** Criar imagem forense | **Investigação** |
    | 5 | **g)** Identificar vetor de entrada | **Investigação** |
    | 6 | **f)** Remover ransomware e fechar vulnerabilidade | **Erradicação** |
    | 7 | **a)** Restaurar ficheiros do backup | **Recuperação** |
    | 8 | **d)** Atualizar plano com lições | **Follow-up** |

    **Nota importante:** A ação **e)** específica "desligar da rede mas não desligar a máquina" — desligar a máquina destruiria evidências na memória RAM que são essenciais para a investigação forense.

### Exercício 3 — Justificar o investimento (Nível avançado)

O CEO de uma PME com 80 colaboradores questiona: "Porquê investir €50.000/ano em Incident Handling se nunca tivemos um incidente grave?"

Construa um argumento estruturado que cubra:
a) Porque "nunca tivemos" não significa "nunca teremos"
b) Custos típicos de um incidente sem preparação vs com preparação
c) Benefícios indiretos do investimento
d) Requisitos legais/regulatórios

??? success "Solução 3"
    **a) "Nunca tivemos" não significa "nunca teremos":**

    - Não é uma questão de SE, mas de QUANDO. Relatórios da indústria indicam que 43% dos ciberataques visam PMEs
    - "Nunca detetámos" pode significar que não temos capacidade de deteção, não que não temos incidentes
    - O panorama de ameaças está em constante evolução — o que era seguro ontem pode não ser hoje

    **b) Custos comparativos:**

    | Cenário | Sem preparação | Com Incident Handling |
    |---------|---------------|----------------------|
    | Ransomware | €200-500K (resgate + downtime + perda de dados) | €20-50K (contenção rápida + restauro de backup) |
    | Data breach (RGPD) | €100-300K (multas + notificações + dano reputacional) | €30-60K (resposta coordenada + notificação atempada) |
    | Tempo de recuperação | 2-4 semanas | 1-3 dias |

    Investimento: €50K/ano. Custo médio de um incidente sem preparação: €200-500K. O investimento paga-se com **um único incidente evitado ou mitigado**.

    **c) Benefícios indiretos:**

    - Melhoria geral da postura de segurança (a preparação identifica vulnerabilidades)
    - Confiança de clientes e parceiros (demonstra maturidade)
    - Vantagem competitiva em concursos (cada vez mais exigem certificações de segurança)
    - Redução de prémios de ciber-seguro
    - Cultura de segurança na organização

    **d) Requisitos legais/regulatórios:**

    - **RGPD:** Obrigação de notificar violações de dados em 72 horas — impossível sem processo definido
    - **Diretiva NIS2:** Empresas de setores críticos devem ter capacidade de resposta a incidentes
    - **DORA:** Setor financeiro obrigado a ter resiliência operacional digital
    - **Lei do Cibercrime (PT):** Obrigação de preservar evidências para investigação criminal

---

## 10. Armadilhas e confusões a evitar

!!! danger "Confusão 1: Todos os eventos são incidentes"
    **Errado.** A maioria dos eventos são normais. Apenas eventos adversos que ameaçam a CIA (Confidencialidade, Integridade, Disponibilidade) são incidentes de segurança. Classificar tudo como incidente leva a fadiga de alertas e desperdiça recursos.

!!! danger "Confusão 2: Incident Handling = Incident Response"
    **Errado.** Incident Handling é o programa completo (antes + durante + depois). Incident Response é apenas a componente de resposta ativa durante o incidente. Sem preparação e follow-up, o Incident Response é reativo e ineficaz.

!!! danger "Confusão 3: A primeira ação é desligar tudo"
    **Errado.** Desligar sistemas destrói evidências na memória RAM e pode agravar a situação. A primeira ação deve ser **isolar** (desligar da rede), **preservar** evidências e só depois decidir os próximos passos.

!!! danger "Confusão 4: Incident Handling é só para a equipa de TI"
    **Errado.** Envolve relações públicas, recursos humanos, jurídico, operações e gestão. Um incidente de segurança pode ter consequências legais, reputacionais e operacionais que vão muito além da tecnologia.

!!! danger "Confusão 5: Se temos antivírus e firewall, não precisamos de Incident Handling"
    **Errado.** Ferramentas preventivas reduzem a probabilidade de incidentes mas não a eliminam. O Incident Handling prepara a organização para quando a prevenção falha — e eventualmente vai falhar.

!!! danger "Confusão 6: Um scan de portas é sempre um ataque"
    **Errado.** Um scan de portas é um evento adverso (reconhecimento) que pode ser o prelúdio de um ataque, mas por si só não constitui necessariamente um ataque. A classificação correta é essencial para priorizar a resposta.

---

## 11. Resumo rápido

| Conceito | Descrição |
|----------|-----------|
| **Evento** | Ocorrência observável num sistema ou rede |
| **Evento adverso** | Evento com consequência negativa |
| **Incidente de segurança** | Evento adverso que ameaça a CIA |
| **Ataque** | Tentativa deliberada de comprometer um ativo |
| **Incident Handling** | Programa completo: antes + durante + após incidente |
| **Incident Response** | Ações durante o incidente |
| **Modelo de 7 passos** | Preparação → Deteção → Contenção → Investigação → Erradicação → Recuperação → Follow-up |
| **Regra de ouro** | Preservar evidências ANTES de qualquer ação de resposta |

---

## 12. Templates e documentos operacionais

!!! tip "Download directo dos templates"
    Todos os documentos seguintes estão em formato `.docx` editável, com placeholder `[Nome da organização]`. Os alunos podem descarregar, adaptar e usar nas suas organizações. Catálogo completo também em [Preparação — Documentos operacionais](preparacao.md#documentos-e-templates-operacionais).

### Políticas e procedimentos

| Documento | Download |
|-----------|----------|
| Política de Gestão de Incidentes | [:material-file-word: política](../gestao_incidentes/politica-gestao-incidentes.docx){ .md-button } |
| Procedimento de Classificação e Severidade (P1-P5) | [:material-file-word: classificação](../gestao_incidentes/procedimento-classificacao-severidade.docx){ .md-button } |
| Procedimento de Escalonamento e Matriz RACI | [:material-file-word: escalonamento](../gestao_incidentes/procedimento-escalonamento-raci.docx){ .md-button } |
| Plano de Resposta a Incidentes (NIS2) | [:material-file-word: plano IR](../gestao_incidentes/plano-resposta-incidentes-nis2.docx){ .md-button } |

### Playbooks por tipo de incidente

| Documento | Download |
|-----------|----------|
| Playbook — Ransomware (CISA / MITRE ATT&CK) | [:material-file-word: ransomware](../gestao_incidentes/playbook-ransomware.docx){ .md-button } |
| Playbook — Phishing / Comprometimento de Credenciais | [:material-file-word: phishing](../gestao_incidentes/playbook-phishing.docx){ .md-button } |
| Playbook — Violação de Dados Pessoais (RGPD 33.º/34.º) | [:material-file-word: RGPD](../gestao_incidentes/playbook-violacao-dados-pessoais.docx){ .md-button } |

### Comunicação e documentação pós-incidente

| Documento | Download |
|-----------|----------|
| Plano de Comunicação de Crise | [:material-file-word: comunicação](../gestao_incidentes/plano-comunicacao-crise.docx){ .md-button } |
| Relatório Pós-Incidente (PIR) | [:material-file-word: PIR](../gestao_incidentes/relatorio-pos-incidente-pir.docx){ .md-button } |

### Notificações regulatórias NIS2 (DL 125/2025)

| Documento | Prazo | Download |
|-----------|-------|----------|
| Notificação inicial CNCS | 24h após conhecimento | [:material-file-word: 24h](../gestao_incidentes/notificacao-24h-nis2.docx){ .md-button } |
| Notificação intermédia CNCS | 72h | [:material-file-word: 72h](../gestao_incidentes/notificacao-72h-nis2.docx){ .md-button } |
| Relatório final CNCS | 30 dias úteis após fim de impacto | [:material-file-word: 30d](../gestao_incidentes/notificacao-30d-nis2.docx){ .md-button } |
| Notificação a destinatários / utilizadores | Conforme art. 48.º | [:material-file-word: destinatários](../gestao_incidentes/notificacao-incidente-destinatarios-nis2.docx){ .md-button } |
| Registo interno de incidentes | Contínuo (art. 33.º n.º 5 RGPD) | [:material-file-excel: registo](../gestao_incidentes/registo-incidentes-nis2.xlsx){ .md-button } |

!!! warning "Aviso pedagógico"
    Estes templates são pontos de partida para aprendizagem, **não substitutos de análise jurídica qualificada**. Antes de usar em contexto real, validar com DPO, Jurídico e eventualmente consultor regulatório setorial.

---

**Próximos passos:** Explore os [Frameworks de IR](frameworks.md) para conhecer as metodologias ISO 27035, SANS, NIST 800-61, ENISA e ISACA.
