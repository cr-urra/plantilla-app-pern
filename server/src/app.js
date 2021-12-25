import '@babel/polyfill';

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./database/associations');

//inicialización

const app = express();

//settings

app.set('port', process.env.PORT || 4000);

//middlewares server

app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales

app.use((req,res,next) => {
    next();
});

//Importar rutas

import roles from './routes/roles.routes.js';
import users from './routes/users.routes.js';
import auth from './routes/auth.routes.js';


//routes

app.use('/users', users);
app.use('/auth', auth);
app.use('/roles', roles);

//public

//app.use(express.static('../public'));

export default app;


