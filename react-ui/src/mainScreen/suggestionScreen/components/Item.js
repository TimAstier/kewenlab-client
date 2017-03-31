import React from 'react';
import { Table, Button } from 'semantic-ui-react';

const Item = ({ item, banWord, hideWord, currentUserId }) => {
  function onBanClick() {
    return banWord(item.id);
  }

  function onHideClick() {
    return hideWord(item.id, currentUserId);
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
      </Table.Cell>
    </Table.Row>
  );
};

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  banWord: React.PropTypes.func.isRequired,
  hideWord: React.PropTypes.func.isRequired,
  currentUserId: React.PropTypes.number.isRequired
};

export default Item;
