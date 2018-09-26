import {getDimensions, getFilename} from "../selectors/image";
import {getFilePixelData} from "../helpers/canvas";
import {showLoader} from "./loader";

export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';
export const SET_HISTOGRAM_DATA = 'SET_HISTOGRAM_DATA';

export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const CHOOSE_FILE = 'CHOOSE_FILE';
export const UPDATE_IMAGE_DATA = 'UPDATE_IMAGE_DATA';
export const SAVE_PIXEL_DATA = 'SAVE_PIXEL_DATA';

export const CALCULATE_HISTOGRAM = 'CALCULATE_HISTOGRAM';
export const CREATE_GRAYSCALE_IMAGE = 'CREATE_GRAYSCALE_IMAGE';

/**
 * Dispatch this action only to update filename
 * @param filename
 * @return {Function}
 */
export function setFilename(filename) {
    return (dispatch) => {
        dispatch({type: SET_FILENAME_ACTION, value: filename});
    };
}

/**
 * Dispatch this action only to update histogram data, not to recalculate
 * @param data
 * @return {Function}
 */
export function setHistogramData(data) {
    return (dispatch) => {
        dispatch({type: SET_HISTOGRAM_DATA, data: data});
    };
}

/**
 * Dispatch this action to store image dimensions
 * @param width
 * @param height
 * @return {Function}
 */

export function setDimensions(width, height) {
    return (dispatch) => {
        dispatch({type: SET_DIMENSIONS, width, height});
    };
}

/**
 * Dispatch this action when the whole image changes, e.g. user choice
 * @param filename
 * @return {Function}
 */
export function chooseFile(filename) {
    return (dispatch) => {
        dispatch({type: CHOOSE_FILE, value: filename});
    };
}

/**
 * Dispatch this action to recalculate histogram data and to update it, uses async web worker
 * @return {Function}
 */
export function calculateHistogram(data) {
    return (dispatch) => {
        dispatch({task: CALCULATE_HISTOGRAM, data: data}).then((task) => {
            dispatch(setHistogramData(task.response))
        });
    }
}

export function createGrayscale() {
    return async (dispatch, getState) => {
        dispatch(showLoader());
        const {width, height} = getDimensions(getState());
        const data = (await getFilePixelData(getFilename(getState()))).data;
        dispatch({task: CREATE_GRAYSCALE_IMAGE, data}).then((task) => {
            dispatch({type: UPDATE_IMAGE_DATA, data: task.response, width, height});
        });
    }
}