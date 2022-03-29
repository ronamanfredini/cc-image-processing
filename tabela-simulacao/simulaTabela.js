class SimulaTabela {
	static runSimulation(tempo, tec, ts) {
		console.log(tempo);
		console.log(tec);
		console.log(ts);
		let tableArray = [];
		let clientId = 1;
		let totals = {
			tempoServico: 0,
			tempoClienteFila: 0,
			tempoClienteSistema: 0,
			tempoLivreOperador: 0
		}
		for (let i = 0; i <= tempo; i++) {
			let table = {
				cliente: 0,
				tempoChegadaRandom: 0,
				tempoChegada: 0,
				tempoServicoRandom: 0,
				tempoInicioServico: 0,
				tempoClienteFila: 0,
				tempoFinalServico: 0,
				tempoDoCliente: 0,
				tempoLivreDoOperador: 0
			};

			table.cliente = clientId;
			table.tempoChegadaRandom = tec[this.randomArray(tec)];
			table.tempoServicoRandom = ts[this.randomArray(ts)];
			if (tableArray.length < 1) {
				table.tempoChegada = table.tempoChegadaRandom;
				table.tempoInicioServico = table.tempoChegadaRandom;
				table.tempoLivreDoOperador = table.tempoChegadaRandom;
				table.tempoClienteFila = 0;
				totals.tempoLivreOperador = table.tempoChegadaRandom;
				totals.tempoServico = table.tempoServicoRandom;
			} else {
				table.tempoChegada = tableArray[clientId - 2].tempoChegada + table.tempoChegadaRandom;
				table.tempoInicioServico = tableArray[clientId - 2].tempoInicioServico + table.tempoChegadaRandom + table.tempoDoCliente;
				table.tempoLivreDoOperador = tableArray[clientId - 2].tempoFinalServico < table.tempoChegada ? table.tempoChegada - tableArray[clientId - 2].tempoFinalServico : 0;
				totals.tempoLivreOperador = totals.tempoLivreOperador + table.tempoLivreDoOperador;
				totals.tempoServico = totals.tempoServico + table.tempoServicoRandom;
				if (tableArray[clientId - 2].tempoFinalServico >= table.tempoChegada) {
					table.tempoClienteFila = tableArray[clientId - 2].tempoFinalServico - table.tempoChegada;
					totals.tempoClienteFila = totals.tempoClienteFila + table.tempoClienteFila;
				} else {
					table.tempoClienteFila = 0;
				}
			}
			table.tempoFinalServico = table.tempoInicioServico + table.tempoServicoRandom;
			table.tempoDoCliente = table.tempoServicoRandom + table.tempoClienteFila;
			totals.tempoClienteSistema = totals.tempoClienteSistema + table.tempoDoCliente;
			tableArray.push(table);
			clientId++;
			if (tempo < table.tempoInicioServico) break;
		}
		return [tableArray, totals];
	}

	static randomArray(array) {
		return (Math.random() * (array.length - 1)).toFixed(0);
	}

	
}

