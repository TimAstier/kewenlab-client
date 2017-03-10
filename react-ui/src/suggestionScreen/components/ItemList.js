import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import Item from './Item';
import isEmpty from 'lodash/isEmpty';

function renderItem(item, i) {
  return (
    <Item
      key={i}
      item={item}
    />
  );
}

function renderItems(items) {
  if (!isEmpty(items)) {
    return items.map(renderItem);
  }
  return null;
}

const ItemList = ({ suggestedItems, type }) => {
  return (
    <div id={(type === 'chars') ? 'suggestion-chars-list' : 'suggestion-words-list'}>
      <h2>
        <Label basic circular color="black" className="main-label">
          {(type === 'chars') ? '字' : '词'}
        </Label>
      </h2>
      <div className="table-wrapper">
        <Table celled>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>
                {(type === 'chars') ? 'Chars' : 'Words'}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { renderItems(suggestedItems) }
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

ItemList.propTypes = {
  suggestedItems: React.PropTypes.array.isRequired,
  type: React.PropTypes.string.isRequired
};

export default ItemList;
