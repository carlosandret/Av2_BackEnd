
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

exports.listaUsers = listaUsers;