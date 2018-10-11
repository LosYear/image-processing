/**
 * Creates cartesian product of two arrays
 * @param a {Array}
 * @param b {Array}
 * @return {Array}
 */
export function product(a, b) {
    let result = [];

    for (let first of a) {
        for (let second of b) {
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
    let result = [];
    for (let i = from; i <= to; i++) {
        result.push(i);
    }

    return result;
}