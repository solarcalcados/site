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

function teste(nome,email,senha,csenha) {
    
    
    if(!(senha == csenha)){
        alert("Tem coisa errada aí")
    } else if(nome == "" || email == "" || senha == "" || csenha == ""){
        alert("Tem coisa vazia aí")
    } else {
            firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log(user)
                // DB User
                db.collection("clinicas").doc(nome).set({
                    Nome: nome,
                    Email: email,
                    Senha: senha,
                    Cidade: geoplugin_city(),
                    Estado: geoplugin_region(),
                    Ip: geoplugin_request()
        
                })
                .then(() => {
                    
                    window.location.href = "http://www.solarcalcados.com.br/acessologin.html";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    
                });
            })
            // Auth error
            .catch((error) => {
                var errorCode = error.code;
                console.log(errorCode)
                var errorMessage = error.message;
                if(errorMessage == "The email address is badly formatted."){
                    alert("Digite um email válido")
                } else if(errorMessage == "Password should be at least 6 characters"){
                    alert("Sua senha precisa ter mais de 6 digitos")
                } else if(errorMessage == "The email address is already in use by another account."){
                    alert("Esse email já está sendo utilizado... Tento outro")
                }
                
                console.log(errorMessage)
                // ..
            });
        
    }
}

function login(a,b){
    
}




