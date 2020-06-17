// Aqui serão criados os eventos de Manipulação de DOM e templates
import {
  newPost,
  loadPosts,
  deletePost,
  likePost,
  logout,
  getUrlPhoto,
  getUserName,
} from "./data.js";

export const home = () => {
  const container = document.createElement("div");
  container.classList.add("container-home");

  container.innerHTML = ` 
    <header>
      <nav>
        <h1 id='logo-home'>mentor<strong id="strong">she</strong></h1>
        <button id="logout">Sair</button>    
      </nav>
    </header>
    <section class="news">
      <div class='flex'>
      <!-- <div id="profile"></div> -->
      <!-- <img src="${getUrlPhoto()}" class="pic-user"> -->
        <form id="post-form" class="post">
          <textarea name="post" id="post-text" placeholder="Compartilhe Conhecimento!"></textarea>
          <button id="publish" type="submit">Compartilhar</button>
          <input type="checkbox" class="private-post" id="privacy">Privado</input>
          <!-- <button id="edit-button">Editar</button> -->
        </form>
      </div>
      <div id='timeline'></div>
    </section>
    `;

  //Edit post when clicked
  // const editPost = container.querySelector("#edit-button");
  // editPost.addEventListener("click", () => {
  //   home(editPost.dataset.postid);
  // });

  const resetForm = container.querySelector("#post-form");
  const textPost = container.querySelector("#post-text");
  const cancelEditBtn = container.querySelector("#cancel-edit");
  const postPrivate = container.querySelector("#privacy");
  const addImage = container.querySelector("#image");
  const timeline = container.querySelector("#timeline");

  const postTemplate = (array) => {
    timeline.innerHTML = "";

    array
      .map((post) => {
        const template = document.createElement("div");
        template.classList.add("flex");

        template.innerHTML = `        
        <div class='all-posts'>
          <div class='top'>
            <p>publicado por <strong>${post.userName}</strong></p>
          </div>
          <div class='text'>
            <p>${post.text}</p>
          </div>
          <div class='bottom'>
            <div class='flex like'>
              <button id='like-button' data-postid= ${post.id}><span class='icon-like'></span></button>
              <p id='numbers-like'>${post.likes}<p>
            </div>
            <button id="delete-post" class="delete" data-postid= ${post.id}><span class='icon-delete'></span></button>
          </div>
        </div>
      `;

        // Deletes the post when clicked
        const deletePostBtn = template.querySelector("#delete-post");
        deletePostBtn.addEventListener("click", () => {
          deletePost(deletePostBtn.dataset.postid);
        });

        // Likes the post when clicked
        const likeButton = template.querySelector("#like-button");
        likeButton.addEventListener("click", () => {
          likePost(likeButton.dataset.postid, firebase.auth().currentUser.uid);
        });

        // Refresh timeline
        timeline.appendChild(template);
      })
      .join("");
  };

  timeline.innerHTML = loadPosts(postTemplate);

  const postButton = container.querySelector("#publish");
  postButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (textPost.value === "") {
      return;
    }
    newPost(textPost.value);
    timeline.innerHTML = "";
    loadPosts(postTemplate);
    resetForm.reset();
  });

  const buttonLogout = container.querySelector("#logout");
  buttonLogout.addEventListener("click", logout);

  // const profileSection = container.querySelector("#profile");
  // const profile = () => {
  //   profileSection.classList.add("container-profile");

  //   profileSection.innerHTML = ` 
  //     <div class="image-profile">
  //       <img class="image" src"">
  //       <button id="change-image">Foto de perfil</button>
  //     </div>  
  //     <div class="profile-details">
  //         <h1>
  //           <p>${getUserName()}</p>         
  //       </h1>
  //         <p class="profile-description"></p>
  //     </div>
  //     `;
  // };

  // profile();

  return container;
};
