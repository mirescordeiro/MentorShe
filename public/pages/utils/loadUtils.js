import { handleSignUp } from '../newAccount/data.js';
import { toggleSignIn } from '../login/data.js';
import { home } from '../home/main.js';

export const loadFunctionBy = (page) => {
  switch (page) {
    case 'login':
      toggleSignIn();
      break;
    case 'newAccount':
      handleSignUp();
      break;
    case 'home':
      home();
      break;
    default:
  }
};
