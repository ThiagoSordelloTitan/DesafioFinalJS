const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footerTabla = document.getElementById("footerTabla");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragmento = document.createDocumentFragment();
let carrito = {};



document.addEventListener("DOMContentLoaded",() => {
    fetchData();
    if(localStorage.getItem("carrito")) {
        carrito  = JSON.parse(localStorage.getItem("carrito"));
        pintarCarrito();
    }
})
cards.addEventListener("click", (e) => {
    agregarCarrito(e)  
})

items.addEventListener("click", e => {
    accionBoton(e);
})


const fetchData = async () => {
    try {
        const res = await fetch("../json/falsaApi.json")
        const data = await res.json();
        /* console.log(data); */
        pintarCards(data );
    } catch (error) {
        console.log(error);
    }
}

const pintarCards = (data) => {
    data.forEach(producto => {
        console.log(producto);
        templateCard.querySelector("h5").textContent = producto.titulo;
        templateCard.querySelector("p").textContent = producto.precio;
        templateCard.querySelector("img").setAttribute("src", producto.imagen);
        templateCard.querySelector("img").setAttribute("alt", producto.texto);
        templateCard.querySelector("button").dataset.id = producto.id;
        

        const clonar =templateCard.cloneNode(true);
        fragmento.appendChild(clonar);
    })
    cards.appendChild(fragmento)
}

const agregarCarrito = e => {
    /* console.log(e.target);
    console.log(e.target.classList.contains("btn-dark")); */
    if (e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    /* console.log(objeto); */
    const producto = {
        id: objeto.querySelector("button").dataset.id,
        titulo: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto};
    pintarCarrito();
}

const pintarCarrito = () => {
    console.log(carrito);
    items.innerHTML = "";
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id;
        templateCarrito.querySelectorAll("td")[0].textContent = producto.titulo;
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
        templateCarrito.querySelector("span").textContent = (producto.cantidad * producto.precio);
        
        const clone = templateCarrito.cloneNode(true);
        fragmento.appendChild(clone);
    })
    items.appendChild(fragmento);
    pintarFooter();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const pintarFooter = () => {
    footerTabla.innerHTML = "";
    if(Object.keys(carrito).length === 0) {
        footerTabla.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return 
    }
    const nCantidad = Object.values(carrito).reduce((acumulador, {cantidad}) => acumulador + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acumulador, {cantidad, precio}) => acumulador + cantidad * precio, 0);
    /* console.log(nPrecio); */

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;
    
    const clone = templateFooter.cloneNode(true);
    fragmento.appendChild(clone);
    footerTabla.appendChild(fragmento);

    const botonVaciar = document.getElementById("vaciarCarrito");
    botonVaciar.addEventListener("click",() => {
        carrito = {};
        pintarCarrito();
    })
} 

const accionBoton = e => {
    /* console.log(e.target);  */
    // aumentar cantidad carrito
    if(e.target.classList.contains("btn-info")) {
        /* console.log(carrito[e.target.dataset.id]); */
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto};

        pintarCarrito();
    }
    // disminuir cantidad carrito
    if(e.target.classList.contains("btn-danger")) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        }
        pintarCarrito() 
    }
    e.stopPropagation();
}


