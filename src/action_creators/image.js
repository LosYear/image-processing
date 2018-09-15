export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';
export const SET_HISTOGRAM_DATA = 'SET_HISTOGRAM_DATA';

export const CHOOSE_FILE = 'CHOOSE_FILE';
export const CALCULATE_HISTOGRAM = 'CALCULATE_HISTOGRAM';

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