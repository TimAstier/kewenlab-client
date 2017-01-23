import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { getCurrentText, setCurrentText } from '../actions';
import { setCurrentContent, setLocalContent } from '../../textEditor/actions';
import { setCurrentChars, setLocalChars, clearCharsToDelete }
  from '../../charsArea/actions';
import { setCurrentWords, setLocalWords } from '../../wordsArea/actions';

class TextList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: ''
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  renderTextItem(textItem, i) {
    const { activeItem } = this.state

    return(
      <Menu.Item
        data={textItem.id}
        key={i}
        name={textItem.title}
        active={activeItem === textItem.title}
        onClick={this.handleItemClick}
      />
    );
  }

  handleItemClick(e, { name, data }) {
    this.setState({ activeItem: name });
    return this.props.getCurrentText(data).then(
      (res) => {
        const text = res[0].data.text;
        const chars = res[1].data.chars;
        const words = res[2].data.words;
        this.props.setCurrentText(text);
        this.props.setLocalContent(text.content);
        this.props.setCurrentContent(text.content);
        this.props.setLocalChars(chars);
        this.props.setCurrentChars(chars);
        this.props.clearCharsToDelete();
        this.props.setLocalWords(words);
        this.props.setCurrentWords(words);
      },
      (err) => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Error: could not get text data from the server.'
        });
      }
    );
  }

  render() {
    const textItems = this.props.textItems;
    return (
      <div>
        { !isEmpty(textItems) ? textItems.map(this.renderTextItem) : null }
      </div>
    );
  }
}

TextList.propTypes = {
  getCurrentText: React.PropTypes.func.isRequired,
  setCurrentText: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  textItems: React.PropTypes.array.isRequired,
  setCurrentContent: React.PropTypes.func.isRequired,
  setLocalContent: React.PropTypes.func.isRequired,
  setCurrentChars: React.PropTypes.func.isRequired,
  setLocalChars: React.PropTypes.func.isRequired,
  setCurrentWords: React.PropTypes.func.isRequired,
  setLocalWords: React.PropTypes.func.isRequired,
  clearCharsToDelete: React.PropTypes.func.isRequired
}

export default connect(
  null,
  {
    getCurrentText,
    setCurrentText,
    setCurrentContent,
    setLocalContent,
    setCurrentChars,
    setLocalChars,
    setCurrentWords,
    setLocalWords,
    clearCharsToDelete
  })(TextList);
