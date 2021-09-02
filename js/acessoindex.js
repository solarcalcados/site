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
                var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');

       
            
           // console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<spam class="prodbox"><img class="prodimg"><h1 class="prodid">Id do procuto</h1><h1 class="prodname">Produto tal</h1><h2 class="prodvalue">Valor do produto</h2></spam>';
            document.getElementById("lista").innerHTML+=htmlText;
                
                
                console.log(doc.data().nome);
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