
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        
        if (!req.body.nome.trim()) {
            return res.status(400).send('Nome é um campo obrigatório')
        } 
        if (!req.body.email.trim()) {
            return res.status(400).send('E-Mail é um campo obrigatório')
        }
        if (!req.body.password.trim()) {
            return res.status(400).send('Senha é um campo obrigatório')
        }
        if (!req.body.confirmPassword.trim()) {
            return res.status(400).send('Confirmação de senha é um campo obrigatório')
        }
        if (req.body.password != req.body.confirmPassword) {
            return res.status(400).send('Confirmação de senha inválida')
        }
        
        obterHash(req.body.password, hash => {
        const password = hash
            
        app.db('users')
            .insert ({
                nome: req.body.nome, 
                email: req.body.email.toLowerCase(), 
                password: password
            })
            .then (_ => res.status(204).send())
            .catch(err => res.status(401).json(err))
        })
    }

    return { save }
}