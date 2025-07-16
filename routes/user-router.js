const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')


/* ----- funções de roteamento ----- */
router.get('/entrar', (req, res) => {
    res.render('pages/login',
        {
            title: 'Entrar',
            paginaAtiva: "login"
        })
})

router.post('/login', userController.login)

router.get('/sair', userController.logout)

router.get('/novo', (req, res) => {
    res.render('pages/new_user',
        {
            title: 'Novo Usuário',
            paginaAtiva: 'new_ser'
        })
})

router.get('/perfil', userController.perfil)

// router.get('/editar_perfil')
router.post('/salvar', userController.save)

module.exports = router