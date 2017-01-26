import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import WordItem from './WordItem';
import { defineStatus } from '../../utils/custom';

function renderWordItem(wordItem, i) {
  return(
    <WordItem
      key={i}
      word={wordItem.chinese}
      status={defineStatus(wordItem)}
    />
  );
}

function renderWordItems(words) {
  if (!isEmpty(words)) {
    return words.map(renderWordItem);
  } else {
    return null;
  }
}

const WordItemList = ({ currentWords }) => {
  return (
    <div id='words-list'>
      <h2>
        <Label basic circular color='black' className='main-label'>词</Label>
      </h2>
      <div className='table-wrapper'>
        <Table celled>
          <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell width={10}>Word</Table.HeaderCell>
              <Table.HeaderCell width={6}>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body >
            { renderWordItems(currentWords) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

WordItemList.propTypes = {
  currentWords: React.PropTypes.array.isRequired
}

export default WordItemList;
