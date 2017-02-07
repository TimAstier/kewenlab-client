import isEmpty from 'lodash/isEmpty';

export function toChineseOnly(string) {
  const allExceptChinese = /[A-z]|[0-9]|[.,\/#!?$%\^&\*;:{}=\-_`~()。？！…@€£+àçèé~<>，；：＂、“”（）《》％·]|\s/g;
  return string.replace(allExceptChinese, '');
};

export function toArrayOfUniqueChars(string) {
  return(
    toChineseOnly(string)
    .split('')
    .filter((elem, index, self) => { return (index === self.indexOf(elem)); })
  );
};

export function removeDuplicates(array) {
  return(
    array.filter((elem, index, self) => {
      return (index === self.indexOf(elem));
    })
  );
};

export function defineStatus(item) {
  if (item.id === null) {
    return 'notsaved';
  } else if (item.hasOwnProperty('charText')
    && item.charText.manuallyDeleted === true) {
    return 'manuallydeleted'
  } else if (item.hasOwnProperty('wordText')
    && item.wordText.manuallyDeleted === true) {
    return 'manuallydeleted'
  } else if (isEmpty(item.texts)) {
    return 'new';
  } else {
    return item.texts[0].title;
  }
};
