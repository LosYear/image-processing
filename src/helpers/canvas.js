export const calcCanvasIndex = (column, row, width) =>
  (column + row * width) * 4;

export const getRowByIndex = (index, width) => Math.floor(index / (width * 4));
export const getColumnByIndex = (index, width) => Math.floor(index / 4) % width;

export const putPixelToCanvas = (canvasData, index, color) => {
  canvasData[index] = color[0] || color;
  canvasData[index + 1] = color[1] || color;
  canvasData[index + 2] = color[2] || color;
  canvasData[index + 3] = 255;
};

export const drawFileOnCanvas = (canvas, filename) => {
  const img = new Image();
  const canvasContext = canvas.getContext('2d');

  return new Promise((accepted, rejected) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvasContext.drawImage(img, 0, 0, img.width, img.height);
      accepted(canvas);
    };

    img.onerror = () => {
      rejected('Failed to load image');
    };

    img.src = filename;
  });
};

export const getFilePixelData = async filename => {
  const canvas = document.createElement('canvas');
  await drawFileOnCanvas(canvas, filename);
  return canvas
    .getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height);
};

export const savePixelData = (data, width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  const imageData = new ImageData(data, width, height);
  context.putImageData(imageData, 0, 0);

  return new Promise(accepted => {
    canvas.toBlob(blob => {
      accepted(URL.createObjectURL(blob));
    });
  });
};
