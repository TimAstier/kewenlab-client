import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Icon, Label } from 'semantic-ui-react';
import { setLocalContent, saveTextContent } from '../actions';
import { getSaved } from '../../rootReducer';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

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
        id: this.props.currentTextId,
        content: this.props.localContent
      };
      return this.props.saveTextContent(data);
     } else {
       return;
     }
  }

  hasCurrentText() {
    return this.props.currentTextId;
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
            disabled={this.props.saved}
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
   currentTextId: React.PropTypes.number.isRequired,
   localContent: React.PropTypes.string.isRequired,
   saved: React.PropTypes.bool.isRequired,
   setLocalContent: React.PropTypes.func.isRequired,
   saveTextContent: React.PropTypes.func.isRequired
 }

function mapStateToProps(state) {
   return {
       localContent: state.textEditor.localContent,
       currentTextId: state.sidebar.currentTextId,
       saved: getSaved(state)
   }
}

export default connect(
  mapStateToProps,
  { setLocalContent, saveTextContent }
)(TextEditor);
