import React from 'react';
import { Table, Label, Loader } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { CharItem, Stats, StatusPicker } from '../';

function renderCharItem(charItem, i) {
  return (
    <CharItem
      key={i}
      char={charItem.chinese}
      status={charItem.status}
      manuallyAdded={charItem.manuallyAdded || false}
      manuallyDeleted={charItem.manuallyDeleted || false}
    />
  );
}

function renderCharItems(chars) {
  if (!isEmpty(chars)) {
    return chars.map(renderCharItem);
  }
  return null;
}

const CharItemList = ({ filteredLocalChars, onFilterClick, visibilityFilter, isSaving, statItems }) => {
  return (
    <div id="chars-list">
      <div className="infos">
        <Label basic circular color="black" className="main-label">
          {isSaving ? (
            <Loader active inline size="tiny"/>
          ) : (
            '字'
          )}
        </Label>
        {!isSaving && <Stats items={statItems} />}
      </div>
      <div className="table-wrapper">
        <Table celled>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell width={1}>Char</Table.HeaderCell>
              <Table.HeaderCell width={1}>
                <StatusPicker
                  onFilterClick={onFilterClick}
                  visibilityFilter={visibilityFilter}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { renderCharItems(filteredLocalChars) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

CharItemList.propTypes = {
  filteredLocalChars: React.PropTypes.array.isRequired,
  onFilterClick: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  isSaving: React.PropTypes.bool.isRequired,
  statItems: React.PropTypes.array.isRequired
};

export default CharItemList;
