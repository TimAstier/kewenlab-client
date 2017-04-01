import React from 'react';
import { connect } from 'react-redux';
import { WordItemList, WordControls } from '../../components';
import { getSaved, countChanges, getTotalItems,
  countNewItems, filterLocalItems, setWordsVisibilityFilter } from '../../redux/items';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';

class WordsArea extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setWordsVisibilityFilter(data.value);
  }

  render() {
    const statItems = [
      `New: ${this.props.totalNewWords} / ${this.props.totalWords}`,
      `${Math.round(this.props.totalNewWords / this.props.totalWords * 100)}%`
    ];

    return (
      <div id="words-area">
        <WordItemList
          filteredLocalWords={this.props.filteredLocalWords}
          onFilterClick={this.onFilterClick}
          visibilityFilter={this.props.visibilityFilter}
          isSaving={this.props.isSaving}
          statItems={statItems}
        />
        {(process.env.REACT_APP_DEBUG === 'on') &&
          <WordControls
            refresh={this.props.refresh}
            saved={this.props.saved}
            changeCount={this.props.changeCount}
            save={this.props.save}
          />
        }
      </div>
    );
  }
}

WordsArea.propTypes = {
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  isSaving: React.PropTypes.bool.isRequired,
  saved: React.PropTypes.bool.isRequired,
  changeCount: React.PropTypes.number.isRequired,
  totalWords: React.PropTypes.number.isRequired,
  totalNewWords: React.PropTypes.number.isRequired,
  setWordsVisibilityFilter: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  filteredLocalWords: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    saved: getSaved(state.get('words')),
    isSaving: state.get('words').get('isSaving'),
    changeCount: countChanges(state.get('words')),
    totalWords: getTotalItems(state.get('words')),
    totalNewWords: countNewItems(state.get('words')),
    visibilityFilter: state.get('words').get('visibilityFilter'),
    filteredLocalWords: filterLocalItems(state.get('words'))
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
    setWordsVisibilityFilter
  })(WordsArea);