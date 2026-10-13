// Three.js ya viene incluido en A-Frame.
const THREE = AFRAME.THREE;

AFRAME.registerComponent("orbita", {
  schema: {
    radio: {type: "number", default: 1},
    velocidad: {type: "number", default: 12},
    color: {type: "color", default: "#8398b0"}
  },

  init: function () {
    const r = this.data.radio;

    this.geometria = new THREE.RingGeometry(r - 0.007, r + 0.007, 72);
    this.material = new THREE.MeshBasicMaterial({
      color: this.data.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65
    });

    const anillo = new THREE.Mesh(this.geometria, this.material);
    anillo.rotation.x = -Math.PI / 2;

    this.el.setObject3D("trayectoria", anillo);
  },

  update: function () {
    if (this.material) {
      this.material.color.set(this.data.color);
    }
  },

  tick: function (tiempo, delta) {
    if (!delta || !this.el.getAttribute("visible")) return;

    const factor = window.velocidadOrbitalFactor || 1;
    const radianes = (this.data.velocidad * factor) * Math.PI / 180;
    this.el.object3D.rotation.y += radianes * delta / 1000;

    // Mantener la etiqueta del planeta siempre derecha (sin girar al revés con la órbita)
    if (!this.orientador) {
      this.orientador = this.el.querySelector(".orientador-etiqueta");
    }
    if (this.orientador) {
      this.orientador.object3D.rotation.y = -this.el.object3D.rotation.y;
    }
  },

  remove: function () {
    this.el.removeObject3D("trayectoria");
    this.geometria.dispose();
    this.material.dispose();
  }
});
