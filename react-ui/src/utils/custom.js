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
  const orderedTexts = item.texts.sort((a, b) => {
    return a.textProjects[0].order - b.textProjects[0].order;
  });
  return orderedTexts[0].title;
}

export function setDisplayedOrder(textsArray) {
  let num = 0;
  let letter = 'a';
  return textsArray.map(txt => {
    if (txt.bonus) {
      txt.displayedOrder = num + '.' + letter;
      letter = String.fromCharCode(letter.charCodeAt(0) + 1);
      return txt;
    }
    num++;
    txt.displayedOrder = num.toString();
    letter = 'a';
    return txt;
  });
}

export function refreshOrders(textsArray) {
  return textsArray.map((txt, i) => {
    txt.order = i + 1;
    return txt;
  });
}
