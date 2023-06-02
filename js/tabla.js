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
//exc.innerHTML = "";

// Función para generar la tabla
const generarTabla = () => {

  let cantidad = cantidadInput.value;

  if (cantidadInput.value > 0) {

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
  } else {
    // Mostrar mensaje de error si la cantidad no es mayor que cero
    exc.innerHTML = "La cantidad debe ser mayor que cero.";
  }
};

// Asignar el evento onchange al input de cantidad
cantidadInput.addEventListener("change", generarTabla);
