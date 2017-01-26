import isEmpty from 'lodash/isEmpty';

const allExceptChinese = /[A-z]|[0-9]|[.,\/#!?$%\^&\*;:{}=\-_`~()。？！…，；：、“”（）《》％]|\s/g;

export function toArrayOfUniqueChars(string) {
  return(
    string
    .replace(allExceptChinese, '')
    .split('')
    .filter((elem, index, self) => { return (index === self.indexOf(elem)); })
  );
};

export function toChineseOnly(string) {
  return string.replace(allExceptChinese, '');
};

// Argument should be array of strings
export function removeDuplicates(array) {
  return(
    array.filter((elem, index, self) => {
      return (index === self.indexOf(elem));
    })
  );
};

export function defineStatus(item) {
  if (item.id === null) {
    return 'Not saved';
  } else if (isEmpty(item.texts)) {
    return 'New';
  } else {
    return item.texts[0].title;
  }
};
