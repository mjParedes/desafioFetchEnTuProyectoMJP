const contenedorShop = document.getElementById("shopContainer")
const contenedorCarrito= document.getElementById("contenedorCarrito")
const contadorCarrito = document.getElementById("cartCounter")
const precioTotal= document.getElementById("precioTotal")

let carrito= [];

document.addEventListener("DOMContentLoaded", () =>{
    if(localStorage.getItem("carrito")){
        carrito= JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})

productos.forEach((productos) => {
    const { nombre,precio,id,img } = productos;
    const div = document.createElement("div")
    div.classList.add("cardProductos")
    div.innerHTML= `
    <img src="${img}" alt="">
    <h6>${nombre}</h6>
    <p>Precio: $ ${precio}</p>
    <button id="agregar${id}" class="botonAgregar">Agregar <i class="fas fa-shoping-cart"></i></button>`
    contenedorShop.appendChild(div)

    const boton = document.getElementById(`agregar${id}`)
    
    boton.addEventListener("click", () => {
        Swal.fire({
            title:"PetCare",
            html: `
            <h5>
                Has agregado: <b>${nombre}</b>  al carrito
            </h5>`
        })
        agregarAlCarrito(id)
    } )
});

const agregarAlCarrito= (prodID) => {
    const item = productos.find((prod) => prod.id===prodID)
    carrito.push(item)
    actualizarCarrito()
}

const eliminarDelCarrito= (prodID) =>{
    const item= carrito.find((prod) => prod.id === prodID)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito()
}

const totalCarrito= ()=>{
    return carrito.reduce((acc, prod) => acc+prod.precio*prod.cantidad,0)
}

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  
  const cartTitle= document.createElement("h2")
  cartTitle.innerHTML = `
     <h2 class="tituloCart">CARRITO DE COMPRAS- PETCARE</h2>`;
    const mostrarTitulo= (carrito != "")
    ? contenedorCarrito.appendChild(cartTitle)
    : contenedorCarrito.innerHTML= ""

    
  carrito.forEach((productos) => {
    const { nombre, precio, cantidad, id, img} = productos;
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <div class="avatar">
            <img src="${img}">
        </div>
        <div>
        <h6>${nombre}</h6>
        </div>
        <div>
        <p>Precio: $  ${precio}</p>
        </div>
        <div>
        <p>Cantidad: <span id="cantidad">${cantidad}</span></p>
        </div>
        <div>
        <button onclick = "eliminarDelCarrito(${id})" class="botonEliminar">Remover<i class="fas fa-trash-alt></i></button>
        </div>`;
    contenedorCarrito.appendChild(div);

    // localStorage.setItem("carrito", JSON.stringify(carrito));
  });
  contadorCarrito.innerText = carrito.length;  
  precioTotal.innerText =
    "TOTAL A ABONAR: $  " + carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const mostrarTotal =
    (carrito != "")
      ? contenedorCarrito.appendChild(precioTotal)
      : (contenedorCarrito.innerHTML = "");

      const divBtn = document.createElement("div")
      divBtn.innerHTML=`
      <button id="btnCloseCart">Cerrar</button>`
      const btnCC= document.getElementById("btnCloseCart")
    //   btnCC.addEventListener("click", ()=>{
    //     contenedorCarrito.innerHTML= " "
    //   })
    const mostrarBtnClose= (carrito != "")
    ? contenedorCarrito.appendChild(divBtn)
    : contenedorCarrito.innerHTML = ""
    
};




