// Aqui serão criados os eventos de Manipulação de DOM e templates
import { newPost, loadPosts, deletePost, logout } from './data.js';

export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = ` 
      <div class="profile">
        <button id="profile">Perfil ${firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'Usuária'}</button>
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
          <textarea name="post" id="post-text" placeholder="Compartilhe Conhecimento!"></textarea>
          <button id="post">Compartilhar</button>
          <button id="image">Image</button>
        </form>
      <div id='timeline'></div>
      `;

  const signInStatus = container.querySelector("#signin-status");
  const signIn = container.querySelector("#sign-in");
  const accountDetails = container.querySelector("#account-details");
  const signUp = container.querySelector("#sign-up");
  const postInit = container.querySelector("#post-init");

  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#post');
  const editButton = container.querySelector('#edit-button');
  const cancelEditBtn = container.querySelector('#cancel-edit');
  const postPublic = container.querySelector('#public');
  const postPrivate = container.querySelector('#privacy');
  const likeButton = container.querySelector('#like');
  const addImage = container.querySelector('#image');
  const timeline = container.querySelector('#timeline');
  const buttonLogout = container.querySelector('#logout');

  const postTemplate = (array) => {
    timeline.innerHTML = ''
    array
      .map(
        (post) => {
        const template = document.createElement('div')
        template.innerHTML = `<p>${post.text}</p>
        <button id="edit-post">Editar</button>
        <button id="cancel-edit"></i>Cancelar</button>
        <button id="delete-post" data-postid= ${post.id}>Delete</button>
        <div id='numbers-like'>${post.likes}<div>
        <button id='like'>Like</button>
      `
      const deletePostBtn = template.querySelector('#delete-post');
      deletePostBtn.addEventListener('click', (event) => {
        deletePost(deletePostBtn.dataset.postid)
      });
      timeline.appendChild(template)
    })
    .join('');
  };

  postButton.addEventListener("click", (event) => {
    event.preventDefault();
    newPost(textPost.value);
    timeline.innerHTML = '';
    loadPosts(postTemplate)
    //.then(clear => {textPost = ''});
  });

  buttonLogout.addEventListener('click', logout);
  return container;
};