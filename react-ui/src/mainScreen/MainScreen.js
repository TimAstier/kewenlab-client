import React from 'react';
import { connect } from 'react-redux';
import { showFlashMessageWithTimeout } from '../actions/flashMessages';
import Sidebar from '../sidebar/containers/Sidebar';
import EditScreen from './editScreen/EditScreen';
import SuggestionScreen from './suggestionScreen/containers/SuggestionScreen';

class MainScreen extends React.Component {

  renderAppScreen(mode) {
    switch (mode) {
      case 'edit':
        return <EditScreen />;
      case 'suggestion':
        return <SuggestionScreen />;
      default:
        return null;
    }
  }

  render() {
    const { showFlashMessageWithTimeout, mode } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        {this.renderAppScreen(mode)}
      </div>
    );
  }
}

MainScreen.propTypes = {
  mode: React.PropTypes.string.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    mode: state.get('mainScreen').get('mode')
  };
}

export default connect(
  mapStateToProps,
  { showFlashMessageWithTimeout }
)(MainScreen);
