import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';
import CharControls from '../components/CharControls';
import { getSaved, countChanges } from '../reducer';
import { saveChars, setCurrentChars, setLocalChars, clearCharsToDelete }
  from '../actions';
import { addFlashMessage } from '../../actions/flashMessages';

class CharsArea extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
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
    return (
      <div id='chars-area'>
        <CharItemList localChars={this.props.localChars} />
        <CharControls
          saved={this.props.saved}
          changeCount={this.props.changeCount}
          onClick={this.onClick}
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
  clearCharsToDelete: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    localChars: state.charsArea.localChars,
    charsToDelete: state.charsArea.charsToDelete,
    saved: getSaved(state.charsArea),
    changeCount: countChanges(state.charsArea),
    currentTextId: state.sidebar.currentTextId
  }
}

export default connect(
  mapStateToProps,
  {
    saveChars,
    addFlashMessage,
    setCurrentChars,
    setLocalChars,
    clearCharsToDelete
  }
)(CharsArea);
