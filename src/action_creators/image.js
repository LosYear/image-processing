import { getDimensions, getFilename } from '../selectors/image';
import { getFilePixelData } from '../helpers/canvas';
import { showLoader } from './loader';

export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';
export const SET_HISTOGRAM_DATA = 'SET_HISTOGRAM_DATA';
export const SET_GRAYSCALED_FLAG = 'SET_GRAYSCALED_FLAG';

export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const CHOOSE_FILE = 'CHOOSE_FILE';
export const UPDATE_IMAGE_DATA = 'UPDATE_IMAGE_DATA';

export const CALCULATE_HISTOGRAM = 'CALCULATE_HISTOGRAM';
export const CREATE_GRAYSCALE_IMAGE = 'CREATE_GRAYSCALE_IMAGE';
export const CREATE_NEGATIVE_IMAGE = 'CREATE_NEGATIVE_IMAGE';
export const CREATE_SOLARISED_IMAGE = 'CREATE_SOLARISED_IMAGE';
export const CREATE_INCREASED_CONTRAST = 'CREATE_INCREASED_CONTRAST';
export const CREATE_DECREASED_CONTRAST = 'CREATE_DECREASED_CONTRAST';
export const CREATE_BLURRED_IMAGE = 'CREATE_BLURRED_IMAGE';
export const CREATE_IMAGE_WITH_MEDIAN_FILTER =
  'CREATE_IMAGE_WITH_MEDIAN_FILTER';

export const APPLY_KIRSCH_OPERATOR = 'APPLY_KIRSCH_OPERATOR';
export const APPLY_ADAPTIVE_BINARIZATION = 'APPLY_ADAPTIVE_BINARIZATION';

export const ROTATE_REGION = 'ROTATE_REGION';

function runFilter(filter, userData = {}) {
  return async (dispatch, getState) => {
    const { width, height } = getDimensions(getState());
    if (width > 1000 || height > 1000) {
      dispatch(showLoader());
    }
    const { data } = await getFilePixelData(getFilename(getState()));
    dispatch({ task: filter, data, width, height, ...userData }).then(task => {
      dispatch({ type: UPDATE_IMAGE_DATA, data: task.response, width, height });
    });
  };
}

/**
 * Dispatch this action only to update filename
 * @param filename
 * @return {Function}
 */
export function setFilename(filename) {
  return dispatch => {
    dispatch({ type: SET_FILENAME_ACTION, value: filename });
  };
}

/**
 * Dispatch this action only to update histogram data, not to recalculate
 * @param data
 * @return {Function}
 */
export function setHistogramData(data) {
  return dispatch => {
    dispatch({ type: SET_HISTOGRAM_DATA, data });
  };
}

/**
 * Dispatch this action to store image dimensions
 * @param width
 * @param height
 * @return {Function}
 */
export function setDimensions(width, height) {
  return dispatch => {
    dispatch({ type: SET_DIMENSIONS, width, height });
  };
}

/**
 * Dispatch this action to change the value of grayscale flag
 * @param value
 * @return {Function}
 */
export function setGrayscaledFlag(value) {
  return dispatch => {
    dispatch({ type: SET_GRAYSCALED_FLAG, value });
  };
}

/**
 * Dispatch this action when the whole image changes, e.g. user choice
 * @param filename
 * @return {Function}
 */
export function chooseFile(filename) {
  return dispatch => {
    dispatch({ type: CHOOSE_FILE, value: filename });
  };
}

/**
 * Dispatch this action to recalculate histogram data and to update it, uses async web worker
 * @return {Function}
 */
export function calculateHistogram(data) {
  return dispatch => {
    dispatch({ task: CALCULATE_HISTOGRAM, data }).then(task => {
      dispatch(setHistogramData(task.response));
    });
  };
}

export function createGrayscale() {
  return dispatch => {
    dispatch(runFilter(CREATE_GRAYSCALE_IMAGE)).then(() =>
      dispatch(setGrayscaledFlag(true))
    );
  };
}

export const createNegative = threshold =>
  runFilter(CREATE_NEGATIVE_IMAGE, { threshold });
export const createSolarised = k => runFilter(CREATE_SOLARISED_IMAGE, { k });
export const createIncreasedContrast = (min, max) =>
  runFilter(CREATE_INCREASED_CONTRAST, { min, max });
export const createDecreasedContrast = (min, max) =>
  runFilter(CREATE_DECREASED_CONTRAST, { min, max });
export const createBlurredImage = k => runFilter(CREATE_BLURRED_IMAGE, { k });
export const createImageWithMedianFilter = () =>
  runFilter(CREATE_IMAGE_WITH_MEDIAN_FILTER);
export const applyKirschOperator = () => runFilter(APPLY_KIRSCH_OPERATOR);
export const applyAdaptiveBinarization = () =>
  runFilter(APPLY_ADAPTIVE_BINARIZATION);
export const rotateRegion = (region, angle, customCenter) =>
  runFilter(ROTATE_REGION, { region, angle, customCenter });
