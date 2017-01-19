import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { getCurrentText, setCurrentText } from '../../actions/sidebarActions';

class TextList extends React.Component {
  constructor(props) {
    super(props);

    // Defining the state in the constructor
    // Note: The current best practice is to use local state to handle
    // the state of your user interface (UI) state rather than data.
    // http://bit.ly/2iE2rWh
    this.state = {
      activeItem: ''
    };

    // Binding the right context to the class methods
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
        this.props.setCurrentText(text, chars, words);
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
  textItems: React.PropTypes.array.isRequired
}

export default connect(null, { getCurrentText, setCurrentText })(TextList);
