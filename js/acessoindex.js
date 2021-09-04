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

        
                
            // console.log(qntCards.length)
                
                let htmlText='';

                htmlText+='<span class="prodboxs p-0 col-6"><span class="card m-2 p-2"><img class="prodimg"><h1 onclick="edit()" class="btn-edit">edit</h1><h1 class="prodid">'+doc.data().id+'</h1><h1 class="prodname">'+doc.data().name+'</h1><h1 class="prodvalue">'+doc.data().price+'</h1></spam></spam>';
                document.getElementById("lista").innerHTML+=htmlText;
                    
                
                console.log('aa'+doc.data().price);
            });
        });


      
      // ...
    } else {
      // User is signed out
      window.location.href = "acessologin.html";
    }
  });
function edit(){
  console.log("uid")
}

function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}