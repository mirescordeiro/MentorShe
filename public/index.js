// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import { home } from './pages/home/main.js';

const main = document.querySelector('#root');

const validateHash = (hash) => (hash === '' ? 'login' : hash.replace('#', ''));

const renderPage = () => {
  const page = validateHash(window.location.hash);
  main.innerHTML = '';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      switch (page) {
        case 'home':
          main.appendChild(home(user));
          break;

        default:
          main.appendChild(routes[page]);
          break;
      }
    } else {
      // switch case, se for diferente de home routes
      switch (page) {
        case page!=='home':
          main.appendChild(routes[page]);
          break;
        default:
          main.appendChild(routes['login']);
          break;
    }
  }
})
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
})
