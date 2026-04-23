# Casos Práticos - Disaster Recovery Plan

Casos práticos completos que percorrem **todo o ciclo de recuperação de desastres**: classificação, ativação do DRP, gestão de crise, recuperação e lições aprendidas.

Cada caso e independente e pode ser usado para estudo ou discussão. Os cenários são fictícios mas baseados em situações reais.

!!! tip "Como usar estes casos"
    Cada caso segue a estrutura do DRP. Tente primeiro **identificar o que faria em cada fase** antes de ler a resposta. Os casos estão ordenados por complexidade crescente.

---

## Caso 1 — Banco regional: Falha total de energia no datacenter

### Contexto

Um banco regional com 1.200 colaboradores e 80 agências sofre uma falha total de energia no seu datacenter principal as 09h15 de uma terça-feira. O UPS aguenta 20 minutos. O gerador de emergência arranca mas falha após 45 minutos por falta de combustível (o deposito não tinha sido verificado há 6 meses). O core banking, o homebanking e os ATMs ficam todos indisponíveis.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Falha de infraestrutura (energia) |
| **Nível de disrupção** | **Desastre** — Todos os sistemas críticos em baixo; previsão de indisponibilidade superior ao MTD (2 horas para core banking) |
| **Impacto** | 80 agências sem sistema; homebanking indisponível; ATMs offline; transações suspensas |
| **Decisão** | Ativar DRP — site primário inoperável, sem previsão de restauro rápido de energia |

### Fase 2 — Ativação do DRP

**Primeiros 30 minutos:**

1. Coordenador DRP contactado e assume lideranca
2. Lista de alerta ativada (CEO, CTO, diretores de agência, fornecedor de hotsite)
3. Decisão: ativar hotsite (contrato com fornecedor a 80 km)
4. Equipa técnica de 8 pessoas mobilizada para o hotsite

**Papeis ativados:**

| Papel | Pessoa | Ação imediata |
|-------|--------|---------------|
| Coordenador DRP | CTO | Lidera operação; coordena com CEO |
| Equipa técnica | 8 técnicos | Deslocam-se ao hotsite; iniciam restauro |
| Comunicação | Dir. Marketing | Prepara mensagens para clientes e média |
| Operações bancárias | Dir. Operações | Coordena com agências; ativa procedimentos manuais |
| Jurídico/compliance | Dir. Jurídico | Avalia obrigações regulatórias (Banco de Portugal) |

### Fase 3 — Gestão de crise

| Audiência | Mensagem | Canal | Quando |
|-----------|----------|-------|--------|
| **Agências** | "Sistemas em baixo. Ativem procedimentos manuais para operações essenciais." | Telefone (rede movel) | 30 min |
| **Clientes** | "Serviços temporariamente indisponíveis. Lamentamos o incomodo. Atualizações em breve." | SMS + redes sociais | 1 hora |
| **Banco de Portugal** | Notificação formal de disrupção significativa nos serviços bancários | Email oficial + telefone | 2 horas |
| **Media** | "O banco está a gerir uma situação técnica. Serviços em restauro. Sem impacto em dados ou segurança de contas." | Comunicado de imprensa | 3 horas |

### Fase 4 — Recuperação

| Ação | Tempo | Resultado |
|------|-------|-----------|
| Ativação do hotsite | T+2h | Hardware pronto; rede configurada |
| Restauro do core banking a partir de backup (RPO: 1h) | T+4h | Core banking operacional no hotsite |
| Reconexao das agências ao hotsite | T+5h | 60 de 80 agências operacionais |
| Restauro do homebanking | T+6h | Clientes conseguem aceder as contas |
| Restauro dos ATMs | T+8h | 90% dos ATMs operacionais |

**Problemas encontrados durante a recuperação:**

- 20 agências em zonas rurais com conectividade insuficiente para o hotsite
- Alguns terminais de pagamento nas agências não reconheciam o novo IP do core banking
- O sistema de mensageria interbancária (SIBS) precisou de reconfigurar os endpoints

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **O que funcionou?** | Hotsite ativado dentro do RTO; equipa mobilizada rapidamente |
| **O que falhou?** | Gerador sem combustível; 20 agências sem conectividade para hotsite |
| **O que mudar?** | Verificação mensal do combustível do gerador; plano de conectividade alternativa para agências rurais; teste trimestral dos terminais com IP do hotsite |
| **Tempos** | Classificação: 15 min; Ativação hotsite: 2h; Core banking: 4h; Operação plena: 8h |

---

## Caso 2 — Universidade: Terramoto danifica edifício do datacenter

### Contexto

Uma universidade pública com 15.000 alunos e 1.200 funcionários e atingida por um terramoto de magnitude 5.5. O edifício do datacenter sofre danos estruturais e e declarado inseguro pelas autoridades — ninguém pode entrar. Os servidores estão intactos dentro do edifício mas inacessíveis. O semestre está a decorrer e 12.000 alunos dependem da plataforma de e-learning. A universidade tem um contrato de warmsite com um fornecedor a 45 km.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Desastre natural (terramoto) |
| **Nível de disrupção** | **Desastre** — Datacenter inacessível; todos os serviços internos em baixo |
| **Impacto** | Plataforma e-learning, email, sistemas académicos, sistema de gestão, VPN — tudo indisponível |
| **Particularidade** | Servidores intactos mas inacessíveis fisicamente |
| **Decisão** | Ativar DRP com warmsite |

### Fase 2 — Ativação do DRP

**Prioridades de recuperação (baseadas na BIA):**

| Sistema | MTD | Prioridade |
|---------|-----|-----------|
| Email institucional | 4 horas | 1 (já em cloud — Microsoft 365 — não afetado) |
| Plataforma e-learning (Moodle) | 24 horas | 2 |
| Sistema académico (notas, inscrições) | 48 horas | 3 |
| VPN para trabalho remoto | 8 horas | 4 |
| Website institucional | 72 horas | 5 |
| Sistema de gestão financeira | 72 horas | 6 |

**Descoberta crítica:** O email (Microsoft 365) não foi afetado porque estava em cloud. Isto permitiu utiliza-lo como canal de comunicação principal desde o primeiro momento.

### Fase 3 — Gestão de crise

**Equipa de crise:** Reitor + Vice-reitor + Diretor de TI + Diretor de comunicação + Diretores de escola

**Ação de destaque:** A universidade decidiu **adiar todos os prazos de entrega de trabalhos em 2 semanas** e comunicou a decisão em menos de 6 horas via email institucional. Esta decisão simples reduziu enormemente a pressão sobre alunos e docentes.

```
  ┌─────────────────────────────────────────────────────────┐
  │        CRONOLOGIA DE COMUNICACAO                         │
  │                                                          │
  │  T+0h     Terramoto                                     │
  │  T+1h     Verificação de segurança de pessoas            │
  │  T+2h     Email a todos: "Serviços em baixo.             │
  │            Campus seguro. Atualizações via email."        │
  │  T+4h     Email a alunos: "Prazos adiados 2 semanas.    │
  │            Moodle indisponível temporariamente."          │
  │  T+6h     Comunicado público: "Universidade ativou       │
  │            plano de recuperação. Sem feridos."            │
  │  T+24h    Atualização: "Moodle disponível no warmsite.   │
  │            Acesso com mesmas credenciais."                │
  │  T+48h    Atualização: "Sistema académico restaurado.    │
  │            Operação normal exceto entregas adiadas."      │
  └─────────────────────────────────────────────────────────┘
```

### Fase 4 — Recuperação

| Ação | Desafio | Solução | Tempo |
|------|---------|---------|-------|
| Ativar warmsite | Equipamento disponível mas não configurado | Equipa de 6 trabalhou 18h seguidas | T+20h |
| Restaurar Moodle | Último backup offsite: sexta-feira (RPO: 3 dias) | Conteúdo de 3 dias perdido; docentes recriaram | T+24h |
| Restaurar sistema académico | Base de dados grande; restauro lento | Priorizar dados do semestre atual | T+40h |
| VPN | Configuração de rede diferente no warmsite | Reconfigurar e redistribuir perfis VPN | T+12h |

**Perda de dados:** 3 dias de conteúdo do Moodle (trabalhos submetidos entre sexta e domingo). Solução: pedir aos alunos que resubmetam (a maioria tinha copias locais).

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **O que funcionou?** | Email em cloud = comunicação imediata; decisão rápida de adiar prazos |
| **O que falhou?** | RPO do Moodle demasiado largo (3 dias); warmsite demorou 20h a ativar |
| **O que mudar?** | Backup diário do Moodle para cloud; migrar mais serviços para cloud; hotsite em vez de warmsite para serviços críticos |
| **Surpresa positiva** | Alunos e docentes foram muito compreensivos; comunicação rápida e transparente gerou boa-vontade |

---

## Caso 3 — Indústria farmaceutica: Ransomware com exfiltração de dados

### Contexto

Uma empresa farmaceutica com 800 colaboradores e atividade em 3 países descobre numa segunda-feira as 06h00 que os seus sistemas foram cifrados por ransomware. O atacante exfiltrou dados de investigação (formulas de medicamentos em desenvolvimento) e ameaça pública-los se o resgate (2 milhoes de euros em Bitcoin) não for pago em 72 horas. Os backups locais também foram cifrados. Restam os backups offsite semanais (último: sexta-feira as 23h00).

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Ciberataque (ransomware + exfiltração) |
| **Nível de disrupção** | **Desastre** — 100% dos sistemas locais cifrados; backups locais comprometidos |
| **Agravante** | Dados de propriedade intelectual exfiltrados (formulas de I&D) |
| **Impacto** | Produção parada, distribuição suspensa, I&D comprometida |
| **Decisão** | Ativar DRP + envolver autoridades + consultora forense |

### Fase 2 — Ativação do DRP

**Decisões críticas nas primeiras 2 horas:**

1. **Não pagar o resgate** — Decisão do CEO após consulta com jurídico e polícia judiciária
2. **Preservar evidência** — Não reinstalar nada até a equipa forense chegar
3. **Isolar completamente a rede** — Desligar tudo para evitar propagação adicional
4. **Ativar DRP com restauro a partir de backups offsite** — Aceitar RPO de 3 dias
5. **Contactar autoridades** — Polícia judiciária, CNPD, autoridade do medicamento

### Fase 3 — Gestão de crise

**Este caso tem uma dimensão adicional: a ameaça de publicação de dados.**

| Frente de crise | Ação | Responsável |
|----------------|------|-------------|
| **Técnica** | Restauro a partir de backups offsite; reconstrução da rede | CTO + equipa técnica |
| **Forense** | Preservação de evidências; análise do vetor de ataque | Consultora forense externa |
| **Legal** | Notificação CNPD (72h RGPD); análise de responsabilidade; gestão de patentes | Jurídico |
| **Regulatória** | Notificação a autoridade do medicamento; impacto na produção | Dir. Qualidade |
| **Comunicação** | Informar colaboradores, parceiros e, se necessário, público | Dir. Comunicação |
| **Negócio** | Avaliar impacto em encomendas e compromissos de fornecimento | Dir. Operações |

**Dilema ético — pagar ou não pagar:**

| A favor de pagar | Contra pagar |
|-------------------|-------------|
| Recuperação potencialmente mais rápida | Não há garantia de que dados não serão publicados |
| Evitar publicação de propriedade intelectual | Financia atividade criminosa |
| Reduzir impacto no negócio | Pode tornar a empresa alvo futuro |
| | Pode violar sanções internacionais |
| | Ilegalidade em algumas jurisdições |

### Fase 4 — Recuperação

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║              TIMELINE DE RECUPERACAO                          ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                               ║
  ║  Dia 1    Isolamento total da rede                           ║
  ║           Equipa forense inicia investigação                  ║
  ║           Backups offsite verificados e validados              ║
  ║                                                               ║
  ║  Dia 2    Início do restauro de sistemas críticos             ║
  ║           (produção > distribuição > email > I&D)             ║
  ║           Nova infraestrutura de rede (limpa)                 ║
  ║                                                               ║
  ║  Dia 3    Produção parcialmente restaurada (60%)              ║
  ║           Email restaurado em cloud (nova instância)          ║
  ║           72h RGPD: notificação a CNPD                        ║
  ║           Deadline do ransomware expira                       ║
  ║                                                               ║
  ║  Dia 5    Produção a 90%                                     ║
  ║           Atacante pública parcialmente os dados              ║
  ║           Comunicado público da empresa                       ║
  ║                                                               ║
  ║  Dia 10   Operação normal restaurada                          ║
  ║           Investigação forense conclui vetor de entrada       ║
  ║           (phishing + credenciais de VPN reutilizadas)        ║
  ║                                                               ║
  ║  Dia 30   Relatório final; revisão do DRP                    ║
  ║           Implementação de MFA em todos os acessos            ║
  ║           Segmentação de rede IT/OT                           ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **Vetor de entrada** | Phishing dirigido a um colaborador de TI + reutilização de password da VPN (sem MFA) |
| **O que funcionou?** | Backups offsite intactos; decisão rápida de não pagar; comunicação transparente |
| **O que falhou?** | Sem MFA na VPN; backups locais não isolados; segmentação de rede insuficiente |
| **Impacto total** | 10 dias de disrupção; perda estimada de 3M EUR (produção + reputação + remediações); dados de I&D parcialmente expostos |
| **Ações corretivas** | MFA obrigatório; segmentação IT/OT; backups imutáveis; SOC 24/7; formação anti-phishing |

---

## Caso 4 — Municipio: Inundação nos serviços centrais

### Contexto

Uma câmara municipal com 400 funcionários e 60.000 habitantes no concelho sofre uma inundação grave após chuvas torrenciais de 3 dias. O piso -1 do edifício dos serviços centrais (onde está a sala de servidores) fica submerso em 80cm de água. Perdem-se servidores, equipamento de rede e arquivo físico. Os serviços de atendimento ao cidadão, licenciamento e urbanismo ficam completamente indisponíveis.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Desastre natural (inundação) |
| **Nível de disrupção** | **Desastre** — Sala de servidores destruida; serviços ao cidadão parados |
| **Particularidade** | Perda de arquivo físico (processos em papel) além de digital |
| **Impacto social** | 60.000 habitantes sem serviços municipais |

### Fase 2 — Ativação do DRP

**Problema imediato:** A câmara não tinha DRP formal. Existia um "plano de contingência" genérico nunca testado e um contrato de alojamento de backups com uma empresa local — mas os backups só cobriam o sistema de gestão financeira.

| Sistema | Tinha backup offsite? | Estado |
|---------|-----------------------|--------|
| Gestão financeira (ERP) | Sim (diário) | Recuperável |
| Licenciamento/urbanismo | Não | Perdido |
| Atendimento ao cidadão | Não | Perdido |
| Email (Exchange on-premises) | Não | Perdido |
| Website municipal | Sim (alojamento externo) | Operacional |
| Arquivo físico | N/A (papel) | Destruido pela água |

### Fase 3 — Gestão de crise

**Desafios específicos de uma entidade pública:**

| Desafio | Ação tomada |
|---------|-------------|
| Serviços ao cidadão indisponíveis | Balcao temporário em pavilhao desportivo municipal |
| Processos de licenciamento perdidos | Pedido de reconstrução a partir de copias dos requerentes |
| Obrigacoes legais de prazos | Suspensao de prazos administrativos (despacho do presidente) |
| Comunicação com população | Avisos nas juntas de freguesia, redes sociais, radio local |
| Pressao política | Oposição questiona ausência de DRP; média local investiga |

### Fase 4 — Recuperação

| Fase | Ação | Tempo | Observação |
|------|------|-------|------------|
| Imediata | Montar balcão temporário | 2 dias | Pavilhao desportivo com geradores |
| Curto prazo | Alugar servidores temporários | 1 semana | Fornecedor local |
| Curto prazo | Restaurar sistema financeiro | 5 dias | Único com backup offsite |
| Medio prazo | Reconstruir base de dados de licenciamento | 3 meses | A partir de copias em papel e pedidos dos cidadaos |
| Medio prazo | Migrar email para cloud (Microsoft 365) | 1 mês | Decisão de nunca mais ter email on-premises |
| Longo prazo | Implementar DRP formal | 6 meses | Contratação de consultora |
| Longo prazo | Digitalizar e proteger arquivo físico | 1 ano | Parceria com arquivo distrital |

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **Falha principal** | Ausência de DRP formal e de backups para sistemas críticos |
| **Consequencia** | Perda irreversível de dados de licenciamento e arquivo físico |
| **Custo total estimado** | 800.000 EUR (equipamento + recuperação + consultoria + digitalização) |
| **Mudanca fundamental** | Migração para cloud; DRP formal; backups offsite para todos os sistemas |
| **Impacto político** | Auditoria do Tribunal de Contas sobre ausência de plano de contingência |

**Para refletir:**

- Quantas organizações públicas portuguesas tem DRP formal e testado?
- O custo de 800.000 EUR de recuperação compara com quanto custaria ter implementado um DRP previamente?
- A perda do arquivo físico (papel) era evitável? Como?

---

## Caso 5 — Empresa tecnológica: Falha do fornecedor de cloud

### Contexto

Uma startup de SaaS com 60 colaboradores e 5.000 clientes empresariais aloja toda a sua infraestrutura num único fornecedor de cloud. Numa quarta-feira as 10h00, o fornecedor sofre uma falha regional que afeta a zona de disponibilidade onde a startup opera. O fornecedor estima 24-48 horas para restauro completo. A startup não tem infraestrutura em outra zona/região.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Falha de fornecedor crítico |
| **Nível de disrupção** | **Desastre** — 100% da infraestrutura dependente de um único ponto de falha |
| **Agravante** | Nenhuma redundância geografica; SLAs do fornecedor não cobrem este cenário |
| **Impacto** | 5.000 clientes sem acesso a plataforma; reputação em risco |

### Fase 2 — Ativação do DRP

**Problema:** A startup não tinha DRP formal. A estratégia era confiar na redundância do fornecedor de cloud. A falha regional provou que está confiança era insuficiente.

**Ações de emergência:**

1. Contactar fornecedor para obter timeline de restauro e atualizações
2. Avaliar se e possível migrar para outra zona/região do mesmo fornecedor
3. Comunicar com clientes sobre a situação e timeline estimada
4. Investigar opções de migração rápida para outro fornecedor

### Fase 3 — Gestão de crise

| Desafio | Ação |
|---------|------|
| **Clientes empresariais dependentes** | Status page pública + emails individuais a clientes premium |
| **SLA com clientes** | Análise jurídica: creditos de SLA a oferecer? Penalizacoes contratuais? |
| **Redes sociais** | Clientes publicam reclamações; equipa de comunicação responde proativamente |
| **Investidores** | Briefing ao board sobre impacto e plano de mitigação futura |
| **Equipa** | Colaboradores ansiosos sobre impacto na empresa; briefing interno transparente |

### Fase 4 — Recuperação

| Fase | Tempo | Ação |
|------|-------|------|
| T+2h | | Status page atualizada; emails a todos os clientes |
| T+6h | | Fornecedor confirma restauro parcial em 12h |
| T+18h | | Serviços parcialmente restaurados (80% dos clientes) |
| T+30h | | 95% dos clientes restaurados |
| T+48h | | Operação plena restaurada |

### Fase 5 — Lições aprendidas

| Ação corretiva | Investimento | Beneficio |
|---------------|-------------|-----------|
| Multi-region deployment | +40% custo de infraestrutura | Elimina ponto único de falha geografico |
| Multi-cloud strategy (parcial) | +25% custo | Reduz dependência de um único fornecedor |
| DRP formal com testes | Consultora + tempo interno | Plano documentado e validado |
| Status page automatizada | Ferramenta SaaS (~200 EUR/mês) | Comunicação imediata com clientes |
| SLA review com fornecedor | Tempo jurídico | Clausulas mais robustas; penalizações claras |

**Para refletir:**

- "A cloud nunca falha" e um mito. Que riscos específicos existem?
- Qual o custo de não ter redundância vs o custo de 48 horas sem serviço?
- Como comunicar com 5.000 clientes quando o próprio sistema de comunicação está em baixo?
- O SLA do fornecedor de cloud cobria este cenário? Que compensação e realista?

---

## Caso real — Incêndio OVHcloud SBG2 (10 março 2021)

!!! abstract "Por que estudar um caso real"
    Os casos anteriores são fictícios. Este é **o caso paradigmático europeu de perda total de DC** — incêndio destrói um data center inteiro, clientes sem backup offsite perdem dados permanentemente. Testa o modelo de responsabilidade partilhada em cloud.

### Os factos

Na madrugada de **10 de março de 2021, por volta das 00h47 CET**, deflagrou um incêndio no data center **SBG2** da OVHcloud, em Estrasburgo, França. Os bombeiros combateram as chamas durante várias horas. Estrutura:

| DC | Estado pós-incêndio |
|----|---------------------|
| **SBG2** | **Destruído totalmente** |
| **SBG1** | Parcialmente danificado (4 de 12 salas afectadas) |
| **SBG3** | Offline (corte preventivo de energia) |
| **SBG4** | Offline (corte preventivo de energia) |

**Escala do impacto:** ~12 000 servidores dedicados destruídos; estimativas de imprensa apontam para **~3,6 milhões de websites afectados**.

### Causa provável — relatório BEA-RI

O **BEA-RI** (Bureau d'Enquêtes et d'Analyses sur les Risques Industriels) atribuiu a origem a um **UPS (onduleur nº 7)** no piso térreo. Factores agravantes identificados:

- **Design atípico de contentores empilhados**: estrutura metálica com pátios interiores abertos. Facilitou a **propagação vertical do fogo** e o *efeito chaminé*.
- **Sistema de extinção automática inadequado** para o tipo de instalação — ausência de sprinklers ou extinção gasosa nas zonas críticas. A utilização de sprinklers em data centers é um debate técnico (risco de danos por água vs. perda total), mas ausência total de supressão automática é anomalia.
- **Ventilação deficiente** no piso dos UPS com alta densidade de equipamento.

### Porque é este caso central no DRP

```
  ┌──────────────────────────────────────────────────────────────┐
  │   O QUE MUITOS CLIENTES ASSUMIRAM        A REALIDADE         │
  │                                                              │
  │   "Cloud = resiliência automática"   →   Shared responsibility│
  │   "O fornecedor faz backup"           →   Backup é opt-in pago │
  │   "Um DC Tier III não arde"           →   SBG2 ardeu         │
  │   "Dados estão replicados"            →   Só no mesmo DC      │
  │                                                              │
  └──────────────────────────────────────────────────────────────┘
```

Clientes que operavam em planos económicos (ex.: **SoYouStart**, **Kimsufi**) **sem backup contratado** perderam dados **permanente e irremediavelmente**. Entre os afectados:

- **Facepunch Studios** (jogo *Rust*) — 25 servidores de jogo perdidos, dados de jogadores apagados permanentemente.
- **Centre Pompidou** (parte do arquivo digital).
- Múltiplos portais de emprego e entidades públicas francesas.

### Resposta e comunicação — o modelo Klaba

A resposta operacional foi correcta: evacuação bem-sucedida, **zero vítimas**, bombeiros no local rapidamente. Mas o aspecto pedagogicamente mais interessante é a **comunicação de crise**:

| Canal | Papel | Frequência |
|-------|-------|------------|
| Twitter **@olesovhcom** (CEO Octave Klaba) | Comunicação *em directo*, transparência total | Updates ~horários |
| Site oficial OVHcloud | Status operacional, factos verificados | Updates cada 2-4h |
| Email directo a clientes | Instruções específicas por servidor | Em cascata por criticidade |
| Imprensa | Briefings de imprensa | 2x por dia nos primeiros 3 dias |

**Trade-offs da abordagem:** Klaba foi elogiado pela transparência, mas também criticado por especular publicamente sobre causa antes do relatório BEA-RI (risco regulatório/legal).

### Lições para DRP

1. **Regra 3-2-1-1-0** (não apenas 3-2-1): 3 cópias, 2 tipos de media, 1 offsite, **1 imutável/air-gapped**, **0 erros em verificação periódica**.
2. **Shared Responsibility Model** — explicitar por escrito o que o fornecedor garante e o que é responsabilidade do cliente. IaaS, PaaS e SaaS têm fronteiras diferentes.
3. **DR plan deve prever perda total do DC** — não apenas degradação. *Tabletop* com este cenário obrigatório.
4. **Geografia conta** — replicação cross-region não é default nos planos económicos da maioria dos IaaS. Custa mais, tem de ser orçamentado.
5. **Testes de restauro** são o coração do DR maduro. "Tenho backup" ≠ "testei que consigo restaurar a tempo".
6. **RTO/RPO contratual** — exigir no SLA, não apenas disponibilidade.

### Consequências regulatórias e jurídicas

- **Investigação BEA-RI** publicada em 2022.
- A **ANSSI** reforçou recomendações para operadores de data centers em infraestruturas críticas.
- **Acções colectivas** de clientes contra a OVHcloud em tribunais franceses (Tribunal de Comércio de Lille e Paris) — resultados mistos.
- Catalisou discussão sobre o **Cloud Act** e jurisdição de dados na UE.

### Questões para discussão (mestrado)

1. Num modelo **IaaS**, quem é contratual e eticamente responsável pela integridade dos backups? E em **SaaS**? E em **PaaS**?
2. É razoável presumir que um DC classificado como **Tier III** (Uptime Institute) tem sistemas de extinção automática em todas as salas? O que dizem os padrões **EN 50600**?
3. Como quantificar, numa **BIA**, o risco de perda total de um DC — probabilidades históricas, ALE, ou cenários qualitativos? Justifique com dados (ex.: Uptime Institute Annual Outage Analysis).
4. A comunicação de Klaba via Twitter é modelo a seguir ou expõe risco regulatório? Compare com a abordagem Colonial Pipeline/Joseph Blount.
5. Que cláusulas contratuais deveria um cliente exigir num SLA para mitigar o cenário SBG2 (RPO/RTO garantidos, replicação geográfica obrigatória, penalidades por perda)?

### Referências verificáveis

- Relatório **BEA-RI** (2022). <https://www.bea-ri.developpement-durable.gouv.fr/>
- Comunicação OVHcloud — *timeline* do CEO. <https://twitter.com/olesovhcom>
- Reuters (10 mar 2021). <https://www.reuters.com/article/us-france-ovh-fire-idUSKBN2B20NU>
- Data Center Dynamics cobertura técnica. <https://www.datacenterdynamics.com/en/news/fire-destroys-ovhclouds-sbg2-data-center-strasbourg/>
- ANSSI recomendações. <https://www.ssi.gouv.fr/>

---

## 📋 Templates

Consulte o [menu Templates](../modelos/index.md) para todos os modelos operacionais, com contexto de uso, personalização e cadência de revisão. Relevante para DRP:

[:material-file-document-outline: DRP Vila Feliz](../modelos/DRP_Municipio_VilaFeliz_TISI.docx){ .md-button .md-button--primary }
[:material-view-list: Hub de Templates](../modelos/index.md){ .md-button }
