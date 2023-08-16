document.addEventListener("DOMContentLoaded", function() {
    const botonBuscar = document.getElementById("botonBuscar");
    const containerDiv = document.querySelector(".container");

    botonBuscar.addEventListener("click", function() {
        containerDiv.style.display = "block";
    });
});
const carritoDeCompras = [];

const agregarAlCarrito = (nombre, precio, talle, stock) => {
    const producto = {
        nombre,
        precio,
        talle,
        stock,
    };
    carritoDeCompras.push(producto);
};

agregarAlCarrito("Remera BAPE Black", 16999, "S-XXL", 8);
agregarAlCarrito("Buzo BAPE", 32200, "S-XXL", 7);
agregarAlCarrito("Shoes BAPEsta", 48999, "37-45", 5);

const imagenesProductos = {
    "Remera BAPE Black": "../images/b.jpg",
    "Buzo BAPE": "../images/aaa.jpg",
    "Shoes BAPEsta": "../images/c.jpg",
};

const calcularTotal = () =>
    carritoDeCompras.reduce((total, producto) => total + producto.precio * producto.stock, 0);

const mostrarCarrito = () => {
    console.log("Productos en el carrito:");
    carritoDeCompras.forEach(producto =>
        console.log(`${producto.nombre} - Precio: ${producto.precio} - Stock: ${producto.stock}`));
    console.log("Total del carrito: " + calcularTotal());
};

const buscarProducto = nombreProducto =>
    carritoDeCompras.find(producto =>
        producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

const mostrarInformacionProducto = producto => {
    const imagenSrc = producto
        ? `images/${imagenesProductos[producto.nombre] || 'default.jpg'}`
        : '';
    const resultadoHTML = `
        <div class="producto-card">
            <div class="producto-imagen">
                ${producto ? `<img src="${imagenSrc}" alt="${producto.nombre}">` : ''}
            </div>
            <div class="producto-info">
                ${producto
                    ? `<p>Nombre: ${producto.nombre}</p>
                       <p>Precio: ${producto.precio}</p>
                       <p>Talle: ${producto.talle}</p>
                       <p>Stock: ${producto.stock}</p>`
                    : "Producto no encontrado en el carrito."}
            </div>
        </div>
    `;
    const resultadoBusqueda = document.getElementById("resultadoBusqueda"); // Agregado
    resultadoBusqueda.innerHTML = resultadoHTML;
};

const inputBusqueda = document.getElementById("buscarProducto");
const botonBuscarBusqueda = document.getElementById("botonBuscar");
botonBuscarBusqueda.addEventListener("click", () => {
    const nombreProductoABuscar = inputBusqueda.value.toLowerCase();
    const productoEncontrado = buscarProducto(nombreProductoABuscar);
    mostrarInformacionProducto(productoEncontrado);
});

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
};

const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if (carritoGuardado) {
    carritoDeCompras.push(...carritoGuardado);
}

window.addEventListener("beforeunload", guardarCarritoEnLocalStorage);

mostrarCarrito();
