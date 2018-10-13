import {SET_FILENAME_ACTION, SET_HISTOGRAM_DATA, SET_DIMENSIONS, SET_GRAYSCALED_FLAG} from "../action_creators/image";

const initialState = {
    filename: null,
    previousFilename: null,
    histogram: null,
    width: null,
    height: null,
    grayscaled: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FILENAME_ACTION:
            // window && window.URL.revokeObjectURL(state.previousFilename);
            return {...state, filename: action.value, previousFilename: state.filename || action.value};
        case SET_HISTOGRAM_DATA:
            return {...state, histogram: action.data};
        case SET_DIMENSIONS:
            return {...state, width: action.width, height: action.height};
        case SET_GRAYSCALED_FLAG:
            return {...state, grayscaled: action.value};
        default:
            return state;
    }
}