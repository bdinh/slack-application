import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL+'/'}><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
