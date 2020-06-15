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
/*
// Função para logar com a conta Github

// export const provider = new firebase.auth.GithubAuthProvider();

// firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  //   const token = result.credential.accessToken;
  //   // The signed-in user info.
  //   const user = result.user;
  //   // ...
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.email;
  // });
*/

/* CATCH LOGIN COM GOOGLE
.catch(function (error) {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
// ... 
});*/