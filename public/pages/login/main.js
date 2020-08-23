import { toggleSignIn, loginGoogle, loginGithub } from './data.js';

export const login = () => {
  const container = document.createElement('div');
  container.classList.add('container-login');

  container.innerHTML = `<section id='login' class='flex center row-desk data'>
      <figure>
        <img src='./img/login_mobile.svg' alt='Ilustração de dois navegadores abertos, no primeiro há uma seta grande que clica no segundo, no segundo há uma ovelha com uma mensagem de emoticon de coração' class='mobile'>
        <img src='./img/login_desktop.svg' alt='Ilustração de três navegadores abertos, no primeiro há um coração, no segundo uma seta de correto, no terceiro uma emoticon sorrindo. No centro entre eles temos uma ovelha' class='desktop'>
      </figure>
      <div class='flex column'>
        <form class='flex center column login'>
          <h1>mentor<strong>she</strong></h1>
          <p class='welcome mobile'>&#60;seja bem-vinda!&#62;</p>
          <p class='welcome desktop'>&#60;mentoria para todas!&#62;</p>
          <input id='user-email' type='email' placeholder='Email' required>
          <span id='email-alert' class='alert'></span>
          <input id='user-pass' type='password' placeholder='Senha' required>
          <span id='pass-alert' class='alert'></span>
          <button id='login-button' type='submit'>ENTRAR</button>
        </form>
        <div class='google'>
          <p>Ou entre com</p>
          <button id='google-button' type='submit'><span class='icon-google'></span></button>
          <button id='github-button' type='submit'><span class='icon-github'></span></button>
        </div>
        <p class='footer'>Não possui uma conta? <a href='#newAccount'>Crie uma conta</a></p>
        <span id=validation-login></span>
      </div>
    </section>
  `;

  const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const strongPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-6]))|((?=.*[A-Z])(?=.*[0-6])))(?=.{6,})/;
  const loginButton = container.querySelector('#login-button');
  const validationPassLogin = container.querySelector('#pass-alert');
  const validationMailLogin = container.querySelector('#email-alert');
  const validationLogin = container.querySelector('#validation-login');
  const googleButton = container.querySelector('#google-button');
  const githubButton = container.querySelector('#github-button');

  googleButton.addEventListener('click', (event) => {
    event.preventDefault();
    loginGoogle();
  });

  githubButton.addEventListener('click', (event) => {
    event.preventDefault();
    loginGithub();
  });

  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    const invalidPassLogin = [];
    const invalidEmailLogin = [];
    const invalidFirebaseLogin = [];
    validationLogin.innerHTML = '';
    validationPassLogin.innerHTML = '';
    validationMailLogin.innerHTML = '';

    const email = document.querySelector('#user-email').value;
    const password = document.querySelector('#user-pass').value;

    if (!mailformat.test(email)) {
      invalidEmailLogin.push('Email inválido');
    }

    if (!strongPass.test(password)) {
      invalidPassLogin.push('Senha inválida');
    }

    if (invalidPassLogin.length > 0 || invalidEmailLogin.length > 0) {
      validationPassLogin.innerHTML = invalidPassLogin.join('');
      validationMailLogin.innerHTML = invalidEmailLogin.join('');
    } else {
      const errorFirebase = (error) => {
        if (error instanceof Error) {
          invalidFirebaseLogin.push(error);
          validationLogin.innerHTML = invalidFirebaseLogin.join('');
        } else {
          window.location.hash = '#home';
        }
      };
      toggleSignIn({ email, password }, errorFirebase);
    }
  });
  return container;
};
