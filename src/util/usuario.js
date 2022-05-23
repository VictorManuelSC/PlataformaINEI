const { resolveInclude } = require('ejs');
const mysql = require('mysql');

module.exports = class Usuario{
    static async IniciarSesion(req, res, cre, callback) {
        /////////////////Funcion para verificar que el usuario existe y crear una sesion en caso de que exista
        let conexion = mysql.createConnection(require('./db'));
        var user = [];

        try{//Conectarse a la base de datos y revisar si las credenciales del usuario son correctas
            conexion.connect((error)=>{
                if(error){
                    throw error;
                }
                else{
                    
                }
            });
    
            conexion.query(`call \`inei_IneiControl\`.\`SP_Login\`('${cre.user}', '${cre.pswd}');`, (error, result, fields)=>{
                if(error){
                    throw error;
                }
                else{
                    if(result[0][0].respuesta != "Usuario y/o contraseña incorrecta"){
                        let sRespuesta = result[0][0].respuesta.split('-');
                        req.session.regenerate(function (err) {
                            if (err) next(err)
                            // store user information in session, typically a user id
                            req.session.user = {
                                id: req.body.user,
                                name: sRespuesta[1],
                                lvl: sRespuesta[0]
                            }
                            // save the session before redirection to ensure page
                            // load does not happen before session is saved
                            req.session.save(function (err) {
                              if (err) return next(err)
                              res.status(200).send( JSON.stringify({respuesta:"Credenciales correctas"}));
                            });
                          });
                    }
                    else{
                        res.status(200).send( JSON.stringify({respuesta:"Usuario y/o contraseña incorrecta"}));
                    }
                }
            });
    
            conexion.end();
        }
        catch(error){
            console.log(error)
        }
    }

    static async CerrarSesion(req, res){
        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)
            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err)
                res.status(200).send(JSON.stringify({respuesta:"sesion-cerrada"}));
                //res.redirect('/')
            });
        });
    }

    static async isAuthenticated(req, res, next){
        ///////////////Funcion para consultar si el usuario previamente se ha autentificado y tiene una sesion abierta
        if(req.session.user) next()
        else next('route')
    }
}