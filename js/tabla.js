class Monedas {
  constructor(id, nombre, signo, compra, venta) {
    this.id  = parseInt(id);
    this.nombre  = nombre.toUpperCase();
    this.signo = signo.toUpperCase();
    this.compra  = parseFloat(compra);
    this.venta  = parseFloat(venta);
  }
}

//Declaramos un array de Monedas para almacenar
const moneda = [];
moneda.push(new Monedas (1, "Pesos", "ar$", 1, 1));
moneda.push(new Monedas (2, "Dolar", "u$s", 210.82, 211.22));
moneda.push(new Monedas (3, "Euros", "€", 229.5830, 230.5466));
moneda.push(new Monedas (4, "Uruguayos", "$u", 4.21, 4.41));
moneda.push(new Monedas (5, "Reales", "r$", 41.15, 43.75));

//Obtenemos la referencia del elemento body
let body = document.getElementsByTagName("body")[0];

// Creamos un elemento <table> y un elemento <tbody>
let tabla = document.createElement("table");
let tblBody = document.createElement("tbody");

// Declaro variables para DOM
let cantidadInput = document.getElementById("formCantidad")
let exc = document.getElementById("exchange")
exc.innerHTML = "";

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
// if (cantidadInput.value > 0) {
  cantidadInput.addEventListener("change", generarTabla);
// } else {
//   // Limpiar el contenedor de la tabla
//   //exc.innerHTML = "";

//   exc.innerHTML = "la cantidad debe ser mayor que cero";
// }

// // Creamos las celdas
// cantidadInput.onchange = (e) => {
//   e.preventDefault();
  
//   if (cantidadInput.value > 0) {
//     for (let i = 0; i < moneda.length; i++) {
      
//       // Creamos las hileras de la tabla
//       let fila = document.createElement("tr");
//       for (let j = 0; j < moneda.length; j++) {
      
//         // Crea un elemento <td> y un nodo de texto, hace que el nodo de
//         // texto sea el contenido de <td>, ubica el elemento <td> al final
//         // de la hilera de la tabla
//         let celda = document.createElement("td");
//         let textoCelda = document.createTextNode(" | "+(cantidadInput.value * (moneda[i].compra / moneda[j].compra)).toFixed(3)+" ");
        
//         celda.appendChild(textoCelda);
//         fila.appendChild(celda);
//       }
//       // agregamos la hilera al final de la tabla (al final del elemento tblbody)
//       tblBody.appendChild(fila);
//     }
//     // posicionamos el <tbody> debajo del elemento <table>
//     tabla.appendChild(tblBody);
//     // appends <table> into <body>
//     body.appendChild(tabla);
//     // modifica el atributo "border" de la tabla y lo fija a "2";
//     tabla.setAttribute("border", 1);
//     tabla.setAttribute("id", "tabla");
//     // let result = document.getElementById("exc");
    
//     exc.appendChild(tabla);

//   } else { exc.innerHTML = "la cantidad debe ser mayor que cero" }
  
// };

