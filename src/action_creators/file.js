export const SET_FILENAME_ACTION = 'SET_FILENAME_ACTION';

export function setFilename(filename) {
    return (dispatch) => {
        dispatch({type: SET_FILENAME_ACTION, value: filename});
    };
}