# Casos Práticos - Incident Handling

Casos práticos completos que percorrem **todo o modelo de 7 passos** do Incident Handling: preparação, deteção, contenção, investigação, erradicação, recuperação e follow-up.

Cada caso é independente e pode ser usado para estudo ou discussão. Os cenários são fictícios mas baseados em situações reais documentadas por CERTs europeus.

!!! tip "Como usar estes casos"
    Para cada caso, tente primeiro **identificar o que faria em cada passo** antes de consultar a solução. Os casos estão ordenados por complexidade crescente e cobrem diferentes tipos de incidentes.

---

## Caso 1 — Ransomware num hospital

### Contexto

O **Hospital Regional do Litoral** (HRL), com 600 camas e 2.400 funcionários, opera sistemas críticos de registos clínicos eletrónicos (RCE), imagiologia (PACS) e gestão laboratorial. Na segunda-feira às 07h15, técnicos do turno da manhã reportam lentidão generalizada nos terminais clínicos. Às 07h45, o sistema RCE fica totalmente inacessível e surgem mensagens de ransomware em vários ecrãs.

A investigação posterior revela que a intrusão inicial ocorreu **três dias antes** (sexta-feira), via uma vulnerabilidade não corrigida no servidor VPN de acesso remoto. O atacante moveu-se lateralmente durante o fim de semana, encriptando servidores de forma faseada.

### Cronologia do incidente

| Momento | Evento |
|---------|--------|
| Sexta 14h30 | Intrusão inicial via VPN vulnerável (não detetada) |
| Sexta 16h00 | Atacante obtém credenciais de administrador de domínio |
| Sábado 02h00 | Início do movimento lateral — acesso a servidores de ficheiros |
| Domingo 03h00 | Desativação de backups online e shadow copies |
| Segunda 05h00 | Início da encriptação massiva dos sistemas |
| Segunda 07h15 | Primeiros relatos de lentidão nos terminais clínicos |
| Segunda 07h45 | Sistema RCE inacessível — mensagem de ransomware visível |
| Segunda 08h00 | Equipa de TI alerta a direção e ativa o IRT |

### Aplicação do modelo de 7 passos

| Passo | Ações realizadas |
|-------|-----------------|
| **1. Preparação** | IRT existente mas sem treino recente; backups configurados mas sem teste de restauro há 8 meses; sem segmentação entre rede clínica e administrativa |
| **2. Deteção** | Deteção tardia (3 dias após a intrusão); SIEM gerou alertas na sexta mas não foram analisados no fim de semana; deteção efetiva só por impacto operacional |
| **3. Contenção** | Dilema: isolar a rede hospitalar totalmente comprometia a segurança dos doentes; decisão de contenção seletiva — isolaram segmentos não clínicos e mantiveram sistemas de suporte de vida em funcionamento com monitorização manual |
| **4. Investigação** | Análise forense identificou o vetor de entrada (VPN), o percurso do atacante e a cronologia da encriptação; confirmou que dados clínicos não foram exfiltrados (apenas encriptados) |
| **5. Erradicação** | Decisão de reconstruir todos os servidores afetados a partir de imagens limpas em vez de tentar limpar a infeção; eliminação do acesso VPN vulnerável; reset de todas as credenciais de domínio |
| **6. Recuperação** | Recuperação faseada: 1.º sistemas de suporte de vida, 2.º imagiologia (PACS), 3.º registos clínicos (RCE), 4.º sistemas administrativos; backups offline de 5 dias atrás utilizados com sucesso |
| **7. Follow-up** | Relatório detalhado ao conselho de administração; notificação à CNPD (dados de saúde); revisão completa da arquitetura de segurança |

### Indicadores de compromisso (IOCs) identificados

| Tipo | Valor | Contexto |
|------|-------|----------|
| **CVE** | CVE-2024-21762 | Out-of-bounds write em FortiOS/FortiProxy SSL-VPN (CVSS 9.8) — pré-autenticação, exploração ativa desde fev/2024 |
| **IP** | 185.220.xx.xx (rede Tor) | Endereço de origem da intrusão inicial |
| **Hash** | SHA256 do ransomware | Variante do grupo LockBit 3.0 |
| **Ficheiro** | `readme_restore.txt` | Nota de resgate em cada diretório encriptado |
| **Extensão** | `.locked_hrl` | Extensão adicionada aos ficheiros encriptados |

!!! warning "Decisão sobre o pagamento do resgate"
    O conselho de administração do hospital debateu o pagamento do resgate (15 BTC, aproximadamente 450.000 EUR). A decisão final foi **não pagar**, baseada em três fatores: (1) existência de backups offline viáveis, (2) recomendação das autoridades contra o pagamento, (3) ausência de garantia de que o atacante forneceria a chave de desencriptação.

### Diagrama de contenção

```
  ╔═══════════════════════════════════════════════════════════╗
  ║            DECISÃO DE CONTENÇÃO — HOSPITAL                ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║   ┌─────────────────┐     ┌─────────────────────────┐    ║
  ║   │  ZONA ISOLADA   │     │  ZONA MONITORIZADA      │    ║
  ║   │  (desligada)    │     │  (ativa com vigilância)  │    ║
  ║   │                 │     │                         │    ║
  ║   │  - Servidores   │     │  - Suporte de vida      │    ║
  ║   │    de ficheiros │     │  - Monitorização UCI     │    ║
  ║   │  - Email        │     │  - Bombas de infusão    │    ║
  ║   │  - Intranet     │     │  - Ventiladores         │    ║
  ║   │  - VPN          │     │                         │    ║
  ║   └─────────────────┘     └─────────────────────────┘    ║
  ║          │                          │                     ║
  ║          ▼                          ▼                     ║
  ║   Contenção total            Contenção seletiva           ║
  ║   (sem risco clínico)        (risco clínico = prioridade) ║
  ╚═══════════════════════════════════════════════════════════╝
```

**Como interpretar:**

*A principal lição deste caso é o conflito entre contenção total e segurança dos doentes. Num hospital, desligar toda a rede pode ser mais perigoso do que manter sistemas comprometidos em funcionamento sob vigilância. A decisão de contenção seletiva — isolando segmentos não críticos enquanto se mantêm sistemas de suporte de vida — é uma abordagem que exige análise de risco em tempo real e coordenação com equipas clínicas.*

*A deteção tardia (3 dias) resulta de dois fatores combinados: a ausência de monitorização durante o fim de semana e a falta de resposta aos alertas do SIEM. Um SOC 24/7, mesmo que externalizado, teria reduzido drasticamente o impacto.*

**Para refletir:**

- Se fossem responsáveis pela decisão de contenção, desligariam toda a rede ou manteriam a abordagem seletiva? Que critérios usariam?
- O hospital deve pagar o resgate? Que fatores éticos e práticos entram nessa decisão?
- Como se garante a integridade dos backups se o atacante esteve 3 dias dentro da rede?
- Que responsabilidades legais tem o hospital perante a CNPD, dado tratar-se de dados de saúde?

### Lições aprendidas

| Área | Lição |
|------|-------|
| **Deteção** | Alertas do SIEM sem resposta são inúteis — é necessária cobertura 24/7 ou automatização de resposta |
| **Backups** | Backups online foram destruídos pelo atacante; apenas os backups offline (tape) sobreviveram — a regra 3-2-1 é essencial |
| **Segmentação** | A ausência de segmentação entre rede clínica e administrativa permitiu a propagação lateral livre |
| **Testes** | Backups existiam mas não eram testados — a recuperação foi possível por sorte, não por planeamento |
| **Preparação** | O IRT não tinha procedimento específico para ransomware hospitalar — cada decisão foi tomada ad hoc |

---

## Caso 2 — Phishing numa universidade

### Contexto

A **Universidade do Centro** (UC), com 15.000 alunos e 1.200 funcionários, tem um sistema de email institucional integrado com o Microsoft 365. Numa quarta-feira às 10h20, o CERT.PT contacta o CISO da universidade: emails de phishing estão a ser enviados **a partir de** um endereço institucional da UC para contactos externos, incluindo parceiros europeus de projetos de investigação.

A investigação revela que uma funcionária dos serviços académicos clicou num link de phishing na segunda-feira, introduzindo as suas credenciais numa página falsa de login do Microsoft 365. O atacante acedeu à caixa de email, recolheu contactos e lançou uma segunda vaga de phishing a partir da conta comprometida.

### Cronologia do incidente

| Momento | Evento |
|---------|--------|
| Segunda 09h15 | Funcionária recebe email de phishing (aparenta ser da Microsoft) |
| Segunda 09h22 | Funcionária introduz credenciais na página falsa |
| Segunda 10h00 | Atacante acede à caixa de email pela primeira vez (IP na Rússia) |
| Segunda 14h00 | Atacante configura regra de reencaminhamento oculta |
| Terça 08h00 | Atacante envia 340 emails de phishing a partir da conta comprometida |
| Quarta 10h20 | CERT.PT notifica a universidade sobre emails maliciosos |
| Quarta 10h40 | CISO inicia investigação e ativa o IRT |

### Indicadores de compromisso (IOCs) identificados

| Tipo | Valor | Contexto |
|------|-------|----------|
| **Domínio** | `microsoft365-login.com` | Página falsa de login utilizada no phishing |
| **IP** | 91.215.xx.xx (Rússia) | Endereço de acesso do atacante à caixa de email |
| **Email** | `noreply@m1crosoft-security.net` | Remetente do email de phishing original |
| **Regra** | Reencaminhamento para `fwd.dump@protonmail.com` | Regra oculta criada pelo atacante na conta comprometida |

### Aplicação do modelo de 7 passos

| Passo | Ações realizadas |
|-------|-----------------|
| **1. Preparação** | Política de passwords existente mas sem MFA obrigatório; sem simulações de phishing; contacto com CERT.PT estabelecido |
| **2. Deteção** | Deteção externa (CERT.PT) — a universidade não detetou o comprometimento internamente; sem monitorização de logins de geolocalizações anómalas |
| **3. Contenção** | Desativação imediata da conta comprometida; bloqueio dos IPs do atacante; remoção da regra de reencaminhamento oculta; quarentena dos 340 emails enviados pelo atacante |
| **4. Investigação** | Análise dos logs de acesso do M365: atacante acedeu a 2.800 emails, descarregou 45 anexos (incluindo dados pessoais de alunos); regra de reencaminhamento enviava cópias de novos emails para endereço externo |
| **5. Erradicação** | Reset de password da conta afetada; auditoria de todas as contas com logins de IPs estrangeiros (encontradas mais 2 contas suspeitas); ativação de MFA para todos os funcionários em 48 horas |
| **6. Recuperação** | Restauro da configuração limpa da conta; notificação aos 340 destinatários do phishing; comunicação aos parceiros europeus sobre o incidente |
| **7. Follow-up** | Programa de sensibilização anti-phishing lançado em 2 semanas; simulações trimestrais de phishing implementadas; relatório à CNPD sobre dados pessoais potencialmente expostos |

**Como interpretar:**

*Este caso ilustra o "efeito dominó" do phishing: uma única credencial comprometida transforma-se num vetor de ataque contra toda a rede de confiança da organização. O facto de a deteção ter sido externa (CERT.PT) indica uma falha significativa na capacidade de monitorização interna — a universidade não monitorizava padrões anómalos de envio de email nem logins de geolocalizações invulgares.*

*A regra de reencaminhamento oculta é uma técnica comum que permite ao atacante manter acesso à informação mesmo após o reset da password. Sem uma verificação completa das configurações da conta, o atacante teria continuado a receber emails.*

**Para refletir:**

- Porque é que o MFA teria prevenido este incidente, mesmo após a funcionária ter introduzido as credenciais na página falsa?
- A universidade deve notificar os 15.000 alunos, ou apenas os afetados? Que critérios aplicar?
- Como se equilibra a segurança (MFA obrigatório) com a usabilidade para funcionários com menor literacia digital?
- Que impacto reputacional tem este incidente nos projetos europeus de investigação?

### Lições aprendidas

| Área | Lição |
|------|-------|
| **MFA** | A ausência de MFA transformou um phishing simples numa intrusão completa — MFA deve ser obrigatório, não opcional |
| **Monitorização** | Logins de geolocalizações anómalas devem gerar alertas automáticos e bloqueio preventivo |
| **Deteção interna** | A dependência de deteção externa (CERT.PT) revela falta de capacidade de monitorização — regras anti-phishing no M365 deviam ter sinalizado o envio massivo |
| **Configurações** | Auditar regras de reencaminhamento e delegações é essencial após qualquer comprometimento de conta |
| **Formação** | Simulações de phishing regulares reduzem significativamente a taxa de cliques — a prevenção é mais eficaz que a resposta |

---

## Caso 3 — DDoS num banco online

### Contexto

O **Banco Digital do Atlântico** (BDA), um banco exclusivamente online com 800.000 clientes, opera a sua plataforma de homebanking e API de pagamentos a partir de dois data centers em Portugal. Numa sexta-feira às 18h30 — início do fim de semana e pico de utilização — a equipa de operações deteta uma degradação severa do serviço. Em 10 minutos, a plataforma de homebanking torna-se inacessível.

O sistema de monitorização regista um volume de tráfego 40 vezes superior ao normal, proveniente de milhares de endereços IP distribuídos globalmente. Trata-se de um ataque DDoS volumétrico combinado com um ataque na camada aplicacional (L7).

### Cronologia do incidente

| Momento | Evento |
|---------|--------|
| Sexta 18h30 | Alertas de latência no sistema de monitorização |
| Sexta 18h35 | Tráfego atinge 40x o volume normal |
| Sexta 18h40 | Homebanking inacessível para clientes |
| Sexta 18h45 | Equipa NOC confirma ataque DDoS e escala para o IRT |
| Sexta 19h00 | Ativação do serviço de mitigação DDoS do ISP |
| Sexta 19h30 | Banco de Portugal notificado (requisito regulatório) |
| Sexta 20h15 | Mitigação parcial — tráfego legítimo começa a passar |
| Sexta 22h00 | Serviço restaurado a 90% da capacidade |
| Sábado 08h00 | Ataque cessa; serviço totalmente normalizado |

### Dados técnicos do ataque

| Parâmetro | Valor |
|-----------|-------|
| **Volume de pico** | 380 Gbps (volumétrico) + 2,5 milhões de requests/segundo (L7) |
| **Tipo de ataque** | UDP flood + HTTP POST flood contra endpoint `/api/auth/login` |
| **Origem** | Botnet Mirai — ~50.000 dispositivos IoT comprometidos (câmaras IP, routers domésticos) |
| **Duração total** | ~13,5 horas (sexta 18h30 — sábado 08h00) |
| **Tempo de indisponibilidade** | ~3,5 horas (sexta 18h40 — 22h00) |
| **Impacto financeiro estimado** | ~120.000 EUR (transações não processadas + custos de resposta) |

### Aplicação do modelo de 7 passos

| Passo | Ações realizadas |
|-------|-----------------|
| **1. Preparação** | Contrato com ISP para mitigação DDoS existente mas nunca testado; runbook de DDoS desatualizado (2 anos); sem CDN configurado |
| **2. Deteção** | Deteção rápida (5 minutos) graças a monitorização contínua com thresholds de tráfego; classificação correta do ataque em 15 minutos (volumétrico + L7) |
| **3. Contenção** | Ativação do scrubbing center do ISP para filtrar tráfego malicioso; implementação de rate limiting na camada aplicacional; geoblocking temporário de regiões sem clientes; comunicação proativa aos clientes via SMS e redes sociais |
| **4. Investigação** | Análise dos padrões de ataque: botnet de ~50.000 dispositivos IoT; ataque L7 direcionado ao endpoint de login com requests crafted; sem indicação de que o DDoS serviu como distração para outro ataque |
| **5. Erradicação** | Atualização das regras de firewall com assinaturas do ataque; configuração permanente de rate limiting; implementação de CDN com proteção DDoS integrada |
| **6. Recuperação** | Restauro faseado: 1.º API de pagamentos (crítica para comerciantes), 2.º homebanking, 3.º app móvel; monitorização intensiva nas 48 horas seguintes |
| **7. Follow-up** | Teste do plano de mitigação DDoS com o ISP; contratação de CDN permanente; simulação trimestral de DDoS; relatório ao Banco de Portugal e à CNPD |

```
  ╔═══════════════════════════════════════════════════════════╗
  ║           FLUXO DE MITIGAÇÃO DDoS                         ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║   Tráfego          ┌──────────────┐    Tráfego            ║
  ║   Malicioso ──────►│  Scrubbing   │    Legítimo           ║
  ║   + Legítimo       │  Center      │───────────►           ║
  ║                    │  (ISP)       │    ┌────────────┐     ║
  ║                    └──────┬───────┘    │  Banco     │     ║
  ║                           │            │  Digital   │     ║
  ║                           ▼            │  (BDA)     │     ║
  ║                    ┌──────────────┐    └────────────┘     ║
  ║                    │  Tráfego     │                        ║
  ║                    │  Descartado  │                        ║
  ║                    └──────────────┘                        ║
  ╚═══════════════════════════════════════════════════════════╝
```

**Como interpretar:**

*A rapidez da deteção (5 minutos) contrasta com a lentidão da mitigação efetiva (quase 2 horas). Este desfasamento revela que ter um contrato de mitigação DDoS não é suficiente — é necessário testar os procedimentos de ativação regularmente. A equipa perdeu tempo valioso a localizar o runbook desatualizado e a contactar o ponto de contacto correto no ISP.*

*O ataque combinado (volumétrico + L7) é particularmente eficaz porque mesmo após a filtragem do tráfego volumétrico, o ataque L7 contínua a sobrecarregar a lógica aplicacional. A investigação que descartou o DDoS como distração para outro ataque (por exemplo, fraude bancária) é um passo crítico frequentemente negligenciado.*

**Para refletir:**

- O banco deve comunicar publicamente o ataque, ou apenas notificar os reguladores? Que riscos existem em cada opção?
- Como se prioriza a recuperação quando tanto a API de pagamentos como o homebanking estão em baixo?
- Que impacto financeiro tem 3,5 horas de indisponibilidade num banco exclusivamente online numa sexta-feira à noite?
- O DDoS pode ser uma distração para encobrir uma intrusão simultânea — como se verifica essa hipótese durante a crise?

### Lições aprendidas

| Área | Lição |
|------|-------|
| **Preparação** | Um contrato de mitigação DDoS não testado é quase tão mau como não ter contrato — simulações regulares são essenciais |
| **Runbooks** | Procedimentos desatualizados causam atrasos críticos — revisão semestral obrigatória |
| **CDN** | A ausência de CDN significou que todo o tráfego atingiu diretamente a infraestrutura do banco |
| **Ataque L7** | A mitigação volumétrica sozinha não é suficiente — proteção na camada aplicacional é igualmente necessária |
| **Comunicação** | A comunicação proativa aos clientes (via SMS e redes sociais) reduziu o volume de chamadas ao call center em 60% |

---

## Caso 4 — Insider threat numa empresa de telecomunicações

### Contexto

A **TelecomNorte, S.A.**, operadora de telecomunicações com 3 milhões de clientes, descobre um possível incidente de segurança **duas semanas após** a saída de um engenheiro sénior de sistemas (Pedro M.) que foi despedido por reestruturação. O alerta surge quando o departamento comercial recebe informação de que um concorrente está a contactar clientes da TelecomNorte com ofertas personalizadas, usando dados que aparentam ser internos (valores de faturação, datas de fim de contrato).

A investigação revela que Pedro M. exfiltrou a base de dados de clientes (3,2 milhões de registos) nas duas semanas anteriores à sua saída, usando um dispositivo USB pessoal e transferências para uma conta de armazenamento cloud.

### Cronologia do incidente

| Momento | Evento |
|---------|--------|
| Dia 1 (há 4 semanas) | Pedro M. é notificado do despedimento (aviso prévio de 30 dias) |
| Dia 5 | Pedro acede a tabelas da base de dados de clientes fora do seu âmbito habitual |
| Dia 8 | Pedro liga dispositivo USB e copia ficheiros de exportação (não detetado) |
| Dia 12 | Pedro envia ficheiros para conta pessoal de Google Drive via browser |
| Dia 15 | Pedro copia segunda extração atualizada para USB |
| Dia 30 | Último dia de trabalho de Pedro — acesso revogado no final do dia |
| Dia 44 | Departamento comercial reporta contactos suspeitos do concorrente |
| Dia 45 | CISO inicia investigação formal |

### Dados exfiltrados

| Categoria | Volume | Sensibilidade |
|-----------|--------|---------------|
| **Nomes e moradas** | 3,2 milhões de registos | Dados pessoais (RGPD Art. 4) |
| **Números de telefone** | 3,2 milhões de registos | Dados pessoais |
| **Valores de faturação** | 3,2 milhões de registos | Dados comerciais confidenciais |
| **Datas de fim de contrato** | 3,2 milhões de registos | Dados comerciais confidenciais |
| **Histórico de consumo** | 2,1 milhões de registos | Dados pessoais (pode revelar padrões de vida) |

### Aplicação do modelo de 7 passos

| Passo | Ações realizadas |
|-------|-----------------|
| **1. Preparação** | Sem sistema de DLP (Data Loss Prevention); sem monitorização de dispositivos USB; sem procedimento de offboarding de segurança para funcionários em período de aviso prévio; sem classificação de dados implementada |
| **2. Deteção** | Deteção extremamente tardia (44 dias após o início da exfiltração); deteção indireta (via impacto comercial, não via controlos técnicos); logs de acesso à base de dados existiam mas não eram monitorizados |
| **3. Contenção** | Revogação de todos os acessos residuais de Pedro (tokens, VPN, certificados); verificação de que não existem backdoors ou contas criadas por Pedro; bloqueio do endereço de email pessoal nos sistemas |
| **4. Investigação** | Análise forense do workstation de Pedro: logs de USB, histórico de browser (Google Drive), queries à base de dados; correlação temporal entre os acessos anómalos e o período pós-notificação; entrevistas a colegas sobre comportamento de Pedro |
| **5. Erradicação** | Confirmação de que Pedro não instalou software malicioso; alteração de todas as credenciais de serviço a que Pedro tinha acesso; revisão de permissões de todos os engenheiros de sistemas |
| **6. Recuperação** | Dados já expostos — recuperação limitada ao plano legal; notificação à CNPD (violação de dados pessoais de 3,2 milhões de titulares); preparação de notificação aos clientes afetados |
| **7. Follow-up** | Implementação de DLP; política de offboarding com revogação imediata de acessos sensíveis; classificação de dados; monitorização de dispositivos USB; queixa-crime contra Pedro M. |

!!! danger "Implicações legais — RGPD"
    A exfiltração de 3,2 milhões de registos de clientes constitui uma **violação de dados pessoais** nos termos do RGPD. A TelecomNorte é obrigada a:

    - Notificar a **CNPD em 72 horas** após tomar conhecimento da violação
    - Notificar os **titulares dos dados** (clientes) se existir risco elevado para os seus direitos
    - Documentar a violação no **registo de incidentes** interno
    - Cooperar com as autoridades na **investigação criminal**

**Como interpretar:**

*O insider threat é particularmente difícil de detetar porque o atacante tem acesso legítimo aos sistemas. Pedro M. usou as suas credenciais normais para aceder à base de dados — a anomalia estava no padrão de acesso (tabelas fora do âmbito habitual), não no acesso em si. Sem monitorização de comportamento (UEBA — User and Entity Behavior Analytics), este tipo de atividade passa facilmente despercebido.*

*O período de aviso prévio é o momento de maior risco numa situação de despedimento. A ausência de um procedimento de offboarding que restrinja acessos sensíveis durante este período é uma falha organizacional grave. Em setores regulados como as telecomunicações, está exposição tem consequências financeiras e legais severas.*

**Para refletir:**

- Deve um funcionário em período de aviso prévio (pós-despedimento) manter acesso total aos sistemas? Que alternativas existem?
- A empresa deve notificar os 3,2 milhões de clientes individualmente? Como se comunica uma violação desta escala?
- Que provas forenses são necessárias para sustentar uma queixa-crime por acesso ilegítimo a dados?
- Como se implementa um sistema de DLP sem criar um ambiente de vigilância excessiva que afete a moral dos funcionários?

### Lições aprendidas

| Área | Lição |
|------|-------|
| **DLP** | A ausência total de DLP permitiu a exfiltração sem qualquer obstáculo — DLP deve ser prioridade em organizações com dados sensíveis de clientes |
| **Offboarding** | O procedimento de saída deve incluir restrição imediata de acessos sensíveis quando um funcionário entra em período de aviso prévio |
| **USB** | Portas USB não monitorizadas são um vetor de exfiltração trivial — políticas de controlo de dispositivos são essenciais |
| **UEBA** | A monitorização de padrões de acesso anómalos (UEBA) teria detetado os acessos fora do âmbito habitual de Pedro |
| **Classificação** | Sem classificação de dados, não é possível aplicar controlos diferenciados a informação sensível |

---

## Caso 5 — Supply chain attack numa empresa de software

### Contexto

A **SecureSoft, Lda.**, empresa portuguesa de desenvolvimento de software com 120 funcionários, desenvolve uma plataforma de gestão documental usada por 2.300 organizações (incluindo câmaras municipais, hospitais e empresas privadas). Na quinta-feira às 14h00, um investigador de segurança independente contacta a SecureSoft: descobriu que a versão 4.2.1 da plataforma (lançada há 3 semanas) contém código malicioso que exfiltra credenciais dos utilizadores para um servidor externo.

A investigação revela que uma biblioteca open-source de terceiros (`json-utils-pro`), usada para processamento de JSON, foi comprometida no repositório NPM. O maintainer original da biblioteca abandonou-a, e um novo maintainer (malicioso) publicou uma versão com backdoor.

### Cronologia do incidente

| Momento | Evento |
|---------|--------|
| Há 6 semanas | Novo maintainer assume a biblioteca `json-utils-pro` no NPM |
| Há 5 semanas | Versão 2.4.0 da biblioteca publicada com backdoor |
| Há 4 semanas | Pipeline CI/CD da SecureSoft atualiza automaticamente a dependência |
| Há 3 semanas | SecureSoft lança a versão 4.2.1 da plataforma (com a biblioteca comprometida) |
| Há 2 semanas | 1.800 das 2.300 organizações clientes atualizam para a versão 4.2.1 |
| Quinta 14h00 | Investigador de segurança contacta a SecureSoft |
| Quinta 14h30 | Equipa de desenvolvimento confirma a presença do código malicioso |
| Quinta 15h00 | CEO ativado; decisão de tratamento como incidente crítico |

### Análise do código malicioso

O código inserido na biblioteca `json-utils-pro` v2.4.0 executava as seguintes ações:

```
  ┌─────────────────────────────────────────────────────────────┐
  │           COMPORTAMENTO DO CÓDIGO MALICIOSO                  │
  │                                                              │
  │   1. Interceta chamadas à função parseJSON()                 │
  │                    │                                         │
  │                    ▼                                         │
  │   2. Verifica se o objeto contém campos "username",          │
  │      "password", "token" ou "session"                        │
  │                    │                                         │
  │                    ▼                                         │
  │   3. Se sim, codifica os dados em Base64                     │
  │                    │                                         │
  │                    ▼                                         │
  │   4. Envia via HTTPS POST para                               │
  │      collect.json-analytics[.]io (servidor na Moldávia)      │
  │                    │                                         │
  │                    ▼                                         │
  │   5. Execução silenciosa — sem erros, sem logs               │
  └─────────────────────────────────────────────────────────────┘
```

!!! info "Porquê HTTPS?"
    O atacante usou HTTPS para a exfiltração porque o tráfego encriptado não é inspecionado pela maioria das firewalls e proxies corporativos. O domínio `json-analytics.io` foi escolhido para parecer legítimo e não levantar suspeitas em análises superficiais de tráfego de rede.

### Aplicação do modelo de 7 passos

| Passo | Ações realizadas |
|-------|-----------------|
| **1. Preparação** | Pipeline CI/CD sem verificação de integridade de dependências; sem SCA (Software Composition Analysis); sem processo de avaliação de maintainers de bibliotecas open-source; SBOM (Software Bill of Materials) não gerado |
| **2. Deteção** | Deteção externa (investigador de segurança) — 3 semanas após o lançamento da versão comprometida; nenhum mecanismo interno detetou a exfiltração de credenciais; sem monitorização de tráfego de saída anómalo |
| **3. Contenção** | Retirada imediata da versão 4.2.1 dos canais de distribuição; publicação de advisory de segurança urgente; contacto direto (telefone) com os 50 maiores clientes (câmaras, hospitais); pedido aos clientes para bloquear o domínio do servidor de exfiltração |
| **4. Investigação** | Análise do código malicioso: recolhia credenciais de login e tokens de sessão, enviando-os via HTTPS para servidor na Moldávia; estimativa de impacto: 1.800 organizações afetadas, potencialmente 45.000 credenciais de utilizadores exfiltradas |
| **5. Erradicação** | Build limpo da versão 4.2.2 sem a biblioteca comprometida; substituição de `json-utils-pro` por alternativa auditada; implementação de lock files e verificação de hashes para todas as dependências |
| **6. Recuperação** | Distribuição de emergência da versão 4.2.2; orientações aos clientes para reset de todas as passwords; revogação de todos os tokens de sessão; monitorização de uso indevido das credenciais exfiltradas |
| **7. Follow-up** | Implementação de SCA no pipeline; geração automática de SBOM; processo de avaliação de dependências; programa de bug bounty; comunicação transparente com clientes; revisão do seguro de responsabilidade civil |

```
  ╔═══════════════════════════════════════════════════════════╗
  ║          CADEIA DE ATAQUE — SUPPLY CHAIN                  ║
  ╠═══════════════════════════════════════════════════════════╣
  ║                                                           ║
  ║  ┌────────────┐    ┌────────────┐    ┌────────────────┐  ║
  ║  │ Maintainer │    │ Biblioteca │    │ Pipeline       │  ║
  ║  │ malicioso  │───►│ NPM        │───►│ CI/CD          │  ║
  ║  │            │    │ (backdoor) │    │ SecureSoft     │  ║
  ║  └────────────┘    └────────────┘    └───────┬────────┘  ║
  ║                                              │            ║
  ║                                              ▼            ║
  ║  ┌────────────┐    ┌────────────┐    ┌────────────────┐  ║
  ║  │ Servidor   │◄───│ Credenciais│◄───│ 1.800 clientes │  ║
  ║  │ Moldávia   │    │ exfiltradas│    │ (v4.2.1)       │  ║
  ║  └────────────┘    └────────────┘    └────────────────┘  ║
  ╚═══════════════════════════════════════════════════════════╝
```

!!! warning "Responsabilidade legal"
    A SecureSoft, enquanto fornecedora do software, pode ser responsabilizada pelos danos causados aos seus clientes. A Diretiva NIS2 e o RGPD impõem obrigações de segurança na cadeia de fornecimento. A ausência de controlos sobre dependências de terceiros pode ser considerada negligência.

**Como interpretar:**

*O supply chain attack é particularmente devastador porque explora a relação de confiança entre fornecedor e cliente. Os 1.800 clientes que atualizaram para a versão 4.2.1 fizeram-no seguindo boas práticas (manter o software atualizado) — e foram precisamente essas boas práticas que os expuseram ao ataque. Este paradoxo coloca em causa a confiança no ecossistema de software.*

*A atualização automática de dependências no pipeline CI/CD, sem verificação de integridade ou revisão de alterações, transformou o pipeline de desenvolvimento num vetor de ataque. A ausência de SBOM significa que a SecureSoft não sabia exatamente o que incluía no seu produto — um risco crescente que as regulamentações (NIS2, Cyber Resilience Act) começam a endereçar.*

**Para refletir:**

- A SecureSoft deve assumir responsabilidade total perante os clientes, ou partilhá-la com o ecossistema NPM? Como se atribui responsabilidade numa cadeia de fornecimento?
- Os 500 clientes que não atualizaram para a versão 4.2.1 estão seguros, ou a versão anterior pode ter outras vulnerabilidades?
- Como se comunica uma falha desta natureza a 2.300 clientes sem destruir a confiança na empresa?
- Que mecanismos técnicos poderiam ter prevenido este ataque (pinning de versões, SCA, SBOM, verificação de assinaturas)?

### Lições aprendidas

| Área | Lição |
|------|-------|
| **SCA** | A análise de composição de software (SCA) teria sinalizado a mudança de maintainer e as alterações suspeitas na biblioteca |
| **SBOM** | Sem um inventário de componentes (SBOM), é impossível avaliar rapidamente o impacto de uma vulnerabilidade em dependências |
| **Pipeline** | Atualizações automáticas de dependências sem revisão humana ou verificação de integridade são um risco significativo |
| **Lock files** | A utilização de lock files com hashes previne a injeção silenciosa de versões comprometidas |
| **Comunicação** | A transparência com os clientes, embora dolorosa, é essencial para manter a confiança a longo prazo — tentar ocultar agrava exponencialmente as consequências |

---

## Síntese comparativa dos 5 casos

A tabela seguinte resume as características principais de cada caso e permite comparar padrões transversais:

| Caso | Tipo de incidente | Tempo de deteção | Framework mais relevante | Lição principal |
|------|-------------------|-------------------|--------------------------|-----------------|
| **1. Hospital** | Ransomware | 3 dias (tardia) | NIST SP 800-61 | Backups offline e segmentação de rede são a última linha de defesa |
| **2. Universidade** | Phishing / comprometimento de conta | 2 dias (externa) | SANS 6 passos | MFA obrigatório elimina a maioria dos ataques de phishing de credenciais |
| **3. Banco** | DDoS volumétrico + L7 | 5 minutos (rápida) | ISO 27035 | Ter um plano de mitigação DDoS não é suficiente — é preciso testá-lo |
| **4. Telecomunicações** | Insider threat / exfiltração | 44 dias (muito tardia) | ISACA (governança) | O período de aviso prévio requer restrição imediata de acessos sensíveis |
| **5. Software** | Supply chain attack | 3 semanas (externa) | ENISA / NIS2 | A segurança da cadeia de fornecimento de software é responsabilidade do fornecedor |

### Comparação dos tempos de resposta

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║       TEMPO DE DETEÇÃO vs IMPACTO — 5 CASOS                   ║
  ╠═══════════════════════════════════════════════════════════════╣
  ║                                                                ║
  ║   Caso 3 (Banco)   ►── 5 min ──────── Impacto: financeiro     ║
  ║   Caso 2 (Univ.)   ►── 2 dias ─────── Impacto: reputacional   ║
  ║   Caso 1 (Hospital) ►── 3 dias ─────── Impacto: vida humana   ║
  ║   Caso 5 (Software) ►── 3 semanas ──── Impacto: cadeia inteira ║
  ║   Caso 4 (Telecom)  ►── 44 dias ────── Impacto: legal + RGPD  ║
  ║                                                                ║
  ║   Conclusão: deteção rápida ≠ baixo impacto                   ║
  ║   O tipo de incidente determina o impacto tanto quanto         ║
  ║   a velocidade de deteção                                      ║
  ╚═══════════════════════════════════════════════════════════════╝
```

### Padrões transversais

!!! info "O que os 5 casos têm em comum"
    - A **preparação** foi insuficiente em todos os casos — planos existiam mas não foram testados ou atualizados
    - A **deteção** foi o passo mais fraco — apenas o banco (Caso 3) detetou o incidente internamente e em tempo útil
    - O **follow-up** é frequentemente negligenciado na prática — as lições são identificadas mas nem sempre implementadas
    - A **comunicação** (interna, aos reguladores, aos afetados) é tão crítica como a resposta técnica

### O passo mais fraco em cada caso

| Caso | Passo mais fraco | Porquê |
|------|------------------|--------|
| **1. Hospital** | Preparação | IRT sem treino, backups não testados, sem segmentação |
| **2. Universidade** | Deteção | Comprometimento detetado externamente, não internamente |
| **3. Banco** | Preparação | Contrato de mitigação DDoS existia mas nunca foi testado |
| **4. Telecomunicações** | Deteção + Preparação | 44 dias sem deteção; sem DLP, sem procedimento de offboarding |
| **5. Software** | Preparação | Sem SCA, sem SBOM, sem verificação de dependências |

> A preparação é consistentemente o passo mais fraco. Isto sugere que as organizações investem mais na capacidade de resposta do que na prevenção e no planeamento — uma inversão de prioridades que os frameworks tentam corrigir.

**Para refletir:**

- Dos 5 casos, qual teria o maior impacto financeiro? E o maior impacto na segurança de pessoas?
- Se tivesse de escolher **uma única medida preventiva** para implementar em cada organização, qual seria? Porquê?
- Que papel desempenha a **regulamentação** (RGPD, NIS2, DORA) na melhoria da resposta a incidentes?
- Em que casos a **externalização** do SOC ou do IRT teria feito diferença significativa?
