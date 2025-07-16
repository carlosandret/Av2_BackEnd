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

router.post('/')
module.exports = router