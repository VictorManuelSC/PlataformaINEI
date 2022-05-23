import hex_md5 from './md52.js';
//'use strict';
//var md5 = import('./md5.js'); //md5 from "./md5";

window.addEventListener('load', (eLoad) => {
    const IniciarSpinner = () =>{//Iniciar spinner y pantalla de carga
        let objPantallaCarga = document.querySelector(':scope div.pantalla-spinner');
        let objBody = document.querySelector(':scope body');
                //Fuerza a permanecer 
        objBody.setAttribute('style', 'overflow-y:hidden;');
        objPantallaCarga.removeAttribute('style');
    }
    const DetenerSpinner = () =>{//Detener pantalla de carga
        let objPantallaCarga = document.querySelector(':scope div.pantalla-spinner');
        let objBody = document.querySelector(':scope body');

        objBody.removeAttribute('style');
        objPantallaCarga.setAttribute('style', 'display: none;');
    }

    const agregarEventos = () => {
        let objIEye = document.querySelector(':scope i#eye-show-password');
        objIEye.addEventListener('click', (eClick)=>{
                if(eClick.currentTarget.classList.contains('fa-eye')){
                    eClick.currentTarget.classList.remove('fa-eye');
                    eClick.currentTarget.classList.add('fa-eye-slash');
                    let objInputPass = document.querySelector(':scope input#password');
                    objInputPass.type = 'text';
                }else if(eClick.currentTarget.classList.contains('fa-eye-slash')){
                    eClick.currentTarget.classList.remove('fa-eye-slash');
                    eClick.currentTarget.classList.add('fa-eye');
                    let objInputPass = document.querySelector(':scope input#password');
                    objInputPass.type = 'password';
                }
        });
        let objButton = document.querySelector(':scope button#button-enviar');
        objButton.addEventListener('click', (eClick)=>{
            let objInputUser = document.querySelector(':scope input#user');
            let objInputPass = document.querySelector(':scope input#password');
            
            let strUser = objInputUser.value;
            let strPass = objInputPass.value;

            if(strUser.replace(' ', '').length == 0 || strPass.replace(' ', '').length == 0){
                alert('Llene los datos correctamente');
                return;
            }

            let objInputRecordar = document.querySelector(':scope input#checkbox-recordar');
            //console.log(objInputRecordar.checked);
            console.log(hex_md5(strPass));
            fetch('http://localhost:3000/login-plataforma',{
                method: 'POST',
                body: JSON.stringify({
                    user: strUser ,
                    pswd: hex_md5(strPass),
                    reco: objInputRecordar.checked,
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            }).then((response)=>{
                if(response.ok){
                    return response.json();
                }else{
                    throw response;
                }
            }).then((response)=>{
                if(response.respuesta == "Credenciales correctas"){
                    window.location.href = "http://localhost:3000/";
                }else{
                    alert("Usuario y/o contraseña incorrectas");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }
    agregarEventos();
});