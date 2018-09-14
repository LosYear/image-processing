import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer/AppContainer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(<Provider store={store}>
    <AppContainer/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
