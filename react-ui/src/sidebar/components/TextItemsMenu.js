import React from 'react';
import { connect } from 'react-redux';
import { Menu, Label } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { getCurrentText, setCurrentTextId } from '../actions';
import { setCurrentContent, setLocalContent } from '../../textEditor/actions';
import { setCurrentChars, setLocalChars,
  clearCharsToDelete, clearCharsToUpdate } from '../../charsArea/actions';
import { setCurrentWords, setLocalWords,
  clearWordsToDelete, clearWordsToUpdate } from '../../wordsArea/actions';
import { deserializeChars, deserializeWords } from '../../utils/deserializer';

class TextItemsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: ''
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  renderTextItem(textItem, i) {
    const { activeItem } = this.state;

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
    this.setState({ activeItem: data });
    return this.props.getCurrentText(data).then(
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
  getCurrentText: React.PropTypes.func.isRequired,
  setCurrentTextId: React.PropTypes.func.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  textItems: React.PropTypes.array.isRequired,
  setCurrentContent: React.PropTypes.func.isRequired,
  setLocalContent: React.PropTypes.func.isRequired,
  setCurrentChars: React.PropTypes.func.isRequired,
  setLocalChars: React.PropTypes.func.isRequired,
  setCurrentWords: React.PropTypes.func.isRequired,
  setLocalWords: React.PropTypes.func.isRequired,
  clearCharsToDelete: React.PropTypes.func.isRequired,
  clearWordsToDelete: React.PropTypes.func.isRequired,
  clearCharsToUpdate: React.PropTypes.func.isRequired,
  clearWordsToUpdate: React.PropTypes.func.isRequired
};

export default connect(
  null,
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
    clearWordsToUpdate
  })(TextItemsMenu);
