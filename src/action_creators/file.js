export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';
export const CHOOSE_FILE = 'CHOOSE_FILE';

export function setFilename(filename) {
    return (dispatch) => {
        dispatch({type: SET_FILENAME_ACTION, value: filename});
    };
}

export function chooseFile(filename) {
    return (dispatch) => {
        dispatch({type: CHOOSE_FILE, value: filename});
    };
}