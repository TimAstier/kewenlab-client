import React from 'react';
import { connect } from 'react-redux';
import WordItemList from '../components/WordItemList';
import WordControls from '../components/WordControls';
import Stats from '../../components/common/Stats';
import { getSaved, countChanges, getTotalItems,
  countNewItems, filterLocalItems } from '../../common/items/selectors';
import { tokenize, addNewLocalWords, removeDeletedLocalWords,
  setLocalWords, setCurrentWords, saveWords, clearWordsToDelete,
  setWordsVisibilityFilter } from '../actions';
import { showFlashMessageWithTimeout } from '../../actions/flashMessages';
import { toChineseOnly, removeDuplicates } from '../../utils/custom';
import isEmpty from 'lodash/isEmpty';
import { deserializeWords } from '../../utils/deserializer';

class WordsArea extends React.Component {

  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.save = this.save.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setWordsVisibilityFilter(data.value);
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
        this.props.setCurrentWords(deserializeWords(res.data.words));
        this.props.setLocalWords(deserializeWords(res.data.words));
        this.props.clearWordsToDelete();
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save words on the server.'
        });
      }
    );
  }

  render() {
    const statItems = [
      `New: ${this.props.totalNewWords}/${this.props.totalWords}`,
      `${Math.round(this.props.totalNewWords / this.props.totalWords * 100)}%`
    ];

    return (
      <div id="words-area">
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
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
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
  setWordsVisibilityFilter: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  filteredLocalWords: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    localWords: state.get('words').get('localItems').toJS(),
    localContent: state.get('textEditor').get('localContent'),
    saved: getSaved(state.get('words')),
    changeCount: countChanges(state.get('words')),
    currentTextId: state.get('sidebar').get('currentTextId'),
    wordsToDelete: state.get('words').get('itemsToDelete').toJS(),
    totalWords: getTotalItems(state.get('words')),
    totalNewWords: countNewItems(state.get('words')),
    visibilityFilter: state.get('words').get('visibilityFilter'),
    filteredLocalWords: filterLocalItems(state.get('words'))
  };
}

export default connect(
  mapStateToProps,
  {
    tokenize,
    showFlashMessageWithTimeout,
    addNewLocalWords,
    removeDeletedLocalWords,
    setLocalWords,
    setCurrentWords,
    saveWords,
    clearWordsToDelete,
    setWordsVisibilityFilter
  })(WordsArea);
