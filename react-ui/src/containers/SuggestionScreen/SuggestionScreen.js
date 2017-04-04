import React from 'react';
import { connect } from 'react-redux';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { fetchSuggestions, fetchSuggestionsSuccess,
  fetchSuggestionFailure, banWord, hideWord, favoriteWord, unfavoriteWord }
  from '../../redux/suggestions';
import { SuggestionInput } from '../';
import { SuggestionItemList, SelectMessage } from '../../components';

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
              currentUserId={this.props.currentUserId}
            />
            <SuggestionItemList
              suggestedItems={this.props.suggestedChars}
              type={'chars'}
              isFetching={this.props.isFetching}
            />
            <SuggestionItemList
              banWord={this.props.banWord}
              hideWord={this.props.hideWord}
              favoriteWord={this.props.favoriteWord}
              unfavoriteWord={this.props.unfavoriteWord}
              currentUserId={this.props.currentUserId}
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
  banWord: React.PropTypes.func.isRequired,
  hideWord: React.PropTypes.func.isRequired,
  favoriteWord: React.PropTypes.func.isRequired,
  unfavoriteWord: React.PropTypes.func.isRequired,
  currentUserId: React.PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    textNumber: state.get('suggestionInput').get('textNumber'),
    isFetching: state.get('suggestions').get('isFetching'),
    suggestedChars: state.get('suggestions').get('chars').toJS(),
    suggestedWords: state.get('suggestions').get('words').toJS(),
    currentUserId: state.get('auth').get('user').id
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
    fetchSuggestions,
    fetchSuggestionsSuccess,
    fetchSuggestionFailure,
    banWord,
    hideWord,
    favoriteWord,
    unfavoriteWord
  }
)(SuggestionScreen);
