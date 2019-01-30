import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const username = this.props.username;
    const password = this.props.password;
    return (
      <div>
        <p>
          <Link to="/register">
            New User?
          </Link>
        </p>

        <form onSubmit={this.submitForm(username, password)}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={this.changeUsername} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.changePassword} />
            </fieldset>

            <button
              type="submit"
              disabled={this.props.inProgress}>
              Sign in
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);