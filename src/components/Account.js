import React from 'react';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitUsername = async event => {
    event.preventDefault();

    try {
      this.state.isLoading = true;
      const user = await userService.update('username', this.state.username);
      this.props.updateCurrentUser(user);
    } catch (e) {
      alert(e.message);
      this.state.isLoading = false;
    }
  }

  handleSubmitPassword = async event => {
    event.preventDefault();

    try {
      this.state.isLoading = true;
      const user = await userService.update('password', this.state.password);
      this.props.updateCurrentUser(user);
    } catch (e) {
      alert(e.message);
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
                onChange={this.handleChange} />
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
                onChange={this.handleChange} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={this.handleChange} />
            </fieldset>

            <button
              type="submit">
              Update Password
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

export { Account }; 
