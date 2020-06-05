export const newAccount = () => {
  const container = document.createElement('div');

  container.innerHTML = `<form id="new-account" class="flex column form">
    <h2>Criar uma nova conta</h2>
    <label for="email">Email</label>
    <input id="account-user" type="email" placeholder="email@host.com.br" required>
    <span id="email-alert" class="alert"></span>

    <label for="password">Senha</label>
    <input id="account-pass" type="password" placeholder="mínimo 6 caracteres" requires>
    <span id="pass-alert" class="alert"></span>

    <span id="validation"></span>
  
    <button id="create-count" type="submit">CADASTRE-SE</button>
    <p class="footer">Já tem uma conta? <a href="#login">Acesse agora</a></p>
  </form>`;

  return container;
};
