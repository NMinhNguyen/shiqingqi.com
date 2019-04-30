<template>
  <div class="the-header" :style="headerStyle">
    <div class="the-header__logo">
      <logo />
    </div>
    <div class="the-header__title">
      <h2>{{ $store.getters.getText("GREETING") }}</h2>
      <h1>{{ $store.getters.getText("SITE_NAME") }}</h1>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";

export default {
  components: {
    Logo
  },
  props: {
    animateTitle: { type: Number, default: 0 },
    animateBackground: { type: Number, default: 0 }
  },
  computed: {
    /** @type {() => {[property: string]: number}} */
    headerStyle() {
      return {
        "--the-header-animate-title": this.animateTitle,
        "--the-header-animate-background": this.animateBackground
      };
    }
  }
};
</script>

<style lang="scss">
$animate-title: var(--the-header-animate-title);
$animate-background: var(--the-header-animate-background);

.the-header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  padding: 0 1rem;
  overflow: hidden;
  align-items: center;
  z-index: $z-header;
  height: calc(6rem - #{$animate-background} * 2rem);

  &__logo {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    opacity: $animate-title;
    transform: translateX(calc(#{$animate-title} * 3rem - 3rem));
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    transform: translate(
      calc(#{$animate-title} * 4rem - 3rem),
      calc(#{$animate-background} * -4rem)
    );
  }

  h1,
  h2 {
    line-height: calc(6rem - #{$animate-title} * 2rem);
    font-size: calc(#{$size-l} - #{$animate-title} * (#{$size-l - $size-m}));
    margin: 0;
  }

  h1 {
    opacity: $animate-title;
  }

  h2 {
    opacity: calc(1 - #{$animate-title});
  }
}
</style>
