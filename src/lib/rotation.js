import { calcCanvasIndex } from '../helpers/canvas';

export function mapRegionToCoordinates(imageWidth, imageHeight, region) {
  const { x, y, width, height } = region;
  const widthPercent = imageWidth / 100;
  const heightPercent = imageHeight / 100;

  return {
    x: Math.round(x * widthPercent),
    y: Math.round(y * heightPercent),
    width: Math.round(width * widthPercent),
    height: Math.round(height * heightPercent)
  };
}

export function sliceRegion(
  x,
  y,
  width,
  height,
  data,
  imageWidth,
  channel = 0
) {
  const result = [];
  for (let row = y; row < y + height; row++) {
    for (let column = x; column < x + width; column++) {
      const index = calcCanvasIndex(column, row, imageWidth) + channel;
      result.push(data[index]);
    }
  }
  return result;
}

export function fillRegion(data, imageWidth, imageHeight, color, region) {
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

export function rotatePoint({ x, y }, { centerX, centerY }, angle) {
  return {
    x:
      Math.cos(angle) * (x - centerX) -
      Math.sin(angle) * (y - centerY) +
      centerX,
    y:
      Math.sin(angle) * (x - centerX) +
      Math.cos(angle) * (y - centerY) +
      centerY
  };
}

export function rotate(data, width, height, region, angle) {
  const mappedRegion = mapRegionToCoordinates(width, height, region);
  const slicedData = sliceRegion(
    mappedRegion.x,
    mappedRegion.y,
    mappedRegion.width,
    mappedRegion.height,
    width
  );
  data = fillRegion(data, width, height, 0, mappedRegion);
}
