export function toArrayOfUniqueChars(string) {
  const allExceptChinese = /[A-z]|[0-9]|[.,\/#!?$%\^&\*;:{}=\-_`~()。？！]|\s/g;
  return(
    string
    .replace(allExceptChinese, '')
    .split('')
    .filter((elem, index, self) => { return (index === self.indexOf(elem)); })
  );
}
