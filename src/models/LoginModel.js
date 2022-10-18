const mongoose = require('mongoose');
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    senha: {type: String, required: true}
    
});


const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    register(){
        this.valida()
        if(this.errors.length > 0)return
    }

    valida(){
        this.cleanUp()
        // Validação

        if(!validator.isEmail(this.body.email))this.errors.push('Erro isEmail ivalid');
        if(this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('Password in valid');
    }
    cleanUp(){
      for(let key in this.body){
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    } 

    this.body = {
        email: this.body.email,
        password: this.body.password
    }

    }
}

module.exports = Login