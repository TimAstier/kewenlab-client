import React from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Button, Icon, Label } from 'semantic-ui-react';
import { saveTextContent }
  from '../../actions/textEditorActions';
//import { getSaved } from '../../rootReducer';

//import { createStructuredSelector } from 'reselect';
import { setLocalContent } from '../actions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    //this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  onChange(e) {
    return this.props.setLocalContent(e.target.value);
    // In React, state changes are potentially asynchronous.
    // If you want to calculate some state that depends on the store state,
    // it is best to do this in a selector.
    // See https://lpasslack.gitbooks.io/react-applications-with-idiomatic
    // -redux/content/docs/10-Colocating_Selectors_with_Reducers.html
  }

  onClick(e) {
    e.preventDefault();
    //if (this.hasCurrentText()) {
      // TODO: Use serializers to define which attributes to send in payload
      const data = {
        id: this.props.currentText.id,
        content: this.props.localContent
      };
      return this.props.saveTextContent(data);
    // } else {
    //   return;
    // }
  }

  // hasCurrentText() {
  //   return this.props.currentText.id;
  // }

  placeholder() {
    const msg1 = 'Write a text here...';
    //const msg2 = '<-- Select a text or create a new one.';
    //return this.hasCurrentText() ? msg1 : msg2;
    return msg1;
  }

  render() {
    // Update readonly
    return (
      <div id="text-editor">
        <h2><Label basic color='black' className='main-label'>课文</Label></h2>
        <Form id="text-editor-form">
          <TextArea
            placeholder={this.placeholder()}
            value={this.localContent}
            onChange={this.onChange}
            readOnly={false}
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
//   currentText: React.PropTypes.object.isRequired,
   localContent: React.PropTypes.string.isRequired,
//   saved: React.PropTypes.bool.isRequired,
   setLocalContent: React.PropTypes.func.isRequired
//   saveTextContent: React.PropTypes.func.isRequired
 }

function mapStateToProps(state) {
   return {
       localContent: state.textEditor.localContent
//     currentText: store.texts.currentText,
//     saved: getSaved(store)
   }
}

export default connect(
  mapStateToProps,
  { setLocalContent, saveTextContent }
)(TextEditor);
