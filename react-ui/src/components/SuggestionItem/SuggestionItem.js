import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const SuggestionItem = ({ item, banWord, hideWord, favoriteWord, currentUserId }) => {
  function onBanClick() {
    return banWord(item.id);
  }

  function onHideClick() {
    return hideWord(item.id, currentUserId);
  }

  function onFavoriteClick() {
    return favoriteWord(item.id, currentUserId);
  }

  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        <div className="suggestion-item-ban">
          <Button icon="ban" color="red" onClick={onBanClick} />
        </div>
        <div className="suggestion-item-chinese">
          {item.chinese}
        </div>
        <div className="suggestion-item-hide">
          <Button icon="cancel" onClick={onHideClick} />
        </div>
        <div className="suggestion-item-favorite">
          {
            (item.favorite === false) ?
              <Button icon="empty star" onClick={onFavoriteClick} />
            : <Icon name="star" />
          }
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

SuggestionItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  banWord: React.PropTypes.func.isRequired,
  hideWord: React.PropTypes.func.isRequired,
  favoriteWord: React.PropTypes.func.isRequired,
  currentUserId: React.PropTypes.number.isRequired
};

export default SuggestionItem;
