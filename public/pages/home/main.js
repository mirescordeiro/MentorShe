// Aqui serão criados os eventos de Manipulação de DOM e templates
<<<<<<< HEAD
import { newPost, loadPosts, deletePost, likePost, logout } from "./data.js";
=======
import { newPost, loadPosts, deletePost, likePost, logout } from './data.js';
//  import { loadPosts } from './data.js';
//  import { deletePost } from './data.js';
//  import { logout } from './data.js';
//  import { likePost } from './data.js';
>>>>>>> 49c632fb5672116a58a776a5cb1080fefc713548

export const home = () => {
  const container = document.createElement("div");
  container.classList.add('container-home');


  container.innerHTML = ` 
    <header>
      <nav>
        <h1 id='logo-home'>mentor<strong id="strong">she</strong></h1>
        <button id="logout">Sair</button>    
      </nav>
    </header>
    <section class="news">
      <div class='flex'>
        <form id="post-form" class="post">
          <textarea name="post" id="post-text" placeholder="Compartilhe Conhecimento!"></textarea>
          <button id="publish" type="submit">Compartilhar</button>
        </form>
      </div>
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
        const template = document.createElement("div");
        template.classList.add('flex');

        template.innerHTML = `
        <div class='all-posts'>
          <div class='top'>
            <p>publicado por <strong>Nome do usuário</strong></p>
          </div>
          <div class='text'>
            <p>${post.text}</p>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid= ${post.id}>Like</button> <!-- Aqui coloquei o post.id para que o btn executasse a função de listener abaixo -->
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

        // Likes the post when clicked
<<<<<<< HEAD
        const likeButton = template.querySelector("#like-button");
        likeButton.addEventListener("click", () => {
          const likes = template.querySelector("#numbers-like");

          let numberLike = parseInt(likes.textContent);
          const isLiked = template;
          console.log('oi', template);
          if (isLiked > 0) {
            numberLike -= 1;
            likes.classList.replace(new RegExp("^|)liked(|$)", "g"), "");
          } else {
            numberLike++;
            likes.classList += "liked";
          }

          likePost(
            likeButton.dataset.postid,
            numberLike,
            firebase.auth().currentUser.uid
          );
          likes.textContent = numberLike;
=======
        const likeButton = template.querySelector('#like-button');
        likeButton.addEventListener('click', () => {
          const likes = template.querySelector('#numbers-like'); // Aqui tive q fazer uma qs com o nome correto da id, estava like e deveria ser numbers-like
          const numberLike = parseInt(likes.textContent) + 1; //  Aqui coloquei o paserint para q transformasse o texto em numero e acrescentasse mais um conforme numero de curtida

          likePost(likeButton.dataset.postid, numberLike); // Aqui só troquei o like por numberLike
          likes.textContent = numberLike; //  Aqui o texto de likes é igual o numero de like
>>>>>>> 49c632fb5672116a58a776a5cb1080fefc713548
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
