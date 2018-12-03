import { product, fillArray } from '../itertools';

describe('calculates cartesian product', () => {
  test('simple case', () => {
    const p = product([1, 2, 3], [1, 2]);

    expect(p).toEqual([[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2]]);
  });

  test('offsets example', () => {
    const p = product([-1, 0, 1], [-1, 0, 1]);

    expect(p).toEqual([
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]);
  });

  test('empty case', () => {
    const p = product([-1, 0, 1], []);

    expect(p).toEqual([]);
  });
});

describe('fills array with numbers from from...to', () => {
  test('normal case', () => {
    expect(fillArray(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  });

  test('empty', () => {
    expect(fillArray(2, 1)).toEqual([]);
  });
});
