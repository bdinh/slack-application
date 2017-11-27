import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js.map';
import { validateEmail } from "./util";
import LoginView from './views/Login';
import SignUpView from './views/SignUp';
import { Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';

let config = {
    apiKey: "AIzaSyAVu-yWQVgP-NQMz9xuKxjMJTfdDK5bNKw",
    authDomain: "react-chat-3c399.firebaseapp.com",
    databaseURL: "https://react-chat-3c399.firebaseio.com",
    projectId: "react-chat-3c399",
    storageBucket: "",
    messagingSenderId: "132053997914"
};
firebase.initializeApp(config);



class App extends Component {
    constructor(props) {
        super(props);
        // bindAll(this, [
        //     'checkCredentials'
        // ]);
    }


  render() {
    return (
      <div className="App">
        <div className="row dashboard-container">
          <div className="col-4 col-md-3 navigation-menu">
            <div className="user-settings">
              <div className="user-button-container">
                <p className="user-button">@bdinh</p>
                {/*<button className="btn user-button" type="button">bdinh</button>*/}
              </div>
            </div>
            <div className="channel-navigation">
              <p>CHANNELS</p>
              <ul>
                <li>#general</li>
                <li>#general</li>
                <li>#general</li>
                <li>#general</li>
              </ul>
              <div className="sign-out-container">
                <button className="btn sign-out-button" type="button">Sign Out</button>
              </div>
            </div>
          </div>
          <div className="col-4 col-md-9 chat-panel">
            <div className="chat-header">

            </div>
            <div className="chat-display">
              {/*<div className="chat-log">*/}

              {/*</div>*/}
            </div>
            <div className="chat-utility">
              <div className="form-group">
                <div className="input-container">
                  <textarea className="form-control text-input" rows="2" id="comment"/>
                </div>
                <div className="inline-container">
                  <div className="send-button-container">
                    <button className="btn send-button" type="button">Send</button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        {/*<Switch>*/}
          {/*<Route path='/login' component={LoginView}/>*/}
          {/*<Route path='/join' component={SignUpView}/>*/}
        {/*</Switch>*/}
        {/*<SignUpView/>*/}

      </div>
    );
  }
}

export default App;
