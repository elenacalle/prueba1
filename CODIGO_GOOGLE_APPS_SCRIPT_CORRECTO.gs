// ID del Google Sheet
const SHEET_ID = "1Kdfriwh1SW63lOFCyoqc7fKQjAXV3O4F27bg2tgfhds";
const SHEET_NAME = "Ventas";

// Función para peticiones GET (pruebas)
function doGet(e) {
  return HtmlService.createHtmlOutput("<h1>✅ Web App funcionando correctamente</h1>");
}

// Función que recibe los datos del formulario
function doPost(e) {
  try {
    // Parsear los datos enviados
    const data = JSON.parse(e.postData.contents);

    // Abrir el spreadsheet y la hoja
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Si la hoja está vacía, crear encabezados
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

    // Agregar fila con los datos del formulario
    const fecha = new Date().toLocaleString("es-ES");
    const nuevaFila = [
      fecha,
      data.nombre,
      data.ci,
      data.correo,
      data.celular,
      data.cantidadBoletos,
      "Pendiente",
    ];

    sheet.appendRow(nuevaFila);

    // Responder con éxito
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Datos guardados correctamente",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Responder con error
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error: " + error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función para obtener la URL del Web App (ejecuta en Google Apps Script)
function getWebAppUrl() {
  return ScriptApp.getService().getUrl();
}
