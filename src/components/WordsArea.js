import React from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import WordItem from './wordsarea/WordItem';
import isEmpty from 'lodash/isEmpty';

class WordsArea extends React.Component {

  renderWordItem(wordItem, i) {
    return(
      <WordItem
        key={i}
        word={wordItem.chinese}
        status={wordItem.status || ''}
      />
    );
  }

  // TODO: Render in the right order
  renderWordItems() {
    const { currentWords } = this.props;
    if (!isEmpty(currentWords)) {
      return currentWords.map(this.renderWordItem);
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id='words-area'>
        <h2>
          <Label basic circular color='black' className='main-label'>词</Label>
        </h2>
        <div className='table-wrapper'>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Word</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body >
              { this.renderWordItems() }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

WordsArea.propTypes = {
  currentWords: React.PropTypes.array.isRequired
}

function mapStateToProps(store) {
  return {
    currentWords: store.texts.currentText.currentWords
  }
}

export default connect(mapStateToProps)(WordsArea);
