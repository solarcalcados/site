let init = 0;
let porPage=12;

    var url = window.location.search
    var urlParameters = new URLSearchParams(url)
    var filter = urlParameters.get('filter')
    var search = urlParameters.get('search')
    console.log("filter")
    console.log(filter)
    console.log("search")
    console.log(search)

var db = firebase.firestore();

const html = {
    get(element){
        return document.querySelector(element)
    }
}


const controle = {
    listeners() {
        html.get('.next').addEventListener('click', () => {
            
            document.getElementById("lista").innerHTML="";
            init+=porPage
            readBdFeatured(porPage, init)
            
            
            
        })
        html.get('.prev').addEventListener('click', () => {
            
            document.getElementById("lista").innerHTML="";
            init-=porPage
            readBdFeatured(porPage, init)
            
        })

        
    }
}
    controle.listeners()

    if(filter == null && search == null){
        readBdFeatured(porPage, init)
        console.log("no filter")
    } 
    if(!(filter == null)){
        readBdFeaturedFilter(porPage, init,filter)
        console.log("com filter")
    }
    




function readBdFeatured(pp,ini){
    db.collection("products")
    .orderBy("id")
    .startAfter(ini).limit(porPage)
    .get()
    .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
    
            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');
    
               // console.log(qntCards.length)
                
            let htmlText='';
    
            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a class="aaa">'+doc.data().name+'</a>';
            htmlText+='<h3>R$'+doc.data().price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a  class="btnsell btn shadow" href="product-details.html?produto='+doc.data().name+'&id='+doc.data().id+'">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;
                
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });;
}


function readBdFeaturedFilter(pp,ini,filt){
    db.collection("products").where('category', 'array-contains-any',[filt]).orderBy("num")
    .startAfter(ini).limit(porPage)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');

           // console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a class="aaa">'+doc.data().name+'</a>';
            htmlText+='<h3>R$'+doc.data().price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a  class="btnsell btn shadow" href="product-details.html?produto='+doc.data().name+'&id='+doc.data().id+'">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });;
}
       

function readBdFeaturedSearch(pp,ini,filt){
    db.collection("products").where('nome', 'array-contains-any',[filt])
    .orderBy("num")
    .startAfter(ini).limit(porPage)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');

           // console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a class="aaa">'+doc.data().name+'</a>';
            htmlText+='<h3>R$'+doc.data().price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a  class="btnsell btn shadow" href="product-details.html?produto='+doc.data().name+'&id='+doc.data().id+'">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });;
}

function readBdFeaturedSearch(pp,ini,filt){
    db.collection("products").where('category', 'array-contains-any',[filt]).orderBy("num")
    .startAfter(ini).limit(porPage)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var url_pedido = 'product-detail.html'
            var qntCards = document.querySelectorAll('.product-item');

           // console.log(qntCards.length)
            
            let htmlText='';

            htmlText+='<div class="mt-4 col-6 col-sm-6 col-md-6 col-lg-3">';
            htmlText+='<div class="product-item card shadow rounded">';
            htmlText+='<div class="product-image">';
            htmlText+='<i class="bi bi-suit-heart"></i>';
            htmlText+='<a">';
            htmlText+='<img src="img/products/'+doc.data().thumbnail+'.png" alt="Product Image"></a>';
            htmlText+='</div>';
            htmlText+='<div class="product-title">';
            htmlText+='<a class="aaa">'+doc.data().name+'</a>';
            htmlText+='<h3>R$'+doc.data().price+'</h3>';
            htmlText+='</div>';
            htmlText+='<div class="product-price">';
            htmlText+='<a  class="btnsell btn shadow" href="product-details.html?produto='+doc.data().name+'&id='+doc.data().id+'">Comprar</a>';
            htmlText+='</div>';
            htmlText+='</div>';
            htmlText+='</div>';
            document.getElementById("lista").innerHTML+=htmlText;
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });;
}