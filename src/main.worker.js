import {createWorker} from 'redux-worker';
import reducer from './reducers';
import {CALCULATE_HISTOGRAM, CREATE_GRAYSCALE_IMAGE} from "./actions";
import * as histogramProcessor from "./lib/histogram";
import * as grayscaleProcessor from "./lib/grayscale";

let worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask(CALCULATE_HISTOGRAM, (payload) => histogramProcessor.calculateHistogram(payload.data, payload.channel));
worker.registerTask(CREATE_GRAYSCALE_IMAGE, (payload) => grayscaleProcessor.calculateGrayscale(payload.data));