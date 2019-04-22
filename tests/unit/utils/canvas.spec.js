import * as canvas from "@/utils/canvas";

/**
 * @typedef {object} ContextMock
 * @property {jest.Mock} ContextMock.createLinearGradient
 * @property {jest.Mock} ContextMock.fillStyleMock
 * @property {jest.Mock} ContextMock.fillRect
 * @property {any} ContextMock.fillStyle
 */

/**
 * @typedef {object} CanvasGradientMock
 * @property {jest.Mock} ContextMock.addColorStop
 */

describe("canvas", () => {
  /** @type {ContextMock} */
  let contextMock;
  /** @type {CanvasGradientMock} */
  let canvasGradientMock;

  beforeEach(() => {
    canvasGradientMock = {
      addColorStop: jest.fn()
    };

    contextMock = {
      fillStyle: undefined,
      fillStyleMock: jest.fn(),
      fillRect: jest.fn(),
      createLinearGradient: jest.fn(() => canvasGradientMock)
    };

    Object.defineProperty(contextMock, "fillStyle", {
      set: contextMock.fillStyleMock
    });

    // @ts-ignore
    HTMLCanvasElement.prototype.getContext = jest.fn(() => contextMock);
  });

  describe("createLowResCanvas", () => {
    it("returns null when not supplying a canvas", () => {
      const lowResCanvas = canvas.createLowResCanvas({
        canvas: null,
        gridWidth: 0
      });

      expect(lowResCanvas).toBe(null);
    });

    it("returns object with canvas and gridWidth", () => {
      const canvasEl = document.createElement("canvas");
      const lowResCanvas = canvas.createLowResCanvas({
        canvas: canvasEl,
        gridWidth: 20
      });

      expect(lowResCanvas.canvas).toBe(canvasEl);
      expect(lowResCanvas.gridWidth).toBe(20);
    });

    it("returns object with context", () => {
      const canvasEl = document.createElement("canvas");
      const lowResCanvas = canvas.createLowResCanvas({
        canvas: canvasEl,
        gridWidth: 20
      });

      expect(lowResCanvas.context).toBe(contextMock);
    });
  });

  describe("resize", () => {
    const canvasEl = document.createElement("canvas");
    /** @type {import("@/utils/canvas").LowResCanvas} */
    let lowResCanvas = null;

    beforeEach(() => {
      // @ts-ignore
      canvasEl.getBoundingClientRect = jest.fn(() => ({
        width: 200,
        height: 300
      }));

      lowResCanvas = {
        canvas: canvasEl,
        gridWidth: 20,
        context: null,
        gridResolution: { x: 0, y: 0 }
      };
    });

    it("updates gridResolution", () => {
      canvas.resize(lowResCanvas);

      expect(lowResCanvas.gridResolution).toEqual({ x: 10, y: 15 });
    });

    it("sets canvas width and height", () => {
      canvas.resize(lowResCanvas);

      expect(canvasEl.width).toBe(200);
      expect(canvasEl.height).toBe(300);
    });

    it("avoids canvas paint flash", () => {
      // Set canvas to have the same size as the display size
      canvasEl.width = 200;
      canvasEl.height = 300;

      // Spy on width and height
      const setWidth = jest.spyOn(canvasEl, "width", "set");
      const setHeight = jest.spyOn(canvasEl, "height", "set");

      canvas.resize(lowResCanvas);

      expect(setWidth).not.toHaveBeenCalled();
      expect(setHeight).not.toHaveBeenCalled();
    });
  });

  describe("fillLinearGradient", () => {
    const canvasEl = document.createElement("canvas");
    /** @type {import("@/utils/canvas").LowResCanvas} */
    let lowResCanvas = null;

    beforeEach(() => {
      canvasEl.width = 200;
      canvasEl.height = 300;

      lowResCanvas = {
        canvas: canvasEl,
        gridWidth: 20,
        // @ts-ignore
        context: contextMock,
        gridResolution: { x: 0, y: 0 }
      };

      canvas.fillLinearGradient(lowResCanvas, {
        direction: "TOP_TO_BOTTOM",
        colors: [{ offset: 0, color: "#fff" }, { offset: 1, color: "#000" }]
      });
    });

    it("creates linear gradient from context", () => {
      expect(contextMock.createLinearGradient).toHaveBeenCalledWith(
        0,
        0,
        0,
        300
      );
    });

    it("adds color stops to the gradient", () => {
      expect(canvasGradientMock.addColorStop.mock.calls).toEqual([
        [0, "#fff"],
        [1, "#000"]
      ]);
    });

    it("sets fillStyle as the gradient", () => {
      expect(contextMock.fillStyleMock).toHaveBeenCalledWith(
        canvasGradientMock
      );
    });

    it("calls fillRect to fill the canvas", () => {
      expect(contextMock.fillRect).toHaveBeenCalledWith(0, 0, 200, 300);
    });
  });

  describe("fillCells", () => {
    const canvasEl = document.createElement("canvas");
    /** @type {import("@/utils/canvas").LowResCanvas} */
    let lowResCanvas = null;
    /** @type {jest.Mock} */
    let drawCallback;

    beforeEach(() => {
      lowResCanvas = {
        canvas: canvasEl,
        gridWidth: 20,
        // @ts-ignore
        context: contextMock,
        gridResolution: { x: 2, y: 3 }
      };

      drawCallback = jest.fn(() => ({ r: 20, g: 30, b: 40, a: 0.5 }));

      canvas.fillCells(lowResCanvas, drawCallback);
    });

    it("loops through all grid cells", () => {
      expect(drawCallback).toHaveBeenCalledTimes(2 * 3);
    });

    it("calls callback with grid coordinates", () => {
      expect(drawCallback.mock.calls).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [1, 2]
      ]);
    });

    it("sets fillStyle using return value of callback", () => {
      contextMock.fillStyleMock.mock.calls.forEach(call => {
        expect(call).toEqual([`rgba(20, 30, 40, 0.5)`]);
      });
    });

    it("fills each grid cell using fillRect", () => {
      expect(contextMock.fillRect).toHaveBeenCalledTimes(2 * 3);
    });
  });
});
