import {
  applyFunctionalFilter,
  calculatePixelConvolution
} from './convolution';

const kernel1 = [[5, 5, 5], [-3, 0, -3], [-3, -3, -3]];
const kernel2 = [[-3, 5, 5], [-3, 0, 5], [-3, -3, -3]];
const kernel3 = [[-3, -3, 5], [-3, 0, 5], [-3, -3, 5]];
const kernel4 = [[-3, -3, -3], [-3, 0, 5], [-3, 5, 5]];
const kernel5 = [[-3, -3, -3], [-3, 0, -3], [5, 5, 5]];
const kernel6 = [[-3, -3, -3], [5, 0, -3], [5, 5, -3]];
const kernel7 = [[5, -3, -3], [5, 0, -3], [5, -3, -3]];
const kernel8 = [[5, 5, -3], [5, 0, -3], [-3, -3, -3]];

const kernels = [
  kernel1.flat(),
  kernel2.flat(),
  kernel3.flat(),
  kernel4.flat(),
  kernel5.flat(),
  kernel6.flat(),
  kernel7.flat(),
  kernel8.flat()
];

export const applyKirschOperator = (data, width, height) =>
  applyFunctionalFilter(data, width, height, 9, pixels => {
    const values = kernels.map(kernel =>
      calculatePixelConvolution(pixels, kernel)
    );

    return Math.max(...values);
  });
