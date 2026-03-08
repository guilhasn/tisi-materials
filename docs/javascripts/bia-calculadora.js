// BIA Calculadoras Interativas - TISI

// ============================================
// 1. Validador BIA (RTO + WRT <= MTD)
// ============================================
function validarBIA() {
  var nome = document.getElementById('bia-nome').value || 'Sistema';
  var rpo = parseFloat(document.getElementById('bia-rpo').value);
  var rto = parseFloat(document.getElementById('bia-rto').value);
  var wrt = parseFloat(document.getElementById('bia-wrt').value);
  var mtd = parseFloat(document.getElementById('bia-mtd').value);

  if (isNaN(rpo) || isNaN(rto) || isNaN(wrt) || isNaN(mtd)) {
    document.getElementById('bia-resultado').innerHTML =
      '<div class="calc-erro">Preenche todos os campos com valores numericos.</div>';
    return;
  }

  var soma = rto + wrt;
  var margem = mtd - soma;
  var valido = soma <= mtd;
  var margemPct = mtd > 0 ? ((margem / mtd) * 100).toFixed(1) : 0;

  var html = '<div class="calc-resultado">';
  html += '<h4>Resultado - ' + escapeHtml(nome) + '</h4>';
  html += '<table class="calc-tabela">';
  html += '<tr><td>RPO</td><td>' + rpo + ' min (' + (rpo / 60).toFixed(1) + 'h)</td></tr>';
  html += '<tr><td>RTO</td><td>' + rto + ' min (' + (rto / 60).toFixed(1) + 'h)</td></tr>';
  html += '<tr><td>WRT</td><td>' + wrt + ' min (' + (wrt / 60).toFixed(1) + 'h)</td></tr>';
  html += '<tr><td>MTD</td><td>' + mtd + ' min (' + (mtd / 60).toFixed(1) + 'h)</td></tr>';
  html += '</table>';
  html += '<hr>';
  html += '<p><strong>RTO + WRT = ' + soma + ' min (' + (soma / 60).toFixed(1) + 'h)</strong></p>';
  html += '<p>MTD = ' + mtd + ' min (' + (mtd / 60).toFixed(1) + 'h)</p>';
  html += '<p>Margem = ' + margem + ' min (' + (margem / 60).toFixed(1) + 'h) &mdash; ' + margemPct + '% do MTD</p>';

  if (valido) {
    html += '<div class="calc-sucesso">';
    html += 'VALIDO &mdash; RTO + WRT &le; MTD';
    if (margem < mtd * 0.1) {
      html += '<br><small>Aviso: Margem muito apertada (' + margemPct + '% do MTD)</small>';
    }
    html += '</div>';
  } else {
    html += '<div class="calc-erro">';
    html += 'INVALIDO &mdash; RTO + WRT excede MTD em ' + Math.abs(margem) + ' min';
    html += '<br><small>Reduz o RTO ou WRT, ou aumenta o MTD.</small>';
    html += '</div>';
  }

  // Diagrama visual
  var total = Math.max(mtd, soma);
  var rtoWidth = (rto / total * 100).toFixed(0);
  var wrtWidth = (wrt / total * 100).toFixed(0);
  var mtdWidth = (mtd / total * 100).toFixed(0);

  html += '<div class="calc-diagrama">';
  html += '<p><small>Diagrama temporal:</small></p>';
  html += '<div class="barra-container">';
  html += '<div class="barra-rto" style="width:' + rtoWidth + '%">RTO</div>';
  html += '<div class="barra-wrt" style="width:' + wrtWidth + '%">WRT</div>';
  html += '</div>';
  html += '<div class="barra-mtd" style="width:' + mtdWidth + '%">MTD</div>';
  html += '</div>';

  html += '</div>';
  document.getElementById('bia-resultado').innerHTML = html;
}

// ============================================
// 2. Calculadora MTBF / MTTR / Disponibilidade
// ============================================
function calcularFiabilidade() {
  var nome = document.getElementById('fiab-nome').value || 'Sistema';
  var horasOp = parseFloat(document.getElementById('fiab-horas').value);
  var falhasStr = document.getElementById('fiab-falhas').value;

  if (isNaN(horasOp) || !falhasStr.trim()) {
    document.getElementById('fiab-resultado').innerHTML =
      '<div class="calc-erro">Preenche todos os campos.</div>';
    return;
  }

  var falhas = falhasStr.split(',').map(function (s) { return parseFloat(s.trim()); });
  var falhasValidas = falhas.filter(function (f) { return !isNaN(f) && f > 0; });

  if (falhasValidas.length === 0) {
    document.getElementById('fiab-resultado').innerHTML =
      '<div class="calc-erro">Introduz pelo menos uma duracao de falha valida.</div>';
    return;
  }

  var numFalhas = falhasValidas.length;
  var tempoReparacao = falhasValidas.reduce(function (a, b) { return a + b; }, 0);
  var tempoEfetivo = horasOp - tempoReparacao;
  var mtbf = tempoEfetivo / numFalhas;
  var mttr = tempoReparacao / numFalhas;
  var disponibilidade = mtbf / (mtbf + mttr);
  var downtimeAnual = 8760 * (1 - disponibilidade);

  var html = '<div class="calc-resultado">';
  html += '<h4>Fiabilidade - ' + escapeHtml(nome) + '</h4>';
  html += '<table class="calc-tabela">';
  html += '<tr><td>Periodo analisado</td><td>' + horasOp + ' horas</td></tr>';
  html += '<tr><td>Numero de falhas</td><td>' + numFalhas + '</td></tr>';
  html += '<tr><td>Reparacoes (horas)</td><td>' + falhasValidas.join(', ') + '</td></tr>';
  html += '</table>';
  html += '<hr>';
  html += '<table class="calc-tabela">';
  html += '<tr><td><strong>MTBF</strong></td><td>' + mtbf.toFixed(1) + ' horas (' + (mtbf / 24).toFixed(1) + ' dias)</td></tr>';
  html += '<tr><td><strong>MTTR</strong></td><td>' + mttr.toFixed(2) + ' horas (' + (mttr * 60).toFixed(0) + ' min)</td></tr>';
  html += '<tr><td><strong>Disponibilidade</strong></td><td>' + (disponibilidade * 100).toFixed(3) + '%</td></tr>';
  html += '<tr><td>Downtime anual estimado</td><td>' + downtimeAnual.toFixed(1) + ' horas</td></tr>';
  html += '</table>';

  // Comparacao com SLAs
  html += '<hr>';
  html += '<h4>Comparacao com SLAs</h4>';
  html += '<table class="calc-tabela">';
  html += '<tr><th>SLA</th><th>Max downtime/ano</th><th>Estado</th></tr>';
  var slas = [
    { nome: '99.0%', max: 87.6 },
    { nome: '99.9%', max: 8.76 },
    { nome: '99.95%', max: 4.38 },
    { nome: '99.99%', max: 0.876 }
  ];
  for (var i = 0; i < slas.length; i++) {
    var cumpre = downtimeAnual <= slas[i].max;
    html += '<tr>';
    html += '<td>' + slas[i].nome + '</td>';
    html += '<td>' + slas[i].max + 'h</td>';
    html += '<td class="' + (cumpre ? 'sla-ok' : 'sla-falha') + '">' + (cumpre ? 'CUMPRE' : 'NAO CUMPRE') + '</td>';
    html += '</tr>';
  }
  html += '</table>';
  html += '</div>';

  document.getElementById('fiab-resultado').innerHTML = html;
}

// ============================================
// 3. Calculadora de Custo de Downtime
// ============================================
function calcularCusto() {
  var faturacao = parseFloat(document.getElementById('custo-faturacao').value);
  var rto = parseFloat(document.getElementById('custo-rto').value);
  var wrt = parseFloat(document.getElementById('custo-wrt').value);
  var prodWrt = parseFloat(document.getElementById('custo-prod-wrt').value) / 100;
  var incidentes = parseFloat(document.getElementById('custo-incidentes').value);

  if (isNaN(faturacao) || isNaN(rto) || isNaN(wrt) || isNaN(prodWrt) || isNaN(incidentes)) {
    document.getElementById('custo-resultado').innerHTML =
      '<div class="calc-erro">Preenche todos os campos.</div>';
    return;
  }

  var rtoH = rto / 60;
  var wrtH = wrt / 60;
  var perdaRto = rtoH * faturacao;
  var perdaWrt = wrtH * faturacao * (1 - prodWrt);
  var perdaIncidente = perdaRto + perdaWrt;
  var perdaAnual = perdaIncidente * incidentes;

  var html = '<div class="calc-resultado">';
  html += '<h4>Custo de Downtime</h4>';
  html += '<table class="calc-tabela">';
  html += '<tr><td>Faturacao/hora</td><td>' + faturacao.toLocaleString() + ' EUR</td></tr>';
  html += '<tr><td>RTO</td><td>' + rto + ' min (' + rtoH.toFixed(1) + 'h) - perda total</td></tr>';
  html += '<tr><td>WRT</td><td>' + wrt + ' min (' + wrtH.toFixed(1) + 'h) - ' + (prodWrt * 100) + '% produtivo</td></tr>';
  html += '<tr><td>Incidentes/ano</td><td>' + incidentes + '</td></tr>';
  html += '</table>';
  html += '<hr>';
  html += '<table class="calc-tabela">';
  html += '<tr><td>Perda durante RTO</td><td><strong>' + perdaRto.toLocaleString() + ' EUR</strong></td></tr>';
  html += '<tr><td>Perda durante WRT</td><td><strong>' + perdaWrt.toLocaleString() + ' EUR</strong></td></tr>';
  html += '<tr><td>Perda por incidente</td><td><strong>' + perdaIncidente.toLocaleString() + ' EUR</strong></td></tr>';
  html += '<tr class="calc-destaque"><td>Perda anual estimada</td><td><strong>' + perdaAnual.toLocaleString() + ' EUR</strong></td></tr>';
  html += '</table>';

  // Analise de investimento
  var investimento = document.getElementById('custo-investimento').value;
  if (investimento && !isNaN(parseFloat(investimento))) {
    var inv = parseFloat(investimento);
    var novoRto = parseFloat(document.getElementById('custo-novo-rto').value);
    if (!isNaN(novoRto)) {
      var novoRtoH = novoRto / 60;
      var novaPerdaRto = novoRtoH * faturacao;
      var novaPerdaWrt = perdaWrt; // WRT mantém-se
      var novaPerdaIncidente = novaPerdaRto + novaPerdaWrt;
      var novaPerdaAnual = novaPerdaIncidente * incidentes;
      var poupanca = perdaAnual - novaPerdaAnual;
      var roi = poupanca - inv;

      html += '<hr>';
      html += '<h4>Analise de Investimento</h4>';
      html += '<table class="calc-tabela">';
      html += '<tr><td>Novo RTO</td><td>' + novoRto + ' min (' + novoRtoH.toFixed(1) + 'h)</td></tr>';
      html += '<tr><td>Nova perda anual</td><td>' + novaPerdaAnual.toLocaleString() + ' EUR</td></tr>';
      html += '<tr><td>Poupanca anual</td><td>' + poupanca.toLocaleString() + ' EUR</td></tr>';
      html += '<tr><td>Custo do investimento</td><td>' + inv.toLocaleString() + ' EUR/ano</td></tr>';
      html += '<tr class="calc-destaque"><td>Beneficio liquido</td><td><strong>' + roi.toLocaleString() + ' EUR/ano</strong></td></tr>';
      html += '<tr><td>Justifica-se?</td><td class="' + (roi > 0 ? 'sla-ok' : 'sla-falha') + '"><strong>' + (roi > 0 ? 'SIM' : 'NAO') + '</strong></td></tr>';
      html += '</table>';
    }
  }

  html += '</div>';
  document.getElementById('custo-resultado').innerHTML = html;
}

// ============================================
// 4. Verificador de Backup vs RPO
// ============================================
function verificarBackup() {
  var rpo = parseFloat(document.getElementById('backup-rpo').value);
  var freq = parseFloat(document.getElementById('backup-freq').value);

  if (isNaN(rpo) || isNaN(freq)) {
    document.getElementById('backup-resultado').innerHTML =
      '<div class="calc-erro">Preenche todos os campos.</div>';
    return;
  }

  var adequado = freq <= rpo;
  var html = '<div class="calc-resultado">';
  html += '<table class="calc-tabela">';
  html += '<tr><td>RPO definido</td><td>' + rpo + ' minutos</td></tr>';
  html += '<tr><td>Frequencia de backup</td><td>a cada ' + freq + ' minutos</td></tr>';
  html += '<tr><td>Perda maxima possivel</td><td>' + freq + ' minutos de dados</td></tr>';
  html += '</table>';

  if (rpo === 0) {
    html += '<div class="calc-aviso">RPO de zero requer <strong>replicacao sincrona em tempo real</strong>, nao apenas backups periodicos.</div>';
  } else if (adequado) {
    html += '<div class="calc-sucesso">ADEQUADO &mdash; A frequencia de backup (' + freq + ' min) cumpre o RPO (' + rpo + ' min).</div>';
  } else {
    html += '<div class="calc-erro">INADEQUADO &mdash; A frequencia de backup (' + freq + ' min) e superior ao RPO (' + rpo + ' min).<br>';
    html += '<small>Na pior hipotese, podes perder ' + freq + ' min de dados, mas so aceitas ' + rpo + ' min.<br>';
    html += 'Recomendacao: backups a cada ' + rpo + ' minutos ou menos.</small></div>';
  }

  html += '</div>';
  document.getElementById('backup-resultado').innerHTML = html;
}

// ============================================
// Utilidades
// ============================================
function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// Carregar exemplos pre-definidos no validador BIA
function carregarExemplo(nome, rpo, rto, wrt, mtd) {
  document.getElementById('bia-nome').value = nome;
  document.getElementById('bia-rpo').value = rpo;
  document.getElementById('bia-rto').value = rto;
  document.getElementById('bia-wrt').value = wrt;
  document.getElementById('bia-mtd').value = mtd;
  validarBIA();
}
