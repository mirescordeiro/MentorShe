export function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.querySelector('#user-email').value;
    const password = document.querySelector('#user-pass').value;
    const loginButton = document.querySelector('#login-button').value;
    if (email.length <= 5) {
      alert('Por favor insira um endereço de e-mail.');
      return;
    }
    if (password.length <= 6) {
      alert('Por favor insira uma senha.');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password, loginButton)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'senha muito fraca') {
          alert('Senha errada.');
        } else {
          alert(errorMessage);
        }
        return error;
      });
  }
}
