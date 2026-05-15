# 📖 Guía Rápida de Referencia

## 📂 Archivos del Proyecto

```
Nueva carpeta/
│
├── 📄 index.html              ← FORMULARIO PRINCIPAL
│   ├── Campos: nombre, CI, correo, celular, sección
│   ├── Botón: "Generar QR"
│   └── Abre: qr.html
│
├── 📄 qr.html                 ← PÁGINA DE QR Y COMPROBANTE
│   ├── Muestra: datos del estudiante
│   ├── Genera: código QR
│   ├── Permite: descargar QR
│   ├── Permite: subir comprobante
│   └── Botón: "Guardar y Enviar"
│
├── 🎨 styles.css              ← ESTILOS DEL FORMULARIO
│   ├── Colores: púrpura gradiente
│   ├── Fuente: Segoe UI
│   └── Diseño: responsivo
│
├── 🎨 styles-qr.css           ← ESTILOS DE LA PÁGINA QR
│   ├── Layout: 3 secciones
│   ├── Drag & drop: área de upload
│   └── Diseño: responsivo
│
├── ⚙️ script.js               ← JAVASCRIPT DEL FORMULARIO
│   ├── Valida: campos del formulario
│   ├── Guarda: datos en localStorage
│   └── Abre: qr.html
│
├── ⚙️ qr-script.js            ← JAVASCRIPT DE LA PÁGINA QR
│   ├── Carga: datos desde localStorage
│   ├── Genera: código QR (QRCode.js)
│   ├── Maneja: carga de archivos
│   └── Envía: datos a Google Apps Script
│
├── 📚 README.md               ← DOCUMENTACIÓN COMPLETA
│   ├── Descripción del proyecto
│   ├── Estructura de archivos
│   ├── Explicación de cada archivo
│   ├── Flujo de datos
│   └── Preguntas frecuentes
│
└── 🔗 GOOGLE_APPS_SCRIPT.md   ← GUÍA DE INTEGRACIÓN
    ├── Paso a paso para Google Apps Script
    ├── Código completo de backend
    ├── Configuración de Google Sheets
    ├── Configuración de Google Drive
    └── Cómo conectar todo
```

---

## 🎯 Flujo de Usuario

```
┌─────────────────────────┐
│  Usuario abre index.html │
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────────────┐
│ Llena el formulario:             │
│ • Nombre completo               │
│ • CI                            │
│ • Correo                        │
│ • Celular                       │
│ • Sección                       │
└────────┬────────────────────────┘
         │
         ↓
┌─────────────────────────┐
│ Presiona "Generar QR"   │
└────────┬────────────────┘
         │
         ↓ (script.js valida)
         │
┌─────────────────────────┐
│ Los datos se guardan en │
│ localStorage del navegador
└────────┬────────────────┘
         │
         ↓
┌──────────────────────────┐
│ Se abre qr.html en nueva │
│ pestaña                  │
└────────┬─────────────────┘
         │
         ↓ (qr-script.js carga datos)
         │
┌─────────────────────────────┐
│ Muestra:                    │
│ • Datos del estudiante      │
│ • Código QR generado        │
│ • Área para subir archivo   │
└────────┬────────────────────┘
         │
         ↓
┌────────────────────────────────┐
│ Usuario sube comprobante y     │
│ presiona "Guardar y Enviar"    │
└────────┬──────────────────────┘
         │
         ↓ (qr-script.js envía)
         │
┌───────────────────────────────────┐
│ Google Apps Script recibe:         │
│ • Datos del estudiante             │
│ • Archivo del comprobante          │
└────────┬────────────────────────┬─┘
         │                        │
         ↓                        ↓
┌──────────────────────┐  ┌─────────────────────┐
│ Guarda en Google     │  │ Guarda archivo en   │
│ Sheets               │  │ Google Drive        │
│ (Base de datos)      │  │ (Comprobantes)      │
└──────────────────────┘  └─────────────────────┘
```

---

## 🔧 Tecnologías Usadas

| Tecnología               | Uso                               | Archivo                   |
| ------------------------ | --------------------------------- | ------------------------- |
| **HTML5**                | Estructura                        | index.html, qr.html       |
| **CSS3**                 | Estilos                           | styles.css, styles-qr.css |
| **JavaScript (Vanilla)** | Lógica                            | script.js, qr-script.js   |
| **QRCode.js**            | Generar QR                        | CDN en qr.html            |
| **localStorage**         | Almacenamiento temporal           | script.js, qr-script.js   |
| **Google Apps Script**   | Backend (próximo)                 | No incluido               |
| **Google Sheets**        | Base de datos (próximo)           | No incluido               |
| **Google Drive**         | Almacenamiento archivos (próximo) | No incluido               |

---

## 🚀 Pasos para Ejecutar

### Opción 1: Abrir directamente

```
1. Click derecho en index.html
2. "Abrir con" → Navegador (Chrome, Firefox, etc.)
3. ¡Listo!
```

### Opción 2: Usar servidor local (recomendado)

```bash
# Windows - Opción A (Python)
python -m http.server 8000

# Windows - Opción B (Node.js)
npx http-server

# Luego abre en tu navegador:
http://localhost:8000
```

---

## 📝 Modificaciones Comunes

### 1. Cambiar colores

**Archivo**: `styles.css` y `styles-qr.css`

Busca:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Cambia los códigos:

- `#667eea` → color inicio
- `#764ba2` → color fin

**Generador de colores**: [coolors.co](https://coolors.co)

### 2. Cambiar texto del botón

**Archivo**: `index.html`

Busca:

```html
<button id="btnGenerarQR">🎯 Generar QR</button>
```

Cambia a:

```html
<button id="btnGenerarQR">🎯 Mi Nuevo Texto</button>
```

### 3. Añadir más campos

**Archivo**: `index.html`

Después de sección, añade:

```html
<div class="form-group">
  <label for="nuevocampo">Nuevo Campo</label>
  <input
    type="text"
    id="nuevocamp"
    name="nuevocamp"
    placeholder="Texto"
    required
  />
</div>
```

Luego en `script.js`:

```javascript
const inputNuevo = document.getElementById("nuevocamp");
// Y incluirlo en validarFormulario()
```

### 4. Cambiar secciones disponibles

**Archivo**: `index.html`

Busca:

```html
<select id="seccion">
  <option value="">-- Selecciona una sección --</option>
  <option value="Sección A">Sección A</option>
  <option value="Sección B">Sección B</option>
  <!-- Añade aquí más opciones -->
</select>
```

---

## 🐛 Debugging (Solucionar Problemas)

### Abrir la consola del navegador

```
Windows: F12
Mac: Cmd + Option + J
Linux: Ctrl + Shift + I
```

### Ver Storage/localStorage

```
F12 → Application (o Storage) → LocalStorage → http://localhost:8000
```

### Mensajes útiles en consola

```javascript
// Verificar si los datos se guardan
console.log(localStorage.getItem("datosEstudiante"));

// Verificar si la función se ejecuta
console.log("Función ejecutada");

// Ver un objeto completo
console.table(datosEstudiante);
```

---

## ✅ Checklist para Usar el Proyecto

- [ ] Descargaste todos los archivos
- [ ] Están en la misma carpeta
- [ ] Abriste index.html en el navegador
- [ ] El formulario se ve correctamente
- [ ] Puedes llenar los campos
- [ ] Presionar "Generar QR" abre qr.html
- [ ] Se muestra el QR
- [ ] Puedes descargar el QR
- [ ] Puedes subir un comprobante
- [ ] Presionar "Guardar" muestra un mensaje

Si todo esto funciona, ¡el frontend está listo! 🎉

---

## 📚 Documentación Completa

**Para explicación detallada de cada archivo:**
→ Ver [README.md](README.md)

**Para integración con Google Sheets/Drive:**
→ Ver [GOOGLE_APPS_SCRIPT.md](GOOGLE_APPS_SCRIPT.md)

---

## 🎓 Conceptos Clave Explicados

### ¿Qué es localStorage?

Es como una "libreta" en el navegador donde puedes guardar datos temporalmente.

```javascript
// Guardar
localStorage.setItem("clave", "valor");

// Recuperar
const valor = localStorage.getItem("clave");

// Eliminar
localStorage.removeItem("clave");
```

### ¿Cómo funciona el QR?

El QR es una imagen que contiene datos codificados.

```javascript
// Los datos en formato JSON:
{
  "nombre": "Juan Pérez",
  "ci": "12345678",
  ...
}

// Se codifican en la imagen QR
// Al escanear, se obtienen los datos originales
```

### ¿Qué es drag and drop?

Es la función de "arrastra y suelta" archivos.

```javascript
// Cuando arrastras un archivo
uploadArea.addEventListener("drop", (e) => {
  const archivo = e.dataTransfer.files[0];
  // Procesar archivo
});
```

### ¿Qué es una Web App de Google?

Es cuando publicas código de Apps Script como una URL pública que puede recibir datos desde cualquier lugar.

---

## 🔐 Consideraciones de Seguridad

**IMPORTANTE**: Este sistema está en desarrollo. Antes de usar en producción:

- ✅ Validar datos en el backend (Google Apps Script)
- ✅ Encriptar datos sensibles
- ✅ Usar HTTPS (no HTTP)
- ✅ Implementar autenticación
- ✅ Limitar permisos de acceso
- ✅ Hacer backups periódicos

---

## 📞 Recursos Útiles

- **Documentación HTML**: [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/HTML)
- **Documentación CSS**: [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/CSS)
- **Documentación JavaScript**: [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript)
- **Google Apps Script**: [script.google.com](https://script.google.com)
- **Google Sheets API**: [developers.google.com](https://developers.google.com/sheets)

---

## 🎯 Próximos Pasos

1. **Familiarízate con el código**: Lee los comentarios en cada archivo
2. **Prueba modificaciones**: Cambia colores, textos, etc.
3. **Configura Google Apps Script**: Sigue [GOOGLE_APPS_SCRIPT.md](GOOGLE_APPS_SCRIPT.md)
4. **Prueba el sistema completo**: Verifica que todo funcione
5. **Implementa seguridad**: Antes de usar en producción
6. **Despliega**: En Hosting público (Firebase, Azure, etc.)

---

## 🚀 ¡Éxito!

Tienes todo lo necesario para:
✅ Entender cómo funciona cada parte
✅ Modificar según tus necesidades
✅ Integrar con Google Sheets
✅ Escalar tu proyecto

¡Adelante! 💪
