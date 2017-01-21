import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import texteditor from '../textEditor';
import CharsArea from './CharsArea';
import WordsArea from './WordsArea';
import { addFlashMessage } from '../actions/flashMessages';

const TextEditor = texteditor.components.textEditor;

class MainScreen extends React.Component {
  render() {
    const { addFlashMessage } = this.props;
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
