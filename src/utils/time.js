/**
 * Easing functions.
 * @type {{[name: string]: (t: number) => number}}
 */
export const ease = {
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inCubic: t => t * t * t,
  outCubic: t => --t * t * t + 1,
  inOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  inQuart: t => t * t * t * t,
  outQuart: t => 1 - --t * t * t * t,
  inOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t)
};

/**
 * Debounce a function.
 * @param {number} delay Debounce delay in ms.
 * @param {(...args:any[]) => void} callback Callback function, bound to the Vue
 * instance.
 */
export function debounce(delay, callback) {
  /** @type {number} */
  let debounceTimer;

  return function(/** @type {any[]} */ ...args) {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(
        () => callback.apply(this, args),
        delay
      );
    } else {
      callback.apply(this, args);
      debounceTimer = window.setTimeout(() => {}, delay);
    }
  };
}

/**
 * Throttle a funciton.
 * @param {number} delay Throttle delay in ms.
 * @param {(...args:any[]) => void} callback Callback function, bound to the Vue
 * instance.
 * @return {(...args:any[]) => void}
 */
export function throttle(delay, callback) {
  let throttling = false;

  return function(/** @type {any[]} */ ...args) {
    if (throttling) return;

    callback.apply(this, args);
    throttling = true;

    setTimeout(() => {
      throttling = false;
    }, delay);
  };
}

export default { ease, debounce, throttle };
