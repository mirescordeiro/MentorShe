//Update profile name
const updateProfileName = (newName) => {
  firebase
  .auth()
  .currentUser.updateProfile({displayName: newName,})    
};

//Update profile
export const updateProfile = (user, newName, newMentorship, newLanguages) => {
  firebase
    .firestore()
    .collection('users')
    .doc(user)
    .update({
      userName: newName,
      mentorship: newMentorship,
      languages: newLanguages,
    })
    .then(() => {
      updateProfileName(newName);
      console.log("Edited user successfully!");
    })
    .catch(() => {
      console.error("You cannot cancel this edit");
    });
};

// Logout redirecting to the #login page
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";
    });
};
