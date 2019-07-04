import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.min.css';

import { userService } from '../services';
import { history } from '../helpers';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        passwordConfirm: '',
        loggingIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (!this.state.username || !this.state.password) {
      alert('Must fill out username and password!');
      return;
    }

    if (this.state.password !== this.state.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      this.state.loggingIn = true;
      const user = await userService.registerUser(this.state.username, this.state.password);
      this.props.updateCurrentUser(user);
      history.push('/');
    } catch (message) {
      alert(message);
      this.props.updateCurrentUser(null);
      this.state.loggingIn = false;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleChange} />
            </fieldset>

            <button
              type="submit"
              disabled={this.state.loggingIn}>
              Sign up
            </button>

          </fieldset>
        </form>

        <p class="loginlink">
          <Link to="/login">
            Have an Account?
          </Link>
        </p>
      </div>
    );
  }
}

export { Register };
