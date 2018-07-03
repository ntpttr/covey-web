import Login from '../components/login';
import Register from '../components/register';

import React from 'react';
import Link from 'next/link';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            registerDisplay: false,
        }

        this.updateLogin = this.updateLogin.bind(this);
        this.displayRegister = this.displayRegister.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderHome = this.renderHome.bind(this);
    }

    updateLogin(loggedIn) {
        this.setState({
            loggedIn: loggedIn,
        });
    }

    displayRegister(display) {
        this.setState({
            registerDisplay: display,
        });
    }

    renderLogin() {
        if (!this.state.registerDisplay) {
            return (
                <div>
                    <Login updateLogin={this.updateLogin}/>
                    <button type='button' onClick={() => this.displayRegister(true)}>
                        New User?
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <Register updateLogin={this.updateLogin}/>
                    <button type='button' onClick={() => this.displayRegister(false)}>
                        Back
                    </button>
                </div>
            )
        }
    }

    renderHome() {
        return (
            <div>HOME PAGE</div>
        )
    }

    render() {
        if (this.state.loggedIn) {
            return this.renderHome();
        } else {
            return this.renderLogin();
        }
    }
}
