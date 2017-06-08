import React from 'react';
import { Table, Label, Loader } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { WordItem, Stats, StatusPicker } from '../';

function renderWordItem(wordItem, i) {
  return (
    <WordItem
      key={i}
      word={wordItem.chinese}
      status={wordItem.status}
      manuallyAdded={wordItem.manuallyAdded || false}
      manuallyDeleted={wordItem.manuallyDeleted || false}
    />
  );
}

function renderWordItems(words) {
  if (!isEmpty(words)) {
    return words.map(renderWordItem);
  }
  return null;
}

const WordItemList = ({ filteredLocalWords, onFilterClick, visibilityFilter, isSaving, statItems }) => {
  return (
    <div id="words-list">
      <div className="infos">
        <Label basic circular color="black" className="main-label">
          {isSaving ? (
            <Loader active inline size="tiny"/>
          ) : (
            '词'
          )}
        </Label>
        {!isSaving && <Stats items={statItems} />}
      </div>
      <div className="table-wrapper">
        <Table celled>
          <Table.Header>
            <Table.Row textAlign="center">
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
};

WordItemList.propTypes = {
  filteredLocalWords: React.PropTypes.array.isRequired,
  onFilterClick: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  isSaving: React.PropTypes.bool.isRequired,
  statItems: React.PropTypes.array.isRequired
};

export default WordItemList;
