import { handleSignUp } from '../newAccount/data.js';
import { toggleSignIn } from '../login/data.js';
import { newPost } from '..home/data.js';

export const loadFunctionBy = (page) => {
  switch (page) {
    case 'login':
      toggleSignIn();
      break;
    case 'newAccount':
      handleSignUp();
      break;
    case 'home':
      newPost();
      break;
    default:
      break;
  }
};
