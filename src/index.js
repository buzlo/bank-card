import 'babel-polyfill';
import './scss/styles.scss';
import createDomElements from './components/createDomElements';

const $elements = createDomElements();

window.document.body.append($elements);
