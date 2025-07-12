const validator = require('validator');
const ATIVOS_VALIDOS = ['PETR4', 'ITSA4', 'BBAS3', 'WEGE3', 'BBSE3'];
const TIPOS_VALIDOS = ['compra', 'venda'];

/**
 * Classe para representar uma operação da bolsa de valores.
 * @ param { object } data Objecto javascript (chave: valor) com parâmetros da requisição.
 * @ param { string } errors Array de mensagens de erro de validação de propriedades da classe.
 */
class Operacao {
	constructor(data) {
		this.data = data;
		this.errors = [];
	}
}

Operacao.prototype.validate = function () {
	let data = this.data.data;
	let ativo = this.data.ativo;
	let tipoDeOperacao = this.data.tipoDeOperacao;
	let quantidade = this.data.quantidade;
	let preco = this.data.preco;

	if (!validator.isDate(data)) {
		this.errors.push('Formato de data inválido.')
	}
	if (!validator.isIn(ativo, ATIVOS_VALIDOS)) {
		this.errors.push('Código do ativo inválido.')
	}
	if (!validator.isIn(tipoDeOperacao, TIPOS_VALIDOS)) {
		this.errors.push('Tipo de operação inválido.')
	}
	if (!validator.isInt(quantidade)) {
		this.errors.push('Quantidade deve ser um número inteiro.')
	} else {
		quantidade = parseInt(quantidade)
		if (quantidade <= 0) {
			this.errors.push('Quantidade deve ser maior que zero.')
		}
	}
	if (!validator.isFloat(preco)) {
		this.errors.push('Preço deve ser um número real.')
	} else {
		preco = parseFloat(preco)
		if (preco <= 0) {
			this.errors.push('Preço deve ser maior que zero.')
		}
	}

	
	if (this.errors.length === 0) {
		// calculando atributos derivados
		const valorBruto = this.data.preco * this.data.quantidade;
		const taxaB3 = valorBruto * 0.0003; // 0.03% de taxa B3
		const valorLiquido = this.data.tipoDeOperacao === 'compra' ? (valorBruto + taxaB3) : (valorBruto - taxaB3);
		// limpando os dados desnessários ou extras que tenham vindo na requisição e adicionando valores derivados.
		validatedData = {
			data: data,
			ativo: ativo,
			tipoDeOperacao: tipoDeOperacao,
			quantidade: quantidade,
			preco: preco,
			valorBruto: valorBruto,
			taxaB3: taxaB3,
			valorLiquido: valorLiquido
		}
		this.data = validatedData;
	}
}

Operacao.prototype.create = function () {
	this.validate();
}

module.exports = Operacao;