import React, { Component } from 'react';
import Message from './chatbox';
import { HashLoader } from 'react-spinners';

export default class ChatLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            displayName,
            messagesArray,
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
                            loading={this.props.chatLoading}
                            size={75}
                            color={"#3EB890"}
                        />
                    </div>
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