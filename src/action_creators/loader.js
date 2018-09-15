export const SET_LOADER_SHOWN = 'SET_LOADER_SHOWN';

export function setLoaderShown(value) {
    return (dispatch) => {
        dispatch({type: SET_LOADER_SHOWN, value});
    };
}

export function showLoader(){
    return setLoaderShown(true);
}

export function hideLoader(){
    return setLoaderShown(false);
}