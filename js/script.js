// let cotizacionD = 0
// let cotizacionP = 0
// let compro = 0
// let percep = asignarOperacion("percepcion")
// let imp = asignarOperacion("imppais")

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
let formulario = document.getElementsByName("form")
let cantidad = document.getElementById("formCantidad")
let divisa1 = document.getElementById("formDivisas1")
let divisa2 = document.getElementById("formDivisas2")
let boton = document.getElementById("formBtn")
let exc = document.getElementById("exchange");
let exc1 = document.getElementById("exchange");
let exc2 = document.getElementById("exchange");

// Acá llamo a la función que esta mas abajo
mostrarMonedas()

// Funciones
function mostrarMonedas(){
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.value = moneda.compra
    const nameD1 = moneda.nombre
    divisa1.appendChild(option)
  })
  moneda.forEach((moneda) => {
    const option = document.createElement("option")
    option.text = moneda.nombre
    option.value = moneda.compra
    const nameD2 = moneda.nombre
    divisa2.appendChild(option)
  })
}
 
cantidad.onchange = (e) => {
  e.preventDefault();
  console.log("change cantidad");
  calcular(divisa1, divisa2);
}

divisa1.onchange = (e) => {
  e.preventDefault();
  console.log("change div1");
  calcular(divisa1, divisa2);
  if (divisa1.text == "Pesos") {
    exc.innerHTML = `<p> El Cambio es <strong>${resultado.toFixed(4)}</strong>\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $ ${percep(cantidad.value)}\n 30% de Impuesto Pais son $ ${imp(cantidad.value)}</p>`;
  }
}

divisa2.onchange = (e) => {
  e.preventDefault();
  console.log("change div2");
  calcular(divisa1, divisa2);
}

const calcular = (divisa1, divisa2) => {
  console.log("calculo");
  let resultado = cantidad.value * (divisa1.value / divisa2.value);
  console.log(divisa1.text)
  console.log(divisa2.text)
  exc.innerHTML = `<p> El Cambio ${cantidad.value} ${divisa1.text} es <strong>${resultado.toFixed(4)} ${divisa2.text}</strong></p>`;
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

// Con esto capturo el div del html donde se van a mostrar la convesion de divisas  (puede ser por el ID, class, name)
let contenedor = document.getElementById("contenedor");




// functions
function respuestaClick(){
  temp=divisa1.value
  divisa1.value=divisa2.value
  divisa2.value=temp
  calcular(divisa1,divisa2)
}

function validar(){
  if(cantidad.value > 0){
    respuestaClick()
    mostrar ()
  }else{contenedor.innerHTML ="la cantidad debe ser mayor que cero"}
}

//   // for (const money of moneda) {
//   //   compro = money.compra;
//   //   alert("Compra "+cotizarD1(cantidad.value)+" "+money.nombre+" con $"+monto+"\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $"+percep(cantidad.value)+"\n 30% de Impuesto Pais son $"+imp(cantidad.value));
//   // }

  
//   // const resultado =cantidad*(moneda.find((moneda) => (moneda.nombre == divisa1.value.toUpperCase()))/moneda.find((moneda) => (moneda.nombre == divisa2.value.toUpperCase())))
//   // monto=cantidad*resultado.compra
//   // return(`El Signo para ${resultado.nombre} es ${resultado.signo}.`)
//   // "Compra "+cotizarD(monto)+" "+resultado.nombre+" con $"+monto+"\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $"+percep(monto)+"\n 30% de Impuesto Pais son $"+imp(monto)
//   // //             }
//   //   return monto*=compro
// }


function asignarOperacion(op) {
    if (op == "percepcion") {
        return (monto) => monto*=0.35
    } else if (op == "imppais") {
        return (monto) => monto*=0.30
    }
}