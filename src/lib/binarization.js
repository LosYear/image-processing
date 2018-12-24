import { applyFunctionalFilter } from './convolution';

export const applyAdaptiveBinarization = (
  data,
  width,
  height,
  c = 7,
  sliceSize = 225
) =>
  applyFunctionalFilter(data, width, height, sliceSize, pixels => {
    const center = Math.ceil(sliceSize / 2);
    const pixel = pixels[center];
    const threshold = pixels.reduce((a, b) => a + b) / pixels.length - c; // find median
    return pixel > threshold ? 255 : 0;
  });
