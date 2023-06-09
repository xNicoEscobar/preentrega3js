class ProductoController {
    constructor() {
        this.listaProductos = []
    }
    levantar() {
        let obtenerListaJSON = localStorage.getItem("listaProductos")

        if (obtenerListaJSON) {
            this.listaProductos = JSON.parse(obtenerListaJSON)
        }
    }

    mostrarEnDOM(contenedor_productos) {
        //Limpio lista
        contenedor_productos.innerHTML = ""
        //Muestro lista
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
                    <div class="card" style="width: 18rem;">
                        <img src="${producto.img}" alt="RX 6600 XT">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p>Precio: <strong>$${producto.precio}</p></strong>
                                <a href="#" class="btn btn-primary d-flex justify-content-center" id="gpu${producto.id}">Añadir al carrito</a>
                            </div>
                    </div>
            `
        })
    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
    }

    levantar() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")
        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
        }
    }

    anadir(producto) {
        this.listaCarrito.push(producto)

        let formatoJSON = JSON.stringify(this.listaCarrito)

        localStorage.setItem("listaCarrito", formatoJSON)
    }

    mostrarEnDOM(contenedor_carrito) {
        //Limpio lista
        contenedor_carrito.innerHTML = ""
        //Muestro lista
        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-4">
            <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.nombre}">
            </div>
            <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text"><small class="text-muted">$${producto.precio}</small></p>
                        </div>
                    </div>
                    </div>
                    </div>
                    `
        })
    }

    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }
}

// Controladores de objetos
const controladorProductos = new ProductoController()
const controladorCarrito = new CarritoController()

//Verificador de storage
controladorProductos.levantar()
controladorCarrito.levantar()

//Obtengo el DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")
const finalizar_compra = document.getElementById("finalizar_compra")

//Aplicación JS
controladorProductos.mostrarEnDOM(contenedor_productos)
controladorCarrito.mostrarEnDOM(contenedor_carrito)

//Eventos en boton de las cards
controladorProductos.listaProductos.forEach(producto => {
    const productoEnCarrito = document.getElementById(`gpu${producto.id}`)

    productoEnCarrito.addEventListener("click", () => {

        controladorCarrito.anadir(producto)

        controladorCarrito.levantar()

        controladorCarrito.mostrarEnDOM(contenedor_carrito)
        Toastify({
            text: "Añadido al carrito!",
            duration: 2000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #1eb597, #227bad)",
                color: "white"
                
            },
        }).showToast();
    })
})

//Eventos en productos en carrito
finalizar_compra.addEventListener("click", () => {
    if (controladorCarrito.listaCarrito.length > 0) {

        controladorCarrito.limpiar()
        controladorCarrito.mostrarEnDOM(contenedor_carrito)

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito! 😎',
            showConfirmButton: false,
            timer: 2000
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No hay nada que comprar 😔',
            showConfirmButton: false,
            timer: 2000
        })
    }
})