/**
 * Calculates determinant of the matrix (sized 3*3 only)
 * @param matrix
 * @return {number}
 */
export const determinant = matrix => {
  if (matrix.length !== 9) {
    throw new Error('Matrix must have size 3x3');
  }

  return (
    matrix[0] * matrix[4] * matrix[8] -
    matrix[0] * matrix[7] * matrix[5] +
    matrix[1] * matrix[5] * matrix[6] -
    matrix[1] * matrix[8] * matrix[3] +
    matrix[2] * matrix[3] * matrix[7] -
    matrix[2] * matrix[6] * matrix[4]
  );
};

/**
 * Calculates coefficients for the parabola containing given points
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param x3
 * @param y3
 * @return {{a: number, b: number, c: number}}
 */
export const findParabolaCoefficient = (x1, y1, x2, y2, x3, y3) => {
  const det = determinant([x1 * x1, x1, 1, x2 * x2, x2, 1, x3 * x3, x3, 1]);
  const det1 = determinant([y1, x1, 1, y2, x2, 1, y3, x3, 1]);
  const det2 = determinant([x1 * x1, y1, 1, x2 * x2, y2, 1, x3 * x3, y3, 1]);
  const det3 = determinant([x1 * x1, x1, y1, x2 * x2, x2, y2, x3 * x3, x3, y3]);

  return {
    a: det1 / det,
    b: det2 / det,
    c: det3 / det
  };
};

/**
 * Calculates the approximated value of approximated parabola (the so-called QuadraticInterpolation)
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param x3
 * @param y3
 * @param x
 * @return {number}
 */
export const calculateParabolaPoint = (x1, y1, x2, y2, x3, y3, x) => {
  const { a, b, c } = findParabolaCoefficient(x1, y1, x2, y2, x3, y3);

  return a * x * x + b * x + c;
};
