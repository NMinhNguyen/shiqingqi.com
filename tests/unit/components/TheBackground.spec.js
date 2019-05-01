// @ts-nocheck
import { shallowMount, config } from "@vue/test-utils";
import TheBackground from "@/components/TheBackground.vue";

config.mocks["$vars"] = TheBackground.vars();

const windowRequestAnimationFrame = window.requestAnimationFrame;

describe("TheBackground", () => {
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    window.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
    wrapper = shallowMount(TheBackground);
    jest.runOnlyPendingTimers();
  });

  afterEach(() => {
    wrapper.destroy();
    window.requestAnimationFrame = windowRequestAnimationFrame;
  });

  it("renders the background", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("runs animation", () => {
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it("doesn't run animation when fully expanded", () => {
    wrapper.destroy();
    window.requestAnimationFrame.mockClear();
    wrapper = shallowMount(TheBackground, { propsData: { animateExpand: 1 } });
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });

  it("runs and stops animation dynamically", () => {
    expect(window.requestAnimationFrame).toHaveBeenCalled();
    window.requestAnimationFrame.mockClear();
    wrapper.setProps({ animateExpand: 1 });
    jest.runOnlyPendingTimers();
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    window.requestAnimationFrame.mockClear();
    wrapper.setProps({ animateExpand: 0 });
    jest.runOnlyPendingTimers();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });
});
