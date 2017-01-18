import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import { setCurrentTextContent, saveTextContent }
  from '../actions/textEditorActions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  onChange(e) {
    this.props.setCurrentTextContent(e.target.value);
  }

  onClick(e) {
    e.preventDefault();
    // TODO: Avoid ending the whole currentText object in payload
    this.props.saveTextContent(this.props.currentText);
  }

  hasCurrentText() {
    return this.props.currentText.id;
  }

  placeholder() {
    const msg1 = 'Write a text here...';
    const msg2 = '<-- Select a text or create a new one.';
    return this.hasCurrentText() ? msg1 : msg2;
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
          <Button
            size='big'
            primary
            id='text-editor-save-btn'
            onClick={this.onClick}
          >
            <Icon name='save' />
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

TextEditor.propTypes = {
  currentText: React.PropTypes.object.isRequired,
  setCurrentTextContent: React.PropTypes.func.isRequired,
  saveTextContent: React.PropTypes.func.isRequired
}

function mapStateToProps(store) {
  return {
    currentText: store.texts.currentText
  }
}

export default connect(
  mapStateToProps,
  { setCurrentTextContent, saveTextContent }
)(TextEditor);
