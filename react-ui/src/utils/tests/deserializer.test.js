import { deserializeChars, deserializeWords } from '../deserializer'

describe('deserializers', () => {

  it('should have a working deserializeChars function', () => {
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
      texts: [
        { title: 'Greetings', textProjects: [{ order: 2 }] },
        { title: 'Hello', textProjects: [{ order: 1 }] },
        { title: 'Bye', textProjects: [{ order: 3 }] }
      ]
    }]
    const expectedArray = [{
      id: 1,
      chinese: '一',
      textId: 1,
      charTextId: 12,
      order: 1,
      manuallyAdded: false,
      manuallyDeleted: false,
      status: 'Text #1'
    }]
    expect(deserializeChars(charsArray)).toEqual(expectedArray)
  })

  it('should have a working deserializeWords function', () => {
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
      texts: [ { title: 'Greetings', textProjects: [{ order: 2 }] } ]
    }]
    const expectedArray = [{
      id: 1,
      chinese: '一',
      textId: 1,
      wordTextId: 12,
      order: 1,
      manuallyAdded: false,
      manuallyDeleted: false,
      status: 'new'
    }]
    expect(deserializeWords(wordsArray)).toEqual(expectedArray)
  })
})
