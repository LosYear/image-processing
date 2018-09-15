import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer/AppContainer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware)));

sagaMiddleware.run(sagas.imageSaga);

ReactDOM.render(<Provider store={store}>
    <AppContainer/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
