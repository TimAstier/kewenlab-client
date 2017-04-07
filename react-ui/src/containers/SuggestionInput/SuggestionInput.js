import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SuggestionForm } from '../../components';
import { setSuggestionTextNumber } from '../../redux/suggestionInput';

class SuggestionInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      hidden: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(e) {
    this.props.setSuggestionTextNumber(Number(e.target.value));
  }

  handleCheck() {
    const checked = this.state.checked;
    this.setState({checked: !checked});
    this.setState({hidden: checked});
    this.props.setSuggestionTextNumber(0);
  }

  onClick(e) {
    e.preventDefault();
    const data = {
      textId: this.props.currentTextId,
      textNumber: this.props.textNumber,
      userId: this.props.currentUserId,
      projectId: this.props.currentProjectId
    };
    this.props.findSuggestions(data);
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
          onClick={this.onClick}
          currentTextId={this.props.currentTextId}
          isFetching={this.props.isFetching}
        />
      </div>
    );
  }
}

SuggestionInput.propTypes = {
  setSuggestionTextNumber: PropTypes.func.isRequired,
  textNumber: PropTypes.number.isRequired,
  findSuggestions: PropTypes.func.isRequired,
  currentTextId: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currentUserId: PropTypes.number.isRequired,
  currentProjectId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    textNumber: state.get('suggestionInput').get('textNumber')
  };
}

export default connect(
  mapStateToProps,
  { setSuggestionTextNumber }
)(SuggestionInput);
