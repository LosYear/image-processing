export const SET_FILTER_NAME_ACTION = 'SET_FILTER_NAME_ACTION';

export function setFilterName(name) {
  return dispatch => {
    dispatch({ type: SET_FILTER_NAME_ACTION, value: name });
  };
}
