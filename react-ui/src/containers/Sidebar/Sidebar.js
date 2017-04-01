import React from 'react';
import { connect } from 'react-redux';
import { TextItemsMenu, CreateTextMenu, LoadingMenu } from '../../components';
import { getTextItems, addText, createNewText } from '../../redux/sidebar';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.addText = this.props.addText.bind(this);
  }

  componentWillMount() {
    return this.props.getTextItems();
  }

  render() {
    return (
      <div id="sidebar">
        { this.props.isFetching ?
          <LoadingMenu />
          :
          <TextItemsMenu
            textItems={this.props.textItems}
            showFlashMessageWithTimeout={this.props.showFlashMessageWithTimeout}
          />
        }
        <CreateTextMenu onClick={this.addText} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: React.PropTypes.func.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  addText: React.PropTypes.func.isRequired,
  textItems: React.PropTypes.array.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  createNewText: React.PropTypes.func.isRequired
};

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    textItems: state.get('sidebar').get('textItems').toJS(),
    isFetching: state.get('sidebar').get('isFetching')
  };
}

export default connect(
  mapStateToProps,
  { getTextItems, addText, createNewText }
)(Sidebar);
