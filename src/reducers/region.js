import {
  SET_SELECTED_REGIONS,
  SET_REGION_SELECT_DISABLED,
  SET_CENTER_POINT,
  SET_CENTER_TYPE
} from '../action_creators/region';

const initialState = {
  disabled: false,
  regions: [],
  center: { x: 0, y: 0 },
  centerType: 'center'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGION_SELECT_DISABLED:
      return { ...state, disabled: action.value };
    case SET_SELECTED_REGIONS:
      return { ...state, regions: action.regions };
    case SET_CENTER_POINT:
      return { ...state, center: action.center };
    case SET_CENTER_TYPE:
      return { ...state, centerType: action.centerType };
    default:
      return state;
  }
}
