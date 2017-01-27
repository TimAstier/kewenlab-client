import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const CharItem = ({ char, status }) => {

  function statusLabel(status) {
    if (status === 'new') {
      return(<Label color='blue' size='big'>New</Label>);
    } else if (status === 'notsaved')
      return(<Label color='red' size='big'>Not saved</Label>);
    else {
      return(status);
    }
  }

  return (
    <Table.Row textAlign='center'>
      <Table.Cell>{char}</Table.Cell>
      <Table.Cell>
        {statusLabel(status)}
      </Table.Cell>
    </Table.Row>
  );
};

CharItem.propTypes = {
  char: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
}

export default CharItem;
