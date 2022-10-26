const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }

});


const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {

        try {
            this.valida()
            if (this.errors.length > 0) return
            this.user = await LoginModel.findOne({ email: this.body.email });

            if (!this.user) {
                return this.errors.push('Usuario não existe')
            }

            if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
                return this.errors.push('Senha invalida')
            }
        } catch (e) {
            consle.log(e)
        }


    }

    async register() {
        this.valida()
        if (this.errors.length > 0) return

        await this.userExists()

        if (this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);


        //salvando no bd
        this.user = await LoginModel.create(this.body)

    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if (user) this.errors.push('Usuario já existe')
    }

    valida() {
        this.cleanUp()
        // Validação

        if (!validator.isEmail(this.body.email)) this.errors.push('Este email é inválido! ');
        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('senha tem que estar entre 3 e caracteres!');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
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