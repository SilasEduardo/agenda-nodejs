const Contatos = require('../models/ContatoModel')

exports.index = async (req, res) => {
    const contatos = await Contatos.prototype.buscaContatos()
    res.render('index', {contatos});
    return;
  };
