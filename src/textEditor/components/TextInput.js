import React from 'react';
import { TextArea } from 'semantic-ui-react';

const TextInput = ({ placeholder, value, onChange, readOnly }) => {
  return (
    <TextArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

TextInput.propTypes = {
  placeholder: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  readOnly: React.PropTypes.bool.isRequired
};

export default TextInput;
