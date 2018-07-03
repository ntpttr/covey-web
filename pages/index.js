import Login from '../components/login';

import React from 'react';
import Link from 'next/link';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }

        this.updateLogin = this.updateLogin.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.renderHome = this.renderHome.bind(this);
    }

    updateLogin(loggedIn) {
        this.setState({
            loggedIn: loggedIn,
        });
    }

    renderLogin() {
        return (
            <div>
                <Login updateLogin={this.updateLogin}/>
                <ul>
                    <li><Link href='/register'><a>Register</a></Link></li>
                </ul>
            </div>
        )
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
