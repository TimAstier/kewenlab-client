import React from 'react';
import { Table, Label, Icon, Popup } from 'semantic-ui-react';

function statusLabel(status) {
  if (status === 'new') {
    return(<Label color='blue' size='big'>New</Label>);
  } else if (status === 'notsaved')
  return(<Label color='red' size='big'>Not saved</Label>);
  else {
    return(status);
  }
}

function renderManuallyAddedIcon(bool) {
  if (bool) {
    return(
      <Popup
        trigger={<Icon name='protect' />}
        content="This character was manually added in the admin."
        positioning='top center'
        basic
      />
    );
  } else {
    return;
  }
}

const CharItem = ({ char, status, manuallyAdded }) => {
  return (
    <Table.Row textAlign='center'>
      <Table.Cell>{renderManuallyAddedIcon(manuallyAdded)}{char}</Table.Cell>
      <Table.Cell>
        {statusLabel(status)}
      </Table.Cell>
    </Table.Row>
  );
};

CharItem.propTypes = {
  char: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  manuallyAdded: React.PropTypes.bool.isRequired
}

export default CharItem;
