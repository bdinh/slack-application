import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js.map';
import { validateEmail } from "./util";
import LoginView from './views/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginView/>
      </div>
    );
  }
}

export default App;
