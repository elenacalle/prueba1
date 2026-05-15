# 📋 Sistema de Registro Universitario con QR

## Descripción General

Este es un sistema de registro universitario que:

1. ✅ Recibe datos del estudiante mediante un formulario
2. ✅ Genera un código QR automáticamente
3. ✅ Permite subir un comprobante de pago
4. ✅ Guarda todo en Google Sheets y Google Drive

---

## 📁 Estructura del Proyecto

```
Nueva carpeta/
├── index.html          # Página principal (formulario)
├── qr.html             # Página de QR y comprobante
├── script.js           # JavaScript del formulario
├── qr-script.js        # JavaScript de la página QR
├── styles.css          # Estilos del formulario
├── styles-qr.css       # Estilos de la página QR
├── google-apps-script/ # (Pendiente) Scripts de Google
└── README.md           # Este archivo
```

---

## 🔧 Cómo Funciona Cada Archivo

### 1. **index.html** - Página Principal (Formulario)

**¿Qué es?**
Es la primera página que ve el usuario. Contiene un formulario con 5 campos:

- Nombre completo
- CI (Cédula de Identidad)
- Correo
- Celular
- Sección

**Componentes principales:**

```html
<!-- Campo de entrada -->
<input type="text" id="nombre" placeholder="Ej: Juan Pérez" required />

<!-- Selector (dropdown) -->
<select id="seccion">
  <option value="Sección A">Sección A</option>
  <option value="Sección B">Sección B</option>
</select>

<!-- Botón para generar QR -->
<button id="btnGenerarQR">🎯 Generar QR</button>
```

**¿Para qué sirve?**

- Recolectar información del estudiante
- Validar que todos los campos estén completos
- Guardar los datos temporalmente en `localStorage`
- Abrir la página `qr.html` en una nueva pestaña

---

### 2. **qr.html** - Página de QR y Comprobante

**¿Qué es?**
Es la segunda página que se abre después de llenar el formulario.

**Secciones:**

1. **📄 Datos Registrados** - Muestra los datos del estudiante
2. **📱 Tu Código QR** - Muestra el QR generado
3. **📎 Subir Comprobante** - Área para subir archivos

**¿Para qué sirve?**

- Mostrar los datos ingresados
- Generar y mostrar el código QR
- Permitir descargar el QR como imagen
- Subir el comprobante de pago
- Guardar todo en Google Sheets y Drive

---

### 3. **script.js** - JavaScript del Formulario

**¿Qué hace?**
Maneja toda la lógica del formulario principal.

**Funciones principales:**

```javascript
// 1. Validar que los campos estén completos
validarFormulario();

// 2. Mostrar mensajes de error
mostrarError("Por favor completa todos los campos");

// 3. Guardar datos en localStorage
guardarDatosTemp();

// 4. Abrir la página QR
generarQR();
```

**Flujo:**

1. Usuario llena el formulario
2. Presiona "Generar QR"
3. `script.js` valida los datos
4. Guarda en `localStorage`
5. Abre `qr.html` en nueva pestaña

**¿Por qué localStorage?**
Es un almacenamiento temporal en el navegador. Permite que los datos pasen de una página a otra sin usar un servidor.

---

### 4. **qr-script.js** - JavaScript de la Página QR

**¿Qué hace?**
Maneja toda la lógica de la página QR.

**Funciones principales:**

```javascript
// 1. Cargar datos desde localStorage
cargarDatos();

// 2. Mostrar datos en la página
mostrarDatos();

// 3. Generar el código QR
generarCodigoQR();

// 4. Descargar QR como imagen
descargarQR();

// 5. Manejar carga de archivos
manejarSeleccionArchivo(file);

// 6. Guardar en Google Sheets y Drive
guardarDatos();
```

**Generación del QR:**

```javascript
// Los datos se convierten a JSON y se guardan en el QR
const datosJSON = JSON.stringify(datosEstudiante);

// Se usa la librería QRCode.js para generar la imagen
new QRCode(qrCodeDiv, {
  text: datosJSON,
  width: 250,
  height: 250,
});
```

**Carga de archivos:**

- Valida que sea imagen (PNG, JPG) o PDF
- Valida que no supere 5MB
- Permite drag and drop (arrastra y suelta)
- Muestra el nombre del archivo seleccionado

---

### 5. **styles.css** - Estilos del Formulario

**¿Qué hace?**
Define cómo se ve visualmente el formulario principal.

**Características:**

- Fondo degradado (púrpura)
- Tarjeta blanca en el centro
- Campos de entrada con bordes suaves
- Botón con efecto hover (cuando pasas el mouse)
- Mensajes de error y éxito
- Diseño responsivo (se adapta a celulares)

**Colores usados:**

- Púrpura principal: `#667eea`
- Púrpura oscuro: `#764ba2`
- Gris claro: `#f8f9fa`
- Negro para texto: `#333`

---

### 6. **styles-qr.css** - Estilos de la Página QR

**¿Qué hace?**
Define cómo se ve la página QR.

**Características:**

- Layout en columnas (datos, QR, comprobante)
- Área de drag and drop para archivos
- Botones interactivos
- Indicadores visuales (iconos, colores)
- Diseño responsivo

---

## 🚀 Cómo Usar el Proyecto

### Paso 1: Descargar los archivos

Todos los archivos deben estar en la misma carpeta:

```
Nueva carpeta/
├── index.html
├── qr.html
├── script.js
├── qr-script.js
├── styles.css
└── styles-qr.css
```

### Paso 2: Abrir en el navegador

1. Abre `index.html` con tu navegador
2. Llena el formulario
3. Presiona "Generar QR"
4. Se abrirá `qr.html` en una nueva pestaña
5. Descarga el QR si lo deseas
6. Sube un comprobante
7. Presiona "Guardar y Enviar"

### Paso 3: Usar con un servidor local (recomendado)

Para que funcione mejor con Google Apps Script, usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Luego abre: http://localhost:8000
```

---

## 🔗 Librerías Utilizadas

### QRCode.js (CDN)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

Esta librería genera los códigos QR. No necesita instalación, se carga automáticamente desde internet.

---

## 📊 Flujo de Datos

```
Usuario llena formulario
         ↓
script.js valida datos
         ↓
Guarda en localStorage
         ↓
Abre qr.html
         ↓
qr-script.js carga datos
         ↓
Muestra QR generado
         ↓
Usuario sube comprobante
         ↓
Presiona "Guardar"
         ↓
[PRÓXIMO] Conectar con Google Apps Script
         ↓
Guardar en Google Sheets
         ↓
Guardar comprobante en Google Drive
```

---

## 🔐 Seguridad

**Actualmente:**

- ✅ Validación de campos en el cliente
- ✅ Validación de tipos de archivo
- ✅ Validación de tamaño de archivo

**Se debe implementar:**

- 🔒 Validación en Google Apps Script
- 🔒 Autenticación de usuarios
- 🔒 Encriptación de datos sensibles

---

## 📝 Próximos Pasos

### 1. Crear Google Apps Script

- Crear un proyecto en Google Cloud
- Desarrollar el backend para Google Apps Script
- Conectar con Google Sheets
- Crear carpeta en Google Drive para comprobantes

### 2. Integrar Google Sheets

```javascript
// En qr-script.js, reemplazar la función guardarDatos()
fetch(GOOGLE_APPS_SCRIPT_URL, {
  method: "POST",
  body: JSON.stringify({
    datos: datosEstudiante,
    comprobante: archivoComprobante,
  }),
});
```

### 3. Subir Comprobante a Drive

- Usar Google Drive API
- Guardar archivos en carpeta específica
- Obtener enlace del archivo

### 4. Publicar como Web App

- Publicar HTML en Google Sites o similar
- O usar Firebase Hosting
- O desplegar en Azure App Service

---

## ❓ Preguntas Frecuentes

### ¿Cómo cambio los colores?

Abre `styles.css` y busca:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Cambia los códigos hexadecimales (#667eea, #764ba2)

### ¿Cómo añado más secciones?

En `index.html`, busca:

```html
<select id="seccion">
  <option value="">-- Selecciona una sección --</option>
  <option value="Sección A">Sección A</option>
  <option value="Sección B">Sección B</option>
  <!-- Añade aquí -->
  <option value="Sección E">Sección E</option>
</select>
```

### ¿Qué pasa si cierro la segunda pestaña?

Los datos se pierden. Para recuperarlos, vuelve al formulario y presiona "Generar QR" de nuevo.

### ¿Funciona en dispositivos móviles?

Sí, está diseñado para ser responsivo.

---

## 📞 Soporte

Si tienes preguntas, revisa:

1. Los comentarios en el código (tienen explicaciones)
2. La consola del navegador (F12 → Console)
3. Los mensajes de error que aparecen en la página

---

## 📄 Licencia

Proyecto para fines educativos universitarios.

---

## 🎯 Resumen

Este proyecto demuestra:

- ✅ HTML semántico
- ✅ CSS moderno (gradientes, flexbox)
- ✅ JavaScript funcional (funciones, eventos)
- ✅ Almacenamiento local (localStorage)
- ✅ Generación de QR
- ✅ Carga de archivos
- ✅ Diseño responsivo
- ⏳ Integración con Google Apps Script (próximo paso)

¡Ahora estás listo para conectar con Google Sheets! 🚀
