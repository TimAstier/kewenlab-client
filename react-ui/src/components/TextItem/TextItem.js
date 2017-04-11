import React, { PropTypes, Component } from 'react';
import { compose } from 'redux';
import { Menu, Label } from 'semantic-ui-react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../../ItemTypes';

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  },
  endDrag(props) {
    return props.onEndDrag();
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive order searches.
    monitor.getItem().index = hoverIndex;
  },
};

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
});

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

class TextItem extends Component {

  render() {
    const { id, displayedOrder, title, handleItemClick, active, projectId,
      isDragging, connectDragSource, connectDropTarget,
      connectDragPreview, bonus } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDropTarget(connectDragPreview(
      <div style={{opacity}}>
        <Menu.Item
          active={active}
          onClick={handleItemClick}
          data={[id, projectId]}
          className="text-item"
        >
          <div className="title">
            {title}
          </div>
          {connectDragSource(
            <div className="label">
              <Label
                color={bonus ? 'blue' : 'teal'}
                size="large"
                circular
              >
                {displayedOrder}
              </Label>
            </div>
          )}
        </Menu.Item>
      </div>
    ));
  }
}

TextItem.propTypes = {
  displayedOrder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  projectId: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onEndDrag: PropTypes.func.isRequired,
  bonus: PropTypes.bool.isRequired
};

export default compose(
  DropTarget(ItemTypes.TEXT_ITEM, cardTarget, collectTarget),
  DragSource(ItemTypes.TEXT_ITEM, cardSource, collectSource)
)(TextItem);
