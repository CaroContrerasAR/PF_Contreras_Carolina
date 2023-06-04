let usuarioAutorizado = "admin";
let passwordAutorizado = 1234;

//Otro opcion fetch con promesas
async function moneda() {
  const resp = await fetch("../js/monedas.json")
    .then((res) => res.json())
    .then((data) => {
      moneda = data;
    })
  return resp
}
console.log(moneda())

//Obtenemos la referencia del elemento body
let body = document.getElementsByTagName("body")[0];

// Creamos un elemento <table> y un elemento <tbody>
let tabla = document.createElement("table");
let tblBody = document.createElement("tbody");

// Declaro variables para DOM
let cantidadInput = document.getElementById("formCantidad")
let exc = document.getElementById("exchange")
let imprimir = document.getElementById("imprimir")
let correo = document.getElementById("correo")

// Obtener cantidad del LS
let cantidad = localStorage.getItem("cantidad");
cantidadInput.value = cantidad && cantidad > 0 ? cantidad : "";

// Verificar errores al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  if (cantidad && cantidad <= 0) {
    cantidadInput.value = "";
    Toastify({
      text: "La cantidad debe ser mayor a cero",
      duration: 2000,
      gravity: "top",
      position: "center",
    }).showToast();
  }
});

// Guardo cantidad en LS
cantidadInput.addEventListener("change", () => {
  let cantidad = cantidadInput.value;
  localStorage.setItem("cantidad", cantidad > 0 ? cantidad : "");
  generarTabla();
});

// Función para generar la tabla
const generarTabla = () => {
  let cantidad = cantidadInput.value;

  tblBody.innerHTML = "";

  // encabezados de columna
  let encabezadosColumna = document.createElement("tr");
  let encabezadoVacio = document.createElement("th");
  encabezadosColumna.appendChild(encabezadoVacio);

  for (let i = 0; i < moneda.length; i++) {
    let encabezadoColumna = document.createElement("th");
    let textoEncabezadoColumna = document.createTextNode(moneda[i].nombre);
    encabezadoColumna.appendChild(textoEncabezadoColumna);
    encabezadosColumna.appendChild(encabezadoColumna);
  }

  tblBody.appendChild(encabezadosColumna);

  // filas y celdas de la tabla
  for (let i = 0; i < moneda.length; i++) {
    let fila = document.createElement("tr");

    // encabezado de fila
    let encabezadoFila = document.createElement("th");
    let textoEncabezadoFila = document.createTextNode(moneda[i].nombre);
    encabezadoFila.appendChild(textoEncabezadoFila);
    fila.appendChild(encabezadoFila);

    for (let j = 0; j < moneda.length; j++) {
      let conversion = cantidad * (moneda[i].compra / moneda[j].compra);

      // Verificar si el valor es entero
      if (Number.isInteger(conversion)) {
        conversion = conversion.toFixed(0);
      } else {
        conversion = conversion.toFixed(3).replace(/\.?0+$/, "");
      }

      // Crear una celda
      let celda = document.createElement("td");
      let textoCelda = document.createTextNode(conversion);
      celda.appendChild(textoCelda);
      fila.appendChild(celda);
    }

    tblBody.appendChild(fila);
  }

  // Agregar el <tbody> a la tabla
  tabla.appendChild(tblBody);

  // Limpiar el contenedor de la tabla
  exc.innerHTML = "";

  // Agregar la clase de Bootstrap a la tabla
  tabla.classList.add("table", "table-bordered");

  // Agregar la tabla al contenedor
  exc.appendChild(tabla);
};

// function printDiv(divName) {
//   let printContents = document.getElementById(divName).innerHTML;
//   let originalContents = document.body.innerHTML;
//   document.body.innerHTML = printContents;
//   window.print();
//   document.body.innerHTML = originalContents;
// }

// Eventos
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  cantidadInput.value > 0
    ? generarTabla()
    : Toastify({
        text: "La cantidad debe ser mayor a cero",
        duration: 2000,
        gravity: "top",
        position: "center",
      }).showToast();
});

cantidadInput.addEventListener("change", generarTabla);

imprimir.addEventListener("click", () => {
  exc.innerHTML != ""
    ? window.print() //printDiv(contenedor)
    : Toastify({
        text: "Debe ingresar una Cantidad",
        duration: 2000,
        gravity: "top",
        position: "center",
      }).showToast();
});

correo.addEventListener("click", () =>{
  exc.innerHTML != ""
  ? Swal.fire({
      title:"Inicio de Sesión",
      html:`<input type="text" id="usuario" class="swal12-input" placeholder="Usuario">
            <input type="password" id="password" class="swal12-input" placeholder="Password">`,
      confirmButtonText: "Enviar",
      showCancelButton:true,
      cancelButtonText:"Cancelar",
  }).then((result)=>{
      if(result.isConfirmed){
        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        //si quiero enviarte a otra pagina:
        if (usuario === usuarioAutorizado && password == passwordAutorizado){
          window.location.href = "../pages/login.html";
        }
      }
  })
  : Toastify({
    text: "Debe ingresar una Cantidad",
    duration: 2000,
    gravity: "top",
    position: "center",
  }).showToast();   
})