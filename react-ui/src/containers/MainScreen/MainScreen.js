import React from 'react';
import { connect } from 'react-redux';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { Sidebar, EditScreen, SuggestionScreen } from '../';

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
    mode: state.get('mode').get('mode')
  };
}

export default connect(
  mapStateToProps,
  { showFlashMessageWithTimeout }
)(MainScreen);
