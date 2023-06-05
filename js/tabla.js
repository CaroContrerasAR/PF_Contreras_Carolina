let usuarioAutorizado = "admin";
let passwordAutorizado = 1234;
let registrado = false;
let loginContainer = null; 

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

function esUsuarioRegistrado() {
  const usuario = localStorage.getItem("usuario");
  const password = localStorage.getItem("password");
  return usuario === usuarioAutorizado && password === passwordAutorizado;
}

// function printDiv(divName) {
//   let printContents = document.getElementById(divName).innerHTML;
//   let originalContents = document.body.innerHTML;
//   document.body.innerHTML = printContents;
//   window.print();
//   document.body.innerHTML = originalContents;
// }


// Eventos
// document.getElementById("form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   cantidadInput.value > 0
//     ? generarTabla()
//     : Toastify({
//         text: "La cantidad debe ser mayor a cero",
//         duration: 2000,
//         gravity: "top",
//         position: "center",
//       }).showToast();
// });

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


//   // Configurar el evento de clic para el botón de cerrar sesión
//   const logoutBtn = document.getElementById("logout-btn");
//   logoutBtn.addEventListener("click", () => {
//     // Borrar el contenido del login
//     loginContainer.innerHTML = `<p>Hola...</p>`;
//     registrado = false;
//     localStorage.removeItem("loguin");
//   });
// }

correo.addEventListener("click", () => {
  if (exc.innerHTML !== "" && cantidad > 0) {
    if (registrado) {
      enviarInfo();
    } else {
      Swal.fire({
        title: "Registro",
        html: `<input type="text" id="nombre" class="swal12-input" placeholder="Nombre">
              <input type="email" id="email" class="swal12-input" placeholder="Email">`,
        confirmButtonText: "Registrarse",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          let nombre = document.getElementById("nombre").value;
          let email = document.getElementById("email").value;

          // Guardar los datos del usuario en el localStorage
          localStorage.setItem("login", JSON.stringify({ nombre, email }));

          Swal.fire({
            title: "¡Registro exitoso!",
            text: `Hola, ${email}`,
            icon: "success",
          });

          mostrarLogin(email);
          registrado = true;
        }
      });
    }
  } else {
    Toastify({
      text: "Debe ingresar una Cantidad",
      duration: 2000,
      gravity: "top",
      position: "center",
    }).showToast();
  }
});

function realizarLogin() {
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  if (usuario === usuarioAutorizado && password === passwordAutorizado) {
    Swal.fire({
      title: "¡Bienvenido!",
      text: `Hola, ${usuario}`,
      icon: "success",
    });

    mostrarLogin(usuario);
    registrado = true;

    enviarInfo();
  } else {
    Swal.fire({
      title: "Acceso denegado",
      text: "Las credenciales son incorrectas",
      icon: "error",
    });
  }
}

function mostrarLogin(usuario) {
  const loginContainer = document.getElementById("login-container");

  // Mostrar el formulario de inicio de sesión
  loginContainer.innerHTML = `
    <small>Hola, ${usuario}
    <button id="logout-btn" class="btn btn-swap">Logout</button>
    </small>`;

  localStorage.setItem("login", JSON.stringify({ nombre, email }));
  
  // Mostrar el mensaje de "enviado" utilizando SweetAlert
  Swal.fire({
    title: "¡Mensaje enviado!",
    text: "Tu mensaje ha sido enviado correctamente.",
    icon: "success",
  });

  // Configurar el evento de clic para el botón de cerrar sesión
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    // Borrar el contenido del login
    loginContainer.innerHTML = `<p>Hola...</p>`;
    registrado = false;
    localStorage.removeItem("login");
  });
}

// Verificar si hay datos de inicio de sesión guardados en el localStorage
const savedLogin = localStorage.getItem("login");
if (savedLogin) {
  const { nombre, email } = JSON.parse(savedLogin);
  mostrarLogin(email);
  registrado = true;
}

cantidadInput.addEventListener("change", (event) => {
  if (!registrado) {
    cantidad = event.target.value;
    localStorage.setItem("cantidad", cantidad);
  }
});

function enviarInfo() {
  if (cantidad) {
    Swal.fire({
      title: "Información enviada",
      text: `Cantidad: ${cantidad}`,
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Debe ingresar una cantidad",
      icon: "error",
    });
  }
}


// if (localStorage.getItem('usuario')){  
//   const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//           confirmButton: 'btn btn-success',
//           cancelButton: 'btn btn-danger'
//       },
//       buttonsStyling: true
//   })

//       swalWithBootstrapButtons
//       .fire({
//           title: 'Datos de usuario almacenados',
//           text: "¿Desea que le enviemos lo ultimo consultado?",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Si, por favor!',
//           cancelButtonText: 'No, gracias!',
//           reverseButtons: true
//       })
//       .then((result) => {
//           if (result.isConfirmed) {
//               swalWithBootstrapButtons.fire(
//                   'Excelente!',
//                   'Mail Enviado !!',
//                   'success'
//               )
//               let usuario = JSON.parse(localStorage.getItem("usuario"));
//               document.getElementById("formNombre").value = usuario.nombre;
//               document.getElementById("formEmail").value = usuario.email;
//               controln=1;
//               controle=1;
//           } else if (
//               /* Read more about handling dismissals below */
//               result.dismiss === Swal.DismissReason.cancel
//           ) {
//               swalWithBootstrapButtons.fire(
//                   'Excelente',
//                   'Ya puede continuar ingresando nuevos datos',
//                   'success'
//               )
//               localStorage.removeItem('usuario');
//           }
//       })
//   }

// //Control de datos de ingresados

// document.getElementById("formApellido").onchange = function() {myFunctionApellido()};
// function myFunctionApellido() {
//   if (apellido.value == null || apellido.value.length == 0 || /^\s+$/.test(apellido.value)){
//       Swal.fire('Ingrese una APELLIDO valido');
//       apellido.value=""
//       controlap=0;
//   }
//   else {
//       controlap=1;
//   }
// }

// document.getElementById("formNombre").onchange = function() {myFunctionNombre()};
// function myFunctionNombre() {
//   if (nombre.value == null || nombre.value.length == 0 || /^\s+$/.test(nombre.value)){
//       Swal.fire('Ingrese una NOMBRE valido');
//       nombre.value=""
//       controln=0;
//   }
//   else {
//       controln=1;
//   }
// }

// document.getElementById("formEmail").onchange = function() {myFunctionEmail()};
// function myFunctionEmail() {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value)){
//       controle=1;
//   }
//   else {
//       Swal.fire('Ingrese una EMAIL Valido');
//       email.value=""
//       controle=0;
//   }
// }


// function X () {
//   if (cantidad.value<1){
//       Swal.fire('Ingrese una CANTIDAD Valida');
//       return; 
//   }
//   if (controln==0 || controle==0 == "-- Seleccionar --"){
//       Swal.fire('Complete todos los datos');
//       return;
//   }

//   let usuario = {nombre:nombre.value , email:email.value};
//   const enJSON = JSON.stringify(usuario);
//   localStorage.setItem("datoscliente", enJSON);
// }