import Vue from "vue";
import Vuex from "vuex";
import i18n from "@/stores/i18n";
import theme from "@/stores/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    i18n,
    theme
  }
});
