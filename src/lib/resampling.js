import {
  fillRegionWithDataAbsolute,
  mapRegionToCoordinates
} from '../helpers/region';
import { calcCanvasIndex, getPixelByXY } from '../helpers/canvas';
import { calculateParabolaPoint } from '../helpers/math';

/**
 * Performs image resampling using biquadratic interpolation
 * @param data
 * @param width
 * @param height
 * @param region
 * @param scale
 * @return {*}
 */
export function biquadraticResampling(data, width, height, region, scale) {
  const mappedRegion = mapRegionToCoordinates(width, height, region);
  const scaledWidth = Math.floor(mappedRegion.width * scale);
  const scaledHeight = Math.floor(mappedRegion.height * scale);
  const scaledRegion = new Uint8ClampedArray(scaledWidth * scaledHeight * 4);

  const I = (x, y, channel) =>
    getPixelByXY(
      data,
      width,
      Math.max(0, mappedRegion.x + x),
      Math.max(0, mappedRegion.y + y),
      channel
    );

  for (let row = 0; row < scaledHeight; ++row) {
    for (let column = 0; column < scaledWidth; ++column) {
      // if (row % scale === 0 && column % scale === 0) {
      //   // This case means that we can match source pixel without interpolation
      //   const index = calcCanvasIndex(column, row, scaledWidth);
      //
      //   const sourceX = mappedRegion.x + Math.floor(column / scale);
      //   const sourceY = mappedRegion.y + Math.floor(row / scale);
      //   const sourceIndex = calcCanvasIndex(sourceX, sourceY, width);
      //
      //   scaledRegion[index] = data[sourceIndex + 0];
      //   scaledRegion[index + 1] = data[sourceIndex + 1];
      //   scaledRegion[index + 2] = data[sourceIndex + 2];
      // } else {
      const index = calcCanvasIndex(column, row, scaledWidth);
      const scaledX = column / scale,
        scaledY = row / scale;
      const flooredX = Math.floor(scaledX),
        flooredY = Math.floor(scaledY);

      for (let channel = 0; channel < 3; channel++) {
        const iterations = [
          calculateParabolaPoint(
            flooredX,
            I(flooredX, flooredY - 1, channel),
            flooredX + 1,
            I(flooredX + 1, flooredY - 1, channel),
            flooredX + 2,
            I(flooredX + 2, flooredY - 1, channel),
            scaledX
          ),

          calculateParabolaPoint(
            flooredX,
            I(flooredX, flooredY, channel),
            flooredX + 1,
            I(flooredX + 1, flooredY, channel),
            flooredX + 2,
            I(flooredX + 2, flooredY, channel),
            scaledX
          ),

          calculateParabolaPoint(
            flooredX,
            I(flooredX, flooredY + 1, channel),
            flooredX + 1,
            I(flooredX + 1, flooredY + 1, channel),
            flooredX + 2,
            I(flooredX + 2, flooredY + 1, channel),
            scaledX
          )
        ];

        scaledRegion[index + channel] = calculateParabolaPoint(
          flooredY,
          iterations[0],
          flooredY + 1,
          iterations[1],
          flooredY + 2,
          iterations[2],
          scaledY
        );
        // }
      }
    }
  }

  data = fillRegionWithDataAbsolute(
    data,
    width,
    height,
    scaledRegion,
    0,
    0,
    scaledWidth,
    scaledHeight
  );

  return data;
}
