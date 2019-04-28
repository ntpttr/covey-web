import React from 'react';

import { history } from '../helpers';
import { userService } from '../services';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        passwordConfirm: '',
        isLoading: false,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitUsername = async event => {
    event.preventDefault();

    try {
      this.state.isLoading = true;
      const user = await userService.updateUser('username', this.state.username);
      this.props.updateCurrentUser(user);
    } catch (message) {
      alert(message);
      this.state.isLoading = false;
    }
  }

  handleSubmitPassword = async event => {
    event.preventDefault();

    try {
      this.state.isLoading = true;
      const user = await userService.updateUser('password', this.state.password);
      this.props.updateCurrentUser(user);
    } catch (message) {
      alert(message);
      this.state.isLoading = false;
    }
  }

  handleDeleteAccount = async () => {
    try{
      this.state.isLoading = true;
      await userService.deleteUser();
      this.props.updateCurrentUser(null);
      history.push('/');
    } catch (message) {
      alert(message);
      this.state.isLoading = false;
    }
  }

  render() {
    const { username, password, passwordConfirm } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmitUsername}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={this.handleFormChange} />
            </fieldset>

            <button
              type="submit">
              Update Username
            </button>

          </fieldset>
        </form>

        <form onSubmit={this.handleSubmitPassword}>
          <fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleFormChange} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.handleFormChange} />
            </fieldset>

            <button
              type="submit">
              Update Password
            </button>

          </fieldset>
        </form>

        <button
          onClick={this.handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    );
  }
}

export { Account }; 
