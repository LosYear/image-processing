export function calculateNegative(data, threshold = 0) {
  return data.map((el, index) => {
    if (index % 4 === 3) {
      return el;
    }

    return el >= threshold ? 255 - el : el;
  });
}
