// URL del servidor

const PORT = 3000;
const SERVER_URL = `http://localhost:${PORT}`;

// Maneja el evento 'submit' del formulario de inicio de sesión con id 'loginForm'
//Capturamos el form del dom dentro de una constante y trabajamos con el
const loginForm = document.getElementById("loginForm");

// Afectamos la accion submit del formulario a un evento addEvent...
// AEL carga con 2 parámetros el evento que escucha y la acción que se desencadena

// APLICANDO COOKIES
// Set cookie function
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Strict";
}
// Get cookie function
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


// Maneja el evento 'submit' del formulario de registro con id 'registerForm'

//Capturamos el form dentro de una constante
const registerForm = document.getElementById("registerForm");

//Agregamos un evento a la acción submit

registerForm.addEventListener("submit", function (event) {
  // Anulamos el comportamiento por defecto del botón submit
  event.preventDefault();

  //Capturamos del dom el usuario y el pass
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  // Objeto para configurar el fetch
  const options = {
    method: "POST",
    //POST realiza el envío de la info de manera oculta
    headers: {
      "Content-Type": "application/json",
      //declaración del contenido
    },
    body: JSON.stringify({ username, password }),
    //convertimos el objeto a json
  };

  //Petición asíncrona
  fetch(`${SERVER_URL}/auth/register`, options)
    .then((res) => {
      //Si no obtenemos respuesta...
      if (!res.ok) {
        throw new Error("Error al registrarse");
      }
      //Retornamos lo recibido desde el servidor
      return res.json();
    })
    .then((data) => {
      alert("Registro exitoso. Por favor, inicia sesión.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al registrarse");
    });
});

loginForm.addEventListener("submit", function (event) {
  // Anulamos el comportamiento por defecto del botón submit
  event.preventDefault();

  //Capturamos del dom el usuario y el pass
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Declaración del objeto que configura la solicitud HTTP
  // Este objeto carga con atributos de, método, la cabecera, y el body que
  // convertimos a json
  const options = {
    method: "POST",
    //POST realiza el envío de la info de manera oculta
    headers: {
      "Content-Type": "application/json",
      //declaración del contenido
    },
    body: JSON.stringify({ username, password }),
    //convertimos el objeto a json
  };

  // Petición asíncrona
  fetch(`${SERVER_URL}/auth/login`, options)
    .then((res) => {
      // Si no obtenemos respuesta...
      if (!res.ok) {
        throw new Error("Error al iniciar sesión");
      }
      //Retornamos lo recibido desde el servidor
      return res.json();
    })
    .then((data) => {
      // almacenamos el token en data y lo pasamos
      // al webstore
      // localStorage.setItem("token", data.token);
      setCookie("token", data.token, 1); // Almacenamos el token en la cookie
      alert("Inicio de sesión exitoso");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al iniciar sesión");
    });
});

// Maneja el evento 'click' del botón con id 'accessProtectedRouteBtn'

// Capturamos el botón de acceso restringido
const btn = document.getElementById("accessProtectedRouteBtn");

// Agregamos un evento al botón cuando escuche click
btn.addEventListener("click", function () {
  //Obtenemos el token del webstorage
  // const token = localStorage.getItem("token");

  const token = getCookie("token"); // Get token from cookie

  // Si no hay token...
  if (!token) {
    alert("Por favor, inicia sesión primero");
    return;
  }
  console.log(`Token: ${token}`);
  // Objeto para configurar el fetch
  const options = {
    // Método de obtención
    method: "GET",
    // Configuración del header que será enviado al servidor
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //Petición asíncrona
  fetch(`${SERVER_URL}/auth/protected`, options)
    .then((res) => {
    //Si no obtenemos respuesta
      if (!res.ok) {
        throw new Error("Error al acceder a la ruta protegida");
      }
      //Si hay respuesta retornamos lo que contesta el servidor
      return res.text();
    })
    .then((data) => {
        //Capturamos el div con id response
        //Para inyectar en ese espacio el texto recibido
      document.getElementById("response").innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al acceder a la ruta protegida");
    });
});