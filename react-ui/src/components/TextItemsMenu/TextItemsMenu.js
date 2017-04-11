import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import { handleItemClick } from './operations';
import { TextItem } from '../.';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { reorder, updateTextItems }
  from '../../redux/sidebar';

class TextItemsMenu extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.props.handleItemClick.bind(this);
    this.renderTextItem = this.renderTextItem.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    return this.props.reorder({ dragIndex, hoverIndex });
  }

  onEndDrag() {
    const data = {
      textItems: this.props.textItems,
      projectId: this.props.currentProjectId
    };
    // Save order in DB
    return this.props.updateTextItems(data);
  }

  renderTextItem(textItem, i) {
    return (
      <TextItem
        displayedOrder={textItem.displayedOrder}
        title={textItem.title}
        id={textItem.id}
        handleItemClick={this.handleItemClick}
        active={this.props.currentTextId === textItem.id}
        key={textItem.id}
        index={i}
        projectId={this.props.currentProjectId}
        moveCard={this.moveCard.bind(this)}
        onEndDrag={this.onEndDrag.bind(this)}
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
  handleItemClick: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired,
  updateTextItems: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentTextId: state.get('sidebar').get('currentTextId'),
    currentProjectId: state.get('projects').get('currentProjectId')
  };
}

TextItemsMenu = DragDropContext(HTML5Backend)(TextItemsMenu);
export default connect(mapStateToProps, {
  handleItemClick,
  reorder,
  updateTextItems
})(TextItemsMenu);
