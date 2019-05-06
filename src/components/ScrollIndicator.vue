<template functional>
  <div class="scroll-indicator">
    <div class="scroll-indicator__arrow"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@keyframes phase {
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.scroll-indicator {
  position: fixed;
  z-index: $z-sink;
  left: 0;
  right: 0;
  bottom: 4rem;
  display: flex;
  justify-content: center;
  opacity: 0.3;

  &__arrow {
    position: relative;
    opacity: 0.2;
    animation: phase 4s ease infinite;

    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      width: 0.5rem;
      height: 1.8rem;
      background-color: $on-primary;
      transform-origin: 50% 90%;
    }

    &:before {
      transform: rotate(50deg);
    }

    &:after {
      transform: rotate(-50deg);
    }
  }
}
</style>
