# Tutorial para a disciplina de Programação Web Back-End período 2025-1

## 8 - Models

1. Criar a pasta 'models' no nível raiz do projeto e, nesta pasta, criar o arquivo 'operacao.js' para o modelo de uma operação.

```javascript
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
    // valida as propriedades da classe
}

Operacao.prototype.create = function () {
	this.validate();   
}

module.exports = Operacao;
```

2. Importar o modelo para ser utilizado no controlador.

```javascript
const Operacao = require('../models/operacao')
```

Obs.: os métodos do modelo são criados separdamente com o prototype para tentar obter maior otimização de memória e flexibilidade de herança para subclasses (pesquisar sobre classes x prototypes em javascript).

3. Alterar a função do controlador que salva uma operação para utilizar o modelo.

```javascript
exports.save = function (req, res) {
     /* Criar uma nova instância da classe Operacao com os dados recebidos do corpo da requisição */
    const operacao = new Operacao(req.body)
    /* Validar e realizar as conversoes necessarias nos dados da classe */
    operacao.create()
    if (operacao.errors.length > 0) {
        return res.send(operacao.errors)
    } else {
        listaDeOperacoes.push(operacao.data) // adicionar os dados à lista de operações
        res.redirect('/operacoes') // redirecionar para a página de listagem de operações após salvar
    }
}
```

4. Validar e converter os dados da requisição para atender a lógica do modelo. Para isso existem algumas bibliotecas auxiliares, como o validator.
   	Obs.: na época deste tutorial, versão '13.15.0'.

```bash
npm install validator
```

Importanto validator no modelo e criando constantes personalizadas de validação.

```javascript
const validator = require('validator');

const ATIVOS_VALIDOS = ['PETR4', 'ITSA4', 'BBAS3', 'WEGE3', 'BBSE3'];
const TIPOS_VALIDOS = ['compra', 'venda'];
```

Checando formatos, fazendo conversões, validando valores e limpando os dados.

```javascript
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

```

5. Testar o projeto com a inserção de novas operações, testando valores válidos e inválidos.
