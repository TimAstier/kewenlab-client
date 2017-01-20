import React from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import CharItem from './charsarea/CharItem';
import isEmpty from 'lodash/isEmpty';

class CharsArea extends React.Component {

  renderCharItem(charItem, i) {
    return(
      <CharItem
        key={i}
        char={charItem.chinese}
        status={charItem.status || ''}
      />
    );
  }

  // TODO: Render in the right order
  renderCharItems() {
    const { currentChars } = this.props;
    if (!isEmpty(currentChars)) {
      return currentChars.map(this.renderCharItem);
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id='chars-area'>
        <h2>
          <Label basic circular color='black' className='main-label'>字</Label>
        </h2>
        <div className='table-wrapper'>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Char</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { this.renderCharItems() }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

CharsArea.propTypes = {
  currentChars: React.PropTypes.array.isRequired
}

function mapStateToProps(store) {
  return {
    currentChars: store.texts.currentText.currentChars
  }
}

export default connect(mapStateToProps)(CharsArea);
