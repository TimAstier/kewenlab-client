import React from 'react';
import { TextArea } from 'semantic-ui-react';

const TextInput = ({ value, onChange, readOnly }) => {
  return (
    <TextArea
      placeholder="Write a text here..."
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

TextInput.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool.isRequired
};

export default TextInput;
