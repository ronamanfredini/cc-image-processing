function getChegadas() {
  return {
    a: document.getElementById('chegadas-1-a').value,
    b: document.getElementById('chegadas-1-b').value,
    c: document.getElementById('chegadas-1-c').value
  }
}

function getServicos() {
  return {
    a: document.getElementById('servico-1-a').value,
    b: document.getElementById('servico-1-b').value,
    c: document.getElementById('servico-1-c').value
  };
}

function buildResultTable({ clientMaxProbability, arrivals, services }) {
  const resultTable = document.getElementById('result-table');
  resultTable.innerHTML = null;
  for (let i = 0; i < clientMaxProbability; i++) {
    const row = buildRow();

  }
}

function buildRow() {

}

function buildCell() {

}

function buildTabelaConverterHoras(data) {
  document.getElementById('chegadas-2-a').value = Formulas.converteParaHoras(data.arrivals.a);
  document.getElementById('chegadas-2-b').value = Formulas.converteParaHoras(data.arrivals.b);
  document.getElementById('chegadas-2-c').value = Formulas.converteParaHoras(data.arrivals.c);

  document.getElementById('servico-2-a').value = Formulas.converteParaHoras(data.services.a);
  document.getElementById('servico-2-b').value = Formulas.converteParaHoras(data.services.b);
  document.getElementById('servico-2-c').value = Formulas.converteParaHoras(data.services.c);
}

function buildTableDeBaixo(data) {
  document.getElementById('carros-sistema-a').innerHTML = Formulas.numeroMedioDeClientesSistema(data.arrivals.a, data.services.a);
  document.getElementById('carros-sistema-b').innerHTML = Formulas.numeroMedioDeClientesSistema(data.arrivals.b, data.services.b);
  document.getElementById('carros-sistema-c').innerHTML = Formulas.numeroMedioDeClientesSistema(data.arrivals.c, data.services.c);

  document.getElementById('tempo-despendido-sistema-a').innerHTML = Formulas.tempoMedioDespendidoNoSistema(data.arrivals.a, data.services.a);
  document.getElementById('tempo-despendido-sistema-b').innerHTML = Formulas.tempoMedioDespendidoNoSistema(data.arrivals.b, data.services.b);
  document.getElementById('tempo-despendido-sistema-c').innerHTML = Formulas.tempoMedioDespendidoNoSistema(data.arrivals.c, data.services.c);

  document.getElementById('taxa-media-a').innerText = Formulas.taxaMediaDeUtilizacao(data.arrivals.a, data.services.a);
  document.getElementById('taxa-media-b').innerHTML = Formulas.taxaMediaDeUtilizacao(data.arrivals.b, data.services.b);
  document.getElementById('taxa-media-c').innerHTML = Formulas.taxaMediaDeUtilizacao(data.arrivals.c, data.services.c);
}

function run() {
  const data = {
    clientMaxProbability: document.getElementById('client-max-prob').value,
    time: document.getElementById('tempo'),
    arrivals: getChegadas(),
    services: getServicos()
  }

  buildTabelaConverterHoras(data);
  buildTableDeBaixo(data);
  buildResultTable(data);
}
