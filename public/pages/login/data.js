export const toggleSignIn = () => {
  const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const strongPass = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const invalidPassLogin = [];
  const invalidEmailLogin = [];
  const loginButton = document.querySelector('#login-button');
  const validationPassLogin = document.querySelector('#pass-alert');
  const validationMailLogin = document.querySelector('#email-alert');

  loginButton.addEventListener('click', () => {
    validationPassLogin.innerHTML = '';
    validationMailLogin.innerHTML = '';

    const email = document.querySelector('#user-email').value;
    const password = document.querySelector('#user-pass').value;

    if (!mailformat.test(email)) {
      invalidEmailLogin.push('Email inválido');
    }

    if (!strongPass.test(password)) {
      invalidPassLogin.push('Senha inválida');
    }

    if (invalidPassLogin.length > 0 || invalidEmailLogin.length > 0) {
      validationPassLogin.innerHTML = invalidPassLogin.join('');
      validationMailLogin.innerHTML = invalidEmailLogin.join('');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'senha muito fraca') {
          invalidPassLogin.push('senha muito fraca');
          validationPassLogin.innerHTML = invalidPassLogin.join('');
        } else {
          validationPassLogin.innerHTML = errorMessage;
          validationMailLogin.innerHTML = errorMessage;
        }
        return error;
      });
  });
};
