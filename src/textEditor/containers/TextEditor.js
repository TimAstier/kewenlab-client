import React from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';
import { setLocalContent, saveTextContent,
  setCurrentContent } from '../actions';
import { getSaved } from '../reducer';
import { addFlashMessage } from '../../actions/flashMessages';
import { addNewLocalChars, removeDeletedLocalChars }
  from '../../charsArea/actions';
import isEmpty from 'lodash/isEmpty';
import { toArrayOfUniqueChars } from '../../utils/custom';
import TextControls from '../components/TextControls';
import TextInput from '../components/TextInput';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
  }

  onChange(e) {
    const charsArray = toArrayOfUniqueChars(e.target.value);
    this.props.removeDeletedLocalChars(charsArray);
    if (!isEmpty(charsArray)) {
      this.props.addNewLocalChars(charsArray);
    }
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
      return this.props.saveTextContent(data).then(
        (res) => {
          this.props.setCurrentContent(this.props.localContent);
        },
        (err) => {
          this.props.addFlashMessage({
            type: 'error',
            text: 'Error: could not save text on the server.'
          });
        }
      );
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

  // TODO: Switch to readonly when isSaving
  render() {
    return (
      <div id="text-editor">
        <h2><Label basic color='black' className='main-label'>课文</Label></h2>
        <Form id="text-editor-form">
          <TextInput
            placeholder={this.placeholder()}
            value={this.props.localContent}
            onChange={this.onChange}
            readOnly={!this.hasCurrentText()}
          />
          <TextControls onClick={this.onClick} saved={this.props.saved} />
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
   saveTextContent: React.PropTypes.func.isRequired,
   setCurrentContent: React.PropTypes.func.isRequired,
   addFlashMessage: React.PropTypes.func.isRequired,
   addNewLocalChars: React.PropTypes.func.isRequired,
   removeDeletedLocalChars: React.PropTypes.func.isRequired
 }

function mapStateToProps(state) {
   return {
       localContent: state.get('textEditor').get('localContent'),
       currentTextId: state.get('sidebar').get('currentTextId'),
       saved: getSaved(state.get('textEditor'))
   }
}

export default connect(
  mapStateToProps,
  {
    setLocalContent,
    saveTextContent,
    setCurrentContent,
    addFlashMessage,
    addNewLocalChars,
    removeDeletedLocalChars
  }
)(TextEditor);
