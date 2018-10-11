import {createWorker} from 'redux-worker';
import reducer from './reducers';
import {
    CALCULATE_HISTOGRAM,
    CREATE_GRAYSCALE_IMAGE,
    CREATE_NEGATIVE_IMAGE,
    CREATE_SOLARISED_IMAGE,
    CREATE_INCREASED_CONTRAST,
    CREATE_DECREASED_CONTRAST,
    CREATE_BLURRED_IMAGE
} from "./actions";
import * as imageProcessor from './lib/imageProcessor';

let worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask(CALCULATE_HISTOGRAM, (payload) => imageProcessor.calculateHistogram(payload.data, payload.channel));
worker.registerTask(CREATE_GRAYSCALE_IMAGE, (payload) => imageProcessor.calculateGrayscale(payload.data));
worker.registerTask(CREATE_NEGATIVE_IMAGE, (payload) => imageProcessor.calculateNegative(payload.data, payload.threshold));
worker.registerTask(CREATE_SOLARISED_IMAGE, (payload) => imageProcessor.calculateSolarisation(payload.data, payload.k));
worker.registerTask(CREATE_INCREASED_CONTRAST, (payload) => imageProcessor.increaseContrast(payload.data, payload.min, payload.max));
worker.registerTask(CREATE_DECREASED_CONTRAST, (payload) => imageProcessor.decreaseContrast(payload.data, payload.min, payload.max));
worker.registerTask(CREATE_BLURRED_IMAGE, (payload) => imageProcessor.applyBlurFilter(payload.data, payload.width, payload.height, payload.k));

export default worker;