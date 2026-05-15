# ✅ CONFIGURAR GOOGLE APPS SCRIPT - Guía Paso a Paso

## PASO 1: Copiar el Código

1. Abre el archivo: `CODIGO_GOOGLE_APPS_SCRIPT.gs` (en tu carpeta)
2. **Copia TODO el código** (Ctrl+A → Ctrl+C)

---

## PASO 2: Crear el Proyecto en Google Apps Script

1. Abre [script.google.com](https://script.google.com)
2. Presiona **"Nuevo proyecto"**
3. Dale un nombre: `Sistema-Venta-Boletos`
4. **Elimina el código que aparece** (function myFunction() {...})
5. **Pega TODO el código que copiaste**
6. Presiona **Ctrl+S** para guardar

---

## PASO 3: Autorizar el Proyecto

1. En Google Apps Script, presiona **"Ejecutar"** (botón ▶)
2. Selecciona la función: `testGuardarCompra`
3. Google te pedirá **permisos**, presiona **"Autorizar"**
4. Se abrirá una ventana pidiendo permisos, presiona **"Permitir"**

---

## PASO 4: Publicar como Web App

### Esta es la parte IMPORTANTE:

1. En Google Apps Script, presiona **"Implementar"** (arriba a la derecha)
2. Presiona **"Nueva implementación"**
3. En el desplegable, selecciona: **"Web app"**
4. Rellena así:
   - **Ejecutar como**: Tu email (google@gmail.com)
   - **Quién puede acceder**: Cualquiera
5. Presiona **"Implementar"**

---

## PASO 5: Copiar la URL

1. Se abrirá una ventana con un **enlace largo**
2. **Copia TODO el enlace** (Ctrl+C)
3. Guárdalo en un lugar seguro (es tu URL única)

Ejemplo:

```
https://script.google.com/macros/d/AKfycbyXXXXXXXXXXXXXXXXXXXXX/usercripts
```

---

## PASO 6: Reemplazar la URL en tu Código

1. Abre el archivo: `qr-script.js` (en tu carpeta)
2. Busca esta línea (alrededor de línea 180):

```javascript
const URL_GOOGLE_APPS_SCRIPT = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI";
```

3. **Reemplázala con tu URL real**:

```javascript
const URL_GOOGLE_APPS_SCRIPT =
  "https://script.google.com/macros/d/AKfycbyXXXXXXXXXXXXXXXXXXXXX/usercripts";
```

4. **Guarda el archivo** (Ctrl+S)

---

## PASO 7: Dar Permisos a Google Drive y Sheets

1. En Google Apps Script, ve a **"Configuración"** ⚙️
2. Habilita acceso a:
   - **Google Sheets API**
   - **Google Drive API**
3. Presiona **"Guardar"**

---

## ✅ VERIFICAR QUE FUNCIONA

1. **Abre** `index.html` en tu navegador
2. **Llena** el formulario
3. **Compra boletos**
4. **Sube un comprobante**
5. **Presiona** "Confirmar Compra"

**Resultado esperado:**

- ✅ Mensaje: "¡Compra confirmada! Se guardó en Google Sheets"
- ✅ Abre tu Google Sheets → Verás los datos
- ✅ Abre tu Google Drive → Verás el comprobante

---

## 🆘 Si NO Funciona

### Error: "Acceso denegado"

- Ve a script.google.com
- Presiona "Ejecutar" → "testGuardarCompra"
- Autoriza los permisos nuevamente

### Error: "404 Not Found"

- Verifica que copiaste **toda** la URL de la Web App
- Verifica que NO hay espacios al inicio o final

### Los datos no aparecen en Sheets

- Abre tu Google Sheets
- Verifica que las columnas sean: Nombre, CI, Correo, Celular, Cantidad Boletos, Comprobante, Fecha
- Verifica que el nombre de la hoja sea exacto: `Ventas`

### El comprobante no se guarda en Drive

- Abre tu carpeta en Google Drive
- Verifica que el ID sea correcto
- Verifica que la carpeta no esté bloqueada

---

## 📱 RESUMEN DE IDS

**Google Sheets ID:**

```
1Kdfriwh1SW63lOFCyoqc7fKQjAXV3O4F27bg2tgfhds
```

**Google Drive Folder ID:**

```
1Ba_9fLNddBhKq2H0_uS-XKZA5rKk91zr
```

**Google Apps Script URL:**

```
(Obtendrás después de publicar como Web App)
```

---

## ⏭️ Próximos Pasos

Una vez que todo funcione:

1. ✅ Los datos se guardan en Google Sheets
2. ✅ Los comprobantes se guardan en Google Drive
3. ✅ Puedes ver reportes de ventas
4. ✅ Puedes compartir el enlace con tus estudiantes

---

## 📞 Tips Útiles

- **Para editar la hoja**: Abre tu Google Sheets
- **Para ver comprobantes**: Abre tu Google Drive
- **Para hacer cambios**: Edita qr-script.js en tu carpeta
- **Para publicar cambios**: Vuelve a la Web App en Apps Script

¡Felicidades! 🎉 Ya tienes un sistema profesional de venta de boletos.
