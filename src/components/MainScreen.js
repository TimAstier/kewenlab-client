import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../actions/flashMessages';

import Sidebar from '../sidebar/containers/Sidebar';
import TextEditor from '../textEditor/containers/TextEditor';
import CharsArea from '../charsArea/containers/CharsArea';
import WordsArea from '../wordsArea/containers/WordsArea';

class MainScreen extends React.Component {
  render() {
    const { showFlashMessageWithTimeout } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        <TextEditor />
        <CharsArea />
        <WordsArea />
      </div>
    );
  }
}

MainScreen.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired
};

export default connect(null, { showFlashMessageWithTimeout })(MainScreen);
