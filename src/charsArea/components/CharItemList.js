import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import CharItem from './CharItem';
import StatusPicker from '../../components/common/StatusPicker';
import isEmpty from 'lodash/isEmpty';
import { defineStatus } from '../../utils/custom';

function renderCharItem(charItem, i) {
  return(
    <CharItem
      key={i}
      char={charItem.chinese}
      status={defineStatus(charItem)}
      manuallyAdded={charItem.manuallyAdded || false}
      manuallyDeleted={charItem.manuallyDeleted || false}
    />
  );
}

function renderCharItems(chars) {
  if (!isEmpty(chars)) {
    return chars.map(renderCharItem);
  } else {
    return null;
  }
}

const CharItemList = ({ filteredLocalChars, onFilterClick, visibilityFilter }) => {
  return (
    <div id='chars-list'>
      <h2>
        <Label basic circular color='black' className='main-label'>字</Label>
      </h2>
      <div className='table-wrapper'>
        <Table celled>
          <Table.Header>
            <Table.Row textAlign='center'>
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
}

CharItemList.propTypes = {
  filteredLocalChars: React.PropTypes.array.isRequired,
  onFilterClick: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired
}

export default CharItemList;
