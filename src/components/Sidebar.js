import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import TextList from './sidebar/TextList';
import { getTextItems, updateTextItems } from '../actions/sidebarActions';

class Sidebar extends React.Component {

  componentWillMount() {
    return this.props.getTextItems().then(
      (res) => {
        this.props.updateTextItems(res.data.texts);
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
      <Menu pointing inverted vertical id="sidebar">
        <TextList textItems={this.props.textItems} />
      </Menu>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  updateTextItems: React.PropTypes.func.isRequired
}

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(store) {
  return {
    textItems: store.textItems
  };
}

export default connect(
  mapStateToProps,
  { getTextItems, updateTextItems }
)(Sidebar);
