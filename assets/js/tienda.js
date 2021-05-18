let contenedorProductos = document.querySelector("#productosContenedor");
let btnCategorias = document.querySelectorAll(".btn__categorias");
let btnCuadricula = document.querySelectorAll(".tipoDeCuadricula");

/* FUNCION AUTO INVOCADA QUE ME PINTARA LAS CARDS CON LOS DATOS TRAIDOS DEL ARRAYS DE PRODUCTOS */
(() => { 
    for(const productos of DATA){
        contenedorProductos.innerHTML += `
        <article class="productos__contenedor--article cuadriculaMultiple mt-4" data-categorias = "${productos.categoria}">
            <div class="productos__contenedor--contenedorImg">
                <img class="productos__contenedor--img" src="${productos.ruta}" alt="">
            </div>
            <div class="productos__contenedor--contenedorDescripcion">
                <h4>${productos.nombre}</h4>
                <span>$${productos.precio}</span>
            </div>
            <div class="productos__contenedor--contenedorBoton">
                <button>Agregar al carrito</button>
            </div>
        </article>
        `;
    }
})();
let cardsProductos = document.querySelectorAll(".productos__contenedor--article");
const mostrarCards = (categoria) => {
    cardsProductos.forEach((cards) => {
        let tipoDeCard = cards.getAttribute("data-categorias");
        if(categoria == "Todos"){
            if(cards.classList.contains("activada")){
                cards.classList.remove("activada");
            }
        }else if(categoria != tipoDeCard){
            cards.classList.add("activada");
        }
        else{
            cards.classList.remove("activada");
        }
    });
};

btnCategorias.forEach((boton) => {
    boton.addEventListener("click",(e) => {
        mostrarCards(e.target.innerHTML);
    });
});
btnCuadricula.forEach((boton) => {
    boton.addEventListener("click",(e) =>{
        let seleccion = e.target.getAttribute("data-cuadricula");
        let cuadriculaUnica = document.querySelector("#cuadriculaUnica");
        let cuadriculaMultiple = document.querySelector("#cuadriculaMultiple");
        cardsProductos.forEach((card) => {
            switch(seleccion){
                case "multiple":
                    cuadriculaUnica.classList.remove("cuadriculaActiva");
                    cuadriculaMultiple.classList.add("cuadriculaActiva");
                    if(card.classList.contains("cuadriculaUnica")){
                        card.classList.remove("cuadriculaUnica");
                        card.classList.add("cuadriculaMultiple");
                    }
                    break;
                default:
                    cuadriculaUnica.classList.add("cuadriculaActiva");
                    cuadriculaMultiple.classList.remove("cuadriculaActiva");
                    card.classList.add("cuadriculaUnica");
            }
        });
    });
});
/* EVENTO PARA CAMBIO DINAMICO DE IMAGEN AL HACER HOVER */
let img = document.querySelectorAll(".productos__contenedor--img");
img.forEach((data) => {
  //CAMBIO LA IMAGEN AL PASAR EL MOUSE POR ARRIBA
  data.addEventListener("mouseover",(e) => {
    let viejaURL = e.target.src;
    let indice = viejaURL.indexOf("-");
    let valorIndice = parseInt(viejaURL.slice(indice+1,indice+2))+1;
    let rutaDefinitiva = viejaURL.split("-",1);
    rutaDefinitiva = `${rutaDefinitiva}-${valorIndice}.jpg`;
    data.src = rutaDefinitiva;
    //VUELVO A COLOCAR LA IMAGEN ANTERIOR
    data.addEventListener("mouseout",() => {
      data.src = viejaURL;
    });
  });
});