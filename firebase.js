// firebase.js

// 1. Importar las funciones necesarias del SDK modular de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// 2. Configuración de tu proyecto (¡Reemplaza esto con tus credenciales!)
const firebaseConfig = {
  apiKey: "AIzaSyCSBqVTDBzEzZ1YyPD1oKHfmoMw4H-O9LI",
  authDomain: "casa-domotica-335a5.firebaseapp.com",
  databaseURL: "https://casa-domotica-335a5-default-rtdb.firebaseio.com",
  projectId: "casa-domotica-335a5",
  storageBucket: "casa-domotica-335a5.firebasestorage.app",
  messagingSenderId: "830527054713",
  appId: "1:830527054713:web:694ca9b3cd8460808e05a8"
};

// 3. Inicializar Firebase y la Base de Datos
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 4. Funciones exportadas (Nuestro contrato con index.html)

/**
 * Escucha los cambios en el nodo "sensores" en tiempo real.
 * @param {function} callback - Función que se ejecutará cada vez que lleguen datos desde la ESP32.
 */
export function escucharSensores(callback) {
    const sensoresRef = ref(database, 'sensores');
    onValue(sensoresRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

/**
 * Envía un comando a un actuador específico en Firebase.
 * @param {string} idActuador - El identificador del actuador (ej. "rele_luces").
 * @param {any} valor - El estado a enviar (ej. true, false, 180).
 */
export function actualizarActuador(idActuador, valor) {
    const actuadorRef = ref(database, 'actuadores/' + idActuador);
    set(actuadorRef, { estado: valor })
        .then(() => console.log(`Comando enviado a BD: ${idActuador} -> ${valor}`))
        .catch((error) => console.error("Error al enviar comando:", error));
}