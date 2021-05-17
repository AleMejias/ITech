let contenedorProductos = document.querySelector("#productosContenedor");
let btnCategorias = document.querySelectorAll(".btn__categorias");
let cardsProductos = document.querySelectorAll(".productos__contenedor--article");
let btnCuadricula = document.querySelectorAll(".tipoDeCuadricula");
const mostrarCards = (categoria) => {
    cardsProductos.forEach((cards) => {
        let tipoDeCard = cards.getAttribute("data-categorias");
        if(categoria != tipoDeCard){
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