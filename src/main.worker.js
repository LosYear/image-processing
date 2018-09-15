import {createWorker} from 'redux-worker';
import reducer from './reducers';
import {CALCULATE_HISTOGRAM} from "./actions";
import * as histogramProcessor from "./lib/histogram";

let worker = createWorker();

worker.registerReducer(reducer);

worker.registerTask(CALCULATE_HISTOGRAM, (payload) => histogramProcessor.calculateHistogram(payload.data, payload.channel));