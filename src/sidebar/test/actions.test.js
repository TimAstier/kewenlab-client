import * as t from '../actionTypes';
import * as actions from '../actions';

describe('sidebar actions', () => {
  it('creates an action to set currentTextId', () => {
    const text = { id: 1, title: 'Lesson 1', content: '你好', order: 2 };
    const expectedAction = {
      type: t.SET_CURRENT_TEXT_ID,
      currentTextId: text.id
    };
    expect(actions.setCurrentTextId(text)).toEqual(expectedAction);
  });

  it('creates an action to set textItems', () => {
    const textItems = [
      { id: 1, title: 'Lesson 1', order: 1 },
      { id: 2, title: 'Lesson 2', order: 1 },
      { id: 4, title: 'Lesson 3', order: 2 }
    ];
    const expectedAction = {
      type: t.SET_TEXT_ITEMS,
      textItems
    };
    expect(actions.setTextItems(textItems)).toEqual(expectedAction);
  });
});
