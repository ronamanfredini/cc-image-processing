class Formulas {

	static converteParaHoras(valor) {
		return (60 / valor).toFixed(2);
	}

	static taxaMediaDeUtilizacao(chegada, servico) {
		return (chegada / servico).toFixed(2);
	}

	static numeroMedioDeClientesSistema(chegada, servico) {
		return (chegada / (servico - chegada)).toFixed(2);
	}

	static tempoMedioDespendidoNoSistema(chegada, servico) {
		return (1 / (servico - chegada)).toFixed(2);
	}

	static probabilidadeNClientesNoLocal(chegada, servico, n) {
		return ((1 - (chegada / servico)) * (chegada / servico)**n).toFixed(2);
	}
}

