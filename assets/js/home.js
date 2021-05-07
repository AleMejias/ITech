let inputCorreo = document.querySelector('#inputCorreo');
let btnSubmit = document.querySelector('#btnSubmit');
let form = document.querySelector("#formulario");

const validarCorreoSuscripcion = (valor) => {
    let correoValido = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
    return correoValido.test(valor);
};

inputCorreo.addEventListener("input",(e) => {

    if(validarCorreoSuscripcion(e.target.value)){
        inputCorreo.classList.remove("noValido");
        inputCorreo.classList.add("valido");
        btnSubmit.removeAttribute("disabled");
        btnSubmit.classList.remove("submitDesactivado");
        form.addEventListener("submit", () => {
            let email = `mailto:${e.target.value}`;
            form.setAttribute("action",email);
        })
    }else{
        btnSubmit.setAttribute("disabled","");
        btnSubmit.classList.add("submitDesactivado");
        inputCorreo.classList.remove("valido");
        inputCorreo.classList.add("noValido");
    }
});