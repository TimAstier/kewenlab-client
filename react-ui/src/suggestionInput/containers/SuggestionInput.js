import React from 'react';
import SuggestionForm from '../components/SuggestionForm';

class SuggestionInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      value: '',
      hidden: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleCheck(e) {
    const checked = this.state.checked
    this.setState({checked: !checked});
    this.setState({hidden: checked});
    this.setState({value: ''});
  }

  render() {
    return (
      <div id="suggestion-input">
        <SuggestionForm
          checked={this.state.checked}
          value={this.state.value}
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          hidden={this.state.hidden}
        />
      </div>
    );
  }
}

export default SuggestionInput;
