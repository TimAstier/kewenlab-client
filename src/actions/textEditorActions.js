import { SET_CURRENT_TEXT_CONTENT } from './types';

export function setCurrentTextContent(content) {
  return {
    type: SET_CURRENT_TEXT_CONTENT,
    content
  }
}
