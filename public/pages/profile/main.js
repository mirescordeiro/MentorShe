import {
  updateProfileName, updateProfile, logout
} from "./data.js";

export const profile = (user) => {
  const container = document.createElement("div");
  container.classList.add("profile-feed");
    container.innerHTML = `
      <section id='user-profile' class='flex center row-desk data'>
        <figure class="photo-profile">
          <img src='${user.photoURL}' alt="Foto do perfil">
        </figure>
        <div class="user" class='flex center column data'>
          <h2>Perfil</h2>
          <form class='flex column register'>
            <label for='name'>Nome</label>
            <textarea id='new-name' disabled='disabled' required>${user.displayName}</textarea>

            <select name='bio' id='mentor-studdent'>
              <option value='mentor'>Mentora</option>
              <option value='student'>Aluna</option>
            </select>

            <label for='languages'>Linguagens</label>
            <textarea id='languages' disabled='disabled' placeholder='Qual sua linguagem favorita?' required>${user.uid}</textarea>
            <button id='edit-profile' type='submit'>Editar</button>
            <button id='save-profile' type='submit'>Salvar</button>
            <button id='cancel' type='submit'>Cancelar</button>
          </form>
        </div>
      </section>
    `;

  const profileName = container.querySelector('#profile');
  const profilePhoto = container.querySelector('#photo-profile');
  const newName = container.querySelector('#new-name').value;
  const languages = container.querySelector('#languages').value;
  const editProfile = container.querySelector('#edit-profile');
  const cancelEdit = container.querySelector('#cancel');
  const saveProfile = container.querySelector('#save-profile');
  const bio = container.querySelector('#mentor-student').value;

  /*  editPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    fileProfile();
  }); */


  // Identifies if the currentUser has editing privileges
  function loggedUser () {
    if (user.uid === user.user) {
      editProfile.hidden = false;
      cancelEdit.hidden = true;
      saveProfile.hidden = true;
    } else {
      editProfile.hidden = false;
      cancelEdit.hidden = true;
      saveProfile.hidden = true;
    }
  };

  editProfile.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Editar perfil');
    editProfile.hidden = true;
    cancelEdit.hidden = false;
    saveProfile.hidden = false;
    newName.disabled = false;
    languages.disabled = false;

  });

  saveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    editProfile.hidden = false;
    cancelEdit.hidden = true;
    saveProfile.hidden = true;
    newName.disabled = true;
    languages.disabled = true;
    console.log('Salvar edição');
    updateProfile(user, languages, bio);
  });
  
  cancelEdit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Cancelar edição');
    editProfile.hidden = false;
    cancelEdit.hidden = true;
    saveProfile.hidden = true;
    newName.disabled = true;
    languages.disabled = true;
  });
  
  return container;
};
