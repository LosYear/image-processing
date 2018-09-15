export const calcCanvasIndex = (column, row, width) => (column + row * width) * 4;

export const putPixelToCanvas = (canvasData, index, color) => {
    canvasData[index] = color[0] || color;
    canvasData[index + 1] = color[1] || color;
    canvasData[index + 2] = color[2] || color;
    canvasData[index + 3] = 255;
};
