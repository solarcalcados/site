// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

console.log("firebase.auth()")
console.log(firebase.auth())
firebase.auth().createUserWithEmailAndPassword("email", "password")
.then((userCredential) => {
  // Signed in
  var user = userCredential.user;
  console.log("user")
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode+""+errorMessage);
  // ..
});