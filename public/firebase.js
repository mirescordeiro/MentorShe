export const firebase = () => {
  let firebaseConfig = {
    apiKey: "AIzaSyDHXFiXn3UboA2iBqczSCib2_jmtMHl97g",
    authDomain: "social-network-2b0a2.firebaseapp.com",
    databaseURL: "https://social-network-2b0a2.firebaseio.com",
    projectId: "social-network-2b0a2",
    storageBucket: "social-network-2b0a2.appspot.com",
    messagingSenderId: "411493836222",
    appId: "1:411493836222:web:0d1077f3f4d658bf06c5ef",
    measurementId: "G-VT7RZ0TS9F",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};
