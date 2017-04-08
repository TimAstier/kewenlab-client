import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const WordControls = ({ saved, changeCount, refresh, save, localContent }) => {
  function onClick() {
    return refresh(localContent);
  }
  return (
    <div>
      <Button
        id="words-area-refresh-btn"
        circular icon="refresh"
        onClick={onClick}
      />
      <Button
        primary
        id="words-area-save-btn"
        disabled={saved}
        onClick={save}
      >
        <Icon name="save" />
        {`Save (${changeCount})`}
      </Button>
    </div>
  );
};

WordControls.propTypes = {
  refresh: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  saved: React.PropTypes.bool.isRequired,
  changeCount: React.PropTypes.number.isRequired,
  localContent: React.PropTypes.string.isRequired
};

export default WordControls;
