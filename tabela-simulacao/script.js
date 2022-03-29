function run() {
  const tecs = document.getElementById('tec').value.split('\n');
  const ts = document.getElementById('ts').value.split('\n');
  const tempo = document.getElementById('tempo').value;
  console.log(tecs, ts, tempo)
}

function clear() {
  document.getElementById('tec').value = null;
  document.getElementById('ts').value = null;
  document.getElementById('tempo').value = null;
}
