// Aqui serão criados os eventos de Manipulação de DOM e templates
import { newPost, loadPosts, logout, deletePost } from "./data.js";

export const home = (user) => {
  const container = document.createElement("div");

  container.innerHTML = ` 
      <div class="profile">
        <button id="profile">Perfil ${
          user.displayName != null ? user.displayName : "Usuária"
        }</button>
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

  const textPost = container.querySelector("#post-text");
  const postButton = container.querySelector("#post");
  const editButton = container.querySelector("#edit-button");
  const cancelEditBtn = container.querySelector("#cancel-edit");
  const deletePostBtn = container.querySelector("#delete-post");
  const postPublic = container.querySelector("#public");
  const postPrivate = container.querySelector("#privacy");
  const likeButton = container.querySelector("#like");
  const addImage = container.querySelector("#image");
  const timeline = container.querySelector("#timeline");
  const buttonLogout = container.querySelector("#logout");

  const postTemplate = (array) => {
    timeline.innerHTML = array
      .map(
        (post) => `<p>${post.text}</p>
        <button id="edit-post">Editar</button>
        <button id="cancel-edit"></i>Cancelar</button>
        <button id="delete-post" data-postId= ${post.id}>Delete</button>
        <div id='numbers-like'>${post.likes}<div>
        <button id='like'>Like</button>
      `
      )
      .join("");
  };

  postButton.addEventListener("click", (event) => {
    event.preventDefault();
    newPost(textPost.value);
    timeline.innerHTML = "";
    loadPosts(postTemplate).then((clear) => {
      textPost = "";
    });
  });

  deletePostBtn.addEventListener("click", (event) => {
    console.log("oi");
  });

  buttonLogout.addEventListener("click", logout); // Executa a função de logout

  //buttonLogout.addEventListener("click", (event) => {
  //  event.preventDefault();
  //});

  return container;
};
