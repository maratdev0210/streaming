const SPECIAL_CHARACTERS: string = "`!@#$%^&*()-+|{}[];,/.?'";

function containsOneLetter(password: string) {
  return password.length >= 1;
}

function containsOneDigitOrSpecialCharacter(password: string) {
  const containsDigit = password
    .split("")
    .some((char) => char >= "0" && char <= "9");
  const containsSpecialCharacter = password
    .split("")
    .some((char) => SPECIAL_CHARACTERS.includes(char));

  return containsDigit || containsSpecialCharacter;
}

function containsEnoughCharacters(password: string) {
  return password.length >= 10;
}

function isValidPassword(password: string) {
  return (
    containsOneLetter(password) &&
    containsEnoughCharacters(password) &&
    containsOneDigitOrSpecialCharacter(password)
  );
}

export {
  containsEnoughCharacters,
  containsOneDigitOrSpecialCharacter,
  containsOneLetter,
  isValidPassword,
};
