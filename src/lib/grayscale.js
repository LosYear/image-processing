export function calculateGrayscale(data, r = 0.299, g = 0.587, b = 0.114) {
  let tmp = 0;
  return data.map((el, index) => {
    if (index % 4 === 0) {
      tmp = data[index] * r + data[index + 1] * g + data[index + 2] * b;
    }

    if (index % 4 === 3) {
      return el;
    }
    return tmp;
  });
}
