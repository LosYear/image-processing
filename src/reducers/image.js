import {SET_FILENAME_ACTION, SET_HISTOGRAM_DATA, SET_DIMENSIONS} from "../action_creators/image";

const initialState = {
    filename: null,
    previousFilename: null,
    histogram: null,
    width: null,
    height: null
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
        default:
            return state;
    }
}