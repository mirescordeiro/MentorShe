// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import firebase from './firebase.js';

const main = document.querySelector('#root');

const validateHash = hash => (hash === '' ? 'home' : hash.replace('#', ''));

const renderPage = () => {
  const page = validateHash(window.location.hash);
  main.innerHTML = '';
  main.appendChild(routes[page]);
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});
