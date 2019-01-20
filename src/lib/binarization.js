import { applyFunctionalFilter } from './convolution';

/**
 * https://homepages.inf.ed.ac.uk/rbf/HIPR2/adpthrsh.htm
 * @param data
 * @param width
 * @param height
 * @param c
 * @param sliceSize
 * @return {Uint8ClampedArray}
 */

export const applyAdaptiveBinarization = (
  data,
  width,
  height,
  c = 7,
  sliceSize = 225
) =>
  applyFunctionalFilter(data, width, height, sliceSize, pixels => {
    const center = Math.floor(sliceSize / 2);
    const pixel = pixels[center];
    const threshold = pixels.reduce((a, b) => a + b) / pixels.length - c; // find median
    return pixel > threshold ? 255 : 0;
  });
