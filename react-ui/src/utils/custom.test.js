import * as customUtils from './custom';

describe('custom utils', () => {
  describe('toChineseOnly', () => {
    it('removes all non-Chinese chars from a string', () => {
      const initialString = '你Hello guys!想186学.,\/#!?$%\^&\*;:{}[]=\-_`~()' +
        '！…，；：＂、“”（）《》％·中@€£+àçèé~<>文。？吗？';
      const newString = customUtils.toChineseOnly(initialString);

      expect(newString).toEqual('你想学中文吗');
    });
  });

  describe('toArrayOfUniqueChars', () => {
    it('transforms strings to array of unique Chinese chars', () => {
      const initialString = 'Mr Wang: 你好，你和我一起去看我爸爸好不好？';
      const expectedArray = ['你', '好', '和', '我', '一', '起',
        '去', '看', '爸', '不'];

      expect(customUtils.toArrayOfUniqueChars(initialString))
        .toEqual(expectedArray);
    });
  });

  describe('removeDuplicates', () => {
    it('removes duplicate from array of strings', () => {
      const intialArray = ['你好', '中国', '你好', '去',
        '你', '爸爸', '他', '去', '你好'];
      const expectedArray = ['你好', '中国', '去', '你', '爸爸', '他'];

      expect(customUtils.removeDuplicates(intialArray)).toEqual(expectedArray);
    });
  });

  describe('defineStatus', () => {
    it('returns "notsaved" status', () => {
      const item = {
        id: null,
        chinese: '一',
      };

      expect(customUtils.defineStatus(item)).toEqual('notsaved');
    });

    it('returns "new" status', () => {
      const item = {
        id: 1,
        chinese: '一',
        textId: 1,
        order: 1,
        manuallyAdded: false,
        manuallyDeleted: false,
        texts: []
      };

      expect(customUtils.defineStatus(item)).toEqual('new');
    });

    it('returns first occurence origin status', () => {
      const item = {
        id: 1,
        chinese: '的',
        textId: 1,
        order: 1,
        manuallyAdded: false,
        manuallyDeleted: false,
        texts: [
          { order: 1, title: 'Lesson 1' },
          { order: 2, title: 'Lesson 2' },
          { order: 3, title: 'Lesson 3' }
        ]
      };

      expect(customUtils.defineStatus(item)).toEqual('Text #1');
    });

    it('returns "manuallydeleted" status for chars', () => {
      const item = {
        id: 1,
        chinese: '一',
        textId: 1,
        order: 1,
        manuallyAdded: false,
        manuallyDeleted: true,
        texts: [{ order: 1, title: 'Lesson 1' }]
      };

      expect(customUtils.defineStatus(item)).toEqual('manuallydeleted');
    });
  });
});
