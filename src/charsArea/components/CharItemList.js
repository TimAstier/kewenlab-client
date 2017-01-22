import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import CharItem from './CharItem';
import isEmpty from 'lodash/isEmpty';

function renderCharItem(charItem, i) {
  return(
    <CharItem
      key={i}
      char={charItem.chinese}
      status={charItem.status || ''}
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

const CharItemList = ({ currentChars }) => {
  return (
    <div id='chars-area'>
      <h2>
        <Label basic circular color='black' className='main-label'>字</Label>
      </h2>
      <div className='table-wrapper'>
        <Table celled>
          <Table.Header>
            <Table.Row textAlign='center'>
              <Table.HeaderCell>Char</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { renderCharItems(currentChars) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

CharItemList.propTypes = {
  currentChars: React.PropTypes.array.isRequired
}

export default CharItemList;
