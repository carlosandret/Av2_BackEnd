const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')


/* ----- funções de roteamento ----- */
router.get('/entrar', (req, res) => {
    res.render('pages/login',
        {
            title: 'Entrar',
        })
})

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/novo', (req, res) => {
    res.render('pages/new_user',
        {
            title: 'Novo Usuário',
            paginaAtiva: 'new_ser'
        })
})

router.post('/salvar', userController.save)

module.exports = router