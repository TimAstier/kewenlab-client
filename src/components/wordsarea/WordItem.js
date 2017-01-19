import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const WordItem = ({ word, status }) => {
  return (
    <Table.Row textAlign='center'>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>
        <Label color='blue' size='big'>{status}</Label>
      </Table.Cell>
    </Table.Row>
  );
}

WordItem.propTypes = {
  word: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
}

export default WordItem;
