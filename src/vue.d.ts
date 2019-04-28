import Vue, { ComponentOptions } from "vue";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    vars?: () => { [name: string]: any };
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $vars: { [name: string]: any };
  }
}
