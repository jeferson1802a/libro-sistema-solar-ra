# Libro educativo del sistema solar con Realidad Aumentada

Proyecto de la guía de **Tecnologías Emergentes** usando:

- A-Frame 1.6.0
- Three.js mediante `AFRAME.THREE`
- AR.js 3.4.7
- HTML, CSS y JavaScript
- GitHub Codespaces

**No se necesita Python.**

## Estructura

```text
libro_ra_sistema_solar/
├── .vscode/
│   └── extensions.json
├── public/
│   ├── assets/
│   │   └── LEEME.txt
│   ├── css/
│   │   └── estilos.css
│   ├── js/
│   │   ├── libro.js
│   │   ├── orbita.js
│   │   └── sistema.js
│   ├── aframe.html
│   ├── vista3d.html
│   ├── index.html
│   └── ejemplos-opcionales.html
├── package.json
└── README.md
```

## Opción rápida en GitHub Codespaces

Abra una terminal en la raíz del proyecto y ejecute:

```bash
npx --yes http-server public -p 8000 -a 0.0.0.0
```

Luego abra el puerto **8000** desde la pestaña **Ports**.

Pruebe:

- `/aframe.html` → Sol y Tierra con A-Frame.
- `/vista3d.html` → sistema solar completo con Three.js.
- `/index.html` → Realidad Aumentada con AR.js.

## Opción con npm

```bash
npm install
npm start
```

## Uso de AR

1. Abra `/index.html` mediante la URL HTTPS del puerto de Codespaces.
2. Autorice el uso de la cámara.
3. Muestre el marcador Hiro frente a la cámara.
4. Seleccione una página del libro.
5. Use **Pausar / Continuar** para controlar las animaciones.

## Marcador Hiro

El proyecto usa:

```html
<a-marker preset="hiro">
```

Por ello, el navegador reconoce directamente el patrón Hiro de AR.js.

Puede guardar una copia imprimible dentro de `public/assets/` con el nombre
`hiro.png`.

## Importante

Los tamaños, distancias y velocidades se han definido con fines didácticos.
No representan una escala astronómica real.
