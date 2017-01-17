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
        // TODO: dispatch an action to update the Redux state
        this.setState({ textItems: res.data.texts });
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Error: could not retrieve texts from the server.'
        });
        this.context.router.push('/');
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
  getTextItems: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { getTextItems })(Sidebar);
