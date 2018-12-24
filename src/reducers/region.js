import {
  SET_SELECTED_REGIONS,
  SET_REGION_SELECT_DISABLED
} from '../action_creators/region';

const initialState = {
  disabled: false,
  regions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGION_SELECT_DISABLED:
      return { ...state, disabled: action.value };
    case SET_SELECTED_REGIONS:
      return { ...state, regions: action.regions };
    default:
      return state;
  }
}
