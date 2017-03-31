import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import Item from './Item';
import isEmpty from 'lodash/isEmpty';

const ItemList = ({ suggestedItems, type, isFetching, banWord, hideWord, currentUserId }) => {
  function renderItem(item, i) {
    return (
      <Item
        key={i}
        item={item}
        banWord={banWord}
        hideWord={hideWord}
        currentUserId={currentUserId}
      />
    );
  }

  function renderItems(items) {
    if (!isEmpty(items)) {
      return items.map(renderItem);
    }
    return null;
  }

  return (
    <div
      id={(type === 'chars') ? 'suggestion-chars-list' : 'suggestion-words-list'}
      hidden={isFetching}
    >
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
  type: React.PropTypes.string.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  banWord: React.PropTypes.func,
  hideWord: React.PropTypes.func,
  currentUserId: React.PropTypes.number
};

export default ItemList;
