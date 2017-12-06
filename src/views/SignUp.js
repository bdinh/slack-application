import React, { Component } from 'react';
import { bindAll } from 'lodash';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

// Component that allows the user to sign up to use the application
export default class SignUpView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSession: false,
            loading: false,
        };
        bindAll(this, [
            'handleLoading'
        ]);
    }

    checkPassword(event) {
        let password = event.target.value;
        if (password.length > 5) {
            $('.signup-button').prop('disabled', false);
        } else {
            $('.signup-button').prop('disabled', true);
        }
    }

    componentDidMount() {
        $('.signup-button').prop('disabled', true);
        this.setState({
            loading: false
        });
    }

    handleLoading() {
        this.setState({
            loading: true
        });

        this.props.signUpCallback();

    }

    componentWillUnmount() {
        this.setState({
            loading: false
        })
    }


    render() {

        const {
            activeSession,
            errorMessage
        } = this.props;

        if (activeSession) {
            return <Redirect to="/" exact />
        }
        return (
        <div className="container form-container col-6 offset-3">
                <div className="hash-container">
                    <HashLoader
                        loading={errorMessage === "" && this.state.loading}
                        size={75}
                        color={"#3EB890"}
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-labels"
                        htmlFor="createDisplayName">
                        Display Name
                        <span className="faded-text"> (only letters, numbers, and underscores)</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="createDisplayName"
                        aria-describedby="displayNameHelp"
                        placeholder="Enter Display Name"
                    />
                </div>
                <div className="form-group form-group-spacing">
                    <label className="form-labels" htmlFor="createEmail">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="createEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group form-group-spacing">
                    <label
                        className="form-labels"
                        htmlFor="createPassword">
                        Password
                        <span className="faded-text"> (minimum 6 character)</span>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="createPassword"
                        placeholder="Password"
                        onChange={this.checkPassword}
                    />
                </div>
                <div className="form-group-spacing">
                    <button
                        className="btn btn-primary signup-button"
                        onClick={this.handleLoading}
                    >Create Account</button>
                </div>
                {
                    errorMessage !== "" ?
                        (
                            <div className="error-handling">
                                <p>{errorMessage.message}</p>
                            </div>
                        )
                        : (" ")
                }

        </div>
        );
    }

}