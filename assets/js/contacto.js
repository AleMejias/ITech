(() => {
  $(document).ready(() => {
    const formulario = $("#formulario");
    let contadorCamposValidados = 0;
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

    const imprimirFormulario = () => {
      $(formulario).append(`
              <label class="formulario__contenedor--label" for="nombre">Nombre
                <i class="fas fa-check activada check" id="nombre-check"></i>
                <i class="fas fa-times activada noCheck" id="nombre-noCheck"></i>
              </label>
                <input class="formulario__contenedor--input" type="text" name="nombre" id="nombre" minlength= "3" maxlength= "60" placeholder="Alejandro" required>
              <label class="formulario__contenedor--label" for="apellido">Apellido
                  <i class="fas fa-check activada check" id="apellido-check"></i>
                  <i class="fas fa-times activada noCheck" id="apellido-noCheck"></i>
              </label>
                <input class="formulario__contenedor--input" type="text" name="apellido" id="apellido" minlength="3" maxlength="60" placeholder="Mejias" required>
              <label class="formulario__contenedor--label" for="mail">Correo
                  <i class="fas fa-check activada check" id="mail-check"></i>
                  <i class="fas fa-times activada noCheck" id="mail-noCheck"></i>
              </label>
                <input class="formulario__contenedor--input" type="email" name="mail" id="mail"  placeholder="ejemplo@ejemplo.com" required>
              <label class="formulario__contenedor--label" for="mensaje">Consulta
                  <i class="fas fa-check activada check" id="mensaje-check"></i>
                  <i class="fas fa-times activada noCheck" id="mensaje-noCheck"></i>
              </label>
                <textarea class="formulario__contenedor--input" name="mensaje" id="mensaje" cols="30" rows="6" minLength = "4" maxlength="50" placeholder="Escribenos tu consulta" required></textarea>
              <div>
                  <input class="formulario__contenedor--inputSubmit" type="submit" id ="enviarFormulario" value="Enviar">
                  <img src="../img/oval.svg" id="loadingImg-formularioContacto" class="activada formulario__contenedor--contactoLoadingImg"/>
              </div>
                  
      `);
    };
    imprimirFormulario();
    const btnEnviar = $("#enviarFormulario");
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
        if (input.hasClass("valido")) {
          esValido.addClass("activada");
          input.removeClass("valido");
          input.css("border", "1px solid #eb0b0b");
          noEsValido.removeClass("activada");
          input.addClass("noValido");
          contadorCamposValidados--;
        } else if ( contadorCamposValidados > -1 && contadorCamposValidados < 4) {
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
      if (contadorCamposValidados == 4) {
        $(btnEnviar).removeAttr("disabled");
        $(btnEnviar).css("cursor", "pointer");
      } else {
        $(btnEnviar).attr("disabled", "disabled");
        $(btnEnviar).css("cursor", "not-allowed");
      }
    });
    $(btnEnviar).click((e) => {
      e.preventDefault();
      const datos = {
        nombre: `${$("#nombre").val()}`,
        mail: `${$("#mail").val()}`,
      };
      const loadingImg = $("#loadingImg-formularioContacto");
      $.ajax({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: datos,
        beforeSend: () => {
          $(loadingImg).removeClass("activada");
        },
        success: (respuesta) => {
          const formularioRespuesta = $("#formulario-respuesta");
          $(loadingImg).addClass("activada");
          $(formularioRespuesta).removeClass("activada");
          $(formularioRespuesta).append(`
                      <div class="col-md-12 formulario-respuesta--div">
                          <h4 class="formulario__respuesta--titulo">Tu consulta fue procesada correctamente ${respuesta.nombre}</h4>
                          <span class="formulario__respuesta--span">Te contactaremos mediante ${respuesta.mail} lo antes posible</span>
                          <button class="formulario__respuesta--btnCerrar" id = "cerrar-respuesta-formulario">Cerrar</button>
                      </div>
                    `);

          const cerrarRespuestaFormulario = $("#cerrar-respuesta-formulario");
          $(cerrarRespuestaFormulario).click(() => {
            /* $(formulario)[0].reset(); */
            $(formulario).empty();
            contadorCamposValidados = 0;
            $(formularioRespuesta).empty();
            $(formularioRespuesta).addClass("activada");
            window.location.reload();
            imprimirFormulario();
          });
        },
        error: (error) => {
          console.warn("No se envio por el error " + error);
        },
      });
    });
  });
})();
