export const newPost = (textareaPost) => {
  // Infos added in the new post
  firebase
    .firestore()
    .collection("posts")
    .add({
      text: textareaPost,
      likes: 0,
      likeUsers: [],
      comments: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// Loads all the posts and listens to the new ones
export const loadPosts = (callback) => {
  const load = firebase
    .firestore()
    .collection("posts")
    .orderBy("timestamp", "desc");
  // Listening realtime for new posts
  load.onSnapshot((querySnapshot) => {
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(posts);
  });
};

// Deletes a post using its id
export const deletePost = (postId) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// Increases the number of likes in a post using its id
export const likePost = (postId, listenClick, userId) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .get()
    .then((doc) => {
      let userIds = doc.data().likeUsers;

      if (userIds.length === 0) {
        const userArray = new Array(userId);
        updateLike(listenClick, userArray, postId);
      }

      userIds.forEach((user, index, object) => {
        if (user === userId) {
          listenClick--;
          object.splice(index, 1);
          updateLike(listenClick, object, postId);
        } else {
          object.push(userId);
          updateLike(listenClick, object, postId);
        }
      });
    })
    .catch((error) => {
      console.log("error");
    });
};

const updateLike = (countLike, userArray, postId) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .update({
      likes: countLike,
      likeUsers: userArray,
    })
    .then(() => {
      console.log("Like successfully included!");
    })
    .catch((error) => {
      console.error("Error liking document: ", error);
    });
};

// Logout redirecting to the login page
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "#login";
    });
};
