const textos = {
  1: "El Sol es una estrella de tipo espectral G2V y concentra el 99,86 % de la masa del sistema solar. " +
     "Su energía térmica y luminosa hace posible la vida en la Tierra.",

  2: "Mercurio, Venus, Tierra y Marte son los planetas interiores o rocosos. " +
     "Tienen superficie sólida, menor tamaño y orbitan más cerca del Sol.",

  3: "Júpiter y Saturno son gigantes gaseosos (hidrógeno y helio); Urano y Neptuno son gigantes helados. " +
     "Destacan por su gran volumen y sus sistemas de anillos.",

  4: "Rotación es el giro de un planeta sobre su propio eje (día y noche, 24 h en la Tierra). " +
     "Traslación es el recorrido alrededor del Sol siguiendo su órbita (año terrestre, 365,25 días).",

  5: "El sistema solar está formado por el Sol y ocho planetas en orden: Mercurio, Venus, Tierra, Marte, " +
     "Júpiter, Saturno, Urano y Neptuno. Desde 2006 (UAI), Plutón se clasifica como planeta enano."
};

const fichasDidacticas = {
  1: {
    subtitulo: "Capítulo 1 · Nuestra estrella central",
    datos: [
      "🌡️ Temp. superficial: ~5 500 °C",
      "☀️ Tipo: Estrella enana amarilla",
      "⚡ Fusión nuclear: Hidrógeno → Helio"
    ],
    pregunta: "Pregunta guía: Observa el modelo amarillo con su corona solar. ¿Qué diferencia a una estrella de un planeta?"
  },
  2: {
    subtitulo: "Capítulo 2 · Planetas interiores o telúricos",
    datos: [
      "🪨 Orden: 1.° Mercurio · 2.° Venus · 3.° Tierra · 4.° Marte",
      "🌍 Tierra: Único con océanos líquidos y satélite natural (Luna)",
      "🔴 Marte: Llamado planeta rojo por el óxido de hierro"
    ],
    pregunta: "Pregunta guía: Identifica la Tierra azul con su Luna y ordena los cuatro planetas desde el Sol."
  },
  3: {
    subtitulo: "Capítulo 3 · Planetas exteriores (Gigantes)",
    datos: [
      "🪐 Gigantes gaseosos: 5.° Júpiter (el mayor) y 6.° Saturno",
      "❄️ Gigantes helados: 7.° Urano y 8.° Neptuno",
      "💫 Anillos: Visibles con gran amplitud en Saturno y tenues en Urano"
    ],
    pregunta: "Pregunta guía: Compara los tamaños en la escena 3D. ¿Qué planeta destaca por su sistema de anillos?"
  },
  4: {
    subtitulo: "Capítulo 4 · Movimientos planetarios",
    datos: [
      "🔄 Rotación (eje blanco): Giro sobre sí mismo → produce el día y la noche",
      "🛸 Traslación (anillo celeste): Recorrido orbital → produce el año y estaciones",
      "🌙 Satélite: La Luna orbita simultáneamente alrededor de la Tierra"
    ],
    pregunta: "Pregunta guía: Sigue el punto verde de la Tierra y su eje blanco. Pulsa Pausar para distinguir rotación y traslación."
  },
  5: {
    subtitulo: "Capítulo 5 · Visión integral del Sistema Solar",
    datos: [
      "🌌 8 Planetas: 4 rocosos interiores + 4 gigantes exteriores",
      "📐 Velocidad orbital: Más rápida cerca del Sol (Mercurio) y más lenta lejos (Neptuno)",
      "🔬 Nota: Escala didáctica adaptada para visualización en Realidad Aumentada"
    ],
    pregunta: "Pregunta guía: Recorre el orden de los ocho planetas desde el Sol. ¿Por qué los planetas más lejanos tardan más en completar su órbita?"
  }
};

const selector = document.querySelector("#pagina");
const sistema = document.querySelector("#sistema");
const estado = document.querySelector("#estado");
const boton = document.querySelector("#pausa");
const marcador = document.querySelector("#marcador");
const subtituloEl = document.querySelector("#subtitulo-pagina");
const listaDatosEl = document.querySelector("#lista-datos");
const preguntaEl = document.querySelector("#pregunta-guia");
const indicadorPag = document.querySelector("#indicador-pagina");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVoz = document.querySelector("#btn-voz");
const btnEtiquetas = document.querySelector("#btn-etiquetas");
const btnHiro = document.querySelector("#btn-hiro");
const cerrarHiro = document.querySelector("#cerrar-hiro");
const modalHiro = document.querySelector("#modal-hiro");
const btnMinimizar = document.querySelector("#btn-minimizar");
const panel = document.querySelector("#panel");
const selectorVelocidad = document.querySelector("#velocidad");

let enPausa = false;
let etiquetasVisibles = true;
window.velocidadOrbitalFactor = 1;

function detenerNarracion() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (btnVoz) {
    btnVoz.textContent = "🔊 Narrar";
    btnVoz.classList.remove("activo");
  }
}

function mostrarPagina() {
  const num = Number(selector.value);
  document.querySelector("#contenido").textContent = textos[num];

  const ficha = fichasDidacticas[num];
  if (ficha) {
    if (subtituloEl) subtituloEl.textContent = ficha.subtitulo;
    if (preguntaEl) preguntaEl.textContent = ficha.pregunta;
    if (listaDatosEl) {
      listaDatosEl.innerHTML = "";
      ficha.datos.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listaDatosEl.appendChild(li);
      });
    }
  }

  if (indicadorPag) {
    indicadorPag.textContent = `Página ${num} de 5`;
  }
  if (btnPrev) btnPrev.disabled = num <= 1;
  if (btnNext) btnNext.disabled = num >= 5;

  if (sistema) {
    sistema.querySelectorAll("[data-paginas]").forEach(el => {
      const paginas = el.dataset.paginas.split(" ");
      el.setAttribute("visible", paginas.includes(String(num)));
    });
  }

  detenerNarracion();
}

selector.addEventListener("change", mostrarPagina);
if (sistema) {
  sistema.addEventListener("loaded", mostrarPagina);
}
mostrarPagina();

if (btnPrev) {
  btnPrev.addEventListener("click", () => {
    const actual = Number(selector.value);
    if (actual > 1) {
      selector.value = String(actual - 1);
      mostrarPagina();
    }
  });
}

if (btnNext) {
  btnNext.addEventListener("click", () => {
    const actual = Number(selector.value);
    if (actual < 5) {
      selector.value = String(actual + 1);
      mostrarPagina();
    }
  });
}

boton.addEventListener("click", () => {
  enPausa = !enPausa;

  if (enPausa) {
    sistema.pause();
  } else {
    sistema.play();
  }

  boton.textContent = enPausa ? "▶ Continuar" : "⏸ Pausar";
  boton.classList.toggle("pausado", enPausa);
});

if (selectorVelocidad) {
  selectorVelocidad.addEventListener("change", () => {
    window.velocidadOrbitalFactor = Number(selectorVelocidad.value) || 1;
  });
}

if (btnEtiquetas) {
  btnEtiquetas.addEventListener("click", () => {
    etiquetasVisibles = !etiquetasVisibles;
    document.querySelectorAll(".etiqueta-3d").forEach(el => {
      el.setAttribute("visible", etiquetasVisibles);
    });
    btnEtiquetas.textContent = etiquetasVisibles ? "🏷️ Nombres: Sí" : "🏷️ Nombres: No";
  });
}

if (btnVoz) {
  btnVoz.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      estado.textContent = "Tu navegador no soporta síntesis de voz.";
      return;
    }

    if (window.speechSynthesis.speaking) {
      detenerNarracion();
      return;
    }

    const num = Number(selector.value);
    const ficha = fichasDidacticas[num];
    const textoCompleto = `${ficha.subtitulo}. ${textos[num]} ${ficha.pregunta}`;
    const locucion = new SpeechSynthesisUtterance(textoCompleto);
    locucion.lang = "es-ES";
    locucion.rate = 1.0;

    locucion.onend = () => {
      btnVoz.textContent = "🔊 Narrar";
      btnVoz.classList.remove("activo");
    };

    btnVoz.textContent = "⏹ Detener voz";
    btnVoz.classList.add("activo");
    window.speechSynthesis.speak(locucion);
  });
}

if (btnHiro && modalHiro) {
  btnHiro.addEventListener("click", () => {
    modalHiro.hidden = false;
  });
}

if (cerrarHiro && modalHiro) {
  cerrarHiro.addEventListener("click", () => {
    modalHiro.hidden = true;
  });
  modalHiro.addEventListener("click", e => {
    if (e.target === modalHiro) modalHiro.hidden = true;
  });
}

if (btnMinimizar && panel) {
  btnMinimizar.addEventListener("click", () => {
    const minimizado = panel.classList.toggle("minimizado");
    btnMinimizar.textContent = minimizado ? "📖 Abrir libro" : "➖ Minimizar";
    btnMinimizar.setAttribute("aria-expanded", String(!minimizado));
  });
}

if (marcador) {
  marcador.addEventListener("markerFound", () => {
    estado.textContent = "✅ Marcador Hiro detectado. Explora la página seleccionada.";
    estado.className = "estado-ok";
  });

  marcador.addEventListener("markerLost", () => {
    estado.textContent = "📷 Enfoca el marcador Hiro completo frente a la cámara.";
    estado.className = "estado-alerta";
  });
}

window.addEventListener("camera-error", () => {
  estado.textContent = "⚠️ Revisa HTTPS, permisos de cámara o usa la Vista 3D sin cámara.";
  estado.className = "estado-error";
});
