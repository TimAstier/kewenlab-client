import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import './NavigationBar.css';
import logo from '../logo.png';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Menu.Menu position="right" className="main-menu-link">
        <a href="http://app.forestadmin.com/6907"
          className="item"
          target='_blank'>
          Open Admin
        </a>
        <a href="#"
          onClick={this.logout.bind(this)}
          className="item">
          Logout
        </a>
      </Menu.Menu>
    );

    const guestLinks = (
      <Menu.Menu position="right" className="main-menu-link">
        <Link to="/signup" className="item color">Signup</Link>
        <Link to="/login" className="item">Login</Link>
      </Menu.Menu>
    );

    // TODO: Add a self-hosted logo
    return (
    <Menu fixed="top">
      <Menu.Item>
        <img
          className="logo"
          src={logo}
          alt="Kewen-lab logo"
        />
      </Menu.Item>
      <Link
        to={ isAuthenticated ? '/edit' : '/' }
        className="item header main-menu-header"
      >
        Kewen Lab
      </Link>
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
