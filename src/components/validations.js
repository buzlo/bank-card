import validateCard from 'card-validator';

export function isCardNumberValid(cardNumber) {
  const numberValidation = validateCard.number(cardNumber);
  return numberValidation.isValid;
}

export function getPaymentSystem(cardNumber) {
  const numberValidation = validateCard.number(cardNumber);
  return numberValidation.card.type;
}

export function isCardDateValid(dateString) {
  const dateValidation = validateCard.expirationDate(dateString);
  return dateValidation.isValid;
}

export function isCardCvvValid(cvv) {
  const cvvValidation = validateCard.cvv(cvv);
  return cvvValidation.isValid;
}
