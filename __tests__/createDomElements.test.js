import createDomElements from '../src/components/createDomElements';

test('Функция создания DOM-дерева должна вернуть корневой DOM-элемент, в котором содержатся четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», CVV/CVC, E-mail, а также тег img для логотопа и их обёртки', () => {
  const expectedHTML =
    '<div class="container mt-3"><form class="form needs-validation"><h1 class="mb-3 fs-5">Введите данные карты:</h1><input id="card-input" class="form__input form-control mb-3" required="" placeholder="Номер карты"><div class="row"><div class="col-4"><input id="date-input" class="form__input form-control mb-3" required="" placeholder="ММ / ГГ"></div><div class="col-4"><input id="cvv-input" class="form__input form-control" required="" placeholder="CVC/CVV"></div><img class="form__img col-3 mb-3" src=""></div><div class="row"><div class="col-8"><input id="card-input" class="form__input form-control mb-3" required="" type="email" placeholder="E-mail"></div></div><button class="btn btn-secondary" type="submit" disabled="" novalidate="true">Оплатить</button></form></div>';
  expect(createDomElements()).toBeInstanceOf(HTMLDivElement);
  expect(createDomElements().outerHTML).toBe(expectedHTML);
});
