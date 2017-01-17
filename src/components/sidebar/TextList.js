import React from 'react';
import { Menu } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';

class TextList extends React.Component {
  constructor(props) {
    super(props);

    // Defining the state in the constructor
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
    const textItems = this.props.textItems;
    return (
      <div>
        { !isEmpty(textItems) ? textItems.map(this.renderTextItem) : null }
      </div>
    );
  }
}

TextList.propTypes = {
  textItems: React.PropTypes.array.isRequired
}

export default TextList;
