import React from 'react';
import { List, Segment } from 'semantic-ui-react';

const Stats = ({ items }) => (
  <Segment className='tablestats' textAlign='center' >
    <List relaxed items={items} size='big' />
  </Segment>
    );

Stats.propTypes = {

};

export default Stats;
