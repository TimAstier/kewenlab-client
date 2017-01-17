import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Menu.Menu position="right">
        <a href="#" onClick={this.logout.bind(this)} className="item">Logout</a>
      </Menu.Menu>
    );

    const guestLinks = (
      <Menu.Menu position="right">
        <Link to="/signup" className="item">Signup</Link>
        <Link to="/login" className="item">Login</Link>
      </Menu.Menu>
    );

    return (
    <Menu fixed="top" className="main-menu">
      <Link to="/" className="item header">Kewen-lab</Link>
      { isAuthenticated ? userLinks : guestLinks }
    </Menu>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

// { logout } is a mapDispatchToProps shortcut
export default connect(mapStateToProps, { logout })(NavigationBar);
