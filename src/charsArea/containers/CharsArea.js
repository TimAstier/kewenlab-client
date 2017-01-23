import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';

class CharsArea extends React.Component {

  render() {
    return (
      <CharItemList localChars={this.props.localChars}/>
    );
  }
}

CharsArea.propTypes = {
  localChars: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    localChars: state.charsArea.localChars
  }
}

export default connect(mapStateToProps)(CharsArea);
