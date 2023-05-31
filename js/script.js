let percep = asignarOperacion("percepcion")
let imp = asignarOperacion("imppais")

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


// Declaro variables para DOM
let cantidadInput = document.getElementById("formCantidad")
let divisa1Select = document.getElementById("formDivisas1")
let divisa2Select = document.getElementById("formDivisas2")
let boton = document.getElementById("formBtn")
let exc = document.getElementById("exchange")


// Acá llamo a la función que esta mas abajo
mostrarMonedas()


// ver lo almacenado en LS y cargue la ultima cantidad si existe
let cantidadLS = localStorage.getItem("cantidad");
let divisa1LS = localStorage.getItem("divisa1");
let divisa2LS = localStorage.getItem("divisa2");

if (cantidadLS && divisa1LS && divisa2LS) {
  cantidadInput.value = cantidadLS;
  divisa1Select.value = divisa1LS;
  divisa2Select.value = divisa2LS;
}

// Eventos
boton.addEventListener("click", function () {
  
  let temp = divisa1Select.value
  divisa1Select.value = divisa2Select.value
  divisa2Select.value = temp
  
  //Guardar el valor de la cantidad ingresada y las divisas seleccionadas
  let cantidad = cantidadInput.value;
  let divisa1 = divisa1Select.options[divisa1Select.selectedIndex].text;
  let divisa2 = divisa2Select.options[divisa2Select.selectedIndex].text;
  
  // Guardar la cantidad y las divisas en localStorage
  localStorage.setItem("cantidad", cantidad);
  localStorage.setItem("divisa1", divisa1);
  localStorage.setItem("divisa2", divisa2);
  
  calcular(divisa1Select, divisa2Select);

});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if(cantidadInput.value > 0){
    calcular (divisa1Select, divisa2Select);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
  
});

cantidadInput.onchange = () => {
  if(cantidadInput.value > 0){
    calcular (divisa1Select, divisa2Select);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
};

divisa1Select.onchange = () => {
  if (cantidadInput.value > 0) {
    calcular(divisa1Select, divisa2Select);
  } else { exc.innerHTML = "la cantidad debe ser mayor que cero" }
};

divisa2Select.onchange = () => {
  if (cantidadInput.value > 0) {
    calcular(divisa1Select, divisa2Select);
  } else { exc.innerHTML = "la cantidad debe ser mayor que cero" }
}

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
    
  if (divisa1Select.text != "Pesos") {
    exc.innerHTML = `<p> ${cantidadInput.value} ${divisa1.text}<strong> = ${(resultado).toFixed(4).replace(/\.?0+$/, "")}</strong> ${divisa2.text}</p>`
  } else {
    exc.innerHTML = `<p> El Cambio es ${divisa1.text}<strong>${(resultado).toFixed(4).replace(/\.?0+$/, "")}</strong>${divisa2.text}. Recuerde agregar los Impuestos sobre la operacion:</p> <p> 35% de Percepcion RG4815/20 son $ ${percep(cantidad).toFixed(2)}</p> <p> 30% de Impuesto Pais son $ ${imp(cantidad).toFixed(2)}</p>`
  }
};

// Funciones
function mostrarMonedas() {
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.name = moneda.nombre
    option.value = moneda.compra
    divisa1Select.appendChild(option)
  })
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.name = moneda.nombre
    option.value = moneda.compra
    divisa2Select.appendChild(option)
  })
}

//selected
function respuestaClick() {
  if (cantidadInput.value > 0) {
    let temp = divisa1Select.value
    divisa1Select.value = divisa2Select.value
    divisa2Select.value = temp
    //calcular(divisa1Select, divisa2Select);
  } else {
    exc.innerHTML = "La cantidad debe ser mayor que cero"
  }
}


function asignarOperacion(op) {
  if (op === "percepcion") {
    return (monto) => monto *= 0.35
  } else if (op === "imppais") {
    return (monto) => monto *= 0.30
  }
}

