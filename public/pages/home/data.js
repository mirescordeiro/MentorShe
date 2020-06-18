export const getUserName = () => {
  return firebase
    .auth()
    .currentUser != null ? firebase
      .auth()
      .currentUser.displayName : '';
};

export const getUrlPhoto = () => {
  return firebase.auth().currentUser != null ? firebase.auth().currentUser.photoURL : './public/img/logo_icon.png';
};

export const newPost = (textareaPost, postPrivate) => { //coloquei postPrivate como parametro
  firebase
    .firestore()
    .collection('posts')
    .add({
      userName: getUserName(),
      photoURL: getUrlPhoto(),
      user: firebase.auth().currentUser.uid,
      text: textareaPost,
      likes: 0,
      likeUsers: [],
      comments: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      privacy: postPrivate, //criei este privacy recebendo o postPrivate e declarei ele lá em cima como paramentro.
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

// Loads all the posts and listens to the new ones
export const loadPosts = (callback) => {
  const load = firebase
    .firestore()
    .collection('posts')
    .orderBy('timestamp', 'desc');
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

export const orderBy = (order, callback) => {
  const ascDesc = order === true ? 'asc' : 'desc';
  const orderPost = firebase
  .firestore()
  .collection('posts')
  .where('privacy', '==', 'on')
  .orderBy('timestamp', ascDesc);

  orderPost.onSnapshot((querySnapshot) => {
    const postOrder = [];
    querySnapshot.forEach((doc) => {
      postOrder.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(postOrder);
  });
};

// Deletes a post using its id
export const deletePost = (postId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

// Increases the number of likes in a post using its id
export const likePost = (postId, userId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .get()
    .then((doc) => {
      //  Array de usuários com todos os ids de usuários que já deram like nos posts
      const userIds = doc.data().likeUsers;
      //  Quantidade de likes do post
      let likes = doc.data().likes;

      //  Verifica se o userId contem userId do usuário que está clicando no like
      if (userIds.includes(userId)) {
        //  Se contém, ele decrementa o like
        likes--;
        //  Encontra o indice do usuário no array
        const index = userIds.findIndex(elem => elem === userId);
        // Remove do array o usuário que tiver no indice
        userIds.splice(index, 1);
      } else {
        //  Se não, incrementa a soma de like
        likes++;
        //  Adiciona no array de usuário o id do usuário
        userIds.push(userId);
      }

<<<<<<< HEAD
      updateLike(likes, userIds, postId); // Deu que o "updateLike" foi usado antes de ser declarado
      updateEdit(userIds, postId) 
=======
      updateLike(likes, userIds, postId);
      updateEdit(userIds, postId); // Deu que o "updateLike" foi usado antes de ser declarado
>>>>>>> ce306116185c201aeae1d1b921d46964ee654837
    })
    .catch((error) => {
      console.log('error');
    });
};

const updateLike = (countLike, userArray, postId) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      likes: countLike,
      likeUsers: userArray,
    })
    .then(() => {
      console.log('Like successfully included!');
    })
    .catch((error) => {
      console.error('Error liking document: ', error);
    });
};

// Updates the text from a post using its id
export const updateEdit = (postId, textareaPost) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      text: textareaPost,
    })
    .then(() => {
      console.log('Edit post successfully!');
    })
    .catch(() => {
      console.error('You cannot cancel this edit!');
    });
};

// Logout redirecting to the #login page
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '#login';
    });
};
