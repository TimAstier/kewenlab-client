import React from 'react';
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
  children: React.PropTypes.object.isRequired,
  mode: React.PropTypes.string.isRequired,
  location: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    mode: state.get('mode').get('mode')
  };
}

export default connect(mapStateToProps)(App);
