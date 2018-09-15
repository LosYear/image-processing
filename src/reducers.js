import {combineReducers} from 'redux';
import file from './reducers/file';
import filter from './reducers/filter';

export default combineReducers({
    file, filter
});