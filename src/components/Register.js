import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/Register.min.css';

import { userService } from '../services';
import { history } from '../helpers';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        email: '',
        passwordConfirm: '',
        loggingIn: false,
        errors: [],
    };

    this.usernameInput = React.createRef();
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.passwordConfirmInput = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = this.validate();
    if (errors.length) {
      this.setState({errors: errors});
      return;
    }

    try {
      this.state.loggingIn = true;
      await userService.registerUser(
        this.state.username,
        this.state.email,
        this.state.password);
      history.push('/');
    } catch (message) {
      alert(message);
      this.state.loggingIn = false;
    }
  }

  validate() {
    const errors = [];

    if (!this.state.username) {
      errors.push("Username can't be empty.");
    }

    if (!this.state.password) {
      errors.push("Password can't be empty.");
    }

    if (!this.state.email) {
      errors.push("Email can't be empty.");
    }

    if (this.state.password !== this.state.passwordConfirm) {
      errors.push("Passwords must match.");
    }

    return errors;
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      loggingIn,
      errors,
    } = this.state;

    return (
      <div className="comp_register row justify-content-center">
        <div className="register_wrapper col-6">

          <form onSubmit={this.handleSubmit}>
            <fieldset>

              <fieldset>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  ref={this.usernameInput}
                  onChange={this.handleChange} />
              </fieldset>

              <fieldset>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  ref={this.emailInput}
                  onChange={this.handleChange} />
              </fieldset>

              <fieldset>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  ref={this.passwordInput}
                  onChange={this.handleChange} />
              </fieldset>

              <fieldset>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  ref={this.passwordConfirmInput}
                  onChange={this.handleChange} />
              </fieldset>

              <button
                type="submit"
                disabled={loggingIn}>
                Sign up
              </button>

              {errors.map(error => (
                <p className="error_message" key={error}>{error}</p>
              ))}

            </fieldset>
          </form>

          <p className="loginlink">
            <Link to="/login">
              Have an Account?
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export { Register };
