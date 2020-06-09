export const handleSignUp = () => {
  const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const strongPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const invalidPass = [];
  const invalidEmail = [];
  const createButton = document.querySelector('#create-count');
  const validationPass = document.querySelector('#pass-alert');
  const validationMail = document.querySelector('#email-alert');
  const validation = document.querySelector('#validation');

  createButton.addEventListener('click', () => {
    validation.innerHTML = '';
    validationMail.innerHTML = '';
    validationPass.innerHTML = '';

    const email = document.querySelector('#account-user').value;
    const password = document.querySelector('#account-pass').value;

    if (!mailformat.test(email)) {
      invalidEmail.push('Email inválido');
    }

    if (!strongPass.test(password)) {
      invalidPass.push('Senha inválida');
    }

    if (invalidPass.length > 0 || invalidEmail.length > 0) {
      validationPass.innerHTML = invalidPass.join('');
      validationMail.innerHTML = invalidEmail.join('');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/senha muito fraca') {
          invalidPass.push('Senha muito fraca.');
          validationPass.innerHTML = invalidPass.join('');
        } else {
          validation.innerHTML = errorMessage;
        }
        return error;
      });
  });
};
