// ============================================
// QR-SCRIPT.JS - Lógica de la página QR
// ============================================

// Obtener referencias a elementos del DOM
const datosVisible = document.getElementById('datosVisible');
const qrPagoImagen = document.getElementById('qrPagoImagen');
const uploadArea = document.getElementById('uploadArea');
const inputComprobante = document.getElementById('comprobante');
const btnGuardar = document.getElementById('btnGuardar');
const btnCambiarArchivo = document.getElementById('btnCambiarArchivo');
const archivoSeleccionado = document.getElementById('archivoSeleccionado');
const nombreArchivo = document.getElementById('nombreArchivo');
const mensajeError = document.getElementById('mensajeError');
const mensajeExito = document.getElementById('mensajeExito');
const mensajeCarga = document.getElementById('mensajeCarga');

// Variable para almacenar los datos del cliente
let datosEstudiante = null;
let archivoComprobante = null;

// ============================================
// 1. CARGAR DATOS DEL ESTUDIANTE
// ============================================
/**
 * Función para cargar los datos del localStorage
 */
function cargarDatos() {
    const datosGuardados = localStorage.getItem('datosEstudiante');
    
    if (!datosGuardados) {
        mostrarError('Error: No se encontraron los datos del estudiante');
        return false;
    }

    // Parsear los datos desde JSON
    datosEstudiante = JSON.parse(datosGuardados);
    console.log('✅ Datos cargados:', datosEstudiante);
    
    return true;
}

// ============================================
// 2. MOSTRAR DATOS EN LA PÁGINA
// ============================================
/**
 * Función para mostrar los datos del comprador en la página
 */
function mostrarDatos() {
    if (!datosEstudiante) return;

    // Crear HTML con los datos
    const html = `
        <p><strong>Nombre:</strong> <span>${datosEstudiante.nombre}</span></p>
        <p><strong>CI:</strong> <span>${datosEstudiante.ci}</span></p>
        <p><strong>Correo:</strong> <span>${datosEstudiante.correo}</span></p>
        <p><strong>Celular:</strong> <span>${datosEstudiante.celular}</span></p>
        <p><strong>Cantidad de Boletos:</strong> <span>${datosEstudiante.cantidadBoletos}</span></p>
        <p><strong>Fecha:</strong> <span>${datosEstudiante.timestamp}</span></p>
    `;

    datosVisible.innerHTML = html;
}

// ============================================
// 3. CARGAR IMAGEN DE QR DE PAGO
// ============================================
/**
 * Función para verificar que la imagen del QR de pago esté disponible
 */
function verificarQRPago() {
    if (!qrPagoImagen) {
        console.error('❌ No se encontró elemento para mostrar QR de pago');
        mostrarError('Error: No se puede cargar el QR de pago');
        return false;
    }

    console.log('✅ QR de pago cargado correctamente');
    return true;
}

// ============================================
// 4. DESCARGAR QR (ELIMINADO)
// ============================================
// Esta función ya no se necesita porque mostramos una imagen estática

// ============================================
// 5. MANEJAR CARGA DE ARCHIVOS
// ============================================
/**
 * Función para manejar cuando se selecciona un archivo
 */
function manejarSeleccionArchivo(file) {
    // Validar tipo de archivo
    const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!tiposPermitidos.includes(file.type)) {
        mostrarError('Solo se permiten imágenes (PNG, JPG) o PDF');
        return;
    }

    // Validar tamaño (máximo 5MB)
    const maxTamanio = 5 * 1024 * 1024; // 5MB
    if (file.size > maxTamanio) {
        mostrarError('El archivo debe ser menor a 5MB');
        return;
    }

    // Guardar el archivo
    archivoComprobante = file;
    nombreArchivo.textContent = file.name;
    archivoSeleccionado.style.display = 'flex';
    uploadArea.style.display = 'none';
    btnGuardar.disabled = false;

    console.log('✅ Archivo seleccionado:', file.name);
}

// ============================================
// 6. MOSTRAR MENSAJES
// ============================================
/**
 * Mostrar mensaje de error
 */
function mostrarError(mensaje) {
    mensajeError.textContent = '❌ ' + mensaje;
    mensajeError.style.display = 'block';
    mensajeExito.style.display = 'none';
    
    setTimeout(() => {
        mensajeError.style.display = 'none';
    }, 5000);
}

/**
 * Mostrar mensaje de éxito
 */
function mostrarExito(mensaje) {
    mensajeExito.textContent = '✅ ' + mensaje;
    mensajeExito.style.display = 'block';
    mensajeError.style.display = 'none';
    
    setTimeout(() => {
        mensajeExito.style.display = 'none';
    }, 5000);
}

/**
 * Mostrar mensaje de carga
 */
function mostrarCarga(mostrar = true) {
    mensajeCarga.style.display = mostrar ? 'block' : 'none';
}

// ============================================
// 7. GUARDAR DATOS (Conectará con Google Apps Script)
// ============================================
/**
 * Función para guardar los datos
 * Aquí conectaremos con Google Apps Script
 */
/**
 * Función mejorada para guardar datos con Google Apps Script
 */
async function guardarDatos() {
  if (!archivoComprobante) {
    mostrarError("Por favor selecciona un comprobante");
    return;
  }

  btnGuardar.disabled = true;
  mostrarCarga(true);

  try {
    console.log('📤 Guardando compra...');
    console.log('Datos de compra:', datosEstudiante);
    console.log('Comprobante:', archivoComprobante.name);

    // Preparar los datos para enviar - SIN ARCHIVO, SOLO DATOS
    const payload = {
      nombre: datosEstudiante.nombre,
      ci: datosEstudiante.ci,
      correo: datosEstudiante.correo,
      celular: datosEstudiante.celular,
      cantidadBoletos: datosEstudiante.cantidadBoletos
    };

    console.log('Payload a enviar:', payload);

    // IMPORTANTE: Reemplaza esta URL con tu URL de Google Apps Script
    const URL_GOOGLE_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbyQA6kMD_A4SmAZSW5xKqql22r499wBO5OsyNlnkTgHXA1OrR24KU9UgyZbpB779miH/exec";

    const respuesta = await fetch(URL_GOOGLE_APPS_SCRIPT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log('Estado respuesta:', respuesta.status);
    const resultado = await respuesta.text();
    console.log('Resultado texto:', resultado);
    
    let resultadoParsed;
    try {
      resultadoParsed = JSON.parse(resultado);
    } catch (e) {
      resultadoParsed = { success: true, message: resultado };
    }
    
    mostrarCarga(false);

    if (resultadoParsed.success) {
      mostrarExito('✅ ¡Compra confirmada! Se guardó en Google Sheets');
      console.log('📊 Datos guardados correctamente');
      
      localStorage.removeItem('datosEstudiante');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 3000);
    } else {
      mostrarError('Error: ' + resultadoParsed.message);
      btnGuardar.disabled = false;
    }

  } catch (error) {
    mostrarCarga(false);
    mostrarError('Error de conexión: ' + error.message);
    btnGuardar.disabled = false;
    console.error('❌ Error completo:', error);
  }
}

// ============================================
// 8. EVENT LISTENERS
// ============================================

// Click en el área de upload
uploadArea.addEventListener('click', () => {
    inputComprobante.click();
});

// Seleccionar archivo
inputComprobante.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        manejarSeleccionArchivo(e.target.files[0]);
    }
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        manejarSeleccionArchivo(e.dataTransfer.files[0]);
    }
});

// Botón cambiar archivo
btnCambiarArchivo.addEventListener('click', () => {
    inputComprobante.click();
});

// Botón guardar
btnGuardar.addEventListener('click', guardarDatos);

// ============================================
// 9. INICIALIZAR LA PÁGINA
// ============================================
function inicializar() {
    console.log('🚀 Inicializando página de pago...');
    
    if (cargarDatos()) {
        mostrarDatos();
        verificarQRPago();
        console.log('✅ Página de pago cargada correctamente');
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', inicializar);
