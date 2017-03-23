import React from 'react';
import { Table } from 'semantic-ui-react';

const Item = ({ item }) => {
  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        {item}
      </Table.Cell>
    </Table.Row>
  );
};

Item.propTypes = {
  item: React.PropTypes.string.isRequired,
};

export default Item;
