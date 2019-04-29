import { ease } from "@/utils/time";

/** @param {number} progress */
export function createAnimation(progress) {
  return ({ easing = "linear", range = [0, 1] } = {}) => {
    const rangedProgress = (progress - range[0]) / (range[1] - range[0]);
    const clampedProgress = Math.max(0, Math.min(rangedProgress, 1));
    return ease[easing](clampedProgress);
  };
}

/** @param {{scroll:number,height:number,offset:number,innerHeight:number}} options */
export function calcProgress({ scroll, height, offset, innerHeight }) {
  const scrollNorm = (scroll - offset) / (height - innerHeight);
  return Math.max(Math.min(scrollNorm, 1), 0);
}

export default { createAnimation, calcProgress };
