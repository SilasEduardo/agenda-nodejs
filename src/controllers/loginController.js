const Login = require("../models/Login");

exports.index = (req, res) => {
  if(req.session.user) return res.render("login-logado")
  res.render("login");
  return;
};

exports.register = async (req, res) => {
  try {
    const { ...body } = req.body;
    const login = new Login(body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("index");
      });

      return;
    }

    req.flash("success", "user successfully savid");
    req.session.save(function () {
      return res.redirect("index");
    });
  } catch (e) {
    res.render("404");
    console.error(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { ...body } = req.body;
    const login = new Login(body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("index");
      });

      return;
    }

    req.flash("success", "successfully logged in");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("index");
    });
  } catch (e) {
    res.render("404");
    console.error(e);
  }
};

exports.logout = (req, res) => {
  req.session.destroy()
  return res.redirect("/");
}
