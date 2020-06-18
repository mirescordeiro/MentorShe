export const handleSignUp = ({ email, password }, callback) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      // After creating the user sends an email to verify adress
      firebase.auth().currentUser.sendEmailVerification();
      firebase.auth().currentUser.updateProfile({ displayName: name });
    })
    .catch((error) => {
      const errorCode = error.code;
      callback(error.message);
      if (errorCode === 'auth/weak-password') {
        callback('Senha inválida');
      }
      if (errorCode === 'auth/invalid-email') {
        callback('E-mail inválido');
      }
      if (errorCode === 'auth/email-already-in-use') {
        callback('Este e-mail já está sendo utilizado');
      }
      if (errorCode === 'auth/operation-not-allowed') {
        callback('Este e-mail/senha não está ativo');
      }
    });
};
