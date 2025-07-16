const express = require('express')
const router = express.Router()

const operacaoController = require('../controllers/operacao-controller')


/* ----- funções de roteamento ----- */
router.get('/nova_operacao', function (req, res) {
  res.render('pages/nova_operacao',
    {
      title: 'Nova Operação',
      paginaAtiva: 'operacao'
    }
  );
})

router.get('/operacoes', function (req, res) {
  res.render('pages/operacoes',
    {
      title: 'Operações',
      paginaAtiva: 'operacao',
      operacoes: operacaoController.listaDeOperacoes // Passa a lista de operações para a view
    }
  );
})

router.post('/salvar_operacao', operacaoController.save)

/** Rotas para editar operação */
router.post('/id_edicao', operacaoController.idParaEdicao)

router.get('/editar_operacao', function (req, res) {
  const idOperacao = Number(req.query.id);
  console.log(idOperacao)
  
  res.render('pages/editar_operacao',
    {
      title: 'Edição de operações',
      paginaAtiva: 'editOperacao',
      idOperacao: idOperacao
    }
  );
})

router.post('/editar_operacao', operacaoController.update);

/** Rotas para deletar operação */
router.post('/deletar_operacao', operacaoController.delete);

module.exports = router