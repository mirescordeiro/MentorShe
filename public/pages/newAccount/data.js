export function handleSignUp() {
  let email = document.querySelector("#user-email").value;
  let password = document.querySelector("#user-pass").value;
  let loginButton = document.querySelector("#login-button").value;
  if (email.length <= 5) {
    alert("Por favor insira um endereço de e-mail válido.");
    return;
  }
  if (password.length <= 6) {
    alert("Por favor insira uma senha.");
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/senha muito fraca") {
        alert("Senha muito fraca.");
      } else {
        alert(errorMessage);
      }
      return error;
    });
}
