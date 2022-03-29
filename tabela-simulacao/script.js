function run() {
  const tecs = document.getElementById('tec').value.split('\n').map(item => parseFloat(item));
  const ts = document.getElementById('ts').value.split('\n').map(item => parseFloat(item));
  const tempo = parseFloat(document.getElementById('tempo').value);
  var returnArray = SimulaTabela.runSimulation(tempo, tecs, ts);
  buildResultTable(returnArray);
}

function clear() {
  document.getElementById('tec').value = null;
  document.getElementById('ts').value = null;
  document.getElementById('tempo').value = null;
}

function buildResultTable(returnArray) {
  tableArray = returnArray[0];
  const resultTable = document.getElementById('result-table');
  for (let i = 0; i < tableArray.length; i++) {
    const row = buildRow(tableArray[i]);
    resultTable.append(row);
  }
  resultTable.append(buildRowTotals(returnArray[1]));
}

function buildRow(tableRow) {
   let row = document.createElement('tr');
   Object.values(tableRow).map(item => {
     row.append(buildCell(item));
   })

   return row;
}

function buildRowTotals(rowTotals) {
  let row = document.createElement('tr');
  console.log(rowTotals);
  row.append(buildCell(''));
  row.append(buildCell(''));
  row.append(buildCell(''));
  row.append(buildCell(rowTotals.tempoServico));
  row.append(buildCell(''));
  row.append(buildCell(rowTotals.tempoClienteFila));
  row.append(buildCell(''));
  row.append(buildCell(rowTotals.tempoClienteSistema));
  row.append(buildCell(rowTotals.tempoLivreOperador));
  return row;
}

function buildCell(value) {
  let cell = document.createElement('td');
  cell.append(value);
  return cell;
}