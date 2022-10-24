const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel')
exports.index = (req, res) => {
    res.render('login')
};

exports.register = async (req, res) =>{
    try{
        const login = new Login(req.body);
        await login.register()

        if(login.errors.length > 0){
            req.flash('errors', login.errors);

            req.session.save(function() {
            return res.redirect('index')
            });
            return;
        }

        req.flash('success',  'Usuario cadastrado com sucesso');
        req.session.save(function() {
        return res.redirect('index')
        });

        
    }catch(e){
       return res.render('404')
        console.log(`Erro: ${e}`)
    }


}