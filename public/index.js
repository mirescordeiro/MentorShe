// Este é o ponto de entrada de sua aplicação
import routes from './routes.js';
import {firebaseConfig} from './firebase.js';
import {toggleSignIn} from './public/pages/login/data.js';
import {handleSignUp} from './public/pages/newAccount/data.js';

let email = document.querySelector('#user-email').value;
let password = document.querySelector('#user-pass').value;
let loginButton = document.querySelector('#login-button').value;
const 

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