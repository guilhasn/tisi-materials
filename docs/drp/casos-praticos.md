# Casos Práticos - Disaster Recovery Plan

Casos práticos completos que percorrem **todo o ciclo de recuperação de desastres**: classificação, ativação do DRP, gestão de crise, recuperação e lições aprendidas.

Cada caso e independente e pode ser usado para estudo ou discussão. Os cenários são fictícios mas baseados em situações reais.

!!! tip "Como usar estes casos"
    Cada caso segue a estrutura do DRP. Tente primeiro **identificar o que faria em cada fase** antes de ler a resposta. Os casos estão ordenados por complexidade crescente.

---

## Caso 1 — Banco regional: Falha total de energia no datacenter

### Contexto

Um banco regional com 1.200 colaboradores e 80 agencias sofre uma falha total de energia no seu datacenter principal as 09h15 de uma terça-feira. O UPS aguenta 20 minutos. O gerador de emergência arranca mas falha após 45 minutos por falta de combustivel (o deposito não tinha sido verificado há 6 meses). O core banking, o homebanking e os ATMs ficam todos indisponíveis.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Falha de infraestrutura (energia) |
| **Nível de disrupcao** | **Desastre** — Todos os sistemas críticos em baixo; previsao de indisponibilidade superior ao MTD (2 horas para core banking) |
| **Impacto** | 80 agencias sem sistema; homebanking indisponível; ATMs offline; transações suspensas |
| **Decisão** | Ativar DRP — site primário inoperavel, sem previsao de restauro rápido de energia |

### Fase 2 — Ativação do DRP

**Primeiros 30 minutos:**

1. Coordenador DRP contactado e assume lideranca
2. Lista de alerta ativada (CEO, CTO, diretores de agencia, fornecedor de hotsite)
3. Decisão: ativar hotsite (contrato com fornecedor a 80 km)
4. Equipa técnica de 8 pessoas mobilizada para o hotsite

**Papeis ativados:**

| Papel | Pessoa | Ação imediata |
|-------|--------|---------------|
| Coordenador DRP | CTO | Lidera operação; coordena com CEO |
| Equipa técnica | 8 técnicos | Deslocam-se ao hotsite; iniciam restauro |
| Comunicação | Dir. Marketing | Prepara mensagens para clientes e média |
| Operacoes bancárias | Dir. Operacoes | Coordena com agencias; ativa procedimentos manuais |
| Jurídico/compliance | Dir. Jurídico | Avalia obrigações regulatorias (Banco de Portugal) |

### Fase 3 — Gestão de crise

| Audiencia | Mensagem | Canal | Quando |
|-----------|----------|-------|--------|
| **Agencias** | "Sistemas em baixo. Ativem procedimentos manuais para operações essenciais." | Telefone (rede movel) | 30 min |
| **Clientes** | "Serviços temporariamente indisponíveis. Lamentamos o incomodo. Atualizacoes em breve." | SMS + redes sociais | 1 hora |
| **Banco de Portugal** | Notificação formal de disrupcao significativa nos serviços bancários | Email oficial + telefone | 2 horas |
| **Media** | "O banco está a gerir uma situação técnica. Serviços em restauro. Sem impacto em dados ou segurança de contas." | Comunicado de imprensa | 3 horas |

### Fase 4 — Recuperação

| Ação | Tempo | Resultado |
|------|-------|-----------|
| Ativação do hotsite | T+2h | Hardware pronto; rede configurada |
| Restauro do core banking a partir de backup (RPO: 1h) | T+4h | Core banking operacional no hotsite |
| Reconexao das agencias ao hotsite | T+5h | 60 de 80 agencias operacionais |
| Restauro do homebanking | T+6h | Clientes conseguem aceder as contas |
| Restauro dos ATMs | T+8h | 90% dos ATMs operacionais |

**Problemas encontrados durante a recuperação:**

- 20 agencias em zonas rurais com conectividade insuficiente para o hotsite
- Alguns terminais de pagamento nas agencias não reconheciam o novo IP do core banking
- O sistema de mensageria interbancaria (SIBS) precisou de reconfigurar os endpoints

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **O que funcionou?** | Hotsite ativado dentro do RTO; equipa mobilizada rapidamente |
| **O que falhou?** | Gerador sem combustivel; 20 agencias sem conectividade para hotsite |
| **O que mudar?** | Verificação mensal do combustivel do gerador; plano de conectividade alternativa para agencias rurais; teste trimestral dos terminais com IP do hotsite |
| **Tempos** | Classificação: 15 min; Ativação hotsite: 2h; Core banking: 4h; Operação plena: 8h |

---

## Caso 2 — Universidade: Terramoto danifica edifício do datacenter

### Contexto

Uma universidade pública com 15.000 alunos e 1.200 funcionários e atingida por um terramoto de magnitude 5.5. O edifício do datacenter sofre danos estruturais e e declarado inseguro pelas autoridades — ninguém pode entrar. Os servidores estão intactos dentro do edifício mas inacessiveis. O semestre está a decorrer e 12.000 alunos dependem da plataforma de e-learning. A universidade tem um contrato de warmsite com um fornecedor a 45 km.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Desastre natural (terramoto) |
| **Nível de disrupcao** | **Desastre** — Datacenter inacessível; todos os serviços internos em baixo |
| **Impacto** | Plataforma e-learning, email, sistemas académicos, sistema de gestão, VPN — tudo indisponível |
| **Particularidade** | Servidores intactos mas inacessiveis fisicamente |
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
  │            Campus seguro. Atualizacoes via email."        │
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
| **Nível de disrupcao** | **Desastre** — 100% dos sistemas locais cifrados; backups locais comprometidos |
| **Agravante** | Dados de propriedade intelectual exfiltrados (formulas de I&D) |
| **Impacto** | Produção parada, distribuição suspensa, I&D comprometida |
| **Decisão** | Ativar DRP + envolver autoridades + consultora forense |

### Fase 2 — Ativação do DRP

**Decisoes críticas nas primeiras 2 horas:**

1. **Não pagar o resgate** — Decisão do CEO após consulta com jurídico e polícia judiciária
2. **Preservar evidência** — Não reinstalar nada até a equipa forense chegar
3. **Isolar completamente a rede** — Desligar tudo para evitar propagação adicional
4. **Ativar DRP com restauro a partir de backups offsite** — Aceitar RPO de 3 dias
5. **Contactar autoridades** — Polícia judiciária, CNPD, autoridade do medicamento

### Fase 3 — Gestão de crise

**Este caso tem uma dimensão adicional: a ameaça de publicacao de dados.**

| Frente de crise | Ação | Responsável |
|----------------|------|-------------|
| **Técnica** | Restauro a partir de backups offsite; reconstrução da rede | CTO + equipa técnica |
| **Forense** | Preservação de evidências; análise do vetor de ataque | Consultora forense externa |
| **Legal** | Notificação CNPD (72h RGPD); análise de responsabilidade; gestão de patentes | Jurídico |
| **Regulatoria** | Notificação a autoridade do medicamento; impacto na produção | Dir. Qualidade |
| **Comunicação** | Informar colaboradores, parceiros e, se necessário, público | Dir. Comunicação |
| **Negocio** | Avaliar impacto em encomendas e compromissos de fornecimento | Dir. Operacoes |

**Dilema ético — pagar ou não pagar:**

| A favor de pagar | Contra pagar |
|-------------------|-------------|
| Recuperação potencialmente mais rápida | Não há garantia de que dados não serão publicados |
| Evitar publicacao de propriedade intelectual | Financia atividade criminosa |
| Reduzir impacto no negócio | Pode tornar a empresa alvo futuro |
| | Pode violar sanções internacionais |
| | Ilegalidade em algumas jurisdicoes |

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
| **Impacto total** | 10 dias de disrupcao; perda estimada de 3M EUR (produção + reputação + remediacoes); dados de I&D parcialmente expostos |
| **Ações corretivas** | MFA obrigatório; segmentação IT/OT; backups imutaveis; SOC 24/7; formação anti-phishing |

---

## Caso 4 — Municipio: Inundacao nos serviços centrais

### Contexto

Uma câmara municipal com 400 funcionários e 60.000 habitantes no concelho sofre uma inundacao grave após chuvas torrenciais de 3 dias. O piso -1 do edifício dos serviços centrais (onde está a sala de servidores) fica submerso em 80cm de água. Perdem-se servidores, equipamento de rede e arquivo físico. Os serviços de atendimento ao cidadão, licenciamento e urbanismo ficam completamente indisponíveis.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Desastre natural (inundacao) |
| **Nível de disrupcao** | **Desastre** — Sala de servidores destruida; serviços ao cidadão parados |
| **Particularidade** | Perda de arquivo físico (processos em papel) além de digital |
| **Impacto social** | 60.000 habitantes sem serviços municipais |

### Fase 2 — Ativação do DRP

**Problema imediato:** A câmara não tinha DRP formal. Existia um "plano de contingência" generico nunca testado e um contrato de alojamento de backups com uma empresa local — mas os backups só cobriam o sistema de gestão financeira.

| Sistema | Tinha backup offsite? | Estado |
|---------|-----------------------|--------|
| Gestão financeira (ERP) | Sim (diário) | Recuperavel |
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
| Comunicação com populacao | Avisos nas juntas de freguesia, redes sociais, radio local |
| Pressao política | Oposicao questiona ausência de DRP; média local investiga |

### Fase 4 — Recuperação

| Fase | Ação | Tempo | Observacao |
|------|------|-------|------------|
| Imediata | Montar balcão temporário | 2 dias | Pavilhao desportivo com geradores |
| Curto prazo | Alugar servidores temporarios | 1 semana | Fornecedor local |
| Curto prazo | Restaurar sistema financeiro | 5 dias | Único com backup offsite |
| Medio prazo | Reconstruir base de dados de licenciamento | 3 meses | A partir de copias em papel e pedidos dos cidadaos |
| Medio prazo | Migrar email para cloud (Microsoft 365) | 1 mês | Decisão de nunca mais ter email on-premises |
| Longo prazo | Implementar DRP formal | 6 meses | Contratacao de consultora |
| Longo prazo | Digitalizar e proteger arquivo físico | 1 ano | Parceria com arquivo distrital |

### Fase 5 — Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| **Falha principal** | Ausência de DRP formal e de backups para sistemas críticos |
| **Consequencia** | Perda irreversível de dados de licenciamento e arquivo físico |
| **Custo total estimado** | 800.000 EUR (equipamento + recuperação + consultoria + digitalizacao) |
| **Mudanca fundamental** | Migração para cloud; DRP formal; backups offsite para todos os sistemas |
| **Impacto politico** | Auditoria do Tribunal de Contas sobre ausência de plano de contingência |

**Para refletir:**

- Quantas organizações publicas portuguesas tem DRP formal e testado?
- O custo de 800.000 EUR de recuperação compara com quanto custaria ter implementado um DRP previamente?
- A perda do arquivo físico (papel) era evitavel? Como?

---

## Caso 5 — Empresa tecnológica: Falha do fornecedor de cloud

### Contexto

Uma startup de SaaS com 60 colaboradores e 5.000 clientes empresariais aloja toda a sua infraestrutura num único fornecedor de cloud. Numa quarta-feira as 10h00, o fornecedor sofre uma falha regional que afeta a zona de disponibilidade onde a startup opera. O fornecedor estima 24-48 horas para restauro completo. A startup não tem infraestrutura em outra zona/região.

### Fase 1 — Classificação

| Elemento | Avaliação |
|----------|-----------|
| **Tipo de evento** | Falha de fornecedor crítico |
| **Nível de disrupcao** | **Desastre** — 100% da infraestrutura dependente de um único ponto de falha |
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

## 📋 Templates

Consulte os templates disponíveis para apoio à elaboração do plano de recuperação de desastres:

[:material-file-document-outline: Aceder aos Templates](https://github.com/guilhasn/tisi-materials/tree/main/TEMPLATES){ .md-button .md-button--primary target="_blank" }
