import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/font-awesome/css/font-awesome.css';
import UserTab from '../components/userTab';
import { Redirect, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';


export default class NavigationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: []
        }
    }

    // componentDidMount() {
    //
    //     let channels = [];
    //     let channelsRef = firebase.database().ref('channels');
    //     channelsRef.once('value')
    //         .then((snapshot) => {
    //             let channelObj = snapshot.val();
    //             snapshot.forEach((channel) => {
    //                 // debugger;
    //                 channels.push(channel.key);
    //             });
    //
    //             channels.reverse();
    //             this.setState({
    //                 channels: channels
    //             });
    //             console.log(this.state);
    //
    //             // debugger;
    //         });
    //
    //     // console.log(channelsRef.child('general'));
    //
    //
    // }



    signOut() {
        // console.log("testing");
        //sign out a user
        // firebase.auth().signOut()
        //     .catch(err => console.log(err)); //log any errors for debugging
        // return (<Redirect to='/' exact/>)
    }

    render() {

        const {
            signOutCallback,
            displayName,
            channels,
            userId
        } = this.props;

        // Check each private channel to see if the user is allowed to access
        let updatedChannel = [];
        channels.forEach((channel) => {
            if (channel.type === "public") {
                updatedChannel.push({
                    name: channel.name,
                    type: channel.type
                });
            } else {
                console.log(Object.values(channel.members));
                let membersArray = Object.values(channel.members).map((member) => {
                    return member.userId;
                });

                if (membersArray.includes(userId)) {
                    updatedChannel.push({
                        name: channel.name,
                        type: channel.type
                    });
                }
            }
        });

        console.log(updatedChannel);

        return (
            <div className="channel-navigation-container">
                <UserTab displayName={displayName}/>
                <div className="channel-navigation">
                    <div className="row channel-util-container">
                        <div className="col-2 channel-padding">
                        </div>
                        <div className="col-8 channel-button-container">
                            <div className="channel-title">
                                <p>Channels</p>
                            </div>
                        </div>
                        <div className="col-2 channel-button-container">
                            <div className="channel-button">
                                <div className="plus-icon">
                                    <NavLink activeClassName='activeLink' to='/create'>
                                        <FontAwesome name="plus"/>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="channel-util-container">
                                <ul>
                                    {updatedChannel.map((channel, key) => {
                                        return (
                                            <NavLink key={key} to={'/channel/' + channel.name}>
                                                <div className="channel-util-container channel-link-container row">
                                                    <div className="col-2"></div>
                                                    <div className="channel-container col-8">
                                                    <li className="channel-link" key={key}>
                                                        {channel.type === "public" ?
                                                            <div className="channel-link-icon">
                                                                <FontAwesome name="hashtag"/>
                                                            </div>
                                                            :
                                                            <div className="channel-link-icon">
                                                                <FontAwesome name="lock"/>
                                                            </div>
                                                        } {channel.name}
                                                    </li>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )
                                    })}
                                </ul>
                    </div>
                </div>
                <div className="sign-out-container">
                    <button className="btn sign-out-button" type="button" onClick={signOutCallback}>Sign Out</button>
                 </div>
            </div>
        );
    }

}
