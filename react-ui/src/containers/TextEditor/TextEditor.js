import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Label, Loader } from 'semantic-ui-react';
import { getSaved } from '../../redux/textEditor';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { TextControls, TextInput } from '../../components';

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
  currentTextId: PropTypes.number.isRequired,
  localContent: PropTypes.string.isRequired,
  saved: PropTypes.bool.isRequired,
  showFlashMessageWithTimeout: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
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
  { showFlashMessageWithTimeout }
)(TextEditor);
