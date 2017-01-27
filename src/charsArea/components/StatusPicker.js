import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function isActive(itemFilter, currentFilter) {
  return itemFilter === currentFilter;
}

const StatusPicker = ({ onFilterClick, visibilityFilter }) => (
  <Dropdown text='Status'>
    <Dropdown.Menu>
      <Dropdown.Item
        text='All'
        onClick={onFilterClick}
        value='all'
        active={isActive('all', visibilityFilter)}
      />
      <Dropdown.Item text='New'
        onClick={onFilterClick}
        value='new'
        active={isActive('new', visibilityFilter)}
      />
      <Dropdown.Item
        text='Not new'
        onClick={onFilterClick}
        value='notnew'
        active={isActive('notnew', visibilityFilter)}
      />
      <Dropdown.Item
        text='Not saved'
        onClick={onFilterClick}
        value='notsaved'
        active={isActive('notsaved', visibilityFilter)}
      />
    </Dropdown.Menu>
  </Dropdown>
);

StatusPicker.propTypes = {
  onFilterClick: React.PropTypes.func.isRequired,
  visibilityFilter: React.PropTypes.string.isRequired
};

export default StatusPicker;
