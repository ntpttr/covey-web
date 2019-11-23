import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/Login.min.css';

import { userService } from '../services';
import { history } from '../helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        identifier: '',
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

  handleSubmit = async (event) => {
    event.preventDefault();

    const { identifier, password } = this.state;

    if (!identifier || !password) {
      alert('Must fill out username/email and password!');
      return;
    }

    this.setState({
      identifier: '',
      password: '',
    });

    try {
      this.state.loggingIn = true;
      const user = await userService.login(identifier, password);
      this.props.updateCurrentUser(user);
      history.push('/');
    } catch (message) {
      alert(message);
      this.state.loggingIn = false;
    }
  }

  render() {
    const { identifier, password } = this.state;
    return (
      <div className="comp_login row justify-content-center">
        <div className="login_wrapper col-6">

            <form onSubmit={this.handleSubmit}>
              <fieldset>

                <fieldset>
                  <input
                    type="text"
                    placeholder="Username or Email"
                    name="identifier"
                    value={identifier}
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
                  className="btn-default"
                  disabled={this.state.loggingIn}>
                  Sign in
                </button>

              </fieldset>
            </form>

            <p className="registerlink">
              <Link to="/register">
                New User?
              </Link>
            </p>
          </div>
        </div>
    );
  }
}

export { Login };
