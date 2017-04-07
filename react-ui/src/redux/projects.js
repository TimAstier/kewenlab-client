import { Map, List, fromJS } from 'immutable';
import axios from 'axios';
import { deserializeProjects } from '../utils/deserializer';

// Action Types
const SET = 'kewen-lab/projects/SET';
const SET_CURRENT_PROJECT_ID = 'kewen-lab/sidebar/SET_CURRENT_PROJECT_ID';
// const FETCH = 'kewen-lab/projects/FETCH';
// const FETCH_SUCCESS = 'kewen-lab/projects/FETCH_SUCCESS';
// const FETCH_FAILURE = 'kewen-lab/projects/FETCH_FAILURE';

// Reducer
const INITIAL_STATE = Map({
  items: List(),
  currentProjectId: 0
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET:
      return state.set('items', fromJS(action.items));
    case SET_CURRENT_PROJECT_ID:
      return state.set('currentProjectId', action.id);
    default:
      return state;
  }
}

// Action Creators

export function fetch(userId) {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${userId}`);
}

export function set(projects) {
  return {
    type: SET,
    items: deserializeProjects(projects)
  };
}

export function setCurrentProjectId(id) {
  return {
    type: SET_CURRENT_PROJECT_ID,
    id
  };
}
