// Declaración de variables
let moneda = [];

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
const exc = document.getElementById("exchange");

// Cargar los valores almacenados en localStorage
let cantidadLS = localStorage.getItem("cantidad");
let divisa1LS = localStorage.getItem("divisa1");
let divisa2LS = localStorage.getItem("divisa2");

if (cantidadLS && divisa1LS && divisa2LS) {
  cantidadInput.value = cantidadLS;
  divisa1Select.value = divisa1LS; console.log("si Paso1");
  divisa2Select.value = divisa2LS; console.log("si Paso2");
}

// Eventos
boton.addEventListener("click", function () {
  let temp = divisa1Select.value;
  divisa1Select.value = divisa2Select.value;
  divisa2Select.value = temp;
  calcular(divisa1Select, divisa2Select);
});
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  cantidadInput.value > 0 ? calcular(divisa1Select, divisa2Select) : Toastify({
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
      position: "center",
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