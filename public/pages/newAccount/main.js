export const newAccount = () => {
  const container = document.createElement('div');

  container.innerHTML = `<section id="new-account" class="flex center row-desk form">
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
        <input id="account-pass" type="password" placeholder="mínimo 6 caracteres" required>
        <span id="pass-alert" class="alert"></span>

      </form>
      <button id="create-count" type="submit">CADASTRE-SE</button>
      <p class="footer">Já tem uma conta? <a href="#login">Acesse agora</a></p>
    </div>
  </section>`;

  return container;
};
