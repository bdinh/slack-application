import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/font-awesome/css/font-awesome.css';
import UserTab from '../components/userTab';
import { NavLink } from 'react-router-dom';
import 'firebase/auth';

// Component that contains the navigation bar of the application where
// the user can navigate between channels
export default class NavigationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: []
        }
    }

    render() {

        const {
            signOutCallback,
            displayName,
            channels,
            userId
        } = this.props;

        let updatedChannel = [];
        channels.forEach((channel) => {
            if (channel.type === "public") {
                updatedChannel.push({
                    name: channel.name,
                    type: channel.type
                });
            } else {
                let membersArray = Object.values(channel.invited).map((member) => {
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
                                            <NavLink key={key} to={'/channels/' + channel.name}>
                                                <div className="channel-util-container channel-link-container row">
                                                    <div className="col-2"/>
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
