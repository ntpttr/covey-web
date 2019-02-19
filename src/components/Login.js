import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

const mapStateToProps = (state) => ({
  ...state.user
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
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

            <button type="submit">
              Sign in
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
