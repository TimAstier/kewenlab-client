import React from 'react';
import { Table, Button } from 'semantic-ui-react';

const Item = ({ item, banWord }) => {
  function onClick() {
    return banWord(item.id);
  }

  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        <div className="suggestion-item-ban">
          <Button icon="ban" color="red" onClick={onClick} />
        </div>
        <div className="suggestion-item-chinese">
          {item.chinese}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  banWord: React.PropTypes.func.isRequired
};

export default Item;
