import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../actions/flashMessages';

import Sidebar from '../sidebar/containers/Sidebar';
import SuggestionInput from '../suggestionInput/containers/SuggestionInput';
import ItemList from './components/ItemList';
// import WordItemList from './components/WordItemList';


class MainScreen extends React.Component {

  render() {
    const { showFlashMessageWithTimeout } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        <SuggestionInput />
        <ItemList
          suggestedItems={['一', '二', '三']}
          type={'chars'}
        />
        <ItemList
          suggestedItems={['水', '山', '地']}
          type={'words'}
        />
      </div>
    );
  }
}

MainScreen.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
  };
}

export default connect(
  mapStateToProps,
  { showFlashMessageWithTimeout }
)(MainScreen);
