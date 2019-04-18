import { hex2rgb } from "@/utils/color";

describe("color", () => {
  describe("hex2rgb", () => {
    it.each`
      hex          | expected
      ${"#000000"} | ${{ r: 0, g: 0, b: 0 }}
      ${"#090909"} | ${{ r: 9, g: 9, b: 9 }}
      ${"#0A0A0A"} | ${{ r: 10, g: 10, b: 10 }}
      ${"#0F0F0F"} | ${{ r: 15, g: 15, b: 15 }}
      ${"#101010"} | ${{ r: 16, g: 16, b: 16 }}
      ${"#FFFFFF"} | ${{ r: 255, g: 255, b: 255 }}
      ${"FFFFFF"}  | ${{ r: 255, g: 255, b: 255 }}
      ${"#ffffff"} | ${{ r: 255, g: 255, b: 255 }}
      ${"#fff"}    | ${{ r: 255, g: 255, b: 255 }}
      ${"#000"}    | ${{ r: 0, g: 0, b: 0 }}
      ${"test"}    | ${{ r: 0, g: 0, b: 0 }}
    `("converts $hex into $expected", ({ hex, expected }) => {
      expect(hex2rgb(hex)).toEqual(expected);
    });
  });
});
