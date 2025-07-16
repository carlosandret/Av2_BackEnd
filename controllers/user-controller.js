
const User = require('../models/user')

listaUsers = [];

exports.save = function (req, res) {
    /* Criar uma nova instância da classe User com os dados recebidos do corpo da requisição */
    const user = new User(req.body)
    /* Validar e realizar as conversoes necessarias nos dados da classe */
    user.validate()
    if (user.errors.length > 0) {
        return res.send(user.errors)
    } else {
        // Executa a função de criação do usuário presente no modelo 
        user.create()
            .then((result) => {
                res.send('Usuário salvo com sucesso com o id: ' + result);
                listaUsers.push(result);
                res.redirect('/users')
            })
            .catch((error) => {
                res.status(500).send(error)
            })
    }
}

exports.login = function (req, res) {
    const user = new User(req.body)
    user.validateLogin()
    if (user.errors.length > 0) {
        // Se houver erros, redirecionar para a pagina de login e exibir os erros
        return res.send(user.errors)
    } else {
        user.login()
            .then((result) => {
                req.session.usuario = {
                    username: result.username,
                    id: result.id
                }
                req.session.save(function () {
                    res.redirect("/")
                })
            })
            .catch((error) => {
                res.status(500).send(error)
            })
    }
}

// Função para buscar os dados do perfil do usuário
exports.perfil = function (req, res) {
    const username = req.session.usuario.username;
    const user = new User()
    user.readOneByUsername(username)
        .then((userData) => {
            res.render('pages/perfil', {
                user: userData,
                title: 'Perfil',
                paginaAtiva: 'paginaPerfil',
                pageStyles: ['/public/stylesheets/perfil-style.css']
            });
            console.log(userData)
        })
        .catch((err) => {
            res.status(500).send("Erro ao carregar perfil: " + err)
        });
}

exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect("/")
    })
}

exports.mustBeAuthenticated = function (req, res, next) {
    if (req.session.usuario) {
        return next()
    } else {
        return res.redirect('/user/entrar')
    }
}


exports.listaUsers = listaUsers;