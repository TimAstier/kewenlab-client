import React from 'react';
import { connect } from 'react-redux';

import { showFlashMessageWithTimeout } from '../../../actions/flashMessages';
import { fetchSuggestions, fetchSuggestionsSuccess, fetchSuggestionFailure, banWord }
  from '../actions';

import SuggestionInput from '../../../suggestionInput/containers/SuggestionInput';
import ItemList from '../components/ItemList';
import SelectMessage from '../../../components/common/SelectMessage';

class SuggestionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.findSuggestions = this.findSuggestions.bind(this);
  }

  findSuggestions(data) {
    return this.props.fetchSuggestions(data).then(
      (res) => {
        return this.props.fetchSuggestionsSuccess(res.data);
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
    const { currentTextId } = this.props;
    return (
      <div id="suggestion-screen">
        { currentTextId !== 0 ?
          <div>
            <SuggestionInput
              currentTextId={this.props.currentTextId}
              findSuggestions={this.findSuggestions}
              isFetching={this.props.isFetching}
            />
            <ItemList
              suggestedItems={this.props.suggestedChars}
              type={'chars'}
              isFetching={this.props.isFetching}
            />
            <ItemList
              banWord={this.props.banWord}
              suggestedItems={this.props.suggestedWords}
              type={'words'}
              isFetching={this.props.isFetching}
            />
          </div>
            :
          <SelectMessage mode="Suggestion"/>
        }
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
  isFetching: React.PropTypes.bool.isRequired,
  suggestedChars: React.PropTypes.array.isRequired,
  suggestedWords: React.PropTypes.array.isRequired,
  banWord: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    textNumber: state.get('suggestionInput').get('textNumber'),
    isFetching: state.get('suggestionScreen').get('isFetching'),
    suggestedChars: state.get('suggestionScreen').get('chars').toJS(),
    suggestedWords: state.get('suggestionScreen').get('words').toJS()
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
    fetchSuggestions,
    fetchSuggestionsSuccess,
    fetchSuggestionFailure,
    banWord
  }
)(SuggestionScreen);