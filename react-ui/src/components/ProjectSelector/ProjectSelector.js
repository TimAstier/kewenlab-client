import React, { Component, PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';
import checkNetwork from '../../helpers/checkNetwork';

export default class ProjectSelector extends Component {
  componentWillMount() {
    this.setState({
      isFetching: false,
      multiple: true,
      search: true,
      searchQuery: null,
      value: undefined
    });
    this.fetchOptions();
  }

  handleChange = (e, { value }) => {
    if (this.state.value === value) {
      return true;
    }
    this.setState({ value });
    this.props.resetEditScreen();
    this.props.setCurrentProjectId(Number(value));
    return this.props.getTextItems(Number(value));
  };

  handleSearchChange = (e, value) => this.setState({ searchQuery: value });

  fetchOptions = () => {
    this.setState({ isFetching: true });
    this.props.fetchProjectItems()
      .then(projects => {
        this.setState({ isFetching: false });
        this.props.setProjectItems(projects);
        this.setState({ value: projects.data.data[0].id });
        this.props.setCurrentProjectId(Number(projects.data.data[0].id));
        return this.props.getTextItems(projects.data.data[0].id);
      })
      .catch(err => {
        this.setState({ isFetching: false });
        const type = 'error';
        const text = checkNetwork(err);
        this.props.showFlashMessageWithTimeout({ type, text });
      });
  }

  toggleSearch = (e) => this.setState({ search: e.target.checked })

  render() {
    const { isFetching, search, value } = this.state;

    return (
      <div id="project-selector-menu">
        <Dropdown
          id="project-selector"
          placeholder="Select Project"
          selection
          search={search}
          options={this.props.options}
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
  fetchProjectItems: PropTypes.func.isRequired,
  setProjectItems: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  setCurrentProjectId: PropTypes.func.isRequired,
  getTextItems: PropTypes.func.isRequired,
  resetEditScreen: PropTypes.func.isRequired,
  showFlashMessageWithTimeout: PropTypes.func.isRequired
};
