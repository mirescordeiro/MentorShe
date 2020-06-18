import {
  newPost, loadPosts, deletePost, likePost, logout, updateEdit
} from './data.js';

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
          <div class='post-options'>
            <button id='publish' type='submit'>Compartilhar</button>
            <input type="checkbox" class="private-post" id="privacy"><p>Privado</p></input>
            <button id='order-asc' type="submit">asc-posts</button>
            <button id='order-desc' type="submit">desc-posts</button> 
          </div>
        </form>
      </div>
      <div id='timeline'></div>
    </section>
    `;

  // Container variables
  const resetForm = container.querySelector('#post-form');
  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#publish');
  const postPrivate = container.querySelector('#privacy');
  const timeline = container.querySelector('#timeline');

  const orderAcs = container.querySelector("#order-asc");
  orderAcs.addEventListener('click', () => {
    timeline.innerHTML = orderBy(true, postTemplate);
  });

  const orderDesc = container.querySelector('#order-desc');
  orderDesc.addEventListener('click', () => {
    timeline.innerHTML = orderBy(false, postTemplate);
  });

  const postTemplate = (array) => {
    timeline.innerHTML = '';

    array
      .map((post) => {
        const template = document.createElement('div');
        template.classList.add('flex');

        template.innerHTML = `        
        <form id='template-form' class='all-posts'>
            <figure>
              <img src="${post.photoURL}" alt="Foto da usuária">
              <figcaption>${post.userName}</figcaption>
            </figure>
            <div class='edit'>
              <button id='edit-button' type='submit'>EDITAR</button>
              <button id='cancel-edit' type='submit'>CANCELAR</button> 
              <button id='save-edit' type='submit' data-postid=${post.id}>SALVAR</button>
            </div>
          </div>
          <div class='text'>
            <textarea id='edit-text-area' disabled='disabled'>${post.text}</textarea>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid=${post.id}><span class='icon-like'></span></button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <button id='delete-post' class='delete' data-postid=${post.id}><span class='icon-delete'></span></button>
          </div>
        </form>
      `;

        // Template variables
        const resetFormTemplate = template.querySelector('#template-form');
        const editButton = template.querySelector('#edit-button');
        const cancelEditBtn = template.querySelector('#cancel-edit');
        const saveEditBtn = template.querySelector('#save-edit');
        const editTextArea = template.querySelector('#edit-text-area');
        const likeButton = template.querySelector('#like-button');
        const deletePostBtn = template.querySelector('#delete-post');

        // Enables the textarea to edit the post
        editButton.setAttribute('hidden', 'true');
        editButton.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.setAttribute('hidden', 'true');
          cancelEditBtn.removeAttribute('hidden');
          saveEditBtn.removeAttribute('hidden');
          editTextArea.disabled = false;
        });

        // Cancels the editing and resets text
        cancelEditBtn.setAttribute('hidden', 'true');
        cancelEditBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
          editTextArea.disabled = true;
          resetFormTemplate.reset();
        });

        // Saves editing changes to the database
        saveEditBtn.setAttribute('hidden', 'true');
        saveEditBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
          updateEdit(saveEditBtn.dataset.postid, editTextArea.value);
          resetForm.reset();
        });

        // Autoresizes the textarea
        function resizeTextArea() {
          editTextArea.style.height = 'auto';
          editTextArea.style.height = editTextArea.scrollHeight + 50 + 'px'; // HELP!!! NUM SEI MAIS O QUE FAZER
        }
        resizeTextArea();

        // Likes the post and deslikes on second click
        likeButton.addEventListener('click', (event) => {
          event.preventDefault();
          likePost(likeButton.dataset.postid, firebase.auth().currentUser.uid);
        });

        // Deletes the post when clicked
        deletePostBtn.setAttribute('hidden', 'true');
        deletePostBtn.addEventListener('click', (event) => {
          event.preventDefault();
          deletePost(deletePostBtn.dataset.postid);
        });

        // Identifies if the currentUser has editing privileges
        function loggedUser() {
          if (firebase.auth().currentUser.uid === post.user) {
            editButton.removeAttribute('hidden');
            deletePostBtn.removeAttribute('hidden');
          }
        }
        loggedUser();

        // Refresh timeline
        timeline.appendChild(template);
      })
      .join('');
  };

  timeline.innerHTML = loadPosts(postTemplate);

  postButton.addEventListener('click', (event) => {
    event.preventDefault();
    newPost(textPost.value, postPrivate.value); //  Passei ele como parâmetro aqui também.
    textPost.value = '';
    timeline.innerHTML = '';
    loadPosts(postTemplate);
    resetForm.reset();
  });

  // Logout when clicked
  const buttonLogout = container.querySelector('#logout');
  buttonLogout.addEventListener('click', logout);

  return container;
};
