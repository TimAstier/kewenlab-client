import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const CreateTextMenu = ({ onClick }) => {
  return (
    <Menu inverted vertical id="create-text-menu">
      <Menu.Item>
        <Button
          color="teal"
          data-position="top center"
          onClick={onClick}
        >
          Add text
        </Button>
      </Menu.Item>
    </Menu>
  );
};

CreateTextMenu.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default CreateTextMenu;
