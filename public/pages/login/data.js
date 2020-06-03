export  function toggleSignIn() {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut();
    } else {
      let email = document.querySelector('#user-email').value;
      let password = document.querySelector('#user-pass').value;
      let loginButton = document.querySelector('#login-button').value;
      if (email.length <= 5) {
        alert('Por favor insira um endereço de e-mail.');
        return;
      }
      if (password.length <= 6) {
        alert('Por favor insira uma senha.');
        return;
      }
     
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'senha muito fraca') {
          alert('Senha errada.');
        } else {
          alert(errorMessage);
        }
        return (error);
      });
  }
