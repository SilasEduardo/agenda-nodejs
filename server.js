require('dotenv').config(); // variaves de ambiente; senha, email

// Express
const express = require('express');
const app = express();

// MONGOOSE SALVAR DADOS MODELAR 
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('BD CONNECTING')
    app.emit('pronto');
  })
  .catch(e => console.log(e));


const session = require('express-session'); // SESSOES PARA SALVAR COOKS
const MongoStore = require('connect-mongo'); // SALVANDO NAS BASE DE DADOS
const flash = require('connect-flash'); //MESSAGEM ALTO DESTRUTIVAS


const routes = require('./routes'); // ROTAS
const path = require('path'); //CAMINHOS
const helmet = require('helmet'); //SEGURANÇA
const csrf = require('csurf'); // TOKEN DE FORMULARIOS: SEGURANÇA
const { middlewareGlobal, checkCsrfError, csrfMiddleware  } = require('./src/middlewares/middleware'); // FUNÇÃO QUE SÃO EXECUDADAS NAS ROTAS

app.use(helmet());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public'))); //  ARQUIVOS ESTATICOS



// CONFIGURAÇÃO DE SESSÃO
const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    mazAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  
  }
});
app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views')); // RANDEIZADOS NAS TELAS
app.set('view engine', 'ejs');
app.use(csrf());

// Nossos próprios middlewares
app.use(checkCsrfError);
app.use(middlewareGlobal);
app.use(csrfMiddleware)
app.use(routes);



app.on('pronto', () => {
  app.listen(3333, () => {
    console.log('SERVE ON')
  });
});