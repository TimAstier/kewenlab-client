import React from 'react';
import { TextArea } from 'semantic-ui-react';

const TextInput = ({ placeholder, value, onChange, readOnly }) => {
  return(
    <TextArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}

export default TextInput;
