import {
  mapRegionToCoordinates,
  sliceRegion,
  fillRegionWithColor,
  fillRegionWithData
} from '../rotation';
import { image2, image3, whiteRectangle } from './rotation.fixture';

describe('slices region pixels from data', () => {
  test('slices right data', () => {
    const slicedData = sliceRegion(image2, 10, 10, {
      x: 20,
      y: 10,
      width: 40,
      height: 30
    });
    expect(slicedData).toEqual([
      12,
      0,
      0,
      0,
      13,
      0,
      0,
      0,
      14,
      0,
      0,
      0,
      15,
      0,
      0,
      0,
      22,
      0,
      0,
      0,
      23,
      0,
      0,
      0,
      24,
      0,
      0,
      0,
      25,
      0,
      0,
      0,
      32,
      0,
      0,
      0,
      33,
      0,
      0,
      0,
      34,
      0,
      0,
      0,
      35,
      0,
      0,
      0
    ]);
  });

  test('slices top left corner', () => {
    const slicedData = sliceRegion(image2, 10, 10, {
      x: 0,
      y: 0,
      width: 40,
      height: 40
    });
    expect(slicedData).toEqual([
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      3,
      0,
      0,
      0,
      10,
      0,
      0,
      0,
      11,
      0,
      0,
      0,
      12,
      0,
      0,
      0,
      13,
      0,
      0,
      0,
      20,
      0,
      0,
      0,
      21,
      0,
      0,
      0,
      22,
      0,
      0,
      0,
      23,
      0,
      0,
      0,
      30,
      0,
      0,
      0,
      31,
      0,
      0,
      0,
      32,
      0,
      0,
      0,
      33,
      0,
      0,
      0
    ]);
  });
});

describe('fills region with color', () => {
  test('fills rectangle with white', () => {
    const changedImage = fillRegionWithColor(image2, 10, 10, 255, {
      x: 20,
      y: 10,
      width: 40,
      height: 30
    });

    expect(changedImage).toEqual(image3);
  });
});
