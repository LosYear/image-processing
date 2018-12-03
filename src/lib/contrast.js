export const increaseContrast = (data, min, max) =>
  data.map((el, index) => {
    if (index % 4 === 3) {
      return el;
    }
    if (el < min) {
      return 0;
    }
    if (el > max) {
      return 255;
    }
    return ((el - min) / (max - min)) * 255;
  });

export const decreaseContrast = (data, min, max) =>
  data.map((el, index) =>
    index % 4 !== 3 ? min + (el / 255) * (max - min) : el
  );
