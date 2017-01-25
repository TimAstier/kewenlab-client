import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import TextList from '../components/TextList';
import { getTextItems, updateTextItems } from '../actions';

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
      }
    );
  }

  render() {
    return (
      <Menu pointing inverted vertical id="sidebar">
        <TextList
          textItems={this.props.textItems}
          addFlashMessage={this.props.addFlashMessage}
        />
      </Menu>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  updateTextItems: React.PropTypes.func.isRequired,
  textItems: React.PropTypes.array.isRequired
}

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    textItems: state.sidebar.textItems
  };
}

export default connect(
  mapStateToProps,
  { getTextItems, updateTextItems }
)(Sidebar);
