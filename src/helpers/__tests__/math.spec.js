import { determinant, findParabolaCoefficient } from '../math';

describe('calculates determinant of 3*3', () => {
  test('case 1 3*3', () => {
    const data = [2, 5, -2, 3, 8, 0, 1, 3, 5];

    expect(determinant(data)).toBe(3);
  });

  test('case 2 3*3', () => {
    const data = [2, 5, 2, 3, 8, 3, 1, 3, 16];

    expect(determinant(data)).toBe(15);
  });

  test('case 3 3*3', () => {
    const data = [2, 5, 2, 3, 8, 3, 1, 3, 1];

    expect(determinant(data)).toBe(0);
  });

  test('case 4 3*3', () => {
    const data = [-2, 1, 1, 6, -1, 1, 3, 2, 1];

    expect(determinant(data)).toBe(18);
  });
});

describe('finds right coefficients for parabola', () => {
  test('case 1', () => {
    expect(findParabolaCoefficient(1, -2, -1, 6, 2, 3)).toEqual({
      a: 3,
      b: -4,
      c: -1
    });
  });
});
