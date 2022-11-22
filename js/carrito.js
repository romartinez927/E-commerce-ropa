let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.getElementById("contenedorCarrito")
const montoTotalCompra = document.getElementById("montoTotal")
const contenedorCarritoVacio = document.getElementById("carritoVacio")
const formularioCompra = document.querySelector("#formularioCompra")
const carritoHeader = document.querySelector("#carritoHeader")
const form = document.querySelector("#form")

//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {

    contenedorCarrito.innerHTML = ""



    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.innerText = ""

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito"
            contenidoDelCarrito.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>$ ${producto.precio}</p>
                <span class="restar"> - </span>
                <p>Cantidad: ${producto.cantidad}</p> 
                <span class="sumar"> + </span>
                <p>Total: $${producto.cantidad * producto.precio}</p>
                <span class="eliminarProducto"> (x) </span>
                `
            
            contenedorCarrito.append(contenidoDelCarrito)
            

            let restar = contenidoDelCarrito.querySelector(".restar")
    
            restar.addEventListener("click", () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--
                    verCarrito()
                } else {
                    eliminarProducto(producto.id)
                    verCarrito()
                }
            })

            let sumar = contenidoDelCarrito.querySelector(".sumar")

            sumar.addEventListener("click", () => {
                producto.cantidad++
                verCarrito()
            })

            let eliminar = contenidoDelCarrito.querySelector(".eliminarProducto") 
    
            eliminar.addEventListener("click", () => {
                eliminarProducto(producto.id)
            })
    
        })    
    } else {
        contenedorCarritoVacio.innerText = "Tu carrito se encuentra vacío."
        montoTotalCompra.innerHTML = ""
    }

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        let finalizarCompraaa = document.createElement("div")
        finalizarCompraaa.className = "finalizarCompraaa"
        finalizarCompraaa.innerHTML = `<button class="finalizarCompraBtn">Realizar compra</button>`
    
        contenedorCarrito.append(finalizarCompraaa)

        let finalizarCompra = contenedorCarrito.querySelector(".finalizarCompraaa")

        finalizarCompra.addEventListener("click", () => {
            // localStorage.clear()
            // verCarrito()
            contenedorCarrito.innerText = ""
            montoTotalCompra.innerText = ""
            carritoHeader.innerText = ""

            let datos = document.createElement("div")
            datos.className = "datosEmail"
            datos.innerHTML = `<div class="form-header">
                                    <h3>DATOS DE CONTACTO</h1>
                                </div>
                                <div>
                                    <label for="email" class="form-label">Ingresa tu email para continuar la compra</label>
                                    <input type="text" id="email" class="form-input" placeholder="Email">
                                    <button>Volver al carrito</button>
                                    <button class="continuarCompra">Continuar</button>
                                </div>`

            form.append(datos)

            let continuarCompra = document.querySelector(".continuarCompra")

            continuarCompra.addEventListener("click", () => {
                datos.innerHTML = ""

                let datosDos = document.createElement("div")
                datosDos.className = "datos-pt2"
                datosDos.innerHTML = `<h3>ELIGE COMO OBTENER TU PEDIDO</h3>
                                  <input type="radio" id="enviarPedido" name="retiroPedido" value="enviarPedido" />
                                  <label for="enviarPedido">Enviar mi pedido</label>

                                  <input type="radio" id="retiroLocal" name="retiroPedido" value="retiroLocal" />
                                  <label for="retiroLocal">Retiro en local</label>
                                  <button>Volver al carrito</button>
                                  <button class="continuarCompraDos">Continuar</button>`

                form.append(datosDos)

                let continuarCompraDos = document.querySelector(".continuarCompraDos")

                continuarCompraDos.addEventListener("click", () => {
                    datosDos.innerHTML = ""

                    let datosTres = document.createElement("div")
                    datosTres.className = "datos-pt3"
                    datosTres.innerHTML = `<div>
                                                <h3>OPCIONES DE PAGO</h3>
                                                <input type="radio" id="mercadoPago" name="mercadoPago" value="mercadoPago" />
                                                <label for="mercadoPago">MercadoPago</label>
                                                <p>Te redireccionaremos al sitio seguro de MercadoPago para que finalices tu compra. Podrás pagar con tarjetas de crédito y en efectivo en puntos de pago.</p>
                                            </div>
                                            <div>
                                                <h4>COMENTARIOS ADICIONALES</h4>
                                                <textarea></textarea>
                                            </div>
                                            <button>Volver al carrito</button>
                                            <button class="continuarCompraDos">Finalizar Compra</button>`
                    
                    form.append(datosTres)
                })
            })
})

        
    }
}

//Eliminar productos
const eliminarProducto = (id) => {
    const index = productosEnCarrito.findIndex((element) => element.id === id)

    productosEnCarrito.splice(index, 1)
    verCarrito()

    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito))
   
} 

verCarrito()

// Cálculo del precio total
if (productosEnCarrito && productosEnCarrito.length > 0) {
    const total = productosEnCarrito.reduce ((acc, el) =>
        acc + el.precio * el.cantidad, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total a pagar: $ ${total}`
    montoTotalCompra.append(totalCompra)
} else {
    montoTotalCompra.innerHTML = ""
}



const verForm = () => {
    contenedorCarrito.innerText = ""
    montoTotalCompra.innerText = ""
    carritoHeader.innerText = ""

}

