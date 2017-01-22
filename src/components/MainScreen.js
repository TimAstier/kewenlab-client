import React from 'react';
import { connect } from 'react-redux';
import sidebar from '../sidebar';
import texteditor from '../textEditor';
import CharsArea from '../charsArea/containers/CharsArea';
import WordsArea from '../wordsArea/containers/WordsArea';
import { addFlashMessage } from '../actions/flashMessages';

const TextEditor = texteditor.components.TextEditor;
const Sidebar = sidebar.components.Sidebar;

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
