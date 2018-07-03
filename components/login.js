import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
        }

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.login = this.login.bind(this);
    }

    updateUsername(event) {
        this.setState({username: event.target.value});
    }

    updatePassword(event) {
        this.setState({password: event.target.value});
    }

    login() {
        var username = this.state.username;
        var password = this.state.password;
        var data = {
            'username': username,
            'password': password
        }

        fetch('/users/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json();
        }).then((data) => {
            if (data.err) {
                console.log('Error: ' + data.err);
            } else if (data.status) {
                console.log('Login successful!');
                this.state.loggedIn = true;
            } else {
                this.state.loggedIn = false;
                if (data.foundUser) {
                    console.log('Incorrect password for user ' + username);
                } else {
                    console.log('User ' + username + ' not found!');
                }
            }
        });
    }

    render() {
        return (
            <div>
                <div className='loginDiv'>
                    <input type='text' value={this.state.username} onChange={this.updateUsername} placeholder='username'/>
                    <input type='password' value={this.state.password} onChange={this.updatePassword} placeholder='password'/>
                    <button onClick={this.login}><span>Login</span></button>
                </div>
            </div>
        )
    }

}
