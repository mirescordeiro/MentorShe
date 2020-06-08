// Aqui serão exportadas as funções que irão ser usadas

// export const greeting = name => `Olá ${name}! Seja bem vinda!`;


export const initApp = function initApp(){
    const signInStatus = document.querySelector('#quickstart-sign-in-status');
    const signIn = document.querySelector('#quickstart-sign-in');
    const accountDetails = document.querySelector('quickstart-account-details');
    const signUp = document.querySelector('#quickstart-sign-up');
    const verifyEmail = document.querySelector('#quickstart-verify-email');
    const passwordReset = document.querySelector('#quickstart-password-reset');
    
    firebase.auth().onAuthStateChanged(function(user){
        verifyEmail.disabled = true;
        if(user){
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const isAnonymus = user.isAnonymus;
            const uid = user.uid;
            const providerData = user.providerData;
            
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
