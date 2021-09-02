const firebaseConfig = {
    apiKey: "AIzaSyBVe2Zanf4TL-dXOwkRpI8FYN8t_CBVrkI",
    authDomain: "solar-calcados.firebaseapp.com",
    databaseURL: "https://solar-calcados-default-rtdb.firebaseio.com",
    projectId: "solar-calcados",
    storageBucket: "solar-calcados.appspot.com",
    messagingSenderId: "402085964888",
    appId: "1:402085964888:web:be9087026dfd6f3999ae2d",
    measurementId: "G-WEXT2T9203"
  }; 

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
var db = firebase.firestore();


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });