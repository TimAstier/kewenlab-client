import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

class TextEditor extends React.Component {
  render() {
    return (
      <div id="text-editor">
        <h2>课文</h2>
        <Form id="text-editor-form">
          <TextArea placeholder='Start writing a new text...' />
        </Form>
      </div>
    );
  }
}

export default TextEditor;
