// import { handleSignUp } from './data.js';

export const newAccount = () => {
  const container = document.createElement('div');

  container.innerHTML = `<section id="new-account" class="flex-left form">
    <h2>Criar uma nova conta</h2>
    <label for="email">Email</label>
      <input id="account-user" type="email" placeholder="email@host.com.br">
  
      <label for="password">Senha</label>
      <input id="account-pass" type="password" placeholder="mínimo 6 caracteres">
      
      <label for="pass">Confirmação de senha</label>
      <input id="confirm-pass" type="password" placeholder="mínimo 6 caracteres">
      
      <label for="name">Nome</label>
      <input id="user-name" type="text" placeholder="Maria">
  
      <label for="last-name">Sobrenome</label>
      <input id="last-name" type="text" placeholder="Carneiro">
      
      <button id="create-count" type="submit">CADASTRE-SE</button>
      <p class="footer">Já tem uma conta? <a href="#login">Acesse agora</a></p>
      </section>`;

  return container;
};

// const email = document.querySelector('#user-email').value;
// const password = document.querySelector('#user-pass').value;
// const signinButton = document.querySelector('#create-count');

// signinButton.addEventListener('click', handleSignUp(email, password));
