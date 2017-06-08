import React from 'react';
import { Segment, Form, Button, Radio } from 'semantic-ui-react';

const SuggestionForm = ({checked, value, handleChange,
  handleCheck, hidden, onClick, isFetching}) => {
  return (
    <Segment raised id="suggestion-form">
      <Form>
        <Form.Field>
          <label>Include unused words and chars from previous text(s)</label>
          <Radio
            toggle
            checked={checked}
            onChange={handleCheck}
          />
        </Form.Field>
        <Form.Field hidden={hidden}>
          <label>Number of text(s) to consider</label>
          <input
            placeholder="0"
            value={(value === 0) ? '' : value}
            onChange={handleChange}
          />
        </Form.Field>
        <Button
          type="submit"
          onClick={onClick}
          loading={isFetching}
          disabled={isFetching}
        >
          Find suggestions
        </Button>
      </Form>
    </Segment>
  );
};

SuggestionForm.propTypes = {
  checked: React.PropTypes.bool.isRequired,
  value: React.PropTypes.number.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleCheck: React.PropTypes.func.isRequired,
  hidden: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  currentTextId: React.PropTypes.number.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

export default SuggestionForm;
