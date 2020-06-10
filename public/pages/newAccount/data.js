export const handleSignUp = ({ email, password }, callback) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      //apos criar usuario ja envia o email de verificacao da conta
      firebase.auth().currentUser.sendEmailVerification();
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
