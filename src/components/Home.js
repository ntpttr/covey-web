import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

function mapStateToProps(state) {
  const { user } = state;
  const { currentUser } = user;
  return {
    currentUser
  };
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h1>You logged in with {currentUser.username}!</h1>
        <p>
          <Link to='/login' onClick={this.handleLogout}>Logout</Link>
        </p>
      </div>
    );
  }
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home }; 