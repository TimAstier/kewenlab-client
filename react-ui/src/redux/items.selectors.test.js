import * as s from './items';
import { fromJS } from 'immutable';

describe('items selectors', () => {
  it('getSaved returns false', () => {
    const state = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' },
        { id: null, chinese: '他' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(false);
  });

  it('getSaved returns true', () => {
    const state = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.getSaved(state)).toEqual(true);
  });

  it('countChanges', () => {
    const state = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' },
        { id: null, chinese: '水' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.countChanges(state)).toEqual(4);
  });

  it('getTotalItems', () => {
    const state = fromJS({
      localItems: [
        { id: 1, chinese: '我' },
        { id: null, chinese: '他' },
        { id: null, chinese: '木' }
      ],
      currentItems: [
        { id: 1, chinese: '我' },
        { id: 2, chinese: '你' }
      ],
      itemsToDelete: [{ id: 2, chinese: '你' }],
      visibilityFilter: 'all'
    });

    expect(s.getTotalItems(state)).toEqual(2);
  });

  it('countNewItems', () => {
    const state = fromJS({
      localItems: [],
      currentItems: [
        { id: 1, chinese: '我', texts: [] }, // new
        { id: 3, chinese: '谁', manuallyAdded: true }, // new
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] }, // not new
        { id: 4, chinese: '说', manuallyDeleted: true } // banned
      ],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.countNewItems(state)).toEqual(2);
  });

  it('filterLocalItems with "all" visibilityFilter', () => {
    const state = fromJS({
      localItems: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentItems: [],
      itemsToDelete: [],
      visibilityFilter: 'all'
    });

    expect(s.filterLocalItems(state)).toEqual([
      { id: null, chinese: '我' },
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
      { id: 3, chinese: '他', texts: [] }
    ]);
  });

  it('filterLocalItems with "new" visibilityFilter', () => {
    const state = fromJS({
      localItems: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [], manuallyAdded: false }
      ],
      currentItems: [],
      itemsToDelete: [],
      visibilityFilter: 'new'
    });

    expect(s.filterLocalItems(state)).toEqual([
      { id: 3, chinese: '他', texts: [], manuallyAdded: false }
    ]);
  });

  it('filterLocalItems with "notnew" visibilityFilter', () => {
    const state = fromJS({
      localItems: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentItems: [],
      itemsToDelete: [],
      visibilityFilter: 'notnew'
    });

    expect(s.filterLocalItems(state)).toEqual([
      { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] }
    ]);
  });

  it('filterLocalItems with "notsaved" visibilityFilter', () => {
    const state = fromJS({
      localItems: [
        { id: null, chinese: '我' },
        { id: 2, chinese: '你', texts: [{ title: 'Lesson 1' }] },
        { id: 3, chinese: '他', texts: [] }
      ],
      currentItems: [],
      itemsToDelete: [],
      visibilityFilter: 'notsaved'
    });

    expect(s.filterLocalItems(state)).toEqual([
      { id: null, chinese: '我' }
    ]);
  });

  it('filterLocalItems with "manuallydeleted" visibilityFilter', () => {
    const state = fromJS({
      localItems: [
        { id: null, chinese: '我' },
        { id: 2,
          chinese: '你',
          texts: [{ title: 'Lesson 1' }],
          manuallyDeleted: true
        },
        { id: 3, chinese: '他', texts: [], manuallyDeleted: false }
      ],
      currentItems: [],
      itemsToDelete: [],
      visibilityFilter: 'manuallydeleted'
    });

    expect(s.filterLocalItems(state)).toEqual([
      { id: 2,
        chinese: '你',
        texts: [{ title: 'Lesson 1' }],
        manuallyDeleted: true
      }
    ]);
  });
});
