import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CharControls = ({ saved, changeCount, save }) => {
  return(
    <Button
      primary
      id='chars-area-save-btn'
      disabled={saved}
      onClick={save}
    >
      <Icon name='save' />
      {`Save (${changeCount})`}
    </Button>
  );
};

CharControls.propTypes = {
  saved: React.PropTypes.bool.isRequired,
  changeCount: React.PropTypes.number.isRequired,
  save: React.PropTypes.func.isRequired
}

export default CharControls;
