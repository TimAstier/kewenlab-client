// react-router-redux routeReducer does not work with Immutable.js.
// You need to use a custom reducer (https://github.com/gajus/redux-immutable)
import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const INITIAL_STATE = Immutable.fromJS({
  locationBeforeTransitions: null
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }
  return state;
}
