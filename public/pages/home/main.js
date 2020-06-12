// Aqui serão criados os eventos de Manipulação de DOM e templates
import { newPost, loadPosts, deletePost, likePost, logout } from './data.js';
//import { loadPosts } from './data.js';
//import { deletePost } from './data.js';
//import { logout } from './data.js';
//import { likePost } from './data.js';

export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = ` 
    <nav>
    <h1 id='logo-home'>mentor<strong id="strong">she</strong></h1>
    <button id="logout">Sair</button>    
    </nav>
    <section class="privacy">
      <form id="post-form" class="post">
        <textarea name="post" id="post-text" placeholder="Compartilhe Conhecimento!"></textarea>
        <button id="publish" type="submit">Compartilhar</button>
      </form>
      <div id='timeline'></div>
    </section>
    `;

  const resetForm = container.querySelector('#post-form');
  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#publish');
  const editButton = container.querySelector('#edit-button');
  const cancelEditBtn = container.querySelector('#cancel-edit');
  const postPublic = container.querySelector('#public');
  const postPrivate = container.querySelector('#privacy');
  const addImage = container.querySelector('#image');
  const timeline = container.querySelector('#timeline');
  const buttonLogout = container.querySelector('#logout');

  const postTemplate = (array) => {
    timeline.innerHTML = '';

    // Template for the posts of the user
    array
      .map((post) => {
        const template = document.createElement('div');
        template.innerHTML = `
        <div class='all-posts'>
          <div class='top'>Nome do usuário</div>
          <p>${post.text}</p>
          <div class='bottom'>
            <div class='like'>
              <button id='like-button'>Like</button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <button id="delete-post" data-postid= ${post.id}>Delete</button>
          </div>
        </div>
      `;

        // Deletes the post when clicked
        const deletePostBtn = template.querySelector('#delete-post');
        deletePostBtn.addEventListener('click', () => {
          deletePost(deletePostBtn.dataset.postid);
        });

/*************** KELLY VER!!!!!*****************/
        // Likes the post when clicked
        const likeButton = template.querySelector('#like');
        likeButton.addEventListener('click', () => {
          let likes = 0;
          likes++;
          likePost(likeButton.dataset.postid, likes);
        });

        // Refresh timeline
        timeline.appendChild(template);
      })
      .join('');
  };

  timeline.innerHTML = loadPosts(postTemplate);

  postButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (textPost.value === '') {
      return;
    }
    newPost(textPost.value);
    timeline.innerHTML = '';
    loadPosts(postTemplate);
    resetForm.reset();
  });

  buttonLogout.addEventListener('click', logout);
  return container;
};

/*
<button id="profile">Perfil ${firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'Usuária'}</button>
<button id="edit-button">Editar Perfil</button>
<button class="post-button" id="publish">Publicar</button>
<button id="public">Público</button>
<button id="privacy">Privado</button>
<div class="profile-pic">
  <figure id="user-img"></figure>
</div>
<button id="image">Image</button>
// post
        <button id="edit-post">Editar</button>
        <button id="cancel-edit"></i>Cancelar</button>
*/
