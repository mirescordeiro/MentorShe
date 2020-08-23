import firebasemock from 'firebase-mock';
import { toggleSignIn } from '../public/pages/login/data.js';

const Authentication = firebasemock.MockAuthentication;
const user = {
  email: '/^w+([\\.-]?w+)*@w+([\\.-]?w+)*(.w{2,3})+$/',
  password: '$al@6682',
};

describe('signInUser', () => {
  const auth = new Authentication(user);
  auth.signInWithEmailAndPassword(user.email, user.password);
  it('Deveria fazer signIn de usuário existente', () => {
    expect(toggleSignIn()).toBeCalled();
  });
});
