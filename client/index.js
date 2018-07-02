import React from 'react';
import ReactDom from 'react-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    registerUser() {

        if ($('#username').val().trim().length === 0 || $('#password').val().trim().length === 0) {
            return;
        }

        var username = $('#username').val();
        var password = $('#password').val();

        $.post('users', {'username': username, 'password': password}, function(res) {
            //TODO Do stuff in the window instead of just console logging!
            if (res.status == false) {
                console.log(res.message);
            } else {
                this.state.loggedIn = true;
                console.log('Registered user!');
            }
        });
    }

    login() {

        var username = $('#username').val();
        var password = $('#password').val();

        $.post('users/login', {'username': username, 'password': password}, function(res) {
            //TODO Do stuff in the window instead of just console logging!
            if (res.err) {
                console.log('Error: ' + res.err);
            } else if (res.status) {
                console.log('Login successful!');
                this.state.loggedIn = true;
            } else {
                this.state.loggedIn = false;
                if (res.foundUser) {
                    console.log('Incorrect password for user ' + username);
                } else {
                    console.log('User ' + username + ' not found!');
                }
            }
        });
    }

    render() {
        return (
            <div class='loginDiv'>
                <input type='text' id='username' placeholder='username'>
                <input type='password' id='password' placeholder='password'>
                <button onclick='this.registerUser();'><span>Register</span></button>
                <button onclick='this.login();'><span>Login</span></button>
            </div>
            <div>
                 { this.state.loggedIn ? <span>Logged In!</span> : null }
            </div>
        )
    }

}

ReactDom.render(
    <Login />,
    document.getElementById('root')
);
