// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import { newPost } from './pages/home/main.js';

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
          main.appendChild(newPost(user));
          break;

        default:
          main.appendChild(routes[page]);
          break;
      }
    } else {
      console.log('sem user');
      main.appendChild(routes[page]);
    }
  });
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});
