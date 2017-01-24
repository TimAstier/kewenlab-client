import React from 'react';
import { connect } from 'react-redux';
import CharItemList from '../components/CharItemList';
import CharControls from '../components/CharControls';

class CharsArea extends React.Component {

  render() {
    return (
      <div id='chars-area'>
        <CharItemList localChars={this.props.localChars}/>
        <CharControls />
      </div>
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
