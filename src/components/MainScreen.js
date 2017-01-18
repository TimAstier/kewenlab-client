import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import TextEditor from './TextEditor';
import { addFlashMessage } from '../actions/flashMessages';

class MainScreen extends React.Component {
  render() {
    const { addFlashMessage } = this.props;
    return (
      <div id="main-screen">
        <Sidebar addFlashMessage={addFlashMessage} />
        <TextEditor />
      </div>
    );
  }
}

MainScreen.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage })(MainScreen);
