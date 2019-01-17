import { mapRegionToCoordinates, fillRegionWithData } from '../region';
import { image2, image3, whiteRectangle } from './region.fixture';

describe('maps percentage coordinates to pixel axis', () => {
  test('1000x1000, x = 0, y = 0, width: 50%, height 50%', () => {
    const region = { x: 0, y: 0, width: 50, height: 50 };
    const mappedCoordinates = mapRegionToCoordinates(1000, 1000, region);

    expect(mappedCoordinates).toEqual({
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      endX: 500,
      endY: 500
    });
  });

  test('1000x1000, x = 15, y = 19, width: 10%, height: 20%', () => {
    const region = { x: 15, y: 19, width: 10, height: 20 };
    const mappedCoordinates = mapRegionToCoordinates(1000, 1000, region);

    expect(mappedCoordinates).toEqual({
      x: 150,
      y: 190,
      width: 100,
      height: 200,
      endX: 250,
      endY: 390
    });
  });

  test('400x300, x = 15, y = 19, width: 10%, height: 20%', () => {
    const region = { x: 15, y: 19, width: 10, height: 20 };
    const mappedCoordinates = mapRegionToCoordinates(400, 300, region);

    expect(mappedCoordinates).toEqual({
      x: 60,
      y: 57,
      width: 40,
      height: 60,
      endX: 100,
      endY: 117
    });
  });
});

describe('fills region with data', () => {
  test('fills rectangle with data', () => {
    const changedImage = fillRegionWithData(image2, 10, 10, whiteRectangle, {
      x: 20,
      y: 10,
      width: 40,
      height: 30
    });

    expect(changedImage).toEqual(image3);
  });
});
