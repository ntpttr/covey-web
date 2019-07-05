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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    //const errors = this.validate();
    //console.log(errors);
    //if (errors.length) {
    //  this.state.errors = errors;
    //  return;
    //}

    try {
      this.state.loggingIn = true;
      const message = await userService.registerUser(
        this.state.username,
        this.state.email,
        this.state.password);
      alert(message);
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
    console.log(errors);
    return errors;
  }

  render() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      loggingIn,
    } = this.state;
    return (
      <div className="comp_register row justify-content-center">
        <div className="register_wrapper">
          <form onSubmit={this.handleSubmit}>
            {this.state.errors.map(error => (
              <p key={error}>{error}</p>
            ))}
            <fieldset>

              <fieldset>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={this.handleChange} />
              </fieldset>

              <fieldset>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange} />
              </fieldset>

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
                type="submit"
                disabled={loggingIn}>
                Sign up
              </button>

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
