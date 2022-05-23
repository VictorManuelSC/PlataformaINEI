const express = require('express');
const { json } = require('express/lib/response');
const { JSON } = require('mysql/lib/protocol/constants/types');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const body_parser = require('body-parser');
//const mysql = require('mysql');
//const { DATETIME } = require('mysql/lib/protocol/constants/types');
//const cron = require('node-cron');

const app = express();//Inicializamos el objeto express

app.set('port', 3000);//Establece la api escuchando en el puerto 3000
app.set('views', path.join(__dirname, 'views'));//Configuramos la carpeta por defecto de las vistas(templates)
app.engine('html', require('ejs').renderFile);//Indicamos a express que archivos renderizar a traves de ejs
app.set('view engine', 'ejs');//Establecemos a express motor de plantillas a utilizar(ejs)

//Middleware
//*Middelware para sesiones mysql en node.js
var options = require('./util/db');
var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_plataforma_cookie',
    secret: 'plataforma_inei_session',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

//*Middleware para peticiones de origen cruzado en node.js (De dominios diferentes al de la api)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//*Middleware para leer parametros de las peticiones post
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

//Routes
app.use(require('./routes/index'));//Implementacion de routes para separar todos los end points

//Static files
app.use(express.static(path.join(__dirname, 'public')));//Definimos la carpeta static que tendra todo lo publico y accesible

app.listen(app.get('port'), () => {
    console.log(`API Listening on ${app.get('port')}`);
});