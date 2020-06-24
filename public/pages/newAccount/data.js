export const handleSignUp = (document, callback, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(document.email, document.password)
    .then((cred) => {    
      cred.user.updateProfile({ displayName: name})
      cred.user.updateProfile({ photoURL: 'https://firebasestorage.googleapis.com/v0/b/social-network-2b0a2.appspot.com/o/avatar.png?alt=media&token=f90343ed-a939-45fe-9155-d65f90cae71f'});
      newUser(cred.user)
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

