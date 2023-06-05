// Declaración de variables
let moneda = [];
const conversiones = [];

//armar un array con las conversiones guardadas en LS
class Cambios {
  constructor(id, divi1, unidades, divi2, resultado){
      this.id = parseInt(id);
      this.divi1 = divi1.toUpperCase();
      this.unidades = parseFloat(unidades);
      this.divi2 = divi2.toUpperCase();
      this.resultado = parseFloat(resultado);
  }
}

// Obtener datos del archivo JSON
fetch("./js/monedas.json")
  .then(response => response.json())
  .then(data => {
    moneda = data;
    mostrarMonedas();
  })
  .catch(error => {
    console.error("Error al obtener los datos del archivo JSON:", error);
  });

// Función para mostrar las opciones de monedas en los select
function mostrarMonedas() {
  const divisa1Select = document.getElementById("formDivisas1");
  const divisa2Select = document.getElementById("formDivisas2");

  moneda.forEach((moneda) => {
    const option = document.createElement("option");
    option.text = moneda.nombre;
    option.name = moneda.nombre;
    option.value = moneda.compra;
    divisa1Select.appendChild(option);
  });
  moneda.forEach((moneda) => {
    const option = document.createElement("option");
    option.text = moneda.nombre;
    option.name = moneda.nombre;
    option.value = moneda.compra;
    divisa2Select.appendChild(option);
  });
}

// Variables DOM
const cantidadInput = document.getElementById("formCantidad");
const divisa1Select = document.getElementById("formDivisas1");
const divisa2Select = document.getElementById("formDivisas2");
const boton = document.getElementById("formBtn");
const boton2 = document.getElementById("formBtn2");
const exc = document.getElementById("exchange");

// Cargar los valores almacenados en localStorage
let cantidadLS = localStorage.getItem("cantidad");
let divisa1LS = localStorage.getItem("divisa1");
let divisa2LS = localStorage.getItem("divisa2");
let resultadoLS = localStorage.getItem("resultado");

if (cantidadLS && divisa1LS && divisa2LS && resultadoLS) {
  cantidadInput.value = cantidadLS;
  divisa1Select.value = divisa1LS;
  divisa2Select.value = divisa2LS;

  // Agregar los datos al array conversiones
  conversiones.push(new Cambios(conversiones.length, divisa1LS, cantidadLS, divisa2LS, resultadoLS));
}

// Eventos
boton.addEventListener("click", function () {
  let temp = divisa1Select.value;
  divisa1Select.value = divisa2Select.value;
  divisa2Select.value = temp;
  calcular(divisa1Select, divisa2Select);
});

boton2.addEventListener("click", mostrarConversiones);


document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  cantidadInput.value > 0 || cantidadInput.value != "" || cantidadInput.value != 0 ? calcular(divisa1Select, divisa2Select) : Toastify({
    text: "La cantidad debe ser mayor a cero",
    duration: 2000,
    gravity: "top",
    position: "center",
  }).showToast();
});
cantidadInput.onchange = () => calcular(divisa1Select, divisa2Select);

divisa1Select.onchange = () => calcular(divisa1Select, divisa2Select);

divisa2Select.onchange = () => calcular(divisa1Select, divisa2Select);

// Función para calcular la conversión
const calcular = (divisa1Select, divisa2Select) => {
  let cantidad = cantidadInput.value;
  let divisa1 = divisa1Select.options[divisa1Select.selectedIndex];
  let divisa2 = divisa2Select.options[divisa2Select.selectedIndex];
  let resultado = cantidad * (divisa1.value / divisa2.value);

  // Crear instancia de Cambios y agregarla a conversiones
  const conversion = new Cambios(
    conversiones.length,
    divisa1.text,
    cantidad,
    divisa2.text,
    resultado
  );
  conversiones.push(conversion);

  // Guardar en localStorage
  localStorage.setItem("cantidad", cantidad);
  localStorage.setItem("divisa1", divisa1.text);
  localStorage.setItem("divisa2", divisa2.text);
  localStorage.setItem("resultado", resultado);

  if (divisa1.text !== "PESOS" || divisa1.text === "PESOS" && divisa2.text === "PESOS" ) {
    exc.innerHTML = `<p>${cantidadInput.value} ${divisa1.text} <strong>= ${resultado.toFixed(4).replace(/\.?0+$/, "")} ${divisa2.text}</strong></p>`;
  } else {
    let percep = asignarOperacion("percepcion");
    let imp = asignarOperacion("imppais");
    let percepcion = percep(cantidad);
    let impuesto = imp(cantidad);
    exc.innerHTML = `<p>${cantidadInput.value} ${divisa1.text} <strong>= ${resultado.toFixed(4).replace(/\.?0+$/, "")} ${divisa2.text}</strong></p>`;
    Toastify({
      text: `En Argentina: Recuerde agregar los Impuestos sobre la operación:
             35% de Percepción RG4815/20 son $ ${percepcion.toFixed(2).replace(/\.?0+$/, "")}
             30% de Impuesto País son $ ${impuesto.toFixed(2).replace(/\.?0+$/, "")}`,
      duration: 2000,
      gravity: "top",
      position: "right",
    }).showToast();   
  }
};



// Función para asignar operaciones
function asignarOperacion(op) {
  if (op === "percepcion") {
    return monto => monto * 0.35;
  } else if (op === "imppais") {
    return monto => monto * 0.30;
  }
}

const modal = new bootstrap.Modal(document.getElementById("conversionesModal"));

modal.addEventListener("hidden.bs.modal", function () {
  // Restablecer el estado de la página aquí
  document.body.classList.remove("modal-open");
  const modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.parentNode.removeChild(modalBackdrop);
  }
});

function mostrarConversiones() {
  const tableBody = document.getElementById("conversionesTableBody");

  // Limpiar contenido anterior de la tabla
  tableBody.innerHTML = "";

  // Crear filas y celdas para cada conversión
  conversiones.forEach(conversion => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const divi1Cell = document.createElement("td");
    const unidadesCell = document.createElement("td");
    const divi2Cell = document.createElement("td");
    const resultadoCell = document.createElement("td");

    idCell.textContent = conversion.id;
    divi1Cell.textContent = conversion.divi1;
    unidadesCell.textContent = conversion.unidades;
    divi2Cell.textContent = conversion.divi2;
    resultadoCell.textContent = conversion.resultado.toFixed(4).replace(/\.?0+$/, "");

    //row.appendChild(idCell);
    row.appendChild(unidadesCell);
    row.appendChild(divi1Cell);
    row.appendChild(resultadoCell);
    row.appendChild(divi2Cell);
    
    tableBody.appendChild(row);
  });
}