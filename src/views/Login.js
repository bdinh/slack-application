import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link } from 'react-router-dom';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            displayName: "",
            validCredential: false,
        };
        bindAll(this, [
            'checkCredentials'
        ]);
    }

    checkCredentials() {
        // Check credentials and update state if appropriate


    }

    render() {

        return (
            <div className="container form-container col-6 offset-3">
                <form>
                    <div className="form-group">
                        <label  className="form-labels" htmlFor="inputEmail">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-labels" htmlFor="inputPassword">Password</label>
                        <input
                            type="password"
                            pattern="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Password"/>
                    </div>
                    <div className="new-account-text">
                        <p>Don't have an account? <Link to='./join'>Join</Link></p>
                    </div>
                    <button type="submit" className="btn btn-primary login-button" onClick={this.checkCredentials}>Login</button>
                </form>
            </div>
        );
    }

}