import { getUserName, getUrlPhoto, resetEmail, resetPassword, updateProfile } from "./data.js";

export const profile = () => {
  const container = document.createElement("div");
  container.classList.add("profile-feed");

  container.innerHTML = `
    
    <section id='user-profile' class='flex center row-desk data'>
      <div>
        <figure class="photo-profile">
          <img src='' alt="Foto do perfil">
        </figure>
        </div>
        <div class="user">
          <input id='new-name' type='text' placeholder='Digite seu nome'>
          <input id='bio' type='text' name="Linguagens "placeholder='Quais suas linguagens favoritas?'>
           <button id ="profile" type="submit">Perfil</button>
           <button id ="edit-profile" type="submit">Editar Perfil</button>
           <button id ="edit-photo" type="submit">Editar foto</button>
           <button id='cancel'>Cancelar</button>
           <button id='save-profile'>Salvar</button>
           <button id="reset-password" type="submit">Resetar Senha</button>
           <button id="reset-email" type="submit">Resetar Email</button>
        </div>
    </section>
    `;
};

const photoProfile = container.querySelector('#photo-profile');
const updateNameProfile = container.querySelector('#new-name');
const bioProfile = container.querySelector('#bio');
const profileName = container.querySelector('#profile');
const editProfile = container.querySelector('#edit-profile');
const editPhoto = container.querySelector('edith-photo');
const cancelEditProfile = container.querySelector('#cancel');
const saveProfile = container.querySelector('#save-profile');
const resetUserPassword = container.querySelector('#reset-password');
const resetUserEmail = container.querySelector('#reset-email');

editPhoto.addEventListener('click', (event) => {
    event.preventDefault();
    fileProfile();
});

cancelEditProfile.addEventListener('click', (event) => {
    event.preventDefault();
});

saveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    updateProfile();
});

resetUserPassword.add('click', (event) => {
    event.preventDefault();
    resetPassword()
});

resetUserEmail.addEventListener('click', (event) => {
    event.preventDefault();
    resetEmail();
});

return container;

