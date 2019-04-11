<template>
  <fragment />
</template>

<script>
import Fragment from "@/components/Fragment.vue";
import { mapState } from "vuex";
import { hex2rgb } from "@/utils/color";

export default {
  components: {
    Fragment
  },
  computed: mapState({
    colors: state => state.theme.colors
  }),
  watch: {
    colors() {
      this.setStyleAttribute();
    }
  },
  mounted() {
    this.setStyleAttribute();
  },
  methods: {
    setStyleAttribute() {
      Object.keys(this.colors).forEach(colorName => {
        document.body.style.setProperty(
          `--${colorName}`,
          this.colors[colorName]
        );

        const rgb = hex2rgb(this.colors[colorName]);
        document.body.style.setProperty(
          `--${colorName}-rgb`,
          `${rgb.r},${rgb.g},${rgb.b}`
        );
      });
    }
  }
};
</script>

<style></style>
