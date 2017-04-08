import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, EditScreen, SuggestionScreen } from '../';

class MainScreen extends React.Component {

  // TODO: Manage this with react-router
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
    const { mode } = this.props;
    return (
      <div id="main-screen">
        <Sidebar/>
        {this.renderAppScreen(mode)}
      </div>
    );
  }
}

MainScreen.propTypes = {
  mode: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    mode: state.get('mode').get('mode')
  };
}

export default connect(mapStateToProps)(MainScreen);
