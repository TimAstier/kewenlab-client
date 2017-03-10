import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../../actions/flashMessages';
import { fetchSuggestions, fetchSuggestionsSuccess, fetchSuggestionFailure }
  from '../actions';

import Sidebar from '../../sidebar/containers/Sidebar';
import SuggestionInput from '../../suggestionInput/containers/SuggestionInput';
import ItemList from '../components/ItemList';
// import WordItemList from './components/WordItemList';

class SuggestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.findSuggestions = this.findSuggestions.bind(this);
  }

  findSuggestions(data) {
    return this.props.fetchSuggestions(data).then(
      (res) => {
        return this.props.fetchSuggestionsSuccess(res.data.chars);
      },
      () => {
        this.props.fetchSuggestionFailure();
        return this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not get suggestions from the server.'
        });
      }
    );
  }

  render() {
    const { showFlashMessageWithTimeout } = this.props;
    return (
      <div id="main-screen">
        <Sidebar showFlashMessageWithTimeout={showFlashMessageWithTimeout} />
        <SuggestionInput
          currentTextId={this.props.currentTextId}
          findSuggestions={this.findSuggestions}
          isFetching={this.props.isFetching}
        />
        <ItemList
          suggestedItems={['一', '二', '三']}
          type={'chars'}
          isFetching={this.props.isFetching}
        />
        <ItemList
          suggestedItems={['水', '山', '地']}
          type={'words'}
          isFetching={this.props.isFetching}
        />
      </div>
    );
  }
}

SuggestionScreen.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  textNumber: React.PropTypes.number.isRequired,
  fetchSuggestions: React.PropTypes.func.isRequired,
  fetchSuggestionsSuccess: React.PropTypes.func.isRequired,
  fetchSuggestionFailure: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    textNumber: state.get('suggestionInput').get('textNumber'),
    isFetching: state.get('suggestionScreen').get('isFetching')
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
    fetchSuggestions,
    fetchSuggestionsSuccess,
    fetchSuggestionFailure
  }
)(SuggestionScreen);
