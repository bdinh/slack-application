import React, { Component } from 'react';
import md5 from 'md5';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import '../css/font-awesome/css/font-awesome.css';


export default class Message extends Component {
    constructor(props) {
        super(props)
    }



    render() {

        const {
            displayName,
            messageObject,
            userId,
            deleteCallback,
            id,
            editCallback,
            editCancelCallback,
            editCheckCallback
        } = this.props;

        let hash = md5(messageObject.createdBy.email);
        let postTime = moment(messageObject.timeStamp).fromNow();

        return(
            <div className="chat">
                <div className="user-photo-container">
                    <div className="user-photo">
                        <img className="profile-pic" src={"https://www.gravatar.com/avatar/" + hash} alt="user-profile-picture" />
                    </div>
                </div>
                <div className="chat-text">
                    <div className="row">
                        <div className="chat-header-container col-6 col-xs-12 col-12 col-md-10">
                        <p className="chat-headings">
                                <span className="name-display">{messageObject.createdBy.name}
                                </span>
                            <span className="time-display">{postTime}
                                </span>
                            <span className="edited-display">
                                {messageObject.createdBy.edited
                                    ? "(Edited " + moment(messageObject.createdBy.editedTime).fromNow() + ")"
                                    : ""}
                                </span>

                        </p>
                    </div>
                        <div className="chat-utilities-container col-6 col-xs-12 col-md-2">
                            {userId === messageObject.createdBy.id ?
                                (<div className={"chat-utilities-wrapper" + " "}>
                                    { messageObject.edited ?
                                        (<div>
                                            <div className="edit-icon-container event-container" onClick={editCancelCallback}>
                                                <FontAwesome id={"message-edit-cancel" + id} className="edit-icon chat-icon" name="times"/>
                                            </div>
                                            <div className="delete-icon-container event-container" onClick={editCheckCallback}>
                                                <FontAwesome id={"message-edit-check" + id} className="chat-icon" name="check"/>
                                            </div>
                                        </div>
                                        ) :
                                        (<div>
                                            <div className="edit-icon-container event-container" onClick={editCallback}>
                                                <FontAwesome id={"message-edit" + id} className="edit-icon chat-icon" name="pencil"/>
                                            </div>
                                            <div className="delete-icon-container event-container" onClick={deleteCallback}>
                                                <FontAwesome id={"message-delete" + id} className="chat-icon" name="trash"/>
                                            </div>
                                        </div>)
                                    }
                                </div>) : ""
                            }
                        </div>
                    </div>
                    {messageObject.edited ?
                        <textarea className="form-control edit-text-input" rows="2" id="edit-box" defaultValue={messageObject.text}/>
                        : <p className="chat-message">{messageObject.text}</p>
                    }
                    {/*<textarea className="form-control text-input" rows="2" id="edit-box"/>*/}
                    {/*<p className="chat-message">{messageObject.text}</p>*/}
                </div>
            </div>
        );
    }


}