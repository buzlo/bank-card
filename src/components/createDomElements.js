import { el, mount, setChildren } from 'redom';
import IMask from 'imask';
import {
  isCardNumberValid,
  getPaymentSystem,
  isCardDateValid,
  isCardCvvValid,
} from './validations';
import visaLogo from '../assets/images/visa.png';
import mastercardLogo from '../assets/images/mastercard.png';
import maestroLogo from '../assets/images/maestro.png';
import mirLogo from '../assets/images/mir.png';
import unionpayLogo from '../assets/images/unionpay.png';

export default function () {
  const $container = el('.container.mt-3');
  const $form = el('form.form.needs-validation');
  const $submitBtn = el('button.btn.btn-secondary', 'Оплатить', {
    type: 'submit',
    disabled: true,
    novalidate: true,
  });
  const logos = {
    visaLogo,
    mastercardLogo,
    maestroLogo,
    mirLogo,
    unionpayLogo,
  };
  let logo = '';
  const $paymentSystemImg = el('img.form__img.col-3.mb-3', { src: '' });

  $form.addEventListener(
    'submit',
    (event) => {
      if (!$form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      $form.classList.add('was-validated');
    },
    false
  );

  const $title = el('h1.mb-3.fs-5', 'Введите данные карты:');
  const $numberInput = el('input.form__input.form-control.mb-3#card-input', {
    required: true,
    placeholder: 'Номер карты',
  });
  const numberMaskOptions = { mask: '0000 0000 0000 0000[ 00]' };
  IMask($numberInput, numberMaskOptions);

  $numberInput.addEventListener('blur', () => {
    const cardNumber = $numberInput.value.split(' ').join('');

    if (!isCardNumberValid(cardNumber)) {
      $numberInput.setCustomValidity('Некорректный номер карты');
    } else {
      $numberInput.setCustomValidity('');
      const paymentSystem = getPaymentSystem(cardNumber);
      logo = logos[`${paymentSystem}Logo`];
    }

    $paymentSystemImg.src = logo;
    $form.classList.add('was-validated');
    if ($form.checkValidity()) $submitBtn.disabled = false;
  });

  const $dateInput = el('input.form__input.form-control.mb-3#date-input', {
    required: true,
    placeholder: 'ММ / ГГ',
  });
  const dateMaskOptions = { mask: '00 / 00' };
  IMask($dateInput, dateMaskOptions);
  $dateInput.addEventListener('blur', () => {
    const expirationDate = $dateInput.value;

    if (!isCardDateValid(expirationDate)) {
      $dateInput.setCustomValidity('Некорректная дата');
    } else $dateInput.setCustomValidity('');

    $form.classList.add('was-validated');
    if ($form.checkValidity()) $submitBtn.disabled = false;
  });
  const $dateInputCol = el('.col-4', $dateInput);

  const $cvvInput = el('input.form__input.form-control#cvv-input', {
    required: true,
    placeholder: 'CVC/CVV',
  });
  const cvcMaskOptions = { mask: '000[0]' };
  IMask($cvvInput, cvcMaskOptions);
  $cvvInput.addEventListener('blur', () => {
    const cvv = $cvvInput.value;

    if (!isCardCvvValid(cvv)) {
      $cvvInput.setCustomValidity('Некорректный CVC/CVV код');
    } else $cvvInput.setCustomValidity('');

    $form.classList.add('was-validated');
    if ($form.checkValidity()) $submitBtn.disabled = false;
  });
  const $cvvInputCol = el('.col-4', $cvvInput);

  const $dateAndCvcWrapper = el(
    '.row',
    $dateInputCol,
    $cvvInputCol,
    $paymentSystemImg
  );

  const $emailInput = el('input.form__input.form-control.mb-3#card-input', {
    required: true,
    type: 'email',
    placeholder: 'E-mail',
  });
  $cvvInput.addEventListener('blur', () => {
    $form.classList.add('was-validated');
    if ($form.checkValidity()) $submitBtn.disabled = false;
  });
  const $emailInputCol = el('.col-8', $emailInput);
  const $emailInputRow = el('.row', $emailInputCol);

  for (const $input of [$numberInput, $dateInput, $cvvInput, $emailInput]) {
    $input.addEventListener('input', () =>
      $form.classList.remove('was-validated')
    );
  }

  setChildren($form, [
    $title,
    $numberInput,
    $dateAndCvcWrapper,
    $emailInputRow,
    $submitBtn,
  ]);
  mount($container, $form);

  return $container;
}
