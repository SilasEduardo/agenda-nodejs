
const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

//middlewares
const { loginRequired }= require('./src/middlewares/middleware')
route.use(express.json())

// Rotas da home
route.get('/', homeController.index);

// Rotas de Login
route.get('/login/index',loginController.index);
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.get('/login/logout',loginController.logout);


// Rotas de Contatos 

route.get('/contato/index',loginRequired, contatoController.index);
route.post('/contato/register' , contatoController.register);
route.get('/contato/index/:id' , contatoController.editIndex);




module.exports = route;