import { shallowMount, config } from "@vue/test-utils";
import FlowingGradient from "@/components/FlowingGradient.vue";
import * as canvas from "@/utils/canvas";

config.mocks["$vars"] = FlowingGradient.vars();

jest.mock("@/utils/canvas", () => ({
  __esModule: true,
  createLowResCanvas: jest.fn((canvas, gridWidth) => ({
    canvas,
    gridWidth,
    gridResolution: { x: 10, y: 10 }
  })),
  resize: jest.fn(),
  fillLinearGradient: jest.fn(),
  fillCells: jest.fn((_, callback) => callback())
}));

describe("FlowingGradient.vue", () => {
  let wrapper;

  describe("mounted", () => {
    beforeAll(() => {
      jest.clearAllMocks();
      wrapper = shallowMount(FlowingGradient, { attachToDocument: true });
    });

    afterAll(() => {
      wrapper.destroy();
    });

    it("renders a canvas", () => {
      expect(wrapper.contains("canvas")).toBe(true);
    });

    it("initialises a LowResCanvas", () => {
      expect(canvas.createLowResCanvas).toHaveBeenCalled();
    });

    it("resize canvas after mount", () => {
      expect(canvas.resize).toHaveBeenCalled();
    });
  });

  describe("resize window", () => {
    beforeEach(() => {
      wrapper = shallowMount(FlowingGradient, { attachToDocument: true });
      jest.clearAllMocks();
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it("fires resize on window resize event", () => {
      const event = new Event("resize");
      window.dispatchEvent(event);

      expect(canvas.resize).toHaveBeenCalledTimes(1);
    });

    it("removes event listener after destroy", () => {
      wrapper.destroy();

      const event = new Event("resize");
      window.dispatchEvent(event);

      expect(canvas.resize).not.toHaveBeenCalled();
    });
  });

  describe("draw loop", () => {
    jest.useFakeTimers();

    beforeEach(() => {
      wrapper = shallowMount(FlowingGradient, { attachToDocument: true });
      jest.clearAllMocks();
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it("draws every 33ms", () => {
      expect(canvas.fillLinearGradient).not.toHaveBeenCalled();
      expect(canvas.fillCells).not.toHaveBeenCalled();

      jest.advanceTimersByTime(33);

      expect(canvas.fillLinearGradient).toHaveBeenCalledTimes(1);
      expect(canvas.fillCells).toHaveBeenCalled();

      jest.advanceTimersByTime(33);

      expect(canvas.fillLinearGradient).toHaveBeenCalledTimes(2);
    });

    it("doesn't draw after destroy", () => {
      wrapper.destroy();

      jest.advanceTimersByTime(1000);

      expect(canvas.fillLinearGradient).not.toHaveBeenCalled();
      expect(canvas.fillCells).not.toHaveBeenCalled();
    });
  });
});
