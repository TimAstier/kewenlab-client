export const deserializeChars = (charsArray) => {
  return charsArray.map(char => {
    return {
      id: char.id,
      chinese: char.chinese,
      textId: char.charText.textId,
      charTextId: char.charText.id,
      order: char.charText.order,
      manuallyAdded: char.charText.manuallyAdded,
      manuallyDeleted: char.charText.manuallyDeleted,
      texts: char.texts
    };
  });
};

export const deserializeWords = (wordsArray) => {
  return wordsArray.map(word => {
    return {
      id: word.id,
      chinese: word.chinese,
      textId: word.wordText.textId,
      wordTextId: word.wordText.id,
      order: word.wordText.order,
      manuallyAdded: word.wordText.manuallyAdded,
      manuallyDeleted: word.wordText.manuallyDeleted,
      texts: word.texts
    };
  });
};
