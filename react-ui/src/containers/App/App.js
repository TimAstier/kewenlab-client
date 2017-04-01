import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../navigationBar/containers/NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
  render() {
    return (
      <div id="main-container">
        <NavigationBar
          mode={this.props.mode}
          pathname={this.props.location.pathname}
        />
        <FlashMessagesList />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string.isRequired,
  location: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    mode: state.get('mainScreen').get('mode')
  };
}

export default connect(mapStateToProps)(App);
