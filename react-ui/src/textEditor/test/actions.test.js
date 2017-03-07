import * as actions from '../actions';
import * as t from '../actionTypes';

// TODO: test async actions
describe('textEditor actions', () => {
  describe('setLocalContent', () => {
    it('creates an action to set localContent', () => {
      const content = '我们来学中文。';
      const expectedAction = {
        type: t.SET_LOCAL_CONTENT,
        localContent: content
      };
      expect(actions.setLocalContent(content)).toEqual(expectedAction);
    });

    it('creates an action to set empty localContent', () => {
      const expectedAction = {
        type: t.SET_LOCAL_CONTENT,
        localContent: ''
      };
      expect(actions.setLocalContent()).toEqual(expectedAction);
    });
  });

  describe('setCurrentContent', () => {
    it('creates an action to set currentContent', () => {
      const content = '我们来学中文。';
      const expectedAction = {
        type: t.SET_CURRENT_CONTENT,
        currentContent: content
      };
      expect(actions.setCurrentContent(content)).toEqual(expectedAction);
    });

    it('creates an action to set empty currentContent', () => {
      const expectedAction = {
        type: t.SET_CURRENT_CONTENT,
        currentContent: ''
      };
      expect(actions.setCurrentContent()).toEqual(expectedAction);
    });
  });
});
