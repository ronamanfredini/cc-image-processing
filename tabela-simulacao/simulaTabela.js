class SimulaTabela {

	static runSimulation(tempo, tec, ts) {
		console.log(tempo);
		console.log(tec);
		console.log(ts);
		let tableArray = [];
		let clientId = 1;
		for (let i = 0; i <= tempo; i++) {
			let table = {
				cliente: '',
				tempoChegadaRandom: '',
				tempoChegada: '',
				tempoServicoRandom: '',
				tempoInicioServico: '',
				tempoClienteFila: '',
				tempoFinalServico: '',
				tempoServicoRandomFila: '',
				tempoLivreDoOperador: ''
			};

			table.cliente = clientId;
			table.tempoChegadaRandom = tec[this.randomArray(tec)];
			table.tempoServicoRandom = ts[this.randomArray(ts)];
			if (tableArray.length < 1) {
				table.tempoChegada = table.tempoChegadaRandom;
				table.tempoInicioServico = table.tempoServicoRandom;
				table.tempoLivreDoOperador = table.tempoChegadaRandom;
			} else {
				table.tempoChegada = tableArray[clientId - 2].tempoChegada + table.tempoChegadaRandom;
				table.tempoInicioServico = tableArray[clientId - 2].tempoInicioServico + table.tempoChegadaRandom + table.tempoServicoRandomFila;
				table.tempoLivreDoOperador = tableArray[clientId - 2].tempoFinalServico + table.tempoChegada;
			}
			tableArray.push(table);
			console.log(tableArray);
			
			clientId++;
		}

	}

	static randomArray(array) {
		return (Math.random() * (array.length - 1)).toFixed(0);
	}
}

