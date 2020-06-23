import { handleSignUp } from '../newAccount/data.js';
import { toggleSignIn } from '../login/data.js';

export const loadFunctionBy = (page) => {
  switch (page) {
    case 'login':
      toggleSignIn();
      break;
    case 'newAccount':
      handleSignUp();
      break;
    default:
      break;
  }
};
