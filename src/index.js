import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
let config = {
    apiKey: "AIzaSyAVu-yWQVgP-NQMz9xuKxjMJTfdDK5bNKw",
    authDomain: "react-chat-3c399.firebaseapp.com",
    databaseURL: "https://react-chat-3c399.firebaseio.com",
    projectId: "react-chat-3c399",
    storageBucket: "",
    messagingSenderId: "132053997914"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
