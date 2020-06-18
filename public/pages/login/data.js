// Login with email
export const toggleSignIn = ({ email, password }, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      callback(user);
    })
    .catch((error) => {
      callback(error);
    });
};

// Login with Google account
export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.location.hash = 'home';
    })
    .catch((error) => {
      handleError(error);
    });
};

// Login with GitHub account
export const loginGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('user');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.location.hash = 'home';
    })
    .catch((error) => {
      handleError(error);
    });
};

/*
export const ResetEmail = () => {
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress)
    .then(function () {
      emailAddress.push('verifique seu e-mail para instruções de redefinição da senha');
    }).catch(function (error) {
      emailAddress.error('Ocorreu um erro inesperado');
});
};
*/
