export const toggleSignIn = () => {
  const errors = [];
  const loginButton = document.querySelector('#login-button');
  loginButton.addEventListener('click', () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      const email = document.querySelector('#user-email').value;
      const password = document.querySelector('#user-pass').value;
      if (email.length <= 5) {
        errors.push('Por favor insira um endereço de e-mail.');
        return;
      }
      if (password.search(/[a-z]/i) < 0) {
        errors.push('Sua senha deve conter pelo menos uma letra.');
      }
      if (password.search(/[0-6]/i) < 0) {
        errors.push('Sua senha deve conter pelo menos um dígito.');
      }
      if (password.length <= 6) {
        errors.push('Por favor insira uma senha.');
        return;
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "senha muito fraca") {
            alert("Senha errada.");
          } else {
            alert(errorMessage);
          }
          return error;
        });
    }
  });
};
