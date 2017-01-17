import React from 'react';
import { Menu } from 'semantic-ui-react';
import TextList from './sidebar/TextList';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textItems: [
        { title: 'Text 1' },
        { title: 'Text 2' },
        { title: 'Text 3' }
      ]
    }
  }

  render() {
    return (
      <Menu pointing secondary vertical id="sidebar">
        <TextList textItems={this.state.textItems} />
      </Menu>
    );
  }
}

export default Sidebar;
