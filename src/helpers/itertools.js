/**
 * Creates cartesian product of two arrays
 * @param a {Array}
 * @param b {Array}
 * @return {Array}
 */
export function product(a, b) {
  const result = [];

  for (const first of a) {
    for (const second of b) {
      result.push([first, second]);
    }
  }

  return result;
}

/**
 * Fills array with numbers from..to
 * @param from {number}
 * @param to {number}
 * @return {Array}
 */
export function fillArray(from, to) {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
}
