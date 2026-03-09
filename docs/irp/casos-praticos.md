# Casos Praticos - Incident Response Plan

Casos praticos completos que percorrem **todo o ciclo de resposta a incidentes**: detecao, classificacao, reacao, contencao, recuperacao e licoes aprendidas.

Cada caso e independente e pode ser usado para estudo ou discussao em aula. Os cenarios sao ficticios mas baseados em situacoes reais.

!!! tip "Como usar estes casos"
    Cada caso segue a mesma estrutura do ciclo IRP. Tente primeiro **identificar o que faria em cada fase** antes de ler a resposta. Os casos estao ordenados por complexidade crescente.

---

## Caso 1 - Universidade: Campanha de spear-phishing contra docentes

### Contexto

Uma universidade publica com 12.000 alunos e 800 funcionarios recebe, numa terca-feira de manha, multiplas chamadas no helpdesk. Varios docentes reportam ter recebido um email aparentemente enviado pelo reitor, pedindo que "confirmem as credenciais" num formulario online por causa de uma "migracao do email institucional".

O helpdesk recebe 15 chamadas em 90 minutos. Alguns docentes admitem ter preenchido o formulario.

### Fase 1 - Detecao

| Elemento | Detalhe |
|----------|---------|
| **Fonte de detecao** | Humana (utilizadores reportam ao helpdesk) |
| **Primeiro indicador** | Possivel — varios emails semelhantes reportados (pode ser spam comum) |
| **Escalamento** | Helpdesk encaminha ao coordenador de seguranca apos 5.ª chamada em 30 minutos |
| **Confirmacao** | Provavel → Definitivo: URL do formulario e externo, dominio registado ha 2 dias, certificado SSL gratuito |

**Sinais criticos:**

- Volume anomalo de chamadas num curto periodo
- Email imita comunicacao oficial (logo, assinatura do reitor)
- URL aponta para dominio externo semelhante ao institucional (`univ-leiria-mail.com` vs `ipleiria.pt`)
- Pelo menos 8 docentes confirmam ter introduzido credenciais

### Fase 2 - Classificacao

| Criterio | Avaliacao |
|----------|-----------|
| **Tipo de incidente** | Comprometimento de credenciais via phishing |
| **Impacto CIA** | **Confidencialidade** — credenciais expostas; acesso potencial a email, plataformas academicas, dados de alunos |
| **Severidade** | Alta — 8+ contas comprometidas com acesso a sistemas criticos |
| **Perimetro estimado** | 800 destinatarios, 8 contas confirmadas comprometidas, potencialmente mais |

**Decisao:** Ativar equipa de resposta a incidentes. Nao e desastre (sistemas continuam operacionais), mas requer resposta coordenada urgente.

### Fase 3 - Reacao

**Acoes imediatas (primeiros 30 minutos):**

1. Reset de password de todas as 8 contas confirmadas
2. Invalidacao de todas as sessoes ativas dessas contas
3. Bloquear o dominio malicioso no proxy e no filtro de email
4. Colocar em quarentena todos os emails do mesmo remetente

**Notificacao:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO | Imediatamente | Coordenacao da resposta |
| Diretor de TI | Imediatamente | Recursos e decisoes tecnicas |
| Reitoria | Dentro de 1 hora | Implicacao institucional (nome do reitor usado) |
| DPO | Dentro de 2 horas | Possivel violacao de dados pessoais (RGPD) |

**Documentacao iniciada:** Registo cronologico desde a primeira chamada ao helpdesk.

### Fase 4 - Contencao

**Estrategia:** Contencao seletiva — bloquear o vetor de ataque sem afetar operacoes normais.

| Acao | Justificacao |
|------|-------------|
| Bloquear dominio malicioso (proxy + DNS + email) | Impedir novos cliques |
| Reset forcado das 8 contas | Revogar acesso ao atacante |
| Ativar MFA temporario nas contas afetadas | Prevenir reutilizacao mesmo que password seja conhecida |
| Analisar logs de acesso das contas comprometidas | Determinar se o atacante ja usou as credenciais |
| Enviar comunicacao a toda a universidade | Alertar para nao clicar e reportar se ja clicaram |

**Descoberta durante contencao:** A analise de logs revela que 3 das 8 contas foram acedidas a partir de um IP na Holanda, 20 minutos apos o preenchimento do formulario. O atacante descarregou emails e acedeu a plataforma de notas.

### Fase 5 - Recuperacao

**Avaliacao de danos:**

- 3 contas efetivamente exploradas pelo atacante
- Emails de 3 docentes potencialmente lidos/exfiltrados
- Plataforma de notas acedida mas sem alteracoes detetadas
- Nenhum dado financeiro exposto
- Dados pessoais de alunos (nomes, emails, notas) potencialmente acedidos

**Acoes de recuperacao:**

1. **Corrigir vulnerabilidades:** Implementar MFA obrigatorio para todos os docentes (nao apenas os afetados)
2. **Restaurar confianca:** Comunicacao transparente aos docentes afetados sobre o que foi acedido
3. **Melhorar detecao:** Configurar alerta automatico para logins de geolocalizacoes anomalas
4. **Formacao:** Sessao de sensibilizacao anti-phishing para toda a comunidade academica
5. **Notificacao CNPD:** Avaliacao com DPO — se dados pessoais de alunos foram acedidos, notificacao obrigatoria em 72 horas

### Licoes aprendidas

| Questao | Conclusao |
|---------|-----------|
| O que funcionou? | Utilizadores reportaram rapidamente; helpdesk escalou em tempo util |
| O que falhou? | Ausencia de MFA permitiu uso imediato das credenciais roubadas |
| O que mudar? | MFA obrigatorio; simulacoes de phishing periodicas; melhor filtragem de email |
| Tempo de resposta | Detecao: 30 min, Contencao: 2h, Recuperacao total: 48h |

---

## Caso 2 - Hospital: Ransomware no sistema de gestao de exames

### Contexto

Um hospital distrital com 400 camas e 1.200 funcionarios deteta, as 06h30 de um sabado, que o sistema PACS (Picture Archiving and Communication System) — que armazena e distribui exames de imagiologia (raio-X, TAC, ressonancia) — esta inacessivel. Os tecnicos de radiologia nao conseguem consultar nem armazenar exames.

O tecnico de servico tenta reiniciar o servidor e depara-se com uma mensagem de ransomware exigindo pagamento em criptomoeda.

### Fase 1 - Detecao

| Elemento | Detalhe |
|----------|---------|
| **Fonte de detecao** | Humana (tecnico de radiologia) + Tecnologica (servidor nao responde) |
| **Primeiro indicador** | Definitivo — mensagem de ransomware visivel |
| **Hora critica** | Sabado as 06h30 — equipa de TI reduzida, urgencias em funcionamento |
| **Escalamento** | Tecnico → Responsavel de turno TI → CISO (contacto de emergencia) |

**Agravante:** E sabado de manha. A equipa de TI habitual nao esta disponivel. As urgencias estao a funcionar com doentes que podem precisar de exames de imagiologia.

### Fase 2 - Classificacao

| Criterio | Avaliacao |
|----------|-----------|
| **Tipo de incidente** | Ransomware — cifra de dados com pedido de resgate |
| **Impacto CIA** | **Disponibilidade** (sistema critico em baixo) + **Confidencialidade** (possivel exfiltracao pre-cifra) + **Integridade** (dados potencialmente corrompidos) |
| **Severidade** | Critica — sistema de saude com impacto direto em doentes |
| **Perimetro estimado** | Servidor PACS confirmado; necessario verificar se propagou a outros sistemas |

**Decisao:** Ativar IRP com prioridade maxima. Avaliar se atinge limiar de desastre (DRP) — depende da propagacao a outros sistemas clinicos.

### Fase 3 - Reacao

**Acoes imediatas (primeiros 15 minutos):**

1. **NAO desligar o servidor** — preservar evidencias em memoria
2. Isolar o servidor PACS da rede (desligar cabo de rede, nao a maquina)
3. Verificar se outros servidores clinicos estao operacionais
4. Ativar procedimento alternativo para exames (impressao fisica, CD)

**Notificacao:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO | Imediatamente | Coordenacao da resposta e decisao sobre pagamento |
| Direcao clinica | Imediatamente | Impacto no atendimento a doentes |
| Administracao hospitalar | Dentro de 30 min | Decisao estrategica (pagar resgate? comunicacao publica?) |
| DPO | Dentro de 1 hora | Dados de saude regulados (RGPD — dados sensiveis) |
| Autoridade de saude | Conforme regulacao | Obrigacao legal de reporte |
| Policia Judiciaria | Dentro de 24h | Crime informatico |

**Decisao critica:** O hospital decide **NAO pagar o resgate**, seguindo recomendacoes do Centro Nacional de Ciberseguranca (CNCS).

### Fase 4 - Contencao

**Estrategia:** Contencao agressiva — prioridade e proteger outros sistemas clinicos e a seguranca dos doentes.

| Acao | Justificacao |
|------|-------------|
| Isolar servidor PACS da rede | Impedir propagacao lateral |
| Verificar todos os servidores clinicos | Determinar perimetro real da infecao |
| Bloquear comunicacao com servidores C2 conhecidos | Cortar ligacao com o atacante |
| Mudar credenciais de todas as contas de servico | O atacante pode ter credenciais adicionais |
| Ativar plano de contingencia clinico | Garantir continuidade de cuidados |

**Resultado da verificacao:** O ransomware esta confinado ao servidor PACS. Nao se propagou a outros sistemas — a segmentacao de rede funcionou.

**Plano de contingencia clinico ativado:**

- Exames de urgencia: impressos em pelicula, entregues em mao
- Exames eletivos: adiados para segunda-feira
- Comunicacao aos medicos sobre procedimento alternativo

### Fase 5 - Recuperacao

**Avaliacao de danos:**

- Servidor PACS cifrado — dados inacessiveis
- Backup mais recente: sexta-feira as 23h00 (7,5 horas antes)
- Exames realizados entre 23h00 de sexta e 06h30 de sabado: 12 exames de urgencia
- Sem evidencia de exfiltracao de dados (mas nao se pode excluir)

**Acoes de recuperacao:**

1. **Preservar provas:** Criar imagem forense do servidor antes de qualquer restauro
2. **Restaurar de backup:** Reinstalar servidor limpo e restaurar dados do backup de sexta-feira
3. **Recuperar exames perdidos:** 8 dos 12 exames de urgencia podem ser repetidos; 4 foram impressos e podem ser digitalizados
4. **Corrigir vetor de entrada:** Investigacao revela que o ransomware entrou via RDP exposto — fechar RDP, implementar VPN
5. **Hardening:** Atualizar antivirus, aplicar patches pendentes, rever permissoes
6. **Monitorizacao reforcada:** 14 dias com vigilancia intensiva de todos os sistemas clinicos

**Timeline de restauro:**

| Marco | Tempo |
|-------|-------|
| Servidor PACS restaurado | Sabado 18h00 (11,5h apos detecao) |
| Exames historicos disponiveis | Sabado 20h00 |
| Funcionamento normal completo | Domingo 10h00 |

### Licoes aprendidas

| Questao | Conclusao |
|---------|-----------|
| O que funcionou? | Segmentacao de rede impediu propagacao; backup recente permitiu restauro rapido |
| O que falhou? | RDP exposto a Internet sem MFA; ausencia de monitorizacao 24/7 |
| O que mudar? | Eliminar RDP exposto; implementar EDR; backup imutavel; equipa de resposta ao fim-de-semana |
| Tempo de resposta | Detecao: imediata, Contencao: 1h, Restauro: 11,5h, Normal: 27,5h |

---

## Caso 3 - Banco: Intrusao no sistema de transferencias interbancarias

### Contexto

Um banco de media dimensao deteta, durante uma auditoria de rotina numa quarta-feira, transacoes invulgares no sistema de transferencias interbancarias (SWIFT). Existem 47 transferencias de pequeno valor (entre 500€ e 2.000€) para contas em 3 paises diferentes, realizadas nas ultimas 72 horas, fora do padrao habitual.

A equipa de auditoria interna escala imediatamente para a area de seguranca.

### Fase 1 - Detecao

| Elemento | Detalhe |
|----------|---------|
| **Fonte de detecao** | Humana (auditoria interna) + Tecnologica (anomalia em registos transacionais) |
| **Primeiro indicador** | Provavel — transacoes atipicas em volume e destino |
| **Confirmacao** | Definitivo: contas de destino sao novas, criadas recentemente, em paises sem relacao comercial habitual |
| **Atraso na detecao** | 72 horas — transacoes ja tinham sido executadas |

**Fator critico:** O atacante usou transferencias de **pequeno valor** para evitar os limiares de alerta automatico (que disparam acima de 10.000€). Tecnica conhecida como "salami slicing".

### Fase 2 - Classificacao

| Criterio | Avaliacao |
|----------|-----------|
| **Tipo de incidente** | Fraude financeira via comprometimento de sistema critico |
| **Impacto CIA** | **Integridade** (transacoes fraudulentas) + **Confidencialidade** (acesso nao autorizado ao sistema SWIFT) |
| **Severidade** | Critica — impacto financeiro direto, regulatorio e reputacional |
| **Valor total** | ~52.000€ em transferencias fraudulentas |

**Decisao:** Ativar IRP com equipa alargada incluindo compliance, juridico e comunicacao com regulador.

### Fase 3 - Reacao

**Acoes imediatas (primeiros 15 minutos):**

1. Suspender todas as transferencias pendentes para as contas de destino identificadas
2. Bloquear as credenciais usadas nas transacoes suspeitas
3. Contactar bancos correspondentes para tentar reverter/congelar fundos
4. Preservar todos os logs do sistema SWIFT dos ultimos 7 dias

**Notificacao:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO e Diretor de TI | Imediatamente | Coordenacao tecnica |
| Administracao do banco | Imediatamente | Impacto financeiro e decisoes estrategicas |
| Compliance Officer | Dentro de 30 min | Obrigacoes regulatorias |
| Banco de Portugal | Conforme regulacao | Reporte obrigatorio de incidente significativo |
| SWIFT (rede) | Dentro de 2h | Protocolo de seguranca da rede SWIFT |
| Policia Judiciaria | Dentro de 24h | Crime financeiro |

**Decisao critica:** Manter o sistema SWIFT operacional com monitorizacao reforcada, ou desliga-lo? Decisao: manter ativo com aprovacao manual de todas as transferencias internacionais.

### Fase 4 - Contencao

**Estrategia:** Contencao cirurgica — nao interromper operacoes bancarias mas eliminar o acesso do atacante.

| Acao | Justificacao |
|------|-------------|
| Revogar todas as credenciais de acesso ao SWIFT | Eliminar acessos comprometidos |
| Implementar aprovacao dual (4 olhos) para todas as transferencias | Prevenir novas transacoes fraudulentas |
| Isolar e analisar a estacao de trabalho usada | Determinar vetor de entrada |
| Rever todos os acessos privilegiados dos ultimos 30 dias | Procurar outros comprometimentos |
| Contactar bancos de destino para congelamento de fundos | Tentar recuperar o dinheiro |

**Descoberta durante contencao:** O atacante comprometeu as credenciais de um operador atraves de um documento Word malicioso enviado por email 2 semanas antes. O malware instalou um keylogger que capturou as credenciais SWIFT.

### Fase 5 - Recuperacao

**Avaliacao de danos:**

- 47 transferencias fraudulentas: 52.300€
- 18 transferencias possivelmente reverssiveis (23.100€) — fundos ainda nas contas de destino
- 29 transferencias irrecuperaveis (29.200€) — fundos ja movidos
- 1 estacao de trabalho comprometida (keylogger ativo ha 2 semanas)
- Sem evidencia de acesso a dados de clientes para alem das transacoes

**Acoes de recuperacao:**

1. **Pericia forense:** Analise completa da estacao comprometida — determinar exatamente o que o atacante acedeu
2. **Recuperar fundos:** Trabalhar com bancos correspondentes e autoridades para congelar e reverter transferencias
3. **Reconstruir estacao:** Reinstalar de raiz a estacao comprometida
4. **Reforcar autenticacao:** Implementar tokens fisicos (hardware) para acesso ao SWIFT
5. **Melhorar detecao:** Baixar limiares de alerta; implementar detecao de padroes (multiplas transferencias pequenas)
6. **Rever politica de email:** Sandboxing de anexos, bloqueio de macros Word por defeito
7. **Reporte regulatorio:** Reporte detalhado ao Banco de Portugal conforme prazos regulatorios

### Licoes aprendidas

| Questao | Conclusao |
|---------|-----------|
| O que funcionou? | Auditoria de rotina detetou o que os alertas automaticos falharam |
| O que falhou? | Limiares de alerta demasiado altos; falta de autenticacao forte no SWIFT; macro Word permitida |
| O que mudar? | Tokens fisicos para SWIFT; detecao de padroes; sandboxing de email; limiares adaptativos |
| Tempo de resposta | Detecao: 72h (atraso critico), Contencao: 4h apos detecao, Recuperacao financeira: em curso |

---

## Caso 4 - E-commerce: Ataque combinado durante campanha promocional

### Contexto

Uma plataforma de e-commerce portuguesa com 50.000 clientes registados lanca uma campanha de Black Friday. Na sexta-feira as 10h00, com trafego 5x superior ao normal, a equipa de operacoes deteta dois problemas simultaneos:

1. O site esta extremamente lento (tempos de resposta >15 segundos)
2. Clientes reportam erros estranhos na pagina de checkout

A equipa inicialmente assume que e apenas sobrecarga pela campanha.

### Fase 1 - Detecao

| Elemento | Detalhe |
|----------|---------|
| **Fonte de detecao** | Tecnologica (APM — Application Performance Monitoring) + Humana (clientes via chat) |
| **Primeiro indicador** | Possivel — pode ser sobrecarga legitima (Black Friday) |
| **Escalamento T+15min** | Provavel — padroes de trafego inconsistentes com utilizadores reais (80% de requests de IPs do mesmo bloco) |
| **Confirmacao T+30min** | Definitivo: dois ataques simultaneos — DDoS volumetrico + tentativas de SQL injection no checkout |

**Complexidade:** O atacante usou o DDoS como **diversao** para mascarar o verdadeiro ataque (SQL injection no formulario de checkout). A equipa quase se focou exclusivamente no DDoS.

### Fase 2 - Classificacao

| Criterio | Avaliacao |
|----------|-----------|
| **Tipo de incidente** | Ataque combinado: DDoS + SQL injection |
| **Impacto CIA** | **Disponibilidade** (DDoS) + **Confidencialidade** (SQL injection pode expor dados de clientes) |
| **Severidade** | Critica — Black Friday (maior dia de vendas do ano) + possivel fuga de dados |
| **Impacto financeiro estimado** | ~8.000€/hora em vendas perdidas |

**Decisao:** Ativar IRP com dois tracks paralelos — mitigacao de DDoS e investigacao de SQL injection. A SQL injection e a prioridade real (dados de clientes).

### Fase 3 - Reacao

**Acoes imediatas — Track 1 (DDoS):**

1. Ativar protecao anti-DDoS do CDN (Cloudflare/AWS Shield)
2. Implementar rate limiting agressivo
3. Bloquear blocos de IP identificados como maliciosos

**Acoes imediatas — Track 2 (SQL injection):**

1. Colocar WAF (Web Application Firewall) em modo bloqueio para o checkout
2. Analisar logs do servidor de base de dados
3. Verificar se alguma query maliciosa foi bem-sucedida

**Notificacao:**

| Quem | Quando | Porque |
|------|--------|--------|
| CTO | Imediatamente | Coordenacao tecnica e decisao sobre manter site ativo |
| CEO | Dentro de 30 min | Impacto financeiro direto (Black Friday) |
| DPO | Dentro de 1h | Potencial fuga de dados de clientes |
| Equipa de comunicacao | Dentro de 1h | Clientes estao a reclamar nas redes sociais |

**Dilema critico:** Manter o site ativo durante a Black Friday (aceitar risco) ou colocar em manutencao (perda financeira certa)?

**Decisao:** Manter o site ativo mas desativar temporariamente o checkout ate a SQL injection ser corrigida. Redirecionar para pagina informativa: "Voltamos em breve — as suas ofertas estao guardadas."

### Fase 4 - Contencao

**Track 1 — DDoS:**

| Acao | Resultado |
|------|-----------|
| CDN anti-DDoS ativado | Trafego malicioso filtrado em 20 minutos |
| Rate limiting | Requests por IP limitados a 60/minuto |
| Geo-blocking temporario | Bloqueados paises sem clientes significativos |

**Track 2 — SQL injection:**

| Acao | Resultado |
|------|-----------|
| WAF em modo bloqueio | Tentativas de injection bloqueadas |
| Analise de logs da BD | 3 queries maliciosas parcialmente bem-sucedidas |
| Avaliacao de dados expostos | Atacante acedeu a tabela de clientes: nomes, emails, moradas |
| Verificacao de dados de pagamento | Dados de cartao NAO expostos (processados por gateway externo — Stripe) |

**Descoberta critica:** O atacante conseguiu extrair dados de 2.300 clientes (nomes, emails, moradas de envio). Dados de pagamento nao foram comprometidos porque sao processados externamente.

### Fase 5 - Recuperacao

**Avaliacao de danos:**

- DDoS: 2 horas de degradacao severa, 45 minutos de checkout indisponivel
- SQL injection: dados de 2.300 clientes expostos (sem dados financeiros)
- Impacto financeiro: ~12.000€ em vendas perdidas + custos de resposta
- Impacto reputacional: reclamacoes nas redes sociais, cobertura mediatica

**Acoes de recuperacao:**

1. **Corrigir vulnerabilidade:** Patch do formulario de checkout (prepared statements em vez de concatenacao SQL)
2. **Auditoria de codigo:** Revisao de todos os formularios para vulnerabilidades similares
3. **Restaurar checkout:** Reativar com WAF permanente e monitorizacao reforcada
4. **Notificar clientes afetados:** Email personalizado aos 2.300 clientes com explicacao transparente
5. **Notificacao CNPD:** Obrigatoria em 72 horas (dados pessoais de 2.300 pessoas)
6. **Compensacao:** Voucher de desconto aos clientes afetados como gesto de boa-fe
7. **Melhorar infraestrutura:** CDN anti-DDoS permanente (nao apenas reativo); WAF always-on

**Timeline:**

| Marco | Tempo |
|-------|-------|
| DDoS mitigado | T+35 min |
| Checkout reativado (com patch) | T+2h15 |
| Vendas normalizadas | T+3h |
| Notificacao a clientes | T+48h |
| Notificacao CNPD | T+60h |

### Licoes aprendidas

| Questao | Conclusao |
|---------|-----------|
| O que funcionou? | CDN anti-DDoS eficaz; dados de pagamento protegidos (gateway externo) |
| O que falhou? | Vulnerabilidade SQL injection basica no checkout; DDoS quase mascarou o ataque real |
| O que mudar? | Code review obrigatorio pre-deploy; WAF permanente; plano de Black Friday com equipa reforcada |
| Tempo de resposta | Detecao: 30 min, Contencao DDoS: 35 min, Contencao SQL injection: 2h15, Normal: 3h |

---

## Caso 5 - Industria: Comprometimento de rede OT com risco de seguranca fisica

### Contexto

Uma fabrica de componentes automoveis com 300 trabalhadores utiliza sistemas SCADA para controlar linhas de producao automatizadas (fornos, prensas, robos de montagem). Numa quinta-feira as 14h00, um operador nota que os valores de temperatura de um forno industrial exibidos no HMI (Human-Machine Interface) estao errados: o ecrã mostra 0°C quando o forno deveria estar a 850°C.

O operador, experiente, sabe que isto e fisicamente impossivel — o forno esta visivelmente quente. Reporta imediatamente ao supervisor.

### Fase 1 - Detecao

| Elemento | Detalhe |
|----------|---------|
| **Fonte de detecao** | Humana (operador com conhecimento do processo fisico) |
| **Primeiro indicador** | Definitivo — valores fisicamente impossiveis num sistema de controlo critico |
| **Fator humano** | A experiencia do operador foi decisiva. Um sistema automatico poderia ter interpretado "0°C" como "forno desligado" |
| **Risco imediato** | Se os controladores automaticos "acreditarem" que o forno esta a 0°C, podem **aumentar a temperatura** sem limite — risco de explosao/incendio |

**Urgencia extrema:** Este nao e apenas um incidente de TI. Ha risco de **seguranca fisica** para pessoas e equipamentos.

### Fase 2 - Classificacao

| Criterio | Avaliacao |
|----------|-----------|
| **Tipo de incidente** | Comprometimento de sistema de controlo industrial (OT) |
| **Impacto CIA** | **Integridade** (dados de sensores adulterados) + **Disponibilidade** (sistema de controlo nao fidedigno) |
| **Severidade** | Critica com risco de seguranca fisica |
| **Perimetro estimado** | Pelo menos 1 forno; necessario verificar todos os sistemas de controlo |

**Decisao:** Ativar IRP com componente de seguranca fisica. Paragem de emergencia do forno afetado. Verificacao imediata de todos os outros equipamentos controlados.

### Fase 3 - Reacao

**Acoes imediatas (primeiros 5 minutos):**

1. **Paragem de emergencia** do forno afetado (botao fisico de emergencia)
2. **Evacuacao da zona** do forno por precaucao
3. **Verificacao manual** de todos os outros fornos e equipamentos criticos
4. **Passagem a controlo manual** de todos os equipamentos SCADA

**Notificacao:**

| Quem | Quando | Porque |
|------|--------|--------|
| Diretor de producao | Imediatamente | Seguranca fisica dos trabalhadores |
| Responsavel de seguranca fisica | Imediatamente | Risco de acidente industrial |
| CISO / TI | Imediatamente | Investigacao do comprometimento |
| Administracao | Dentro de 30 min | Paragem de producao, impacto financeiro |
| Autoridades (se necessario) | Conforme gravidade | Potencial sabotagem industrial |

**Decisao critica:** Parar **toda** a producao ou apenas o forno afetado?

**Decisao:** Parar toda a linha do forno afetado. Manter as outras linhas em funcionamento com **monitorizacao manual continua** e verificacao cruzada de valores.

### Fase 4 - Contencao

**Estrategia:** Contencao por segmentacao — isolar rede OT e investigar.

| Acao | Justificacao |
|------|-------------|
| Desconectar gateway entre rede corporativa e rede OT | Cortar possivel vetor de ataque |
| Manter equipamentos em modo manual | Garantir seguranca fisica enquanto se investiga |
| Capturar trafego de rede OT | Preservar evidencias de comunicacoes anomalas |
| Verificar integridade de firmware dos PLCs | Determinar se o codigo dos controladores foi alterado |
| Analisar estacoes de engenharia | Procurar malware que possa ter modificado logica de controlo |

**Descobertas durante contencao:**

- Encontrado malware numa estacao de engenharia que faz ponte entre rede corporativa e rede OT
- O malware entrou via pen USB de um fornecedor externo que fez manutencao 5 dias antes
- O malware manipulava os valores enviados dos sensores para os HMIs (ataque man-in-the-middle entre sensores e operadores)
- **Apenas os valores apresentados foram alterados** — a logica dos PLCs nao foi modificada (os controladores continuavam a ver os valores reais)

**Implicacao:** O risco de seguranca fisica era real mas mitigado pelo facto de os PLCs terem os valores corretos. O perigo maior seria se um operador, vendo valores errados, tomasse uma decisao manual incorreta.

### Fase 5 - Recuperacao

**Avaliacao de danos:**

- 1 estacao de engenharia comprometida
- Malware ativo ha 5 dias (desde a visita do fornecedor)
- Sem alteracao de logica de PLCs (confirmado por verificacao de checksum)
- Sem danos fisicos a equipamentos ou pessoas
- Producao parada: 6 horas na linha afetada, 2 horas de verificacao nas outras
- Impacto financeiro: ~25.000€ em producao perdida + custos de investigacao

**Acoes de recuperacao:**

1. **Pericia forense:** Analise completa da estacao de engenharia e do malware
2. **Limpar malware:** Reinstalar estacao de engenharia a partir de golden image verificada
3. **Verificar todos os PLCs:** Comparar firmware atual com versao conhecida como segura (checksum)
4. **Reativar producao:** Gradualmente, comecando por equipamentos verificados
5. **Segmentacao permanente:** Implementar firewall industrial entre rede corporativa e OT
6. **Controlo de acessos fisicos:** Proibir pens USB nao autorizadas; criar estacao de verificacao para fornecedores
7. **Monitorizacao OT:** Implementar IDS especifico para protocolos industriais (Modbus, OPC-UA)

**Timeline:**

| Marco | Tempo |
|-------|-------|
| Forno em paragem segura | T+5 min |
| Malware identificado | T+3h |
| Verificacao de PLCs concluida | T+5h |
| Linha afetada reativada | T+8h |
| Todas as linhas normais | T+10h |
| Segmentacao permanente implementada | T+7 dias |

### Licoes aprendidas

| Questao | Conclusao |
|---------|-----------|
| O que funcionou? | Operador experiente detetou anomalia que sistemas automaticos nao detetaram; PLCs mantiveram logica correta |
| O que falhou? | Sem controlo de dispositivos USB; sem segmentacao adequada entre redes; fornecedor com acesso fisico nao controlado |
| O que mudar? | Segmentacao IT/OT rigorosa; politica de USB; verificacao de equipamentos de fornecedores; IDS industrial |
| Tempo de resposta | Detecao: imediata (operador), Contencao: 3h, Producao normal: 10h |

---

## Tabela comparativa

| | Caso 1 | Caso 2 | Caso 3 | Caso 4 | Caso 5 |
|--|--------|--------|--------|--------|--------|
| **Setor** | Universidade | Hospital | Banco | E-commerce | Industria |
| **Tipo** | Phishing | Ransomware | Fraude financeira | DDoS + SQL injection | Comprometimento OT |
| **CIA** | Confidencialidade | Disp. + Conf. + Integ. | Integridade + Conf. | Disp. + Conf. | Integridade + Disp. |
| **Detecao** | Humana (utilizadores) | Humana (tecnico) | Humana (auditoria) | Tecnologica + Humana | Humana (operador) |
| **Tempo detecao** | 30 min | Imediata | 72h (!) | 30 min | Imediata |
| **Contencao** | 2h | 1h | 4h | 2h15 | 3h |
| **Restauro total** | 48h | 27,5h | Em curso | 3h | 10h |
| **Dados expostos** | Emails + notas | Exames clinicos | Transacoes | 2.300 clientes | Nenhum |
| **Regulador** | CNPD | CNPD + Saude | BdP + SWIFT | CNPD | Autoridade industrial |
| **Risco fisico** | Nao | Indireto (doentes) | Nao | Nao | Sim (seguranca) |

## Padroes a observar

Analisando os 5 casos em conjunto, emergem padroes importantes:

**1. A detecao humana continua essencial**

Em 4 dos 5 casos, a detecao inicial foi humana. Sistemas automaticos detetam anomalias tecnicas, mas sao as pessoas — utilizadores, tecnicos, auditores, operadores — que frequentemente identificam que "algo nao esta certo". A formacao e sensibilizacao dos utilizadores nao e um complemento da seguranca tecnica — e uma **camada critica de detecao**.

**2. O primeiro diagnostico pode estar errado**

No Caso 4, a equipa quase se focou exclusivamente no DDoS sem perceber que era uma diversao para o ataque real (SQL injection). No Caso 5, um sistema automatico poderia ter interpretado "0°C" como forno desligado, em vez de ataque. **Manter a mente aberta e reavaliar continuamente** e uma competencia critica da equipa de resposta.

**3. Contencao vs continuidade — o dilema permanente**

Todos os casos envolvem uma tensao entre "isolar tudo para conter" e "manter servicos para o negocio". Nao ha resposta universal — depende do contexto (dados de saude vs vendas vs seguranca fisica). O plano de resposta deve prever estes dilemas e definir **quem decide e com que criterios**.

**4. A recuperacao vai muito alem do tecnico**

Nenhum caso termina com "servidor restaurado". A recuperacao inclui comunicacao a reguladores, notificacao a afetados, analise forense, melhoria de processos e restauro de confianca. A componente organizacional e tao importante como a tecnica.

**5. Cada incidente revela vulnerabilidades que ja la estavam**

O phishing revela falta de MFA. O ransomware revela RDP exposto. A fraude revela limiares de alerta inadequados. O ataque combinado revela vulnerabilidades de codigo. O ataque OT revela falta de segmentacao. Os incidentes nao criam fraquezas — **expoem fraquezas que ja existiam**.

---

!!! info "Proximo modulo"
    Estes casos praticos cobrem o ciclo completo de resposta a incidentes. Para exercicios focados em competencias especificas, consulte as seccoes de exercicios de cada modulo:

    - [Planeamento — Exercicios](planeamento.md#6-exercicios)
    - [Detecao — Exercicios](detecao.md#5-exercicios)
    - [Reacao — Exercicios](reacao.md#exercicios)
    - [Recuperacao — Exercicios](recuperacao.md#6-exercicios)
