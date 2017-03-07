import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../actions/flashMessages';
import { saveTextContent, setCurrentContent,
  setLocalContent } from '../textEditor/actions';
import { saveChars, setCurrentChars, setLocalChars,
  clearCharsToDelete, clearCharsToUpdate, addNewLocalChars,
  removeDeletedLocalChars, updateCharsOrder } from '../charsArea/actions';
import { tokenize, removeDeletedLocalWords, addNewLocalWords,
  updateWordsOrder, setCurrentWords, setLocalWords, saveWords,
  clearWordsToDelete, clearWordsToUpdate } from '../wordsArea/actions';

import { deserializeChars, deserializeWords } from '../utils/deserializer';
import { toChineseOnly, removeDuplicates,
  toArrayOfUniqueChars } from '../utils/custom';
import isEmpty from 'lodash/isEmpty';
import DEBUG from '../config/debug';

import Sidebar from '../sidebar/containers/Sidebar';
import TextEditor from '../textEditor/containers/TextEditor';
import CharsArea from '../charsArea/containers/CharsArea';
import WordsArea from '../wordsArea/containers/WordsArea';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.saveTextEditor = this.saveTextEditor.bind(this);
    this.saveCharsArea = this.saveCharsArea.bind(this);
    this.refreshWords = this.refreshWords.bind(this);
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
        this.props.setCurrentContent(this.props.localContent);
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save text on the server.'
        });
      }
    );
  }

  refreshChars(charsArray) {
    this.props.removeDeletedLocalChars(charsArray);
    if (!isEmpty(charsArray)) {
      this.props.addNewLocalChars(charsArray);
      this.props.updateCharsOrder(charsArray);
    }
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
        this.props.setCurrentChars(deserializeChars(res.data.chars));
        this.props.setLocalChars(deserializeChars(res.data.chars));
        this.props.clearCharsToDelete();
        this.props.clearCharsToUpdate();
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save chars on the server.'
        });
      }
    );
  }

  refreshWords() {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      content: toChineseOnly(this.props.localContent)
    };
    return this.props.tokenize(data).then(
      (res) => {
        let newLocalWords = res.data;
        newLocalWords = removeDuplicates(newLocalWords);
        this.props.removeDeletedLocalWords(newLocalWords);
        if (!isEmpty(newLocalWords)) {
          this.props.addNewLocalWords(newLocalWords);
          return this.props.updateWordsOrder(newLocalWords);
        }
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
        this.props.setCurrentWords(deserializeWords(res.data.words));
        this.props.setLocalWords(deserializeWords(res.data.words));
        this.props.clearWordsToDelete();
        this.props.clearWordsToUpdate();
      },
      () => {
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
    this.refreshWords()
    .then(() => {
      this.saveWordsArea();
    });
  }

  onTextEditorChange(e) {
    e.persist();
    this.props.setLocalContent(e.target.value);
    this.refreshChars(toArrayOfUniqueChars(e.target.value));
    // The timer variable needs to be out of the function scope
    clearTimeout(this.timer);
    if (!DEBUG) {
      this.timer = setTimeout(() => { this.saveAll(e); }, 1500);
    }
    return this.timer;
  }

  render() {
    const { showFlashMessageWithTimeout } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        <TextEditor
          save={this.saveTextEditor}
          onChange={this.onTextEditorChange}
        />
        <CharsArea save={this.saveCharsArea} />
        <WordsArea
          refresh={this.refreshWords}
          save={this.saveWordsArea}
        />
      </div>
    );
  }
}

MainScreen.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  localContent: React.PropTypes.string.isRequired,
  saveTextContent: React.PropTypes.func.isRequired,
  setCurrentContent: React.PropTypes.func.isRequired,
  setLocalContent: React.PropTypes.func.isRequired,
  localChars: React.PropTypes.array.isRequired,
  charsToDelete: React.PropTypes.array.isRequired,
  charsToUpdate: React.PropTypes.array.isRequired,
  saveChars: React.PropTypes.func.isRequired,
  setCurrentChars: React.PropTypes.func.isRequired,
  setLocalChars: React.PropTypes.func.isRequired,
  clearCharsToDelete: React.PropTypes.func.isRequired,
  clearCharsToUpdate: React.PropTypes.func.isRequired,
  addNewLocalChars: React.PropTypes.func.isRequired,
  removeDeletedLocalChars: React.PropTypes.func.isRequired,
  updateCharsOrder: React.PropTypes.func.isRequired,
  tokenize: React.PropTypes.func.isRequired,
  removeDeletedLocalWords: React.PropTypes.func.isRequired,
  addNewLocalWords: React.PropTypes.func.isRequired,
  updateWordsOrder: React.PropTypes.func.isRequired,
  localWords: React.PropTypes.array.isRequired,
  wordsToDelete: React.PropTypes.array.isRequired,
  wordsToUpdate: React.PropTypes.array.isRequired,
  saveWords: React.PropTypes.func.isRequired,
  setLocalWords: React.PropTypes.func.isRequired,
  setCurrentWords: React.PropTypes.func.isRequired,
  clearWordsToDelete: React.PropTypes.func.isRequired,
  clearWordsToUpdate: React.PropTypes.func.isRequired
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
    setCurrentContent,
    setLocalContent,
    saveChars,
    setCurrentChars,
    setLocalChars,
    clearCharsToDelete,
    clearCharsToUpdate,
    addNewLocalChars,
    removeDeletedLocalChars,
    updateCharsOrder,
    tokenize,
    removeDeletedLocalWords,
    addNewLocalWords,
    updateWordsOrder,
    saveWords,
    setLocalWords,
    setCurrentWords,
    clearWordsToDelete,
    clearWordsToUpdate
  }
)(MainScreen);
