import isEmpty from 'lodash/isEmpty';

export function toChineseOnly(string) {
  // eslint-disable-next-line
  const allExceptChinese = /[A-z]|[0-9]|[$.,\/#!?%\^&\*;:{}=\-_`~()。？！–•…@€£+àçèé~<>，；：＂、“”（）《》％·ĀāÁáǍǎÀàĒēÉéĚěÈèĪīÍíǏǐÌìŌōÓóǑǒÒòŪūÚúǓǔÙùÜüǗǘǙǚǛǜ˚ÅåE̊e̊i̊O̊o̊Ůů’]|\s/g;
  return string.replace(allExceptChinese, '');
}

export function preTokenization(string) {
  string = string.replace(/\n/g, '$');
  // eslint-disable-next-line
  const allExceptChinese = /[A-z]|[0-9]|[.,\/#!?%\^&\*;:{}=\-_`~()。？！–•…@€£+àçèé~<>，；：＂、“”（）《》％·ĀāÁáǍǎÀàĒēÉéĚěÈèĪīÍíǏǐÌìŌōÓóǑǒÒòŪūÚúǓǔÙùÜüǗǘǙǚǛǜ˚ÅåE̊e̊i̊O̊o̊Ůů’]|\s/g;
  return string.replace(allExceptChinese, '');
}

export function toArrayOfUniqueChars(string) {
  return (
    toChineseOnly(string)
    .split('')
    .filter((elem, index, self) => { return (index === self.indexOf(elem)); })
  );
}

export function removeDuplicates(array) {
  return (
    array.filter((elem, index, self) => {
      return (index === self.indexOf(elem));
    })
  );
}

export function removeDolars(array) {
  return (
    array.filter(e => {
      return e !== '$';
    })
  );
}

export function defineStatus(item) {
  if (item.id === null) {
    return 'notsaved';
  } else if (item.manuallyDeleted === true) {
    return 'manuallydeleted';
  } else if (isEmpty(item.texts)) {
    return 'new';
  }
  return item.texts[0].title;
}
