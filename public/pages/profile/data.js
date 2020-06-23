export const getUserName = () => {
  return firebase.auth().currentUsergetUrlPhoto != null
    ? firebase.auth().currentUser.displayName
    : "";
};

export const getUrlPhoto = () => {
  if (firebase.auth().currentUser != null) {
    return firebase.auth().currentUser.photoURL;
  }
};

export const resetEmail = (userResetPassword) => {
  firebase
    .auth()
    .currentUser.EmailAuthProvider.credential(user.email, userResetPassword);
  return resetEmail();
};

export const resetPassword = () => {
  firebase.auth().currentUser.getASecureRandomPassword();
  user
    .updatePassword(newPassword)
    .then(() => {
      console.log("Senha alterada com sucesso!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const updateProfile = (profile, callback) => {
  firebase
    .auth()
    .currentUser.updateProfile({
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    })
    .then(() => {
      updatePostsUser(profile.uid, profile.displayName, callback);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};
