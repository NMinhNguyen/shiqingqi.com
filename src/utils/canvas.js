/**
 * @param {{canvas: HTMLCanvasElement, gridWidth: number}} opts
 * @returns {LowResCanvas}
 */
export function createLowResCanvas(opts) {
  const { canvas, gridWidth } = opts;
  if (!canvas) return null;

  canvas.width = 0;
  canvas.height = 0;

  return {
    canvas: canvas,
    context: canvas.getContext("2d"),
    gridWidth: gridWidth,
    gridResolution: { x: 0, y: 0 }
  };
}

/** @param {LowResCanvas} lowResCanvas */
export function resize(lowResCanvas) {
  const canvas = lowResCanvas.canvas;
  const rect = canvas.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  // Return early to avoid canvas paint flash
  if (canvas.width === width && canvas.height === height) return;

  canvas.width = width;
  canvas.height = height;
  lowResCanvas.gridResolution = {
    x: Math.ceil(rect.width / lowResCanvas.gridWidth),
    y: Math.ceil(rect.height / lowResCanvas.gridWidth)
  };
}

/**
 * @param {LowResCanvas} lowResCanvas
 * @param {object} opts Information about the linear gradient. Currently only
 * supports the direction "TOP_TO_BOTTOM".
 * @param {"TOP_TO_BOTTOM"} opts.direction
 * @param {{offset: number, color: string}[]} opts.colors
 */
export function fillLinearGradient(lowResCanvas, opts) {
  const { direction, colors } = opts;
  const height = lowResCanvas.canvas.height;
  const context = lowResCanvas.context;

  /** @type {CanvasGradient} */
  let gradient;

  switch (direction) {
    case "TOP_TO_BOTTOM":
    default:
      gradient = context.createLinearGradient(0, 0, 0, height);
  }

  colors.forEach(({ offset, color }) => gradient.addColorStop(offset, color));

  context.fillStyle = gradient;
  context.fillRect(0, 0, lowResCanvas.canvas.width, lowResCanvas.canvas.height);
}

/**
 * @param {LowResCanvas} lowResCanvas
 * @param {(x:number, y:number) => Color} callback
 */
export function fillCells(lowResCanvas, callback) {
  const { gridResolution: resolution, context, gridWidth } = lowResCanvas;

  for (let i = 0; i < resolution.x; i++) {
    for (let j = 0; j < resolution.y; j++) {
      const { r, g, b, a } = callback(i, j);

      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      context.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
    }
  }
}

export default { createLowResCanvas, resize, fillLinearGradient, fillCells };

/**
 * @typedef {object} LowResCanvas
 * @property {HTMLCanvasElement} LowResCanvas.canvas
 * @property {CanvasRenderingContext2D} LowResCanvas.context
 * @property {number} LowResCanvas.gridWidth
 * @property {{x:number, y:number}} LowResCanvas.gridResolution
 */

/**
 * @typedef {{r:number, g:number, b:number, a:number}} Color
 */
