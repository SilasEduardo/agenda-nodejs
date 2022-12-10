const validator = require("validator");

const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async buscaPorId(id) {
    if (typeof id !== "string") return;
    const user = await ContatoModel.findById(id);

    return user;
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
    
  }

  cleanUp() {
    for (const key in this.body) {
      if (this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Contato;
