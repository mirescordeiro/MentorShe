// Aqui serão exportadas as funções que irão ser usadas

// incluir futuramente id e imagens
// incluir where de público e privado
export const newPost = (textareaPost) => {
  firebase
    .firestore()
    .collection("posts")
    .add({
      text: textareaPost,
      likes: 0,
      comments: [],
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const loadPosts = (callback) => {
  firebase
    .firestore()
    .collection("posts")
    .onSnapshot((querySnapshot) => {
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

export const deletePost = (postId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then( function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
};

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login' //Redireciona para a página de login
    })
    //.catch((error) => {
    //  console.error("Error adding document: ", error);
    //});
}; 
