// import { home } from './pages/home/main.js';
import { login } from './pages/login/main.js';
import { newAccount } from './pages/newAccount/main.js';
import { home } from './pages/home/main.js';

export default {
  login: login(),
  newAccount: newAccount(),
  home: home(),
};

//escrever onAuthStateChanged
//verificar se existe o user
//se sim rederizar a pagina
// se não voltar pro login

export const initApp = function initApp() {
  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    //if (user) {
    //  const displayName = user.displayName;
    //  const email = user.email;
    //  const photoURL = user.photoURL;
    //  const uid = user.uid;
    //  const providerData = user.providerData;
    //  signInStatus.textContent = 'Signed in';
    //  signIn.textContent = 'Sign out';
    //  accountDetails.textContent = JSON.stringify(user, null, '');
    //}
  });
  signIn.addEventListener('click', toggleSignIn, false);
  signUp.addEventListener('click', handleSignUp, false);
  postInit.addEventListener('click', newPost, false);
};

window.onload = function () {
  initApp();
};