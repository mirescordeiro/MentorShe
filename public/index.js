// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import { firebaseConfig } from './firebase.js';
import { toggleSignIn } from '';
import { handleSignUp } from './public/pages/newAccount/data.js';

const email = document.querySelector('#user-email').value;
const password = document.querySelector('#user-pass').value;
const loginButton = document.querySelector('#login-button').value;
const signinButton = document.querySelector('#create-count');

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

loginButton.addEventListener('click', handleSignUp(email, password));
signinButton.addEventListener('click', toggleSignIn(email, password));
