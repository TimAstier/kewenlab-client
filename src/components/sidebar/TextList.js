import React from 'react';
import { Menu } from 'semantic-ui-react';

class TextList extends React.Component {
  constructor(props) {
    super(props);

    // Defining the state in the constructor
    this.state = {
      activeItem: this.props.textItems[0].title
    };

    // Binding the right context to the class methods
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  renderTextItem(textItem, i) {
    const { activeItem } = this.state

    return(
      <Menu.Item
        key={i}
        name={textItem.title}
        active={activeItem === textItem.title}
        onClick={this.handleItemClick}
      />
    );
  }

  handleItemClick(e, { name }) {
    return this.setState({ activeItem: name });
  }

  render() {
    return (
      <div>
        { this.props.textItems.map(this.renderTextItem) }
      </div>
    );
  }
}

TextList.propTypes = {
  textItems: React.PropTypes.array.isRequired
}

export default TextList;
