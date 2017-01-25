import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TextControls = ({saved, onClick}) => {
  return(
    <Button
      primary
      id='text-editor-save-btn'
      onClick={onClick}
      disabled={saved}
    >
      <Icon name='save' />
      Save
    </Button>
  );
};

export default TextControls;
