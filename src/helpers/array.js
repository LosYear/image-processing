/**
 * Flats array with depth 1
 * @param array {Array}
 * @return {Array}
 */
export const flatten = array => array.reduce((acc, val) => acc.concat(val), []);
