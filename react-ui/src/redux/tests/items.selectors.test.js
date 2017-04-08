import * as s from '../items'
import { fromJS } from 'immutable'

describe('items selectors', () => {

  describe('getSaved', () => {

    it('should return false when localItems and currentItems are different', () => {
      const state = fromJS({
        localItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' },
          { id: null, chinese: '他' }
        ],
        currentItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' }
        ]
      })
      expect(s.getSaved(state)).toEqual(false)
    })

    it('should return true when localItems and currentItems are the same', () => {
      const state = fromJS({
        localItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' }
        ],
        currentItems: [
          { id: 1, chinese: '我' },
          { id: 2, chinese: '你' }
        ]
      })
      expect(s.getSaved(state)).toEqual(true)
    })

  })

  describe('countChanges', () => {
    it('should return the sum of newItems and itemsToDelete', () => {
      const state = fromJS({
        localItems: [
          { id: 1, chinese: '我' },
          { id: null, chinese: '他' },
          { id: null, chinese: '木' },
          { id: null, chinese: '水' }
        ],
        itemsToDelete: [{ id: 2, chinese: '你' }]
      })
      expect(s.countChanges(state)).toEqual(4)
    })
  })

  describe('getTotalItems', () => {
    it('should count all currentItems minus manuallyDeleted items', () => {
      const state = fromJS({
        currentItems: [
          { id: 1, chinese: '我', status: 'new' },
          { id: 2, chinese: '你', status: 'new' },
          { id: 3, chinese: '他', status: 'manuallydeleted' },
        ]
      })
      expect(s.getTotalItems(state)).toEqual(2)
    })
  })

  describe('countNewItems', () => {
    it('should count currentItems with "new" status', () => {
      const state = fromJS({
        currentItems: [
          { id: 1, chinese: '我', status: 'Text #1' },
          { id: null, chinese: '谁', status: 'new' },
          { id: null, chinese: '你', status: 'new' },
          { id: 4, chinese: '说', status: 'manuallydeleted' }
        ]
      })
      expect(s.countNewItems(state)).toEqual(2)
    })
  })

  describe('filterLocalItems', () => {
    const localItems = [
      { id: 1, chinese: '我', status: 'Text #1' },
      { id: 2, chinese: '谁', status: 'new' },
      { id: 3, chinese: '你', status: 'new' },
      { id: 4, chinese: '说', status: 'manuallydeleted' },
      { id: null, chinese: '囧', status: 'notsaved' }
    ]
    const getState = filter => fromJS({ localItems, visibilityFilter: filter })

    it('should handle "all" visibilityFilter', () => {
      expect(s.filterLocalItems(getState('all'))).toEqual([
        { id: 1, chinese: '我', status: 'Text #1' },
        { id: 2, chinese: '谁', status: 'new' },
        { id: 3, chinese: '你', status: 'new' },
        { id: null, chinese: '囧', status: 'notsaved' }
      ])
    })

    it('should handle "new" visibilityFilter', () => {
      expect(s.filterLocalItems(getState('new'))).toEqual([
        { id: 2, chinese: '谁', status: 'new' },
        { id: 3, chinese: '你', status: 'new' },
      ])
    })

    it('should handle "notnew" visibilityFilter', () => {
      expect(s.filterLocalItems(getState('notnew'))).toEqual([
        { id: 1, chinese: '我', status: 'Text #1' }
      ])
    })

    it('should handle "notsaved" visibilityFilter', () => {
      expect(s.filterLocalItems(getState('notsaved'))).toEqual([
        { id: null, chinese: '囧', status: 'notsaved' }
      ])
    })

    it('should handle "manuallydeleted" visibilityFilter', () => {
      expect(s.filterLocalItems(getState('manuallydeleted'))).toEqual([
        { id: 4, chinese: '说', status: 'manuallydeleted' }
      ])
    })

  })

})
