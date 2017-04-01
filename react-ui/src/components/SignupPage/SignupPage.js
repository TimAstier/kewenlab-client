import React from 'react';
import { connect } from 'react-redux';
import { SignupForm } from '../.';
import { userSignupRequest, isUserExists } from '../../redux/signup';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';

class SignupPage extends React.Component {
  render() {
    const { userSignupRequest, showFlashMessageWithTimeout,
      isUserExists } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignupForm
            isUserExists={isUserExists}
            userSignupRequest={userSignupRequest}
            showFlashMessageWithTimeout={showFlashMessageWithTimeout}
          />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

export default connect(
  null,
  { userSignupRequest, showFlashMessageWithTimeout, isUserExists }
)(SignupPage);
