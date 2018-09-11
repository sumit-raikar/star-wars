import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store';

ReactDOM.render(<HashRouter><Provider store={configureStore()}><App /></Provider></HashRouter>, document.getElementById('root'));
// registerServiceWorker();
