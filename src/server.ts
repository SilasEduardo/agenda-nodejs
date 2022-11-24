import * as dotenv from "dotenv";
dotenv.config(); // variaves de ambiente; senha, email
import express from "express"
// Express
const app = express();

// MONGOOSE SALVAR DADOS MODELAR 
import mongoose from 'mongoose';
mongoose.connect(process.env.CONNECTIONSTRING? { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('BD CONNECTING')
    app.emit('pronto');
  })
  .catch((e: any) => console.log(e));



import session from 'express-session'; // SESSOES PARA SALVAR COOKS
import MongoStore from 'connect-mongo'; // SALVANDO NAS BASE DE DADOS
import flash from 'connect-flash'; //MESSAGEM ALTO DESTRUTIVAS


import routes from './routes'; // ROTAS
import path from 'path'; //CAMINHOS
import helmet from 'helmet'; //SEGURANÇA
import csrf from 'csurf'; // TOKEN DE FORMULARIOS: SEGURANÇA
import { middlewareGlobal, checkCsrfError, csrfMiddleware } from './src/middlewares/middleware'; // FUNÇÃO QUE SÃO EXECUDADAS NAS ROTAS

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