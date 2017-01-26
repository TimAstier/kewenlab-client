import React from 'react';
import { connect } from 'react-redux';
import WordItemList from '../components/WordItemList';
import WordControls from '../components/WordControls';

import { tokenize, setLocalWords } from '../actions';
import { addFlashMessage } from '../../actions/flashMessages';

import { toChineseOnly, removeDuplicates } from '../../utils/custom';

class WordsArea extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      content: toChineseOnly(this.props.localContent)
    };
    return this.props.tokenize(data).then(
      (res) => {
        let newLocalWords = res.data;
        newLocalWords = removeDuplicates(newLocalWords);
        newLocalWords = newLocalWords.map(x => {
          return {
            id: null,
            chinese: x
          };
        });
        this.props.setLocalWords(newLocalWords);
        // this.props.setLocalChars(res.data.chars);
        // this.props.clearCharsToDelete();
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Error: could not tokenize text from the server.'
        });
      }
    );
  }

  render() {
    return (
      <div id='words-area'>
        <WordItemList currentWords={this.props.localWords} />
        <WordControls onClick={this.onClick} />
      </div>
    );
  }
}

WordsArea.propTypes = {
  localWords: React.PropTypes.array.isRequired,
  localContent: React.PropTypes.string.isRequired,
  tokenize: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  setLocalWords: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    localWords: state.wordsArea.localWords,
    localContent: state.textEditor.localContent
  }
}

export default connect(
  mapStateToProps,
  {
    tokenize,
    addFlashMessage,
    setLocalWords
  })(WordsArea);
