import { List, Map, fromJS } from 'immutable';
import axios from 'axios';
import apiCall from '../helpers/apiCall';
import { deserializeTexts } from '../utils/deserializer';
import { showFlashMessageWithTimeout } from './flashMessages';
import { setDisplayedOrder, refreshOrders } from '../utils/custom';

// Actions Types
const SET = 'kewen-lab/sidebar/SET';
const SET_CURRENT_TEXT_ID = 'kewen-lab/sidebar/SET_CURRENT_TEXT_ID';
const FETCH = 'kewen-lab/sidebar/FETCH';
const FETCH_SUCCESS = 'kewen-lab/sidebar/FETCH_SUCCESS';
const FETCH_FAILURE = 'kewen-lab/sidebar/FETCH_FAILURE';
const REORDER = 'kewen-lab/sidebar/REORDER';
const UPDATE = 'kewen-lab/sidebar/UPDATE';
const REFRESH_DISPLAYED_ORDERS = 'kewen-lab/sidebar/REFRESH_DISPLAYED_ORDERS';
const UPDATE_FAIL = 'kewen-lab/sidebar/UPDATE_FAIL';
const UPDATE_LOCAL_TITLE = 'kewen-lab/sidebar/UPDATE_LOCAL_TITLE';
const UPDATE_BONUS_SUCCESS = 'kewen-lab/sidebar/UPDATE_BONUS_SUCCESS';
const REFRESH_ORDERS = 'kewen-lab/sidebar/REFRESH_ORDERS';

// Reducer
const INITIAL_STATE = Map({
  textItems: List([]),
  currentTextId: 0,
  isFetching: false
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET:
      return state.set('textItems', List(action.textItems));
    case SET_CURRENT_TEXT_ID:
      return state.set('currentTextId', action.currentTextId);
    case FETCH:
      return state.set('isFetching', true);
    case FETCH_SUCCESS:
      return state.set('isFetching', false);
    case FETCH_FAILURE:
      return state.set('isFetching', false);
    case REORDER:
      const { dragIndex, hoverIndex } = action.data;
      const array = state.get('textItems').toJS();
      array.splice(hoverIndex, 0, array.splice(dragIndex, 1)[0]);
      return state.set('textItems', fromJS(array));
    case REFRESH_DISPLAYED_ORDERS:
      const textItems = state.get('textItems').toJS();
      return state.set('textItems', fromJS(setDisplayedOrder(textItems)));
    case REFRESH_ORDERS:
      return state.set('textItems', fromJS(refreshOrders(
        state.get('textItems').toJS()
      )));
    case UPDATE_LOCAL_TITLE:
      return state.set('textItems',
        fromJS(state.get('textItems').toJS().map(item => {
          if (item.id === action.textId) {
            item.title = action.title;
          }
          return item;
        })
      ));
    case UPDATE_BONUS_SUCCESS:
      return state.set('textItems',
        fromJS(state.get('textItems').toJS().map(item => {
          if (item.id === action.textId) {
            item.bonus = action.bonus;
          }
          return item;
        })
      ));
    default:
      return state;
  }
}

// Action Creators
export function setTextItems(textItems) {
  return { type: SET, textItems: deserializeTexts(textItems) };
}

export function setCurrentTextId(text) {
  return { type: SET_CURRENT_TEXT_ID, currentTextId: text.id };
}

export function getCurrentText(textId, projectId) {
  return () => {
    return axios.all([
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${textId}`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${textId}/chars/${projectId}`),
      axios.get(`${process.env.REACT_APP_API_URL}/api/texts/${textId}/words/${projectId}`)
    ]);
  };
}

export function createNewText(data) {
  return () => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/texts`, data);
  };
}

export function fetch(projectId) {
  return dispatch => {
    dispatch({ type: FETCH });
    return axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}/texts`);
  };
}

export function fetchSuccess(data) {
  return dispatch => {
    dispatch({ type: FETCH_SUCCESS });
    return dispatch(setTextItems(data.texts));
  };
}

export function fetchFailure() {
  return { type: FETCH_FAILURE };
}

export function getTextItems(data) {
  return apiCall(data, fetch, fetchSuccess, fetchFailure);
}

export function addText(data) {
  const fail = () => { return { type: 'kewen-lab/addText/FAIL' }; };
  return apiCall(data, createNewText, getTextItems, fail);
}

export function reorder(data) {
  return {
    type: REORDER,
    data
  };
}

function update(data) {
  // Add localIndex to data to send to the server
  let textItemsToUpdate = data.textItems.map((t, i) => {
    t.localIndex = i + 1;
    return t;
  });

  // Consider only textItems with a localIndex different than the order in DB
  textItemsToUpdate = textItemsToUpdate.filter(t => {
    return t.localIndex !== t.order;
  });

  return dispatch => {
    dispatch({ type: UPDATE });
    return axios.put(`${process.env.REACT_APP_API_URL}/api/projects/${data.projectId}/texts`, textItemsToUpdate);
  };
}

function updateSuccess() {
  return dispatch => {
    dispatch({ type: REFRESH_ORDERS });
    dispatch({ type: REFRESH_DISPLAYED_ORDERS });
    dispatch(showFlashMessageWithTimeout({
      type: 'success',
      text: 'Texts reordered'
    }, 1000));
  };
}

function updateFail() {
  return { type: UPDATE_FAIL };
}

export function updateTextItems(data) {
  return apiCall(data, update, updateSuccess, updateFail);
}

export function updateLocalTitle(data) {
  return { type: UPDATE_LOCAL_TITLE, textId: data.textId, title: data.title };
}

function updateTextBonus(data) {
  return () => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/bonus`, data);
  };
}

function updateTextBonusSuccess(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_BONUS_SUCCESS,
      textId: data.affected[1][0].textId,
      bonus: data.affected[1][0].bonus
    });
    return dispatch({ type: REFRESH_DISPLAYED_ORDERS });
  };
}

export function updateBonus(data) {
  const fail = () => { return { type: 'kewen-lab/sidebar/UPDATE_BONUS_FAIL' }; };
  return apiCall(data, updateTextBonus, updateTextBonusSuccess, fail);
}

function saveTextTitle(data) {
  return () => {
    return axios.put(`${process.env.REACT_APP_API_URL}/api/texts/${data.textId}/title`, data);
  };
}

function saveTextTitleSuccess() {
  return dispatch => {
    dispatch(showFlashMessageWithTimeout({
      type: 'success',
      text: 'Title saved'
    }, 1000));
  };
}

export function saveTitle(data) {
  const fail = () => { return { type: 'kewen-lab/sidebar/SAVE_TITLE_FAIL' }; };
  return apiCall(data, saveTextTitle, saveTextTitleSuccess, fail);
}
// Selectors

export function getCurrentTextTitle(state = INITIAL_STATE) {
  const currentTextId = state.get('currentTextId');
  const textItems = state.get('textItems').toJS();
  return textItems.find(obj => obj.id === currentTextId).title;
}

export function isCurrentTextBonus(state = INITIAL_STATE) {
  const currentTextId = state.get('currentTextId');
  const textItems = state.get('textItems').toJS();
  return textItems.find(obj => obj.id === currentTextId).bonus;
}
