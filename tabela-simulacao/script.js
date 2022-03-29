function run() {
  const tecs = document.getElementById('tec').value.split('\n').map(item => parseFloat(item));
  const ts = document.getElementById('ts').value.split('\n').map(item => parseFloat(item));
  const tempo = parseFloat(document.getElementById('tempo').value);
  var returnArray = SimulaTabela.runSimulation(tempo, tecs, ts);
  buildResultTable(returnArray);
  buildFinalResult(returnArray);
}

function clearPage() {
  console.log('clear');

  document.getElementById('tec').value = null;
  document.getElementById('ts').value = null;
  document.getElementById('tempo').value = null;

  clearTable();
  clearFinalTable();
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

function clearTable(){
  const resultTable = document.getElementById('result-table');
  resultTable.innerHTML = '';
}

function buildFinalResult(returnArray){
  const totalClients = returnArray[0].length;
  const totalTimeCustomersOnqueue = returnArray[1].tempoClienteFila;
  const totalFreeTimeOperator = returnArray[1].tempoLivreOperador;
  const serviceFinalTime = returnArray[0][totalClients - 1].tempoFinalServico;
  const totalTimeService = returnArray[1].tempoServico;
  const totalTimeCustomersOnSistem = returnArray[1].tempoClienteSistema;
  
  let waitTimeOnQueueRow = document.getElementById("wait-time-on-queue");
  let probWaitClientOnQueueRow = document.getElementById("probability-wait-client-on-queue");
  let probFreeOperatorRow = document.getElementById("probability-free-operator");
  let mediumTimeServiceRow = document.getElementById("medium-time-service");
  let mediumTimeOutSistemRow = document.getElementById("medium-time-out-sistem");
  
  let waitTimeOnQueue = (totalTimeCustomersOnqueue / totalClients).toFixed(2);
  waitTimeOnQueueRow.append(buildCell(`${waitTimeOnQueue} minutos`));

  let probWaitClientOnQueue = (totalTimeCustomersOnqueue / totalClients * 100).toFixed(2);
  probWaitClientOnQueueRow.append(buildCell(`${probWaitClientOnQueue} %`));

  let probFreeOperator = (totalFreeTimeOperator / serviceFinalTime * 100).toFixed(2);
  probFreeOperatorRow.append(buildCell(`${probFreeOperator} %`));

  let mediumTimeService = (totalTimeService / totalClients).toFixed(2);
  mediumTimeServiceRow.append(buildCell(`${mediumTimeService} minutos`));

  let mediumTimeOutSistem = (totalTimeCustomersOnSistem / totalClients).toFixed(2);
  mediumTimeOutSistemRow.append(buildCell(`${mediumTimeOutSistem} minutos`));
}

function clearFinalTable(){
  let waitTimeOnQueueRow = document.getElementById("wait-time-on-queue");
  let probWaitClientOnQueueRow = document.getElementById("probability-wait-client-on-queue");
  let probFreeOperatorRow = document.getElementById("probability-free-operator");
  let mediumTimeServiceRow = document.getElementById("medium-time-service");
  let mediumTimeOutSistemRow = document.getElementById("medium-time-out-sistem");
  
  waitTimeOnQueueRow.removeChild(waitTimeOnQueueRow.getElementsByTagName('td')[0]);
  probWaitClientOnQueueRow.removeChild(probWaitClientOnQueueRow.getElementsByTagName('td')[0]);
  probFreeOperatorRow.removeChild(probFreeOperatorRow.getElementsByTagName('td')[0]);
  mediumTimeServiceRow.removeChild(mediumTimeServiceRow.getElementsByTagName('td')[0]);
  mediumTimeOutSistemRow.removeChild(mediumTimeOutSistemRow.getElementsByTagName('td')[0]);
}