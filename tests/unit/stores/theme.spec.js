import { state, mutations } from "@/stores/theme";

jest.mock("@/constants/theme", () => ({
  colors: {
    dark: {
      red: "#FF0000"
    },
    light: {
      red: "#00FF00"
    }
  }
}));

describe("stores/theme.js", () => {
  it("default theme is 'dark'", () => {
    expect(state.name).toEqual("dark");
  });

  it("default colors are defined in the theme constant", () => {
    expect(state.colors).toEqual({ red: "#FF0000" });
  });

  it("set theme with mutations", () => {
    const state = { name: "light", colors: { red: "#00FF00" } };

    mutations.setTheme(state, "dark");

    expect(state.colors).toEqual({ red: "#FF0000" });
  });
});
