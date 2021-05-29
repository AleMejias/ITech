(() => {
  $(document).ready(() => {
    let productosCargadosArr = JSON.parse(localStorage.getItem("ListaDeCompra"));
    let contenedorCarrito = $("#contenedor-carrito");
    let carritoDeCompras = $("#carrito-de-compras");
    let contenedorMontoTotal = $("#contenedor-montoTotal");
    let montoTotal = $("#monto-total");
    const carritoVacio = () => {
        $(contenedorCarrito).removeClass("activada");
        $(contenedorCarrito).empty();
      $(contenedorCarrito).append(`

        <section class = "carrito__carritoVacio">
            <div>
                <h3>ATENCIÓN<i class="fas fa-exclamation-circle"></i></h3>
            </div>
            <span>EL CARRRITO SE ENCUENTRA VACIO</span>
            <a href = "../pages/tienda.html">Volver a la tienda</a>
        </section>
    `);
    };
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
          ordenDeCompra = Math.floor(Math.random() * (30000000 - 5000000)) + 5000000; 
          ordenDeCompra__contenedor.text(`Orden de compra #${ordenDeCompra}`);
          contenedorMontoTotal.removeClass("activada");

          let form = $(".formulario");
          $(form).change(() => {
              montoTotal.text(`$${calcularMontoTotal()}`);
          })  ;
          
          let btnEliminarProducto = $(".btn-eliminar");
          let elementosEnCarrito = $(btnEliminarProducto).length;
          $.each(btnEliminarProducto,(indice,valor) => {
              $(valor).click((e) => {
                  console.log(`Tamaño inicial ${elementosEnCarrito}`)
                  let eliminarFila = $(".filas")[indice];
                  let inputCantidad = $(".inputCantidad")[indice];
                  $(eliminarFila).addClass("activada");
                  $(inputCantidad).addClass("activada");
                  montoTotal.text(`$${calcularMontoTotal()}`);
                  elementosEnCarrito--;
                  console.log(`Tamaño final ${elementosEnCarrito}`)
                  elementosEnCarrito == 0 ? carritoVacio() : "";
                });
          });

    };
    /* VERIFICO PRIMERO QUE EL CARRITO NO SE ENCUENTRE VACIO, de no estarlo imprimo los productos */
    productosCargadosArr.length == 0 ? carritoVacio() : imprimirProductos(productosCargadosArr);
  });
})();

