const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    cridoEm: { type: Date, default: Date.now},
});


const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body){
        this.body = body
        this.errors = []
        this.contato = null
        this.dateNow = Date.now()
    }


    async register(){
        this.valida()
        if(this.errors.length > 0) return
       this.contato = await ContatoModel.create(this.body)

    }

    async buscaId(id){
        if(typeof id !== 'string') return
        const user = await ContatoModel.findById(id)
        return user
    }
    
     
    valida() {
        this.cleanUp()
        // Validação

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Este email é inválido! ');
        if(!this.body.nome) this.errors.push('nome é um campo obrigatorio')
        if(!this.body.email && !this.body.telefone){
            this.errors.push('Pelo menos um contato precisa ser enviado: E mail ou Telefone')
            return
        } 
       
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
            criadoEm: new Date(this.dateNow)
        }
    }
    
}




module.exports = Contato