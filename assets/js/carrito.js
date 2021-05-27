(() => {
  $(document).ready(() => {
    let productosCargadosArr = JSON.parse(localStorage.getItem("ListaDeCompra"));
    let contenedorCarrito = $("#contenedor-carrito");
    let carritoDeCompras = $("#carrito-de-compras");
    let contenedorMontoTotal = $("#contenedor-montoTotal");
    let montoTotal = $("#monto-total");
    let ordenDeCompra__contenedor = $("#orden-de-compra");
    let ordenDeCompra = Math.floor(Math.random() * (30000000 - 5000000)) + 5000000;
    const carritoVacio = () => {
        $(contenedorCarrito).removeClass("activada");
        $(contenedorCarrito).empty();
      $(contenedorCarrito).append(`
        <h1>Carrito vacio</h1>
    `);
    };
    const imprimirProductos = (listadoDeProductos) => {
        let sumarPrecios = 0;
        $(contenedorCarrito).removeClass("activada");
        $.each(listadoDeProductos, (indice, valor) => {
            sumarPrecios += parseInt(valor.precio);
            $(carritoDeCompras).prepend(`
                <tr>
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
                        <form action="#">
                            <input type="number" name="cantidad" class = "cantidad" value="1" min = 1 max = 5 data-precio = "${valor.precio}">
                        </form>
                    </td>
                    <td>
                        <button title="Eliminar">x</button>
                    </td>
                </tr>
            `);
          });
          montoTotal.text(`$${sumarPrecios}`);
          ordenDeCompra__contenedor.text(`Orden de compra #${ordenDeCompra}`);
          contenedorMontoTotal.removeClass("activada");

          let inputCantidad = $(".cantidad");


          $.each(inputCantidad,(indice,valor)=> {
              $(valor).change((nuevaCantidad) => {
                let precioOriginal = $(valor).attr("data-precio");
                console.log(sumarPrecios)
              });
          })
          /* FUNCION PARA ACTUALIZAR LA CANTIDAD DE CADA PRODUCTO Y EL PRECIO */
          let actualizarCantidad = (listadoDeProductos,nuevaCantidad) => {

          }
          
    };
    /* VERIFICO PRIMERO QUE EL CARRITO NO SE ENCUENTRE VACIO, de no estarlo imprimo los productos */
    productosCargadosArr.length == 0 ? carritoVacio() : imprimirProductos(productosCargadosArr);
  });
})();

