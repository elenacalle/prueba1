// ============================================
// SCRIPT.JS - Lógica del Formulario Principal
// ============================================

// ⚠️ IMPORTANTE: Reemplaza esta URL con la tuya después de desplegar el Apps Script
const APPS_SCRIPT_URL = "TU_URL_DE_APPS_SCRIPT_AQUI";

// Obtener referencias a los elementos del DOM
const formulario = document.getElementById('formulario');
const btnGenerarQR = document.getElementById('btnGenerarQR');
const mensajeError = document.getElementById('mensajeError');
const mensajeExito = document.getElementById('mensajeExito');

// Obtener referencias a los campos del formulario
const inputNombre = document.getElementById('nombre');
const inputCI = document.getElementById('ci');
const inputCorreo = document.getElementById('correo');
const inputCelular = document.getElementById('celular');
const inputCantidadBoletos = document.getElementById('cantidadBoletos');

// ============================================
// 1. VALIDAR DATOS DEL FORMULARIO
// ============================================
/**
 * Función para validar que todos los campos estén completos
 * @returns {boolean} true si todos los campos son válidos
 */
function validarFormulario() {
    // Obtener los valores actuales
    const nombre = inputNombre.value.trim();
    const ci = inputCI.value.trim();
    const correo = inputCorreo.value.trim();
    const celular = inputCelular.value.trim();
    const cantidadBoletos = inputCantidadBoletos.value.trim();

    // Validar que no estén vacíos
    if (!nombre || !ci || !correo || !celular || !cantidadBoletos) {
        mostrarError('Por favor completa todos los campos');
        return false;
    }

    // Validar que el correo sea válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        mostrarError('Por favor ingresa un correo válido');
        return false;
    }

    // Validar que CI sea solo números
    const regexCI = /^\d+$/;
    if (!regexCI.test(ci)) {
        mostrarError('La CI debe contener solo números');
        return false;
    }

    // Validar que cantidad sea número positivo
    const cantidad = parseInt(cantidadBoletos);
    if (isNaN(cantidad) || cantidad < 1) {
        mostrarError('La cantidad debe ser al menos 1 boleto');
        return false;
    }

    // Si llegamos aquí, todo es válido
    return true;
}

// ============================================
// 2. MOSTRAR MENSAJES AL USUARIO
// ============================================
/**
 * Función para mostrar mensaje de error
 * @param {string} mensaje - El mensaje a mostrar
 */
function mostrarError(mensaje) {
    mensajeError.textContent = '❌ ' + mensaje;
    mensajeError.style.display = 'block';
    mensajeExito.style.display = 'none';
    
    // Auto-ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 5000);
}

/**
 * Función para mostrar mensaje de éxito
 * @param {string} mensaje - El mensaje a mostrar
 */
function mostrarExito(mensaje) {
    mensajeExito.textContent = '✅ ' + mensaje;
    mensajeExito.style.display = 'block';
    mensajeError.style.display = 'none';
}

// ============================================
// 3. GUARDAR DATOS EN GOOGLE SHEETS Y LOCALSTORAGE
// ============================================
/**
 * Función para guardar los datos en Google Sheets mediante Apps Script
 * y también en localStorage como respaldo
 */
async function guardarDatos() {
    const datos = {
        nombre: inputNombre.value.trim(),
        ci: inputCI.value.trim(),
        correo: inputCorreo.value.trim(),
        celular: inputCelular.value.trim(),
        cantidadBoletos: inputCantidadBoletos.value.trim(),
        timestamp: new Date().toLocaleString()
    };

    // Guardar en localStorage como respaldo
    localStorage.setItem('datosEstudiante', JSON.stringify(datos));

    // Enviar a Google Sheets si la URL está configurada
    if (APPS_SCRIPT_URL !== "https://script.google.com/macros/s/AKfycby1PpcatXryHgTGUJ5Pdcp0CRBQmGNBcsVYyNYke__LRrQ92cwks93IW5LyRuyG1FY3/exec") {
        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(datos)
            });

            const resultado = await response.json();

            if (!resultado.success) {
                console.warn('⚠️ Error al guardar en Google Sheets:', resultado.message);
                // Continuamos de todas formas
            } else {
                console.log('✅ Datos guardados en Google Sheets');
            }
        } catch (error) {
            console.warn('⚠️ No se pudo conectar con Google Sheets:', error);
            // Continuamos de todas formas, los datos están en localStorage
        }
    } else {
        console.warn('⚠️ URL de Apps Script no configurada. Configura APPS_SCRIPT_URL en script.js');
    }

    return datos;
}

// ============================================
// 4. ABRIR PÁGINA DE QR
// ============================================
/**
 * Función para generar QR y abrir la segunda página
 */
async function generarQR() {
    // Validar que el formulario sea correcto
    if (!validarFormulario()) {
        return;
    }

    // Guardar datos en Google Sheets y localStorage
    const datos = await guardarDatos();

    // Mostrar mensaje de éxito
    mostrarExito('✅ Datos validados. Abriendo página de pago...');

    // Esperar 1 segundo y luego abrir la página del QR de pago
    setTimeout(() => {
        // Abrir qr.html en una nueva pestaña
        window.open('qr.html', '_blank');
    }, 1000);
}

// ============================================
// 5. EVENT LISTENERS
// ============================================
// Escuchar el click en el botón "Generar QR"
btnGenerarQR.addEventListener('click', generarQR);

// Permitir generar QR presionando Enter en el último campo
inputSeccion.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        generarQR();
    }
});

// Validación en tiempo real (opcional)
inputCorreo.addEventListener('blur', function() {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !regexCorreo.test(this.value)) {
        this.style.borderColor = '#ff6b6b';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// ============================================
// Mensaje de bienvenida en la consola
// ============================================
console.log('✅ script.js cargado correctamente');
console.log('El formulario está listo para usar');
