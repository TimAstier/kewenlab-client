import React from 'react';
import { connect } from 'react-redux';
import { showFlashMessageWithTimeout } from '../actions/flashMessages';

// Example of High Order Component

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'You need to login to access this page.'
        });
        this.props.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    showFlashMessageWithTimeout: React.PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.get('auth').get('isAuthenticated')
    }
  }

  return connect(mapStateToProps,
    { showFlashMessageWithTimeout }
  )(Authenticate);
}
