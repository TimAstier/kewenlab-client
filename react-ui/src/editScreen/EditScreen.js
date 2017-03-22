import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../actions/flashMessages';
import { saveTextContent, saveTextContentSuccess, saveTextContentFailure,
  setLocalContent } from '../textEditor/actions';
import { refreshChars, saveChars, saveCharsSuccess, saveCharsFailure }
  from '../charsArea/actions';
import { tokenize, refreshWords, saveWords, saveWordsSuccess,
  saveWordsFailure } from '../wordsArea/actions';

import { deserializeChars, deserializeWords } from '../utils/deserializer';
import { removeDuplicates, toArrayOfUniqueChars, preTokenization,
  removeDolars } from '../utils/custom';

import Sidebar from '../sidebar/containers/Sidebar';
import TextEditor from '../textEditor/containers/TextEditor';
import CharsArea from '../charsArea/containers/CharsArea';
import WordsArea from '../wordsArea/containers/WordsArea';
import SelectMessage from '../components/common/SelectMessage';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.saveTextEditor = this.saveTextEditor.bind(this);
    this.saveCharsArea = this.saveCharsArea.bind(this);
    this.tokenizeWords = this.tokenizeWords.bind(this);
    this.saveWordsArea = this.saveWordsArea.bind(this);
    this.saveAll = this.saveAll.bind(this);
    this.onTextEditorChange = this.onTextEditorChange.bind(this);
    this.timer = null;
  }

  saveTextEditor(e) {
    // Not sure why this save method does not work as the other 2 without this
    e.preventDefault();
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      id: this.props.currentTextId,
      content: this.props.localContent
    };
    return this.props.saveTextContent(data).then(
      () => {
        this.props.saveTextContentSuccess(this.props.localContent);
      },
      () => {
        this.props.saveTextContentFailure();
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save text on the server.'
        });
      }
    );
  }

  saveCharsArea() {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newChars: this.props.localChars.filter(x => x.id === null),
      charsToDelete: this.props.charsToDelete,
      charsToUpdate: this.props.charsToUpdate
    };
    return this.props.saveChars(data).then(
      (res) => {
        this.props.saveCharsSuccess(deserializeChars(res.data.chars));
      },
      () => {
        this.props.saveCharsFailure();
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save chars on the server.'
        });
      }
    );
  }

  tokenizeWords() {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      content: preTokenization(this.props.localContent)
    };
    return this.props.tokenize(data).then(
      (res) => {
        let newLocalWords = res.data;
        newLocalWords = removeDolars(removeDuplicates(newLocalWords));
        this.props.refreshWords(newLocalWords);
        return false;
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not tokenize text from the server.'
        });
      }
    );
  }

  saveWordsArea() {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newWords: this.props.localWords.filter(x => x.id === null),
      wordsToDelete: this.props.wordsToDelete,
      wordsToUpdate: this.props.wordsToUpdate
    };
    return this.props.saveWords(data).then(
      (res) => {
        this.props.saveWordsSuccess(deserializeWords(res.data.words));
      },
      () => {
        this.props.saveWordsFailure();
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save words on the server.'
        });
      }
    );
  }

  saveAll(e) {
    this.saveTextEditor(e);
    this.saveCharsArea();
    this.tokenizeWords()
    .then(() => {
      this.saveWordsArea();
    });
  }

  onTextEditorChange(e) {
    e.persist();
    this.props.setLocalContent(e.target.value);
    this.props.refreshChars(toArrayOfUniqueChars(e.target.value));
    // The timer variable needs to be out of the function scope
    clearTimeout(this.timer);
    if ((process.env.REACT_APP_DEBUG !== 'on')) {
      // TODO: Closure to use data at Change time instead of Timeout time
      this.timer = setTimeout(() => { this.saveAll(e); }, 1500);
    }
    return this.timer;
  }

  render() {
    const { showFlashMessageWithTimeout, currentTextId } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        { currentTextId !== 0 ?
          <div>
            <TextEditor
              save={this.saveTextEditor}
              onChange={this.onTextEditorChange}
            />
            <CharsArea save={this.saveCharsArea} />
            <WordsArea
              refresh={this.tokenizeWords}
              save={this.saveWordsArea}
            />
          </div>
            :
          <SelectMessage mode="Edit"/>
        }
      </div>
    );
  }
}

MainScreen.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  localContent: React.PropTypes.string.isRequired,
  saveTextContent: React.PropTypes.func.isRequired,
  saveTextContentSuccess: React.PropTypes.func.isRequired,
  saveTextContentFailure: React.PropTypes.func.isRequired,
  setLocalContent: React.PropTypes.func.isRequired,
  localChars: React.PropTypes.array.isRequired,
  charsToDelete: React.PropTypes.array.isRequired,
  charsToUpdate: React.PropTypes.array.isRequired,
  refreshChars: React.PropTypes.func.isRequired,
  saveChars: React.PropTypes.func.isRequired,
  saveCharsSuccess: React.PropTypes.func.isRequired,
  saveCharsFailure: React.PropTypes.func.isRequired,
  tokenize: React.PropTypes.func.isRequired,
  localWords: React.PropTypes.array.isRequired,
  wordsToDelete: React.PropTypes.array.isRequired,
  wordsToUpdate: React.PropTypes.array.isRequired,
  refreshWords: React.PropTypes.func.isRequired,
  saveWords: React.PropTypes.func.isRequired,
  saveWordsSuccess: React.PropTypes.func.isRequired,
  saveWordsFailure: React.PropTypes.func.isRequired

};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    localContent: state.get('textEditor').get('localContent'),
    localChars: state.get('chars').get('localItems').toJS(),
    charsToDelete: state.get('chars').get('itemsToDelete').toJS(),
    charsToUpdate: state.get('chars').get('itemsToUpdate').toJS(),
    localWords: state.get('words').get('localItems').toJS(),
    wordsToDelete: state.get('words').get('itemsToDelete').toJS(),
    wordsToUpdate: state.get('words').get('itemsToUpdate').toJS()
  };
}

export default connect(
  mapStateToProps,
  { showFlashMessageWithTimeout,
    saveTextContent,
    saveTextContentSuccess,
    saveTextContentFailure,
    setLocalContent,
    refreshChars,
    saveChars,
    saveCharsSuccess,
    saveCharsFailure,
    tokenize,
    refreshWords,
    saveWords,
    saveWordsSuccess,
    saveWordsFailure,
  }
)(MainScreen);
