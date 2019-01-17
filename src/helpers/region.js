import { calcCanvasIndex } from './canvas';

/**
 * Maps region given in percentage notation to real image coordinates
 * @param imageWidth {number} in pixels
 * @param imageHeight {number} in pixels
 * @param region {{x: number, y: number, width: number, height: number}}
 *         all values are given in percents
 * @return {{x: number, width: number, y: number, height: number, endX: number, endY: number}}
 */
export function mapRegionToCoordinates(imageWidth, imageHeight, region) {
  const { x, y, width, height } = region;
  const widthPercent = imageWidth / 100;
  const heightPercent = imageHeight / 100;

  const mappedX = Math.round(x * widthPercent);
  const mappedY = Math.round(y * heightPercent);
  const mappedWidth = Math.round(width * widthPercent);
  const mappedHeight = Math.round(height * heightPercent);

  return {
    x: mappedX,
    y: mappedY,
    width: mappedWidth,
    height: mappedHeight,
    endX: mappedX + mappedWidth,
    endY: mappedY + mappedHeight
  };
}

export function fillRegionWithDataAbsolute(
  data,
  imageWidth,
  imageHeight,
  fillData,
  x,
  y,
  width,
  height
) {
  for (let row = y; row < y + height; row++) {
    for (let column = x; column < x + width; column++) {
      const index = calcCanvasIndex(column, row, imageWidth);
      const sourceIndex = calcCanvasIndex(column - x, row - y, width);
      data[index] = fillData[sourceIndex];
      data[index + 1] = fillData[sourceIndex + 1];
      data[index + 2] = fillData[sourceIndex + 2];
    }
  }

  return data;
}

/**
 * Replaces given region with another one
 * @param data {Uint8ClampedArray}
 * @param imageWidth {number}
 * @param imageHeight {number}
 * @param fillData {Array|Uint8ClampedArray}
 * @param region {{x: number, y: number, width: number, height: number}}
 *        set by percents
 * @return Uint8ClampedArray
 */
export function fillRegionWithData(
  data,
  imageWidth,
  imageHeight,
  fillData,
  region
) {
  const { x, y, width, height } = mapRegionToCoordinates(
    imageWidth,
    imageHeight,
    region
  );

  return fillRegionWithDataAbsolute(
    data,
    imageWidth,
    imageHeight,
    fillData,
    x,
    y,
    width,
    height
  );
}
