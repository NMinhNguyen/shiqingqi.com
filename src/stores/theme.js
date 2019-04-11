import { colors } from "@/constants/theme";

export const state = {
  name: "dark",
  colors: colors["dark"]
};

export const mutations = {
  /**
   * Sets the current theme.
   * @param {{name: string, colors: any}} state State object.
   * @param {"dark"} theme Name of the new theme.
   */
  setTheme(state, theme) {
    state.name = theme;
    state.colors = colors[theme];
  }
};

export default {
  state,
  mutations
};
