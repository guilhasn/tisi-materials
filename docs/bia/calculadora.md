# Calculadora Interativa BIA

Ferramentas de calculo interativas para praticar as metricas da Business Impact Analysis. Experimenta com diferentes valores diretamente no browser.

---

## 1. Validador BIA (RTO + WRT &le; MTD)

Verifica se as metricas definidas sao validas e calcula a margem disponivel.

**Exemplos rapidos:**

<button class="calc-btn-exemplo" onclick="carregarExemplo('Loja Online', 15, 60, 120, 240)">Loja Online</button>
<button class="calc-btn-exemplo" onclick="carregarExemplo('Hospital', 1, 15, 30, 60)">Hospital</button>
<button class="calc-btn-exemplo" onclick="carregarExemplo('Universidade', 60, 120, 240, 480)">Universidade</button>
<button class="calc-btn-exemplo" onclick="carregarExemplo('Banco', 0, 30, 60, 120)">Banco</button>
<button class="calc-btn-exemplo" onclick="carregarExemplo('Caso Invalido', 120, 300, 240, 480)">Caso Invalido</button>

<div class="calc-form">
<div class="calc-row">
<div>
<label for="bia-nome">Nome do sistema:</label>
<input type="text" id="bia-nome" placeholder="Ex: Loja Online">
</div>
<div>
<label for="bia-rpo">RPO (minutos):</label>
<input type="number" id="bia-rpo" placeholder="Ex: 15" min="0">
</div>
</div>
<div class="calc-row">
<div>
<label for="bia-rto">RTO (minutos):</label>
<input type="number" id="bia-rto" placeholder="Ex: 60" min="0">
</div>
<div>
<label for="bia-wrt">WRT (minutos):</label>
<input type="number" id="bia-wrt" placeholder="Ex: 120" min="0">
</div>
</div>
<label for="bia-mtd">MTD (minutos):</label>
<input type="number" id="bia-mtd" placeholder="Ex: 240" min="0">
<br>
<button class="calc-btn" onclick="validarBIA()">Validar</button>
</div>

<div id="bia-resultado"></div>

---

## 2. Calculadora MTBF / MTTR / Disponibilidade

Calcula metricas de fiabilidade a partir de dados de falhas e compara com SLAs.

<div class="calc-form">
<label for="fiab-nome">Nome do sistema:</label>
<input type="text" id="fiab-nome" placeholder="Ex: Cluster de Hosting">
<div class="calc-row">
<div>
<label for="fiab-horas">Horas totais de operacao:</label>
<input type="number" id="fiab-horas" placeholder="Ex: 8760 (1 ano, 24/7)" min="1">
</div>
<div>
<label for="fiab-falhas">Duracao de cada reparacao (horas, separadas por virgula):</label>
<input type="text" id="fiab-falhas" placeholder="Ex: 1.5, 0.75, 3.25, 2, 1, 4.5">
</div>
</div>
<button class="calc-btn" onclick="calcularFiabilidade()">Calcular</button>
</div>

<div id="fiab-resultado"></div>

---

## 3. Calculadora de Custo de Downtime

Estima as perdas financeiras por incidente e por ano. Opcionalmente, analisa o retorno de um investimento em infraestrutura.

<div class="calc-form">
<div class="calc-row">
<div>
<label for="custo-faturacao">Faturacao por hora (EUR):</label>
<input type="number" id="custo-faturacao" placeholder="Ex: 50000" min="0">
</div>
<div>
<label for="custo-incidentes">Incidentes por ano:</label>
<input type="number" id="custo-incidentes" placeholder="Ex: 3" min="0">
</div>
</div>
<div class="calc-row">
<div>
<label for="custo-rto">RTO atual (minutos):</label>
<input type="number" id="custo-rto" placeholder="Ex: 240" min="0">
</div>
<div>
<label for="custo-wrt">WRT (minutos):</label>
<input type="number" id="custo-wrt" placeholder="Ex: 120" min="0">
</div>
</div>
<label for="custo-prod-wrt">Produtividade durante WRT (%):</label>
<input type="number" id="custo-prod-wrt" placeholder="Ex: 50" min="0" max="100" value="50">

<hr style="margin: 1rem 0; border-color: var(--md-default-fg-color--lightest);">

<p><strong>Analise de investimento (opcional):</strong></p>
<div class="calc-row">
<div>
<label for="custo-investimento">Custo do investimento (EUR/ano):</label>
<input type="number" id="custo-investimento" placeholder="Ex: 120000" min="0">
</div>
<div>
<label for="custo-novo-rto">Novo RTO apos investimento (minutos):</label>
<input type="number" id="custo-novo-rto" placeholder="Ex: 60" min="0">
</div>
</div>
<button class="calc-btn" onclick="calcularCusto()">Calcular</button>
</div>

<div id="custo-resultado"></div>

---

## 4. Verificador de Backup vs RPO

Verifica se a frequencia de backups e adequada ao RPO definido.

<div class="calc-form">
<div class="calc-row">
<div>
<label for="backup-rpo">RPO definido (minutos):</label>
<input type="number" id="backup-rpo" placeholder="Ex: 60" min="0">
</div>
<div>
<label for="backup-freq">Frequencia de backup (a cada X minutos):</label>
<input type="number" id="backup-freq" placeholder="Ex: 1440 (diario)" min="1">
</div>
</div>
<button class="calc-btn" onclick="verificarBackup()">Verificar</button>
</div>

<div id="backup-resultado"></div>

---

## Referencia rapida

| Metrica | Pergunta-chave |
|---------|---------------|
| **RPO** | Quanto dado posso perder? |
| **RTO** | Em quanto tempo quero recuperar? |
| **WRT** | Quanto tempo preciso para normalizar? |
| **MTD** | Maximo total de paragem toleravel? |
| **MOR** | Minimo para continuar a operar? |
| **MTBF** | De quanto em quanto tempo falha? |
| **MTTR** | Quanto tempo demora a reparar? |

**Regra de ouro:** `RTO + WRT <= MTD`

---

*Material de apoio: [Metricas BIA](metricas.md) | [Casos praticos](casos-praticos.md) | [Exercicios](exercicios.md)*

*Proximo modulo: [Incident Response Plan (IRP)](../irp/index.md)*
