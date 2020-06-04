export const handleSignUp = () => {
  const errorsEmail = [];
  const errorsPass = [];
  const createButton = document.querySelector('#create-count');
  createButton.addEventListener('click', () => {
    const email = document.querySelector('#account-user').value;
    const password = document.querySelector('#account-pass').value;
    if (email.length <= 5) {
      errorsEmail.push('Por favor, insira um endereço de e-mail válido.');
    }
    if (password.search(/[a-z]/i) < 0) {
      errorsPass.push('Sua senha deve conter pelo menos uma letra.');
    }
    if (password.search(/[0-6]/i) < 0) {
      errorsPass.push('Sua senha deve conter pelo menos um dígito.');
    }
    if (password.length <= 6) {
      errorsPass.push('Por favor insira uma senha.');
    }

    if (errorsEmail) {
      const validationField = document.getElementById('email-alert');
      validationField.innerHTML = errorsEmail.join('');
      return;
    }
    if (errorsPass) {
      const validationField = document.getElementById('pass-alert');
      validationField.innerHTML = errorsPass.join('');
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
