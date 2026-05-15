# 🔗 Guía: Conectar con Google Apps Script

## Índice

1. [Crear el Google Apps Script](#crear-el-google-apps-script)
2. [Crear Google Sheets](#crear-google-sheets)
3. [Crear carpeta en Google Drive](#crear-carpeta-en-google-drive)
4. [Código Apps Script](#código-apps-script)
5. [Publicar como Web App](#publicar-como-web-app)
6. [Conectar desde HTML](#conectar-desde-html)

---

## 🚀 Crear el Google Apps Script

### Paso 1: Ir a Google Apps Script

1. Abre [script.google.com](https://script.google.com)
2. Presiona **"Nuevo proyecto"**
3. Dale un nombre (ej: "Sistema-Registro-Universitario")

### Paso 2: Crear la hoja de cálculo

1. En Google Apps Script, presiona **"Configuración"**
2. Copia el Project ID (lo necesitarás luego)
3. Abre [Google Sheets](https://sheets.google.com)
4. Crea una nueva hoja de cálculo
5. Ponle el nombre "Registros-Universitarios"
6. Copia el ID de la hoja (está en la URL)

---

## 📊 Crear Google Sheets

### Estructura de la hoja

Tu hoja debe tener estas columnas:

| A          | B        | C                | D               | E         | F    | G            | H          |
| ---------- | -------- | ---------------- | --------------- | --------- | ---- | ------------ | ---------- |
| Nombre     | CI       | Correo           | Celular         | Sección   | QR   | Comprobante  | Fecha      |
| Juan Pérez | 12345678 | juan@ejemplo.com | +58 412 1234567 | Sección A | [QR] | [Link Drive] | 2026-05-13 |

**¿Por qué estas columnas?**

- **Columnas A-E**: Datos del formulario
- **Columna F**: Datos del QR (JSON)
- **Columna G**: Enlace al comprobante en Drive
- **Columna H**: Fecha automática

### Cómo crear la estructura

1. En la hoja, presiona la celda **A1**
2. Escribe: `Nombre`
3. Presiona Tab (→) y escribe `CI`
4. Continúa con: `Correo`, `Celular`, `Sección`, `QR`, `Comprobante`, `Fecha`

---

## 📁 Crear carpeta en Google Drive

1. Abre [Google Drive](https://drive.google.com)
2. Presiona **"Nueva"** → **"Carpeta"**
3. Llámala "Comprobantes-Universitarios"
4. Copia su ID de la carpeta (está en la URL después de `folders/`)

**Estructura de carpetas recomendada:**

```
Comprobantes-Universitarios/
├── 2026-05-13/
│   ├── 12345678_juan_perez.pdf
│   └── 87654321_maria_gomez.png
└── 2026-05-14/
    └── ...
```

---

## 📝 Código Apps Script

### El código completo

Copia esto en Google Apps Script:

```javascript
// ============================================
// GOOGLE APPS SCRIPT - Backend
// ============================================

// IDs de configuración (REEMPLAZA CON TUS IDS)
const SHEET_ID = "TU_ID_DE_GOOGLE_SHEETS"; // Copia de la URL
const FOLDER_ID = "TU_ID_DE_CARPETA_DRIVE"; // Copia de la URL
const SHEET_NAME = "Registros-Universitarios";

/**
 * Función para guardar los datos del estudiante
 * Se llama desde el HTML
 */
function guardarEstudiante(datos, archivoBase64, nombreArchivo) {
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
      datos.nombre, // Columna A
      datos.ci, // Columna B
      datos.correo, // Columna C
      datos.celular, // Columna D
      datos.seccion, // Columna E
      JSON.stringify(datos), // Columna F (QR como JSON)
      enlaceArchivo, // Columna G (Link del comprobante)
      fecha, // Columna H (Fecha)
    ];

    // Agregar la fila a la hoja
    sheet.appendRow(nuevaFila);

    // ✅ Paso 4: Enviar respuesta de éxito
    return {
      success: true,
      message: "Datos guardados correctamente",
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
 * Función para obtener todos los registros (opcional)
 * Útil para crear reportes
 */
function obtenerRegistros() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    const datos = sheet.getDataRange().getValues();

    return {
      success: true,
      total: datos.length - 1, // -1 por la fila de encabezados
      datos: datos,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error: " + error.toString(),
    };
  }
}

/**
 * Función para probar (ejecutar manualmente)
 */
function testGuardarEstudiante() {
  const datosTest = {
    nombre: "Juan Pérez",
    ci: "12345678",
    correo: "juan@ejemplo.com",
    celular: "+58 412 1234567",
    seccion: "Sección A",
  };

  // Archivo de prueba (pequeño PNG en blanco)
  const archivoBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

  const resultado = guardarEstudiante(datosTest, archivoBase64, ".png");
  Logger.log(resultado);
}
```

---

## 🔐 Configurar Permisos

1. En Google Apps Script, presiona **"Ejecutar"** (en la función testGuardarEstudiante)
2. Google te pedirá permisos, presiona **"Autorizar"**
3. Se abrirá una pantalla de permisos, presiona **"Permitir"**

---

## 📤 Publicar como Web App

### Paso 1: Publicar como implementación

1. En Google Apps Script, presiona **"Implementar"** (arriba a la derecha)
2. Presiona **"Nueva implementación"**
3. Selecciona **"Web app"**
4. **Ejecutar como**: Tu email
5. **Quién puede acceder**: Cualquiera
6. Presiona **"Implementar"**

### Paso 2: Copiar la URL

1. Se abrirá una ventana con la URL
2. Copia la URL (algo como: `https://script.google.com/macros/d/...`)
3. Guárdala en un lugar seguro

---

## 🔗 Conectar desde HTML

### En qr-script.js, reemplaza la función guardarDatos()

```javascript
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
    // ✅ Paso 1: Convertir archivo a Base64
    const lector = new FileReader();

    lector.onload = async function (e) {
      // Obtener contenido en Base64 (sin el "data:...;base64," del inicio)
      const archivoBase64 = e.target.result.split(",")[1];

      // ✅ Paso 2: Preparar los datos
      const payload = {
        datos: datosEstudiante,
        archivoBase64: archivoBase64,
        nombreArchivo: archivoComprobante.name,
      };

      // ✅ Paso 3: Enviar a Google Apps Script
      const URL_GOOGLE_APPS_SCRIPT = "AQUI_VA_TU_URL_DE_GOOGLE_APPS_SCRIPT";

      try {
        const respuesta = await fetch(URL_GOOGLE_APPS_SCRIPT, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const resultado = await respuesta.json();

        mostrarCarga(false);

        if (resultado.success) {
          mostrarExito("✅ Datos guardados en Google Sheets");
          console.log("📊 Enlace del comprobante:", resultado.enlaceArchivo);

          // Limpiar y redirigir
          localStorage.removeItem("datosEstudiante");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 3000);
        } else {
          mostrarError("Error: " + resultado.message);
          btnGuardar.disabled = false;
        }
      } catch (fetchError) {
        mostrarCarga(false);
        mostrarError("Error de conexión: " + fetchError.message);
        btnGuardar.disabled = false;
        console.error("Error:", fetchError);
      }
    };

    // Leer el archivo como Base64
    lector.readAsDataURL(archivoComprobante);
  } catch (error) {
    mostrarCarga(false);
    mostrarError("Error: " + error.message);
    btnGuardar.disabled = false;
    console.error("Error:", error);
  }
}
```

### Reemplazar la URL

En el código anterior, busca esta línea:

```javascript
const URL_GOOGLE_APPS_SCRIPT = "AQUI_VA_TU_URL_DE_GOOGLE_APPS_SCRIPT";
```

Y reemplázala con tu URL real:

```javascript
const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/d/TU_ID_AQUI/usercripts";
```

---

## ✅ Verificar que todo funciona

1. Abre `index.html` en tu navegador
2. Llena el formulario con datos de prueba
3. Presiona "Generar QR"
4. En la página QR, sube un archivo de prueba
5. Presiona "Guardar y Enviar"
6. Verifica que aparezca el mensaje de éxito
7. Abre Google Sheets y verifica que los datos estén guardados
8. Abre Google Drive y verifica que el archivo esté guardado

---

## 🔍 Si hay errores

### Error: "No se permite el acceso"

- Verifica que hayas publicado correctamente como Web App
- Asegúrate de seleccionar "Cualquiera" en permisos

### Error: "Undefined es no es una función"

- Verifica que copiaste la URL completa y correcta
- Revisa que no haya espacios adicionales

### El archivo no se guarda en Drive

- Verifica que el FOLDER_ID sea correcto
- Asegúrate de que la carpeta exista en tu Drive

### No aparecen datos en Sheets

- Verifica que el SHEET_ID sea correcto
- Verifica que el nombre de la hoja sea exacto

---

## 📝 Checklist Final

- [ ] Creaste Google Apps Script
- [ ] Creaste Google Sheets
- [ ] Copiaste el SHEET_ID
- [ ] Creaste carpeta en Google Drive
- [ ] Copiaste el FOLDER_ID
- [ ] Pegaste el código de Apps Script
- [ ] Ejecutaste la función test
- [ ] Publicaste como Web App
- [ ] Copiaste la URL de la Web App
- [ ] Reemplazaste la URL en qr-script.js
- [ ] Probaste el sistema completo

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sistema estará:

- ✅ Recibiendo datos del formulario
- ✅ Generando QR
- ✅ Guardando en Google Sheets
- ✅ Guardando comprobantes en Google Drive
- ✅ Generando enlaces compartibles

¡Felicidades! 🚀
