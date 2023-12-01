import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom';

import configureStore from './configuraStore';

const store = configureStore()

const browserHistory = createBrowserHistory();

const app = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
