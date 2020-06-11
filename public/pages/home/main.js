// Aqui serão criados os eventos de Manipulação de DOM e templates
<<<<<<< HEAD
import { newPost, loadPosts, logout, deletePost } from './data.js';

export const home = (user) => {
=======
import { newPost, loadPosts, deletePost, logout } from './data.js';

export const home = () => {
>>>>>>> 510b492aa745a46030564953d7c13ac8e5394fdd
  const container = document.createElement('div');

  container.innerHTML = ` 
      <div class="profile">
<<<<<<< HEAD
        <button id="profile">Perfil ${
          user.displayName != null ? user.displayName : 'Usuária'
        }</button>
=======
        <button id="profile">Perfil ${firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'Usuária'}</button>
>>>>>>> 510b492aa745a46030564953d7c13ac8e5394fdd
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

  const signInStatus = container.querySelector('#signin-status');
  const signIn = container.querySelector('#sign-in');
  const accountDetails = container.querySelector('#account-details');
  const signUp = container.querySelector('#sign-up');
  const postInit = container.querySelector('#post-init');

  const textPost = container.querySelector('#post-text');
  const postButton = container.querySelector('#post');
  const editButton = container.querySelector('#edit-button');
  const cancelEditBtn = container.querySelector('#cancel-edit');
<<<<<<< HEAD
  const deletePostBtn = container.querySelector('#delete-post');
=======
>>>>>>> 510b492aa745a46030564953d7c13ac8e5394fdd
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
<<<<<<< HEAD
      )
      .join('');
=======
      const deletePostBtn = template.querySelector('#delete-post');
      deletePostBtn.addEventListener('click', (event) => {
        deletePost(deletePostBtn.dataset.postid)
      });
      timeline.appendChild(template)
    })
    .join('');
>>>>>>> 510b492aa745a46030564953d7c13ac8e5394fdd
  };

  postButton.addEventListener('click', (event) => {
    event.preventDefault();
    newPost(textPost.value);
<<<<<<< HEAD
    timeline.innerHTML = '';
    loadPosts(postTemplate).then((clear) => {
      textPost = '';
    });
  });

  deletePostBtn.addEventListener('click', (event) => {
    console.log('oi');
  });

  buttonLogout.addEventListener('click', logout); // Executa a função de logout
=======
<<<<<<< HEAD
    timeline.innerHTML = "";
    loadPosts(postTemplate).then((clear) => {
      textPost = "";
    });
  });

  deletePostBtn.addEventListener("click", (event) => {
    console.log("oi");
  });

  buttonLogout.addEventListener("click", logout); // Executa a função de logout
>>>>>>> 510b492aa745a46030564953d7c13ac8e5394fdd

  //buttonLogout.addEventListener("click", (event) => {
  //  event.preventDefault();
  //});
=======
    timeline.innerHTML = '';
    loadPosts(postTemplate)
    //.then(clear => {textPost = ''});
  });
>>>>>>> bdd906ecf32f12830759f200cfb55833886285a6

  buttonLogout.addEventListener('click', logout);
  return container;
};
