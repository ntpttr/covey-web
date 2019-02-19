import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../actions';

const mapStateToProps = (state) => ({
  ...state.user
});

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        passwordConfirm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitUsername(e) {
    e.preventDefault();

    const { username } = this.state;
    const { dispatch } = this.props;
    if (username) {
      dispatch(userActions.update('username', username));
    }
  }

  handleSubmitPassword(e) {
    e.preventDefault();

    const { password, passwordConfirm } = this.state;
    const { dispatch } = this.props;
    if (password && passwordConfirm) {
      dispatch(userActions.update('password', password));
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

const connectedAccount = connect(mapStateToProps)(Account);
export { connectedAccount as Account }; 
