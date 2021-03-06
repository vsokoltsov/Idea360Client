import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './App.scss';

import { getToken } from './utils/token';
import { currentUser } from './actions/authorization';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      replace: PropTypes.func,
    }),
    onCurrentUser: PropTypes.func,
  };

  static defaultProps = {
    history: {
      replace: () => {},
    },
    children: [],
    onCurrentUser: () => {},
  };

  componentDidMount() {
    const token = getToken();

    if (token) {
      this.props.onCurrentUser();
    } else {
      this.props.history.replace('/auth/sign-in');
    }
  }

  render() {
    return (
      <div className={classes.App}>
        {this.props.children}
      </div>
    );
  }
}

/**
 * Mapping dispatched functions to component's properties
 * @param  {Object} dispatch Application dispatch function
 * @return {Object} Mapped functions
 */
const mapDispatchToProps = dispatch => ({
  onCurrentUser: () => dispatch(currentUser()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
