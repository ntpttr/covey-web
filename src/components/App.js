import React from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import { Account, Header, Home, Login, Register, PrivateRoute } from '../components';
import { history } from '../helpers';

function mapStateToProps(state) {
  const { user, common } = state;
  const { currentUser } = user;
  const { appName } = common;
  return {
    appName,
    currentUser
  };
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header
              appName={this.props.appName}
              currentUser={this.props.currentUser} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      </div>
    );
  }
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
