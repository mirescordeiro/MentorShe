export const handleSignUp = ({ email, password, name }, callback) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      firebase.auth().currentUser.sendEmailVerification();
      firebase.auth().currentUser.updateProfile({ displayName: name });
      callback(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/weak-password') {
        callback('Senha inválida');
      }
      if (errorCode === 'auth/invalid-email') {
        callback('Email inválido');
      }
      callback(error.message);
    });
};
