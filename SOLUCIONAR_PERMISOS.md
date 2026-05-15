# 🔧 Solución del Problema de Permisos

## El Problema

El error `DriveApp.getFolderById` significa que el Apps Script anterior intentaba guardar archivos en Google Drive, pero no tenía permisos.

## La Solución

He creado un nuevo Apps Script que **NO usa Google Drive**. En su lugar:

- ✅ Guarda todos los datos en **Google Sheets** automáticamente
- ✅ Crea dos hojas: "Ventas" (formulario inicial) y "Comprobantes" (comprobante de pago)
- ✅ Cambia el estado de "Pendiente" a "Confirmado" cuando se sube el comprobante

---

## 📋 Pasos para Actualizar

### Paso 1: Abre Google Apps Script

1. Ve a tu Google Sheet **"Registros-Universitarios"**
2. Haz clic en: `Extensiones` → `Apps Script`

### Paso 2: Reemplaza el código

1. **Selecciona TODO** el código actual (Ctrl + A)
2. **Bórralo**
3. **Copia el código** de `apps-script-code-mejorado.gs` (el nuevo archivo)
4. **Pégalo** en el editor de Google Apps Script
5. **Guarda** (Ctrl + S)

### Paso 3: Desplegar una nueva versión

1. Haz clic en `Implementar` → `Nueva implementación`
2. Tipo: `Aplicación web`
3. **Ejecutar como:** Tu cuenta (igual que antes)
4. **Quién tiene acceso:** "Cualquiera"
5. Haz clic en `Implementar`

### Paso 4: Copiar la nueva URL

1. Se abrirá un modal con la **nueva URL**
2. **Cópiala** completamente
3. **Reemplázala** en `qr-script.js`:
   - Busca: `const URL_GOOGLE_APPS_SCRIPT = "https://script.google.com..."`
   - Pega la URL nueva que copiaste
   - **Guarda el archivo** (Ctrl + S)

---

## ✅ Lo que pasará ahora

### Cuando alguien llena el formulario principal:

- Se guarda en la hoja **"Ventas"** con estado "Pendiente"

### Cuando sube el comprobante:

- Se guarda en la hoja **"Comprobantes"**
- El estado en **"Ventas"** cambia automáticamente a "Confirmado"
- Se envía al navegador: `✅ Comprobante guardado correctamente`

---

## 📊 Hojas que se crearán

### Hoja 1: "Ventas"

| Fecha            | Nombre     | CI       | Correo         | Celular         | Cantidad Boletos | Estado     |
| ---------------- | ---------- | -------- | -------------- | --------------- | ---------------- | ---------- |
| 15/05/2026 16:30 | Juan Pérez | 12345678 | juan@email.com | +58 412 1234567 | 5                | Confirmado |

### Hoja 2: "Comprobantes" (se crea automáticamente)

| Fecha            | Nombre     | CI       | Correo         | Correo Confirmación | Archivo         | Tamaño  | Estado   |
| ---------------- | ---------- | -------- | -------------- | ------------------- | --------------- | ------- | -------- |
| 15/05/2026 16:35 | Juan Pérez | 12345678 | juan@email.com | juan@email.com      | comprobante.jpg | 2.15 MB | Recibido |

---

## ❌ Si todavía hay problemas

### Error: "No se encontró la hoja 'Ventas'"

- Asegúrate de que en tu Google Sheet tienes una pestaña llamada exactamente **"Ventas"**
- Si la llamaste de otro modo, edita el Apps Script y cambia:
  ```javascript
  const SHEET_VENTAS = "Ventas"; // Cambia "Ventas" por el nombre correcto
  ```

### El comprobante no se guarda

- Abre la consola (F12) → Tab Console
- Mira si hay errores rojos
- Si dice algo sobre permisos, redeploy el Apps Script

### Los datos desaparecen después de 5 segundos

- Esto es normal, los datos YA se guardaron en Google Sheets
- El navegador solo borra el localStorage después de la confirmación

---

## 🎯 ¿Qué cambió?

**Antes:** Intentaba guardar en Google Drive → Permisos rechazados ❌

**Ahora:** Todo se guarda directamente en Google Sheets → Sin necesidad de permisos adicionales ✅

---

¿Necesitas que agregue más columnas o cambios en las hojas? ¡Avísame! 😊
