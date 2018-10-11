import {getRowByIndex, getColumnByIndex} from "../canvas";

describe('test canvas index helper', () => {
    test('getRowByIndex', () => {
        expect(getRowByIndex(42, 10)).toBe(1);
        expect(getRowByIndex(3, 10)).toBe(0);
        expect(getRowByIndex(408212, 427)).toBe(239);
    });

    test('getColumnByIndex', () => {
        expect(getColumnByIndex(15, 10)).toBe(3);
        expect(getColumnByIndex(1, 10)).toBe(0);
        expect(getColumnByIndex(41, 10)).toBe(0);
    });
});