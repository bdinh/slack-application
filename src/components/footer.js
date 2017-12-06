import React, { Component } from 'react';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container footer">
                    <p>This Messaging Application closely resembles that of <span className="slack-style"><a href={"https://slack.com/"}>Slack</a></span> purely for design
                        and implementation practice. </p>
                    <p className="footer-text">Made with &hearts; by <span className="bao-link-style"><a href="https://info343b-a17.github.io/promo-bdinh/">Bao Dinh</a></span></p>
                </div>
            </footer>
        );
    }
}