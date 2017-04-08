import { List, Map, fromJS } from 'immutable'
import createItemsReducerWithNamedType, * as actions from '../items'

// TODO: Continue refactoring this file (make tests shorter)

const charsReducer = createItemsReducerWithNamedType('CHARS')
const wordsReducer = createItemsReducerWithNamedType('WORDS')

const INITIAL_STATE = Map({
  localItems: List([]),
  currentItems: List([]),
  itemsToDelete: List([]),
  itemsToUpdate: List([]),
  visibilityFilter: 'all',
  isSaving: false
})

// Those tests are for chars and words
// actionCreators are tested indirectly
// high-order reducer is tested indirectly
describe('items reducer', () => {
  it('should return initial state', () => {
    expect(charsReducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('should set localItems', () => {
    const items = [{ id: 1 }, { id: 2 }]
    const charsAction = actions.setLocalChars(items)
    const wordsAction = actions.setLocalWords(items)
    expect(charsReducer(INITIAL_STATE, charsAction).get('localItems')).toEqual(fromJS(items))
    expect(wordsReducer(INITIAL_STATE, wordsAction).get('localItems')).toEqual(fromJS(items))
  })

  it('should set localItems in the right order', () => {
    const items = [{ order: 2}, { order: 0 }, { order: 1 }]
    const charsAction = actions.setLocalChars(items)
    const wordsAction = actions.setLocalWords(items)
    const expectedState = fromJS([{ order: 0 }, { order: 1 }, { order: 2 }])
    expect(charsReducer(INITIAL_STATE, charsAction).get('localItems')).toEqual(expectedState)
    expect(wordsReducer(INITIAL_STATE, wordsAction).get('localItems')).toEqual(expectedState)
  })

  it('should set currentItems', () => {
    const items = [{ id: 1 }, { id: 2 }]
    const charsAction = actions.setCurrentChars(items)
    const wordsAction = actions.setCurrentWords(items)
    expect(charsReducer(INITIAL_STATE, charsAction).get('currentItems')).toEqual(fromJS(items))
    expect(wordsReducer(INITIAL_STATE, wordsAction).get('currentItems')).toEqual(fromJS(items))
  })

  it('should set currentItems in the right order', () => {
    const items = [{ order: 2}, { order: 0 }, { order: 1 }]
    const charsAction = actions.setCurrentChars(items)
    const wordsAction = actions.setCurrentWords(items)
    const expectedState = fromJS([{ order: 0 }, { order: 1 }, { order: 2 }])
    expect(charsReducer(INITIAL_STATE, charsAction).get('currentItems')).toEqual(expectedState)
    expect(wordsReducer(INITIAL_STATE, wordsAction).get('currentItems')).toEqual(expectedState)
  })

  it('should clear itemsToDelete', () => {
    const initialState = Map({
      itemsToDelete: List([{ id: 1 }, { id: 2 }])
    })
    const charsAction = actions.clearCharsToDelete()
    const wordsAction = actions.clearWordsToDelete()
    expect(charsReducer(initialState, charsAction).get('itemsToDelete')).toEqual(List())
    expect(wordsReducer(initialState, wordsAction).get('itemsToDelete')).toEqual(List())
  })

  it('handles SET_ITEMS_VISIBILITY_FILTER', () => {
    const initialState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'all'
    })
    const charsAction = actions.setCharsVisibilityFilter('new')
    const wordsAction = actions.setWordsVisibilityFilter('new')
    const expectedState = Map({
      localItems: List(),
      currentItems: List(),
      itemsToDelete: List(),
      visibilityFilter: 'new'
    })

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
    expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
  })

  describe('ADD_NEW_LOCAL_ITEMS', () => {
    it('adds new items to localItems with the correct order', () => {
      const initialState = fromJS({
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
      })
      const charsAction = actions.addNewLocalChars(['你', '木', '水'])
      const wordsAction = actions.addNewLocalWords(['你', '木', '水'])
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' },
          { id: null, chinese: '他' },
          { id: null, chinese: '木', order: 1, status: 'notsaved' },
          { id: null, chinese: '水', order: 2, status: 'notsaved' }
        ],
        currentItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' }
        ],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })
  })

  describe('REMOVE_DELETED_LOCAL_ITEMS', () => {
    it('removes items from localItems and add them to itemsToDelete', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })
      // Simulates when a user deletes everything in the text input:
      const charsAction = actions.removeDeletedLocalChars([])
      const wordsAction = actions.removeDeletedLocalWords([])
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })

    it('does not add localItems to itemsToDelete', () => {
      const initialState = fromJS({
        localItems: [
          // a localItem
          { id: null, chinese: '二' },
          // a localItem that is in currentItems
          { id: 1, chinese: '三', manuallyAdded: false, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })
      // Simulates when a user deletes everything in the text input:
      const charsAction = actions.removeDeletedLocalChars([])
      const wordsAction = actions.removeDeletedLocalWords([])
      const expectedState = fromJS({
        localItems: [],
        currentItems: [],
        itemsToDelete: [
          { id: 1, chinese: '三', manuallyAdded: false, manuallyDeleted: false }
        ],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })

    it('does not do anything with manuallyAdded items', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: true, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })
      // Simulates when a user deletes everything in the text input:
      const charsAction = actions.removeDeletedLocalChars([])
      const wordsAction = actions.removeDeletedLocalWords([])
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: true, manuallyDeleted: false }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })

    it('does not do anything with manuallyDeleted items', () => {
      const initialState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: true }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })
      // Simulates when a user deletes everything in the text input:
      const charsAction = actions.removeDeletedLocalChars([])
      const wordsAction = actions.removeDeletedLocalWords([])
      const expectedState = fromJS({
        localItems: [
          { id: 1, chinese: '我', manuallyAdded: false, manuallyDeleted: true }
        ],
        currentItems: [],
        itemsToDelete: [],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })
  })

  describe('UPDATE_ITEMS_ORDER', () => {
    it('updates local order', () => {
      const initialState = fromJS({
        localItems: [
          { id: 3, chinese: '一', order: 0 },
          { id: 2, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [],
        itemsToDelete: [],
        itemsToUpdate: [],
        visibilityFilter: 'all'
      })
      const itemsArray = ['三', '一', '二']
      const charsAction = actions.updateCharsOrder(itemsArray)
      const expectedState = fromJS({
        localItems: [
          { id: 3, chinese: '一', order: 1 },
          { id: 2, chinese: '二', order: 2 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [],
        itemsToDelete: [],
        itemsToUpdate: [],
        visibilityFilter: 'all'
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
    })

    it('adds new-ordered-saved items to itemsToUpdate', () => {
      const initialState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 0 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: []
      })
      const itemsArray = ['三', '二', '一']
      const charsAction = actions.updateCharsOrder(itemsArray)
      const expectedState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 2 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [
          { id: 1, chinese: '三', order: 0 }
        ]
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
    })

    it('does not create duplicates in itemsToUpdate', () => {
      const initialState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 0 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 2 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [{ id: 1, chinese: '三', order: 2 }]
      })
      const itemsArray = ['三', '二', '一']
      const charsAction = actions.updateCharsOrder(itemsArray)
      const wordsAction = actions.updateWordsOrder(itemsArray)
      const expectedState = fromJS({
        localItems: [
          { id: null, chinese: '一', order: 2 },
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        currentItems: [
          { id: 0, chinese: '二', order: 1 },
          { id: 1, chinese: '三', order: 0 }
        ],
        itemsToUpdate: [
          { id: 1, chinese: '三', order: 0 }
        ]
      })

      expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
      expect(wordsReducer(initialState, wordsAction)).toEqual(expectedState)
    })
  })

  it('handles CLEAR_ITEMS_TO_UPDATE', () => {
    const initialState = fromJS({
      itemsToUpdate: ['a', 'b', 'c']
    })
    const charsAction = actions.clearCharsToUpdate()
    const expectedState = fromJS({
      itemsToUpdate: []
    })

    expect(charsReducer(initialState, charsAction)).toEqual(expectedState)
  })

  it('handles SAVE_ITEMS', () => {
    const intialState = Map({
      isSaving: false
    })
    const charsAction = { type: 'kewen-lab/items/SAVE_CHARS' }
    const expectedState = Map({
      isSaving: true
    })

    expect(charsReducer(intialState, charsAction)).toEqual(expectedState)
  })

  it('handles SAVE_ITEMS_SUCCESS', () => {
    const intialState = Map({
      isSaving: true
    })
    const charsAction = { type: 'kewen-lab/items/SAVE_CHARS_SUCCESS' }
    const expectedState = Map({
      isSaving: false
    })

    expect(charsReducer(intialState, charsAction)).toEqual(expectedState)
  })

  it('handles SAVE_ITEMS_FAILURE', () => {
    const intialState = Map({
      isSaving: true
    })
    const charsAction = { type: 'kewen-lab/items/SAVE_CHARS_FAILURE' }
    const expectedState = Map({
      isSaving: false
    })

    expect(charsReducer(intialState, charsAction)).toEqual(expectedState)
  })
})
