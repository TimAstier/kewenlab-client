import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Message, Image, Button } from 'semantic-ui-react';
import logo from '../../logo.png';

class HomePage extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div id="home-screen">
        <Message
          size="massive"
          className="center"
          id="greetings"
        >
          Welcome to kewen-lab
        </Message>
        {isAuthenticated ?
          <Link to="/app" className="item color">
            <Image
              src={logo}
              alt="kewen-lab"
              shape="circular"
              centered
            />
            <Button size="massive" id="get-started-btn" primary>Enter the app</Button>
          </Link>
          :
          <Image
            src={logo}
            alt="kewen-lab"
            shape="circular"
            centered
          />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.get('auth').toJS()
  };
}

export default connect(mapStateToProps)(HomePage);
