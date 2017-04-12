import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setLocalContent, saveTextEditor } from '../../redux/textEditor';
import { refreshChars, refreshWords, saveCharsArea, saveWordsArea }
  from '../../redux/items';
import { toArrayOfUniqueChars } from '../../utils/custom';
import { TextEditor, CharsArea, WordsArea } from '../';
import { SelectMessage } from '../../components';
import { tokenizeWords } from './operations';

class EditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.onTextEditorChange = this.onTextEditorChange.bind(this);
    this.saveAll = this.saveAll.bind(this);
    this.timer = null;
  }

  onTextEditorChange(e) {
    e.persist();
    this.props.setLocalContent(e.target.value);
    this.props.refreshChars(toArrayOfUniqueChars(e.target.value));
    clearTimeout(this.timer); // Needs to be out of the function scope
    if ((process.env.REACT_APP_DEBUG !== 'on')) {
      // TODO: Closure to use data at Change time instead of Timeout time
      this.timer = setTimeout(() => { this.saveAll(e); }, 1500);
    }
    return this.timer;
  }

  saveAll(e) {
    this.saveText(e);
    this.saveChars();
    this.tokenize(this.props.localContent)
    .then(() => {
      this.saveWords();
    });
  }

  saveChars() {
    const data = {
      textId: this.props.currentTextId,
      newChars: this.props.localChars.filter(x => x.id === null),
      charsToDelete: this.props.charsToDelete,
      charsToUpdate: this.props.charsToUpdate,
      projectId: this.props.currentProjectId
    };
    return this.props.saveCharsArea(data);
  }

  saveWords() {
    const data = {
      textId: this.props.currentTextId,
      newWords: this.props.localWords.filter(x => x.id === null),
      wordsToDelete: this.props.wordsToDelete,
      wordsToUpdate: this.props.wordsToUpdate,
      projectId: this.props.currentProjectId
    };
    return this.props.saveWordsArea(data);
  }

  tokenize() {
    return this.props.tokenizeWords(this.props.localContent);
  }

  saveText(e) {
    // Not sure why this save method does not work as the other 2 without this
    e.preventDefault();
    const data = {
      id: this.props.currentTextId,
      content: this.props.localContent
    };
    return this.props.saveTextEditor(data);
  }

  render() {
    const { currentTextId } = this.props;
    return (
      <div id="edit-screen">
        { currentTextId !== 0 ?
          <div>
            <TextEditor
              save={this.saveText.bind(this)}
              onChange={this.onTextEditorChange}
              currentProjectId={this.props.currentProjectId}
            />
            <CharsArea save={this.saveChars.bind(this)} />
            <WordsArea
              tokenize={this.tokenize.bind(this)}
              save={this.saveWords.bind(this)}
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
  currentTextId: PropTypes.number.isRequired,
  localContent: PropTypes.string.isRequired,
  localChars: PropTypes.array.isRequired,
  charsToDelete: PropTypes.array.isRequired,
  charsToUpdate: PropTypes.array.isRequired,
  localWords: PropTypes.array.isRequired,
  wordsToDelete: PropTypes.array.isRequired,
  wordsToUpdate: PropTypes.array.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  setLocalContent: PropTypes.func.isRequired,
  refreshChars: PropTypes.func.isRequired,
  refreshWords: PropTypes.func.isRequired,
  tokenizeWords: PropTypes.func.isRequired,
  saveCharsArea: PropTypes.func.isRequired,
  saveWordsArea: PropTypes.func.isRequired,
  saveTextEditor: PropTypes.func.isRequired

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
  { setLocalContent,
    refreshChars,
    refreshWords,
    tokenizeWords,
    saveCharsArea,
    saveWordsArea,
    saveTextEditor
  }
)(EditScreen);
