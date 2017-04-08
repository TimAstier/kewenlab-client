import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../';
import { FlashMessageList } from '../../components';

class App extends React.Component {
  render() {
    return (
      <div id="main-container">
        <NavigationBar
          mode={this.props.mode}
          pathname={this.props.location.pathname}
        />
        <FlashMessageList />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    mode: state.get('mode').get('mode')
  };
}

export default connect(mapStateToProps)(App);
