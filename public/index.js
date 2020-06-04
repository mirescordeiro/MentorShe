// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import { loadFunctionBy } from './pages/utils/loadUtils.js';

const main = document.querySelector('#root');

const validateHash = hash => (hash === '' ? 'login' : hash.replace('#', ''));

const renderPage = () => {
  const page = validateHash(window.location.hash);
  main.innerHTML = '';
  main.appendChild(routes[page]);
  loadFunctionBy(page);
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});
