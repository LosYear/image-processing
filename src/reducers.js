import {combineReducers} from 'redux';
import image from './reducers/image';
import loader from './reducers/loader';

export default combineReducers({
    image, loader
});
