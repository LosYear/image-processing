export const getFilename = state => state.image.filename;
export const getHistogramData = state => state.image.histogram;
export const getDimensions = state => ({
  width: state.image.width,
  height: state.image.height
});
export const getGrayscaledFlag = state => state.image.grayscaled;
