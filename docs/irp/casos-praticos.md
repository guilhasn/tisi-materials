# Casos Práticos - Incident Response Plan

Casos práticos completos que percorrem **todo o ciclo de resposta a incidentes**: deteção, classificação, reação, contenção, recuperação e lições aprendidas.

Cada caso e independente e pode ser usado para estudo ou discussão em aula. Os cenários são fictícios mas baseados em situações reais.

!!! tip "Como usar estes casos"
    Cada caso segue a mesma estrutura do ciclo IRP. Tente primeiro **identificar o que faria em cada fase** antes de ler a resposta. Os casos estão ordenados por complexidade crescente.

---

## Caso 1 - Universidade: Campanha de spear-phishing contra docentes

### Contexto

Uma universidade pública com 12.000 alunos e 800 funcionários recebe, numa terça-feira de manhã, múltiplas chamadas no helpdesk. Vários docentes reportam ter recebido um email aparentemente enviado pelo reitor, pedindo que "confirmem as credenciais" num formulário online por causa de uma "migração do email institucional".

O helpdesk recebe 15 chamadas em 90 minutos. Alguns docentes admitem ter preenchido o formulário.

### Fase 1 - Deteção

| Elemento | Detalhe |
|----------|---------|
| **Fonte de deteção** | Humana (utilizadores reportam ao helpdesk) |
| **Primeiro indicador** | Possível — vários emails semelhantes reportados (pode ser spam comum) |
| **Escalamento** | Helpdesk encaminha ao coordenador de segurança após 5.ª chamada em 30 minutos |
| **Confirmação** | Provável → Definitivo: URL do formulário e externo, domínio registado há 2 dias, certificado SSL gratuito |

**Sinais críticos:**

- Volume anómalo de chamadas num curto período
- Email imita comunicação oficial (logo, assinatura do reitor)
- URL aponta para domínio externo semelhante ao institucional (`univ-leiria-mail.com` vs `ipleiria.pt`)
- Pelo menos 8 docentes confirmam ter introduzido credenciais

### Fase 2 - Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de incidente** | Comprometimento de credenciais via phishing |
| **Impacto CIA** | **Confidencialidade** — credenciais expostas; acesso potencial a email, plataformas académicas, dados de alunos |
| **Severidade** | Alta — 8+ contas comprometidas com acesso a sistemas críticos |
| **Perímetro estimado** | 800 destinatários, 8 contas confirmadas comprometidas, potencialmente mais |

**Decisão:** Ativar equipa de resposta a incidentes. Não é desastre (sistemas continuam operacionais), mas requer resposta coordenada urgente.

### Fase 3 - Reação

**Ações imediatas (primeiros 30 minutos):**

1. Reset de password de todas as 8 contas confirmadas
2. Invalidação de todas as sessões ativas dessas contas
3. Bloquear o domínio malicioso no proxy e no filtro de email
4. Colocar em quarentena todos os emails do mesmo remetente

**Notificação:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO | Imediatamente | Coordenação da resposta |
| Diretor de TI | Imediatamente | Recursos e decisões técnicas |
| Reitoria | Dentro de 1 hora | Implicação institucional (nome do reitor usado) |
| DPO | Dentro de 2 horas | Possível violação de dados pessoais (RGPD) |

**Documentação iniciada:** Registo cronológico desde a primeira chamada ao helpdesk.

### Fase 4 - Contenção

**Estratégia:** Contenção seletiva — bloquear o vetor de ataque sem afetar operações normais.

| Ação | Justificação |
|------|-------------|
| Bloquear domínio malicioso (proxy + DNS + email) | Impedir novos cliques |
| Reset forcado das 8 contas | Revogar acesso ao atacante |
| Ativar MFA temporário nas contas afetadas | Prevenir reutilização mesmo que password seja conhecida |
| Analisar logs de acesso das contas comprometidas | Determinar se o atacante já usou as credenciais |
| Enviar comunicação a toda a universidade | Alertar para não clicar e reportar se já clicaram |

**Descoberta durante contenção:** A análise de logs revela que 3 das 8 contas foram acedidas a partir de um IP na Holanda, 20 minutos após o preenchimento do formulário. O atacante descarregou emails e acedeu a plataforma de notas.

### Fase 5 - Recuperação

**Avaliação de danos:**

- 3 contas efetivamente exploradas pelo atacante
- Emails de 3 docentes potencialmente lidos/exfiltrados
- Plataforma de notas acedida mas sem alterações detetadas
- Nenhum dado financeiro exposto
- Dados pessoais de alunos (nomes, emails, notas) potencialmente acedidos

**Ações de recuperação:**

1. **Corrigir vulnerabilidades:** Implementar MFA obrigatório para todos os docentes (não apenas os afetados)
2. **Restaurar confiança:** Comunicação transparente aos docentes afetados sobre o que foi acedido
3. **Melhorar deteção:** Configurar alerta automático para logins de geolocalizações anómalas
4. **Formação:** Sessão de sensibilização anti-phishing para toda a comunidade académica
5. **Notificação CNPD:** Avaliação com DPO — se dados pessoais de alunos foram acedidos, notificação obrigatória em 72 horas

### Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| O que funcionou? | Utilizadores reportaram rapidamente; helpdesk escalou em tempo útil |
| O que falhou? | Ausência de MFA permitiu uso imediato das credenciais roubadas |
| O que mudar? | MFA obrigatório; simulações de phishing periódicas; melhor filtragem de email |
| Tempo de resposta | Deteção: 30 min, Contenção: 2h, Recuperação total: 48h |

---

## Caso 2 - Hospital: Ransomware no sistema de gestão de exames

### Contexto

Um hospital distrital com 400 camas e 1.200 funcionários deteta, as 06h30 de um sábado, que o sistema PACS (Picture Archiving and Communication System) — que armazena e distribui exames de imagiologia (raio-X, TAC, ressonancia) — está inacessível. Os técnicos de radiologia não conseguem consultar nem armazenar exames.

O técnico de serviço tenta reiniciar o servidor e depara-se com uma mensagem de ransomware exigindo pagamento em criptomoeda.

### Fase 1 - Deteção

| Elemento | Detalhe |
|----------|---------|
| **Fonte de deteção** | Humana (técnico de radiologia) + Tecnológica (servidor não responde) |
| **Primeiro indicador** | Definitivo — mensagem de ransomware visível |
| **Hora crítica** | Sabado as 06h30 — equipa de TI reduzida, urgencias em funcionamento |
| **Escalamento** | Técnico → Responsável de turno TI → CISO (contacto de emergência) |

**Agravante:** E sábado de manhã. A equipa de TI habitual não está disponível. As urgencias estão a funcionar com doentes que podem precisar de exames de imagiologia.

### Fase 2 - Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de incidente** | Ransomware — cifra de dados com pedido de resgate |
| **Impacto CIA** | **Disponibilidade** (sistema crítico em baixo) + **Confidencialidade** (possível exfiltração pré-cifra) + **Integridade** (dados potencialmente corrompidos) |
| **Severidade** | Crítica — sistema de saúde com impacto direto em doentes |
| **Perímetro estimado** | Servidor PACS confirmado; necessário verificar se propagou a outros sistemas |

**Decisão:** Ativar IRP com prioridade máxima. Avaliar se atinge limiar de desastre (DRP) — depende da propagação a outros sistemas clínicos.

### Fase 3 - Reação

**Ações imediatas (primeiros 15 minutos):**

1. **NAO desligar o servidor** — preservar evidências em memória
2. Isolar o servidor PACS da rede (desligar cabo de rede, não a máquina)
3. Verificar se outros servidores clínicos estão operacionais
4. Ativar procedimento alternativo para exames (impressão física, CD)

**Notificação:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO | Imediatamente | Coordenação da resposta e decisão sobre pagamento |
| Direção clínica | Imediatamente | Impacto no atendimento a doentes |
| Administração hospitalar | Dentro de 30 min | Decisão estratégica (pagar resgate? comunicação pública?) |
| DPO | Dentro de 1 hora | Dados de saúde regulados (RGPD — dados sensíveis) |
| Autoridade de saúde | Conforme regulação | Obrigação legal de reporte |
| Polícia Judiciária | Dentro de 24h | Crime informático |

**Decisão crítica:** O hospital decide **NAO pagar o resgate**, seguindo recomendações do Centro Nacional de Cibersegurança (CNCS).

### Fase 4 - Contenção

**Estratégia:** Contenção agressiva — prioridade e proteger outros sistemas clínicos e a segurança dos doentes.

| Ação | Justificação |
|------|-------------|
| Isolar servidor PACS da rede | Impedir propagação lateral |
| Verificar todos os servidores clínicos | Determinar perímetro real da infeção |
| Bloquear comunicação com servidores C2 conhecidos | Cortar ligação com o atacante |
| Mudar credenciais de todas as contas de serviço | O atacante pode ter credenciais adicionais |
| Ativar plano de contingência clínico | Garantir continuidade de cuidados |

**Resultado da verificação:** O ransomware está confinado ao servidor PACS. Não se propagou a outros sistemas — a segmentação de rede funcionou.

**Plano de contingência clínico ativado:**

- Exames de urgência: impressos em pelicula, entregues em mão
- Exames eletivos: adiados para segunda-feira
- Comunicação aos médicos sobre procedimento alternativo

### Fase 5 - Recuperação

**Avaliação de danos:**

- Servidor PACS cifrado — dados inacessiveis
- Backup mais recente: sexta-feira as 23h00 (7,5 horas antes)
- Exames realizados entre 23h00 de sexta e 06h30 de sábado: 12 exames de urgência
- Sem evidência de exfiltração de dados (mas não se pode excluir)

**Ações de recuperação:**

1. **Preservar provas:** Criar imagem forense do servidor antes de qualquer restauro
2. **Restaurar de backup:** Reinstalar servidor limpo e restaurar dados do backup de sexta-feira
3. **Recuperar exames perdidos:** 8 dos 12 exames de urgência podem ser repetidos; 4 foram impressos e podem ser digitalizados
4. **Corrigir vetor de entrada:** Investigação revela que o ransomware entrou via RDP exposto — fechar RDP, implementar VPN
5. **Hardening:** Atualizar antivirus, aplicar patches pendentes, rever permissões
6. **Monitorização reforçada:** 14 dias com vigilância intensiva de todos os sistemas clínicos

**Timeline de restauro:**

| Marco | Tempo |
|-------|-------|
| Servidor PACS restaurado | Sabado 18h00 (11,5h após deteção) |
| Exames históricos disponíveis | Sabado 20h00 |
| Funcionamento normal completo | Domingo 10h00 |

### Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| O que funcionou? | Segmentação de rede impediu propagação; backup recente permitiu restauro rápido |
| O que falhou? | RDP exposto a Internet sem MFA; ausência de monitorização 24/7 |
| O que mudar? | Eliminar RDP exposto; implementar EDR; backup imutavel; equipa de resposta ao fim-de-semana |
| Tempo de resposta | Deteção: imediata, Contenção: 1h, Restauro: 11,5h, Normal: 27,5h |

---

## Caso 3 - Banco: Intrusão no sistema de transferências interbancárias

### Contexto

Um banco de média dimensão deteta, durante uma auditoria de rotina numa quarta-feira, transações invulgares no sistema de transferências interbancárias (SWIFT). Existem 47 transferências de pequeno valor (entre 500€ e 2.000€) para contas em 3 países diferentes, realizadas nas últimas 72 horas, fora do padrão habitual.

A equipa de auditoria interna escala imediatamente para a área de segurança.

### Fase 1 - Deteção

| Elemento | Detalhe |
|----------|---------|
| **Fonte de deteção** | Humana (auditoria interna) + Tecnológica (anomalia em registos transacionais) |
| **Primeiro indicador** | Provável — transações atipicas em volume e destino |
| **Confirmação** | Definitivo: contas de destino são novas, criadas recentemente, em países sem relação comercial habitual |
| **Atraso na deteção** | 72 horas — transações já tinham sido executadas |

**Fator crítico:** O atacante usou transferências de **pequeno valor** para evitar os limiares de alerta automático (que disparam acima de 10.000€). Técnica conhecida como "salami slicing".

### Fase 2 - Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de incidente** | Fraude financeira via comprometimento de sistema crítico |
| **Impacto CIA** | **Integridade** (transações fraudulentas) + **Confidencialidade** (acesso não autorizado ao sistema SWIFT) |
| **Severidade** | Crítica — impacto financeiro direto, regulatório e reputacional |
| **Valor total** | ~52.000€ em transferências fraudulentas |

**Decisão:** Ativar IRP com equipa alargada incluindo compliance, jurídico e comunicação com regulador.

### Fase 3 - Reação

**Ações imediatas (primeiros 15 minutos):**

1. Suspender todas as transferências pendentes para as contas de destino identificadas
2. Bloquear as credenciais usadas nas transações suspeitas
3. Contactar bancos correspondentes para tentar reverter/congelar fundos
4. Preservar todos os logs do sistema SWIFT dos últimos 7 dias

**Notificação:**

| Quem | Quando | Porque |
|------|--------|--------|
| CISO e Diretor de TI | Imediatamente | Coordenação técnica |
| Administração do banco | Imediatamente | Impacto financeiro e decisões estratégicas |
| Compliance Officer | Dentro de 30 min | Obrigacoes regulatorias |
| Banco de Portugal | Conforme regulação | Reporte obrigatório de incidente significativo |
| SWIFT (rede) | Dentro de 2h | Protocolo de segurança da rede SWIFT |
| Polícia Judiciária | Dentro de 24h | Crime financeiro |

**Decisão crítica:** Manter o sistema SWIFT operacional com monitorização reforçada, ou desliga-lo? Decisão: manter ativo com aprovação manual de todas as transferências internacionais.

### Fase 4 - Contenção

**Estratégia:** Contenção cirúrgica — não interromper operações bancárias mas eliminar o acesso do atacante.

| Ação | Justificação |
|------|-------------|
| Revogar todas as credenciais de acesso ao SWIFT | Eliminar acessos comprometidos |
| Implementar aprovação dual (4 olhos) para todas as transferências | Prevenir novas transações fraudulentas |
| Isolar e analisar a estação de trabalho usada | Determinar vetor de entrada |
| Rever todos os acessos privilegiados dos últimos 30 dias | Procurar outros comprometimentos |
| Contactar bancos de destino para congelamento de fundos | Tentar recuperar o dinheiro |

**Descoberta durante contenção:** O atacante comprometeu as credenciais de um operador através de um documento Word malicioso enviado por email 2 semanas antes. O malware instalou um keylogger que capturou as credenciais SWIFT.

### Fase 5 - Recuperação

**Avaliação de danos:**

- 47 transferências fraudulentas: 52.300€
- 18 transferências possivelmente reverssiveis (23.100€) — fundos ainda nas contas de destino
- 29 transferências irrecuperáveis (29.200€) — fundos já movidos
- 1 estação de trabalho comprometida (keylogger ativo há 2 semanas)
- Sem evidência de acesso a dados de clientes para além das transações

**Ações de recuperação:**

1. **Perícia forense:** Análise completa da estação comprometida — determinar exatamente o que o atacante acedeu
2. **Recuperar fundos:** Trabalhar com bancos correspondentes e autoridades para congelar e reverter transferências
3. **Reconstruir estação:** Reinstalar de raiz a estação comprometida
4. **Reforcar autenticação:** Implementar tokens físicos (hardware) para acesso ao SWIFT
5. **Melhorar deteção:** Baixar limiares de alerta; implementar deteção de padrões (múltiplas transferências pequenas)
6. **Rever política de email:** Sandboxing de anexos, bloqueio de macros Word por defeito
7. **Reporte regulatório:** Reporte detalhado ao Banco de Portugal conforme prazos regulatorios

### Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| O que funcionou? | Auditoria de rotina detetou o que os alertas automáticos falharam |
| O que falhou? | Limiares de alerta demasiado altos; falta de autenticação forte no SWIFT; macro Word permitida |
| O que mudar? | Tokens físicos para SWIFT; deteção de padrões; sandboxing de email; limiares adaptativos |
| Tempo de resposta | Deteção: 72h (atraso crítico), Contenção: 4h após deteção, Recuperação financeira: em curso |

---

## Caso 4 - E-commerce: Ataque combinado durante campanha promocional

### Contexto

Uma plataforma de e-commerce portuguesa com 50.000 clientes registados lanca uma campanha de Black Friday. Na sexta-feira as 10h00, com tráfego 5x superior ao normal, a equipa de operações deteta dois problemas simultâneos:

1. O site está extremamente lento (tempos de resposta >15 segundos)
2. Clientes reportam erros estranhos na página de checkout

A equipa inicialmente assume que é apenas sobrecarga pela campanha.

### Fase 1 - Deteção

| Elemento | Detalhe |
|----------|---------|
| **Fonte de deteção** | Tecnológica (APM — Application Performance Monitoring) + Humana (clientes via chat) |
| **Primeiro indicador** | Possível — pode ser sobrecarga legítima (Black Friday) |
| **Escalamento T+15min** | Provável — padrões de tráfego inconsistentes com utilizadores reais (80% de requests de IPs do mesmo bloco) |
| **Confirmação T+30min** | Definitivo: dois ataques simultâneos — DDoS volumétrico + tentativas de SQL injection no checkout |

**Complexidade:** O atacante usou o DDoS como **diversão** para mascarar o verdadeiro ataque (SQL injection no formulário de checkout). A equipa quase se focou exclusivamente no DDoS.

### Fase 2 - Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de incidente** | Ataque combinado: DDoS + SQL injection |
| **Impacto CIA** | **Disponibilidade** (DDoS) + **Confidencialidade** (SQL injection pode expor dados de clientes) |
| **Severidade** | Crítica — Black Friday (maior dia de vendas do ano) + possível fuga de dados |
| **Impacto financeiro estimado** | ~8.000€/hora em vendas perdidas |

**Decisão:** Ativar IRP com dois tracks paralelos — mitigação de DDoS e investigação de SQL injection. A SQL injection e a prioridade real (dados de clientes).

### Fase 3 - Reação

**Ações imediatas — Track 1 (DDoS):**

1. Ativar proteção anti-DDoS do CDN (Cloudflare/AWS Shield)
2. Implementar rate limiting agressivo
3. Bloquear blocos de IP identificados como maliciosos

**Ações imediatas — Track 2 (SQL injection):**

1. Colocar WAF (Web Application Firewall) em modo bloqueio para o checkout
2. Analisar logs do servidor de base de dados
3. Verificar se alguma query maliciosa foi bem-sucedida

**Notificação:**

| Quem | Quando | Porque |
|------|--------|--------|
| CTO | Imediatamente | Coordenação técnica e decisão sobre manter site ativo |
| CEO | Dentro de 30 min | Impacto financeiro direto (Black Friday) |
| DPO | Dentro de 1h | Potencial fuga de dados de clientes |
| Equipa de comunicação | Dentro de 1h | Clientes estão a reclamar nas redes sociais |

**Dilema crítico:** Manter o site ativo durante a Black Friday (aceitar risco) ou colocar em manutenção (perda financeira certa)?

**Decisão:** Manter o site ativo mas desativar temporariamente o checkout até a SQL injection ser corrigida. Redirecionar para página informativa: "Voltamos em breve — as suas ofertas estão guardadas."

### Fase 4 - Contenção

**Track 1 — DDoS:**

| Ação | Resultado |
|------|-----------|
| CDN anti-DDoS ativado | Tráfego malicioso filtrado em 20 minutos |
| Rate limiting | Requests por IP limitados a 60/minuto |
| Geo-blocking temporário | Bloqueados países sem clientes significativos |

**Track 2 — SQL injection:**

| Ação | Resultado |
|------|-----------|
| WAF em modo bloqueio | Tentativas de injection bloqueadas |
| Análise de logs da BD | 3 queries maliciosas parcialmente bem-sucedidas |
| Avaliação de dados expostos | Atacante acedeu a tabela de clientes: nomes, emails, moradas |
| Verificação de dados de pagamento | Dados de cartao NAO expostos (processados por gateway externo — Stripe) |

**Descoberta crítica:** O atacante conseguiu extrair dados de 2.300 clientes (nomes, emails, moradas de envio). Dados de pagamento não foram comprometidos porque são processados externamente.

### Fase 5 - Recuperação

**Avaliação de danos:**

- DDoS: 2 horas de degradação severa, 45 minutos de checkout indisponível
- SQL injection: dados de 2.300 clientes expostos (sem dados financeiros)
- Impacto financeiro: ~12.000€ em vendas perdidas + custos de resposta
- Impacto reputacional: reclamações nas redes sociais, cobertura mediática

**Ações de recuperação:**

1. **Corrigir vulnerabilidade:** Patch do formulário de checkout (prepared statements em vez de concatenação SQL)
2. **Auditoria de código:** Revisão de todos os formulários para vulnerabilidades similares
3. **Restaurar checkout:** Reativar com WAF permanente e monitorização reforçada
4. **Notificar clientes afetados:** Email personalizado aos 2.300 clientes com explicação transparente
5. **Notificação CNPD:** Obrigatória em 72 horas (dados pessoais de 2.300 pessoas)
6. **Compensação:** Voucher de desconto aos clientes afetados como gesto de boa-fe
7. **Melhorar infraestrutura:** CDN anti-DDoS permanente (não apenas reativo); WAF always-on

**Timeline:**

| Marco | Tempo |
|-------|-------|
| DDoS mitigado | T+35 min |
| Checkout reativado (com patch) | T+2h15 |
| Vendas normalizadas | T+3h |
| Notificação a clientes | T+48h |
| Notificação CNPD | T+60h |

### Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| O que funcionou? | CDN anti-DDoS eficaz; dados de pagamento protegidos (gateway externo) |
| O que falhou? | Vulnerabilidade SQL injection básica no checkout; DDoS quase mascarou o ataque real |
| O que mudar? | Code review obrigatório pré-deploy; WAF permanente; plano de Black Friday com equipa reforçada |
| Tempo de resposta | Deteção: 30 min, Contenção DDoS: 35 min, Contenção SQL injection: 2h15, Normal: 3h |

---

## Caso 5 - Indústria: Comprometimento de rede OT com risco de segurança física

### Contexto

Uma fábrica de componentes automóveis com 300 trabalhadores utiliza sistemas SCADA para controlar linhas de produção automatizadas (fornos, prensas, robôs de montagem). Numa quinta-feira as 14h00, um operador nota que os valores de temperatura de um forno industrial exibidos no HMI (Human-Machine Interface) estão errados: o ecrã mostra 0°C quando o forno deveria estar a 850°C.

O operador, experiente, sabe que isto é fisicamente impossível — o forno está visivelmente quente. Reporta imediatamente ao supervisor.

### Fase 1 - Deteção

| Elemento | Detalhe |
|----------|---------|
| **Fonte de deteção** | Humana (operador com conhecimento do processo físico) |
| **Primeiro indicador** | Definitivo — valores fisicamente impossíveis num sistema de controlo crítico |
| **Fator humano** | A experiência do operador foi decisiva. Um sistema automático poderia ter interpretado "0°C" como "forno desligado" |
| **Risco imediato** | Se os controladores automáticos "acreditarem" que o forno está a 0°C, podem **aumentar a temperatura** sem limite — risco de explosão/incêndio |

**Urgência extrema:** Este não é apenas um incidente de TI. Ha risco de **segurança física** para pessoas e equipamentos.

### Fase 2 - Classificação

| Critério | Avaliação |
|----------|-----------|
| **Tipo de incidente** | Comprometimento de sistema de controlo industrial (OT) |
| **Impacto CIA** | **Integridade** (dados de sensores adulterados) + **Disponibilidade** (sistema de controlo não fidedigno) |
| **Severidade** | Crítica com risco de segurança física |
| **Perímetro estimado** | Pelo menos 1 forno; necessário verificar todos os sistemas de controlo |

**Decisão:** Ativar IRP com componente de segurança física. Paragem de emergência do forno afetado. Verificação imediata de todos os outros equipamentos controlados.

### Fase 3 - Reação

**Ações imediatas (primeiros 5 minutos):**

1. **Paragem de emergência** do forno afetado (botão físico de emergência)
2. **Evacuação da zona** do forno por precaução
3. **Verificação manual** de todos os outros fornos e equipamentos críticos
4. **Passagem a controlo manual** de todos os equipamentos SCADA

**Notificação:**

| Quem | Quando | Porque |
|------|--------|--------|
| Diretor de produção | Imediatamente | Segurança física dos trabalhadores |
| Responsável de segurança física | Imediatamente | Risco de acidente industrial |
| CISO / TI | Imediatamente | Investigação do comprometimento |
| Administração | Dentro de 30 min | Paragem de produção, impacto financeiro |
| Autoridades (se necessário) | Conforme gravidade | Potencial sabotagem industrial |

**Decisão crítica:** Parar **toda** a produção ou apenas o forno afetado?

**Decisão:** Parar toda a linha do forno afetado. Manter as outras linhas em funcionamento com **monitorização manual contínua** e verificação cruzada de valores.

### Fase 4 - Contenção

**Estratégia:** Contenção por segmentação — isolar rede OT e investigar.

| Ação | Justificação |
|------|-------------|
| Desconectar gateway entre rede corporativa e rede OT | Cortar possível vetor de ataque |
| Manter equipamentos em modo manual | Garantir segurança física enquanto se investiga |
| Capturar tráfego de rede OT | Preservar evidências de comunicações anómalas |
| Verificar integridade de firmware dos PLCs | Determinar se o código dos controladores foi alterado |
| Analisar estações de engenharia | Procurar malware que possa ter modificado lógica de controlo |

**Descobertas durante contenção:**

- Encontrado malware numa estação de engenharia que faz ponte entre rede corporativa e rede OT
- O malware entrou via pen USB de um fornecedor externo que fez manutenção 5 dias antes
- O malware manipulava os valores enviados dos sensores para os HMIs (ataque man-in-the-middle entre sensores e operadores)
- **Apenas os valores apresentados foram alterados** — a lógica dos PLCs não foi modificada (os controladores continuavam a ver os valores reais)

**Implicação:** O risco de segurança física era real mas mitigado pelo facto de os PLCs terem os valores corretos. O perigo maior seria se um operador, vendo valores errados, tomasse uma decisão manual incorreta.

### Fase 5 - Recuperação

**Avaliação de danos:**

- 1 estação de engenharia comprometida
- Malware ativo há 5 dias (desde a visita do fornecedor)
- Sem alteração de lógica de PLCs (confirmado por verificação de checksum)
- Sem danos físicos a equipamentos ou pessoas
- Produção parada: 6 horas na linha afetada, 2 horas de verificação nas outras
- Impacto financeiro: ~25.000€ em produção perdida + custos de investigação

**Ações de recuperação:**

1. **Perícia forense:** Análise completa da estação de engenharia e do malware
2. **Limpar malware:** Reinstalar estação de engenharia a partir de golden image verificada
3. **Verificar todos os PLCs:** Comparar firmware atual com versão conhecida como segura (checksum)
4. **Reativar produção:** Gradualmente, começando por equipamentos verificados
5. **Segmentação permanente:** Implementar firewall industrial entre rede corporativa e OT
6. **Controlo de acessos físicos:** Proibir pens USB não autorizadas; criar estação de verificação para fornecedores
7. **Monitorização OT:** Implementar IDS específico para protocolos industriais (Modbus, OPC-UA)

**Timeline:**

| Marco | Tempo |
|-------|-------|
| Forno em paragem segura | T+5 min |
| Malware identificado | T+3h |
| Verificação de PLCs concluída | T+5h |
| Linha afetada reativada | T+8h |
| Todas as linhas normais | T+10h |
| Segmentação permanente implementada | T+7 dias |

### Lições aprendidas

| Questão | Conclusão |
|---------|-----------|
| O que funcionou? | Operador experiente detetou anomalia que sistemas automáticos não detetaram; PLCs mantiveram lógica correta |
| O que falhou? | Sem controlo de dispositivos USB; sem segmentação adequada entre redes; fornecedor com acesso físico não controlado |
| O que mudar? | Segmentação IT/OT rigorosa; política de USB; verificação de equipamentos de fornecedores; IDS industrial |
| Tempo de resposta | Deteção: imediata (operador), Contenção: 3h, Produção normal: 10h |

---

## Tabela comparativa

| | Caso 1 | Caso 2 | Caso 3 | Caso 4 | Caso 5 |
|--|--------|--------|--------|--------|--------|
| **Setor** | Universidade | Hospital | Banco | E-commerce | Indústria |
| **Tipo** | Phishing | Ransomware | Fraude financeira | DDoS + SQL injection | Comprometimento OT |
| **CIA** | Confidencialidade | Disp. + Conf. + Integ. | Integridade + Conf. | Disp. + Conf. | Integridade + Disp. |
| **Deteção** | Humana (utilizadores) | Humana (técnico) | Humana (auditoria) | Tecnológica + Humana | Humana (operador) |
| **Tempo deteção** | 30 min | Imediata | 72h (!) | 30 min | Imediata |
| **Contenção** | 2h | 1h | 4h | 2h15 | 3h |
| **Restauro total** | 48h | 27,5h | Em curso | 3h | 10h |
| **Dados expostos** | Emails + notas | Exames clínicos | Transacoes | 2.300 clientes | Nenhum |
| **Regulador** | CNPD | CNPD + Saúde | BdP + SWIFT | CNPD | Autoridade industrial |
| **Risco físico** | Não | Indireto (doentes) | Não | Não | Sim (segurança) |

## Padrões a observar

Analisando os 5 casos em conjunto, emergem padrões importantes:

**1. A deteção humana contínua essencial**

Em 4 dos 5 casos, a deteção inicial foi humana. Sistemas automáticos detetam anomalias técnicas, mas são as pessoas — utilizadores, técnicos, auditores, operadores — que frequentemente identificam que "algo não está certo". A formação e sensibilização dos utilizadores não é um complemento da segurança técnica — e uma **camada crítica de deteção**.

**2. O primeiro diagnóstico pode estar errado**

No Caso 4, a equipa quase se focou exclusivamente no DDoS sem perceber que era uma diversão para o ataque real (SQL injection). No Caso 5, um sistema automático poderia ter interpretado "0°C" como forno desligado, em vez de ataque. **Manter a mente aberta e reavaliar continuamente** e uma competência crítica da equipa de resposta.

**3. Contenção vs continuidade — o dilema permanente**

Todos os casos envolvem uma tensão entre "isolar tudo para conter" e "manter serviços para o negócio". Não há resposta universal — depende do contexto (dados de saúde vs vendas vs segurança física). O plano de resposta deve prever estes dilemas e definir **quem decide e com que critérios**.

**4. A recuperação vai muito além do técnico**

Nenhum caso termina com "servidor restaurado". A recuperação inclui comunicação a reguladores, notificação a afetados, análise forense, melhoria de processos e restauro de confiança. A componente organizacional e tao importante como a técnica.

**5. Cada incidente revela vulnerabilidades que já la estavam**

O phishing revela falta de MFA. O ransomware revela RDP exposto. A fraude revela limiares de alerta inadequados. O ataque combinado revela vulnerabilidades de código. O ataque OT revela falta de segmentação. Os incidentes não criam fraquezas — **expoem fraquezas que já existiam**.

---

!!! info "Exercícios por módulo"
    Para exercícios focados em competencias específicas, consulte as secções de exercícios de cada módulo:

    - [Planeamento — Exercícios](planeamento.md#6-exercicios)
    - [Deteção — Exercícios](detecao.md#5-exercicios)
    - [Reação — Exercícios](reacao.md#exercicios)
    - [Recuperação — Exercícios](recuperacao.md#6-exercicios)

*Próximo módulo: [Disaster Recovery Plan (DRP)](../drp/index.md)*
