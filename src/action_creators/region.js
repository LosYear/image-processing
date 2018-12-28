export const SET_REGION_SELECT_DISABLED = 'SET_REGION_SELECT_DISABLED';
export const SET_SELECTED_REGIONS = 'SET_SELECTED_REGIONS';
export const SET_CENTER_POINT = 'SET_CENTER_POINT';
export const SET_CENTER_TYPE = 'SET_CENTER_TYPE';

export const setRegionSelectDisabled = value => dispatch =>
  dispatch({ type: SET_REGION_SELECT_DISABLED, value });

export const setSelectedRegions = regions => dispatch =>
  dispatch({ type: SET_SELECTED_REGIONS, regions });

export const setCenterType = centerType => dispatch =>
  dispatch({ type: SET_CENTER_TYPE, centerType });

export const setCenterPoint = center => dispatch =>
  dispatch({ type: SET_CENTER_POINT, center });
