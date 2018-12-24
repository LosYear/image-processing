import { mapRegionToCoordinates, sliceRegion, fillRegion } from '../rotation';
import { image1, image2, image3 } from './rotation.fixture';

describe('maps percentage coordinates to pixel axis', () => {
  test('1000x1000, x = 0, y = 0, width: 50%, height 50%', () => {
    const region = { x: 0, y: 0, width: 50, height: 50 };
    const mappedCoordinates = mapRegionToCoordinates(1000, 1000, region);

    expect(mappedCoordinates).toEqual({ x: 0, y: 0, width: 500, height: 500 });
  });

  test('1000x1000, x = 15, y = 19, width: 10%, height: 20%', () => {
    const region = { x: 15, y: 19, width: 10, height: 20 };
    const mappedCoordinates = mapRegionToCoordinates(1000, 1000, region);

    expect(mappedCoordinates).toEqual({
      x: 150,
      y: 190,
      width: 100,
      height: 200
    });
  });
});

describe('slices region pixels from data', () => {
  test('slices right channel', () => {
    const slicedData = sliceRegion(0, 0, 3, 3, image1, 10, 1);
    expect(slicedData).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  });

  test('slices right data', () => {
    const slicedData = sliceRegion(2, 1, 4, 3, image2, 10, 0);
    expect(slicedData).toEqual([
      12,
      13,
      14,
      15,
      22,
      23,
      24,
      25,
      32,
      33,
      34,
      35
    ]);
  });

  test('slices top left corner', () => {
    const slicedData = sliceRegion(0, 0, 4, 4, image2, 10, 0);
    expect(slicedData).toEqual([
      0,
      1,
      2,
      3,
      10,
      11,
      12,
      13,
      20,
      21,
      22,
      23,
      30,
      31,
      32,
      33
    ]);
  });
});

describe('fills region with color', () => {
  test('fills rectangle with white', () => {
    const changedImage = fillRegion(image2, 10, 10, 255, {
      x: 20,
      y: 10,
      width: 40,
      height: 30
    });

    expect(changedImage).toEqual(image3);
  });
});
