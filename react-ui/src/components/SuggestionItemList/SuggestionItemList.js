import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { SuggestionItem } from '../';

const SuggestionItemList = ({ suggestedItems, type, isFetching, banWord,
  hideWord, favoriteWord, unfavoriteWord, currentUserId }) => {
  function renderItem(item, i) {
    return (
      <SuggestionItem
        key={i}
        item={item}
        banWord={banWord}
        hideWord={hideWord}
        favoriteWord={favoriteWord}
        unfavoriteWord={unfavoriteWord}
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

SuggestionItemList.propTypes = {
  suggestedItems: React.PropTypes.array.isRequired,
  type: React.PropTypes.string.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  banWord: React.PropTypes.func,
  hideWord: React.PropTypes.func,
  favoriteWord: React.PropTypes.func,
  unfavoriteWord: React.PropTypes.func,
  currentUserId: React.PropTypes.number
};

export default SuggestionItemList;
