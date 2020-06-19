export const handleSignUp = (document, callback, name) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(document.email, document.password)
    .then((cred) => {    
      cred.user.updateProfile({ displayName: name})
      cred.user.updateProfile({ photoURL: 'https://conteudo.imguol.com.br/c/entretenimento/dd/2019/04/05/gatos-sao-capazes-de-responder-aos-seus-proprios-nomes-1554503168561_v2_1920x1282.jpg'});
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
