import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth';
import './NavigationBar.css';
import logo from '../../logo.png';
import { AppMenu } from '../../components';
import { setMode } from '../../redux/mode';

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  setAppScreenModeToEdit() {
    this.props.setMode('edit');
  }

  setAppScreenModeToSuggestion() {
    this.props.setMode('suggestion');
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
      { isAuthenticated && this.props.pathname === '/app' &&
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
  setMode: React.PropTypes.func.isRequired,
  pathname: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.get('auth').toJS()
  };
}

// { logout } is a mapDispatchToProps shortcut
export default connect(
  mapStateToProps,
  { logout, setMode }
)(NavigationBar);
