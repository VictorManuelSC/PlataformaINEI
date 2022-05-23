const express = require('express');
const router = express.Router();
const Usuario = require('../util/usuario');

router.get('/', Usuario.isAuthenticated, function(req, res) {
    res.status(200).render('index.html', { 
        titulo: "Plataforma"
    });
});

router.get('/', (req,res) => {//Ruta base de la pagina
    res.status(200).render('login.html', {
        titulo: "Login"
    });
});

router.post('/login-plataforma', (req, res) => {//Iniciar sesion en la plataforma y buscar credenciales
    //Validar si es el usuario correcto segun las credenciales
    Usuario.IniciarSesion(req, res, {user: req.body.user, pswd:req.body.pswd, reco:req.body.reco});
});

router.get('/cerrar-sesion', (req, res) => {
    Usuario.CerrarSesion(req, res);
});

module.exports = router;