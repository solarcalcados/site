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


function login(email, senha){
    firebase.auth().signInWithEmailAndPassword(email, senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href = "acessoindex.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}