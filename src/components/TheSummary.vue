<template>
  <div class="the-summary" :style="summaryStyle">
    <p class="the-summary__i-believe">
      {{ $store.getters.getText("SUMMARY_LINE_1") }}
    </p>
    <p class="the-summary__craftsman">
      {{ $store.getters.getText("SUMMARY_LINE_2") }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    animateLineOne: { type: Number, default: 0 },
    animateLineTwo: { type: Number, default: 0 }
  },
  computed: {
    /** @type {() => {[property: string]: number}} */
    summaryStyle() {
      return {
        "--the-summary-animate-line-1": this.animateLineOne,
        "--the-summary-animate-line-2": this.animateLineTwo
      };
    }
  }
};
</script>

<style lang="scss">
.the-summary {
  text-align: center;
  padding: 30vh 3rem;

  &__i-believe {
    $animate: var(--the-summary-animate-line-1);
    transform: translateY(calc((1 - #{$animate}) * 20vh));
    opacity: $animate;
    font-family: $font-heading;
    font-size: 2rem;
  }

  &__craftsman {
    $animate: var(--the-summary-animate-line-2);
    transform: translateY(calc((1 - #{$animate}) * 15vh));
    opacity: $animate;
    font-size: 1.3rem;
  }
}
</style>
