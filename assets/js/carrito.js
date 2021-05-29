(() => {
  $(document).ready(() => {
    let productosCargadosArr = JSON.parse(localStorage.getItem("ListaDeCompra"));
    let contenedorCarrito = $("#contenedor-carrito");
    let carritoDeCompras = $("#carrito-de-compras"); // CUERPO O TBODY DE MI TABLA DONDE SE ALMACENAN LOS PRODUCTOS DEL CARRITO
    let contenedorMontoTotal = $("#contenedor-montoTotal"); // Muestro la tabla que almacena los datos de la compra
    let montoTotal = $("#monto-total"); // ETIQUETA SPAN QUE ALMACENA EL MONTO TOTAL

    /* ESTA FUNCION SE ENCARGA DE IMPRIMIR LOS DISTINTOS MENSAJES CUANDO EL CARRITO SE ENCUENTRE VACIO, RECIBE 3 PARAMETROS:
        1) Mensaje de alerta
        2) Clase para que se cargue el icono de font awesome
        3) Mensaje para el usuario
        */
    const carritoVacio = ( alerta, claseDelIcono ,mensaje ) => {
        $(contenedorCarrito).removeClass("activada");
        $(contenedorCarrito).empty();
      $(contenedorCarrito).append(`

        <section class = "carrito__carritoVacio">
            <div>
                <h3>${alerta}<i class="${claseDelIcono}"></i></h3>
            </div>
            <span>${mensaje}</span>
            <a href = "../pages/tienda.html">Volver a la tienda</a>
        </section>
    `);
    };
    /* ESTA FUNCION SE ENCARGA DE CALCULAR EL MONTO TOTAL A RAIZ DE UN EVENTO CHANGE
       Cosiste en recorrer cada input para tomar su valor y el contenido de la etiqueta data la cual almacena el precio para su posterior sumatoria   
    
    */
    const calcularMontoTotal = () => {
        let inputCantidad = $(".inputCantidad");
        let sumatoriaTotal = 0;
        $.each(inputCantidad,(indice,valor)=> {
            let precioDelProducto = parseInt($(valor).val());
            let cantidadDelProducto = parseInt($(valor).attr("data-precio"));
            if(!$(valor).hasClass("activada")){
                sumatoriaTotal += precioDelProducto * cantidadDelProducto;
            }
        });
        return sumatoriaTotal;
    }
    const imprimirProductos = (listadoDeProductos) => {
        let sumarPrecios = 0;
        let ordenDeCompra__contenedor = $("#orden-de-compra");
        let ordenDeCompra;
        $(contenedorCarrito).removeClass("activada");
        $.each(listadoDeProductos, (indice, valor) => {
            sumarPrecios += parseInt(valor.precio);
            $(carritoDeCompras).prepend(`
                <tr class = "filas">
                    <td>
                        <img src="${valor.ruta}" alt="${valor.nombre}">
                    </td>
                    <td>
                        <span>${valor.nombre}</span>
                    </td>
                    <td>
                        <span>$${valor.precio}</span>
                    </td>
                    <td>
                        <form action="#" class = "formulario">
                            <input type="number" name="cantidad" class = "inputCantidad" value="1" min = 1 max = 5 data-precio = "${valor.precio}">
                        </form>
                    </td>
                    <td>
                        <button class = "btn-eliminar" title="Eliminar">x</button>
                    </td>
                </tr>
            `);
          });
          montoTotal.text(`$${sumarPrecios}`);
          ordenDeCompra = Math.floor(Math.random() * (30000000 - 5000000)) + 5000000; // con esto simulo un numero de ticket u orden de compra
          ordenDeCompra__contenedor.text(`Orden de compra #${ordenDeCompra}`);
          contenedorMontoTotal.removeClass("activada");

          let form = $(".formulario");
          $(form).change(() => {
              montoTotal.text(`$${calcularMontoTotal()}`);
          })  ;
          
          let btnEliminarProducto = $(".btn-eliminar");
          let elementosEnCarrito = $(btnEliminarProducto).length;
          $.each(btnEliminarProducto,(indice,valor) => {
              $(valor).click(() => {
                  let eliminarFila = $(".filas")[indice];
                  let inputCantidad = $(".inputCantidad")[indice];
                  $(eliminarFila).addClass("activada");
                  $(inputCantidad).addClass("activada");
                  montoTotal.text(`$${calcularMontoTotal()}`);
                  elementosEnCarrito--;
                  /* VERIFICO SI NO HAY MAS ELEMENTOS EN EL CARRITO PARA:
                    1) IMPRIMIR MENSAJE DE QUE SE ENCUENTRA VACIO MI CARRITO
                    2) PARA LIMPIAR EL STORAGE
                  */
                  if( elementosEnCarrito == 0 ){
                    carritoVacio( "ATENCIÓN","fas fa-exclamation-circle","EL CARRRITO SE ENCUENTRA VACIO" );
                    localStorage.clear();
                  }
                });
          });

    };
    /* VERIFICO PRIMERO QUE EL CARRITO NO SE ENCUENTRE VACIO, de no estarlo imprimo los productos */
    productosCargadosArr.length == 0 ? carritoVacio( "ATENCIÓN", "fas fa-exclamation-circle","EL CARRRITO SE ENCUENTRA VACIO") : imprimirProductos(productosCargadosArr);

    /* EVENTO PARA LA FINALIZACION DE LA COMPRA */
    let btn__finalizarCompra = $("#finalizar-compra");
    $(btn__finalizarCompra).click(() => {
        let imgLoading = $("#loadingImg");
        $(imgLoading).removeClass("activada");
        setTimeout(() => {
            $(imgLoading).addClass("activada");
            carritoVacio("FELICITACIONES","far fa-check-circle","TU COMPRA HA SIDO REGISTRADA CON ÉXITO");
            localStorage.clear();
        },2200);
    });
  });
})();

