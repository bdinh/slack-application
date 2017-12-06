import React, { Component } from 'react';
import Message from './chatbox';
import { bindAll } from 'lodash';
import { HashLoader } from 'react-spinners';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class ChatLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
        bindAll(this, [
            'handleSelectChange',
            'inviteUserWrapper'
        ]);

    }

    handleSelectChange (value) {
        this.setState({ value });
    }

    inviteUserWrapper() {
        this.props.inviteUserCallback(this.state.value);
    }


    render() {

        const {
            allUsers,
            displayName,
            inviteState,
            messagesArray,
            channelType,
            userId,
            deleteCallback,
            editCallback,
            editCancelCallback,
            editCheckCallback,
            validUserPrompt,
        } = this.props;

        let className = validUserPrompt ? "chat-display" : "chat-display-shrink";

        return (

            <div className={className}>
                <div className="chat-log">
                    <div className="hash-container">
                        <HashLoader
                            loading={true}
                            size={75}
                            color={"#3EB890"}
                        />
                    </div>

                    {
                        (inviteState && channelType === "private") ? (
                            <div>
                                <div className="invite-popup-padding">

                                </div>
                                <div className="invite-popup">
                                    <div className="invite-popup-text">
                                        Invite your friends
                                    </div>
                                    <Select
                                        name="form-invite-user"
                                        value={this.state.value}
                                        multi={true}
                                        disabled={false}
                                        onChange={this.handleSelectChange}
                                        removeSelected={true}
                                        closeOnSelect={false}
                                        searchable={true}
                                        placeholder={"Search by name"}
                                        options={allUsers}
                                    />
                                    <div className="popup-invite-button-container">
                                        <button
                                            id="popup-invite"
                                            className="btn popup-invite-button"
                                            onClick={this.inviteUserWrapper}
                                        >
                                            Invite Users
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : ""
                    }
                    {messagesArray.map((message, i) => {
                        return (<Message
                                messageObject={message}
                                key={i}
                                id={i}
                                displayName={displayName}
                                userId={userId}
                                deleteCallback={deleteCallback}
                                editCallback={editCallback}
                                editCancelCallback={editCancelCallback}
                                editCheckCallback={editCheckCallback}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}