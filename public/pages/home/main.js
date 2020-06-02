// variáveis login
const email = document.querySelector("#user-email")
const password = document.querySelector("#user-pass")
const loginButton = document.querySelector("#login")

//variaveis new account
const newEmail = documet.querySelector("#account-user")
const newPass = documet.querySelector("#account-pass")
const confirmPass = documet.querySelector("#confirm-pass")
const firstName = documet.querySelector("#user-name")
const lastName = documet.querySelector("#last-name")
const createAccount = documet.querySelector("#create-count")

firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => console.log("Funcionou"))
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Não deu certo")
    // ...
  });

// Aqui serão criados os eventos de Manipulação de DOM e templates
import { greeting } from "./data.js";

export const home = () => {
  const container = document.createElement("div");

  container.innerHTML = ` 
    <form>
      <input id='name' type='text'>
      <button id='greeting-btn'>Dizer Oi</button>
    </form>
    <div id='greeting-message'></div>
  `;

  const name = container.querySelector("#name");
  const greetingBtn = container.querySelector("#greeting-btn");
  const greetingMessage = container.querySelector("#greeting-message");

  greetingBtn.addEventListener("click", (event) => {
    event.preventDefault();
    greetingMessage.innerHTML = greeting(name.value);
  });

  return container;
};
