import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;
  return {
    user
  };
};

class Home extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>You logged in with {user.username}!</h1>
        <p>
          <Link to='/login'>Logout</Link>
        </p>
      </div>
    );
  }
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home }; 