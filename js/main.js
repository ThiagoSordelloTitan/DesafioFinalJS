const hamburguesa = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menuNavegacion");

console.log(menu);
console.log(hamburguesa);

hamburguesa.addEventListener("click", () => {
    menu.classList.toggle("mostrarMenu");
})

window.addEventListener("click", e => {
    if (menu.classList.contains("mostrarMenu")
        && e.target != menu && e.target != hamburguesa) { 
            menu.classList.toggle("mostrarMenu");
    };
})