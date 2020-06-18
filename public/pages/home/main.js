// Aqui serão criados os eventos de Manipulação de DOM e templates
import { newPost, loadPosts, deletePost, likePost, logout, updateEdit, orderBy} from './data.js';

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
          <div class='top'>
            <p>publicado por <strong>${post.userName}</strong></p>
            <button id='edit-button' type='submit'>Editar</button>
            <button id='cancel-edit' type='submit'>Cancelar</button>                       
            <button id='save-edit' type='submit' data-postid=${post.id}>Salvar</button>
          </div>
          <div class='text'>
            <textarea id='edit-text-area' disabled='disabled' rows='1'>${post.text}</textarea>
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

        // Enables the textarea to edit the post
        const editButton = template.querySelector('#edit-button');
        editButton.setAttribute('hidden', 'true');
        editButton.addEventListener('click', () => {
          event.preventDefault();
          editButton.setAttribute('hidden', 'true');
          cancelEditBtn.removeAttribute('hidden');
          saveEditBtn.removeAttribute('hidden');
          editTextArea.disabled = false;
        });

        // Cancels the editing and resets text
        const resetFormTemplate = template.querySelector('#template-form');
        const cancelEditBtn = template.querySelector('#cancel-edit'); 
        cancelEditBtn.setAttribute('hidden', 'true');     
        cancelEditBtn.addEventListener('click', () => {
          event.preventDefault();
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
          resetFormTemplate.reset();
        });

        // Saves editing changes to the database
        const saveEditBtn = template.querySelector('#save-edit');
        saveEditBtn.setAttribute('hidden', 'true');
        saveEditBtn.addEventListener('click', () => {
          event.preventDefault();          
          editButton.removeAttribute('hidden');
          cancelEditBtn.setAttribute('hidden', 'true');
          saveEditBtn.setAttribute('hidden', 'true');
          updateEdit(saveEditBtn.dataset.postid, editTextArea.value);
          resetForm.reset();
        });

        // Autoresizes the textarea
        const editTextArea = template.querySelector('#edit-text-area');


        // Likes the post when clicked
        const likeButton = template.querySelector('#like-button');
        likeButton.addEventListener('click', () => {
          event.preventDefault();
          likePost(likeButton.dataset.postid, firebase.auth().currentUser.uid);
        });

        // Deletes the post when clicked
        const deletePostBtn = template.querySelector('#delete-post');
        deletePostBtn.setAttribute('hidden', 'true');
        deletePostBtn.addEventListener('click', () => {
          event.preventDefault();
          deletePost(deletePostBtn.dataset.postid);
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
    newPost(textPost.value, postPrivate.value); //Passei ele como parametro aqui também.
    textPost.value = '';
    timeline.innerHTML = '';
    loadPosts(postTemplate);
    resetForm.reset();
  });
  
  // Logout when clicked
  const buttonLogout = container.querySelector("#logout");
  buttonLogout.addEventListener("click", logout);

  return container;
};

//const showCancel = cancelEditBtn.removeAttribute('hidden');
//const hideCancel = cancelEditBtn.setAttribute('hidden', 'true');
//const showSave = saveEditBtn.removeAttribute('hidden');
//const hideSave = saveEditBtn.setAttribute('hidden', 'true');

/*
<div id="profile">
  <img src="${post.photoURL}" class="pic-user">
</div>
*/