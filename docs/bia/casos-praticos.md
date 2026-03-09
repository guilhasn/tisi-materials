# Casos Práticos Adicionais - Business Impact Analysis

Casos práticos para estudo e aprofundamento, organizados por setor e nível de criticidade.

---

## Caso 4 - Banco (Sistema de homebanking)

**Cenário:** O sistema de homebanking de um banco fica indisponível as 09h00 de uma segunda-feira. Os clientes não conseguem fazer transferencias, consultar saldos ou pagar serviços.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | Zero (0) | Nenhuma transação financeira pode ser perdida - implicações legais e regulatorias |
| **RTO** | 30 minutos | Regulacao e expectativa dos clientes exigem recuperação rápida |
| **WRT** | 1 hora | Reconciliacao de transações, verificação de saldos, testes de integridade |
| **MTD** | 2 horas | Danos reputacionais graves, possiveis sancoes do regulador (Banco de Portugal) |

**MOR:**
- Consulta de saldos (read-only)
- Transferencias urgentes via canal alternativo (balcao, telefone)
- Equipa de operações bancarias de emergência
- Comunicação proativa aos clientes (SMS/push notification)
- Linha de apoio reforcada

**Validação:** `RTO (30min) + WRT (1h) = 1h30 <= MTD (2h)` ✓

**Para refletir:**
- Porque e que o RPO tem de ser zero num banco?
- Que tipo de infraestrutura justifica um RPO de zero? (replicação sincrona, clusters ativos-ativos)
- Que regulações se aplicam? (PSD2, regulação do Banco de Portugal)
- Qual e o custo por hora de indisponibilidade?

---

## Caso 5 - Fabrica (Sistema SCADA/ICS de controlo industrial)

**Cenário:** O sistema SCADA que controla uma linha de produção de uma fabrica de componentes automóveis falha as 06h00, durante o turno da manha.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 30 minutos | Dados de produção das últimas meias horas podem ser reconstruidos a partir de registos físicos |
| **RTO** | 45 minutos | Além disso, há risco de danos em equipamentos e perda de materia-prima |
| **WRT** | 2 horas | Recalibracao de sensores, verificação de qualidade, reinicio controlado da linha |
| **MTD** | 4 horas | Atrasos na entrega a clientes (just-in-time), penalizações contratuais |

**MOR:**
- Monitorização manual dos processos críticos
- Paragem segura da linha (não abrupta)
- Equipa de manutenção industrial on-site
- Comunicação com clientes sobre possiveis atrasos
- Registo manual de produção

**Validação:** `RTO (45min) + WRT (2h) = 2h45 <= MTD (4h)` ✓

**Para refletir:**
- Neste caso, a falha não é só de TI - envolve **segurança física** (equipamentos, pessoas).
- O WRT inclui **recalibração física** de equipamentos, não só verificação de dados.
- Diferença entre IT (Information Technology) e OT (Operational Technology).
- Implicações de ciberseguranca em sistemas industriais (referência: IEC 62443).

---

## Caso 6 - Escritório de advogados (Sistema de gestão documental)

**Cenário:** O sistema de gestão documental de um escritório de advogados fica indisponível numa manha em que há prazos judiciais a cumprir.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 4 horas | Documentos são guardados localmente e podem ser reenviados para o sistema |
| **RTO** | 4 horas | A equipa pode trabalhar offline temporariamente |
| **WRT** | 3 horas | Re-upload de documentos, verificação de versões, sincronizacao |
| **MTD** | 8 horas | Ultrapassando 8 horas, há risco de incumprimento de prazos judiciais |

**MOR:**
- Acesso a copias locais de documentos urgentes
- Email funcional para comunicação com tribunais
- Pelo menos um advogado com acesso ao sistema judicial online
- Secretariado mínimo para apoio administrativo

**Validação:** `RTO (4h) + WRT (3h) = 7h <= MTD (8h)` ✓

**Para refletir:**
- Nem todos os sistemas precisam de RPO agressivo.
- A existencia de **copias locais** permite RPO mais relaxado.
- O verdadeiro risco não é técnico: e **legal** (prazos judiciais).
- Como e que a classificação do ativo (documentos judiciais vs. templates internos) afeta as métricas?

---

## Caso 7 - Startup SaaS (Plataforma de videoconferencia)

**Cenário:** Uma startup que fornece serviços de videoconferencia B2B sofre uma falha na plataforma as 10h00, durante o horario de pico de reuniões dos seus clientes empresariais.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 1 hora | Gravacoes de reuniões podem ser perdidas, mas não há dados transacionais críticos |
| **RTO** | 20 minutos | Clientes empresariais esperam alta disponibilidade (SLA de 99.9%) |
| **WRT** | 40 minutos | Restauro de sessões, reconexao de utilizadores, verificação de qualidade |
| **MTD** | 1 hora 30 minutos | Além disso, clientes começam a migrar para concorrencia |

**MOR:**
- Audio funcional (video pode estar degradado)
- Chat de texto operacional
- Máximo de 100 participantes por sala (vs. 500 normal)
- Pagina de status pública atualizada
- Equipa de suporte a responder tickets

**Validação:** `RTO (20min) + WRT (40min) = 1h <= MTD (1h30)` ✓

**Para refletir:**
- O MOR aqui e particularmente interessante: **modo degradado** com funcionalidades reduzidas.
- Como e que o SLA contratual (99.9% = ~8.7h de downtime/ano) influencia as métricas?
- Qual e a diferença entre SLA (compromisso contratual) e RTO (objetivo interno)?
- Reputacao em startups: o MTD pode ser mais curto do que o esperado.

---

## Caso 8 - Autarquia (Portal de serviços ao cidadão)

**Cenário:** O portal online de uma câmara municipal fica em baixo. Os cidadaos não conseguem submeter requerimentos, pagar taxas ou marcar atendimentos.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 24 horas | Os dados podem ser reconstruidos a partir de registos em papel do balcao |
| **RTO** | 8 horas | Existe atendimento presencial como alternativa |
| **WRT** | 4 horas | Verificação de submissoes, sincronizacao com sistemas internos |
| **MTD** | 24 horas | Além de 24 horas, afeta serviços essenciais ao cidadão |

**MOR:**
- Atendimento presencial nos balcoes (com formularios em papel)
- Telefone de apoio ao cidadão funcional
- Email institucional operacional
- Pelo menos um técnico de TI disponível

**Validação:** `RTO (8h) + WRT (4h) = 12h <= MTD (24h)` ✓

**Para refletir:**
- Caso com **baixa criticidade técnica** mas **alta criticidade social**.
- A existencia de **canais alternativos** (balcao físico) permite métricas mais relaxadas.
- Diferença entre serviços publicos e privados na definicao de criticidade.
- Período crítico vs. período normal: durante eleicoes, estas métricas mudariam drasticamente.

---

## Caso 9 - Empresa de logística (Sistema de rastreamento de encomendas)

**Cenário:** O sistema GPS de rastreamento de uma frota de 200 camioes de distribuição falha durante a epoca natalicia.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 15 minutos | Posicoes GPS recentes são críticas para rotas e entregas |
| **RTO** | 1 hora | Os motoristas podem continuar a conduzir mas sem otimizacao de rotas |
| **WRT** | 1 hora | Ressincronizacao de posicoes, atualização de ETAs para clientes |
| **MTD** | 3 horas | Atrasos generalizados nas entregas, insatisfacao dos clientes |

**MOR:**
- Comunicação por telefone com motoristas
- Rotas pré-definidas impressas
- Atualizacao manual de status no site
- Equipa de dispatching a operar por telefone
- Prioridade nas entregas urgentes/pereciveis

**Validação:** `RTO (1h) + WRT (1h) = 2h <= MTD (3h)` ✓

**Para refletir:**
- O MOR mostra como processos **pré-tecnológicos** podem servir de fallback.
- A epoca do ano (Natal) muda a criticidade - fora da epoca, o MTD poderia ser 8h.
- Diferença entre dados em tempo real (posicoes GPS) e dados históricos.
- Impacto em cascata: uma falha na logística afeta múltiplos clientes.

---

## Caso 10 - Escola secundária (Plataforma de ensino a distância)

**Cenário:** A plataforma de ensino online de uma escola falha as 08h30 de uma segunda-feira, no início das aulas.

| Métrica | Valor | Justificação |
|---------|-------|-------------|
| **RPO** | 8 horas | Conteúdos podem ser reenviados; trabalhos submetidos tem copias locais nos alunos |
| **RTO** | 4 horas | As aulas da manha podem ser reorganizadas para a tarde |
| **WRT** | 2 horas | Verificação de submissoes, notificação de alunos e professores |
| **MTD** | 24 horas | Além de 24 horas, compromete o calendario escolar |

**MOR:**
- Email funcional para comunicação com alunos
- Professores com acesso aos materiais localmente
- Possibilidade de aulas presenciais como alternativa
- Secretaria a atender por telefone

**Validação:** `RTO (4h) + WRT (2h) = 6h <= MTD (24h)` ✓

**Para refletir:**
- Grande margem entre RTO+WRT (6h) e MTD (24h) - isto é bom ou mau?
- Resposta: pode significar que o investimento em recuperação rápida não se justifica.
- A existencia de **modo presencial** como fallback muda completamente a análise.
- Comparar com o caso da universidade (Caso 3): porque e que as métricas são diferentes?

---

## Tabela comparativa de todos os casos

| Caso | Setor | RPO | RTO | WRT | MTD | Criticidade |
|------|-------|-----|-----|-----|-----|-------------|
| 1 | E-commerce | 15 min | 1h | 2h | 4h | Alta |
| 2 | Hospital | ~0 | 15 min | 30 min | 1h | Crítica |
| 3 | Universidade | 1h | 2h | 4h | 8h | Media-Alta |
| 4 | Banco | 0 | 30 min | 1h | 2h | Crítica |
| 5 | Fabrica | 30 min | 45 min | 2h | 4h | Alta |
| 6 | Advogados | 4h | 4h | 3h | 8h | Media |
| 7 | Startup SaaS | 1h | 20 min | 40 min | 1h30 | Alta |
| 8 | Autarquia | 24h | 8h | 4h | 24h | Baixa-Media |
| 9 | Logística | 15 min | 1h | 1h | 3h | Alta |
| 10 | Escola | 8h | 4h | 2h | 24h | Baixa |

---

## Padrões a observar

1. **Quanto mais crítico o serviço, menores são RPO e RTO.**
2. **A existencia de canais alternativos (presencial, telefone) permite métricas mais relaxadas.**
3. **O contexto temporal muda tudo**: a mesma plataforma tem métricas diferentes em epocas críticas vs. normais.
4. **Setores regulados** (saúde, financeiro) tendem a ter métricas mais agressivas por obrigação legal.
5. **O MOR e o plano B**: deve estar documentado e **testado** antes de ser preciso.

---

*Próximo: [Exercícios](exercicios.md) - Exercícios para os alunos resolverem*
