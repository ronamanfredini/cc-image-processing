function getChegadas() {
  return{
    a: Formulas.converteParaHoras(document.getElementById('chegadasInputA').value),
    b: Formulas.converteParaHoras(document.getElementById('chegadasInputB').value),
    c: Formulas.converteParaHoras(document.getElementById('chegadasInputC').value)
  };
}

function getServicos() {
  return {
    a: Formulas.converteParaHoras(document.getElementById('servicoInputA').value),
    b: Formulas.converteParaHoras(document.getElementById('servicoInputB').value),
    c: Formulas.converteParaHoras(document.getElementById('servicoInputC').value)
  };
}

function buildResultTable({ clientMaxProbability, arrivals, services }) {
  const resultTable = document.getElementById('result-table');
  resultTable.innerHTML = null;
  for (let i = 0; i < clientMaxProbability; i++) {
    const row = buildRow(arrivals, services, i);
    resultTable.append(row);
  }
}

function buildRow(arrivals, services, i) {
   let row = document.createElement('tr');
   
   const cells = [
    buildCell(i),
	  buildCell(`P(${i})`),
	  buildCell(Formulas.probabilidadeNClientesNoLocal(arrivals.a, services.a, i)),
	  buildCell(Formulas.probabilidadeNClientesNoLocal(arrivals.b, services.b, i)),
	  buildCell(Formulas.probabilidadeNClientesNoLocal(arrivals.c, services.c, i))
   ];

   cells.forEach(cell => row.append(cell));

   return row;
}

function buildCell(value) {
  let cell = document.createElement('td');
  cell.append(value);

  return cell;
}

function buildTabelaHoras(data) {
  document.getElementById('chegadasResponseA').value = data.arrivals.a;
  document.getElementById('chegadasResponseB').value = data.arrivals.b;
  document.getElementById('chegadasResponseC').value = data.arrivals.c;

  document.getElementById('servicoResponseA').value = data.services.a;
  document.getElementById('servicoResponseB').value = data.services.b;
  document.getElementById('servicoResponseC').value = data.services.c;
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
    services: getServicos(),
  }

  buildTabelaHoras(data);
  buildTableDeBaixo(data);
  buildResultTable(data);
  updateTextFields();
}

function updateTextFields() {
    $(document).ready(function() {
        M.updateTextFields();
    });
}
updateTextFields();
