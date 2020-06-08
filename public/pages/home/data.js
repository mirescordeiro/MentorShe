// Aqui serão exportadas as funções que irão ser usadas

export const newPost = () => {
  const postButton = document.querySelector('#post-button');
  const editButton = document.querySelector('#edit-button');
  const cancelEditBtn = document.querySelector('#cancel-button');
  const deletePostBtn = document.querySelector('#delete-post')
  const postPublic = document.querySelector('#public-post');

  postButton.addEventListener('submit', () => {
    event.preventDefault();
    const textPostArea = document.querySelector('#post-text').value;
    const post = {
      text: textPostArea;
      user: uid; // olhar o usuário na função de AuthStateChanged
      likes: 0;
      comments: []
    }
  })

  


}

/*

document.getElementById("postForm").addEventListener("submit",   function(event) {
event.preventDefault();
const text = document.getElementByUd("postText").value;
const post = {
text: text;
user_id: "";
likes: 0;
comments: []
}
const postsCollection = firebase.firestore().collection("popsts");
postsCollection.add(post).then(res => {
document.getElementById("postText").value = "";
loadPosts();
})
});
function addPost(post) {
const postTemplate = `
<li id='${post.id}'>
${post.data().text}:heart:${post.data().likes}
</li>
`
document.getElementById("posts").innerHTML += postTemplate;
}
function loadPosts(){
const postsCollection = firebase.firestore().collection("posts");
document.getElementById("posts").innerHTML = "Carregando...";
postsCollection.get().then(snap =>{
document.getElementById("posts").innerHTML = "";
snap.forEach(post => {
addPost(post);
});
});
}
*/