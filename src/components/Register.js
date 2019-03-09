import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../services';
import { history } from '../helpers';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        passwordConfirm: '',
        isLoading: false,
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

    if (this.state.password != this.state.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    try {
      this.state.isLoading = true;
      const user = await userService.registerUser(this.state.username, this.state.password);
      this.props.updateCurrentUser(user);
      history.push('/');
    } catch (e) {
      alert(e.message);
      this.state.isLoading = false;
    }
  }

  render() {
    return (
      <div>
        <p>
          <Link to="/login">
            Have an Account?
          </Link>
        </p>

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
      </div>
    );
  }
}

export { Register }; 