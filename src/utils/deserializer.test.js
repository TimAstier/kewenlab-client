import { deserializeChars, deserializeWords } from './deserializer';

describe('deserializer', () => {

  it('has a working deserializeChars function', () => {
    const charsArray = [{
      id: 1,
      chinese: '一',
      charText: {
        id: 12,
        charId: 1,
        textId: 1,
        order: 1,
        manuallyAdded: false,
        manuallyDeleted: false,
        createdAt: 'a date',
        updatedAt: 'a date'
      },
      texts: []
    }, {
      id: 2,
      chinese: '二',
      charText: {
        id: 13,
        charId: 2,
        textId: 1,
        order: 2,
        manuallyAdded: false,
        manuallyDeleted: true,
        createdAt: 'a date',
        updatedAt: 'a date'
      },
      texts: []
    }];

    const expectedArray = [{
      id: 1,
      chinese: '一',
      textId: 1,
      charTextId: 12,
      order: 1,
      manuallyAdded: false,
      manuallyDeleted: false,
      texts: []
    }, {
      id: 2,
      chinese: '二',
      textId: 1,
      charTextId: 13,
      order: 2,
      manuallyAdded: false,
      manuallyDeleted: true,
      texts: []
    }];

    expect(deserializeChars(charsArray)).toEqual(expectedArray);
  });

  it('has a working deserializeWords function', () => {
    const wordsArray = [{
      id: 1,
      chinese: '一',
      wordText: {
        id: 12,
        wordId: 1,
        textId: 1,
        order: 1,
        manuallyAdded: false,
        manuallyDeleted: false,
        createdAt: 'a date',
        updatedAt: 'a date'
      },
      texts: []
    }, {
      id: 2,
      chinese: '二',
      wordText: {
        id: 13,
        wordId: 2,
        textId: 1,
        order: 2,
        manuallyAdded: false,
        manuallyDeleted: true,
        createdAt: 'a date',
        updatedAt: 'a date'
      },
      texts: []
    }];

    const expectedArray = [{
      id: 1,
      chinese: '一',
      textId: 1,
      wordTextId: 12,
      order: 1,
      manuallyAdded: false,
      manuallyDeleted: false,
      texts: []
    }, {
      id: 2,
      chinese: '二',
      textId: 1,
      wordTextId: 13,
      order: 2,
      manuallyAdded: false,
      manuallyDeleted: true,
      texts: []
    }];

    expect(deserializeWords(wordsArray)).toEqual(expectedArray);
  });

});
