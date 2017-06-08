import React from 'react';
import { LoginForm } from '../';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row" id="main-screen">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
