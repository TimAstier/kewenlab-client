import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { handleItemClick } from './operations';
import { TextItem } from '../.';

class TextItemsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.props.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  renderTextItem(textItem, i) {
    return (
      <TextItem
        order={textItem.order}
        title={textItem.title}
        id={textItem.id}
        handleItemClick={this.handleItemClick}
        active={this.props.currentTextId === textItem.id}
        key={i}
        projectId={this.props.currentProjectId}
      />
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
  textItems: PropTypes.array.isRequired,
  currentTextId: PropTypes.number.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    currentProjectId: state.get('projects').get('currentProjectId')
  };
}

export default connect(mapStateToProps, { handleItemClick })(TextItemsMenu);
