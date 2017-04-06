import _ from 'lodash'

export function toChineseOnly(string) {
  // eslint-disable-next-line
  const allExceptChinese = /[A-z]|[0-9]|[$‘Œ.,\/#!?%\^&\*;:{}=\-_`~()。？！–•…@€£+àçèé~<>，；：'"＂、“”（）《》％·ĀāÁáǍǎÀàĒēÉéĚěÈèĪīÍíǏǐÌìŌōÓóǑǒÒòŪūÚúǓǔÙùÜüǗǘǙǚǛǜ˚ÅåE̊e̊i̊O̊o̊Ůů’]|\s/g;
  return string.replace(allExceptChinese, '');
}

export function preTokenization(string) {
  const dollarSeparatedString = string.replace(/\n/g, '$');
  // eslint-disable-next-line
  const allExceptChinese = /[A-z]|[0-9]|[‘Œ.,\/#!?%\^&\*;:{}=\-_`~()。？！–•…@€£+àçèé~<>，；：'"＂、“”（）《》％·ĀāÁáǍǎÀàĒēÉéĚěÈèĪīÍíǏǐÌìŌōÓóǑǒÒòŪūÚúǓǔÙùÜüǗǘǙǚǛǜ˚ÅåE̊e̊i̊O̊o̊Ůů’]|\s/g;
  return dollarSeparatedString.replace(allExceptChinese, '');
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
  if (item.manuallyDeleted === true) {
    return 'manuallydeleted';
  } else if (item.texts.length === 1) {
    return 'new';
  }
  const orders = item.texts.map(t => {
    return t.textProjects[0].order;
  });
  return 'Text #' + _.min(orders);
}
