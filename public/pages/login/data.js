export const toggleSignIn = () => {
  const loginButton = document.querySelector('#login-button');
  loginButton.addEventListener('click', () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      const email = document.querySelector('#user-email').value;
      const password = document.querySelector('#user-pass').value;
      if (email.length <= 5) {
        const alert = document.querySelector('#email-alert');
        alert.innerHTML = 'Por favor insira um endereço de e-mail.';
        return;
      }
      if (password.length <= 6) {
        const alertPass = document.querySelector('#pass-alert');
        alertPass.innerHTML = 'Por favor insira uma senha.';
        return;
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
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
  });
};
