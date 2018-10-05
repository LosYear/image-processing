export const increaseContrast = (data, min, max) => data.map((el, index) => {
    if (index % 4 === 3) {
        return el;
    } else if (el < min) {
        return 0;
    } else if (el > max) {
        return 255;
    } else {
        return (el - min) / (max - min) * 255;
    }
});