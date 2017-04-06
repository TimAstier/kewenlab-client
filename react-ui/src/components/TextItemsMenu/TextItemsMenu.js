import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu, Label } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { getCurrentText, setCurrentTextId } from '../../redux/sidebar';
import { setCurrentContent, setLocalContent } from '../../redux/textEditor';
import { setCurrentChars, setLocalChars,
  clearCharsToDelete, clearCharsToUpdate, setCurrentWords, setLocalWords,
  clearWordsToDelete, clearWordsToUpdate } from '../../redux/items';
import { clearSuggestions } from '../../redux/suggestions';
import { deserializeChars, deserializeWords } from '../../utils/deserializer';

class TextItemsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  renderTextItem(textItem, i) {
    const activeItem = this.props.currentTextId;

    return (
      <Menu.Item
        data={textItem.id}
        key={i}
        active={activeItem === textItem.id}
        onClick={this.handleItemClick}
      >
        <Label
          color="teal"
          size="large"
          circular
        >
          {textItem.order}
        </Label>
        {textItem.title}
      </Menu.Item>
    );
  }

  handleItemClick(e, { data }) {
    return this.props.getCurrentText(data, this.props.currentProjectId).then(
      (res) => {
        const text = res[0].data.text;
        const chars = deserializeChars(res[1].data.chars);
        const words = deserializeWords(res[2].data.words);
        this.props.setCurrentTextId(text);
        this.props.setLocalContent(text.content);
        this.props.setCurrentContent(text.content);
        this.props.setLocalChars(chars);
        this.props.setCurrentChars(chars);
        this.props.clearCharsToDelete();
        this.props.clearCharsToUpdate();
        this.props.setLocalWords(words);
        this.props.setCurrentWords(words);
        this.props.clearWordsToDelete();
        this.props.clearWordsToUpdate();
        this.props.clearSuggestions();
      },
      () => {
        this.props.showFlashMessageWithTimeout({
          type: 'error',
          text: 'Error: could not get text data from the server.'
        });
      }
    );
  }

  render() {
    const textItems = this.props.textItems;
    return (
      <Menu pointing inverted vertical id="text-items-menu">
        { !isEmpty(textItems) ? textItems.map(this.renderTextItem) : null }
      </Menu>
    );
  }
}

TextItemsMenu.propTypes = {
  getCurrentText: PropTypes.func.isRequired,
  setCurrentTextId: PropTypes.func.isRequired,
  showFlashMessageWithTimeout: PropTypes.func.isRequired,
  textItems: PropTypes.array.isRequired,
  setCurrentContent: PropTypes.func.isRequired,
  setLocalContent: PropTypes.func.isRequired,
  setCurrentChars: PropTypes.func.isRequired,
  setLocalChars: PropTypes.func.isRequired,
  setCurrentWords: PropTypes.func.isRequired,
  setLocalWords: PropTypes.func.isRequired,
  clearCharsToDelete: PropTypes.func.isRequired,
  clearWordsToDelete: PropTypes.func.isRequired,
  clearCharsToUpdate: PropTypes.func.isRequired,
  clearWordsToUpdate: PropTypes.func.isRequired,
  currentTextId: PropTypes.number.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  currentProjectId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    currentProjectId: state.get('projects').get('currentProjectId')
  };
}

export default connect(
  mapStateToProps,
  {
    getCurrentText,
    setCurrentTextId,
    setCurrentContent,
    setLocalContent,
    setCurrentChars,
    setLocalChars,
    setCurrentWords,
    setLocalWords,
    clearCharsToDelete,
    clearWordsToDelete,
    clearCharsToUpdate,
    clearWordsToUpdate,
    clearSuggestions
  })(TextItemsMenu);
