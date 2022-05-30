const imagenes = document.querySelectorAll(".imgGaleria");
const imagenesClaras = document.querySelector(".agregarImagen");
const contenedorClaro = document.querySelector(".imagenClara");
const hamburguesa1 = document.querySelector(".hamburguesa");

/* console.log(imagenes);
console.log(imagenesClaras);
console.log(contenedorClaro); */

imagenes.forEach(imagen => {
    imagen.addEventListener("click", () => {
        aparecerImagen(imagen.getAttribute("src"))
    })
})

contenedorClaro.addEventListener("click", (e) =>{
    if (e.target !== imagenesClaras) {
        contenedorClaro.classList.toggle("mostrar");
        imagenesClaras.classList.toggle("mostrarImagen");
        hamburguesa1.style.opacity = "1";
    }
})

const aparecerImagen = (imagen) => {
    imagenesClaras.src = imagen;
    contenedorClaro.classList.toggle("mostrar");
    imagenesClaras.classList.toggle("mostrarImagen");
    hamburguesa1.style.opacity = "0";
}
