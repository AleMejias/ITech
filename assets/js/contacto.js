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
    const formulario = $("#formulario");
    $(formulario).change((respuesta) => {
        let identificador = $(respuesta.target).attr("id");
        let esValido = $(`#${identificador}-check`);
        let noEsValido = $(`#${identificador}-noCheck`);
        let longitudDelMensaje = $(respuesta.target).val().length;
        let input = $(respuesta.target);
        switch(identificador){
            case "mensaje":
                if(longitudDelMensaje > 3 && longitudDelMensaje < 51 && !(input.hasClass("valido"))){
                    noEsValido.addClass("activada");
                    input.addClass("valido");
                    input.css("border","1px solid #2ad714e0");
                    esValido.removeClass("activada");
                    input.removeClass("noValido");
                    contadorCamposValidados++;
                }else{
                    if(contadorCamposValidados == 0){
                        esValido.addClass("activada");
                        input.removeClass("valido");
                        input.css("border","1px solid #eb0b0b");
                        noEsValido.removeClass("activada");
                        input.addClass("noValido");
                    }else if(!(input.hasClass("noValido"))){
                        esValido.addClass("activada");
                        input.removeClass("valido");
                        input.css("border","1px solid #eb0b0b");
                        noEsValido.removeClass("activada");
                        input.addClass("noValido");
                        contadorCamposValidados--;
                    }
                }
                break;
                default:
                    if(validarFormulario( identificador,input.val() )){
                        if(!(input.hasClass("valido"))){
                            noEsValido.addClass("activada");
                            input.addClass("valido");
                            input.css("border","1px solid #2ad714e0");
                            esValido.removeClass("activada");
                            input.removeClass("noValido");
                            contadorCamposValidados++;
                        }
                }else{
                    if(contadorCamposValidados == 0){
                        esValido.addClass("activada");
                        input.removeClass("valido");
                        input.css("border","1px solid #eb0b0b");
                        noEsValido.removeClass("activada");
                        input.addClass("noValido");
                    }else if(input.hasClass("valido")){
                        esValido.addClass("activada");
                        input.removeClass("valido");
                        input.css("border","1px solid #eb0b0b");
                        noEsValido.removeClass("activada");
                        input.addClass("noValido");
                        contadorCamposValidados--;
                    }
                }
        }
        const btnEnviar = $("#enviarFormulario");
        console.log(`Se validaron ${contadorCamposValidados} campos`)
        if(contadorCamposValidados == 4){
            btnEnviar.removeAttr("disabled");
            btnEnviar.css("cursor","pointer");
        }else{
            btnEnviar.attr("disabled","disabled");
            btnEnviar.css("cursor","not-allowed");

        }
        btnEnviar.click( (e) => {
            e.preventDefault();
            console.log(contadorCamposValidados)
            console.log("estoy listo")
        });
    });
})();

/* 


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

*/