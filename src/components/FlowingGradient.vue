<template>
  <div class="flowing-gradient">
    <canvas ref="canvas" class="flowing-gradient__canvas">
      Your browser doesn't support canvas.
    </canvas>
  </div>
</template>

<script>
import SimplexNoise from "simplex-noise";
import { ease, debounce } from "@/utils/time";
import { hex2rgb } from "@/utils/color";
import {
  createLowResCanvas,
  resize,
  fillLinearGradient,
  fillCells
} from "@/utils/canvas";

// Non-reactive variables
/** @type {SimplexNoise} */
const noise = new SimplexNoise();
/** @type {import("@/utils/canvas").LowResCanvas} */
let lowResCanvas;
/** @type {number} */
let loopTimer;
/** @type {number} */
let t;

export default {
  props: {
    top: { type: String, default: "#0F2027" },
    bottom: { type: String, default: "#240b36" },
    cover: { type: String, default: "#c31432" },
    speed: { type: Number, default: 1 },
    offset: { type: Number, default: 0 }
  },
  mounted() {
    const canvas = /** @type {HTMLCanvasElement} */ (this.$refs.canvas);

    t = 0;
    lowResCanvas = createLowResCanvas({ canvas, gridWidth: 30 });
    resize(lowResCanvas);

    window.addEventListener("resize", this.handleResize);

    loopTimer = window.setInterval(this.loop, 33);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    clearInterval(loopTimer);
  },
  methods: {
    handleResize: debounce(300, function() {
      resize(lowResCanvas);
    }),
    loop() {
      this.draw();

      t += this.speed / (0.5 * Math.max(window.innerHeight, window.innerWidth));
    },
    draw() {
      fillLinearGradient(lowResCanvas, {
        direction: "TOP_TO_BOTTOM",
        colors: [
          { offset: 0, color: this.top },
          { offset: 1, color: this.bottom }
        ]
      });

      const { r, g, b } = hex2rgb(this.cover);
      const pageHeight =
        document.documentElement.scrollHeight - lowResCanvas.canvas.height;
      const yOffset = this.offset * (pageHeight / lowResCanvas.gridWidth);

      const ratio = Math.max(
        lowResCanvas.gridResolution.x,
        lowResCanvas.gridResolution.y
      );
      fillCells(lowResCanvas, (x, y) => {
        const a = ease.inCubic(
          noise.noise3D(x / ratio, (y + yOffset) / ratio, t) * 0.5 + 0.5
        );
        return { r, g, b, a };
      });
    }
  }
};
</script>

<style lang="scss">
.flowing-gradient {
  height: 100%;
  width: 100%;
  overflow: hidden;

  &__canvas {
    display: block;
    width: 100%;
    height: 100%;
    transform: scale(1.2);
    filter: blur(15px);
  }
}
</style>
