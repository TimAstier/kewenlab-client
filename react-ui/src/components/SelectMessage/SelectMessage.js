import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const SelectMessage = ({ mode }) => {
  let icon = '';
  let headerMessage = '';

  if (mode === 'Edit') {
    icon = 'pencil';
    headerMessage = 'Welcome to the Edit mode';
  } else {
    icon = 'idea';
    headerMessage = 'Welcome to the Suggestion mode';
  }

  return (
    <Header as="h1" icon id="select-message">
      <Icon name={icon} />
      {headerMessage}
      <Header.Subheader>
        {'<- Please select a text to get started<-'}
      </Header.Subheader>
    </Header>
  );
};

SelectMessage.propTypes = {
  mode: React.PropTypes.string.isRequired
};

export default SelectMessage;
