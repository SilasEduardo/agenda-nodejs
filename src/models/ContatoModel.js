const validator = require("validator");

const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  cridoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
    this.dateNow = Date.now()
  }

  

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    //Validação
    // o e-mail precisa ser valido
    if (!this.body.name) this.errors.push("Name field cannot be empty");
    if (!this.body.lastname) this.errors.push("Lastname field cannot be empty");
    if (!this.body.email) this.errors.push("Phone field cannot be empty");
    if (!this.body.phone) this.errors.push("Email field cannot be empty");

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("email is not valid");
    }
  }

  async edit(id) {
    if (typeof id !== "string") return;

    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
    
  };


  async delete(id) {
    if (typeof id !== "string") return;
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndDelete(id);
    
  }

  cleanUp() {
    for (const key in this.body) {
      if (this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      name: this.body.name,
      lastname: this.body.lestname,
      email: this.body.email,
      phone: this.body.phone,
      criadoEm: new Date(this.dateNow)   
    };
  }

  // metodod estaticos  
  async buscaPorId(id) {
    if (typeof id !== "string") return;
    const user = await ContatoModel.findById(id);

    return user;
  }

  async buscaContatos() {
    const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
    return contatos;
  }
}




module.exports = Contato;
