import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';
import CharControls from '../components/CharControls';
import Stats from '../../components/common/Stats';
import { getSaved, countChanges, getTotalChars,
  countNewChars, filterLocalChars } from '../reducer';
import { saveChars, setCurrentChars, setLocalChars,
  clearCharsToDelete, setVisibilityFilter } from '../actions';
import { addFlashMessage } from '../../actions/flashMessages';

class CharsArea extends React.Component {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
  }

  onFilterClick(e, data) {
    return this.props.setVisibilityFilter(data.value);
  }

  save(e) {
    e.preventDefault();
    // TODO: Use serializers to define which attributes to send in payload
    const data = {
      textId: this.props.currentTextId,
      newChars: this.props.localChars.filter(x => x.id === null),
      charsToDelete: this.props.charsToDelete
    };
    return this.props.saveChars(data).then(
      (res) => {
        this.props.setCurrentChars(res.data.chars);
        this.props.setLocalChars(res.data.chars);
        this.props.clearCharsToDelete();
      },
      (err) => {
        this.props.addFlashMessage({
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
  addFlashMessage: React.PropTypes.func.isRequired,
  setCurrentChars: React.PropTypes.func.isRequired,
  setLocalChars: React.PropTypes.func.isRequired,
  clearCharsToDelete: React.PropTypes.func.isRequired,
  totalChars: React.PropTypes.number.isRequired,
  totalNewChars: React.PropTypes.number.isRequired,
  setVisibilityFilter: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired,
  filteredLocalChars: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    localChars: state.charsArea.localChars,
    charsToDelete: state.charsArea.charsToDelete,
    saved: getSaved(state.charsArea),
    changeCount: countChanges(state.charsArea),
    currentTextId: state.sidebar.currentTextId,
    totalChars: getTotalChars(state.charsArea),
    totalNewChars: countNewChars(state.charsArea),
    visibilityFilter: state.charsArea.visibilityFilter,
    filteredLocalChars: filterLocalChars(state.charsArea)
  }
}

export default connect(
  mapStateToProps,
  {
    saveChars,
    addFlashMessage,
    setCurrentChars,
    setLocalChars,
    clearCharsToDelete,
    setVisibilityFilter
  }
)(CharsArea);
