import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (username, password) => {
    const payload = agent.Auth.register(username, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const username = this.props.username;
    const password = this.props.password;

    return (
      <div className="auth-page">
        <p>
          <Link to="/login">
            Have an account?
          </Link>
        </p>

        <form onSubmit={this.submitForm(username, password)}>
          <fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Username"
                value={this.props.username}
                onChange={this.changeUsername} />
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                value={this.props.password}
                onChange={this.changePassword} />
            </fieldset>

            <button
              type="submit"
              disabled={this.props.inProgress}>
              Sign up
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);