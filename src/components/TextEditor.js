import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Icon, Label } from 'semantic-ui-react';
import { setLocalContent, saveTextContent }
  from '../actions/textEditorActions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Add an isSaved state for currentText
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  onChange(e) {
    return this.props.setLocalContent(e.target.value);
  }

  onClick(e) {
    e.preventDefault();
    if (this.hasCurrentText()) {
      // TODO: Use serializers to define which attributes to send in payload
      const data = {
        id: this.props.currentText.id,
        content: this.props.localContent
      };
      return this.props.saveTextContent(data);
    } else {
      return;
    }
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
        <h2><Label basic color='black' className='main-label'>课文</Label></h2>
        <Form id="text-editor-form">
          <TextArea
            placeholder={this.placeholder()}
            value={this.props.localContent}
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
  localContent: React.PropTypes.string.isRequired,
  setLocalContent: React.PropTypes.func.isRequired,
  saveTextContent: React.PropTypes.func.isRequired
}

function mapStateToProps(store) {
  return {
    currentText: store.texts.currentText,
    localContent: store.texts.localData.localContent
  }
}

export default connect(
  mapStateToProps,
  { setLocalContent, saveTextContent }
)(TextEditor);
