/**
 * Converts color string the the hex format into object of rgb.
 * @param {string} hex Hex color value e.g. #000000.
 * @return {{r: number, g: number, b: number}} Object with rgb properties.
 */
export function hex2rgb(hex) {
  let r = "0",
    g = "0",
    b = "0";

  if (hex[0] === "#") hex = hex.substring(1);

  if (hex.length === 6) {
    [r, g, b] = [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)];
  } else if (hex.length === 3) {
    [r, g, b] = [
      hex[0].concat(hex[0]),
      hex[1].concat(hex[1]),
      hex[2].concat(hex[2])
    ];
  }

  return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) };
}

export default { hex2rgb };
