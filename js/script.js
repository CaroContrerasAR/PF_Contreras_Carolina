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
let cantidad = document.getElementById("formCantidad")
let divisa1 = document.getElementById("formDivisas1")
let divisa2 = document.getElementById("formDivisas2")
let boton = document.getElementById("formBtn")
let exc = document.getElementById("exchange");


// Acá llamo a la función que esta mas abajo
mostrarMonedas()



// Eventos
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if(cantidad.value > 0){
    calcular (divisa1, divisa2);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
  
})

cantidad.onchange = () => {
  if(cantidad.value > 0){
    calcular (divisa1, divisa2);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
}

divisa1.onchange = () => {
  if(cantidad.value > 0){
    calcular (divisa1, divisa2);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
  // if (divisa1.text == "Pesos") {
  //   exc.innerHTML = `<p> Cambio por <strong>${resultado.toFixed(4)}</strong>\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $ ${percep(cantidad.value)}\n 30% de Impuesto Pais son $ ${imp(cantidad.value)}</p>`;
  // }
}

divisa2.onchange = () => {
  if(cantidad.value > 0){
    calcular (divisa1, divisa2);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
}

const calcular = (divisa1, divisa2) => {
  console.log("calculo");
  let resultado = cantidad.value * (divisa1.value / divisa2.value);
  let nameD1 = divisa1.text;
  let nameD2 = divisa2.text;
  exc.innerHTML = `<p> Cambio ${cantidad.value} = <strong>${resultado.toFixed(4)} </strong></p>`;
}
//   if(divisa1.text!="Pesos"){
//   exc.innerHTML = `<p> El Cambio es <strong>${(resultado).toFixed(4)}</strong></p>`
//   }else{
//     exc.innerHTML = `<p> El Cambio es <strong>${(resultado).toFixed(4)}</strong>\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $ ${percep(cantidad.value)}\n 30% de Impuesto Pais son $ ${imp(cantidad.value)}</p>`
//   }
// }

//Defino los Eventos de Boton
boton.addEventListener('click', (e) =>{
  e.preventDefault();
  respuestaClick()})


// Funciones
function mostrarMonedas(){
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.name = moneda.nombre
    option.value = moneda.compra
    const nameD1 = moneda.nombre
    divisa1.appendChild(option)
  })
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.name = moneda.nombre
    option.value = moneda.compra
    const nameD2 = moneda.nombre
    divisa2.appendChild(option)
  })
}

function respuestaClick(){
  if(cantidad.value > 0){
    temp=divisa1.value
    divisa1.value=divisa2.value
    divisa2.value=temp
    calcular (divisa1, divisa2);
  }else{exc.innerHTML ="la cantidad debe ser mayor que cero"}
}


function asignarOperacion(op) {
    if (op == "percepcion") {
        return (monto) => monto*=0.35
    } else if (op == "imppais") {
        return (monto) => monto*=0.30
    }
}