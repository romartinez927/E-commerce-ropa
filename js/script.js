//JS de la página Index

const contenedorProductos = document.getElementById("contenedorCardsProductos")
const cantidadCarrito = document.getElementById("cantidadCarrito")
const contenedorCategoriasProductos = document.querySelector("#contenedorCategoriasProductos")
const categoriaBotones = document.querySelectorAll(".categoriaBtn")
const tituloPrincipal = document.querySelector(".tituloPrincipal")
const buscador = document.querySelector("#buscador")
const buscadorBtn = document.querySelector("#buscador-btn")
const resultado = document.querySelector("#resultado")

// Array de objetos
const productos = [
    {
        id: 1, 
        nombre: "Remera V",  
        precio: 1200, 
        stock: 300, 
        img:"./img/Sintítulo2.png", 
        cantidad: 1,
        categoria: "tops y remeras"
    },
    {
        id: 2, 
        nombre: "Remera clásica de Modal", 
        precio: 1200, 
        stock: 350, 
        img:"./img/Sintítulo.png", 
        cantidad: 1,
        categoria: "tops y remeras"
    },
    {
        id: 3, 
        nombre: "Short Negro", 
        precio: 2100, 
        stock: 150, 
        img: "./img/Sintítulo3.png", 
        cantidad: 1,
        categoria: "shorts"
    },
    {
        id: 4, 
        nombre: "Short Calvin",  
        precio: 2300, 
        stock: 150, 
        img: "./img/1636493340_df357a8dd8a8d84a31740985f0c60eb6.140307.jpeg", 
        cantidad: 1,
        categoria: "shorts"
    },
    {
        id: 5, 
        nombre: "Short Flecos",
        precio: 2500, 
        stock: 100, 
        img: "./img/1664813536_85b38ebcb18d82ff5024533f1b4b6778.140307.jpeg", 
        cantidad: 1,
        categoria: "shorts"
    },
    {
        id: 6, 
        nombre: "Campera Rebel", 
        precio: 2500, 
        stock: 200, 
        img: "./img/1661546792_b0ccd5911ea5c8e7758bbe80fd63cbfc.140307.jpeg", 
        cantidad: 1,
        categoria: "camperas"
    },            
    {
        id: 7, 
        nombre: "Top Roger Militar", 
        precio: 1200, 
        stock: 100, 
        img: "./img/1664818248_e18744f3b64d900f33feee8061177287.140307.jpeg", 
        cantidad: 1,
        categoria: "tops y remeras"
    },
    {
        id: 8, 
        nombre: "Remera básica",  
        precio: 1500, 
        stock: 200, 
        img: "./img/1589224046_b3f01ead4d639b4a063d39b11e3ba314.140307.jpeg", 
        cantidad: 1,
        categoria: "tops y remeras"
    },
    {
        id: 9,
        nombre: "Top Morgan", 
        precio: 1300, 
        stock: 200, 
        img: "./img/1573158303_5b0ab675382bf907b827aad6f74e3024.140307.jpeg", 
        cantidad: 1,
        categoria: "tops y remeras"
    },   
    {
        id: 10,
        nombre: "Jogging frizado", 
        precio: 2200, 
        stock: 100, 
        img: "./img/01b28c191134c235bc5aedf88ccb8de51982492153588a1a3321ba525b6c1c4a95838.jpeg", 
        cantidad: 1,
        categoria: "pantalones"
    },
    {
        id: 11,
        nombre: "Biker de algodón con lycra",
        precio: 1500, 
        stock: 200, 
        img: "./img/080ba20369f48bf7fd8a368f506a44caa7e6e31829f9317d57953dc5fc33073f95838.jpeg", 
        cantidad: 1,
        categoria: "pantalones"
    },
    {
        id: 12,
        nombre: "Jogging algodón rústico",
        precio: 2300, 
        stock: 200, 
        img: "./img/fcd08eee38bf22369b022f6117e9c8309e0636e87d5395afb34866b27089080695838.jpeg", 
        cantidad: 1,
        categoria: "pantalones"
    },
]

let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [] 

//Crear cards de productos
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = ""

    productosElegidos.forEach((producto) => {
        let cardProductos = document.createElement("div")
        cardProductos.className = "card"
        cardProductos.innerHTML = `
            <img src=${producto.img}>
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
        `
        contenedorProductos.append(cardProductos)

        let comprar = document.createElement("button")
        comprar.className = "btnComprar"
        comprar.innerText = "Comprar"

        cardProductos.append(comprar)

        comprar.addEventListener ("click", () => { 
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id)

            if (repeat) {
                carrito.map((prod) => {
                    if(prod.id === producto.id) {
                        prod.cantidad++
                    }
                })
            } else {
                carrito.push({
                    id: producto.id,
                    img: producto.img,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                })
        }

        carritoCounter()
        
        saveLocal()
        })
        })  

}


cargarProductos(productos)


const filtrar = () => {
    resultado.innerHTML = ""

    const texto = buscador.value.toLowerCase()
    for (let producto of productos) {
        let nombre = producto.nombre.toLowerCase()
        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `<div class="card">
                                    <img src=${producto.img}>
                                    <h2>${producto.nombre}</h2>
                                    <p>$${producto.precio}</p>
                                    <button class="btnComprar">Comprar</button>
                                    </div>`
            contenedorProductos.innerHTML = ""
        }
    }

    if (resultado.innerHTML === "") {
        resultado.innerHTML += `<p>Producto no encontrado</p>`
    }
}

buscadorBtn.addEventListener("click", filtrar)
buscador.addEventListener("keyup", filtrar)

categoriaBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id)
            console.log("funciona?")
            tituloPrincipal.innerText = productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else {
            cargarProductos(productos)
            console.log("oraaaaa")
            tituloPrincipal.innerText = "Todos los productos"
        }
    })
})

// Contador de productos en carrito
const carritoCounter = () => {
    const carritoLenght = carrito.length
    localStorage.setItem("numeritoCarrito", JSON.stringify(carritoLenght))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("numeritoCarrito"))
}

carritoCounter()

// Guardar datos en Local Storage
const saveLocal = () => {
    localStorage.setItem("productosCarrito", JSON.stringify(carrito))
}

console.log(carrito)


