import * as t from './actionTypes';

export function setLocalContent(content) {
  return {
    type: t.SET_LOCAL_CONTENT,
    localContent: content
  }
}
