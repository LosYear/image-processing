export const calculateSolarisation = (data, k) => {
  let max = 0;
  data.forEach((el, index) => (max = index % 4 === 0 && el > max ? el : max));

  return data.map((el, index) => (index % 4 !== 3 ? k * el * (max - el) : el));
};
