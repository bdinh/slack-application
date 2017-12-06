import React, { Component } from 'react';

// Component that will act as a user profile button in our messaging application
export default class UserTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            displayName,
        } = this.props;

        return (
            <div className="user-settings">
                <div className="user-button-container">
                    <p className="user-button">Welcome, {displayName}</p>
                </div>
            </div>
        );
    }

}
