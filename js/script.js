let cotizacionD = 0
let cotizacionP = 0
let compro = 0
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
let formulario = document.getElementsByName("form")
let cantidad = document.getElementById("formCantidad")
let divisa1 = document.getElementById("formDivisas1")
let boton = document.getElementById("formBtn")
let divisa2 = document.getElementById("formDivisas2")

//Defino los Eventos de Boton
boton.addEventListener('click', respuestaClick)

// Con esto capturo el div del html donde se van a mostrar la convesion de divisas  (puede ser por el ID, class, name)
let contenedor = document.getElementById("contenedor");

// Acá llamo a la función que esta mas abajo
mostrar(moneda);

// functions
function respuestaClick(){
  temp=divisa1.value
  divisa1.value=divisa2.value
  divisa2.value=temp
}
function validar(){
  if(cantidad.value > 0){
    respuestaClick()
    mostrar ()
  }else{contenedor.innerHTML ="la cantidad debe ser mayor que cero"}
}

function mostrar(moneda) {
  cantidad.onchange=()=>{contenedor.innerHTML = `<p>${cantidad.value} ${divisa1.value} - calcular(divisa1,divisa2) ${divisa2.value} </p>`}
  
  // contenedor.innerHTML = "";
  // for (const money of moneda) {
  //   let contenedorBody = document.createElement("div");
  //   //contenedorBody.className = "col-lg-6";
  //   compro = money.compra;
  //   contenedorBody.innerHTML = `
  //   <div class="conversion">
  //     <div class="conversion-from">
  //       <p class="conversion-from-text">"Compra "+cotizarD(monto)+" "+money.nombre+"con $"+monto+"\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $ "+percep(monto)+"\n 30% de Impuesto Pais son $"+imp(monto)"
  //       </p>
  //       <!--Compra cotizarD(monto) money.nombre con $monto\n recuerde agregar los Impuestos sobre la operacion:\n 35% de Percepcion RG4815/20 son $percep(monto)\n 30% de Impuesto Pais son $ {imp(monto)}-->
  //     </div>
  //   </div>
  //   <div class="conversion-to">
  //     <p class="precio"><strong> - ${cotizo(divisa1.value,divisa2.value).toFixed(2)}</strong></p>  
  //   </div>`;         
  //   contenedor.append(contenedorBody);
  // }
}

function cotizarD(monto) {
     return monto/=compro
}
function cotizarP(monto) {
    return monto*=compro
}
function asignarOperacion(op) {
    if (op == "percepcion") {
        return (monto) => monto*=0.35
    } else if (op == "imppais") {
        return (monto) => monto*=0.30
    }
}