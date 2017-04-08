import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CharItemList, CharControls } from '../../components';
import { getSaved, countChanges, getTotalItems, countNewItems,
  filterLocalItems, setCharsVisibilityFilter } from '../../redux/items';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';

class CharsArea extends React.Component {
  constructor(props) {
    super(props);

    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setCharsVisibilityFilter(data.value);
  }

  render() {
    const statItems = [
      `New: ${this.props.totalNewChars} / ${this.props.totalChars}`,
      `${Math.round(this.props.totalNewChars / this.props.totalChars * 100)}%`
    ];

    return (
      <div id="chars-area">
        <CharItemList
          filteredLocalChars={this.props.filteredLocalChars}
          onFilterClick={this.onFilterClick}
          visibilityFilter={this.props.visibilityFilter}
          isSaving={this.props.isSaving}
          statItems={statItems}
        />
        {(process.env.REACT_APP_DEBUG === 'on') &&
          <CharControls
            saved={this.props.saved}
            changeCount={this.props.changeCount}
            save={this.props.save}
          />
        }
      </div>
    );
  }
}

CharsArea.propTypes = {
  save: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  changeCount: PropTypes.number.isRequired,
  showFlashMessageWithTimeout: PropTypes.func.isRequired,
  totalChars: PropTypes.number.isRequired,
  totalNewChars: PropTypes.number.isRequired,
  setCharsVisibilityFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  filteredLocalChars: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    saved: getSaved(state.get('chars')),
    isSaving: state.get('chars').get('isSaving'),
    changeCount: countChanges(state.get('chars')),
    totalChars: getTotalItems(state.get('chars')),
    totalNewChars: countNewItems(state.get('chars')),
    visibilityFilter: state.get('chars').get('visibilityFilter'),
    filteredLocalChars: filterLocalItems(state.get('chars'))
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
    setCharsVisibilityFilter
  }
)(CharsArea);
