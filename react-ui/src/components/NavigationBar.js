import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
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
        to={ isAuthenticated ? '/edit' : '/' }
        className="item header main-menu-header"
      >
        Kewen Lab
      </Link>
      { isAuthenticated &&
        <Menu.Menu className="main-menu-link">
          <Link to="/edit" className="item color" activeClassName="active">
            <Icon name='pencil' />
          </Link>
          <Link to="/suggestion" className="item color" activeClassName="active">
            <Icon name='idea' />
          </Link>
        </Menu.Menu>
      }
      { isAuthenticated ? userLinks : guestLinks }
    </Menu>
    );
  }
}

NavigationBar.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.get('auth').toJS()
  };
}

// { logout } is a mapDispatchToProps shortcut
export default connect(mapStateToProps, { logout })(NavigationBar);
