import React from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import WordItem from './wordsarea/WordItem';
import isEmpty from 'lodash/isEmpty';

class WordsArea extends React.Component {

  // TODO: Render in the right order
  renderWordItem(wordItem, i) {
    return(
      <WordItem
        key={i}
        word={wordItem.chinese}
        status={wordItem.status || ''}
      />
    );
  }

  render() {
    const { words } = this.props;

    return (
      <div id='words-area'>
        <h2><Label basic circular color='black' className='main-label'>词</Label></h2>
        <div className='table-wrapper'>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Word</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body >
              { !isEmpty(words) ? words.map(this.renderWordItem) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

WordsArea.propTypes = {
  words: React.PropTypes.array.isRequired
}

function mapStateToProps(store) {
  return {
    words: store.texts.words
  }
}

export default connect(mapStateToProps)(WordsArea);
