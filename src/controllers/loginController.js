const Login = require('../models/Login')

exports.index = (req, res) => {
    res.render('login');
    return;
  };


exports.register = (req, res) => {

  const { ...body } = req.body

  const login = new Login(body)

  res.send(body.email)
};