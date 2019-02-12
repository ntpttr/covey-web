import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

function mapStateToProps(state) {
  const loggingIn = state.auth.loggingIn;
  return {
      loggingIn
  };
}

class Register extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

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
        dispatch(userActions.register(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password } = this.state;
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
              disabled={loggingIn}>
              Sign up
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

const connectedRegister = connect(mapStateToProps)(Register);
export { connectedRegister as Register }; 