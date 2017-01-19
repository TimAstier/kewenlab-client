import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import WordItem from './wordsarea/WordItem';
import isEmpty from 'lodash/isEmpty';

class WordsArea extends React.Component {

  renderWordItem(wordItem, i) {
    return(
      <WordItem
        key={i}
        word={wordItem.word}
        status={wordItem.status}
      />
    );
  }

  render() {
    // TODO: Take data from the server
    // Fake Data
    const wordItems = [
      { word: '你好', status: '' },
      { word: '我们', status: 'New' },
      { word: '他', status: 'New' },
      { word: '爱', status: '' },
      { word: '中国', status: '' },
      { word: '冰块', status: 'New' }
    ];

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
              { !isEmpty(wordItems) ? wordItems.map(this.renderWordItem) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default WordsArea;
