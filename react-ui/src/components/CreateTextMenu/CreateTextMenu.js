import React from 'react';
import { Button } from 'semantic-ui-react';

const CreateTextMenu = ({ onClick }) => {
  return (
    <div id="create-text-menu">
      <Button
        color="teal"
        onClick={onClick}
        size="tiny"
      >
        Add text
      </Button>
    </div>
  );
};

CreateTextMenu.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default CreateTextMenu;
