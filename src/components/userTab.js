import React, { Component } from 'react';

export default class UserTab extends Component {
    constructor(props) {
        super(props);
    }

    // componentWillReceiveProps(nextProps) {
    //     // if (this.props.displayName !== nextProps.displayName) {
    //     //     this.setState({
    //     //         displayName: nextProps.displayName,
    //     // });
    //     // }
    // }

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
