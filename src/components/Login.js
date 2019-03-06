import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../services';
import { history } from '../helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        loggingIn: false,
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

    if (!this.state.username || !this.state.password) {
      alert('Must fill out username and password!');
      return;
    }

    try {
      this.state.loggingIn = true;
      const user = await userService.login(this.state.username, this.state.password);
      this.props.updateCurrentUser(user);
      history.push('/');
    } catch (e) {
      alert(e.message);
      this.state.loggingIn = false;
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <p>
          <Link to="/register">
            New User?
          </Link>
        </p>

        <form onSubmit={this.handleSubmit}>
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
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange} />
            </fieldset>

            <button
              type="submit"
              disabled={this.state.loggingIn}>
              Sign in
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

export { Login };
