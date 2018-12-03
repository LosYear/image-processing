export function calculateHistogram(data, channel = 0) {
  const histogram = new Array(256).fill(0);

  data.forEach((el, index) => {
    if (index % 4 === channel) {
      histogram[el] += 1;
    }
  });

  return histogram;
}
