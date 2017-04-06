import { defineStatus } from './custom';

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
      status: defineStatus(char)
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
      status: defineStatus(word)
    };
  });
};

export const deserializeTexts = (textsArray) => {
  return textsArray
    .map(txt => {
      return {
        id: txt.id,
        title: txt.title,
        order: txt.textProject.order
      };
    })
    .sort((a, b) => {
      return a.order - b.order;
    });
};

export const deserializeProjects = (projects) => {
  return projects.data.data.map(e => {
    return {
      id: e.id,
      title: e.attributes.title
    };
  });
};
