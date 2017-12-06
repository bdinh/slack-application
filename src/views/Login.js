import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { HashLoader } from 'react-spinners';

// Component that allows the user to sign into the application
export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSession: false,
            loading: false
        };
        bindAll(this, [
            'checkForm',
            'handleLoading'
        ]);
    }

    componentDidMount() {
        $('.login-button').prop('disabled', true);
    }

    handleLoading() {
        this.setState({
            loading: true
        });

        this.props.loginCallback();

    }

    componentWillUnmount() {
        this.setState({
            loading: false
        })
    }

    checkForm(event) {
        let password = event.target.value;
        if (password.length > 1) {
            $('.login-button').prop('disabled', false);
        } else {
            $('.login-button').prop('disabled', true);
        }
    }

    render() {

        const {
            activeSession,
            errorMessage
        } = this.props;

        if (activeSession) {
            return (<Redirect to='/' exact />)
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
                    <label  className="form-labels" htmlFor="loginEmail">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group form-group-spacing">
                    <label className="form-labels" htmlFor="loginPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        onChange={this.checkForm}
                    />
                </div>
                <div className="new-account-text-container">
                    <p className="new-account-text">Don't have an account? <Link to='./join'>Join</Link></p>
                </div>
                <div className="form-group-spacing">
                    <button
                        className="btn btn-primary login-button"
                        onClick={this.handleLoading}>
                        Login
                    </button>
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
            </div>);
    }

}