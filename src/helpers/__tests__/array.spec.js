import {flatten} from "../array";

describe('flats array', () => {
    test('simple case', () => {
        const array = [[1, 2, 3], [4, 5, 6]];

        expect(flatten(array)).toEqual([1, 2, 3, 4, 5, 6])
    });
});