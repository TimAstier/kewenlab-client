import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const WordControls = ({ saved, changeCount, onClick }) => {
  return(
    <Button
      primary
      id='words-area-refresh-btn'
      onClick={onClick}
    >
      <Icon name='refresh' />
      Refresh
    </Button>
  );
};

WordControls.propTypes = {
  onClick: React.PropTypes.func.isRequired
}

export default WordControls;
