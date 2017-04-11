import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Checkbox } from 'semantic-ui-react';
import { getSaved } from '../../redux/textEditor';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { TextControls, TextInput } from '../../components';
import { getCurrentTextTitle, updateTitle, isCurrentTextBonus, updateBonus }
  from '../../redux/sidebar';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hasCurrentText = this.hasCurrentText.bind(this);
  }

  hasCurrentText() {
    return this.props.currentTextId;
  }

  onTitleChange(e) {
    // TODO: Save in DB
    return this.props.updateTitle(this.props.currentTextId, e.target.value);
  }

  onBonusChange(e, data) {
    // TODO: Save in DB
    return this.props.updateBonus(this.props.currentTextId, data.checked);
  }

  // TODO: Switch to readonly when isSaving
  render() {
    return (
      <div id="text-editor">
        <div id="text-settings">
          <div id="text-title">
            <Input
              placeholder="Title..."
              value={this.props.title}
              onChange={this.onTitleChange.bind(this)}
              size="large"
            />
          </div>
          <div id="text-bonus">
            <span>Bonus text</span>
            <Checkbox
              toggle
              onChange={this.onBonusChange.bind(this)}
              checked={this.props.isBonus}
            />
          </div>
        </div>
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
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired,
  isBonus: PropTypes.bool.isRequired,
  updateBonus: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    localContent: state.get('textEditor').get('localContent'),
    currentTextId: state.get('sidebar').get('currentTextId'),
    saved: getSaved(state.get('textEditor')),
    isSaving: state.get('textEditor').get('isSaving'),
    title: getCurrentTextTitle(state.get('sidebar')),
    isBonus: isCurrentTextBonus(state.get('sidebar'))
  };
}

export default connect(
  mapStateToProps,
  { showFlashMessageWithTimeout, updateTitle, updateBonus }
)(TextEditor);
