import React from 'react';
import { Table, Label } from 'semantic-ui-react';

function statusLabel(status) {
  if (status === 'New') {
    return(<Label color='blue' size='big'>{status}</Label>);
  } else if (status === 'Not saved')
    return(<Label color='red' size='big'>{status}</Label>);
  else {
    return(status);
  }
}

const WordItem = ({ word, status }) => {
  return (
    <Table.Row textAlign='center'>
      <Table.Cell>{word}</Table.Cell>
      <Table.Cell>
        {statusLabel(status)}
      </Table.Cell>
    </Table.Row>
  );
}

WordItem.propTypes = {
  word: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
}

export default WordItem;
