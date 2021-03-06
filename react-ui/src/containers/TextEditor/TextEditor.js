import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Checkbox, Loader } from 'semantic-ui-react';
import { getSaved } from '../../redux/textEditor';
import { showFlashMessageWithTimeout } from '../../redux/flashMessages';
import { TextControls, TextInput } from '../../components';
import { getCurrentTextTitle, updateLocalTitle, isCurrentTextBonus,
  updateBonus, saveTitle } from '../../redux/sidebar';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.hasCurrentText = this.hasCurrentText.bind(this);
  }

  hasCurrentText() {
    return this.props.currentTextId;
  }

  onTitleChange(e) {
    e.persist();
    const data = {
      textId: this.props.currentTextId,
      title: e.target.value
    };
    this.props.updateLocalTitle(data);
    clearTimeout(this.timer); // Needs to be out of the function scope
    this.timer = setTimeout(() => { this.props.saveTitle(data); }, 1000);
    return this.timer;
  }

  onBonusChange(e, checkboxData) {
    const data = {
      textId: this.props.currentTextId,
      checked: checkboxData.checked,
      currentProjectId: this.props.currentProjectId
    };
    return this.props.updateBonus(data);
  }

  // TODO: Switch to readonly when isSaving
  render() {
    let loader = null;
    if (this.props.isSaving) {
      loader = <Loader active inline="centered" size="tiny" />;
    }
    return (
      <div id="text-editor">
        <div id="text-settings">
          <div id="text-saving-status">
            {loader}
          </div>
          <div id="text-title">
            <Input
              placeholder="Title..."
              value={this.props.title}
              onChange={this.onTitleChange.bind(this)}
            />
          </div>
          <div id="text-bonus">
            <span>Bonus text</span>
            <Checkbox
              toggle
              onChange={this.onBonusChange.bind(this)}
              checked={this.props.isBonus}
              size="tiny"
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
  updateLocalTitle: PropTypes.func.isRequired,
  isBonus: PropTypes.bool.isRequired,
  updateBonus: PropTypes.func.isRequired,
  currentProjectId: PropTypes.number.isRequired,
  saveTitle: PropTypes.func.isRequired
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
  { showFlashMessageWithTimeout, updateLocalTitle, updateBonus, saveTitle }
)(TextEditor);
