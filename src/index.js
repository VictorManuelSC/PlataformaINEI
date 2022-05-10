const express = require('express');
const path = require('path');
//const mysql = require('mysql');
//const { DATETIME } = require('mysql/lib/protocol/constants/types');
//const cron = require('node-cron');

const app = express();//Inicializamos el objeto express

app.set('port', 3000);//Establece la api escuchando en el puerto 3000
app.set('views', path.join(__dirname, 'views'));//Configuramos la carpeta por defecto de las vistas(templates)
app.engine('html', require('ejs').renderFile);//Indicamos a express que archivos renderizar a traves de ejs
app.set('view engine', 'ejs');//Establecemos a express motor de plantillas a utilizar(ejs)

//Middleware

//Routes
app.use(require('./routes/index'));//Implementacion de routes para separar todos los end points

//Static files
app.use(express.static(path.join(__dirname, 'public')));//Definimos la carpeta static que tendra todo lo publico y accesible

app.listen(app.get('port'), () => {
    console.log(`API Listening on ${app.get('port')}`);
});