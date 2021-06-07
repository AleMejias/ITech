(() => {
  let DATA = [];
  $.getJSON("../data/data.json", (respuesta, status) => {
    /* SI RECUPERO LOS DATOS SATISFACTORIA MENTE, CARGO LOS DATOS EN EL ARRAY DATA PARA QUE SEA UTILIZADO */
    status == "success" ? DATA = respuesta : "";
    let contenedorProductos = document.querySelector("#productosContenedor");
    /* CLASE PARA EL CARRITO DE COMPRAS */
    class Carrito {
      constructor(id, nombre, precio, ruta) {
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
                  <i class="far fa-eye abrir-seccion-detalle" title="Ver detalle" data-producto = "${producto.nombre}"></i>
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
          let valorIndice =parseInt(viejaURL.slice(indice + 1, indice + 2)) + 1;
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
      /* EVENTO PARA MOSTRAR EL DETALLE DEL PRODUCTO */
      let btn_abrirDetalle = document.querySelectorAll(".abrir-seccion-detalle");
      btn_abrirDetalle.forEach((card) => {
        card.addEventListener("click", () => {
          let productoClickeado = card.getAttribute("data-producto");
          /* RECORRO MI ARRAY DE OBJETOS */
          for (const producto of DATA) {
            if (producto.nombre == productoClickeado) {
              imprimirDetalleProducto(producto);
            }
          }
        });
      });
      /* CODIGO PARA QUE SE CARGUEN LOS PRODUCTOS EN EL STORAGE */

      let btnCarrito = document.querySelectorAll(".btn-carrito");
      btnCarrito.forEach((e) => {
        e.addEventListener("click", (productoSeleccionado) => {
          let nombre = productoSeleccionado.target.getAttribute("data-producto");
          let precio = productoSeleccionado.target.getAttribute("data-precio");
          let ruta = productoSeleccionado.target.getAttribute("data-ruta");
          let contadorCarrito = document.querySelector("#contador-carrito");

          /* VERIFICO SI EL NOMBRE NO EXISTE ANTES DE HACER EL PUSH */
          //Si la respuesta del some NO es TRUE(Por eso niego la condicion), entonces significa que ya existe el producto y no debo hacer el push
          if (!arrProductos.some((elemento) => elemento.nombre == nombre)) {
            contadorProductos++;
            contadorCarrito.classList.remove("activada");
            e.innerHTML = "Agregado";
            e.style.background = "#393939";
            contadorCarrito.innerHTML = `${contadorProductos}`;
            arrProductos.push(new Carrito(contadorProductos, nombre, precio, ruta));
          }
        });
        let guardarCompra = document.querySelector("#icono-carrito");
        guardarCompra.addEventListener("click", () => {
          localStorage.setItem("ListaDeCompra", JSON.stringify(arrProductos));
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
        } else if ( categoria.indexOf(categoriaRecibida) != -1 || nombre.indexOf(categoriaRecibida) != -1) {
          crearPlantilla(producto);
        } else {
          banderaDeError = true;
        }
      }
      if (banderaDeError && contenedorProductos.innerHTML == "") {
        /* AQUI SE LLAMARA A LA FUNCION QUE PINTARA ERROR EN LA PANTALLA */
        mensajeError();
      }
    };
    /* LLAMO A ESTE FUNCION PARA QUE ME CARGUE LAS CARDS LA PRIMERA VEZ */
    cargarPlantilla(DATA,"todos"); 

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
        if (inputBusqueda == "") {
          /* AQUI SE LLAMARA A LA FUNCION QUE PINTARA ERROR EN LA PANTALLA */
          mensajeError();
        } else {
          cargarPlantilla(DATA, inputBusqueda);
        }
      });
    });

    const imprimirDetalleProducto = (producto) => {
      let contenedorSeccionDetalle = document.querySelector("#seccion-detalle");
      if (producto.categoria == "Apple Watch") {
        contenedorSeccionDetalle.innerHTML += `
        <div class="detalle__contenedor">
          <button class="detalle__btn-cerrar"><i class="fas fa-times" id="btn-cerrarDetalle"></i></button>
          <div class="detalle__imagenContenedor">
            <div class="detalle__imagenContenedor--imgDiv">
              <img src="${producto.ruta}" alt="${producto.nombre}" class="detalle__imagenContenedor--img" id= "detalle-img">
              <span class="detalle__imagenContenedor--spanLeft cambiar-imagen"><i class="fas fa-chevron-left" id="left"></i></span>
              <span class="detalle__imagenContenedor--spanRight cambiar-imagen"><i class="fas fa-chevron-right" id="right"></i></span>
            </div>
          </div>
          <div class="detalle__descripcionContenedor">
            <div class="detalle__contenedorPrecioDiv">
              <span class="detalle__contenedorPrecioDiv--spanPrecio">$${producto.precio}</span>
            </div>
            <div class="detalle__contenedorTituloDiv">
              <h3 class="detalle__contenedorTituloDiv--tituloProducto">${producto.nombre}</h3>
            </div>
            <div class="detalle__contenedorListaDiv">
              <ul>
                <li>
                  <span>TECNOLOGÍA:</span>   
                  ${producto.detalle[0]}.
                </li>
                <li>
                  <span>CAJA:</span>   
                  ${producto.detalle[1]}.
                </li>
                <li>
                  <span>PANTALLA:</span>   
                  ${producto.detalle[2]}.
                </li>
                <li>
                  <span>CONEXIÓN MÓVIL:</span>   
                  ${producto.detalle[3]}.
                </li>
                <li>
                  <span>FUNCIONALIDADES:</span>   
                  ${producto.detalle[4]}.
                </li>
                <li>
                  <span>SISTEMA OPERATIVO:</span>   
                  ${producto.detalle[5]}.
                </li>
                <li>
                  <span>GARANTÍA:</span>   
                  1 año.
                </li>
              </ul>
            </div>
          </div>
        </div>
        `;
      } else {
        contenedorSeccionDetalle.innerHTML += `
        <div class="detalle__contenedor">
          <button class="detalle__btn-cerrar"><i class="fas fa-times" id="btn-cerrarDetalle"></i></button>
          <div class="detalle__imagenContenedor">
            <div class="detalle__imagenContenedor--imgDiv">
              <img src="${producto.ruta}" alt="${producto.nombre}" class="detalle__imagenContenedor--img" id= "detalle-img">
              <span class="detalle__imagenContenedor--spanLeft cambiar-imagen"><i class="fas fa-chevron-left" id="left"></i></span>
              <span class="detalle__imagenContenedor--spanRight cambiar-imagen"><i class="fas fa-chevron-right" id="right"></i></span>
            </div>
          </div>
          <div class="detalle__descripcionContenedor">
            <div class="detalle__contenedorPrecioDiv">
              <span class="detalle__contenedorPrecioDiv--spanPrecio">$${producto.precio}</span>
            </div>
            <div class="detalle__contenedorTituloDiv">
              <h3 class="detalle__contenedorTituloDiv--tituloProducto">${producto.nombre}</h3>
            </div>
            <div class="detalle__contenedorListaDiv">
              <ul>
                <li>
                  <span>MEMORIA:</span>   
                  ${producto.detalle[0]}.
                </li>
                <li>
                  <span>DIMENSIONES:</span>   
                  ${producto.detalle[1]}.
                </li>
                <li>
                  <span>PANTALLA:</span>   
                  ${producto.detalle[2]}.
                </li>
                <li>
                  <span>CHIP:</span>   
                  ${producto.detalle[3]}.
                </li>
                <li>
                  <span>CÁMARA:</span>   
                  ${producto.detalle[4]}.
                </li>
                <li>
                  <span>BATERíA:</span>   
                  ${producto.detalle[5]}.
                </li>
                <li>
                  <span>SISTEMA OPERATIVO:</span>   
                  ${producto.detalle[6]}.
                </li>
                <li>
                  <span>GARANTÍA:</span>   
                  1 año.
                </li>
              </ul>
            </div>
          </div>
        </div>
        `;
      }
      contenedorSeccionDetalle.classList.remove("activada");

      /* EVENTO PARA CAMBIAR LA IMAGEN EN LA SECCION DETALLE */
      let btnCambiarDeImagen = document.querySelectorAll(".cambiar-imagen");
      btnCambiarDeImagen.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let imagenActual = document.querySelector("#detalle-img");
          let nuevaImagen = imagenActual.src.split("-", 1);
          e.target.getAttribute("id") == "right" ? (imagenActual.src = `${nuevaImagen}-2.jpg`) : (imagenActual.src = `${nuevaImagen}-1.jpg`);
        });
      });

      /* EVENTO PARA CERRAR LA SECCION RECIEN CREADA */
      let cerrarSeccionDetalle = document.querySelector("#btn-cerrarDetalle");
      cerrarSeccionDetalle.addEventListener("click", () => {
        contenedorSeccionDetalle.innerHTML = "";
        contenedorSeccionDetalle.classList.add("activada");
      });
    };
  });
})();// fin de funcion autoinvocada
