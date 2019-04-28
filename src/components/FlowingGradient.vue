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

export default {
  props: {
    top: { type: String, default: "#0F2027" },
    bottom: { type: String, default: "#240b36" },
    cover: { type: String, default: "#c31432" },
    speed: { type: Number, default: 1 },
    offset: { type: Number, default: 0 }
  },
  vars: () => ({
    noise: new SimplexNoise(),
    /** @type {import("@/utils/canvas").LowResCanvas} */
    lowResCanvas: null,
    loopTimer: 0,
    t: 0
  }),
  mounted() {
    const canvas = /** @type {HTMLCanvasElement} */ (this.$refs.canvas);

    this.$vars.t = 0;
    this.$vars.lowResCanvas = createLowResCanvas({ canvas, gridWidth: 30 });
    resize(this.$vars.lowResCanvas);

    window.addEventListener("resize", this.handleResize);

    this.$vars.loopTimer = window.setInterval(this.loop, 33);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    clearInterval(this.$vars.loopTimer);
  },
  methods: {
    handleResize: debounce(300, function() {
      resize(this.$vars.lowResCanvas);
    }),
    loop() {
      this.draw();

      this.$vars.t +=
        this.speed / (0.5 * Math.max(window.innerHeight, window.innerWidth));
    },
    draw() {
      fillLinearGradient(this.$vars.lowResCanvas, {
        direction: "TOP_TO_BOTTOM",
        colors: [
          { offset: 0, color: this.top },
          { offset: 1, color: this.bottom }
        ]
      });

      const { r, g, b } = hex2rgb(this.cover);
      const pageHeight =
        document.documentElement.scrollHeight -
        this.$vars.lowResCanvas.canvas.height;
      const yOffset =
        this.offset * (pageHeight / this.$vars.lowResCanvas.gridWidth);

      const ratio = Math.max(
        this.$vars.lowResCanvas.gridResolution.x,
        this.$vars.lowResCanvas.gridResolution.y
      );
      fillCells(this.$vars.lowResCanvas, (x, y) => {
        const a = ease.inCubic(
          this.$vars.noise.noise3D(
            x / ratio,
            (y + yOffset) / ratio,
            this.$vars.t
          ) *
            0.5 +
            0.5
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
