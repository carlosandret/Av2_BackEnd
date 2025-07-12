// lista para atuar como base de dados temporária
const listaDeOperacoes = []

const Operacao = require('../models/operacao')


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

exports.listaDeOperacoes = listaDeOperacoes