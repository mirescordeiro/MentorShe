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

// Função para logar com a conta Google.

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.location.hash = 'home';
      // const token = result.credential.accessToken;
      // const user = result.user;
    });
};

// Função para logar com a conta Github
export const loginGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  provider.addScope('photoURL');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.location.hash = 'home';
      // const token = result.credential.accessToken;
      // const user = result.user;
    });
};

// Função para logar com a conta Facebook
export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      window.location.hash = 'home';
      // const token = result.credential.accessToken;
      // const user = result.user;
    });
};

// CATCH LOGIN COM GITHUB
    /*
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
    });*/

/* CATCH LOGIN COM GOOGLE
.catch(function (error) {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
// ... 
});*/

export const ResetEmail = () => {
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress)
.then(function() {
  emailAddress.push('verifique seu e-mail para instruções de redefinição da senha');
}).catch(function(error) {
  emailAddress.error('Ocorreu um erro inesperado');
});
}
