function getChegadas() {
  return [
    {
      a: document.getElementById('chegadas-1-a').value,
      b: document.getElementById('chegadas-1-b').value,
      c: document.getElementById('chegadas-1-c').value
    },
    {
      a: document.getElementById('chegadas-2-a').value,
      b: document.getElementById('chegadas-2-b').value,
      c: document.getElementById('chegadas-2-c').value
    }
  ];
}

function getServicos() {
  return [
    {
      a: document.getElementById('servico-1-a').value,
      b: document.getElementById('servico-1-b').value,
      c: document.getElementById('servico-1-c').value
    },
    {
      a: document.getElementById('servico-2-a').value,
      b: document.getElementById('servico-2-b').value,
      c: document.getElementById('servico-2-c').value
    }
  ];
}

function buildResultTable({ clientMaxProbability }) {
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


function run() {
  const data = {
    clientMaxProbability: document.getElementById('client-max-prob').value,
    time: document.getElementById('tempo'),
    arrivals: getChegadas(),
    services: getServicos()
  }

  buildResultTable(data);
}
