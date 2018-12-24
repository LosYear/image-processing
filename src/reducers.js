import { combineReducers } from 'redux';
import image from './reducers/image';
import loader from './reducers/loader';
import region from './reducers/region';

export default combineReducers({
  image,
  loader,
  region
});
