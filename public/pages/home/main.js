import {
  newPost, loadPosts, deletePost, likePost, logout, updateEdit, updatePrivacy
} from './data.js';

export const home = () => {
  const container = document.createElement('div');
  container.classList.add('container-home');

  container.innerHTML = ` 
    <header>

    <div id="menu-bar">
      <div id="menu">
        <div id="bar1" class="bar"></div>
        <div id="bar2" class="bar"></div>
        <div id="bar3" class="bar"></div>
      </div>
      <ul class="nav-home" id="nav-home">
        <li id="li-feed"><a href="#home">Feed</a></li>
        <li id="li-profile"><a href="#">Perfil</a></li>
      </ul>
    </div>
    <div class="menu-bg" id="menu-bg"></div>

      <nav>
        <h1 id='logo-home'>mentor<strong id='strong'>she</strong></h1>
        <label>
          <img src='./img/logout.svg' alt="Ícone de uma porta aberta">
          <button id='logout'>Sair</button>
        </label>
      </nav>
    </header>
    <div class='flex row-desk'>
      <section class='profile'>
        <figure>
          <img src='' alt="Foto do perfil">
        </figure>
        <div>
          <figure>
            <img src='' alt='Foto da usuária'>
            <figcaption></figcaption>
          </figure>
        </div>
      </section>
      <section class='news'>
        <div class='flex'>
          <form id='post-form' class='post'>
            <textarea name='post' id='post-text' placeholder='Compartilhe Conhecimento!'></textarea>
            <div class='post-options'>
              <div class='privacy'>
                <label>PRIVADO</label>
                <label class="switch">
                  <input type="checkbox" id="privacy">
                  <span class="slider round"></span>
                </label>
              </div>
              <button id='publish' type='submit'>Compartilhar</button>
            </div>
          </form>
        </div>
        <section id='timeline'></section>
      </section>
    </div>
    `;

  // Menu Hambúrguer
  const menu = container.querySelector('#menu');
  menu.addEventListener('click', showMenu());

  function showMenu(){
    container.querySelector('#menu').classList.toggle('change');
    container.querySelector('#nav-home').classList.toggle('change');
    container.querySelector('#menu-bg').classList.toggle('change-bg');
  };

  // Container variables
  const resetForm = container.querySelector('#post-form');
  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#publish');
  const postPrivate = container.querySelector('#privacy');
  const timeline = container.querySelector('#timeline');

  const postTemplate = (array) => {
    timeline.innerHTML = '';

    array
      .map((post) => {
        console.log('egua', post)
        const template = document.createElement('div');
        template.classList.add('flex');

        template.innerHTML = `        
        <form id='template-form' class='all-posts'>
          <div class='top'>
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
            <textarea id='edit-text-area' disabled='disabled' rows='1'>${post.text}</textarea>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid=${post.id}><span class='icon-like'></span></button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <div id='private' class='private'>
              <div class='privacy'>
                <label>PRIVADO</label>
                <label class="switch">
                  <input type="checkbox" id="editPrivacy" data-postid=${post.id}>
                  <span class="slider round"></span>
                </label>
              </div>
              <button id='delete-post' class='delete' data-postid=${post.id}><span class='icon-delete'></span></button>
            </div>
          </div>
        </form>
      `;

        // Template variables
        const resetFormTemplate = template.querySelector('#template-form');
        const privateBtns = template.querySelector('#private');
        const editButton = template.querySelector('#edit-button');
        const cancelEditBtn = template.querySelector('#cancel-edit');
        const saveEditBtn = template.querySelector('#save-edit');
        const editTextArea = template.querySelector('#edit-text-area');
        const likeButton = template.querySelector('#like-button');
        const deletePostBtn = template.querySelector('#delete-post');
        const editPrivacy = template.querySelector('#editPrivacy');

        // Identifies if the currentUser has editing privileges
        function loggedUser() {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              if (user.uid === post.user) {
                editButton.hidden = false;
                cancelEditBtn.hidden = true;
                saveEditBtn.hidden = true;
                privateBtns.style.visibility='visible';
              } else {
                editButton.hidden = true;
                cancelEditBtn.hidden = true;
                saveEditBtn.hidden = true;
                privateBtns.style.visibility='hidden';
              }
            }
          });
        }

        // Enables the textarea to edit the post
        editButton.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.hidden = true;
          cancelEditBtn.hidden = false;
          saveEditBtn.hidden = false;
          editTextArea.disabled = false;
        });

        // Cancels the editing and resets text
        cancelEditBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.hidden = false;
          cancelEditBtn.hidden = true;
          saveEditBtn.hidden = true;
          editTextArea.disabled = true;
          resetFormTemplate.reset();
        });

        // Saves editing changes to the database
        saveEditBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editButton.hidden = false;
          cancelEditBtn.hidden = true;
          saveEditBtn.hidden = true;
          updateEdit(saveEditBtn.dataset.postid, editTextArea.value);
          editTextArea.disabled = true;
          resetForm.reset();
        });

        // Likes the post and deslikes on second click
        likeButton.addEventListener('click', (event) => {
          event.preventDefault();
          likePost(likeButton.dataset.postid, firebase.auth().currentUser.uid);
        });

        // Deletes the post when clicked
        deletePostBtn.addEventListener('click', (event) => {
          event.preventDefault();
          deletePost(deletePostBtn.dataset.postid);
        });

        // Verifies privacy and updates its status
        function privacyChecked() {
          if (post.privacy != true){
            editPrivacy.checked = false;
          } else {
            editPrivacy.checked = true;
          }
        };
        editPrivacy.addEventListener('change', (event) => {
          event.preventDefault();
          updatePrivacy(editPrivacy.dataset.postid, editPrivacy.checked);
        })

        // Autoresizes the textarea
        function resizeTextArea() {
          timeline.querySelectorAll('textarea').forEach((text) => {
            text.style.height = 'auto';
            text.style.height = text.scrollHeight + 'px';
          });
        };

        loggedUser();
        resizeTextArea();
        privacyChecked();

        // Push into the timeline
        timeline.appendChild(template);
      })
      .join('');
  };

  // Refresh timeline
  setTimeout(() => { timeline.innerHtml = loadPosts(postTemplate) }, 100);

  // Generates new post when clicked
  postButton.addEventListener('click', (event) => {
    event.preventDefault();
    newPost(textPost.value, postPrivate.checked);
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
