# Casos Praticos Adicionais - Business Impact Analysis

Casos praticos para estudo e discussao em aula, organizados por setor e nivel de criticidade.

---

## Caso 4 - Banco (Sistema de homebanking)

**Cenario:** O sistema de homebanking de um banco fica indisponivel as 09h00 de uma segunda-feira. Os clientes nao conseguem fazer transferencias, consultar saldos ou pagar servicos.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | Zero (0) | Nenhuma transacao financeira pode ser perdida - implicacoes legais e regulatorias |
| **RTO** | 30 minutos | Regulacao e expectativa dos clientes exigem recuperacao rapida |
| **WRT** | 1 hora | Reconciliacao de transacoes, verificacao de saldos, testes de integridade |
| **MTD** | 2 horas | Danos reputacionais graves, possiveis sancoes do regulador (Banco de Portugal) |

**MOR:**
- Consulta de saldos (read-only)
- Transferencias urgentes via canal alternativo (balcao, telefone)
- Equipa de operacoes bancarias de emergencia
- Comunicacao proativa aos clientes (SMS/push notification)
- Linha de apoio reforcada

**Validacao:** `RTO (30min) + WRT (1h) = 1h30 <= MTD (2h)` ✓

**Discussao em aula:**
- Porque e que o RPO tem de ser zero num banco?
- Que tipo de infraestrutura justifica um RPO de zero? (replicacao sincrona, clusters ativos-ativos)
- Que regulacoes se aplicam? (PSD2, regulacao do Banco de Portugal)
- Qual e o custo por hora de indisponibilidade?

---

## Caso 5 - Fabrica (Sistema SCADA/ICS de controlo industrial)

**Cenario:** O sistema SCADA que controla uma linha de producao de uma fabrica de componentes automoveis falha as 06h00, durante o turno da manha.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 30 minutos | Dados de producao das ultimas meias horas podem ser reconstruidos a partir de registos fisicos |
| **RTO** | 45 minutos | Alem disso, ha risco de danos em equipamentos e perda de materia-prima |
| **WRT** | 2 horas | Recalibracao de sensores, verificacao de qualidade, reinicio controlado da linha |
| **MTD** | 4 horas | Atrasos na entrega a clientes (just-in-time), penalizacoes contratuais |

**MOR:**
- Monitorizacao manual dos processos criticos
- Paragem segura da linha (nao abrupta)
- Equipa de manutencao industrial on-site
- Comunicacao com clientes sobre possiveis atrasos
- Registo manual de producao

**Validacao:** `RTO (45min) + WRT (2h) = 2h45 <= MTD (4h)` ✓

**Discussao em aula:**
- Neste caso, a falha nao e so de TI - envolve **seguranca fisica** (equipamentos, pessoas).
- O WRT inclui **recalibracao fisica** de equipamentos, nao so verificacao de dados.
- Diferenca entre IT (Information Technology) e OT (Operational Technology).
- Implicacoes de ciberseguranca em sistemas industriais (referencia: IEC 62443).

---

## Caso 6 - Escritorio de advogados (Sistema de gestao documental)

**Cenario:** O sistema de gestao documental de um escritorio de advogados fica indisponivel numa manha em que ha prazos judiciais a cumprir.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 4 horas | Documentos sao guardados localmente e podem ser reenviados para o sistema |
| **RTO** | 4 horas | A equipa pode trabalhar offline temporariamente |
| **WRT** | 3 horas | Re-upload de documentos, verificacao de versoes, sincronizacao |
| **MTD** | 8 horas | Ultrapassando 8 horas, ha risco de incumprimento de prazos judiciais |

**MOR:**
- Acesso a copias locais de documentos urgentes
- Email funcional para comunicacao com tribunais
- Pelo menos um advogado com acesso ao sistema judicial online
- Secretariado minimo para apoio administrativo

**Validacao:** `RTO (4h) + WRT (3h) = 7h <= MTD (8h)` ✓

**Discussao em aula:**
- Nem todos os sistemas precisam de RPO agressivo.
- A existencia de **copias locais** permite RPO mais relaxado.
- O verdadeiro risco nao e tecnico: e **legal** (prazos judiciais).
- Como e que a classificacao do ativo (documentos judiciais vs. templates internos) afeta as metricas?

---

## Caso 7 - Startup SaaS (Plataforma de videoconferencia)

**Cenario:** Uma startup que fornece servicos de videoconferencia B2B sofre uma falha na plataforma as 10h00, durante o horario de pico de reunioes dos seus clientes empresariais.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 1 hora | Gravacoes de reunioes podem ser perdidas, mas nao ha dados transacionais criticos |
| **RTO** | 20 minutos | Clientes empresariais esperam alta disponibilidade (SLA de 99.9%) |
| **WRT** | 40 minutos | Restauro de sessoes, reconexao de utilizadores, verificacao de qualidade |
| **MTD** | 1 hora 30 minutos | Alem disso, clientes comecam a migrar para concorrencia |

**MOR:**
- Audio funcional (video pode estar degradado)
- Chat de texto operacional
- Maximo de 100 participantes por sala (vs. 500 normal)
- Pagina de status publica atualizada
- Equipa de suporte a responder tickets

**Validacao:** `RTO (20min) + WRT (40min) = 1h <= MTD (1h30)` ✓

**Discussao em aula:**
- O MOR aqui e particularmente interessante: **modo degradado** com funcionalidades reduzidas.
- Como e que o SLA contratual (99.9% = ~8.7h de downtime/ano) influencia as metricas?
- Qual e a diferenca entre SLA (compromisso contratual) e RTO (objetivo interno)?
- Reputacao em startups: o MTD pode ser mais curto do que o esperado.

---

## Caso 8 - Autarquia (Portal de servicos ao cidadao)

**Cenario:** O portal online de uma camara municipal fica em baixo. Os cidadaos nao conseguem submeter requerimentos, pagar taxas ou marcar atendimentos.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 24 horas | Os dados podem ser reconstruidos a partir de registos em papel do balcao |
| **RTO** | 8 horas | Existe atendimento presencial como alternativa |
| **WRT** | 4 horas | Verificacao de submissoes, sincronizacao com sistemas internos |
| **MTD** | 24 horas | Alem de 24 horas, afeta servicos essenciais ao cidadao |

**MOR:**
- Atendimento presencial nos balcoes (com formularios em papel)
- Telefone de apoio ao cidadao funcional
- Email institucional operacional
- Pelo menos um tecnico de TI disponivel

**Validacao:** `RTO (8h) + WRT (4h) = 12h <= MTD (24h)` ✓

**Discussao em aula:**
- Caso com **baixa criticidade tecnica** mas **alta criticidade social**.
- A existencia de **canais alternativos** (balcao fisico) permite metricas mais relaxadas.
- Diferenca entre servicos publicos e privados na definicao de criticidade.
- Periodo critico vs. periodo normal: durante eleicoes, estas metricas mudariam drasticamente.

---

## Caso 9 - Empresa de logistica (Sistema de rastreamento de encomendas)

**Cenario:** O sistema GPS de rastreamento de uma frota de 200 camioes de distribuicao falha durante a epoca natalicia.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 15 minutos | Posicoes GPS recentes sao criticas para rotas e entregas |
| **RTO** | 1 hora | Os motoristas podem continuar a conduzir mas sem otimizacao de rotas |
| **WRT** | 1 hora | Ressincronizacao de posicoes, atualizacao de ETAs para clientes |
| **MTD** | 3 horas | Atrasos generalizados nas entregas, insatisfacao dos clientes |

**MOR:**
- Comunicacao por telefone com motoristas
- Rotas pre-definidas impressas
- Atualizacao manual de status no site
- Equipa de dispatching a operar por telefone
- Prioridade nas entregas urgentes/pereciveis

**Validacao:** `RTO (1h) + WRT (1h) = 2h <= MTD (3h)` ✓

**Discussao em aula:**
- O MOR mostra como processos **pre-tecnologicos** podem servir de fallback.
- A epoca do ano (Natal) muda a criticidade - fora da epoca, o MTD poderia ser 8h.
- Diferenca entre dados em tempo real (posicoes GPS) e dados historicos.
- Impacto em cascata: uma falha na logistica afeta multiplos clientes.

---

## Caso 10 - Escola secundaria (Plataforma de ensino a distancia)

**Cenario:** A plataforma de ensino online de uma escola falha as 08h30 de uma segunda-feira, no inicio das aulas.

| Metrica | Valor | Justificacao |
|---------|-------|-------------|
| **RPO** | 8 horas | Conteudos podem ser reenviados; trabalhos submetidos tem copias locais nos alunos |
| **RTO** | 4 horas | As aulas da manha podem ser reorganizadas para a tarde |
| **WRT** | 2 horas | Verificacao de submissoes, notificacao de alunos e professores |
| **MTD** | 24 horas | Alem de 24 horas, compromete o calendario escolar |

**MOR:**
- Email funcional para comunicacao com alunos
- Professores com acesso aos materiais localmente
- Possibilidade de aulas presenciais como alternativa
- Secretaria a atender por telefone

**Validacao:** `RTO (4h) + WRT (2h) = 6h <= MTD (24h)` ✓

**Discussao em aula:**
- Grande margem entre RTO+WRT (6h) e MTD (24h) - isto e bom ou mau?
- Resposta: pode significar que o investimento em recuperacao rapida nao se justifica.
- A existencia de **modo presencial** como fallback muda completamente a analise.
- Comparar com o caso da universidade (Caso 3): porque e que as metricas sao diferentes?

---

## Tabela comparativa de todos os casos

| Caso | Setor | RPO | RTO | WRT | MTD | Criticidade |
|------|-------|-----|-----|-----|-----|-------------|
| 1 | E-commerce | 15 min | 1h | 2h | 4h | Alta |
| 2 | Hospital | ~0 | 15 min | 30 min | 1h | Critica |
| 3 | Universidade | 1h | 2h | 4h | 8h | Media-Alta |
| 4 | Banco | 0 | 30 min | 1h | 2h | Critica |
| 5 | Fabrica | 30 min | 45 min | 2h | 4h | Alta |
| 6 | Advogados | 4h | 4h | 3h | 8h | Media |
| 7 | Startup SaaS | 1h | 20 min | 40 min | 1h30 | Alta |
| 8 | Autarquia | 24h | 8h | 4h | 24h | Baixa-Media |
| 9 | Logistica | 15 min | 1h | 1h | 3h | Alta |
| 10 | Escola | 8h | 4h | 2h | 24h | Baixa |

---

## Padroes a observar

1. **Quanto mais critico o servico, menores sao RPO e RTO.**
2. **A existencia de canais alternativos (presencial, telefone) permite metricas mais relaxadas.**
3. **O contexto temporal muda tudo**: a mesma plataforma tem metricas diferentes em epocas criticas vs. normais.
4. **Setores regulados** (saude, financeiro) tendem a ter metricas mais agressivas por obrigacao legal.
5. **O MOR e o plano B**: deve estar documentado e **testado** antes de ser preciso.

---

*Proximo: [03-Exercicios](03-exercicios.md) - Exercicios para os alunos resolverem*
