import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { saveTextContent, saveTextContentSuccess, saveTextContentFailure,
  setLocalContent } from '../../redux/textEditor';
import { refreshChars, saveChars, saveCharsSuccess, saveCharsFailure,
  refreshWords, saveWords, saveWordsSuccess, saveWordsFailure }
  from '../../redux/items';
import { deserializeChars, deserializeWords } from '../../utils/deserializer';
import { toArrayOfUniqueChars } from '../../utils/custom';
import { TextEditor, CharsArea, WordsArea } from '../';
import { SelectMessage } from '../../components';
import { tokenizeWords } from './operations';

class EditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.saveTextEditor = this.saveTextEditor.bind(this);
    this.saveCharsArea = this.saveCharsArea.bind(this);
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
      charsToUpdate: this.props.charsToUpdate,
      projectId: this.props.currentProjectId
    };
    return this.props.saveChars(data).then(
      (res) => {
        this.props.saveCharsSuccess(deserializeChars(res.data));
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

  saveWordsArea() {
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newWords: this.props.localWords.filter(x => x.id === null),
      wordsToDelete: this.props.wordsToDelete,
      wordsToUpdate: this.props.wordsToUpdate,
      projectId: this.props.currentProjectId
    };
    return this.props.saveWords(data).then(
      (res) => {
        this.props.saveWordsSuccess(deserializeWords(res.data));
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
    tokenizeWords(this.props.localContent)
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
    const { currentTextId } = this.props;
    return (
      <div id="edit-screen">
        { currentTextId !== 0 ?
          <div>
            <TextEditor
              save={this.saveTextEditor}
              onChange={this.onTextEditorChange}
            />
            <CharsArea save={this.saveCharsArea} />
            <WordsArea
              refresh={this.props.tokenizeWords}
              save={this.saveWordsArea}
              localContent={this.props.localContent}
            />
          </div>
            :
          <SelectMessage mode="Edit"/>
        }
      </div>
    );
  }
}

EditScreen.propTypes = {
  showFlashMessageWithTimeout: PropTypes.func.isRequired,
  currentTextId: PropTypes.number.isRequired,
  localContent: PropTypes.string.isRequired,
  saveTextContent: PropTypes.func.isRequired,
  saveTextContentSuccess: PropTypes.func.isRequired,
  saveTextContentFailure: PropTypes.func.isRequired,
  setLocalContent: PropTypes.func.isRequired,
  localChars: PropTypes.array.isRequired,
  charsToDelete: PropTypes.array.isRequired,
  charsToUpdate: PropTypes.array.isRequired,
  refreshChars: PropTypes.func.isRequired,
  saveChars: PropTypes.func.isRequired,
  saveCharsSuccess: PropTypes.func.isRequired,
  saveCharsFailure: PropTypes.func.isRequired,
  localWords: PropTypes.array.isRequired,
  wordsToDelete: PropTypes.array.isRequired,
  wordsToUpdate: PropTypes.array.isRequired,
  refreshWords: PropTypes.func.isRequired,
  saveWords: PropTypes.func.isRequired,
  saveWordsSuccess: PropTypes.func.isRequired,
  saveWordsFailure: PropTypes.func.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  tokenizeWords: PropTypes.func.isRequired

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
    wordsToUpdate: state.get('words').get('itemsToUpdate').toJS(),
    currentProjectId: state.get('projects').get('currentProjectId')
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
    refreshWords,
    saveWords,
    saveWordsSuccess,
    saveWordsFailure,
    tokenizeWords
  }
)(EditScreen);
