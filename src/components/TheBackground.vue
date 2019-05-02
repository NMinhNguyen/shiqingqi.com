<template>
  <div class="the-background">
    <div class="the-background__clip" :style="backgroundStyle">
      <flowing-gradient class="the-background__gradient" />
    </div>
  </div>
</template>

<script>
import FlowingGradient from "@/components/FlowingGradient.vue";

export default {
  components: {
    FlowingGradient
  },
  props: {
    animateExpand: { type: Number, default: 0 },
    bobingDuration: { type: Number, default: 2000 }
  },
  data: () => ({
    bob: 0
  }),
  vars: () => ({
    runAnimation: true
  }),
  computed: {
    /** @returns {{[property: string]: number}} */
    backgroundStyle() {
      return {
        "--the-background-animate-expand": this.animateExpand,
        "--the-background-animate-bob": this.bob
      };
    }
  },
  watch: {
    animateExpand(val) {
      if (val >= 1) {
        this.$vars.runAnimation = false;
        this.bob = 0;
      } else {
        this.$vars.runAnimation = true;
        this.bobingAnimation(0);
      }
    }
  },
  mounted() {
    this.$vars.runAnimation = this.animateExpand < 1;
    this.bobingAnimation(0);
  },
  beforeDestroy() {
    this.$vars.runAnimation = false;
  },
  methods: {
    /** @param {number} t */
    bobingAnimation(t) {
      if (!this.$vars.runAnimation) return;

      const factor = Math.PI / this.bobingDuration;
      const bob = Math.sin(t * factor) * 0.5 + 0.5;
      this.bob = bob * (1 - this.animateExpand);

      window.requestAnimationFrame(this.bobingAnimation);
    }
  }
};
</script>

<style lang="scss">
$animate-expand: var(--the-background-animate-expand);
$animate-bob: var(--the-background-animate-bob);

.the-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: $z-background;
  display: flex;
  justify-content: center;
  align-items: center;

  &__clip {
    @include shadow(light-purple, "((1 - #{$animate-bob}) * 2 + 2)");
    overflow: hidden;
    will-change: transform;
    height: calc(8rem + #{$animate-expand} * (100% - 8rem));
    width: calc(8rem + #{$animate-expand} * (100% - 8rem));
    border-radius: calc((1 - #{$animate-expand}) * 4rem);
    transform: translateY(
      calc(10vh * (1 - #{$animate-expand}) + 5vh * #{$animate-bob})
    );

    @media only screen and (orientation: landscape) {
      transform: translateY(calc(5vh * #{$animate-bob}));
    }
  }

  &__gradient {
    width: 100vw;
    height: 100vh;
  }
}
</style>
