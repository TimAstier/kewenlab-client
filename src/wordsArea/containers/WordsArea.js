import React from 'react';
import { connect } from 'react-redux';
import WordItemList from '../components/WordItemList';
import WordControls from '../components/WordControls';
import Stats from '../../components/common/Stats';
import { getSaved, countChanges, getTotalWords,
  countNewWords, filterLocalWords } from '../reducer';
import { tokenize, addNewLocalWords, removeDeletedLocalWords,
  setLocalWords, setCurrentWords, saveWords, clearWordsToDelete,
  setVisibilityFilter } from '../actions';
import { addFlashMessage } from '../../actions/flashMessages';
import { toChineseOnly, removeDuplicates } from '../../utils/custom';
import isEmpty from 'lodash/isEmpty';

class WordsArea extends React.Component {

  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.save = this.save.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setVisibilityFilter(data.value);
  }

  refresh(e) {
    e.preventDefault();
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
          return this.props.addNewLocalWords(newLocalWords);
        } else {
          return;
        }
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Error: could not tokenize text from the server.'
        });
      }
    );
  }

  save(e) {
    e.preventDefault();
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newWords: this.props.localWords.filter(x => x.id === null),
      wordsToDelete: this.props.wordsToDelete
    };
    return this.props.saveWords(data).then(
      (res) => {
        this.props.setCurrentWords(res.data.words);
        this.props.setLocalWords(res.data.words);
        this.props.clearWordsToDelete();
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Error: could not save words on the server.'
        });
      }
    );
  }

  render() {
    const statItems = [
      `New: ${this.props.totalNewWords}/${this.props.totalWords}`,
      `${Math.round(this.props.totalNewWords/this.props.totalWords*100)}%`
    ];

    return (
      <div id='words-area'>
        <WordItemList
          filteredLocalWords={this.props.filteredLocalWords}
          onFilterClick={this.onFilterClick}
          visibilityFilter={this.props.visibilityFilter}
        />
        {this.props.saved &&
          <Stats items={statItems} />
        }
        <WordControls
          refresh={this.refresh}
          saved={this.props.saved}
          changeCount={this.props.changeCount}
          save={this.save}
        />
      </div>
    );
  }
}

WordsArea.propTypes = {
  localWords: React.PropTypes.array.isRequired,
  localContent: React.PropTypes.string.isRequired,
  tokenize: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  addNewLocalWords: React.PropTypes.func.isRequired,
  removeDeletedLocalWords: React.PropTypes.func.isRequired,
  saved: React.PropTypes.bool.isRequired,
  changeCount: React.PropTypes.number.isRequired,
  setLocalWords: React.PropTypes.func.isRequired,
  setCurrentWords: React.PropTypes.func.isRequired,
  saveWords: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  clearWordsToDelete: React.PropTypes.func.isRequired,
  wordsToDelete: React.PropTypes.array.isRequired,
  totalWords: React.PropTypes.number.isRequired,
  totalNewWords: React.PropTypes.number.isRequired,
  setVisibilityFilter: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  filteredLocalWords: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    localWords: state.wordsArea.localWords,
    localContent: state.textEditor.get('localContent'),
    saved: getSaved(state.wordsArea),
    changeCount: countChanges(state.wordsArea),
    currentTextId: state.sidebar.get('currentTextId'),
    wordsToDelete: state.wordsArea.wordsToDelete,
    totalWords: getTotalWords(state.wordsArea),
    totalNewWords: countNewWords(state.wordsArea),
    visibilityFilter: state.wordsArea.visibilityFilter,
    filteredLocalWords: filterLocalWords(state.wordsArea)
  }
}

export default connect(
  mapStateToProps,
  {
    tokenize,
    addFlashMessage,
    addNewLocalWords,
    removeDeletedLocalWords,
    setLocalWords,
    setCurrentWords,
    saveWords,
    clearWordsToDelete,
    setVisibilityFilter
  })(WordsArea);
