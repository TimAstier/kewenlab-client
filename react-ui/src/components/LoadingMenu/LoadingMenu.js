import React from 'react';
import { Menu, Loader } from 'semantic-ui-react';

const CreateTextMenu = () => {
  return (
    <Menu pointing inverted vertical id="text-items-menu">
      <Loader
        active
        inline="centered"
        size="big"
        id="sidebar-loader"
        inverted
      >
        Loading
      </Loader>
    </Menu>
  );
};

export default CreateTextMenu;
