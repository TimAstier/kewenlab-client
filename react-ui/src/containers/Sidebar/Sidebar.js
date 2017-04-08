import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TextItemsMenu, CreateTextMenu, LoadingMenu,
  ProjectSelector } from '../../components';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { getTextItems, addText, createNewText } from '../../redux/sidebar';
import { fetch, set, setCurrentProjectId } from '../../redux/projects';
import { resetEditScreen } from './operations';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.onAddTextClick = this.onAddTextClick.bind(this);
    this.fetchProjectItems = this.fetchProjectItems.bind(this);
  }

  fetchProjectItems() {
    return fetch(this.props.currentUserId);
  }

  getOptions(projectItems) {
    const options = projectItems.map(itm => {
      return { key: itm.id, text: itm.title, value: itm.id };
    });
    return options;
  }

  onAddTextClick() {
    const { currentProjectId, currentUserId } = this.props;
    return this.props.addText(currentProjectId, currentUserId);
  }

  render() {
    return (
      <div id="sidebar">
        <ProjectSelector
          fetchProjectItems={this.fetchProjectItems}
          setProjectItems={this.props.set}
          setCurrentProjectId={this.props.setCurrentProjectId}
          getTextItems={this.props.getTextItems}
          options={this.getOptions(this.props.projectItems)}
          resetEditScreen={this.props.resetEditScreen}
        />
        { this.props.isFetching ?
          <LoadingMenu />
          :
          <TextItemsMenu
            textItems={this.props.textItems}
            showFlashMessageWithTimeout={this.props.showFlashMessageWithTimeout}
          />
        }
        <CreateTextMenu
          onClick={this.onAddTextClick}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  getTextItems: PropTypes.func.isRequired,
  showFlashMessageWithTimeout: PropTypes.func.isRequired,
  addText: PropTypes.func.isRequired,
  textItems: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  createNewText: PropTypes.func.isRequired,
  currentUserId: PropTypes.number.isRequired,
  set: PropTypes.func.isRequired,
  projectItems: PropTypes.array.isRequired,
  setCurrentProjectId: PropTypes.func.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  resetEditScreen: PropTypes.func.isRequired
};

Sidebar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    textItems: state.get('sidebar').get('textItems').toJS(),
    isFetching: state.get('sidebar').get('isFetching'),
    currentUserId: state.get('auth').get('user').id,
    projectItems: state.get('projects').get('items').toJS(),
    currentProjectId: state.get('projects').get('currentProjectId')
  };
}

export default connect(
  mapStateToProps,
  {
    getTextItems,
    addText,
    createNewText,
    set,
    setCurrentProjectId,
    showFlashMessageWithTimeout,
    resetEditScreen
  }
)(Sidebar);
