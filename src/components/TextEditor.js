import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea } from 'semantic-ui-react';
import { setCurrentTextContent } from '../actions/textEditorActions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.setCurrentTextContent(e.target.value);
  }

  render() {
    return (
      <div id="text-editor">
        <h2>课文</h2>
        <Form id="text-editor-form">
          <TextArea
            placeholder='Start writing a new text...'
            value={this.props.content}
            onChange={this.onChange}
          />
        </Form>
      </div>
    );
  }
}

TextEditor.propTypes = {
  content: React.PropTypes.string.isRequired,
  setCurrentTextContent: React.PropTypes.func.isRequired
}

function mapStateToProps(store) {
  return {
    content: store.texts.currentText.content
  }
}

export default connect(
  mapStateToProps,
  { setCurrentTextContent }
)(TextEditor);
