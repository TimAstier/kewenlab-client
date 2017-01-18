import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea } from 'semantic-ui-react';
import { setCurrentTextContent } from '../actions/textEditorActions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  onChange(e) {
    this.props.setCurrentTextContent(e.target.value);
  }

  hasCurrentText() {
    return this.props.currentText.id;
  }

  placeholder() {
    return this.hasCurrentText() ? 'Write a text here...' : 'Select a text.';
  }

  render() {
    return (
      <div id="text-editor">
        <h2>课文</h2>
        <Form id="text-editor-form">
          <TextArea
            placeholder={this.placeholder()}
            value={this.props.currentText.content}
            onChange={this.onChange}
            readOnly={!this.hasCurrentText()}
          />
        </Form>
      </div>
    );
  }
}

TextEditor.propTypes = {
  currentText: React.PropTypes.object.isRequired,
  setCurrentTextContent: React.PropTypes.func.isRequired
}

function mapStateToProps(store) {
  return {
    currentText: store.texts.currentText
  }
}

export default connect(
  mapStateToProps,
  { setCurrentTextContent }
)(TextEditor);
