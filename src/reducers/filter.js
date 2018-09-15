import {SET_FILTER_NAME_ACTION} from "../actions";

const initialState = {
    name: null
};

export default function (state = initialState, action) {
    switch (action.type){
        case SET_FILTER_NAME_ACTION: return {...state, name: action.value};
        default: return state;
    }
}