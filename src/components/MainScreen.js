import React from 'react';
import { connect } from 'react-redux';

import { addFlashMessage } from '../actions/flashMessages';

import Sidebar from '../sidebar/containers/Sidebar';
import TextEditor from '../textEditor/containers/TextEditor';
import CharsArea from '../charsArea/containers/CharsArea';
import WordsArea from '../wordsArea/containers/WordsArea';

class MainScreen extends React.Component {
  render() {
    const { addFlashMessage } = this.props;
    // TODO: Re-Adds Words Area
    return (
      <div id="main-screen">
        <Sidebar addFlashMessage={addFlashMessage} />
        <TextEditor />
        <CharsArea />
        <WordsArea />
      </div>
    );
  }
}

MainScreen.propTypes = {
  addFlashMessage: React.PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage })(MainScreen);
