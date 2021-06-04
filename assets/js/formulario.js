(() => {
    const formulario = document.querySelector("#formulario");
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
    const enviarFormulario = () => {};
    let contadorCamposValidos = 0;
    formulario.addEventListener("change", (respuesta) => {
        let identificador = respuesta.target.getAttribute("id");
        let esValido = document.querySelector(`#${identificador}-check`);
        let noEsValido = document.querySelector(`#${identificador}-noCheck`);
        if(identificador != "mensaje"){
            if(validarFormulario( identificador,respuesta.target.value )){
                noEsValido.classList.add("activada");
                esValido.classList.remove("activada");
                contadorCamposValidos++;
            }else{
                esValido.classList.add("activada");
                noEsValido.classList.remove("activada");
                contadorCamposValidos--;
            }
        }else{
            if(respuesta.target.value.length > 5 && respuesta.target.value.length < 51){
                noEsValido.classList.add("activada");
                esValido.classList.remove("activada");
                contadorCamposValidos++;
            }else{
                esValido.classList.add("activada");
                noEsValido.classList.remove("activada");
                contadorCamposValidos--;
            }
        }

        contadorCamposValidos == 4 ? enviarFormulario() : "";
    });
})();