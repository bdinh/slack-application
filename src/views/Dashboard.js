import React, { Component } from 'react';
import UtilityBar from '../components/utilityBar';
import ChatLog from '../components/chatLog';
import ChatHeader from '../components/chatHeader';
import NavigationMenu from '../components/navigationMenu';
import Footer from '../components/footer';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import $ from 'jquery';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChannel: "general",
            activeChannelId: "",
            channelPurpose: "",
            messagesArray: [],
            channels: [],
            validChannel: true,
            channelUsers: [],
            validUser: false,
            displayObject: {},
            chatLoading: false,
        };
        bindAll(this, [
            'updateDashBoard',
            'submitMessage',
            'updateMessagesArray',
            'deleteMessage',
            'editMessage',
            'editCancelCallback',
            'editCheckCallback',
            'joinChannel',
            'updateChannelUsers'
        ])
    }

    componentDidMount() {
        if (this.props.activeSession) {
            this.updateDashBoard();
        }
    }

    updateDashBoard() {
        let channels = [];
        let displayObj = {};
        let channelsRef = firebase.database().ref('channels');
        channelsRef.once('value')
            .then((snapshot) => {
                let activeChannelId = "";

                snapshot.forEach((channel) => {
                    let data = channel.val();
                    if (data.name === this.state.activeChannel) {
                        activeChannelId = data.id;
                        displayObj.time = data.timeStamp;
                    }
                    channels.push({
                        name: data.name,
                        type: data.type,
                        members: data.members,
                    });
                });

                this.setState({
                    channels: channels,
                    activeChannelId: activeChannelId,
                });

                this.updateChannelUsers();

                let channelsName = channels.map((channel) => {
                    return channel.name
                });
                if (channelsName.includes(this.state.activeChannel) ) {
                    let activeChannelRef = firebase.database().ref('channels/' + activeChannelId);
                    activeChannelRef.on('value', (snapshot) => {
                        displayObj.name = snapshot.val().createdBy.displayName;
                        let description = snapshot.val().description;
                        this.setState({
                            channelPurpose: description,
                            displayObject: displayObj
                        });
                    });

                    this.updateMessagesArray();

                } else {
                    this.setState({
                        validChannel: false,
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.channelName !== nextProps.match.params.channelName) {

            this.setState({
                activeChannel: nextProps.match.params.channelName,
            });
            this.updateDashBoard();
        }
    }

    updateMessagesArray() {
        let messages = [];
        let allMessagesRef = firebase.database().ref('channels/' + this.state.activeChannelId + '/messages');
        allMessagesRef.on('value', (snapshot) => {
            snapshot.forEach((message) => {
                let insertMessage = message.val();
                insertMessage.refId = message.key;
                messages.push(insertMessage);
            });
            this.setState({
                messagesArray: messages
            });

            this.setState({
                chatLoading: false
            })
            console.log(this.state.messagesArray);
        });
    }



    submitMessage() {
        let message = $('.text-input').val();

        this.setState({
            chatLoading: true
        })

        let user = firebase.auth().currentUser;
        let userDisplayName = user.displayName;
        let userEmail = user.email;
        let userId = user.uid;

        let messagesRef = firebase.database().ref('channels/' + this.state.activeChannelId + "/messages");
        messagesRef.push({
            createdBy: {
                name: userDisplayName,
                id: userId,
                email: userEmail
            },
            timeStamp: Date.now(),
            text: message,
        });

        $('.text-input').val("");

        this.updateMessagesArray();

    }

    deleteMessage(event) {
        if(window.confirm("Are you sure?")) {
            let removeIndex = event.target.id.substring(14);
            let removeRefId = this.state.messagesArray[removeIndex].refId;
            let removeRef = firebase.database().ref('channels/' + this.state.activeChannelId + '/messages/' + removeRefId);
            removeRef.remove();
            this.updateMessagesArray()
        }
    }

    editMessage(event) {
        let editIndex = event.target.id.substring(12);
        let editMessage = this.state.messagesArray[editIndex];

        // let editRefId = editMessage.refId;
        // let editRef = firebase.database().ref('channels/' + this.state.activeChannel + '/messages/' + editRefId);


        editMessage.edited = true;
        let updateMessageArray = this.state.messagesArray;
        updateMessageArray[editIndex] = editMessage;
        this.setState({
            messagesArray: updateMessageArray
        });

    }

    editCancelCallback(event) {
        let editIndex = event.target.id.substring(19);
        let editMessage = this.state.messagesArray[editIndex];
        delete editMessage.edited;
        let updateMessageArray = this.state.messagesArray;
        updateMessageArray[editIndex] = editMessage;
        this.setState({
            messagesArray: updateMessageArray
        });

    }

    editCheckCallback(event) {
        let editIndex = event.target.id.substring(18);
        let editMessage = this.state.messagesArray[editIndex];
        let editMessageRedId = editMessage.refId;
        let newMessageText = $('.edit-text-input').val();
        editMessage.createdBy.editedTime = Date.now();
        editMessage.createdBy.edited = true;

        delete editMessage.edited;
        delete editMessage.refId;
        editMessage.text = newMessageText;
        $('.edit-text-input').val("");
        let editMessageRef = firebase.database().ref('channels/' + this.state.activeChannelId + "/messages/" + editMessageRedId);
        editMessageRef.update(editMessage);
        this.updateMessagesArray();
    }

    updateChannelUsers() {
        let channelRef = firebase.database().ref('channels/' + this.state.activeChannelId + "/members");
        channelRef.once('value')
            .then((snapshot) => {
                let channelUserId = [];
                snapshot.forEach((member) => {
                    let data = member.val();
                    channelUserId.push(data.userId);
                });
                this.setState({
                    channelUsers: channelUserId
                });

                if (this.state.channelUsers.includes(this.props.userId)) {
                    this.setState({
                        validUser: true
                    })
                } else {
                    this.setState({
                        validUser: false
                    })
                }

        })
    }

    joinChannel() {

        let addRef = firebase.database().ref('channels/' + this.state.activeChannelId + '/members/');
        addRef.push({
            displayName: this.props.displayName,
            userEmail: this.props.userEmail,
            userId: this.props.userId
        });

        this.updateDashBoard();

    }


    render() {

        const {
            activeSession,
            signOutCallback,
            displayName,
            userId,
        } = this.props;

        if (!activeSession) {
            return <Redirect to='/login'/>
        }

        if (!this.state.validChannel) {
            return <Redirect to='/channel/general'/>
        }

        // if (activeChannel !== "general" || !test || activeSession) {
        //     return <Redirect to='/login'/>
        // }

        return(
            <div className="row dashboard-container">
                <div className="col-4 col-md-4 col-xl-3 navigation-menu">
                    <NavigationMenu
                        activeChannel={this.state.activeChannel}
                        userId={userId}
                        channels={this.state.channels}
                        displayName={displayName}
                        signOutCallback={signOutCallback}
                    />
                </div>
                <div className="col-8 col-md-8 col-xl-9 chat-panel">
                    <ChatHeader
                        activeChannel={this.state.activeChannel}
                        channelPurpose={this.state.channelPurpose}
                        channelUsers={this.state.channelUsers}
                    />

                    <ChatLog
                        chatLoading={this.state.chatLoading}
                        validUserPrompt={this.state.validUser}
                        displayName={displayName}
                        messagesArray={this.state.messagesArray}
                        activeChannel={this.state.activeChannel}
                        userId={userId}
                        deleteCallback={this.deleteMessage}
                        editCallback={this.editMessage}
                        editCancelCallback={this.editCancelCallback}
                        editCheckCallback={this.editCheckCallback}
                    />
                    <UtilityBar
                        activeChannelId={this.state.activeChannelId}
                        displayObject={this.state.displayObject}
                        validUserPrompt={this.state.validUser}
                        activeChannel={this.state.activeChannel}
                        submitMessageCallback={this.submitMessage}
                        joinChannelCallback={this.joinChannel}
                    />
                </div>
                <div className="col-12 footer-container">
                    <Footer/>
                </div>
            </div>
        );
    }
}