(() => {
  let contenedorProductos = document.querySelector("#productosContenedor");
  /* CLASE PARA EL CARRITO DE COMPRAS */
  class Carrito{
    constructor( id , nombre, precio , ruta ){
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.ruta = ruta;
    }
}
  /* Array y contador de productos para el carrito de compras */
  let arrProductos = [];
  let contadorProductos = 0;

  const crearPlantilla = (producto) => {
    contenedorProductos.innerHTML += `
        <article class="productos__contenedor--article cuadriculaMultiple mt-4" data-categorias = "${producto.categoria}">
            <div class="productos__contenedor--contenedorImg">
              <div>
                <i class="far fa-eye" title="Ver detalle"></i>
                <img class="productos__contenedor--img" src="${producto.ruta}" alt="${producto.nombre}">
              </div>
            </div>
            <div class="productos__contenedor--contenedorDescripcion">
                <h4>${producto.nombre}</h4>
                <span>$${producto.precio}</span>
            </div>
            <div class="productos__contenedor--contenedorBoton">
                <button data-producto = "${producto.nombre}" data-precio = "${producto.precio}" data-ruta = "${producto.ruta}" class = "btn-carrito">Agregar al carrito</button>
            </div>
        </article>
        `;
    /* EVENTO PARA CAMBIO DINAMICO DE IMAGEN AL HACER HOVER */
    let img = document.querySelectorAll(".productos__contenedor--img");
    img.forEach((data) => {
        //CAMBIO LA IMAGEN AL PASAR EL MOUSE POR ARRIBA
        data.addEventListener("mouseover", (e) => {
            let viejaURL = e.target.src;
            let indice = viejaURL.indexOf("-");
            let valorIndice = parseInt(viejaURL.slice(indice + 1, indice + 2)) + 1;
            let rutaDefinitiva = viejaURL.split("-", 1);
            rutaDefinitiva = `${rutaDefinitiva}-${valorIndice}.jpg`;
            data.src = rutaDefinitiva;
            //VUELVO A COLOCAR LA IMAGEN ANTERIOR
            data.addEventListener("mouseout", () => {
                data.src = viejaURL;
            });
        });
    });

    /* EVENTO PARA CAMBIAR EL SENTIDO DE LAS CUADRICULAS DE LAS CARDS */
    let btnCuadricula = document.querySelectorAll(".tipoDeCuadricula");
    let cardsProductos = document.querySelectorAll(".productos__contenedor--article");
    btnCuadricula.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        let seleccion = e.target.getAttribute("data-cuadricula");
        cardsProductos.forEach((card) => {
          switch (seleccion) {
            case "multiple":
              if (card.classList.contains("cuadriculaUnica")) {
                card.classList.remove("cuadriculaUnica");
                card.classList.add("cuadriculaMultiple");
              }
              break;
            default:
              card.classList.remove("cuadriculaMultiple");
              card.classList.add("cuadriculaUnica");
          }
        });
      });
    });
    /* CODIGO PARA QUE SE CARGUEN LOS PRODUCTOS EN EL STORAGE */

    let btnCarrito = document.querySelectorAll(".btn-carrito");

    btnCarrito.forEach((e) => {
      e.addEventListener("click",(productoSeleccionado) => {
        contadorProductos++;
        let nombre = productoSeleccionado.target.getAttribute("data-producto");
        let precio = productoSeleccionado.target.getAttribute("data-precio");
        let ruta = productoSeleccionado.target.getAttribute("data-ruta");
        let contadorCarrito = document.querySelector("#contador-carrito");
        contadorCarrito.classList.remove("activada");
        contadorCarrito.innerHTML = `${contadorProductos}`
        arrProductos.push(new Carrito(contadorProductos,nombre,precio,ruta));
      });
      let guardarCompra = document.querySelector("#icono-carrito");
      guardarCompra.addEventListener("click",() => {
        localStorage.setItem("ListaDeCompra",JSON.stringify(arrProductos));
      });
    });
  };
  /* ESTA FUNCION SE ENCARGARA DE RECIBIR EL ARRAY DE OBJETOS Y EL VALOR QUE SE QUIERE CARGAR PARA LUEGO PINTARLO */
  const cargarPlantilla = (arrProductos, categoriaRecibida) => {
    let banderaDeError = false;
    for (const producto of arrProductos) {
      let nombre = producto.nombre.toLowerCase();
      let categoria = producto.categoria.toLowerCase();
      banderaDeError = false;
      if (categoriaRecibida == "todos") {
        crearPlantilla(producto);
      } else if (categoria == categoriaRecibida) {
        crearPlantilla(producto);
      } else if (categoria.indexOf(categoriaRecibida) != -1 || nombre.indexOf(categoriaRecibida) != -1) {
        crearPlantilla(producto);
      }else{
        banderaDeError = true;
      }
    }
    if(banderaDeError && contenedorProductos.innerHTML == ""){
        /* AQUI SE LLAMARA A LA FUNCION QUE PINTARA ERROR EN LA PANTALLA */
        mensajeError();
    }
  };
  cargarPlantilla(DATA, "todos"); /* LLAMO A ESTE FUNCION PARA QUE ME CARGUE LAS CARDS LA PRIMERA VEZ */

  const mensajeError = () => {
    contenedorProductos.innerHTML += `
    <section class = "productos__contenedor--seccionError">
        <div>
            <h3>ATENCIÓN<i class="fas fa-exclamation-circle"></i></h3>
        </div>
        <span>SU BUSQUEDA NO ARROJÓ RESULTADOS</span>
    </section>
    
    `;
  };
  /* EVENTO PARA CARGAR CARDS SEGUN LA CATEGORIA */
  let btnCategorias = document.querySelectorAll(".btn__categorias");
  btnCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      contenedorProductos.innerHTML = "";
      cargarPlantilla(DATA, e.target.innerHTML.toLowerCase());
    });
  });

  /* ORDENAMIENTO MEDIANTE LA ETIQUETA SELECT */
  /* const ordenarProductos = (tipoDeOrden,arrProductos) => {
    console.log(tipoDeOrden)

    if(tipoDeOrden == "menor"){
        arrProductos.sort((a,b) => a.precio - b.precio);
    }else if(tipoDeOrden == "mayor"){
        arrProductos.sort((a,b) => b.precio - a.precio);
    }
};
let select = document.querySelector("#ordenamiento");
select.addEventListener("change",(e) => {
    ordenarProductos(e.target.value,DATA);
}); 
 */

  /* EVENTO PARA CAPTURAR LOS VALORES DE LA BARRA DE BUSQUEDA */
  let form = document.querySelector("#form");
  let iconoBusqueda = document.querySelector("#buscar");

  form.addEventListener("keypress", (tecla) => {
    /* ANULO EL ENVIO DEL FORMULARIO CON LA TECLA ENTER */
    tecla.key == "Enter" ? tecla.preventDefault() : "";
    iconoBusqueda.addEventListener("click", () => {
        let inputBusqueda = document.querySelector("#barra-busqueda").value.toLowerCase();
        contenedorProductos.innerHTML = "";
        if(inputBusqueda == ""){
            /* AQUI SE LLAMARA A LA FUNCION QUE PINTARA ERROR EN LA PANTALLA */
            mensajeError();
        }else{
            cargarPlantilla(DATA,inputBusqueda);
        }
      });
  });
})();
