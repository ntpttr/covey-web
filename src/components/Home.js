import React from 'react';
import {connect} from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from '../constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({type: HOME_PAGE_LOADED}),
  onUnload: () =>
    dispatch({type: HOME_PAGE_UNLOADED})
});

class Home extends React.Component {
  componentWillMount() {
    this.props.onLoad();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);