// lista para atuar como base de dados temporária
let listaDeOperacoes = []

const Operacao = require('../models/operacao')


exports.save = async function (req, res) {
    const operacao = new Operacao(req.body);

    operacao.validate();

    if (operacao.errors.length > 0) {
        return res.send(operacao.errors);
    }

    try {
        const idGerado = await operacao.create(); // Espera o ID gerado após inserir no banco
        operacao.data.id = idGerado; // Atualiza o objeto com o ID gerado

        listaDeOperacoes.push(operacao.data); // Adiciona na lista local

        res.redirect('/operacao/operacoes'); // Redireciona para a lista de operações
    } catch (error) {
        res.status(500).send('Erro ao salvar operação: ' + error);
    }
}

exports.update = function (req, res) {
    // const idOperacao = Number(req.body.idOperacao || req.query.id);
    // Separa o idOperação do resto do corpo da requisição
    // let {idOperacao, ...dadosSemId} = req.body
    let idOperacao = Number(req.body.idOperacao)
    console.log(idOperacao)
    // Confere se o id é válido     
    if (isNaN(idOperacao)) {
        return res.status(400).send('ID inválido');
    }

    res.redirect('/operacao/editar_operacao')

    console.log(idOperacao)

    const editOperacao = new Operacao(req.body);
    editOperacao.validate()

    if (editOperacao.errors.length > 0) {
        return res.send(editOperacao.errors)
    }

    try {
        // Executa a função de edição, passando o id da operação que será editada como parametro
        editOperacao.edit(idOperacao);

        // Remove operação antiga da lista
        listaDeOperacoes = listaDeOperacoes.filter(op => op.id !== idOperacao);
        listaDeOperacoes.push(editOperacao.data); // Adiciona a operação editada
        res.redirect('/operacao/operacoes') // redirecionar para a página de listagem de operações após editar
    } catch (error) {
        res.status(500).send('Erro ao editar operação: ' + error);
    }
}

exports.delete = async function (req, res) {
    const idOperacao = Number(req.body.idOperacao);

    if (isNaN(idOperacao)) {
        return res.status(400).send('ID inválido');
    }

    try {
        await Operacao.delete(idOperacao);

        // Remove a operação da lista
        listaDeOperacoes = listaDeOperacoes.filter(op => op.id !== idOperacao);

        res.redirect('/operacao/operacoes'); // redirecionar para a página de listagem de operações após deletar
    } catch (error) {
        res.status(500).send('Erro ao deletar operação: ' + error);
    }
}

exports.listaDeOperacoes = listaDeOperacoes