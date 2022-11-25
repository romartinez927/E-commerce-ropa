let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.getElementById("contenedorCarrito")
const montoTotalCompra = document.getElementById("montoTotal")
const contenedorCarritoVacio = document.getElementById("carritoVacio")
const formularioCompra = document.querySelector("#formularioCompra")
const carritoHeader = document.querySelector("#carritoHeader")


//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {

    // formularioCompra.innerHTML = ""
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


const procesoDeCompra = () => {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        let realizarCompra  = document.createElement("div")
        realizarCompra.className = "realizarCompra"
        realizarCompra.innerHTML = `<button class="realizarCompraBtn">Realizar compra</button>`
    
        contenedorCarrito.append(realizarCompra)

        let realizarCompraBtn = contenedorCarrito.querySelector(".realizarCompraBtn")

        realizarCompraBtn.addEventListener("click", () => {
            contenedorCarrito.innerHTML = ""
            montoTotalCompra.innerHTML = ""
            carritoHeader.innerHTML = ""

            let datosDelUsuario = document.createElement("div")
            datosDelUsuario.className = "SeccionUno"
            datosDelUsuario.innerHTML = `<form method="post" class="form" id="form">
                                            <div class="form-header">
                                                <h3>DATOS DE CONTACTO</h1>
                                            </div>
                                            <div>
                                                <label for="email" class="form-label">Ingresa tu email para continuar la compra</label>
                                                <input type="email" id="email" class="form-input" placeholder="Email" required>
                                                
                                                <button class="volverCarrito">Volver al carrito</button>
                                                <button type="submit" value="submit" class="continuarSeccionDos">Continuar</button>
                                            </div>
                                        </form>`

            formularioCompra.append(datosDelUsuario)



            let volverCarrito = document.querySelector(".volverCarrito")
            volverCarrito.addEventListener("click", () => {
                verCarrito()
                procesoDeCompra()
                datosDelUsuario.innerHTML = ""
            })
            let continuarSeccionDos = document.querySelector(".continuarSeccionDos")

            continuarSeccionDos.addEventListener("click", () => {
                let email = document.querySelector("#email").value
                localStorage.setItem("emailUsuario", email) 


                // datosDelUsuario.innerHTML = ""

                let datosSeccionDos = document.createElement("div")
                datosSeccionDos.className = "seccionDos"
                datosSeccionDos.innerHTML = `<div>
                                                <h1>ELIGE COMO OBTENER TU PEDIDO</h1>
                                            </div>
                                            <div class="acordeon">
                                                <div class="bloque activo">
                                                    <label for="enviarPedido">Enviar mi pedido</label>
                                                    <input type="radio" id="enviarPedido" class="opcionDeEntrega" name="entregaPedido" value="enviarPedido" required="required" />
                                   
                                                    <div class="contenido">
                                                        <h3>DOMICILIO DE ENTREGA</h3>
                                                        <p>Datos de quien recibe</p>
                                                        <input type="text" id="name" class="form-input" placeholder="Nombre">
                                                        <input type="text" id="lastName" class="form-input" placeholder="Apellido">
                                                        <input type="text" id="telefono" class="form-input" placeholder="Teléfono">

                                                        <p>Domicilio de entrega</p>
                                                        <input type="text" id="pais" class="form-input" placeholder="Argentina">
                                                        <select id="localidad" name="localidad">
                                                            <option data="01" value="Buenos Aires">Buenos Aires</option>
                                                            <option data="02" value="Gran Buenos Aires">Gran Buenos Aires</option>
                                                            <option data="03" value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</option>
                                                            <option data="04" value="Catamarca">Catamarca</option>
                                                            <option data="05" value="Chaco">Chaco</option>
                                                            <option data="06" value="Chubut">Chubut</option>
                                                            <option data="07" value="Córdoba">Córdoba</option>
                                                            <option data="08" value="Corrientes">Corrientes</option>
                                                            <option data="09" value="Entre Ríos">Entre Ríos</option>
                                                            <option data="10" value="Formosa">Formosa</option>
                                                            <option data="11" value="Jujuy">Jujuy</option>
                                                            <option data="12" value="La Pampa">La Pampa</option>
                                                            <option data="13" value="La Rioja">La Rioja</option>
                                                            <option data="14" value="Mendoza">Mendoza</option>
                                                            <option data="15" value="Misiones">Misiones</option>
                                                            <option data="16" value="Neuquén">Neuquén</option>
                                                            <option data="17" value="Río Negro">Río Negro</option>
                                                            <option data="18" value="Salta">Salta</option>
                                                            <option data="19" value="San Juan">San Juan</option>
                                                            <option data="20" value="San Luis">San Luis</option>
                                                            <option data="21" value="Santa Cruz">Santa Cruz</option>
                                                            <option data="22" value="Santa Fé">Santa Fé</option>
                                                            <option data="23" value="Santiago del Estero">Santiago del Estero</option>
                                                            <option data="24" value="Tierra del Fuego">Tierra del Fuego</option>
                                                            <option data="25" value="Tucumán">Tucumán</option>
                                                        </select>

                                                        <input type="text" id="calle" class="form-input" placeholder="Calle">
                                                        <input type="text" id="calleNro" class="form-input" placeholder="n°">
                                                        <input type="text" id="ciudad" class="form-input" placeholder="Ciudad">
                                                        <input type="text" id="codigoPostal" class="form-input" placeholder="Código Postal">    
                                                    </div>
                                                </div>
                                                <div class="bloque">
                                                    <input type="radio" class="opcionDeEntrega" id="retiroLocal" name="entregaPedido" value="retiroLocal" />
                                                    <label for="retiroLocal">Retiro en local</label>
                                                    
                                                    <div class="contenido">
                                                        <h3>DATOS DE LA PERSONA QUE RETIRARÁ EL PEDIDO</h3>
                                                        <input type="text" id="nombre" class="form-input" placeholder="Nombre">
                                                        <input type="text" id="apellido" class="form-input" placeholder="Apellido">
                                                        
                                                        <h5>Dirección</h5>
                                                        <p>Avenida Siempreviva 123, Capital Federal, Ciudad de Buenos Aires, Argentina</p>
                                                        <p>Una vez que realices tu compra podes pasar a retirar EN EL MOMENTO!</p>
                                                        <p>Los retiros por el local son de Lunes a Viernes de 14 a 20 hs</p>
                                                    </div>
                                                </div> 
                                            </div>
                            
                                            <button class="volverCarrito">Volver al carrito</button>
                                            <button class="continuarSeccionTres">Continuar</button>`

                formularioCompra.append(datosSeccionDos)

                let volverCarrito = document.querySelector(".volverCarrito")
                volverCarrito.addEventListener("click", () => {
                    verCarrito()
                    procesoDeCompra()
                    datosSeccionDos.innerHTML = ""
                })

                const bloque = document.querySelectorAll('.bloque')
                const opcionDeEntrega = document.querySelectorAll('.opcionDeEntrega')
    

                opcionDeEntrega.forEach( ( cadaOpcion , i )=>{
                    opcionDeEntrega[i].addEventListener('click', ()=>{
                        bloque.forEach( ( cadaBloque , i )=>{
                            bloque[i].classList.remove('activo')
                        })
                        bloque[i].classList.add('activo')
                    })
                })
    

                let continuarSeccionTres = document.querySelector(".continuarSeccionTres")

                continuarSeccionTres.addEventListener("click", () => {
                    
                    let name = document.querySelector("#name").value
                    localStorage.setItem("namelUsuario", name) 

                    let lastName = document.querySelector("#lastName").value
                    localStorage.setItem("lastNameUsuario", lastName)

                    let tel = document.querySelector("#telefono").value
                    localStorage.setItem("telefonoUsuario", tel)

                    let localidad = document.querySelector("#localidad").value
                    localStorage.setItem("localidadUsuario", localidad)

                    let calle = document.querySelector("#calle").value
                    let calleNro = document.querySelector("#calleNro").value
                    let ciudad = document.querySelector("#ciudad").value
                    let codigoPostal = document.querySelector("#codigoPostal").value
                    
                    let domicilio = `Domicilio: ${calle} ${calleNro}, ${ciudad}, CP: ${codigoPostal}`
                    localStorage.setItem("domicilioUsuario", domicilio)
            
                    datosSeccionDos.innerHTML = ""

                    let datosSeccionTres = document.createElement("div")
                    datosSeccionTres.className = "seccionTres"
                    datosSeccionTres.innerHTML = `<div>
                                                <h3>OPCIONES DE PAGO</h3>
                                                <label for="mercadoPago">MercadoPago</label>
                                                <input type="radio" id="mercadoPago" name="mercadoPago" value="mercadoPago" required="required" />
                                                <p>Te redireccionaremos al sitio seguro de MercadoPago para que finalices tu compra. Podrás pagar con tarjetas de crédito y en efectivo en puntos de pago.</p>
                                            </div>
                                            <div>
                                                <h4>COMENTARIOS ADICIONALES</h4>
                                                <textarea></textarea>
                                            </div>
                                            <button class="volverCarrito">Volver al carrito</button>
                                            <button class="finalizarCompra">Finalizar Compra</button>`
                    
                    formularioCompra.append(datosSeccionTres)

                    let volverCarrito = document.querySelector(".volverCarrito")
                    volverCarrito.addEventListener("click", () => {
                        verCarrito()
                        procesoDeCompra()
                        datosSeccionTres.innerHTML = ""
                    })

                    let finalizarCompra = document.querySelector(".finalizarCompra")
                    finalizarCompra.addEventListener("click", () => {
                                    localStorage.clear()
                                    datosSeccionTres.innerHTML = ""
                                    alert("Tu compra ha sido realizada con éxito!")

                    })
                })
            })
        })

        
    }
}

procesoDeCompra()