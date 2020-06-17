// Aqui serão criados os eventos de Manipulação de DOM e templates
import { newPost, loadPosts, deletePost, likePost, logout } from './data.js';

export const home = () => {
  const container = document.createElement('div');
  container.classList.add('container-home');

  container.innerHTML = ` 
    <header>
      <nav>
        <h1 id='logo-home'>mentor<strong id='strong'>she</strong></h1>
        <button id='logout'>Sair</button>
      </nav>
    </header>
    <section class='news'>
      <div class='flex'>
        <form id='post-form' class='post'>
          <textarea name='post' id='post-text' placeholder='Compartilhe Conhecimento!'></textarea>
          <button id='publish' type='submit'>Compartilhar</button>
        </form>
      </div>
      <div id='timeline'></div>
    </section>
    `;

  const resetForm = container.querySelector('#post-form');
  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#publish');
  const postPublic = container.querySelector('#public');
  const postPrivate = container.querySelector('#privacy');
  const addImage = container.querySelector('#image');
  const timeline = container.querySelector('#timeline');
  const buttonLogout = container.querySelector('#logout');

  const postTemplate = (array) => {
    timeline.innerHTML = '';

    array
      .map((post) => {
        const template = document.createElement('div');
        template.classList.add('flex');

        template.innerHTML = `
        <div class='all-posts'>
          <div class='top'>
            <p>publicado por <strong>${post.userName}</strong></p>
            <button id='edit-button'>Editar</button>
            <button id='cancel-edit'>Cancelar</button> 
            <button id='save-edit'>Salvar</button>
          </div>
          <div class='flex text'>
            <p>${post.text}</p>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid= ${post.id}><span class='icon-like'></span></button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <button id='delete-post' class='delete' data-postid= ${post.id}><span class='icon-delete'></span></button>
          </div>
        </div>
      `;

        // Likes the post when clicked
        const likeButton = template.querySelector('#like-button');
        likeButton.addEventListener('click', () => {
          likePost(likeButton.dataset.postid, firebase.auth().currentUser.uid);
        });

        // Deletes the post when clicked
        const deletePostBtn = template.querySelector('#delete-post');
        deletePostBtn.setAttribute('hidden', 'true');
        deletePostBtn.addEventListener('click', () => {
          deletePost(deletePostBtn.dataset.postid);
        });

        // Opens a textarea to edit the post
        const editButton = template.querySelector('#edit-button');
        editButton.setAttribute('hidden', 'true');
        editButton.addEventListener('click', () => {
          editButton.setAttribute('hidden', 'true');
          cancelEditBtn.removeAttribute('hidden');
          saveEditBtn.removeAttribute('hidden');
        });

        // Cancels the editing and returns data
        const cancelEditBtn = template.querySelector('#cancel-edit'); 
        cancelEditBtn.setAttribute('hidden', 'true');     
        cancelEditBtn.addEventListener('click', () => {
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
        });

        // Saves editing changes to the database
        const saveEditBtn = template.querySelector('#save-edit');
        saveEditBtn.setAttribute('hidden', 'true');
        saveEditBtn.addEventListener('click', () => {
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
        });

        // Identifies if the currentUser has editing privileges 
        function loggedUser() {
          if(firebase.auth().currentUser.uid === post.user){
            editButton.removeAttribute('hidden');
            deletePostBtn.removeAttribute('hidden');
          };
        };
        loggedUser();

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

//const showCancel = cancelEditBtn.removeAttribute('hidden');
//const hideCancel = cancelEditBtn.setAttribute('hidden', 'true');
//const showSave = saveEditBtn.removeAttribute('hidden');
//const hideSave = saveEditBtn.setAttribute('hidden', 'true');