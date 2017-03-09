import React from 'react';
import { connect } from 'react-redux';
import SuggestionForm from '../components/SuggestionForm';
import { setSuggestionTextNumber } from '../actions';

class SuggestionInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      hidden: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.props.setSuggestionTextNumber(Number(e.target.value));
  }

  handleCheck(e) {
    const checked = this.state.checked
    this.setState({checked: !checked});
    this.setState({hidden: checked});
    this.props.setSuggestionTextNumber(0);
  }

  render() {
    return (
      <div id="suggestion-input">
        <SuggestionForm
          checked={this.state.checked}
          value={this.props.textNumber}
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          hidden={this.state.hidden}
        />
      </div>
    );
  }
}

SuggestionInput.propTypes = {
  setSuggestionTextNumber: React.PropTypes.func.isRequired,
  textNumber: React.PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    textNumber: state.get('suggestionInput').get('textNumber')
  };
}

export default connect(
  mapStateToProps,
  { setSuggestionTextNumber }
)(SuggestionInput);
