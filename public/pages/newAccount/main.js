import { handleSignUp } from './data.js';

export const newAccount = () => {
  const container = document.createElement('div');

  container.innerHTML = `<form id="new-account" class="flex center row-desk form">
    <figure>
      <img src="./img/register.svg" alt="Ilustração de monitor e dois usuários" class="desktop">
    </figure>
    <div class="flex center column form">
      <h2>Criar uma nova conta</h2>
      <form class="flex column register">
        <label for="email">Email</label>
        <input id="account-user" type="email" placeholder="email@host.com.br" required>
        <span id="email-alert" class="alert"></span>

        <label for="password">Senha</label>
        <input id="account-pass" type="password" placeholder="mínimo 8 caracteres" required>
        <span id="pass-alert" class="alert"></span>

        <span id=validation></span>

      </form>
      <button id="create-count" type="submit">CADASTRE-SE</button>
      <p class="footer">Já tem uma conta? <a href="#login">Acesse agora</a></p>
    </div>
  </form>`;

  const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const strongPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
  const createButton = container.querySelector('#create-count');
  const validationPass = container.querySelector('#pass-alert');
  const validationMail = container.querySelector('#email-alert');
  const validation = container.querySelector('#validation');

  createButton.addEventListener('click', () => {
    const invalidPass = [];
    const invalidEmail = [];
    const invalidFirebase = [];
    validation.innerText = '';
    validationMail.innerText = '';
    validationPass.innerText = '';

    const errorFirebase = (error) => {
      if (error) {
        invalidFirebase.push(error);
        validation.innerHTML = invalidFirebase.join('');
      }
    };

    const email = document.querySelector('#account-user').value;
    const password = document.querySelector('#account-pass').value;
    const name = 

    if (!mailformat.test(email)) {
      invalidEmail.push('Email inválido');
    }
    if (!strongPass.test(password)) {
      invalidPass.push('Senha inválida');
    }

    if (invalidPass.length > 0 || invalidEmail.length > 0) {
      validationPass.innerHTML = invalidPass.join('');
      validationMail.innerHTML = invalidEmail.join('');
    } else {
      handleSignUp({ email, password }, errorFirebase);
    }
  });

  return container;
};

/*
export const setDisplayName = (name) => (firebase.auth().currentUser.updateProfile({displayName: name}))
*/