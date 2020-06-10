// Aqui serão exportadas as funções que irão ser usadas

// incluir futuramente id e imagens
// incluir where de público e privado
export const newPost = (textareaPost) => {
  firebase.firestore().collection('posts').add({
    text: textareaPost,
    likes: 0,
    comments: [],
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  }); 
};

export const loadPosts = (callback) => {
  firebase.firestore().collection('posts')    
  .onSnapshot(function(querySnapshot){
    var posts = [];
    querySnapshot.forEach(function(doc){
      posts.push(doc.data());
    });
    callback(posts);
  });
};

