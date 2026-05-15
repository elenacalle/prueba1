// ============================================
// GOOGLE APPS SCRIPT - Backend
// Copia TODO este código en script.google.com
// ============================================

// IDS DE CONFIGURACIÓN (REEMPLAZA CON TUS IDS)
const SHEET_ID = "1Kdfriwh1SW63lOFCyoqc7fKQjAXV3O4F27bg2tgfhds";
const FOLDER_ID = "1Ba_9fLNddBhKq2H0_uS-XKZA5rKk91zr";
const SHEET_NAME = "Ventas";

/**
 * Función principal para guardar la compra de boletos
 */
function guardarCompra(datos, archivoBase64, nombreArchivo) {
  try {
    // ✅ Paso 1: Abrir la hoja de cálculo
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // ✅ Paso 2: Guardar el comprobante en Drive
    const enlaceArchivo = guardarComprobante(
      archivoBase64,
      nombreArchivo,
      datos.ci,
      datos.nombre,
    );

    // ✅ Paso 3: Guardar datos en Google Sheets
    const fecha = new Date().toLocaleString();
    const nuevaFila = [
      datos.nombre, // Columna A: Nombre
      datos.ci, // Columna B: CI
      datos.correo, // Columna C: Correo
      datos.celular, // Columna D: Celular
      datos.cantidadBoletos, // Columna E: Cantidad de Boletos
      enlaceArchivo, // Columna F: Enlace del Comprobante
      fecha, // Columna G: Fecha
    ];

    // Agregar la fila a la hoja
    sheet.appendRow(nuevaFila);

    // ✅ Paso 4: Enviar respuesta de éxito
    return {
      success: true,
      message: "Compra guardada correctamente",
      enlaceArchivo: enlaceArchivo,
    };
  } catch (error) {
    // ❌ Si hay error, retornar el error
    return {
      success: false,
      message: "Error: " + error.toString(),
    };
  }
}

/**
 * Función para guardar el comprobante en Google Drive
 */
function guardarComprobante(archivoBase64, nombreArchivo, ci, nombre) {
  try {
    // Obtener la carpeta principal
    const carpetaPrincipal = DriveApp.getFolderById(FOLDER_ID);

    // Crear subcarpeta con la fecha actual
    const fecha = new Date();
    const nombreCarpeta = Utilities.formatDate(fecha, "GMT-4", "yyyy-MM-dd");

    let subcarpeta;
    const carpetasExistentes = carpetaPrincipal.getFoldersByName(nombreCarpeta);

    if (carpetasExistentes.hasNext()) {
      subcarpeta = carpetasExistentes.next();
    } else {
      subcarpeta = carpetaPrincipal.createFolder(nombreCarpeta);
    }

    // Decodificar el archivo de Base64
    const archivoDecodificado = Utilities.base64Decode(archivoBase64);

    // Crear nombre del archivo
    const nombreFinal =
      ci +
      "_" +
      nombre.replace(/\s+/g, "_") +
      nombreArchivo.substring(nombreArchivo.lastIndexOf("."));

    // Guardar el archivo en la subcarpeta
    const archivo = subcarpeta.createFile(nombreFinal, archivoDecodificado);

    // Hacer el archivo compartible
    archivo.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);

    // Retornar el enlace
    return archivo.getUrl();
  } catch (error) {
    Logger.log("Error guardando comprobante: " + error);
    throw new Error("Error al guardar comprobante: " + error);
  }
}

/**
 * Función para que Google Apps Script acepte llamadas POST desde HTML
 */
function doPost(e) {
  try {
    // Obtener los datos del POST
    const parametros = JSON.parse(e.postData.contents);

    const datos = parametros.datos;
    const archivoBase64 = parametros.archivoBase64;
    const nombreArchivo = parametros.nombreArchivo;

    // Llamar a la función principal
    const resultado = guardarCompra(datos, archivoBase64, nombreArchivo);

    // Retornar resultado como JSON
    return ContentService.createTextOutput(
      JSON.stringify(resultado),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error del servidor: " + error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función de prueba (ejecuta manualmente para probar)
 */
function testGuardarCompra() {
  const datosTest = {
    nombre: "Juan Pérez",
    ci: "12345678",
    correo: "juan@ejemplo.com",
    celular: "+58 412 1234567",
    cantidadBoletos: "5",
  };

  // Archivo de prueba (pequeño PNG en blanco)
  const archivoBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  const resultado = guardarCompra(datosTest, archivoBase64, "comprobante.png");
  Logger.log(resultado);
}
