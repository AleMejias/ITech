(() => {
    $(document).ready( () => {
        const validarFormulario = (identificador, contenido) => {
            let inputPorValidar;
        
            switch (identificador) {
              case "nombre":
                inputPorValidar = new RegExp(/^([A-Za-z ñáéíóú]{3,60})$/i);
                break;
              case "apellido":
                inputPorValidar = new RegExp(/^([A-Za-z ñáéíóú]{3,60})$/i);
                break;
              case "mensaje":
                contenido.length > 3 && contenido.length < 51 ? (inputPorValidar = true) : (inputPorValidar = false);
                return inputPorValidar;
              default:
                inputPorValidar = new RegExp(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);
            }
            return inputPorValidar.test(contenido);
          };
        
          let contadorCamposValidados = 0;
          const formulario = $("#formulario");
          $(formulario).change((respuesta) => {
            let identificador = $(respuesta.target).attr("id");
            let esValido = $(`#${identificador}-check`);
            let noEsValido = $(`#${identificador}-noCheck`);
            let input = $(respuesta.target);
        
            if (validarFormulario(identificador, input.val()) && !input.hasClass("valido")) {
              noEsValido.addClass("activada");
              input.addClass("valido");
              input.css("border", "1px solid #2ad714e0");
              esValido.removeClass("activada");
              input.removeClass("noValido");
              contadorCamposValidados++;
            } else {
              if (contadorCamposValidados == 0) {
                esValido.addClass("activada");
                input.removeClass("valido");
                input.css("border", "1px solid #eb0b0b");
                noEsValido.removeClass("activada");
                input.addClass("noValido");
              } else if (!input.hasClass("noValido")) {
                esValido.addClass("activada");
                input.removeClass("valido");
                input.css("border", "1px solid #eb0b0b");
                noEsValido.removeClass("activada");
                input.addClass("noValido");
                contadorCamposValidados--;
              }
            }
            const btnEnviar = $("#enviarFormulario");
            if (contadorCamposValidados == 4) {
              btnEnviar.removeAttr("disabled");
              btnEnviar.css("cursor", "pointer");
            } else {
              btnEnviar.attr("disabled", "disabled");
              btnEnviar.css("cursor", "not-allowed");
            }
            formulario.submit((e) => {
              e.preventDefault();
              const datos = {
                  nombre:`${$("#nombre").val()}`,
                  mail: `${$("#mail").val()}`
            };
              const loadingImg = $("#loadingImg-formularioContacto");
/*               $.ajax({
                  method: "POST",
                  url : "https://jsonplaceholder.typicode.com/posts",
                  data : datos,
                  beforeSend : () => {
                      if(bandera == 0)
                      {
                          console.log("me ejecute")
                        $(loadingImg).removeClass("activada");
                      }
                  },
                  success: ( respuesta ) => {
                      const formularioRespuesta = $("#formulario-respuesta");
                      $(loadingImg).addClass("activada");
                      $(formularioRespuesta).append(`
                        <div class="col-md-12 formulario-respuesta--div">
                            <h4 class="formulario__respuesta--titulo">Tu consulta fue procesada correctamente ${respuesta.nombre}</h4>
                            <span class="formulario__respuesta--span">Te contactaremos mediante ${respuesta.mail} lo antes posible</span>
                        </div>
                      `);
                  },
                  error: ( error ) => {
                      console.warn("No se envio por el error "+ error);
                  },
              }); */
            });
          });
    });
})();

