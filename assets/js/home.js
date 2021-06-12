(() => {
    let inputCorreo = document.querySelector('#inputCorreo');
    let btnSubmit = document.querySelector('#btnSubmit');
    let form = document.querySelector("#formulario");
    const contenedores = document.querySelectorAll(".opacity");

    const validarCorreoSuscripcion = (valor) => {
        let correoValido = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
        return correoValido.test(valor);
    };

    const dispararAnimacion = () => {
        window.addEventListener("scroll", () => {
            
            contenedores.forEach((contenedor) => {
                const scrollTop = document.documentElement.scrollTop;
                const alturaDelContenedor = contenedor.offsetTop;

                if((alturaDelContenedor - 500) < scrollTop){
                    let direccionDeAnimacion = contenedor.getAttribute("data-direccion");
                    direccionDeAnimacion == "derecha-izquierda" ? contenedor.classList.add("animacion__derecha--izquierda")
                                                                : contenedor.classList.add("animacion__izquierda--derecha");
                }
            });

        });
    }; 
    const anchoDePantalla = window.screen.width;
    if(anchoDePantalla > 279){
        dispararAnimacion();
    }
    /* Trabajo sobre el evento input para tomar los valores ingresados */
    inputCorreo.addEventListener("input",(e) => {

        /* MANDO ese valor ingresado a la funcion validadora */
        if(validarCorreoSuscripcion(e.target.value)){
            inputCorreo.classList.remove("noValido");
            inputCorreo.classList.add("valido");
            btnSubmit.removeAttribute("disabled");
            btnSubmit.classList.remove("submitDesactivado");
            /* Si todo esta ok, activo el evento sumbit de mi formulario */
            form.addEventListener("submit", (evento) => {
                evento.preventDefault();
                let loadingImg = document.querySelector("#loadingImg");
                let suscripcionExitosa = document.querySelector("#suscripcionExitosa");
                loadingImg.classList.remove("activada");
                inputCorreo.classList.remove("valido");
                btnSubmit.setAttribute("disabled","");
                btnSubmit.classList.add("submitDesactivado");
                /* SIMULO EL ENVIO DE LOS DATOS */
                setTimeout(() => {
                    loadingImg.classList.add("activada");
                    suscripcionExitosa.classList.remove("activada");
                    form.reset();
                    setTimeout(() =>{
                        suscripcionExitosa.classList.add("activada");
                    },2000);
                },1600);
            });
        }else{
            btnSubmit.setAttribute("disabled","");
            btnSubmit.classList.add("submitDesactivado");
            inputCorreo.classList.remove("valido");
            inputCorreo.classList.add("noValido");
        }
    });
})();