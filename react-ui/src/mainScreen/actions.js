import * as t from './actionTypes';

export function setAppScreenMode(mode) {
  return {
    type: t.SET_APP_SCREEN_MODE,
    mode
  };
}
