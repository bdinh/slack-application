import React, { Component } from 'react';
import $ from 'jquery';
import firebase from 'firebase/app';
import { bindAll } from 'lodash';
import moment from 'moment';

export default class UtilityBar extends Component {
    constructor(props) {
        super(props);

        // bindAll(this, [
        //     'submitMessage'
        // ])
    }

    componentDidMount() {

    }

    queryDisplayObject() {

    }


    render() {

        const {
            submitMessageCallback,
            validUserPrompt,
            activeChannel,
            displayObject,
            joinChannelCallback
        } = this.props;

        function validUser() {
            if (validUserPrompt) {
                return (
                    <div className="form-group">
                        <div className="input-container">
                            <div className="text-area-container">
                                <textarea className="form-control text-input" rows="2" id="comment"/>
                            </div>
                        </div>
                        <div className="inline-container">
                            <div className="send-button-container">
                                <button className="btn send-button" type="button" onClick={submitMessageCallback}>Send</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="form-group col-12 join-prompt-container">
                        <div>
                            <p className="join-prompt-heading">
                                You are viewing <span className="channel-name">#{activeChannel}</span>
                            </p>
                        </div>
                        <div>
                            <p className="join-prompt-subheading">
                            Created by {displayObject.name} on {moment(displayObject.time).format("MMMM Do, YYYY")}
                            </p>
                        </div>
                        <div className="join-channel-button-container">
                            <button className="btn join-channel-button" type="button" onClick={joinChannelCallback}>Join Channel</button>
                        </div>
                    </div>
                );
            }

        }

        let className = validUserPrompt ? "chat-utility" : "chat-utility-grow";

        return (
            <div className={className}>
                {validUser()}
            </div>
        );
    }
}