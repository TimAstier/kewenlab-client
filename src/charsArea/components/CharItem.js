import React from 'react';
import { Table, Label, Icon, Popup } from 'semantic-ui-react';

function statusLabel(status) {
  if (status === 'new') {
    return (<Label color="blue" size="big">New</Label>);
  } else if (status === 'notsaved') {
    return (<Label color="red" size="big">Not saved</Label>);
  } else if (status === 'manuallydeleted') {
    return (<Label color="red" size="big">Banned</Label>);
  }
  return status;
}

function renderCustomIcon(manuallyAdded, manuallyDeleted) {
  if (manuallyAdded) {
    return (
      <Popup
        trigger={<Icon name="lock" />}
        content="This character was manually added in the admin."
        positioning="top center"
        basic
      />
    );
  } else if (manuallyDeleted) {
    return (
      <Popup
        trigger={<Icon name="ban" />}
        content="This character was manually deleted."
        positioning="top center"
        basic
      />
    );
  }
  return false;
}

const CharItem = ({ char, status, manuallyAdded, manuallyDeleted }) => {
  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        {renderCustomIcon(manuallyAdded, manuallyDeleted)}{char}
      </Table.Cell>
      <Table.Cell>
        {statusLabel(status)}
      </Table.Cell>
    </Table.Row>
  );
};

CharItem.propTypes = {
  char: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired,
  manuallyAdded: React.PropTypes.bool.isRequired,
  manuallyDeleted: React.PropTypes.bool.isRequired
};

export default CharItem;
