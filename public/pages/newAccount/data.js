export const handleSignUp = () => {
  const createButton = document.querySelector('#create-count');
  createButton.addEventListener('click', () => {
    const email = document.querySelector('#account-user').value;
    const password = document.querySelector('#account-pass').value;
    if (email.length <= 5) {
      alert('Por favor insira um endereço de e-mail válido.');
      return;
    }
    if (password.length <= 6) {
      alert('Por favor insira uma senha.');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/senha muito fraca') {
          alert('Senha muito fraca.');
        } else {
          alert(errorMessage);
        }
        return error;
      });
  });
};

/*
export const validatePassword = () => {
  const confirmPass = document.querySelector('#confirm-pass');
  const password = document.querySelector('#account-pass');
  if(password.value != confirmPass.value){
    confirmPass.setCustomValidity('As senhas não são iguais');
  } else {
    confirmPass.setCustomValidity('');
  }
  password.onchange = validatePassword;
  confirmPass.onkeyup = validatePassword;
}
*/
