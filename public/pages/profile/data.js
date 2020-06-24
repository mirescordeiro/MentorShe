//Update profile name
export const updateProfileName = (user, newName) => {
  firebase
    .auth()
    .update({
      userName: updateProfileName(newName),
      user: user.uid,
      // mentor: false,
      // student: false,
      languages: [],
    })
    .then((user) => {
      user.updateProfile({displayName: newName,})    
    })
};

//Update profile
export const updateProfile = (user) => {
  firebase
    .auth()
    .collection('users').doc(user.uid)
    .update({
      userName: newName,
      mentor: user.bio,
      student: user.bio,
      languages: user.languages,
    })
    .then((user) => {
      updateProfile({userName: user.displayName});
    })
    .catch((error) => {
      // console.error("Error to update profile: ", error);
    });
};

export const newUser = (user) => {
  firebase
    .firestore()
    .collection('users').doc(user.uid)
    .set({
      userName: user.displayName,
      user: user.uid,
      mentor: true,
      student: true,
      languages: [],
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const checkUser = (user) => {
  console.log(user);
  const load = firebase
  .firestore()
  .collection('users').doc(user.uid)
  load.get().then((doc) => {
    if (!doc.exists) {
      newUser(user);
    }
  });
};

//Update photo user
// export const updatePhoto = (user, callback) => {
//   firebase
//     .firestore()
//     .collection("users")
//     .add({
//       photoURL: user.photoURL,
//       user: user.uid,
//     })
//     .then(() => {
//       updatePhotoUser(user.uid, user.photoURL, callback);
//     })
//     .catch((error) => {
//       console.error("Error to update photography: ", error);
//     })

// }

// Logout redirecting to the #login page
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";
    });
};
