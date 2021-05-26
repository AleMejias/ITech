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
                            <input type="number" name="cantidad" id="cantidad" value="1">
                        </form>
                    </td>
                    <td>
                        <button title="Eliminar">x</button>
                    </td>
                </tr>
            `);
          });
          montoTotal.text(`$${sumarPrecios}`);
          ordenDeCompra__contenedor.text(`#${ordenDeCompra}`);
          contenedorMontoTotal.removeClass("activada");
    };
    /* VERIFICO PRIMERO QUE EL CARRITO NO SE ENCUENTRE VACIO, de no estarlo imprimo los productos */
    productosCargadosArr.length == 0 ? carritoVacio() : imprimirProductos(productosCargadosArr);
  });
})();

