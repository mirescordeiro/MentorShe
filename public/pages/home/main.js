// Aqui serão criados os eventos de Manipulação de DOM e templates
export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = ` 
      <div class="profile">
        <button id="profile">Perfil</button>
        <button id="edit-profile">Editar Perfil</button>
        <button id="logout">Sair</button>        
      </div>
      <div class="profile-pic">
      <figure id="user-img"></figure>
      </div>
      <div class="privacy">
      <button class="dropbtn">Publicar</button>
      <button id="public">Público</button>
      <button id="privacy">Privado</button>
        <form class='home'>
          <input id='numbers-like' type='number'>
          <button id='like'>Like</button>
          <textarea name="post" id="post" placeholder="Compartilhe Conhecimento!"></textarea>
          <button id=share>Compartilhar</button>
          <button id=edit-post>Editar</button>
          <button id=cancel></i>Cancelar</button>
          <button class="delete">Delete</button>
        </form>
      `;

  return container;
};
