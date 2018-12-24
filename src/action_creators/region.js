export const SET_REGION_SELECT_DISABLED = 'SET_REGION_SELECT_DISABLED';
export const SET_SELECTED_REGIONS = 'SET_SELECTED_REGIONS';

export const setRegionSelectDisabled = value => dispatch =>
  dispatch({ type: SET_REGION_SELECT_DISABLED, value });

export const setSelectedRegions = regions => dispatch =>
  dispatch({ type: SET_SELECTED_REGIONS, regions });
