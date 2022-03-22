class Formulas {

	static converteParaHoras(valor) {
		return 60 / valor;
	}

	static taxaMediaDeUtilizacao(chegada, servico) {
		return chegada / servico;
	}

	static numeroMedioDeClientesSistema(chegada, servico) {
		return chegada / (servico - chegada);
	}

	static tempoMedioDespendidoNoSistema(chegada, servico) {
		return 1 / (servico - chegada)
	}

	static probabilidadeNClientesNoLocal(chegada, servico, n) {
		return (1 - (chegada / servico)) * (chegada / servico)**n;
	}
}

