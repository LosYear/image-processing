import {SET_FILENAME_ACTION} from "../action_creators/file";

const initialState = {
    filename: null
};

export default function (state = initialState, action) {
    switch (action.type){
        case SET_FILENAME_ACTION: return {...state, filename: action.value};
        default: return state;
    }
}