import * as scroll from "@/utils/scroll";

describe("scroll", () => {
  describe("calcProgress", () => {
    it.each`
      scroll | offset | height | innerHeight | expected
      ${0}   | ${0}   | ${500} | ${100}      | ${0}
      ${200} | ${0}   | ${500} | ${100}      | ${0.5}
      ${400} | ${0}   | ${500} | ${100}      | ${1}
      ${600} | ${0}   | ${500} | ${100}      | ${1}
      ${0}   | ${300} | ${500} | ${100}      | ${0}
      ${300} | ${300} | ${500} | ${100}      | ${0}
      ${500} | ${300} | ${500} | ${100}      | ${0.5}
      ${580} | ${300} | ${300} | ${20}       | ${1}
    `(
      "calcProgress({scroll:$scroll,offset:$offset,height:$height,innerHeight:$innerHeight}) = $expected",
      params => {
        expect(scroll.calcProgress(params)).toBe(params.expected);
      }
    );
  });

  describe("createAnimation", () => {
    it("returns a function when called", () => {
      const getAnimate = scroll.createAnimation(0);
      expect(getAnimate).toEqual(expect.any(Function));
    });

    it.each`
      easing       | expected
      ${undefined} | ${"linear"}
      ${"linear"}  | ${"linear"}
      ${"inCubic"} | ${"inCubic"}
    `("calls with easing = $easing", async ({ easing, expected }) => {
      const { ease } = await import("@/utils/time");
      const mock = jest.spyOn(ease, expected);

      const getAnimate = scroll.createAnimation(0);
      getAnimate({ easing });
      expect(mock).toHaveBeenCalled();
    });

    it.each([0, 0.5, 1])(
      "calls easing function with progress (%d)",
      async progress => {
        const { ease } = await import("@/utils/time");
        const mock = jest.spyOn(ease, "linear");

        const getAnimate = scroll.createAnimation(progress);
        getAnimate({ easing: "linear" });
        expect(mock).toHaveBeenCalledWith(progress);
      }
    );

    it("returns the result of the easing function", async () => {
      const { ease } = await import("@/utils/time");
      jest.spyOn(ease, "linear").mockImplementationOnce(() => 666);

      const getAnimate = scroll.createAnimation(0);
      expect(getAnimate()).toBe(666);
    });

    it.each`
      progress | range           | expected
      ${0}     | ${[0, 1]}       | ${0}
      ${0.5}   | ${[0, 1]}       | ${0.5}
      ${1}     | ${[0, 1]}       | ${1}
      ${0}     | ${[0.25, 0.75]} | ${0}
      ${0.25}  | ${[0.25, 0.75]} | ${0}
      ${0.5}   | ${[0.25, 0.75]} | ${0.5}
      ${0.75}  | ${[0.25, 0.75]} | ${1}
      ${1}     | ${[0.25, 0.75]} | ${1}
    `("clips $progress to range $range", ({ progress, range, expected }) => {
      const getAnimate = scroll.createAnimation(progress);
      expect(getAnimate({ range })).toBe(expected);
    });
  });
});
