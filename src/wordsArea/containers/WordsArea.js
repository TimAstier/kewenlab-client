import React from 'react';
import { connect } from 'react-redux';
import WordItemList from '../components/WordItemList';

class WordsArea extends React.Component {

  render() {
    return (
      <WordItemList currentWords={this.props.currentWords} />
    );
  }
}

WordsArea.propTypes = {
  currentWords: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    currentWords: state.wordsArea.currentWords
  }
}

export default connect(mapStateToProps)(WordsArea);
