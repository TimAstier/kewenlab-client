import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { banWord, hideWord, favoriteWord, unfavoriteWord, getSuggestions }
  from '../../redux/suggestions';
import { SuggestionInput } from '../';
import { SuggestionItemList, SelectMessage } from '../../components';

class SuggestionScreen extends React.Component {

  render() {
    const { currentTextId } = this.props;
    return (
      <div id="suggestion-screen">
        { currentTextId !== 0 ?
          <div>
            <SuggestionInput
              currentTextId={this.props.currentTextId}
              findSuggestions={this.props.getSuggestions}
              isFetching={this.props.isFetching}
              currentUserId={this.props.currentUserId}
              currentProjectId={this.props.currentProjectId}
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
  currentTextId: PropTypes.number.isRequired,
  textNumber: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  suggestedChars: PropTypes.array.isRequired,
  suggestedWords: PropTypes.array.isRequired,
  banWord: PropTypes.func.isRequired,
  hideWord: PropTypes.func.isRequired,
  favoriteWord: PropTypes.func.isRequired,
  unfavoriteWord: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  getSuggestions: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    textNumber: state.get('suggestionInput').get('textNumber'),
    isFetching: state.get('suggestions').get('isFetching'),
    suggestedChars: state.get('suggestions').get('chars').toJS(),
    suggestedWords: state.get('suggestions').get('words').toJS(),
    currentUserId: state.get('auth').get('user').id,
    currentProjectId: state.get('projects').get('currentProjectId')
  };
}

export default connect(
  mapStateToProps,
  {
    banWord,
    hideWord,
    favoriteWord,
    unfavoriteWord,
    getSuggestions
  }
)(SuggestionScreen);
