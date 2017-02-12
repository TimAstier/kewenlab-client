import React from 'react';
import { connect } from 'react-redux';
import TextItemsMenu from '../components/TextItemsMenu';
import CreateTextMenu from '../components/CreateTextMenu';
import { getTextItems, setTextItems, createNewText } from '../actions';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.addText = this.addText.bind(this);
  }

  componentWillMount() {
    return this.props.getTextItems().then(
      (res) => {
        this.props.setTextItems(res.data.texts);
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not retrieve texts from the server.'
        });
      }
    );
  }

  addText(e) {
    e.preventDefault();
    return this.props.createNewText().then(
      () => {
        this.props.getTextItems().then(
          (res) => {
            this.props.setTextItems(res.data.texts);
          }
        );
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not create new text.'
        });
      }
    );
  }

  render() {
    return (
      <div id="sidebar">
        <TextItemsMenu
          textItems={this.props.textItems}
          showFlashMessageWithTimeout={this.props.showFlashMessageWithTimeout}
        />
        <CreateTextMenu onClick={this.addText} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: React.PropTypes.func.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  setTextItems: React.PropTypes.func.isRequired,
  textItems: React.PropTypes.array.isRequired,
  createNewText: React.PropTypes.func.isRequired
};

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    textItems: state.get('sidebar').get('textItems').toJS()
  };
}

export default connect(
  mapStateToProps,
  { getTextItems, setTextItems, createNewText }
)(Sidebar);
