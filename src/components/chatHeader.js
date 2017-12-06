import React, { Component } from 'react';

export default class ChatHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {

        const {
            activeChannel,
            channelPurpose,
            channelUsers,
        } = this.props;

        return (
            <div className="chat-header">
                <div className="header-channel-title">
                    <p>#{activeChannel}<span className="total-people-label">{"(" + channelUsers.length + ")"}</span></p>
                </div>
                <div className="channel-purpose">
                    <p>{channelPurpose}</p>
                </div>
            </div>
        );
    }

}
