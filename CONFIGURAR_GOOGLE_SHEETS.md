# 📋 Configuración: Google Sheets Automático

## ¿Qué hace?

Tu formulario ahora envía automáticamente los datos a **Google Sheets** sin usar Google Forms ni interfaces complicadas. Solo JavaScript básico.

---

## 🚀 Pasos para Configurar

### Paso 1: Crear el Apps Script en Google

1. Ve a **Google Drive** y abre tu hoja **"Registros-Universitarios"**
2. Haz clic en: `Extensiones` → `Apps Script`
3. Se abrirá el editor de Google Apps Script

### Paso 2: Reemplazar el código

1. **Borra TODO** el código que aparece en el editor (la función `myFunction()`)
2. **Copia el código** del archivo `apps-script-code.gs` (el que está en tu carpeta)
3. **Pega todo** en el editor de Apps Script

### Paso 3: Guardar el Script

1. Haz clic en `Guardar` (Ctrl + S)
2. Dale un nombre cualquiera (ej: "Guardar Datos del Formulario")

### Paso 4: Desplegar como Web App

1. En la esquina superior, haz clic en `Implementar` → `Nueva implementación`
2. En "Seleccionar tipo", elige: `Aplicación web`
3. Completa los campos:
   - **Ejecutar como:** Tu cuenta de Google (la que creó el Sheet)
   - **Quién tiene acceso:** "Cualquiera"
4. Haz clic en `Implementar`

### Paso 5: Copiar la URL

1. Se abrirá un modal con tu **URL de Web App**
2. **Copia la URL completa** (la que aparece en el campo de texto)
3. Guárdala temporalmente

### Paso 6: Configurar en tu código

1. Abre el archivo `script.js` en VS Code
2. En la línea 4, busca:
   ```javascript
   const APPS_SCRIPT_URL = "TU_URL_DE_APPS_SCRIPT_AQUI";
   ```
3. **Reemplaza** `"TU_URL_DE_APPS_SCRIPT_AQUI"` con la URL que copiaste
4. **Guarda el archivo** (Ctrl + S)

---

## ✅ Listo!

Ahora cada vez que alguien llene tu formulario:

- ✅ Los datos se guardan en **Google Sheets** automáticamente
- ✅ También se guardan en localStorage como respaldo
- ✅ La fila nueva aparecerá en la pestaña "Ventas"

---

## 📝 Columns que se crean automáticamente:

- **Fecha**: Cuándo se guardó
- **Nombre**: Del formulario
- **CI**: Del formulario
- **Correo**: Del formulario
- **Celular**: Del formulario
- **Cantidad Boletos**: Del formulario
- **Estado**: "Pendiente" (puedes cambiar esto después)

---

## 🔒 Notas de Seguridad

- La URL del Web App es pública, pero SOLO puede escribir en tu Sheet
- NO compartir esta URL en internet (aunque está protegida)
- Si pierdes la URL, puedes crear una nueva desde Apps Script

---

## ❌ Solucionar Problemas

### No se guardan los datos

- ✅ Verifica que la URL en `script.js` sea correcta
- ✅ Abre la consola del navegador (F12) para ver errores
- ✅ Asegúrate de que el Sheet está configurado correctamente

### Error: "No puedo acceder a este archivo"

- La URL del Apps Script expiró
- Redeploy: Ve a Apps Script → `Implementaciones` → Elimina la anterior y crea una nueva

### Los datos no llenan todas las columnas

- Verifica que los nombres de los campos en `index.html` coincidan con los del código
- Los campos deben ser: `nombre`, `ci`, `correo`, `celular`, `cantidadBoletos`

---

## 🎯 Próximos pasos opcionales

- Agregar columnas adicionales al Apps Script
- Validar datos antes de guardar
- Enviar confirmación por email
- Generar un número de orden único

**¿Preguntas? Pregúntame cualquier cosa! 😊**
