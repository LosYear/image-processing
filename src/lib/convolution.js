import {product, fillArray} from "../helpers/itertools";
import {calcCanvasIndex, getColumnByIndex, getRowByIndex} from "../helpers/canvas";
import {flatten} from "../helpers/array";

/**
 * Calculates the value of single pixel with kernel applied
 * @param data {Array} values of neighbours
 * a, b, c
 * d, e, f -- > represented like a, b, c, d, e, f, g, h, j
 * g, h, j
 *
 * @param kernel {Array}, represented same as data param
 * @return {number} calculated value of single pixel
 */
export function calculatePixelConvolution(data, kernel) {
    if (data.length !== kernel.length) {
        throw Error("Data and kernel should have same length");
    }

    const rank = Math.floor(Math.sqrt(kernel.length));
    if (rank * rank !== kernel.length) {
        throw Error("Convolution kernel should have square size");
    }

    if (rank % 2 === 0) {
        throw Error("Kernel size should be odd");
    }

    return data.reduce((accumulator, currentValue, index) => accumulator + currentValue * kernel[index], 0);

}

/**
 * Slices pixels around given pixel, if there are no pixels (border), duplicates with border values
 * @param data {Uint8ClampedArray|Array} pixels array
 * @param width {number}
 * @param height {number}
 * @param row {number}
 * @param column {number}
 * @param size {number} sliced array will have size of size**2
 * @param channel {number} 0, 1, 2
 * @return {Array}
 */
export function slicePixels(data, width, height, row, column, size, channel = 0) {
    const absOffset = Math.floor(size / 2);
    const oneDimensionalOffsets = fillArray(-absOffset, absOffset);
    const offsets = product(oneDimensionalOffsets, oneDimensionalOffsets);
    let result = [];

    for (let offset of offsets) {
        let x = column + offset[1],
            y = row + offset[0];

        if (x < 0) {
            x = 0;
        }
        else if (x >= width) {
            x = width - 1;
        }

        if (y < 0) {
            y = 0;
        }
        else if (y >= height) {
            y = height - 1;
        }

        const index = calcCanvasIndex(x, y, width) + channel;
        result.push(data[index]);
    }

    if (result.includes(undefined)) {
        debugger;
    }

    return result;
}

/**
 * Applies convolution filter with given transformation function
 * @param data {Array|Uint8ClampedArray}
 * @param width {number}
 * @param height {number}
 * @param kernel {Array} convolution kernel
 * @param k {number} norming coefficient
 * @param oneChanneled {boolean} calculate only one channel or not
 * @return {Uint8ClampedArray}
 */
export function applyConvolutionFilter(data, width, height, kernel, k, oneChanneled = true) {
    kernel = flatten(kernel);

    let result = [];
    data.forEach((el, index) => {
        if (index % 4 === 3) {
            result.push(el);
        }
        else if (index % 4 !== 0 && oneChanneled) {
            result.push(result[index - index % 4]);
        }
        else {
            const row = getRowByIndex(index, width),
                column = getColumnByIndex(index, width);
            const neighbourhood = slicePixels(data, width, height, row, column, Math.floor(Math.sqrt(kernel.length)));
            const pixel = (1 / k) * calculatePixelConvolution(neighbourhood, kernel);

            result.push(Math.ceil(pixel));
        }
    });

    return Uint8ClampedArray.from(result);
}

export const applyBlurFilter = (data, width, height, k) => applyConvolutionFilter(data, width, height,
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]], k);

export const applyMedianFilter = (data, width, height, radius = 9) => applyFunctionalFilter(data, width, height, radius, (pixels) => {
    const center = Math.ceil(radius / 2);
    return pixels.sort()[center];
});