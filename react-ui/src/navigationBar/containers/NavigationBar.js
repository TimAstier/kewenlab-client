import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import '../NavigationBar.css';
import logo from '../../logo.png';
import AppMenu from '../components/AppMenu';
import { setAppScreenMode } from '../../mainScreen/actions';

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  setAppScreenModeToEdit() {
    this.props.setAppScreenMode('edit');
  }

  setAppScreenModeToSuggestion() {
    this.props.setAppScreenMode('suggestion');
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <Menu.Menu position="right" className="main-menu-link">
        <a href={process.env.REACT_APP_ADMIN_URL}
          className="item"
          target="_blank">
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
        to={ isAuthenticated ? '/app' : '/' }
        className="item header main-menu-header"
      >
        Kewen Lab
      </Link>
      { isAuthenticated &&
        <AppMenu
          mode={this.props.mode}
          setAppScreenModeToEdit={this.setAppScreenModeToEdit.bind(this)}
          setAppScreenModeToSuggestion={this.setAppScreenModeToSuggestion.bind(this)}
        />
      }
      { isAuthenticated ? userLinks : guestLinks }
    </Menu>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired,
  mode: React.PropTypes.string.isRequired,
  setAppScreenMode: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.get('auth').toJS()
  };
}

// { logout } is a mapDispatchToProps shortcut
export default connect(
  mapStateToProps,
  { logout, setAppScreenMode }
)(NavigationBar);
