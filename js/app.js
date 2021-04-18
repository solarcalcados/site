console.log("firebase.auth()")
console.log(firebase)
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