import { shallowMount } from "@vue/test-utils";
import ThemeProvider from "@/components/ThemeProvider.vue";

// Mock hex2rgb
jest.mock("@/utils/color", () => ({
  hex2rgb: jest.fn(() => ({ r: 1, g: 2, b: 3 }))
}));

/** @type {{state: {[module:string]: any}}} */
const stubStore = {
  state: {
    theme: {
      colors: {
        blue: "#0000FF",
        red: "#FF0000"
      }
    }
  }
};

const oldSetProperty = document.body.style.setProperty;

describe("ThemeProvider.vue", () => {
  /** @type {jest.Mock<any, any>} */
  let setProperty;

  beforeEach(() => {
    document.body.style.setProperty = setProperty = jest.fn();
  });

  afterEach(() => {
    document.body.style.setProperty = oldSetProperty;
  });

  it("renders empty fragment", () => {
    const wrapper = shallowMount(ThemeProvider, {
      attachToDocument: true,
      mocks: { $store: stubStore }
    });

    expect(wrapper.is("fragment-stub")).toBe(true);
    expect(wrapper.isEmpty()).toBe(true);

    wrapper.destroy();
  });

  it("attach css variables to the body", () => {
    shallowMount(ThemeProvider, {
      attachToDocument: true,
      mocks: { $store: stubStore }
    }).destroy();

    expect(setProperty).toHaveBeenCalledTimes(4);
    expect(setProperty).toHaveBeenCalledWith("--red", "#FF0000");
    expect(setProperty).toHaveBeenCalledWith("--blue", "#0000FF");
    expect(setProperty).toHaveBeenCalledWith("--red-rgb", "1,2,3");
    expect(setProperty).toHaveBeenCalledWith("--blue-rgb", "1,2,3");
  });

  it("respond to theme change", () => {
    const wrapper = shallowMount(ThemeProvider, {
      attachToDocument: true,
      mocks: { $store: stubStore }
    });

    document.body.style.setProperty = setProperty = jest.fn();

    stubStore.state.theme.colors = {
      purple: "#FF00FF"
    };

    expect(setProperty).toHaveBeenCalledTimes(2);
    expect(setProperty).toHaveBeenCalledWith("--purple", "#FF00FF");
    expect(setProperty).toHaveBeenCalledWith("--purple-rgb", "1,2,3");

    wrapper.destroy();
  });
});
