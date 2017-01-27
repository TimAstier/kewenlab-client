import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import WordItem from './WordItem';
import StatusPicker from '../../components/common/StatusPicker';
import isEmpty from 'lodash/isEmpty';
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

const WordItemList = ({ filteredLocalWords, onFilterClick, visibilityFilter }) => {
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
              <Table.HeaderCell width={6}>
                <StatusPicker
                  onFilterClick={onFilterClick}
                  visibilityFilter={visibilityFilter}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body >
            { renderWordItems(filteredLocalWords) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

WordItemList.propTypes = {
  filteredLocalWords: React.PropTypes.array.isRequired
}

export default WordItemList;
