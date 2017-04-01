import React from 'react';
import { connect } from 'react-redux';
import { Form, Label, Loader } from 'semantic-ui-react';
import { getSaved } from '../../redux/textEditor';
import { showFlashMessageWithTimeout } from '../../actions/flashMessages';
import TextControls from '../../components/TextControls';
import TextInput from '../../components/TextInput';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hasCurrentText = this.hasCurrentText.bind(this);
  }

  hasCurrentText() {
    return this.props.currentTextId;
  }

  // TODO: Switch to readonly when isSaving
  render() {
    return (
      <div id="text-editor">
        <h2><Label basic color="black" className="main-label">
          {this.props.isSaving ? (
            <Loader active inline />
          ) : (
            '课文'
          )}
        </Label></h2>
        <Form id="text-editor-form">
          <TextInput
            value={this.props.localContent}
            onChange={this.props.onChange}
            readOnly={!this.hasCurrentText()}
          />
          {(process.env.REACT_APP_DEBUG === 'on') &&
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
  isSaving: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    localContent: state.get('textEditor').get('localContent'),
    currentTextId: state.get('sidebar').get('currentTextId'),
    saved: getSaved(state.get('textEditor')),
    isSaving: state.get('textEditor').get('isSaving')
  };
}

export default connect(
  mapStateToProps,
  {
    showFlashMessageWithTimeout,
  }
)(TextEditor);
