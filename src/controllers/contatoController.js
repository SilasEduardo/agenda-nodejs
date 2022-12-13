const { async } = require("regenerator-runtime");
const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("form", {
    contato: {}
  });
};

exports.register = async (req, res) => {
  try {
    const { ...body } = req.body;
    const contato = new Contato(body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(function () {
        return res.redirect("index");
      });

      return;
    }

    req.flash("success", "contact successfully savid");
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    res.render("404");
    console.error(e);
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const user = await Contato.prototype.buscaPorId(req.params.id);

  if (!user) return res.render("404");

  res.render("form", {
    contato: user,
  });
};

exports.edit = async (req, res) => {

  try{

    if (!req.params.id) return res.render("404");
  const { ...body } = req.body;
  const contato = new Contato(body);
 
  await contato.edit(req.params.id);

  if (contato.errors.length > 0) {
    req.flash("errors", contato.errors);
    req.session.save(function () {
      return res.redirect("/contato/index");
    });

    return;
  };

  
  req.flash("success", "contact successfully edit");
  req.session.save(function () {
    return res.redirect(`/contato/index/${contato.contato._id}`);
  });

  } catch(e) {
    console.log('Error: ', e )
  }
  
  
};


exports.delete = async (req, res) => {

  try{

  if (!req.params.id) return res.render("404");
  const { ...body } = req.body;
  const contato = new Contato(body);
 
  await contato.delete(req.params.id);

  if (contato.errors.length > 0) {
    req.flash("errors", contato.errors);
    req.session.save(function () {
      return res.redirect("/");
    });

    return;
  };

  
  req.flash("success", "contact successfully delete");
  req.session.save(function () {
    return res.redirect("/");
  });

  } catch(e) {
    console.log('Error: ', e )
  }
  
  
};
