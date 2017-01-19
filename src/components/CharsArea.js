import React from 'react';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';
import CharItem from './charsarea/CharItem';
import isEmpty from 'lodash/isEmpty';

class CharsArea extends React.Component {

  // TODO: Render in the right order
  renderCharItem(charItem, i) {
    return(
      <CharItem
        key={i}
        char={charItem.chinese}
        status={charItem.status || ''}
      />
    );
  }

  render() {
    const { chars } = this.props;
    return (
      <div id='chars-area'>
        <h2><Label basic circular color='black' className='main-label'>字</Label></h2>
        <div className='table-wrapper'>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Char</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { !isEmpty(chars) ? chars.map(this.renderCharItem) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

CharsArea.propTypes = {
  chars: React.PropTypes.array.isRequired
}

function mapStateToProps(store) {
  return {
    chars: store.texts.chars
  }
}

export default connect(mapStateToProps)(CharsArea);
