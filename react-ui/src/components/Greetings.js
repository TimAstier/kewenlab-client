import React from 'react';
import { Message } from 'semantic-ui-react';

class Greetings extends React.Component {
  render() {
    return (
      <div>
        <Message size="massive" className="center">Welcome to Kewen-lab</Message>
      </div>
    );
  }
}

export default Greetings;