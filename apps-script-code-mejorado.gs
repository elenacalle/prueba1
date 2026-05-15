// ============================================
// APPS SCRIPT MEJORADO - Google Sheets
// ============================================

// IDs y nombres de hojas
const SHEET_ID = "1Kdfriwh1SW63lOFCyoqc7fKQjAXV3O4F27bg2tgfhds";
const SHEET_VENTAS = "Ventas";
const SHEET_COMPROBANTES = "Comprobantes";

// ============================================
// Función 1: Guardar datos del formulario (primer formulario)
// ============================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Si tiene nombreArchivo, es del segundo formulario (comprobante)
    if (data.nombreArchivo) {
      return guardarComprobante(data);
    } else {
      // Es del primer formulario (datos básicos)
      return guardarDatosFormulario(data);
    }
  } catch (error) {
    return responderError("Error procesando solicitud: " + error.toString());
  }
}

// ============================================
// Función 2: Guardar datos del formulario principal
// ============================================
function guardarDatosFormulario(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_VENTAS);

    // Crear encabezados si no existen
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Fecha",
        "Nombre",
        "CI",
        "Correo",
        "Celular",
        "Cantidad Boletos",
        "Estado",
      ];
      sheet.appendRow(headers);
    }

    // Agregar fila con datos
    const fecha = new Date().toLocaleString("es-ES");
    const nuevaFila = [
      fecha,
      data.nombre || "",
      data.ci || "",
      data.correo || "",
      data.celular || "",
      data.cantidadBoletos || "",
      "Pendiente",
    ];

    sheet.appendRow(nuevaFila);

    return responderExito("Datos guardados correctamente");
  } catch (error) {
    return responderError("Error al guardar formulario: " + error.toString());
  }
}

// ============================================
// Función 3: Guardar comprobante
// ============================================
function guardarComprobante(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);

    // Crear hoja de Comprobantes si no existe
    let sheetComprobantes = ss.getSheetByName(SHEET_COMPROBANTES);
    if (!sheetComprobantes) {
      sheetComprobantes = ss.insertSheet(SHEET_COMPROBANTES);
      const headers = [
        "Fecha",
        "Nombre",
        "CI",
        "Correo",
        "Archivo",
        "Tamaño",
        "Tipo",
        "Estado",
      ];
      sheetComprobantes.appendRow(headers);
    }

    // Guardar en hoja de Comprobantes
    const fecha = new Date().toLocaleString("es-ES");
    const tamanioMB = (data.tamanioArchivo / (1024 * 1024)).toFixed(2);

    const nuevaFila = [
      fecha,
      data.datos.nombre || "",
      data.datos.ci || "",
      data.datos.correo || "",
      data.nombreArchivo || "Sin nombre",
      tamanioMB + " MB",
      data.tipoArchivo || "Sin especificar",
      "Recibido",
    ];

    sheetComprobantes.appendRow(nuevaFila);

    // Actualizar estado en Ventas
    actualizarEstadoVentas(data.datos.ci);

    return responderExito("✅ Comprobante guardado correctamente");
  } catch (error) {
    return responderError("Error al guardar comprobante: " + error.toString());
  }
}

// ============================================
// Función 4: Actualizar estado en Ventas
// ============================================
function actualizarEstadoVentas(ci) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheetVentas = ss.getSheetByName(SHEET_VENTAS);

    // Buscar la fila con este CI
    const datos = sheetVentas.getDataRange().getValues();
    for (let i = 1; i < datos.length; i++) {
      if (datos[i][2] == ci) {
        // Columna 2 es CI (índice 2)
        sheetVentas.getRange(i + 1, 7).setValue("Confirmado"); // Columna 7 es Estado
        break;
      }
    }
  } catch (error) {
    Logger.log("Error actualizando estado: " + error);
  }
}

// ============================================
// Funciones auxiliares para respuestas
// ============================================
function responderExito(mensaje) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: true,
      message: mensaje,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function responderError(mensaje) {
  return ContentService.createTextOutput(
    JSON.stringify({
      success: false,
      message: mensaje,
    }),
  ).setMimeType(ContentService.MimeType.JSON);
}
