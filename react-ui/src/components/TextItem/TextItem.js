import React, { PropTypes, Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';

export default class TextItem extends Component {
  render() {
    const { id, order, title, handleItemClick, active, projectId } = this.props;
    return (
      <Menu.Item
        active={active}
        onClick={handleItemClick}
        data={[id, projectId]}
      >
        <Label
          color="teal"
          size="large"
          circular
        >
          {order}
        </Label>
        {title}
      </Menu.Item>
    );
  }
}

TextItem.propTypes = {
  order: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  projectId: PropTypes.number.isRequired
};
