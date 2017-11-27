import React, { Component } from 'react';

export default class UtilityBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
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
        );
    }
}