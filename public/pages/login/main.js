
export const login = () => {
  const container = document.createElement('div');

  container.innerHTML = `<section id="login" class="flex center row-desk form">
      <figure>
        <img src="./img/login_mobile.svg" alt="Ilustração de dois navegadores abertos, no primeiro há uma seta grande que clica no segundo, no segundo há uma ovelha com uma mensagem de emoticon de coração" class="mobile">
        <img src="./img/login_desktop.svg" alt="Ilustração de três navegadores abertos, no primeiro há um coração, no segundo uma seta de correto, no terceiro uma emoticon sorrindo. No centro entre eles temos uma ovelha" class="desktop">
      </figure>
      <div class="flex center column login">
        <h1>mentor<strong>she</strong></h1>
        <p class="welcome mobile">&#60;seja bem-vinda!&#62;</p>
        <p class="welcome desktop">&#60;mentoria para todas!&#62;</p>
        <input id="user-email" type="email" placeholder="Email" required>
        <div id="email-alert" class="alert"></div>
        <input id="user-pass" type="password" placeholder="Senha" required>
        <div id="pass-alert" class="alert"></div>
        <button id="login-button" type="submit">ENTRAR</button>
        <p class="footer">Não possui uma conta? <a href="#newAccount">Crie uma conta</a></p>
      </div>
    </section>
  `;

  return container;
};
