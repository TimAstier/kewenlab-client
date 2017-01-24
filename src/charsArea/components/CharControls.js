import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CharControls = () => {
  return(
    <Button
      size='big'
      primary
      id='chars-area-save-btn'
    >
      <Icon name='save' />
      Save
    </Button>
  );
};

export default CharControls;
