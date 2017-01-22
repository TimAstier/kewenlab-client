import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const CharItem = ({ char, status }) => {
  return (
    <Table.Row textAlign='center'>
      <Table.Cell>{char}</Table.Cell>
      <Table.Cell>
        <Label color='blue' size='big'>{status}</Label>
      </Table.Cell>
    </Table.Row>
  );
}

CharItem.propTypes = {
  char: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
}

export default CharItem;
