import React from 'react';

import { logout } from '../helpers';
import { userService } from '../services';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        isLoading: false,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {name, email, password, passwordConfirm} = this.state;

    let body = {};

    if (name.length > 0) {
      body['name'] = name;
    }

    if (email.length > 0) {
      body['email'] = email;
    }

    if (password.length > 0 && password === passwordConfirm) {
      body['password'] = password;
    }

    try {
      this.state.isLoading = true;
      const user = await userService.updateUser(body);
      this.setState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
      this.props.updateCurrentUser(user);
      alert('Your profile has been updated.');
    } catch (message) {
      alert(message);
      this.state.isLoading = false;
    }
  }

  handleDeleteAccount = async () => {
    try{
      this.state.isLoading = true;
      await userService.deleteUser();
      alert('Account deleted');
      logout();
      this.props.updateCurrentUser(null);
    } catch (message) {
      alert(message);
      this.state.isLoading = false;
    }
  }

  render() {
    const { name, email, password, passwordConfirm } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleFormChange} />
            </fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleFormChange} />
            </fieldset>

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
              Update
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
