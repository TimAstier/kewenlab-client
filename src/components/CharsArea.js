import React from 'react';
import { Table } from 'semantic-ui-react';
import CharItem from './charsarea/CharItem';
import isEmpty from 'lodash/isEmpty';

class CharsArea extends React.Component {

  renderCharItem(charItem, i) {
    return(
      <CharItem
        key={i}
        char={charItem.char}
        status={charItem.status}
      />
    );
  }

  render() {
    // TODO: Take data from the server
    // Fake Data
    const charItems = [
      { char: '你', status: '' },
      { char: '我', status: 'New' },
      { char: '他', status: 'New' },
      { char: '爱', status: '' },
      { char: '中', status: '' },
      { char: '才', status: 'New' }
    ];

    return (
      <div id='chars-area'>
        <h2>字</h2>
        <div className='table-wrapper'>
          <Table celled>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell>Char</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { !isEmpty(charItems) ? charItems.map(this.renderCharItem) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }

}

export default CharsArea;
