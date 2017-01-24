import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CharControls = ({ saved, changeCount, onClick }) => {
  return(
    <Button
      size='big'
      primary
      id='chars-area-save-btn'
      disabled={saved}
      onClick={onClick}
    >
      <Icon name='save' />
      {`Save (${changeCount})`}
    </Button>
  );
};

export default CharControls;
