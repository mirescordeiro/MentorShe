import {
  updateProfile
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
          <form id='resetForm' class='flex column register'>
            <label for='name'>Nome</label>
            <textarea id='new-name' disabled='disabled' required>${user.displayName}</textarea>

            <label for='name'>Você gostaria de ser mentora ou aluna?</label>
            <select name='mentorship' id='mentor-student' disabled>
              <option value=''>Escolha uma opção</option>
              <option value='Mentora'>Mentora</option>
              <option value='Aluna'>Aluna</option>
            </select>

            <label for='languages'>Linguagens</label>
            <textarea id='languages' disabled='disabled' placeholder='Qual sua linguagem favorita?' required></textarea>
            <button id='edit-profile' type='submit'>Editar</button>
            <button id='save-profile' type='submit'>Salvar</button>
            <button id='cancel' type='submit'>Cancelar</button>
          </form>
        </div>
      </section>
    `;

    firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .onSnapshot((doc) => {
      container.querySelector('#languages').value = doc.data().languages;
    });
    
  const newName = container.querySelector('#new-name');
  const mentorship = container.querySelector('#mentor-student');
  const languages = container.querySelector('#languages');
  const editProfile = container.querySelector('#edit-profile');
  const cancelEdit = container.querySelector('#cancel');
  const saveProfile = container.querySelector('#save-profile');
  const resetForm = container.querySelector('#resetForm');

  editProfile.hidden = false;
  editProfile.addEventListener('click', (event) => {
    event.preventDefault();
    editProfile.hidden = true;
    cancelEdit.hidden = false;
    saveProfile.hidden = false;
    newName.disabled = false;
    languages.disabled = false;
    mentorship.disabled = false;

  });

  saveProfile.hidden = true;
  saveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    editProfile.hidden = false;
    cancelEdit.hidden = true;
    saveProfile.hidden = true;
    newName.disabled = true;
    languages.disabled = true;
    mentorship.disabled = true;
    updateProfile(user.uid, newName.value, mentorship.value, languages.value ); 
  });
  
  cancelEdit.hidden = true;
  cancelEdit.addEventListener('click', (event) => {
    event.preventDefault();
    editProfile.hidden = false;
    cancelEdit.hidden = true;
    saveProfile.hidden = true;
    newName.disabled = true;
    languages.disabled = true;
    mentorship.disabled = true;
    resetForm.reset();
  });
  
  return container;
};
