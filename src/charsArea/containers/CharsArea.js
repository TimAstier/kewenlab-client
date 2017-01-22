import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';

class CharsArea extends React.Component {

  render() {
    return (
      <CharItemList currentChars={this.props.currentChars}/>
    );
  }
}

CharsArea.propTypes = {
  currentChars: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    currentChars: state.charsArea.currentChars
  }
}

export default connect(mapStateToProps)(CharsArea);
