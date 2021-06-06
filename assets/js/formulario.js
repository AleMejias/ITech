(() => {
    const validarFormulario = ( identificador , contenido) => {
        let inputPorValidar;

        switch(identificador){
            case "nombre":
                inputPorValidar = new RegExp(/^([A-Za-z ñáéíóú]{3,60})$/i);
                break;
            case "apellido":
                inputPorValidar = new RegExp(/^([A-Za-z ñáéíóú]{3,60})$/i);
                break;
            default:
                inputPorValidar = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
        }
        return inputPorValidar.test(contenido)
    };

    let contadorCamposValidados = 0;
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("change", (respuesta) => {
        let identificador = respuesta.target.getAttribute("id");
        let esValido = document.querySelector(`#${identificador}-check`);
        let noEsValido = document.querySelector(`#${identificador}-noCheck`);
        let longitudDelMensaje = respuesta.target.value.length;
        let input = respuesta.target;
        switch(identificador){
            case "mensaje":
                if(longitudDelMensaje > 3 && longitudDelMensaje < 51){
                    noEsValido.classList.add("activada");
                    input.classList.add("valido");
                    esValido.classList.remove("activada");
                    input.classList.remove("noValido");
                    contadorCamposValidados++;
                }else if(respuesta.target.classList.contains("valido")){
                    esValido.classList.add("activada");
                    input.classList.remove("valido");
                    noEsValido.classList.remove("activada");
                    input.classList.add("noValido");
                    contadorCamposValidados--;
                }
                break;
            default:
                if(validarFormulario( identificador,respuesta.target.value )){
                    noEsValido.classList.add("activada");
                    input.classList.add("valido");
                    esValido.classList.remove("activada");
                    input.classList.remove("noValido");
                    contadorCamposValidados++;
                }else if(input.classList.contains("valido")){
                    esValido.classList.add("activada");
                    input.classList.remove("valido");
                    noEsValido.classList.remove("activada");
                    input.classList.add("noValido");
                    contadorCamposValidados--;
                }
        }
        const btnEnviar = document.querySelector("#enviarFormulario");
        contadorCamposValidados == 4 ? btnEnviar.removeAttribute("disabled") : "";

        btnEnviar.addEventListener("click", (e) => {
            e.preventDefault();
        });
    });
})();