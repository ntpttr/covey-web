import React from 'react';
import { Route, Router } from 'react-router-dom';

import { Account, Header, Home, Login, Register, PrivateRoute } from '../components';
import { history } from '../helpers';

class App extends React.Component {
  constructor(props) {
    super(props);

    var currentUser;

    try {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      currentUser = null;
    }
    
    this.state = {
      appName: 'Covey',
      currentUser: currentUser
    }

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(user) {
    this.setState({
      currentUser: user,
    });
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header
              appName={this.state.appName}
              currentUser={this.state.currentUser}
            />
            <PrivateRoute
              exact path="/"
              component={() =>
                <Home
                  currentUser = {this.state.currentUser}
                  updateCurrentUser = {this.updateCurrentUser}
                />
              }
            />
            <PrivateRoute
              path="/account"
              component={() => <Account updateCurrentUser = {this.updateCurrentUser} />}
            />
            <Route
              path="/login"
              component={() => <Login updateCurrentUser = {this.updateCurrentUser} />}
            />
            <Route
              path="/register"
              component={() => <Register updateCurrentUser = {this.updateCurrentUser} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export { App }; 
