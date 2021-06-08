import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './app';

import rootReducer from './boundedContexts/rootReducer';

import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    rootReducer
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> 
);

ReactDOM.render(app, document.getElementById('app'));