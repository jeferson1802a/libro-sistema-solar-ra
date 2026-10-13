AFRAME.registerComponent("sistema-solar", {
  init: function () {
    const crear = (tag, atributos, padre) => {
      const e = document.createElement(tag);
      Object.entries(atributos).forEach(([k, v]) => e.setAttribute(k, v));
      padre.appendChild(e);
      return e;
    };

    // Detectar si estamos sobre el marcador Hiro (RA) o en la vista 3D libre
    const esRA = Boolean(document.querySelector("#marcador"));

    // El Sol (núcleo brillante + corona solar translúcida)
    const sol = crear("a-sphere", {
      id: "sol-esfera",
      radius: 0.36,
      color: "#ffcb47",
      material: "shader: flat"
    }, this.el);

    crear("a-sphere", {
      radius: 0.43,
      color: "#ffa726",
      material: "shader: flat; transparent: true; opacity: 0.28"
    }, sol);

    // En RA el marcador Hiro mira hacia +Y y arriba del marcador es -Z,
    // por lo que rotamos -90° en X para que el texto se lea al derecho frente a la cámara.
    crear("a-text", {
      value: "Sol",
      align: "center",
      position: esRA ? "0 0.40 -0.52" : "0 0.56 0",
      rotation: esRA ? "-90 0 0" : "0 0 0",
      scale: "0.75 0.75 0.75",
      color: "#ffe082",
      side: "double",
      class: "etiqueta-3d"
    }, this.el);

    // Nombre, radio visual, distancia visual, color, grados/s, paginas.
    const planetas = [
      ["Mercurio", 0.08, 0.65, "#a2a2a2", 28, "2 5"],
      ["Venus",    0.12, 0.95, "#d9b174", 23, "2 5"],
      ["Tierra",   0.13, 1.25, "#2788ce", 18, "2 4 5"],
      ["Marte",    0.10, 1.55, "#c27750", 15, "2 5"],
      ["Jupiter",  0.25, 1.95, "#c89e7a", 11, "3 5"],
      ["Saturno",  0.22, 2.50, "#d6c287",  8, "3 5"],
      ["Urano",    0.17, 3.05, "#7cd8dd",  6, "3 5"],
      ["Neptuno",  0.16, 3.45, "#4169ce",  4, "3 5"]
    ];

    planetas.forEach(([nombre, radio, d, color, v, paginas], i) => {
      const colorOrbita = nombre === "Tierra" ? "#4fc3f7" : "#8398b0";
      const anguloInicial = i * 45;

      const giro = crear("a-entity", {
        orbita: `radio: ${d}; velocidad: ${v}; color: ${colorOrbita}`,
        rotation: `0 ${anguloInicial} 0`,
        "data-paginas": paginas,
        "data-planeta": nombre
      }, this.el);

      // Contenedor en la posición orbital
      const nodoPosicion = crear("a-entity", {
        position: `${d} 0 0`
      }, giro);

      // Contenedor que compensa el giro orbital para que el texto siempre esté al derecho
      const orientadorEtiqueta = crear("a-entity", {
        class: "orientador-etiqueta",
        rotation: `0 ${-anguloInicial} 0`
      }, nodoPosicion);

      crear("a-text", {
        value: nombre,
        align: "center",
        position: esRA ? `0 ${radio + 0.08} ${-(radio + 0.20)}` : `0 ${radio + 0.24} 0`,
        rotation: esRA ? "-90 0 0" : "0 0 0",
        scale: "0.62 0.62 0.62",
        color: "#ffffff",
        side: "double",
        class: "etiqueta-3d"
      }, orientadorEtiqueta);

      // Cuerpo del planeta con animación de rotación sobre su propio eje
      const cuerpo = crear("a-entity", {
        animation: "property: rotation; to: 0 360 0; " +
          "dur: 6000; loop: true; easing: linear"
      }, nodoPosicion);

      crear("a-sphere", {
        radius: radio,
        color,
        material: "shader: flat"
      }, cuerpo);

      if (nombre === "Tierra") {
        // Punto verde continental en latitud media para ver la rotación tanto de frente como desde arriba
        crear("a-sphere", {
          radius: 0.035,
          position: `0 ${radio * 0.65} ${radio * 0.72}`,
          color: "#50b877",
          material: "shader: flat"
        }, cuerpo);

        // La Luna orbitando alrededor de la Tierra
        const orbitaLuna = crear("a-entity", {
          animation: "property: rotation; to: 0 360 0; dur: 3200; loop: true; easing: linear"
        }, nodoPosicion);

        crear("a-sphere", {
          radius: 0.03,
          position: `${radio + 0.11} 0 0`,
          color: "#e2e8f0",
          material: "shader: flat"
        }, orbitaLuna);
      }

      if (nombre === "Jupiter") {
        crear("a-torus", {
          radius: radio * 0.98,
          "radius-tubular": 0.012,
          rotation: "90 0 0",
          color: "#a66c46",
          material: "shader: flat"
        }, cuerpo);
      }

      if (nombre === "Saturno") {
        crear("a-torus", {
          radius: 0.33,
          "radius-tubular": 0.035,
          rotation: "-65 0 0",
          color: "#f0d99b",
          material: "shader: flat"
        }, cuerpo);
      }

      if (nombre === "Urano") {
        crear("a-torus", {
          radius: 0.24,
          "radius-tubular": 0.008,
          rotation: "15 0 0",
          color: "#b2ebf2",
          material: "shader: flat; transparent: true; opacity: 0.6"
        }, cuerpo);
      }
    });
  }
});
