let moneda = [];

fetch ("../js/monedas.json")
    .then (response => response.json())
    .then (data => {
        moneda = data;
        mostrarMonedas();
    })
    .catch(error => {
      console.error("Error al obtener los datos del archivo JSON", error);
    })

//Obtenemos la referencia del elemento body
let body = document.getElementsByTagName("body")[0];

// Creamos un elemento <table> y un elemento <tbody>
let tabla = document.createElement("table");
let tblBody = document.createElement("tbody");

// Declaro variables para DOM
let cantidadInput = document.getElementById("formCantidad")
let exc = document.getElementById("exchange")
let print = document.getElementById("print")
let mail = document.getElementById("mail")
//exc.innerHTML = "";

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

// Eventos
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  cantidadInput.value > 0 ? generarTabla() : Toastify({
    text: "La cantidad debe ser mayor a cero",
    duration: 2000,
    gravity: "top",
    position: "center",
  }).showToast();
});

cantidadInput.addEventListener("change", generarTabla);

print.addEventListener("click", () =>{
  exc.innerHTML != "" ? window.print() : Toastify({
    text: "Debe ingresar una Cantidad",
    duration: 2000,
    gravity: "top",
    position: "center",
  }).showToast();   
})

mail.addEventListener("click", () =>{
  exc.innerHTML != ""
  // ? {const swalWithBootstrapButtons = Swal.mixin({
  //   customClass: {
  //     confirmButton: 'btn btn-success',
  //     cancelButton: 'btn btn-danger'
  //   },
  //   buttonsStyling: false
  // })
  
  // swalWithBootstrapButtons.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'No, cancel!',
  //   reverseButtons: true
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     swalWithBootstrapButtons.fire(
  //       'Deleted!',
  //       'Your file has been deleted.',
  //       'success'
  //     )
  //   } else if (
  //     /* Read more about handling dismissals below */
  //     result.dismiss === Swal.DismissReason.cancel
  //   ) {
  //     swalWithBootstrapButtons.fire(
  //       'Cancelled',
  //       'Your imaginary file is safe :)',
  //       'error'
  //     )
  //   }
  // })}
    ? Swal.fire({
        title: "Enviar Mail",
        text: "Estas Registrado?",
        icon:"question",
        reverseButtons: true,
        showCancelButton: true,
        confirmButtontext:"Si, estoy registrado",
        cancelButtontext:"No, estoy registrado",
        background: "#5d7da0",
        color:"white",
        // backdrop: "#b7950b",
        backdropfilter: blur(1),
      }).then((result)=>{
        result.isConfirmed ? Swal.Fire("login","","success") : Swal.Fire("Registrate","","info")
      })
    : Toastify({
        text: "Debe ingresar una Cantidad",
        duration: 2000,
        gravity: "top",
        position: "center",
      }).showToast();   
})