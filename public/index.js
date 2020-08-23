import routes from './routes.js';

const main = document.querySelector('#root');

const validateHash = (hash) => (hash === '' ? 'login' : hash.replace('#', ''));

const renderPage = () => {
  const page = validateHash(window.location.hash);
  main.innerHTML = '';

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      main.appendChild(routes[page](user));
    } else {
      switch (true) {
        case page !== 'home':
          main.appendChild(routes[page]());
          break;
        default:
          main.appendChild(routes['login']());
          break;
      }
    }
  });
};

const init = () => window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  renderPage();
  init();
});
