<template>
  <div class="the-technologies" :style="technologiesStyle">
    <span class="the-technologies__write">
      {{ $store.getters.getText("I_WRITE") }}
    </span>
    <div class="the-technologies__list">
      <span
        v-for="(tech, i) in technologies"
        :key="`the-technologies-${i}`"
        :style="{ '--the-technologies-index': i }"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    technologies: {
      type: Array,
      /** @returns {any[]} */
      default: () => ["JavaScript", "CSS", "HTML"]
    },
    animateScroll: { type: Number, default: 0 }
  },
  computed: {
    /** @returns {{[property: string]: number}} */
    technologiesStyle() {
      return {
        "--the-technologies-animate-scroll": this.animateScroll,
        "--the-technologies-count": this.technologies.length - 1
      };
    }
  }
};
</script>

<style lang="scss">
.the-technologies {
  display: flex;
  padding: 30vh 2rem 2rem;
  height: 100%;
  font-size: 2rem;

  &__write {
    flex-grow: 1;
    text-align: right;
    padding-right: 0.5rem;
  }

  &__list {
    $animate: var(--the-technologies-animate-scroll);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    font-family: $font-heading;
    position: relative;
    transform: translateY(calc(#{$animate} * (-70vh + 4rem + 5px)));

    span {
      $n: var(--the-technologies-count);
      $i: var(--the-technologies-index);
      --the-technologies-fade-count: calc((#{$n} + 1) / 3);
      $f: var(--the-technologies-fade-count);

      opacity: calc(-1 * (#{$n} / #{$f}) * (#{$animate} - #{$i} / #{$n}) + 1);
    }
  }
}
</style>
