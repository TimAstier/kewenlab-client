import * as customUtils from '../custom'

const initialString = '你Hello guys\n!想186学.,\/#!\n?$%\^&\*:{}[]=\-_`~()' +
  '！…，；：＂、“”（）《》％·中@€£+àçèé~<>文。？吗？'

describe('custom utils', () => {

  describe('toChineseOnly', () => {
    it('should remove all non-Chinese chars from a string', () => {
      const newString = customUtils.toChineseOnly(initialString)
      expect(newString).toEqual('你想学中文吗')
    })
  })

  describe('preTokenization', () => {
    it('should do as toChineseOnly but replacing line returns by "$"', () => {
      const newString = customUtils.preTokenization(initialString)
      expect(newString).toEqual('你$想学$$中文吗')
    })
  })

  describe('toArrayOfUniqueChars', () => {
    it('should transform strings to array of unique Chinese chars', () => {
      const initialString = 'Mr Wang: 你好，你和我一起去看我爸爸好不好？'
      const expectedArray = ['你', '好', '和', '我', '一', '起',
        '去', '看', '爸', '不']
      expect(customUtils.toArrayOfUniqueChars(initialString))
        .toEqual(expectedArray)
    })
  })

  describe('removeDuplicates', () => {
    it('should remove duplicate from array of strings', () => {
      const intialArray = ['你好', '中国', '你好', '去',
        '你', '爸爸', '他', '去', '你好']
      const expectedArray = ['你好', '中国', '去', '你', '爸爸', '他']
      expect(customUtils.removeDuplicates(intialArray)).toEqual(expectedArray)
    })
  })

  describe('removeDolars', () => {
    expect(customUtils.removeDolars(['a', '$', 'c'])).toEqual(['a', 'c'])
  })

  describe('defineStatus', () => {

    it('should return "new" status', () => {
      const item = { texts: [{ id: 1 }] }
      expect(customUtils.defineStatus(item)).toEqual('new')
    })

    it('should return first occurence origin status', () => {
      const item = {
        texts: [
          { title: 'Greetings', textProjects: [{ order: 2 }] },
          { title: 'Hello', textProjects: [{ order: 1 }] },
          { title: 'Bye', textProjects: [{ order: 3 }] }
        ]
      }
      expect(customUtils.defineStatus(item)).toEqual('Hello')
    })

    it('should return "manuallydeleted" status for chars', () => {
      const item = { manuallyDeleted: true }
      expect(customUtils.defineStatus(item)).toEqual('manuallydeleted')
    })
  })

})
