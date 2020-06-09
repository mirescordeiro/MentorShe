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
      text: textPostArea, //Troquei os ponto e vírgulas por vírgulas
      user: uid, // olhar o usuário na função de AuthStateChanged //Troquei os ponto e vírgulas por vírgulas
      likes: 0, //Troquei os ponto e vírgulas por vírgulas
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

export const initApp = () => {
    const signInStatus = document.querySelector('#quickstart-sign-in-status');
    const signIn = document.querySelector('#quickstart-sign-in');
    const accountDetails = document.querySelector('quickstart-account-details');
    const signUp = document.querySelector('#quickstart-sign-up');
    const verifyEmail = document.querySelector('#quickstart-verify-email');
    const passwordReset = document.querySelector('#quickstart-password-reset');
    
    firebase.auth().onAuthStateChanged(function(user){
        verifyEmail.disabled = true;
        if(user){
            const displayName = user.displayName; //Essas variáveis ainda não foram usadas.
            const email = user.email; //Essas variáveis ainda não foram usadas.
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL; //Essas variáveis ainda não foram usadas.
            const isAnonymus = user.isAnonymus; //Essas variáveis ainda não foram usadas.
            const uid = user.uid; //Essas variáveis ainda não foram usadas.
            const providerData = user.providerData; //Essas variáveis ainda não foram usadas.
            
            signInStatus.textContent = 'Signed in';
            signIn.textContent = 'Sign out';
            accountDetails.textContent = JSON.stringify(user, null, '');
            if(!emailVerified){
                document.querySelector('#quickstart-verify-email').disabled = false;
            }
        } else{
            signInStatus.textContent = 'Signed out';
            signIn.textContent = 'Sign in';
            accountDetails.textContent = 'null';
        }
        signIn.disabled = false;
    });
    signIn.addEventListener('click', toggleSignIn, false);
    signUp.addEventListener('click', handleSignUp, false);
    verifyEmail.addEventListener('click', sendEmailVerification, false);
    passwordReset.addEventListener('click', sendPasswordReset, false);
};
