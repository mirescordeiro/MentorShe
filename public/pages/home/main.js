// Aqui serão criados os eventos de Manipulação de DOM e templates
export const newPost = () => {
  const container = document.createElement('div');

  container.innerHTML = ` 
      <div class="profile">
        <button id="profile">Perfil</button>
        <button id="edit-button">Editar Perfil</button>
        <button id="logout">Sair</button>        
      </div>
      <div class="profile-pic">
      <figure id="user-img"></figure>
      </div>
      <div class="privacy">
      <button class="post-button" id="publish">Publicar</button>
      <button id="public">Público</button>
      <button id="privacy">Privado</button>
        <form class='home'>
          <input id='numbers-like' type='number'>
          <button id='like'>Like</button>
          <textarea name="post" id="post" placeholder="Compartilhe Conhecimento!"></textarea>
          <button id="post-text">Compartilhar</button>
          <button id="edit-post">Editar</button>
          <button id="cancel-button"></i>Cancelar</button>
          <button class="delete-post">Delete</button>
        </form>
      `;

  const signInStatus = container.querySelector('#signin-status');
  const signIn = container.querySelector('#sign-in');
  const accountDetails = container.querySelector('#account-details');
  const signUp = container.querySelector('#sign-up');
  const postInit = container.querySelector('#post-init');

  return container;
};
