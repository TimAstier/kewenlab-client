import React from 'react';
import { Menu } from 'semantic-ui-react'

class Sidebar extends React.Component {
  state = { activeItem: 'account' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing secondary vertical id="sidebar">
        <Menu.Item
          name='account'
          active={activeItem === 'account'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='settings'
          active={activeItem === 'settings'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default Sidebar;
