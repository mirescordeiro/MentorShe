// Login with email
export const toggleSignIn = ({ email, password }, callback) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      callback(user);
      newUser(user); // array union
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

export const newUser = (user) => {
  firebase
    .firestore()
    .collection("users").doc(user.uid)
    .add({
      userName: user.displayName,
      user: user.uid,
      mentor: false,
      languages: [],
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};