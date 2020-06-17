export const handleSignUp = ({ email, password, name }, callback) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // apos criar usuario ja envia o email de verificacao da conta
      firebase.auth().currentUser.sendEmailVerification();
      firebase.auth().currentUser.updateProfile({ displayName: name }); //  Estava chamando o callback depois desta linha sendo que estou tratando ele no catch
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
