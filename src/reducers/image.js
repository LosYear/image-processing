import {SET_FILENAME_ACTION} from "../action_creators/image";

const initialState = {
    filename: null,
    previousFilename: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FILENAME_ACTION:
            return {...state, filename: action.value, previousFilename: state.filename || action.value};
        default:
            return state;
    }
}