import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import CharItem from './CharItem';
import isEmpty from 'lodash/isEmpty';

function defineStatus(item) {
  if (item.id === null) {
    return 'Not saved';
  } else if (isEmpty(item.texts)) {
    return 'New';
  } else {
    return item.texts[0].title;
  }
}

function renderCharItem(charItem, i) {
  return(
    <CharItem
      key={i}
      char={charItem.chinese}
      status={defineStatus(charItem)}
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

const CharItemList = ({ localChars }) => {
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
            { renderCharItems(localChars) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

CharItemList.propTypes = {
  localChars: React.PropTypes.array.isRequired
}

export default CharItemList;
