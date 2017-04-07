import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { TextItemsMenu, CreateTextMenu, LoadingMenu,
  ProjectSelector } from '../../components';
import { getTextItems, addText, createNewText } from '../../redux/sidebar';
import { fetch, set, setCurrentProjectId } from '../../redux/projects';
import { setLocalContent, setCurrentContent } from '../../redux/textEditor';
import { setLocalChars, setCurrentChars, setLocalWords, setCurrentWords,
  clearCharsToUpdate, clearCharsToDelete, clearWordsToUpdate,
  clearWordsToDelete } from '../../redux/items';

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
    return this.props.addText(this.props.currentProjectId);
  }

  // TODO: define this kind of method in a seaparate 'operations' files
  // This avoids importing so many functions in this file
  // AND avoid binding everything to the store

  resetTextEditor() {
    this.props.setLocalContent('');
    this.props.setCurrentContent('');
    this.props.setLocalChars([]);
    this.props.setCurrentChars([]);
    this.props.setLocalWords([]);
    this.props.setCurrentWords([]);
    this.props.clearCharsToUpdate();
    this.props.clearCharsToDelete();
    this.props.clearWordsToUpdate();
    return this.props.clearWordsToDelete();
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
          resetTextEditor={this.resetTextEditor.bind(this)}
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
  setLocalContent: PropTypes.func.isRequired,
  setCurrentContent: PropTypes.func.isRequired,
  setLocalChars: PropTypes.func.isRequired,
  setCurrentChars: PropTypes.func.isRequired,
  setLocalWords: PropTypes.func.isRequired,
  setCurrentWords: PropTypes.func.isRequired,
  clearCharsToUpdate: PropTypes.func.isRequired,
  clearCharsToDelete: PropTypes.func.isRequired,
  clearWordsToUpdate: PropTypes.func.isRequired,
  clearWordsToDelete: PropTypes.func.isRequired,
  currentProjectId: PropTypes.number.isRequired
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
    setLocalContent,
    setCurrentContent,
    setLocalChars,
    setCurrentChars,
    setLocalWords,
    setCurrentWords,
    clearCharsToUpdate,
    clearCharsToDelete,
    clearWordsToUpdate,
    clearWordsToDelete
  }
)(Sidebar);
