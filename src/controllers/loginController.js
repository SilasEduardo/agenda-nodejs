const { async } = require('regenerator-runtime');
const Login = require('../models/Login')

exports.index = (req, res) => {
    res.render('login');
    return;
  };


exports.register = async (req, res) => {
  try{
    const { ...body } = req.body;
    const  login = new Login(body);
    await login.register();

    
  
    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function() {
       return res.redirect('index');

      })
      
      return
    };

    req.flash('success', 'user successfully savid');
      req.session.save(function() {
       return res.redirect('index');

      })
    
  } catch (e) {
    res.render('404')
    console.error(e)
  }

 
};