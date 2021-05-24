let productosCargadosArr = JSON.parse(localStorage.getItem("ListaDeCompra"));
let contenedorCarrito = document.querySelector("#contenedor-carrito");
const imprimirProductos = (productosCargados) => {
    for(const productos of productosCargados){
        contenedorCarrito.innerHTML += `
        <ul>
            <li>${productos.nombre}</li>
        </ul>
        `;
    }
};
const carritoVacio = () =>{
    contenedorCarrito.innerHTML += `
        <h1>Carrito vacio</h1>
    `
};
/* VERIFICO PRIMERO QUE EL CARRITO NO SE ENCUENTRE VACIO */
productosCargadosArr.length == 0 ? carritoVacio() : imprimirProductos(productosCargadosArr,2);
/* 
} */

