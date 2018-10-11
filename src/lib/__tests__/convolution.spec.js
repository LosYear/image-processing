import {calculatePixelConvolution, slicePixels} from "../convolution";
import fixtureData from './convolution.fixture';

describe('transforms one pixel using convolution filter', () => {
    test('simple matrix 3*3', () => {
        const data = [12, 14, 41, 43, 84, 24, 2, 1, 43];
        const kernel = [0.5, 0.75, 0.5, 0.75, 1.0, 0.75, 0.5, 0.75, 0.5];

        expect(calculatePixelConvolution(data, kernel)).toBe(194.5);
    });

    test('simple matrix 3*3, case 2', () => {
        const data = [185, 185, 183, 143, 155, 90, 153, 147, 161];
        const kernel = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

        expect(calculatePixelConvolution(data, kernel)).toBe(140.2);
    });
});

describe('slices pixels for convolution filter', () => {
    test('no border', () => {
        const slice = slicePixels(fixtureData, 10, 10, 3, 3, 3);

        expect(slice).toEqual([23, 24, 25, 33, 34, 35, 43, 44, 45]);
    });

    test('border filling', () => {
        const slice = slicePixels(fixtureData, 10, 10, 0, 0, 3);

        expect(slice).toEqual([1, 1, 2, 1, 1, 2, 11, 11, 12]);
    });

    test('bottom right corner', () => {
        const slice = slicePixels(fixtureData, 10, 10, 9, 9, 3);

        expect(slice).toEqual([89, 90, 90, 99, 100, 100, 99, 100, 100]);
    });

    test('partial filling', () => {
        const slice = slicePixels(fixtureData, 10, 10, 0, 1, 3);

        expect(slice).toEqual([1, 2, 3, 1, 2, 3, 11, 12, 13]);
    });

    test('slice one pixel', () => {
        const slice = slicePixels(fixtureData, 10, 10, 0, 0, 1);

        expect(slice).toEqual([1]);
    });
});