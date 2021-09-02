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
      var uid = user.uid;

      db.collection("products").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                
                console.log(doc.data().marca);
            });
        });


      console.log(uid)
      // ...
    } else {
      // User is signed out
      window.location.href = "http://www.solarcalcados.com.br/acessologin.html";
    }
  });
function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}