import React, { Component } from 'react';

// Component that contains information about the state of the current active channel
export default class ChatHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        const {
            activeChannel,
            channelPurpose,
            channelType,
            channelUsers,
            inviteState,
            toggleInvite
        } = this.props;

        return (
            <div className="chat-header">
                <div className="header-row row">
                    <div className="col-10">
                        <div className="header-channel-title">
                            <p>#{activeChannel}<span className="total-people-label">{"(" + channelUsers.length + ")"}</span></p>
                        </div>
                        <div className="channel-purpose">
                            <p>{channelPurpose}</p>
                        </div>
                    </div>

                    <div className="invite-container col-2">
                        {
                            channelType === "private" ?
                                (
                                    <button
                                        className="btn invite-channel-button"
                                        type="button"
                                        onClick={toggleInvite}
                                    >{inviteState ? "Close" : "Invite"}
                                    </button>)
                                : ""
                        }
                    </div>
                </div>

            </div>
        );
    }

}
