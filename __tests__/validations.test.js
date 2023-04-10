import {
  isCardCvvValid,
  isCardNumberValid,
} from '../src/components/validations';

test('Валидация номера карты пропускает корректный номер карты.', () => {
  expect(isCardNumberValid(5164200717095829)).toBe(true);
  expect(isCardNumberValid('4664718351935818')).toBe(true);
  expect(isCardNumberValid(2201658853388849)).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы.', () => {
  expect(isCardNumberValid('5ю64200717095829')).toBe(false);
  expect(isCardNumberValid('4664718351m35818')).toBe(false);
  expect(isCardNumberValid('220165885338.849')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр.', () => {
  expect(isCardNumberValid('564200717')).toBe(false);
  expect(isCardNumberValid('46647183513')).toBe(false);
  expect(isCardNumberValid('2201')).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр (например, 25).', () => {
  expect(isCardNumberValid('564200717564200717564200717')).toBe(false);
  expect(isCardNumberValid('466471835134664718351346647183513')).toBe(false);
  expect(isCardNumberValid('220122012201220122012201')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами.', () => {
  expect(isCardCvvValid('717')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами.', () => {
  expect(isCardCvvValid('7')).toBe(false);
  expect(isCardCvvValid('71')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами.', () => {
  expect(isCardCvvValid('7171')).toBe(false);
  expect(isCardCvvValid('71717')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами (латиница, кириллица и знаки препинания).', () => {
  expect(isCardCvvValid('7ю7')).toBe(false);
  expect(isCardCvvValid('71m')).toBe(false);
  expect(isCardCvvValid('.17')).toBe(false);
});
