import React from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';
import { getSaved } from '../reducer';
import { showFlashMessageWithTimeout } from '../../actions/flashMessages';
import TextControls from '../components/TextControls';
import TextInput from '../components/TextInput';
import DEBUG from '../../config/debug';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hasCurrentText = this.hasCurrentText.bind(this);
    this.placeholder = this.placeholder.bind(this);
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
    console.log(DEBUG);
    return (
      <div id="text-editor">
        <h2><Label basic color="black" className="main-label">课文</Label></h2>
        <Form id="text-editor-form">
          <TextInput
            placeholder={this.placeholder()}
            value={this.props.localContent}
            onChange={this.props.onChange}
            readOnly={!this.hasCurrentText()}
          />
          {DEBUG &&
            <TextControls onClick={this.props.save} saved={this.props.saved} />
          }
        </Form>
      </div>
    );
  }
}

TextEditor.propTypes = {
  currentTextId: React.PropTypes.number.isRequired,
  localContent: React.PropTypes.string.isRequired,
  saved: React.PropTypes.bool.isRequired,
  showFlashMessageWithTimeout: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    localContent: state.get('textEditor').get('localContent'),
    currentTextId: state.get('sidebar').get('currentTextId'),
    saved: getSaved(state.get('textEditor'))
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
  }
)(TextEditor);
