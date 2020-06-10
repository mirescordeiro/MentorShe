// Aqui serão criados os eventos de Manipulação de DOM e templates
export const newPost = (user) => {
  const container = document.createElement('div');

  container.innerHTML = ` 
      <div class="profile">
        <button id="profile">Perfil ${user.displayName != null ? user.displayName : 'Usuária'}</button>
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

  return container;
};
