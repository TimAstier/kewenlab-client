import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';
import CharControls from '../components/CharControls';
import Stats from '../../components/common/Stats';
import { getSaved, countChanges, getTotalItems,
  countNewItems, filterLocalItems } from '../../common/items/selectors';
import { saveChars, setCurrentChars, setLocalChars,
  clearCharsToDelete, setCharsVisibilityFilter } from '../actions';
import { showFlashMessageWithTimeout } from '../../actions/flashMessages';
import { deserializeChars } from '../../utils/deserializer';

class CharsArea extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setCharsVisibilityFilter(data.value);
  }

  save(e) {
    e.preventDefault();
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newChars: this.props.localChars.filter(x => x.id === null),
      charsToDelete: this.props.charsToDelete
    };
    console.log(data.newChars);
    console.log(data.charsToDelete);
    return this.props.saveChars(data).then(
      (res) => {
        this.props.setCurrentChars(deserializeChars(res.data.chars));
        this.props.setLocalChars(deserializeChars(res.data.chars));
        this.props.clearCharsToDelete();
      },
      (err) => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not save chars on the server.'
        });
      }
    );
  }

  render() {
    const statItems = [
      `New: ${this.props.totalNewChars}/${this.props.totalChars}`,
      `${Math.round(this.props.totalNewChars/this.props.totalChars*100)}%`
    ];

    return (
      <div id='chars-area'>
        <CharItemList
          filteredLocalChars={this.props.filteredLocalChars}
          onFilterClick={this.onFilterClick}
          visibilityFilter={this.props.visibilityFilter}
        />
        {this.props.saved &&
          <Stats items={statItems} />
        }
        <CharControls
          saved={this.props.saved}
          changeCount={this.props.changeCount}
          save={this.save}
        />
      </div>
    );
  }
}

CharsArea.propTypes = {
  localChars: React.PropTypes.array.isRequired,
  charsToDelete: React.PropTypes.array.isRequired,
  saved: React.PropTypes.bool.isRequired,
  changeCount: React.PropTypes.number.isRequired,
  saveChars: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  setCurrentChars: React.PropTypes.func.isRequired,
  setLocalChars: React.PropTypes.func.isRequired,
  clearCharsToDelete: React.PropTypes.func.isRequired,
  totalChars: React.PropTypes.number.isRequired,
  totalNewChars: React.PropTypes.number.isRequired,
  setCharsVisibilityFilter: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  filteredLocalChars: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    localChars: state.get('chars').get('localItems').toJS(),
    charsToDelete: state.get('chars').get('itemsToDelete').toJS(),
    saved: getSaved(state.get('chars')),
    changeCount: countChanges(state.get('chars')),
    currentTextId: state.get('sidebar').get('currentTextId'),
    totalChars: getTotalItems(state.get('chars')),
    totalNewChars: countNewItems(state.get('chars')),
    visibilityFilter: state.get('chars').get('visibilityFilter'),
    filteredLocalChars: filterLocalItems(state.get('chars'))
  }
}

export default connect(
  mapStateToProps,
  {
    saveChars,
    showFlashMessageWithTimeout,
    setCurrentChars,
    setLocalChars,
    clearCharsToDelete,
    setCharsVisibilityFilter
  }
)(CharsArea);
