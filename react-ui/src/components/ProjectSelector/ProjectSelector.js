import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';
import faker from 'faker';

const getOptions = () => _.times(3, () => {
  const name = faker.name.findName();
  return { key: name, text: name, value: _.snakeCase(name) };
});

export default class ProjectSelector extends Component {
  componentWillMount() {
    this.setState({
      isFetching: false,
      multiple: true,
      search: true,
      searchQuery: null,
      value: [],
      options: getOptions(),
    });
  }

  handleChange = (e, { value }) => this.setState({ value })

  fetchOptions = () => {
    this.setState({ isFetching: true });

    setTimeout(() => {
      this.setState({ isFetching: false, options: getOptions() });
      this.selectRandom();
    }, 500);
  }

  selectRandom = () => {
    const { multiple, options } = this.state;
    const value = _.sample(options).value;
    this.setState({ value: multiple ? [value] : value });
  }

  render() {
    const { options, isFetching, value } = this.state;

    return (
      <div id="project-selector-menu">
        <Dropdown
          id="project-selector"
          placeholder="Select Project"
          selection
          options={options}
          value={value}
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
          disabled={isFetching}
          loading={isFetching}
        />
      </div>
    );
  }
}

ProjectSelector.propTypes = {
  onClick: PropTypes.func.isRequired
};
