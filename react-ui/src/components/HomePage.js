import React from 'react';
import { Message, Image } from 'semantic-ui-react';
import logo from '../logo.png';

class HomePage extends React.Component {
  render() {
    return (
      <div id="home-screen">
        <Message
          size="massive"
          className="center"
          id="greetings"
        >
          Welcome to kewen-lab
        </Message>
        <Image
          src={logo}
          alt="kewen-lab"
          shape="circular"
          centered
        />
      </div>
    );
  }
}

export default HomePage;
