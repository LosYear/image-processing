import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyWorker } from 'redux-worker';
import * as sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import AppContainer from './components/AppContainer/AppContainer';
import Worker from './main.worker.js';

const sagaMiddleware = createSagaMiddleware();

const worker = new Worker();

const store = createStore(
  reducers,
  composeWithDevTools(
    compose(
      applyMiddleware(sagaMiddleware, thunkMiddleware),
      applyWorker(worker)
    )
  )
);

sagaMiddleware.run(sagas.imageSaga);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
