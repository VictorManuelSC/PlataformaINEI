window.addEventListener('load', (eLoad) => {
    let eCerrarSesion = document.querySelector(':scope header div.contenedor li:nth-of-type(6)');
    eCerrarSesion.addEventListener('click', (eclick) => {
        fetch('http://localhost:3000/cerrar-sesion',{
            method: 'GET'
        }).then((response) => {
            if(response.ok){
                return response.json();
            }else{
                throw response;
            }
        }).then( (response) => {
            if(response.respuesta = "sesion-cerrada"){
                window.location.href = 'http://localhost:3000/';
            }
        }).catch((error) => {
            console.log(error);
        });
    });
});