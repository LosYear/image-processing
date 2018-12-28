import { calcCanvasIndex } from '../helpers/canvas';

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

/**
 * Copies pixels of given region to array and returns it
 * @param data
 * @param imageWidth {number}
 * @param imageHeight {number}
 * @param region {{x: number, y: number, width: number, height: number}}
 *        set by percents
 * @return {Array}
 */
export function sliceRegion(data, imageWidth, imageHeight, region) {
  const { x, y, width, height } = mapRegionToCoordinates(
    imageWidth,
    imageHeight,
    region
  );

  const result = [];
  for (let row = y; row < y + height; row++) {
    for (let column = x; column < x + width; column++) {
      const index = calcCanvasIndex(column, row, imageWidth);
      result.push(data[index]);
      result.push(data[index + 1]);
      result.push(data[index + 2]);
      result.push(data[index + 3]);
    }
  }
  return result;
}

/**
 * Replaces pixels in given region by arbitrary color
 * @param data {Uint8ClampedArray}
 * @param imageWidth {number}
 * @param imageHeight {number}
 * @param color {number}
 * @param region {{x: number, y: number, width: number, height: number}}
 *        set by percents
 * @return Uint8ClampedArray
 */
export function fillRegionWithColor(
  data,
  imageWidth,
  imageHeight,
  color,
  region
) {
  const { x, y, width, height } = mapRegionToCoordinates(
    imageWidth,
    imageHeight,
    region
  );

  for (let row = y; row < y + height; row++) {
    for (let column = x; column < x + width; column++) {
      const index = calcCanvasIndex(column, row, imageWidth);
      data[index] = color;
      data[index + 1] = color;
      data[index + 2] = color;
    }
  }

  return data;
}

/**
 * Replaces given region with another one
 * @param data {Uint8ClampedArray}
 * @param imageWidth {number}
 * @param imageHeight {number}
 * @param fillData {Array}
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
 * Maps destination point to source point rotated by -angle
 * @param x {number}
 * @param y {number}
 * @param centerX {number}
 * @param centerY {number}
 * @param angle {number}
 *        Arbitrary angle in radians
 * @return {{x: number, y: number}}
 */
export function mapDestinationToSource({ x, y }, { centerX, centerY }, angle) {
  return {
    x: Math.round(
      centerX +
        (x - centerX) * Math.cos(angle) +
        (y - centerY) * Math.sin(angle)
    ),
    y: Math.round(
      centerY -
        (x - centerX) * Math.sin(angle) +
        (y - centerY) * Math.cos(angle)
    )
  };
}

/**
 * Rotates given region by arbitrary angle
 * @param data {Uint8ClampedArray}
 * @param width {number}
 *        Image width
 * @param height {number}
 *        Image height
 * @param region {{x: number, y: number, width: number, height: number}}
 *        Set by percents
 * @param angle {number}
 *        Arbitrary angle in radians
 * @param customCenter {boolean|{x: number, y: number}}
 *        If false, region is rotated around its center
 *        If object passed, region is rotated around arbitrary point
 * @return Uint8ClampedArray
 */
export function rotate(
  data,
  width,
  height,
  region,
  angle,
  customCenter = false
) {
  const mappedRegion = mapRegionToCoordinates(width, height, region);

  const slicedData = sliceRegion(data, width, height, region);

  data = fillRegionWithColor(data, width, height, 0, region);

  let centerX = mappedRegion.x + Math.floor(mappedRegion.width / 2);
  let centerY = mappedRegion.y + Math.floor(mappedRegion.height / 2);

  if (customCenter) {
    const mappedCenter = mapRegionToCoordinates(width, height, {
      ...customCenter,
      width: 0,
      height: 0
    });
    centerX = mappedCenter.x;
    centerY = mappedCenter.y;
  }

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      const { x: sourceX, y: sourceY } = mapDestinationToSource(
        { x: column, y: row },
        { centerX, centerY },
        angle
      );

      // If point placed outside region or outside image, drop it
      if (
        sourceX < 0 ||
        sourceX >= width ||
        sourceX < mappedRegion.x ||
        sourceX >= mappedRegion.endX ||
        sourceY < 0 ||
        sourceY >= height ||
        sourceY < mappedRegion.y ||
        sourceY >= mappedRegion.endY
      ) {
        continue;
      }

      const destinationIndex = calcCanvasIndex(column, row, width);

      // Don't forget to think about offset relatively to region
      const sourceIndex = calcCanvasIndex(
        sourceX - mappedRegion.x,
        sourceY - mappedRegion.y,
        mappedRegion.width
      );

      data[destinationIndex] = slicedData[sourceIndex];
      data[destinationIndex + 1] = slicedData[sourceIndex + 1];
      data[destinationIndex + 2] = slicedData[sourceIndex + 2];
    }
  }

  return data;
}
