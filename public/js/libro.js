const textos = {
  1: "El Sol es una estrella y aporta energía a la Tierra. " +
     "Observa el modelo amarillo. ¿Qué lo diferencia de un planeta?",

  2: "Mercurio, Venus, Tierra y Marte son planetas rocosos. " +
     "Identifica la Tierra azul y ordena los cuatro desde el Sol.",

  3: "Júpiter y Saturno son gigantes gaseosos; Urano y Neptuno, " +
     "gigantes helados. ¿Qué planeta aparece con un anillo?",

  4: "Rotación es girar sobre el propio eje; traslación es recorrer " +
     "la órbita. Sigue el punto verde de la Tierra y pulsa Pausar.",

  5: "El sistema solar tiene ocho planetas. Recorre su orden desde " +
     "el Sol. Plutón se clasifica como planeta enano."
};

const selector = document.querySelector("#pagina");
const sistema = document.querySelector("#sistema");
const estado = document.querySelector("#estado");
const boton = document.querySelector("#pausa");
const marcador = document.querySelector("#marcador");

function mostrarPagina() {
  document.querySelector("#contenido").textContent = textos[selector.value];

  sistema.querySelectorAll("[data-paginas]").forEach(el => {
    const paginas = el.dataset.paginas.split(" ");
    el.setAttribute("visible", paginas.includes(selector.value));
  });
}

selector.addEventListener("change", mostrarPagina);
sistema.addEventListener("loaded", mostrarPagina);
mostrarPagina();

let enPausa = false;

boton.addEventListener("click", () => {
  enPausa = !enPausa;

  if (enPausa) {
    sistema.pause();
  } else {
    sistema.play();
  }

  boton.textContent = enPausa ? "Continuar" : "Pausar";
});

marcador.addEventListener("markerFound", () => {
  estado.textContent = "Marcador detectado. Selecciona tu página.";
});

marcador.addEventListener("markerLost", () => {
  estado.textContent = "Vuelve a enfocar el marcador completo.";
});

window.addEventListener("camera-error", () => {
  estado.textContent = "Revisa HTTPS, permisos y disponibilidad de cámara.";
});
