import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer/AppContainer';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as sagas from './sagas';
import {applyWorker} from 'redux-worker';
import Worker from './main.worker.js';

const sagaMiddleware = createSagaMiddleware();

const worker = new Worker();

const store = createStore(reducers, composeWithDevTools(compose(applyMiddleware(sagaMiddleware, thunkMiddleware),
    applyWorker(worker))));

sagaMiddleware.run(sagas.imageSaga);

ReactDOM.render(<Provider store={store}>
    <AppContainer/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
