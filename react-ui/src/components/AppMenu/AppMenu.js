import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

function isActive(type, mode) {
  return type === mode ? ' active' : '';
}

const AppMenu = ({ mode, setAppScreenModeToEdit, setAppScreenModeToSuggestion }) => {
  return (
    <Menu.Menu className="main-menu-link">
      <a
        href="#"
        className={`item${isActive('edit', mode)}`}
        onClick={setAppScreenModeToEdit}
      >
        <Icon name="pencil" />
      </a>
      <a
        href="#"
        className={`item${isActive('suggestion', mode)}`}
        onClick={setAppScreenModeToSuggestion}
      >
        <Icon name="idea" />
      </a>
    </Menu.Menu>
  );
};

AppMenu.propTypes = {
  mode: React.PropTypes.string.isRequired,
  setAppScreenModeToEdit: React.PropTypes.func.isRequired,
  setAppScreenModeToSuggestion: React.PropTypes.func.isRequired
};

export default AppMenu;
