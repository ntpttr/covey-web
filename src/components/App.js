import React from 'react';
import { Route, Router } from 'react-router-dom';

import { Account, Header, Home, Login, Register, PrivateRoute } from '../components';
import { history } from '../helpers';

class App extends React.Component {
  constructor(props) {
    super(props);

    var loggedIn = localStorage.getItem('currentUser');
    
    this.state = {
      appName: 'Covey',
      loggedIn: loggedIn,
    }

    this.updateLoginState = this.updateLoginState.bind(this);
  }

  updateLoginState(login) {
    this.setState({
      loggedIn: login,
    });
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header 
              appName={this.state.appName}
              loggedIn={this.state.loggedIn}
            />
            <PrivateRoute
              exact path="/"
              component={() => <Home updateLoginState={this.updateLoginState} />}
            />
            <PrivateRoute
              path="/account"
              component={() => <Account />}
            />
            <Route
              path="/login"
              component={() => <Login updateLoginState={this.updateLoginState} />}
            />
            <Route
              path="/register"
              component={() => <Register updateLoginState={this.updateLoginState} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export { App }; 
