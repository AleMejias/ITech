let inputCorreo = document.querySelector('#inputCorreo');
const validarCorreoSuscripcion = (valor) => {
    let correoValido = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
    return correoValido.test(valor);
};

inputCorreo.addEventListener("input",(e) => {
/*     console.log(e.target.value);
    console.log(validarCorreoSuscripcion(e.target.value)) */
    if(validarCorreoSuscripcion(e.target.value)){
        inputCorreo.classList.remove("noValido");
        inputCorreo.classList.add("valido");
    }else{
        inputCorreo.classList.remove("valido");
        inputCorreo.classList.add("noValido");
    }
});