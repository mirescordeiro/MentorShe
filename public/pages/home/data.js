// incluir futuramente id e imagens
// incluir where de público e privado

// Saves a new post in the Database
export const newPost = (textareaPost) => {
  // Infos added in the new post
  firebase
    .firestore()
    .collection("posts")
    .add({
      text: textareaPost,
      likes: 0,
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

/*************** KELLY VER!!!!! OK, RESOLVIDO*****************/
// Increases the number of likes in a post using its id
export const likePost = (postId, listenClick) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .set(
      {
        likes: listenClick,
      },
      { merge: true }
    ) //merge: true tinha que estar dentro do objeto, estava fora, e por isso não funcionava
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
