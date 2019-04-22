import { ease, throttle, debounce } from "@/utils/time";

describe("time", () => {
  describe("ease", () => {
    it.each`
      easeName
      ${"linear"}
      ${"inQuad"}
      ${"outQuad"}
      ${"inOutQuad"}
      ${"inCubic"}
      ${"outCubic"}
      ${"inOutCubic"}
      ${"inQuart"}
      ${"outQuart"}
      ${"inOutQuart"}
    `("$easeName ease starts at 0 and end at 1", ({ easeName }) => {
      expect(ease[easeName](0)).toBe(0);
      expect(ease[easeName](1)).toBe(1);
    });
  });

  describe("throttle", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("fires callback when called", () => {
      const callback = jest.fn();
      const throttled = throttle(1000, callback);

      throttled();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("blocks subsiquent calls made within the throttle delay", () => {
      const callback = jest.fn();
      const throttled = throttle(1000, callback);

      throttled();

      jest.advanceTimersByTime(50);

      throttled();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("fires callback again after throttle delay", () => {
      const callback = jest.fn();
      const throttled = throttle(1000, callback);

      throttled();

      jest.advanceTimersByTime(1000);

      throttled();

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("fires callback when called", () => {
      const callback = jest.fn();
      const debounced = debounce(1000, callback);

      debounced();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("schedules next call after debounce delay", () => {
      const callback = jest.fn();
      const debounced = debounce(1000, callback);

      debounced();

      jest.advanceTimersByTime(50);

      debounced();
      expect(callback).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("fires callback only once after delay", () => {
      const callback = jest.fn();
      const debounced = debounce(1000, callback);

      debounced();
      debounced();
      debounced();
      debounced();

      jest.advanceTimersByTime(1000);
      // Once at the begining and once after delay
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });
});
