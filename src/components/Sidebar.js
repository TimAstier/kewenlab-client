import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import TextList from './sidebar/TextList';
import { getTextItems } from '../actions/sidebarActions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textItems: []
    }
  }

  componentWillMount() {
    return this.props.getTextItems().then(
      (res) => {
        this.setState({ textItems: res.data.texts });
      },
      (err) => {
        // handle error
      }
    );
  }

  render() {
    return (
      <Menu pointing secondary vertical id="sidebar">
        <TextList textItems={this.state.textItems} />
      </Menu>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: React.PropTypes.func.isRequired
}

export default connect(null, { getTextItems })(Sidebar);
