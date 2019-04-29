<template>
  <div ref="scene" class="scroll-scene">
    <div ref="inner" class="scroll-scene__sticky">
      <slot :get-animate="getAnimate" />
    </div>
  </div>
</template>

<script>
import { debounce } from "@/utils/time";
import { createAnimation, calcProgress } from "@/utils/scroll";

export default {
  data: () => ({
    /** @type {boolean} */
    intersecting: false,
    /** @type {number} */
    progress: 0
  }),
  vars: () => ({
    /** @type {IntersectionObserver} */
    observer: null,
    offset: 0,
    height: 0,
    innerHeight: 0
  }),
  computed: {
    /** @returns {(options?: {easing?: string, range?: number[]}) => number} */
    getAnimate() {
      return createAnimation(this.progress);
    }
  },
  mounted() {
    this.handleResize();
    this.handleScroll();
    this.observe();
  },
  beforeDestroy() {
    this.unobserve();
  },
  methods: {
    observe() {
      this.$vars.observer = new IntersectionObserver(this.handleIntersect);
      this.$vars.observer.observe(/** @type {Element} */ (this.$refs.scene));

      window.addEventListener("resize", this.handleResize);
      window.addEventListener("scroll", this.handleScroll);
    },
    unobserve() {
      this.$vars.observer && this.$vars.observer.disconnect();
      this.$vars.observer = null;

      window.removeEventListener("resize", this.handleResize);
      window.removeEventListener("scroll", this.handleScroll);
    },
    /** @param {IntersectionObserverEntry[]} entries */
    handleIntersect(entries) {
      entries.forEach(entry => (this.intersecting = entry.isIntersecting));
    },
    handleScroll() {
      if (!this.intersecting) return;

      this.progress = calcProgress({
        scroll: window.pageYOffset,
        offset: this.$vars.offset,
        height: this.$vars.height,
        innerHeight: this.$vars.innerHeight
      });
    },
    handleResize: debounce(300, function() {
      const scene = /** @type {HTMLElement} */ (this.$refs.scene);
      const inner = /** @type {HTMLElement} */ (this.$refs.inner);

      this.$vars.offset = scene.offsetTop;
      this.$vars.height = scene.getBoundingClientRect().height;
      this.$vars.innerHeight = inner.getBoundingClientRect().height;
    })
  }
};
</script>

<style lang="scss">
.scroll-scene {
  position: relative;

  &__sticky {
    position: sticky;
    top: 0;
    width: 100%;
    height: 100vh;
  }
}
</style>
